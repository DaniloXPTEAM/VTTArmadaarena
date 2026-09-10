const container = document.getElementById('powersContainer');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.main-btn'); // Botões principais
const subFilterBtns = document.querySelectorAll('[data-subfilter]'); // Botões Habilidade/Poder
const pathBtns = document.querySelectorAll('[data-path]'); // Botões de Caminho (Bruxo/Mago/etc)
const classFiltersDiv = document.getElementById('classFilters');
const classSelector = document.getElementById('classSelector');
const togglePathsBtn = document.getElementById('togglePathsBtn');
const pathsWrap = document.getElementById('pathsWrap');
const racialFiltersDiv = document.getElementById('racialFilters');
const raceSelector = document.getElementById('raceSelector');

// MODAL
const modal = document.getElementById('powerModal');
const modalTitle = document.getElementById('modalTitle');
const modalType = document.getElementById('modalType');
const modalReq = document.getElementById('modalReq');
const modalDesc = document.getElementById('modalDesc');
const closeBtn = document.querySelector('.close-btn');

// Extrai todas as raças únicas dos poderes raciais e popula o select
function populateRaceSelector() {
    const racialPowers = powersData.filter(p => p.type === 'raca');
    const allRaces = new Set();
    racialPowers.forEach(p => {
        const cats = (p.category || '').split(',').map(s => s.trim());
        cats.forEach(c => { if (c) allRaces.add(c); });
    });
    const sorted = [...allRaces].sort((a, b) => a.localeCompare(b, 'pt-BR'));
    sorted.forEach(race => {
        const opt = document.createElement('option');
        opt.value = race;
        opt.textContent = race;
        raceSelector.appendChild(opt);
    });
}
if (raceSelector && powersData) populateRaceSelector();

// --- CONFIGURAÇÃO: Quais botões aparecem para qual classe ---
const classPaths = {
    'arcanista': ['arcanista-base', 'bruxo', 'feiticeiro', 'mago', 'necromante'],
    'inventor': ['inventor-base', 'alquimista'],
    'ladino': ['ladino-base', 'ventanista'],
    'lutador': ['lutador-base', 'atleta'],
    'nobre': ['nobre-base', 'burgues'],
    'bucaneiro': ['bucaneiro-base', 'duelista'],
    'druida': ['druida-base', 'ermitao'],
    'guerreiro': ['guerreiro-base', 'inovador'],
    'barbaro': ['barbaro-base', 'machadodepedra'],
    'bardo': ['bardo-base', 'magimarcialista'],
    'paladino': ['paladino-base', 'santo'],
    'cacador': ['cacador-base', 'seteiro', 'miragem'],
    'cavaleiro': ['cavaleiro-base', 'vassalo'],
    'clerigo': ['clerigo-base', 'usurpador'],
    'treinador': ['treinador-base', 'melhoramigo'],
    'frade': [],
    'mistico': [],
    'samurai': [] // Adicione esta linha
    // Classes sem variantes (Guerreiro, etc) não precisam estar aqui; o código esconderá os botões.
};

// ===== CLASSIFICAÇÃO DOS DEUSES =====
// Os nomes devem bater EXATAMENTE com o campo `category` do data.js
const DEUSES_MAIORES = new Set([
    'Aharadak', 'Allihanna', 'Arsenal', 'Azgher', 'Hyninn', 'Kallyadranoch',
    'Khalmyr', 'Lena', 'Lin-Wu', 'Marah', 'Megalokk', 'Nimb', 'Oceano',
    'Sszzaas', 'Tanna Toh', 'Tenebra', 'Thwor', 'Thyatis', 'Valkaria', 'Wynna'
]);

const DEUSES_MORTOS = new Set([
    'Ragnar', 'Glórienn', 'Tauron'
]);

