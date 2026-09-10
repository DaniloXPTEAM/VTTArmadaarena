# 🔍 Auditoria Técnica — VTTArmada

**Data:** 2026-09-10 · **Escopo:** 386 arquivos versionados (218k linhas JS, 26k HTML, 33k CSS)
**Método:** análise estática, parsing real dos bancos de dados como JSON, execução dos 23 módulos
em DOM headless (jsdom), verificação HTTP de todas as rotas e varredura de links/segurança.

---

## Veredito em 30 segundos

O projeto está **saudável e acima da média** para um codebase estático desse porte: zero erros de
sintaxe em 56 arquivos JS, zero links relativos quebrados, zero `eval`, escape de HTML correto
no chat P2P e 20 dos 22 módulos seguindo a regra de tema do README.

Foram encontrados **2 bugs reais** (1 com risco de perda de dados) e **~34 MB de peso removível**.

| Severidade | Qtd | Resumo |
|---|---|---|
| 🔴 Alta | 2 | Perda silenciosa de cenas do VTT; `campanha/` sem `<title>`/charset/viewport |
| 🟡 Média | 5 | Bancos duplicados divergentes, 708 hotlinks, sem SRI, sem LICENSE, `.nojekyll` ausente |
| 🟢 Baixa | 6 | Duplicatas de arquivo, órfãos, `console.log`, `target=_blank`, catch vazio, histórico Git |

---

## 🔴 ALTA — 1. Cenas do VTT somem sem avisar (perda de dados)

**Arquivo:** `Vtt/app.js:19744`

```js
function _setCenas(arr) {
  try { localStorage.setItem(CENAS_KEY, JSON.stringify(arr)); } catch(e) {}
}
```

O estado da cena inclui `mapDataUrl` (`_capturarEstadoAtual`, linha 19763) — e o mapa entra ali
como **base64** (`readAsDataURL`, 6 ocorrências). Um PNG de 2 MB vira ~2,7 MB em base64, mas o
`localStorage` tem teto de **~5 MB por origem**. Ao salvar a segunda ou terceira cena, o navegador
lança `QuotaExceededError` — que o `catch(e) {}` **engole em silêncio**.

**Impacto:** o mestre salva a cena, o VTT não dá nenhum aviso, e o trabalho é perdido ao recarregar.

**Correção mínima** (avisar em vez de silenciar):
```js
function _setCenas(arr) {
  try { localStorage.setItem(CENAS_KEY, JSON.stringify(arr)); return true; }
  catch (e) {
    toast('⚠️ Não foi possível salvar a cena: limite de armazenamento atingido. ' +
          'Use mapas por URL em vez de upload, ou exporte a cena.');
    console.error('Falha ao salvar cenas', e);
    return false;
  }
}
```

**Correção estrutural:** migrar mapas para **IndexedDB** (sem limite prático de 5 MB e aceita
`Blob` direto, sem inflar 33% em base64). Hoje o projeto não usa IndexedDB em lugar nenhum.

> Padrão relacionado: **51 blocos `catch {}` vazios** no projeto. Nos demais casos o risco é baixo,
> mas em qualquer ponto de gravação vale ao menos um `console.error`.

---

## 🔴 ALTA — 2. `campanha/index.html` sem `<head>` mínimo

Único módulo que falha na checagem de metadados básicos:

| Módulo | lang | charset | viewport | title |
|---|---|---|---|---|
| todos os outros 22 | ok | ok | ok | ok |
| **campanha** | ok | **AUSENTE** | **AUSENTE** | **AUSENTE** |

**Impacto:** sem `charset`, acentuação quebra (`Ã§` no lugar de `ç`) dependendo do servidor; sem
`viewport`, o layout não responde no celular; sem `<title>`, a aba mostra a URL crua e o SEO/
compartilhamento fica ruim.

