# Auditoria — 4 módulos Foundry T20 → VTTArmada

**Data:** 2026-09-09 · **Tipo:** somente-leitura (nada foi adicionado ao projeto) · **Método:** clones temporários + leitor LevelDB próprio (`work/leveldb_read.py`), que decodificou 100% dos 12 compêndios (formato Foundry v13: LevelDB com chaves `!coleção!id`, valores JSON, blocos Snappy).

## 1. Veredito em 30 segundos

| Repositório | Conteúdo real | Licença | Serve p/ nós? |
|---|---|---|---|
| `gbavieira/t20-zaperas-automations` (MIT ✓) | 6 macros + 13 handlers de automação (~50 KB JS) | MIT — pode usar/adaptar | 🟡 Só como **ideia/lógica** — código é 100% API Foundry, precisa reescrever |
| `mobguilherme/Bestiario-de-Arton` | **525 fichas de NPC (~505 criaturas)** + 154 itens avulsos | ⚠️ **SEM licença** | 🟢 Schema mapeável p/ nossa `AMEACAS_DB` — mas **496/505 nomes já existem na nossa DB**; valor real = retratos/tokens |
| `mobguilherme/Suplementos-de-Arton` | **~2.300 itens** (poderes, magias, raças, classes, equipamentos) | ⚠️ **SEM licença** | 🟡 Útil p/ poderes/magias — mas ficha é intocável; fica p/ fase futura |
| `mobguilherme/Revista-T20-Fullgor-dos-Deuses` | 9 aventuras = **54 cenas + 82 atores + 46 handouts** (diários só-imagem, sem texto da história) | ⚠️ **SEM licença** | 🟢 **É o "mapa pronto" que você quer** — mas as imagens são hotlinks, não arquivos |

**Resposta direta ao seu pedido:** os mapas prontos e as ameaças existem e são tecnicamente aproveitáveis, mas (a) nenhuma imagem vem junto — tudo é link externo (Imgur, ImgBB, `rpg-archive`); (b) 3 dos 4 repos não têm licença — o correto é pedir autorização ao autor antes de puxar qualquer coisa.

## 2. Inventário completo (documentos de topo + embutidos)

| Pack | Atores NPC | Itens | Outros |
|---|---|---|---|
| Bestiario `bestiario-de-arton` | 442 | 677 embutidos (armas/poderes/magias) | 32 pastas |
| Bestiario `ameacas-livro-basico` | 83 | 263 embutidos | 9 pastas |
| Bestiario `habilidades-do-bestiario` | — | 12 armas + 71 poderes | 17 pastas |
| Suplementos `herois-de-arton` | — | 774 (550 poderes, 114 equip., 36 armas, 22 cons., 15 magias, 19 tes., 13 classes, 5 raças) | 149 pastas |
| Suplementos `ameacas-de-arton` | — | 442 (278 poderes, 41 raças, 19 armas, 25 cons., 18 equip., 8 magias) | 70 pastas |
| Suplementos `distincoes` | — | 470 (466 poderes) | 75 pastas |
| Suplementos `deuses-de-arton` | — | 300 (133 poderes, 55 equip., 41 armas, 36 cons., 30 magias) | 44 pastas |
| Suplementos `guia-de-npcs-and-dbs` | — | 181 | 19 pastas |
| Suplementos `atlas-de-arton` | — | 73 | 2 pastas |
| Suplementos `guia-de-deuses-menores` | — | 60 poderes | 1 pasta |
| Revista (9 Adventures) | 82 | ~22 | 54 cenas, 46 diários-imagem, 8 tabelas |
| zaperas `zaperas-macros` | — | — | 6 macros (1,3–8,3 KB cada) |

## 3. Os mapas prontos (Revista Fulgor dos Deuses)

As 9 aventuras da revista, cada uma com cenas dimensionadas + grade + fundo:

| Aventura | Cenas | Exemplos (larg×alt, grade px) |
|---|---|---|
| Campeões e Condenados | 4 | Coração das Tempestades 2539×3248 g100; Encontro Harpias 1080×810 g70… |
| Glória à Humanidade | 8 | Cela 2401×3001; Guardião Carvarel 4200×4900 (sem grade); Ritual Fullgori 2469×3549 g155… |
| A Cripta de Keenn | 13 | 13 mapas (438×532 até 2800×1236), quase todos g100 |
| Forja das Cinzas | 5 | até 3072×4096, grades 70–150 |
| Promessa de Cinzas | 9 | até 3686×3686, g100 |
| Aço e Arcano | 3 | 3386×4331 g150 |
| Dia e Noite | 4 | até 2539×3248, grades 70–150 |
| O Jardim e o Tumor | 5 | até 2539×3248 |
| Dor Profunda | 3 | 5079×6496 (!!) grades 150–200 |