const DEUSES_MENORES = new Set([
    'Gwendolynn', 'Mauziell', 'Tibar', 'A Espada Deus', 'Akok', 'Altair',
    'Anilatir', 'Apis', 'Artaphan', 'Ayllana', 'Beluhga', 'Benthos',
    'Betsumial', 'Blinar', 'Caerdellach', 'Canastra', 'Canora', 'Cette',
    'Champarr', 'Dahriol', 'Drumak', 'Dunsark', 'Elrophin', 'Escamandra',
    'Esmeralda', 'Garanaam', 'Garth', 'Goharom', 'Granto', 'Gratissa',
    'Hippion', 'Hurlaagh', 'Hydora', 'Inghlblhpholtsgt', 'Irione', 'Jandra',
    'Klangor', 'Kurur Lianth', 'Laan', 'Lamashtu', 'Lupan', 'Luvithy',
    'Marina', 'Mzzileyn', 'Nerelim', 'Neruíte', 'O Deus Cristal de Urielka',
    'O Deus das Cidades', 'O Deus do Medo', 'Piscigeros', 'Rhond', 'Sartan',
    'Sckhar', 'Sunnary', 'Tamagrah', 'Tessalus', 'Toris', 'Tukala', 'Ur',
    'Yasshara', 'Zadbblein', 'Zakharov', 'Drelene'
]);

// Estado Global
let cart = JSON.parse(localStorage.getItem('selectedPowers')) || [];

let state = {
    mainFilter: 'all',
    selectedClass: 'arcanista',
    subType: 'all',
    path: null,
    complicationFilter: 'all',
    godType: 'all',
    selectedGod: 'all',
    source: 'all',
    selectedRace: 'all'
};

// --- Verifica se poder já está no carrinho ---
function inCart(power) {
    return cart.some(p => p.name === power.name && p.type === power.type);
}

// --- UI: mostrar/ocultar "Caminhos" (filtro secundário) ---
function setPathsOpen(open) {
    if (!classFiltersDiv || !pathsWrap || !togglePathsBtn) return;
    classFiltersDiv.classList.toggle('show-paths', open);
    togglePathsBtn.classList.toggle('is-open', open);
    togglePathsBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    pathsWrap.setAttribute('aria-hidden', open ? 'false' : 'true');
}

if (togglePathsBtn) {
    togglePathsBtn.addEventListener('click', () => {
        const isOpen = classFiltersDiv.classList.contains('show-paths');
        setPathsOpen(!isOpen);
    });
}

// --- FUNÇÕES DE VISUALIZAÇÃO ---

// Função que controla quais botões de variante aparecem
function updatePathButtons() {
    // 1. Esconde todos os botões de caminho primeiro
    pathBtns.forEach(btn => {
        btn.style.display = 'none';
        btn.classList.remove('active'); // Remove o active de todos para resetar
    });

    // 2. Verifica se a classe selecionada tem caminhos configurados
    const allowedPaths = classPaths[state.selectedClass];

    if (allowedPaths && allowedPaths.length > 0) {
        // 3. Mostra os botões permitidos e seleciona o padrão
        const defaultPath = `${state.selectedClass}-base`; // Ex: 'arcanista-base'

        pathBtns.forEach(btn => {
            const btnPath = btn.getAttribute('data-path');
            if (allowedPaths.includes(btnPath)) {
                btn.style.display = 'inline-block';

                // --- NOVA LÓGICA: Marca como 'Padrão' automaticamente ---
                if (btnPath === defaultPath) {
                    btn.classList.add('active');
                    state.path = btnPath;
                }
            }
        });
    } else {
        // Se a classe não tem variantes, reseta o path do estado
        state.path = null;
    }

    // 4. UI: mostra/oculta o botão "Caminhos" se houver variantes visíveis
    if (togglePathsBtn && pathsWrap) {
        const anyVisible = Array.from(pathBtns).some(b => b.style.display !== 'none');
        togglePathsBtn.style.display = anyVisible ? 'inline-block' : 'none';

        // Abre automaticamente se houver caminhos para mostrar
        if (anyVisible) {
            setPathsOpen(true);
        } else {
            setPathsOpen(false);
        }
    }
}
// Renderização dos Cards
function renderPowers(powers) {
    container.innerHTML = '';

    if (powers.length === 0) {
        container.innerHTML = '<p style="text-align:center; width:100%; color:#777; margin-top:20px;">Nenhum item encontrado para os filtros atuais.</p>';
        return;
    }

    powers.forEach(power => {
        const card = document.createElement('div');

        let extraClass = '';
        if (power.type === 'tormenta') extraClass = 'type-tormenta';
        if (power.subType === 'ability') extraClass += ' type-ability';
        if (inCart(power)) extraClass += ' in-cart-highlight';

        card.className = `power-card ${extraClass}`;
        card.style.cursor = 'pointer';

        const sourceBadge = power.source && state.source !== 'all'
            ? `<span class="power-type source-badge">${translateSource(power.source)}</span>`
            : '';

        card.innerHTML = `
            <div class="power-header">
                <span class="power-name">${power.name}</span>
                <span class="power-type">${translateType(power)}</span>
                ${sourceBadge}
            </div>
            <div class="power-meta">
                <strong>Pré-requisito:</strong> ${power.req}
            </div>
            <div class="power-desc">
                ${power.desc} 
            </div>
            <div class="power-hint">Clique para ver detalhes</div>
        `;

        card.addEventListener('click', () => openModal(power, powers));
        container.appendChild(card);
    });
}

