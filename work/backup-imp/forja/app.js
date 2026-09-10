const CLASSES_T20 = {
    "Arcanista": { pvInicial: 8, pvNivel: 2, pmInicial: 6, pmNivel: 6, atrPm: ["INT", "CAR"], atrPmOptions: [], periciasFixas: ["Misticismo", "Vontade"], periciasEscolha: 2, periciasClasse: ["Misticismo", "Vontade", "Conhecimento", "Investigação", "Percepção", "Intuição", "Atuação", "Iniciativa", "Reflexos", "Fortitude"],         caminhos: [{ label: "Mago", value: "mago", pm: "INT" }, { label: "Bruxo", value: "bruxo", pm: "INT" }, { label: "Feiticeiro", value: "feiticeiro", pm: "CAR" }, { label: "Necromante", value: "necromante", pm: "INT" }] },
    "Bárbaro": { pvInicial: 24, pvNivel: 6, pmInicial: 3, pmNivel: 3, atrPm: [], periciasFixas: ["Fortitude", "Luta"], periciasEscolha: 4, periciasClasse: ["Fortitude", "Luta", "Atletismo", "Intimidação", "Percepção", "Sobrevivência", "Furtividade", "Iniciativa", "Reflexos", "Vontade"], caminhos: [{ label: "Bárbaro (base)", value: "" }, { label: "Machado de Pedra", value: "machadodepedra" }] },
    "Bardo": { pvInicial: 12, pvNivel: 3, pmInicial: 6, pmNivel: 6, atrPm: ["CAR"], periciasFixas: ["Atuação", "Reflexos"], periciasEscolha: 6, periciasClasse: ["Atuação", "Reflexos", "Diplomacia", "Enganação", "Intimidação", "Intuição", "Conhecimento", "Percepção", "Misticismo", "Vontade", "Cura", "Iniciativa", "Jogatina"], caminhos: [{ label: "Bardo (base)", value: "" }, { label: "Magimarcialista", value: "magimarcialista" }] },
    "Bucaneiro": { pvInicial: 16, pvNivel: 4, pmInicial: 3, pmNivel: 3, atrPm: [], periciasFixas: ["Reflexos", "Luta"], periciasEscolha: 4, periciasClasse: ["Reflexos", "Luta", "Acrobacia", "Atletismo", "Enganação", "Furtividade", "Iniciativa", "Percepção", "Pontaria", "Jogatina", "Intuição", "Pilotagem", "Vontade"], caminhos: [{ label: "Bucaneiro (base)", value: "" }, { label: "Duelista", value: "duelista" }] },
    "Caçador": { pvInicial: 16, pvNivel: 4, pmInicial: 4, pmNivel: 4, atrPm: [], periciasFixas: ["Sobrevivência", "Pontaria"], periciasEscolha: 6, periciasClasse: ["Sobrevivência", "Pontaria", "Adestramento", "Atletismo", "Furtividade", "Percepção", "Luta", "Fortitude", "Reflexos", "Vontade", "Cura", "Iniciativa", "Intuição"], caminhos: [{ label: "Caçador (base)", value: "" }, { label: "Seteiro", value: "seteiro" }] },
    "Cavaleiro": { pvInicial: 20, pvNivel: 5, pmInicial: 3, pmNivel: 3, atrPm: [], periciasFixas: ["Fortitude", "Luta"], periciasEscolha: 2, periciasClasse: ["Fortitude", "Luta", "Cavalgar", "Diplomacia", "Intimidação", "Percepção", "Atletismo", "Iniciativa", "Reflexos", "Vontade", "Cura", "Nobreza"], caminhos: [{ label: "Cavaleiro (base)", value: "" }, { label: "Vassalo", value: "vassalo" }] },
    "Clérigo": { pvInicial: 16, pvNivel: 4, pmInicial: 5, pmNivel: 5, atrPm: ["SAB"], periciasFixas: ["Religião", "Vontade"], periciasEscolha: 2, periciasClasse: ["Religião", "Vontade", "Cura", "Diplomacia", "Intuição", "Percepção", "Fortitude", "Reflexos", "Misticismo", "Investigação", "Conhecimento", "Nobreza"], caminhos: [{ label: "Clérigo (base)", value: "" }, { label: "Usurpador", value: "usurpador", pm: "CAR" }] },
    "Druida": { pvInicial: 16, pvNivel: 4, pmInicial: 5, pmNivel: 5, atrPm: ["SAB"], periciasFixas: ["Sobrevivência", "Vontade"], periciasEscolha: 4, periciasClasse: ["Sobrevivência", "Vontade", "Adestramento", "Cura", "Furtividade", "Percepção", "Atletismo", "Fortitude", "Reflexos", "Misticismo", "Intuição", "Luta", "Pontaria"], caminhos: [{ label: "Druida (base)", value: "druida-base" }, { label: "Ermitão", value: "ermitao" }] },
    "Guerreiro": { pvInicial: 20, pvNivel: 5, pmInicial: 3, pmNivel: 3, atrPm: [], periciasFixas: ["Fortitude", "Luta"], periciasEscolha: 4, periciasClasse: ["Fortitude", "Luta", "Pontaria", "Atletismo", "Cavalgar", "Intimidação", "Percepção", "Reflexos", "Vontade", "Sobrevivência", "Iniciativa", "Adestramento"], caminhos: [{ label: "Guerreiro (base)", value: "" }, { label: "Inovador", value: "inovador" }] },
    "Inventor": { pvInicial: 12, pvNivel: 3, pmInicial: 4, pmNivel: 4, atrPm: [], periciasFixas: ["Ofício", "Vontade"], periciasEscolha: 4, periciasClasse: ["Ofício", "Vontade", "Conhecimento", "Investigação", "Percepção", "Cura", "Iniciativa", "Reflexos", "Fortitude", "Luta", "Pontaria", "Atletismo"], caminhos: [{ label: "Inventor (base)", value: "" }, { label: "Alquimista", value: "alquimista" }] },
    "Ladino": { pvInicial: 12, pvNivel: 3, pmInicial: 4, pmNivel: 4, atrPm: [], periciasFixas: ["Ladinagem", "Reflexos"], periciasEscolha: 8, periciasClasse: ["Ladinagem", "Reflexos", "Acrobacia", "Atletismo", "Enganação", "Furtividade", "Percepção", "Intuição", "Investigação", "Iniciativa", "Jogatina", "Pontaria", "Conhecimento"], caminhos: [{ label: "Ladino (base)", value: "" }, { label: "Ventanista", value: "ventanista" }] },
    "Lutador": { pvInicial: 20, pvNivel: 5, pmInicial: 3, pmNivel: 3, atrPm: [], periciasFixas: ["Fortitude", "Luta"], periciasEscolha: 4, periciasClasse: ["Fortitude", "Luta", "Atletismo", "Intimidação", "Percepção", "Reflexos", "Vontade", "Sobrevivência", "Iniciativa", "Pontaria", "Cavalgar", "Acrobacia"], caminhos: [{ label: "Lutador (base)", value: "" }, { label: "Atleta", value: "atleta" }] },
    "Nobre": { pvInicial: 16, pvNivel: 4, pmInicial: 4, pmNivel: 4, atrPm: [], periciasFixas: ["Nobreza", "Diplomacia"], periciasEscolha: 4, periciasClasse: ["Nobreza", "Diplomacia", "Enganação", "Intimidação", "Intuição", "Conhecimento", "Percepção", "Jogatina", "Vontade", "Investigação", "Cura", "Cavalgar", "Atuação"], caminhos: [{ label: "Nobre (base)", value: "" }, { label: "Burguês", value: "burgues" }] },
    "Paladino": { pvInicial: 20, pvNivel: 5, pmInicial: 3, pmNivel: 3, atrPm: ["CAR"], periciasFixas: ["Luta", "Vontade"], periciasEscolha: 2, periciasClasse: ["Luta", "Vontade", "Cavalgar", "Diplomacia", "Intimidação", "Nobreza", "Percepção", "Cura", "Fortitude", "Reflexos", "Atletismo", "Iniciativa"], caminhos: [{ label: "Paladino (base)", value: "" }, { label: "Santo", value: "santo" }] },
    "Frade": { pvInicial: 12, pvNivel: 3, pmInicial: 6, pmNivel: 6, atrPm: ["SAB"], periciasFixas: ["Religião", "Vontade"], periciasEscolha: 4, periciasClasse: ["Religião", "Vontade", "Cura", "Diplomacia", "Intuição", "Percepção", "Conhecimento", "Misticismo", "Investigação", "Nobreza", "Atuação", "Fortitude", "Reflexos"] },
    "Treinador": { pvInicial: 12, pvNivel: 3, pmInicial: 4, pmNivel: 4, atrPm: [], periciasFixas: ["Adestramento", "Vontade"], periciasEscolha: 4, periciasClasse: ["Atletismo", "Cavalgar", "Diplomacia", "Guerra", "Iniciativa", "Intimidação", "Intuição", "Luta", "Ofício", "Percepção", "Pontaria", "Reflexos", "Religião", "Sobrevivência"] }
};

