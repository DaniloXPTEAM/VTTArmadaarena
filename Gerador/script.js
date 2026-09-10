/* ==========================================================================
   FORJADOR DE AMEAÇAS — Tormenta20
   script.js  |  Gerador/
   ========================================================================== */

/* ================= DADOS DAS TABELAS 2-3 A/B/C =================
   Ordem das colunas: [ataque, dano, defesa, resForte, resMedia, resFraca, pv, cd]
   ================================================================ */
const NDS = ["1/4","1/2","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","S","S+"];

const TABLES = {
  solo: {
    "1/4":[6,8,11,3,0,-2,7,12],   "1/2":[7,10,14,6,3,-1,15,13],
    "1":[9,15,16,11,5,0,35,14],   "2":[12,18,19,13,7,2,70,16],
    "3":[14,21,21,15,9,3,105,17], "4":[16,24,23,16,10,4,140,18],
    "5":[17,40,24,17,11,5,200,20],"6":[20,56,27,18,12,6,240,22],
    "7":[24,62,31,20,14,7,280,24],"8":[26,68,33,21,15,8,320,26],
    "9":[27,74,34,21,15,9,360,28],"10":[29,80,36,22,16,10,400,30],
    "11":[34,130,41,24,18,11,550,31],"12":[36,144,43,26,20,12,600,33],
    "13":[37,158,44,26,20,13,650,35],"14":[39,172,46,28,22,14,700,38],
    "15":[43,186,50,28,22,15,750,40],"16":[46,200,53,30,24,16,800,42],
    "17":[47,270,54,30,24,17,1020,44],"18":[49,288,56,32,26,18,1080,47],
    "19":[52,306,59,32,26,19,1140,47],"20":[54,324,61,34,28,20,1200,49],
    "S":[58,360,65,36,30,22,2500,51],"S+":[65,500,70,38,33,25,4000,55]
  },
  lacaio: {
    "1/4":[7,9,10,2,0,-1,4,12],  "1/2":[9,11,13,5,3,0,6,13],
    "1":[11,17,15,10,5,1,9,14],  "2":[14,21,18,12,7,3,14,16],
    "3":[16,24,20,14,9,4,21,17], "4":[17,32,22,15,10,5,28,18],
    "5":[20,56,23,16,11,6,40,20],"6":[24,62,26,17,12,7,48,22],
    "7":[26,68,30,19,14,8,56,24],"8":[27,74,32,20,15,9,64,26],
    "9":[29,80,33,20,15,10,72,28],"10":[34,105,35,21,16,11,80,30],
    "11":[36,144,40,23,18,12,110,31],"12":[37,158,42,25,20,13,120,33],
    "13":[39,172,43,25,20,14,130,35],"14":[43,186,45,27,22,15,140,38],
    "15":[46,200,49,27,22,16,150,40],"16":[47,235,52,29,24,17,160,42],
    "17":[49,288,53,29,24,18,204,44],"18":[52,306,55,31,26,19,216,47],
    "19":[54,324,58,31,26,20,228,47],"20":[56,344,60,33,28,21,240,49],
    "S":[60,385,64,35,30,23,500,51],"S+":[67,540,69,37,33,26,800,55]
  },
  especial: {
    "1/4":[4,8,11,3,0,-2,5,14],  "1/2":[5,10,12,6,3,-1,11,15],
    "1":[7,15,14,11,5,0,25,16],  "2":[10,18,17,13,7,2,49,18],
    "3":[12,21,19,15,9,3,74,19], "4":[14,24,21,16,10,4,98,20],
    "5":[15,40,22,17,11,5,140,22],"6":[18,56,25,18,12,6,168,24],
    "7":[22,62,29,20,14,7,196,26],"8":[24,68,31,21,15,8,224,28],
    "9":[25,74,32,21,15,9,252,30],"10":[27,80,34,22,16,10,280,32],
    "11":[32,130,39,24,18,11,385,33],"12":[34,144,41,26,20,12,420,35],
    "13":[35,158,42,26,20,13,455,37],"14":[37,172,44,28,22,14,490,40],
    "15":[41,186,48,28,22,15,525,42],"16":[44,200,51,30,24,16,560,44],
    "17":[45,270,52,30,24,17,714,46],"18":[47,288,54,32,26,18,756,49],
    "19":[50,306,57,32,26,19,798,49],"20":[52,324,59,34,28,20,840,51],
    "S":[55,360,63,36,30,22,1750,55],"S+":[60,500,67,38,33,25,2800,60]
  }
};

/* Tabela 2-2: deslocamento [lento, normal, rápido] em metros */
const DESLOC = {
  bipede:    { pequeno:[4.5,6,9],  medio:[6,9,12],   grande:[9,12,15]  },
  quadrupede:{ pequeno:[6,9,12],   medio:[9,12,15],  grande:[12,15,18] },
  voador:    { pequeno:[12,15,18], medio:[15,18,24],  grande:[18,24,36] },
  escalador: { unico:[4.5,9,12] },
  escavador: { unico:[4.5,6,9]  },
  nadador:   { unico:[9,15,24]  }
};
const TAMANHO_FAIXA = {
  "Minúsculo":"pequeno","Pequeno":"pequeno","Médio":"medio",
  "Grande":"grande","Enorme":"grande","Colossal":"grande"
};

/* ============= Habilidades sugeridas ============= */
function habilidadesSugeridas(role, nd) {
  const patamar = patamarDe(nd);
  const faixaPorPatamar = { iniciante:1, veterano:2, campeao:3, lenda:4, lplus:5 };
  const n = faixaPorPatamar[patamar] || 1;
  if (role === "especial") return `Sugestão: cerca de ${n*2}–${n*3} habilidades para este patamar (especiais recebem mais).`;
  return `Sugestão: cerca de ${n}–${n*2} habilidades para este patamar.`;
}
function patamarDe(nd) {
  if (["1/4","1/2","1","2","3","4"].includes(nd)) return "iniciante";
  if (["5","6","7","8","9","10"].includes(nd))    return "veterano";
  if (["11","12","13","14","15","16"].includes(nd)) return "campeao";
  if (["17","18","19","20"].includes(nd))           return "lenda";
  return "lplus";
}

/* ============= Funções narrativas (Passo 0) ============= */
const FUNCOES = {
  combatente: {
    nome: "Combatente", papelSugerido: "solo",
    texto: "Planejada para ser eficiente em combate; especializada em causar dano e resistir a ele. Geralmente tem valores ofensivos (ataque e dano) e defensivos (Defesa, PV) elevados, complementados por habilidades que aprimoram seus ataques ou a tornam mais resistente. Pode ser desde um mercenário até um animal predador, como um urso."
  },
  conjurador: {
    nome: "Conjurador", papelSugerido: "especial",
    texto: "Utiliza magias ou habilidades mágicas/especiais como sua principal forma de \"ataque\". Geralmente tem valores de ataque e dano baixos, mas conta com efeitos capazes de causar dano em área, impor condições ou afetar o terreno a seu favor. Pode ser um mago — como um necromante veterano — ou alguém com habilidades que geram efeitos variados, como um goblin engenhoqueiro."
  },
  trapaceiro: {
    nome: "Trapaceiro", papelSugerido: "especial",
    texto: "Combina ataques e habilidades para confundir ou prejudicar oponentes, geralmente se valendo do ambiente. Alternativamente, pode ser uma ameaça \"social\", capaz de enfrentar os personagens em cenas fora de combate, como um cortesão astuto ou um batedor de carteiras no mercado."
  },
  assecla: {
    nome: "Assecla", papelSugerido: "lacaio",
    texto: "Ameaça simples, feita para ser usada em grande quantidade. De forma geral, tem poucos pontos de vida e Defesa baixa, mas ataques e dano elevados. Não precisa ser \"fraca\" — a ideia é ter poucas habilidades e ações simples, para o mestre usar várias sem que o jogo fique lento."
  },
  capitao: {
    nome: "Capitão", papelSugerido: "solo",
    texto: "Planejada para liderar um grupo de asseclas. Pode ser uma versão superior dessas criaturas (um líder de bando goblin) ou um tipo diferente, ligado apenas tematicamente aos comandados (um elfo necromante liderando esqueletos). Geralmente combina traços de combatente, conjurador ou trapaceiro com habilidades para dar bônus aos asseclas ou controlar o campo de batalha."
  },
  chefao: {
    nome: "Chefão", papelSugerido: "solo",
    texto: "Planejada para enfrentar os personagens sozinha. Costuma ser mais complexa, com diversas habilidades de ataque, defesa e controle do campo de batalha, e precisa fazer vários ataques por rodada (ou afetar mais de uma criatura ao mesmo tempo) para não ser \"anulada\" por um único personagem resistente. Pode ter um tema para suas habilidades, como efeitos de gelo ou condições mentais."
  }
};

function updateFuncaoLore() {
  const key = document.getElementById('in-funcao').value;
  const box = document.getElementById('funcao-lore');
  if (!key) { box.style.display = "none"; return; }
  const f = FUNCOES[key];
  box.style.display = "block";
  box.innerHTML = `<strong>${f.nome}.</strong> ${f.texto} <em style="color:var(--ink-faint)">Papel de combate sugerido: ${f.papelSugerido}.</em>`;
}

/** Atualiza a badge de tema ativo no label do seletor */
function updateTemaBadge() {
  const key   = document.getElementById('in-tema')?.value || 'nenhum';
  const badge = document.getElementById('tema-badge');
  if (!badge) return;
  const tema = TEMAS[key];
  if (!tema) { badge.style.display = 'none'; badge.textContent = ''; return; }
  badge.style.display = 'inline';
  badge.textContent = tema.label;
}

/* ============= Estado global ============= */
let state = { role: "solo" };

/* ============= ND select ============= */
const ndSel = document.getElementById('in-nd');
NDS.forEach(nd => {
  const o = document.createElement('option');
  o.value = nd; o.textContent = "ND " + nd;
  ndSel.appendChild(o);
});
ndSel.value = "6";

function setRole(role) {
  state.role = role;
  document.querySelectorAll('.role-btn').forEach(b => b.classList.toggle('active', b.dataset.role === role));
  applyTableValues();
  renderSheet();
  renderAbilitySuggestions();
}

function applyTableValues() {
  const nd = ndSel.value;
  const row = TABLES[state.role][nd];
  const [ataque, dano, defesa, forte, media, fraca, pv, cd] = row;
  document.getElementById('st-defesa').value = defesa;
  document.getElementById('st-pv').value     = pv;
  document.getElementById('st-cd').value     = cd;
  document.getElementById('st-fort').value   = forte;
  document.getElementById('st-media').value  = media;
  document.getElementById('st-fraca').value  = fraca;
  document.getElementById('hint-habilidades').textContent = habilidadesSugeridas(state.role, nd);
  if (attackRows.length === 0) addAttack(ataque, dano);
  updateDanoTotalInfo();
}

/* ============= Deslocamento ============= */
function updateDeslocamentoOptions() {
  const loco   = document.getElementById('in-loco').value;
  const tamanho = document.getElementById('in-tamanho').value;
  const veloc  = document.getElementById('in-veloc').value;
  const idx = veloc === "lento" ? 0 : (veloc === "rapido" ? 2 : 1);
  let val;
  if (loco === "bipede" || loco === "quadrupede") {
    val = DESLOC[loco][TAMANHO_FAIXA[tamanho]][idx];
  } else if (loco === "voador") {
    val = DESLOC.voador[TAMANHO_FAIXA[tamanho]][idx];
  } else {
    val = DESLOC[loco]["unico"][idx];
  }
  document.getElementById('out-deslocamento').value = val + "m";
}

/* ============= Ataques ============= */
let attackRows = [];
let attackSeq  = 0;

const DICE_OPTS = [
  /* Tabela 3-2: Dano de Armas — todos os dados únicos, ordem crescente de média */
  {label:"1",    n:1, s:1  },  /* dano fixo 1 (média = 1)   */
  {label:"1d2",  n:1, s:2  },  /* média 1,5  */
  {label:"1d3",  n:1, s:3  },  /* média 2    */
  {label:"1d4",  n:1, s:4  },  /* média 2,5  */
  {label:"1d6",  n:1, s:6  },  /* média 3,5  */
  {label:"1d8",  n:1, s:8  },  /* média 4,5  */
  {label:"2d4",  n:2, s:4  },  /* média 5    */
  {label:"1d10", n:1, s:10 },  /* média 5,5  */
  {label:"1d12", n:1, s:12 },  /* média 6,5  */
  {label:"2d6",  n:2, s:6  },  /* média 7    */
  {label:"3d4",  n:3, s:4  },  /* média 7,5  */
  {label:"2d8",  n:2, s:8  },  /* média 9    */
  {label:"3d6",  n:3, s:6  },  /* média 10,5 */
  {label:"2d10", n:2, s:10 },  /* média 11   */
  {label:"3d8",  n:3, s:8  },  /* média 13,5 */
  {label:"4d6",  n:4, s:6  },  /* média 14   */
  {label:"3d10", n:3, s:10 },  /* média 16,5 */
  {label:"4d8",  n:4, s:8  },  /* média 18   */
  {label:"4d10", n:4, s:10 },  /* média 22   */
  {label:"4d12", n:4, s:12 },  /* média 26   (máximo da tabela) */
];