function translateType(power) {
    if (power.type === 'class') {
        let text = power.subType === 'ability' ? 'Habilidade' : 'Poder';
        if (power.pathReq && power.pathReq !== 'all' && power.pathReq !== 'inventor-base') {
            text += ` (${capitalize(power.pathReq)})`;
        }
        return text;
    }
    if (power.type === 'complication') {
        return power.class ? `Complicação (${capitalize(power.class)})` : 'Complicação Geral';
    }
    return power.category || power.type;
}

function translateSource(source) {
    const map = {
        't20': 'T20',
        'atlas': 'Atlas',
        'herois': 'Heróis de Arton',
        'ameacas': 'Ameaças de Arton',
        'jornada': 'Jornada Heróica',
        'outras': 'Outras Fontes'
    };
    return map[source] || source;
}

function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }

// Lógica de Filtro
function filterPowers() {
    const searchTerm = searchInput.value.toLowerCase();

    const filtered = powersData.filter(power => {
        // 1. Filtro Principal
        if (state.mainFilter !== 'all' && power.type !== state.mainFilter) return false;

        // 2. Logica de Classe
        if (state.mainFilter === 'class') {
            if (power.class !== state.selectedClass) return false;
            if (state.subType !== 'all' && power.subType !== state.subType) return false;

            // Lógica de Caminho (Path)
            if (state.path) {
                if (power.pathReq !== 'all' && power.pathReq !== state.path) return false;

                if (state.path === 'vassalo' && power.subType === 'power' && power.pathReq === 'all') {
                    return false;
                }
            } else {
                const isVariant = ['bruxo', 'feiticeiro', 'mago', 'necromante',
                    'inventor-base', 'alquimista',
                    'lutador-base', 'atleta',
                    'nobre-base', 'burgues',
                    'bucaneiro-base', 'duelista',
                    'druida-base', 'ermitao',
                    'guerreiro-base', 'inovador',
                    'barbaro-base', 'gigante',
                    'bardo-base', 'magimarcialista',
                    'paladino-base', 'santo',
                    'cacador-base', 'seteiro',
                    'cavaleiro-base', 'vassalo',
                    'clerigo-base', 'usurpador',
                    'treinador-base', 'melhoramigo',
                    'machadodepedra', 'miragem'].includes(power.pathReq);

                if (isVariant) return false;
            }
        }

        if (state.mainFilter === 'complication') {
            if (state.complicationFilter !== 'all' && power.category !== state.complicationFilter) return false;
        }

        // 3. Filtro de Deus Concedente
        if (state.mainFilter === 'conceded') {
            const cats = (power.category || '').split(',').map(s => s.trim());
            if (state.godType === 'maior' && !cats.some(g => DEUSES_MAIORES.has(g))) return false;
            if (state.godType === 'menor' && !cats.some(g => DEUSES_MENORES.has(g))) return false;
            if (state.godType === 'morto' && !cats.some(g => DEUSES_MORTOS.has(g))) return false;
            if (state.selectedGod !== 'all' && !cats.includes(state.selectedGod)) return false;
        }

        // 3.5 Filtro de Raça
        if (state.mainFilter === 'raca' && state.selectedRace !== 'all') {
            const cats = (power.category || '').split(',').map(s => s.trim());
            if (!cats.includes(state.selectedRace)) return false;
        }

        // 4. Filtro de Fonte
        if (state.source !== 'all') {
            const powerSource = power.source || 't20';
            if (powerSource !== state.source) return false;
        }

        // 5. Busca
        const matchesSearch = power.name.toLowerCase().includes(searchTerm) ||
            power.desc.toLowerCase().includes(searchTerm) ||
            power.req.toLowerCase().includes(searchTerm);

        return matchesSearch;
    });

    renderPowers(filtered);
}