const TABELA_XP_T20 = [0, 1000, 3000, 6000, 10000, 15000, 21000, 28000, 36000, 45000, 55000, 66000, 78000, 91000, 105000, 120000, 136000, 153000, 171000, 190000];

const PERICIAS = [
    { nome: "Acrobacia", atr: "DES", armadura: true },
    { nome: "Adestramento", atr: "CAR", treinado: true },
    { nome: "Atletismo", atr: "FOR" },
    { nome: "Atuação", atr: "CAR", treinado: true },
    { nome: "Cavalgar", atr: "DES" },
    { nome: "Conhecimento", atr: "INT", treinado: true },
    { nome: "Cura", atr: "SAB" },
    { nome: "Diplomacia", atr: "CAR" },
    { nome: "Enganação", atr: "CAR" },
    { nome: "Fortitude", atr: "CON" },
    { nome: "Furtividade", atr: "DES", armadura: true },
    { nome: "Guerra", atr: "INT", treinado: true },
    { nome: "Iniciativa", atr: "DES" },
    { nome: "Intimidação", atr: "CAR" },
    { nome: "Intuição", atr: "SAB" },
    { nome: "Investigação", atr: "INT" },
    { nome: "Jogatina", atr: "CAR" },
    { nome: "Ladinagem", atr: "DES", armadura: true, treinado: true },
    { nome: "Luta", atr: "FOR" },
    { nome: "Misticismo", atr: "INT", treinado: true },
    { nome: "Nobreza", atr: "INT", treinado: true },
    { nome: "Ofício", atr: "INT", treinado: true, oficio: true },
    { nome: "Percepção", atr: "SAB" },
    { nome: "Pilotagem", atr: "DES", treinado: true },
    { nome: "Pontaria", atr: "DES" },
    { nome: "Reflexos", atr: "DES" },
    { nome: "Religião", atr: "SAB", treinado: true },
    { nome: "Sobrevivência", atr: "SAB" },
    { nome: "Vontade", atr: "SAB" }
];

let statePericias = JSON.parse(JSON.stringify(PERICIAS));

document.addEventListener("DOMContentLoaded", () => {
    inicializarTema();
    const syncSalvo = localStorage.getItem('forja_syncAuto');
    if (syncSalvo !== null) {
        document.getElementById("autoCalcSwitch").checked = syncSalvo === 'true';
    }
    inicializarEventos();
    montarListaPericias();
    atualizarTudo();

    if (document.getElementById("autoCalcSwitch").checked && localStorage.getItem('t20SheetData')) {
        carregarDaFicha(true);
    }

        if (typeof powersData !== 'undefined' && powersData.length) {
        autoSelecionarPoderesClasse();
        renderizarPoderes();
    }

    const profTa = document.getElementById("proficiencias");
    const linhasIniciais = profTa.value.split('\n').filter(l => !l.startsWith('⚡ ')).join('\n').trim();
    profTa.dataset.baseTexto = linhasIniciais;
    profTa.value = linhasIniciais;

    if (selectedPowers.length) atualizarProficienciasPoderes();

});

function inicializarEventos() {
    document.getElementById("btnAddClasse").addEventListener("click", () => {
        adicionarLinhaClasse("", 1);
        atualizarTudo();
        autoSelecionarPoderesClasse();
    });

    document.getElementById("autoCalcSwitch").addEventListener("change", () => {
        localStorage.setItem('forja_syncAuto', document.getElementById("autoCalcSwitch").checked);
    });
    document.getElementById("xpTotal").addEventListener("input", recalcularNivelPorXp);

    ['atrFor', 'atrDes', 'atrCon', 'atrInt', 'atrSab', 'atrCar'].forEach(id => {
        document.getElementById(id).addEventListener("input", atualizarTudo);
    });

    ['defArmadura', 'defEscudo', 'defOutros', 'defUsaDes', 'defAttrSelect'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("input", atualizarTudo);
    });

    document.getElementById("btnAutoTreinarClasse").addEventListener("click", autoTreinarClasse);
    document.getElementById("btnLimparTreinos").addEventListener("click", () => {
        document.querySelectorAll(".pericia-check").forEach(c => c.checked = false);
        atualizarTudo();
    });

    document.getElementById("btnCarregarFicha").addEventListener("click", () => carregarDaFicha(false));
    document.getElementById("btnEnviarFicha").addEventListener("click", enviarParaFicha);
    document.getElementById("btnExportarJson").addEventListener("click", exportarJson);
    document.getElementById("btnImportarJson").addEventListener("click", importarJson);
    document.getElementById("btnResetar").addEventListener("click", resetarTudo);
    document.getElementById("btnLimparTudo").addEventListener("click", limparTudo);
    document.getElementById("cargaAttr").addEventListener("change", atualizarTudo);
    document.getElementById("btnAddBonusPv").addEventListener("click", () => adicionarLinhaBonus("pvBonusList"));
    document.getElementById("btnAddBonusPm").addEventListener("click", () => adicionarLinhaBonus("pmBonusList"));
    document.getElementById("btnIgualarPv").addEventListener("click", () => {
        document.getElementById("pvAtual").value = document.getElementById("pvMaxCalc").textContent;
    });
    document.getElementById("btnIgualarPm").addEventListener("click", () => {
        document.getElementById("pmAtual").value = document.getElementById("pmMaxCalc").textContent;
    });

    document.getElementById("poderesBusca").addEventListener("input", renderizarPoderes);
    document.getElementById("poderesFiltroTipo").addEventListener("change", renderizarPoderes);

    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => aplicarTema(btn.dataset.theme));
    });
}

function alterarAttr(id, delta) {
    const input = document.getElementById(id);
    if (!input) return;
    const val = (parseInt(input.value) || 0) + delta;
    input.value = val;
    atualizarTudo();
}

function getAttrMod(attrName) {
    const mapa = { FOR: 'atrFor', DES: 'atrDes', CON: 'atrCon', INT: 'atrInt', SAB: 'atrSab', CAR: 'atrCar' };
    const input = document.getElementById(mapa[attrName]);
    return input ? (parseInt(input.value) || 0) : 0;
}