Pontos críticos:
- **Fundos = 32× `raw.githubusercontent.com/mobguilherme/rpg-archive` + 22× `i.imgur.com`. Zero arquivos locais** (nem no git, nem nos .zips de release).
- **Nenhuma cena tem tokens pré-posicionados** (0/54) — o mestre posiciona tudo na hora.
- 4 cenas são *gridless* (sem grade); grades variam de 70 a 200 px; mapas grandes (até 5079×6496 px — pesados p/ web, precisam de redimensionamento ou carregamento progressivo).
- Diários são **handouts de imagem** (`page type=image`, texto vazio) — a história da aventura NÃO vem junto, como o próprio README avisa.
- Tabela completa com URLs em `work/revista_scenes.json` (54 linhas — semente do futuro seletor de mapas).

## 4. Bestiário × nossa `AMEACAS_DB`

Comparação por nome normalizado (sem acento/maiúsculas):

| | Qtd |
|---|---|
| Nossa DB (`ameacas/db/ameacas_db.js`) | 620 entradas |
| NPCs Foundry (2 packs) | 525 fichas ≈ 505 criaturas |
| **Em ambos** | **496** |
| Só nossos | 115 |
| Só Foundry (9: 8 variantes de lefeu + Gatzvalith, Lorde da Tormenta) | 9 |

Ou seja: **conversão em massa não traz criaturas novas** — o ganho está nos **retratos/tokens** (439 NPCs têm token com URL http) e no detalhe das fichas. Mapeamento de campos validado com amostra real (Avatar de Aharadak, ND 20):

| Nossa `AMEACAS_DB` | Foundry NPC (`system.*`) | Status |
|---|---|---|
| nome | `name` | ✓ direto |
| nd | `system.nd` (string) | ✓ direto |
| pv / pm | `system.attributes.pv.max` / `pm.max` | ✓ direto |
| defesa (+obs) | `system.attributes.defesa` (base/atributo/outros) | ✓ compor |
| fort/ref/von | `system.modificadores.*` (a confirmar chave exata) | ~ quase |
| atributos | `system.atributos.{for,des,con,int,sab,car}.base` | ✓ direto |
| pericias | `system.pericias.*` (códigos `acro/ades…` → traduzir) | ✓ c/ tabela |
| ataques | `system.detalhes.ataquescac/ataquesad` (texto) + itens `arma` embutidos | ✓ texto + estruturado |
| habilidades | itens `poder`/`magia` embutidos | ✓ |
| percepcao/desloc/iniciativa/tesouro/fonte | `detalhes.movimento/tesouro/origem`, sentidos em `prototypeToken` | ~ parcial |
| **img/token (NOVO p/ nós)** | `img` + `prototypeToken.texture.src` + `width/height` | ✓ hotlinks |

## 5. Imagens: o quadro completo

Todas as imagens dos 4 módulos são **hotlinks** — nenhuma vem em arquivo:

| Host | Referências | Conteúdo |
|---|---|---|
| `i.imgur.com` | ~1.800 | tokens, retratos, 22 fundos de cena |
| `raw.githubusercontent.com/mobguilherme/rpg-archive` | ~110 | 32 fundos de cena + tokens da revista |
| `i.ibb.co` / `i.postimg.cc` | ~42 | tokens do bestiário |
| `files.d20.io` (CDN do Roll20, URL com timestamp!) | 18 | tokens — **podem expirar** |
| `icons/*`, `systems/*` | ~6.000 | placeholders do Foundry/system T20 — **quebram fora do Foundry** |
| `worlds/*` (3) + 1 filename puro | 4 | paths locais do PC do autor — **quebrados** |

Riscos: *link rot* (autor pode apagar), Imgur apaga conteúdo antigo/inativo, uso offline impossível, `files.d20.io` com query de tempo. Nosso VTT desenha em `<img>`/canvas — exibição direta funciona, mas exportar cena p/ PNG pode sofrer com CORS (*canvas tainting*) — a confirmar no código do `mapDataUrl`.

## 6. Licenças e direitos — atenção ⚠️

1. **Só o zaperas tem licença (MIT).** Os 3 repos do mobguilherme **não têm licença** = todos os direitos reservados. Mesmo hotlinkando (sem copiar), exibir esse conteúdo num hub público sem permissão é arriscado — recomendo pedir autorização por escrito (posso redigir a mensagem).
2. **`rpg-archive` (onde moram os 32 fundos de cena, ~200 MB) também não tem licença nem descrição.**
3. **Conteúdo derivado dos livros da Jambô** (textos de poderes, magias, regras, NDs). A comunidade tolera compêndios gratuitos de T20, mas nosso hub é público — risco baixo, porém real. Mitigação: manter campo `fonte` e, se preferir, importar só números/nomes, sem descrições longas.
4. **Mapas da revista vêm de reddit/Facebook** (diz o `credits.md`) — autoria difusa, direitos nebulosos.

## 7. Compatibilidade técnica