// --- EVENT LISTENERS ---

// Botões Principais (Combate, Classe, etc)
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.mainFilter = btn.getAttribute('data-filter');

        if (state.mainFilter === 'class') {
            classFiltersDiv.style.display = 'block';
            updatePathButtons(); // ATUALIZA OS BOTÕES AO ENTRAR NA ABA
        } else {
            classFiltersDiv.style.display = 'none';
        }

        const compFiltersDiv = document.getElementById('complicationFilters');
        const notice = document.getElementById('complicationNotice');
        const concededFiltersDiv = document.getElementById('concededFilters');
        const sourceFiltersDiv = document.getElementById('sourceFilters');

        if (state.mainFilter === 'complication') {
            compFiltersDiv.style.display = 'flex';
            if (notice) notice.style.display = 'flex';
        } else {
            compFiltersDiv.style.display = 'none';
            if (notice) notice.style.display = 'none';
        }

        if (state.mainFilter === 'conceded') {
            concededFiltersDiv.style.display = 'flex';
            updateGodSelector(); // popula o select com os deuses corretos
        } else {
            concededFiltersDiv.style.display = 'none';
            // reseta estado dos deuses ao sair da aba
            state.godType = 'all';
            state.selectedGod = 'all';
        }

        if (state.mainFilter === 'raca') {
            racialFiltersDiv.style.display = 'flex';
        } else {
            racialFiltersDiv.style.display = 'none';
            state.selectedRace = 'all';
            if (raceSelector) raceSelector.value = 'all';
        }

        // Sempre mostra o filtro de fonte para poderes
        if (sourceFiltersDiv) {
            sourceFiltersDiv.style.display = 'flex';
        }

        filterPowers();
    });
});

const compFilterBtns = document.querySelectorAll('[data-compfilter]');

compFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        compFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.complicationFilter = btn.getAttribute('data-compfilter');
        filterPowers();
    });
});

// Filtro de Fonte dos Poderes
const sourceFiltersDiv = document.getElementById('sourceFilters');
const sourceFilterBtns = document.querySelectorAll('[data-source]');

sourceFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        sourceFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.source = btn.getAttribute('data-source');
        filterPowers();
    });
});

// Subfiltros (Habilidade/Poder)
subFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        subFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.subType = btn.getAttribute('data-subfilter');
        filterPowers();
    });
});

// Filtro de Raça
if (raceSelector) {
    raceSelector.addEventListener('change', () => {
        state.selectedRace = raceSelector.value;
        filterPowers();
    });
}

// Caminhos (Bruxo, Alquimista, etc)
pathBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const oldPath = state.path;
        if (btn.classList.contains('active')) {
            btn.classList.remove('active');
            state.path = null;
        } else {
            pathBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.path = btn.getAttribute('data-path');
        }
        
        // Remove habilidades do caminho antigo do carrinho
        if (oldPath && oldPath !== state.path) {
            cart = cart.filter(item => {
                if (item.type !== 'class') return true;
                if (item.class !== state.selectedClass) return true;
                if (item.subType !== 'ability') return true;
                if (item.pathReq !== oldPath) return true;
                return false;
            });
            renderCart();
        }
        
        filterPowers();
    });
});

// ===== FILTRO DE DEUSES =====
const godSelector = document.getElementById('godSelector');

/**
 * Popula o #godSelector com os deuses do tipo selecionado
 * e mostra/esconde o select conforme necessário.
 */
function updateGodSelector() {
    if (!godSelector) return;

    let lista = [];
    if (state.godType === 'maior') {
        lista = [...DEUSES_MAIORES].sort();
    } else if (state.godType === 'menor') {
        lista = [...DEUSES_MENORES].sort();
    } else if (state.godType === 'morto') {
        lista = [...DEUSES_MORTOS].sort();
    } else {
        lista = [...DEUSES_MAIORES, ...DEUSES_MENORES, ...DEUSES_MORTOS].sort();
    }

    godSelector.innerHTML = '<option value="all">-- Todos os Deuses --</option>' +
        lista.map(d => `<option value="${d}">${d}</option>`).join('');

    // garante que o valor selecionado ainda é válido
    if (state.selectedGod !== 'all' && !lista.includes(state.selectedGod)) {
        state.selectedGod = 'all';
    }
    godSelector.value = state.selectedGod;

    // mostra o select apenas quando há um tipo específico selecionado
    godSelector.style.display = lista.length > 0 && state.godType !== 'all' ? 'inline-block' : 'none';
}

