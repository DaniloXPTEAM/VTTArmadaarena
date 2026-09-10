// =========================================================
//  GERENCIADOR DE COMBATE T20 (standalone)
//  - iniciativa editável + dados de rolagem rápida
//  - autocompletar com banco de dados oficial de ameaças
//  - duplicar (copiar) combatente
//  - condições (chips + descrição popover + duração)
//  - log opcional
//  - reset de rodada / novo combate
// =========================================================

const STORAGE_KEY = "t20_combat_app_v1";

let combatState = null;
let currentThreatData = null; // Armazena temporariamente os dados da criatura buscada no banco

document.addEventListener("DOMContentLoaded", () => {
  // Body transition suave
  document.body.style.transition = "background-color 0.3s ease, color 0.3s ease";

  combatInit();
});

function combatDefaultState() {
  return {
    round: 1,
    activeId: null,
    combatants: [],
    log: [],
    logOpen: false,
    autoSort: false
  };
}

function combatInit() {
  combatState = combatLoad() || combatDefaultState();

  // Normalizações defensivas
  if (!combatState || typeof combatState !== "object") combatState = combatDefaultState();
  if (!Array.isArray(combatState.combatants)) combatState.combatants = [];
  // Migração: garante que máximos existam e nunca aumentem automaticamente
  combatState.combatants.forEach(c => {
    if (!Number.isFinite(parseInt(c.hpCur))) c.hpCur = 0;
    if (!Number.isFinite(parseInt(c.mpCur))) c.mpCur = 0;
    if (!Number.isFinite(parseInt(c.hpMax))) c.hpMax = Math.max(0, parseInt(c.hpCur) || 0);
    if (!Number.isFinite(parseInt(c.mpMax))) c.mpMax = Math.max(0, parseInt(c.mpCur) || 0);
  });

  if (!Array.isArray(combatState.log)) combatState.log = [];
  combatState.round = clampInt(combatState.round, 1, 9999, 1);
  combatState.autoSort = !!combatState.autoSort;

  const auto = document.getElementById("combatAutoSort");
  if (auto) auto.checked = combatState.autoSort;

  // Enter no nome adiciona
  const nameInp = document.getElementById("combatNewName");
  if (nameInp) {
    nameInp.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        combatAddFromForm();
      }
    });
  }

  combatRender();
  // Validação do formulário de adicionar (nome + iniciativa obrigatórios)
  combatBindAddFormValidation();
  combatEnableDrag();
  combatLogRender();
  
  // Inicialização do Autocomplete do Bestiário
  combatInitDbAutocomplete();
}

function combatSetAutoSort(on) {
  combatState.autoSort = !!on;
  combatSave();
}

function combatSave() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(combatState));
  } catch (e) {
    console.warn("Falha ao salvar no localStorage", e);
  }
}

function combatLoad() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.warn("Falha ao ler localStorage", e);
    return null;
  }
}