function addAttack(atkVal, targetAvg) {
  const id = attackSeq++;
  const last = attackRows[attackRows.length - 1];
  const novo = {
    id,
    nome: "Corpo a Corpo",
    atk: atkVal ?? (last?.atk ?? ""),
    dice: last?.dice ?? "1d8",
    qty: last?.qty ?? 1,
    target: targetAvg ?? (last?.target ?? ""),
    nota: ""
  };
  attackRows.push(novo);
  renderAttackList();
}
function removeAttack(id) {
  attackRows = attackRows.filter(r => r.id !== id);
  renderAttackList();
}
function attackDamageCalc(r) {
  /* Retorna o dano médio real de um ataque: (diceAvg + bonus) * qty */
  const avg  = diceAvg(r.dice);
  const tgt  = parseFloat(r.target);
  const qty  = parseInt(r.qty) || 1;
  if (!r.target || r.target === '' || isNaN(tgt)) return null;
  const bonus = Math.round(tgt - avg);  /* bônus fixo sugerido */
  const damagePerHit = Math.round(avg + bonus); /* = tgt arredondado */
  return { avg, bonus, qty, damagePerHit, total: damagePerHit * qty };
}
function renderAttackList() {
  const list = document.getElementById('atk-list');
  list.innerHTML = "";
  attackRows.forEach(r => {
    const card = document.createElement('div');
    card.className = "atk-card";
    card.id = `atk-card-${r.id}`;
    card.innerHTML = `
      <div class="atk-row">
        <div class="field"><label>Arma / ataque</label>
          <input value="${r.nome}" oninput="updateAttack(${r.id},'nome',this.value)"></div>
        <div class="field"><label>Valor de ataque</label>
          <input type="number" value="${r.atk}" oninput="updateAttack(${r.id},'atk',this.value)"></div>
        <div class="field"><label>Dado de dano</label>
          <select onchange="updateAttack(${r.id},'dice',this.value)">
            ${DICE_OPTS.map(d=>`<option value="${d.label}" ${d.label===r.dice?'selected':''}>${d.label}</option>`).join('')}
          </select></div>
        <div class="field atk-field-qty"><label>Qtd.</label>
          <input type="number" min="1" max="10" value="${r.qty ?? 1}" oninput="updateAttack(${r.id},'qty',this.value)"></div>
        <div class="field"><label>Média-alvo</label>
          <input type="number" value="${r.target}" placeholder="ex.: 19" oninput="updateAttack(${r.id},'target',this.value)"></div>
        <button class="remove-btn" onclick="removeAttack(${r.id})">✕</button>
      </div>
      <div class="atk-dmg-row" id="atk-dmg-${r.id}"></div>
      <div class="atk-row2">
        <div class="field"><label>Margem de ameaça / crítico / efeitos extras</label>
          <input value="${r.nota||""}" placeholder="ex.: 19/x3, mais 1d8 de ácido" oninput="updateAttack(${r.id},'nota',this.value)"></div>
      </div>
    `;
    list.appendChild(card);
    refreshAttackPreview(r);  /* preenche o preview após inserir no DOM */
  });
  updateDanoTotalInfo();
  renderSheet();
}
/* Atualiza apenas o preview de dano de um card específico (sem recriar o DOM) */
function refreshAttackPreview(r) {
  const el = document.getElementById(`atk-dmg-${r.id}`);
  if (!el) return;
  const calc = attackDamageCalc(r);
  if (calc) {
    el.style.display = '';
    el.innerHTML = `<span class="atk-dmg-preview">`
      + (calc.qty > 1 ? `${calc.qty}×` : '')
      + `${calc.damagePerHit} <span class="atk-dmg-eq">(${r.dice}${calc.bonus >= 0 ? '+' : ''}${calc.bonus})</span>`
      + (calc.qty > 1 ? ` = <b>${calc.total}</b>` : '')
      + `</span>`;
  } else {
    el.style.display = 'none';
    el.innerHTML = '';
  }
}
function updateAttack(id, field, value) {
  const r = attackRows.find(r => r.id === id);
  if (!r) return;
  r[field] = value;
  /* Só atualiza o preview e o total — não recria o DOM, preservando o foco */
  refreshAttackPreview(r);
  updateDanoTotalInfo();
  renderSheet();
}
function diceAvg(label) {
  const d = DICE_OPTS.find(d => d.label === label);
  if (!d) return 0;
  return d.n * (d.s + 1) / 2;
}
function bonusNeeded(target, diceLabel) {
  return Math.round(target - diceAvg(diceLabel));
}
/* Monta a string do ataque para exibição/cópia: "Nome" + qtd se >1, +atk, e dano */
function formatAttackLine(r) {
  const b       = r.target ? bonusNeeded(parseFloat(r.target), r.dice) : null;
  const danoTxt = b === null ? r.dice : `${r.dice}${b >= 0 ? ("+" + b) : b}`;
  const qty     = parseInt(r.qty) || 1;
  const qtyStr  = qty > 1 ? ` x${qty}` : "";
  const nota    = r.nota ? `, ${r.nota}` : "";
  return {
    nome: r.nome || "Ataque",
    atk: r.atk || "?",
    qtyStr,
    danoTxt,
    nota,
    line: `${r.nome || "Ataque"}${qtyStr} +${r.atk || "?"} (${danoTxt}${nota})`
  };
}
function updateDanoTotalInfo() {
  const nd = ndSel.value;
  const danoMeta = TABLES[state.role][nd][1];

  /* Calcula a soma real de todos os ataques configurados */
  let somaReal = 0;
  let todosCalculados = attackRows.length > 0;
  const partes = [];
  attackRows.forEach(r => {
    const calc = attackDamageCalc(r);
    if (calc) {
      somaReal += calc.total;
      const qty = calc.qty;
      partes.push(`${qty > 1 ? qty + '×' : ''}(${r.dice}${calc.bonus >= 0 ? '+' : ''}${calc.bonus})`);
    } else {
      todosCalculados = false;
    }
  });

  let somaHtml = '';
  if (attackRows.length > 0 && todosCalculados) {
    const diff = somaReal - danoMeta;
    const absDiff = Math.abs(diff);
    const pct = danoMeta > 0 ? absDiff / danoMeta : 1;
    let cls, icon;
    if (pct <= 0.05)       { cls = 'dmg-sum-ok';   icon = '✓'; }
    else if (pct <= 0.15)  { cls = 'dmg-sum-near'; icon = '≈'; }
    else                   { cls = 'dmg-sum-far';  icon = '⚠'; }
    const diffStr = diff === 0 ? '' : (diff > 0 ? ` (+${diff})` : ` (${diff})`);
    somaHtml = ` — <span class="${cls}"><b>${icon} Soma atual: ${somaReal}</b>${diffStr}</span>`;
    if (partes.length > 1) {
      somaHtml += `<span class="atk-dmg-formula"> [${partes.join(' + ')}]</span>`;
    }
  } else if (attackRows.length > 0 && !todosCalculados) {
    somaHtml = ` — <span class="dmg-sum-near">preencha todas as médias-alvo para ver a soma</span>`;
  }

  document.getElementById('dano-total-info').innerHTML =
    `Dano médio para ND ${nd} (${roleLabel()}): <b>${danoMeta}</b>${somaHtml}`;
}
function roleLabel() {
  return state.role === "solo" ? "Solo" : (state.role === "lacaio" ? "Lacaio" : "Especial");
}

/* Divide o dano médio da tabela igualmente entre todos os ataques configurados.
   Considera a qtd de cada ataque: target = (danoTotal / soma de qty) arredondado. */
function distributeTarget() {
  if (attackRows.length === 0) {
    addAttack();
  }
  const nd = ndSel.value;
  const danoMeta = TABLES[state.role][nd][1];
  const somaQty = attackRows.reduce((s, r) => s + (parseInt(r.qty) || 1), 0);
  if (somaQty <= 0) return;
  const perHit = Math.round(danoMeta / somaQty);
  attackRows.forEach(r => { r.target = perHit; });
  renderAttackList();
}

/* ============= Habilidades ============= */
let abilityRows = [];
let abilitySeq  = 0;

function addAbility() {
  abilityRows.push({ id: abilitySeq++, nome:"", magica:false, texto:"" });
  renderAbilityList();
}
function removeAbility(id) {
  abilityRows = abilityRows.filter(r => r.id !== id);
  renderAbilityList();
}
function renderAbilityList() {
  const list = document.getElementById('ability-list');
  list.innerHTML = "";
  abilityRows.forEach(r => {
    const item = document.createElement('div');
    item.className = "ability-item";
    item.innerHTML = `
      <div class="field-row">
        <div class="field" style="flex:2"><label>Nome</label>
          <input value="${r.nome}" oninput="updateAbility(${r.id},'nome',this.value)"></div>
        <div class="field small"><label>Mágica?</label>
          <select onchange="updateAbility(${r.id},'magica',this.value)">
            <option value="0" ${!r.magica?"selected":""}>Não</option>
            <option value="1" ${r.magica?"selected":""}>Sim ✦</option>
          </select></div>
        <button class="remove-btn" onclick="removeAbility(${r.id})">✕</button>
      </div>
      <div class="field-row">
        <div class="field" style="flex:1 1 100%"><label>Efeito</label>
          <textarea oninput="updateAbility(${r.id},'texto',this.value)">${r.texto}</textarea></div>
      </div>
    `;
    list.appendChild(item);
  });
  renderAbilitySuggestions();
  renderSheet();
}

/** Renderiza o painel de sugestões de habilidades filtrado por tipo+papel+tema */
function renderAbilitySuggestions() {
  const box = document.getElementById('ability-suggestions');
  if (!box) return;

  const tipo  = val('in-tipo');
  const role  = state.role;
  const tema  = getTheme();
  const cd    = parseInt(val('st-cd'), 10) || 10;

  // Pega o pool já priorizado
  const pool = getPoolHabilidadesSugeridas(tipo, role, tema);

  // Separa por categoria para agrupar visualmente
  const tipoEspec = pool.filter(a => a.tipos && a.tipos.includes(tipo) && a.roles && a.roles.includes(role));
  const tipoVago  = pool.filter(a => a.tipos && a.tipos.includes(tipo) && (!a.roles || !a.roles.includes(role)));
  const papelVago = pool.filter(a => (!a.tipos || !a.tipos.includes(tipo)) && a.roles && a.roles.includes(role));
  const tematicas = pool.filter(a =>
    (!a.tipos || !a.tipos.includes(tipo)) &&
    (!a.roles || !a.roles.includes(role)) &&
    tema && a.tags && a.tags.some(t => tema.tags.includes(t))
  );
  const universais = pool.filter(a =>
    (!a.tipos || a.tipos.length === 0) &&
    (!a.roles || a.roles.length === 0) &&
    (!tema || !a.tags || !a.tags.some(t => tema.tags.includes(t)))
  );

  const jaAdicionadas = new Set(abilityRows.map(r => r.nome));
  const buildTags = (arr, secao) => arr.map(a => {
    const cls = [
      "suggestion-tag",
      a.tipos && a.tipos.includes(tipo) ? `tipo-${a.tipos[0]}` : "",
      secao === "tema" ? "temática" : ""
    ].filter(Boolean).join(" ");
    const adicionada = jaAdicionadas.has(a.nome) ? "adicionada" : "";
    const magica = a.magica ? "true" : "false";
    const tooltip = a.desc.replace(/\{cd\}/g, cd);
    return `<span class="${cls} ${adicionada}" data-magica="${magica}" data-secao="${secao}" title="${tooltip.replace(/"/g,'&quot;')}" onclick="addSuggestedAbility('${a.nome.replace(/'/g,"\\'")}', ${a.magica}, '${a.desc.replace(/'/g,"\\'").replace(/"/g,'&quot;')}', ${cd})">${a.nome}</span>`;
  }).join("");

  box.innerHTML = [
    tipoEspec.length  ? buildTags(tipoEspec, "tipo-papel") : "",
    tipoVago.length   ? buildTags(tipoVago, "tipo-papel")  : "",
    papelVago.length  ? buildTags(papelVago, "tipo-papel") : "",
    tematicas.length  ? buildTags(tematicas, "tema")       : "",
    universais.length? buildTags(universais, "universal")  : ""
  ].join("");
}