// Radios Todos / Maiores / Menores
document.querySelectorAll('input[name="godType"]').forEach(radio => {
    radio.addEventListener('change', () => {
        state.godType = radio.value;
        state.selectedGod = 'all';
        updateGodSelector();
        filterPowers();
    });
});

// Select de deus específico
if (godSelector) {
    godSelector.addEventListener('change', () => {
        state.selectedGod = godSelector.value;
        filterPowers();
    });
}

// Seletor de Classe
classSelector.addEventListener('change', (e) => {
    const oldClass = state.selectedClass;
    state.selectedClass = e.target.value;
    state.path = null; // Reseta o caminho ao mudar de classe
    pathBtns.forEach(b => b.classList.remove('active'));

    // Remove habilidades da classe antiga do carrinho
    if (oldClass && oldClass !== state.selectedClass) {
        cart = cart.filter(item => {
            if (item.type !== 'class') return true;
            if (item.class !== oldClass) return true;
            if (item.subType !== 'ability') return true;
            return false;
        });
    }

    updatePathButtons(); // ATUALIZA QUAIS BOTÕES APARECEM
    filterPowers();
    renderCart();
});

searchInput.addEventListener('input', filterPowers);

// Função auxiliar para escapar caracteres especiais de Regex
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Lógica para encontrar relações (requisitos e desbloqueios) de um poder
function findPowerRelations(power) {
    const parents = [];
    const children = [];

    if (!power || !power.name) return { parents, children };

    // 1. Constrói o espaço de busca contendo TODOS os poderes do sistema (comuns e distinções)
    let allDistPowers = [];
    if (typeof distincoesData !== 'undefined') {
        distincoesData.forEach(d => {
            if (d.poderes) {
                d.poderes.forEach(p => {
                    allDistPowers.push({
                        name: p.name,
                        type: 'distinction-power',
                        category: `Poder (${d.name})`,
                        req: p.req,
                        desc: p.desc
                    });
                });
            }
        });
    }

    const searchSpace = [
        ...(typeof powersData !== 'undefined' ? powersData : []),
        ...allDistPowers
    ];

    // Helper para verificar se um requisito menciona um poder
    function isPrereq(parentName, reqStr) {
        if (!reqStr || reqStr === '-') return false;
        const normalizedReq = reqStr.toLowerCase();
        const normalizedParent = parentName.toLowerCase();
        
        const parts = normalizedReq.split(',').map(p => p.trim());
        return parts.some(part => {
            if (part === normalizedParent) return true;
            try {
                // Correspondência de palavra inteira (ignora se for apenas substring de outra palavra maior)
                const regex = new RegExp('\\b' + escapeRegExp(normalizedParent) + '\\b');
                return regex.test(part);
            } catch(e) {
                return part.includes(normalizedParent);
            }
        });
    }

    // 2. Escaneia o espaço de busca por pais e filhos
    searchSpace.forEach(other => {
        if (other.name === power.name) return; // ignora a si mesmo

        // Se 'other' é pré-requisito do poder atual
        if (isPrereq(other.name, power.req)) {
            if (!parents.some(p => p.name === other.name)) {
                parents.push(other);
            }
        }

        // Se o poder atual é pré-requisito de 'other'
        if (isPrereq(power.name, other.req)) {
            if (!children.some(c => c.name === other.name)) {
                children.push(other);
            }
        }
    });

    return { parents, children };
}