**Correção** — inserir no topo do `<head>` (`campanha/index.html:4`):
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Gerador de Missões T20 — VTTArmada</title>
```

---

## 🟡 MÉDIA — 3. Bancos duplicados e **divergentes** (viola a Regra 2 do README)

O README manda não duplicar bancos. Existem duas cópias, e elas **já divergiram**:

| Arquivo | Entradas | Carregado por alguém? |
|---|---|---|
| `ameacas/db/ameacas_db.js` (canônico) | **620** | ✅ 9 módulos |
| `ficha/ameacas_db.js` | **624** | ❌ **ninguém** |
| `grimorio/spells_db.js` (canônico) | **260** | ✅ 6 módulos |
| `ficha/spells_db.js` | **259** | ❌ **ninguém** |

Confirmei por `grep` em todos os HTML: **nenhum arquivo carrega as cópias de `ficha/`** — o próprio
`ficha/index.html` importa os canônicos (linhas 1633 e 1650). São **2,9 MB de código morto**.

Divergências reais medidas:
- **30 ameaças** só no canônico (ex.: `Avatar de Valkaria`, `Dracomante do Fogo`)
- **10 ameaças** só na cópia (ex.: `Dragão Bicéfalo`, `Senhor do Gigante Rubro Forma Final`)
- **484 ameaças** com mesmo nome e conteúdo diferente — a diferença é o campo **`img`**:
  o canônico tem imagem em **514/620**, a cópia em **0/624**
- 1 magia (`Controlar Ar`) só no canônico
- Erros de digitação isolados na cópia (`Fera Cacto -Líder` com espaço a mais)

**Recomendação:** antes de apagar, resgatar as **10 ameaças exclusivas** da cópia para o canônico —
depois remover os dois arquivos. Ganho: **−2,9 MB** e fim do risco de alguém editar o arquivo errado.

---

## 🟡 MÉDIA — 4. 708 hotlinks de imagem (link rot)

Nenhuma dessas imagens está no repositório; todas dependem de terceiros:

| Host | Refs | Risco |
|---|---|---|
| `i.imgur.com` | 475 | 🔴 apaga conteúdo antigo/inativo |
| `i.pinimg.com` | 23 | 🟡 bloqueia hotlink às vezes |
| `media.tenor.com` + `media1` + `c.tenor` | 44 | 🟡 |
| `i.ibb.co` | 21 | 🟡 |
| `files.d20.io` | 9 | 🔴 **URL com timestamp — expira** |
| outros (tumblr, gifer, redd.it…) | ~136 | 🟡 |

Casa com o que o `relatorio-foundry.md` já apontava. **Sugestão:** um script de verificação
(`HEAD` em cada URL) rodando periodicamente, para detectar links mortos antes dos jogadores.

---

## 🟡 MÉDIA — 5. Segurança: CDNs sem SRI

**0 de 8** tags `<script src="https://...">` têm atributo `integrity`. Se um CDN for comprometido,
o código malicioso executa com acesso total às fichas no `localStorage`.

Bibliotecas: PeerJS 1.5.4, Sortable (1.15.0 e 1.15.2 — **versões inconsistentes**), JSZip 3.10.1,
Bootstrap 5.3.2, pdf-lib, html2pdf.

**Correção:** adicionar `integrity="sha384-..."` + `crossorigin="anonymous"` e padronizar o Sortable.

> ✅ **O que está certo:** o chat P2P escapa corretamente. `escHTML()` (linha 61) cobre `& < > " '`,
> e `formatChatText()` **escapa antes** de aplicar o markdown — ordem correta, sem brecha de XSS.
> São 148 usos de `escHTML` no `app.js`. O mestre também valida posse do token antes de aceitar
> movimento (`t.controlledBy === conn.peer`, linha 1053) — não dá para mover peça alheia.

---

## 🟡 MÉDIA — 6. Faltam `LICENSE` e `.nojekyll`

- **Sem `LICENSE`**: sem licença explícita, "todos os direitos reservados" é o padrão legal — ninguém
  pode legalmente reusar, e isso conflita com a intenção de hub comunitário.
- **Sem `.nojekyll`**: no GitHub Pages, o Jekyll ignora pastas iniciadas por `_`. Hoje não há
  nenhuma, mas o arquivo vazio é barato e evita bug futuro difícil de diagnosticar.

---

## 🟢 BAIXA — achados menores

**Duplicatas exatas (mesmo MD5)** — 12 pares, ~2,5 MB:
- `assets/imagens/*.png` ↔ `ficha/imagens/*.png` (6 ícones de atributo) e
  `assets/fonts/Tormenta.ttf` ↔ `ficha/Tormenta.ttf` → **violam as Regras 3 do README**
- `uploads/image-1.png` ↔ `image-2.png` (idênticos, 1,9 MB cada)
- 4 pares em `itens/data/img/` que parecem intencionais (`carroca`/`carruagem`, `garra`/`garras`)

**Arquivos órfãos** (6 arquivos, 4,5 MB) — não referenciados por nenhum HTML/CSS/JS:
`uploads/image-1.png`, `uploads/image-2.png`, `images/logo.jpeg`,
`calculadoraND_Tormenta/{vectorius.jpeg, logo_vectora.png, qr_code.png}`

**Outros:**
- 19 `console.log` em produção
- 3 links `target="_blank"` sem `rel="noopener"`
- 1 nome de arquivo com espaços e acentos (`espolio/T20 - Tabela de geração de tesouros.xlsx`) —
  funciona, mas dá dor de cabeça em URL
- `.git` tem **48 MB** porque o `VTTArmada.zip` (25 MB) segue no histórico mesmo após remoção.
  Só um `git filter-repo` resolveria — **não recomendo**, pois reescreve hashes.

---

## ✅ O que passou sem ressalva

| Verificação | Resultado |
|---|---|
| Sintaxe JS (`node --check`) | **56/56 válidos** |
| Links relativos | **0 quebrados** (os 14 do scanner são placeholders do `template.html` e `url(data:)`) |
| Consistência de maiúsculas | **0 divergências** (seguro para Linux/Pages) |
| HTTP dos 22 módulos + assets críticos | **todos 200 OK** |
| `eval` / `new Function` | **0 ocorrências** |
| Segredos/chaves hardcoded | **0** (Giphy e Freesound pedem chave ao usuário — correto) |
| Regra 4 do README (tema) | **20/22** usam só `theme-init.js`; as 2 exceções (`ficha/`, `forja/`) são as documentadas |
| XSS no chat P2P | **protegido** (escape antes do markdown) |
| Autoridade do mestre no P2P | **validada** por `controlledBy` |
| TODO/FIXME pendentes | **0** |

---

## Plano de ação sugerido

**Agora (rápido, alto impacto)**
1. Corrigir o `<head>` do `campanha/` — 3 linhas
2. Fazer `_setCenas` avisar em vez de engolir o erro — evita perda de dados

**Depois (limpeza, −7 MB)**
3. Migrar as 10 ameaças exclusivas e apagar as cópias mortas em `ficha/` (−2,9 MB)
4. Remover órfãos e duplicatas de `assets`↔`ficha` (−4 MB, alinha com o README)
5. Adicionar `LICENSE` e `.nojekyll`

**Backlog**
6. SRI nas CDNs + padronizar versão do Sortable
7. Verificador automático de hotlinks
8. Mapas do VTT em IndexedDB (resolve a raiz do bug nº 1)
