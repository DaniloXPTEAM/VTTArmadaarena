// --- DADOS E CONFIGURAÇÕES ---
const attrs = ['FOR', 'DES', 'CON', 'INT', 'SAB', 'CAR'];

// Perícias que só funcionam se treinadas (retornam 0 se não treinado)
const TRAINED_ONLY_SKILLS = ['Adestramento', 'Atuação', 'Conhecimento', 'Guerra', 'Jogatina', 'Ladinagem', 'Misticismo', 'Nobreza', 'Ofício', 'Pilotagem', 'Religião'];

// Perícias com penalidade de armadura (✠ = total, ✠* = parcial)
const ARMOR_PENALTY_SKILLS = { 'Acrobacia': 'total', 'Furtividade': 'total', 'Ladinagem': 'total', 'Atletismo': 'parcial' };

let groupSkillsByAttr = false;
let hideUntrainedOnly = false;

// Tabela de XP por nível (T20)
const XP_TABLE = [0, 1000, 3000, 6000, 10000, 15000, 21000, 28000, 36000, 45000, 55000, 66000, 78000, 91000, 105000, 120000, 136000, 153000, 171000, 190000];

const defaultSkills = [
    { n: 'Acrobacia', a: 'DES' }, { n: 'Adestramento', a: 'CAR' }, { n: 'Atletismo', a: 'FOR' },
    { n: 'Atuação', a: 'CAR' }, { n: 'Cavalgar', a: 'DES' }, { n: 'Conhecimento', a: 'INT' },
    { n: 'Cura', a: 'SAB' }, { n: 'Diplomacia', a: 'CAR' }, { n: 'Enganação', a: 'CAR' },
    { n: 'Fortitude', a: 'CON' }, { n: 'Furtividade', a: 'DES' }, { n: 'Guerra', a: 'INT' },
    { n: 'Iniciativa', a: 'DES' }, { n: 'Intimidação', a: 'CAR' }, { n: 'Intuição', a: 'SAB' },
    { n: 'Investigação', a: 'INT' }, { n: 'Jogatina', a: 'CAR' }, { n: 'Ladinagem', a: 'DES' }, { n: 'Luta', a: 'FOR' },
    { n: 'Misticismo', a: 'INT' }, { n: 'Nobreza', a: 'INT' },
    { n: 'Ofício', a: 'INT' }, { n: 'Ofício', a: 'INT' }, { n: 'Percepção', a: 'SAB' }, { n: 'Pilotagem', a: 'DES' }, { n: 'Pontaria', a: 'DES' },
    { n: 'Reflexos', a: 'DES' }, { n: 'Religião', a: 'SAB' },
    { n: 'Sobrevivência', a: 'SAB' }, { n: 'Vontade', a: 'SAB' }
];

const spellCosts = { 1: 1, 2: 3, 3: 6, 4: 10, 5: 15 };
let currentSkills = [];
let currentLoadBonus = 0; // Bônus manual para a carga
let currentArmorLoadBonus = 0; // Bônus de slots da armadura
let isLoading = false;    // Flag para suprimir saveData() durante o carregamento inicial

const CONDICOES_T20 = {
    "abalado": { nome: "Abalado", pericias: -2, desc: "-2 em testes de perícia. Medo." },
    "agarrado": { nome: "Agarrado", ataque: -2, defesa: -5, desc: "Desprevenido e imóvel, -2 em ataque. Só armas leves." },
    "alquebrado": { nome: "Alquebrado", desc: "Custo de PM de habilidades aumenta em +1. Mental." },
    "apavorado": { nome: "Apavorado", pericias: -5, desc: "–5 em perícias e não pode se aproximar da fonte. Medo." },
    "atordoado": { nome: "Atordoado", defesa: -5, desc: "Desprevenido e não pode fazer ações. Mental." },
    "caido": { nome: "Caído", ataque: -5, defesa: -5, desc: "–5 em ataques corpo a corpo e Defesa. +5 Defesa contra distância." },
    "cego": { nome: "Cego", defesa: -5, pericias: -5, Reflexos: -2, desc: "Desprevenido, lento e –5 em perícias de FOR/DES. Sentidos." },
    "confuso": { nome: "Confuso", desc: "Comporta-se de modo aleatório (1d6). Mental." },
    "debilitado": { nome: "Debilitado", pericias: -5, desc: "–5 em testes de atributos físicos (FOR, DES, CON) e perícias relacionadas." },
    "desprevenido": { nome: "Desprevenido", defesa: -5, Reflexos: -5, desc: "–5 na Defesa e Reflexos." },
    "doente": { nome: "Doente", desc: "Sob efeito de uma doença. Metabolismo." },
    "em_chamas": { nome: "Em Chamas", desc: "Sofre 1d6 de fogo no início do turno." },
    "enfeitiçado": { nome: "Enfeitiçado", desc: "+10 em Diplomacia para a fonte contra o alvo. Mental." },
    "enjoado": { nome: "Enjoado", desc: "Só pode fazer 1 ação padrão OU movimento. Metabolismo." },
    "enredado": { nome: "Enredado", ataque: -2, defesa: -2, Reflexos: -2, desc: "Lento e vulnerável. Movimento." },
    "envenenado": { nome: "Envenenado", desc: "Efeito varia conforme o veneno. Veneno." },
    "esmorecido": { nome: "Esmorecido", pericias: -5, desc: "–5 em testes de atributos mentais (INT, SAB, CAR) e perícias relacionadas. Mental." },
    "exausto": { nome: "Exausto", pericias: -5, defesa: -2, ataque: -2, desc: "Debilitado, lento e vulnerável. Cansaço." },
    "fascinado": { nome: "Fascinado", pericias: -5, desc: "–5 em Percepção e não pode fazer ações. Mental." },
    "fatigado": { nome: "Fatigado", ataque: -2, defesa: -2, pericias: -2, desc: "Fraco e vulnerável. Cansaço." },
    "fraco": { nome: "Fraco", pericias: -2, desc: "–2 em testes de atributos físicos (FOR, DES, CON) e perícias relacionadas." },
    "frustrado": { nome: "Frustrado", pericias: -2, desc: "–2 em testes de atributos mentais (INT, SAB, CAR) e perícias relacionadas. Mental." },
    "imovel": { nome: "Imóvel", desc: "Deslocamento reduzido a 0m. Movimento." },
    "inconsciente": { nome: "Inconsciente", defesa: -10, Reflexos: -99, desc: "Indefeso e não pode fazer ações." },
    "indefeso": { nome: "Indefeso", defesa: -15, Reflexos: -99, desc: "Desprevenido e –10 na Defesa. Falha em Reflexos." },
    "lento": { nome: "Lento", Reflexos: -2, desc: "Deslocamento à metade, não pode correr/investir. Movimento." },
    "ofuscado": { nome: "Ofuscado", ataque: -2, pericias: -2, desc: "–2 em testes de ataque e Percepção. Sentidos." },
    "paralisado": { nome: "Paralisado", defesa: -15, Reflexos: -99, desc: "Imóvel e indefeso. Movimento." },
    "pasmo": { nome: "Pasmo", desc: "Não pode fazer ações. Mental." },
    "petrificacao": { nome: "Petrificação", desc: "Inconsciente com RD 8. Metamorfose." },
    "sangrando": { nome: "Sangrando", desc: "Teste de CON (CD 15) ou perde 1d6 PV. Metabolismo." },
    "surdo": { nome: "Surdo", pericias: -5, desc: "Falha em Percepção (ouvir), –5 em Iniciativa. Sentidos." },
    "surpreendido": { nome: "Surpreendido", defesa: -5, desc: "Desprevenido e não pode fazer ações." },
    "vulneravel": { nome: "Vulnerável", defesa: -2, desc: "–2 na Defesa." }
};

// --- INICIALIZAÇÃO ---
window.onload = () => {
    try {
        currentSkills = JSON.parse(JSON.stringify(defaultSkills));
        renderStructure();
        renderCondicoes(); // <--- ADICIONE ESTA LINHA AQUI
        loadData();
        attachGlobalListeners();
        enableDragAndDrop();
    } catch (e) { console.error(e); }

    setTimeout(updateCalculations, 100);
    setTimeout(checkImportedPowers, 400);
};

function renderStructure() {
    const attrContainer = document.getElementById('attributesArea');
    const attrImages = { 'FOR': '../assets/imagens/forca.png', 'DES': '../assets/imagens/destreza.png', 'CON': '../assets/imagens/constituicao.png', 'INT': '../assets/imagens/inteligencia.png', 'SAB': '../assets/imagens/sabedoria.png', 'CAR': '../assets/imagens/carisma.png' };

    if (attrContainer) {
        attrContainer.innerHTML = attrs.map(a => {
            const bgImage = attrImages[a] ? `url('${attrImages[a]}')` : 'none';
            return `
            <div class="col-2">
                <div class="d-flex flex-column align-items-center attr-wrapper" id="wrap-${a}">
                    <button class="attr-btn-float attr-btn-up" onclick="updateAttr('${a}', 1)">+</button>
                    <div class="attr-token" style="background-image: ${bgImage};" onclick="toggleAttrButtons('${a}')">
                        <input type="number" inputmode="numeric" class="attr-val attr-input-overlay form-control" id="attr-${a}" value="0" min="-5">
                    </div>
                    <button class="attr-btn-float attr-btn-down" onclick="updateAttr('${a}', -1)">-</button>
                    <div class="attr-footer-label">${a}</div>
                </div>
            </div>`;
        }).join('');
    }
    renderSkills();
}

function renderCondicoes() {
    const grid = document.getElementById('condicoes-grid');
    if (!grid) return;

    grid.innerHTML = Object.keys(CONDICOES_T20).map(key => {
        const c = CONDICOES_T20[key];
        return `
        <div class="col-6 col-md-4 col-lg-3">
        <div class="form-check h-100 border rounded p-1 ps-4 hover-bg-light shadow-sm bg-white">
            <input class="form-check-input cond-check" type="checkbox" value="${key}" id="cond-${key}" onchange="updateCalculations(); saveData()">
            <label class="form-check-label d-block" for="cond-${key}" title="${c.desc}" style="cursor:pointer; font-size:0.7rem; line-height: 1.1;">
                ${c.nome}
            </label>
        </div>
    </div>`;
    }).join('');
}

// Novas Funções de Atributo
function toggleAttrButtons(attr) {
    const wrapper = document.getElementById(`wrap-${attr}`);
    // Fecha outros
    document.querySelectorAll('.attr-wrapper.active').forEach(el => {
        if (el !== wrapper) el.classList.remove('active');
    });
    wrapper.classList.toggle('active');
}

function updateAttr(attr, delta) {
    const input = document.getElementById(`attr-${attr}`);
    let val = parseInt(input.value) || 0;
    val += delta;
    if (val < -5) val = -5;
    input.value = val;
    updateCalculations();
    saveData();
}

// --- RENDERIZAÇÃO DE PERÍCIAS (COM BOTÕES FLUTUANTES) ---
// ── Perícias por Classe (T20) ───────────────────────────────────────────
const CLASS_SKILLS = {
    'Arcanista': { total: 4, skills: ['Misticismo', 'Vontade', 'Conhecimento', 'Diplomacia', 'Enganação', 'Guerra', 'Iniciativa', 'Intimidação', 'Intuição', 'Investigação', 'Nobreza', 'Ofício', 'Percepção'] },
    'Bárbaro': { total: 6, skills: ['Adestramento', 'Atletismo', 'Cavalgar', 'Fortitude', 'Furtividade', 'Iniciativa', 'Intimidação', 'Luta', 'Ofício', 'Percepção', 'Pontaria', 'Sobrevivência', 'Vontade'] },
    'Bardo': { total: 8, skills: ['Atuação', 'Reflexos', 'Acrobacia', 'Cavalgar', 'Conhecimento', 'Diplomacia', 'Enganação', 'Furtividade', 'Iniciativa', 'Intuição', 'Investigação', 'Jogatina', 'Ladinagem', 'Luta', 'Misticismo', 'Nobreza', 'Percepção', 'Pontaria', 'Vontade'] },
    'Bucaneiro': { total: 6, skills: ['Luta', 'Reflexos', 'Pontaria', 'Acrobacia', 'Atletismo', 'Atuação', 'Enganação', 'Fortitude', 'Furtividade', 'Iniciativa', 'Intimidação', 'Jogatina', 'Ofício', 'Percepção', 'Pilotagem'] },
    'Caçador': { total: 8, skills: ['Luta', 'Pontaria', 'Sobrevivência', 'Adestramento', 'Atletismo', 'Cavalgar', 'Cura', 'Fortitude', 'Furtividade', 'Iniciativa', 'Investigação', 'Ofício', 'Percepção', 'Reflexos'] },
    'Cavaleiro': { total: 4, skills: ['Fortitude', 'Luta', 'Adestramento', 'Atletismo', 'Cavalgar', 'Diplomacia', 'Guerra', 'Iniciativa', 'Intimidação', 'Nobreza', 'Percepção', 'Vontade'] },
    'Clérigo': { total: 4, skills: ['Religião', 'Vontade', 'Conhecimento', 'Cura', 'Diplomacia', 'Fortitude', 'Iniciativa', 'Intuição', 'Luta', 'Misticismo', 'Nobreza', 'Ofício', 'Percepção'] },
    'Druida': { total: 6, skills: ['Sobrevivência', 'Vontade', 'Adestramento', 'Atletismo', 'Cavalgar', 'Conhecimento', 'Cura', 'Fortitude', 'Iniciativa', 'Intuição', 'Luta', 'Misticismo', 'Ofício', 'Percepção', 'Religião'] },
    'Frade': { total: 6, skills: ['Religião', 'Vontade', 'Adestramento', 'Atuação', 'Conhecimento', 'Cura', 'Diplomacia', 'Fortitude', 'Guerra', 'Iniciativa', 'Intimidação', 'Intuição', 'Investigação', 'Misticismo', 'Nobreza', 'Ofício', 'Percepção'] },
    'Guerreiro': { total: 4, skills: ['Luta', 'Pontaria', 'Fortitude', 'Adestramento', 'Atletismo', 'Cavalgar', 'Guerra', 'Iniciativa', 'Intimidação', 'Ofício', 'Percepção', 'Reflexos'] },
    'Inventor': { total: 6, skills: ['Ofício', 'Vontade', 'Conhecimento', 'Cura', 'Diplomacia', 'Fortitude', 'Iniciativa', 'Investigação', 'Luta', 'Misticismo', 'Percepção', 'Pilotagem', 'Pontaria'] },
    'Ladino': { total: 10, skills: ['Ladinagem', 'Reflexos', 'Acrobacia', 'Atletismo', 'Atuação', 'Cavalgar', 'Conhecimento', 'Diplomacia', 'Enganação', 'Furtividade', 'Iniciativa', 'Intimidação', 'Intuição', 'Investigação', 'Jogatina', 'Luta', 'Ofício', 'Percepção', 'Pilotagem', 'Pontaria'] },
    'Lutador': { total: 6, skills: ['Fortitude', 'Luta', 'Acrobacia', 'Adestramento', 'Atletismo', 'Enganação', 'Furtividade', 'Iniciativa', 'Intimidação', 'Ofício', 'Percepção', 'Pontaria', 'Reflexos'] },
    'Nobre': { total: 6, skills: ['Diplomacia', 'Intimidação', 'Vontade', 'Adestramento', 'Atuação', 'Cavalgar', 'Conhecimento', 'Enganação', 'Fortitude', 'Guerra', 'Iniciativa', 'Intuição', 'Investigação', 'Jogatina', 'Luta', 'Nobreza', 'Ofício', 'Percepção', 'Pontaria'] },
    'Paladino': { total: 4, skills: ['Luta', 'Vontade', 'Adestramento', 'Atletismo', 'Cavalgar', 'Cura', 'Diplomacia', 'Fortitude', 'Guerra', 'Iniciativa', 'Intuição', 'Nobreza', 'Percepção', 'Religião'] },
    'Treinador': { total: 6, skills: ['Adestramento', 'Vontade', 'Atletismo', 'Cavalgar', 'Diplomacia', 'Guerra', 'Iniciativa', 'Intimidação', 'Intuição', 'Luta', 'Ofício', 'Percepção', 'Pontaria', 'Reflexos', 'Religião', 'Sobrevivência'] },
};

let activeClassFilter = '';

function setClassFilter(cls) {
    activeClassFilter = (activeClassFilter === cls) ? '' : cls;
    renderSkills();
    // Atualiza badge no header
    const badge = document.getElementById('classSkillBadge');
    if (badge) {
        if (activeClassFilter) {
            const info = CLASS_SKILLS[activeClassFilter];
            badge.textContent = `${activeClassFilter} · ${info.total} perícias`;
            badge.classList.remove('d-none');
        } else {
            badge.classList.add('d-none');
        }
    }
}

function renderSkills() {
    const skillsContainer = document.getElementById('skillsList');
    if (!skillsContainer) return;

    const classInfo = activeClassFilter ? CLASS_SKILLS[activeClassFilter] : null;
    const classSkillSet = classInfo ? new Set(classInfo.skills) : null;

    // Ordem dos atributos para agrupamento
    const ATTR_ORDER = ['FOR', 'DES', 'CON', 'INT', 'SAB', 'CAR'];
    const ATTR_NAMES = { FOR: 'Força', DES: 'Destreza', CON: 'Constituição', INT: 'Inteligência', SAB: 'Sabedoria', CAR: 'Carisma' };

    function buildSkillRow(s, i) {
        const attrOptions = attrs.map(a => `<option value="${a}" ${s.a === a ? 'selected' : ''}>${a}</option>`).join('');
        const isDefault = defaultSkills.some(ds => ds.n === s.n && !s.isCustom);
        const isTrainedOnly = TRAINED_ONLY_SKILLS.includes(s.n);
        const armorPenalty = ARMOR_PENALTY_SKILLS[s.n];
        const isClassSkill = classSkillSet && classSkillSet.has(s.n);

        const rowBg = isClassSkill ? 'style="background:rgba(220,53,69,0.08);"' : '';
        const classTag = isClassSkill
            ? `<span style="font-size:0.55rem;background:#dc3545;color:#fff;border-radius:3px;padding:0 3px;margin-left:2px;vertical-align:middle;">●</span>`
            : '';

        // Badges de sufixo: * treinada, ✠/✠? penalidade de armadura
        const trainedBadge = isTrainedOnly
            ? `<span class="text-danger" title="Somente treinada" style="font-size:0.8em;">*</span>`
            : '';
        const armorBadge = armorPenalty
            ? `<span class="${armorPenalty === 'total' ? 'text-primary' : 'text-secondary'}"
                    title="${armorPenalty === 'total' ? 'Penalidade de armadura' : 'Penalidade de armadura (somente natação)'}"
                    style="font-size:0.75em;margin-left:1px;">✠${armorPenalty === 'parcial' ? '?' : ''}</span>`
            : '';

        const isOficio = isDefault && s.n === 'Ofício';
        const nameDisplay = isOficio
            ? `<div class="d-flex align-items-center gap-1" style="overflow:hidden;">
                 <span class="fw-bold" style="font-size:0.9em;white-space:nowrap;">Ofício</span>
                 <input type="text" class="form-control form-control-sm p-0 border-0 bg-transparent oficio-specialty"
                        data-skill-idx="${i}"
                        style="font-size:0.8em;min-width:0;width:100%;"
                        value="${s.specialty || ''}" placeholder="(tipo)"
                        oninput="updateSkillSpecialty(${i}, this.value)"
                        title="Ex: Metalurgia, Culinária...">
               </div>`
            : isDefault
                ? `<span class="fw-bold text-truncate d-block"
                         title="${s.n}${isTrainedOnly ? ' (somente treinada)' : ''}${armorPenalty ? ' (penalidade de armadura)' : ''}"
                         style="font-size:0.9em;padding-top:2px;">${s.n}${trainedBadge}${armorBadge}${classTag}</span>`
                : `<input type="text" class="form-control form-control-sm p-0 fw-bold border-0 bg-transparent" value="${s.n}" onchange="updateSkillName(${i}, this.value)" placeholder="Nome">`;

        const deleteBtn = !isDefault
            ? `<i class="bi bi-x text-danger" style="cursor:pointer;margin-left:2px;" onclick="deleteSkill(${i})" title="Remover"></i>`
            : '';

        return `
        <div class="row g-0 align-items-center skill-row py-1 border-bottom" ${rowBg}>
            <div class="col-1 text-center"><input class="form-check-input border-dark" type="checkbox" id="skTrain${i}" ${s.trained ? 'checked' : ''} onchange="onSkillTrainChange(${i})"></div>
            <div class="col-1 text-center"><i class="bi bi-dice-20-fill dice-roller text-secondary" onclick="rollSkill(${i})" title="Rolar"></i></div>
            <div class="col-4 ps-1 d-flex align-items-center">
                <div style="flex:1;overflow:hidden;">${nameDisplay}</div>
                <select class="border-0 bg-transparent text-muted fw-bold ms-1 p-0" style="font-size:0.65em;width:35px;cursor:pointer;" onchange="updateSkillAttr(${i}, this.value)">${attrOptions}</select>
                ${deleteBtn}
            </div>
            <div class="col-2 text-center fw-bold text-danger fs-6" id="skTotal${i}">0</div>
            <div class="col-1 text-center text-muted small" id="skHalfLevel${i}">0</div>
            <div class="col-1 text-center text-muted small" id="skAttrVal${i}">0</div>
            <div class="col-1 text-center text-muted small" id="skTrainVal${i}">0</div>
            <div class="col-1 px-1 position-relative skill-wrapper" id="wrap-skill-${i}">
                <button class="attr-btn-float attr-btn-up skill-btn-mini" onclick="updateSkillOther(${i}, 1)">+</button>
                <input type="number" inputmode="numeric" class="form-control form-control-sm p-0 text-center" id="skOther${i}" placeholder="0" value="${s.other || ''}" onclick="toggleSkillButtons(${i})">
                <button class="attr-btn-float attr-btn-down skill-btn-mini" onclick="updateSkillOther(${i}, -1)">-</button>
            </div>
        </div>`;
    }

    function shouldHide(s) {
        return hideUntrainedOnly && TRAINED_ONLY_SKILLS.includes(s.n) && !s.trained;
    }

    if (groupSkillsByAttr) {
        // Agrupa as perícias por atributo, mantendo o índice original para callbacks
        const groups = {};
        ATTR_ORDER.forEach(a => groups[a] = []);
        currentSkills.forEach((s, i) => {
            if (shouldHide(s)) return;
            const key = attrs.includes(s.a) ? s.a : 'FOR';
            groups[key].push({ s, i });
        });

        skillsContainer.innerHTML = ATTR_ORDER.map(attr => {
            const items = groups[attr];
            if (!items.length) return '';
            return `
            <div class="skill-group-header d-flex align-items-center px-2 py-1"
                 style="background:#f0f0f0;border-bottom:2px solid #dee2e6;font-size:0.7rem;font-weight:700;color:#555;letter-spacing:0.05em;">
                <span>${attr} — ${ATTR_NAMES[attr]}</span>
            </div>
            ${items.map(({ s, i }) => buildSkillRow(s, i)).join('')}`;
        }).join('');
    } else {
        const filtered = currentSkills
            .map((s, i) => ({ s, i }))
            .filter(({ s }) => !shouldHide(s));
        skillsContainer.innerHTML = filtered.map(({ s, i }) => buildSkillRow(s, i)).join('');
    }

    attachGlobalListeners();
}

function toggleHideUntrained() {
    hideUntrainedOnly = document.getElementById('hideUntrainedOnly').checked;
    renderSkills();
}

function toggleSkillGrouping() {
    groupSkillsByAttr = !groupSkillsByAttr;
    const btn = document.getElementById('btnGroupSkills');
    if (btn) {
        btn.classList.toggle('active', groupSkillsByAttr);
        btn.title = groupSkillsByAttr ? 'Agrupar por atributo (ativo)' : 'Agrupar por atributo';
    }
    renderSkills();
}

// --- NOVAS FUNÇÕES PARA BOTÕES DE PERÍCIA ---

function toggleSkillButtons(index) {
    const wrapper = document.getElementById(`wrap-skill-${index}`);

    // Fecha outros abertos (atributos ou perícias)
    document.querySelectorAll('.attr-wrapper.active, .skill-wrapper.active').forEach(el => {
        if (el !== wrapper) el.classList.remove('active');
    });

    wrapper.classList.toggle('active');
}

function updateSkillOther(index, delta) {
    const input = document.getElementById(`skOther${index}`);
    let val = parseInt(input.value) || 0;
    val += delta;

    // Aqui permitimos negativo sem limite (penalidades existem!)
    input.value = val;

    // Atualiza no objeto state global para salvar corretamente
    if (currentSkills[index]) currentSkills[index].other = val;

    updateCalculations();
    saveData();
}

// --- GERENCIAMENTO DE PERÍCIAS ---
function addSkill() { currentSkills.push({ n: 'Nova Perícia', a: 'INT', trained: false, other: 0, isCustom: true }); renderSkills(); saveData(); }
function deleteSkill(index) { if (confirm("Remover perícia?")) { currentSkills.splice(index, 1); renderSkills(); saveData(); } }
function onSkillTrainChange(i) {
    const check = document.getElementById(`skTrain${i}`);
    if (check) currentSkills[i].trained = check.checked;
    renderSkills();
}
function updateSkillAttr(index, newAttr) { currentSkills[index].a = newAttr; updateCalculations(); saveData(); }
function updateSkillName(index, newName) { currentSkills[index].n = newName; saveData(); updateCalculations(); }
function updateSkillSpecialty(index, value) { if (currentSkills[index]) currentSkills[index].specialty = value; saveData(); }

// --- ROLAGEM ---
function roll20() { return Math.floor(Math.random() * 20) + 1; }
function rollDiceFormula(formula) {
    if (!formula || !formula.trim()) return null;
    const partes = formula.match(/([+-]?\s*\d*d\d+|[+-]?\s*\d+)/g);
    if (!partes) return null;
    let total = 0;
    let detalhes = [];
    partes.forEach(p => {
        const limpo = p.replace(/\s/g, '');
        const dm = limpo.match(/^([+-]?)(\d*)d(\d+)$/);
        if (dm) {
            const sinal = dm[1] === '-' ? -1 : 1;
            const qtd = parseInt(dm[2] || '1');
            const faces = parseInt(dm[3]);
            let soma = 0;
            const rl = [];
            for (let i = 0; i < qtd; i++) {
                const r = Math.floor(Math.random() * faces) + 1;
                rl.push(r); soma += r;
            }
            total += soma * sinal;
            detalhes.push(`${soma * sinal}[${rl.join(',')}]`);
        } else {
            const v = parseInt(limpo) || 0;
            total += v;
            detalhes.push(`${v > 0 ? '+' : ''}${v}`);
        }
    });
    return { total, detalhes: detalhes.join(' ') };
}
function escalarFormulaDados(formula, mult) {
    return formula.replace(/(\d*)(d\d+)/g, (m, qtd, d) => {
        const n = parseInt(qtd || '1') * mult;
        return n + d;
    });
}
function showToast(title, result, total, isCrit = false, type = 'normal', extraHtml = '') {
    const toastEl = document.getElementById('rollToast');
    const toastTitle = document.getElementById('toastTitle');
    const toastBody = document.getElementById('toastBody');
    const toastHeader = document.getElementById('toastHeader');
    toastHeader.className = 'toast-header text-white';
    if (isCrit) toastHeader.classList.add('bg-critical');
    else if (type === 'skill') toastHeader.classList.add('bg-skill');
    else toastHeader.classList.add('bg-attack');
    toastTitle.innerText = title;
    toastBody.innerHTML = `<div class="display-4 fw-bold">${total}</div><div class="small opacity-75">Dado: <strong>${result}</strong> ${result === 20 ? '★' : ''}</div>${isCrit ? '<div class="fw-bold text-warning mt-1">CRÍTICO!</div>' : ''}${extraHtml}`;
    const toast = new bootstrap.Toast(toastEl); toast.show();
}
function rollAttack(btn) {
    const row = btn.closest('.atk-row');
    const name = row.querySelector('.inp-name').value || "Ataque";
    const bonus = parseInt(row.querySelector('.inp-bonus').value) || 0;
    const critRange = parseInt(row.querySelector('.inp-crit-range').value) || 20;
    const critMult = parseInt((row.querySelector('.inp-crit').value || 'x2').replace('x', '')) || 2;
    const roll = roll20();
    const total = roll + bonus;
    const isCrit = roll >= critRange;
    let extraHtml = '';
    const dmgFormula = (row.querySelector('.inp-dmg').value || '').trim();
    const dmgExtra = parseInt(row.querySelector('.inp-dmg-extra').value) || 0;
    const diceExtra = (row.querySelector('.inp-dice-extra').value || '').trim();
    let danoParts = [];
    let danoTotal = 0;
    
    const dmgAttrVal = row.querySelector('.inp-atk-dmg-attr')?.value || '';
    if (dmgAttrVal) {
        const attrMod = getInt(`attr-${dmgAttrVal}`) + getTempMod(`mod-attr-${dmgAttrVal}`);
        danoTotal += attrMod;
        danoParts.push(`+${attrMod} [${dmgAttrVal}]`);
    }
    if (dmgFormula) {
        const formula = isCrit ? escalarFormulaDados(dmgFormula, critMult) : dmgFormula;
        const r = rollDiceFormula(formula);
        if (r) { danoTotal += r.total; danoParts.push(r.detalhes); }
    }
    if (dmgExtra) {
        danoTotal += dmgExtra;
        danoParts.push(`+${dmgExtra}`);
    }
    if (diceExtra) {
        const r = rollDiceFormula(diceExtra);
        if (r) { danoTotal += r.total; danoParts.push(r.detalhes); }
    }
    if (danoParts.length > 0) {
        extraHtml = `<hr class="my-1"><div class="small">Dano: <strong class="text-danger">${danoTotal}</strong> <span class="opacity-50">${danoParts.join(' ')}</span></div>`;
        if (isCrit) extraHtml += `<div class="fw-bold text-warning small">CRÍTICO! Dano dobrado!</div>`;
    }
    showToast(`⚔️ ${name}`, roll, total, isCrit, 'attack', extraHtml);
}
function rollSkill(index) {
    const skill = currentSkills[index];
    const total = parseInt(document.getElementById(`skTotal${index}`).innerText) || 0;
    const roll = roll20();
    showToast(`🎲 ${skill.n}`, roll, roll + total, false, 'skill');
}

function attachGlobalListeners() {
    document.body.oninput = (e) => { if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) { updateCalculations(); if (e.target.id !== 'charImgInput') saveData(); } };
    document.body.onchange = (e) => { if (e.target.type === 'checkbox' || e.target.tagName === 'SELECT') { updateCalculations(); saveData(); } };
}
function toggleDetail(btn) { const row = btn.closest('.atk-row') || btn.closest('.def-row') || btn.closest('.ability-row') || btn.closest('.spell-row'); if (!row) return; const details = row.querySelector('.atk-details') || row.querySelector('.def-details') || row.querySelector('.ability-details') || row.querySelector('.spell-details'); const icon = btn.querySelector('i'); if (details.classList.contains('d-none')) { details.classList.remove('d-none'); icon.classList.replace('bi-chevron-down', 'bi-chevron-up'); } else { details.classList.add('d-none'); icon.classList.replace('bi-chevron-up', 'bi-chevron-down'); } }
function toggleFixedDetail(id) { const el = document.getElementById(id); if (el) el.classList.toggle('d-none'); }

// --- COLAPSAR/EXPANDIR SEÇÕES ---
function toggleSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (!el) return;
    el.classList.toggle('collapsed');
}

