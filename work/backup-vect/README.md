# 🏰 VTTArmada do Mestre — Tormenta20

Hub de ferramentas para mestres e jogadores de **Tormenta20**: fichas, bestiário,
grimório, geradores, VTT e mais — tudo em um único repositório estático
(HTML + CSS + JS puro, sem build, sem backend).

- **Hub:** `index.html`
- **Hospedagem:** qualquer estático (GitHub Pages, Vercel, Netlify)
- **Rodar local:** `python -m http.server` na raiz e abrir `http://localhost:8000`
  (alguns módulos usam `fetch`/módulos que exigem `http://`, não `file://`)

## 🗂️ Estrutura

```
index.html              ← hub com os 22 cartões de ferramentas
assets/
  fonts/                ← Tormenta.ttf (cópia ÚNICA oficial)
  imagens/              ← ícones de atributo (cópia ÚNICA oficial)
  templates/
    themes.css          ← variáveis + estilos dos 3 temas
    theme-init.js       ← lógica de tema compartilhada (chave t20_theme)
    template.html       ← modelo para criar um módulo novo
ameacas/db/             ← BANCO CANÔNICO de ameaças (ameacas_db.js, jornadas.js,
                           guerra.js, duelo_dragoes.js) — todos importam daqui
grimorio/spells_db.js   ← BANCO CANÔNICO de magias — todos importam daqui
ficha/                  ← Ficha T20 (módulo sensível: ver aviso abaixo)
forja/                  ← Forja de Heróis (sistema de tema próprio/Bootstrap)
<modulo>/                ← cada ferramenta: index.html + script.js + style.css
```

## ⚠️ Regras do repositório (não quebre!)

1. **`ficha/` é intocável sem cuidado extra** — esqueleto complexo e funcional.
   Ela usa os bancos canônicos (`../ameacas/db/`, `../grimorio/spells_db.js`)
   mas mantém cópias locais legadas que NÃO devem ser removidas.
2. **Não duplique bancos de dados.** O canônico de ameaças vive em
   `ameacas/db/` e o de magias em `grimorio/spells_db.js`. Importe por
   caminho relativo (`../ameacas/db/ameacas_db.js`).
3. **Não duplique a fonte nem os ícones.** Use `../assets/fonts/` e
   `../assets/imagens/`.
4. **Tema é compartilhado.** Todo módulo com botões `.theme-btn`
   (`blood`/`dark`/`classic`) deve carregar apenas:
   ```html
   <script src="../assets/templates/theme-init.js"></script>
   ```
   e NÃO ter código próprio de tema. Exceções: `ficha/` e `forja/`
   (sistemas próprios, já funcionais).
5. **Sem URLs absolutas** para o próprio projeto — sempre caminhos relativos.

## 🎨 Temas

Três temas em todo o site, sincronizados pela chave `t20_theme` do
localStorage (inclusive entre abas abertas):

| Tema | Classe | Estilo |
|---|---|---|
| 🩸 Sangue (padrão) | `theme-blood` | Vinho escuro, vermelho vivo |
| 🌑 Sombras | `theme-dark` | Azul-slate, dourado |
| 📜 Clássico | `theme-classic` | Claro, pergaminho |

## 🧰 Módulos

Ficha T20 · Forja de Heróis · VTT · Combate · Dados · Missões (campanha) ·
Perigos Complexos · Inventário (itens) · Poderes · Grimório · Ameaças ·
Montarias e Parceiros · Compêndio de Arton · Calc. Atributos · Calc. de ND ·
Encontros Aleatórios · Espólio · Gerador de Ameaças · Golpe Pessoal ·
STR (Breves Jornadas) · NPCs (libertacao) · Macros Roll20.