function adicionarLinhaClasse(nome = "Guerreiro", nivel = 1) {
    const container = document.getElementById("classesList");
    const isFirst = container.children.length === 0;

    const row = document.createElement("div");
    row.className = "classe-row";
    row.innerHTML = `
        <span class="badge ${isFirst ? 'bg-warning text-dark' : 'bg-secondary'} me-1 tag-classe-primeira">
            ${isFirst ? 'Classe Inicial' : 'Multiclasse'}
        </span>
        <select class="form-select form-select-sm t20-input classe-nome" style="max-width:200px;">
            ${Object.keys(CLASSES_T20).map(c => `<option value="${c}" ${c === nome ? 'selected' : ''}>${c}</option>`).join('')}
        </select>
        <select class="form-select form-select-sm t20-input classe-pm-atr" style="max-width:140px;display:none;">
        </select>
        <select class="form-select form-select-sm t20-input classe-caminho" style="max-width:180px;display:none;">
        </select>
        <select class="form-select form-select-sm t20-input classe-linhagem" style="max-width:180px;display:none;">
        </select>
        <div class="d-flex align-items-center gap-1">
            <span class="small text-muted">Nível:</span>
            <input type="number" class="form-control form-control-sm t20-input classe-nivel text-center" style="width:70px;" min="1" max="20" value="${nivel}">
        </div>
        <button type="button" class="btn-remove-classe ms-auto" title="Remover classe">
            <i class="bi bi-x-circle-fill"></i>
        </button>
    `;

    row.querySelector(".classe-nome").addEventListener("change", () => {
        row.querySelector(".classe-caminho").dataset.valor = '';
        atualizarPmAtrSelector(row);
        atualizarCaminhoSelector(row);
        atualizarLinhagemSelector(row);
        atualizarTudo();
        limparPoderesClasse();
        autoSelecionarPoderesClasse();
    });
    row.querySelector(".classe-nivel").addEventListener("input", () => {
        atualizarTudo();
        autoSelecionarPoderesClasse();
    });
    row.querySelector(".classe-pm-atr").addEventListener("change", atualizarTudo);
    row.querySelector(".classe-caminho").addEventListener("change", function () {
        this.dataset.valor = this.value;
        atualizarLinhagemSelector(row);
        atualizarTudo();
        limparPoderesClasse();
        autoSelecionarPoderesClasse();
    });
    row.querySelector(".classe-linhagem").addEventListener("change", function () {
        this.dataset.valor = this.value;
    });
    atualizarPmAtrSelector(row);
    atualizarCaminhoSelector(row);
    atualizarLinhagemSelector(row);
    row.querySelector(".btn-remove-classe").addEventListener("click", () => {
        if (container.children.length > 1) {
            row.remove();
            reordenarTagsClasses();
            atualizarTudo();
            autoSelecionarPoderesClasse();
        } else {
            mostrarToast("Você precisa ter pelo menos 1 classe!");
        }
    });

    container.appendChild(row);
    reordenarTagsClasses();
}

function reordenarTagsClasses() {
    const rows = document.querySelectorAll("#classesList .classe-row");
    rows.forEach((r, idx) => {
        const tag = r.querySelector(".tag-classe-primeira");
        if (idx === 0) {
            tag.className = "badge bg-warning text-dark me-1 tag-classe-primeira";
            tag.textContent = "Classe Inicial";
        } else {
            tag.className = "badge bg-secondary me-1 tag-classe-primeira";
            tag.textContent = `Multiclasse ${idx + 1}`;
        }
    });
}

function atualizarPmAtrSelector(row) {
    const classeNome = row.querySelector(".classe-nome").value;
    const info = CLASSES_T20[classeNome];
    const pmSelect = row.querySelector(".classe-pm-atr");
    if (info && info.atrPmOptions && info.atrPmOptions.length > 0) {
        const currentVal = pmSelect.value || info.atrPmOptions[0].value;
        pmSelect.style.display = "";
        pmSelect.innerHTML = info.atrPmOptions.map(o =>
            `<option value="${o.value}" ${o.value === currentVal ? 'selected' : ''}>${o.label} (${o.value})</option>`
        ).join('');
    } else {
        pmSelect.style.display = "none";
        pmSelect.innerHTML = "";
    }
}

const LINHAGENS = {
    'Arcanista': {
        'Feiticeiro': [
            { label: 'Dracônica', value: 'dracônica' },
            { label: 'Feérica', value: 'feérica' },
            { label: 'Rubra', value: 'rubra' },
            { label: 'Abençoada', value: 'abençoada' }
        ]
    }
};

function atualizarLinhagemSelector(row) {
    const classe = row.querySelector(".classe-nome").value;
    const caminho = row.querySelector(".classe-caminho");
    const opt = caminho.options[caminho.selectedIndex];
    const nomeOpt = opt ? opt.textContent : '';
    const sel = row.querySelector(".classe-linhagem");
    const linhagens = LINHAGENS[classe] && LINHAGENS[classe][nomeOpt];
    if (linhagens) {
        const currentVal = sel.dataset.valor || '';
        sel.style.display = "";
        sel.innerHTML = linhagens.map(o =>
            `<option value="${o.value}" ${o.value === currentVal ? 'selected' : ''}>${o.label}</option>`
        ).join('');
        sel.value = currentVal || linhagens[0].value;
        sel.dataset.valor = sel.value;
    } else {
        sel.style.display = "none";
        sel.innerHTML = "";
        sel.dataset.valor = '';
    }
}

function atualizarCaminhoSelector(row) {
    const classeNome = row.querySelector(".classe-nome").value;
    const info = CLASSES_T20[classeNome];
    const sel = row.querySelector(".classe-caminho");
    if (info && info.caminhos && info.caminhos.length > 1) {
        const currentVal = sel.dataset.valor || '';
        sel.style.display = "";
        sel.innerHTML = info.caminhos.map(o =>
            `<option value="${o.value}" ${o.value === currentVal ? 'selected' : ''}${o.pm ? ` data-pm="${o.pm}"` : ''}>${o.label}</option>`
        ).join('');
        sel.value = currentVal || info.caminhos[0].value;
        sel.dataset.valor = sel.value;
        if (info.caminhos[0].pm) atualizarTudo();
    } else {
        sel.style.display = "none";
        sel.innerHTML = "";
        sel.dataset.valor = '';
    }
}

function adicionarLinhaBonus(containerId, nome = "", valor = 0) {
    const container = document.getElementById(containerId);
    const row = document.createElement("div");
    row.className = "bonus-row d-flex align-items-center gap-1 mb-1";
    row.innerHTML = `
        <input type="text" class="form-control form-control-sm t20-input bonus-nome" style="flex:1;min-width:80px;" placeholder="Nome do poder" value="${nome}">
        <span class="text-muted small">+</span>
        <input type="number" class="form-control form-control-sm t20-input bonus-valor text-center" style="width:70px;" value="${valor}">
        <button type="button" class="btn btn-sm btn-outline-danger py-0" onclick="this.closest('.bonus-row').remove(); atualizarTudo();"><i class="bi bi-x"></i></button>
    `;
    row.querySelector(".bonus-nome").addEventListener("input", atualizarTudo);
    row.querySelector(".bonus-valor").addEventListener("input", atualizarTudo);
    container.appendChild(row);
    atualizarTudo();
}

function calcularBonusTotal(containerId) {
    let total = 0;
    document.querySelectorAll(`#${containerId} .bonus-valor`).forEach(el => {
        total += parseInt(el.value) || 0;
    });
    return total;
}

function obterClassesConfigured() {
    const rows = document.querySelectorAll("#classesList .classe-row");
    const lista = [];
    rows.forEach(r => {
        const nome = r.querySelector(".classe-nome").value;
        const nivel = parseInt(r.querySelector(".classe-nivel").value) || 1;
        const selCaminho = r.querySelector(".classe-caminho");
        const optCaminho = selCaminho && selCaminho.options[selCaminho.selectedIndex];
        const pmCaminho = optCaminho ? optCaminho.getAttribute('data-pm') : null;
        const pmSelect = r.querySelector(".classe-pm-atr");
        const pmAtr = pmCaminho || ((pmSelect && pmSelect.style.display !== "none") ? pmSelect.value : null);
        lista.push({ nome, nivel, pmAtr });
    });
    return lista;
}

function atualizarTudo() {
    const classes = obterClassesConfigured();
    if (classes.length === 0) return;

    const nivelTotal = classes.reduce((sum, c) => sum + c.nivel, 0);
    document.getElementById("nivelTotal").textContent = nivelTotal;

    const meioNivel = Math.floor(nivelTotal / 2);
    document.getElementById("meioNivelDisplay").textContent = meioNivel > 0 ? `+${meioNivel}` : `+0`;
    document.getElementById("periciasMeioNivelTag").textContent = `+${meioNivel}`;

    let bonusTreino = 2;
    if (nivelTotal >= 15) bonusTreino = 6;
    else if (nivelTotal >= 7) bonusTreino = 4;

    document.getElementById("bonustreinoDisplay").textContent = `+${bonusTreino}`;
    document.getElementById("periciasTreinoTag").textContent = `+${bonusTreino}`;

    calcularPvPm(classes, nivelTotal);
    calcularDefesa(meioNivel);
    recalcularPericias(meioNivel, bonusTreino);

    const cargaAttr = document.getElementById("cargaAttr").value;
    const modCarga = getAttrMod(cargaAttr);
    const limCarga = modCarga >= 0 ? 10 + 2 * modCarga : 10 + modCarga;
    document.getElementById("limiteCarga").value = limCarga;
    document.getElementById("limiteCargaDisplay").textContent = limCarga;

    atualizarProgressoXp(nivelTotal);
    renderRoadmapEvolucao(classes, nivelTotal);
}