function getVal(id) { const el = document.getElementById(id); return el ? el.value : ''; }
function getInt(id) { const v = parseInt(getVal(id)); return isNaN(v) ? 0 : v; }
function setText(id, val) { const el = document.getElementById(id); if (el) el.innerText = val; }

function addAttack(data = null) {
    const container = document.getElementById('attacksList'); if (!container) return;
    const div = document.createElement('div'); div.className = 'border-bottom pb-2 mb-2 atk-row';
    // ... (logica de skills options igual) ...
    const allSkillNames = defaultSkills.map(s => s.n).sort();
    // "Luta" é selecionada por padrão para novos ataques manuais (!data). Se data existir, usamos data.skill ou (Manual).
    let isManualOrImported = data && !data.skill; // Se importado do Roll20 sem skill mapeada, não força 'Luta'
    let skillOptions = `<option value="" ${isManualOrImported ? 'selected' : ''}>(Manual)</option>`;
    skillOptions += `<option value="Luta" ${(!data || (data && data.skill === 'Luta')) ? 'selected' : ''}>Luta</option>`;
    skillOptions += `<option value="Pontaria" ${(data && data.skill === 'Pontaria') ? 'selected' : ''}>Pontaria</option>`;
    skillOptions += `<optgroup label="Outras">`;
    allSkillNames.forEach(sn => {
        if (sn !== 'Luta' && sn !== 'Pontaria') {
            skillOptions += `<option value="${sn}" ${(data && data.skill === sn) ? 'selected' : ''}>${sn}</option>`;
        }
    });
    skillOptions += `</optgroup>`;

    div.innerHTML = `
        <div class="row g-1 align-items-center text-center atk-summary mb-2">
            <div class="col-1 d-flex align-items-center justify-content-center p-0">
                <i class="bi bi-grip-vertical drag-handle me-1"></i>
                <i class="bi bi-sword fs-5 dice-roller text-danger" onclick="rollAttack(this)" title="Rolar"></i>
            </div>
            <div class="col-3 p-0 pe-1"><input type="text" class="form-control form-control-sm inp-name text-start" placeholder="Ataque" value="${data ? data.name : ''}"></div>
            <div class="col-1 p-0 pe-1"><input type="number" inputmode="numeric" class="form-control form-control-sm inp-bonus fw-bold text-center px-1" placeholder="+0" value="${data ? data.bonus : ''}"></div>
            <div class="col-2 p-0 pe-1"><input type="text" class="form-control form-control-sm inp-dmg text-center px-1" placeholder="1d6" value="${data ? data.dmg : ''}"></div>
            <div class="col-1 p-0 pe-1"><input type="number" inputmode="numeric" class="form-control form-control-sm text-center px-1 inp-dmg-extra" placeholder="+0" value="${data ? (data.dmgExtra || '') : ''}" title="Dano Extra Fixo"></div>
            <div class="col-1 p-0 pe-1"><input type="text" class="form-control form-control-sm text-center px-1 inp-dice-extra" placeholder="+1d8" value="${data ? (data.diceExtra || '') : ''}" title="Dados Extras"></div>
            <div class="col-2 d-flex p-0 pe-1 gap-1">
                <input type="number" inputmode="numeric" class="form-control form-control-sm text-center px-1 w-50 inp-crit-range" placeholder="20" value="${data ? (data.critRange || '20') : '20'}">
                <input type="text" class="form-control form-control-sm text-center px-1 w-50 inp-crit" placeholder="x2" value="${data ? data.crit : 'x2'}">
            </div>
            <div class="col-1 d-flex p-0 gap-1">
                <button class="btn btn-sm btn-danger p-0 w-50" onclick="removeAttack(this)"><i class="bi bi-trash"></i></button>
                <button class="btn btn-sm btn-toggle-details p-0 w-50" onclick="toggleDetail(this)"><i class="bi bi-chevron-down"></i></button>
            </div>
        </div>
        <div class="atk-details p-2 rounded d-none">
            <div class="row g-2 mb-2">
                <div class="col-3"><label class="form-label-sm">PERÍCIA</label><select class="form-select form-select-sm border-0 border-bottom p-0 inp-atk-skill" onchange="updateCalculations()">${skillOptions}</select></div>
                <div class="col-2"><label class="form-label-sm">BÔNUS EXTRAS</label><input type="number" inputmode="numeric" class="form-control form-control-sm border-0 border-bottom p-0 text-center inp-atk-mod" placeholder="+0" value="${data ? data.mod : ''}" oninput="updateCalculations()"></div>
                <div class="col-2"><label class="form-label-sm">ATTR. DANO</label>
                    <select class="form-select form-select-sm border-0 border-bottom p-0 inp-atk-dmg-attr" onchange="saveData()">
                        <option value="" ${!data || !data.dmgAttr ? 'selected' : ''}>—</option>
                        <option value="FOR" ${data && data.dmgAttr === 'FOR' ? 'selected' : ''}>FOR</option>
                        <option value="DES" ${data && data.dmgAttr === 'DES' ? 'selected' : ''}>DES</option>
                        <option value="CON" ${data && data.dmgAttr === 'CON' ? 'selected' : ''}>CON</option>
                        <option value="INT" ${data && data.dmgAttr === 'INT' ? 'selected' : ''}>INT</option>
                        <option value="SAB" ${data && data.dmgAttr === 'SAB' ? 'selected' : ''}>SAB</option>
                        <option value="CAR" ${data && data.dmgAttr === 'CAR' ? 'selected' : ''}>CAR</option>
                    </select>
                </div>
                <div class="col-3"><label class="form-label-sm">TIPO</label><input type="text" class="form-control form-control-sm text-center border-0 border-bottom inp-type" placeholder="Corte" value="${data ? data.type : ''}" oninput="saveData()"></div>
                <div class="col-2"><label class="form-label-sm">ALCANCE</label><input type="text" class="form-control form-control-sm text-center border-0 border-bottom inp-range" placeholder="Curto" value="${data ? data.range : ''}" oninput="saveData()"></div>
            </div>
            <div class="row g-2">
                <div class="col-12"><label class="form-label-sm">NOTAS</label><textarea class="form-control form-control-sm border-0 border-bottom inp-desc" rows="2" placeholder="Detalhes, efeitos, habilidades especiais...">${data ? (data.desc || '') : ''}</textarea></div>
            </div>
        </div>`;
    container.appendChild(div);
    if (!data) {
        updateCalculations();
        saveData();
    }
}

function removeAttack(btn) { if (confirm('Remover ataque?')) { btn.closest('.atk-row').remove(); saveData(); } }

function addDefenseItem(data = null) {
    const container = document.getElementById('defenseList'); if (!container) return;
    const div = document.createElement('div'); div.className = 'border-bottom pb-2 mb-2 def-row';
    const hasNote = data && data.note && data.note.trim();
    div.innerHTML = `
        <div class="row g-1 align-items-center text-center def-summary">
            <div class="col-1 fs-5 d-flex align-items-center justify-content-center">
                <i class="bi bi-grip-vertical drag-handle me-1" style="font-size: 0.8rem;"></i>
                <i class="bi bi-magic"></i>
            </div>
            <div class="col-4"><input type="text" class="form-control form-control-sm inp-name text-start" placeholder="Item Extra" value="${data ? data.name : ''}"></div>
            <div class="col-2"><input type="number" inputmode="numeric" class="form-control form-control-sm inp-bonus fw-bold text-success" placeholder="+0" value="${data ? data.bonus : ''}" oninput="updateCalculations()"></div>
            <div class="col-2"></div>
            <div class="col-3 d-flex gap-1 justify-content-center">
                <button class="btn btn-sm border-0 item-note-btn ${hasNote ? 'text-warning' : 'btn-outline-secondary'}" onclick="toggleItemNote(this)" title="Anotação"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-sm btn-outline-danger border-0" onclick="removeDefenseItem(this)"><i class="bi bi-trash"></i></button>
            </div>
        </div>
        <div class="item-note-area ${hasNote ? '' : 'd-none'} mt-1 px-1">
            <textarea class="form-control form-control-sm inp-note" rows="2" placeholder="Anotação sobre este item..." oninput="saveData()">${data && data.note ? data.note : ''}</textarea>
        </div>`;
    container.appendChild(div); if (!data) saveData();
}
function removeDefenseItem(btn) { if (confirm('Remover item?')) { btn.closest('.def-row').remove(); updateCalculations(); saveData(); } }
function checkHeavyArmor() { if (getVal('armorType') === 'heavy') { const chk = document.getElementById('applyDefAttr'); if (chk) chk.checked = false; } updateCalculations(); }

function addInventoryItem(data = null) {
    const container = document.getElementById('inventoryList'); if (!container) return;
    const div = document.createElement('div'); div.className = 'mb-2 inv-row border-bottom pb-1';
    const hasNote = data?.note?.trim();
    const hasCombat = !!(data?.combatData);
    const hasDefense = !!(data?.defenseData);
    const isImported = hasCombat || hasDefense;
    if (data?.combatData) div.dataset.combat = JSON.stringify(data.combatData);
    if (data?.defenseData) div.dataset.defense = JSON.stringify(data.defenseData);

    const noteBtnIcon = isImported ? 'bi-box-arrow-in-down' : 'bi-pencil-square';
    const noteBtnClass = isImported ? 'text-primary' : (hasNote ? 'text-warning' : 'btn-outline-secondary');
    const noteBtnTitle = isImported ? 'Item importado da loja' : 'Anotação';

    // Decide label do botão de defesa baseado no tipo
    const defLabel = data?.defenseData?.tipo?.toLowerCase().includes('escudo') ? 'Escudo' : 'Armadura';

    div.innerHTML = `
        <div class="row g-1 align-items-center">
            <div class="col-2 d-flex align-items-center justify-content-center gap-1 p-0">
                <i class="bi bi-grip-vertical drag-handle"></i>
                <input class="form-check-input mt-0 inp-equipped border-secondary" type="checkbox" onchange="calcLoad(); saveData()" ${data && data.equipped ? 'checked' : ''} title="Equipado/Vestido">
            </div>
            <div class="col-4 p-0"><input type="text" class="form-control form-control-sm fw-bold inp-name" placeholder="Item" value="${data ? data.name : ''}"></div>
            <div class="col-2 p-0 pe-1"><input type="number" inputmode="numeric" class="form-control form-control-sm text-center inp-qtd" placeholder="1" value="${data ? data.qtd : '1'}" oninput="updateCalculations()"></div>
            <div class="col-2 p-0 pe-1"><input type="number" inputmode="numeric" class="form-control form-control-sm text-center inp-slots" placeholder="0" value="${data ? data.slots : '0'}" step="0.5" oninput="updateCalculations()"></div>
            <div class="col-2 text-center d-flex gap-1 justify-content-center p-0">
                <button class="btn btn-sm border-0 item-note-btn ${noteBtnClass}" onclick="toggleItemNote(this)" title="${noteBtnTitle}"><i class="bi ${noteBtnIcon}"></i></button>
                <button class="btn btn-sm btn-outline-danger border-0" onclick="removeInventoryItem(this)"><i class="bi bi-trash"></i></button>
            </div>
        </div>
        <div class="item-note-area ${hasNote || isImported ? '' : 'd-none'} mt-1 px-1">
            ${hasCombat ? `<div class="d-flex align-items-center gap-2 mb-1 p-1 rounded" style="background:#eef4ff;border-left:3px solid #0d6efd;font-size:0.78rem;">
                <span class="text-muted"><i class="bi bi-sword me-1"></i><strong>${data.combatData.dano}</strong> · crít ${data.combatData.critico} · ${data.combatData.tipo_dano || '—'}</span>
                <button class="btn btn-sm btn-primary py-0 ms-auto" style="font-size:0.75rem;" onclick="pullToAttack(this)"><i class="bi bi-arrow-right-circle"></i> Ataques</button>
            </div>` : ''}
            ${hasDefense ? `<div class="d-flex align-items-center gap-2 mb-1 p-1 rounded" style="background:#efffef;border-left:3px solid #198754;font-size:0.78rem;">
                <span class="text-muted"><i class="bi bi-shield-check me-1"></i>Defesa <strong>${data.defenseData.bonus}</strong> · Pen. ${data.defenseData.penalidade || '0'}</span>
                <button class="btn btn-sm btn-success py-0 ms-auto" style="font-size:0.75rem;" onclick="pullToDefense(this)"><i class="bi bi-arrow-right-circle"></i> ${defLabel}</button>
            </div>` : ''}
            <textarea class="form-control form-control-sm inp-note" rows="2" placeholder="Anotação sobre este item..." oninput="saveData()">${data?.note || ''}</textarea>
        </div>`;
    container.appendChild(div); if (!data) saveData();
}
function removeInventoryItem(btn) { if (confirm('Remover item?')) { btn.closest('.inv-row').remove(); updateCalculations(); saveData(); } }

function toggleItemNote(btn) {
    const row = btn.closest('.inv-row') || btn.closest('.def-row');
    if (!row) return;
    const noteArea = row.querySelector('.item-note-area');
    if (!noteArea) return;
    const isNowHidden = noteArea.classList.toggle('d-none');
    const hasContent = !!row.querySelector('.inp-note')?.value?.trim();
    const active = !isNowHidden || hasContent;
    btn.classList.toggle('text-warning', active && !row.dataset.combat && !row.dataset.defense);
    btn.classList.toggle('btn-outline-secondary', !active && !row.dataset.combat && !row.dataset.defense);
    if (!isNowHidden) row.querySelector('.inp-note')?.focus();
}


// Processa um item da fila: adiciona SOMENTE ao inventário
// (push para Ataques/Defesa fica a cargo dos botões manuais)
function processShopItem(item) {
    addInventoryItem(item);
}

// Botão manual "Sync Loja" — fallback quando storage event não disparou
function importFromShop() {
    const queue = localStorage.getItem('t20_sheet_queue');
    if (!queue || !JSON.parse(queue).length) {
        alert('Nenhum item pendente.\n\nAdicione itens na loja — eles aparecem aqui automaticamente!');
        return;
    }
    claimShopQueue();
}

// Escuta mudanças no localStorage (dispara em outras abas quando a loja adiciona itens)
// Lê a fila do localStorage, remove ANTES de processar para evitar duplicatas entre abas
function claimShopQueue() {
    const raw = localStorage.getItem('t20_sheet_queue');
    if (!raw) return;
    let queue;
    try { queue = JSON.parse(raw); } catch (e) { return; }
    if (!queue.length) return;
    // Remove primeiro — se outra aba chegar ao mesmo tempo, ela vai encontrar null
    localStorage.removeItem('t20_sheet_queue');
    // Verifica se ainda era nossa a fila (leitura = o mesmo conteúdo que removemos)
    queue.forEach(item => processShopItem(item));
    saveData();
    showSheetToast(`📥 ${queue.length} item(s) recebido(s) da loja!`);
}

// Escuta mudanças no localStorage vindas de outras abas (loja → ficha)
// ── Botão "→ Ataques" ──────────────────────────────────────────────────
// Converte o campo "critico" do banco (ex: "19", "x3", "19/x3") em {critRange, crit}
function parseCritico(critico) {
    if (!critico || critico === '—') return { critRange: '20', crit: 'x2' };
    const parts = String(critico).trim().split('/');
    let critRange = '20', crit = 'x2';
    for (const part of parts) {
        const t = part.trim();
        if (/^\d+$/.test(t)) critRange = t;
        else if (/^x\d+$/i.test(t)) crit = t.toLowerCase();
    }
    return { critRange, crit };
}

function pullToAttack(btn) {
    const row = btn.closest('.inv-row');
    if (!row?.dataset.combat) return;
    const cd = JSON.parse(row.dataset.combat);
    const { critRange, crit } = parseCritico(cd.critico);
    addAttack({ name: cd.nome, bonus: '', dmg: cd.dano || '', critRange, crit, type: cd.tipo_dano || '', range: cd.alcance || '', desc: '' });
    saveData();
    btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Adicionado!';
    btn.disabled = true;
    setTimeout(() => { btn.innerHTML = '<i class="bi bi-arrow-right-circle"></i> Ataques'; btn.disabled = false; }, 3000);
    document.getElementById('attacksList')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ── Botão "→ Defesa" — preenche Armadura ou Escudo ────────────────────
function pullToDefense(btn) {
    const row = btn.closest('.inv-row');
    if (!row?.dataset.defense) return;
    const dd = JSON.parse(row.dataset.defense);

    // Penalidade: tira sinais/traços e usa número positivo
    const penAbs = Math.abs(parseInt(String(dd.penalidade).replace(/[^0-9]/g, '')) || 0);
    // Bônus: extrai número (pode vir como "+10" ou "10")
    const bonusNum = parseInt(String(dd.bonus).replace(/[^0-9]/g, '')) || 0;

    const isShield = String(dd.tipo).toLowerCase().includes('escudo');

    if (isShield) {
        const nameEl = document.getElementById('shieldName');
        const bonusEl = document.getElementById('shieldBonus');
        const penEl = document.getElementById('shieldPenalty');
        if (nameEl) nameEl.value = dd.nome;
        if (bonusEl) bonusEl.value = bonusNum;
        if (penEl) penEl.value = penAbs;
    } else {
        const nameEl = document.getElementById('armorName');
        const bonusEl = document.getElementById('armorBonus');
        const penEl = document.getElementById('armorPenalty');
        if (nameEl) nameEl.value = dd.nome;
        if (bonusEl) bonusEl.value = bonusNum;
        if (penEl) penEl.value = penAbs;
    }

    updateCalculations();
    saveData();
    btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Aplicado!';
    btn.disabled = true;
    setTimeout(() => { btn.innerHTML = '<i class="bi bi-arrow-right-circle"></i> ' + (isShield ? 'Escudo' : 'Armadura'); btn.disabled = false; }, 3000);
    document.getElementById('armorName')?.closest('section, .card, [class*="card"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showSheetToast(html) {
    let container = document.getElementById('sheet-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'sheet-toast-container';
        container.style.cssText = 'position:fixed;bottom:1rem;right:1rem;z-index:9999;display:flex;flex-direction:column;gap:0.4rem;';
        document.body.appendChild(container);
    }
    const t = document.createElement('div');
    t.style.cssText = 'background:#1a1a2e;color:#fff;padding:0.5rem 1rem;border-radius:8px;font-size:0.85rem;display:flex;align-items:center;gap:0.5rem;box-shadow:0 4px 12px rgba(0,0,0,0.3);animation:toastIn 0.25s ease;';
    t.innerHTML = html;
    container.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

// CSS do toast
const _toastStyle = document.createElement('style');
_toastStyle.textContent = `@keyframes toastIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }`;
document.head.appendChild(_toastStyle);

function addAbility(targetId = 'abilitiesClassList', name = '', desc = '') {
    const list = document.getElementById(targetId);
    if (!list) return;

    const div = document.createElement('div');
    div.className = 'ability-row list-group-item bg-light p-2 mb-2 border rounded shadow-sm';

    // Layout: grip (drag) | chevron | input (flexível) | botão lixeira
    // Sem data-bs-toggle no input — evita conflito de toque no mobile
    div.innerHTML = `
        <div style="display:flex; align-items:center; gap:6px;">
            <span class="ability-drag-handle text-secondary" style="cursor:grab; flex-shrink:0; padding:4px; font-size:1rem; line-height:1; touch-action:none;">
                <i class="bi bi-grip-vertical"></i>
            </span>
            <span class="ability-chevron text-danger" style="cursor:pointer; flex-shrink:0; padding:6px; font-size:1rem; line-height:1;">
                <i class="bi bi-chevron-right collapse-icon"></i>
            </span>
            <input type="text"
                   class="form-control form-control-sm fw-bold border-0 bg-transparent inp-name"
                   placeholder="Nome da Habilidade"
                   value="${name.replace(/"/g, '&quot;')}"
                   style="flex:1 1 auto; min-width:0;">
            <button type="button"
                    class="btn btn-outline-danger btn-sm border-0 ability-delete-btn"
                    style="flex-shrink:0; min-width:34px; min-height:34px; padding:4px 8px;">
                <i class="bi bi-trash"></i>
            </button>
        </div>
        <div class="ability-body d-none mt-2">
            <textarea class="form-control form-control-sm inp-desc border-danger-subtle"
                      rows="3" placeholder="Descrição detalhada...">${desc}</textarea>
        </div>
    `;

    const chevron = div.querySelector('.ability-chevron');
    const icon = div.querySelector('.collapse-icon');
    const body = div.querySelector('.ability-body');
    const deleteBtn = div.querySelector('.ability-delete-btn');

    // --- Toggle (apenas pelo chevron, sem tocar no input) ---
    chevron.addEventListener('click', (e) => {
        e.stopPropagation();
        const hidden = body.classList.toggle('d-none');
        icon.classList.toggle('bi-chevron-right', hidden);
        icon.classList.toggle('bi-chevron-down', !hidden);
        div.classList.toggle('border-danger', !hidden);
    });

    // --- Excluir (click normal — funciona em desktop e mobile) ---
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Excluir poder?')) {
            div.remove();
            saveData();
        }
    });

    // --- Salvar ao editar ---
    div.querySelectorAll('input, textarea').forEach(el => {
        el.addEventListener('input', saveData);
    });

    list.appendChild(div);
    if (!isLoading) saveData();
}

function removeAbility(btn) { if (confirm('Excluir poder?')) { btn.closest('.ability-row').remove(); saveData(); } }

function addSpell(circle, data = null) {
    const container = document.getElementById(`spellsList${circle}`); if (!container) return;
    const div = document.createElement('div'); div.className = 'border-bottom pb-2 mb-2 spell-row';
    const defaultCost = spellCosts[circle]; const costValue = data ? data.pm : defaultCost;
    div.innerHTML = `
        <div class="row g-1 align-items-center text-center mb-2">
            <div class="col-1"><i class="bi bi-grip-vertical drag-handle"></i></div>
            <div class="col-8"><input type="text" class="form-control form-control-sm fw-bold inp-name text-start" placeholder="Nome da Magia" value="${data ? data.name : ''}"></div>
            <div class="col-2 position-relative"><input type="number" inputmode="numeric" class="form-control form-control-sm text-center inp-pm" placeholder="${defaultCost}" value="${costValue}"><span style="position: absolute; right: 5px; top: 20%; font-size: 0.6em; color: #6f42c1; font-weight:bold;">PM</span></div>
            <div class="col-1"><button class="btn btn-sm btn-toggle-details w-100 p-0" onclick="toggleDetail(this)"><i class="bi bi-chevron-down"></i></button></div>
        </div>
        <div class="spell-details p-2 rounded d-none">
            <input type="hidden" class="inp-circle" value="${circle}">
            <div class="row g-2 mb-2">
                <div class="col-4"><label class="spell-label">ESCOLA</label><input type="text" class="form-control form-control-sm border-0 border-bottom p-0 inp-school" placeholder="Evocação" value="${data ? data.school : ''}"></div>
                <div class="col-4"><label class="spell-label">EXECUÇÃO</label><input type="text" class="form-control form-control-sm border-0 border-bottom p-0 inp-exec" placeholder="Padrão" value="${data ? data.exec : ''}"></div>
                <div class="col-4"><label class="spell-label">ALCANCE</label><input type="text" class="form-control form-control-sm border-0 border-bottom p-0 inp-range" placeholder="Curto" value="${data ? data.range : ''}"></div>
                <div class="col-4"><label class="spell-label">ALVO/ÁREA</label><input type="text" class="form-control form-control-sm border-0 border-bottom p-0 inp-target" placeholder="1 ser" value="${data ? data.target : ''}"></div>
                <div class="col-4"><label class="spell-label">DURAÇÃO</label><input type="text" class="form-control form-control-sm border-0 border-bottom p-0 inp-dur" placeholder="Inst." value="${data ? data.dur : ''}"></div>
                <div class="col-4"><label class="spell-label">RESISTÊNCIA</label><input type="text" class="form-control form-control-sm border-0 border-bottom p-0 inp-res" placeholder="Nenhuma" value="${data ? data.res : ''}"></div>
            </div>
            <label class="spell-label mt-2">DESCRIÇÃO</label><textarea class="form-control form-control-sm border-0 bg-transparent inp-desc" rows="3" placeholder="Efeito...">${data ? data.desc : ''}</textarea>
            <div class="text-end mt-2"><button class="btn btn-sm btn-danger py-0" onclick="removeSpell(this)">Excluir</button></div>
        </div>`;
    container.appendChild(div); if (!data) saveData();
}
function removeSpell(btn) { if (confirm('Remover magia?')) { btn.closest('.spell-row').remove(); saveData(); } }

// --- NOVAS FUNÇÕES DE CARGA ---
function changeLoadBonus(amount) {
    currentLoadBonus += amount;
    document.getElementById('loadBonusDisplay').innerText = currentLoadBonus > 0 ? `+${currentLoadBonus}` : currentLoadBonus;
    calcLoad(); // Recalcula o total
    saveData(); // Salva a alteração
}

function changeArmorLoadBonus(amount) {
    currentArmorLoadBonus += amount;
    const disp = document.getElementById('armorLoadBonusDisplay');
    if (disp) {
        // Mantém o sinal de + para positivos e mostra o - naturalmente para negativos
        disp.innerText = currentArmorLoadBonus > 0 ? `+${currentArmorLoadBonus}` : currentArmorLoadBonus;
    }

    calcLoad();
    saveData();
}

function calcLoad() {
    const selectedAttr = getVal('loadAttrSelect') || 'FOR';
    const attrVal = getInt(`attr-${selectedAttr}`);
    let baseLimit = 10;

    // Lógica de cálculo de carga: 10 + (Atributo * 2) se positivo, ou 10 + Atributo se negativo/zero
    if (attrVal > 0) {
        baseLimit += (attrVal * 2);
    } else {
        baseLimit += attrVal;
    }

    // Adiciona o bônus manual + bônus de armadura
    const totalSlots = baseLimit + currentLoadBonus + currentArmorLoadBonus;

    const currentSlots = Array.from(document.querySelectorAll('#inventoryList .inv-row .inp-slots')).reduce((sum, input) => sum + (parseFloat(input.value) || 0), 0);
    const equippedCount = Array.from(document.querySelectorAll('#inventoryList .inv-row .inp-equipped')).reduce((sum, chk) => sum + (chk.checked ? 1 : 0), 0);

    setText('loadCurrent', currentSlots.toFixed(1));
    setText('loadLimit', totalSlots);
    if(document.getElementById('equippedCountDisplay')) document.getElementById('equippedCountDisplay').innerText = equippedCount;
}
// --- FIM NOVAS FUNÇÕES DE CARGA ---


function updateCalculations() {
    let condAtq = 0, condDef = 0, condPer = 0, condRef = 0;

    document.querySelectorAll('.cond-check:checked').forEach(chk => {
        const efeito = CONDICOES_T20[chk.value];
        if (efeito.ataque) condAtq += efeito.ataque;
        if (efeito.defesa) condDef += efeito.defesa;
        if (efeito.pericias) condPer += efeito.pericias;
        if (efeito.Reflexos) condRef += efeito.Reflexos;
    });
    try {
        let level = getInt('charLevel');
        if (level < 1) level = 1; if (level > 20) level = 20;
        const halfLevel = Math.floor(level / 2);

        // --- CÁLCULO DE CARGA ---
        if (typeof calcLoad === 'function') calcLoad();

        const armorPen = getInt('armorPenalty'); const shieldPen = getInt('shieldPenalty');
        const totalPenalty = Math.abs(armorPen) + Math.abs(shieldPen);
        const penaltySkills = ['Acrobacia', 'Furtividade', 'Ladinagem'];
        const sizeVal = getInt('charSize');

        let trainBonus = 2; if (level >= 15) trainBonus = 6; else if (level >= 7) trainBonus = 4;

        const skillValues = {};

        currentSkills.forEach((s, i) => {
            const baseAttr = getInt(`attr-${s.a}`);
            const tempAttr = getTempMod(`mod-attr-${s.a}`); // NOVO: Atributo temporário
            const attrVal = baseAttr + tempAttr;
            const check = document.getElementById(`skTrain${i}`); if (check) s.trained = check.checked;
            const trained = s.trained ? trainBonus : 0;

            // --- CORREÇÃO AQUI ---
            const other = getInt(`skOther${i}`);
            s.other = other; // Salva o valor no objeto global
            // ---------------------

            // Perícias somente treinadas: se não treinar, total = 0
            const isTrainedOnly = TRAINED_ONLY_SKILLS.includes(s.n);
            const modSkillAttr = getInt(`mod-skill-attr-${s.a}`); // NOVO: bônus para perícias que usam este atributo
            let total;
            if (isTrainedOnly && !s.trained) {
                total = 0;
            } else {
                total = halfLevel + attrVal + trained + other + condPer + modSkillAttr;
                if (s.n === 'Reflexos') total += condRef;
                // Penalidade de Armadura/Escudo
                if (penaltySkills.includes(s.n)) {
                    total -= totalPenalty;
                }
                // Penalidade de Tamanho (Furtividade)
                if (s.n === 'Furtividade') {
                    total += sizeVal;
                }
            }

            // ── MODIFICADORES TEMPORÁRIOS ──────────────────────
            if (total !== 0 || s.trained) { // só aplica se a perícia é funcional
                const modPericias = getTempMod('mod-pericias');
                const modRolagens = getTempMod('mod-rolagens');
                const SKIP_PERICIAS = ['Luta', 'Pontaria'];
                if (!SKIP_PERICIAS.includes(s.n)) {
                    total += modPericias + modRolagens;
                }
                // Bônus em perícia específica
                document.querySelectorAll('#mod-pericias-list .mod-pericia-row').forEach(row => {
                    const sel = row.querySelector('.mod-per-sel')?.value;
                    const val = parseInt(row.querySelector('.mod-per-val')?.value) || 0;
                    if (sel === s.n) total += val;
                });
            }
            // ───────────────────────────────────────────────────

            setText(`skHalfLevel${i}`, halfLevel);
            setText(`skAttrVal${i}`, attrVal);
            
            // Dynamic styling based on training status
            const elTrainVal = document.getElementById(`skTrainVal${i}`);
            if (elTrainVal) {
                elTrainVal.innerText = trained;
                if (s.trained) {
                    elTrainVal.classList.add('text-success-custom');
                    elTrainVal.classList.remove('text-muted-custom');
                } else {
                    elTrainVal.classList.add('text-muted-custom');
                    elTrainVal.classList.remove('text-success-custom');
                }
            }

            const elTotal = document.getElementById(`skTotal${i}`);
            if (elTotal) {
                elTotal.innerText = total;
                if (isTrainedOnly && !s.trained) {
                    elTotal.classList.add('text-unusable-custom');
                } else {
                    elTotal.classList.remove('text-unusable-custom');
                }
            }
            skillValues[s.n] = total;
        });

        // --- DEFESA ---
        const defAttr = getVal('defAttrSelect');
        const defAttrVal = getInt(`attr-${defAttr}`) + getTempMod(`mod-attr-${defAttr}`);
        const applyDefAttr = document.getElementById('applyDefAttr') ? document.getElementById('applyDefAttr').checked : true;
        const armorHalfLevel = document.getElementById('armorHalfLevel') ? document.getElementById('armorHalfLevel').checked : false;
        const armorBonus = getInt('armorBonus') + (armorHalfLevel ? halfLevel : 0);
        const shieldBonus = getInt('shieldBonus');
        let otherBonus = 0;
        document.querySelectorAll('#defenseList .def-row .inp-bonus').forEach(input => { otherBonus += (parseInt(input.value) || 0); });
        // ── Mod temp: defesa ──
        otherBonus += getTempMod('mod-defesa');
        // ────────────────────────────────────────────
        const totalDefense = 10 + (applyDefAttr ? defAttrVal : 0) + armorBonus + shieldBonus + otherBonus + condDef;

        setText('defAttrVal', applyDefAttr ? defAttrVal : 0);
        setText('dispArmorBonus', armorBonus);
        setText('dispShieldBonus', shieldBonus);
        setText('dispOtherBonus', otherBonus);
        setText('defenseTotal', totalDefense);

        // --- PV/PM ---
        const pvMax = getInt('pvMax');
        const pvCurrent = getInt('pvCurrent');
        const pmMax = getInt('pmMax');
        const pmCurrent = getInt('pmCurrent');

        const barPV = document.getElementById('barPV');
        if (barPV) {
            const isExceeded = pvCurrent > pvMax;
            const percPV = Math.min((pvCurrent / pvMax) * 100, 100);
            barPV.style.width = `${percPV}%`;

            // Toggle da classe de destaque e do símbolo +
            barPV.classList.toggle('bar-exceeded', isExceeded);
            barPV.innerHTML = isExceeded ? '<span class="bar-plus">+</span>' : '';
        }

        const barPM = document.getElementById('barPM');
        if (barPM) {
            const isExceeded = pmCurrent > pmMax;
            const percPM = Math.min((pmCurrent / pmMax) * 100, 100);
            barPM.style.width = `${percPM}%`;

            // Toggle da classe de destaque e do símbolo +
            barPM.classList.toggle('bar-exceeded', isExceeded);
            barPM.innerHTML = isExceeded ? '<span class="bar-plus">+</span>' : '';
        }

        // --- MAGIAS CD ---
        const spellCDAttr = getVal('spellCDAttrSelect');
        const spellCDAttrVal = getInt(`attr-${spellCDAttr}`) + getTempMod(`mod-attr-${spellCDAttr}`);
        const spellCDPowers = getInt('spellCDPowers');
        const spellCDItems = getInt('spellCDItems');
        const spellCDOther = getInt('spellCDOther');
        const spellCDTotal = 10 + halfLevel + spellCDAttrVal + spellCDPowers + spellCDItems + spellCDOther;

        setText('spellCDHalfLevel', halfLevel);
        setText('spellCDAttrVal', spellCDAttrVal);
        setText('spellCDTotal', spellCDTotal);

        // --- ATAQUES ---
        document.querySelectorAll('.atk-row').forEach(row => {
            const skillSelect = row.querySelector('.inp-atk-skill');
            const bonusInput = row.querySelector('.inp-bonus');
            const modInput = row.querySelector('.inp-atk-mod');

            if (skillSelect && bonusInput && modInput) {
                const selectedSkill = skillSelect.value;
                const skillIndex = currentSkills.findIndex(s => s.n === selectedSkill);
                let skillBonus = 0;
                if (skillIndex !== -1) {
                    const skillTotalEl = document.getElementById(`skTotal${skillIndex}`);
                    if (skillTotalEl) skillBonus = parseInt(skillTotalEl.innerText) || 0;
                }
                const modBonus = parseInt(modInput.value) || 0;
                // ── Mod temp: ataque e rolagens ──
                const modAtq = getTempMod('mod-ataque') + getTempMod('mod-rolagens');
                // ────────────────────────────────
                const totalBonus = skillBonus + modBonus + modAtq + condAtq;
                bonusInput.value = totalBonus;
            }
        });

        // ── Mod temp: atualiza displays e HUD ──
        if (typeof GLOBAL_MOD_TYPES !== 'undefined') {
            GLOBAL_MOD_TYPES.forEach(t => getTempMod(`mod-${t}`));
        }
        atualizarHudMods();
        // ────────────────────────────

    } catch (e) { console.error("Erro em updateCalculations:", e); }
}