/** Adiciona uma habilidade sugerida à ficha */
function addSuggestedAbility(nome, magica, desc, cd) {
  abilityRows.push({
    id: abilitySeq++,
    nome,
    magica,
    texto: String(desc).replace(/\{cd\}/g, String(cd))
  });
  renderAbilityList();
}
function updateAbility(id, field, value) {
  const r = abilityRows.find(r => r.id === id);
  if (r) { r[field] = (field === 'magica') ? (value === "1") : value; renderSheet(); }
}

/* ============= Parceiros ============= */
let partnerRows = [];
let partnerSeq  = 0;

function addPartner() {
  partnerRows.push({ id: partnerSeq++, nome:"", nota:"" });
  renderPartnerList();
}
function removePartner(id) {
  partnerRows = partnerRows.filter(r => r.id !== id);
  renderPartnerList();
}
function renderPartnerList() {
  const list = document.getElementById('partner-list');
  list.innerHTML = "";
  partnerRows.forEach(r => {
    const item = document.createElement('div');
    item.className = "ability-item";
    item.innerHTML = `
      <div class="field-row">
        <div class="field" style="flex:1"><label>Parceiro</label>
          <input value="${r.nome}" placeholder="ex.: 2 lobos" oninput="updatePartner(${r.id},'nome',this.value)"></div>
        <button class="remove-btn" onclick="removePartner(${r.id})">✕</button>
      </div>
      <div class="field-row">
        <div class="field" style="flex:1 1 100%"><label>Nota (ND, papel, comportamento)</label>
          <input value="${r.nota}" placeholder="ex.: ND 1/2 cada, lacaios, fogem se o líder cair" oninput="updatePartner(${r.id},'nota',this.value)"></div>
      </div>
    `;
    list.appendChild(item);
  });
  renderSheet();
}
function updatePartner(id, field, value) {
  const r = partnerRows.find(r => r.id === id);
  if (r) { r[field] = value; renderSheet(); }
}

/* ============= Bestiário (localStorage) ============= */
const BESTIARIO_KEY = "forjador-ameacas-bestiario-v1";

function loadBestiario() {
  try { return JSON.parse(localStorage.getItem(BESTIARIO_KEY)) || []; }
  catch (e) { return []; }
}
function saveBestiarioList(list) {
  try { localStorage.setItem(BESTIARIO_KEY, JSON.stringify(list)); return true; }
  catch (e) { return false; }
}

function gatherState() {
  return {
    nome: val('in-nome'), conceito: val('in-conceito'), funcao: val('in-funcao'),
    tipo: val('in-tipo'), tamanho: val('in-tamanho'), role: state.role,
    loco: val('in-loco'), veloc: val('in-veloc'), nd: ndSel.value,
    defesa: val('st-defesa'), pv: val('st-pv'), cd: val('st-cd'),
    fort: val('st-fort'), media: val('st-media'), fraca: val('st-fraca'),
    fortval: val('st-fortval'), refval: val('st-refval'), vonval: val('st-vonval'),
    rd: val('in-rd'),
    attacks:  attackRows.map(r => ({...r})),
    abilities: abilityRows.map(r => ({...r})),
    partners: partnerRows.map(r => ({...r})),
    attrs: Object.fromEntries(ATRIBUTOS.map(a => [a, document.getElementById('attr-'+a).value])),
    pericias: val('in-pericias'),
    iniciativa: val('in-iniciativa'), percepcao: val('in-percepcao'), sentidos: val('in-sentidos'),
    tesouro: val('in-tesouro'), equip: val('in-equip'), equipCond: val('in-equip-cond'),
    tesouroEsp: val('in-tesouro-esp')
  };
}

function applyState(s) {
  document.getElementById('in-nome').value    = s.nome    || "";
  document.getElementById('in-conceito').value = s.conceito || "";
  document.getElementById('in-funcao').value  = s.funcao  || "";
  updateFuncaoLore();
  document.getElementById('in-tipo').value    = s.tipo    || "Animal";
  document.getElementById('in-tamanho').value = s.tamanho || "Médio";
  ndSel.value = s.nd || "6";
  setRole(s.role || "solo");

  document.getElementById('st-defesa').value = s.defesa;
  document.getElementById('st-pv').value     = s.pv;
  document.getElementById('st-cd').value     = s.cd;
  document.getElementById('st-fort').value   = s.fort;
  document.getElementById('st-media').value  = s.media;
  document.getElementById('st-fraca').value  = s.fraca;
  document.getElementById('st-fortval').value = s.fortval || "media";
  document.getElementById('st-refval').value  = s.refval  || "media";
  document.getElementById('st-vonval').value  = s.vonval  || "media";
  document.getElementById('in-rd').value      = s.rd      || "";
  document.getElementById('in-loco').value    = s.loco    || "bipede";
  document.getElementById('in-veloc').value   = s.veloc   || "normal";
  updateDeslocamentoOptions();

  attackRows  = (s.attacks   || []).map(r => ({...r, id: attackSeq++}));
  renderAttackList();
  abilityRows = (s.abilities || []).map(r => ({...r, id: abilitySeq++}));
  renderAbilityList();
  partnerRows = (s.partners  || []).map(r => ({...r, id: partnerSeq++}));
  renderPartnerList();

  ATRIBUTOS.forEach(a => {
    const el = document.getElementById('attr-' + a);
    if (el && s.attrs && s.attrs[a] !== undefined) el.value = s.attrs[a];
  });
  document.getElementById('in-pericias').value   = s.pericias   || "";
  document.getElementById('in-iniciativa').value = s.iniciativa || "";
  document.getElementById('in-percepcao').value  = s.percepcao  || "";
  document.getElementById('in-sentidos').value   = s.sentidos   || "";
  document.getElementById('in-tesouro').value    = s.tesouro    || "Padrão";
  document.getElementById('in-equip').value      = s.equip      || "";
  document.getElementById('in-equip-cond').value = s.equipCond  || "normal";
  document.getElementById('in-tesouro-esp').value = s.tesouroEsp || "";
  renderSheet();
}

function salvarNoBestiario() {
  const nome  = val('in-nome').trim() || "ameaça sem nome";
  const list  = loadBestiario();
  const entry = {
    id: Date.now(), nome, nd: ndSel.value, role: roleLabel(),
    savedAt: new Date().toLocaleString('pt-BR'), data: gatherState()
  };
  list.unshift(entry);
  const ok  = saveBestiarioList(list);
  renderBestiarioList();
  const msg = document.getElementById('copied-msg');
  msg.textContent = ok ? "Salvo no bestiário do navegador!" : "Não foi possível salvar (armazenamento indisponível).";
  setTimeout(() => msg.textContent = "", 2500);
}
function carregarDoBestiario(id) {
  const entry = loadBestiario().find(e => e.id === id);
  if (entry) applyState(entry.data);
}
function removerDoBestiario(id) {
  if (!confirm("Excluir esta ameaça do bestiário salvo?")) return;
  saveBestiarioList(loadBestiario().filter(e => e.id !== id));
  renderBestiarioList();
}
function renderBestiarioList() {
  const box  = document.getElementById('bestiario-list');
  const list = loadBestiario();
  document.getElementById('bestiario-count').textContent = list.length;
  if (list.length === 0) {
    box.innerHTML = `<p class="sheet-empty" style="margin-top:0.6rem">nenhuma ameaça salva ainda</p>`;
    return;
  }
  box.innerHTML = list.map(e => `
    <div class="bestiario-item">
      <div class="bestiario-info">
        <b>${e.nome}</b> <span class="nd-badge">ND ${e.nd}</span><br>
        <span class="bestiario-meta">${e.role} · salvo em ${e.savedAt}</span>
      </div>
      <div class="bestiario-actions">
        <button class="mini-btn" onclick="carregarDoBestiario(${e.id})">Carregar</button>
        <button class="mini-btn danger" onclick="removerDoBestiario(${e.id})">Excluir</button>
      </div>
    </div>
  `).join("");
}

/* ============= Geração automática ============= */
const SIZE_DICE   = { "Minúsculo":"1d3","Pequeno":"1d4","Médio":"1d6","Grande":"1d8","Enorme":"1d10","Colossal":"2d6" };
const WEAPON_NAMES = ["Garra","Mordida","Chifre","Tentáculo","Ferrão","Golpe","Pata","Investida","Espinho","Estocada","Coice","Rajada"];
const NOME_NOUNS  = {
  "Animal":["Predador","Fera","Rondador"],
  "Construto":["Autômato","Golem","Sentinela"],
  "Espírito":["Espectro","Vulto","Sombra"],
  "Humanoide":["Renegado","Andarilho","Forasteiro"],
  "Monstro":["Horror","Abominação","Flagelo"],
  "Morto-vivo":["Cadáver","Reviviscente","Ceifador"]
};
const NOME_ADJ    = ["Sombrio","Rastejante","Uivante","Espectral","Ferruginoso","Sussurrante","Corrompido","Ancestral","Faminto","Errante"];
const ELEMENTOS   = ["fogo","frio","eletricidade","ácido","trevas"];
const SENTIDOS_POOL = ["visão no escuro","percepção às cegas (alcance curto)","olfato apurado",""];
const ND_NUM = (() => {
  const m = {"1/4":0,"1/2":0,"S":20,"S+":22};
  for (let i = 1; i <= 20; i++) m[String(i)] = i;
  return m;
})();

/* ============= Pool de Habilidades por Tipo + Papel =============
   Cada habilidade pode ter:
   - nome, magica, desc
   - tags: tags de tema elemental (fogo, gelo, etc) — opcionais
   - tipos: ["Animal","Construto","Espírito","Humanoide","Monstro","Morto-vivo"]
            vazio/ausente = habilidade universal
   - roles: ["solo","lacaio","especial"] — vazio/ausente = todos os papéis
   - papeisFoco: papéis onde a habilidade é mais provável de aparecer (peso maior)
   - papeisRaros: papéis onde a habilidade é menos provável (mas pode aparecer)
   ====================================================================== */