function calcularPvPm(classes, nivelTotal) {
    const modCon = getAttrMod("CON");
    const primeiraClasseObj = CLASSES_T20[classes[0].nome] || CLASSES_T20["Guerreiro"];

    let pvMax = primeiraClasseObj.pvInicial + modCon;

    classes.forEach((c, idx) => {
        const info = CLASSES_T20[c.nome] || CLASSES_T20["Guerreiro"];
        const qtdNiveisAdicionais = idx === 0 ? (c.nivel - 1) : c.nivel;
        if (qtdNiveisAdicionais > 0) {
            pvMax += qtdNiveisAdicionais * (info.pvNivel + modCon);
        }
    });

    const bPvExtra = calcularBonusTotal("pvBonusList");
    pvMax += bPvExtra;

    document.getElementById("pvMaxCalc").textContent = Math.max(1, pvMax);
    document.getElementById("pvBreakdownText").innerHTML = `
        <i class="bi bi-info-circle"></i> 1ª Classe (${classes[0].nome}): <b>${primeiraClasseObj.pvInicial} + ${modCon} (CON)</b> | Níveis adicionais: <b>+${pvMax - primeiraClasseObj.pvInicial - modCon - bPvExtra}</b>
    `;

    let modAtrPm = 0;
    if (primeiraClasseObj.atrPm && primeiraClasseObj.atrPm.length > 0) {
        if (classes[0].pmAtr) {
            modAtrPm = getAttrMod(classes[0].pmAtr);
        } else {
            const mods = primeiraClasseObj.atrPm.map(a => getAttrMod(a));
            modAtrPm = Math.max(...mods);
        }
    }

    let pmMax = primeiraClasseObj.pmInicial + modAtrPm;

    classes.forEach((c, idx) => {
        const info = CLASSES_T20[c.nome] || CLASSES_T20["Guerreiro"];
        const qtdNiveisAdicionais = idx === 0 ? (c.nivel - 1) : c.nivel;
        if (qtdNiveisAdicionais > 0) {
            pmMax += qtdNiveisAdicionais * info.pmNivel;
        }
    });

    const bPmExtra = calcularBonusTotal("pmBonusList");
    pmMax += bPmExtra;

    document.getElementById("pmMaxCalc").textContent = Math.max(0, pmMax);
    document.getElementById("pmBreakdownText").innerHTML = `
        <i class="bi bi-info-circle"></i> 1ª Classe (${classes[0].nome}): <b>${primeiraClasseObj.pmInicial} + ${modAtrPm} (Atr Chave)</b> | Níveis adicionais: <b>+${pmMax - primeiraClasseObj.pmInicial - modAtrPm - bPmExtra}</b>
    `;
}

function calcularDefesa(meioNivel) {
    const usaDes = document.getElementById("defUsaDes").checked;
    const selAttr = document.getElementById("defAttrSelect").value;
    let modAttr = 0;

    if (usaDes && selAttr !== "NENHUM") {
        modAttr = getAttrMod(selAttr);
    }

    const armadura = parseInt(document.getElementById("defArmadura").value) || 0;
    const escudo = parseInt(document.getElementById("defEscudo").value) || 0;
    const outros = parseInt(document.getElementById("defOutros").value) || 0;

    const totalDef = 10 + modAttr + armadura + escudo + outros;
    document.getElementById("defTotal").value = totalDef;
    document.getElementById("defAttrDisplay").textContent = selAttr;
}

function montarListaPericias() {
    const container = document.getElementById("listaPericias");
    container.innerHTML = "";

    PERICIAS.forEach((p, idx) => {
        container.appendChild(criarLinhaPericiaElement(p, idx));
    });
}

function criarLinhaPericiaElement(p, idx) {
    const row = document.createElement("div");
    row.className = "pericia-linha row align-items-center g-2";
    row.dataset.index = idx;

    const nomeHtml = p.oficio
        ? `Ofício (<input type="text" class="oficio-especialidade t20-input d-inline-block px-1" placeholder="especialidade" style="width:110px; font-size:0.78rem;" value="${p.specialty || ''}">)`
        : p.nome;

    row.innerHTML = `
        <div class="col-1 text-center">
            <input type="checkbox" class="form-check-input pericia-check" onchange="atualizarTudo()">
        </div>
        <div class="col-4 pericia-nome">
            ${nomeHtml}
            <span class="badge bg-info ms-1 pericia-classe-badge" style="display:none; font-size:0.6rem; vertical-align:middle;">Classe</span>
            ${p.armadura ? '<i class="bi bi-shield-fill text-danger ms-1" title="Penalidade de Armadura"></i>' : ''}
            ${p.treinado ? '<i class="bi bi-star-fill text-warning ms-1" title="Somente Treinado"></i>' : ''}
        </div>
        <div class="col-2 text-center pericia-obs">${p.atr}</div>
        <div class="col-2 text-center">
            <input type="number" class="form-control form-control-sm text-center pericia-outros t20-input" value="${p.other || 0}" oninput="atualizarTudo()">
        </div>
        <div class="col-3 text-center">
            <span class="fw-bold fs-6 text-warning pericia-total-display">+0</span>
            <span class="d-block pericia-formula-tip">½Nvl + Atr + Tr</span>
        </div>
    `;
    return row;
}

function recalcularPericias(meioNivel, bonusTreino) {
    const rows = document.querySelectorAll("#listaPericias .pericia-linha");
    if (!rows.length) return;

    let contTreinadas = 0;
    let contTreinadasNaoFixas = 0;

    const classes = obterClassesConfigured();
    const primClasse = classes.length > 0 ? CLASSES_T20[classes[0].nome] : null;
    const classePericias = primClasse ? (primClasse.periciasClasse || []) : [];
    const fixas = primClasse ? (primClasse.periciasFixas || []) : [];

    rows.forEach((row, i) => {
        const p = PERICIAS[i];
        const isCheckEl = row.querySelector(".pericia-check");
        const outrosEl = row.querySelector(".pericia-outros");
        if (!isCheckEl || !p) return;

        const isChecked = isCheckEl.checked;
        const outros = parseInt(outrosEl?.value) || 0;
        const modAttr = getAttrMod(p.atr);

        if (isChecked) contTreinadas++;
        if (isChecked && !fixas.includes(p.nome)) contTreinadasNaoFixas++;

        const valorTreino = isChecked ? bonusTreino : 0;
        const total = meioNivel + modAttr + valorTreino + outros;

        const display = row.querySelector(".pericia-total-display");
        if (display) {
            display.textContent = total >= 0 ? `+${total}` : total;
            display.className = `fw-bold fs-6 ${isChecked ? 'text-warning' : 'text-light'}`;
        }

        const badge = row.querySelector(".pericia-classe-badge");
        if (badge) {
            badge.style.display = classePericias.includes(p.nome) ? "" : "none";
        }

        row.classList.toggle("pericia-classe-destacada", classePericias.includes(p.nome));
    });

    const elCountTrein = document.getElementById("countPericiasTreinadas");
    if (elCountTrein) elCountTrein.textContent = contTreinadas;

    const pontos = calcularPontosPericia(primClasse);

    const elGastos = document.getElementById("periciasPontosGastos");
    const elTotal = document.getElementById("periciasPontosTotal");
    const elDisp = document.getElementById("countPericiasDisponiveis");
    if (elGastos) elGastos.textContent = contTreinadasNaoFixas;
    if (elTotal) elTotal.textContent = pontos.total;
    if (elDisp) elDisp.textContent = pontos.total;

    const detalhe = document.getElementById("periciasPontosDetalhe");
    const displayBanner = document.querySelector("#periciasPontosDisplay");
    if (primClasse && detalhe && displayBanner) {
        detalhe.textContent = `${primClasse.periciasEscolha} (classe) + ${Math.max(0, getAttrMod("INT"))} (INT) = ${pontos.total}`;
        if (contTreinadasNaoFixas > pontos.total) {
            displayBanner.className = "alert alert-danger p-2 mb-3 rounded-2 d-flex align-items-center justify-content-between flex-wrap gap-1 small";
        } else {
            displayBanner.className = "alert alert-secondary p-2 mb-3 rounded-2 d-flex align-items-center justify-content-between flex-wrap gap-1 small";
        }
    }
}