function saveData() {
    if (isLoading) return; // Não salvar durante o carregamento inicial

    // 0. Sincroniza trained e other das perícias diretamente do DOM antes de salvar
    currentSkills.forEach((s, i) => {
        const chk = document.getElementById(`skTrain${i}`);
        if (chk) s.trained = chk.checked;
        const otherEl = document.getElementById(`skOther${i}`);
        if (otherEl) s.other = parseInt(otherEl.value) || 0;
        const specEl = document.querySelector(`.oficio-specialty[data-skill-idx="${i}"]`);
        if (specEl) s.specialty = specEl.value;
    });

    // 1. Coletamos as novas listas primeiro para evitar erros de escopo
    const raceAbilities = [];
    document.querySelectorAll('#abilitiesRaceList .ability-row').forEach(row => {
        raceAbilities.push({
            name: row.querySelector('.inp-name').value,
            desc: row.querySelector('.inp-desc').value
        });
    });

    const classAbilities = [];
    document.querySelectorAll('#abilitiesClassList .ability-row').forEach(row => {
        classAbilities.push({
            name: row.querySelector('.inp-name').value,
            desc: row.querySelector('.inp-desc').value
        });
    });

    // 2. Montagem do objeto principal
    const data = {
        loadBonus: typeof currentLoadBonus !== 'undefined' ? currentLoadBonus : 0,
        armorLoadBonus: typeof currentArmorLoadBonus !== 'undefined' ? currentArmorLoadBonus : 0,
        armorHalfLevel: document.getElementById('armorHalfLevel')?.checked ?? false,
        version: 15.4,
        charName: getVal('charName'),
        playerName: getVal('playerName'),
        charRace: getVal('charRace'),
        charOrigin: getVal('charOrigin'),
        charClass: getVal('charClass'),
        charDistinction: getVal('charDistinction'),
        charLevel: getVal('charLevel'),
        charDeity: getVal('charDeity'),

        extras: {
            profs: getVal('charProfs'),
            size: getVal('charSize'),
            speed: getVal('charSpeed'),
            xp: getVal('charXP'),
            cash: getVal('charCash'),
            cashTO: getVal('charCashTO')
        },

        attrs: {}, // Preenchido logo abaixo

        status: {
            pvM: getVal('pvMax'),
            pvC: getVal('pvCurrent'),
            pmM: getVal('pmMax'),
            pmC: getVal('pmCurrent')
        },

        defense: {
            config: {
                attr: getVal('defAttrSelect'),
                apply: document.getElementById('applyDefAttr')?.checked ?? true
            },
            armor: {
                name: getVal('armorName'),
                bonus: getVal('armorBonus'),
                penalty: getVal('armorPenalty'),
                type: getVal('armorType'),
                desc: getVal('armorDesc')
            },
            shield: {
                name: getVal('shieldName'),
                bonus: getVal('shieldBonus'),
                penalty: getVal('shieldPenalty'),
                type: getVal('shieldType'),
                desc: getVal('shieldDesc')
            },
            other: []
        },

        skills: currentSkills.map(s => ({
            n: s.n,
            a: s.a,
            trained: s.trained,
            other: s.other,
            isCustom: s.isCustom,
            specialty: s.specialty || ''
        })),

        attacks: [],
        inventory: [],
        raceAbilities: raceAbilities,
        classAbilities: classAbilities,
        notes: document.getElementById('charNotes')?.value || '',
        notesCampanha: document.getElementById('charNotesCampanha')?.value || '',
        notesOutros: document.getElementById('charNotesOutros')?.value || '',

        spells: {
            config: {
                attr: getVal('spellCDAttrSelect'),
                powers: getVal('spellCDPowers'),
                items: getVal('spellCDItems'),
                other: getVal('spellCDOther')
            },
            list: []
        },
        loadConfig: { attr: getVal('loadAttrSelect') || 'FOR' }
    };

    // --- PREENCHIMENTO DAS LISTAS DINÂMICAS ---

    // Atributos
    attrs.forEach(a => {
        data.attrs[a] = getVal(`attr-${a}`);
    });

    // Bônus de Defesa Extras
    document.querySelectorAll('#defenseList .def-row').forEach(row => {
        data.defense.other.push({
            name: row.querySelector('.inp-name').value,
            bonus: row.querySelector('.inp-bonus').value,
            note: row.querySelector('.inp-note')?.value || ''
        });
    });

    // Ataques
    document.querySelectorAll('#attacksList .atk-row').forEach(row => {
        data.attacks.push({
            name: row.querySelector('.inp-name').value,
            bonus: row.querySelector('.inp-bonus').value,
            dmg: row.querySelector('.inp-dmg').value,
            dmgExtra: row.querySelector('.inp-dmg-extra')?.value || '',
            diceExtra: row.querySelector('.inp-dice-extra')?.value || '',
            critRange: row.querySelector('.inp-crit-range').value,
            crit: row.querySelector('.inp-crit').value,
            skill: row.querySelector('.inp-atk-skill').value,
            mod: row.querySelector('.inp-atk-mod').value,
            dmgAttr: row.querySelector('.inp-atk-dmg-attr')?.value || '',
            type: row.querySelector('.inp-type').value,
            range: row.querySelector('.inp-range').value,
            desc: row.querySelector('.inp-desc').value
        });
    });

    // Inventário
    document.querySelectorAll('#inventoryList .inv-row').forEach(row => {
        data.inventory.push({
            equipped: row.querySelector('.inp-equipped')?.checked || false,
            name: row.querySelector('.inp-name').value,
            qtd: row.querySelector('.inp-qtd').value,
            slots: row.querySelector('.inp-slots').value,
            note: row.querySelector('.inp-note')?.value || '',
            combatData: row.dataset.combat ? JSON.parse(row.dataset.combat) : null,
            defenseData: row.dataset.defense ? JSON.parse(row.dataset.defense) : null
        });
    });

    // Magias
    [1, 2, 3, 4, 5].forEach(circle => {
        document.querySelectorAll(`#spellsList${circle} .spell-row`).forEach(row => {
            data.spells.list.push({
                circle: circle,
                name: row.querySelector('.inp-name').value,
                pm: row.querySelector('.inp-pm').value,
                school: row.querySelector('.inp-school').value,
                exec: row.querySelector('.inp-exec').value,
                range: row.querySelector('.inp-range').value,
                target: row.querySelector('.inp-target').value,
                dur: row.querySelector('.inp-dur').value,
                res: row.querySelector('.inp-res').value,
                desc: row.querySelector('.inp-desc').value
            });
        });
    });

    // --- SALVAMENTO FINAL ---
    // --- COLETA DE MODIFICADORES TEMPORÁRIOS ---
    data.tempMods = {
        globais: {
            // Mantido apenas para compatibilidade com atributos temporários
            attrFOR: getVal('mod-attr-FOR'),
            attrDES: getVal('mod-attr-DES'),
            attrCON: getVal('mod-attr-CON'),
            attrINT: getVal('mod-attr-INT'),
            attrSAB: getVal('mod-attr-SAB'),
            attrCAR: getVal('mod-attr-CAR')
        }
    };
    
    const globaisListasObj = {};
    GLOBAL_MOD_TYPES.forEach(t => {
        const listId = t === 'pericias' ? 'mod-pericias-global-list' : `mod-${t}-list`;
        globaisListasObj[t] = Array.from(document.querySelectorAll(`#${listId} .mod-global-row`)).map(row => ({
            nome: row.querySelector('.mod-global-nome')?.value || '',
            val: row.querySelector('.mod-global-val')?.value || ''
        }));
    });
    data.tempMods.globaisListas = globaisListasObj;

    data.tempMods.skillAttrMods = {
        FOR: getVal('mod-skill-attr-FOR'),
        DES: getVal('mod-skill-attr-DES'),
        CON: getVal('mod-skill-attr-CON'),
        INT: getVal('mod-skill-attr-INT'),
        SAB: getVal('mod-skill-attr-SAB'),
        CAR: getVal('mod-skill-attr-CAR')
    };
    
    data.tempMods.periciasEspecificas = Array.from(document.querySelectorAll('#mod-pericias-list .mod-pericia-row')).map(row => ({
        pericia: row.querySelector('.mod-per-sel').value,
        val: row.querySelector('.mod-per-val').value,
        origem: row.querySelector('.mod-per-origem')?.value || ''
    }));
    
    data.tempMods.parceiros = Array.from(document.querySelectorAll('#mod-parceiros-list .mod-parceiro-row')).map(row => ({
        nome: row.querySelector('.mod-par-nome').value,
        tipo: row.querySelector('.mod-par-tipo').value,
        bonus: row.querySelector('.mod-par-bonus').value
    }));
    
    data.tempMods.condicoes = Array.from(document.querySelectorAll('.cond-check:checked')).map(c => c.value);




    localStorage.setItem('t20SheetData', JSON.stringify(data));
}

function loadData() {

    const savedData = localStorage.getItem('t20SheetData');
    if (savedData) {
        isLoading = true; // Impede que saveData() seja chamado durante o carregamento
        const data = JSON.parse(savedData);

        // Carregar bônus de carga manual
        currentLoadBonus = data.loadBonus || 0;
        const loadBonusDisplay = document.getElementById('loadBonusDisplay');
        if (loadBonusDisplay) loadBonusDisplay.innerText = currentLoadBonus > 0 ? `+${currentLoadBonus}` : currentLoadBonus;

        // Carregar bônus de carga da armadura
        currentArmorLoadBonus = data.armorLoadBonus || 0;
        const armorLoadBonusDisplay = document.getElementById('armorLoadBonusDisplay');
        if (armorLoadBonusDisplay) armorLoadBonusDisplay.innerText = currentArmorLoadBonus > 0 ? `+${currentArmorLoadBonus}` : currentArmorLoadBonus;

        // Carregar checkbox ½ nível na armadura
        const armorHalfLevelEl = document.getElementById('armorHalfLevel');
        if (armorHalfLevelEl && data.armorHalfLevel !== undefined) armorHalfLevelEl.checked = data.armorHalfLevel;

        // --- DADOS GERAIS ---
        if (data.charName !== undefined) document.getElementById('charName').value = data.charName;
        if (data.playerName !== undefined) document.getElementById('playerName').value = data.playerName;
        if (data.charRace !== undefined) document.getElementById('charRace').value = data.charRace;
        if (data.charOrigin !== undefined) document.getElementById('charOrigin').value = data.charOrigin;
        if (data.charClass !== undefined) document.getElementById('charClass').value = data.charClass;
        if (data.charDistinction !== undefined) {
            const distEl = document.getElementById('charDistinction');
            if (distEl) distEl.value = data.charDistinction;
        }
        if (data.charLevel !== undefined) document.getElementById('charLevel').value = data.charLevel;
        if (data.charDeity !== undefined) document.getElementById('charDeity').value = data.charDeity;

        // --- EXTRAS ---
        if (data.extras) {
            if (data.extras.profs !== undefined) document.getElementById('charProfs').value = data.extras.profs;
            if (data.extras.size !== undefined) document.getElementById('charSize').value = data.extras.size;
            if (data.extras.speed !== undefined) document.getElementById('charSpeed').value = data.extras.speed;
            if (data.extras.xp !== undefined) { document.getElementById('charXP').value = data.extras.xp; autoLevelFromXP(); }
            if (data.extras.cash !== undefined) document.getElementById('charCash').value = data.extras.cash;
            if (data.extras.cashTO !== undefined) document.getElementById('charCashTO').value = data.extras.cashTO;
        }

        // --- ATRIBUTOS ---
        if (data.attrs) {
            attrs.forEach(a => {
                if (data.attrs[a] !== undefined) document.getElementById(`attr-${a}`).value = data.attrs[a];
            });
        }

        // No local onde carrega as habilidades (normalmente após o parse do JSON)
        if (data.raceAbilities) {
            document.getElementById('abilitiesRaceList').innerHTML = '';
            data.raceAbilities.forEach(a => addAbility('abilitiesRaceList', a.name, a.desc));
        }

        if (data.classAbilities) {
            document.getElementById('abilitiesClassList').innerHTML = '';
            data.classAbilities.forEach(a => addAbility('abilitiesClassList', a.name, a.desc));
        }

        // --- STATUS ---
        if (data.status) {
            if (data.status.pvM !== undefined) document.getElementById('pvMax').value = data.status.pvM;
            if (data.status.pvC !== undefined) document.getElementById('pvCurrent').value = data.status.pvC;
            if (data.status.pmM !== undefined) document.getElementById('pmMax').value = data.status.pmM;
            if (data.status.pmC !== undefined) document.getElementById('pmCurrent').value = data.status.pmC;
        }

        // --- DEFESA ---
        if (data.defense) {
            if (data.defense.config) {
                if (data.defense.config.attr !== undefined) document.getElementById('defAttrSelect').value = data.defense.config.attr;
                const chk = document.getElementById('applyDefAttr');
                if (chk) chk.checked = data.defense.config.apply;
            }
            if (data.defense.armor) {
                if (data.defense.armor.name !== undefined) document.getElementById('armorName').value = data.defense.armor.name;
                if (data.defense.armor.bonus !== undefined) document.getElementById('armorBonus').value = data.defense.armor.bonus;
                if (data.defense.armor.penalty !== undefined) document.getElementById('armorPenalty').value = data.defense.armor.penalty;
                if (data.defense.armor.type !== undefined) document.getElementById('armorType').value = data.defense.armor.type;
                if (data.defense.armor.desc !== undefined) document.getElementById('armorDesc').value = data.defense.armor.desc;
            }
            if (data.defense.shield) {
                if (data.defense.shield.name !== undefined) document.getElementById('shieldName').value = data.defense.shield.name;
                if (data.defense.shield.bonus !== undefined) document.getElementById('shieldBonus').value = data.defense.shield.bonus;
                if (data.defense.shield.penalty !== undefined) document.getElementById('shieldPenalty').value = data.defense.shield.penalty;
                if (data.defense.shield.type !== undefined) document.getElementById('shieldType').value = data.defense.shield.type;
                if (data.defense.shield.desc !== undefined) document.getElementById('shieldDesc').value = data.defense.shield.desc;
            }
            if (data.defense.other) {
                data.defense.other.forEach(item => addDefenseItem(item));
            }
        }

        // --- PERÍCIAS ---
        if (data.skills && data.skills.length > 0) {
            currentSkills = data.skills;
            renderSkills();
        }

        // --- ATAQUES ---
        if (data.attacks) {
            data.attacks.forEach(item => addAttack(item));
        }

        // --- INVENTÁRIO ---
        if (data.inventory) {
            data.inventory.forEach(item => addInventoryItem(item));
        }

        // --- PODERES ---
        if (data.abilities) {
            data.abilities.forEach(item => addAbility(item));
        }

        // --- NOTAS  ---
        if (data.notes !== undefined) document.getElementById('charNotes').value = data.notes;
        if (data.notesCampanha !== undefined) document.getElementById('charNotesCampanha').value = data.notesCampanha;
        if (data.notesOutros !== undefined) document.getElementById('charNotesOutros').value = data.notesOutros;

        // --- MAGIAS ---
        if (data.spells) {
            if (data.spells.config) {
                if (data.spells.config.attr !== undefined) document.getElementById('spellCDAttrSelect').value = data.spells.config.attr;
                if (data.spells.config.powers !== undefined) document.getElementById('spellCDPowers').value = data.spells.config.powers;
                if (data.spells.config.items !== undefined) document.getElementById('spellCDItems').value = data.spells.config.items;
                if (data.spells.config.other !== undefined) document.getElementById('spellCDOther').value = data.spells.config.other;
            }
            if (data.spells.list) {
                data.spells.list.forEach(item => addSpell(item.circle, item));
            }
        }

        // --- CARGA ---
        if (data.loadConfig && data.loadConfig.attr) {
            document.getElementById('loadAttrSelect').value = data.loadConfig.attr;
        }

        // Compatibilidade: tenta tempMods.condicoes (novo) e data.condicoes (legado)
        const condicoesArr = (data.tempMods && data.tempMods.condicoes) || data.condicoes;
        if (condicoesArr && Array.isArray(condicoesArr)) {
            condicoesArr.forEach(key => {
                const chk = document.getElementById(`cond-${key}`);
                if (chk) chk.checked = true;
            });
        }

        // --- CARREGAR MODIFICADORES TEMPORÁRIOS ---
        if (data.tempMods) {
            const m = data.tempMods;
            // Helper disponível para todos os blocos de tempMods
            const setMod = (id, val) => { if (document.getElementById(id)) document.getElementById(id).value = val || ''; };

            // Globais — atributos temporários
            if (m.globais) {
                setMod('mod-attr-FOR', m.globais.attrFOR);
                setMod('mod-attr-DES', m.globais.attrDES);
                setMod('mod-attr-CON', m.globais.attrCON);
                setMod('mod-attr-INT', m.globais.attrINT);
                setMod('mod-attr-SAB', m.globais.attrSAB);
                setMod('mod-attr-CAR', m.globais.attrCAR);

                // Compatibilidade retroativa: saves antigos tinham valor único, migra como 1 linha
                const LEGADO = { rolagens: m.globais.rolagens, pericias: m.globais.pericias, ataque: m.globais.ataque, dano: m.globais.dano, defesa: m.globais.defesa };
                if (!m.globaisListas) {
                    Object.entries(LEGADO).forEach(([tipo, val]) => {
                        if (val && parseInt(val) !== 0) {
                            addModGlobal(tipo);
                            const listId = tipo === 'pericias' ? 'mod-pericias-global-list' : `mod-${tipo}-list`;
                            const container = document.getElementById(listId);
                            if (container) {
                                const rows = container.querySelectorAll('.mod-global-row');
                                const last = rows[rows.length - 1];
                                if (last) {
                                    last.querySelector('.mod-global-nome').value = 'Legado';
                                    last.querySelector('.mod-global-val').value = val;
                                }
                            }
                        }
                    });
                }
            }

            // Listas individuais de bônus globais
            if (m.globaisListas) {
                const gl = m.globaisListas;
                GLOBAL_MOD_TYPES.forEach(tipo => {
                    const listId = tipo === 'pericias' ? 'mod-pericias-global-list' : `mod-${tipo}-list`;
                    const lista = gl[tipo] || [];
                    const container = document.getElementById(listId);
                    if (container) container.innerHTML = '';
                    lista.forEach(item => {
                        addModGlobal(tipo);
                        const rows = document.getElementById(listId)?.querySelectorAll('.mod-global-row');
                        if (rows && rows.length > 0) {
                            const last = rows[rows.length - 1];
                            last.querySelector('.mod-global-nome').value = item.nome || '';
                            last.querySelector('.mod-global-val').value = item.val || '';
                        }
                    });
                });
            }

            // Bônus em Perícias de Atributo
            if (m.skillAttrMods) {
                setMod('mod-skill-attr-FOR', m.skillAttrMods.FOR);
                setMod('mod-skill-attr-DES', m.skillAttrMods.DES);
                setMod('mod-skill-attr-CON', m.skillAttrMods.CON);
                setMod('mod-skill-attr-INT', m.skillAttrMods.INT);
                setMod('mod-skill-attr-SAB', m.skillAttrMods.SAB);
                setMod('mod-skill-attr-CAR', m.skillAttrMods.CAR);
            }

            // Perícias Específicas
            if (m.periciasEspecificas) {
                const container = document.getElementById('mod-pericias-list');
                if (container) container.innerHTML = '';
                m.periciasEspecificas.forEach(p => {
                    addModPericia();
                    const rows = container.querySelectorAll('.mod-pericia-row');
                    const lastRow = rows[rows.length - 1];
                    lastRow.querySelector('.mod-per-sel').value = p.pericia;
                    lastRow.querySelector('.mod-per-val').value = p.val;
                    if (lastRow.querySelector('.mod-per-origem')) {
                        lastRow.querySelector('.mod-per-origem').value = p.origem || '';
                    }
                });
            }

            // Parceiros
            if (m.parceiros) {
                const container = document.getElementById('mod-parceiros-list');
                if (container) container.innerHTML = '';
                m.parceiros.forEach(par => {
                    addParceiro();
                    const rows = container.querySelectorAll('.mod-parceiro-row');
                    const lastRow = rows[rows.length - 1];
                    lastRow.querySelector('.mod-par-nome').value = par.nome;
                    lastRow.querySelector('.mod-par-tipo').value = par.tipo;
                    lastRow.querySelector('.mod-par-bonus').value = par.bonus;
                });
            }
        }

        isLoading = false; // Carregamento concluído - salvar normalmente a partir daqui

    } else {
        // Se não houver dados salvos, renderiza as perícias padrão
        renderSkills();
    }
}

//Abas de resumos
function switchNoteTab(tabId, btn) {
    // Esconde todos os textareas de notas
    document.querySelectorAll('.note-area').forEach(el => el.classList.add('d-none'));

    // Mostra o selecionado
    if (tabId === 'historia') document.getElementById('charNotes').classList.remove('d-none');
    if (tabId === 'campanha') document.getElementById('charNotesCampanha').classList.remove('d-none');
    if (tabId === 'outros') document.getElementById('charNotesOutros').classList.remove('d-none');

    // Atualiza o estilo dos botões
    document.querySelectorAll('#notesTabs .nav-link').forEach(el => {
        el.classList.remove('active', 'fw-bold', 'text-danger');
        el.classList.add('text-secondary');
    });
    btn.classList.add('active', 'fw-bold', 'text-danger');
    btn.classList.remove('text-secondary');
}

// ============================================================
//  IMPORTAÇÃO DO CARRINHO DE PODERES
//  Lê a chave 't20PoderesCarrinho' gravada pelo Compilado de Poderes
//  e mescla os itens em classAbilities, evitando duplicatas.
// ============================================================
function importPoderesDoCarrinho() {
    const raw = localStorage.getItem('t20PoderesCarrinho');
    if (!raw) return;

    let incoming;
    try { incoming = JSON.parse(raw); } catch { return; }
    if (!Array.isArray(incoming) || incoming.length === 0) return;

    // Remove a chave ANTES de qualquer coisa (evita loop em reloads)
    localStorage.removeItem('t20PoderesCarrinho');

    const list = document.getElementById('abilitiesClassList');
    if (!list) return;

    // Nomes já presentes na lista (case-insensitive)
    const existing = new Set(
        Array.from(list.querySelectorAll('.inp-name'))
            .map(el => el.value.trim().toLowerCase())
    );

    let added = 0;
    incoming.forEach(item => {
        if (!item.name) return;
        if (existing.has(item.name.trim().toLowerCase())) return; // não duplica
        // Strip HTML da desc para manter a ficha limpa
        const tmp = document.createElement('div');
        tmp.innerHTML = item.desc || '';
        const cleanDesc = tmp.textContent || tmp.innerText || '';
        addAbility('abilitiesClassList', item.name.trim(), cleanDesc.trim());
        existing.add(item.name.trim().toLowerCase());
        added++;
    });

    if (added > 0) {
        saveData();
        // Toast de confirmação
        const toast = document.createElement('div');
        toast.textContent = `✅ ${added} poder(es) importado(s) do Compilado!`;
        Object.assign(toast.style, {
            position: 'fixed', bottom: '24px', left: '50%',
            transform: 'translateX(-50%)',
            background: '#1a6636', color: '#fff',
            padding: '12px 24px', borderRadius: '8px',
            fontWeight: '700', fontSize: '0.95rem',
            zIndex: '9999', boxShadow: '0 4px 18px rgba(0,0,0,.3)',
            transition: 'opacity .4s'
        });
        document.body.appendChild(toast);
        setTimeout(() => { toast.style.opacity = '0'; }, 2800);
        setTimeout(() => toast.remove(), 3300);
    }
}

const DEFAULT_CHAR_IMG_SRC = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 16 16'%3E%3Cpath fill='%23ccc' d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'/%3E%3Cpath fill='%23ccc' fill-rule='evenodd' d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'/%3E%3C/svg%3E";

// --- RESET IMAGEM DO PERSONAGEM ---
function resetCharImage(e) {
    e.stopPropagation(); // evita abrir o file picker
    document.getElementById('charImgPreview').src = DEFAULT_CHAR_IMG_SRC;
    localStorage.removeItem('charImage');
    const fileInput = document.getElementById('charImgInput');
    if (fileInput) fileInput.value = '';
}

// --- AUTO-NÍVEL POR XP ---
function autoLevelFromXP() {
    const xp = parseInt(document.getElementById('charXP').value) || 0;
    let newLevel = 1;
    for (let i = XP_TABLE.length - 1; i >= 0; i--) {
        if (xp >= XP_TABLE[i]) { newLevel = i + 1; break; }
    }
    if (newLevel > 20) newLevel = 20;
    const levelEl = document.getElementById('charLevel');
    if (levelEl && parseInt(levelEl.value) !== newLevel) {
        levelEl.value = newLevel;
        updateCalculations();
    }
    // Exibe XP para o próximo nível
    const nextEl = document.getElementById('xpNextLevel');
    if (nextEl) {
        if (newLevel < 20) {
            const nextXP = XP_TABLE[newLevel];
            const diff = nextXP - xp;
            nextEl.textContent = `Próx. nv: ${nextXP.toLocaleString('pt-BR')} (faltam ${diff.toLocaleString('pt-BR')})`;
        } else {
            nextEl.textContent = 'Nível máximo!';
        }
    }
}

// Atualiza o XP mínimo baseado no nível selecionado
function autoXPFromLevel() {
    const levelEl = document.getElementById('charLevel');
    const xpEl = document.getElementById('charXP');
    if (!levelEl || !xpEl) return;

    let level = parseInt(levelEl.value) || 1;
    if (level < 1) level = 1;
    if (level > 20) level = 20;

    // O índice na XP_TABLE é (nível - 1)
    const minXP = XP_TABLE[level - 1];

    // Só atualiza se o XP atual for menor que o mínimo do novo nível
    // ou se o usuário estiver "rebaixando" o nível manualmente
    xpEl.value = minXP;

    // Atualiza o texto de "Próximo nível"
    autoLevelFromXP();
    saveData();
}

function clearSheet() {
    if (confirm("Tem certeza que deseja apagar todos os dados da ficha?")) {
        localStorage.removeItem('t20SheetData');
        window.location.reload();
    }
}

function exportSheet() {
    saveData();
    const data = JSON.parse(localStorage.getItem('t20SheetData'));

    // Inclui a imagem do personagem (se houver) no backup
    const savedImage = localStorage.getItem('charImage');
    const savedPos = localStorage.getItem('charImagePos');
    if (savedImage) {
        data.charImage = savedImage;
        data.charImagePos = savedPos || '50% 50%';
    }

    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ficha_t20_backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importSheet(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const data = JSON.parse(e.target.result);

                // Imagem do personagem: restaura se veio no backup,
                // senão apaga a que possa estar salva no localStorage
                if (data.charImage) {
                    localStorage.setItem('charImage', data.charImage);
                    localStorage.setItem('charImagePos', data.charImagePos || '50% 50%');
                } else {
                    localStorage.removeItem('charImage');
                    localStorage.removeItem('charImagePos');
                }
                delete data.charImage;
                delete data.charImagePos;

                localStorage.setItem('t20SheetData', JSON.stringify(data));
                window.location.reload();
            } catch (error) {
                alert('Erro ao carregar o arquivo. Certifique-se de que é um arquivo JSON de backup válido.');
                console.error(error);
            }
        };
        reader.readAsText(file);
    }
}

// --- DRAG AND DROP ---
// Opções base para mobile: delay evita conflito com scroll/toque em inputs
const sortableMobileOpts = {
    delay: 200,
    delayOnTouchOnly: true,
    touchStartThreshold: 5,
    forceFallback: false
};

