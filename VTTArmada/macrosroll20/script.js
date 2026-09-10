// ================================================================
//  ESTADO GLOBAL
// ================================================================
let selectorButtons = [];
let macroLog = [];
let currentDiceOnly = "";
let simplesFields = []; // [{label, value}]
let atkCount = 1;
let combatSkill = 'luta';

// ================================================================
//  DICE GROUPS – state & helpers
// ================================================================
function newDiceGroup() {
    return {
        dice: '1d6', sign: '+',
        explode: false, explodeCont: false,
        kh: false, khN: 1, kl: false, klN: 1,
        dh: false, dhN: 1, dl: false, dlN: 1,
        r: false, rN: 1, ro: false, roN: 1,
        f: false, fN: 1, sort: false
    };
}
let diceGroups = [newDiceGroup()];

function updateDiceGroup(i, field, value) {
    if (!diceGroups[i]) return;
    diceGroups[i][field] = value;

    // Lógica de exclusividade de botões
    if (field === 'explodeCont' && value) diceGroups[i].explode = false;
    if (field === 'explode' && value) diceGroups[i].explodeCont = false;
    if (field === 'kh' && value) diceGroups[i].kl = false;
    if (field === 'kl' && value) diceGroups[i].kh = false;
    if (field === 'dh' && value) diceGroups[i].dl = false;
    if (field === 'dl' && value) diceGroups[i].dh = false;
    if (field === 'r' && value) diceGroups[i].ro = false;
    if (field === 'ro' && value) diceGroups[i].r = false;

    // Se mudou um checkbox ou select, precisamos renderizar para atualizar o visual das bordas/cores
    // Mas se mudou apenas o texto (dice ou números), apenas atualizamos a macro
    if (field !== 'dice' && field !== 'khN' && field !== 'klN' && field !== 'dhN' && field !== 'dlN' && field !== 'rN' && field !== 'roN' && field !== 'fN') {
        renderDiceGroups();
    }

    updateAll();
}

function addDiceGroup() { diceGroups.push(newDiceGroup()); renderDiceGroups(); updateAll(); }
function removeDiceGroup(i) { if (diceGroups.length <= 1) return; diceGroups.splice(i, 1); renderDiceGroups(); updateAll(); }

function renderDiceGroups() {
    const container = document.getElementById('diceGroupsContainer');
    if (!container) return;

    // Guardamos qual elemento tinha o foco antes da atualização
    const activeId = document.activeElement.id;
    const selectionStart = document.activeElement.selectionStart;

    container.innerHTML = diceGroups.map((g, i) => {
        // Criamos IDs únicos para os inputs de texto para poder devolver o foco depois
        const inputId = `dg-input-${i}`;
        const signCtrl = i === 0
            ? '<span class="dg-sign-static">Dados</span>'
            : `<select class="dg-sign-sel" onchange="updateDiceGroup(${i},'sign',this.value)"><option value="+" ${g.sign !== '-' ? 'selected' : ''}>+</option><option value="-" ${g.sign === '-' ? 'selected' : ''}>-</option></select>`;

        const removeBtn = diceGroups.length > 1
            ? `<button class="dg-remove-btn" onclick="removeDiceGroup(${i})">×</button>` : '';

        const tooltips = {
            'explode': 'Exploding Dice: Rola novamente ao obter o valor máximo',
            'explodeCont': 'Continuous Explode: Rerrola continuamente ao máximo',
            'kh': 'Keep High: Mantém os maiores dados',
            'kl': 'Keep Low: Mantém os menores dados',
            'dh': 'Drop High: Descarta os maiores dados',
            'dl': 'Drop Low: Descarta os menores dados',
            'r': 'Reroll: Rerrola dados abaixo do valor especificado',
            'ro': 'Reroll Once: Rerrola uma vez abaixo do valor especificado',
            'f': 'Failure: Conta falhas abaixo do valor especificado',
            'sort': 'Sort: Ordena os dados em ordem crescente'
        };

        const mod = (key, label, hasN, nKey) => {
            const on = g[key] ? 'dg-mod-on' : '';
            const chk = g[key] ? 'checked' : '';
            const nPart = hasN
                ? ` <input type="number" id="${nKey}-${i}" class="dg-n" value="${g[nKey] || 1}" min="1" oninput="updateDiceGroup(${i},'${nKey}',+this.value)">`
                : '';
            const tooltip = tooltips[key] || '';
            return `<label class="dg-mod ${on}" data-tooltip="${tooltip}"><input type="checkbox" ${chk} onchange="updateDiceGroup(${i},'${key}',this.checked)"> ${label}${nPart}</label>`;
        };

        return `<div class="dice-group">
            <div class="dice-group-top">
                ${signCtrl}
                <input type="text" id="${inputId}" class="dg-dice-input" placeholder="1d6" value="${g.dice}"
                    oninput="updateDiceGroup(${i},'dice',this.value)">
                ${removeBtn}
            </div>
            <div class="dice-group-mods">
                ${mod('explode', '!', false)}
                ${mod('explodeCont', '!!', false)}
                ${mod('kh', 'kh', true, 'khN')}
                ${mod('kl', 'kl', true, 'klN')}
                ${mod('dh', 'dh', true, 'dhN')}
                ${mod('dl', 'dl', true, 'dlN')}
                ${mod('r', 'r<', true, 'rN')}
                ${mod('ro', 'ro<', true, 'roN')}
                ${mod('f', 'f<', true, 'fN')}
                ${mod('sort', 's', false)}
            </div>
        </div>`;
    }).join('');

    // Se o elemento que tinha foco ainda existe, devolvemos o foco a ele
    if (activeId) {
        const el = document.getElementById(activeId);
        if (el) {
            el.focus();
            if (selectionStart !== undefined) el.setSelectionRange(selectionStart, selectionStart);
        }
    }
}