function calcularPontosPericia(primClasse) {
    if (!primClasse) return { total: 0, classe: 0, int: 0 };
    const bonusInt = Math.max(0, getAttrMod("INT"));
    const classe = primClasse.periciasEscolha || 0;
    return { total: classe + bonusInt, classe, int: bonusInt };
}

function autoTreinarClasse() {
    const classes = obterClassesConfigured();
    if (classes.length === 0) return;

    const primClasse = CLASSES_T20[classes[0].nome];
    if (!primClasse) return;

    const fixas = primClasse.periciasFixas || [];
    document.querySelectorAll("#listaPericias .pericia-linha").forEach((row, i) => {
        const p = PERICIAS[i];
        if (fixas.includes(p.nome)) {
            row.querySelector(".pericia-check").checked = true;
        }
    });

    atualizarTudo();
    mostrarToast(`Perícias base da classe ${classes[0].nome} aplicadas com sucesso!`);
}

function adicionarLinhaAtaque(atk = {}) {
    const tbody = document.getElementById("tabelaAtaques");
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td><input type="text" class="form-control form-control-sm t20-input text-start inp-nome" value="${atk.name || ''}" placeholder="Ex: Espada Longa"></td>
        <td><input type="text" class="form-control form-control-sm t20-input text-center inp-bonus" value="${atk.bonus || '+0'}"></td>
        <td><input type="text" class="form-control form-control-sm t20-input text-center inp-dano" value="${atk.dmg || '1d8'}"></td>
        <td><input type="text" class="form-control form-control-sm t20-input text-center inp-critico" value="${atk.crit || '19/x2'}"></td>
        <td><input type="text" class="form-control form-control-sm t20-input text-center inp-tipo" value="${atk.type || 'Corte'}"></td>
        <td><input type="text" class="form-control form-control-sm t20-input text-center inp-alcance" value="${atk.range || 'Curto'}"></td>
        <td><button type="button" class="btn btn-sm btn-outline-danger" onclick="this.closest('tr').remove()"><i class="bi bi-trash"></i></button></td>
    `;
    tbody.appendChild(tr);
}

function adicionarLinhaEquipamento(item = {}) {
    const tbody = document.getElementById("tabelaEquipamento");
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td><input type="text" class="form-control form-control-sm t20-input text-start inp-nome" value="${item.name || ''}" placeholder="Ex: Mochila, Brunide"></td>
        <td><input type="number" class="form-control form-control-sm t20-input text-center inp-qtd" value="${item.qtd || 1}" oninput="calcularCargaUsada()"></td>
        <td><input type="number" class="form-control form-control-sm t20-input text-center inp-slots" value="${item.slots || 1}" oninput="calcularCargaUsada()"></td>
        <td><button type="button" class="btn btn-sm btn-outline-danger" onclick="this.closest('tr').remove(); calcularCargaUsada();"><i class="bi bi-trash"></i></button></td>
    `;
    tbody.appendChild(tr);
    calcularCargaUsada();
}

function calcularCargaUsada() {
    let total = 0;
    document.querySelectorAll("#tabelaEquipamento tr").forEach(tr => {
        const qtd = parseInt(tr.querySelector(".inp-qtd")?.value) || 0;
        const slots = parseInt(tr.querySelector(".inp-slots")?.value) || 0;
        total += (qtd * slots);
    });
    document.getElementById("cargaUsada").value = total;
}

function recalcularNivelPorXp() {
    const xp = parseInt(document.getElementById("xpTotal").value) || 0;
    let nivelCalc = 1;
    for (let i = 1; i < TABELA_XP_T20.length; i++) {
        if (xp >= TABELA_XP_T20[i]) {
            nivelCalc = i + 1;
        } else {
            break;
        }
    }

    const rows = document.querySelectorAll("#classesList .classe-row");
    if (rows.length === 1) {
        rows[0].querySelector(".classe-nivel").value = nivelCalc;
    }
    atualizarTudo();
}

function atualizarProgressoXp(nivelTotal) {
    const xp = parseInt(document.getElementById("xpTotal").value) || 0;
    const xpAtualNivel = TABELA_XP_T20[nivelTotal - 1] || 0;
    const xpProximoNivel = TABELA_XP_T20[nivelTotal] || TABELA_XP_T20[19];

    const nec = xpProximoNivel - xpAtualNivel;
    const prog = xp - xpAtualNivel;
    const pct = Math.min(100, Math.max(0, Math.round((prog / nec) * 100)));

    document.getElementById("xpProgressText").textContent = `${xp.toLocaleString('pt-BR')} / ${xpProximoNivel.toLocaleString('pt-BR')} XP (Nível ${Math.min(20, nivelTotal + 1)})`;
    document.getElementById("xpProgressFill").style.width = `${pct}%`;
}

function renderRoadmapEvolucao(classes, nivelTotal) {
    const accordion = document.getElementById("roadmapAccordion");
    accordion.innerHTML = "";

    const primClasse = classes[0] ? classes[0].nome : "Guerreiro";

    for (let i = 1; i <= Math.min(20, nivelTotal); i++) {
        const meioNivelLvl = Math.floor(i / 2);
        let treinoLvl = "+2 (Treinado)";
        if (i >= 15) treinoLvl = "+6 (Mestre)";
        else if (i >= 7) treinoLvl = "+4 (Veterano)";

        const isMilestone = (i === 1 || i === 7 || i === 15 || i === 20);

        const item = document.createElement("div");
        item.className = "accordion-item bg-surface border-secondary-subtle mb-2 rounded overflow-hidden";
        item.innerHTML = `
            <h2 class="accordion-header" id="headingLvl${i}">
                <button class="accordion-button ${i === nivelTotal ? '' : 'collapsed'} bg-card-solid text-light py-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseLvl${i}">
                    <span class="badge ${isMilestone ? 'bg-danger' : 'bg-secondary'} me-2">Nível ${i}</span>
                    <strong>${i === 1 ? `Classe Inicial (${primClasse})` : `Evolução de Nível ${i}`}</strong>
                    <span class="ms-auto small text-warning me-2">½ Nível: +${meioNivelLvl} | Bônus Treino: ${treinoLvl}</span>
                </button>
            </h2>
            <div id="collapseLvl${i}" class="accordion-collapse collapse ${i === nivelTotal ? 'show' : ''}" data-bs-parent="#roadmapAccordion">
                <div class="accordion-body small text-muted">
                    ${i === 1 ? `
                        <p class="mb-1 text-light"><strong>Ganhos Iniciais:</strong> PV Inicial da classe + CON, PM Inicial + Atributo-Chave, Perícias Treinadas da Classe e Proficiências.</p>
                    ` : `
                        <p class="mb-1 text-light"><strong>Ganhos do Nível:</strong> +PV da classe + CON, +PM da classe, +1 Poder Geral ou Poder de Classe.</p>
                    `}
                    ${i === 7 ? '<div class="alert alert-warning py-1 px-2 mb-0 mt-1">⭐ <b>Marco de Evolução:</b> Suas perícias treinadas sobem para o grau <b>Veterano (+4)</b>!</div>' : ''}
                    ${i === 15 ? '<div class="alert alert-danger py-1 px-2 mb-0 mt-1">🔥 <b>Marco de Evolução:</b> Suas perícias treinadas sobem para o grau <b>Mestre (+6)</b>!</div>' : ''}
                </div>
            </div>
        `;
        accordion.appendChild(item);
    }
}

