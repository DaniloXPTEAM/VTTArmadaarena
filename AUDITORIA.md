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

> **Atualização (2026-09-10):** os dois itens 🔴 abaixo já foram **corrigidos** — ver commit
> "Corrige perda silenciosa de cenas no VTT e head do módulo campanha".

## 🔴 ALTA — 1. Cenas do VTT somem sem avisar (perda de dados) — ✅ CORRIGIDO

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

## 🔴 ALTA — 2. `campanha/index.html` sem `<head>` mínimo — ✅ CORRIGIDO

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

## 🟡 MÉDIA — 3. Bancos duplicados e **divergentes** (viola a Regra 2 do README) — ✅ RESOLVIDO

> **Correção do diagnóstico (2026-09-10).** A primeira leitura desta seção dizia que a cópia tinha
> "10 ameaças que não existem no canônico". **Isso estava errado** — o erro veio de comparar nomes
> de forma sensível a maiúsculas/acentos. Comparando por nome normalizado, os 624 registros da cópia
> casam com o canônico: as 10 "exclusivas" eram apenas grafias diferentes
> (`Dragão Bicéfalo` ↔ `Dragão bicéfalo`, `Fera Cacto -Líder` ↔ `Fera Cacto-Líder`).
>
> Auditei também campo a campo, considerando os nomes repetidos dentro de cada banco
> (o canônico tem 9 nomes duplicados; a cópia, 33). Resultado: **nenhum dado exclusivo real**.
> Os 3 candidatos finais se explicam:
> - `Dragão Feral` / `Dragão Bicéfalo` — o campo `equipamento` da cópia já está no `tesouro` do
>   canônico, e a versão da cópia ainda tem erro de digitação (`para.extrair`);
> - `Gorlogg` — a habilidade `Parceiro` está preservada em `parceiros/parceiros.js`
>   ("Gorlogg (Montaria)", com os três tiers);
> - `Finntroll Caçador` — nomenclatura alternativa das mesmas habilidades
>   (`Corpo Vegetal` = `Natureza Vegetal` + `Regeneração Vegetal`).
>
> Em vários casos o canônico é **mais completo** (descrições longas onde a cópia traz só
> "Vontade CD 33 evita."). `ficha/spells_db.js` é subconjunto exato do canônico (259 de 260).
> **Os dois arquivos foram removidos** — nada foi perdido.

O README manda não duplicar bancos. Existem duas cópias, e elas **já divergiram**:

| Arquivo | Entradas | Carregado por alguém? | Situação |
|---|---|---|---|
| `ameacas/db/ameacas_db.js` (canônico) | **620** | ✅ 9 módulos | mantido |
| `ficha/ameacas_db.js` | 624 | ❌ **ninguém** | **removido** |
| `grimorio/spells_db.js` (canônico) | **260** | ✅ 6 módulos | mantido |
| `ficha/spells_db.js` | 259 | ❌ **ninguém** | **removido** |

Confirmei por `grep` em todos os HTML: **nenhum arquivo carrega as cópias de `ficha/`** — o próprio
`ficha/index.html` importa os canônicos (linhas 1633 e 1650). São **2,9 MB de código morto**.

Divergências medidas (por nome normalizado, considerando homônimos):
- **624/624** registros da cópia casam com o canônico — **0 criaturas exclusivas**
- 596 idênticos; 28 divergentes, quase todos por redação mais curta ou `tipo` de habilidade
- o canônico tem imagem em **514/620**; a cópia, em **0/624**
- 1 magia (`Controlar Ar`) só no canônico

**Resolução:** os dois arquivos foram removidos após a verificação acima. Ganho: **−1,8 MB** e fim
do risco de alguém editar o arquivo errado.

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

**Duplicatas exatas (mesmo MD5)** — ✅ resolvidas:
- ~~`assets/imagens/*.png` ↔ `ficha/imagens/*.png` (6 ícones) e `assets/fonts/Tormenta.ttf` ↔
  `ficha/Tormenta.ttf`~~ → **removidas**; o `ficha/` já apontava para `../assets/`
  (`style.css:4` e `script.js:89`), então eram peso morto
- ~~`uploads/image-1.png` ↔ `image-2.png`~~ → **pasta removida** (−3,8 MB)
- 4 pares em `itens/data/img/` mantidos — parecem intencionais (`carroca`/`carruagem`, `garra`/`garras`)

**Arquivos órfãos** — os de `uploads/` foram removidos. Seguem no repo, por serem plausivelmente
intencionais: `images/logo.jpeg` e `calculadoraND_Tormenta/{vectorius.jpeg, logo_vectora.png, qr_code.png}`

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

**Agora (rápido, alto impacto)** — ✅ **concluído**
1. ~~Corrigir o `<head>` do `campanha/`~~ — feito
2. ~~Fazer `_setCenas` avisar em vez de engolir o erro~~ — feito (e os 4 chamadores deixaram de
   exibir "Cena salva!" quando a gravação falha)

**Depois (limpeza)** — ✅ **concluído**
3. ~~Apagar as cópias mortas em `ficha/`~~ — feito (−1,8 MB). A verificação mostrou que não havia
   ameaças exclusivas a migrar (ver correção do diagnóstico na seção 3).
4. ~~Remover órfãos e duplicatas de `assets`↔`ficha`~~ — feito (−6,1 MB): fonte e 6 ícones
   duplicados (o `ficha/` já usava `../assets/`) e a pasta `uploads/`.
5. Adicionar `LICENSE` e `.nojekyll` — pendente

**Backlog**
6. SRI nas CDNs + padronizar versão do Sortable
7. Verificador automático de hotlinks
8. Mapas do VTT em IndexedDB (resolve a raiz do bug nº 1)