function buildDiceGroupStr(g) {
    let s = (g.dice || '1d6').trim();
    if (!s.match(/\d+d\d+/i)) return s;
    if (g.explodeCont) s += '!!';
    else if (g.explode) s += '!';
    if (g.kh) s += `kh${g.khN || 1}`;
    else if (g.kl) s += `kl${g.klN || 1}`;
    if (g.dh) s += `dh${g.dhN || 1}`;
    else if (g.dl) s += `dl${g.dlN || 1}`;
    if (g.r) s += `r<${g.rN || 1}`;
    else if (g.ro) s += `ro<${g.roN || 1}`;
    if (g.f) s += `f<${g.fN || 1}`;
    if (g.sort) s += 's';
    return s;
}

function simulateGroup(g) {
    const match = (g.dice || '1d6').match(/(\d+)d(\d+)/i);
    if (!match) { const n = parseFloat(g.dice) || 0; return { total: n, detail: String(n), limitReached: false }; }
    const num = parseInt(match[1]), sides = parseInt(match[2]);
    const MAX = 100; let iter = 0, hitLimit = false, rolls = [];
    for (let i = 0; i < num; i++) {
        let val = Math.floor(Math.random() * sides) + 1, hist = [val];
        if (g.ro && val <= (g.roN || 1) && sides > (g.roN || 1)) {
            val = Math.floor(Math.random() * sides) + 1; hist.push(val); iter++;
        } else if (g.r && val <= (g.rN || 1) && sides > (g.rN || 1)) {
            while (val <= (g.rN || 1) && iter < MAX) { val = Math.floor(Math.random() * sides) + 1; hist.push(val); iter++; }
            if (iter >= MAX) hitLimit = true;
        }
        rolls.push({ val, hist, boom: false, kept: true });
        if ((g.explodeCont || g.explode) && val === sides && sides > 1) {
            if (g.explodeCont) {
                let xv = sides;
                while (xv === sides && iter < MAX) { xv = Math.floor(Math.random() * sides) + 1; rolls.push({ val: xv, hist: [xv], boom: true, kept: true }); iter++; }
                if (iter >= MAX) hitLimit = true;
            } else {
                const xv = Math.floor(Math.random() * sides) + 1; rolls.push({ val: xv, hist: [xv], boom: true, kept: true }); iter++;
            }
        }
    }
    if (g.kh || g.kl || g.dh || g.dl) {
        rolls.forEach((r, idx) => r.idx = idx);
        if (g.kh) { const n = g.khN || 1;[...rolls].sort((a, b) => b.val - a.val).slice(n).forEach(r => rolls[r.idx].kept = false); }
        else if (g.kl) { const n = g.klN || 1;[...rolls].sort((a, b) => a.val - b.val).slice(n).forEach(r => rolls[r.idx].kept = false); }
        if (g.dh) { const n = g.dhN || 1;[...rolls].sort((a, b) => b.val - a.val).slice(0, n).forEach(r => rolls[r.idx].kept = false); }
        else if (g.dl) { const n = g.dlN || 1;[...rolls].sort((a, b) => a.val - b.val).slice(0, n).forEach(r => rolls[r.idx].kept = false); }
    }
    if (g.sort) rolls.sort((a, b) => a.val - b.val);
    let total = 0, failCount = 0, parts = [];
    rolls.forEach(r => {
        const lbl = r.hist.length > 1 ? `(${r.hist.join('→')})` : r.boom ? `!${r.val}` : String(r.val);
        if (!r.kept) { parts.push(`[${lbl}]`); return; }
        total += r.val;
        if (g.f && r.val <= (g.fN || 1)) failCount++;
        parts.push(lbl);
    });
    if (g.f) parts.push(`[f:${failCount}]`);
    return { total, detail: parts.join(' '), limitReached: hitLimit };
}

// ================================================================
//  MODELO SIMPLES – campos extras dinâmicos
// ================================================================
function addSimplesField() {
    simplesFields.push({ label: '', value: '', count: 1 });
    renderSimplesFields();
    updateAll();
}

function removeSimplesField(i) {
    simplesFields.splice(i, 1);
    renderSimplesFields();
    updateAll();
}

function updateSimplesField(i, key, val) {
    if (!simplesFields[i]) return;
    simplesFields[i][key] = val;
    updateAll();
}

function renderSimplesFields() {
    const container = document.getElementById('simplesFieldsContainer');
    if (!container) return;

    if (simplesFields.length === 0) {
        container.innerHTML = '<div class="simples-empty-hint">Nenhum campo extra. Clique em "+ CAMPO" para adicionar.</div>';
        return;
    }

    container.innerHTML = simplesFields.map((f, i) => {
        const count = f.count || 1;
        return `
        <div class="simples-field-row">
            <input type="text" class="simples-label-input" placeholder="Rótulo (ex: Ataque)"
                value="${f.label}" oninput="updateSimplesField(${i},'label',this.value)">
            <span class="simples-field-sep">=</span>
            <input type="text" class="simples-value-input" placeholder="Valor (ex: [[1d20+5]])"
                value="${f.value}" oninput="updateSimplesField(${i},'value',this.value)">
            <span class="simples-count-sep" title="Repetir este campo N vezes (ex: 4 ataques iguais)">×</span>
            <input type="number" class="simples-count-input" min="1" max="20" value="${count}"
                oninput="updateSimplesField(${i},'count',+this.value)">
            <button class="dg-remove-btn" onclick="removeSimplesField(${i})">×</button>
        </div>`;
    }).join('');
}