function enableDragAndDrop() {
    // Ataques
    const attacksList = document.getElementById('attacksList');
    if (attacksList) new Sortable(attacksList, {
        ...sortableMobileOpts,
        animation: 150,
        handle: '.drag-handle',
        filter: 'input, textarea, select, button',
        preventOnFilter: false,
        onEnd: saveData
    });

    // Defesa
    const defenseList = document.getElementById('defenseList');
    if (defenseList) new Sortable(defenseList, {
        ...sortableMobileOpts,
        animation: 150,
        handle: '.drag-handle',
        filter: 'input, textarea, select, button',
        preventOnFilter: false,
        onEnd: saveData
    });

    // Inventário
    const inventoryList = document.getElementById('inventoryList');
    if (inventoryList) new Sortable(inventoryList, {
        ...sortableMobileOpts,
        animation: 150,
        handle: '.drag-handle',
        filter: 'input, textarea, select, button',
        preventOnFilter: false,
        onEnd: saveData
    });

    // Poderes — inicialização única com handle no grip e filtro em inputs/botões
    const raceList = document.getElementById('abilitiesRaceList');
    if (raceList) new Sortable(raceList, {
        ...sortableMobileOpts,
        group: 'sharedAbilities',
        animation: 150,
        handle: '.ability-drag-handle',
        filter: 'input, textarea, button, .ability-delete-btn, .ability-chevron',
        preventOnFilter: false,
        ghostClass: 'bg-warning-subtle',
        onEnd: saveData
    });

    const classList = document.getElementById('abilitiesClassList');
    if (classList) new Sortable(classList, {
        ...sortableMobileOpts,
        group: 'sharedAbilities',
        animation: 150,
        handle: '.ability-drag-handle',
        filter: 'input, textarea, button, .ability-delete-btn, .ability-chevron',
        preventOnFilter: false,
        ghostClass: 'bg-danger-subtle',
        onEnd: saveData
    });

    // Magias
    [1, 2, 3, 4, 5].forEach(circle => {
        const spellsList = document.getElementById(`spellsList${circle}`);
        if (spellsList) new Sortable(spellsList, {
            ...sortableMobileOpts,
            animation: 150,
            handle: '.drag-handle',
            filter: 'input, textarea, select, button',
            preventOnFilter: false,
            onEnd: saveData
        });
    });
}

// --- IMAGEM ---
function uploadImage(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.getElementById('charImgPreview');
            img.src = e.target.result;
            img.style.objectPosition = '50% 50%';
            localStorage.setItem('charImage', e.target.result);
            localStorage.setItem('charImagePos', '50% 50%');
        };
        reader.readAsDataURL(file);
    }
}

function setImageFromUrl(e) {
    if (e) e.stopPropagation();
    const url = (prompt('Cole o link (URL) da imagem do personagem:') || '').trim();
    if (!url) return;
    if (!/^https?:\/\/|^data:image\//i.test(url)) {
        alert('Link inválido. Use uma URL começando com http:// ou https://');
        return;
    }
    const probe = new Image();
    probe.onload = function () {
        const img = document.getElementById('charImgPreview');
        img.src = url;
        img.style.objectPosition = '50% 50%';
        localStorage.setItem('charImage', url);
        localStorage.setItem('charImagePos', '50% 50%');
    };
    probe.onerror = function () {
        alert('Não foi possível carregar a imagem do link. Verifique se a URL é válida e acessível.');
    };
    probe.src = url;
}

// ── Imagem da Ficha de Ameaça ─────────────────────────────────────────
function uploadAmeacaImage(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.getElementById('amImgPreview');
            img.src = e.target.result;
            img.style.objectPosition = '50% 50%';
            saveAmeaca();
        };
        reader.readAsDataURL(file);
    }
}

function setAmeacaImageFromUrl(e) {
    if (e) e.stopPropagation();
    const url = (prompt('Cole o link (URL) da imagem da ameaça:') || '').trim();
    if (!url) return;
    if (!/^https?:\/\/|^data:image\//i.test(url)) {
        alert('Link inválido. Use uma URL começando com http:// ou https://');
        return;
    }
    const probe = new Image();
    probe.onload = function () {
        const img = document.getElementById('amImgPreview');
        img.src = url;
        img.style.objectPosition = '50% 50%';
        saveAmeaca();
    };
    probe.onerror = function () {
        alert('Não foi possível carregar a imagem do link. Verifique se a URL é válida e acessível.');
    };
    probe.src = url;
}

function resetAmeacaImage(e) {
    e.stopPropagation();
    const img = document.getElementById('amImgPreview');
    img.src = DEFAULT_CHAR_IMG_SRC;
    img.style.objectPosition = '50% 50%';
    const fileInput = document.getElementById('amImgInput');
    if (fileInput) fileInput.value = '';
    saveAmeaca();
}

// ── Arrastar imagem para reposicionar ──────────────────────────────────
(function initImageDrag() {
    const DRAG_THRESHOLD = 5; // px mínimos para considerar como drag
    let pointerDown = false, hasMoved = false;
    let startX, startY, startPosX, startPosY;

    function getPos(img) {
        const pos = img.style.objectPosition || '50% 50%';
        const parts = pos.split(' ');
        return { x: parseFloat(parts[0]) || 50, y: parseFloat(parts[1]) || 50 };
    }

    function hasRealImage(img) {
        return img && img.src && !img.src.includes('data:image/svg');
    }

    document.addEventListener('DOMContentLoaded', () => {
        const container = document.querySelector('.char-img-container');
        const img = document.getElementById('charImgPreview');
        const fileInput = document.getElementById('charImgInput');
        if (!container || !img || !fileInput) return;

        // Hint visual
        const hint = document.createElement('div');
        hint.className = 'position-absolute top-0 start-0 m-1 px-1 rounded text-white';
        hint.style.cssText = 'font-size:0.6rem;background:rgba(0,0,0,0.45);pointer-events:none;opacity:0;transition:opacity 0.2s;z-index:11;';
        hint.textContent = '✥ Arraste para mover';
        container.appendChild(hint);

        container.addEventListener('mouseenter', () => {
            if (hasRealImage(img)) hint.style.opacity = '1';
        });
        container.addEventListener('mouseleave', () => { hint.style.opacity = '0'; });

        // ── Ponteiro down ──────────────────────────────────────────────
        function onDown(e) {
            if (e.target.closest('button') || e.target.tagName === 'INPUT') return;
            pointerDown = true;
            hasMoved = false;
            startX = e.touches ? e.touches[0].clientX : e.clientX;
            startY = e.touches ? e.touches[0].clientY : e.clientY;
            if (hasRealImage(img)) {
                const pos = getPos(img);
                startPosX = pos.x;
                startPosY = pos.y;
            }
            // Não chama preventDefault aqui para não bloquear clique
        }

        // ── Movimento ──────────────────────────────────────────────────
        function onMove(e) {
            if (!pointerDown || !hasRealImage(img)) return;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            const dx = clientX - startX;
            const dy = clientY - startY;

            if (!hasMoved && Math.sqrt(dx * dx + dy * dy) < DRAG_THRESHOLD) return;
            hasMoved = true;
            container.style.cursor = 'grabbing';

            const pctX = dx / container.offsetWidth * 100;
            const pctY = dy / container.offsetHeight * 100;
            const nx = Math.max(0, Math.min(100, startPosX - pctX));
            const ny = Math.max(0, Math.min(100, startPosY - pctY));
            img.style.objectPosition = `${nx.toFixed(1)}% ${ny.toFixed(1)}%`;
            e.preventDefault();
        }

        // ── Ponteiro up ────────────────────────────────────────────────
        function onUp(e) {
            if (!pointerDown) return;
            pointerDown = false;
            container.style.cursor = hasRealImage(img) ? 'grab' : 'pointer';

            if (hasMoved) {
                // Foi drag: salva posição, não abre file picker
                localStorage.setItem('charImagePos', img.style.objectPosition);
            } else {
                // Foi clique puro: abre file picker
                if (!e.target.closest('button')) fileInput.click();
            }
            hasMoved = false;
        }

        container.addEventListener('mousedown', onDown);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
        container.addEventListener('touchstart', onDown, { passive: true });
        window.addEventListener('touchmove', onMove, { passive: false });
        window.addEventListener('touchend', onUp);
    });
})();

// Carregar imagem e posição salvas
document.addEventListener('DOMContentLoaded', () => {
    const savedImage = localStorage.getItem('charImage');
    const savedPos = localStorage.getItem('charImagePos');
    if (savedImage) {
        const img = document.getElementById('charImgPreview');
        if (img) {
            img.src = savedImage;
            if (savedPos) img.style.objectPosition = savedPos;
        }
    }
});

function escapeHtml(str) {
    // Para evitar quebrar o HTML na renderização
    return String(str)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}


function copyToClipboard() {
    // Coleta de Dados Básicos
    const nome = document.getElementById('charName').value || 'Sem Nome';
    const raca = document.getElementById('charRace').value || '-';
    const classe = document.getElementById('charClass').value || '-';
    const nivel = document.getElementById('charLevel').value || '1';
    const divindade = document.getElementById('charDeity').value || '-';

    // Atributos
    const attrs = ['FOR', 'DES', 'CON', 'INT', 'SAB', 'CAR'];
    const attrVals = {};
    attrs.forEach(a => attrVals[a] = document.getElementById(`attr-${a}`).value);

    // Função auxiliar para buscar bônus total de perícias
    const getSkillVal = (name) => {
        const idx = currentSkills.findIndex(s => s.n === name);
        if (idx !== -1) {
            const val = parseInt(document.getElementById(`skTotal${idx}`).innerText);
            return val >= 0 ? `+${val}` : `${val}`;
        }
        return '+0';
    };

    let resumo = `**Nome:** ${nome}\n`;
    const distincao = document.getElementById('charDistinction')?.value || '';
    const classeTexto = distincao ? `${classe} / ${distincao}` : classe;
    resumo += `**Raça:** ${raca} | **Classe:** ${classeTexto} ND ${nivel}\n`;
    resumo += `**Devoto:** ${divindade}\n`;
    resumo += `------------------------------------------------\n`;

    // Iniciativa e Percepção em destaque
    resumo += `⚡ **INICIATIVA:** ${getSkillVal('Iniciativa')} | **PERCEPÇÃO:** ${getSkillVal('Percepção')}\n`;
    resumo += `🛡️ **DEFESA:** ${document.getElementById('defenseTotal').innerText}\n`;
    resumo += `💪 **RESISTÊNCIAS:** Fort ${getSkillVal('Fortitude')} | Ref ${getSkillVal('Reflexos')} | Von ${getSkillVal('Vontade')}\n`;
    resumo += `❤️ **PV:** ${document.getElementById('pvCurrent').value}/${document.getElementById('pvMax').value}\n`;
    resumo += `🔹 **PM:** ${document.getElementById('pmCurrent').value}/${document.getElementById('pmMax').value}\n`;
    resumo += `🏃 **DESLOCAMENTO:** ${document.getElementById('charSpeed').value || '9m'}\n`;
    resumo += `------------------------------------------------\n`;

    // Perícias Treinadas (Excluindo as que já estão no topo)
    const skillsIgnorar = ['Iniciativa', 'Percepção', 'Fortitude', 'Reflexos', 'Vontade'];
    let outrasPericias = [];
    currentSkills.forEach((s, i) => {
        if (s.trained && !skillsIgnorar.includes(s.n)) {
            const total = document.getElementById(`skTotal${i}`).innerText;
            const formatado = parseInt(total) >= 0 ? `+${total}` : total;
            outrasPericias.push(`${s.n} ${formatado}`);
        }
    });
    if (outrasPericias.length > 0) {
        resumo += `📊 **PERÍCIAS:** ${outrasPericias.join(' | ')}\n`;
        resumo += `------------------------------------------------\n`;
    }

    // Ataques
    const ataques = document.querySelectorAll('#attacksList .atk-row');
    if (ataques.length > 0) {
        resumo += `⚔️ **AÇÕES E ATAQUES:**\n`;
        ataques.forEach(row => {
            const n = row.querySelector('.inp-name').value || 'Ataque';
            const bValue = parseInt(row.querySelector('.inp-bonus').value) || 0;
            const bFormatado = bValue >= 0 ? `+${bValue}` : bValue;
            let d = row.querySelector('.inp-dmg').value || '-';
            const dex = row.querySelector('.inp-dice-extra')?.value || '';
            const dx = row.querySelector('.inp-dmg-extra')?.value || '';
            if (dex && dex !== '0') d += (d !== '-' ? ' + ' : '') + dex;
            if (dx && dx !== '0') d += (d !== '-' ? ' + ' : '') + dx;
            const cr = row.querySelector('.inp-crit-range').value || '20';
            const c = row.querySelector('.inp-crit').value || '-';
            resumo += `▫️ ${n} ${bFormatado} (${d}, ${cr}/${c})\n`;
        });
        resumo += `------------------------------------------------\n`;
    }

    // HABILIDADES E PODERES (Versão atualizada para as duas listas)
    let poderes = [];

    // Coleta da lista de Raça e Origem
    document.querySelectorAll('#abilitiesRaceList .inp-name').forEach(el => {
        if (el.value) poderes.push(el.value);
    });

    // Coleta da lista de Classe e Poderes
    document.querySelectorAll('#abilitiesClassList .inp-name').forEach(el => {
        if (el.value) poderes.push(el.value);
    });

    if (poderes.length > 0) {
        resumo += `✨ **HABILIDADES E PODERES:**\n`;
        resumo += poderes.map(p => `▫️ ${p}`).join('\n') + `\n\n`;
    }

    // Parceiros
    let listaParceiros = [];
    document.querySelectorAll('#mod-parceiros-list .mod-parceiro-row').forEach(row => {
        const nomeParceiro = row.querySelector('.mod-par-nome')?.value;
        const tipoParceiro = row.querySelector('.mod-par-tipo')?.value;
        if (nomeParceiro) {
            listaParceiros.push(`${nomeParceiro}${tipoParceiro ? ` (${tipoParceiro})` : ''}`);
        }
    });

    if (listaParceiros.length > 0) {
        resumo += `🤝 **PARCEIROS E ALIADOS:**\n`;
        resumo += listaParceiros.map(p => `▫️ ${p}`).join('\n') + `\n\n`;
    }

    // Magias
    const temMagias = document.querySelectorAll('.spell-row .inp-name').length > 0;
    if (temMagias) {
        resumo += `🔮 **MAGIAS:**\n`;
        [1, 2, 3, 4, 5].forEach(circulo => {
            const magiasCirculo = document.querySelectorAll(`#spellsList${circulo} .inp-name`);
            if (magiasCirculo.length > 0) {
                let nomesMagias = [];
                magiasCirculo.forEach(m => { if (m.value) nomesMagias.push(m.value); });
                if (nomesMagias.length > 0) {
                    resumo += `*${circulo}º Círculo:* ${nomesMagias.join(', ')}\n`;
                }
            }
        });
        resumo += `\n`;
    }

    // Atributos no rodapé (movidos para antes do equipamento)
    resumo += `------------------------------------------------\n`;
    resumo += `FOR ${attrVals.FOR} | DES ${attrVals.DES} | CON ${attrVals.CON} | INT ${attrVals.INT} | SAB ${attrVals.SAB} | CAR ${attrVals.CAR}\n`;
    resumo += `------------------------------------------------\n`;

    // Equipamentos (Versão separada para Vestidos)
    const itens = document.querySelectorAll('#inventoryList .inv-row');
    if (itens.length > 0) {
        let listaVestidos = [];
        let listaEquipamentos = [];
        
        itens.forEach(row => {
            const nomeItem = row.querySelector('.inp-name').value;
            const qtd = row.querySelector('.inp-qtd').value || '1';
            const isEquipped = row.querySelector('.inp-equipped')?.checked;
            
            if (nomeItem) {
                if (isEquipped) {
                    listaVestidos.push(`▫️ ${nomeItem} (x${qtd})`);
                } else {
                    listaEquipamentos.push(`▫️ ${nomeItem} (x${qtd})`);
                }
            }
        });

        if (listaVestidos.length > 0) {
            resumo += `👕 **VESTINDO:**\n`;
            resumo += `${listaVestidos.join('\n')}\n`;
        }
        
        if (listaEquipamentos.length > 0) {
            resumo += `🎒 **EQUIPAMENTO:**\n`;
            resumo += `${listaEquipamentos.join('\n')}\n`;
        }
    }

    // Copiar para o clipboard com feedback visual
    navigator.clipboard.writeText(resumo).then(() => {
        const btn = document.querySelector('button[onclick="copyToClipboard()"]');
        if (btn) {
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="bi bi-check-lg"></i> Copiado!';
            setTimeout(() => { btn.innerHTML = originalHTML; }, 2000);
        } else {
            alert("Resumo copiado para o Discord!");
        }
    });
}

async function exportarParaPDF() {
    try {
        const binaryString = window.atob(FICHA_PDF_BASE64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        const arrayBuffer = bytes.buffer;
        const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
        const form = pdfDoc.getForm();
        const data = JSON.parse(localStorage.getItem('t20SheetData'));
        if (!data) return alert("Nenhum dado encontrado!");

        // Constantes para cálculos automáticos do PDF
        const level = parseInt(data.charLevel) || 1;
        const halfLevel = Math.floor(level / 2);
        const trainBonus = level >= 15 ? 6 : (level >= 7 ? 4 : 2);

        // --- DADOS BÁSICOS ---
        form.getTextField('Nome do Personagem').setText(data.charName || '');
        form.getTextField('Nome do Jogador').setText(data.playerName || '');
        form.getTextField('Raca do Personagem').setText(data.charRace || '');
        form.getTextField('Origem do Personagem').setText(data.charOrigin || '');
        form.getTextField('Classe(s) do personagem').setText(data.charClass || '');
        form.getTextField('Lv').setText(data.charLevel?.toString() || '1');
        form.getTextField('Divindade').setText(data.charDeity || '');
        form.getTextField('Experiencia total do personagem').setText(data.extras?.xp?.toString() || '0');

        // --- ATRIBUTOS (MODIFICADORES) ---
        const attrMap = { 'FOR': 'ModFor', 'DES': 'ModDes', 'CON': 'ModCon', 'INT': 'ModInt', 'SAB': 'ModSab', 'CAR': 'ModCar' };
        Object.keys(attrMap).forEach(key => {
            try { form.getTextField(attrMap[key]).setText(data.attrs[key]?.toString() || '0'); } catch (e) { }
        });

        // --- STATUS (PV/PM) ---
        form.getTextField('Pontos de Vida m#C3#A1ximos').setText(data.status.pvM?.toString() || '0');
        form.getTextField('Pontos de Vida atuais').setText(data.status.pvC?.toString() || '0');
        form.getTextField('Pontos de Mana m#C3#A1ximos').setText(data.status.pmM?.toString() || '0');
        form.getTextField('Pontos de Mana atuais').setText(data.status.pmC?.toString() || '0');

        // --- PERÍCIAS ---
        const skillSuffix = {
            'Acrobacia': 'acro', 'Adestramento': 'ades', 'Atletismo': 'atle', 'Atuação': 'atua',
            'Cavalgar': 'caval', 'Conhecimento': 'conhe', 'Cura': 'cura', 'Diplomacia': 'dipl',
            'Enganação': 'enga', 'Fortitude': 'forti', 'Furtividade': 'furti', 'Guerra': 'guerra',
            'Iniciativa': 'ini', 'Intimidação': 'inti', 'Intuição': 'intu', 'Investigação': 'inve',
            'Jogatina': 'joga', 'Ladinagem': 'ladi', 'Luta': 'luta', 'Misticismo': 'misti',
            'Nobreza': 'nobre', 'Percepção': 'perce', 'Pilotagem': 'pilo', 'Pontaria': 'ponta',
            'Reflexos': 'refle', 'Religião': 'reli', 'Sobrevivência': 'sobre', 'Vontade': 'vonta'
        };

        data.skills.forEach((s, i) => {
            // Determine suffix: for Ofício default skills, use ofi1 for the first and ofi2 for the second
            let suf = skillSuffix[s.n];
            if (!suf && s.n === 'Ofício') {
                const oficiosBefore = data.skills.slice(0, i).filter(sk => sk.n === 'Ofício').length;
                suf = oficiosBefore === 0 ? 'ofi1' : 'ofi2';
            } else if (!suf && s.n.includes('Ofício')) {
                suf = 'ofi1';
            }
            if (suf) {
                try {
                    const baseId = (i + 1).toString().padStart(2, '0');
                    if (s.trained) { form.getCheckBox(`Mar Trei ${suf}`).check(); }
                    form.getTextField(`${baseId}0`).setText(document.getElementById(`skTotal${i}`)?.innerText || '0');
                    form.getTextField(`${baseId}1`).setText(halfLevel.toString());
                    form.getTextField(`${baseId}3`).setText(s.trained ? trainBonus.toString() : '0');
                    form.getTextField(`${baseId}4`).setText(s.other?.toString() || '0');
                    const attrFieldName = `ModAtrib${suf.charAt(0).toUpperCase() + suf.slice(1, 4)}`;
                    form.getTextField(attrFieldName).setText(data.attrs[s.a]?.toString() || '0');
                } catch (e) { }
            }
        });

        // --- ATAQUES ---
        if (data.attacks && data.attacks.length > 0) {
            data.attacks.slice(0, 5).forEach((atk, i) => {
                const n = i + 1;
                form.getTextField(`Ataque ${n}`).setText(atk.name || '');
                form.getTextField(`Bonus do ataque ${n}`).setText(atk.bonus || '');
                
                let fullDmg = atk.dmg || '';
                if (atk.diceExtra && atk.diceExtra !== '0') fullDmg += (fullDmg ? ' + ' : '') + atk.diceExtra;
                if (atk.dmgExtra && atk.dmgExtra !== '0') fullDmg += (fullDmg ? ' + ' : '') + atk.dmgExtra;
                
                form.getTextField(`Dano causado pelo ataque ${n}`).setText(fullDmg);
                form.getTextField(`Margem de cr#C3#ADtico e multiplicador ${n}`).setText(`${atk.critRange}/${atk.crit}`);
                form.getTextField(`Tipo de dano do ataque ${n}`).setText(atk.type || '');
                form.getTextField(`Alcance do ataque ${n}`).setText(atk.range || '');
            });
        }

        // --- DEFESA (FÓRMULA E DETALHES CORRIGIDOS) ---
        try {
            form.getTextField('CA').setText(document.getElementById('defenseTotal')?.innerText || '10');

            // Pegamos o atributo selecionado (DES, INT, SAB, etc.) e colocamos no campo ModAtribDefe
            const defAttr = data.defense.config.attr || 'DES';
            const defAttrVal = data.attrs[defAttr]?.toString() || '0';
            form.getTextField('ModAtribDefe').setText(defAttrVal);


            // Armadura
            form.getTextField('Armadura').setText(data.defense.armor.name || '');
            const armBonus = data.defense.armor.bonus?.toString() || '0';
            form.getTextField('B.Arm').setText(armBonus);   // Campo da fórmula (topo)
            form.getTextField('B.Arm1').setText(armBonus);  // Campo do detalhe (embaixo)
            form.getTextField('Pa').setText(data.defense.armor.penalty?.toString() || '0');

            // Escudo
            form.getTextField('Escudo').setText(data.defense.shield.name || '');
            const escBonus = data.defense.shield.bonus?.toString() || '0';
            form.getTextField('B.Esc').setText(escBonus);   // Campo da fórmula (topo)
            form.getTextField('B.Esc2').setText(escBonus);  // Campo do detalhe (embaixo)
            form.getTextField('Pe').setText(data.defense.shield.penalty?.toString() || '0');

            // Outros modificadores de Defesa
            let defOutros = 0;
            document.querySelectorAll('#defenseList .def-row .inp-bonus').forEach(input => defOutros += (parseInt(input.value) || 0));
            form.getTextField('Outros B.CA').setText(defOutros.toString());

        } catch (e) { }


        // --- PODERES E PROFICIÊNCIAS ---
        const txtRace = data.raceAbilities ? data.raceAbilities.map(a => `${a.name.toUpperCase()}: ${a.desc}`).join('\n\n') : '';
        try { form.getTextField('Habilidades de raca e origem').setText(txtRace); } catch (e) { }

        const txtClass = data.classAbilities ? data.classAbilities.map(a => `${a.name.toUpperCase()}: ${a.desc}`).join('\n\n') : '';
        try { form.getTextField('Habilidades de Classe e poderes').setText(txtClass); } catch (e) { }

        try { form.getTextField('Proficiencias e outras caracteristicas').setText(data.extras?.profs || ''); } catch (e) { }

        // --- TAMANHO E DESLOCAMENTO ---
        form.getTextField('Deslocamento do personagem').setText(data.extras?.speed || '9m');
        let tamanhoTexto = '';
        try {
            const tamanhoSel = document.getElementById('charSize');
            if (tamanhoSel && tamanhoSel.options.length > 0) {
                tamanhoTexto = tamanhoSel.options[tamanhoSel.selectedIndex].text;
                form.getDropdown('SeleTamanho').select(tamanhoTexto);
            }
        } catch (e) {
            try { form.getTextField('SeleTamanho').setText(tamanhoTexto); } catch (err) { }
        }

        // --- EQUIPAMENTO E DINHEIRO ---
        form.getTextField('Tibares').setText(data.extras?.cash?.toString() || '0');
        form.getTextField('Anotacoes').setText(data.notes || '');
        if (data.inventory) {
            data.inventory.slice(0, 17).forEach((item, i) => {
                const n = i + 1;
                try {
                    form.getTextField(`Item ${n}`).setText(item.name || '');
                    form.getTextField(`Quantidade Item ${n}`).setText(item.qtd?.toString() || '1');
                    form.getTextField(`Slots Item ${n}`).setText(item.slots?.toString() || '0');
                } catch (e) { }
            });
        }

        // --- MAGIAS (Página 2) ---
        if (data.spells && data.spells.list.length > 0) {
            const magiasTexto = data.spells.list.map(m =>
                `[${m.circle}º Circ] ${m.name.toUpperCase()} (${m.pm} PM) - Exec: ${m.exec}, Alc: ${m.range}, Dur: ${m.dur}`
            ).join('\n\n');
            try { form.getTextField('Magias').setText(magiasTexto); } catch (e) { }
        }

        // --- FINALIZAÇÃO ---
        form.updateFieldAppearances(); // Força a atualização visual dos campos
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Ficha_${data.charName || 'Personagem'}.pdf`;
        link.click();

    } catch (error) {
        console.error("Erro na exportação completa:", error);
        alert("Erro ao exportar o PDF. Verifique os dados.");
    }
}



// ============================================================
// INTEGRAÇÃO COM O GRIMÓRIO DE PODERES
// ============================================================
function checkImportedPowers() {
    const importedData = localStorage.getItem('selectedPowers');

    if (importedData) {
        try {
            const powers = JSON.parse(importedData);

        } catch (e) {
            console.error("Erro ao importar poderes do Grimório:", e);
        }
    }
}

// ================================================================
//  FICHA DE AMEAÇA
// ================================================================

let _fichaView = 'personagem'; // 'personagem' | 'ameaca'

function toggleFichaView(mode) {
    _fichaView = mode;
    const personagem = document.getElementById('fichaPersonagemContent');
    const ameaca = document.getElementById('fichaAmeacaSection');
    const modsSection = document.getElementById('fichaModsSection');
    const btnP = document.getElementById('btnViewPersonagem');
    const btnA = document.getElementById('btnViewAmeaca');
    const btnM = document.getElementById('btnViewMods');
    const headerContent = document.querySelector('.header-content');
    const btnsPerson = document.getElementById('headerBtnsPersonagem');
    const btnsAmeaca = document.getElementById('headerBtnsAmeaca');
    const btnPDF = document.getElementById('btnGerarPDF');

    // Reset all
    [personagem, ameaca, modsSection].forEach(el => { if (el) el.style.display = 'none'; });
    if (headerContent) headerContent.style.display = 'none';
    if (btnsPerson) btnsPerson.style.setProperty('display', 'none', 'important');
    if (btnsAmeaca) btnsAmeaca.style.setProperty('display', 'none', 'important');
    if (btnPDF) btnPDF.style.display = '';
    [btnP, btnA, btnM].forEach(b => {
        if (!b) return;
        b.classList.remove('btn-danger', 'btn-warning', 'fw-bold');
        b.classList.add('btn-outline-danger');
    });
    if (btnM) { btnM.classList.remove('btn-outline-danger'); btnM.classList.add('btn-outline-warning'); }

    if (mode === 'ameaca') {
        if (ameaca) ameaca.style.display = 'block';
        if (btnsAmeaca) btnsAmeaca.style.removeProperty('display');
        if (btnPDF) { btnPDF.innerHTML = '<i class="bi bi-file-earmark-pdf"></i> PDF Ameaça'; btnPDF.onclick = exportarAmeacaPDF; btnPDF.title = 'Gerar PDF da Ficha de Ameaça'; }
        if (btnA) { btnA.classList.remove('btn-outline-danger'); btnA.classList.add('btn-danger'); }
        syncAmeacaFromSheet();
    } else if (mode === 'mods') {
        if (modsSection) modsSection.style.display = 'block';
        if (btnsPerson) btnsPerson.style.removeProperty('display');
        if (btnPDF) btnPDF.style.display = 'none';
        if (btnM) { btnM.classList.remove('btn-outline-warning'); btnM.classList.add('btn-warning', 'fw-bold'); }
    } else { // personagem
        if (personagem) personagem.style.display = '';
        if (headerContent) headerContent.style.display = '';
        if (btnsPerson) btnsPerson.style.removeProperty('display');
        if (btnPDF) { btnPDF.innerHTML = '<i class="bi bi-file-earmark-pdf"></i> Gerar PDF Oficial'; btnPDF.onclick = exportarParaPDF; btnPDF.title = 'Gerar PDF Oficial'; }
        if (btnP) { btnP.classList.remove('btn-outline-danger'); btnP.classList.add('btn-danger'); }
    }
}

// Lê o valor calculado de uma perícia pelo nome
function getSkillTotalByName(name) {
    const idx = currentSkills.findIndex(s => s.n === name);
    if (idx === -1) return null;
    const el = document.getElementById(`skTotal${idx}`);
    if (!el) return null;
    const v = parseInt(el.innerText);
    return isNaN(v) ? null : v;
}

function fmtBonus(v) {
    if (v === null || v === undefined) return '–';
    return v >= 0 ? `+${v}` : `${v}`;
}

// Sincroniza valores calculados da ficha principal para a visualização de ameaça
function syncAmeacaFromSheet() {
    updateCalculations();

    // Helper: preenche o input apenas se estiver vazio (não sobrescreve edições do usuário)
    const fill = (id, val) => {
        const el = document.getElementById(id);
        if (el && !el.value) el.value = val || '';
    };
    // Helper: sempre atualiza (re-sync forçado)
    const set = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.value = val || '';
    };

    // Iniciativa, Percepção, Fortitude, Reflexos, Vontade — só preenche se vazio
    fill('am-iniciativa', fmtBonus(getSkillTotalByName('Iniciativa')));
    fill('am-percepcao', fmtBonus(getSkillTotalByName('Percepção')));
    fill('am-fort', fmtBonus(getSkillTotalByName('Fortitude')));
    fill('am-ref', fmtBonus(getSkillTotalByName('Reflexos')));
    fill('am-von', fmtBonus(getSkillTotalByName('Vontade')));

    // Defesa
    set('am-defesa', document.getElementById('defenseTotal')?.innerText || '');

    // PV / PM
    set('am-pv', getVal('pvMax') || '');
    const pmMax = getVal('pmMax') || '';
    set('am-pm', (pmMax && pmMax !== '0') ? pmMax : '');

    // Deslocamento
    fill('am-desl', getVal('charSpeed') || '');

    // Nome, tipo — preenche só se vazio
    fill('am-nome', getVal('charName') || '');
    const raca = getVal('charRace');
    const classeEl = document.getElementById('charClass');
    const tamanhoEl = document.getElementById('charSize');
    const tamanho = tamanhoEl ? tamanhoEl.options[tamanhoEl.selectedIndex]?.text : '';
    fill('am-tipo', [raca, tamanho].filter(Boolean).join(' '));

    // Atributos — preenche só se vazio
    [['FOR', 'am-for'], ['DES', 'am-des'], ['CON', 'am-con'], ['INT', 'am-int'], ['SAB', 'am-sab'], ['CAR', 'am-car']].forEach(([a, id]) => {
        fill(id, fmtBonus(getInt(`attr-${a}`)));
    });

    // Proficiências (obs de percepção)
    const profs = getVal('charProfs') || '';
    fill('am-percepcao-obs', profs);
}

function getSavedAmeacaData() {
    try { return JSON.parse(localStorage.getItem('t20AmeacaData') || '{}'); } catch { return {}; }
}

// ============================================================
// FIX 3 — Importar Ataques da ficha
// ============================================================
function importarAtaquesDaFicha() {
    const rows = document.querySelectorAll('#attacksList .atk-row');
    if (!rows.length) { alert('Nenhum ataque encontrado na ficha.'); return; }

    const existing = new Set(
        Array.from(document.querySelectorAll('#am-ataques-list .am-atk-nome'))
            .map(el => el.value.trim().toLowerCase())
    );

    let added = 0;
    rows.forEach(row => {
        const nome = row.querySelector('.inp-name')?.value?.trim() || '';
        const bonus = row.querySelector('.inp-bonus')?.value?.trim() || '';
        const dmg = row.querySelector('.inp-dmg')?.value?.trim() || '';
        const critR = row.querySelector('.inp-crit-range')?.value?.trim() || '20';
        const crit = row.querySelector('.inp-crit')?.value?.trim() || 'x2';
        if (!nome || existing.has(nome.toLowerCase())) return;
        const danoCompleto = critR && critR !== '20' ? `${dmg}, ${critR}-20/${crit}` : `${dmg}, ${crit}`;
        const bonusFmt = (parseInt(bonus) >= 0 && !bonus.startsWith('-')) ? `+${bonus}` : bonus;
        addAmeacaAtaque({ nome, bonus: bonusFmt, dano: danoCompleto });
        existing.add(nome.toLowerCase());
        added++;
    });

    saveAmeaca();
    if (added > 0) mostrarToastAmeaca(`⚔️ ${added} ataque(s) importado(s)!`);
    else mostrarToastAmeaca('Todos os ataques já estão na lista.');
}

// ============================================================
// FIX 4 — Importar Magias como habilidades (com botão ocultar)
// ============================================================
function importarMagiasDaFicha() {
    const magias = [];
    [1, 2, 3, 4, 5].forEach(circulo => {
        document.querySelectorAll(`#spellsList${circulo} .spell-row`).forEach(row => {
            const nome = row.querySelector('.inp-name')?.value?.trim();
            const pm = row.querySelector('.inp-pm')?.value?.trim();
            const escola = row.querySelector('.inp-school')?.value?.trim();
            const exec = row.querySelector('.inp-exec')?.value?.trim();
            const alcance = row.querySelector('.inp-range')?.value?.trim();
            const alvo = row.querySelector('.inp-target')?.value?.trim();
            const dur = row.querySelector('.inp-dur')?.value?.trim();
            const desc = row.querySelector('.inp-desc')?.value?.trim();
            if (!nome) return;
            const detalhes = [escola, exec && `Exec.: ${exec}`, alcance && `Alc.: ${alcance}`, alvo && `Alvo: ${alvo}`, dur && `Dur.: ${dur}`].filter(Boolean).join(' · ');
            magias.push({ nome: `${nome}${pm ? ` (${pm} PM)` : ''}`, tipo: 'Passiva', desc: [detalhes, desc].filter(Boolean).join('\n') });
        });
    });

    if (!magias.length) { alert('Nenhuma magia encontrada na ficha.'); return; }

    const existing = new Set(Array.from(document.querySelectorAll('#am-habilidades-list .am-hab-nome')).map(el => el.value.trim().toLowerCase()));
    let added = 0;
    magias.forEach(m => {
        if (existing.has(m.nome.toLowerCase())) return;
        addAmeacaHabilidade(m);
        existing.add(m.nome.toLowerCase());
        added++;
    });
    saveAmeaca();
    if (added > 0) mostrarToastAmeaca(`✨ ${added} magia(s) importada(s)!`);
    else mostrarToastAmeaca('Todas as magias já estão na lista.');
}

