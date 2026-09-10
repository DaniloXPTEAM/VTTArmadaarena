// ============================================================
//  script.js — Lógica da Calculadora de Atributos
//  Os dados das raças estão em racas.js. Carregue racas.js ANTES.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    const ATTRIBUTES = ['forca', 'destreza', 'constituicao', 'inteligencia', 'sabedoria', 'carisma'];
    const racaSelect = document.getElementById('raca');
    const attributeTableBody = document.querySelector('#attribute-table tbody');

    makeDraggable(document.getElementById('opcoes'));

    const togglePontos = document.getElementById('togglePontos');
    const pontosInput = document.getElementById('pontosInput');
    const salvarPontosBtn = document.getElementById('salvarPontos');
    const pontosDisponiveisSpan = document.getElementById('pontos_disponiveis');
    let basePoints = 10;

    // Poderes atualmente visíveis (base + dinâmicos) — usado pelo export
    let _currentRacialPowers = [];

    // ── CONFIG: pontos editáveis ──────────────────────────────
    togglePontos.addEventListener('change', () => {
        const on = togglePontos.checked;
        pontosInput.classList.toggle('hidden', !on);
        salvarPontosBtn.classList.toggle('hidden', !on);
        if (on) pontosInput.value = basePoints;
    });

    salvarPontosBtn.addEventListener('click', () => {
        const v = parseInt(pontosInput.value, 10);
        if (!isNaN(v) && v >= 0) {
            basePoints = v; updateAll();
            togglePontos.checked = false;
            pontosInput.classList.add('hidden');
            salvarPontosBtn.classList.add('hidden');
        } else {
            alert('Por favor, insira um valor numérico válido e não negativo.');
            pontosInput.value = pontosDisponiveisSpan.textContent;
        }
    });

    // ── CONFIG: coluna "Outros" ───────────────────────────────
    document.getElementById('toggleOutrosInput').addEventListener('change', (e) => {
        const cols = document.querySelectorAll('.outros-col');
        cols.forEach(col => {
            col.style.display = e.target.checked ? 'table-cell' : 'none';
        });
        if (!e.target.checked) { document.querySelectorAll('.attr-outros').forEach(i => i.value = 0); updateAll(); }
    });

    function hideOutrosColumn() {
        document.querySelectorAll('.outros-col').forEach(col => col.style.display = 'none');
    }

    // ── CONFIG: modal ─────────────────────────────────────────
    document.getElementById('config-button').addEventListener('click', () => {
        document.getElementById('configOverlay').classList.add('active');
        document.getElementById('configModal').classList.add('active');
        document.getElementById('configModal').setAttribute('aria-hidden', 'false');
    });
    document.getElementById('close-config-button').addEventListener('click', closeConfigModal);
    document.getElementById('configOverlay').addEventListener('click', closeConfigModal);

    function closeConfigModal() {
        document.getElementById('configOverlay').classList.remove('active');
        document.getElementById('configModal').classList.remove('active');
        document.getElementById('configModal').setAttribute('aria-hidden', 'true');
    }

    // ── POPULAR SELETOR ───────────────────────────────────────
    function populateRaceSelect() {
        while (racaSelect.options.length > 1) racaSelect.remove(1);
        for (const raceId in RACE_DATA) {
            const race = RACE_DATA[raceId];
            const opt = document.createElement('option');
            opt.value = raceId;
            opt.textContent = race.name;
            opt.dataset.raceType = race.type;
            racaSelect.appendChild(opt);
        }
    }

    // ── TABELA ───────────────────────────────────────────────
    const ICONS = { forca: '../assets/imagens/forca.png', destreza: '../assets/imagens/destreza.png', constituicao: '../assets/imagens/constituicao.png', inteligencia: '../assets/imagens/inteligencia.png', sabedoria: '../assets/imagens/sabedoria.png', carisma: '../assets/imagens/carisma.png' };

    function populateAttributeTable() {
        attributeTableBody.innerHTML = '';
        ATTRIBUTES.forEach(attr => {
            const row = document.createElement('tr');
            row.innerHTML = `
        <td><img src="${ICONS[attr]}" alt="${attr}" height="40px" width="auto"></td>
        <td style="font-weight:bold;font-size:30px;">${attr.substring(0, 3).toUpperCase()}</td>
        <td>
          <div class="attr-stepper" data-attr="${attr}">
            <button type="button" class="step-btn step-minus">-</button>
            <input type="tel" id="${attr}" class="attr-base" value="0" inputmode="numeric">
            <button type="button" class="step-btn step-plus">+</button>
          </div>
        </td>
        <td><input type="number" id="${attr}_racial" class="attr-racial" value="0" style="width:75px;" readonly></td>
        <td class="outros-col"><input type="number" id="${attr}_outros" class="attr-outros" value="0" style="width:75px;"></td>
        <td id="total_${attr}" class="total-col">0</td>`;
            attributeTableBody.appendChild(row);

            const base = row.querySelector(`#${attr}`);
            const outros = row.querySelector(`#${attr}_outros`);
            const nudge = (d) => { base.dataset.previousValue = base.value; base.value = String((parseInt(base.value || '0', 10) || 0) + d); validatePoints({ target: base }); };
            row.querySelector('.step-minus').addEventListener('click', () => nudge(-1));
            row.querySelector('.step-plus').addEventListener('click', () => nudge(+1));
            base.addEventListener('focusin', (e) => { e.target.dataset.previousValue = e.target.value; });
            base.addEventListener('input', (e) => validateMinMax(e.target));
            base.addEventListener('change', validatePoints);
            outros.addEventListener('change', updateAll);
        });
    }

    // ── VALIDAÇÃO ─────────────────────────────────────────────
    function validateMinMax(input) {
        if (input.value === '' || input.value === '-') return;
        const v = parseInt(input.value, 10);
        if (isNaN(v)) input.value = input.dataset.previousValue;
        else if (v < -1) input.value = -1;
        else if (v > 4) input.value = 4;
    }

    function validatePoints(event) {
        const input = event.target;
        let v = parseInt(input.value, 10);
        if (isNaN(v) || input.value.trim() === '') { input.value = input.dataset.previousValue; flashInvalid(input); }
        else { v = Math.max(-1, Math.min(4, v)); input.value = v; }
        if (calculateAvailablePoints() < 0) { input.value = input.dataset.previousValue; flashInvalid(input); }
        updateAll();
    }

    function flashInvalid(el) {
        if (!el) return;
        el.classList.remove('flash-invalid'); void el.offsetWidth; el.classList.add('flash-invalid');
        setTimeout(() => el.classList.remove('flash-invalid'), 700);
    }

    // ── PONTOS ────────────────────────────────────────────────
    const costTable = { '-1': -1, '0': 0, '1': 1, '2': 2, '3': 4, '4': 7 };

    function calculateAvailablePoints() {
        let cost = 0;
        ATTRIBUTES.forEach(attr => { const v = parseInt(document.getElementById(attr).value); if (!isNaN(v)) cost += costTable[v] || 0; });
        return (togglePontos.checked ? (parseInt(pontosInput.value, 10) || basePoints) : basePoints) - cost;
    }

    function getPointUsage() {
        let spent = 0;
        ATTRIBUTES.forEach(attr => { const v = parseInt(document.getElementById(attr).value, 10); if (!isNaN(v)) spent += costTable[v] ?? 0; });
        const base = togglePontos.checked ? (parseInt(pontosInput.value, 10) || basePoints) : basePoints;
        return { base, spent, available: base - spent };
    }

    function updateAll() { updateTotals(); updateAvailablePoints(); saveState(); }

    function updateTotals() {
        ATTRIBUTES.forEach(attr => {
            const b = parseInt(document.getElementById(attr).value) || 0;
            const r = parseInt(document.getElementById(`${attr}_racial`).value) || 0;
            const o = parseInt(document.getElementById(`${attr}_outros`).value) || 0;
            document.getElementById(`total_${attr}`).textContent = b + r + o;
        });
    }

    function updateAvailablePoints() {
        const { base, spent, available } = getPointUsage();
        pontosDisponiveisSpan.textContent = available;
        pontosDisponiveisSpan.style.color = available < 0 ? 'red' : 'black';
        const te = document.getElementById('pontos_total');
        const ge = document.getElementById('pontos_gastos');
        if (te) te.textContent = base;
        if (ge) ge.textContent = spent;
        if (available < 0) { pontosDisponiveisSpan.classList.remove('points-pulse'); void pontosDisponiveisSpan.offsetWidth; pontosDisponiveisSpan.classList.add('points-pulse'); }
    }

    // ── APLICAR ATRIBUTOS RACIAIS ─────────────────────────────
    function applyRaceAttributes(attrs, isChoice, choiceCount, lockedAttrs = [], maxPerAttr = 1) {
        // 1. Reseta e limpa todos os inputs raciais antes de aplicar a nova raça
        document.querySelectorAll('input.attr-racial').forEach(input => {
            const newEl = input.cloneNode(true);
            input.parentNode.replaceChild(newEl, input);
            const attrName = newEl.id.replace('_racial', '');

            newEl.value = attrs[attrName] || 0;
            newEl.readOnly = true;
            newEl.disabled = true;
            newEl.classList.remove('disabled'); // Limpa classe de bloqueio
            newEl.min = '';
            newEl.max = '';
        });

        if (!isChoice) return;

        const editables = document.querySelectorAll('input.attr-racial');

        editables.forEach(input => {
            const attrName = input.id.replace('_racial', '');

            // Se o atributo for travado (como o Carisma do Yidishan/Meio-Elfo), ignora
            if (lockedAttrs.includes(attrName)) return;

            const baseValRaca = attrs[attrName] || 0;
            input.disabled = false;
            input.readOnly = false;
            input.min = String(baseValRaca);
            input.max = String(baseValRaca + maxPerAttr);

            // Armazena valor para validação de estouro de pontos
            input.addEventListener('focusin', e => {
                e.target.dataset.previousValue = e.target.value;
            });

            input.addEventListener('change', e => {
                const inp = e.target;
                const min = parseInt(inp.min, 10), max = parseInt(inp.max, 10);
                let v = parseInt(inp.value, 10);

                // Validação de limites individuais do input
                if (isNaN(v) || v < min) v = min;
                else if (v > max) v = max;
                inp.value = v;

                // Cálculo de quantos pontos foram distribuídos no total
                let totalSpent = 0;
                editables.forEach(i => {
                    const attrKey = i.id.replace('_racial', '');
                    const valorBaseOriginal = attrs[attrKey] || 0;
                    let valorAtual = parseInt(i.value, 10);
                    if (isNaN(valorAtual)) valorAtual = valorBaseOriginal;
                    totalSpent += (valorAtual - valorBaseOriginal);
                });

                // Se estourar o limite de pontos da raça
                if (totalSpent > choiceCount) {
                    alert(`Você só pode distribuir ${choiceCount} pontos!`);
                    inp.value = inp.dataset.previousValue || min;

                    // Recalcula o total gasto após o "rollback"
                    totalSpent = 0;
                    editables.forEach(i => {
                        const attrKey = i.id.replace('_racial', '');
                        const vBase = attrs[attrKey] || 0;
                        totalSpent += (parseInt(i.value, 10) - vBase);
                    });
                } else {
                    inp.dataset.previousValue = inp.value;
                }

                // --- LÓGICA DE FEEDBACK VISUAL (CAIXAS CINZAS) ---
                editables.forEach(i => {
                    const currentAttr = i.id.replace('_racial', '');
                    if (lockedAttrs.includes(currentAttr)) return;

                    const vBaseOriginal = attrs[currentAttr] || 0;
                    const vAtual = parseInt(i.value, 10) || 0;

                    if (totalSpent >= choiceCount) {
                        // Se pontos acabaram e este campo está zerado/base, desabilita e fica cinza
                        if (vAtual === vBaseOriginal) {
                            i.classList.add('disabled');
                            i.disabled = true;
                        } else {
                            // Se tem ponto aqui, mantém habilitado para permitir reduzir
                            i.classList.remove('disabled');
                            i.disabled = false;
                        }
                    } else {
                        // Se ainda tem pontos, libera todos os campos editáveis
                        i.classList.remove('disabled');
                        i.disabled = false;
                    }
                });

                updateAll(); // Atualiza os totais da tabela e pontos de compra
            });
        });
    }

    // ── RENDERIZAR PODERES RACIAIS (sanfona) ──────────────────
    // race.racialPowers = poderes base (fixos)
    // dynamicPowers = poderes das seleções do usuário (Golem, Aberrante, etc.)
    function renderRacialPowers(race, dynamicPowers = []) {
        const list = document.getElementById('racial-powers-list');
        if (!list) return;
        list.innerHTML = '';

        // Nomes dos poderes dinâmicos (para esconder duplicatas)
        const dynamicNames = new Set(dynamicPowers.map(p => p.name.split(' (')[0]));

        // Filtrar poderes estáticos que não devem aparecer quando há dinâmico
        const staticPowers = (race?.racialPowers || []).filter(p => !dynamicNames.has(p.name));

        const all = [...staticPowers, ...dynamicPowers];
        _currentRacialPowers = all; // guarda para export

        all.forEach(power => {
            if (power.desc && power.desc.trim() !== '') {
                const d = document.createElement('details');
                d.className = 'fold';
                d.innerHTML = `<summary class="fold-summary">${power.name}<span class="fold-hint">ver descrição</span></summary><div class="fold-body">${power.desc}</div>`;
                list.appendChild(d);
            } else {
                const p = document.createElement('p');
                p.className = 'racial-power-name';
                p.textContent = power.name;
                list.appendChild(p);
            }
        });
    }

    // ── TROCA DE RAÇA ─────────────────────────────────────────
    function handleRaceChange() {
        const raceId = racaSelect.value;
        const race = RACE_DATA[raceId];
        const customUI = document.getElementById('race-specific-options');
        customUI.innerHTML = '';
        document.getElementById('bonusMessage').innerHTML = '';
        document.getElementById('attribute-table').style.background = '';
        document.getElementById('racial-powers-list').innerHTML = '';
        _currentRacialPowers = [];

        if (!race || raceId === 'outros') { applyRaceAttributes({}, false, 0); updateAll(); return; }

        // bonusMessage mostra APENAS bônus de atributos
        document.getElementById('bonusMessage').innerHTML = race.bonusMessage || '';
        if (race.imageUrl) {
            document.getElementById('attribute-table').style.background = `url('${race.imageUrl}') no-repeat center center`;
            document.getElementById('attribute-table').style.backgroundSize = '75% auto';
        }

        if (race.createCustomUi) race.createCustomUi(customUI);

        const updateFn = window[`update${raceId.charAt(0).toUpperCase() + raceId.slice(1)}Attributes`];
        if (typeof updateFn === 'function') {
            updateFn();
        } else {
            applyRaceAttributes(race.attributes, race.isChoice, race.choiceCount, race.lockedChoiceAttributes, race.maxChoicePerAttribute);
            renderRacialPowers(race);
        }
        updateAll();
    }

    // ── SURAGEL ───────────────────────────────────────────────
    function createSuragelUi(container) {
        const herancaOptions = Object.keys(SURAGEL_HERANCAS).map(k => `<option value="${k}">${k}</option>`).join('');
        container.innerHTML = `
        <div class="checklist" style="margin-top:10px">
            <label class="check"><input type="checkbox" id="suragel-variante"><span>Suragel Variante (Deuses de Arton)</span></label>
        </div>
        <div id="suragel-heranca-container" class="hidden mt-2">
            <label class="field-label" for="suragel-heranca" style="display:block;margin:8px 0 6px">
                <span class="section-title" style="font-size:18px">Herança</span>
            </label>
            <select id="suragel-heranca">${herancaOptions}</select>
        </div><br>`;
        container.querySelector('#suragel-variante').addEventListener('change', updateSuragelAttributes);
        container.querySelector('#suragel-heranca').addEventListener('change', updateSuragelAttributes);
    }

    function updateAggelusAttributes() { updateSuragelAttributes(); }
    function updateSulfureAttributes() { updateSuragelAttributes(); }

    function updateSuragelAttributes() {
        const raceId = racaSelect.value;
        const race = RACE_DATA[raceId];
        if (raceId !== 'aggelus' && raceId !== 'sulfure') return;

        const isVariante = document.getElementById('suragel-variante')?.checked;
        document.getElementById('suragel-heranca-container').classList.toggle('hidden', !isVariante);

        let currentAttrs = { ...race.attributes };
        document.getElementById('bonusMessage').innerHTML = race.bonusMessage || '';

        // Filtragem de Poderes
        let basePowers = [...race.racialPowers];
        const dynamicPowers = [];

        if (isVariante) {
            // Se for variante, removemos Luz Sagrada ou Sombras Profanas da lista base
            basePowers = basePowers.filter(p =>
                p.name !== 'Luz Sagrada' && p.name !== 'Sombras Profanas'
            );

            const herancaKey = document.getElementById('suragel-heranca')?.value;
            const herancaData = SURAGEL_HERANCAS[herancaKey];
            if (herancaData) {
                dynamicPowers.push({
                    name: `Herança de ${herancaKey}`,
                    desc: herancaData.description
                });
                if (herancaData.action) currentAttrs = herancaData.action(currentAttrs);
            }
        }

        applyRaceAttributes(currentAttrs, race.isChoice, race.choiceCount, race.lockedChoiceAttributes, race.maxChoicePerAttribute);

        // Criamos um objeto temporário para o renderizador com os poderes filtrados + a herança
        const temporaryRaceData = {
            ...race,
            racialPowers: basePowers
        };

        renderRacialPowers(temporaryRaceData, dynamicPowers);
        updateAll();
    }

    // ── VAMPIRO ────────────────────────────────────────────────
    function createVampiroUi(container) {
        if (typeof VAMPIRO_BENCAOS === 'undefined') return;
        const entries = Object.entries(VAMPIRO_BENCAOS);

        const humanoidRaces = Object.entries(RACE_DATA)
            .filter(([key, r]) => r.raca === 'Humanoide' && key !== 'vampiro')
            .map(([key, r]) => `<option value="${key}">${r.name}</option>`)
            .join('');

        container.innerHTML = `
        <details class="fold" style="margin-top:12px">
            <summary class="fold-summary">Bênção Vampírica <span class="fold-hint">Escolha 1</span></summary>
            <div class="checklist fold-body">
            <p style="margin:0 0 8px">Escolha um dos poderes a seguir. Você pode escolher outros desses poderes no lugar de poderes de classe.</p>
            ${entries.map(([key, b]) => `
                <div class="bencao-item">
                    <label class="check">
                        <input type="checkbox" class="vampiro-bencao" data-key="${key}">
                        <span>${b.name}</span>
                        <span class="bencao-desc-toggle" data-toggle="${key}" title="Ver descrição">?</span>
                    </label>
                    <div class="bencao-desc-body" id="desc-vampiro-${key}">${b.desc}</div>
                </div>`).join('')}
            </div>
        </details>
        <details class="fold" style="margin-top:12px">
            <summary class="fold-summary">Resquícios da Outra Vida <span class="fold-hint">ver descrição</span></summary>
            <div class="fold-body">
                <p style="margin:0 0 8px">Torna-se treinado em uma perícia ou recebe um poder geral. Como alternativa, pode herdar uma raça humanoide.</p>
                <label class="check" style="margin-bottom:8px">
                    <input type="checkbox" id="vampiro-resquicios">
                    <span>Herdar raça humanoide</span>
                </label>
                <div id="vampiro-race-select" class="hidden" style="margin-bottom:8px">
                    <label for="vampiro-race">Raça:</label>
                    <select id="vampiro-race">
                        <option value="">Selecione</option>
                        ${humanoidRaces}
                    </select>
                </div>
                <div id="vampiro-power-select" class="hidden" style="margin-bottom:8px">
                    <label for="vampiro-power">Poder Herdado:</label>
                    <select id="vampiro-power">
                        <option value="">Selecione</option>
                    </select>
                </div>
                <div id="vampiro-power-checklist" class="hidden" style="margin-bottom:8px">
                    <label><b>Poderes Herdados</b> <span class="fold-hint">Escolha até 1</span></label>
                    <div id="vampiro-mutation-container" class="checklist"></div>
                </div>
                <div id="vampiro-resquicios-info" class="hidden" style="margin-top:8px;padding:10px;background:rgba(0,0,0,0.2);border-radius:6px;font-size:13px;color:var(--text-secondary)"></div>
            </div>
        </details>`;

        container.querySelectorAll('.bencao-desc-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const desc = document.getElementById('desc-vampiro-' + btn.dataset.toggle);
                if (desc) desc.classList.toggle('active');
            });
        });

        container.querySelectorAll('.vampiro-bencao').forEach(cb => {
            cb.addEventListener('change', () => {
                if (cb.checked) {
                    container.querySelectorAll('.vampiro-bencao').forEach(other => {
                        if (other !== cb) other.checked = false;
                    });
                }
                updateVampiroAttributes();
            });
        });

        // Resquícios da Outra Vida
        const populateVampiroPowers = () => {
            const raceKey = document.getElementById('vampiro-race')?.value;
            const powerSelect = document.getElementById('vampiro-power');
            const selectDiv = document.getElementById('vampiro-power-select');
            const checklistDiv = document.getElementById('vampiro-power-checklist');
            const checklistContainer = document.getElementById('vampiro-mutation-container');
            const race = raceKey ? RACE_DATA[raceKey] : null;
            const config = getInheritablePowerConfig(race);

            powerSelect.innerHTML = '<option value="">Selecione</option>';
            checklistContainer.innerHTML = '';
            selectDiv.classList.add('hidden');
            checklistDiv.classList.add('hidden');

            if (!config) return;

            if (config.type === 'checklist') {
                checklistContainer.innerHTML = config.options.map(o => `
                    <div class="bencao-item">
                        <label class="check">
                            <input type="checkbox" class="vampiro-mut" id="vampiro-mut-${o.id}" value="${o.id}">
                            <span>${o.name}</span>
                            <span class="bencao-desc-toggle" data-toggle="${o.id}" title="Ver descrição">?</span>
                        </label>
                        <div class="bencao-desc-body" id="desc-vampiro-mut-${o.id}">${o.desc || ''}</div>
                    </div>`).join('');
                checklistContainer.querySelectorAll('.bencao-desc-toggle').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const desc = document.getElementById('desc-vampiro-mut-' + btn.dataset.toggle);
                        if (desc) desc.classList.toggle('active');
                    });
                });
                checklistContainer.querySelectorAll('.vampiro-mut').forEach(cb => {
                    cb.addEventListener('change', () => {
                        const count = checklistContainer.querySelectorAll('.vampiro-mut:checked').length;
                        if (count > 1) {
                            alert('Você só pode herdar até 1 poder!');
                            cb.checked = false;
                        }
                        updateVampiroAttributes();
                    });
                });
                checklistDiv.classList.remove('hidden');
            } else {
                config.options.forEach((p, i) => {
                    const opt = document.createElement('option');
                    opt.value = i;
                    opt.textContent = p.name;
                    powerSelect.appendChild(opt);
                });
                selectDiv.classList.remove('hidden');
            }
        };

        container.querySelector('#vampiro-resquicios').addEventListener('change', (e) => {
            const checked = e.target.checked;
            document.getElementById('vampiro-race-select').classList.toggle('hidden', !checked);
            document.getElementById('vampiro-power-select').classList.add('hidden');
            document.getElementById('vampiro-power-checklist').classList.add('hidden');
            updateVampiroAttributes();
        });
        container.querySelector('#vampiro-race').addEventListener('change', () => {
            populateVampiroPowers();
            updateVampiroAttributes();
        });
        container.querySelector('#vampiro-power').addEventListener('change', updateVampiroAttributes);
    }

    function updateVampiroAttributes() {
        const raceId = racaSelect.value;
        if (raceId !== 'vampiro') return;
        const race = RACE_DATA[raceId];

        applyRaceAttributes(race.attributes, race.isChoice, race.choiceCount, race.lockedChoiceAttributes, race.maxChoicePerAttribute);

        const dynamicPowers = [];
        document.querySelectorAll('.vampiro-bencao:checked').forEach(cb => {
            const key = cb.dataset.key;
            const bencao = VAMPIRO_BENCAOS[key];
            if (bencao) dynamicPowers.push({ name: bencao.name, desc: bencao.desc });
        });

        // Resquícios da Outra Vida
        const resquiciosChecked = document.getElementById('vampiro-resquicios')?.checked;
        const resquiciosRaceKey = document.getElementById('vampiro-race')?.value;
        const selectedRace = resquiciosRaceKey ? RACE_DATA[resquiciosRaceKey] : null;
        const config = resquiciosChecked && selectedRace ? getInheritablePowerConfig(selectedRace) : null;

        let resquiciosLabel = null;
        if (config?.type === 'checklist') {
            const selectedIds = Array.from(document.querySelectorAll('.vampiro-mut:checked')).map(cb => cb.value);
            const tamanho = getInheritedTamanho(resquiciosRaceKey, null);
            if (selectedIds.length) {
                selectedIds.forEach(id => {
                    const opt = config.options.find(o => o.id === id);
                    dynamicPowers.push({
                        name: `Resquícios da Outra Vida (${selectedRace.name})`,
                        desc: `Você herda a habilidade "${opt.name}" da raça ${selectedRace.name} e seu tamanho (${tamanho}). ${opt.desc}`
                    });
                });
            } else {
                dynamicPowers.push({
                    name: `Resquícios da Outra Vida (${selectedRace.name})`,
                    desc: `Você herda habilidades da raça ${selectedRace.name} e seu tamanho (${tamanho}).`
                });
            }
            resquiciosLabel = selectedRace.name;
        } else if (config) {
            const powerIndex = document.getElementById('vampiro-power')?.value;
            const power = powerIndex !== '' ? config.options[parseInt(powerIndex)] : null;
            const tamanho = getInheritedTamanho(resquiciosRaceKey, power);
            dynamicPowers.push({
                name: `Resquícios da Outra Vida (${selectedRace.name})`,
                desc: power
                    ? `Você herda a habilidade "${power.name}" da raça ${selectedRace.name} e seu tamanho (${tamanho}). ${power.desc}`
                    : `Você herda uma habilidade da raça ${selectedRace.name} e seu tamanho (${tamanho}).`
            });
            resquiciosLabel = selectedRace.name;
        } else if (resquiciosChecked) {
            dynamicPowers.push({
                name: 'Resquícios da Outra Vida',
                desc: 'Você se torna treinado em uma perícia ou recebe um poder geral. Alternativamente, pode herdar uma raça humanoide.'
            });
        }

        // Exibe descrição do poder herdado dentro do fold
        const resquiciosInfo = document.getElementById('vampiro-resquicios-info');
        if (resquiciosInfo) {
            const resquiciosPower = dynamicPowers.find(p => p.name.startsWith('Resquícios'));
            if (resquiciosPower) {
                resquiciosInfo.innerHTML = `<b>${resquiciosPower.name}</b><br>${resquiciosPower.desc}`;
                resquiciosInfo.classList.remove('hidden');
            } else {
                resquiciosInfo.innerHTML = '';
                resquiciosInfo.classList.add('hidden');
            }
        }

        document.getElementById('bonusMessage').innerHTML =
            'Carisma +1, +1 em dois atributos diferentes (exceto Constituição), Constituição −1' +
            (resquiciosLabel ? `<br><b>Resquícios:</b> ${resquiciosLabel}` : '');

        renderRacialPowers(race, dynamicPowers);
        updateAll();
    }

    // ── FEÉRICO ────────────────────────────────────────────────
    function createFeericoUi(container) {
        if (typeof FEERICO_BENCAOS === 'undefined') return;
        const entries = Object.entries(FEERICO_BENCAOS);
        container.innerHTML = `
        <details class="fold" style="margin-top:12px">
            <summary class="fold-summary">Bênção das Fadas <span class="fold-hint">Escolha 4</span></summary>
            <div class="checklist fold-body">
            <p style="margin:0 0 8px">Escolha quatro bênçãos. Você pode escolher outras dessas bênçãos no lugar de poderes de classe.</p>
            ${entries.map(([key, b]) => `
                <div class="bencao-item">
                    <label class="check">
                        <input type="checkbox" class="feerico-bencao" data-key="${key}">
                        <span>${b.name}</span>
                        <span class="bencao-desc-toggle" data-toggle="${key}" title="Ver descrição">?</span>
                    </label>
                    <div class="bencao-desc-body" id="desc-feerico-${key}">${b.desc}</div>
                </div>`).join('')}
            </div>
        </details>`;

        container.querySelectorAll('.bencao-desc-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const desc = document.getElementById('desc-feerico-' + btn.dataset.toggle);
                if (desc) desc.classList.toggle('active');
            });
        });

        container.querySelectorAll('.feerico-bencao').forEach(cb => {
            cb.addEventListener('change', () => {
                const checked = container.querySelectorAll('.feerico-bencao:checked');
                if (checked.length > 4) {
                    cb.checked = false;
                    alert('Você só pode escolher 4 bênçãos!');
                }
                updateFeericoAttributes();
            });
        });
    }

    function updateFeericoAttributes() {
        const raceId = racaSelect.value;
        if (raceId !== 'feerico') return;
        const race = RACE_DATA[raceId];
        if (!race?.calculateAttributes) return;

        const { baseAttributes, isChoice, choiceCount, selectedPowers } = race.calculateAttributes();

        applyRaceAttributes(baseAttributes, isChoice, choiceCount);

        renderRacialPowers(race, selectedPowers);
        updateAll();
    }

    // Vincula createCustomUi após definição (script.js carrega depois de racas_dragaobrasil.js)
    if (RACE_DATA.vampiro) RACE_DATA.vampiro.createCustomUi = createVampiroUi;
    if (RACE_DATA.feerico) RACE_DATA.feerico.createCustomUi = createFeericoUi;

    // ── UPDATE FUNÇÕES ─────────────────────────────────────────
    function updateGolemAttributes() {
        const raceId = racaSelect.value;
        const race = RACE_DATA[raceId];
        if (raceId !== 'golem') return;

        // Capturamos todos os dados processados pelo calculateAttributes do Golem
        const { baseAttributes, isChoice, choiceCount, maxChoicePerAttribute, selectedPowers } = race.calculateAttributes();

        // 1. Aplicamos os atributos (isso cuida da tabela e dos inputs de escolha)
        applyRaceAttributes(baseAttributes, isChoice, choiceCount, race.lockedChoiceAttributes, maxChoicePerAttribute);

        // 2. Renderizamos os poderes (passamos o objeto da raça e a lista de poderes dinâmicos)
        // O renderizador vai juntar os poderes fixos com os que o Golem "montou" agora
        renderRacialPowers(race, selectedPowers);

        // 3. Atualizamos o restante da UI
        updateAll();
    }

    function updateAberrantAttributes() {
        const race = RACE_DATA.aberrant;
        if (!race?.calculateAttributes) return;
        const r = race.calculateAttributes();
        applyRaceAttributes(r.baseAttributes, r.isChoice, r.choiceCount);
        renderRacialPowers(race, []);
        updateAll();
    }

    function updateKallyanachAttributes() {
        const race = RACE_DATA.kallyanach;
        // aplica atributos de escolha normalmente
        applyRaceAttributes(race.attributes, race.isChoice, race.choiceCount, race.lockedChoiceAttributes, race.maxChoicePerAttribute);
        // renderiza poderes dinâmicos pelo getter
        renderRacialPowers(race, race.getSelectedPowers());
        updateAll();
    }

    function updateKoboldAttributes() {
        const race = RACE_DATA.kobold;
        if (!race?.calculateAttributes) return;
        race.calculateAttributes();
        renderRacialPowers(race, []);
        updateAll();
    }

    function updateMoreauAttributes() {
        const race = RACE_DATA.moreau;
        if (!race?.calculateAttributes) return;
        const r = race.calculateAttributes();
        applyRaceAttributes(r.baseAttributes, r.isChoice, r.choiceCount, [], r.maxChoicePerAttribute);
        renderRacialPowers(race, r.selectedPowers || []);
        updateAll();
    }

    function updateDuendeAttributes() {
        const race = RACE_DATA.duende;
        if (!race?.calculateAttributes) return;
        const r = race.calculateAttributes();
        applyRaceAttributes(r.baseAttributes, r.isChoice, r.choiceCount, [], r.maxChoicePerAttribute);
        renderRacialPowers(race, r.selectedPowers || []);
        updateAll();
    }

    function updateOsteonAttributes() {
        const race = RACE_DATA.osteon;
        if (!race?.calculateAttributes) return;
        const r = race.calculateAttributes();
        applyRaceAttributes(r.baseAttributes, r.isChoice, r.choiceCount, r.lockedChoiceAttributes, r.maxChoicePerAttribute);
        renderRacialPowers(race, r.selectedPowers || []);
        updateAll();
    }
    function updateYidishanAttributes() {
        const race = RACE_DATA.yidishan;
        if (!race?.calculateAttributes) return;
        const r = race.calculateAttributes();
        applyRaceAttributes(r.baseAttributes, r.isChoice, r.choiceCount, r.lockedChoiceAttributes, r.maxChoicePerAttribute);
        renderRacialPowers(race, r.selectedPowers || []);
        updateAll();
    }

    // ── FILTRO ────────────────────────────────────────────────
    function handleFilterChange() {
        const sel = new Set();
        document.querySelectorAll('.race-filter:checked').forEach(cb => sel.add(cb.dataset.raceType));
        const selectedRaceId = racaSelect.value;
        Array.from(racaSelect.options).forEach(opt => {
            if (opt.value === 'outros') { opt.style.display = 'block'; return; }
            const rd = RACE_DATA[opt.value];
            if (rd) {
                // Nunca esconde a raça que está atualmente selecionada (permite raças fora do filtro serem salvas)
                const visivel = rd.type === 'base' || sel.has(rd.type) || opt.value === selectedRaceId;
                opt.style.display = visivel ? 'block' : 'none';
            }
        });
        if (racaSelect.options[racaSelect.selectedIndex]?.style.display === 'none') {
            racaSelect.value = 'outros'; handleRaceChange();
        }
    }

    // ── RESET ─────────────────────────────────────────────────
    function smartReset() {
        if (!confirm("Deseja resetar todos os campos?")) return;

        // 1. Desmarcar todos os checkboxes de raças adicionais
        document.querySelectorAll('#race-specific-options input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });

        // 2. Resetar todos os selects de raças adicionais
        document.querySelectorAll('#race-specific-options select').forEach(sel => {
            sel.selectedIndex = 0;
        });

        // 3. Voltar raça para "outros"
        racaSelect.value = 'outros';
        handleRaceChange();

        // 4. Zerar distribuição de pontos
        ATTRIBUTES.forEach(attr => {
            document.getElementById(attr).value = 0;
            document.getElementById(`${attr}_racial`).value = 0;
            document.getElementById(`${attr}_outros`).value = 0;
        });

        // 5. Resetar pontos para o padrão
        basePoints = 10;
        togglePontos.checked = false;
        pontosInput.classList.add('hidden');
        salvarPontosBtn.classList.add('hidden');

        // 6. Limpar estado salvo e atualizar
        localStorage.removeItem('t20_calc_state');
        updateAll();
    }

    // ── DRAG ──────────────────────────────────────────────────
    function makeDraggable(el) {
        let dragging = false, ox, oy;
        el.addEventListener('mousedown', e => {
            if (['INPUT', 'SELECT', 'BUTTON', 'LABEL', 'SPAN'].includes(e.target.tagName)) return;
            dragging = true; ox = e.clientX - el.offsetLeft; oy = e.clientY - el.offsetTop; el.style.cursor = 'grabbing';
        });
        document.addEventListener('mousemove', e => { if (dragging) { el.style.left = `${e.clientX - ox}px`; el.style.top = `${e.clientY - oy}px`; } });
        document.addEventListener('mouseup', () => { dragging = false; el.style.cursor = 'move'; });
    }

    function saveState() {
        const state = {
            racaId: racaSelect.value,
            basePoints: basePoints,
            // Salva quais filtros de livros estão ativos
            filtrosLivros: Array.from(document.querySelectorAll('.race-filter')).map(cb => ({
                id: cb.id,
                checked: cb.checked
            })),
            baseAttributes: ATTRIBUTES.reduce((acc, attr) => {
                acc[attr] = document.getElementById(attr).value;
                return acc;
            }, {}),
            outrosAttributes: ATTRIBUTES.reduce((acc, attr) => {
                acc[attr] = document.getElementById(`${attr}_outros`).value;
                return acc;
            }, {}),
            customChoices: Array.from(document.querySelectorAll('#race-specific-options input, #race-specific-options select')).map(el => ({
                id: el.id,
                value: el.type === 'checkbox' ? el.checked : el.value
            })),
            racialChoices: ATTRIBUTES.reduce((acc, attr) => {
                acc[attr] = document.getElementById(`${attr}_racial`).value;
                return acc;
            }, {}),
            configColOutros: document.getElementById('toggleOutrosInput').checked
        };
        localStorage.setItem('t20_calc_state', JSON.stringify(state));
    }

    function loadState() {
        const saved = localStorage.getItem('t20_calc_state');
        if (!saved) return;
        const state = JSON.parse(saved);

        // 1. Restaura os filtros de livros
        if (state.filtrosLivros) {
            state.filtrosLivros.forEach(f => {
                const cb = document.getElementById(f.id);
                if (cb) cb.checked = f.checked;
            });
        }

        // 2. Atualiza a visibilidade do select (isso esconde o que não está nos filtros)
        handleFilterChange();

        // 3. FORÇA a exibição da raça salva (mesmo que o filtro esteja desativado)
        const savedOption = Array.from(racaSelect.options).find(opt => opt.value === state.racaId);
        if (savedOption) {
            savedOption.style.display = 'block'; // Garante que ela exista visualmente
            racaSelect.value = state.racaId;
            handleRaceChange();
        }

        // 4. Restaura Pontos e Atributos
        basePoints = state.basePoints;
        ATTRIBUTES.forEach(attr => {
            document.getElementById(attr).value = state.baseAttributes[attr] || 0;
            document.getElementById(`${attr}_outros`).value = state.outrosAttributes[attr] || 0;
        });

        // 5. Restaura UI específica da raça com um delay para o DOM carregar
        setTimeout(() => {
            state.customChoices.forEach(choice => {
                const el = document.getElementById(choice.id);
                if (el) {
                    if (el.type === 'checkbox') el.checked = choice.value;
                    else el.value = choice.value;
                    el.dispatchEvent(new Event('change'));
                }
            });

            // Restaura bônus raciais editáveis (como Humano)
            ATTRIBUTES.forEach(attr => {
                const input = document.getElementById(`${attr}_racial`);
                if (input && state.racialChoices[attr]) {
                    input.value = state.racialChoices[attr];
                }
            });
            updateAll();
        }, 150);
    }

    // ── EXPORT PARA FICHA ────────────────────────────────────
    function enviarAtributosParaFicha() {
        const attrMap = { forca: 'FOR', destreza: 'DES', constituicao: 'CON', inteligencia: 'INT', sabedoria: 'SAB', carisma: 'CAR' };
        const atributos = {};
        ATTRIBUTES.forEach(a => { const el = document.getElementById(`total_${a}`); atributos[attrMap[a]] = el ? el.textContent : '0'; });

        const raceId = racaSelect.value;
        const race = RACE_DATA[raceId];
        const racaNome = race?.name?.split('/')[0] || '';

        let tamanho = race?.tamanho || 'Médio';
        const gt = document.getElementById('golem-tamanho'); if (gt?.value) tamanho = gt.value;
        const dt = document.getElementById('duende-tamanho'); if (dt?.value) tamanho = dt.value;

        const poderesRaciais = _currentRacialPowers.map(p => ({ name: p.name, desc: p.desc || '' }));

        let fichaData = JSON.parse(localStorage.getItem('t20SheetData') || '{}');
        if (!fichaData.attrs) fichaData.attrs = {};
        fichaData.attrs = { ...fichaData.attrs, ...atributos };
        if (racaNome) fichaData.charRace = racaNome;
        if (tamanho) fichaData.charSize = tamanho;

        // Salva em racialPowers (campo dedicado da ficha)
        fichaData.racialPowers = poderesRaciais;

        // Também envia para classAbilities — mesmo caminho do Compilado de Poderes (main-Poderes.js).
        // Remove envios anteriores da calculadora pelo nome para não duplicar ao reenviar.
        if (!fichaData.classAbilities) fichaData.classAbilities = [];
        if (poderesRaciais.length > 0) {
            const nomesPoderes = new Set(poderesRaciais.map(p => p.name));
            fichaData.classAbilities = fichaData.classAbilities.filter(p => !nomesPoderes.has(p.name));
            fichaData.classAbilities = [...poderesRaciais, ...fichaData.classAbilities];
        }

        localStorage.setItem('t20SheetData', JSON.stringify(fichaData));
        alert(`Atributos${racaNome ? ` e raça "${racaNome}"` : ''}${tamanho ? ` (${tamanho})` : ''} enviados!\n\nA ficha será aberta em uma nova aba.`);
        window.open('../ficha/', '_blank');
    }

    // ── EVENT LISTENERS ───────────────────────────────────────
    document.getElementById('reset-button').addEventListener('click', smartReset);
    document.getElementById('enviar-ficha-button').addEventListener('click', enviarAtributosParaFicha);
    document.querySelectorAll('.race-filter').forEach(cb => cb.addEventListener('change', handleFilterChange));
    racaSelect.addEventListener('change', handleRaceChange);

    // ── EXPOR AO GLOBAL (necessário para racas.js chamar via event listeners) ──
    window.updateAll = updateAll;
    window.applyRaceAttributes = applyRaceAttributes;
    window.renderRacialPowers = renderRacialPowers;
    window.createSuragelUi = createSuragelUi;
    window.updateGolemAttributes = updateGolemAttributes;
    window.updateAberrantAttributes = updateAberrantAttributes;
    window.updateKoboldAttributes = updateKoboldAttributes;
    window.updateMoreauAttributes = updateMoreauAttributes;
    window.updateDuendeAttributes = updateDuendeAttributes;
    window.updateAggelusAttributes = updateAggelusAttributes;
    window.updateSulfureAttributes = updateSulfureAttributes;
    window.updateKallyanachAttributes = updateKallyanachAttributes;
    window.updateOsteonAttributes = updateOsteonAttributes;
    window.updateYidishanAttributes = updateYidishanAttributes;
    window.updateVampiroAttributes = updateVampiroAttributes;
    window.updateFeericoAttributes = updateFeericoAttributes;

    // ── INICIALIZAÇÃO ─────────────────────────────────────────
    populateAttributeTable();
    hideOutrosColumn();
    populateRaceSelect();

    const params = new URLSearchParams(window.location.search);
    const urlRaceId = params.get('raca');
    if (urlRaceId && RACE_DATA[urlRaceId]) {
        applyUrlRace(urlRaceId);
    } else {
        loadState();
        handleRaceChange();
        handleFilterChange();
    }

    // ── URL: ?raca=KEY (vinda do compêndio) ──────────────────
    function applyUrlRace(raceId) {
        const raceType = RACE_DATA[raceId].type;
        // Marca o checkbox de filtro correspondente ao tipo da raça
        if (raceType && raceType !== 'base') {
            const filterCb = document.querySelector(`.race-filter[data-race-type="${raceType}"]`);
            if (filterCb) filterCb.checked = true;
        }
        handleFilterChange();

        // Seta a raça no select e limpa estado salvo (a URL tem prioridade)
        const opt = Array.from(racaSelect.options).find(o => o.value === raceId);
        if (opt) {
            opt.style.display = 'block';
            racaSelect.value = raceId;
            localStorage.removeItem('t20_calc_state');
            handleRaceChange();
        }
    }

});