function generateSimplesMacro() {
    const name = (document.getElementById('simplesName')?.value || '').trim() || 'Habilidade';
    const desc = (document.getElementById('simplesDesc')?.value || '').trim();
    const gifOn = document.getElementById('checkSimplesGif')?.checked;
    const gifUrl = document.getElementById('urlSimplesGif')?.value || '';
    const gifPart = (gifOn && gifUrl) ? `\n[ ](${gifUrl})\n` : '';

    const extras = simplesFields
        .filter(f => f.label.trim())
        .map(f => {
            const count = f.count || 1;
            if (count <= 1) return `{{${f.label.trim()}=${f.value}}}`;
            let parts = '';
            for (let n = 1; n <= count; n++) {
                parts += `{{${f.label.trim()} ${n}=${f.value}}}`;
            }
            return parts;
        })
        .join('');

    return `&{template:custom}{{name=${name}}}${extras}{{description=${desc}${gifPart}}}`;
}

function openTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(t => {
        t.classList.remove('active');
        t.style.display = 'none';
    });
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    const activeTab = document.getElementById(tabId);
    if (activeTab) {
        activeTab.classList.add('active');
        activeTab.style.display = 'block';
    }
    const btn = document.getElementById('btn-tab-' + tabId);
    if (btn) btn.classList.add('active');

    // Controlar visibilidade da seção global-info
    const globalInfoSection = document.getElementById('globalInfoSection');
    if (globalInfoSection) {
        if (tabId === 'magia' || tabId === 'seletor' || tabId === 'avancado' || tabId === 'simples') {
            globalInfoSection.style.display = 'none';
        } else {
            globalInfoSection.style.display = 'block';
        }
    }

    localStorage.setItem('forge_lastTab', tabId);
    updateAll();
}

function sanitize(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, '');
}

function getSelectedAttributes(cls = 'attr-dmg') {
    const name = document.getElementById('charName').value || "Nome";
    const checkboxes = document.querySelectorAll(`.${cls}:checked`);
    const selected = Array.from(checkboxes).map(cb => `@{${name}|${cb.value}}`);
    return selected.length > 0 ? selected.join('+') : "0";
}

// ================================================================
//  MAGIA
// ================================================================
// ================================================================
//  GRIMÓRIO
// ================================================================
function openGrimorio() {
    // Popular select de escolas na primeira abertura
    const schoolSel = document.getElementById('grimorioSchool');
    if (schoolSel.options.length <= 1 && typeof SPELLS_DB !== 'undefined') {
        const schools = [...new Set(SPELLS_DB.map(s => s.e).filter(Boolean))].sort();
        schools.forEach(sc => {
            const opt = document.createElement('option');
            opt.value = sc; opt.textContent = sc;
            schoolSel.appendChild(opt);
        });
    }
    document.getElementById('grimorioOverlay').classList.remove('hidden');
    document.getElementById('grimorioSearch').focus();
    renderGrimorio();
}

function closeGrimorio() {
    document.getElementById('grimorioOverlay').classList.add('hidden');
}

function closeGrimorioIfBg(e) {
    if (e.target === document.getElementById('grimorioOverlay')) closeGrimorio();
}

function renderGrimorio() {
    if (typeof SPELLS_DB === 'undefined') return;
    const q = document.getElementById('grimorioSearch').value.toLowerCase().trim();
    const circle = document.getElementById('grimorioCircle').value;
    const school = document.getElementById('grimorioSchool').value;

    const filtered = SPELLS_DB.filter(s => {
        const matchQ = !q || s.n.toLowerCase().includes(q) || (s.desc || '').toLowerCase().includes(q);
        const matchC = !circle || String(s.c) === circle;
        const matchE = !school || s.e === school;
        return matchQ && matchC && matchE;
    });

    document.getElementById('grimorioCount').textContent =
        `${filtered.length} magia${filtered.length !== 1 ? 's' : ''} encontrada${filtered.length !== 1 ? 's' : ''}`;

    const list = document.getElementById('grimorioList');
    if (filtered.length === 0) {
        list.innerHTML = '<div class="grimorio-empty">Nenhuma magia encontrada.</div>';
        return;
    }

    list.innerHTML = filtered.map((s, i) => {
        const idx = SPELLS_DB.indexOf(s);
        const aprCount = s.aprimoramentos ? s.aprimoramentos.length : 0;
        return `<div class="grimorio-item" onclick="selectSpell(${idx})">
            <div class="grimorio-item-main">
                <span class="grimorio-item-name">${s.n}</span>
                <span class="grimorio-item-badges">
                    <span class="grimorio-badge circle">${s.c}º</span>
                    <span class="grimorio-badge school">${s.e || ''}</span>
                    ${aprCount ? `<span class="grimorio-badge apr">${aprCount} apr.</span>` : ''}
                </span>
            </div>
            <div class="grimorio-item-meta">${s.ex || ''} · ${s.d || ''} · ${s.a || ''} · ${s.al || ''}</div>
        </div>`;
    }).join('');
}

function selectSpell(idx) {
    const s = SPELLS_DB[idx];
    if (!s) return;

    // Preencher campos de identificação
    const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v || ''; };
    sv('spellName', s.n);
    sv('spellType', `${s.e ? s.e : ''} ${s.c ? s.c + 'º círculo' : ''}`.trim());
    sv('spellExec', s.ex);
    sv('spellDur', s.d);
    sv('spellRange', s.a);
    sv('spellTarget', s.al);

    // Resistência — coloca como texto fixo (sem variação)
    const resVarCb = document.getElementById('checkSpellResVar');
    if (resVarCb) { resVarCb.checked = false; toggleSpellResVar(); }
    sv('spellResFix', s.r);

    // Descrição + aprimoramentos formatados
    let desc = s.desc || '';
    if (s.aprimoramentos && s.aprimoramentos.length > 0) {
        const aprLines = s.aprimoramentos.map(a => `+${a.cost} PM: ${a.desc}`).join('\n');
        desc += '\n\nAprimoramentos:\n' + aprLines;
    }
    sv('spellDesc', desc.trim());

    // Limpar dano PM (usuário configura manualmente se quiser)
    const dmgPMCb = document.getElementById('checkSpellDmgPM');
    if (dmgPMCb) { dmgPMCb.checked = false; toggleSpellDmgPM(); }
    sv('spellDmgFix', '');

    closeGrimorio();
    updateAll();
}