function carregarDaFicha(silencioso = false) {
    const raw = localStorage.getItem("t20SheetData");
    if (!raw) {
        if (!silencioso) mostrarToast("Nenhuma ficha salva encontrada no navegador!", "danger");
        return;
    }

    try {
        const data = JSON.parse(raw);
        if (data.charName) document.getElementById("nomePersonagem").value = data.charName;
        if (data.playerName) document.getElementById("nomeJogador").value = data.playerName;
        if (data.charRace) document.getElementById("raca").value = data.charRace;
        if (data.charOrigin) document.getElementById("origem").value = data.charOrigin;
        if (data.charDeity) document.getElementById("divindade").value = data.charDeity;

        if (data.extras) {
            if (data.extras.xp !== undefined) document.getElementById("xpTotal").value = data.extras.xp;
            if (data.extras.size !== undefined && data.extras.size !== '') {
                const mapaTamanho = { '5': 'Minúsculo', '2': 'Pequeno', '0': 'Médio', '-2': 'Grande', '-5': 'Enorme', '-10': 'Colossal' };
                const tamanhoFicha = mapaTamanho[String(data.extras.size)] || data.extras.size;
                document.getElementById("tamanho").value = tamanhoFicha;
            }
            if (data.extras.speed) document.getElementById("deslocamento").value = data.extras.speed;
            if (data.extras.cash) document.getElementById("tibares").value = data.extras.cash;
            if (data.extras.cashTO) document.getElementById("tibaresTO").value = data.extras.cashTO;
            if (data.extras.profs) {
                const base = data.extras.profs.split('\n').filter(l => !l.startsWith('⚡ ')).join('\n').trim();
                document.getElementById("proficiencias").value = base;
                document.getElementById("proficiencias").dataset.baseTexto = base;
            }
        }

        if (data.charLevel && (!data.extras || data.extras.xp === undefined)) {
            const xpBase = TABELA_XP_T20[data.charLevel - 1] || 0;
            document.getElementById("xpTotal").value = xpBase;
        }

        if (data.attrs) {
            if (data.attrs.FOR !== undefined) document.getElementById("atrFor").value = data.attrs.FOR;
            if (data.attrs.DES !== undefined) document.getElementById("atrDes").value = data.attrs.DES;
            if (data.attrs.CON !== undefined) document.getElementById("atrCon").value = data.attrs.CON;
            if (data.attrs.INT !== undefined) document.getElementById("atrInt").value = data.attrs.INT;
            if (data.attrs.SAB !== undefined) document.getElementById("atrSab").value = data.attrs.SAB;
            if (data.attrs.CAR !== undefined) document.getElementById("atrCar").value = data.attrs.CAR;
        }

        if (data.status) {
            if (data.status.pvC !== undefined) document.getElementById("pvAtual").value = data.status.pvC;
            if (data.status.pmC !== undefined) document.getElementById("pmAtual").value = data.status.pmC;
        }

        if (data.defense) {
            if (data.defense.armor && data.defense.armor.bonus) document.getElementById("defArmadura").value = data.defense.armor.bonus;
            if (data.defense.shield && data.defense.shield.bonus) document.getElementById("defEscudo").value = data.defense.shield.bonus;
            if (data.defense.config && data.defense.config.attr) document.getElementById("defAttrSelect").value = data.defense.config.attr;
        }

        if (data.skills && Array.isArray(data.skills)) {
            document.querySelectorAll("#listaPericias .pericia-linha").forEach((row, i) => {
                const pName = PERICIAS[i].nome;
                const match = data.skills.find(s => s.n === pName);
                if (match) {
                    row.querySelector(".pericia-check").checked = !!match.trained;
                    row.querySelector(".pericia-outros").value = match.other || 0;
                }
            });
        }

        if (data.attacks && Array.isArray(data.attacks) && data.attacks.length > 0) {
            document.getElementById("tabelaAtaques").innerHTML = "";
            data.attacks.forEach(atk => adicionarLinhaAtaque(atk));
        }

        if (data.inventory && Array.isArray(data.inventory) && data.inventory.length > 0) {
            document.getElementById("tabelaEquipamento").innerHTML = "";
            data.inventory.forEach(item => adicionarLinhaEquipamento(item));
        }

        recalcularNivelPorXp();
        if (!silencioso) mostrarToast("Dados sincronizados com a Ficha T20!", "success");

    } catch (e) {
        console.error(e);
        if (!silencioso) mostrarToast("Erro ao carregar dados da Ficha!", "danger");
    }
}

function enviarParaFicha() {
    if (!confirm("Isso irá SOBREPOR todos os dados atualmente salvos na Ficha T20. Deseja continuar?")) return;
    const classes = obterClassesConfigured();
    const nivelTotal = classes.reduce((sum, c) => sum + c.nivel, 0);
    const strClasse = classes.map(c => `${c.nome} ${c.nivel}`).join(" / ");

    let raw = localStorage.getItem("t20SheetData");
    let data = raw ? JSON.parse(raw) : {};

    data.charName = document.getElementById("nomePersonagem").value;
    data.playerName = document.getElementById("nomeJogador").value;
    data.charRace = document.getElementById("raca").value;
    data.charOrigin = document.getElementById("origem").value;
    data.charDeity = document.getElementById("divindade").value;
    data.charClass = strClasse;
    data.charLevel = nivelTotal;

    data.attrs = {
        FOR: getAttrMod("FOR"),
        DES: getAttrMod("DES"),
        CON: getAttrMod("CON"),
        INT: getAttrMod("INT"),
        SAB: getAttrMod("SAB"),
        CAR: getAttrMod("CAR")
    };

    const pvMax = parseInt(document.getElementById("pvMaxCalc").textContent) || 0;
    const pmMax = parseInt(document.getElementById("pmMaxCalc").textContent) || 0;
    const pvCurrent = parseInt(document.getElementById("pvAtual").value) || pvMax;
    const pmCurrent = parseInt(document.getElementById("pmAtual").value) || pmMax;

    data.status = {
        pvM: pvMax,
        pvC: pvCurrent,
        pmM: pmMax,
        pmC: pmCurrent
    };

    data.extras = data.extras || {};
    data.extras.xp = parseInt(document.getElementById("xpTotal").value) || 0;
    data.extras.size = document.getElementById("tamanho").value;
    data.extras.speed = document.getElementById("deslocamento").value;
    data.extras.cash = parseInt(document.getElementById("tibares").value) || 0;
    data.extras.cashTO = parseInt(document.getElementById("tibaresTO").value) || 0;
    data.extras.profs = document.getElementById("proficiencias").dataset.baseTexto || "";

    data.defense = data.defense || { config: {}, armor: {}, shield: {}, other: [] };
    data.defense.config = {
        attr: document.getElementById("defAttrSelect").value,
        apply: document.getElementById("defUsaDes").checked
    };
    data.defense.armor.bonus = parseInt(document.getElementById("defArmadura").value) || 0;
    data.defense.shield.bonus = parseInt(document.getElementById("defEscudo").value) || 0;

    data.skills = [];
    document.querySelectorAll("#listaPericias .pericia-linha").forEach((row, i) => {
        const p = PERICIAS[i];
        data.skills.push({
            n: p.nome,
            a: p.atr,
            trained: row.querySelector(".pericia-check").checked,
            other: parseInt(row.querySelector(".pericia-outros").value) || 0,
            specialty: row.querySelector(".oficio-especialidade")?.value || ''
        });
    });

    data.attacks = [];
    document.querySelectorAll("#tabelaAtaques tr").forEach(tr => {
        const name = tr.querySelector(".inp-nome")?.value;
        if (name) {
            data.attacks.push({
                name: name,
                bonus: tr.querySelector(".inp-bonus")?.value || '+0',
                dmg: tr.querySelector(".inp-dano")?.value || '1d8',
                crit: tr.querySelector(".inp-critico")?.value || '19/x2',
                type: tr.querySelector(".inp-tipo")?.value || 'Corte',
                range: tr.querySelector(".inp-alcance")?.value || 'Curto'
            });
        }
    });

    data.inventory = [];
    document.querySelectorAll("#tabelaEquipamento tr").forEach(tr => {
        const name = tr.querySelector(".inp-nome")?.value;
        if (name) {
            data.inventory.push({
                name: name,
                qtd: parseInt(tr.querySelector(".inp-qtd")?.value) || 1,
                slots: parseInt(tr.querySelector(".inp-slots")?.value) || 1
            });
        }
    });

    localStorage.setItem("t20SheetData", JSON.stringify(data));
    mostrarToast("Ficha atualizada com os dados da Forja! Clique em 'Abrir Ficha' para visualizar.", "success");
}