const ABILITY_POOL = [
  /* ============ HABILIDADES UNIVERSAIS (todos os tipos e papéis) ============ */
  {nome:"Investida",          magica:false, tags:[],          tipos:[], roles:[],
    desc:"Uma vez por cena, a ameaça pode se lançar contra um oponente e fazer um ataque adicional imediatamente."},
  {nome:"Couraça Natural",    magica:false, tags:[],          tipos:[], roles:[],
    desc:"Escamas, cascos ou couro espesso concedem um bônus extra já embutido na Defesa da criatura."},
  {nome:"Fôlego Sobrenatural",magica:true,  tags:[],          tipos:[], roles:[],
    desc:"Uma vez por cena, a criatura expele uma rajada de energia em cone curto; quem falhar em um teste de resistência (CD {cd}) sofre dano e uma condição leve."},

  /* ============ ANIMAL — Solo ============ */
  {nome:"Emboscada Predatória", magica:false, tags:[],          tipos:["Animal"], roles:["solo"], papeisFoco:["solo"],
    desc:"A criatura escolhe um local de ataque com vantagem; nas duas primeiras rodadas da cena, seus ataques causam dano extra igual a metade do dano médio total."},
  {nome:"Mordida Destruidora",  magica:false, tags:[],          tipos:["Animal"], roles:["solo"],
    desc:"O ataque de mordida da ameaça tem seu alcance crítico ampliado para 19–20 e impõe a condição agarrado enquanto o alvo não se soltar."},
  {nome:"Rastro de Sangue",     magica:false, tags:[],          tipos:["Animal"], roles:["solo"],
    desc:"A criatura rastreia automaticamente presas feridas em alcance longo e ganha +5 em Percepção contra alvos que tenham perdido PV no último minuto."},
  {nome:"Grito Territorial",    magica:false, tags:[],          tipos:["Animal"], roles:["solo","lacaio"],
    desc:"Como uma ação padrão, a criatura emite um rugido que impõe a condição abalado a todos os inimigos em alcance curto (CD {cd})."},
  {nome:"Carregar",             magica:false, tags:[],          tipos:["Animal"], roles:["solo"],
    desc:"Quando move-se pelo menos 6m em linha reta, o ataque corpo a corpo da rodada causa +1 dado extra do mesmo tipo."},

  /* ============ ANIMAL — Lacaio ============ */
  {nome:"Matilha",              magica:false, tags:[],          tipos:["Animal"], roles:["lacaio"], papeisFoco:["lacaio"],
    desc:"Quando o lacaio está adjacente a outro aliado da mesma espécie, recebe +2 em ataques corpo a corpo."},
  {nome:"Mordida Rápida",       magica:false, tags:[],          tipos:["Animal"], roles:["lacaio"],
    desc:"A ação de ataque do lacaio é tão rápida que ele pode se deslocar 3m adicionais sem provocar ataques de oportunidade."},
  {nome:"Fugir do Mais Forte",  magica:false, tags:[],          tipos:["Animal"], roles:["lacaio"],
    desc:"Se o lacaio for atacado por uma criatura de ND maior que o seu, recebe deslocamento +3m até o fim do combate."},

  /* ============ ANIMAL — Especial ============ */
  {nome:"Camuflagem",           magica:false, tags:["natureza"],tipos:["Animal"], roles:["especial"],
    desc:"Enquanto imóvel em seu habitat natural, a criatura recebe um bônus de circunstância em Furtividade."},
  {nome:"Sentidos Sobre-Humanos",magica:false,tags:[],          tipos:["Animal"], roles:["especial"],
    desc:"A criatura possui três sentidos especiais (visão no escuro, percepção de vibrações, olfato apurado) e não pode ser surpreendida."},
  {nome:"Ataque Venenoso",      magica:false, tags:["natureza","corrupção"], tipos:["Animal"], roles:["especial"],
    desc:"Ao acertar um ataque corpo a corpo, a criatura pode envenenar o alvo (CD {cd}), impondo uma condição em caso de falha no teste de resistência."},

  /* ============ CONSTRUTO — Solo ============ */
  {nome:"Engenharia Letal",     magica:false, tags:[],          tipos:["Construto"], roles:["solo"],
    desc:"A cada turno, a criatura pode escolher fazer um ataque extra com uma arma de longo alcance integrada, ignorando cobertura parcial."},
  {nome:"Auto-Reparo",          magica:true,  tags:[],          tipos:["Construto"], roles:["solo"],
    desc:"A cada três turnos, a criatura recupera PV iguais a 1/4 do total. Não funciona sob dano de ácido."},
  {nome:"Placa de Aço",         magica:false, tags:[],          tipos:["Construto"], roles:["solo","especial"],
    desc:"A Defesa da criatura inclui +2 natural extra; ela ignora os primeiros 5 pontos de dano de cada ataque."},
  {nome:"Sistema de Mira",      magica:false, tags:[],          tipos:["Construto"], roles:["solo","especial"],
    desc:"A criatura ignora camuflagem e cobertura leve, e seus ataques à distância não recebem penalidade por distância."},

  /* ============ CONSTRUTO — Lacaio ============ */
  {nome:"Engrenagem Aberta",    magica:false, tags:[],          tipos:["Construto"], roles:["lacaio"],
    desc:"O lacaio é frágil em pontos de vida, mas seu corpo de metal causa 1d6 de dano extra em qualquer ataque corpo a corpo bem-sucedido."},
  {nome:"Protocolo de Patrulha",magica:false, tags:[],          tipos:["Construto"], roles:["lacaio"],
    desc:"O lacaio não pode ser flanqueado nem distraído; ignora condições emocionais (amedrontado, enfeitiçado)."},
  {nome:"Sinal de Alerta",      magica:false, tags:[],          tipos:["Construto"], roles:["lacaio"],
    desc:"Ao ser destruído, o lacaio emite um sinal que concede a todos os aliados em alcance médio um ataque extra na próxima rodada."},

  /* ============ CONSTRUTO — Especial ============ */
  {nome:"Projéteis Químicos",   magica:true,  tags:[],          tipos:["Construto"], roles:["especial"],
    desc:"A criatura dispara um projétil de área em alcance médio (CD {cd}), causando dano e uma condição de sangue (cego, lento, enjoado)."},
  {nome:"Campo de Força",       magica:true,  tags:[],          tipos:["Construto"], roles:["especial"],
    desc:"Como reação, a criatura pode ativar um campo que reduz dano à distância em 10 até o início de seu próximo turno."},
  {nome:"Reconfiguração Tática",magica:false, tags:[],          tipos:["Construto"], roles:["especial"],
    desc:"Uma vez por cena, a criatura pode trocar uma de suas habilidades por outra compatível com seu tipo por um turno."},

  /* ============ ESPÍRITO — Solo ============ */
  {nome:"Drenar Vitalidade",    magica:true,  tags:["morte","corrupção"], tipos:["Espírito"], roles:["solo"],
    desc:"Ao acertar um ataque corpo a corpo, a criatura recupera PV iguais a metade do dano causado e impõe a condição enfraquecido."},
  {nome:"Ethereal",             magica:true,  tags:["trevas"],  tipos:["Espírito"], roles:["solo","especial"],
    desc:"A criatura pode se tornar incorpórea como ação livre; nesse estado, ignora dano físico mas é vulnerável a magia."},
  {nome:"Manifestação Terrível",magica:true,  tags:["trevas","morte"], tipos:["Espírito"], roles:["solo"],
    desc:"A primeira vez que entra em cena, todos os personagens devem passar em Vontade (CD {cd}) ou ficam apavorados por 1d4 turnos."},
  {nome:"Terror da Existência", magica:true,  tags:["trevas","corrupção"], tipos:["Espírito"], roles:["solo"],
    desc:"Quem terminar o turno adjacente à criatura sofre 1d6 de dano de trevas e tem desvantagem no próximo ataque contra ela."},

  /* ============ ESPÍRITO — Lacaio ============ */
  {nome:"Eco Sombrio",          magica:true,  tags:["trevas"],  tipos:["Espírito"], roles:["lacaio"],
    desc:"O lacaio é quase intangível; dano não-mágico sofre penalidade de -5; dano mágico o afeta normalmente."},
  {nome:"Vínculo com Invocador",magica:true,  tags:[],          tipos:["Espírito"], roles:["lacaio"],
    desc:"Enquanto o lacaio puder ver seu invocador, recebe +2 em todos os testes de resistência."},
  {nome:"Desaparecer",          magica:true,  tags:["trevas"],  tipos:["Espírito"], roles:["lacaio"],
    desc:"Como ação de movimento, o lacaio se torna invisível até atacar ou até o fim do próximo turno."},

  /* ============ ESPÍRITO — Especial ============ */
  {nome:"Invocação Menor",      magica:true,  tags:[],          tipos:["Espírito"], roles:["especial"],
    desc:"Uma vez por dia, a criatura invoca 1d4 lacaios espirituais que desaparecem após 1 minuto ou quando destruídos."},
  {nome:"Manipulação Mental",   magica:true,  tags:["trevas"],  tipos:["Espírito"], roles:["especial"],
    desc:"A criatura pode tentar controlar uma mente (CD {cd}) por até 1 minuto; alvo bem-sucedido em Vontade resiste."},
  {nome:"Ilusões Tangíveis",    magica:true,  tags:[],          tipos:["Espírito"], roles:["especial"],
    desc:"A criatura pode criar duplicatas ilusórias de si mesma; uma vez por turno, ela troca de posição com uma duplicata sem provocar ataque de oportunidade."},

  /* ============ HUMANOIDE — Solo ============ */
  {nome:"Líder nato",           magica:false, tags:[],          tipos:["Humanoide"], roles:["solo","especial"],
    desc:"Todos os aliados Humanoides em alcance médio recebem +1 em ataques e +1d6 PV temporários no início do combate."},
  {nome:"Tática de Bando",      magica:false, tags:[],          tipos:["Humanoide"], roles:["solo"],
    desc:"A criatura coordena lacaios adjacentes; cada lacaio aliado faz um ataque extra se estiver adjacente a ela."},
  {nome:"Treinamento Veterano", magica:false, tags:[],          tipos:["Humanoide"], roles:["solo"],
    desc:"A criatura tem uma perícia treinada em +10; além disso, ignora a penalidade de lutar com duas armas."},
  {nome:"Fúria Controlada",     magica:false, tags:[],          tipos:["Humanoide"], roles:["solo","lacaio"],
    desc:"Quando cai abaixo de metade dos PV, a criatura recebe +2 em ataques e +5 em dano corpo a corpo."},

  /* ============ HUMANOIDE — Lacaio ============ */
  {nome:"Treinamento Básico",   magica:false, tags:[],          tipos:["Humanoide"], roles:["lacaio"],
    desc:"O lacaio tem um ataque corpo a corpo com dado de dano +1 categoria acima do normal (ex.: 1d8 em vez de 1d6)."},
  {nome:"Equipamento Padronizado",magica:false,tags:[],         tipos:["Humanoide"], roles:["lacaio"],
    desc:"O lacaio carrega uma arma de longo alcance; em qualquer turno, pode usar sua ação para disparar em vez de atacar corpo a corpo."},
  {nome:"Disciplina Militar",   magica:false, tags:[],          tipos:["Humanoide"], roles:["lacaio"],
    desc:"O lacaio não foge enquanto houver um oficial visível em alcance médio."},

  /* ============ HUMANOIDE — Especial ============ */
  {nome:"Magia de Apoio",       magica:true,  tags:[],          tipos:["Humanoide"], roles:["especial"],
    desc:"A criatura lança magias utilitárias (curar, buffar aliados) com CD {cd}; pode gastar uma ação para conceder +2d6 PV temporários a um aliado."},
  {nome:"Astúcia do Trapaceiro",magica:false, tags:[],          tipos:["Humanoide"], roles:["especial"],
    desc:"A criatura tem vantagem em Furtividade e Enganação; em combate, pode usar Enganação em vez de ataque como ação padrão."},
  {nome:"Veneno de Batedor",    magica:false, tags:["corrupção"], tipos:["Humanoide"], roles:["especial"],
    desc:"A arma da criatura é banhada em veneno (CD {cd}); alvo sofre 1d6 de dano de veneno e condição enjoado por 1 turno."},

  /* ============ MONSTRO — Solo ============ */
  {nome:"Brutamontes",          magica:false, tags:[],          tipos:["Monstro"], roles:["solo"],
    desc:"Os ataques da criatura têm margem de ameaça 19–20; quando acerta um crítico, ela pode fazer um ataque extra imediato."},
  {nome:"Engolir",              magica:false, tags:[],          tipos:["Monstro"], roles:["solo"],
    desc:"Como ação padrão, a criatura pode engolir uma criatura de até seu porte Médio; o alvo sufoca e sofre 1d6 de dano ácido por turno."},
  {nome:"Olhar Petrificante",   magica:true,  tags:["trevas"],  tipos:["Monstro"], roles:["solo","especial"],
    desc:"A criatura fixa o olhar em um alvo a cada turno (CD {cd}); falha em Vontade transforma a vítima em pedra por 1d4 turnos."},
  {nome:"Caos Bestial",         magica:false, tags:[],          tipos:["Monstro"], roles:["solo"],
    desc:"A cada turno, a criatura escolhe um poder diferente: ataque extra, defesa extra, ou deslocamento dobrado."},

  /* ============ MONSTRO — Lacaio ============ */
  {nome:"Frenesi de Bando",     magica:false, tags:[],          tipos:["Monstro"], roles:["lacaio"],
    desc:"Quando o lacaio reduz um inimigo a 0 PV, ele recebe um ataque extra neste turno."},
  {nome:"Inseto Territorial",   magica:false, tags:[],          tipos:["Monstro"], roles:["lacaio"],
    desc:"O lacaio recebe +2 em ataques contra qualquer criatura que atacou um aliado no último turno."},
  {nome:"Pele Dura",            magica:false, tags:[],          tipos:["Monstro"], roles:["lacaio"],
    desc:"O lacaio possui RD 3 contra dano cortante e perfurante de armas não-mágicas."},

  /* ============ MONSTRO — Especial ============ */
  {nome:"Veneno Debilitante",   magica:false, tags:["natureza","corrupção"], tipos:["Monstro"], roles:["especial"],
    desc:"A criatura injeta veneno em alvo corpo a corpo (CD {cd}); sucesso em Fortitude, falha impõe condição paralisado por 1 turno."},
  {nome:"Invisibilidade Natural",magica:true, tags:[],          tipos:["Monstro"], roles:["especial"],
    desc:"Como ação livre, a criatura se torna invisível enquanto não atacar; invisibilidade dura até 1 minuto por dia."},
  {nome:"Campo Antipsíquico",   magica:true,  tags:[],          tipos:["Monstro"], roles:["especial"],
    desc:"Criaturas adjacentes têm desvantagem em magias de controle mental; a criatura é imune a essas magias."},

  /* ============ MORTO-VIVO — Solo ============ */
  {nome:"Aura de Medo",         magica:true,  tags:["morte","trevas"], tipos:["Morto-vivo"], roles:["solo","especial"],
    desc:"Quem começar o turno adjacente à criatura deve passar em Vontade (CD {cd}) ou fica abalado até o fim da cena."},
  {nome:"Drenar Vida",          magica:true,  tags:["morte","corrupção"], tipos:["Morto-vivo"], roles:["solo"],
    desc:"A cada turno, a criatura pode absorver 1d6 PV de um alvo adjacente, curando-se do mesmo valor."},
  {nome:"Comandar Mortos",      magica:true,  tags:["morte"],   tipos:["Morto-vivo"], roles:["solo","especial"],
    desc:"Uma vez por dia, a criatura pode reanimar 1d4 esqueletos ou zumbis menores para servi-la por 1 hora."},
  {nome:"Foice Espectral",      magica:true,  tags:["morte"],   tipos:["Morto-vivo"], roles:["solo"],
    desc:"O ataque principal da criatura é incorpóreo; ignora armadura física e aplica dano de trevas."},

  /* ============ MORTO-VIVO — Lacaio ============ */
  {nome:"Sem Dor",              magica:false, tags:[],          tipos:["Morto-vivo"], roles:["lacaio"],
    desc:"O lacaio é imune a condições emocionais e a dano de veneno, doença e fadiga."},
  {nome:"Não Recua",            magica:false, tags:[],          tipos:["Morto-vivo"], roles:["lacaio"],
    desc:"O lacaio não pode ser empurrado, derrubado, ou forçado a fugir; ignora efeitos de medo."},
  {nome:"Hordas Infinitas",     magica:false, tags:[],          tipos:["Morto-vivo"], roles:["lacaio"],
    desc:"Sempre que um lacaio for destruído, há 25% de chance de que um substituto apareça em 1d4 turnos."},

  /* ============ MORTO-VIVO — Especial ============ */
  {nome:"Magia Necromântica",   magica:true,  tags:["morte"],   tipos:["Morto-vivo"], roles:["especial"],
    desc:"A criatura lança magias de necromancia (raio de energia negativa, maldição, controle) com CD {cd}."},
  {nome:"Roubar Essência",      magica:true,  tags:["morte"],   tipos:["Morto-vivo"], roles:["especial"],
    desc:"A cada turno, a criatura pode drenar 1 ponto de atributo de um alvo adjacente (Vontade CD {cd} resiste)."},
  {nome:"Lamento Banshee",      magica:true,  tags:["morte","trevas"], tipos:["Morto-vivo"], roles:["especial"],
    desc:"Uma vez por dia, a criatura solta um grito que causa 2d6 de dano sônico a todos em alcance curto e impõe apavorado."},

  /* ============ HABILIDADES TEMÁTICAS (surgem com tema) ============ */
  {nome:"Visão no Escuro",      magica:false, tags:["trevas","corrupção","morte"], desc:"A criatura enxerga normalmente mesmo sem luz alguma."},
  {nome:"Percepção Aguçada",    magica:false, tags:["natureza","tempestade"],    desc:"A criatura recebe um bônus de circunstância em testes de Percepção envolvendo olfato ou audição."},
  {nome:"Ignora Terreno Difícil",magica:false,tags:["natureza","terra"],        desc:"A criatura se move livremente por terrenos difíceis típicos de seu habitat."},
  {nome:"Pele Resistente",      magica:false, tags:["terra"],    desc:"A criatura ignora os primeiros pontos de dano de ataques físicos comuns, não vindos de armas especiais."},
  {nome:"Aura Perturbadora",    magica:true,  tags:["trevas","corrupção","morte"], desc:"Criaturas que começem o turno perto da ameaça devem ser bem-sucedidas em um teste de resistência (CD {cd}) ou sofrem uma condição mental leve até o fim da cena."},
  {nome:"Regeneração",          magica:false, tags:["natureza","corrupção","morte"], desc:"A criatura recupera pontos de vida no início de seu turno, a menos que tenha sofrido um tipo específico de dano na rodada anterior."},
  {nome:"Presença Ameaçadora",  magica:true,  tags:["trevas","corrupção","morte"], desc:"Uma vez por cena, ao entrar em cena ou reduzir um oponente a 0 PV, a criatura pode amedrontar quem estiver por perto (CD {cd})."},
  {nome:"Corpo em Chamas",      magica:true,  tags:["fogo"],     desc:"Qualquer criatura que acerte a ameaça com um ataque corpo a corpo sofre {cd}/4 de dano de fogo."},
  {nome:"Rajada de Fogo",       magica:true,  tags:["fogo"],     desc:"Uma vez por cena, a ameaça dispara uma rajada de fogo em cone curto (CD {cd}); quem falhar sofre dano de fogo e fica em chamas."},
  {nome:"Aura de Calor",        magica:true,  tags:["fogo"],     desc:"O calor irradiado pela criatura reduz a eficácia de armas de gelo e dá penalidade em testes físicos a quem estiver adjacente."},
  {nome:"Trilha de Gelo",       magica:true,  tags:["gelo"],     desc:"Cada quadrado pelo qual a criatura passa torna-se terreno difícil de gelo até o final da cena."},
  {nome:"Sopro Congelante",     magica:true,  tags:["gelo"],     desc:"Uma vez por cena, a ameaça sopra ar gelado em cone curto; quem falhar no teste (CD {cd}) fica lento até o final de seu próximo turno."},
  {nome:"Carcaça Glacial",      magica:false, tags:["gelo"],     desc:"A criatura possui resistência ao frio e vulnerabilidade a fogo; ataques corpo a corpo que a acertam causam dano extra de frio ao atacante."},
  {nome:"Descarga Elétrica",    magica:true,  tags:["tempestade"], desc:"Uma vez por cena, a criatura libera uma descarga elétrica atingindo todas as criaturas adjacentes (CD {cd}); quem falhar fica abalado."},
  {nome:"Forma de Relâmpago",   magica:true,  tags:["tempestade"], desc:"Uma vez por cena, a criatura pode se teletransportar até distância média como um relâmpago, ignorando ataques de oportunidade."},
  {nome:"Ruído Ensurdecedor",   magica:false, tags:["tempestade"], desc:"O rugido ou grito da criatura pode ensurdecer criaturas próximas por uma rodada (CD {cd})."},
  {nome:"Raízes Implacáveis",   magica:false, tags:["natureza"],  desc:"Uma vez por cena, raízes ou cipós brotam do solo para imobilizar um alvo adjacente (CD {cd})."},
  {nome:"Esporos Paralisantes", magica:true,  tags:["natureza"],  desc:"A criatura libera esporos que causam condição leve a todos em alcance curto (CD {cd})."},
  {nome:"Absorver Vitalidade",  magica:true,  tags:["morte","corrupção"], desc:"Ao acertar com um ataque corpo a corpo, a criatura recupera PV iguais a metade do dano causado."},
  {nome:"Maldição da Morte",    magica:true,  tags:["morte"],    desc:"Uma vez por cena, a criatura amaldiçoa um alvo (CD {cd}); se ele morrer enquanto maldito, surge como um morto-vivo menor sob controle da ameaça."},
  {nome:"Túnel das Sombras",    magica:true,  tags:["trevas"],   desc:"Em escuridão total, a criatura pode se mover até o dobro de seu deslocamento normal sem custo de ação."},
  {nome:"Essência Corrompida",  magica:true,  tags:["corrupção"], desc:"Ataques bem-sucedidos da criatura corrompem o alvo; criaturas corrompidas têm desvantagem em testes de resistência até serem curadas."},
  {nome:"Corpo de Pedra",       magica:false, tags:["terra"],    desc:"A criatura possui RD extra e resiste a dano de empurrão; porém, sua velocidade é reduzida quando na sombra."},
  {nome:"Tremor",               magica:false, tags:["terra"],    desc:"Uma vez por cena, a criatura golpeia o solo causando um tremor em raio curto; criaturas na área devem passar em Reflexos (CD {cd}) ou caem."},
];