function toggleSpellResVar() {
    const cb = document.getElementById('checkSpellResVar');
    if (!cb) return;
    const on = cb.checked;
    const varBlock = document.getElementById('spellResVarBlock');
    const fixBlock = document.getElementById('spellResFixBlock');
    if (varBlock) varBlock.classList.toggle('hidden', !on);
    if (fixBlock) fixBlock.classList.toggle('hidden', on);
}

function toggleSpellDmgPM() {
    const on = document.getElementById('checkSpellDmgPM').checked;
    document.getElementById('spellDmgPMBlock').classList.toggle('hidden', !on);
}

function getSelectedSpellAttr() {
    const name = document.getElementById('charName').value || "selected";
    const cbs = document.querySelectorAll('.attr-spell:checked');
    const parts = Array.from(cbs).map(cb => `@{${name}|${cb.value}}`);
    return parts.length > 0 ? parts.join('+') : "";
}

function generateSpellMacro() {
    const el = document.getElementById('outputMagia');
    if (!el) return;

    const charRef = document.getElementById('charName').value || "selected";
    const spName = document.getElementById('spellName')?.value || "Magia";
    const spType = document.getElementById('spellType')?.value || "";
    const spExec = document.getElementById('spellExec')?.value || "";
    const spDur = document.getElementById('spellDur')?.value || "";
    const spRange = document.getElementById('spellRange')?.value || "";
    const spTgt = document.getElementById('spellTarget')?.value || "";
    const spDesc = document.getElementById('spellDesc')?.value || "";

    // --- Resistência ---
    let resPart = "";
    if (document.getElementById('checkSpellResVar')?.checked) {
        const label = document.getElementById('spellResLabel')?.value || "Resistência";
        const opts = (document.getElementById('spellResOpts')?.value || "").trim();
        if (opts) resPart = `{{resistance=?{${label}|${opts}}}}`;
    } else {
        const fix = (document.getElementById('spellResFix')?.value || "").trim();
        if (fix) resPart = `{{resistance=${fix}}}`;
    }

    // --- Dano ---
    let dmgLine = "";
    const attrStr = getSelectedSpellAttr();

    const baseDice = parseInt(document.getElementById('spellDmgBase')?.value) || 0;
    const die = document.getElementById('spellDmgDie')?.value || "d8";
    const extraDmg = (document.getElementById('spellDmgExtra')?.value || "").trim();
    const dmgType = (document.getElementById('spellDmgType')?.value || "").trim();

    let diceExpr = "";
    let extraExpr = extraDmg;
    let pmSpentLine = "";

    if (document.getElementById('checkSpellDmgPM')?.checked) {
        const pmLabel = document.getElementById('spellPMLabel')?.value || "Aumento de dano";
        const pmDice = parseInt(document.getElementById('spellDmgPerPM')?.value) || 0;
        const pmBonus = parseInt(document.getElementById('spellDmgBonusPerPM')?.value) || 0;

        let totalDiceNum = "";
        if (pmDice > 0) {
            if (baseDice > 0) {
                totalDiceNum = `[[${baseDice} + (?{${pmLabel}|0} * ${pmDice})]]`;
            } else {
                totalDiceNum = `[[?{${pmLabel}|0} * ${pmDice}]]`;
            }
        } else if (baseDice > 0) {
            totalDiceNum = `${baseDice}`;
        }

        if (totalDiceNum) diceExpr = `${totalDiceNum}${die}`;

        if (pmBonus > 0) {
            const pmBonusStr = `(?{${pmLabel}|0} * ${pmBonus})`;
            if (extraExpr) extraExpr += ` + ${pmBonusStr}`;
            else extraExpr = pmBonusStr;
        }

        pmSpentLine = `*${pmLabel}:* +[[?{${pmLabel}|0} * ${pmDice}]] PMs`;
    } else {
        if (baseDice > 0) diceExpr = `${baseDice}${die}`;
    }

    const allExtras = [extraExpr, attrStr].filter(Boolean).join(" + ");
    let finalFormula = diceExpr;
    if (allExtras) {
        if (finalFormula) finalFormula += ` + ${allExtras}`;
        else finalFormula = allExtras;
    }

    if (finalFormula) {
        const typeStr = dmgType ? ` de ${dmgType}` : "";
        dmgLine = `*Dano:* [[${finalFormula}]]${typeStr}`;
    }

    const descFull = [dmgLine, pmSpentLine, spDesc].filter(Boolean).join("\n");

    el.value = `&{template:spell} {{character=@{${charRef}|character_name}}} {{spellname=${spName}}} {{type=${spType}}} {{execution=${spExec}}} {{duration=${spDur}}} {{range=${spRange}}} {{targetarea=${spTgt}}} ${resPart} {{description=${descFull}}} {{cd=[[@{${charRef}|cdtotal}]]}}`;
}

function setCombatSkill(val) {
    combatSkill = sanitize(val) || 'luta';
    // Atualiza o input de texto com o valor selecionado
    const inp = document.getElementById('combatSkillInput');
    if (inp) inp.value = val;
    // Destaca o botão ativo
    document.querySelectorAll('.combat-skill-btn').forEach(btn => {
        btn.classList.toggle('active', sanitize(btn.dataset.skill) === combatSkill);
    });
    updateAll();
}

function onCombatSkillInput(val) {
    combatSkill = sanitize(val) || 'luta';
    // Remove destaque dos botões se o valor não bater com nenhum preset
    document.querySelectorAll('.combat-skill-btn').forEach(btn => {
        btn.classList.toggle('active', sanitize(btn.dataset.skill) === combatSkill);
    });
    updateAll();
}