// Sistema de Notificações Toast
function mostrarToast(mensagem, tipo = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${tipo}`;
  toast.textContent = mensagem;
  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('visible'));

  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// Inicializa Autocomplete do Bestiário Oficial
function combatInitDbAutocomplete() {
  const datalist = document.getElementById("combatDbDatalist");
  const searchInput = document.getElementById("combatDbSearch");
  if (!datalist || !searchInput) return;

  if (typeof AMEACAS_DB !== "undefined" && Array.isArray(AMEACAS_DB)) {
    const sortedAmeacas = [...AMEACAS_DB].sort((a, b) => (a.nome || "").localeCompare(b.nome || ""));
    datalist.innerHTML = sortedAmeacas.map(a => 
      `<option value="${escapeHtml(a.nome)}">${escapeHtml(a.tipo || "Criatura")} · ND ${escapeHtml(a.nd || "?")}</option>`
    ).join("");

    searchInput.addEventListener("input", () => {
      const val = (searchInput.value || "").trim();
      const match = AMEACAS_DB.find(a => (a.nome || "").toLowerCase() === val.toLowerCase());
      if (match) {
        currentThreatData = match;
        
        const nameInp = document.getElementById("combatNewName");
        const hpInp = document.getElementById("combatNewHP");
        const mpInp = document.getElementById("combatNewMP");
        const initInp = document.getElementById("combatNewInit");
        
        if (nameInp) nameInp.value = match.nome;
        if (hpInp) hpInp.value = parseInt(match.pv) || 0;
        if (mpInp) mpInp.value = parseInt(match.pm) || 0;
        
        // Auto rola iniciativa
        const initText = match.iniciativa || "+0";
        const initMod = parseInt(initText.replace("+", "")) || 0;
        const roll = Math.floor(Math.random() * 20) + 1;
        const totalInit = roll + initMod;
        
        if (initInp) initInp.value = totalInit;
        
        combatLogAdd(`🎲 Iniciativa auto-rolada para ${match.nome}: 1d20 (${roll}) + ${initMod} = ${totalInit}`);
        mostrarToast(`🎲 ${match.nome} iniciativa: ${totalInit} (1d20 [${roll}] + ${initMod})`, "sucesso");
        
        // Revalida formulário
        combatBindAddFormValidation();
      }
    });
  } else {
    console.warn("AMEACAS_DB não está disponível para o autocomplete.");
  }
}

// Limpa busca e reinicia dados de ameaça
function combatClearSearch() {
  const searchInput = document.getElementById("combatDbSearch");
  if (searchInput) searchInput.value = "";
  currentThreatData = null;
}

// Rolar iniciativa rápida no formulário
function combatRollNewInit() {
  const initInp = document.getElementById("combatNewInit");
  if (!initInp) return;
  const mod = parseInt(initInp.value) || 0;
  const roll = Math.floor(Math.random() * 20) + 1;
  const total = roll + mod;
  initInp.value = total;
  
  combatLogAdd(`🎲 Iniciativa rolada: 1d20 (${roll}) + ${mod} = ${total}`);
  mostrarToast(`🎲 Rolado: ${total} (1d20 [${roll}] + ${mod})`);
  
  combatBindAddFormValidation();
}

function combatBindAddFormValidation() {
  const initEl = document.getElementById("combatNewInit");
  const nameEl = document.getElementById("combatNewName");
  const btn = document.getElementById("combatAddBtn");
  const hint = document.getElementById("combatAddHint");
  if (!initEl || !nameEl || !btn) return;

  const validate = () => {
    const nameOk = (nameEl.value || "").trim().length > 0;
    const initOk = (initEl.value !== "" && initEl.value !== null && initEl.value !== undefined);
    btn.disabled = !(nameOk && initOk);
    btn.classList.toggle("is-disabled", btn.disabled);
    if (hint) hint.classList.toggle("show", btn.disabled);
  };

  initEl.addEventListener("input", validate);
  nameEl.addEventListener("input", validate);
  nameEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      validate();
      if (!btn.disabled) {
        e.preventDefault();
        combatAddFromForm();
      }
    }
  });

  validate();
}

function combatAddFromForm() {
  const init = parseInt(document.getElementById("combatNewInit")?.value) || 0;
  const name = (document.getElementById("combatNewName")?.value || "").trim();
  const hpCur = parseInt(document.getElementById("combatNewHP")?.value) || 0;
  const mpCur = parseInt(document.getElementById("combatNewMP")?.value) || 0;

  if (!name || (document.getElementById("combatNewInit")?.value === "")) {
    alert("Preencha Iniciativa e Nome para adicionar.");
    return;
  }

  let def = "";
  let res = "";
  let cd = "";
  let notesStr = "";
  
  // Se houver dados de criatura no banco e o nome inserido iniciar com o nome da criatura (ex: Goblin 1 começa com Goblin)
  if (currentThreatData && name.toLowerCase().startsWith(currentThreatData.nome.toLowerCase())) {
    def = currentThreatData.defesa + (currentThreatData.defesaObs ? ` (${currentThreatData.defesaObs})` : "");
    res = `Fort ${currentThreatData.fort || "+0"}, Ref ${currentThreatData.ref || "+0"}, Von ${currentThreatData.von || "+0"}`;
    
    // Tenta encontrar uma CD nas descrições de ataques ou habilidades
    const descTexts = [];
    if (Array.isArray(currentThreatData.ataques)) currentThreatData.ataques.forEach(a => descTexts.push(a.desc || ""));
    if (Array.isArray(currentThreatData.habilidades)) currentThreatData.habilidades.forEach(h => descTexts.push(h.desc || ""));
    const joinedText = descTexts.join(" ");
    const cdMatch = joinedText.match(/CD\s*(\d+)/i);
    if (cdMatch) cd = cdMatch[1];
    
    // Formata o resumo da criatura nas notas
    notesStr += `Tipo: ${currentThreatData.tipo || "—"} | ND: ${currentThreatData.nd || "—"}\n`;
    notesStr += `Deslocamento: ${currentThreatData.desl || "—"}\n`;
    if (currentThreatData.atributos) {
      const atr = currentThreatData.atributos;
      notesStr += `Atributos: FOR ${atr.for || "—"}, DES ${atr.des || "—"}, CON ${atr.con || "—"}, INT ${atr.int || "—"}, SAB ${atr.sab || "—"}, CAR ${atr.car || "—"}\n`;
    }
    if (currentThreatData.percepcao) {
      notesStr += `Percepção: ${currentThreatData.percepcao} ${currentThreatData.percepcaoObs ? `(${currentThreatData.percepcaoObs})` : ""}\n`;
    }
    if (currentThreatData.tesouro) {
      notesStr += `Tesouro: ${currentThreatData.tesouro}\n`;
    }
    notesStr += `\n--- ATAQUES ---\n`;
    if (Array.isArray(currentThreatData.ataques) && currentThreatData.ataques.length > 0) {
      currentThreatData.ataques.forEach(atk => {
        notesStr += `• ${atk.nome}: ${atk.tipo || ""} ${atk.bonus || ""} (${atk.dano || ""})${atk.desc ? ` - ${atk.desc}` : ""}\n`;
      });
    } else {
      notesStr += `Nenhum ataque registrado.\n`;
    }
    notesStr += `\n--- HABILIDADES ---\n`;
    if (Array.isArray(currentThreatData.habilidades) && currentThreatData.habilidades.length > 0) {
      currentThreatData.habilidades.forEach(hab => {
        notesStr += `• ${hab.nome} (${hab.tipo || ""}): ${hab.desc || ""}\n`;
      });
    } else {
      notesStr += `Nenhuma habilidade registrada.\n`;
    }
  }

  const id = `c${Date.now()}${Math.floor(Math.random() * 9999)}`;

  combatState.combatants.push({
    id,
    name,
    init,
    hpCur: clampInt(hpCur, -999999, 999999, 0),
    hpMax: clampInt(hpCur, 0, 999999, 0),
    mpCur: clampInt(mpCur, 0, 999999, 0),
    mpMax: clampInt(mpCur, 0, 999999, 0),
    notes: notesStr,
    conditions: [],
    stats: { def, res, cd },
    open: false
  });

  if (!combatState.activeId) combatState.activeId = id;

  // Limpa nome e busca
  document.getElementById("combatNewName").value = "";
  const dbSearchInput = document.getElementById("combatDbSearch");
  if (dbSearchInput) dbSearchInput.value = "";
  
  // Reseta estado temporário da ameaça para não auto-aplicar na próxima criação genérica
  currentThreatData = null;
  
  combatBindAddFormValidation();

  combatLogAdd(`+ ${name} (INI ${init})`);
  mostrarToast(`⚔️ "${name}" adicionado ao combate!`, "sucesso");
  combatRender();
  combatEnableDrag();
  combatSave();
}

function combatFind(id) {
  return combatState.combatants.find(x => x.id === id);
}

function combatIndexOfActive() {
  return combatState.combatants.findIndex(x => x.id === combatState.activeId);
}

function combatGetActiveName() {
  const c = combatFind(combatState.activeId);
  return c ? (c.name || "—") : "—";
}

function combatSetActive(id) {
  combatState.activeId = id;
  combatLogAdd(`Vez: ${combatGetActiveName()}`);
  mostrarToast(` Vez de: ${combatGetActiveName()}`);
  combatRender();
  combatSave();
}

function combatToggleDetails(id) {
  const c = combatFind(id);
  if (!c) return;
  c.open = !c.open;
  combatRender();
  combatSave();
}

function combatRowClick(id, ev) {
  // Clique em inputs/textareas/selects/botões não abre/fecha
  const tag = (ev.target && ev.target.tagName) ? ev.target.tagName.toUpperCase() : "";
  if (["INPUT", "TEXTAREA", "SELECT", "BUTTON", "I"].includes(tag)) return;
  combatToggleDetails(id);
}

function combatUpdateInit(id, value) {
  const c = combatFind(id);
  if (!c) return;
  c.init = parseInt(value) || 0;
  if (combatState.autoSort) combatSort();
  combatSave();
}

function combatUpdateNumber(id, field, value) {
  const c = combatFind(id);
  if (!c) return;
  const n = parseInt(value);
  c[field] = Number.isFinite(n) ? n : 0;

  // Máximos só mudam manualmente
  if (field === "hpMax") c.hpMax = clampInt(c.hpMax, 0, 999999, 0);
  if (field === "mpMax") c.mpMax = clampInt(c.mpMax, 0, 999999, 0);

  // Permite PV negativo
  if (field === "hpCur") c.hpCur = clampInt(c.hpCur, -999999, 999999, 0);
  if (field === "mpCur") c.mpCur = clampInt(c.mpCur, 0, 999999, 0);

  combatRefreshBadges(id);
  combatSave();
}

function combatDelta(id, field, delta) {
  const c = combatFind(id);
  if (!c) return;

  const before = parseInt(c[field]) || 0;
  let next = before + delta;
  if (field === "mpCur" && next < 0) next = 0;
  c[field] = next;

  combatRefreshBadges(id);
  combatRenderMiniFieldsIfOpen(id);

  // Log amigável
  const who = c.name || "—";
  const label = field === "hpCur" ? "PV" : field === "mpCur" ? "PM" : field;
  const sign = delta > 0 ? `+${delta}` : `${delta}`;
  combatLogAdd(`${who}: ${label} ${sign} → ${next}`);

  combatSave();
}

function combatRenderMiniFieldsIfOpen(id) {
  const c = combatFind(id);
  if (!c) return;
  const wrap = document.getElementById(`combatDetails-${id}`);
  if (!wrap) return;

  const map = {
    hpCur: `combatHPcur-${id}`,
    hpMax: `combatHPmax-${id}`,
    mpCur: `combatMPcur-${id}`,
    mpMax: `combatMPmax-${id}`,
  };

  Object.entries(map).forEach(([field, elId]) => {
    const el = document.getElementById(elId);
    if (el) el.value = parseInt(c[field]) || 0;
  });
}

function combatUpdateNotes(id, value) {
  const c = combatFind(id);
  if (!c) return;
  c.notes = value;

  combatSave();
  combatRenderNoteIndicator(id);
}

// Exibe seletor de anotação
function combatRenderNoteIndicator(id) {
  const c = combatFind(id);
  if (!c) return;
  const ind = document.getElementById(`combatNoteIndicator-${id}`);
  if (!ind) return;
  const has = (c.notes || "").trim().length > 0;
  ind.classList.toggle("has-notes", has);
}

function combatUpdateStats(id, field, value) {
  const c = combatFind(id);
  if (!c) return;
  if (!c.stats) c.stats = { def: "", res: "", cd: "" };
  c.stats[field] = value;
  combatSave();
}

function combatRefreshBadges(id) {
  const c = combatFind(id);
  if (!c) return;

  const hpTxt = document.getElementById(`combatHPText-${id}`);
  const mpTxt = document.getElementById(`combatMPText-${id}`);
  const hpFill = document.getElementById(`combatHPFill-${id}`);
  const mpFill = document.getElementById(`combatMPFill-${id}`);

  const hpCur = clampInt(c.hpCur, -999999, 999999, 0);
  const hpMax = clampInt(c.hpMax, 0, 999999, 0);
  const mpCur = clampInt(c.mpCur, 0, 999999, 0);
  const mpMax = clampInt(c.mpMax, 0, 999999, 0);

  const hpDisplay = hpCur > hpMax ? `+${hpCur}` : `${hpCur}`;
  const mpDisplay = mpCur > mpMax ? `+${mpCur}` : `${mpCur}`;

  const hpPct = hpMax > 0 ? clampNum((Math.max(0, Math.min(hpCur, hpMax)) / hpMax) * 100, 0, 100) : 0;
  const mpPct = mpMax > 0 ? clampNum((Math.max(0, Math.min(mpCur, mpMax)) / mpMax) * 100, 0, 100) : 0;

  if (hpTxt) hpTxt.textContent = `PV ${hpDisplay}/${hpMax}`;
  if (mpTxt) mpTxt.textContent = `PM ${mpDisplay}/${mpMax}`;
  if (hpFill) hpFill.style.width = `${hpPct}%`;
  if (mpFill) mpFill.style.width = `${mpPct}%`;

  combatRenderNoteIndicator(id);
  combatRenderNameState(id);
}

function combatRenderNameState(id) {
  const c = combatFind(id);
  if (!c) return;
  const nameEl = document.getElementById(`combatName-${id}`);
  if (!nameEl) return;

  const hpCur = parseInt(c.hpCur) || 0;
  const hpMax = parseInt(c.hpMax) || 0;
  const low = hpMax > 0 && hpCur >= 0 && (hpCur / hpMax) < 0.25;
  const dead = hpCur < 0;

  nameEl.classList.toggle("hp-low", low);
  nameEl.classList.toggle("hp-dead", dead);
}

function combatRemove(id) {
  const c = combatFind(id);
  if (!c) return;
  if (!confirm(`Remover "${c.name}"?`)) return;

  const idx = combatState.combatants.findIndex(x => x.id === id);
  if (idx >= 0) combatState.combatants.splice(idx, 1);

  if (combatState.activeId === id) {
    combatState.activeId = combatState.combatants[0]?.id || null;
  }

  combatLogAdd(`- ${c.name}`);
  mostrarToast(`🗑️ ${c.name} removido.`, "aviso");
  combatRender();
  combatEnableDrag();
  combatSave();
}

function combatDuplicate(id) {
  const src = combatFind(id);
  if (!src) return;

  const copy = deepClone(src);
  copy.id = `c${Date.now()}${Math.floor(Math.random() * 9999)}`;
  copy.name = incrementName(src.name || "Cópia");
  copy.open = false;

  const idx = combatState.combatants.findIndex(x => x.id === id);
  if (idx >= 0) combatState.combatants.splice(idx + 1, 0, copy);
  else combatState.combatants.push(copy);

  combatLogAdd(`⎘ ${src.name} → ${copy.name}`);
  mostrarToast(`📋 Criada cópia de ${src.name}!`);
  combatRender();
  combatEnableDrag();
  combatSave();
}

/** Condições **/
const CONDITION_INFO = {
  "Abalado": "O personagem sofre -2 em testes de perícia. Se ficar abalado novamente, em vez disso fica apavorado. (Medo)",
  "Agarrado": "O personagem fica desprevenido e imóvel, sofre -2 em testes de ataque e só pode atacar com armas leves. Ataques à distância contra um alvo envolvido em uma manobra de agarrar têm 50% de chance de acertar o alvo errado. (Movimento)",
  "Alquebrado": "O custo em pontos de mana das habilidades do personagem aumenta em +1. (Mental)",
  "Apavorado": "O personagem sofre -5 em testes de perícia e não pode se aproximar voluntariamente da fonte do medo. (Medo)",
  "Atordoado": "O personagem fica desprevenido e não pode fazer ações. (Mental)",
  "Caído": "O personagem sofre –5 na Defesa contra ataques corpo a corpo e recebe +5 na Defesa contra ataques à distância (cumulativos com outras condições). Além disso, sofre –5 em ataques corpo a corpo e seu deslocamento é reduzido a 1,5m.",
  "Cego": "O personagem fica desprevenido e lento, não pode fazer testes de Percepção para observar e sofre -5 em testes de perícias baseadas em Força ou Destreza. Todos os alvos de seus ataques recebem camuflagem total. Você é considerado cego enquanto estiver em uma área de escuridão total, a menos que algo lhe permita perceber no escuro. (Sentidos)",
  "Confuso": "O personagem comporta-se de modo aleatório. Role 1d6 no início de seus turnos. 1) Movimenta-se em uma direção escolhida por uma rolagem de 1d8; 2-3) Não pode fazer ações, e fica balbuciando incoerentemente; 4-5) Usa a arma que estiver empunhando para atacar a criatura mais próxima, ou a si mesmo se estiver sozinho (nesse caso, apenas role o dano); 6) A condição termina e pode agir normalmente. (Mental)",
  "Debilitado": "O personagem sofre -5 em testes de Força, Destreza e Constituição e em testes de perícias baseadas nesses atributos. Se o personagem ficar debilitado novamente, em vez disso fica inconsciente.",
  "Desprevenido": "O personagem sofre -5 na Defesa e em Reflexos. Você fica desprevenido contra inimigos que não possa perceber.",
  "Doente": "Sob efeito de uma doença. (Metabolismo)",
  "Em Chamas": "O personagem está pegando fogo. No início de seus turnos, sofre 1d6 pontos de dano de fogo. O personagem pode gastar uma ação padrão para apagar o fogo com as mãos. Imersão em água também apaga as chamas.",
  "Enfeitiçado": "O personagem se torna prestativo em relação à fonte da condição. Ele não fica sob controle da fonte, mas percebe suas palavras e ações da maneira mais favorável possível. A fonte da condição recebe +10 em testes de Diplomacia com o personagem. (Mental)",
  "Enjoado": "O personagem só pode realizar uma ação padrão ou de movimento (não ambas) por rodada. Ele pode gastar uma ação padrão para fazer uma investida, mas pode avançar no máximo seu deslocamento (e não o dobro). (Metabolismo)",
  "Enredado": "O personagem fica lento, vulnerável e sofre -2 em testes de ataque. (Movimento)",
  "Envenenado": "O efeito desta condição varia de acordo com o veneno. Pode ser perda de vida recorrente ou outra condição (como fraco ou enjoado). Perda de vida recorrente por venenos é cumulativa. (Veneno)",
  "Esmorecido": "O personagem sofre -5 em testes de Inteligência, Sabedoria e Carisma e em testes de perícias baseadas nesses atributos. (Mental)",
  "Exausto": "O personagem fica debilitado, lento e vulnerável. Se ficar exausto novamente, em vez disso fica inconsciente. (Cansaço)",
  "Fascinado": "Com a atenção presa em alguma coisa. O personagem sofre -5 em Percepção e não pode fazer ações, exceto observar aquilo que o fascinou. Esta condição é anulada por ações hostis contra o personagem ou se o que o fascinou não estiver mais visível. Balançar uma criatura fascinada para tirá-la desse estado gasta uma ação padrão. (Mental).",
  "Fatigado": "O personagem fica fraco e vulnerável. Se ficar fatigado novamente, em vez disso fica exausto. (Cansaço)",
  "Fraco": "O personagem sofre -2 em testes de Força, Destreza e Constituição e em testes de perícias baseadas nesses atributos. Se ficar fraco novamente, em vez disso fica debilitado.",
  "Frustrado": "O personagem sofre -2 em testes de Inteligência, Sabedoria e Carisma e em testes de perícias baseadas nesses atributos. Se ficar frustrado novamente, em vez disso fica esmorecido. (Mental)",
  "Imóvel": "Todas as formas de deslocamento do personagem são reduzidas a 0 metros. (Movimento)",
  "Inconsciente": "O personagem fica indefeso e não pode fazer ações, incluindo reações (mas ainda pode fazer testes que sejam naturalmente feitos quando se está inconsciente, como testes de Constituição para estabilizar sangramento). Balançar uma criatura para acordá-la gasta uma ação padrão.",
  "Indefeso": "O personagem fica desprevenido, mas sofre -10 na Defesa, falha automaticamente em testes de Reflexos e pode sofrer golpes de misericórdia.",
  "Lento": "Todas as formas de deslocamento do personagem são reduzidas à metade (arredonde para baixo para o primeiro incremento de 1,5 metros) e ele não pode correr ou fazer investidas. (Movimento)",
  "Ofuscado": "O personagem sofre -2 em testes de ataque e de Percepção. (Sentidos)",
  "Paralisado": "Fica imóvel e indefeso e só pode realizar ações puramente mentais. (Movimento)",
  "Pasmo": "Não pode fazer ações. (Mental)",
  "Petrificado": "O personagem fica inconsciente e recebe redução de dano 8. (Metamorfose)",
  "Sangrando": "No início de seu turno, o personagem deve fazer um teste de Constituição (CD 15). Se falhar, perde 1d6 pontos de vida e continua sangrando. Se passar, remove essa condição. (Metabolismo)",
  "Sobrecarregado": "O personagem sofre penalidade de armadura -5 e seu deslocamento é reduzido em -3 metros. (Movimento)",
  "Surdo": "O personagem não pode fazer testes de Percepção para ouvir e sofre -5 em testes de Iniciativa. Além disso, é considerado em condição ruim para lançar magias. (Sentidos)",
  "Surpreendido": "O personagem fica desprevenido e não pode fazer ações.",
  "Vulnerável": "O personagem sofre -2 na Defesa.",
};
const CONDITION_LIST = Object.keys(CONDITION_INFO).sort((a,b)=>a.localeCompare(b, "pt-BR"));

function combatAddCondition(id) {
  const c = combatFind(id);
  if (!c) return;

  const sel = document.getElementById(`condSel-${id}`);
  const durInp = document.getElementById(`condDur-${id}`);
  if (!sel) return;

  const name = (sel.value || "").trim();
  const dur = clampInt(parseInt(durInp?.value), 0, 999, 1);

  if (!name) return;

  if (!Array.isArray(c.conditions)) c.conditions = [];
  c.conditions.push({ name, remaining: dur });

  combatLogAdd(`${c.name}: + condição "${name}" (${dur}r)`);
  mostrarToast(`✨ ${c.name}: + Condição "${name}" (${dur}r)`);
  combatRender();
  combatSave();
}

function combatSyncCondControls(id) {
  const sel = document.getElementById(`condSel-${id}`);
  const infoBtn = document.getElementById(`condInfoBtn-${id}`);
  const addBtn = document.getElementById(`condAddBtn-${id}`);
  const has = !!(sel && (sel.value || "").trim());
  if (infoBtn) infoBtn.disabled = !has;
  if (addBtn) addBtn.disabled = !has;
  if (!has) {
    const pop = document.getElementById(`condPop-${id}`);
    if (pop) pop.classList.add("d-none");
  }
}

function combatCondBump(id, idx, delta) {
  const c = combatFind(id);
  if (!c || !Array.isArray(c.conditions)) return;
  const cond = c.conditions[idx];
  if (!cond) return;

  cond.remaining = clampInt((parseInt(cond.remaining) || 0) + delta, 0, 999, 0);
  combatLogAdd(`${c.name}: ${cond.name} → ${cond.remaining}r`);
  if (cond.remaining <= 0) {
    c.conditions.splice(idx, 1);
    combatLogAdd(`${c.name}: condição "${cond.name}" acabou`);
    mostrarToast(`⌛ ${c.name}: Condição "${cond.name}" expirou.`);
  }
  combatRender();
  combatSave();
}

function combatCondRemove(id, idx) {
  const c = combatFind(id);
  if (!c || !Array.isArray(c.conditions)) return;
  const cond = c.conditions[idx];
  if (!cond) return;
  c.conditions.splice(idx, 1);
  combatLogAdd(`${c.name}: - condição "${cond.name}"`);
  combatRender();
  combatSave();
}

function combatTickConditionsOnLeaveCurrentTurn() {
  const cur = combatFind(combatState.activeId);
  if (!cur || !Array.isArray(cur.conditions) || cur.conditions.length === 0) return;

  const before = cur.conditions.map(x => ({...x}));
  cur.conditions.forEach(x => {
    if (Number.isFinite(parseInt(x.remaining)) && parseInt(x.remaining) > 0) {
      x.remaining = parseInt(x.remaining) - 1;
    }
  });
  
  // Remove as que zeraram
  cur.conditions = cur.conditions.filter(x => (parseInt(x.remaining) || 0) > 0);

  // Log mudanças
  before.forEach((b) => {
    const after = cur.conditions.find(x => x.name === b.name);
    if (!after && (parseInt(b.remaining) || 0) > 0) {
      combatLogAdd(`${cur.name}: condição "${b.name}" acabou`);
      mostrarToast(`⌛ ${cur.name}: Condição "${b.name}" expirou.`, "aviso");
    }
  });
}

/** Turnos / Rodadas **/
function combatNextTurn() {
  if (combatState.combatants.length === 0) return;

  combatTickConditionsOnLeaveCurrentTurn();

  let idx = combatIndexOfActive();
  if (idx < 0) idx = 0;

  idx += 1;
  if (idx >= combatState.combatants.length) {
    idx = 0;
    combatState.round = clampInt((parseInt(combatState.round) || 1) + 1, 1, 9999, 1);
    combatLogAdd(`— Rodada ${combatState.round} —`);
    mostrarToast(`🔔 Nova Rodada: ${combatState.round}!`, "aviso");
  }

  combatState.activeId = combatState.combatants[idx].id;
  combatLogAdd(`Vez: ${combatGetActiveName()}`);
  mostrarToast(` Vez de: ${combatGetActiveName()}`);
  combatRender();
  combatSave();
}

function combatPrevTurn() {
  if (combatState.combatants.length === 0) return;

  let idx = combatIndexOfActive();
  if (idx < 0) idx = 0;

  idx -= 1;
  if (idx < 0) {
    idx = combatState.combatants.length - 1;
    combatState.round = clampInt((parseInt(combatState.round) || 1) - 1, 1, 9999, 1);
    combatLogAdd(`↩ volta (Rodada ${combatState.round})`);
  }

  combatState.activeId = combatState.combatants[idx].id;
  combatLogAdd(`Vez: ${combatGetActiveName()}`);
  combatRender();
  combatSave();
}

function combatResetRound() {
  combatState.round = 1;
  combatLogAdd(`⟳ Rodada resetada para 1`);
  mostrarToast(`⟳ Rodada resetada para 1`);
  combatRender();
  combatSave();
}

function combatNew() {
  if (!confirm("Novo combate: limpar lista, rodada, vez e log?")) return;
  combatState = combatDefaultState();
  combatSave();
  combatRender();
  combatEnableDrag();
  combatLogRender();
  mostrarToast("⚔️ Combate reiniciado!");
}

/** Ordenação / Drag **/
function combatSort() {
  combatState.combatants.sort((a, b) => {
    const ia = parseInt(a.init) || 0;
    const ib = parseInt(b.init) || 0;
    if (ib !== ia) return ib - ia;
    return (a.name || "").toLowerCase().localeCompare((b.name || "").toLowerCase());
  });

  if (combatState.combatants.length > 0 && !combatFind(combatState.activeId)) {
    combatState.activeId = combatState.combatants[0].id;
  }

  combatLogAdd("⇅ Ordenado por iniciativa");
  mostrarToast("⇅ Lista ordenada por Iniciativa!");
  combatRender();
  combatEnableDrag();
  combatSave();
}

function combatEnableDrag() {
  const list = document.getElementById("combatList");
  if (!list || typeof Sortable === "undefined") return;

  if (list._sortableCombat) return;

  list._sortableCombat = new Sortable(list, {
    animation: 150,
    handle: ".drag-handle",
    onEnd: () => {
      const ids = Array.from(list.querySelectorAll(".combat-row")).map(el => el.getAttribute("data-id"));
      combatState.combatants.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
      combatLogAdd("↕ desempate manual (arraste)");
      combatSave();
    }
  });
}

/** Export/Import **/
function combatExport() {
  const blob = new Blob([JSON.stringify(combatState, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "combate_t20.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  mostrarToast("💾 Dados de combate exportados!");
}

function combatImport(input) {
  const file = input.files && input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data || typeof data !== "object") throw new Error("JSON inválido");

      const next = combatDefaultState();
      next.round = clampInt(data.round, 1, 9999, 1);
      next.activeId = data.activeId || null;
      next.log = Array.isArray(data.log) ? data.log : [];
      next.logOpen = !!data.logOpen;

      next.combatants = Array.isArray(data.combatants) ? data.combatants : [];
      next.combatants = next.combatants.map((c, i) => ({
        id: c.id || (`c${Date.now()}${i}`),
        name: c.name || "—",
        init: parseInt(c.init) || 0,
        hpCur: clampInt(c.hpCur, -999999, 999999, 0),
        hpMax: clampInt(c.hpMax, 0, 999999, clampInt(c.hpCur,0,999999,0)),
        mpCur: clampInt(c.mpCur, 0, 999999, 0),
        mpMax: clampInt(c.mpMax, 0, 999999, clampInt(c.mpCur,0,999999,0)),
        notes: c.notes || "",
        conditions: Array.isArray(c.conditions) ? c.conditions.map(x => ({
          name: (x.name || "").toString(),
          remaining: clampInt(x.remaining, 0, 999, 1)
        })) : [],
        stats: c.stats && typeof c.stats === "object" ? {
          def: c.stats.def ?? "",
          res: c.stats.res ?? "",
          cd: c.stats.cd ?? ""
        } : { def:"", res:"", cd:"" },
        open: false
      }));

      if (next.combatants.length > 0 && !next.activeId) next.activeId = next.combatants[0].id;

      combatState = next;
      combatLogAdd("⬆ combate carregado");
      mostrarToast("⬆ Combate importado com sucesso!", "sucesso");
      combatSave();
      combatRender();
      combatEnableDrag();
      combatLogRender();
    } catch (err) {
      alert("Erro ao carregar combate. Certifique-se de que é um JSON válido.");
      console.error(err);
    }
  };

  reader.readAsText(file);
  input.value = "";
}

/** Log **/
function combatLogAdd(text) {
  const entry = `${stamp()} [R${combatState.round}] ${text}`;
  combatState.log.push(entry);
  if (combatState.log.length > 200) combatState.log.shift();
  combatLogRender();
}

function combatToggleLog() {
  combatState.logOpen = !combatState.logOpen;
  combatLogRender();
  combatSave();
}

function combatClearLog() {
  if (!confirm("Limpar o log?")) return;
  combatState.log = [];
  combatLogRender();
  combatSave();
  mostrarToast("Log limpo.");
}

function combatLogRender() {
  const wrap = document.getElementById("combatLogWrap");
  const log = document.getElementById("combatLog");
  if (!wrap || !log) return;

  wrap.classList.toggle("d-none", !combatState.logOpen);
  log.textContent = (combatState.log || []).slice().reverse().join("\n");
}

/** Render **/
function combatRender() {
  const list = document.getElementById("combatList");
  if (!list) return;

  if (!combatState.activeId && combatState.combatants.length > 0) {
    combatState.activeId = combatState.combatants[0].id;
  }

  // Mini topo
  const roundMini = document.getElementById("combatRoundMini");
  if (roundMini) roundMini.innerText = combatState.round;

  const activeMini = document.getElementById("combatActiveMini");
  if (activeMini) activeMini.innerText = combatGetActiveName();

  list.innerHTML = combatState.combatants.map(c => combatRowHTML(c)).join("");

  // Marca ativo e configurações específicas
  combatState.combatants.forEach(c => {
    const row = document.getElementById(`combatRow-${c.id}`);
    if (!row) return;
    row.classList.toggle("active-turn", c.id === combatState.activeId);
    row.classList.toggle("open", !!c.open);
    combatRenderNoteIndicator(c.id);

    // Clique numa condição
    row.querySelectorAll(".cond-chip").forEach(ch => {
      if (ch.dataset.bound) return;
      ch.dataset.bound = "1";
      ch.addEventListener("click", (ev) => {
        const nm = ch.getAttribute("data-cond") || "";
        combatSetCondHelp(c.id, nm);
        ev.stopPropagation();
      });
    });
  });

  // Aplica presets no select de condições
  combatState.combatants.forEach(c => {
    const sel = document.getElementById(`condSel-${c.id}`);
    if (!sel) return;
    if (sel.options.length === 0) {
      const opt0 = document.createElement("option");
      opt0.value = "";
      opt0.textContent = "—";
      sel.appendChild(opt0);

      CONDITION_LIST.forEach(n => {
        const opt = document.createElement("option");
        opt.value = n;
        opt.textContent = n;
        sel.appendChild(opt);
      });
    }

    if (!sel.dataset.bound) {
      sel.dataset.bound = "1";
      sel.addEventListener("change", () => {
        combatSetCondHelp(c.id, sel.value);
        combatSyncCondControls(c.id);
      });
    }
    combatSyncCondControls(c.id);
    if (sel.value) combatSetCondHelp(c.id, sel.value);
  });
}

function combatRowHTML(c) {
  const init = parseInt(c.init) || 0;
  const hpCur = clampInt(c.hpCur, -999999, 999999, 0);
  const hpMax = clampInt(c.hpMax, 0, 999999, 0);
  const mpCur = clampInt(c.mpCur, 0, 999999, 0);
  const mpMax = clampInt(c.mpMax, 0, 999999, 0);
  const hasNotes = (c.notes || "").trim().length > 0;
  const open = !!c.open;

  const noteClass = hasNotes ? "has-notes" : "";
  const detailsClass = open ? "" : "d-none";

  const condHTML = (Array.isArray(c.conditions) && c.conditions.length)
    ? `<div class="chip-row mt-2">${c.conditions.map((x, i) => `
        <span class="cond-chip" data-cond="${escapeAttr(x.name)}" title="${escapeAttr(combatCondDesc(x.name))}">
          ${escapeHtml(x.name)} <span class="n">${clampInt(x.remaining,0,999,1)}r</span>
          <button title="-1" onclick="combatCondBump('${c.id}',${i},-1); event.stopPropagation();">-</button>
          <button title="+1" onclick="combatCondBump('${c.id}',${i},+1); event.stopPropagation();">+</button>
          <button title="Remover" onclick="combatCondRemove('${c.id}',${i}); event.stopPropagation();">×</button>
        </span>
      `).join("")}</div>`
    : `<div class="text-muted" style="font-size: 0.78rem; font-style: italic; margin-top: 6px;">Sem condições ativas.</div>`;

  const hpDisplay = hpCur > hpMax ? `+${hpCur}` : `${hpCur}`;
  const mpDisplay = mpCur > mpMax ? `+${mpCur}` : `${mpCur}`;
  const hpPct = hpMax > 0 ? clampNum((Math.max(0, Math.min(hpCur, hpMax)) / hpMax) * 100, 0, 100) : 0;
  const mpPct = mpMax > 0 ? clampNum((Math.max(0, Math.min(mpCur, mpMax)) / mpMax) * 100, 0, 100) : 0;

  // Nome em estado (PV baixo/negativo)
  const low = hpMax > 0 && hpCur >= 0 && (hpCur / hpMax) < 0.25;
  const dead = hpCur < 0;
  const nameStateClass = dead ? "hp-dead" : low ? "hp-low" : "";

  return `
  <div class="combat-row" id="combatRow-${c.id}" data-id="${c.id}">
    <div class="combat-summary" onclick="combatRowClick('${c.id}', event)">
      <div class="cs-ini">
        <i class="bi bi-grip-vertical drag-handle" title="Arrastar"></i>
        <input class="combat-init-input" type="number" inputmode="numeric" value="${init}"
          title="Editar iniciativa"
          onclick="event.stopPropagation()"
          oninput="combatUpdateInit('${c.id}', this.value)">
      </div>

      <div class="cs-name text-start">
        <span id="combatName-${c.id}" class="combat-name ${nameStateClass}">${escapeHtml(c.name || "—")}</span>
        <span id="combatNoteIndicator-${c.id}" class="combat-note-indicator ${noteClass}" title="Anotações">📝</span>
      </div>

      <div class="cs-right" onclick="event.stopPropagation()">
        <div class="combat-badges">
          <div class="bar-mini hp" title="PV atual / máximo">
            <div id="combatHPFill-${c.id}" class="fill" style="width:${hpPct}%"></div>
            <div id="combatHPText-${c.id}" class="txt">PV ${hpDisplay}/${hpMax}</div>
          </div>
          <div class="bar-mini mp" title="PM atual / máximo">
            <div id="combatMPFill-${c.id}" class="fill" style="width:${mpPct}%"></div>
            <div id="combatMPText-${c.id}" class="txt">PM ${mpDisplay}/${mpMax}</div>
          </div>
        </div>

        <div class="combat-actions-inline" onclick="event.stopPropagation()">
          <button class="btn btn-sm btn-icon-only" onclick="combatDuplicate('${c.id}'); event.stopPropagation();" title="Duplicar">
            <i class="bi bi-files"></i>
          </button>
          <button class="btn btn-sm btn-icon-only text-danger" onclick="combatRemove('${c.id}'); event.stopPropagation();" title="Remover">
            <i class="bi bi-trash"></i>
          </button>
        </div>

        <span class="combat-chev" aria-hidden="true">${open ? "▴" : "▾"}</span>
      </div>
    </div>

    <div id="combatDetails-${c.id}" class="combat-details ${detailsClass}">
      <div class="combat-details-grid">
        
        <!-- Bloco de PV -->
        <div class="combat-subbox">
          <div class="subbox-header">
            <span class="subbox-title hp-title">PV</span>
            <div class="combat-quick-btn-group">
              <button class="btn combat-quick-btn" onclick="combatDelta('${c.id}','hpCur',-5); event.stopPropagation();">-5</button>
              <button class="btn combat-quick-btn" onclick="combatDelta('${c.id}','hpCur',-1); event.stopPropagation();">-1</button>
              <button class="btn combat-quick-btn" onclick="combatDelta('${c.id}','hpCur',+1); event.stopPropagation();">+1</button>
              <button class="btn combat-quick-btn" onclick="combatDelta('${c.id}','hpCur',+5); event.stopPropagation();">+5</button>
            </div>
          </div>
          <div class="combat-inline-fields">
            <div class="form-group">
              <label class="t20-label">Atual</label>
              <input id="combatHPcur-${c.id}" class="form-control t20-input text-center" type="number" inputmode="numeric" value="${hpCur}" oninput="combatUpdateNumber('${c.id}','hpCur',this.value)">
            </div>
            <div class="form-group">
              <label class="t20-label">Máx</label>
              <input id="combatHPmax-${c.id}" class="form-control t20-input text-center" type="number" inputmode="numeric" value="${hpMax}" oninput="combatUpdateNumber('${c.id}','hpMax',this.value)">
            </div>
          </div>
        </div>

        <!-- Bloco de PM -->
        <div class="combat-subbox">
          <div class="subbox-header">
            <span class="subbox-title mp-title">PM</span>
            <div class="combat-quick-btn-group">
              <button class="btn combat-quick-btn" onclick="combatDelta('${c.id}','mpCur',-5); event.stopPropagation();">-5</button>
              <button class="btn combat-quick-btn" onclick="combatDelta('${c.id}','mpCur',-1); event.stopPropagation();">-1</button>
              <button class="btn combat-quick-btn" onclick="combatDelta('${c.id}','mpCur',+1); event.stopPropagation();">+1</button>
              <button class="btn combat-quick-btn" onclick="combatDelta('${c.id}','mpCur',+5); event.stopPropagation();">+5</button>
            </div>
          </div>
          <div class="combat-inline-fields">
            <div class="form-group">
              <label class="t20-label">Atual</label>
              <input id="combatMPcur-${c.id}" class="form-control t20-input text-center" type="number" inputmode="numeric" value="${mpCur}" oninput="combatUpdateNumber('${c.id}','mpCur',this.value)">
            </div>
            <div class="form-group">
              <label class="t20-label">Máx</label>
              <input id="combatMPmax-${c.id}" class="form-control t20-input text-center" type="number" inputmode="numeric" value="${mpMax}" oninput="combatUpdateNumber('${c.id}','mpMax',this.value)">
            </div>
          </div>
        </div>

        <!-- Estatísticas Defesa/Resistência/CD -->
        <div class="combat-subbox details-span-all">
          <div class="stats-inputs-row">
            <div class="form-group">
              <label class="t20-label">Defesa</label>
              <input class="form-control t20-input" value="${escapeHtml(c.stats?.def ?? "")}" oninput="combatUpdateStats('${c.id}','def', this.value)">
            </div>
            <div class="form-group">
              <label class="t20-label">Resistências</label>
              <input class="form-control t20-input" value="${escapeHtml(c.stats?.res ?? "")}" placeholder="Ex: Fort +8, Ref +4, Von +2" oninput="combatUpdateStats('${c.id}','res', this.value)">
            </div>
            <div class="form-group">
              <label class="t20-label">CD</label>
              <input class="form-control t20-input" value="${escapeHtml(c.stats?.cd ?? "")}" placeholder="Ex: 16" oninput="combatUpdateStats('${c.id}','cd', this.value)">
            </div>
          </div>
        </div>

        <!-- Condições -->
        <div class="combat-subbox details-span-all">
          <div class="cond-header-bar">
            <span class="t20-label" style="font-size: 0.85rem;"><i class="bi bi-shield-exclamation"></i> Condições</span>
            <div class="cond-selector-group">
              <select id="condSel-${c.id}" class="inline-mini" onclick="event.stopPropagation()"></select>
              <input id="condDur-${c.id}" class="inline-mini" type="number" inputmode="numeric" value="1" min="0" max="999" title="Duração em rodadas" onclick="event.stopPropagation()">
              <button id="condInfoBtn-${c.id}" class="btn btn-icon-only btn-sm" onclick="combatToggleCondInfo('${c.id}'); event.stopPropagation();" title="O que esta condição faz?" disabled>
                <i class="bi bi-info-circle"></i>
              </button>
              <button id="condAddBtn-${c.id}" class="btn btn-icon-only btn-sm" onclick="combatAddCondition('${c.id}'); event.stopPropagation();" title="Adicionar condição" disabled>
                <i class="bi bi-plus-lg"></i>
              </button>
            </div>
          </div>
          
          <div class="cond-popover d-none" id="condPop-${c.id}">
            <div class="cond-popover-inner">
              <div class="cond-popover-title">Condição</div>
              <div class="cond-popover-body" id="condPopBody-${c.id}"></div>
            </div>
          </div>

          ${condHTML}
          <div class="small-help mt-2" style="font-size: 0.72rem; color: var(--text-muted);">
            Duração diminui em 1 rodada automaticamente ao avançar o turno (ao sair da vez deste combatente).
          </div>
        </div>

        <!-- Anotações -->
        <div class="form-group details-span-all">
          <label class="t20-label">Anotações da Criatura / Ataques / Habilidades</label>
          <textarea class="notes-textarea" rows="4" placeholder="Reação preparada, efeitos, lembretes, itens usados ou ficha..." oninput="combatUpdateNotes('${c.id}', this.value)" onclick="event.stopPropagation()">${escapeHtml(c.notes || "")}</textarea>
        </div>

        <!-- Rodapé do Card -->
        <div class="details-footer-actions details-span-all">
          <button class="btn btn-secondary btn-sm" onclick="combatSetActive('${c.id}'); event.stopPropagation();" title="Definir como a vez atual">
            <i class="bi bi-person-check"></i> Definir Vez
          </button>
          <span class="text-muted" style="font-size: 0.75rem;">Dica: use "Duplicar" (<i class="bi bi-files"></i>) para múltiplos inimigos.</span>
        </div>

      </div>
    </div>
  </div>
  `;
}

/** Util **/
function clampInt(v, min, max, fallback) {
  const n = parseInt(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, n));
}

function clampNum(v, min, max) {
  const n = Number(v);
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, n));
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(str) { return escapeHtml(str); }

function combatCondDesc(name) {
  return CONDITION_INFO && CONDITION_INFO[name] ? CONDITION_INFO[name] : "";
}

function combatSetCondHelp(id, name) {
  const nm = (name || "").trim();
  const desc = nm ? combatCondDesc(nm) : "";
  const pop = document.getElementById(`condPop-${id}`);
  const popBody = document.getElementById(`condPopBody-${id}`);
  const popTitle = pop ? pop.querySelector(".cond-popover-title") : null;
  if (!nm) {
    if (pop) pop.classList.add("d-none");
    return;
  }
  if (popTitle) popTitle.textContent = nm;
  if (popBody) popBody.textContent = desc || "";
  if (pop) pop.classList.remove("d-none");
}

function combatToggleCondInfo(id) {
  const pop = document.getElementById(`condPop-${id}`);
  if (!pop) return;
  const willOpen = pop.classList.contains("d-none");
  pop.classList.toggle("d-none");
  if (willOpen) {
    const sel = document.getElementById(`condSel-${id}`);
    const name = sel ? sel.value : "";
    if (!String(name || "").trim()) {
      pop.classList.add("d-none");
      return;
    }
    combatSetCondHelp(id, name);
  }
}

function stamp() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function incrementName(name) {
  const s = (name || "").trim();
  const m = s.match(/^(.*?)(\s+)(\d+)$/);
  if (m) {
    const base = m[1];
    const num = parseInt(m[3]) || 1;
    return `${base}${m[2]}${num + 1}`;
  }
  const m2 = s.match(/^(.*?)(#)(\d+)$/);
  if (m2) {
    const base = m2[1].trim();
    const num = parseInt(m2[3]) || 1;
    return `${base} #${num + 1}`;
  }
  return `${s} 2`;
}