function rndPick(arr, weights) {
  if (!weights) return arr[Math.floor(Math.random() * arr.length)];
  const total = weights.reduce((a,b) => a+b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < arr.length; i++) { r -= weights[i]; if (r <= 0) return arr[i]; }
  return arr[arr.length - 1];
}
function rndShuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function fmtBonus(n) { return (n >= 0 ? "+" : "") + n; }

/* ============= Sistema de Temas Elementais ============= */
const TEMAS = {
  nenhum: null,
  fogo: {
    label: "Fogo 🔥",
    emoji: "🔥",
    adj:   ["Flamejante","Incandescente","Célere","Abrasador","Fénix"],
    nouns: ["Inferno","Brasa","Chama","Cinza","Voragem"],
    conceitos: {
      solo:     ["besta de chamas que carboniza tudo ao redor", "elemental de fogo invocado de um plano ignícola", "dragão jovem cujas escamas ainda fulminam de calor"],
      lacaio:   ["criatura menor que explode ao morrer liberando bolas de fogo", "servo de chamas controlado por um culto do fogo", "salamandra pequena e feroze usada como isca incendiária"],
      especial: ["entidade igínea que manipula o fogo ambiente como extensao do corpo", "conjurador elemental que invoca pilares de fogo a distância", "criatura cujo simples contato incendeia os inimigos"]
    },
    weapons: ["Garra Flamejante","Mordida Abrasadora","Sopro de Fogo","Rajada Incândescente","Golpe de Brasa"],
    sentidos: ["sentido de calor (alcanace médio)"],
    rd: id => `resistência a fogo +${id}`,
    tags: ["fogo"]
  },
  gelo: {
    label: "Gelo ❄️",
    emoji: "❄️",
    adj:   ["Congelante","Glacial","Cristalino","Eterno","Pálido"],
    nouns: ["Geada","Blizzard","Cristal","Gelo","Tundra"],
    conceitos: {
      solo:     ["fera das neves que paralisa as presas com seu bafo gelado", "elemental de gelo lentão mas praticamente intranponível", "dragão de gelo que transforma paisagens em tundras"],
      lacaio:   ["guerreiro de gelo que se quebra ao cair, formando lascas cortantes", "criatura glacial que desacelera tudo que toca", "espírito do inverno preso em formá sólida"],
      especial: ["entidade criogênica que resfria o ar ao ponto de congelar armaduras", "conjurador de gelo que cria parede de cristal no campo de batalha", "criatura que hiberna e acorda com o golpe mais poderoso já visto"]
    },
    weapons: ["Garra Gelada","Mordida Congelante","Sopro de Gelo","Rajada Glacial","Toque do Inverno"],
    sentidos: ["sentido térmico (alcanace curto)"],
    rd: id => `resistência a frio +${id}`,
    tags: ["gelo"]
  },
  tempestade: {
    label: "Tempestade ⚡",
    emoji: "⚡",
    adj:   ["Tempestuoso","Relampejante","Trovejante","Furiçoso","Elétrico"],
    nouns: ["Relâmpago","Trovão","Ciclone","Tempêstade","Raio"],
    conceitos: {
      solo:     ["espírito do raio que se teletransporta entre golpes e nunca fica parado", "grande ave-tempestade cujo bater de asas invoca furacões", "elemental elétrico que derrete armaduras de metal ao toque"],
      lacaio:   ["criatura que explode em descarga elétrica quando derrotada", "ave tempestuosa em bando que ensurdece inimigos", "constrtuo elétrico menor usado para patrulhar arenas"],
      especial: ["entidade elétrica que desativa constrtutos e metal encantado", "conjurador da tempestade que invoca raios teleguiados", "criatura que cria campos magnéticos desarmando inimigos adjacentes"]
    },
    weapons: ["Garra Elétrica","Bico Trovejante","Descarga","Rajada Tempestuosa","Estouro Elétrico"],
    sentidos: ["percepção elétrica (alcanace médio)"],
    rd: id => `resistência a eletricidade +${id}`,
    tags: ["tempestade"]
  },
  natureza: {
    label: "Natureza 🌿",
    emoji: "🌿",
    adj:   ["Selvagem","Primordial","Venenoso","Espinhoso","Muóscoso"],
    nouns: ["Fera","Bestiário","Junco","Raiz","Espinho"],
    conceitos: {
      solo:     ["fera apex do ecossistema que não conhece predadores naturais", "entidade primordial da floresta que pune invasores", "criatura simbiótica fundida com árvores e raizes milenares"],
      lacaio:   ["criatura formigaária controlada por uma mente coletica vegetal", "fera territorial que proteje ninhos em grupo", "planta carnivora de movimento rápido usada como armadilha"],
      especial: ["entidade druídica que manipula plantas e venenos com precisão cirúrgica", "criatura que libera esporos alucinogênicos em área", "guardiao do bosque que cura aliados e paralisa invasores"]
    },
    weapons: ["Garra Afiada","Mordida Venenosa","Raize Impletável","Chifre Espinhoso","Ferrão Paralisante"],
    sentidos: ["olfato apurado","percepção de vibrações no solo (alcanace curto)"],
    rd: id => `resistência a veneno +${id}`,
    tags: ["natureza"]
  },
  trevas: {
    label: "Trevas 🌑",
    emoji: "🌑",
    adj:   ["Ténebro","Umbral","Demonico","Abissal","Soturno"],
    nouns: ["Sombra","Vácuo","Abismo","Nada","Vazio"],
    conceitos: {
      solo:     ["entidade das trevas que apaga a luz e devora a esperança", "demônio menor invocado pelo desespero de um feiticeiro", "sombra viva que imita a forma do maior medo das vítimas"],
      lacaio:   ["criatura que se esconde em sombras e ataca em bando", "espírito menor das trevas que drena calor e luz", "servo demonico feito de pura escuridão"],
      especial: ["entidade que manipula mentes por meio do medo e da escuridao", "conjurador das trevas que invoca portais para o plano sombrio", "criatura que apaga a visão de inimigos e some na escuridao"]
    },
    weapons: ["Garra Sombria","Mordida Demoníaca","Téntaculo das Trevas","Toque do Vácuo","Rajada Umbral"],
    sentidos: ["visão no escuro","visão das trevas (alcanace longo)"],
    rd: id => `resistência a trevas +${id}`,
    tags: ["trevas"]
  },
  corrupcao: {
    label: "Corrupção ☠️",
    emoji: "☠️",
    adj:   ["Corrompido","Pestilento","Mutante","Profano","Bilioso"],
    nouns: ["Miasma","Praga","Veneno","Malícia","Peçonha"],
    conceitos: {
      solo:     ["horrpr mutante infectado por magia extra-planar que corrompe o entorno", "entidade da corrupção que espalha uma praga incurável", "elemental do caos que transforma tudo que toca em pura podridão"],
      lacaio:   ["criatura infectada por um vírus mágico que se espalha ao morder", "servo corrompido que ainda guarda raízes de uma mente sane", "fenômeno animado de escoria mágica e detritos corrompidos"],
      especial: ["entidade que corrompe o alinhamento de criaturas ao redor", "conjurador de magia negra que usa corrupção como arma de controle", "criatura cujo toque corrompido transforma aliados em inimigos"]
    },
    weapons: ["Garra Corrosiva","Mordida Infecciosa","Jato de Ácido","Toque Corrompido","Espinho Pestilento"],
    sentidos: ["olfato apurado","percepção de corrução mágica (alcanace médio)"],
    rd: id => `resistência a veneno e ácido +${id}`,
    tags: ["corrupção"]
  },
  morte: {
    label: "Morte ☠️",
    emoji: "☠️",
    adj:   ["Mortuário","Cadavérico","Ceifador","Lívido","Fútil"],
    nouns: ["Ceifador","Cadáver","Liche","Banshee","Barão"],
    conceitos: {
      solo:     ["senhor morto-vivo que faz o campo de batalha virar cemitério temporário", "necromante lich corrompido por dé cadas de magia proibida", "entidade da morte que reanimada tudo que toca"],
      lacaio:   ["cavaleiro morto-vivo que não sente dor e não recua", "esqueleto guerreiro animado por ódio não-resolvido", "espírito revenant que busca completar uma missão inacabada"],
      especial: ["conjurador morto-vivo que anima inímigos derrotados em combate", "entidade da morte que drena a forca vital com cada golpe", "criatura com aura de desespero que impede cura nas vizinhanças"]
    },
    weapons: ["Garra Cadavérica","Mordida da Morte","Foice Espectral","Toque do Ceifador","Sopro Mórbido"],
    sentidos: ["visão no escuro","percepção de almas (alcanace médio)"],
    rd: id => `resistência negativa +${id}`,
    tags: ["morte"]
  },
  terra: {
    label: "Terra 🪨",
    emoji: "🪨",
    adj:   ["Pétreo","Granítico","Colossário","Inabalável","Ciclópico"],
    nouns: ["Golemo","Titan","Granito","Estátua","Megalito"],
    conceitos: {
      solo:     ["elemental de pedra que suporta danos absurdos e destrói tudo com golpes brutais", "golemo antigo esquecido pelas eras, guardando uma reliníquia", "criatura rochosa que se funde com o solo para emergir inesperadamente"],
      lacaio:   ["bloco de pedra animado que age como escudo vivo para outros", "constrtuo de terra moldado rapidamente em batalha", "criatura menor de areia e pedra que cega inimigos"],
      especial: ["elemental de terra que causa terremotos localizados", "entidade que cria muralhas e armádilhas de pedra no terreno", "criatura que enterra inimigos vivos no solo sólido"]
    },
    weapons: ["Punho de Pedra","Golpe Sísmico","Arremesso de Rocha","Esmagamento","Lamâina de Granito"],
    sentidos: ["percepção de vibrações no solo (alcanace longo)"],
    rd: id => `RD ${id}/penetrante`,
    tags: ["terra"]
  }
};

