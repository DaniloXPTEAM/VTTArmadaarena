# 📋 Handoff — o que já foi feito no VTTArmada

**Última sessão:** 2026-09-10 · **Estado:** tudo mergeado na `main`, exceto a `LICENSE`.

---

## Situação em uma frase

O site **já está atualizado e corrigido na `main`** (commit `e8e969f`, via PR #1).
Falta publicar **apenas a licença** — 1 arquivo novo + 2 pequenas edições.

---

## O que JÁ ESTÁ na `main` do GitHub ✅

Tudo isto foi mergeado no PR #1 e está no repositório:

1. **Reorganização** — os arquivos saíram de `VTTArmada/` para a raiz (382 renames, histórico
   preservado). Removidos o `VTTArmada.zip` (25 MB) e a pasta `work/` (113 arquivos de scratch).
2. **🔴 Bug corrigido — cenas do VTT sumiam em silêncio.** `Vtt/app.js`: `_setCenas` engolia
   `QuotaExceededError` com `catch(e) {}`. Como o mapa é salvo em base64 e o `localStorage` tem
   ~5 MB, a cena era perdida sem aviso. Agora avisa por `toast`, loga e retorna `false` — e os
   4 chamadores checam o retorno (antes exibiam "Cena salva!" mesmo quando falhava).
3. **🔴 Bug corrigido — `campanha/index.html`** estava sem `charset`, `viewport` e `title`.
4. **Código morto removido** (−8 MB): `ficha/ameacas_db.js` e `ficha/spells_db.js` (órfãos, nada
   os carregava), fonte e 6 ícones duplicados de `assets/`, e a pasta `uploads/`.
5. **SRI em 17 tags** de CDN (jsDelivr `/npm/` e unpkg) + `pdf-lib` fixado em `@1.17.1`.
6. **`.nojekyll`**, `rel="noopener"` nos 3 links externos.
7. **`AUDITORIA.md`** — relatório técnico completo.
8. **`tools/check-hotlinks.mjs`** — verificador de links de imagem quebrados.

**Resultado:** 500 → 378 arquivos · 68 MB → 30 MB · 0 erro de sintaxe · 23/23 módulos OK.

---

## O que FALTA publicar ⏳

A `AUDITORIA.md` e o `README.md` **já estão na `main`** — só precisam de duas pequenas
atualizações relativas à licença. E a `LICENSE` precisa ser criada.

### 1. Criar `LICENSE` (arquivo novo, na raiz)

MIT com copyright de **Danilo Silva** e **Nicholas Lemos**, escopo limitado ao código, mais o
aviso de fan content:

> Material gratuito não-oficial, feito por fãs, liberado uso para esse fim pelo Guilherme,
> em grupo oficial do discord.

(O conteúdo completo do arquivo está neste repositório, na raiz.)

### 2. `README.md` — acrescentar no final

```markdown
## 📄 Licença e créditos

O **código** deste repositório está sob **licença MIT** — veja o arquivo [`LICENSE`](LICENSE).

Copyright (c) 2026 **Danilo Silva** e **Nicholas Lemos**.

### Conteúdo de Tormenta 20

> Material gratuito não-oficial, feito por fãs, liberado uso para esse fim pelo
> Guilherme, em grupo oficial do discord.

Tormenta 20 é uma obra da **Jambô Editora**. Este projeto não é oficial e não tem
orientação nem aprovação da editora. As regras, criaturas, magias e demais
elementos de jogo pertencem aos seus respectivos detentores de direitos, e **não
são cobertos pela licença MIT** — ela vale para o código (HTML, CSS, JS).
```

### 3. `AUDITORIA.md` — item 6 vira "✅ RESOLVIDO"

Trocar a seção que diz *"LICENSE não foi criado — precisa de decisão do dono"* por: licença MIT
criada, com créditos a Danilo Silva e Nicholas Lemos e aviso de fan content autorizado pelo
Guilherme no Discord.

---

## Backlog (precisa de acesso à internet — não deu para fazer no sandbox)

| # | Tarefa | Por que ficou pendente |
|---|---|---|
| 1 | **SRI nas 12 tags do `cdnjs`** | O cdnjs tem pipeline de build própria e **não** serve os bytes do npm. Gerar o hash a partir do npm produziria um `integrity` errado, que **quebraria o site**. Precisa de: `curl -s <url> \| openssl dgst -sha384 -binary \| openssl base64 -A` |
| 2 | **Rodar `node tools/check-hotlinks.mjs`** | São 630 hotlinks (475 no Imgur, 9 no `files.d20.io` com URL que expira). O sandbox bloqueia esses hosts. A lógica foi validada contra servidor local. |
| 3 | Padronizar o Sortable | Convivem as versões 1.15.0 e 1.15.2 |
| 4 | Mapas do VTT em **IndexedDB** | Resolve a raiz do bug nº 1 (hoje só avisa; o teto de 5 MB continua) |
| 5 | Remover 19 `console.log` | Cosmético |

---

## Avisos para quem continuar

- **`ficha/` é sensível** — esqueleto complexo e funcional (Regra 1 do README).
- **Bancos canônicos:** ameaças em `ameacas/db/`, magias em `grimorio/spells_db.js`.
  Nunca duplicar (foi exatamente esse o problema resolvido no item 4).
- **Guarde o print da autorização do Guilherme** no Discord. A licença cita a permissão, mas o
  comprovante arquivado é o que a sustenta se alguém questionar.
- O ambiente da sessão anterior **rebobinou o branch várias vezes** para o `Initial commit`.
  Se acontecer, o conteúdo continua no disco: basta `git add -A` e commitar de novo (conferindo
  antes se o commit está indo com o pai correto).
