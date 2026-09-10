#!/usr/bin/env node
/**
 * Verificador de hotlinks — VTTArmada
 * ------------------------------------------------------------------
 * Varre os arquivos .js/.html/.css do projeto, extrai as URLs de imagem
 * externas e testa cada uma. Serve para detectar link rot (Imgur apagando
 * conteúdo, URLs do Roll20 que expiram etc.) antes que os jogadores vejam
 * um retrato quebrado na mesa.
 *
 * Uso:
 *   node tools/check-hotlinks.mjs                  # verifica tudo
 *   node tools/check-hotlinks.mjs --limit 50       # só as 50 primeiras
 *   node tools/check-hotlinks.mjs --host i.imgur.com
 *   node tools/check-hotlinks.mjs --json relatorio.json
 *   node tools/check-hotlinks.mjs --list           # não acessa a rede, só lista
 *
 * Saída: código 1 se houver links quebrados (útil para CI).
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const EXT = new Set(['.js', '.html', '.css']);
const IGNORE = new Set(['.git', 'node_modules', 'tools']);
const CONCURRENCY = 8;
const TIMEOUT_MS = 15000;

const args = process.argv.slice(2);
const opt = (name, def = null) => {
  const i = args.indexOf(name);
  return i === -1 ? def : (args[i + 1] ?? true);
};
const LIMIT = Number(opt('--limit', 0)) || 0;
const HOST = opt('--host', null);
const JSON_OUT = opt('--json', null);
const LIST_ONLY = args.includes('--list');

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (IGNORE.has(name)) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (EXT.has(extname(name))) out.push(p);
  }
  return out;
}

// Coleta URLs de imagem externas, guardando onde cada uma aparece.
function collect() {
  const re = /https?:\/\/[^\s"'`)\\<>]+?\.(?:png|jpe?g|gif|webp|svg)(?:\?[^\s"'`)\\<>]*)?/gi;
  const map = new Map();
  for (const file of walk(ROOT)) {
    const rel = file.replace(ROOT, '');
    const text = readFileSync(file, 'utf8');
    const lines = text.split('\n');
    lines.forEach((line, i) => {
      for (const m of line.matchAll(re)) {
        const url = m[0].replace(/[.,;]+$/, '');
        if (!map.has(url)) map.set(url, []);
        const refs = map.get(url);
        if (refs.length < 5) refs.push(`${rel}:${i + 1}`);
      }
    });
  }
  return map;
}

async function check(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    // HEAD é mais barato; alguns hosts não suportam e caímos para GET parcial.
    let res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: ctrl.signal });
    if (res.status === 405 || res.status === 501) {
      res = await fetch(url, { method: 'GET', redirect: 'follow', signal: ctrl.signal,
                               headers: { Range: 'bytes=0-1024' } });
    }
    const type = res.headers.get('content-type') || '';
    // Imgur devolve 200 com um placeholder quando a imagem foi removida.
    const removed = /imgur\.com/.test(url) && /removed|404/i.test(res.url);
    const ok = res.ok && !removed && (!type || type.startsWith('image/') || type === '');
    return { ok, status: removed ? 'removida' : res.status, type };
  } catch (e) {
    return { ok: false, status: e.name === 'AbortError' ? 'timeout' : 'erro de rede',
             type: '', detail: String(e.message).slice(0, 80) };
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  let entries = [...collect().entries()];
  if (HOST) entries = entries.filter(([u]) => u.includes(HOST));
  entries.sort(([a], [b]) => a.localeCompare(b));
  if (LIMIT) entries = entries.slice(0, LIMIT);

  const byHost = {};
  for (const [u] of entries) {
    const h = new URL(u).host;
    byHost[h] = (byHost[h] || 0) + 1;
  }

  console.log(`URLs de imagem externas únicas: ${entries.length}`);
  console.log('Por host:');
  for (const [h, n] of Object.entries(byHost).sort((a, b) => b[1] - a[1]))
    console.log(`   ${String(n).padStart(4)}  ${h}`);

  if (LIST_ONLY) return 0;
  if (typeof fetch !== 'function') {
    console.error('\nEste Node não tem fetch (requer Node 18+).');
    return 2;
  }

  console.log(`\nVerificando (concorrência ${CONCURRENCY}, timeout ${TIMEOUT_MS / 1000}s)...\n`);
  const results = [];
  let i = 0, done = 0;
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (i < entries.length) {
      const idx = i++;
      const [url, refs] = entries[idx];
      const r = await check(url);
      results.push({ url, refs, ...r });
      done++;
      if (done % 25 === 0 || done === entries.length)
        process.stdout.write(`\r  ${done}/${entries.length}`);
    }
  }));
  console.log('\n');

  const bad = results.filter(r => !r.ok).sort((a, b) => a.url.localeCompare(b.url));
  if (bad.length === 0) {
    console.log(`✅ Todos os ${results.length} links responderam.`);
  } else {
    console.log(`❌ ${bad.length} de ${results.length} links com problema:\n`);
    for (const b of bad) {
      console.log(`  [${b.status}] ${b.url}`);
      console.log(`      em: ${b.refs.join(', ')}`);
    }
  }

  if (JSON_OUT) {
    writeFileSync(JSON_OUT, JSON.stringify({ data: new Date().toISOString(),
      total: results.length, quebrados: bad.length, resultados: results }, null, 2));
    console.log(`\nRelatório salvo em ${JSON_OUT}`);
  }
  return bad.length ? 1 : 0;
}

main().then(c => process.exit(c)).catch(e => { console.error(e); process.exit(2); });