function updateAll() {
    const name = document.getElementById('charName').value || "Nome";
    const margin = document.getElementById('critMargin').value || "20";
    const failMargin = document.getElementById('failMargin').value;
    const cfStr = failMargin ? `cf<${failMargin}` : '';
    document.getElementById('pre-header').innerText = name;

    let db = "1d20";
    if (document.getElementById('rollVantagem').checked) db = "2d20kh1";
    if (document.getElementById('rollDesvantagem').checked) db = "2d20kl1";

    // --- PERÍCIA ---
    const sName = document.getElementById('skillName').value || "Perícia";
    const c1 = document.getElementById('checkCrit').checked ? `[gif](${document.getElementById('urlCrit').value})` : "";
    const n1 = document.getElementById('checkNormal').checked ? `[gif](${document.getElementById('urlNormal').value})` : "";
    const f1 = document.getElementById('checkFail').checked ? `[gif](${document.getElementById('urlFail').value})` : "";
    document.getElementById('output').value = `&{template:custom}{{name=@{${name}|character_name}}}{{secondname= *${sName}* }}{{rollname=${sName}}}{{theroll=[[${db}cs>${margin}${cfStr}+[[@{${name}|${sanitize(sName)}total}]]]]}} {{criticalname=}}{{ifcritical=${c1}}}{{notcritical=${n1}}}{{ifcriticalerror=${f1}}}`;

    // --- COMBATE ---
    const w = document.getElementById('atkWeapon').value || "Arma";
    const dd = document.getElementById('atkDmgDice').value || "1d6";
    const extra = document.getElementById('atkExtraDmg').value || "0";
    const mult = parseInt(document.getElementById('atkCritMult').value) || 2;
    atkCount = parseInt(document.getElementById('atkCount')?.value) || 1;
    // Lê a perícia de combate do input (sanitiza para gerar o nome do atributo no roll20)
    const rawSkill = document.getElementById('combatSkillInput')?.value || 'Luta';
    combatSkill = sanitize(rawSkill) || 'luta';
    const rollAttrString = getSelectedAttributes('attr-roll');
    const dmgAttrString = getSelectedAttributes('attr-dmg');
    const gAtkCrit = document.getElementById('checkAtkCrit').checked ? `[gif](${document.getElementById('urlAtkCrit').value})` : "";
    const gAtkNorm = document.getElementById('checkAtkNorm').checked ? `[gif](${document.getElementById('urlAtkNorm').value})` : "";
    const gAtkFail = document.getElementById('checkAtkFail').checked ? `[gif](${document.getElementById('urlAtkFail').value})` : "";
    let cDmgParts = [];
    for (let i = 0; i < mult; i++) { cDmgParts.push(dd); }
    const cDmg = cDmgParts.join(' + ') + ` + ${dmgAttrString} + ${extra}`;
    const atkRoll = `[[${db}cs>${margin}${cfStr}+[[@{${name}|${combatSkill}total}+@{${name}|condicaomodataque}]]+${rollAttrString}+@{${name}|ataquetemp}]]`;
    const normDmg = `[[${dd}+${dmgAttrString}+${extra}+@{${name}|danotemp}+@{${name}|rolltemp}]]`;

    // Ataque 1 — completo com crítico/GIF
    let combateMacro = `&{template:custom}{{name=@{${name}|character_name}}}{{secondname= *${w}* }}{{rollname=Rolagem }}{{theroll=${atkRoll}}} {{criticalname=Dano}}{{ifcritical=[[${cDmg}]] CRITICO \n${gAtkCrit}}}{{notcritical=${normDmg} ${gAtkNorm}}}{{ifcriticalerror=${gAtkFail}}}`;

    // Ataques 2..N — rolagem com cs> + dano normal e crítico separados
    for (let n = 2; n <= atkCount; n++) {
        combateMacro += `{{Ataque ${n}=${atkRoll}}}{{Dano ${n}=${normDmg}}}{{Crítico ${n}=[[${cDmg}]]}}`;
    }

    document.getElementById('outputCombate').value = combateMacro;

    // --- SELETOR ---
    const st = document.getElementById('queryTitle').value || "Opções";
    const scd = document.getElementById('querySelectorCD').value;
    const cdStr = scd ? `{{CD=${scd}}}` : "";
    const checkSel = document.getElementById('checkSelectorGif').checked;
    const sg = (checkSel && document.getElementById('urlSelectorGif').value) ? `\n[gif](${document.getElementById('urlSelectorGif').value})` : "";
    const queryButtons = selectorButtons.map(b => `${b.label}, [${b.label}](${b.macro})`).join('|\n');
    document.getElementById('outputSelector').value = `&{template:custom}{{infoname=${st}}}${cdStr}{{description=?{${st}|\n${queryButtons}\n}${sg}}}`;

    // --- AVANÇADO ---
    const advD = document.getElementById('advDesc').value || "Rolagem";
    const advB = document.getElementById('advBonus').value;
    const groupParts = diceGroups.map((g, i) => {
        const s = buildDiceGroupStr(g);
        return i === 0 ? s : `${g.sign || '+'}${s}`;
    }).join('');
    const bonusPart = (advB && advB !== '0') ? `+${advB}` : '';
    const fullDice = `${groupParts}${bonusPart}`;
    currentDiceOnly = `[[${fullDice}]]`;
    document.getElementById('outputAvancado').value = `&{template:custom}{{infoname=${advD}}}{{description=**Resultado:** [[${fullDice}]]}}`;

    // --- MODELO SIMPLES ---
    const simplesOutput = document.getElementById('outputSimples');
    if (simplesOutput) simplesOutput.value = generateSimplesMacro();
    generateSpellMacro();

    const currentTab = localStorage.getItem('forge_lastTab') || 'pericia';
    const container = document.getElementById('pre-gif-container');
    if (currentTab === 'pericia') {
        document.getElementById('pre-skill').innerText = sName;
        container.innerHTML = (document.getElementById('checkNormal').checked && document.getElementById('urlNormal').value) ? `<img src="${document.getElementById('urlNormal').value}">` : "";
    } else if (currentTab === 'combate') {
        document.getElementById('pre-skill').innerText = w;
        container.innerHTML = (document.getElementById('checkAtkNorm').checked && document.getElementById('urlAtkNorm').value) ? `<img src="${document.getElementById('urlAtkNorm').value}">` : "";
    } else if (currentTab === 'seletor') {
        document.getElementById('pre-skill').innerText = st;
        container.innerHTML = (checkSel && document.getElementById('urlSelectorGif').value) ? `<img src="${document.getElementById('urlSelectorGif').value}">` : "";
    } else if (currentTab === 'avancado') {
        document.getElementById('pre-skill').innerText = advD;
        container.innerHTML = "";
    } else if (currentTab === 'simples') {
        const sn = document.getElementById('simplesName')?.value || 'Habilidade';
        document.getElementById('pre-skill').innerText = sn;
        const gifOn = document.getElementById('checkSimplesGif')?.checked;
        const gifUrl = document.getElementById('urlSimplesGif')?.value || '';
        container.innerHTML = (gifOn && gifUrl) ? `<img src="${gifUrl}">` : "";
    }
    saveData();
}