- ✅ Formato dos packs 100% legível (ferramenta própria reutilizável p/ atualizar no futuro).
- ✅ Cenas Foundry → nosso modelo: `nome + bg + w/h + grade` casa direto com `mapDataUrl`/`criarNovaCena`.
- ✅ NPC → token: `criarTokenDoBestiario` já existe; `prototypeToken.width/height/disposition` mapeiam p/ tamanho/lado.
- 🟡 Macros/handlers zaperas (testes de resistência automáticos, dano de queda, 0 PV, magias sustentadas, relógio de Tibares…): lógica aproveitável, código 100% Foundry (`canvas`, `ui`, `DialogV2`, módulo Item Piles) — portar = reescrever do zero.
- ❌ Nada do system T20 (`systems/…`, automações `flags/automationtags`) transfere — nosso VTT tem engine própria.

## 8. Proposta de integração (após permissão do autor)

- **Fase A — Mapas preset no VTT (o que você pediu):** gerar `MAPAS_PRESET` a partir de `work/revista_scenes.json` (nome, aventura, URL, dimensões, grade) + seletor "mapa do mestre" plugado no `mapDataUrl` existente; placeholder elegante se a URL estiver morta; redimensionar os gigantes (5k px).
- **Fase B — Retratos/tokens nas ameaças:** acrescentar `img`/`token` à `AMEACAS_DB` nos 496 cruzamentos + importar os 9 novos; escala via `width/height`.
- **Fase C — Suplementos (futuro, ficha intocável agora):** poderes/magias/raças ficam de fora do VTT; reavaliar se um dia a ficha entrar em reforma.
- **Fase D — Ideias zaperas (fila):** dano de queda, condições em 0 PV, testes opostos — reescritos p/ nossa engine.
- **Decisão de hospedagem:** hotlink direto (zero MB, frágil) × espelho local em `assets/` (robusto, pesado, é redistribuição — exige a permissão do item 6).

## 10. Adendo — Suplementos × nosso conteúdo (2026-09-09)

Cruzamento nome-a-nome entre os 2.236 itens dos Suplementos e nossas ferramentas irmãs da ficha (`calculadora/racas.js`, `poderes/js/*`, `parceiros/`, `itens/data/*`, `ficha/spells_db.js`). A tool `ficha/` em si só embute magias (259 ✓) e ameaças — raças/classes/poderes moram nas tools irmãs (a `forja` consome `poderes/js/data.js`).

| Categoria | Sup | Nós | Cobertos | Faltando p/ nós |
|---|---|---|---|---|
| Raças | 47 | 67 | 46 ✓ (Mashin existe como chassi de golem; Fintroll/Elfo-do-Mar = grafia) | ~0 |
| Classes + variantes | 17 | 19 + 19 | 16 ✓ | 1 (Melhor Amigo) |
| Hab. classe-base / concedidos / combate / destino / magia / grupo / complicação | 319 | — | 313 ✓ | ~6 |
| Tormenta | 6 | 25 | 3 | 3 |
| Místico / Samurai / Treinador (habilidades) | 119 | parciais | ~46 | ~90 |
| Raciais | 353 | embutidos em `racas.js` | ~107 | ~200 (37 são `Atributos - X` estruturais do Foundry) |
| Hab. de distinção/variante (nomes avulsos) | 660 | 64 distinções estruturadas c/ marca | ~150 | ~510 nomes |
| Montaria/parceiro/familiar | 92 | 132 | 63 | ~29 exóticos |
| Armadilha/inovação (Inventor) | 25 | 0 | 0 | 25 |
| Mundana / sem subtipo (incl. pacote vampiro, implantes) | 67 | 0 | ~19 | ~48 |
| Magias | 54 | 259 | 52 ✓ | 2 (1 sem descrição; 1 real: Controlar Ar, 2º círculo) |
| Distinções (nomes) | ~74 | 64 | 55 | ~15 (alguns typos deles) |
| Origens | 0 docs | 161 (68 atlas) | tudo ✓ | 0 |
| Armas / equipamentos / consumíveis / tesouros | 425 | 448 (núcleo) | ~13 | ~410 (livros de expansão) |

Conclusão: núcleo do T20 essencialmente completo (e em várias categorias temos mais que eles); expansões (Heróis/Ameaças/Atlas/DB) parciais — as lacunas reais são equipamentos de expansão (~410), listas de Místico/Samurai, habilidades de distinção avulsas e poderes raciais.

`leveldb_read.py` (leitor reutilizável), `vendor_dump.py`, `vendor_deep.py`, `revista_scenes.json` (54 cenas c/ URLs), `revista_actors.json` (82), `bestiario_tokens.json` (506 NPCs → img/token/ND), `npc_sample.json`, `poder_sample.json`, `zap_sample.js`. Os clones temporários em `vendor-review/` foram apagados após a extração.