function toggleMagiasAmeaca() {
    document.querySelectorAll('#am-habilidades-list .am-row').forEach(row => {
        // Identifica linhas de magia pela presença de " PM)" no nome
        const nome = row.querySelector('.am-hab-nome')?.value || '';
        if (nome.includes(' PM)') || nome.includes('PM)')) {
            row.style.display = row.style.display === 'none' ? '' : 'none';
        }
    });
}

// ============================================================
// FIX 5 — Importar Perícias com checklist modal
// ============================================================
const PERICIAS_FIXAS = ['Iniciativa', 'Percepção', 'Fortitude', 'Reflexos', 'Vontade', 'Luta', 'Pontaria']; // já têm campos próprios

function abrirModalImportarPericias() {
    // Monta lista de perícias (excluindo as 5 fixas)
    const pericias = currentSkills
        .map((s, i) => ({
            nome: s.n === 'Ofício' && s.specialty ? `Ofício (${s.specialty})` : s.n,
            total: parseInt(document.getElementById(`skTotal${i}`)?.innerText) || 0
        }))
        .filter(s => {
            const base = s.nome.startsWith('Ofício') ? 'Ofício' : s.nome;
            return !PERICIAS_FIXAS.includes(s.nome) && !PERICIAS_FIXAS.includes(base);
        });

    if (!pericias.length) { alert('Nenhuma perícia disponível.'); return; }

    const modal = document.getElementById('modalImportarPericias');
    const lista = document.getElementById('pericias-import-list');
    lista.innerHTML = pericias.map((s, i) => `
        <label class="d-flex align-items-center gap-2 py-1 border-bottom" style="cursor:pointer;">
            <input type="checkbox" class="form-check-input m-0" id="pck-${i}" value="${i}">
            <span class="fw-bold" style="min-width:140px;">${s.nome}</span>
            <span class="text-danger fw-bold">${s.total >= 0 ? '+' : ''}${s.total}</span>
        </label>
    `).join('');

    // Guarda referência para confirmar
    modal._pericias = pericias;
    modal.style.display = 'flex';
}

function fecharModalPericias() {
    document.getElementById('modalImportarPericias').style.display = 'none';
}

function fecharModalGeral() {
    document.getElementById('modalGeral').style.display = 'none';
}

function confirmarImportarPericias() {
    const modal = document.getElementById('modalImportarPericias');
    const pericias = modal._pericias || [];
    const checks = document.querySelectorAll('#pericias-import-list input[type=checkbox]:checked');
    const existing = new Set(Array.from(document.querySelectorAll('#am-pericias-list .am-per-nome')).map(el => el.value.trim().toLowerCase()));
    let added = 0;
    checks.forEach(chk => {
        const p = pericias[parseInt(chk.value)];
        if (!p || existing.has(p.nome.toLowerCase())) return;
        addAmeacaPericia({ nome: p.nome, valor: (p.total >= 0 ? '+' : '') + p.total });
        existing.add(p.nome.toLowerCase());
        added++;
    });
    saveAmeaca();
    fecharModalPericias();
    if (added > 0) mostrarToastAmeaca(`📋 ${added} perícia(s) importada(s)!`);
}

function marcarTodasPericias(val) {
    document.querySelectorAll('#pericias-import-list input[type=checkbox]').forEach(c => c.checked = val);
}

// Toast simples para ameaça (sem depender do sistema principal)
function mostrarToastAmeaca(msg) {
    const t = document.createElement('div');
    t.textContent = msg;
    Object.assign(t.style, {
        position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
        background: '#1a2a1a', color: '#c8e6a0', padding: '10px 22px',
        borderRadius: '8px', fontWeight: '700', zIndex: '9999',
        boxShadow: '0 4px 14px rgba(0,0,0,.4)', fontSize: '0.9rem', transition: 'opacity .3s'
    });
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; }, 2400);
    setTimeout(() => t.remove(), 2800);
}

// ============================================================
// FICHA DE AMEAÇA
// ============================================================

// Botão "Ameaça Oficial" - mostra menu de seleção das ameaças do banco de dados
function carregarAmeacaOficial() {
    if (typeof AMEACAS_DB === 'undefined') {
        document.getElementById('fileInputAmeaca').click();
        return;
    }
    
    const ameacasOrdenadas = [...AMEACAS_DB].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    
    const parseND = (nd) => {
        if (!nd) return Infinity;
        if (nd === '—') return Infinity;
        if (nd.includes('/')) {
            const [num, den] = nd.split('/');
            return parseFloat(num) / parseFloat(den);
        }
        return parseFloat(nd);
    };
    const ndValues = [...new Set(ameacasOrdenadas.map(a => a.nd).filter(nd => nd))].sort((a, b) => parseND(a) - parseND(b));
    let ndOptions = '<option value="">Todos</option>';
    ndValues.forEach(nd => { ndOptions += `<option value="${nd}">ND ${nd}</option>`; });
    
    const fontes = [...new Set(ameacasOrdenadas.map(a => a.fonte || 'Outro'))].sort();
    let fonteOptions = '<option value="">Todas as fontes</option>';
    fontes.forEach(fonte => { fonteOptions += `<option value="${fonte}">${fonte}</option>`; });
    
    let html = `<div class="p-3">
        <h5 class="text-danger mb-3">Selecione uma Ameaça Oficial</h5>
        <input type="text" id="buscaAmeaca" class="form-control mb-2" placeholder="🔍 Buscar por nome..." oninput="filtrarAmeacas()">
        <div class="row g-2 mb-3">
            <div class="col-4">
                <select id="filtroNd" class="form-select" onchange="filtrarAmeacas()">
                    <option value="">Todos os ND</option>
                    ${ndValues.map(nd => `<option value="${nd}">ND ${nd}</option>`).join('')}
                </select>
            </div>
            <div class="col-4">
                <select id="filtroFonte" class="form-select" onchange="filtrarAmeacas()">
                    ${fonteOptions}
                </select>
            </div>
            <div class="col-4">
                <select id="filtroTipo" class="form-select" onchange="filtrarAmeacas()">
                    <option value="">Todos os tipos</option>
                    <option value="parceiro">Parceiro / Familiar</option>
                </select>
            </div>
        </div>
        <div id="listaAmeacas">`;
    
    ameacasOrdenadas.forEach((ameaca, index) => {
        const fonte = ameaca.fonte || 'Outro';
        const hasHabilidadePF = (ameaca.habilidades || []).some(h => h.nome === 'Parceiro' || h.nome === 'Familiar');
        const isParceiro = ameaca.parceiro || hasHabilidadePF ? '<i class="bi bi-heart-fill text-danger ms-1" title="Pode ser parceiro"></i>' : '';
        const dataTipo = ameaca.parceiro || hasHabilidadePF ? 'parceiro' : '';
        html += `<button class="btn btn-outline-danger w-100 mb-2 text-start" data-nd="${ameaca.nd}" data-fonte="${fonte}" data-tipo="${dataTipo}" onclick="carregarAmeacaDoDB('${ameaca.nome.replace(/'/g, "\\'")}')">
            <strong>${ameaca.nome}</strong>${isParceiro} <span class="text-muted">(${ameaca.tipo})</span>
            <span class="badge bg-danger float-end">${ameaca.nd || '?'}</span>
            ${fonte ? `<span class="badge bg-secondary float-end me-1" style="font-size:0.65rem;">${fonte}</span>` : ''}
        </button>`;
    });
    
    html += `</div></div><hr><button class="btn btn-outline-secondary w-100" onclick="fecharModalGeral();document.getElementById('fileInputAmeaca').click()"><i class="bi bi-upload"></i> Carregar arquivo JSON</button></div>`;
    
    document.getElementById('modalGeralBody').innerHTML = html;
    document.getElementById('modalGeralLabel').textContent = 'Ameaças Oficiais';
    document.getElementById('modalGeral').style.display = 'flex';
}

function filtrarAmeacas() {
    const termo = document.getElementById('buscaAmeaca').value.toLowerCase();
    const nd = document.getElementById('filtroNd').value;
    const fonte = document.getElementById('filtroFonte').value;
    const tipo = document.getElementById('filtroTipo').value;
    const buttons = document.querySelectorAll('#listaAmeacas button');
    buttons.forEach(btn => {
        const nome = btn.querySelector('strong').textContent.toLowerCase();
        const btnNd = btn.getAttribute('data-nd');
        const btnFonte = btn.getAttribute('data-fonte') || 'Outro';
        const btnTipo = btn.getAttribute('data-tipo') || '';
        const matchNome = nome.includes(termo);
        const matchNd = !nd || btnNd === nd;
        const matchFonte = !fonte || btnFonte === fonte;
        const matchTipo = !tipo || btnTipo === 'parceiro';
        btn.style.display = (matchNome && matchNd && matchFonte && matchTipo) ? '' : 'none';
    });
}

function carregarAmeacaDoDB(nome) {
    const data = AMEACAS_DB.find(a => a.nome === nome);
    if (!data) return;
    if (!data.image) {
        // Se a ameaça do banco não tem imagem própria, preserva a imagem já carregada pelo usuário
        const prev = getSavedAmeacaData();
        if (prev.image) data.image = prev.image;
        if (prev.imagePos) data.imagePos = prev.imagePos;
    }
    localStorage.setItem('t20AmeacaData', JSON.stringify(data));
    ['am-ataques-list', 'am-habilidades-list', 'am-pericias-list'].forEach(id => {
        const el = document.getElementById(id); if (el) el.innerHTML = '';
    });
    loadAmeaca();
    fecharModalGeral();
    mostrarToastAmeaca('✅ ' + data.nome + ' carregado!');
}

function saveAmeaca() {
    const ataques = [];
    document.querySelectorAll('#am-ataques-list .am-row').forEach(row => {
        ataques.push({
            nome: row.querySelector('.am-atk-nome')?.value || '',
            tipo: row.querySelector('.am-atk-tipo')?.value || '',
            bonus: row.querySelector('.am-atk-bonus')?.value || '',
            dano: row.querySelector('.am-atk-dano')?.value || '',
            desc: row.querySelector('.am-atk-desc')?.value || ''
        });
    });

    const habilidades = [];
    document.querySelectorAll('#am-habilidades-list .am-row').forEach(row => {
        habilidades.push({
            nome: row.querySelector('.am-hab-nome')?.value || '',
            tipo: row.querySelector('.am-hab-tipo')?.value || '',
            desc: row.querySelector('.am-hab-desc')?.value || ''
        });
    });

    const pericias = [];
    document.querySelectorAll('#am-pericias-list .am-row').forEach(row => {
        pericias.push({
            nome: row.querySelector('.am-per-nome')?.value || '',
            valor: row.querySelector('.am-per-valor')?.value || ''
        });
    });

    const data = {
        nome: document.getElementById('am-nome')?.value || '',
        tipo: document.getElementById('am-tipo')?.value || '',
        nd: document.getElementById('am-nd')?.value || '',
        iniciativa: document.getElementById('am-iniciativa')?.value || '',
        percepcao: document.getElementById('am-percepcao')?.value || '',
        percepcaoObs: document.getElementById('am-percepcao-obs')?.value || '',
        defesa: document.getElementById('am-defesa')?.value || '',
        fort: document.getElementById('am-fort')?.value || '',
        ref: document.getElementById('am-ref')?.value || '',
        von: document.getElementById('am-von')?.value || '',
        defesaObs: document.getElementById('am-defesa-obs')?.value || '',
        pv: document.getElementById('am-pv')?.value || '',
        desl: document.getElementById('am-desl')?.value || '',
        pm: document.getElementById('am-pm')?.value || '',
        atributos: {
            for: document.getElementById('am-for')?.value || '',
            des: document.getElementById('am-des')?.value || '',
            con: document.getElementById('am-con')?.value || '',
            int: document.getElementById('am-int')?.value || '',
            sab: document.getElementById('am-sab')?.value || '',
            car: document.getElementById('am-car')?.value || ''
        },
        ataques,
        habilidades,
        pericias,
        tesouro: document.getElementById('am-tesouro')?.value || '',
        equipamento: document.getElementById('am-equipamento')?.value || ''
    };

    const amImgEl = document.getElementById('amImgPreview');
    if (amImgEl && amImgEl.src && amImgEl.src !== DEFAULT_CHAR_IMG_SRC) {
        data.image = amImgEl.src;
        data.imagePos = amImgEl.style.objectPosition || '50% 50%';
    }

    localStorage.setItem('t20AmeacaData', JSON.stringify(data));
}

function loadAmeaca() {
    const raw = localStorage.getItem('t20AmeacaData');
    if (!raw) return;
    try {
        const d = JSON.parse(raw);
        const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };

        set('am-nome', d.nome);
        set('am-tipo', d.tipo);
        set('am-nd', d.nd);
        set('am-iniciativa', d.iniciativa);
        set('am-percepcao', d.percepcao);
        set('am-percepcao-obs', d.percepcaoObs);
        set('am-defesa', d.defesa);
        set('am-fort', d.fort);
        set('am-ref', d.ref);
        set('am-von', d.von);
        set('am-defesa-obs', d.defesaObs);
        set('am-pv', d.pv);
        set('am-desl', d.desl);
        set('am-pm', d.pm);
        set('am-equipamento', d.equipamento || '');
        set('am-tesouro', d.tesouro);

        if (d.atributos) {
            set('am-for', d.atributos.for);
            set('am-des', d.atributos.des);
            set('am-con', d.atributos.con);
            set('am-int', d.atributos.int);
            set('am-sab', d.atributos.sab);
            set('am-car', d.atributos.car);
        }

        if (d.ataques) d.ataques.forEach(a => addAmeacaAtaque(a));
        if (d.habilidades) d.habilidades.forEach(h => addAmeacaHabilidade(h));
        if (d.pericias) d.pericias.forEach(p => addAmeacaPericia(p));

        if (d.image) {
            const amImg = document.getElementById('amImgPreview');
            if (amImg) {
                amImg.src = d.image;
                if (d.imagePos) amImg.style.objectPosition = d.imagePos;
            }
        } else {
            const amImg = document.getElementById('amImgPreview');
            if (amImg) {
                amImg.src = DEFAULT_CHAR_IMG_SRC;
                amImg.style.objectPosition = '50% 50%';
            }
        }
    } catch (e) {
        console.error('Erro ao carregar ficha de ameaça:', e);
    }
}

function addAmeacaAtaque(data = {}) {
    const container = document.getElementById('am-ataques-list');
    const row = document.createElement('div');
    row.className = 'am-row am-ataque-row';
    row.innerHTML = `
        <div class="am-row-grip"><i class="bi bi-grip-vertical text-muted"></i></div>
        <div class="am-row-body">
            <div class="am-row-line">
                <input type="text" class="am-input am-atk-nome" placeholder="Nome (ex: Mordida)" value="${data.nome || ''}" oninput="saveAmeaca()">
                <select class="am-select am-atk-tipo" onchange="saveAmeaca()">
                    <option value="">Ação</option>
                    <option value="Padrão" ${data.tipo === 'Padrão' ? 'selected' : ''}>Padrão</option>
                    <option value="Livre" ${data.tipo === 'Livre' ? 'selected' : ''}>Livre</option>
                    <option value="Completa" ${data.tipo === 'Completa' ? 'selected' : ''}>Completa</option>
                    <option value="Movimento" ${data.tipo === 'Movimento' ? 'selected' : ''}>Movimento</option>
                    <option value="Reação" ${data.tipo === 'Reação' ? 'selected' : ''}>Reação</option>
                </select>
                <input type="text" class="am-input am-atk-bonus am-val-sm" placeholder="Bônus (+12)" value="${data.bonus || ''}" oninput="saveAmeaca()">
                <input type="text" class="am-input am-atk-dano am-val-md" placeholder="Dano (1d8+5, 19)" value="${data.dano || ''}" oninput="saveAmeaca()">
            </div>
            <textarea class="am-textarea am-atk-desc" placeholder="Descrição adicional (opcional)" oninput="saveAmeaca()">${data.desc || ''}</textarea>
        </div>
        <button class="am-row-del" onclick="this.closest('.am-row').remove(); updateCalculations(); saveAmeaca()" title="Remover"><i class="bi bi-x-lg"></i></button>
    `;
    container.appendChild(row);
}

function addAmeacaHabilidade(data = {}) {
    const container = document.getElementById('am-habilidades-list');
    const row = document.createElement('div');
    row.className = 'am-row am-hab-row';
    row.innerHTML = `
        <div class="am-row-grip"><i class="bi bi-grip-vertical text-muted"></i></div>
        <div class="am-row-body">
            <div class="am-row-line">
                <input type="text" class="am-input am-hab-nome fw-bold" placeholder="Nome da Habilidade" value="${data.nome || ''}" oninput="saveAmeaca()">
                <span class="am-paren">(</span>
                <select class="am-select am-hab-tipo" onchange="saveAmeaca()">
                    <option value="" ${!data.tipo ? 'selected' : ''}>— tipo —</option>
                    <option value="Padrão" ${data.tipo === 'Padrão' ? 'selected' : ''}>Padrão</option>
                    <option value="Livre" ${data.tipo === 'Livre' ? 'selected' : ''}>Livre</option>
                    <option value="Completa" ${data.tipo === 'Completa' ? 'selected' : ''}>Completa</option>
                    <option value="Movimento" ${data.tipo === 'Movimento' ? 'selected' : ''}>Movimento</option>
                    <option value="Reação" ${data.tipo === 'Reação' ? 'selected' : ''}>Reação</option>
                    <option value="Passiva" ${data.tipo === 'Passiva' ? 'selected' : ''}>Passiva</option>
                </select>
                <span class="am-paren">)</span>
            </div>
            <textarea class="am-textarea am-hab-desc" placeholder="Descrição da habilidade..." oninput="saveAmeaca()">${data.desc || ''}</textarea>
        </div>
        <button class="am-row-del" onclick="this.closest('.am-row').remove(); saveAmeaca()" title="Remover"><i class="bi bi-x-lg"></i></button>
    `;
    container.appendChild(row);
}

function addAmeacaPericia(data = {}) {
    const container = document.getElementById('am-pericias-list');
    const row = document.createElement('div');
    row.className = 'am-row am-per-row';
    row.innerHTML = `
        <input type="text" class="am-input am-per-nome" placeholder="Perícia" value="${data.nome || ''}" oninput="saveAmeaca()">
        <input type="text" class="am-input am-per-valor am-val-sm" placeholder="+0" value="${data.valor || ''}" oninput="saveAmeaca()">
        <button class="am-row-del" onclick="this.closest('.am-row').remove(); saveAmeaca()" title="Remover"><i class="bi bi-x-lg"></i></button>
    `;
    container.appendChild(row);
}

function limparAmeaca() {
    if (!confirm('Limpar todos os dados da Ficha de Ameaça?')) return;
    localStorage.removeItem('t20AmeacaData');
    document.getElementById('am-ataques-list').innerHTML = '';
    document.getElementById('am-habilidades-list').innerHTML = '';
    document.getElementById('am-pericias-list').innerHTML = '';
    ['am-nome', 'am-tipo', 'am-nd', 'am-iniciativa', 'am-percepcao', 'am-percepcao-obs',
        'am-defesa', 'am-fort', 'am-ref', 'am-von', 'am-defesa-obs', 'am-pv', 'am-desl', 'am-pm',
        'am-for', 'am-des', 'am-con', 'am-int', 'am-sab', 'am-car', 'am-equipamento', 'am-tesouro'
    ].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    mostrarToastAmeaca('🗑️ Ameaça limpa.');
}