function executeTestRoll() {
    const currentTab = localStorage.getItem('forge_lastTab') || 'pericia';
    let total = 0;
    let details = [];
    let limitReached = false;
    const resultValue = document.getElementById('roll-result-value');
    const detailsText = document.getElementById('roll-details-text');

    if (currentTab === 'avancado') {
        const bonus = parseInt(document.getElementById('advBonus').value) || 0;
        let anyLimit = false;
        diceGroups.forEach((g, gi) => {
            const res = simulateGroup(g);
            const sign = (gi > 0 && g.sign === '-') ? -1 : 1;
            total += res.total * sign;
            details.push(gi === 0 ? res.detail : `${g.sign || '+'}(${res.detail})`);
            if (res.limitReached) anyLimit = true;
        });
        if (bonus !== 0) {
            details.push(bonus > 0 ? `+${bonus}` : bonus);
            total += bonus;
        }
        limitReached = anyLimit;

    } else if (currentTab === 'simples') {
        // Coleta todos os textos dos campos extras + descrição
        const allTexts = [
            ...simplesFields.map(f => `${f.label}: ${f.value}`),
            document.getElementById('simplesDesc')?.value || ''
        ];

        // Extrai todas as expressões NdX únicas encontradas nos textos
        const diceRegex = /(\d+)d(\d+)/gi;
        const foundExpressions = [];
        const seen = new Set();
        allTexts.forEach(text => {
            let m;
            while ((m = diceRegex.exec(text)) !== null) {
                const key = m[0].toLowerCase();
                if (!seen.has(key)) { seen.add(key); foundExpressions.push({ num: parseInt(m[1]), sides: parseInt(m[2]), expr: m[0] }); }
            }
        });

        if (foundExpressions.length === 0) {
            // Nenhum dado encontrado: avisa o usuário
            detailsText.innerText = 'Nenhuma expressão de dados (NdX) encontrada nos campos.';
            resultValue.innerText = '—';
            const box = document.querySelector('.r20-result-box');
            box.style.borderColor = 'var(--roll-green)';
            resultValue.style.color = 'var(--roll-green)';
            return;
        }

        // Rola cada expressão e monta os detalhes
        const MAX = 100;
        foundExpressions.forEach(({ num, sides, expr }) => {
            const rolls = [];
            let groupTotal = 0;
            let hitLimit = false;
            let iter = 0;
            for (let i = 0; i < num; i++) {
                const val = Math.floor(Math.random() * sides) + 1;
                rolls.push(val);
                groupTotal += val;
                // explosão simples se o dado explodir (não temos configuração aqui, só rolagem crua)
            }
            total += groupTotal;
            const rollStr = rolls.length === 1 ? String(rolls[0]) : `[${rolls.join(' ')}]`;
            details.push(`${expr}:${rollStr}=${groupTotal}`);
        });

    } else {
        let r1 = Math.floor(Math.random() * 20) + 1;
        if (document.getElementById('rollVantagem').checked) {
            let r2 = Math.floor(Math.random() * 20) + 1;
            total = Math.max(r1, r2);
            details.push(`[${r1}, ${r2}] → kh1`);
        } else if (document.getElementById('rollDesvantagem').checked) {
            let r2 = Math.floor(Math.random() * 20) + 1;
            total = Math.min(r1, r2);
            details.push(`[${r1}, ${r2}] → kl1`);
        } else {
            total = r1;
            details.push(r1);
        }
    }

    resultValue.innerText = total;
    const limitWarning = limitReached ? ' ⚠️ limite atingido' : '';
    detailsText.innerText = `${details.join('   ')}${limitWarning}`;

    const box = document.querySelector('.r20-result-box');
    box.style.borderColor = limitReached ? '#e74c3c' : 'var(--roll-green)';
    resultValue.style.color = limitReached ? '#e74c3c' : 'var(--roll-green)';
    box.style.transform = 'scale(1.1)';
    setTimeout(() => { box.style.transform = 'scale(1)'; }, 200);
}

function copyDiceOnly() {
    if (!currentDiceOnly) return;
    navigator.clipboard.writeText(currentDiceOnly);
    const btn = document.getElementById('btnCopyDice');
    btn.innerText = "COPIADO!";
    setTimeout(() => btn.innerText = "Copiar Dados", 2000);
}