function exportarJson() {
    const raw = localStorage.getItem("t20SheetData");
    if (!raw) {
        mostrarToast("Não há dados salvos para exportar!", "warning");
        return;
    }
    const blob = new Blob([raw], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `personagem-t20-forja.json`;
    a.click();
    URL.revokeObjectURL(url);
    mostrarToast("JSON exportado com sucesso!");
}

function importarJson() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = evt => {
            try {
                localStorage.setItem("t20SheetData", evt.target.result);
                carregarDaFicha(false);
                mostrarToast("JSON importado e aplicado com sucesso!", "success");
            } catch (err) {
                mostrarToast("Arquivo JSON inválido!", "danger");
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function limparTudo() {
    if (!confirm("Tem certeza? Isso vai limpar TODOS os dados da Forja e da Ficha salva no navegador!")) return;

    document.getElementById("nomePersonagem").value = "";
    document.getElementById("nomeJogador").value = "";
    document.getElementById("raca").value = "";
    document.getElementById("origem").value = "";
    document.getElementById("divindade").value = "";
    document.getElementById("xpTotal").value = 0;

    ['atrFor', 'atrDes', 'atrCon', 'atrInt', 'atrSab', 'atrCar'].forEach(id => document.getElementById(id).value = 0);

    document.getElementById("pvAtual").value = 0;
    document.getElementById("pmAtual").value = 0;
    document.getElementById("pvBonusList").innerHTML = "";
    document.getElementById("pmBonusList").innerHTML = "";

    document.getElementById("defArmadura").value = 0;
    document.getElementById("defEscudo").value = 0;
    document.getElementById("defOutros").value = 0;
    document.getElementById("defAttrSelect").value = "DES";
    document.getElementById("defUsaDes").checked = true;

    document.getElementById("cargaAttr").value = "FOR";
    document.getElementById("tamanho").value = "Médio";
    document.getElementById("deslocamento").value = "9m";
    document.getElementById("tibares").value = 0;
    document.getElementById("tibaresTO").value = 0;
    document.getElementById("proficiencias").value = "";
    document.getElementById("proficiencias").dataset.baseTexto = "";

    document.getElementById("classesList").innerHTML = "";
    adicionarLinhaClasse("Guerreiro", 1);

    montarListaPericias();
    document.getElementById("tabelaAtaques").innerHTML = "";
    document.getElementById("tabelaEquipamento").innerHTML = "";

    localStorage.removeItem("t20SheetData");

    atualizarTudo();
    mostrarToast("Todos os dados foram limpos!");
}

function resetarTudo() {
    if (!confirm("Tem certeza que deseja resetar os dados da Forja? (dados da Ficha no navegador serão preservados)")) return;

    document.getElementById("nomePersonagem").value = "";
    document.getElementById("nomeJogador").value = "";
    document.getElementById("raca").value = "";
    document.getElementById("origem").value = "";
    document.getElementById("divindade").value = "";
    document.getElementById("xpTotal").value = 0;

    ['atrFor', 'atrDes', 'atrCon', 'atrInt', 'atrSab', 'atrCar'].forEach(id => document.getElementById(id).value = 0);

    document.getElementById("classesList").innerHTML = "";
    adicionarLinhaClasse("Guerreiro", 1);

    montarListaPericias();
    atualizarTudo();
    mostrarToast("Dados resetados.");
}

function inicializarTema() {
    const saved = localStorage.getItem('forja_theme') || 'escuro';
    aplicarTema(saved);
}

function aplicarTema(tema) {
    document.body.classList.remove('theme-escuro', 'theme-padrao', 'theme-vermelho');
    document.body.classList.add(`theme-${tema}`);
    document.querySelectorAll('.theme-btn').forEach(btn => {
        const isActive = btn.dataset.theme === tema;
        btn.classList.toggle('active', isActive);
    });
    localStorage.setItem('forja_theme', tema);
}

function mostrarToast(msg, tipo = "info") {
    const toastEl = document.getElementById("toastNotification");
    const msgEl = document.getElementById("toastMessage");
    msgEl.textContent = msg;

    toastEl.className = `toast align-items-center text-white bg-${tipo === 'success' ? 'success' : (tipo === 'danger' ? 'danger' : 'dark')} border-0 shadow`;
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

// ─── PODERES ─────────────────────────────────────────────────────────────────

let selectedPowers = JSON.parse(localStorage.getItem('forja_poderes_selecionados') || '[]');

function togglePoder(power) {
    const idx = selectedPowers.findIndex(p => p.name === power.name);
    if (idx >= 0) {
        selectedPowers.splice(idx, 1);
    } else {
        selectedPowers.push({ name: power.name, type: power.type, class: power.class || '' });
    }
    localStorage.setItem('forja_poderes_selecionados', JSON.stringify(selectedPowers));
    atualizarProficienciasPoderes();
    renderizarPoderes();
}

function limparPoderesClasse() {
    selectedPowers = selectedPowers.filter(p => p.type !== 'class');
    localStorage.setItem('forja_poderes_selecionados', JSON.stringify(selectedPowers));
    atualizarProficienciasPoderes();
    renderizarPoderes();
}

const VARIANTS = new Set([
    'necromante', 'machadodepedra', 'magimarcialista', 'duelista',
    'seteiro', 'vassalo', 'usurpador', 'inovador', 'alquimista',
    'ventanista', 'atleta', 'burgues', 'santo', 'ermitao'
]);

// Extrai os níveis de um requisito de nível, ex:
//   "Nível 1"                          -> [1]
//   "Nível 20"                         -> [20]
//   "Nível 14 e 15"                    -> [14, 15]
//   "Níveis 5, 9, 13 e 17"             -> [5, 9, 13, 17]
//   "Nível 1 (Substitui Audácia)"      -> [1]
//   "Nível 2 (Substitui Evasão)"       -> [2]
// Retorna null para reqs que não começam com nível (ex: "5º nível de arcanista",
// "Arcanista", "Bruxo, treinado em...") — são pré-requisitos de poderes avulsos.
function extrairNiveisRequisito(reqStr) {
    if (!reqStr) return null;
    const m = reqStr.trim().match(/^N[íi](?:vel|veis)\s+([\d,\s]*e?\s*\d+)/i);
    if (!m) return null;
    const nums = m[1].match(/\d+/g);
    if (!nums || !nums.length) return null;
    return nums.map(n => parseInt(n, 10));
}

const MAPA_CLASSE_DB = {
    'Arcanista': 'arcanista', 'Barbaro': 'barbaro', 'Bárbaro': 'barbaro',
    'Bardo': 'bardo', 'Bucaneiro': 'bucaneiro', 'Cacador': 'cacador', 'Caçador': 'cacador',
    'Cavaleiro': 'cavaleiro', 'Clerigo': 'clerigo', 'Clérigo': 'clerigo',
    'Druida': 'druida', 'Guerreiro': 'guerreiro', 'Inventor': 'inventor',
    'Ladino': 'ladino', 'Lutador': 'lutador', 'Nobre': 'nobre',
    'Paladino': 'paladino', 'Frade': 'frade', 'Treinador': 'treinador'
};

// Sincroniza as habilidades de classe (subType "ability") ganhas automaticamente por
// nível. É seguro chamar a qualquer momento (troca de classe, de caminho, mudança do
// campo de nível, adição/remoção de classe): ela só mexe nas entradas que ELA MESMA
// adicionou antes (marcadas com `auto: true`), nunca em poderes escolhidos manualmente.
function autoSelecionarPoderesClasse() {
    const db = typeof powersData !== 'undefined' ? powersData : [];
    if (!db.length) return;

    const antesAuto = new Set(selectedPowers.filter(p => p.auto).map(p => p.name));
    selectedPowers = selectedPowers.filter(p => !p.auto);

    document.querySelectorAll("#classesList .classe-row").forEach(row => {
        const classeNome = row.querySelector(".classe-nome").value;
        const clsDatabase = MAPA_CLASSE_DB[classeNome] || classeNome.toLowerCase();
        const caminhoVal = row.querySelector(".classe-caminho").dataset.valor || '';
        const nivelClasse = parseInt(row.querySelector(".classe-nivel").value) || 1;

        db.filter(p =>
            p.type === 'class' &&
            p.class === clsDatabase &&
            p.subType === 'ability' &&
            (
                p.pathReq === 'all' ||
                (!caminhoVal && (!p.pathReq || !VARIANTS.has(p.pathReq))) ||
                (caminhoVal && p.pathReq === caminhoVal)
            )
        ).forEach(p => {
            const niveis = extrairNiveisRequisito(p.req);
            if (!niveis) return;
            const nivelMinimo = Math.min(...niveis);
            if (nivelClasse >= nivelMinimo && !selectedPowers.some(sp => sp.name === p.name)) {
                selectedPowers.push({ name: p.name, type: p.type, class: p.class || '', auto: true });
            }
        });
    });

    const depoisAuto = new Set(selectedPowers.filter(p => p.auto).map(p => p.name));
    const adicionados = [...depoisAuto].filter(n => !antesAuto.has(n)).length;
    const removidos = [...antesAuto].filter(n => !depoisAuto.has(n)).length;

    if (adicionados > 0 || removidos > 0) {
        localStorage.setItem('forja_poderes_selecionados', JSON.stringify(selectedPowers));
        atualizarProficienciasPoderes();
        renderizarPoderes();
        if (adicionados > 0) {
            mostrarToast(`${adicionados} habilidade(s) de classe auto-selecionada(s)!`, 'success');
        }
    }
}

function atualizarProficienciasPoderes() {
    const ta = document.getElementById("proficiencias");
    const base = ta.dataset.baseTexto !== undefined ? ta.dataset.baseTexto : ta.value;
    const poderesTexto = selectedPowers.map(p => `⚡ ${p.name}`).join('\n');
    ta.value = poderesTexto ? (base ? base + '\n\n' + poderesTexto : poderesTexto) : base;
    ta.dataset.baseTexto = ta.dataset.baseTexto || base;
}

document.addEventListener("input", (e) => {
    if (e.target.id === "proficiencias") {
        const ta = e.target;
        const lines = ta.value.split('\n');
        const baseLines = lines.filter(l => !l.startsWith('⚡ '));
        ta.dataset.baseTexto = baseLines.join('\n').trim();
    }
});

function renderizarPoderes() {
    const db = typeof powersData !== 'undefined' ? powersData : [];
    if (!db.length) return;

    const classes = obterClassesConfigured();
    const mapaClasse = {
        'Arcanista': 'arcanista', 'Barbaro': 'barbaro', 'Bárbaro': 'barbaro',
        'Bardo': 'bardo', 'Bucaneiro': 'bucaneiro', 'Cacador': 'cacador', 'Caçador': 'cacador',
        'Cavaleiro': 'cavaleiro', 'Clerigo': 'clerigo', 'Clérigo': 'clerigo',
        'Druida': 'druida', 'Guerreiro': 'guerreiro', 'Inventor': 'inventor',
        'Ladino': 'ladino', 'Lutador': 'lutador', 'Nobre': 'nobre',
        'Paladino': 'paladino', 'Frade': 'frade', 'Treinador': 'treinador'
    };
    const nomesClasseDb = classes.map(c => mapaClasse[c.nome] || c.nome.toLowerCase());

    const busca = (document.getElementById("poderesBusca").value || '').toLowerCase();
    const filtroTipo = document.getElementById("poderesFiltroTipo").value;

    let filtrados = db.filter(p => {
        if (filtroTipo !== 'all' && p.type !== filtroTipo) return false;
        if (p.type === 'class' && p.class && !nomesClasseDb.includes(p.class.toLowerCase())) return false;
        if (busca && !p.name.toLowerCase().includes(busca) && !(p.desc || '').toLowerCase().includes(busca)) return false;
        return true;
    });

    const vistos = new Set();
    filtrados = filtrados.filter(p => {
        const key = p.name.toLowerCase();
        if (vistos.has(key)) return false;
        vistos.add(key);
        return true;
    });

    const typeOrder = ['class', 'combat', 'destiny', 'magic', 'conceded', 'tormenta', 'raca', 'grupo', 'complication'];
    const typeLabels = {
        'class': 'Classe',
        'combat': 'Combate',
        'destiny': 'Destino',
        'magic': 'Magia',
        'conceded': 'Concedido',
        'tormenta': 'Tormenta',
        'raca': 'Racial',
        'grupo': 'Grupo',
        'complication': 'Complicação'
    };

    filtrados.sort((a, b) => {
        const aSel = selectedPowers.some(sp => sp.name === a.name) ? 0 : 1;
        const bSel = selectedPowers.some(sp => sp.name === b.name) ? 0 : 1;
        if (aSel !== bSel) return aSel - bSel;
        const aTypeIdx = typeOrder.indexOf(a.type);
        const bTypeIdx = typeOrder.indexOf(b.type);
        if (aTypeIdx !== bTypeIdx) return aTypeIdx - bTypeIdx;
        return a.name.localeCompare(b.name);
    });

    const container = document.getElementById("poderesLista");
    let lastType = null;
    let html = '';
    filtrados.forEach((p, idx) => {
        if (p.type !== lastType) {
            html += `<div class="col-12"><div class="fw-bold text-danger mt-2 mb-1" style="font-size:0.85rem;">${typeLabels[p.type] || p.type}</div></div>`;
            lastType = p.type;
        }
        const selected = selectedPowers.some(sp => sp.name === p.name);
        const escName = p.name.replace(/'/g, "\\'");
        html += `
            <div class="col-md-6">
                <div class="card bg-surface border-secondary h-100 p-2 ${selected ? 'border-danger' : ''} poder-card" data-idx="${idx}">
                    <div class="d-flex align-items-start gap-2">
                        <input type="checkbox" class="form-check-input mt-1 poder-check" ${selected ? 'checked' : ''}>
                        <div class="flex-grow-1">
                            <div class="fw-bold small">${escName}</div>
                            <div class="text-muted" style="font-size:0.72rem;">${typeLabels[p.type] || p.type}${p.class ? ' · ' + p.class : ''}${p.req ? ' · ' + p.req : ''}</div>
                            <div class="text-muted mt-1" style="font-size:0.75rem;line-height:1.3;">${(p.desc || '').substring(0, 150)}${(p.desc || '').length > 150 ? '…' : ''}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html || '<div class="text-muted text-center py-4">Nenhum poder encontrado.</div>';

    container.querySelectorAll(".poder-card").forEach((card, i) => {
        const idx = parseInt(card.dataset.idx);
        const p = filtrados[idx];
        if (!p) return;
        card.addEventListener("click", (e) => {
            if (e.target.closest(".poder-check")) return;
            togglePoder(p);
        });
        card.querySelector(".poder-check").addEventListener("change", () => togglePoder(p));
    });

    const selContainer = document.getElementById("poderesSelecionados");
    if (selectedPowers.length) {
        selContainer.innerHTML = `
            <div class="alert alert-secondary p-2 mb-0 small d-flex align-items-center justify-content-between flex-wrap gap-1">
                <span class="fw-bold">${selectedPowers.length} poder(es) selecionado(s):</span>
                <span>${selectedPowers.map(p => `<span class="badge bg-danger me-1">${p.name}</span>`).join('')}</span>
            </div>
        `;
    } else {
        selContainer.innerHTML = '<div class="text-muted small mb-0">Nenhum poder selecionado.</div>';
    }
}