// ─── PDF da Ameaça ──────────────────────────────────────────────
function exportarAmeacaPDF() {
    const nome = document.getElementById('am-nome')?.value || 'Ameaça';
    const tipo = document.getElementById('am-tipo')?.value || '';
    const nd = document.getElementById('am-nd')?.value || '—';

    const g = id => document.getElementById(id)?.value || '—';

    // Monta HTML para impressão
    const ataques = Array.from(document.querySelectorAll('#am-ataques-list .am-row')).map(r => {
        const nome = r.querySelector('.am-atk-nome')?.value || '';
        const tipo = r.querySelector('.am-atk-tipo')?.value || '';
        const bon = r.querySelector('.am-atk-bonus')?.value || '';
        const dano = r.querySelector('.am-atk-dano')?.value || '';
        const desc = r.querySelector('.am-atk-desc')?.value || '';
        if (!nome) return '';
        return `<div class="am-pdf-linha"><span class="am-pdf-chave">Ataque</span> ${nome}${tipo ? ' (' + tipo + ')' : ''} ${bon} (${dano})${desc ? '<br><small class="text-muted">' + desc + '</small>' : ''}</div>`;
    }).join('');

    const habilidades = Array.from(document.querySelectorAll('#am-habilidades-list .am-row')).map(r => {
        const hn = r.querySelector('.am-hab-nome')?.value || '';
        const htipo = r.querySelector('.am-hab-tipo')?.value || '';
        const hdesc = r.querySelector('.am-hab-desc')?.value || '';
        if (!hn) return '';
        return `<div class="am-pdf-linha"><span class="am-pdf-chave">${hn}${htipo ? ' (' + htipo + ')' : ''}</span> ${hdesc}</div>`;
    }).join('');

    const pericias = Array.from(document.querySelectorAll('#am-pericias-list .am-per-row')).map(r => {
        const pn = r.querySelector('.am-per-nome')?.value || '';
        const pv = r.querySelector('.am-per-valor')?.value || '';
        return pn ? `${pn} ${pv}` : '';
    }).filter(Boolean).join(', ');

    const atributos = ['FOR', 'DES', 'CON', 'INT', 'SAB', 'CAR'].map(a => {
        const v = document.getElementById(`am-${a.toLowerCase()}`)?.value || '—';
        return `<span><strong>${a}</strong> ${v}</span>`;
    }).join(' , ');

    const html = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">
    <title>${nome}</title>
    <style>
        body { font-family: Georgia, serif; font-size: 11pt; max-width: 680px; margin: 30px auto; color: #111; }
        h1 { font-size: 20pt; color: #8b0000; text-transform: uppercase; letter-spacing: .06em; margin: 0; border-bottom: 3px solid #8b0000; padding-bottom: 6px; }
        .tipo { font-style: italic; color: #444; font-size: 10pt; margin: 2px 0 10px; }
        .nd-badge { float: right; background: #8b0000; color: #fff; padding: 6px 14px; border-radius: 6px; font-size: 14pt; font-weight: bold; margin-top: -4px; }
        .bloco { margin-bottom: 6px; }
        .chave { font-weight: bold; font-style: italic; color: #8b0000; }
        .am-pdf-chave { font-weight: bold; font-style: italic; color: #8b0000; }
        .am-pdf-linha { margin-bottom: 4px; }
        hr { border: none; border-top: 1px solid #d0b0b0; margin: 8px 0; }
        .atributos { background: #f9f4f4; border: 1px solid #e0c8c8; border-radius: 5px; padding: 6px 10px; text-align: center; display: flex; gap: 14px; justify-content: center; font-size: 10pt; }
        @media print { body { margin: 15mm; } }
    </style></head><body>
    <div class="nd-badge">ND ${nd}</div>
    <h1>${nome}</h1>
    <div class="tipo">${tipo}</div>
    <div class="bloco"><span class="chave">Iniciativa</span> ${g('am-iniciativa')} , <span class="chave">Percepção</span> ${g('am-percepcao')} ${g('am-percepcao-obs') !== '—' ? `<em>${g('am-percepcao-obs')}</em>` : ''}</div>
    <div class="bloco"><span class="chave">Defesa</span> ${g('am-defesa')} , <span class="chave">Fort</span> ${g('am-fort')} , <span class="chave">Ref</span> ${g('am-ref')} , <span class="chave">Von</span> ${g('am-von')} ${g('am-defesa-obs') !== '—' ? `<em>${g('am-defesa-obs')}</em>` : ''}</div>
    <div class="bloco"><span class="chave">Pontos de Vida</span> ${g('am-pv')}</div>
    <div class="bloco"><span class="chave">Deslocamento</span> ${g('am-desl')}</div>
    <hr>
    ${g('am-pm') !== '—' ? `<div class="bloco"><span class="chave">Pontos de Mana</span> ${g('am-pm')}</div>` : ''}
    ${ataques ? `<div class="bloco"><span class="chave" style="font-size:10.5pt;text-transform:uppercase;">Ataques</span>${ataques}</div><hr>` : ''}
    ${habilidades ? `<div class="bloco"><span class="chave" style="font-size:10.5pt;text-transform:uppercase;">Habilidades Especiais</span>${habilidades}</div><hr>` : ''}
    <div class="atributos">${atributos}</div>
    <hr>
    ${pericias ? `<div class="bloco"><span class="chave">Perícias</span> ${pericias}</div><hr>` : ''}
    ${g('am-equipamento') ? `<div class="bloco"><span class="chave">Equipamento</span> ${g('am-equipamento')}</div>` : ''}
    <div class="bloco"><span class="chave">Tesouro</span> ${g('am-tesouro')}</div>
    </body></html>`;

    const win = window.open('', '_blank');
    win.document.write(html);
    win.document.close();
    win.onload = () => win.print();
}

// ─── Copiar Resumo Ameaça (Discord) ─────────────────────────────
function copiarResumoAmeaca() {
    const g = id => document.getElementById(id)?.value?.trim() || '—';
    const nome = g('am-nome');
    const tipo = g('am-tipo');
    const nd = g('am-nd');

    const pericias = Array.from(document.querySelectorAll('#am-pericias-list .am-per-row')).map(r => {
        const pn = r.querySelector('.am-per-nome')?.value || '';
        const pv = r.querySelector('.am-per-valor')?.value || '';
        return pn ? `${pn} ${pv}` : '';
    }).filter(Boolean).join(', ');

    const ataques = Array.from(document.querySelectorAll('#am-ataques-list .am-row')).map(r => {
        const an = r.querySelector('.am-atk-nome')?.value || '';
        const ab = r.querySelector('.am-atk-bonus')?.value || '';
        const ad = r.querySelector('.am-atk-dano')?.value || '';
        return an ? `${an} ${ab} (${ad})` : '';
    }).filter(Boolean).join(' | ');
    // --- LÓGICA DE COLETA DE MAGIAS CORRIGIDA ---
    const habs = Array.from(document.querySelectorAll('#am-habilidades-list .am-row'));
    let magiasPorCirculo = { 1: [], 2: [], 3: [], 4: [], 5: [] };
    let temMagia = false;

    habs.forEach(row => {
        const nomeHab = row.querySelector('.am-hab-nome')?.value?.trim() || '';
        const descHab = row.querySelector('.am-hab-desc')?.value?.trim() || '';

        // SÓ PROCESSA SE O NOME NÃO ESTIVER VAZIO
        if (nomeHab !== '') {
            const matchCirculo = descHab.match(/\[(\d)º\s*Circ\]/i);
            const matchPM = nomeHab.match(/\((\d+)\s*PM\)/i);
            const pmToCirculo = { "1": 1, "3": 2, "6": 3, "10": 4, "15": 5 };

            let circ = null;
            if (matchCirculo) {
                circ = parseInt(matchCirculo[1]);
            } else if (matchPM) {
                circ = pmToCirculo[matchPM[1]] || null;
            }

            if (circ && circ >= 1 && circ <= 5) {
                const nomeLimpo = nomeHab.split(' (')[0];
                magiasPorCirculo[circ].push(nomeLimpo);
                temMagia = true;
            }
        }
    });

    let txtMagias = "";
    if (temMagia) {
        txtMagias = "Magias:\n";
        for (let c = 1; c <= 5; c++) {
            if (magiasPorCirculo[c].length > 0) {
                txtMagias += `* ${c}º círculo: ${magiasPorCirculo[c].join(', ')}\n`;
            }
        }
    }
    // --------------------------------------------

    let txt = `**${nome.toUpperCase()}** — ND ${nd}\n`;
    if (tipo && tipo !== '—') txt += `*${tipo}*\n`;
    txt += `\`\`\`\n`;
    txt += `Ini ${g('am-iniciativa')} · Per ${g('am-percepcao')}`;
    if (g('am-percepcao-obs') !== '—') txt += ` (${g('am-percepcao-obs')})`;
    txt += `\n`;
    txt += `Def ${g('am-defesa')} · Fort ${g('am-fort')} · Ref ${g('am-ref')} · Von ${g('am-von')}\n`;
    if (g('am-defesa-obs') !== '—') txt += `${g('am-defesa-obs')}\n`;
    txt += `PV ${g('am-pv')} · Desl. ${g('am-desl')}\n`;
    if (g('am-pm') !== '—') txt += `PM ${g('am-pm')}\n`;
    if (ataques) txt += `Atq: ${ataques}\n`;
    if (txtMagias) txt += txtMagias;
    txt += `FOR ${g('am-for')} · DES ${g('am-des')} · CON ${g('am-con')} · INT ${g('am-int')} · SAB ${g('am-sab')} · CAR ${g('am-car')}\n`;
    if (pericias) txt += `Perícias: ${pericias}\n`;
    if (g('am-equipamento')) txt += `Equipamento: ${g('am-equipamento')}\n`;
    txt += `Tesouro: ${g('am-tesouro')}\n`;
    txt += `\`\`\``;

    navigator.clipboard.writeText(txt).then(() => mostrarToastAmeaca('📋 Resumo copiado para o Discord!'))
        .catch(() => { prompt('Copie o texto abaixo:', txt); });
}

// ─── Exportar / Importar JSON da Ameaça ─────────────────────────
function exportAmeaca() {
    saveAmeaca();
    const data = localStorage.getItem('t20AmeacaData') || '{}';
    const nome = document.getElementById('am-nome')?.value?.trim() || 'ameaca';
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `ameaca_${nome.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
    mostrarToastAmeaca('💾 Ameaça salva como JSON!');
}

function importAmeacaArquivo(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        try {
            const data = JSON.parse(e.target.result);
            localStorage.setItem('t20AmeacaData', JSON.stringify(data));
            // Limpa listas dinâmicas antes de recarregar
            ['am-ataques-list', 'am-habilidades-list', 'am-pericias-list'].forEach(id => {
                const el = document.getElementById(id); if (el) el.innerHTML = '';
            });
            loadAmeaca();
            mostrarToastAmeaca('✅ Ameaça carregada!');
        } catch {
            alert('Arquivo JSON inválido.');
        }
    };
    reader.readAsText(file);
    input.value = ''; // reset para permitir recarregar o mesmo arquivo
}

// Exporta habilidades especiais da ameaça → abilitiesClassList da ficha
function exportarHabilidadesParaFicha() {
    if (!confirm('Exportar dados da Ameaça para a ficha do Personagem?\n\nIsso incluirá:\n• Nome e Tipo (como Raça)\n• PV, PM, Deslocamento\n• Atributos\n• Habilidades e Magias\n• Perícias: Iniciativa, Luta, Fortitude, Reflexos, Vontade + Relevantes\n• Equipamento e Tesouro\n• Ataques (importados da ameaça)\n• Defesa (somente o valor base)\n\nATENÇÃO: Tudo será LIMPO antes de exportar!')) return;

    // Limpar dados existentes antes de exportar
    document.getElementById('abilitiesRaceList').innerHTML = '';
    document.getElementById('abilitiesClassList').innerHTML = '';
    currentSkills.forEach(s => { s.trained = false; s.other = 0; });
    currentSkills = currentSkills.filter(s => !s.isCustom || ['Iniciativa', 'Luta', 'Fortitude', 'Reflexos', 'Vontade', 'Atletismo', 'Acrobacia', 'Cavalgar', 'Furtividade', 'Ladinagem', 'Percepção', 'Sobrevivência'].includes(s.n));
    document.getElementById('inventoryList').innerHTML = '';
    document.getElementById('charCash').value = '';
    document.getElementById('charCashTO').value = '';
    document.getElementById('charNotes').value = '';
    document.getElementById('attacksList').innerHTML = '';
    document.getElementById('armorName').value = '';
    document.getElementById('armorBonus').value = '';
    document.getElementById('armorPenalty').value = '';
    document.getElementById('armorType').value = 'light';
    document.getElementById('armorDesc').value = '';
    document.getElementById('shieldName').value = '';
    document.getElementById('shieldBonus').value = '';
    document.getElementById('shieldPenalty').value = '';
    document.getElementById('shieldType').value = 'light';
    document.getElementById('shieldDesc').value = '';
    document.getElementById('defenseList').innerHTML = '';

    const getAm = id => document.getElementById(id)?.value || '';

    // Nome e Raça/Tipo
    const nomeAmeaca = getAm('am-nome');
    const tipoAmeaca = getAm('am-tipo');
    if (nomeAmeaca) document.getElementById('charName').value = nomeAmeaca;
    if (tipoAmeaca) document.getElementById('charRace').value = tipoAmeaca;

    // ND para nível (se < 1, usar 1; se S ou S+, usar 20)
    const ndAmeaca = getAm('am-nd');
    if (ndAmeaca) {
        let nivel = 1;
        const ndUpper = ndAmeaca.toUpperCase().trim();
        if (ndUpper === 'S' || ndUpper === 'S+') {
            nivel = 20;
        } else {
            const ndNum = parseInt(ndUpper);
            if (!isNaN(ndNum)) {
                nivel = Math.max(1, ndNum);
            }
        }
        document.getElementById('charLevel').value = nivel;
    }

    // PV e PM
    const pvAmeaca = getAm('am-pv');
    const pmAmeaca = getAm('am-pm');
    if (pvAmeaca) {
        document.getElementById('pvMax').value = pvAmeaca;
        document.getElementById('pvCurrent').value = pvAmeaca;
    }
    if (pmAmeaca) {
        document.getElementById('pmMax').value = pmAmeaca;
        document.getElementById('pmCurrent').value = pmAmeaca;
    }

    // Deslocamento
    const deslAmeaca = getAm('am-desl');
    if (deslAmeaca) document.getElementById('charSpeed').value = deslAmeaca;

    // Atributos
    const attrMap = { 'for': 'FOR', 'des': 'DES', 'con': 'CON', 'int': 'INT', 'sab': 'SAB', 'car': 'CAR' };
    Object.entries(attrMap).forEach(([id, attr]) => {
        const val = getAm(`am-${id}`);
        if (val) document.getElementById(`attr-${attr}`).value = val;
    });

    // Habilidades e Magias
    const habs = [];
    document.querySelectorAll('#am-habilidades-list .am-row').forEach(row => {
        const nome = row.querySelector('.am-hab-nome')?.value?.trim();
        const tipo = row.querySelector('.am-hab-tipo')?.value;
        const desc = row.querySelector('.am-hab-desc')?.value?.trim();
        if (nome) {
            const nomeCompleto = tipo ? `${nome} (${tipo})` : nome;
            habs.push({ name: nomeCompleto, desc: desc || '' });
        }
    });
    const list = document.getElementById('abilitiesClassList');
    if (list && habs.length > 0) {
        const existing = new Set(Array.from(list.querySelectorAll('.inp-name')).map(el => el.value.trim().toLowerCase()));
        habs.forEach(h => {
            if (!existing.has(h.name.toLowerCase())) {
                addAbility('abilitiesClassList', h.name, h.desc);
                existing.add(h.name.toLowerCase());
            }
        });
    }

    // Perícias: Iniciativa, Luta, Fortitude, Reflexos, Vontade + Relevantes
    const periciasFixas = [
        { nome: 'Iniciativa', valor: getAm('am-iniciativa') },
        { nome: 'Luta', valor: null },
        { nome: 'Fortitude', valor: getAm('am-fort') },
        { nome: 'Reflexos', valor: getAm('am-ref') },
        { nome: 'Vontade', valor: getAm('am-von') }
    ];
    const periciasRelevantes = [];
    document.querySelectorAll('#am-pericias-list .am-per-row').forEach(row => {
        const nome = row.querySelector('.am-per-nome')?.value?.trim();
        const valor = row.querySelector('.am-per-val')?.value?.trim();
        if (nome) periciasRelevantes.push({ nome, valor });
    });
    const periciasParaImportar = [...periciasFixas, ...periciasRelevantes];

    const level = parseInt(document.getElementById('charLevel')?.value) || 1;
    const halfLevel = Math.floor(level / 2);
    const levelReduction = level >= 15 ? 6 : level >= 7 ? 4 : 2;
    const skillToAttr = { 'Iniciativa': 'DES', 'Luta': 'FOR', 'Fortitude': 'CON', 'Reflexos': 'DES', 'Vontade': 'SAB' };

    periciasParaImportar.forEach(p => {
        let idx = currentSkills.findIndex(s => s.n === p.nome || (s.n === 'Ofício' && p.nome.startsWith('Ofício')));
        
        if (idx >= 0) {
            currentSkills[idx].trained = true;
            if (p.valor && p.valor !== '+0' && p.valor !== '0') {
                const valNum = parseInt(p.valor.replace('+', '')) || 0;
                const attr = skillToAttr[p.nome];
                const attrVal = attr ? getInt('attr-' + attr) : 0;
                currentSkills[idx].other = (currentSkills[idx].other || 0) + valNum - halfLevel - attrVal - levelReduction;
            }
        } else {
            currentSkills.push({ n: p.nome, a: 'INT', trained: true, other: 0, isCustom: true });
        }
    });

    renderSkills();

    // Exportar ataques da ameaça
    document.querySelectorAll('#am-ataques-list .am-ataque-row').forEach(row => {
        const nome = row.querySelector('.am-atk-nome')?.value?.trim();
        const bonus = row.querySelector('.am-atk-bonus')?.value?.trim();
        const dano = row.querySelector('.am-atk-dano')?.value?.trim();
        const desc = row.querySelector('.am-atk-desc')?.value?.trim();
        if (nome) {
            // Extrair dano e crítico do formato "1d8+5, 19"
            let dmg = '', crit = 'x2', critRange = '20';
            if (dano) {
                const parts = dano.split(',');
                dmg = parts[0].trim();
                if (parts[1]) {
                    critRange = parts[1].trim();
                    crit = 'x2'; // padrão
                }
            }
            // Usar skill vazio (Manual) e colocar o bônus como bônus extra
            const bonusNum = parseInt(bonus?.replace('+', '').replace('-', '')) || 0;
            addAttack({ name: nome, bonus: '', mod: bonusNum, dmg: dmg, crit: crit, critRange: critRange, desc: desc, skill: '' });
        }
    });

    // Exportar defesa (somente o valor base)
    const defAmeaca = getAm('am-defesa');
    if (defAmeaca) {
        // Calcular o bônus de armadura necessário para chegar à defesa informada
        // Defesa = 10 + attr + arm + esc + other
        // Armadura = Defesa - 10 - attr - esc - other
        const defAtual = parseInt(document.getElementById('defenseTotal')?.textContent) || 10;
        const defAttrVal = parseInt(document.getElementById('defAttrVal')?.textContent) || 0;
        const escBonus = parseInt(document.getElementById('shieldBonus')?.value) || 0;
        const defTarget = parseInt(defAmeaca) || 0;
        let armBonus = defTarget - 10 - defAttrVal - escBonus;
        if (armBonus < 0) armBonus = 0;
        document.getElementById('armorBonus').value = armBonus;
    }

    // Exportar observações de percepção e defesa para Proficiências
    const percepcaoObs = getAm('am-percepcao-obs');
    const defesaObs = getAm('am-defesa-obs');
    let profsText = '';
    if (percepcaoObs && percepcaoObs !== '—') profsText += percepcaoObs + (defesaObs && defesaObs !== '—' ? '; ' : '');
    if (defesaObs && defesaObs !== '—') profsText += defesaObs;
    if (profsText) {
        const profsAtuais = document.getElementById('charProfs').value || '';
        document.getElementById('charProfs').value = profsText + (profsAtuais ? '; ' + profsAtuais : '');
    }

    // Exportar equipamento e tesouro para anotações
    const equipAmeaca = getAm('am-equipamento');
    const tresAmeaca = getAm('am-tesouro');
    let notasExtras = '';
    if (equipAmeaca) notasExtras += 'EQUIPAMENTO:\n' + equipAmeaca + '\n\n';
    if (tresAmeaca) notasExtras += 'TESOURO:\n' + tresAmeaca;
    if (notasExtras) {
        const notasAtuais = document.getElementById('charNotes').value || '';
        document.getElementById('charNotes').value = notasExtras + (notasAtuais ? '\n\n---\n\n' + notasAtuais : '');
    }

    document.getElementById('applyDefAttr').checked = false;

    updateCalculations();
    saveData();
    alert('✅ Dados exportados para a ficha do Personagem!');
}

// Importa habilidades de classe/raça da ficha → Ficha de Ameaça
function importarHabilidadesDaFicha() {
    const habs = [];
    ['#abilitiesRaceList', '#abilitiesClassList'].forEach(sel => {
        document.querySelectorAll(`${sel} .ability-row`).forEach(row => {
            const nome = row.querySelector('.inp-name')?.value?.trim();
            const desc = row.querySelector('.inp-desc')?.value?.trim();
            if (nome) habs.push({ nome, desc: desc || '' });
        });
    });
    if (habs.length === 0) { alert('Nenhuma habilidade encontrada na aba Personagem.'); return; }

    const existing = new Set(Array.from(document.querySelectorAll('#am-habilidades-list .am-hab-nome')).map(el => el.value.trim().toLowerCase()));
    let added = 0;
    habs.forEach(h => {
        // Parse nome (tipo) se houver parêntese
        const m = h.nome.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
        const data = m ? { nome: m[1].trim(), tipo: m[2].trim(), desc: h.desc } : { nome: h.nome, tipo: '', desc: h.desc };
        if (!existing.has(data.nome.toLowerCase())) {
            addAmeacaHabilidade(data);
            existing.add(data.nome.toLowerCase());
            added++;
        }
    });
    saveAmeaca();
    alert(`✅ ${added} habilidade(s) importada(s) da ficha.`);
}

// Preenche campos básicos da ameaça usando dados da ficha atual (personagem)
function preencherAmeacaDaFicha() {
    if (!confirm('Preencher campos da Ameaça com os dados atuais da ficha do Personagem?\n\nIsso incluirá:\n• Dados básicos (nome, tipo, PV, PM, defesa, etc.)\n• Habilidades e poderes\n• Magias\n• Perícias marcadas (exceto: Iniciativa, Fortitude, Reflexos, Vontade, Luta, Pontaria)\n\nATENÇÃO: Todas as habilidades, magias e perícias existentes serão removidas antes da importação!')) return;

    const get = id => document.getElementById(id)?.value || '';

    // Limpar listas existentes antes de importar
    document.getElementById('am-habilidades-list').innerHTML = '';
    document.getElementById('am-pericias-list').innerHTML = '';

    // Nome e tipo
    const nome = get('charName'); if (nome) document.getElementById('am-nome').value = nome;
    const raca = get('charRace');
    const tamanho = document.getElementById('charSize');
    const tamanhoTexto = tamanho ? tamanho.options[tamanho.selectedIndex]?.text : '';
    if (raca || tamanhoTexto) document.getElementById('am-tipo').value = [raca, tamanhoTexto].filter(Boolean).join(' ');

    // Defesa
    const defTotal = document.getElementById('defenseTotal')?.textContent;
    if (defTotal) document.getElementById('am-defesa').value = defTotal;

    // PV e PM
    const pv = get('pvMax'); if (pv) document.getElementById('am-pv').value = pv;
    const pm = get('pmMax'); if (pm) document.getElementById('am-pm').value = pm;

    // Deslocamento
    const speed = get('charSpeed'); if (speed) document.getElementById('am-desl').value = speed;

    // Atributos
    ['FOR', 'DES', 'CON', 'INT', 'SAB', 'CAR'].forEach(a => {
        const val = get(`attr-${a}`);
        if (val) document.getElementById(`am-${a.toLowerCase()}`).value = val;
    });

    // Importar habilidades/poderes
    const habs = [];
    ['#abilitiesRaceList', '#abilitiesClassList'].forEach(sel => {
        document.querySelectorAll(`${sel} .ability-row`).forEach(row => {
            const nomeHab = row.querySelector('.inp-name')?.value?.trim();
            const descHab = row.querySelector('.inp-desc')?.value?.trim();
            if (nomeHab) habs.push({ nome: nomeHab, desc: descHab || '' });
        });
    });
    if (habs.length > 0) {
        const existingHabs = new Set(Array.from(document.querySelectorAll('#am-habilidades-list .am-hab-nome')).map(el => el.value.trim().toLowerCase()));
        habs.forEach(h => {
            const m = h.nome.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
            const data = m ? { nome: m[1].trim(), tipo: m[2].trim(), desc: h.desc } : { nome: h.nome, tipo: '', desc: h.desc };
            if (!existingHabs.has(data.nome.toLowerCase())) {
                addAmeacaHabilidade(data);
                existingHabs.add(data.nome.toLowerCase());
            }
        });
    }

    // Importar magias
    const magias = [];
    [1, 2, 3, 4, 5].forEach(circulo => {
        document.querySelectorAll(`#spellsList${circulo} .spell-row`).forEach(row => {
            const nomeMagia = row.querySelector('.inp-name')?.value?.trim();
            const pmMagia = row.querySelector('.inp-pm')?.value?.trim();
            const escola = row.querySelector('.inp-school')?.value?.trim();
            const exec = row.querySelector('.inp-exec')?.value?.trim();
            const alcance = row.querySelector('.inp-range')?.value?.trim();
            const alvo = row.querySelector('.inp-target')?.value?.trim();
            const dur = row.querySelector('.inp-dur')?.value?.trim();
            const descMagia = row.querySelector('.inp-desc')?.value?.trim();
            if (!nomeMagia) return;
            const detalhes = [escola, exec && `Exec.: ${exec}`, alcance && `Alc.: ${alcance}`, alvo && `Alvo: ${alvo}`, dur && `Dur.: ${dur}`].filter(Boolean).join(' · ');
            magias.push({ nome: `${nomeMagia}${pmMagia ? ` (${pmMagia} PM)` : ''}`, tipo: 'Passiva', desc: [detalhes, descMagia].filter(Boolean).join('\n') });
        });
    });
    if (magias.length > 0) {
        const existingMagias = new Set(Array.from(document.querySelectorAll('#am-habilidades-list .am-hab-nome')).map(el => el.value.trim().toLowerCase()));
        magias.forEach(m => {
            if (!existingMagias.has(m.nome.toLowerCase())) {
                addAmeacaHabilidade(m);
                existingMagias.add(m.nome.toLowerCase());
            }
        });
    }

    // Importar perícias marcadas (exceto as fixas)
    const periciasFixas = ['Iniciativa', 'Percepção', 'Fortitude', 'Reflexos', 'Vontade', 'Luta', 'Pontaria'];
    const periciasMarcadas = currentSkills
        .filter(s => s.trained && !periciasFixas.includes(s.n) && !periciasFixas.includes(s.n.startsWith('Ofício') ? 'Ofício' : s.n))
        .map((s, i) => ({
            nome: s.n === 'Ofício' && s.specialty ? `Ofício (${s.specialty})` : s.n,
            total: parseInt(document.getElementById(`skTotal${i}`)?.innerText) || 0
        }));
    if (periciasMarcadas.length > 0) {
        const existingPer = new Set(Array.from(document.querySelectorAll('#am-pericias-list .am-per-nome')).map(el => el.value.trim().toLowerCase()));
        periciasMarcadas.forEach(p => {
            if (!existingPer.has(p.nome.toLowerCase())) {
                addAmeacaPericia({ nome: p.nome, valor: (p.total >= 0 ? '+' : '') + p.total });
                existingPer.add(p.nome.toLowerCase());
            }
        });
    }

    saveAmeaca();
    let msg = '✅ Campos preenchidos da ficha do Personagem!';
    if (habs.length > 0 || magias.length > 0 || periciasMarcadas.length > 0) {
        msg += `\n\nImportados: ${habs.length} poder(es), ${magias.length} magia(s), ${periciasMarcadas.length} perícia(s).`;
    }
    alert(msg);
}

// Inicialização da aba de ameaça
document.addEventListener('DOMContentLoaded', () => {
    loadAmeaca();
});


// Grimorio

let circuloAtual = 1;

function abrirGrimorio(circulo) {
    circuloAtual = circulo;
    document.getElementById('grimorioTitulo').innerText = `🔮 Grimório: ${circulo}º Círculo`;
    document.getElementById('modalGrimorio').style.display = 'flex';
    document.getElementById('inputBuscaMagia').value = '';
    filtrarMagias();
}

function fecharGrimorio() {
    document.getElementById('modalGrimorio').style.display = 'none';
}

function filtrarMagias() {
    const termo = document.getElementById('inputBuscaMagia').value.toLowerCase();
    const lista = document.getElementById('listaMagiasBusca');

    // Filtra pelo círculo e pelo nome (buscando no spells_db.js)
    const magiasFiltradas = SPELLS_DB.filter(m => m.c === circuloAtual && m.n.toLowerCase().includes(termo));

    lista.innerHTML = magiasFiltradas.map(m => `
        <div class="d-flex justify-content-between align-items-center p-2 border-bottom hover-bg-light" style="cursor:pointer;" onclick="selecionarMagia('${m.n}')">
            <div>
                <div class="fw-bold" style="color: #6f42c1;">${m.n}</div>
                <small class="text-muted">${m.e} | ${m.ex}</small>
            </div>
            <i class="bi bi-plus-circle-fill text-primary"></i>
        </div>
    `).join('');
}

function selecionarMagia(nomeMagia) {
    const magia = SPELLS_DB.find(m => m.n === nomeMagia);
    if (magia) {
        // Formata os aprimoramentos para texto
        let descCompleta = magia.desc;

        if (magia.aprimoramentos && magia.aprimoramentos.length > 0) {
            descCompleta += "\n\n--- APRIMORAMENTOS ---";
            magia.aprimoramentos.forEach(aprim => {
                descCompleta += `\n• +${aprim.cost} PM: ${aprim.desc}`;
            });
        }

        const spellData = {
            name: magia.n,
            pm: spellCosts[magia.c], // Puxa 1, 3, 6, 10 ou 15 conforme o círculo
            school: magia.e,
            exec: magia.ex,
            range: magia.a,
            target: magia.al,
            dur: magia.d,
            res: magia.r,
            desc: descCompleta // Agora inclui a descrição + aprimoramentos formatados
        };

        addSpell(magia.c, spellData); // Insere na ficha
        fecharGrimorio(); // Fecha o modal
    }
}
// ================================================================
// SISTEMA DE MODIFICADORES TEMPORÁRIOS
// ================================================================

// Tipos de bônus globais que têm listas individuais
const GLOBAL_MOD_TYPES = ['rolagens', 'pericias', 'ataque', 'dano', 'defesa', 'attr-FOR', 'attr-DES', 'attr-CON', 'attr-INT', 'attr-SAB', 'attr-CAR'];

// Helper: soma todas as linhas da lista de um bônus global e atualiza o input readonly
function getTempMod(id) {
    // Identifica se este id corresponde a um tipo global com lista
    const tipo = GLOBAL_MOD_TYPES.find(t => `mod-${t}` === id);
    if (tipo) {
        // Para 'pericias' global, a lista tem id 'mod-pericias-global-list'
        const listId = tipo === 'pericias' ? 'mod-pericias-global-list' : `mod-${tipo}-list`;
        const container = document.getElementById(listId);
        let total = 0;
        if (container) {
            container.querySelectorAll('.mod-global-row').forEach(row => {
                total += parseInt(row.querySelector('.mod-global-val')?.value) || 0;
            });
        }
        // Sincroniza o campo readonly de exibição e classe de highlight
        const display = document.getElementById(id);
        if (display) {
            display.value = total !== 0 ? total : '';
            display.classList.toggle('has-value', total !== 0);
        }
        return total;
    }
    return parseInt(document.getElementById(id)?.value) || 0;
}

// Chamado em oninput de qualquer campo de modificador
function aplicarModificadores() {
    updateCalculations();
}

// ── Toggle da lista de bônus globais ───────────────────────────
function toggleModGlobalList(tipo) {
    const wrapId = tipo === 'pericias' ? 'mod-pericias-list-wrap' : `mod-${tipo}-list-wrap`;
    const wrap = document.getElementById(wrapId);
    if (wrap) wrap.classList.toggle('d-none');
}

// ── Adicionar linha em bônus global ────────────────────────────
function addModGlobal(tipo) {
    const listId = tipo === 'pericias' ? 'mod-pericias-global-list' : `mod-${tipo}-list`;
    const container = document.getElementById(listId);
    if (!container) return;
    const row = document.createElement('div');
    row.className = 'mod-global-row d-flex align-items-center gap-1 mb-1';
    row.innerHTML = `
        <input type="text" class="form-control form-control-sm mod-global-nome" placeholder="Fonte" style="flex:1; font-size:0.75rem;" oninput="aplicarModificadores()">
        <input type="number" class="form-control form-control-sm mod-global-val" placeholder="+0" style="width:58px; font-size:0.75rem;" oninput="aplicarModificadores()">
        <button class="btn btn-sm btn-outline-danger p-0 px-1" onclick="this.closest('.mod-global-row').remove(); aplicarModificadores();" title="Remover">
            <i class="bi bi-x-lg"></i>
        </button>`;
    container.appendChild(row);
}

// ── Adicionar/remover linhas dinâmicas ──────────────────────────



function addModPericia() {
    const container = document.getElementById('mod-pericias-list');
    // Monta opções a partir das perícias atuais
    const opts = currentSkills.map(s => `<option value="${s.n}">${s.n}</option>`).join('');
    const row = document.createElement('div');
    row.className = 'mod-pericia-row d-flex align-items-center gap-2 mb-2';
    row.innerHTML = `
        <select class="form-select form-select-sm mod-per-sel" style="flex:1;" onchange="aplicarModificadores()">
            <option value="">— Perícia —</option>${opts}
        </select>
        <input type="number" class="form-control form-control-sm mod-per-val" placeholder="+0" style="width:70px;" oninput="aplicarModificadores()">
        <input type="text" class="form-control form-control-sm mod-per-origem" placeholder="Fonte" style="width:100px;" oninput="aplicarModificadores()">
        <button class="btn btn-sm btn-outline-danger p-0 px-1" onclick="this.closest('.mod-pericia-row').remove(); aplicarModificadores();" title="Remover">
            <i class="bi bi-x-lg"></i>
        </button>`;
    container.appendChild(row);
}

function addParceiro() {
    const container = document.getElementById('mod-parceiros-list');
    const row = document.createElement('div');
    // d-flex com flex-wrap permite que os itens se organizem conforme a largura
    row.className = 'mod-parceiro-row d-flex flex-wrap align-items-start gap-2 mb-3 p-2 border-bottom';

    row.innerHTML = `
        <div class="d-flex gap-2 flex-grow-1" style="min-width: 250px;">
            <input type="text" class="form-control form-control-sm mod-par-nome" placeholder="Nome" style="flex: 2;" oninput="atualizarHudMods()">
            <input type="text" class="form-control form-control-sm mod-par-tipo" placeholder="Tipo" style="flex: 1;" oninput="atualizarHudMods()">
            <button class="btn btn-sm btn-outline-danger p-0 px-2" onclick="this.closest('.mod-parceiro-row').remove(); atualizarHudMods();" title="Remover">
                <i class="bi bi-trash"></i>
            </button>
        </div>
        
        <div class="flex-grow-1" style="min-width: 300px;">
            <textarea class="form-control form-control-sm mod-par-bonus" placeholder="Bônus e Habilidades do Parceiro" rows="2" style="width: 100%;" oninput="atualizarHudMods()"></textarea>
        </div>`;

    container.appendChild(row);
}

// ── Limpar tudo ─────────────────────────────────────────────────

function limparModificadores() {
    if (!confirm('Limpar todos os modificadores temporários e condições?')) return;

    // 1 e 2. Limpa os displays readonly e as listas globais individuais
    GLOBAL_MOD_TYPES.forEach(t => {
        const id = `mod-${t}`;
        const el = document.getElementById(id);
        if (el) { el.value = ''; el.classList.remove('has-value'); }

        const listId = t === 'pericias' ? 'mod-pericias-global-list' : `mod-${t}-list`;
        const listEl = document.getElementById(listId);
        if (listEl) listEl.innerHTML = '';
    });
    // Fecha os painéis expansíveis
    GLOBAL_MOD_TYPES.forEach(t => {
        const wrap = document.getElementById(`mod-${t}-list-wrap`);
        if (wrap) wrap.classList.add('d-none');
    });

    // 3. Limpa as listas dinâmicas (Perícias específicas e Parceiros) e Bônus de Atributos de Perícia
    ['mod-pericias-list', 'mod-parceiros-list'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '';
    });
    ['mod-skill-attr-FOR', 'mod-skill-attr-DES', 'mod-skill-attr-CON', 'mod-skill-attr-INT', 'mod-skill-attr-SAB', 'mod-skill-attr-CAR'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });

    // 4. Desmarca todas as condições de jogo
    document.querySelectorAll('.cond-check').forEach(chk => {
        chk.checked = false;
    });

    // 5. Salva o estado limpo e atualiza toda a ficha
    saveData();
    updateCalculations();
}

// ── HUD: indicador compacto abaixo da foto ──────────────────────

function atualizarHudMods() {
    const hud = document.getElementById('modHud');
    if (!hud) return;

    const partes = [];

    // Ícones de modificadores globais — agora mostra cada fonte individualmente
    const globalDefs = [
        { tipo: 'rolagens', icon: '🎲', label: 'Rolagens' },
        { tipo: 'pericias', icon: '📖', label: 'Perícias' },
        { tipo: 'ataque', icon: '⚔️', label: 'Ataque' },
        { tipo: 'dano', icon: '🔥', label: 'Dano' },
        { tipo: 'defesa', icon: '🛡️', label: 'Defesa' },
    ];
    globalDefs.forEach(({ tipo, icon, label }) => {
        const listId = tipo === 'pericias' ? 'mod-pericias-global-list' : `mod-${tipo}-list`;
        const container = document.getElementById(listId);
        if (!container) return;
        container.querySelectorAll('.mod-global-row').forEach(row => {
            const nome = row.querySelector('.mod-global-nome')?.value?.trim() || label;
            const v = parseInt(row.querySelector('.mod-global-val')?.value) || 0;
            if (v !== 0) {
                const sinal = v > 0 ? `+${v}` : `${v}`;
                partes.push(`<span class="mod-hud-item" title="${label}: ${nome} ${sinal}">${icon}<span class="mod-hud-val">${sinal}</span></span>`);
            }
        });
    });

    // Bônus em perícias de atributo (mostrados no HUD se diferentes de 0)
    ['FOR', 'DES', 'CON', 'INT', 'SAB', 'CAR'].forEach(a => {
        const v = getInt(`mod-skill-attr-${a}`);
        if (v !== 0) partes.push(`<span class="mod-hud-item" title="Perícias de ${a}">📖 ${a} <span class="mod-hud-val">${v > 0 ? '+' : ''}${v}</span></span>`);
    });

    // Perícias específicas
    document.querySelectorAll('#mod-pericias-list .mod-pericia-row').forEach(row => {
        const per = row.querySelector('.mod-per-sel')?.value;
        const v = parseInt(row.querySelector('.mod-per-val')?.value) || 0;
        const origem = row.querySelector('.mod-per-origem')?.value;
        if (per && v !== 0) {
            const origemStr = origem ? ` (${origem})` : '';
            partes.push(`<span class="mod-hud-item" title="${per}${origemStr}">📊<span class="mod-hud-val">${v > 0 ? '+' : ''}${v}</span></span>`);
        }
    });

    // Parceiros
    document.querySelectorAll('#mod-parceiros-list .mod-parceiro-row').forEach(row => {
        const nome = row.querySelector('.mod-par-nome')?.value?.trim();
        const bonus = row.querySelector('.mod-par-bonus')?.value?.trim();
        if (nome) partes.push(`<span class="mod-hud-parceiro" title="${bonus || ''}">👥 ${nome}</span>`);
    });

    //Condições
    document.querySelectorAll('.cond-check:checked').forEach(chk => {
        const nome = CONDICOES_T20[chk.value].nome;
        partes.push(`<span class="mod-hud-item bg-warning text-dark" title="${nome}">⚠️<span class="mod-hud-val">${nome}</span></span>`);
    });

    ['FOR', 'DES', 'CON', 'INT', 'SAB', 'CAR'].forEach(a => {
        const v = getInt(`mod-attr-${a}`);
        if (v !== 0) partes.push(`<span class="mod-hud-item bg-primary text-white" title="${a} Temp">${a} <span class="mod-hud-val">${v > 0 ? '+' : ''}${v}</span></span>`);
    });

    if (partes.length === 0) {
        hud.classList.add('d-none');
        hud.innerHTML = '';
    } else {
        hud.classList.remove('d-none');
        hud.innerHTML = partes.join('');
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// ROLL20 IMPORT / EXPORT — Compatível com a sheet JdA do Roll20
// ═══════════════════════════════════════════════════════════════════════════

// Mapeamento: chave Roll20 → nome interno de perícia
const R20_SKILL_MAP = {
    acrobacia: 'Acrobacia', adestramento: 'Adestramento', atletismo: 'Atletismo',
    atuacao: 'Atuação', cavalgar: 'Cavalgar', conhecimento: 'Conhecimento',
    cura: 'Cura', diplomacia: 'Diplomacia', enganacao: 'Enganação',
    fortitude: 'Fortitude', furtividade: 'Furtividade', guerra: 'Guerra',
    iniciativa: 'Iniciativa', intimidacao: 'Intimidação', intuicao: 'Intuição',
    investigacao: 'Investigação', jogatina: 'Jogatina', ladinagem: 'Ladinagem',
    luta: 'Luta', misticismo: 'Misticismo', nobreza: 'Nobreza',
    percepcao: 'Percepção', pilotagem: 'Pilotagem', pontaria: 'Pontaria',
    reflexos: 'Reflexos', religiao: 'Religião', sobrevivencia: 'Sobrevivência',
    vontade: 'Vontade'
};
const SKILL_TO_R20 = {};
Object.entries(R20_SKILL_MAP).forEach(([k, v]) => SKILL_TO_R20[v] = k);

// Condições: diferenças de nomenclatura entre Roll20 e interno
const R20_COND_MAP = {
    abalado: 'abalado', agarrado: 'agarrado', alquebrado: 'alquebrado',
    apavorado: 'apavorado', atordoado: 'atordoado', caido: 'caido',
    cego: 'cego', confuso: 'confuso', debilitado: 'debilitado',
    desprevenido: 'desprevenido', doente: 'doente',
    emchama: 'em_chamas',           // Roll20 usa "emchama", interno usa "em_chamas"
    enfeiticado: 'enfeiticado',
    enjoado: 'enjoado',
    enreado: 'enredado',            // Roll20 usa "enreado", interno usa "enredado"
    envenenado: 'envenenado', esmorecido: 'esmorecido', exausto: 'exausto',
    fascinado: 'fascinado', fatigado: 'fatigado', fraco: 'fraco',
    frustrado: 'frustrado', imovel: 'imovel', inconsciente: 'inconsciente',
    indefeso: 'indefeso', lento: 'lento', ofuscado: 'ofuscado',
    paralizado: 'paralisado',       // Roll20 usa "paralizado", interno usa "paralisado"
    pasmo: 'pasmo', petrificacao: 'petrificacao', sangrando: 'sangrando',
    surdo: 'surdo', surpreendido: 'surpreendido', vulneravel: 'vulneravel'
};
const COND_TO_R20 = {};
Object.entries(R20_COND_MAP).forEach(([r20, int]) => COND_TO_R20[int] = r20);

// Helpers
function r20AttrToKey(str) {
    if (!str) return '';
    const m = String(str).match(/(\w+)_mod/);
    return m ? m[1].toUpperCase() : '';
}

function r20SkillFormToName(formula) {
    if (!formula) return '';
    const m = String(formula).match(/@\{(\w+)total\}/);
    if (!m) return '';
    return R20_SKILL_MAP[m[1]] || '';
}

function r20MultToCrit(mult) { return `x${parseInt(mult) || 2}`; }
function critToR20Mult(crit) {
    const m = String(crit || '2').match(/(\d+)/);
    return m ? m[1] : '2';
}

// ── IMPORTAR DO ROLL20 ────────────────────────────────────────────────────
function importRoll20(input) {
    const file = input.files[0];
    if (!file) return;
    input.value = '';

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const r = JSON.parse(e.target.result);

            // Verifica se é uma ficha Roll20 JdA
            if (!r.isJDA && !('trace' in r) && !('for' in r)) {
                alert('⚠️ Este arquivo não parece ser uma ficha exportada do Roll20 (JdA).\n\nPara importar um backup da sua ficha digital, use o botão "Carregar" normal.');
                return;
            }

            // Monta skills a partir dos dados Roll20
            const skills = JSON.parse(JSON.stringify(defaultSkills));
            let oficioCount = 0;
            skills.forEach(s => {
                if (s.n === 'Ofício') {
                    const key = oficioCount === 0 ? 'oficio' : 'oficio2';
                    oficioCount++;
                    s.trained = r[`${key}_treinada`] === '1' || r[`${key}_treinada`] === 1;
                    s.other   = parseInt(r[`${key}outros`]) || 0;
                    s.specialty = r[`${key}nome`] || '';
                    return;
                }
                const r20key = SKILL_TO_R20[s.n];
                if (!r20key) return;
                s.trained = r[`${r20key}_treinada`] === '1' || r[`${r20key}_treinada`] === 1;
                s.other   = parseInt(r[`${r20key}outros`]) || 0;
            });

            // Dinheiro: Roll20 usa "to" (Tibares de Ouro) e "ts" (de Prata)
            const cash = [
                r.to  ? `${r.to} TO`  : '',
                r.ts  ? `${r.ts} TP`  : ''
            ].filter(Boolean).join(' / ');

            const defOutros = parseInt(r.defesaoutros) || 0;

            const data = {
                version: 15.4,
                playerName: r.playername || '',
                charName:   r.character_name || r.name || '',
                charRace:   r.trace      || '',
                charOrigin: r.torigin  || '',
                charClass:  r.tlevel   || '',
                charLevel:  String(r.charnivel || '1'),
                charDeity:  r.divindade || '',

                extras: {
                    profs: r.proficiencias || '',
                    size:  r.tamanho !== undefined ? String(r.tamanho) : '0',
                    speed: r.deslocamento || '',
                    xp:    '',
                    cash:  cash
                },

                attrs: {
                    FOR: String(r.for || '0'), DES: String(r.des || '0'),
                    CON: String(r.con || '0'), INT: String(r.int || '0'),
                    SAB: String(r.sab || '0'), CAR: String(r.car || '0')
                },

                status: {
                    pvM: String(r.vida || '0'), pvC: String(r.vidatotal || '0'),
                    pmM: String(r.mana || '0'), pmC: String(r.manatotal || '0')
                },

                defense: {
                    config: { attr: r20AttrToKey(r.modatributodefesa) || 'DES', apply: true },
                    armor:  { name: '', bonus: '', penalty: '', type: '', desc: '' },
                    shield: { name: '', bonus: '', penalty: '', type: '', desc: '' },
                    other:  defOutros ? [{ name: 'Defesa (Roll20)', bonus: String(defOutros), note: '' }] : []
                },

                skills,
                attacks: [],
                inventory: [],
                raceAbilities: [],
                classAbilities: [],

                notes:         r.charnotes || '',
                notesCampanha: '',
                notesOutros:   '',

                spells: {
                    config: {
                        attr:   r20AttrToKey(r.cdatributo) || 'INT',
                        powers: String(r.cdpoderes || '0'),
                        items:  String(r.cdequips  || '0'),
                        other:  String(r.cdoutros  || '0')
                    },
                    list: []
                },

                loadBonus: 0, armorLoadBonus: 0, loadConfig: { attr: 'FOR' },

                tempMods: {
                    globais: { attrFOR: '', attrDES: '', attrCON: '', attrINT: '', attrSAB: '', attrCAR: '' },
                    globaisListas: { rolagens: [], pericias: [], ataque: [], dano: [], defesa: [] },
                    bonusLivres: [], periciasEspecificas: [], parceiros: [], condicoes: []
                }
            };

            // Ataques
            (r.attacks || []).forEach(atk => {
                data.attacks.push({
                    name:      atk.nomeataque || '',
                    bonus:     String(atk.bonusataque || '0'),
                    dmg:       atk.danoataque || '',
                    dmgExtra:  atk.danoextraataque || '',
                    diceExtra: atk.dadoextraataque || '',
                    critRange: String(atk.margemcriticoataque || '20'),
                    crit:      r20MultToCrit(atk.multiplicadorcriticoataque),
                    skill:     r20SkillFormToName(atk.ataquepericia),
                    mod:       r20AttrToKey(atk.modatributodano),
                    type:      atk.ataquetipodedano || '',
                    range:     atk.ataquealcance   || '',
                    desc:      (atk.ataquedescricao || '').trim()
                });
            });

            // Habilidades (Coluna Esquerda no Roll20) -> Raça, Origem e Outros
            (r.abilities || []).forEach(ab => {
                data.raceAbilities.push({
                    name: ab.nameability || '',
                    desc: (ab.abilitydescription || '').replace(/\[ \]\([^)]*\)/g, '').trim()
                });
            });

            // Poderes (Coluna Direita no Roll20) -> Classe e Poderes
            (r.powers || []).forEach(pw => {
                data.classAbilities.push({
                    name: pw.namepower || '',
                    desc: (pw.powerdescription || '').replace(/\[ \]\([^)]*\)/g, '').trim()
                });
            });

            // Inventário e Defesas
            (r.equipments || []).forEach(eq => {
                let qty = eq.equipquantity;
                if (!qty || qty === '0') qty = '1';

                let itemName = (eq.equipname || '').trim();
                let lowerName = itemName.toLowerCase();
                
                // Tenta pegar a anotação/descrição do item (o Roll20 JdA usa 'eqpdescription')
                let note = (eq.eqpdescription || eq.equipdescription || eq.equipnotes || eq.equipdesc || eq.equipdescricao || '').trim();

                // Tenta inferir se é armadura ou escudo
                let isArmor = !data.defense.armor.name && (lowerName.includes('armadura') || lowerName.includes('couraça') || lowerName.includes('brunea') || lowerName.includes('cota') || lowerName.includes('gibão') || lowerName.includes('loriga') || lowerName.includes('completa') || lowerName.includes('couro') || lowerName.includes('acolchoada'));
                let isShield = !isArmor && !data.defense.shield.name && (lowerName.includes('escudo') || lowerName.includes('broquel'));

                if (isArmor) {
                    let b = ''; let p = ''; let type = 'light';
                    if (lowerName.includes('completa')) { b = 10; p = 5; type = 'heavy'; }
                    else if (lowerName.includes('meia')) { b = 8; p = 4; type = 'heavy'; }
                    else if (lowerName.includes('loriga')) { b = 7; p = 3; type = 'heavy'; }
                    else if (lowerName.includes('cota')) { b = 6; p = 2; type = 'heavy'; }
                    else if (lowerName.includes('brunea')) { b = 5; p = 2; type = 'heavy'; }
                    else if (lowerName.includes('couraça')) { b = 5; p = 3; type = 'light'; }
                    else if (lowerName.includes('gibão')) { b = 4; p = 3; type = 'light'; }
                    else if (lowerName.includes('batido')) { b = 3; p = 2; type = 'light'; }
                    else if (lowerName.includes('couro')) { b = 2; p = 1; type = 'light'; }
                    else if (lowerName.includes('acolchoada')) { b = 1; p = 0; type = 'light'; }

                    data.defense.armor = { name: itemName, bonus: String(b), penalty: String(p), type: type, desc: note };
                } else if (isShield) {
                    let b = ''; let p = ''; let type = 'light';
                    if (lowerName.includes('pesado')) { b = 2; p = 2; type = 'heavy'; }
                    else if (lowerName.includes('leve') || lowerName.includes('broquel')) { b = 1; p = 1; type = 'light'; }

                    data.defense.shield = { name: itemName, bonus: String(b), penalty: String(p), type: type, desc: note };
                }
                
                // Sempre adiciona ao inventário (armaduras e escudos também ocupam espaço)
                data.inventory.push({
                    equipped: eq.sobrevivencia_treinada === '1' || eq.equipequipped === '1',
                    name:  itemName,
                    qtd:   String(qty),
                    slots: String(eq.equipslot ?? '1'),
                    note:  note
                });
            });

            // Magias (círculos 1–5)
            [1, 2, 3, 4, 5].forEach(circle => {
                (r[`spells${circle}`] || []).forEach(sp => {
                    const schoolMatch = (sp.spelltipo || '').match(/\(([^)]+)\)/);
                    data.spells.list.push({
                        circle,
                        name:   sp.namespell     || '',
                        pm:     String(spellCosts[circle] || circle),
                        school: schoolMatch ? schoolMatch[1] : (sp.spelltipo || ''),
                        exec:   sp.spellexecucao  || '',
                        range:  sp.spellalcance   || '',
                        target: sp.spellalvoarea  || '',
                        dur:    sp.spellduracao   || '',
                        res:    sp.spellresistencia || '',
                        desc:   sp.spelldescription || ''
                    });
                });
            });

            // Condições ativas
            Object.entries(R20_COND_MAP).forEach(([r20key, intKey]) => {
                if (r[r20key] === '1' || r[r20key] === 1) data.tempMods.condicoes.push(intKey);
            });

            localStorage.setItem('t20SheetData', JSON.stringify(data));
            window.location.reload();

        } catch (err) {
            alert('Erro ao importar ficha Roll20.\n\n' + err.message);
            console.error(err);
        }
    };
    reader.readAsText(file);
}