function copyAndLog(id, type) {
    const text = document.getElementById(id).value;
    const label = (type === 'Combate') ? document.getElementById('atkWeapon').value
        : (type === 'Perícia') ? document.getElementById('skillName').value
            : (type === 'Avançado') ? document.getElementById('advDesc').value
                : (type === 'Simples') ? document.getElementById('simplesName').value
                    : document.getElementById('queryTitle').value;

    navigator.clipboard.writeText(text);
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    macroLog.unshift({ label: `${type}: ${label || 'Sem Nome'}`, code: text, time: timestamp });
    if (macroLog.length > 5) macroLog.pop();
    renderLog();

    const btn = event.currentTarget;
    btn.innerText = "COPIADO!";
    const originalText = id.includes('Avancado') ? "Copiar Macro Avançada" : "Copiar e Salvar no Log";
    setTimeout(() => btn.innerText = originalText, 2000);
}

function renderLog() {
    const container = document.getElementById('macroLog');
    if (!container) return;
    if (macroLog.length === 0) {
        container.innerHTML = '<div style="color:#999; font-size:0.8rem; text-align:center; padding:10px;">Nenhuma macro copiada ainda.</div>';
        return;
    }
    container.innerHTML = macroLog.map((item, index) => `
                <div class="log-item">
                    <span><strong>[${item.time}]</strong> ${item.label}</span>
                    <button class="btn-log-copy" onclick="copyFromLog(${index})">Copiar</button>
                </div>
            `).join('');
    localStorage.setItem('forge_log', JSON.stringify(macroLog));
}

function copyFromLog(index) { navigator.clipboard.writeText(macroLog[index].code); }
function addButton() { const l = document.getElementById('btnLabel').value.trim(); if (l) { selectorButtons.push({ label: l, macro: `!&#13;#${l}` }); document.getElementById('btnLabel').value = ''; renderButtons(); updateAll(); } }
function renderButtons() { const c = document.getElementById('buttonContainer'); c.innerHTML = ''; selectorButtons.forEach((b, i) => c.innerHTML += `<div class="tag">${b.label}<span class="remove" onclick="removeButton(${i})">×</span></div>`); }
function removeButton(i) { selectorButtons.splice(i, 1); renderButtons(); updateAll(); }
function handleEnter(e) { if (e.key === 'Enter') addButton(); }

function saveData() {
    const rollStates = {}, dmgStates = {};
    document.querySelectorAll('.attr-roll').forEach(cb => rollStates[cb.value] = cb.checked);
    document.querySelectorAll('.attr-dmg').forEach(cb => dmgStates[cb.value] = cb.checked);
    const d = {
        n: document.getElementById('charName').value, m: document.getElementById('critMargin').value,
        sn: document.getElementById('skillName').value, uc: document.getElementById('urlCrit').value, un: document.getElementById('urlNormal').value, uf: document.getElementById('urlFail').value,
        cc: document.getElementById('checkCrit').checked, cn: document.getElementById('checkNormal').checked, cf: document.getElementById('checkFail').checked,
        dm: document.querySelector('input[name="diceMod"]:checked')?.id || 'rollNormal',
        aw: document.getElementById('atkWeapon').value, ad: document.getElementById('atkDmgDice').value, ax: document.getElementById('atkExtraDmg').value, am: document.getElementById('atkCritMult').value,
        ac: parseInt(document.getElementById('atkCount')?.value) || 1,
        ask: document.getElementById('combatSkillInput')?.value || 'Luta',
        uac: document.getElementById('urlAtkCrit').value, uan: document.getElementById('urlAtkNorm').value, uaf: document.getElementById('urlAtkFail').value,
        cac: document.getElementById('checkAtkCrit').checked, can: document.getElementById('checkAtkNorm').checked, caf: document.getElementById('checkAtkFail').checked,
        qt: document.getElementById('queryTitle').value, qcd: document.getElementById('querySelectorCD').value, usg: document.getElementById('urlSelectorGif').value, csg: document.getElementById('checkSelectorGif').checked,
        advD: document.getElementById('advDesc').value, advB: document.getElementById('advBonus').value,
        fm: document.getElementById('failMargin').value,
        dg: JSON.parse(JSON.stringify(diceGroups)),
        smName: document.getElementById('simplesName')?.value || '',
        smDesc: document.getElementById('simplesDesc')?.value || '',
        smGif: document.getElementById('checkSimplesGif')?.checked || false,
        smUrl: document.getElementById('urlSimplesGif')?.value || '',
        smFields: JSON.parse(JSON.stringify(simplesFields)),
        sb: selectorButtons, attrRoll: rollStates, attrDmg: dmgStates,
        spName: document.getElementById('spellName')?.value || '',
        spType: document.getElementById('spellType')?.value || '',
        spExec: document.getElementById('spellExec')?.value || '',
        spDur: document.getElementById('spellDur')?.value || '',
        spRange: document.getElementById('spellRange')?.value || '',
        spTgt: document.getElementById('spellTarget')?.value || '',
        spDesc: document.getElementById('spellDesc')?.value || '',
        spResVar: document.getElementById('checkSpellResVar')?.checked || false,
        spResLabel: document.getElementById('spellResLabel')?.value || '',
        spResOpts: document.getElementById('spellResOpts')?.value || '',
        spResFix: document.getElementById('spellResFix')?.value || '',
        spDmgPM: document.getElementById('checkSpellDmgPM')?.checked || false,
        spPMLabel: document.getElementById('spellPMLabel')?.value || '',
        spDmgDie: document.getElementById('spellDmgDie')?.value || 'd8',
        spDmgBase: document.getElementById('spellDmgBase')?.value || '0',
        spDmgExtra: document.getElementById('spellDmgExtra')?.value || '',
        spDmgPerPM: document.getElementById('spellDmgPerPM')?.value || '1',
        spDmgBonusPerPM: document.getElementById('spellDmgBonusPerPM')?.value || '0',
        spDmgType: document.getElementById('spellDmgType')?.value || '',
        spAttr: (() => { const o = {}; document.querySelectorAll('.attr-spell').forEach(cb => o[cb.value] = cb.checked); return o; })()
    };
    localStorage.setItem('forge_vFinal', JSON.stringify(d));
}

