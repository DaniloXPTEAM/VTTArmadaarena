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

| Severidade | Qtd | Resumo | Situação |
|---|---|---|---|
| 🔴 Alta | 2 | Perda silenciosa de cenas do VTT; `campanha/` sem `<title>`/charset/viewport | ✅ corrigidos |
| 🟡 Média | 5 | Bancos duplicados, hotlinks, SRI, LICENSE, `.nojekyll` | ✅ 3 resolvidos · 🛠️ 1 com ferramenta · ⏸️ LICENSE aguarda decisão |
| 🟢 Baixa | 6 | Duplicatas, órfãos, `console.log`, `target=_blank`, catch vazio, histórico Git | ✅ 3 resolvidos |

**Estado atual:** 68 MB → 30 MB · 500 → 377 arquivos · 0 erro de sintaxe · 0 link quebrado ·
23/23 módulos sem erro de runtime.

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

## 🟡 MÉDIA — 4. 630 hotlinks de imagem (link rot) — 🛠️ FERRAMENTA CRIADA

Nenhuma dessas imagens está no repositório; todas dependem de terceiros:

| Host | Refs | Risco |
|---|---|---|
| `i.imgur.com` | 475 | 🔴 apaga conteúdo antigo/inativo |
| `i.pinimg.com` | 23 | 🟡 bloqueia hotlink às vezes |
| `media.tenor.com` + `media1` + `c.tenor` | 44 | 🟡 |
| `i.ibb.co` | 21 | 🟡 |
| `files.d20.io` | 9 | 🔴 **URL com timestamp — expira** |
| outros (tumblr, gifer, redd.it…) | ~136 | 🟡 |

Casa com o que o `relatorio-foundry.md` já apontava.

**Feito:** criado o `tools/check-hotlinks.mjs` — varre `.js`/`.html`/`.css`, extrai as URLs de
imagem externas e testa cada uma (`HEAD`, com fallback para `GET` parcial em hosts que recusam
`HEAD`; detecta também o placeholder que o Imgur devolve com status 200 quando a imagem foi
removida). Reporta o arquivo e a linha de cada link quebrado e sai com código 1, o que permite
plugar em CI.

```bash
node tools/check-hotlinks.mjs                # verifica os 630
node tools/check-hotlinks.mjs --list         # só inventário, sem rede
node tools/check-hotlinks.mjs --host i.imgur.com --json rel.json
```

⚠️ **A varredura completa ainda não foi executada:** o sandbox onde a auditoria rodou bloqueia
tráfego para esses hosts (todas as URLs dão "erro de rede", inclusive as sabidamente boas). A
lógica foi validada contra um servidor local controlado — acerta o 200, pega o 404 e faz o
fallback de `HEAD` para `GET`. **Rode na sua máquina** para obter o resultado real.

---

## 🟡 MÉDIA — 5. Segurança: CDNs sem SRI — ✅ CORRIGIDO (parcial)

Nenhuma tag de CDN tinha `integrity`. Se um CDN for comprometido, o código malicioso executa com
acesso total às fichas no `localStorage`.

**Feito — 17 tags protegidas** com `integrity` + `crossorigin="anonymous"` +
`referrerpolicy="no-referrer"`, cobrindo jsDelivr (`/npm/`) e unpkg:
Bootstrap 5.3.2 (JS e CSS), Bootstrap 5.3.3 (CSS), Bootstrap Icons 1.11.1 e 1.11.3,
SortableJS 1.15.0 e PeerJS 1.5.4.

Também **fixada a versão do pdf-lib**: era `unpkg.com/pdf-lib/...` (sempre a última publicada),
o que é incompatível com SRI e já era um risco por si só — qualquer release nova entraria no
projeto sem revisão. Agora é `pdf-lib@1.17.1`.

Como os hashes foram obtidos: o sandbox bloqueia as CDNs e as APIs de SRI, então baixei os
**pacotes oficiais do npm** (`npm pack`) e calculei `sha384` sobre os arquivos exatos que
jsDelivr `/npm/` e unpkg servem verbatim. Validação cruzada: os valores gerados para o Bootstrap
5.3.2 conferem com os que o próprio projeto Bootstrap publica na documentação.

**Pendente** — 12 arquivos usam `cdnjs.cloudflare.com` (Font Awesome, Sortable, JSZip, html2pdf).
O cdnjs tem pipeline de build própria e **não** serve os bytes do npm; como não consigo acessá-lo
daqui, gerar o hash a partir do npm produziria um `integrity` **errado, que quebraria o site**.
Preferi não arriscar. Para completar, rode em uma máquina com rede:

```bash
curl -s https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.15.0/Sortable.min.js \
  | openssl dgst -sha384 -binary | openssl base64 -A
```

Fica também a recomendação anterior de **padronizar o Sortable** (hoje convivem 1.15.0 e 1.15.2).

> ✅ **O que está certo:** o chat P2P escapa corretamente. `escHTML()` (linha 61) cobre `& < > " '`,
> e `formatChatText()` **escapa antes** de aplicar o markdown — ordem correta, sem brecha de XSS.
> São 148 usos de `escHTML` no `app.js`. O mestre também valida posse do token antes de aceitar
> movimento (`t.controlledBy === conn.peer`, linha 1053) — não dá para mover peça alheia.

---

## 🟡 MÉDIA — 6. `LICENSE` e `.nojekyll`

- ✅ **`.nojekyll` criado.** No GitHub Pages o Jekyll ignora pastas iniciadas por `_`; hoje não há
  nenhuma, mas o arquivo vazio é barato e evita um bug futuro difícil de diagnosticar.
- ⏸️ **`LICENSE` não foi criado — precisa de decisão do dono do projeto.** Escolher uma licença é
  um ato jurídico, e há dois complicadores concretos:
  1. **Autoria de terceiro.** Vários módulos creditam **Nicholas Lemos** (assinatura e LinkedIn em
     `index.html`, `ficha/`, `poderes/`, `calculadora/` e outros), e a `ficha/` aponta para
     `arsenal-delta.vercel.app`. Não dá para licenciar código de outra pessoa sem o acordo dela.
  2. **Conteúdo derivado de Tormenta 20** (Jambô Editora) — o próprio `STR/index.html` traz o aviso
     de "material gratuito não-oficial, feito por fãs". Uma licença permissiva no repositório todo
     poderia sugerir, incorretamente, que os dados de regras também estão liberados.

  Caminho sugerido: licenciar **o código** (ex.: MIT ou AGPL-3.0, se quiser impedir uso fechado),
  manter os **dados de T20** sob aviso de fan content, e alinhar com o Nicholas antes de publicar.

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
- ~~3 links `target="_blank"` sem `rel="noopener"`~~ → ✅ corrigidos (só os **externos**; os
  internos não oferecem risco de `window.opener` e foram deixados como estavam)
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
6. ~~SRI nas CDNs~~ — ✅ feito nas 17 tags de jsDelivr/unpkg; **faltam as 12 do cdnjs**
   (exige rede para gerar o hash correto) + padronizar a versão do Sortable
7. ~~Verificador automático de hotlinks~~ — ✅ `tools/check-hotlinks.mjs` criado;
   **falta rodar** a varredura real fora do sandbox
8. Decidir a licença (ver seção 6) — envolve conversar com o Nicholas Lemos
9. Mapas do VTT em IndexedDB (resolve a raiz do bug nº 1)
10. Remover os 19 `console.log`