// ── EXPORTAR PARA ROLL20 ──────────────────────────────────────────────────
function exportRoll20() {
    saveData();
    const saved = localStorage.getItem('t20SheetData');
    if (!saved) { alert('Nenhuma ficha para exportar!'); return; }
    const d = JSON.parse(saved);

    const attrForms = {
        FOR: '@{for_mod}', DES: '@{des_mod}', CON: '@{con_mod}',
        INT: '@{int_mod}', SAB: '@{sab_mod}', CAR: '@{car_mod}'
    };
    const physAttrs = new Set(['FOR', 'DES', 'CON']);
    const skillCondFormula = attr => physAttrs.has(attr)
        ? `@{${attr.toLowerCase()}_mod} + @{condicaoperfisico} + @{condicaocego}`
        : `@{${attr.toLowerCase()}_mod} + @{condicaopermental}`;

    const r20 = {
        isJDA:       true,
        playername:  d.playerName || '',
        trace:       d.charName   || '',
        torigin:     d.charOrigin || '',
        tlevel:      d.charClass  || '',
        charnivel:   String(d.charLevel || '1'),

        for: String(d.attrs?.FOR || '0'), des: String(d.attrs?.DES || '0'),
        con: String(d.attrs?.CON || '0'), int: String(d.attrs?.INT || '0'),
        sab: String(d.attrs?.SAB || '0'), car: String(d.attrs?.CAR || '0'),

        vidatotal: String(d.status?.pvC || '0'), vida:     String(d.status?.pvM || '0'), vidatemp: '0',
        manatotal: String(d.status?.pmC || '0'), mana:     String(d.status?.pmM || '0'), manatemp: '0',

        defesaatributo:  '0',
        defesaoutros:    String((d.defense?.other || []).reduce((a, o) => a + (parseInt(o.bonus) || 0), 0)
                               + (parseInt(d.defense?.armor?.bonus) || 0)
                               + (parseInt(d.defense?.shield?.bonus) || 0)),
        modatributodefesa: `${(d.defense?.config?.attr || 'DES').toLowerCase()}_mod`,

        proficiencias: d.extras?.profs  || '',
        charnotes:     d.notes          || '',
        divindade:     d.charDeity       || '',
        tamanho:       String(d.extras?.size ?? '0'),
        deslocamento:  d.extras?.speed   || '',
        ts: '0',
        to: d.extras?.cash || '0',

        cdatributo: `@{${(d.spells?.config?.attr || 'INT').toLowerCase()}_mod} + @{condicaopermental}`,
        cdequips:   String(d.spells?.config?.items  || '0'),
        cdpoderes:  String(d.spells?.config?.powers || '0'),
        cdoutros:   String(d.spells?.config?.other  || '0'),

        extraslot: '0', rolltemp: '0', ataquetemp: '0',
        periciatemp: 0, resistemp: 0,  danotemp: 0,
        fortemp: 0, destemp: 0, contemp: 0, inttemp: 0, sabtemp: 0, cartemp: 0
    };

    // Condições — inicia todas em '0', depois ativa as presentes
    Object.keys(R20_COND_MAP).forEach(k => r20[k] = '0');
    (d.tempMods?.condicoes || []).forEach(intKey => {
        const r20key = COND_TO_R20[intKey];
        if (r20key) r20[r20key] = '1';
    });

    // Perícias
    let oficioCount = 0;
    (d.skills || defaultSkills).forEach(s => {
        const attr = s.a || 'INT';
        if (s.n === 'Ofício') {
            const key = oficioCount === 0 ? 'oficio' : 'oficio2';
            oficioCount++;
            r20[`${key}_treinada`]   = s.trained ? '1' : '0';
            r20[`${key}atributo2`]   = skillCondFormula(attr);
            r20[`${key}outros`]      = String(s.other || 0);
            r20[`${key}nome`]        = s.specialty || '';
            return;
        }
        const r20key = SKILL_TO_R20[s.n];
        if (!r20key) return;
        r20[`${r20key}_treinada`] = s.trained ? '1' : '0';
        r20[`${r20key}atributo2`] = skillCondFormula(attr);
        r20[`${r20key}outros`]    = String(s.other || 0);
    });

    // Ataques
    r20.attacks = (d.attacks || []).map(atk => {
        const mult    = critToR20Mult(atk.crit);
        const dmgDice = atk.dmg || '0';
        const critStr = Array(parseInt(mult)).fill(dmgDice).join(' + ') + ' + 0 + 0';
        const sn = atk.skill || '';
        let ataquepericia = '';
        if (sn === 'Luta')     ataquepericia = '@{lutatotal}+@{condicaomodataquecc}+@{condicaomodataque}';
        else if (sn === 'Pontaria') ataquepericia = '@{pontariatotal}+@{condicaomodataquecd}+@{condicaomodataque}';
        else if (sn) {
            const k = SKILL_TO_R20[sn] || sn.toLowerCase();
            ataquepericia = `@{${k}total}+@{condicaomodataque}`;
        }
        return {
            nomeataque:              atk.name || '',
            modatributodano:         attrForms[atk.mod] || '@{for_mod}',
            danoataque:              atk.dmg  || '',
            danocriticoataque:       critStr,
            multiplicadorcriticoataque: mult,
            bonusataque:             String(atk.bonus || '0'),
            danoextraataque:         atk.dmgExtra || '0',
            ataquedescricao:         atk.desc  || '',
            dadoextraataque:         atk.diceExtra || '0',
            margemcriticoataque:     String(atk.critRange || '20'),
            ataquepericia,
            ataquetipodedano:        atk.type  || '',
            ataquealcance:           atk.range || '',
            tipocritico:             ''
        };
    });

    // Habilidades (Coluna Esquerda)
    r20.abilities = (d.raceAbilities || []).map(a => ({ 
        nameability: a.name || '', 
        abilitydescription: a.desc || '' 
    }));

    // Poderes (Coluna Direita)
    r20.powers = (d.classAbilities || []).map(a => ({ 
        namepower: a.name || '', 
        powerdescription: a.desc || '' 
    }));

    // Inventário
    r20.equipments = (d.inventory || []).map(item => ({
        equipname:        item.name  || '',
        equipslot:        item.slots || '1',
        equipquantity:    item.qtd   || '0',
        equipweight:      '1',
        eqpdescription:   item.note  || '',
        sobrevivencia_treinada: item.equipped ? '1' : '0'
    }));

    // Adiciona armadura e escudo da ficha local de volta ao inventário Roll20
    if (d.defense?.armor?.name) {
        r20.equipments.push({
            equipname: d.defense.armor.name,
            equipslot: d.defense.armor.type === 'heavy' ? '5' : '2',
            equipquantity: '1',
            equipweight: '1',
            eqpdescription: d.defense.armor.desc || '',
            sobrevivencia_treinada: '1' // Marca como "equipado" na ficha Roll20
        });
    }
    if (d.defense?.shield?.name) {
        r20.equipments.push({
            equipname: d.defense.shield.name,
            equipslot: d.defense.shield.type === 'heavy' ? '2' : '1',
            equipquantity: '1',
            equipweight: '1',
            eqpdescription: d.defense.shield.desc || '',
            sobrevivencia_treinada: '1'
        });
    }

    // Magias agrupadas por círculo
    [1, 2, 3, 4, 5].forEach(circle => {
        r20[`spells${circle}`] = (d.spells?.list || [])
            .filter(sp => sp.circle === circle)
            .map(sp => ({
                namespell:        sp.name   || '',
                spelltipo:        sp.school ? `${circle}º círculo (${sp.school})` : `${circle}º círculo`,
                spellexecucao:    sp.exec   || '',
                spellalcance:     sp.range  || '',
                spellduracao:     sp.dur    || '',
                spellalvoarea:    sp.target || '',
                spellresistencia: sp.res    || '',
                spelldescription: sp.desc   || '',
                spellcd:          '0'
            }));
    });

    r20.extraSkills = [];

    const charName = d.charName || 'personagem';
    const blob = new Blob([JSON.stringify(r20, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `roll20_${charName.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ═══════════════════════════════════════════════════════════════════════════
// FOUNDRY VTT IMPORT / EXPORT — Compatível com o sistema Tormenta20 (Vizael)
// ═══════════════════════════════════════════════════════════════════════════
// OBS: o mapeamento de atributos, perícias, PV/PM, defesa, dinheiro e dados
// gerais do personagem é 1:1 com o "actor.system" do Foundry (testado contra
// um ator exportado em branco). Ataques, poderes, equipamentos e magias são
// exportados como Items (arma/poder/equipamento/magia) com o texto completo
// na descrição — os campos numéricos desses Items usam os nomes mais comuns
// do sistema, mas como o Foundry recalcula muita coisa a partir dos Items de
// Raça/Origem/Classe/Divindade (arrastados do compêndio), vale a pena revisar
// esses itens dentro do Foundry após importar.

// Mapeamento: nome interno da perícia → chave do Foundry (tormenta20 system)
const FOUNDRY_SKILL_MAP = {
    'Acrobacia': 'acro', 'Adestramento': 'ades', 'Atletismo': 'atle',
    'Atuação': 'atua', 'Cavalgar': 'cava', 'Conhecimento': 'conh',
    'Cura': 'cura', 'Diplomacia': 'dipl', 'Enganação': 'enga',
    'Fortitude': 'fort', 'Furtividade': 'furt', 'Guerra': 'guer',
    'Iniciativa': 'inic', 'Intimidação': 'inti', 'Intuição': 'intu',
    'Investigação': 'inve', 'Jogatina': 'joga', 'Ladinagem': 'ladi',
    'Luta': 'luta', 'Misticismo': 'mist', 'Nobreza': 'nobr',
    'Percepção': 'perc', 'Pilotagem': 'pilo', 'Pontaria': 'pont',
    'Reflexos': 'refl', 'Religião': 'reli', 'Sobrevivência': 'sobr',
    'Vontade': 'vont'
};
const FOUNDRY_TO_SKILL = {};
Object.entries(FOUNDRY_SKILL_MAP).forEach(([k, v]) => FOUNDRY_TO_SKILL[v] = k);

// Ofícios específicos do Foundry — usados para tentar encaixar a especialidade
// de "Ofício" digitada na ficha local num dos ofícios pré-cadastrados do sistema.
// Se não encontrar, cai no genérico "arte" (Artesão).
const FOUNDRY_CRAFT_MAP = {
    alfa: /alfaiat/i, alqu: /alquimi/i, arme: /armeir/i,
    cozi: /culin[aá]ri|cozinh/i, enge: /engenh/i
};
function craftSpecialtyToFoundryKey(specialty) {
    if (!specialty) return 'arte';
    for (const [key, re] of Object.entries(FOUNDRY_CRAFT_MAP)) {
        if (re.test(specialty)) return key;
    }
    return 'arte';
}

// Tamanho: valor interno (usado em <select id="charSize">) ↔ chave do Foundry
const FOUNDRY_SIZE_MAP = { '5': 'min', '2': 'peq', '0': 'med', '-2': 'gra', '-5': 'enor', '-10': 'col' };
const SIZE_FROM_FOUNDRY = {};
Object.entries(FOUNDRY_SIZE_MAP).forEach(([k, v]) => SIZE_FROM_FOUNDRY[v] = k);

function foundryAttrKey(attrCode) { return String(attrCode || 'DES').toLowerCase(); }
function attrKeyToFoundry(key) {
    const m = { for: 'FOR', des: 'DES', con: 'CON', int: 'INT', sab: 'SAB', car: 'CAR' };
    return m[String(key || 'des').toLowerCase()] || 'DES';
}

// ── IMPORTAR DO FOUNDRY ───────────────────────────────────────────────────
function importFoundry(input) {
    const file = input.files[0];
    if (!file) return;
    input.value = '';

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const f = JSON.parse(e.target.result);
            const sys = f.system;

            if (!sys || !sys.atributos || !sys.pericias) {
                alert('⚠️ Este arquivo não parece ser um Ator exportado do Foundry (sistema Tormenta20).\n\nPara importar um backup da sua ficha digital, use o botão "Carregar" normal.');
                return;
            }

            const atr = sys.atributos || {};
            const attrs = {
                FOR: String(atr.for?.value ?? 0), DES: String(atr.des?.value ?? 0),
                CON: String(atr.con?.value ?? 0), INT: String(atr.int?.value ?? 0),
                SAB: String(atr.sab?.value ?? 0), CAR: String(atr.car?.value ?? 0)
            };

            const pv = sys.attributes?.pv || {};
            const pm = sys.attributes?.pm || {};
            const defesa = sys.attributes?.defesa || {};
            const items = Array.isArray(f.items) ? f.items : [];

            // Monta skills a partir das perícias do Foundry
            const skills = JSON.parse(JSON.stringify(defaultSkills));
            let oficioCount = 0;
            skills.forEach(s => {
                if (s.n === 'Ofício') {
                    const key = oficioCount === 0 ? 'arte' : 'alqu'; // melhor esforço: 1º ofício = arte, 2º = alqu
                    oficioCount++;
                    const p = sys.pericias?.[key];
                    if (p) {
                        s.trained = !!p.treinado;
                        s.other = parseInt(p.outros) || 0;
                        s.specialty = p.label || '';
                    }
                    return;
                }
                const fkey = FOUNDRY_SKILL_MAP[s.n];
                const p = fkey && sys.pericias?.[fkey];
                if (!p) return;
                s.trained = !!p.treinado;
                s.other = parseInt(p.outros) || 0;
            });

            const cashTO = sys.dinheiro?.to || 0;

            const data = {
                version: 15.4,
                playerName: '', // Foundry não guarda o nome do jogador no ator
                charName: f.name || '',
                charRace: sys.detalhes?.raca || '',
                charOrigin: sys.detalhes?.origem || '',
                charClass: items.find(it => it.type === 'classe')?.name || '',
                charLevel: String(sys.attributes?.nivel?.value || '1'),
                charDeity: sys.detalhes?.divindade || '',

                extras: {
                    profs: '',
                    size: String(SIZE_FROM_FOUNDRY[sys.tracos?.tamanho] ?? '0'),
                    speed: sys.attributes?.movement?.walk?.base ? `${sys.attributes.movement.walk.base}m` : '',
                    xp: String(sys.attributes?.nivel?.xp?.value || ''),
                    cash: cashTO ? String(cashTO) : ''
                },

                attrs,

                status: {
                    pvM: String(pv.max ?? '0'), pvC: String(pv.value ?? '0'),
                    pmM: String(pm.max ?? '0'), pmC: String(pm.value ?? '0')
                },

                defense: {
                    config: { attr: attrKeyToFoundry(defesa.atributo), apply: true },
                    armor: { name: '', bonus: '', penalty: '', type: '', desc: '' },
                    shield: { name: '', bonus: '', penalty: '', type: '', desc: '' },
                    other: defesa.outros ? [{ name: 'Defesa (Foundry)', bonus: String(defesa.outros), note: '' }] : []
                },

                skills,
                attacks: [],
                inventory: [],
                raceAbilities: [],
                classAbilities: [],

                notes: (sys.detalhes?.biography?.value || '').replace(/<\/p>\s*<p>/gi, '\n\n').replace(/<[^>]+>/g, '').trim(),
                notesCampanha: '',
                notesOutros: '',

                spells: {
                    config: { attr: attrKeyToFoundry(sys.attributes?.conjuracao), powers: '0', items: '0', other: '0' },
                    list: []
                },

                loadBonus: 0, armorLoadBonus: 0, loadConfig: { attr: 'FOR' },

                tempMods: {
                    globais: { attrFOR: '', attrDES: '', attrCON: '', attrINT: '', attrSAB: '', attrCAR: '' },
                    globaisListas: { rolagens: [], pericias: [], ataque: [], dano: [], defesa: [] },
                    bonusLivres: [], periciasEspecificas: [], parceiros: [], condicoes: []
                }
            };

            // Items → ataques / poderes / equipamentos / magias
            const ESCOLA_LABELS = { abj: 'Abjuração', adi: 'Adivinhação', con: 'Convocação', enc: 'Encantamento', evo: 'Evocação', ilu: 'Ilusão', nec: 'Necromancia', tra: 'Transmutação' };
            const ALCANCE_LABELS = { touch: 'Toque', short: 'Curto', none: 'Pessoal' };
            items.forEach(it => {
                const desc = (it.system?.description?.value || it.system?.descricao?.value || '')
                    .replace(/<\/p>\s*<p>/gi, '\n\n').replace(/<[^>]+>/g, '').trim();

                if (it.type === 'arma') {
                    const rolls = it.system?.rolls || [];
                    const atkRoll = rolls.find(r => r.type === 'ataque');
                    const dmgRoll = rolls.find(r => r.type === 'dano');
                    data.attacks.push({
                        name: it.name || '',
                        bonus: String(atkRoll?.parts?.[2]?.[0] ?? '0'),
                        dmg: dmgRoll?.parts?.[0]?.[0] || '',
                        dmgExtra: '', diceExtra: '0',
                        critRange: String(it.system?.criticoM ?? '20'),
                        crit: `x${it.system?.criticoX ?? 2}`,
                        skill: '', mod: 'FOR',
                        type: dmgRoll?.parts?.[0]?.[1] || '',
                        range: it.system?.proposito === 'distância' ? 'Curto' : '', desc
                    });
                } else if (it.type === 'poder') {
                    (it.system?.tipo === 'racial' ? data.raceAbilities : data.classAbilities)
                        .push({ name: it.name || '', desc });
                } else if (it.type === 'equipamento' || it.type === 'consumivel' || it.type === 'tesouro') {
                    data.inventory.push({
                        equipped: !!it.system?.equipado,
                        name: it.name || '', qtd: String(it.system?.qtd ?? '1'),
                        slots: String(it.system?.espacos ?? '1'), note: desc
                    });
                } else if (it.type === 'magia') {
                    const circle = parseInt(it.system?.circulo) || 1;
                    data.spells.list.push({
                        circle,
                        name: it.name || '',
                        pm: String(it.system?.ativacao?.custo || spellCosts[circle] || circle),
                        school: ESCOLA_LABELS[it.system?.escola] || '',
                        exec: it.system?.ativacao?.execucao === 'action' ? 'Padrão' : (it.system?.ativacao?.execucao || ''),
                        range: ALCANCE_LABELS[it.system?.alcance] || '',
                        target: it.system?.alvo || it.system?.area || '',
                        dur: it.system?.duracao?.special || '',
                        res: it.system?.resistencia?.txt || '',
                        desc
                    });
                }
            });

            localStorage.setItem('t20SheetData', JSON.stringify(data));
            window.location.reload();

        } catch (err) {
            alert('Erro ao importar ficha do Foundry.\n\n' + err.message);
            console.error(err);
        }
    };
    reader.readAsText(file);
}

// ── EXPORTAR PARA FOUNDRY ─────────────────────────────────────────────────
function exportFoundry() {
    saveData();
    const saved = localStorage.getItem('t20SheetData');
    if (!saved) { alert('Nenhuma ficha para exportar!'); return; }
    const d = JSON.parse(saved);

    const attrOf = key => parseInt(d.attrs?.[key]) || 0;
    const mkAttr = v => ({ value: v, base: v, racial: 0, bonus: 0 });

    const nivel = parseInt(d.charLevel) || 1;
    const pvM = parseInt(d.status?.pvM) || 0;
    const pvC = parseInt(d.status?.pvC) || 0;
    const pmM = parseInt(d.status?.pmM) || 0;
    const pmC = parseInt(d.status?.pmC) || 0;

    const defAttr = foundryAttrKey(d.defense?.config?.attr);
    const defOutros = (d.defense?.other || []).reduce((a, o) => a + (parseInt(o.bonus) || 0), 0)
        + (parseInt(d.defense?.armor?.bonus) || 0) + (parseInt(d.defense?.shield?.bonus) || 0);

    const conjAttr = foundryAttrKey(d.spells?.config?.attr || 'INT');
    const cd = 10 + Math.floor(nivel / 2) + attrOf(attrKeyToFoundry(conjAttr))
        + (parseInt(d.spells?.config?.powers) || 0) + (parseInt(d.spells?.config?.other) || 0);

    const speedMatch = String(d.extras?.speed || '').match(/(\d+)/);

    const sys = {
        atributos: {
            for: mkAttr(attrOf('FOR')), des: mkAttr(attrOf('DES')), con: mkAttr(attrOf('CON')),
            int: mkAttr(attrOf('INT')), sab: mkAttr(attrOf('SAB')), car: mkAttr(attrOf('CAR'))
        },
        attributes: {
            carga: { value: 0, atributo: 'for', base: 10, bonus: [], limit: 0, max: 0, pct: 0, encumbered: false },
            cd,
            conjuracao: conjAttr,
            defesa: { atributo: defAttr, pda: 0, value: 10 + attrOf(attrKeyToFoundry(defAttr)) + defOutros, base: 10, outros: defOutros, condi: 0, bonus: [] },
            movement: {
                walk: { base: speedMatch ? parseInt(speedMatch[1]) : 9, bonus: [] },
                climb: { base: 0, bonus: [] }, burrow: { base: 0, bonus: [] },
                swim: { base: 0, bonus: [] }, fly: { base: 0, bonus: [] },
                hover: false, unit: 'm', tags: []
            },
            nivel: { value: nivel, xp: { value: parseInt(d.extras?.xp) || 0, pct: 0, proximo: 0 } },
            pv: {
                value: pvC, temp: 0, min: 0, max: pvM,
                atributos: { for: false, des: false, int: false, sab: false, car: false },
                bonus: { nivel: ['0'], nivelPar: ['0'], nivelImpar: ['0'], total: ['0'] }
            },
            pm: {
                value: pmC, temp: 0, min: 0, max: pmM,
                atributos: { for: false, des: false, con: false, int: false, sab: false, car: false },
                bonus: { nivel: ['0'], nivelPar: ['0'], nivelImpar: ['0'], total: ['0'] }
            },
            sentidos: { value: [] },
            treino: 0
        },
        detalhes: {
            origem: d.charOrigin || '', info: d.extras?.profs || '', divindade: d.charDeity || '',
            raca: d.charRace || '', tipo: 'hum',
            biography: { value: (d.notes || '').split('\n').map(l => `<p>${l}</p>`).join(''), public: '' },
            diario: { name: '', value: '' }, diario1: { name: '', value: '' }, diario2: { name: '', value: '' },
            diario3: { name: '', value: '' }, diario4: { name: '', value: '' }, diario5: { name: '', value: '' }
        },
        dinheiro: { tc: 0, tl: 0, to: parseInt(String(d.extras?.cash || '').replace(/\D/g, '')) || 0, tp: 0 },
        modificadores: {
            custoPM: 0,
            atributos: { for: [], des: [], con: [], int: [], sab: [], car: [], fisicos: [], mentais: [], geral: [] },
            ataque: { geral: [], cac: [], ad: [] }, cura: { geral: [], mag: [] },
            dano: { ad: [], alq: [], cac: [], geral: [], mag: [] },
            pericias: { geral: [], resistencia: [], semataque: [], ataque: [], atr: { for: [], des: [], con: [], int: [], sab: [], car: [] } }
        },
        pericias: {},
        resources: {
            primary: { value: 0, max: 0, label: 'Recurso 1' }, secondary: { value: 0, max: 0, label: 'Recurso 2' },
            tertiary: { value: 0, max: 0, label: 'Recurso 3' }, deathsave: { value: 0, max: 3, label: 'Falha na Morte' },
            shadow: { value: 0, max: 5, label: 'Pontos de Sombra' }, catarse: { value: 0, max: 3, label: 'Catarse' }
        },
        tracos: {
            ic: { value: [] }, idiomas: { value: [] }, profArmaduras: { value: [] }, profArmas: { value: [] },
            resistencias: { dano: {}, perda: {}, acido: {}, corte: {}, eletricidade: {}, essencia: {}, fogo: {}, frio: {}, impacto: {}, luz: {}, psiquico: {}, perfuracao: {}, trevas: {} },
            tamanho: FOUNDRY_SIZE_MAP[String(d.extras?.size ?? '0')] || 'med'
        },
        equipamentos: { limiteEmpunhado: 2, limiteVestido: 4 }
    };
    Object.keys(sys.tracos.resistencias).forEach(k => {
        sys.tracos.resistencias[k] = { value: 0, base: 0, bonus: [], excecao: 0, imunidade: false, vulnerabilidade: false, danoPorDado: false };
    });

    // Perícias — parte dos códigos-padrão do sistema (mesmos atributos/flags do template)
    const PERICIA_TEMPLATE = {
        acro: 'des', ades: 'car', atle: 'for', atua: 'car', cava: 'des', conh: 'int', cura: 'sab',
        dipl: 'car', enga: 'car', fort: 'con', furt: 'des', guer: 'int', inic: 'des', inti: 'car',
        intu: 'sab', inve: 'int', joga: 'car', ladi: 'des', luta: 'for', mist: 'int', nobr: 'int',
        perc: 'sab', pilo: 'des', pont: 'des', refl: 'des', reli: 'sab', sobr: 'sab', vont: 'sab',
        alfa: 'int', alqu: 'int', arme: 'int', arte: 'int', cozi: 'int', enge: 'int'
    };
    Object.entries(PERICIA_TEMPLATE).forEach(([key, atributo]) => {
        sys.pericias[key] = { atributo, treinado: false, st: false, pda: false, size: false, value: 0, outros: 0, condi: 0, bonus: [], custom: false, label: '' };
    });
    let oficioCount = 0;
    (d.skills || defaultSkills).forEach(s => {
        if (s.n === 'Ofício') {
            const key = craftSpecialtyToFoundryKey(s.specialty);
            oficioCount++;
            sys.pericias[key].treinado = !!s.trained;
            sys.pericias[key].outros = parseInt(s.other) || 0;
            sys.pericias[key].label = s.specialty || '';
            return;
        }
        const fkey = FOUNDRY_SKILL_MAP[s.n];
        if (!fkey || !sys.pericias[fkey]) return;
        sys.pericias[fkey].treinado = !!s.trained;
        sys.pericias[fkey].outros = parseInt(s.other) || 0;
    });

    // Items: ataques, poderes (raça/origem + classe), equipamentos, magias
    // Schema real extraído de um export oficial do sistema (não mais "melhor esforço").
    const items = [];
    const descHtml = txt => ({ value: (txt || '').split('\n').map(l => `<p>${l}</p>`).join(''), unidentified: '' });
    const emptyActivation = () => ({ execucao: '', custo: 0, qtd: '', condicao: '', special: '' });
    const emptyDuration = () => ({ value: 0, units: '', special: '' });
    const emptyTarget = () => ({ value: null, width: null, type: '' });
    const emptyRange = () => ({ value: null, units: '' });
    const emptyConsume = () => ({ type: '', target: '', amount: null, mpMultiplier: false });
    const emptyUpgrades = () => ({ melhoria1: '', melhoria2: '', melhoria3: '', melhoria4: '', material: '', encanto1: '', encanto2: '', encanto3: '' });

    // Escolas de magia: só estes 8 códigos são aceitos pelo sistema — qualquer outro valor
    // (ex.: o nome por extenso "Evocação") quebra a importação inteira no Foundry.
    function mapEscola(text) {
        const t = (text || '').toLowerCase();
        if (/abju/.test(t)) return 'abj';
        if (/adivin/.test(t)) return 'adi';
        if (/convoca/.test(t)) return 'con';
        if (/encant/.test(t)) return 'enc';
        if (/evoca/.test(t)) return 'evo';
        if (/ilus/.test(t)) return 'ilu';
        if (/necro/.test(t)) return 'nec';
        if (/transmut/.test(t)) return 'tra';
        return 'abj'; // fallback seguro (sempre um valor válido)
    }
    // "alcance" também é um campo de escolha restrita — só usamos valores confirmados.
    function mapAlcance(text) {
        const t = (text || '').toLowerCase();
        if (/toque/.test(t)) return 'touch';
        if (/curto/.test(t)) return 'short';
        if (/pessoal/.test(t)) return 'none';
        return ''; // valor vazio é aceito; evita quebrar em "médio"/"longo" não confirmados
    }
    function mapResistAttr(text) {
        const t = (text || '').toLowerCase();
        if (/fort/.test(t)) return 'con';
        if (/reflex/.test(t)) return 'des';
        if (/vontade/.test(t)) return 'sab';
        return '';
    }
    function mapTipoMagia(spellsConfigAttr) {
        // Sem informação de arcana/divina na ficha local — "uni" (universal) é o valor mais seguro.
        return 'uni';
    }

    (d.attacks || []).forEach(atk => {
        const mult = parseInt(critToR20Mult(atk.crit)) || 2;
        const isRanged = /curto|médio|medio|longo/i.test(atk.range || '');
        const totalAtkBonus = (parseInt(atk.bonus) || 0) + (parseInt(atk.mod) || 0);
        items.push({
            name: atk.name || 'Ataque', type: 'arma', img: 'icons/skills/melee/weapons-crossed-swords-yellow.webp',
            system: {
                description: descHtml(atk.desc), source: '',
                equipado: true, equipado2: { slot: 0, type: 'hand' }, carregado: true,
                peso: 0, espacos: 1, qtd: 1, preco: 0,
                pv: { value: 0, min: 0, max: 0 }, rd: 0,
                rolls: [
                    { name: 'Ataque', key: 'ataque0', type: 'ataque', parts: [['1d20', '', ''], [atk.skill?.toLowerCase() === 'pontaria' ? 'pont' : 'luta', '', ''], [String(totalAtkBonus), '', '']], versatil: '' },
                    { name: 'Dano', key: 'dano1', type: 'dano', parts: [[atk.dmg || '', atk.type || '', ''], ['@for', '', '']], versatil: '' }
                ],
                criticoM: parseInt(atk.critRange) || 20, criticoX: mult,
                alcance: isRanged ? 'short' : 'none', tipoUso: 'sim',
                propriedades: { ada: false, agi: false, alo: false, dup: false, ver: false, adaptavel: false, agil: false, alongada: false, arremesso: false, ataqueDistancia: isRanged, duasMaos: false, dupla: false, leve: false, municao: false, versatil: false, des: false, hib: false },
                encantos: {}, ativacao: { custo: null, condicao: '', execucao: '', qtd: '', special: '' },
                chatFlavor: '', consume: emptyConsume(), origin: '', tags: [], chatGif: '',
                upgrades: emptyUpgrades(), melhorias: {}, ataques: 0,
                proficiencia: 'marcial', proposito: isRanged ? 'distância' : 'corpo-a-corpo',
                empunhadura: 'uma', size: 'normal', rolltags: [], enableAutoUpgrades: false
            }
        });
    });

    function mkPoder(a, tipo, subtipo) {
        return {
            name: a.name || 'Poder', type: 'poder', img: 'icons/svg/upgrade.svg',
            system: {
                description: descHtml(a.desc), source: '',
                ativacao: emptyActivation(), duracao: emptyDuration(), target: emptyTarget(), range: emptyRange(),
                consume: emptyConsume(), efeito: '', alcance: '', alvo: '', area: '',
                resistencia: { pericia: '', atributo: '', bonus: 0, txt: '' },
                rolls: [], tipo, subtipo,
                chatFlavor: '', origin: '', tags: [], chatGif: '', rolltags: []
            }
        };
    }
    (d.raceAbilities || []).forEach(a => items.push(mkPoder(a, 'racial', d.charRace || '')));
    (d.classAbilities || []).forEach(a => items.push(mkPoder(a, 'classe', d.charClass || '')));

    function mkEquipamento(name, desc, qtd, espacos, equipado, tipo, armorBonus, penalty, slotType, img) {
        items.push({
            name: name || 'Item', type: 'equipamento', img: img || 'icons/containers/bags/pack-leather-brown.webp',
            system: {
                description: descHtml(desc), source: '',
                equipado: !!equipado, equipado2: { slot: 0, type: slotType || 'body' }, carregado: true,
                peso: 0, espacos: parseFloat(espacos) || 1, qtd: parseInt(qtd) || 1, preco: 0,
                pv: { value: 0, min: 0, max: 0 }, rd: 0,
                tipo: tipo || 'traje',
                armadura: { value: parseInt(armorBonus) || 0, penalidade: parseInt(penalty) || 0, maxAtr: 0 },
                rolls: [], origin: '', tags: [], chatFlavor: '', chatGif: '',
                ativacao: emptyActivation(), upgrades: emptyUpgrades(), melhorias: {}, encantos: {},
                rolltags: [], enableAutoUpgrades: false
            }
        });
    }
    (d.inventory || []).forEach(item => mkEquipamento(item.name, item.note, item.qtd, item.slots, item.equipped, 'ferramenta', 0, 0, 'hand'));
    if (d.defense?.armor?.name) {
        mkEquipamento(d.defense.armor.name, d.defense.armor.desc, 1, 2, true, 'leve', d.defense.armor.bonus, d.defense.armor.penalty, 'body', 'icons/equipment/chest/breastplate-banded-steel-grey.webp');
    }
    if (d.defense?.shield?.name) {
        mkEquipamento(d.defense.shield.name, d.defense.shield.desc, 1, 1, true, 'escudo', d.defense.shield.bonus, d.defense.shield.penalty, 'hand', 'icons/equipment/shield/round-wooden-boss-steel.webp');
    }

    (d.spells?.list || []).forEach(sp => {
        items.push({
            name: sp.name || 'Magia', type: 'magia', img: 'icons/magic/symbols/rune-sigil-black-pink.webp',
            system: {
                description: descHtml(sp.desc), source: '',
                ativacao: { execucao: 'action', custo: parseInt(sp.pm) || 1, qtd: '', condicao: '', special: '' },
                duracao: { value: 0, units: '', special: sp.dur || '' },
                target: emptyTarget(), range: emptyRange(), consume: emptyConsume(),
                efeito: '', alcance: mapAlcance(sp.range), alvo: sp.target || '', area: '',
                resistencia: { pericia: '', atributo: mapResistAttr(sp.res), bonus: 0, txt: sp.res || '' },
                rolls: [], tipo: mapTipoMagia(), circulo: String(sp.circle || 1),
                preparada: false, escola: mapEscola(sp.school),
                chatFlavor: '', origin: '', tags: [], chatGif: '', rolltags: [],
                equipado2: { slot: 0, type: '' }
            }
        });
    });

    const foundryActor = {
        name: d.charName || 'Personagem',
        type: 'character',
        img: 'icons/svg/mystery-man.svg',
        system: sys,
        prototypeToken: {
            name: d.charName || 'Personagem', displayName: 0, actorLink: true, width: 1, height: 1,
            texture: { src: 'icons/svg/mystery-man.svg', anchorX: 0.5, anchorY: 0.5, offsetX: 0, offsetY: 0, fit: 'contain', scaleX: 1, scaleY: 1, rotation: 0, tint: '#ffffff', alphaThreshold: 0.75 },
            lockRotation: false, rotation: 0, alpha: 1, disposition: 1, displayBars: 0,
            bar1: { attribute: 'attributes.pv' }, bar2: { attribute: 'attributes.pm' },
            sight: { enabled: true, range: 0, angle: 360, visionMode: 'basic', color: null, attenuation: 0.1, brightness: 0, saturation: 0, contrast: 0 },
            detectionModes: [], flags: {}, randomImg: false, appendNumber: false, prependAdjective: false
        },
        items,
        effects: [],
        flags: {},
        ownership: { default: 0 }
    };

    const charName = d.charName || 'personagem';
    const blob = new Blob([JSON.stringify(foundryActor, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `foundry_${charName.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ============================================================
//  SISTEMA DE ALTERNÂNCIA DE TEMA (CLARO / ESCURO)
// ============================================================
function applyFichaTheme(theme) {
    const body = document.body;
    body.classList.remove('theme-blood', 'theme-dark', 'theme-classic');
    if (theme === 'blood') body.classList.add('theme-blood');
    else if (theme === 'dark') body.classList.add('theme-dark');
    else if (theme === 'classic') body.classList.add('theme-classic');
    
    document.querySelectorAll('.theme-btn').forEach(function (btn) {
        btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
    });
    localStorage.setItem('t20_theme', theme);
}

function initTheme() {
    var saved = localStorage.getItem('t20_theme');
    if (!saved) {
        var oldFicha = localStorage.getItem('t20FichaTheme');
        var oldHub = localStorage.getItem('hubTheme');
        var refTheme = oldFicha || oldHub;
        if (refTheme === 'dark') saved = 'dark';
        else if (refTheme === 'classic' || refTheme === 'light') saved = 'classic';
        else saved = 'blood';
    }
    applyFichaTheme(saved);
    
    // Vincula ouvintes de evento aos botões do seletor
    document.querySelectorAll('.theme-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            applyFichaTheme(btn.getAttribute('data-theme'));
        });
    });
}

// Inicializa o tema quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
});