window.onload = () => {
    const s = localStorage.getItem('forge_vFinal');
    if (s) {
        const d = JSON.parse(s);
        document.getElementById('charName').value = d.n || ""; document.getElementById('critMargin').value = d.m || "20";
        document.getElementById('skillName').value = d.sn || ""; document.getElementById('urlCrit').value = d.uc || "";
        document.getElementById('urlNormal').value = d.un || ""; document.getElementById('urlFail').value = d.uf || "";
        document.getElementById('checkCrit').checked = d.cc || false; document.getElementById('checkNormal').checked = d.cn || false; document.getElementById('checkFail').checked = d.cf || false;
        if (d.dm && document.getElementById(d.dm)) document.getElementById(d.dm).checked = true;
        document.getElementById('atkWeapon').value = d.aw || ""; document.getElementById('atkDmgDice').value = d.ad || "1d6";
        document.getElementById('atkExtraDmg').value = d.ax || ""; document.getElementById('atkCritMult').value = d.am || "3";
        if (document.getElementById('atkCount')) document.getElementById('atkCount').value = d.ac || 1;
        if (d.ask && document.getElementById('combatSkillInput')) {
            document.getElementById('combatSkillInput').value = d.ask;
            // Destaca botão correspondente se for um preset
            const sk = sanitize(d.ask);
            document.querySelectorAll('.combat-skill-btn').forEach(btn => {
                btn.classList.toggle('active', sanitize(btn.dataset.skill) === sk);
            });
        }
        document.getElementById('urlAtkCrit').value = d.uac || ""; document.getElementById('urlAtkNorm').value = d.uan || ""; document.getElementById('urlAtkFail').value = d.uaf || "";
        document.getElementById('checkAtkCrit').checked = d.cac || false; document.getElementById('checkAtkNorm').checked = d.can || false; document.getElementById('checkAtkFail').checked = d.caf || false;
        document.getElementById('queryTitle').value = d.qt || "Selecione o teste"; document.getElementById('querySelectorCD').value = d.qcd || "";
        document.getElementById('urlSelectorGif').value = d.usg || ""; document.getElementById('checkSelectorGif').checked = d.csg || false;
        document.getElementById('advDesc').value = d.advD || "";
        document.getElementById('advBonus').value = d.advB || "0";
        document.getElementById('failMargin').value = d.fm || "";
        if (d.dg && d.dg.length) diceGroups = d.dg;
        if (document.getElementById('simplesName')) document.getElementById('simplesName').value = d.smName || '';
        if (document.getElementById('simplesDesc')) document.getElementById('simplesDesc').value = d.smDesc || '';
        if (document.getElementById('checkSimplesGif')) document.getElementById('checkSimplesGif').checked = d.smGif || false;
        if (document.getElementById('urlSimplesGif')) document.getElementById('urlSimplesGif').value = d.smUrl || '';
        if (d.smFields) { simplesFields = d.smFields; renderSimplesFields(); }
        selectorButtons = d.sb || [];
        if (d.attrRoll) Object.keys(d.attrRoll).forEach(key => { const cb = document.querySelector(`.attr-roll[value="${key}"]`); if (cb) cb.checked = d.attrRoll[key]; });
        if (d.attrDmg) Object.keys(d.attrDmg).forEach(key => { const cb = document.querySelector(`.attr-dmg[value="${key}"]`); if (cb) cb.checked = d.attrDmg[key]; });
        // Compatibilidade com saves antigos (attr-mod)
        if (d.attrs && !d.attrDmg) Object.keys(d.attrs).forEach(key => { const cb = document.querySelector(`.attr-dmg[value="${key}"]`); if (cb) cb.checked = d.attrs[key]; });
        // Magia
        const sv = (id, v) => { const el = document.getElementById(id); if (el && v !== undefined) el.value = v; };
        const sc = (id, v) => { const el = document.getElementById(id); if (el) el.checked = !!v; };
        sv('spellName', d.spName); sv('spellType', d.spType);
        sv('spellExec', d.spExec); sv('spellDur', d.spDur);
        sv('spellRange', d.spRange); sv('spellTarget', d.spTgt);
        sv('spellDesc', d.spDesc);
        sc('checkSpellResVar', d.spResVar); sv('spellResLabel', d.spResLabel);
        sv('spellResOpts', d.spResOpts); sv('spellResFix', d.spResFix);
        sc('checkSpellDmgPM', d.spDmgPM); sv('spellPMLabel', d.spPMLabel);
        sv('spellDmgDie', d.spDmgDie); sv('spellDmgBase', d.spDmgBase);
        sv('spellDmgExtra', d.spDmgExtra); sv('spellDmgType', d.spDmgType);
        sv('spellDmgPerPM', d.spDmgPerPM); sv('spellDmgBonusPerPM', d.spDmgBonusPerPM);
        if (d.spAttr) Object.keys(d.spAttr).forEach(key => { const cb = document.querySelector(`.attr-spell[value="${key}"]`); if (cb) cb.checked = d.spAttr[key]; });
        if (d.spResVar) toggleSpellResVar();
        if (d.spDmgPM) toggleSpellDmgPM();
        renderButtons();
        renderDiceGroups();
    }
    const log = localStorage.getItem('forge_log'); if (log) { macroLog = JSON.parse(log); renderLog(); }
    const last = localStorage.getItem('forge_lastTab') || 'pericia'; openTab(last);
};

function clearAllData() { if (confirm("Limpar tudo?")) { localStorage.clear(); location.reload(); } }