function renderModalRelations(power) {
    const parentsContainer = document.getElementById('modalParentsContainer');
    const childrenContainer = document.getElementById('modalChildrenContainer');

    if (!parentsContainer || !childrenContainer) return;

    // Limpa os contêineres
    parentsContainer.innerHTML = '';
    parentsContainer.classList.remove('active');
    childrenContainer.innerHTML = '';
    childrenContainer.classList.remove('active');

    const { parents, children } = findPowerRelations(power);

    // 1. Renderiza Pais (Requisitos Superiores)
    if (parents.length > 0) {
        parentsContainer.classList.add('active');
        parentsContainer.innerHTML = `
            <div class="relation-title">▲ Requisito Anterior:</div>
            <div class="relation-list"></div>
        `;
        const listEl = parentsContainer.querySelector('.relation-list');
        parents.forEach(p => {
            const card = document.createElement('div');
            card.className = 'relation-card';
            card.innerHTML = `
                <span class="relation-name">${p.name}</span>
                <span class="relation-badge">${translateType(p)}</span>
            `;
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                jumpToRelatedPower(p);
            });
            listEl.appendChild(card);
        });
    }

    // 2. Renderiza Filhos (Desbloqueia Inferiores)
    if (children.length > 0) {
        childrenContainer.classList.add('active');
        childrenContainer.innerHTML = `
            <div class="relation-title">▼ Próximos Poderes (Desbloqueia):</div>
            <div class="relation-list"></div>
        `;
        const listEl = childrenContainer.querySelector('.relation-list');
        children.forEach(c => {
            const card = document.createElement('div');
            card.className = 'relation-card';
            card.innerHTML = `
                <span class="relation-name">${c.name}</span>
                <span class="relation-badge">${translateType(c)}</span>
            `;
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                jumpToRelatedPower(c);
            });
            listEl.appendChild(card);
        });
    }
}

function jumpToRelatedPower(targetPower) {
    const existsInOriginal = _currentPowerList && _currentPowerList.some(p => p.name === targetPower.name && p.type === targetPower.type);
    if (existsInOriginal) {
        window.openModal(targetPower, _currentPowerList);
    } else {
        window.openModal(targetPower, [targetPower]);
    }
}

// MODAL LOGIC
function openModal(power, list = null) {
    _currentPowerList = list || [power];

    // Configura visibilidade dos botões de navegação
    const prevBtn = document.getElementById('modalPrevBtn');
    const nextBtn = document.getElementById('modalNextBtn');
    if (prevBtn && nextBtn) {
        if (_currentPowerList.length > 1) {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        } else {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }
    }

    modalTitle.innerText = power.name;
    modalType.innerText = translateType(power);
    modalReq.innerText = power.req;
    modalDesc.innerHTML = power.desc;
    modal.style.display = 'flex';

    const existingVariantBox = document.getElementById('variantBox');
    if (existingVariantBox) existingVariantBox.remove();

    if (power.variants && power.variants.length > 0) {
        const variantBox = document.createElement('div');
        variantBox.id = 'variantBox';
        variantBox.style.cssText = 'margin-top:14px; border-top:1px solid var(--border); padding-top:12px;';

        variantBox.innerHTML = `
    <label style="font-weight:700; font-size:.9rem; display:block; margin-bottom:6px;">
      ⚡ Escolha seu deus:
    </label>
    <select id="variantSelect" style="width:100%; padding:9px 12px; border-radius:10px;
      border:2px solid var(--border); background:var(--card-bg); color:var(--text-main);
      font-size:.9rem; cursor:pointer;">
      <option value="">— Selecione —</option>
      ${power.variants.map((v, i) =>
            `<option value="${i}">${v.deity}</option>`
        ).join('')}
    </select>
    <div id="variantDesc" style="margin-top:10px; padding:10px 12px; border-radius:10px;
      background:rgba(0,0,0,.04); border:1px solid var(--border); font-size:.88rem;
      line-height:1.5; color:var(--text-muted); display:none;"></div>
  `;

        // Insira dentro do modal-body, após a descrição principal
        document.getElementById('modalDesc').after(variantBox);

        document.getElementById('variantSelect').addEventListener('change', function () {
            const idx = this.value;
            const descEl = document.getElementById('variantDesc');
            if (idx === '') {
                descEl.style.display = 'none';
            } else {
                descEl.textContent = power.variants[idx].desc;
                descEl.style.display = 'block';
            }
        });
    }

    // Renderiza as relações de árvore de poderes
    renderModalRelations(power);
}
closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };

// Função de Navegação do Modal
function navigateModalPower(direction) {
    if (!_currentPowerList || _currentPowerList.length <= 1) return;

    let currentIndex = _currentPowerList.findIndex(p => p.name === _currentPower.name && p.type === _currentPower.type);
    if (currentIndex === -1) return;

    let nextIndex = (currentIndex + direction + _currentPowerList.length) % _currentPowerList.length;
    const nextPower = _currentPowerList[nextIndex];

    window.openModal(nextPower, _currentPowerList);
}

// Configura Listeners de Navegação (Cliques e Teclado)
document.getElementById('modalPrevBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateModalPower(-1);
});
document.getElementById('modalNextBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateModalPower(1);
});

document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
        if (e.key === "Escape") {
            modal.style.display = 'none';
        } else if (e.key === "ArrowLeft") {
            navigateModalPower(-1);
        } else if (e.key === "ArrowRight") {
            navigateModalPower(1);
        }
    }
});

// Inicialização
updatePathButtons(); // Garante estado inicial correto
renderPowers(powersData);
if (classFiltersDiv) classFiltersDiv.style.display = 'none';  // começa oculto
setPathsOpen(false);

// --- LÓGICA DO BOTÃO VOLTAR AO TOPO ---
document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.getElementById("backToTopBtn");

    if (backToTopBtn) {
        // Monitora a rolagem
        window.addEventListener("scroll", () => {
            // Verifica a rolagem vertical (eixo Y)
            if (window.scrollY > 300) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        });

        // Ação de clicar
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    } else {
        console.warn("Botão 'backToTopBtn' não encontrado no HTML.");
    }
});

// ============================================================
//  CARRINHO DE PODERES
// ============================================================

let _currentPower = null; // poder aberto no modal
let _currentPowerList = []; // lista de poderes ativa para navegação

const cartFab = document.getElementById('cartFab');
const cartCount = document.getElementById('cartCount');
const cartPanel = document.getElementById('cartPanel');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartList = document.getElementById('cartList');
const cartEmpty = document.getElementById('cartEmpty');
const cartExportBtn = document.getElementById('cartExportBtn');
const cartClearBtn = document.getElementById('cartClearBtn');
const modalAddToCart = document.getElementById('modalAddToCart');

// --- Abrir/fechar painel ---
function openCart() {
    cartPanel.classList.add('open');
    cartOverlay.classList.add('active');
}
function closeCart() {
    cartPanel.classList.remove('open');
    cartOverlay.classList.remove('active');
}
cartFab.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });

// --- Atualiza UI ---
function renderCart() {
    const count = cart.length;

    // FAB badge
    cartCount.textContent = count;
    cartCount.classList.toggle('zero', count === 0);

    // Lista vazia vs. lista
    if (count === 0) {
        cartEmpty.classList.remove('hidden');
        cartList.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        cartList.classList.remove('hidden');
        cartList.innerHTML = '';
        cart.forEach((power, idx) => {
            const li = document.createElement('li');
            li.className = 'cart-item';
            li.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${power.name}</div>
                    <div class="cart-item-meta">${translateType(power)} · Req: ${power.req}</div>
                </div>
                <button class="cart-item-remove" title="Remover" data-idx="${idx}">✕</button>
            `;
            cartList.appendChild(li);
        });

        // Listeners de remover
        cartList.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                const i = parseInt(btn.getAttribute('data-idx'));
                cart.splice(i, 1);
                renderCart();
                updateModalCartBtn();
                filterPowers(); // Re-render grid to update highlights
                if (typeof renderOrigens === 'function') renderOrigens();
            });
        });
    }

    // Salva o estado do carrinho sempre (mesmo se estiver vazio)
    localStorage.setItem('selectedPowers', JSON.stringify(cart));

    // Botões de ação
    cartExportBtn.disabled = count === 0;
    cartClearBtn.disabled = count === 0;
}

// --- Botão "Adicionar ao Carrinho" no modal ---
function updateModalCartBtn() {
    if (!_currentPower) return;
    const already = inCart(_currentPower);
    modalAddToCart.textContent = already ? 'Remover do Carrinho' : '＋ Adicionar ao Carrinho';
    modalAddToCart.classList.toggle('in-cart', already);
}

modalAddToCart.addEventListener('click', () => {
    if (!_currentPower) return;
    if (inCart(_currentPower)) {
        cart = cart.filter(p => !(p.name === _currentPower.name && p.type === _currentPower.type));
    } else {
        const variantSelect = document.getElementById('variantSelect');
        const chosenIdx = variantSelect ? variantSelect.value : '';
        const cartItem = { ..._currentPower };
        if (chosenIdx !== '' && _currentPower.variants) {
            const v = _currentPower.variants[chosenIdx];
            cartItem.name = `${_currentPower.name} (${v.deity})`;
            cartItem.desc = v.desc;
        }
        cart.push(cartItem);
    }
    renderCart();
    updateModalCartBtn();
    filterPowers(); // Re-renderiza o grid de poderes comuns

    // NOVO: Atualiza o grid de distinções para refletir a nova cor
    if (typeof renderDistincoes === 'function') {
        renderDistincoes();
    }
});

// --- Limpar tudo ---
cartClearBtn.addEventListener('click', () => {
    if (!confirm('Remover todos os poderes do carrinho?')) return;
    cart = [];
    renderCart();
    updateModalCartBtn();
    filterPowers(); // Re-render grid to update highlights
    if (typeof renderOrigens === 'function') renderOrigens();
});

// --- Enviar para a Ficha (via localStorage, igual ao script_itens.js) ---
cartExportBtn.innerText = "🚀 Enviar para a Ficha";

cartExportBtn.addEventListener('click', () => {
    if (cart.length === 0) return;

    // 1. Carrega os dados atuais da ficha para não apagar nada
    let fichaRaw = localStorage.getItem('t20SheetData');
    let fichaData = fichaRaw ? JSON.parse(fichaRaw) : {};
    if (!fichaData.classAbilities) fichaData.classAbilities = [];

    // 2. Mapeia os poderes do carrinho para o formato { name, desc } da ficha
    const poderesParaEnviar = cart.map(power => ({
        name: power.name,
        desc: (power.req && power.req !== '-' ? `Req: ${power.req}\n` : '') + power.desc
    }));

    // 3. Adiciona à seção de Poderes & Habilidades (sem apagar o que já existe)
    fichaData.classAbilities = fichaData.classAbilities.concat(poderesParaEnviar);

    // 4. Salva no localStorage compartilhado (mesmo domínio: nicholemos.github.io)
    localStorage.setItem('t20SheetData', JSON.stringify(fichaData));

    alert(`${poderesParaEnviar.length} poder(es) enviado(s) para a ficha com sucesso!\n\nA ficha será aberta em uma nova aba.`);

    // 5. Abre a ficha em uma nova aba
    window.open('../ficha/', '_blank');
});


// --- Patch no openModal para rastrear poder atual ---
const _origOpenModal = openModal;
window.openModal = function (power, list = null) {
    _currentPower = power;
    _origOpenModal(power, list);
    updateModalCartBtn();
};

// --- Lógica do botão de Adicionar Habilidades Iniciais ---
const addAllAbilitiesBtn = document.getElementById('addAllAbilitiesBtn');
if (addAllAbilitiesBtn) {
    addAllAbilitiesBtn.addEventListener('click', () => {
        const abilitiesToAdd = powersData.filter(power => {
            if (power.type !== 'class') return false;
            if (power.class !== state.selectedClass) return false;
            if (power.subType !== 'ability') return false;
            
            // Só habilidades de nível 1
            if (!power.req || !power.req.includes('Nível 1')) return false;

            let activePath = state.path;

            if (power.pathReq === 'all') return true;
            if (activePath && power.pathReq === activePath) return true;
            if (!activePath && power.pathReq === `${state.selectedClass}-base`) return true;

            return false;
        });

        let addedCount = 0;
        abilitiesToAdd.forEach(ability => {
            if (!inCart(ability)) {
                cart.push({ ...ability });
                addedCount++;
            }
        });

        if (addedCount > 0) {
            renderCart();
            filterPowers();
            const originalText = addAllAbilitiesBtn.innerText;
            addAllAbilitiesBtn.innerText = `✓ Adicionadas (${addedCount})`;
            setTimeout(() => {
                addAllAbilitiesBtn.innerText = originalText;
            }, 2000);
        } else {
            const originalText = addAllAbilitiesBtn.innerText;
            addAllAbilitiesBtn.innerText = `Já no Carrinho`;
            setTimeout(() => {
                addAllAbilitiesBtn.innerText = originalText;
            }, 2000);
        }
    });
}

// Inicialização
renderCart();