// ============================================================
// BUSCADOR DE PODERES
// ============================================================
let targetListIdForPower = '';

function abrirBuscadorPoderes(targetListId) {
    targetListIdForPower = targetListId;
    document.getElementById('modalBuscadorPoderes').style.display = 'flex';
    document.getElementById('inputBuscaPoder').value = '';
    filtrarPoderes();
}

function fecharBuscadorPoderes() {
    document.getElementById('modalBuscadorPoderes').style.display = 'none';
}

function filtrarPoderes() {
    const termo = document.getElementById('inputBuscaPoder').value.toLowerCase();
    const lista = document.getElementById('listaPoderesBusca');

    if (typeof powersData === 'undefined') {
        lista.innerHTML = '<div class="text-center p-3">Banco de dados de poderes não carregado.</div>';
        return;
    }

    let poderesFiltrados = powersData;
    if (termo) {
        poderesFiltrados = powersData.filter(p => 
            p.name.toLowerCase().includes(termo) || 
            (p.desc && p.desc.toLowerCase().includes(termo)) ||
            (p.class && p.class.toLowerCase().includes(termo))
        );
    }
    
    // Limita resultados para evitar travamento se a busca for muito genérica
    const limitedResults = poderesFiltrados.slice(0, 50);

    if (limitedResults.length === 0) {
        lista.innerHTML = '<div class="text-center p-3 text-muted">Nenhum poder encontrado.</div>';
        return;
    }

    lista.innerHTML = limitedResults.map(p => {
        // Encontra o index original para usar na função de seleção
        const originalIndex = powersData.indexOf(p);
        const tipoLabel = p.type === 'class' ? 'Classe' : (p.type || 'Poder');
        const classeCapitalizada = p.class ? (p.class.charAt(0).toUpperCase() + p.class.slice(1)) : '';
        const subtipoLabel = p.subType === 'ability' ? 'Habilidade' : 'Poder';
        
        return `
        <div class="d-flex justify-content-between align-items-center p-2 border-bottom hover-bg-light" style="cursor:pointer;" onclick="selecionarPoderNoBuscador(${originalIndex})">
            <div>
                <div class="fw-bold text-danger">${p.name}</div>
                <small class="text-muted">${classeCapitalizada} | ${tipoLabel} | ${subtipoLabel}</small>
            </div>
            <i class="bi bi-plus-circle-fill text-danger"></i>
        </div>
        `;
    }).join('');
}

function selecionarPoderNoBuscador(index) {
    const p = powersData[index];
    if (p) {
        let cleanDesc = p.desc;
        // Limpar eventuais tags HTML como <br> e <strong> se houver, ou manter para o textarea
        // O addAbility apenas joga o texto no textarea. O ideal é remover tags HTML caso tenham vindo do banco.
        if (cleanDesc) {
            cleanDesc = cleanDesc.replace(/<br\s*[\/]?>/gi, '\n');
            cleanDesc = cleanDesc.replace(/<[^>]+>/g, '');
        }
        addAbility(targetListIdForPower, p.name, cleanDesc);
        fecharBuscadorPoderes();
    }
}

// ══════════════════════════════════════════════════════════════════════════════
// ██  BUSCA DE EQUIPAMENTOS INLINE  ██
// ══════════════════════════════════════════════════════════════════════════════

let _allSearchItems = null;   // Cache da lista unificada
let _currentItemCategory = 'all';

// Monta a lista unificada de todos os itens dos 4 bancos de dados
function _buildSearchItemList() {
    if (_allSearchItems) return _allSearchItems;
    const items = [];

    // Armas
    if (typeof armasData !== 'undefined' && armasData.arma) {
        armasData.arma.forEach(a => {
            items.push({
                ...a,
                _source: 'arma',
                _badge: a.tipo || 'Arma',
                _badgeClass: 'badge-arma',
                _meta: [a.dano, a.critico, a.tipo_dano, a.empunhadura].filter(Boolean).join(' · ')
            });
        });
    }

    // Armaduras e Escudos
    if (typeof armadurasData !== 'undefined' && armadurasData.armadura) {
        armadurasData.armadura.forEach(a => {
            const isShield = (a.categoria || '').toLowerCase().includes('escudo') ||
                             (a.tipo || '').toLowerCase().includes('escudo');
            items.push({
                ...a,
                _source: 'armadura',
                _badge: a.tipo || (isShield ? 'Escudo' : 'Armadura'),
                _badgeClass: isShield ? 'badge-escudo' : 'badge-armadura',
                _meta: [`Defesa ${a.bonus_defesa || ''}`, `Pen. ${a.penalidade_armadura || '0'}`].join(' · ')
            });
        });
    }

    // Itens Gerais
    if (typeof itensData !== 'undefined' && itensData.item) {
        itensData.item.forEach(a => {
            items.push({
                ...a,
                _source: 'item',
                _badge: a.tipo || 'Item Geral',
                _badgeClass: 'badge-item',
                _meta: [a.tipo, a.preco].filter(Boolean).join(' · ')
            });
        });
    }

    // Itens Mágicos
    if (typeof itensMagicosData !== 'undefined' && itensMagicosData.item) {
        itensMagicosData.item.forEach(a => {
            items.push({
                ...a,
                _source: 'magico',
                _badge: a.tipo || 'Item Mágico',
                _badgeClass: 'badge-magico',
                _meta: [a.tipo, a.preco].filter(Boolean).join(' · ')
            });
        });
    }

    _allSearchItems = items;
    return items;
}

// Abre o modal de busca
function openItemSearch() {
    const modal = document.getElementById('modalBuscaItens');
    if (!modal) return;
    _buildSearchItemList();
    _currentItemCategory = 'all';

    // Reset filtros
    const input = document.getElementById('itemSearchInput');
    if (input) input.value = '';
    document.querySelectorAll('.item-filter-btn').forEach(b => b.classList.remove('active'));
    const allBtn = document.querySelector('.item-filter-btn[data-cat="all"]');
    if (allBtn) allBtn.classList.add('active');

    modal.style.display = 'flex';
    filterItemResults();
    setTimeout(() => input?.focus(), 100);
}

// Fecha o modal de busca
function closeItemSearch() {
    const modal = document.getElementById('modalBuscaItens');
    if (modal) modal.style.display = 'none';
}

// Troca a categoria do filtro
function setItemCategory(cat, btn) {
    _currentItemCategory = cat;
    document.querySelectorAll('.item-filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    filterItemResults();
}

// Filtra e renderiza os resultados
function filterItemResults() {
    const items = _buildSearchItemList();
    const query = (document.getElementById('itemSearchInput')?.value || '').toLowerCase().trim();
    const cat = _currentItemCategory;

    // Normaliza acentos para busca
    const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const queryNorm = normalize(query);

    let filtered = items;

    // Filtra por categoria
    if (cat !== 'all') {
        filtered = filtered.filter(i => i._source === cat);
    }

    // Filtra por texto
    if (queryNorm.length > 0) {
        filtered = filtered.filter(i => {
            const nameNorm = normalize(i.nome || '');
            const tipoNorm = normalize(i.tipo || '');
            return nameNorm.includes(queryNorm) || tipoNorm.includes(queryNorm);
        });
    }

    // Limita para performance
    const MAX_RESULTS = 80;
    const total = filtered.length;
    const shown = filtered.slice(0, MAX_RESULTS);

    // Contador
    const countEl = document.getElementById('itemSearchCount');
    if (countEl) {
        if (query.length === 0 && cat === 'all') {
            countEl.textContent = `${total} itens disponíveis — digite para filtrar`;
        } else {
            countEl.textContent = total > MAX_RESULTS
                ? `Exibindo ${MAX_RESULTS} de ${total} resultados`
                : `${total} resultado(s)`;
        }
    }

    // Renderiza
    const container = document.getElementById('itemSearchResults');
    if (!container) return;

    if (shown.length === 0) {
        container.innerHTML = '<div class="text-center text-muted py-4" style="font-size:0.85rem;"><i class="bi bi-search me-1"></i>Nenhum item encontrado</div>';
        return;
    }

    container.innerHTML = shown.map((item, idx) => {
        // Destaca o texto buscado no nome
        let displayName = _escapeHtml(item.nome || '');
        if (queryNorm.length > 1) {
            const nameNorm = normalize(item.nome || '');
            const matchIdx = nameNorm.indexOf(queryNorm);
            if (matchIdx !== -1) {
                const orig = item.nome || '';
                displayName = _escapeHtml(orig.slice(0, matchIdx))
                    + '<mark>' + _escapeHtml(orig.slice(matchIdx, matchIdx + query.length)) + '</mark>'
                    + _escapeHtml(orig.slice(matchIdx + query.length));
            }
        }

        return `
        <div class="item-result-row" onclick="addSearchedItem(${idx})" data-search-idx="${idx}">
            <div class="item-result-info">
                <div class="item-result-name">${displayName}</div>
                <div class="item-result-meta">${_escapeHtml(item._meta || '')} ${item.preco ? '· ' + _escapeHtml(item.preco) : ''}</div>
            </div>
            <span class="item-result-badge ${item._badgeClass}">${_escapeHtml(item._badge)}</span>
            <span class="item-result-add"><i class="bi bi-plus-circle-fill"></i></span>
        </div>`;
    }).join('');

    // Salva referência para uso no addSearchedItem
    container._filteredItems = shown;
}

function _escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

// Adiciona item selecionado ao inventário com combatData/defenseData
function addSearchedItem(filteredIdx) {
    const container = document.getElementById('itemSearchResults');
    if (!container || !container._filteredItems) return;
    const item = container._filteredItems[filteredIdx];
    if (!item) return;

    // Monta anotação
    const noteLines = [];
    if (item.descricao) noteLines.push(item.descricao);
    if (item.dano) noteLines.push(`⚔️ Dano: ${item.dano} | Crítico: ${item.critico} | Tipo: ${item.tipo_dano || '—'} | Alcance: ${item.alcance || '—'}`);
    if (item.bonus_defesa) noteLines.push(`🛡️ Defesa: ${item.bonus_defesa} | Penalidade: ${item.penalidade_armadura || '0'}`);

    const transferItem = {
        name: item.nome,
        qtd: '1',
        slots: String(item.espacos || 0),
        note: noteLines.join('\n'),

        // Dados de combate (armas)
        combatData: item.dano ? {
            nome: item.nome,
            dano: item.dano,
            critico: item.critico,
            tipo_dano: item.tipo_dano || '',
            alcance: item.alcance || ''
        } : null,

        // Dados de defesa (armaduras e escudos)
        defenseData: item.bonus_defesa ? {
            nome: item.nome,
            bonus: item.bonus_defesa,
            penalidade: item.penalidade_armadura || '0',
            tipo: item.tipo || ''
        } : null
    };

    // Usa a mesma função que já existe para adicionar ao inventário
    addInventoryItem(transferItem);
    saveData();

    // Feedback visual na linha clicada
    const row = container.querySelector(`.item-result-row[data-search-idx="${filteredIdx}"]`);
    if (row) {
        const icon = row.querySelector('.item-result-add');
        if (icon) {
            icon.innerHTML = '<i class="bi bi-check-circle-fill"></i>';
            icon.classList.add('item-result-added');
            setTimeout(() => {
                icon.innerHTML = '<i class="bi bi-plus-circle-fill"></i>';
                icon.classList.remove('item-result-added');
            }, 2000);
        }
    }

    showSheetToast(`📦 <strong>${_escapeHtml(item.nome)}</strong> adicionado ao inventário!`);
}

// Atalho de teclado: Escape fecha o modal
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('modalBuscaItens');
        if (modal && modal.style.display === 'flex') {
            closeItemSearch();
            e.stopPropagation();
        }
    }
});