/** Retorna o objeto do tema ativo, ou null se "nenhum" */
function getTheme() {
  const key = document.getElementById('in-tema')?.value || 'nenhum';
  return TEMAS[key] || null;
}

/** Retorna o pool de habilidades filtrado por tema (temáticas primeiro, genéricas depois) */
function getThemePool(tema, tipo, role) {
  let pool = ABILITY_POOL;

  // Filtra por tema elemental
  if (tema) {
    pool = pool.filter(a => !a.tags || a.tags.length === 0 || a.tags.some(t => tema.tags.includes(t)));
  }

  // Filtra por tipo (se especificado)
  if (tipo) {
    const filtrado = pool.filter(a => !a.tipos || a.tipos.length === 0 || a.tipos.includes(tipo));
    // Se encontrou habilidades específicas do tipo, usa só essas
    if (filtrado.length > 0) pool = filtrado;
  }

  // Filtra por papel (se especificado)
  if (role) {
    const filtrado = pool.filter(a => !a.roles || a.roles.length === 0 || a.roles.includes(role));
    if (filtrado.length > 0) pool = filtrado;
  }

  return pool;
}

/** Retorna o pool completo de habilidades para o tipo + papel especificado (para UI) */
function getTypeRoleAbilityPool(tipo, role) {
  let pool = ABILITY_POOL;

  // Filtra por tipo
  if (tipo && tipo !== "todos") {
    const filtrado = pool.filter(a => !a.tipos || a.tipos.length === 0 || a.tipos.includes(tipo));
    if (filtrado.length > 0) pool = filtrado;
  }

  // Filtra por papel
  if (role && role !== "todos") {
    const filtrado = pool.filter(a => !a.roles || a.roles.length === 0 || a.roles.includes(role));
    if (filtrado.length > 0) pool = filtrado;
  }

  return pool;
}

/** Retorna habilidades recomendadas para o pool atual (tipo + papel) ordenadas por relevância */
function getPoolHabilidadesSugeridas(tipo, role, tema) {
  let pool = ABILITY_POOL;

  // 1. Primeiro, habilidades específicas do tipo + papel
  let especificas = pool.filter(a =>
    (a.tipos && a.tipos.includes(tipo)) &&
    (a.roles && a.roles.includes(role))
  );

  // 2. Habilidades do tipo (qualquer papel)
  let doTipo = pool.filter(a =>
    (a.tipos && a.tipos.includes(tipo)) &&
    (!a.roles || a.roles.length === 0 || !a.roles.includes(role))
  );

  // 3. Habilidades do papel (qualquer tipo)
  let doPapel = pool.filter(a =>
    (!a.tipos || a.tipos.length === 0 || !a.tipos.includes(tipo)) &&
    (a.roles && a.roles.includes(role))
  );

  // 4. Habilidades temáticas (se tema selecionado)
  let tematicas = [];
  if (tema) {
    tematicas = pool.filter(a =>
      (!a.tipos || !a.tipos.includes(tipo)) &&
      (!a.roles || !a.roles.includes(role)) &&
      (a.tags && a.tags.some(t => tema.tags.includes(t)))
    );
  }

  // 5. Universais
  let universais = pool.filter(a =>
    (!a.tipos || a.tipos.length === 0) &&
    (!a.roles || a.roles.length === 0) &&
    (!tema || !a.tags || !a.tags.some(t => tema.tags.includes(t)))
  );

  return [...especificas, ...doTipo, ...doPapel, ...tematicas, ...universais];
}

function gerarNome(tipo) {
  const tema = getTheme();
  const adj  = tema ? rndPick(tema.adj)  : rndPick(NOME_ADJ);
  const noun = tema ? rndPick(tema.nouns): rndPick(NOME_NOUNS[tipo] || ["Criatura"]);
  return `${noun} ${adj}`;
}

/* Gera um conceito temático baseado no tipo e papel de combate */
const CONCEITO_TEMPLATES = {
  Animal: {
    solo:     ["fera territorial que caça em emboscadas", "predador ágil com instintos aguçados", "grande animal selvagem movido pela fome"],
    lacaio:   ["animal de bando que age por instinto de grupo", "criatura pequena mas agressiva em grandes números", "fera treinada para obedecer a um mestre"],
    especial: ["animal com sentidos sobre-humanos e comportamento imprevisível", "criatura que usa o ambiente como arma", "fera com veneno ou capacidade de enredar a presa"]
  },
  Construto: {
    solo:     ["máquina de guerra criada para resistir e destruir", "golem antigo programado para proteger uma ruína", "autômato blindado que não conhece misericórdia"],
    lacaio:   ["sentinela mecânica produzida em série para patrulhar", "construto simples que executa ordens sem questionar", "peça de um exército autômato controlado por um mestre"],
    especial: ["construto alquímico capaz de lançar projéteis ou gases", "máquina de suporte que reforça aliados mecânicos", "autômato com capacidade de se reparar ou se reconfigurar"]
  },
  Espírito: {
    solo:     ["entidade etérea que drena a força vital dos vivos", "espírito vingativo preso ao plano material por um trauma", "manifestação de um deus menor corrompido pela magia das trevas"],
    lacaio:   ["fragmento espiritual invocado para atormentar os vivos", "sombra que se multiplica na escuridão", "espírito menor sob o comando de um conjurador"],
    especial: ["entidade que manipula mentes e semeia ilusões", "espírito capaz de possuir criaturas e controlar o ambiente", "manifestação elemental de uma força natural enfurecida"]
  },
  Humanoide: {
    solo:     ["guerreiro veterano endurecido por décadas de batalha", "líder de bando brutal que inspira medo nos aliados", "caçador de recompensas sem escrúpulos com técnicas letais"],
    lacaio:   ["bandido de estrada que age em bando para sobreviver", "soldado raso disciplinado mas expendível", "fanático que segue ordens cegas de um culto"],
    especial: ["feiticeiro renegado que troca segurança por poder bruto", "espia treinado em venenos, disfarces e sabotagem", "negociante de informações que manipula aliados e inimigos"]
  },
  Monstro: {
    solo:     ["aberração que evoluiu para dominar seu ecossistema pelo terror", "criatura de pesadelo surgida das profundezas da magia selvagem", "monstro colossal que considera tudo ao redor como território ou presa"],
    lacaio:   ["criatura gregária que só é perigosa em grandes números", "monstro menor que serve como explorador ou isca de um ser maior", "aberração jovem ainda aprendendo a caçar"],
    especial: ["criatura com capacidade de paralisar, confundir ou amaldiçoar", "monstro que ataca à distância ou por magia instintiva", "ser com exoesqueleto, invisibilidade ou campo de força natural"]
  },
  "Morto-vivo": {
    solo:     ["campeão caído reanimado pela vontade de um necromante poderoso", "senhor morto-vivo que comanda hordas de servos sem vida", "espectro de um herói corrompido pela maldição de sua própria arma"],
    lacaio:   ["zumbi reanimado sem vontade própria para servir de escudo", "esqueleto armado que patrulha tumbas e catacumbas", "reviviscente recém-criado que ainda carrega memórias do passado"],
    especial: ["banshee que drena a força vital com seu grito maldito", "liche menor que usa magia para controlar os mortos ao redor", "vampiro jovem que usa charme e ilusão antes da força"]
  }
};

function gerarConceito(tipo, role) {
  const tema = getTheme();
  if (tema && tema.conceitos) {
    const pool = tema.conceitos[role] || tema.conceitos.solo;
    return rndPick(pool);
  }
  const pool = (CONCEITO_TEMPLATES[tipo] || {})[role] || ["criatura desconhecida de origem misteriosa"];
  return rndPick(pool);
}
function sugestaoNumHabilidadesQtd(role, nd, poolLen) {
  const limite = poolLen || ABILITY_POOL.length;
  const patamar = patamarDe(nd);
  const base = { iniciante:1, veterano:2, campeao:3, lenda:4, lplus:5 }[patamar] || 1;
  const mult = role === "especial" ? 2 : 1;
  const min  = base * mult;
  const max  = role === "especial" ? base * 3 : base * 2;
  return Math.max(1, Math.min(limite, Math.floor(min + Math.random() * (max - min + 1))));
}

