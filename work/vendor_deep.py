import json, sys, re
from collections import Counter
sys.path.insert(0, '/home/user/work')
from leveldb_read import read_pack, split_key

R = '/home/user/vendor-review/'
PACKS = {
 'best': R+'Bestiario-de-Arton/packs/bestiario-de-arton',
 'alb': R+'Bestiario-de-Arton/packs/ameacas-livro-basico',
 'hab': R+'Bestiario-de-Arton/packs/habilidades-do-bestiario',
 'rev': R+'Revista-T20-Fullgor-dos-Deuses/packs/fullgor-dos-deuses-compendium',
 'sup-ame': R+'Suplementos-de-Arton/packs/ameacas-de-arton',
 'sup-atl': R+'Suplementos-de-Arton/packs/atlas-de-arton',
 'sup-deu': R+'Suplementos-de-Arton/packs/deuses-de-arton',
 'sup-dis': R+'Suplementos-de-Arton/packs/distincoes',
 'sup-gdm': R+'Suplementos-de-Arton/packs/guia-de-deuses-menores',
 'sup-npc': R+'Suplementos-de-Arton/packs/guia-de-npcs-and-dbs',
 'sup-her': R+'Suplementos-de-Arton/packs/herois-de-arton',
 'zap': R+'t20-zaperas-automations/packs/zaperas-macros',
}
DB = {}
for name, path in PACKS.items():
    kvs = read_pack(path)
    docs = []
    for k, v in kvs.items():
        try: d = json.loads(v.decode('utf-8'))
        except Exception: continue
        try: ns, kp = split_key(k)
        except Exception: ns, kp = '?', '?'
        docs.append((ns, kp, d))
    DB[name] = docs
    print(f"{name}: {len(docs)} docs JSON", flush=True)

def toplevel(docs):
    return [(ns, kp, d) for ns, kp, d in docs if '.' not in ns and ns != 'folders' and ns != '?']

# ---------- 1. URLs / imagens em TODOS ----------
print("\n=== 1. Censo de imagens/URLs ===")
urlpat = re.compile(r'https?://[^\s"\']+')
hosts = Counter(); imgfields = Counter(); samples = {}
for name, docs in DB.items():
    for ns, kp, d in docs:
        s = json.dumps(d)
        for u in urlpat.findall(s):
            h = re.sub(r'^https?://([^/]+).*$', r'\1', u)
            hosts[(name.split('-')[0], h)] += 1
            samples.setdefault(h, u[:100])
        for f in ('img',):
            if isinstance(d, dict) and f in d and isinstance(d[f], str) and d[f]:
                v = d[f]
                key = 'http' if v.startswith('http') else ('data:' if v.startswith('data:') else v.split('/')[0] or '(vazio)')
                imgfields[(name.split('-')[0], f, key)] += 1
        pt = (d.get('prototypeToken') or {}) if isinstance(d, dict) else {}
        t = pt.get('texture') or {}
        if isinstance(t, dict) and t.get('src'):
            v = t['src']
            key = 'http' if v.startswith('http') else v.split('/')[0]
            imgfields[(name.split('-')[0], 'token.src', key)] += 1
print("-- hosts --")
for (g, h), c in hosts.most_common(20): print(f"  {g} {h}: {c}")
print("-- exemplos --")
for h, u in list(samples.items())[:10]: print(f"  {h}: {u}")
print("-- campos img/token --")
for k in sorted(imgfields): print(f"  {k}: {imgfields[k]}")

# ---------- 2. Revista: desempacotar Adventures ----------
print("\n=== 2. Revista Adventures ===")
for ns, kp, d in toplevel(DB['rev']):
    inner = {k: (len(v) if isinstance(v, list) else type(v).__name__) for k, v in d.items() if isinstance(v, (list, dict))}
    print(f"- {d.get('name')} | {inner}")
    for sc in (d.get('scenes') or []):
        bg = (sc.get('background') or {}).get('src')
        print(f"    cena: {sc.get('name')} {sc.get('width')}x{sc.get('height')} grid={sc.get('grid')} bg={str(bg)[:90]}")
        toks = sc.get('tokens') or []
        print(f"      tokens: {len(toks)}; exemplo actor={str((toks[0].get('actorId') if toks else None))}")
    for j in (d.get('journal') or [])[:6]:
        print(f"    diario: {j.get('name')} paginas={len(j.get('pages') or [])}")
    for a in (d.get('actors') or [])[:6]:
        print(f"    ator: {a.get('name')} img={str(a.get('img'))[:80]}")

# ---------- 3. zaperas macros ----------
print("\n=== 3. zaperas macros ===")
for ns, kp, d in toplevel(DB['zap']):
    c = d.get('command') or ''
    print(f"- {d.get('name')} ({len(c)} chars) type={d.get('type')}")
json.dump(DB['zap'][0][2].get('command', ''), open('/home/user/work/zap_sample.js', 'w'), ensure_ascii=False)

# ---------- 4. amostras NPC + itens ----------
print("\n=== 4. amostras ===")
npc = [d for ns, kp, d in toplevel(DB['best']) if d.get('type') == 'npc' and (d.get('system') or {}).get('atributos')]
print("NPCs com atributos:", len(npc))
if npc:
    n0 = npc[0]
    print("NPC ex:", n0.get('name'), "| img:", str(n0.get('img'))[:70], "| token:", str(((n0.get('prototypeToken') or {}).get('texture') or {}).get('src'))[:70])
    sys_ = n0.get('system', {})
    print("system keys:", sorted(sys_.keys()))
    for k in ('atributos', 'attributes', 'detalhes', 'pericias'):
        v = sys_.get(k)
        print(f"  {k}: {str(v)[:300]}")
    json.dump(n0, open('/home/user/work/npc_sample.json', 'w'), ensure_ascii=False, indent=1)
for pack, typ in (('sup-ame', 'poder'), ('sup-deu', 'magia'), ('sup-ame', 'race'), ('hab', 'poder')):
    items = [d for ns, kp, d in toplevel(DB[pack]) if d.get('type') == typ]
    if items:
        s = items[0].get('system', {})
        print(f"{pack}/{typ} ex: {items[0].get('name')} | syskeys={sorted(s.keys())[:20]}")
        print(f"   desc head: {str(s.get('description'))[:200]}")
json.dump([d for ns, kp, d in toplevel(DB['sup-ame']) if d.get('type') == 'poder'][0], open('/home/user/work/poder_sample.json', 'w'), ensure_ascii=False, indent=1)
# nomes de pastas (estrutura)
print("\n=== 5. pastas best/hab ===")
for pack in ('best', 'hab'):
    fols = sorted({d.get('name') for ns, kp, d in DB[pack] if ns == 'folders'})
    print(pack, fols[:40])