function autoGenerate() {
  const nd   = ndSel.value;
  const row  = TABLES[state.role][nd];
  const [ataque, danoTotal, , , , , , cd] = row;
  const tema = getTheme();

  const tipos   = ["Animal","Constrtuo","Espírito","Humanoide","Monstro","Morto-vivo"];
  const tamanhos = ["Minúsculo","Pequeno","Médio","Grande","Enorme","Colossal"];
  const tipo    = rndPick(tipos);
  const tamanho = rndPick(tamanhos, [0.05,0.15,0.35,0.30,0.10,0.05]);
  document.getElementById('in-tipo').value    = tipo;
  document.getElementById('in-tamanho').value = tamanho;
  if (!val('in-nome').trim()) document.getElementById('in-nome').value = gerarNome(tipo);

  const locoOpts = ["bipede","quadrupede","voador","escalador","escavador","nadador"];
  document.getElementById('in-loco').value  = rndPick(locoOpts, [0.35,0.30,0.15,0.08,0.06,0.06]);
  document.getElementById('in-veloc').value = "normal";
  updateDeslocamentoOptions();

  // Ataques: usa nomes do tema se disponível
  const weaponPool = tema ? tema.weapons : WEAPON_NAMES;
  attackRows = [];
  const numAtk = danoTotal > 80 ? (Math.random() < 0.5 ? 3 : 2) : (danoTotal > 30 ? (Math.random() < 0.6 ? 2 : 1) : 1);
  const dice   = SIZE_DICE[tamanho] || "1d6";
  const perAtk = Math.round(danoTotal / numAtk);
  rndShuffle(weaponPool).slice(0, numAtk).forEach(nome => {
    attackRows.push({ id: attackSeq++, nome, atk: ataque, dice, target: perAtk, nota:"" });
  });
  renderAttackList();

  // Habilidades: prioriza habilidades do tipo+papel+tema
  const abilityPool = getPoolHabilidadesSugeridas(tipo, state.role, tema);
  abilityRows = [];
  rndShuffle(abilityPool).slice(0, sugestaoNumHabilidadesQtd(state.role, nd, abilityPool.length)).forEach(a => {
    abilityRows.push({ id: abilitySeq++, nome:a.nome, magica:a.magica, texto:a.desc.replace(/\{cd\}/g, cd) });
  });
  renderAbilityList();

  // RD/resistência: usa o do tema se existir
  const rdVal = Math.max(5, Math.round(cd / 3));
  if (tema) {
    document.getElementById('in-rd').value = Math.random() < 0.6 ? tema.rd(rdVal) : "";
  } else {
    document.getElementById('in-rd').value = Math.random() < 0.3
      ? `resistência a ${rndPick(ELEMENTOS)} +${rdVal}`
      : "";
  }

  const baixos = [-5,-4,-1];
  const medios = [-1,0,0,2,2,4];
  ATRIBUTOS.forEach(attr => {
    const usaBaixo = attr === "Inteligência" && ["Animal","Construto","Morto-vivo"].includes(tipo) && Math.random() < 0.6;
    document.getElementById('attr-' + attr).value = usaBaixo ? rndPick(baixos) : rndPick(medios);
  });

  const metadeND    = Math.floor(ND_NUM[nd] / 2);
  const sabMod      = parseInt(document.getElementById('attr-Sabedoria').value, 10);
  const desMod      = parseInt(document.getElementById('attr-Destreza').value,  10);
  const treinoPercep = Math.random() < 0.7 ? 2 : 0;
  document.getElementById('in-percepcao').value  = fmtBonus(metadeND + treinoPercep + sabMod);
  document.getElementById('in-iniciativa').value = fmtBonus(desMod);
  // Sentidos: usa o do tema se disponível
  const sentidosPool = tema ? tema.sentidos : SENTIDOS_POOL;
  document.getElementById('in-sentidos').value = rndPick(sentidosPool);
  document.getElementById('in-tesouro').value  = rndPick(["Metade","Padrão","Padrão","Dobro"]);
  renderSheet();
}

/* Igual ao autoGenerate(), mas sempre sobrescreve nome E conceito */
function autoGenerateTotal() {
  autoGenerate();
  // autoGenerate() já define o tipo — relemos do DOM para consistência
  const tipo = document.getElementById('in-tipo').value;
  document.getElementById('in-nome').value     = gerarNome(tipo);
  document.getElementById('in-conceito').value = gerarConceito(tipo, state.role);
  renderSheet();
}

/* ============= Atributos (Tabela 2-4) ============= */
const CATEGORIAS = [
  {label:"Incapaz (-5)",           value:-5},
  {label:"Incompetente (-4/-3)",   value:-4},
  {label:"Ineficaz (-2/-1)",       value:-1},
  {label:"Mediano (0/1)",          value: 0},
  {label:"Notável (2/3)",          value: 2},
  {label:"Excelente (4/5)",        value: 4},
  {label:"Extraordinário (6/7)",   value: 6},
  {label:"Excepcional (8+)",       value: 8}
];
const ATRIBUTOS = ["Força","Destreza","Constituição","Inteligência","Sabedoria","Carisma"];

function buildAttrGrid() {
  const grid = document.getElementById('attr-grid');
  grid.innerHTML = "";
  ATRIBUTOS.forEach(attr => {
    const f = document.createElement('div');
    f.className = "field small";
    f.innerHTML = `<label>${attr}</label>
      <select id="attr-${attr}" onchange="renderSheet()">
        ${CATEGORIAS.map(c=>`<option value="${c.value}" ${c.value===0?"selected":""}>${c.label}</option>`).join("")}
      </select>`;
    grid.appendChild(f);
  });
}

/* ============= Accordion ============= */
document.querySelectorAll('.step-head').forEach(head => {
  head.addEventListener('click', () => head.parentElement.classList.toggle('open'));
});

/* ============= Ficha ao vivo ============= */
function val(id) { return document.getElementById(id).value; }

function renderSheet() {
  const nome    = val('in-nome').trim() || "nova ameaça";
  const nd      = ndSel.value;
  const tipo    = val('in-tipo');
  const tamanho = val('in-tamanho');
  const conceito = val('in-conceito').trim();

  document.getElementById('sh-nome').textContent = nome;
  document.getElementById('sh-nd').textContent   = "ND " + nd;
  const funcaoKey = val('in-funcao');
  const funcaoTxt = funcaoKey ? `, ${FUNCOES[funcaoKey].nome.toLowerCase()}` : "";
  document.getElementById('sh-tipo').textContent =
    `${tamanho} ${tipo}${conceito ? " — " + conceito : ""} (${roleLabel()}${funcaoTxt})`;

  const iniciativa = val('in-iniciativa').trim();
  const percepcao  = val('in-percepcao').trim();
  const sentidos   = val('in-sentidos').trim();
  const sentidosLine = [
    iniciativa ? `Iniciativa ${iniciativa}` : "",
    percepcao  ? `Percepção ${percepcao}`  : "",
    sentidos
  ].filter(Boolean).join(", ");
  document.getElementById('sh-sentidos').innerHTML = sentidosLine || "";

  document.getElementById('sh-desloc').innerHTML =
    `<b>Deslocamento</b> ${val('out-deslocamento') || "—"}`;

  const resSave = id => {
    const which = val(id);
    return which === 'fort' ? val('st-fort') : which === 'media' ? val('st-media') : val('st-fraca');
  };
  document.getElementById('sh-init').innerHTML =
    `<b>Defesa</b> ${val('st-defesa')||"—"} · Fort +${resSave('st-fortval')}, Ref +${resSave('st-refval')}, Von +${resSave('st-vonval')}`;
  document.getElementById('sh-defesa').innerHTML = `<b>CD Habilidades</b> ${val('st-cd')||"—"}`;
  document.getElementById('sh-pv').innerHTML     = `<b>Pontos de Vida</b> ${val('st-pv')||"—"}`;
  const rd = val('in-rd').trim();
  document.getElementById('sh-rd').innerHTML = rd || "";

  // ataques
  const atkBox = document.getElementById('sh-attacks');
  if (attackRows.length === 0) {
    atkBox.innerHTML = `<span class="sheet-empty">nenhum ataque definido</span>`;
  } else {
    atkBox.innerHTML = attackRows.map(r => {
      const a = formatAttackLine(r);
      return `<div class="sheet-line"><b>${a.nome}${a.qtyStr}</b> +${a.atk} (${a.danoTxt}${a.nota})</div>`;
    }).join("");
  }

  // habilidades
  const abBox = document.getElementById('sh-abilities');
  if (abilityRows.length === 0) {
    abBox.innerHTML = `<span class="sheet-empty">nenhuma habilidade adicionada</span>`;
  } else {
    abBox.innerHTML = abilityRows.map(r => {
      if (!r.nome && !r.texto) return "";
      return `<div class="sheet-ability"><span class="aname">${r.nome||"habilidade"}${r.magica?" ✦":""}</span>${r.texto ? " — "+r.texto : ""}</div>`;
    }).join("");
  }

  // parceiros
  const partnerBox = document.getElementById('sh-partners');
  const validPartners = partnerRows.filter(r => r.nome || r.nota);
  partnerBox.innerHTML = validPartners.length === 0 ? "" :
    `<div class="sheet-line"><b>Parceiros</b></div>` +
    validPartners.map(r => `<div class="sheet-line">${r.nome||"parceiro"}${r.nota ? " — "+r.nota : ""}</div>`).join("");

  // atributos
  const attrTxt = ATRIBUTOS.map(a => {
    const el = document.getElementById('attr-' + a);
    const v  = el ? el.value : 0;
    return `${a.slice(0,3)} ${v>=0?("+"+v):v}`;
  }).join(", ");
  document.getElementById('sh-attrs').textContent = attrTxt;
  const pericias = val('in-pericias').trim();
  document.getElementById('sh-pericias').innerHTML = pericias ? `<b>Perícias</b> ${pericias}` : "";

  // tesouro
  const tesouro = val('in-tesouro');
  const equip   = val('in-equip').trim();
  const tesEsp  = val('in-tesouro-esp').trim();
  const cond    = val('in-equip-cond');
  const condTxt = cond === "avariado" ? " (avariado, −5)" : (cond === "destruido" ? " (destruído)" : "");
  document.getElementById('equip-cond-hint').textContent =
    cond === "avariado"  ? "Arma/ferramenta avariada impõe −5 nos testes; armadura/escudo avariado impõe −5 na Defesa. Se avariado de novo, o item é destruído." :
    cond === "destruido" ? "O item não pode ser usado e não concede nenhum benefício." : "";
  let tLine = `<b>Tesouro</b> ${tesouro}`;
  if (equip)  tLine += ` · Equipamento: ${equip}${condTxt}`;
  if (tesEsp) tLine += ` · ${tesEsp}`;
  document.getElementById('sh-tesouro').innerHTML = tLine;

  updateDanoTotalInfo();
}

function copySheet() {
  const nome     = val('in-nome').trim() || "nova ameaça";
  const nd       = ndSel.value;
  const tipo     = val('in-tipo');
  const tamanho  = val('in-tamanho');
  const funcaoKey = val('in-funcao');
  const funcaoTxt = funcaoKey ? `, ${FUNCOES[funcaoKey].nome.toLowerCase()}` : "";
  let out = `${nome.toUpperCase()}  —  ND ${nd}\n`;
  out += `${tamanho} ${tipo} (${roleLabel()}${funcaoTxt})\n`;
  const iniciativa = val('in-iniciativa').trim();
  const percepcao  = val('in-percepcao').trim();
  const sentidos   = val('in-sentidos').trim();
  const sentidosLine = [iniciativa?`Iniciativa ${iniciativa}`:"", percepcao?`Percepção ${percepcao}`:"", sentidos].filter(Boolean).join(", ");
  if (sentidosLine) out += `${sentidosLine}\n`;
  out += `Deslocamento ${val('out-deslocamento')}\n`;
  const resSave = id => {
    const which = val(id);
    return which === 'fort' ? val('st-fort') : which === 'media' ? val('st-media') : val('st-fraca');
  };
  out += `Defesa ${val('st-defesa')}, Fort +${resSave('st-fortval')}, Ref +${resSave('st-refval')}, Von +${resSave('st-vonval')}\n`;
  out += `Pontos de Vida ${val('st-pv')}\n`;
  const rd = val('in-rd').trim();
  if (rd) out += `${rd}\n`;
  attackRows.forEach(r => {
    const a = formatAttackLine(r);
    out += `${a.line}\n`;
  });
  abilityRows.forEach(r => {
    if (!r.nome && !r.texto) return;
    out += `${r.nome||"Habilidade"}${r.magica?" (mágica)":""}: ${r.texto}\n`;
  });
  partnerRows.forEach(r => {
    if (!r.nome && !r.nota) return;
    out += `Parceiro: ${r.nome||""}${r.nota ? " — "+r.nota : ""}\n`;
  });
  const attrTxt = ATRIBUTOS.map(a => {
    const el = document.getElementById('attr-' + a);
    const v  = el ? el.value : 0;
    return `${a.slice(0,3)} ${v>=0?("+"+v):v}`;
  }).join(", ");
  out += attrTxt + "\n";
  const pericias = val('in-pericias').trim();
  if (pericias) out += `Perícias: ${pericias}\n`;
  const cond2    = val('in-equip-cond');
  const condTxt2 = cond2 === "avariado" ? " (avariado, -5)" : (cond2 === "destruido" ? " (destruído)" : "");
  out += `Tesouro ${val('in-tesouro')}`;
  if (val('in-equip').trim())       out += `, Equipamento: ${val('in-equip').trim()}${condTxt2}`;
  if (val('in-tesouro-esp').trim()) out += `, ${val('in-tesouro-esp').trim()}`;

  navigator.clipboard.writeText(out).then(() => {
    const msg = document.getElementById('copied-msg');
    msg.textContent = "Ficha copiada!";
    setTimeout(() => msg.textContent = "", 2000);
  });
}

function resetAll() {
  if (!confirm("Começar uma nova ameaça do zero?")) return;
  document.querySelectorAll('input[type=text], input[type=number]').forEach(i => i.value = "");
  document.getElementById('in-pericias').value   = "";
  document.getElementById('in-equip').value      = "";
  document.getElementById('in-tesouro-esp').value = "";
  document.getElementById('in-rd').value         = "";
  document.getElementById('in-funcao').value     = "";
  document.getElementById('in-equip-cond').value = "normal";
  updateFuncaoLore();
  ndSel.value = "6";
  setRole('solo');
  attackRows  = [];
  abilityRows = [];
  partnerRows = [];
  renderAttackList();
  renderAbilityList();
  renderPartnerList();
  applyTableValues();
  renderSheet();
}

/* ============= Importar do Bestiário Oficial (AMEACAS_DB) ============= */

/** Converte uma entrada do AMEACAS_DB para o formato interno do Gerador (state) */
function dbToGeradorState(db) {
  // --- Tipo ---
  const tipoRaw = db.tipo || "";
  const tipos = ["Animal","Construto","Espírito","Humanoide","Monstro","Morto-vivo"];
  let tipo = "Animal";
  for (const t of tipos) { if (tipoRaw.includes(t)) { tipo = t; break; } }

  // --- Tamanho ---
  const tamMap = {"Minúsculo":"Minúsculo","Pequeno":"Pequeno","Médio":"Médio","Médio":"Médio","Grande":"Grande","Enorme":"Enorme","Colossal":"Colossal"};
  let tamanho = "Médio";
  for (const [k,v] of Object.entries(tamMap)) { if (tipoRaw.includes(k)) { tamanho = v; break; } }

  // --- Papel (role) ---
  const nd = db.nd || "1";
  const ndLower = nd.toLowerCase();
  let role = "solo";
  if (ndLower === "s" || ndLower === "s+") role = "solo";
  // Heurística: lacaios tendem a ser NDs baixos, especiais têm magia
  const temMagia = (db.habilidades || db.habilities || []).some(h =>
    (h.nome || "").toLowerCase().startsWith("magia")
  );
  const pvNum = parseInt(db.pv, 10) || 0;
  if (pvNum > 0 && pvNum < 20 && nd !== "S" && nd !== "S+" && !temMagia) role = "lacaio";
  if (temMagia && pvNum < 80) role = "especial";

  // --- Defesa, Resistências ---
  const defesa = parseInt(db.defesa, 10) || 10;
  const parseBonus = s => { const n = parseInt(String(s).replace(/[^0-9\-]/g,''),10); return isNaN(n)?0:n; };
  const forte  = parseBonus(db.fort);
  const media  = parseBonus(db.ref);
  const fraca  = parseBonus(db.von);

  // --- Fort/Ref/Von → valor (forte/media/fraca) ---
  const vals = [{v:forte,k:'fort'},{v:media,k:'media'},{v:fraca,k:'fraca'}];
  vals.sort((a,b)=>b.v-a.v);
  const fortval = vals[0].k;
  const refval  = vals[1].k;
  const vonval  = vals[2].k;

  // --- PV ---
  const pv = parseInt(db.pv, 10) || 20;

  // --- CD (inferir do ND) ---
  const ND_NUM_IMPORT = {"1/4":10,"1/2":12,"1":13,"2":14,"3":15,"4":16,"5":17,"6":18,"7":19,"8":20,"9":21,"10":22,"11":23,"12":24,"13":25,"14":26,"15":27,"16":28,"17":29,"18":30,"19":31,"20":32,"S":40,"S+":45};
  const cd = ND_NUM_IMPORT[nd] || 18;

  // --- RD / resistências (do defesaObs) ---
  const rd = (db.defesaObs && db.defesaObs !== "normal") ? db.defesaObs : "";

  // --- Atributos ---
  const ab = db.atributos || {};
  const attrMap = {"for":"Força","des":"Destreza","con":"Constituição","int":"Inteligência","sab":"Sabedoria","car":"Carisma"};
  const catByVal = v => {
    const n = parseInt(v, 10);
    if (n <= -5) return -5;
    if (n <= -3) return -4;
    if (n <= -1) return -1;
    if (n <= 1)  return 0;
    if (n <= 3)  return 2;
    if (n <= 5)  return 4;
    if (n <= 7)  return 6;
    return 8;
  };
  const attrs = {};
  for (const [k,v] of Object.entries(attrMap)) {
    const raw = ab[k];
    if (raw === undefined || raw === "—" || raw === "-") { attrs[v] = -1; continue; }
    attrs[v] = catByVal(parseInt(raw,10) || 0);
  }

  // --- Ataques ---
  const attacks = (db.ataques || []).map(a => {
    const bonus = parseBonus(a.bonus);
    const danoStr = a.dano || "";
    const diceMatch = danoStr.match(/(\d+d\d+)/);
    const dice = diceMatch ? diceMatch[1] : "1d8";
    let target = "";
    const m = dice.match(/(\d+)d(\d+)/);
    if (m) {
      const n = parseInt(m[1]), s = parseInt(m[2]);
      const avgDice = n * (s + 1) / 2;
      // Extrair bônus: após o dado, pegar número com sinal (ex: "2d6+5 corte" → 5)
      let bonusExtra = 0;
      const afterDice = danoStr.slice(danoStr.indexOf(dice) + dice.length).trim();
      const bonusMatch = afterDice.match(/^([+-]?\d+)/);
      if (bonusMatch) bonusExtra = parseInt(bonusMatch[1], 10);
      target = Math.round(avgDice + Math.abs(bonusExtra));
    }
    const nota = a.desc || "";
    return { id: attackSeq++, nome: a.nome || "Ataque", atk: bonus, dice, target: String(target), nota };
  });

  // --- Habilidades ---
  const abilities = (db.habilidades || db.habilities || []).map(h => {
    const isMagic = (h.nome || "").toLowerCase().includes("magia") ||
                    (h.desc || "").includes("Custos:") ||
                    (h.desc || "").includes("PM");
    return { id: abilitySeq++, nome: h.nome || "", magica: isMagic, texto: h.desc || "" };
  });

  // --- Perícias ---
  const periciasStr = (db.pericias || []).map(p => `${p.nome} ${p.valor}`).join(", ");

  // --- Sentidos ---
  const sentidos = db.percepcaoObs || "";

  // --- Deslocamento → loco + veloc ---
  const desl = db.desl || "";
  let loco = "bipede";
  if (/voo/i.test(desl)) loco = "voador";
  else if (/escal/i.test(desl)) loco = "escalador";
  else if (/escav/i.test(desl)) loco = "escavador";
  else if (/natação|nadador/i.test(desl)) loco = "nadador";
  else if (/quadr/i.test(desl)) loco = "quadrupede";

  // --- Tesouro ---
  const tesouro = db.tesouro || "Padrão";

  // --- Equipamento ---
  const equip = db.equipamento || "";

  return {
    nome: db.nome || "",
    conceito: "",
    funcao: "",
    tipo,
    tamanho,
    role,
    loco,
    veloc: "normal",
    nd,
    defesa: String(defesa),
    pv: String(pv),
    cd: String(cd),
    fort: String(forte),
    media: String(media),
    fraca: String(fraca),
    fortval,
    refval,
    vonval,
    rd,
    attacks,
    abilities,
    partners: [],
    attrs,
    pericias: periciasStr,
    iniciativa: db.iniciativa || "",
    percepcao: db.percepcao || "",
    sentidos,
    tesouro,
    equip,
    equipCond: "normal",
    tesouroEsp: ""
  };
}

/** Busca ameaças no AMEACAS_DB por texto, tipo e ND */
function searchAmeacasDB(query, tipoFiltro, ndFiltro) {
  const db = (typeof AMEACAS_DB !== 'undefined') ? AMEACAS_DB : [];
  const q = (query || "").toLowerCase().trim();
  const tf = (tipoFiltro || "").toLowerCase();
  const nf = ndFiltro || "";

  return db.filter(entry => {
    if (q && !entry.nome.toLowerCase().includes(q) && !(entry.tipo||'').toLowerCase().includes(q)) return false;
    if (tf && !(entry.tipo||'').toLowerCase().includes(tf)) return false;
    if (nf && entry.nd !== nf) return false;
    return true;
  });
}

/** Extrai tipos únicos de todas as ameaças do DB */
function getDBTiposUnicos() {
  const db = (typeof AMEACAS_DB !== 'undefined') ? AMEACAS_DB : [];
  const base = ["Animal","Construto","Espírito","Humanoide","Monstro","Morto-vivo"];
  const found = new Set();
  db.forEach(e => {
    const t = e.tipo || "";
    base.forEach(b => { if (t.includes(b)) found.add(b); });
    // Tipos extras que aparecem no DB
    if (/elemental/i.test(t)) found.add("Elemental");
    if (/limo/i.test(t)) found.add("Limo");
    if (/planta/i.test(t)) found.add("Planta");
  });
  return [...found].sort();
}

/** Extrai NDs únicos */
function getDBNDsUnicos() {
  const db = (typeof AMEACAS_DB !== 'undefined') ? AMEACAS_DB : [];
  const order = ["1/4","1/2","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","S","S+"];
  const found = new Set(db.map(e => e.nd));
  return order.filter(nd => found.has(nd));
}

/** Renderiza a lista de resultados da busca */
function renderSearchResults(results, container) {
  container.innerHTML = "";
  if (results.length === 0) {
    container.innerHTML = '<p class="hint" style="margin-top:0.4rem">nenhum resultado encontrado</p>';
    return;
  }
  results.slice(0, 50).forEach(entry => {
    const item = document.createElement('div');
    item.className = "import-item";
    item.innerHTML = `
      <div class="import-item-info">
        <b>${entry.nome}</b>
        <span class="nd-badge">ND ${entry.nd}</span>
        <span class="import-item-tipo">${entry.tipo || ""}</span>
        <span class="import-item-pv">PV ${entry.pv || "?"}</span>
      </div>
      <button class="mini-btn" onclick='importFromDBEntry(${JSON.stringify(entry).replace(/'/g,"\\'")})'>Importar</button>
    `;
    container.appendChild(item);
  });
}

/** Abre o painel de importação do bestiário oficial */
function openImportPanel() {
  const panel = document.getElementById('import-panel');
  if (!panel) return;
  panel.style.display = panel.style.display === "none" ? "block" : "none";
  if (panel.style.display === "block") {
    document.getElementById('import-search').focus();
    populateImportFilters();
    doImportSearch();
  }
}

/** Preenche os filtros de tipo e ND */
function populateImportFilters() {
  const tipoSel = document.getElementById('import-filter-tipo');
  const ndSel = document.getElementById('import-filter-nd');
  if (tipoSel && tipoSel.options.length <= 1) {
    getDBTiposUnicos().forEach(t => {
      const o = document.createElement('option');
      o.value = t.toLowerCase(); o.textContent = t;
      tipoSel.appendChild(o);
    });
  }
  if (ndSel && ndSel.options.length <= 1) {
    getDBNDsUnicos().forEach(nd => {
      const o = document.createElement('option');
      o.value = nd; o.textContent = "ND " + nd;
      ndSel.appendChild(o);
    });
  }
}

/** Executa a busca e renderiza resultados */
function doImportSearch() {
  const q = (document.getElementById('import-search') || {}).value || "";
  const tipo = (document.getElementById('import-filter-tipo') || {}).value || "";
  const nd = (document.getElementById('import-filter-nd') || {}).value || "";
  const results = searchAmeacasDB(q, tipo, nd);
  const count = document.getElementById('import-count');
  if (count) count.textContent = results.length;
  renderSearchResults(results, document.getElementById('import-results'));
}

/** Importa uma ameaça do DB para o Gerador */
function importFromDBEntry(dbEntry) {
  if (!confirm(`Importar "${dbEntry.nome}" (ND ${dbEntry.nd})? Os dados atuais da ficha serão substituídos.`)) return;
  const state = dbToGeradorState(dbEntry);
  applyState(state);
  renderAbilitySuggestions();
  const panel = document.getElementById('import-panel');
  if (panel) panel.style.display = "none";
  const msg = document.getElementById('copied-msg');
  if (msg) { msg.textContent = `"${dbEntry.nome}" importado!`; setTimeout(() => msg.textContent = "", 2500); }
  // Scroll para o topo do formulário
  const step0 = document.querySelector('.step[data-step="0"]');
  if (step0) { step0.classList.add('open'); step0.scrollIntoView({behavior:'smooth'}); }
}

/* ============= Inicialização ============= */
buildAttrGrid();
updateDeslocamentoOptions();
applyTableValues();
renderPartnerList();
renderBestiarioList();
renderSheet();
