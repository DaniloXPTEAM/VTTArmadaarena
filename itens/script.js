// (O BLOCO "const t20Data" FOI REMOVIDO DAQUI)

// ===== LISTAS DE PREÇOS (OK ficar no global) =====
// Preços de Modificações (Tabela 3-6 - CORRIGIDO POR VOCÊ)
const modificationPrices = {
    0: 0,
    1: 300,
    2: 3000,
    3: 9000,
    4: 18000
};

// Preços de Encantamentos (Tabela 8-1 - CORRIGIDO POR VOCÊ)
const enchantmentPrices = {
    0: 0,
    1: 18000,
    2: 36000,
    3: 72000
};

// Mapa de pré-requisitos (Modificações)
// Valor em array: a melhoria só aparece se ao menos UM dos pré-requisitos já estiver selecionado
const modificationPrereqs = {
    // Armas
    "Pungente": ["Certeira"],
    "Atroz": ["Cruel"],
    "Penetrante": ["Cruel"],
    "Farpada": ["Cruel"],
    "Bênção da Guerra": ["Cruel"],
    "Eletrificada": ["Certeira", "Precisa"],
    // Armaduras e Escudos
    "Sob Medida": ["Ajustada"],
    // Esotéricos
    "Potencializador": ["Canalizador"],
    // Todas as categorias
    "Deslumbrante": ["Banhado a Ouro", "Cravejado de Gemas"],
    // Outros (exibição informativa — pré-req não é uma melhoria selecionável)
    "Harmonizada (Arma)": [],
    "Tesoura": [],
    "Balístico": ["Reforçada"],
    "Devotado": ["Inscrito"]
};

// Mapa de exclusões mútuas entre modificações
const modificationExcludes = {
    "Maciça": ["Precisa"],
    "Precisa": ["Maciça"],
    "Brasonado": ["Discreto"],
    "Discreto": ["Brasonado"]
};
const enchantmentPrereqs = {
    // Armas
    "Encanto Magnífica": ["Encanto Formidável"],
    "Encanto Energética": ["Encanto Formidável"],
    "Encanto Lacinante": ["Encanto Dilacerante"],
    "Encanto Cronal": ["Encanto Formidável"],
    "Encanto Manáfaga": ["Encanto Formidável"],
    // Armaduras/Escudos
    "Encanto Guardião": ["Encanto Defensor"],
    "Encanto Reflexiva": ["Encanto Cristalina"],
    "Encanto Sepulcral": ["Encanto Tumular"],
    "Encanto Anulador": ["Encanto Abascanto"],
    "Encanto Estígio": ["Encanto Abençoado"],
    // Sem pré-req enforcado (mantidos por completude)
    "Encanto Implacável": [],
    "Encanto Majestoso": [],
    "Encanto Pulverizante": []
};

// ===== LISTAS GLOBAIS (Declarar, mas não preencher) =====
// Elas serão preenchidas pela função loadItems()
let allModifications = [];
let allMaterials = [];
let allEnchantments = [];
let allEsotericEnchantments = [];
let allCurses = []; // <-- ADICIONE ESTA LINHA
const materialEspecialPlaceholder = {
    nome: "Material Especial",
    tipo: "Melhoria",
    descricao: "Escolha um material especial. Um seletor adicional aparecerá."
};

// ===== ESTADO GLOBAL =====
let allItems = []; // Itens base (armas, armaduras, etc.)
let filteredItems = [];
let inventory = [];
let currentModalItem = null;
let currentModalIndex = 0;
let currentCategory = 'todos';
let selectedTypes = []; // Multi-seleção de sub-tipos (vazio = todos)
let searchTerm = '';
let currentView = 'grid';
let currentEmpunhadura = 'todas';
let currentSource = 'todas'; // NOVO: Estado para o filtro de Fonte
let currentSort = 'name-asc'; // <-- NOVO

// ===== ELEMENTOS DO DOM =====
// (Declaramos as variáveis aqui, mas pegamos elas dentro do 'window.onload')
let searchInput, itemsGrid, itemModal, modalOverlay, closeModalBtn,
    categoryButtons, specificFiltersContainer, inventoryList, totalCostEl,
    totalSpacesEl, totalVestidosEl, clearInventoryBtn, modalQuantityInput,
    addItemBtn, viewGridBtn, viewTableBtn, empunhaduraFiltersContainer,
    empunhaduraButtons, itemCustomizer, modQuantitySelect, modSelectorsContainer,
    enchantQuantitySelect, enchantSelectorsContainer, modalVestidoBox, sourceFilterSelect, sortSelect,
    curseCheckbox, curseQuantityContainer, curseQuantitySelect, curseSelectorsContainer,
    backToTopBtn, mobileInventoryBtn, inventoryContainer, closeInventoryBtn, mobileInvCount, inventoryOverlay;

// ===== INICIALIZAÇÃO =====
// ATUALIZADO: Usamos window.onload para esperar TUDO (incluindo armas.js) carregar
// SUBSTITUA A FUNÇÃO "window.onload" INTEIRA POR ESTA:

window.onload = () => {
    // Injeta estilos auxiliares usando variáveis de tema
    const style = document.createElement('style');
    style.textContent = `
        .shop-toast {
            position: fixed; bottom: 1rem; right: 1rem; z-index: 9999;
            background: var(--surface, #121726); color: var(--text-main, #e2d8c3); 
            border: 1px solid var(--border-solid, rgba(201, 147, 58, 0.3));
            padding: 0.5rem 1rem;
            border-radius: 8px; font-size: 0.85rem;
            display: flex; align-items: center; gap: 0.5rem;
            box-shadow: 0 4px 12px var(--shadow-main, rgba(0,0,0,0.3));
            animation: toastIn 0.25s ease;
        }
        @keyframes toastIn { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform: translateY(0); } }
    `;
    document.head.appendChild(style);
    // 1. Pega os elementos do DOM
    searchInput = document.getElementById('searchInput');
    itemsGrid = document.getElementById('itemsGrid');
    itemModal = document.getElementById('itemModal');
    modalOverlay = document.getElementById('modalOverlay');
    closeModalBtn = document.querySelector('.modal-close');
    categoryButtons = document.querySelectorAll('.filter-group .filter-btn[data-category]');
    specificFiltersContainer = document.getElementById('specificFilters');
    inventoryList = document.getElementById('inventoryList');
    totalCostEl = document.getElementById('totalCost');
    totalSpacesEl = document.getElementById('totalSpaces');
    totalVestidosEl = document.getElementById('totalVestidos');
    clearInventoryBtn = document.getElementById('clearInventoryBtn');
    modalQuantityInput = document.getElementById('modalQuantity');
    addItemBtn = document.getElementById('addItemBtn');
    viewGridBtn = document.getElementById('viewGridBtn');
    viewTableBtn = document.getElementById('viewTableBtn');
    empunhaduraFiltersContainer = document.getElementById('empunhaduraFilters');
    empunhaduraButtons = document.querySelectorAll('[data-empunhadura]');
    itemCustomizer = document.getElementById('itemCustomizer');
    modQuantitySelect = document.getElementById('modQuantity');
    modSelectorsContainer = document.getElementById('modSelectorsContainer');
    enchantQuantitySelect = document.getElementById('enchantQuantity');
    enchantSelectorsContainer = document.getElementById('enchantSelectorsContainer');
    modalVestidoBox = document.getElementById('modalVestido');
    sourceFilterSelect = document.getElementById('sourceFilter');
    sortSelect = document.getElementById('sortSelect'); // <-- NOVO

    // NOVO: Pega os elementos de Maldição
    curseCheckbox = document.getElementById('curseCheckbox');
    curseQuantityContainer = document.getElementById('curseQuantityContainer');
    curseQuantitySelect = document.getElementById('curseQuantity');
    curseSelectorsContainer = document.getElementById('curseSelectorsContainer');

    // NOVO: Elementos Mobile/UX
    backToTopBtn = document.getElementById('backToTopBtn');
    mobileInventoryBtn = document.getElementById('mobileInventoryBtn');
    inventoryContainer = document.getElementById('inventoryContainer');
    closeInventoryBtn = document.getElementById('closeInventoryBtn');
    mobileInvCount = document.getElementById('mobileInvCount');
    inventoryOverlay = document.getElementById('inventoryOverlay');


    // 2. Carrega os dados e o inventário
    loadInventory();
    restoreFilters(); // Restaura filtros salvos antes de carregar
    loadItems();
    setupEventListeners();
    renderInventory();
};

// ===== CARREGAR DADOS (REESCRITO) =====

function loadItems() {
    try {
        // 1. Combina todos os arrays dos arquivos .js externos
        // (const declaradas no topo de scripts não ficam em window.xxx)
        const combinedData = [
            ...(typeof armasData !== 'undefined' ? (armasData.arma || []) : []),
            ...(typeof armadurasData !== 'undefined' ? (armadurasData.armadura || []) : []),
            ...(typeof itensData !== 'undefined' ? (itensData.item || []) : []),
            ...(typeof itensMagicosData !== 'undefined' ? (itensMagicosData.item || []) : []),
            ...(typeof modificacoesData !== 'undefined' ? (modificacoesData.modificacao || []) : []),
            ...(typeof enchantmentosData !== 'undefined' ? (enchantmentosData.encantamento || []) : []),
            ...(typeof maldicaoData !== 'undefined' ? (maldicaoData.maldicao || []) : [])
        ];

        // 2. Processa os dados
        allModifications = combinedData
            .filter(item => item.categoria === 'Item Superior' && item.tipo === 'Melhoria' && item.nome !== 'Material Especial')
            .map(item => {
                const prereqArr = modificationPrereqs[item.nome];
                const prereqText = prereqArr && prereqArr.length > 0 ? prereqArr.join(' ou ') : null;
                return {
                    nome: item.nome, tipo: item.tipo, descricao: item.descricao,
                    preco: item.preco, prereq: prereqText, categoria: 'Item Superior'
                };
            });

        allMaterials = combinedData
            .filter(item => item.categoria === 'Item Superior' && item.tipo === 'Material')
            .map(item => ({ nome: item.nome, tipo: item.tipo, descricao: item.descricao, preco: item.preco, categoria: 'Item Superior' }));

        // CORREÇÃO: Usando a categoria 'encantamento' em vez de 'Item Mágico'
        allEnchantments = combinedData
            .filter(item => item.categoria === 'encantamento' && (item.tipo === 'Arma' || item.tipo === 'Armadura/Escudo'))
            .map(item => ({
                nome: item.nome, tipo: item.tipo, descricao: item.descricao,
                preco: item.preco, prereq: enchantmentPrereqs[item.nome] || null, categoria: 'encantamento'
            }));

        // CORREÇÃO: Usando a categoria 'encantamento'
        allEsotericEnchantments = combinedData
            .filter(item => item.categoria === 'encantamento' && item.tipo === 'Esotérico')
            .map(item => ({
                nome: item.nome, tipo: item.tipo, descricao: item.descricao,
                preco: item.preco, prereq: enchantmentPrereqs[item.nome] || null, categoria: 'encantamento'
            }));

        // CORREÇÃO: Usando a categoria 'encantamento' para Encantamento de Acessório
        allAccessoryEnchantments = combinedData
            .filter(item => item.categoria === 'encantamento' && (item.tipo === 'Encantamento de Acessório'))
            .map(item => ({
                nome: item.nome, tipo: item.tipo, descricao: item.descricao,
                preco: item.preco, prereq: enchantmentPrereqs[item.nome] || null, categoria: 'encantamento'
            }));

        // NOVO: Popula a lista de Maldições
        allCurses = combinedData
            .filter(item => item.categoria === 'Maldição')
            .map(item => ({
                nome: item.nome, tipo: item.tipo, descricao: item.descricao,
                preco: item.preco, fonte: item.fonte, categoria: 'Maldição'
            }));

        // 3. Limpa a lista principal "allItems"
        allItems = combinedData.filter(item =>
            item.categoria !== 'Item Superior' &&
            item.categoria !== 'Maldição' && // <-- ADICIONADO
            !allEnchantments.some(enc => enc.nome === item.nome) &&
            !allEsotericEnchantments.some(enc => enc.nome === item.nome) &&
            !allAccessoryEnchantments.some(enc => enc.nome === item.nome)
        );

        // 4. Continua como antes
        filteredItems = allItems;
        renderItems();

    } catch (error) {
        console.error('Erro ao carregar e combinar dados:', error);
        itemsGrid.innerHTML = '<div class="no-results">Erro fatal ao carregar dados. Verifique o console (F12).</div>';
    }
}
// ===== Salvar e Carregar Inventário =====
function saveInventory() {
    localStorage.setItem('t20Inventory', JSON.stringify(inventory));
}

function loadInventory() {
    const savedInventory = localStorage.getItem('t20Inventory');
    if (savedInventory) {
        inventory = JSON.parse(savedInventory);
    } else {
        inventory = [];
    }
}

function clearInventory() {
    if (confirm("Tem certeza que deseja limpar todo o inventário?")) {
        inventory = [];
        saveInventory();
        if (typeof renderInventory === 'function') {
            renderInventory();
        }

        const toast = document.createElement('div');
        toast.className = 'shop-toast';
        toast.innerHTML = `<i class="bi bi-trash"></i> Inventário limpo!`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
}

// ===== PERSISTÊNCIA DE FILTROS =====
const FILTERS_KEY = 't20_item_filters_v1';

function saveFilters() {
    // Desativado por solicitação do usuário - não salva mais os filtros
}

function restoreFilters() {
    // Desativado por solicitação do usuário - não restaura mais os filtros
    try {
        localStorage.removeItem(FILTERS_KEY);
    } catch(e) { /* silent */ }
}

// ===== EVENT LISTENERS =====
// SUBSTITUA A FUNÇÃO "setupEventListeners" INTEIRA POR ESTA:

// SUBSTITUA A FUNÇÃO "setupEventListeners" INTEIRA POR ESTA:

// SUBSTITUA A FUNÇÃO "setupEventListeners" INTEIRA POR ESTA:

function setupEventListeners() {
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        applyFilters();
        saveFilters();
    });

    if (mobileInventoryBtn && inventoryContainer && inventoryOverlay) {
        mobileInventoryBtn.addEventListener('click', () => {
            if (itemModal?.classList.contains('active')) closeModal();
            inventoryContainer.classList.add('active');
            inventoryOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Swipe para fechar a mochila no mobile
    if (inventoryContainer) {
        let touchStartX = 0;
        inventoryContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        inventoryContainer.addEventListener('touchend', (e) => {
            if (!inventoryContainer.classList.contains('active')) return;
            const diffX = e.changedTouches[0].screenX - touchStartX;
            if (diffX > 80) {
                closeInventoryDrawer();
            }
        }, { passive: true });
    }

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;

            if (currentCategory === 'Arma') {
                empunhaduraFiltersContainer.style.display = 'flex';
            } else {
                empunhaduraFiltersContainer.style.display = 'none';
            }

            currentEmpunhadura = 'todas';
            currentSource = 'todas';
            selectedTypes = []; // Limpa os sub-tipos ao trocar de categoria

            empunhaduraButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-empunhadura="todas"]').classList.add('active');

            sourceFilterSelect.value = 'todas';

            updateSpecificFilters();
            applyFilters();
            saveFilters();
        });


    });

    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', () => {
        if (itemModal.classList.contains('active')) closeModal();
        const rm = document.getElementById('randomizerModal');
        if (rm && rm.classList.contains('active')) closeRandomizerModal();
    });
    itemModal.addEventListener('click', (e) => {
        if (e.target === itemModal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (itemModal.classList.contains('active')) closeModal();
            const rm = document.getElementById('randomizerModal');
            if (rm && rm.classList.contains('active')) closeRandomizerModal();
            if (inventoryContainer?.classList.contains('active')) closeInventoryDrawer();
        }
        if (itemModal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') navigateModal(-1);
            if (e.key === 'ArrowRight') navigateModal(1);
        }
    });

    document.querySelector('.modal-nav-prev').addEventListener('click', () => navigateModal(-1));
    document.querySelector('.modal-nav-next').addEventListener('click', () => navigateModal(1));

    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    itemModal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    itemModal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 150;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        // Só desliza se o movimento for claramente mais horizontal que vertical
        // e se a distância horizontal for bem significativa
        if (Math.abs(diffX) > Math.abs(diffY) * 1.5 && Math.abs(diffX) > swipeThreshold) {
            if (diffX > 0) {
                navigateModal(1);
            } else {
                navigateModal(-1);
            }
        }
    }

    addItemBtn.addEventListener('click', addItemToInventory);
    clearInventoryBtn.addEventListener('click', clearInventory);

    inventoryList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-btn')) {
            const index = parseInt(e.target.dataset.index, 10);
            removeItemFromInventory(index);
        }
    });

    viewGridBtn.addEventListener('click', () => {
        currentView = 'grid';
        viewGridBtn.classList.add('active');
        viewTableBtn.classList.remove('active');
        renderItems();
        saveFilters();
    });

    viewTableBtn.addEventListener('click', () => {
        currentView = 'table';
        viewTableBtn.classList.add('active');
        viewGridBtn.classList.remove('active');
        renderItems();
        saveFilters();
    });

    empunhaduraButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            empunhaduraButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentEmpunhadura = btn.dataset.empunhadura;
            applyFilters();
            saveFilters();
        });
    });

    sourceFilterSelect.addEventListener('change', (e) => {
        currentSource = e.target.value;
        applyFilters();
        saveFilters();
    });

    // NOVO: Listener de Ordenação
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        applyFilters();
        saveFilters();
    });

    modQuantitySelect.addEventListener('change', (e) => {
        updateCustomSelectors(parseInt(e.target.value), modSelectorsContainer, allModifications, currentModalItem);
    });

    enchantQuantitySelect.addEventListener('change', (e) => {
        let sourceList = [];
        if (currentModalItem.contaComoArma || currentModalItem.categoria === 'Arma' || currentModalItem.tipo === 'Munição') {
            sourceList = allEnchantments;
        } else if (currentModalItem.tipo === 'Esotérico') {
            sourceList = allEsotericEnchantments;
        } else if (currentModalItem.tipo === 'Vestuário' || currentModalItem.tipo === 'Ferramenta' || currentModalItem.tipo === 'Acessório') {
            sourceList = allAccessoryEnchantments;
        } else {
            sourceList = allEnchantments;
        }
        updateCustomSelectors(parseInt(e.target.value), enchantSelectorsContainer, sourceList, currentModalItem);
    });

    modSelectorsContainer.addEventListener('change', (e) => {
        handleModSelection(e);
        // Após qualquer mudança de melhoria, reavalia quais opções devem aparecer
        if (e.target.tagName === 'SELECT' && !e.target.classList.contains('material-selector')) {
            refreshModSelectorOptions();
        } else if (e.target.tagName === 'SELECT' && e.target.classList.contains('material-selector')) {
            updateModalStatsFromMods();
        }
    });

    enchantSelectorsContainer.addEventListener('change', (e) => {
        if (e.target.tagName === 'SELECT') {
            refreshEnchantSelectorOptions();
        }
    });

    // --- Listeners para Maldição ---
    curseCheckbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            curseQuantityContainer.style.display = 'flex';
        } else {
            curseQuantityContainer.style.display = 'none';
            curseQuantitySelect.value = 0;
            // Dispara o evento de 'change' para limpar os seletores
            curseQuantitySelect.dispatchEvent(new Event('change'));
        }
    });

    // NOVO: Adiciona o listener para a QUANTIDADE de Maldições
    curseQuantitySelect.addEventListener('change', (e) => {
        updateCustomSelectors(parseInt(e.target.value), curseSelectorsContainer, allCurses, currentModalItem);
    });


    // Fechar inventário
    closeInventoryBtn.addEventListener('click', closeInventoryDrawer);

    // Fechar ao clicar no overlay
    if (inventoryOverlay) {
        inventoryOverlay.addEventListener('click', closeInventoryDrawer);
    }

    // Scroll para o topo
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Monitorar o scroll para mostrar/esconder o botão de topo
    window.addEventListener('scroll', () => {
        if (!scrollTopBtn) return;
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

}

// ===== Fechar drawer do inventário =====
function closeInventoryDrawer() {
    if (inventoryContainer) inventoryContainer.classList.remove('active');
    if (inventoryOverlay) inventoryOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ===== Handler para "Material Especial" =====
function handleModSelection(e) {
    const selector = e.target;
    if (selector.tagName !== 'SELECT') return;

    const nextElement = selector.nextElementSibling;

    if (nextElement && nextElement.classList.contains('material-selector')) {
        nextElement.remove();
    }

    if (selector.value === "Material Especial") {
        const materialSelect = document.createElement('select');
        materialSelect.className = 'material-selector';

        let availableMaterials = [];
        const item = currentModalItem;

        if (item.categoria === 'Arma' || item.contaComoArma) {
            availableMaterials = allMaterials.filter(m => m.nome.includes('(Arma)'));
        } else if (item.categoria === 'Escudo') {
            availableMaterials = allMaterials.filter(m => m.nome.includes('Leve/Escudo') || m.nome.includes('(Armadura/Escudo)'));
        } else if (item.categoria === 'Armadura') {
            if (item.tipo.includes('Pesada')) {
                availableMaterials = allMaterials.filter(m => m.nome.includes('Pesada') || m.nome.includes('(Armadura/Escudo)'));
            } else {
                availableMaterials = allMaterials.filter(m => m.nome.includes('Leve/Escudo'));
            }
        } else if (item.tipo === 'Esotérico') {
            availableMaterials = allMaterials.filter(m => m.nome.includes('(Esotérico)'));
        } else if (item.tipo === 'Vestuário') {
            availableMaterials = allMaterials.filter(m => m.nome.includes('Tixonessica'));
        }

        const optionsHTML = `<option value="nenhum/a">--- Escolha Material ---</option>` +
            availableMaterials.map(mat => `<option value="${mat.nome}">${mat.nome} (${mat.preco})</option>`).join('');

        materialSelect.innerHTML = optionsHTML;
        selector.insertAdjacentElement('afterend', materialSelect);
    }
}

// SUBSTITUA A FUNÇÃO "isVestido" INTEIRA POR ESTA:

// ===== LÓGICA DE ITENS VESTIDOS =====
/**
 * Verifica se um item conta como "vestido"
 * @param {object} item O objeto do item
 * @returns {boolean}
 */
function isVestido(item) {
    const itemToCheck = item.baseItem || item;

    // 1. Armaduras (mas não escudos)
    if (itemToCheck.categoria === "Armadura") {
        return true;
    }
    // 2. Vestuário (Itens Gerais)
    if (itemToCheck.tipo === "Vestuário") {
        return true;
    }

    // 3. Acessórios Mágicos (que ocupam espaço no corpo)
    if (itemToCheck.tipo?.includes("Acessório")) {
        // Lista de EXCEÇÕES: Acessórios que NÃO são vestidos
        const naoVestidos = [
            "Corda da Escalada",
            "Espelho da Oposição",
            "Ferraduras da Velocidade",
            "Garrafa da Fumaça Eterna",
            "Gema da Luminosidade",
            "Flauta Fantasma",
            "Lâmpada da Revelação",
            "Bola de Cristal",
            "Caveira Maldita",
            "Gema da Telepatia",
            "Gema Elemental",
            "Manual da Saúde Corporal",
            "Manual do Bom Exercício",
            "Manual dos Movimentos Precisos",
            "Tomo da Compreensão",
            "Tomo da Liderança e Influência",
            "Tomo dos Grandes Pensamentos",
            "Estatueta Animista",
            "Orbe das Tempestades",
            "Espelho do Aprisionamento",
            "Tapete Voador",
            "Asas (Implante)",
            "Braço de Ogro",
            "Cauda com Ferrão",
            "Escamas (+2 Defesa)",
            "Escamas (Melhoria +5 Defesa)",
            "Garras (Implante)",
            "Olho Anulador",
            "Olho Desintegrador",
            "Olho Petrificante",
            "Patas de Aranha",
            "Tentáculo com Garras",
            "Chave Mestra"
            // Adicione aqui outros itens (Ex: "Bolsa de Carga", "Manual do Bom Exercício")
        ];

        if (naoVestidos.includes(itemToCheck.nome)) {
            return false; // Se estiver na lista de exceções, NÃO é vestido
        }

        return true; // Se for "Acessório" e não for uma exceção, É vestido
    }

    // 4. Alguns Esotéricos
    const esotericosVestidos = ["Luva de ferro", "Medalhão de prata"];
    if (itemToCheck.tipo === "Esotérico" && esotericosVestidos.includes(itemToCheck.nome)) {
        return true;
    }
    // 5. Armaduras Mágicas (mas não Escudos Mágicos)
    if (itemToCheck.tipo === "Armadura/Escudo" && !itemToCheck.nome.toLowerCase().includes("escudo")) {
        return true;
    }

    return false; // Padrão: não é vestido
}

// ===== FILTROS ESPECÍFICOS =====
function updateSpecificFilters() {
    specificFiltersContainer.innerHTML = '';

    const noSubFilter = ['todos'];
    if (noSubFilter.includes(currentCategory)) {
        return;
    }

    if (currentView === 'table') {
        return;
    }

    let types = [];
    
    if (currentCategory === 'Item Mágico') {
        types = allItems
            .filter(item => item.categoria === 'Item Mágico')
            .map(item => item.tipo)
            .filter(type => type);
        
        types = [...new Set(types)];
    } else if (currentCategory === 'encantamento') {
        const encantamentoTypes = allEnchantments
            .map(item => item.tipo)
            .filter(type => type);
        
        const esotericTypes = allEsotericEnchantments
            .map(item => item.tipo)
            .filter(type => type);
        
        const accessoryTypes = allAccessoryEnchantments
            .map(item => item.tipo)
            .filter(type => type);
        
        types = [...new Set([...encantamentoTypes, ...esotericTypes, ...accessoryTypes])];
    } else {
        types = [...new Set(allItems
            .filter(item => item.categoria === currentCategory)
            .map(item => item.tipo)
            .filter(type => type)
        )];
    }

    const foodSubtypes = ['Básico', 'Pratos Especiais', 'Pratos Especiais Divinos', 'Bebidas'];

    const hasAlquimicoSelected = selectedTypes.includes('Alquímico');
    const hasAlimentacaoSelected = selectedTypes.some(t => foodSubtypes.includes(t));

    // Para Item Geral, agrupar Preparados, Catalisador e Venenos em "Alquímico"
    if (currentCategory === 'Item Geral') {
        types = types.filter(t => !['Preparados', 'Catalisador', 'Venenos', 'Alquímico'].includes(t));
        // Para Item Geral, agrupar tipos de alimentação em "Alimentação"
        types = types.filter(t => !['Básico', 'Pratos Especiais', 'Pratos Especiais Divinos', 'Bebidas'].includes(t));
    }

    if (types.length === 0 && !hasAlquimicoSelected && !hasAlimentacaoSelected && currentCategory !== 'Item Geral') return;

    // Para Item Geral, sempre mostrar os grupos se existirem itens
    if (currentCategory === 'Item Geral' && types.length === 0 && !hasAlquimicoSelected && !hasAlimentacaoSelected) {
        const hasAlquimicos = allItems.some(item => ['Preparados', 'Catalisador', 'Venenos'].includes(item.tipo));
        const hasAlimentos = allItems.some(item => foodSubtypes.includes(item.tipo));
        if (!hasAlquimicos && !hasAlimentos) return;
    }

    // Hint de multi-seleção
    const hint = document.createElement('span');
    hint.className = 'subfilter-hint';
    hint.textContent = (hasAlquimicoSelected || hasAlimentacaoSelected) ? 'Subtipo (selecione um ou mais):' : 'Tipo (selecione um ou mais):';
    specificFiltersContainer.appendChild(hint);

    // Botão "Todos" — limpa a seleção
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn' + (!hasAlquimicoSelected && !hasAlimentacaoSelected && selectedTypes.length === 0 ? ' active' : '');
    allBtn.textContent = 'Todos';
    allBtn.addEventListener('click', () => {
        selectedTypes = [];
        updateSpecificFilters();
        applyFilters();
    });
    specificFiltersContainer.appendChild(allBtn);

    // Se Alquímico está selecionado, mostra os subtipos
    if (hasAlquimicoSelected) {
        ['Preparados', 'Catalisador', 'Venenos'].forEach(subtipo => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn' + (selectedTypes.includes(subtipo) ? ' active' : '');
            btn.textContent = subtipo;
            btn.addEventListener('click', () => {
                if (selectedTypes.includes(subtipo)) {
                    selectedTypes = selectedTypes.filter(t => t !== subtipo);
                    if (!selectedTypes.some(t => ['Preparados', 'Catalisador', 'Venenos'].includes(t))) {
                        selectedTypes = selectedTypes.filter(t => t !== 'Alquímico');
                    }
                } else {
                    selectedTypes.push(subtipo);
                }
                updateSpecificFilters();
                applyFilters();
            });
            specificFiltersContainer.appendChild(btn);
        });
    } else if (hasAlimentacaoSelected) {
        // Se Alimentação está selecionado, mostra os subtipos
        foodSubtypes.forEach(subtipo => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn' + (selectedTypes.includes(subtipo) ? ' active' : '');
            btn.textContent = subtipo;
            btn.addEventListener('click', () => {
                if (selectedTypes.includes(subtipo)) {
                    selectedTypes = selectedTypes.filter(t => t !== subtipo);
                } else {
                    selectedTypes.push(subtipo);
                }
                updateSpecificFilters();
                applyFilters();
            });
            specificFiltersContainer.appendChild(btn);
        });
    } else {
        // Caso contrário, mostra os tipos normais e os botões de grupo
        if (currentCategory === 'Item Geral') {
            const hasAlquimicos = allItems.some(item => item.tipo === 'Preparados');
            const hasAlimentos = allItems.some(item => foodSubtypes.includes(item.tipo));

            if (hasAlquimicos) {
                const btn = document.createElement('button');
                btn.className = 'filter-btn group-btn' + (hasAlquimicoSelected ? ' active' : '');
                btn.textContent = 'Alquímico';
                btn.addEventListener('click', () => {
                    if (selectedTypes.includes('Alquímico')) {
                        selectedTypes = selectedTypes.filter(t => t !== 'Alquímico');
                        selectedTypes = selectedTypes.filter(t => !['Preparados', 'Catalisador', 'Venenos'].includes(t));
                    } else {
                        selectedTypes.push('Alquímico');
                    }
                    updateSpecificFilters();
                    applyFilters();
                });
                specificFiltersContainer.appendChild(btn);
            }

            if (hasAlimentos) {
                const btn = document.createElement('button');
                btn.className = 'filter-btn group-btn' + (hasAlimentacaoSelected ? ' active' : '');
                btn.textContent = 'Alimentação';
                btn.addEventListener('click', () => {
                    if (selectedTypes.some(t => foodSubtypes.includes(t))) {
                        selectedTypes = selectedTypes.filter(t => !foodSubtypes.includes(t));
                    } else {
                        selectedTypes.push('Básico');
                    }
                    updateSpecificFilters();
                    applyFilters();
                });
                specificFiltersContainer.appendChild(btn);
            }
        }

        const sortedTypes = types.sort((a, b) => a.localeCompare(b));
        sortedTypes.forEach(type => {
            const btn = createFilterButton(type, type);
            specificFiltersContainer.appendChild(btn);
        });
    }
}

function createFilterButton(value, label) {
    const btn = document.createElement('button');
    const isAlquimicoGroup = value === 'Alquímico';
    const isSelected = isAlquimicoGroup ? 
        selectedTypes.includes('Alquímico') : 
        selectedTypes.includes(value);
    btn.className = 'filter-btn' + (isSelected ? ' active' : '');
    btn.textContent = label;

    btn.addEventListener('click', () => {
        if (isAlquimicoGroup) {
            if (selectedTypes.includes('Alquímico')) {
                selectedTypes = selectedTypes.filter(t => t !== 'Alquímico');
            } else {
                selectedTypes.push('Alquímico');
            }
        } else {
            if (selectedTypes.includes(value)) {
                selectedTypes = selectedTypes.filter(t => t !== value);
            } else {
                selectedTypes.push(value);
            }
        }
        updateSpecificFilters();
        applyFilters();
    });
    return btn;
}

// ===== APLICAR FILTROS =====

function applyFilters() {
    let sourceList;
    // 1. Define a lista base (Source List)
    if (currentCategory === 'encantamento') {
        // CORREÇÃO: Combina as três listas de encantamentos para exibição
        sourceList = allEnchantments.concat(allEsotericEnchantments).concat(allAccessoryEnchantments);
    } else if (currentCategory === 'Item Superior') {
        sourceList = allModifications.concat(allMaterials);
    } else if (currentCategory === 'Item Mágico') {
        sourceList = allItems.filter(i => i.categoria === 'Item Mágico');
    } else if (currentCategory === 'Maldição') {
        sourceList = allCurses;
    } else if (currentCategory !== 'todos') {
        sourceList = allItems.filter(item => item.categoria === currentCategory);
    } else {
        sourceList = allItems.concat(allModifications).concat(allMaterials).concat(allEnchantments).concat(allEsotericEnchantments).concat(allAccessoryEnchantments).concat(allCurses);
    }

    let filtered = sourceList;

// 2. Filtros
    if (currentView === 'grid' && selectedTypes.length > 0) {
        if (currentCategory === 'Item Geral') {
            const foodSubtypes = ['Básico', 'Pratos Especiais', 'Pratos Especiais Divinos', 'Bebidas'];
            const alquimicoSubtypes = ['Preparados', 'Catalisador', 'Venenos'];
            
            const hasAlquimicoGroup = selectedTypes.includes('Alquímico');
            const hasAlimentacaoGroup = selectedTypes.includes('Alimentação');
            const hasAlquimicoSubtypes = selectedTypes.some(t => alquimicoSubtypes.includes(t));
            const hasFoodSubtypes = selectedTypes.some(t => foodSubtypes.includes(t));

            filtered = filtered.filter(item => {
                if (hasAlquimicoGroup && !hasAlquimicoSubtypes) {
                    return alquimicoSubtypes.includes(item.tipo);
                }
                if (hasAlimentacaoGroup && !hasFoodSubtypes) {
                    return foodSubtypes.includes(item.tipo);
                }
                if (hasAlquimicoSubtypes || hasAlimentacaoGroup) {
                    return selectedTypes.includes(item.tipo);
                }
                return selectedTypes.includes(item.tipo);
            });
        } else if (currentCategory === 'Item Mágico') {
            filtered = filtered.filter(item => selectedTypes.includes(item.tipo));
        } else if (currentCategory === 'encantamento') {
            filtered = filtered.filter(item => selectedTypes.includes(item.tipo));
        } else {
            filtered = filtered.filter(item => selectedTypes.includes(item.tipo));
        }
    }

    if (currentCategory === 'Arma' && currentEmpunhadura !== 'todas') {
        filtered = filtered.filter(item => item.empunhadura === currentEmpunhadura);
    }

    if (currentSource !== 'todas') {
        if (currentSource === 'Livro Básico') {
            filtered = filtered.filter(item => !item.fonte);
        } else {
            filtered = filtered.filter(item => item.fonte === currentSource);
        }
    }

    if (searchTerm) {
        filtered = filtered.filter(item =>
            item.nome.toLowerCase().includes(searchTerm) ||
            (item.descricao && item.descricao.toLowerCase().includes(searchTerm))
        );
    }

    // =======================================================
    // NOVO: LÓGICA DE ORDENAÇÃO
    // =======================================================
    filtered.sort((a, b) => {
        switch (currentSort) {
            case 'name-asc':
                return a.nome.localeCompare(b.nome);
            case 'name-desc':
                return b.nome.localeCompare(a.nome);
            case 'price-asc':
                return parsePrice(a.preco) - parsePrice(b.preco);
            case 'price-desc':
                return parsePrice(b.preco) - parsePrice(a.preco);
            case 'spaces-asc':
                return parseSpaces(a.espacos) - parseSpaces(b.espacos);
            case 'spaces-desc':
                return parseSpaces(b.espacos) - parseSpaces(a.espacos);
            default:
                return 0;
        }
    });
    // =======================================================

    filteredItems = filtered;
    renderItems();
}
// ===== RENDERIZAÇÃO DE ITENS (Controlador) =====
function renderItems() {
    if (currentView === 'table') {
        specificFiltersContainer.innerHTML = '';
        empunhaduraFiltersContainer.style.display = 'none';
    } else {
        updateSpecificFilters();
        if (currentCategory === 'Arma') {
            empunhaduraFiltersContainer.style.display = 'flex';
        }
    }

    if (currentView === 'grid') {
        renderAsGrid();
    } else {
        renderAsTable();
    }
}

function renderAsGrid() {
    itemsGrid.style.display = 'grid';
    itemsGrid.classList.add('items-grid');
    itemsGrid.classList.remove('table-view-container');

    if (filteredItems.length === 0) {
        itemsGrid.innerHTML = '<div class="no-results">Nenhum item encontrado.</div>';
        return;
    }

    itemsGrid.innerHTML = filteredItems.map((item, index) => {
        // NOVO: Adiciona a tag de fonte se ela existir
        const sourceBadge = item.fonte ? `<span class="badge badge-fonte">${item.fonte}</span>` : '';

        return ` 
        <div class="item-card" onclick="openModal(${index})">
            <div class="item-name">${item.nome}</div>
            <div class="item-price">${item.preco || "—"}</div>
            <div class="item-badges">
                ${item.categoria ? `<span class="badge badge-cat">${item.categoria}</span>` : ''}
                ${item.tipo ? `<span class="badge badge-tipo">${item.tipo}</span>` : ''}
                ${isVestido(item) ? '<span class="badge badge-vestido">Vestido</span>' : ''}
                ${sourceBadge}
            </div>
            <div class="item-spaces">Espaços: ${item.espacos || '—'}</div>
        </div>
    `}).join('');
}

// ===== LÓGICA DE TABELA =====
function renderAsTable() {
    itemsGrid.style.display = 'block';
    itemsGrid.classList.remove('items-grid');
    itemsGrid.classList.add('table-view-container');

    if (filteredItems.length === 0) {
        itemsGrid.innerHTML = '<div class="no-results">Nenhum item encontrado.</div>';
        return;
    }

    const groupedItems = filteredItems.reduce((acc, item) => {
        const category = item.categoria || 'Outros';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(item);
        return acc;
    }, {});

    let tableHTML = '';
    const categories = Object.keys(groupedItems).sort();

    const categoriesToRender = (currentCategory === 'todos') ? categories : [currentCategory];

    for (const category of categoriesToRender) {
        if (!groupedItems[category]) continue;

        tableHTML += `<h2 class="table-category-title">${category}</h2>`;
        tableHTML += '<table class="item-table">';

        tableHTML += getTableHeader(category);

        tableHTML += '<tbody>';
        tableHTML += getItemRows(groupedItems[category], category);
        tableHTML += '</tbody>';

        tableHTML += '</table>';
    }

    itemsGrid.innerHTML = tableHTML;
}

function getTableHeader(category) {
    let headers = [];
    switch (category) {
        case 'Arma':
            headers = ['Nome', 'Preço', 'Dano', 'Crítico', 'Alcance', 'Tipo', 'Espaços'];
            break;
        case 'Armadura':
        case 'Escudo':
            headers = ['Nome', 'Preço', 'Bônus Def.', 'Penalidade', 'Tipo', 'Espaços'];
            break;
        case 'Item Mágico':
            headers = ['Nome', 'Preço', 'Tipo', 'Espaços', 'Descrição'];
            break;
        case 'Item Superior':
            headers = ['Nome', 'Requisito', 'Tipo', 'Descrição'];
            break;
        case 'encantamento':
            headers = ['Nome', 'Requisito', 'Tipo', 'Descrição'];
            break;
        case 'Maldição':
            headers = ['Nome', 'Descrição'];
            break;
        default:
            headers = ['Nome', 'Preço', 'Tipo', 'Espaços', 'Descrição'];
    }
    return `<thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>`;
}

function getItemRows(items, category) {
    return items.map(item => {
        const index = filteredItems.indexOf(item);
        let cells = [];
        const desc = item.descricao ? item.descricao.substring(0, 70) + '...' : '—';

        switch (category) {
            case 'Arma':
                cells = [item.nome, item.preco, item.dano || '—', item.critico || '—', item.alcance || '—', item.tipo || '—', item.espacos || '—'];
                break;
            case 'Armadura':
            case 'Escudo':
                cells = [item.nome, item.preco, item.bonus_defesa || '—', item.penalidade_armadura || '—', item.tipo || '—', item.espacos || '—'];
                break;
            case 'Item Mágico':
                cells = [item.nome, item.preco || '—', item.tipo || '—', item.espacos || '—', desc];
                break;
            case 'Item Superior':
                cells = [item.nome, item.prereq || '—', item.tipo || '—', desc];
                break;
            case 'encantamento':
                cells = [item.nome, item.prereq || '—', item.tipo || '—', desc];
                break;
            case 'Maldição':
                cells = [item.nome, desc];
                break;
            default: // Item Geral
                cells = [item.nome, item.preco || '—', item.tipo || '—', item.espacos || '—', desc];
        }

        return `<tr onclick="openModal(${index})">${cells.map(c => `<td>${c}</td>`).join('')}</tr>`;

    }).join('');
}


// ===== LÓGICA DO INVENTÁRIO =====

function addItemToInventory() {
    if (!currentModalItem) return;

    const quantity = parseInt(modalQuantityInput.value, 10);
    if (isNaN(quantity) || quantity < 1) {
        return;
    }

    const modQty = parseInt(modQuantitySelect.value, 10);
    const enchantQty = parseInt(enchantQuantitySelect.value, 10);

    let selectedMods = [];
    let materialPrice = 0;
    let hasHibrida = false; // Flag para a modificação Híbrida

    modSelectorsContainer.querySelectorAll('select').forEach(select => {
        const value = select.value;
        if (value === "nenhum/a" || value === "Material Especial") {
            // Ignora placeholders
        } else if (select.classList.contains('material-selector')) {
            // É um seletor de material
            const material = allMaterials.find(m => m.nome === value);
            if (material) {
                selectedMods.push(material.nome);
                let precoMaterial = parsePrice(material.preco, currentModalItem);

                // APLICA REGRA DE MUNIÇÃO AO PREÇO DO MATERIAL
                if (currentModalItem.tipo === 'Munição') {
                    precoMaterial /= 2;
                }
                materialPrice += precoMaterial;
            }
        } else {
            // É uma melhoria normal
            selectedMods.push(value);

            // Verifica se a modificação Híbrida está selecionada
            if (value === "Híbrida") {
                hasHibrida = true;
            }
        }
    });

    const selectedEnchants = Array.from(enchantSelectorsContainer.querySelectorAll('select'))
        .map(select => select.value)
        .filter(val => val !== "nenhum/a");

    let basePrice = parsePrice(currentModalItem.preco);
    let modSlotPrice = modificationPrices[modQty] || 0; // Preço dos "espaços"
    let enchantPrice = enchantmentPrices[enchantQty] || 0;

    // 1. Aplica a regra de Munição (divide por 2)
    if (currentModalItem.tipo === 'Munição') {
        modSlotPrice /= 2;
        enchantPrice /= 2;
        // materialPrice já foi dividido por 2 no loop acima
    }

    // =======================================================
    // 2. CORREÇÃO APLICADA: Híbrida dobra o custo dos aprimoramentos
    // =======================================================
    if (hasHibrida) {
        modSlotPrice *= 2;
        materialPrice *= 2;
        enchantPrice *= 2;
    }
    // =======================================================

    const finalPrice = (basePrice + modSlotPrice + materialPrice + enchantPrice);

    // Aplica os efeitos numéricos das melhorias e depois dos encantamentos
    const modifiedItem = applyModEffects(currentModalItem, selectedMods);
    const fullyModified = applyEnchantEffects(currentModalItem, modifiedItem, selectedEnchants);

    let customName = currentModalItem.nome;
    const customizations = [...selectedMods, ...selectedEnchants];
    if (customizations.length > 0) {
        const names = customizations.map(c => c.split(' ')[0].replace('(', ''));
        customName += ` (${names.join(', ')})`;
    }

    const inventoryItem = {
        baseItem: fullyModified,         // item com stats ajustados por melhorias + encantamentos
        customName: customName,
        quantity: quantity,
        modifications: selectedMods,
        enchantments: selectedEnchants,
        finalPrice: finalPrice,
        finalSpaces: parseSpaces(fullyModified.espacos)
    };

    inventory.push(inventoryItem);
    renderInventory();
    closeModal();
}

function removeItemFromInventory(index) {
    inventory.splice(index, 1);
    renderInventory();
}

function clearInventory() {
    inventory = [];
    renderInventory();
}

function renderInventory() {
    if (inventory.length === 0) {
        inventoryList.innerHTML = '<div class="inventory-empty">Seu inventário está vazio.</div>';
    } else {
        const rows = inventory.map((invItem, index) => {
            const item = invItem.baseItem;

            const spacesTotal = (invItem.finalSpaces || 0) * (invItem.quantity || 0);
            const isWorn = isVestido(item);

            return `
        <tr>
          <td>
            <span class="inv-name">${invItem.customName}</span>
            ${isWorn ? '<span class="inv-muted">[Vestido]</span>' : ''}
          </td>
          <td class="inv-num">T$ ${Number(invItem.finalPrice || 0).toLocaleString('pt-BR')}</td>
          <td class="inv-num">${invItem.quantity || 0}</td>
          <td class="inv-num">${spacesTotal || '—'}</td>
          <td class="inv-actions">
            <button class="remove-item-btn" data-index="${index}" title="Remover">&times;</button>
          </td>
        </tr>
      `;
        }).join('');

        inventoryList.innerHTML = `
      <div class="inventory-table-wrap">
        <table class="inventory-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Custo</th>
              <th>Qtde</th>
              <th>Espaços</th>
              <th class="inv-actions-th"></th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    `;
    }

    updateInventorySummary();
    saveInventory();
}


// SUBSTITUA A FUNÇÃO "updateInventorySummary" INTEIRA POR ESTA:

function updateInventorySummary() {
    let totalCost = 0;
    let totalSpaces = 0;
    let totalVestidos = 0;
    let totalItemsCount = 0; // NOVO: Variável para contar itens

    inventory.forEach(invItem => {
        totalCost += invItem.finalPrice * invItem.quantity;
        totalSpaces += invItem.finalSpaces * invItem.quantity;

        // NOVO: Soma a quantidade de cada item ao total
        totalItemsCount += invItem.quantity;

        if (isVestido(invItem.baseItem)) {
            totalVestidos += 1;
        }
    });

    totalCostEl.textContent = `T$ ${totalCost.toLocaleString('pt-BR')}`;
    totalSpacesEl.textContent = totalSpaces.toLocaleString('pt-BR');
    totalVestidosEl.textContent = `${totalVestidos} / 4`;

    // NOVO: Atualiza o contador vermelho no botão mobile
    if (mobileInvCount) {
        mobileInvCount.textContent = totalItemsCount;

        // Opcional: Se quiser esconder a bolinha quando for 0
        if (totalItemsCount > 0) {
            mobileInvCount.style.display = 'flex';
        } else {
            mobileInvCount.style.display = 'none';
        }
    }
}

function parsePrice(priceString, itemContext = null) {
    if (!priceString || priceString === "—" || priceString === 'Variável' || priceString === "") {
        return 0;
    }

    if (priceString.includes('/') && itemContext) {
        const parts = priceString.split('/');
        if (itemContext.categoria === 'Armadura') {
            if (itemContext.tipo.includes('Pesada')) {
                priceString = parts[0];
            } else {
                priceString = parts[1] || parts[0];
            }
        } else if (itemContext.categoria === 'Escudo') {
            priceString = parts[1] || parts[0];
        } else {
            priceString = parts[0];
        }
    }

    const cleanString = priceString.replace("T$ ", "").replace("+ ", "").replace(/\./g, "").replace(",", ".");
    return parseFloat(cleanString) || 0;
}

function parseSpaces(spaceString) {
    if (!spaceString || spaceString === "—") return 0;
    if (spaceString === "-1") return -1;
    const cleanString = spaceString.replace(",", ".");
    return parseFloat(cleanString) || 0;
}


// ===== MODAL (ATUALIZADO) =====
// SUBSTITUA A FUNÇÃO "updateCustomSelectors" INTEIRA POR ESTA:

// SUBSTITUA A FUNÇÃO "updateCustomSelectors" INTEIRA POR ESTA:

// ===== HELPER: opções de modificação disponíveis para um item =====
function getAvailableModOptions(item) {
    let opts = allModifications.filter(m => m.descricao?.includes('Todos'));

    if (item.categoria === 'Arma' || item.contaComoArma || item.tipo === 'Munição') {
        opts = opts.concat(allModifications.filter(m => m.descricao?.includes('Armas') || m.descricao?.includes('Munições')));
    } else if (item.categoria === 'Armadura') {
        let armorOpts = allModifications.filter(m => m.descricao?.includes('Armaduras'));
        // Selada: apenas Armaduras Pesadas
        armorOpts = armorOpts.filter(m => m.nome !== 'Selada' || item.tipo?.includes('Pesada'));
        opts = opts.concat(armorOpts);
    } else if (item.categoria === 'Escudo') {
        opts = opts.concat(allModifications.filter(m => m.descricao?.includes('Escudos')));
    } else if (item.tipo === 'Esotérico') {
        opts = opts.concat(allModifications.filter(m => m.descricao?.includes('Esotéricos')));
    } else if (item.tipo === 'Ferramenta' || item.tipo === 'Vestuário') {
        opts = opts.concat(allModifications.filter(m => m.descricao?.includes('Ferramentas/Vestuário') || m.descricao?.includes(item.tipo)));
    }

    const isMaterialCustomizable = ['Arma', 'Armadura', 'Escudo'].includes(item.categoria) || ['Esotérico', 'Munição', 'Vestuário'].includes(item.tipo);
    if (isMaterialCustomizable) {
        const bloqueadas = getModExcecoesPorItem(item);
        if (!bloqueadas.includes('Material Especial')) {
            opts.push(materialEspecialPlaceholder);
        }
    }

    return opts;
}

// ===== Verifica se o pré-requisito de uma melhoria está satisfeito =====
// otherSelected: array de nomes das melhorias já escolhidas nos OUTROS seletores
function isPrereqMet(nomeMelhoria, otherSelected, hasAnyOtherMod) {
    if (nomeMelhoria === 'Harmonizada (Arma)') {
        return hasAnyOtherMod;
    }
    const prereqs = modificationPrereqs[nomeMelhoria];
    if (!prereqs || prereqs.length === 0) return true; // sem pré-req → sempre visível
    return prereqs.some(p => otherSelected.includes(p));
}

// ===== Atualiza as opções de TODOS os seletores de melhoria =====
// Chamado sempre que qualquer seletor muda, para esconder/mostrar dependentes
function refreshModSelectorOptions() {
    if (!currentModalItem) return;
    const selects = Array.from(modSelectorsContainer.querySelectorAll('select:not(.material-selector)'));
    if (selects.length === 0) return;

    const allOpts = getAvailableModOptions(currentModalItem);

    selects.forEach((select, i) => {
        const currentVal = select.value;

        // O que está selecionado nos OUTROS seletores (excluindo placeholders)
        const otherSelected = selects
            .filter((_, j) => j !== i)
            .map(s => s.value)
            .filter(v => v && v !== 'nenhum/a');

        const hasAnyOtherMod = selects
            .filter((_, j) => j !== i)
            .some(s => s.value && s.value !== 'nenhum/a');

        // Filtra: mostra a opção se não tem pré-req OU se o pré-req já está selecionado em outro slot
        // E também remove opções já escolhidas em OUTROS seletores (sem duplicatas)
        // E também remove opções mutuamente excludentes com o que está selecionado
        const visibleOpts = allOpts.filter(opt => {
            // Impede duplicata
            if (otherSelected.includes(opt.nome)) return false;
            // Impede exclusão mútua
            const excludes = modificationExcludes[opt.nome] || [];
            if (excludes.some(ex => otherSelected.includes(ex))) return false;
            // Verifica pré-requisito
            return isPrereqMet(opt.nome, otherSelected, hasAnyOtherMod);
        });

        const optionsHTML = `<option value="nenhum/a">--- Escolha ---</option>` +
            visibleOpts.map(opt => `<option value="${opt.nome}">${opt.nome}</option>`).join('');

        select.innerHTML = optionsHTML;

        // Restaura a seleção anterior se ainda estiver disponível
        if (select.querySelector(`option[value="${CSS.escape(currentVal)}"]`)) {
            select.value = currentVal;
        } else {
            select.value = 'nenhum/a';
            // Remove o seletor de material abaixo, se existia para a opção removida
            const next = select.nextElementSibling;
            if (next && next.classList.contains('material-selector')) next.remove();
        }
    });
    // Após reordenar as opções, re-renderiza os stats com as melhorias ativas
    updateModalStatsFromMods();
}

function updateCustomSelectors(quantity, container, sourceList, item) {
    container.innerHTML = '';
    if (quantity === 0) return;

    let availableOptions = [];
    const isModList = sourceList.some(s => s.tipo === 'Melhoria');
    const isCurseList = sourceList.some(s => s.categoria === 'Maldição');

    if (isModList) {
        // Usa o helper — sem pré-req ainda (todos aparecem no primeiro render)
        availableOptions = getAvailableModOptions(item);

    } else if (isCurseList) {
        const itemCat = item.categoria;
        const itemTipo = item.tipo;

        if (itemCat === 'Arma' || item.contaComoArma || itemTipo === 'Munição') {
            availableOptions = sourceList.filter(m => m.tipo === 'Arma');
        } else if (itemCat === 'Armadura' || itemCat === 'Escudo' ||
            itemTipo === 'Acessório' || itemTipo === 'Vestuário' ||
            itemTipo === 'Ferramenta' || itemTipo === 'Esotérico' ||
            itemTipo === 'Esotérico Mágico') {
            availableOptions = sourceList.filter(m => m.tipo === 'Armadura/Escudo/Acessório');
        }
    } else {
        // Encantamentos
        if (item.categoria === 'Arma' || item.contaComoArma || item.tipo === 'Munição') {
            availableOptions = sourceList.filter(m => m.tipo === 'Arma' || m.tipo?.includes('Todos'));
        } else if (item.categoria === 'Armadura' || item.categoria === 'Escudo') {
            availableOptions = sourceList.filter(m => m.tipo === 'Armadura/Escudo' || m.tipo?.includes('Todos'));
        } else if (item.tipo === 'Esotérico' || item.tipo === 'Esotérico Mágico') {
            availableOptions = sourceList.filter(m => m.tipo === 'Esotérico' || m.tipo?.includes('Todos'));
        } else if (item.tipo === 'Ferramenta' || item.tipo === 'Vestuário' || item.tipo === 'Acessório') {
            availableOptions = sourceList.filter(m => m.tipo === 'Encantamento de Acessório' || m.tipo?.includes('Todos'));
        }
    }

    const optionsHTML = `<option value="nenhum/a">--- Escolha ---</option>` +
        availableOptions.map(opt => {
            const prereqText = (!isModList && opt.prereq) ? ` (Req: ${opt.prereq})` : '';
            return `<option value="${opt.nome}">${opt.nome}${prereqText}</option>`;
        }).join('');

    for (let i = 0; i < quantity; i++) {
        const select = document.createElement('select');
        select.innerHTML = optionsHTML;
        container.appendChild(select);
    }

    // Aplica filtro de pré-requisitos imediatamente (no 1º render, nada ainda selecionado,
    // então só oculta opções que têm pré-req — todas estarão sem seleção)
    if (isModList) refreshModSelectorOptions();
    else if (!isCurseList) refreshEnchantSelectorOptions();
}


// ===== HELPER: Reduzir a margem de ameaça =====
function reduceCritMargin(critString, amount) {
    if (!critString || critString === '—') return critString;
    let start = 20;
    let mult = "x2";
    if (critString.includes('/')) {
        start = parseInt(critString.split('/')[0]);
        mult = critString.split('/')[1];
    } else if (critString.startsWith('x')) {
        start = 20;
        mult = critString;
    } else {
        start = parseInt(critString);
        mult = "x2";
    }
    start = Math.max(2, start - amount);
    if (start === 20) return mult;
    if (mult === "x2") return String(start);
    return `${start}/${mult}`;
}

// ===== EFEITOS NUMÉRICOS DAS MODIFICAÇÕES =====
/**
 * Recebe o item base e a lista de nomes de melhorias selecionadas.
 * Retorna um NOVO objeto com os stats já modificados para exibição/exportação.
 */
function applyModEffects(item, selectedModNames) {
    const modified = { ...item };

    let penaltyDelta = 0;
    let defenseDelta = 0;
    let spacesDelta = 0;

    const hasSobMedida = selectedModNames.includes('Sob Medida');

    for (const modName of selectedModNames) {
        switch (modName) {
            case 'Maciça':
                // +1 no multiplicador de crítico (ex: "x2" → "x3")
                if (modified.critico) {
                    modified.critico = modified.critico.replace(/x(\d+)/i, (_, n) => `x${parseInt(n) + 1}`);
                }
                break;

            case 'Precisa':
                modified.critico = reduceCritMargin(modified.critico, 1);
                break;

            case 'Ajustada':
                // -1 penalidade — só conta se Sob Medida NÃO estiver selecionada (não acumulam)
                if (!hasSobMedida) penaltyDelta += 1;
                break;

            case 'Sob Medida':
                // -2 penalidade (substitui Ajustada quando ambas estão presentes)
                penaltyDelta += 2;
                break;

            case 'Reforçada':
                defenseDelta += 1;
                penaltyDelta -= 1;
                break;

            case 'Discreto':
                spacesDelta -= 1;
                break;
            case 'Casco Monstruoso (Armadura Leve/Escudo)':
            case 'Casco Monstruoso (Armadura Pesada)':
                penaltyDelta += 1;
                break;
            case 'Couro de Dragão (Armadura Leve/Escudo)':
                defenseDelta += 1;
                break;
            case 'Couro de Dragão (Armadura Pesada)':
                defenseDelta += 2;
                break;
            case 'Mitral (Arma)':
                modified.critico = reduceCritMargin(modified.critico, 1);
                break;
            case 'Mitral (Armadura Pesada)':
            case 'Mitral (Armadura Leve/Escudo)':
                penaltyDelta += 2;
                break;
            case 'Quitina Razza (Armadura Leve/Escudo)':
                defenseDelta += 1;
                break;
            case 'Quitina Razza (Armadura Pesada)':
                defenseDelta += 2;
                break;
            case 'Tixonessica (Vestuário)':
                defenseDelta += 2;
                spacesDelta += 1;
                break;
        }
    }

    // Aplica deltas numéricos
    if (penaltyDelta !== 0) {
        let penStr = String(modified.penalidade_armadura || 0).replace(/[—–]/g, '-');
        modified.penalidade_armadura = String(parseInt(penStr) + penaltyDelta);
    }
    if (defenseDelta !== 0) {
        let defStr = String(modified.bonus_defesa || 0).replace(/[—–]/g, '-').replace('+', '');
        let newDef = parseInt(defStr) + defenseDelta;
        modified.bonus_defesa = (newDef >= 0 ? "+" : "") + newDef;
    }
    if (spacesDelta !== 0) {
        const baseSpaces = parseSpaces(item.espacos); // usa o original, não o acumulado
        modified.espacos = String(Math.max(1, baseSpaces + spacesDelta));
    }

    return modified;
}

// ===== RENDER DE STATS DO MODAL (reutilizável) =====
function renderModalStats(item) {
    document.getElementById('weaponStats').innerHTML = '';
    document.getElementById('armorStats').innerHTML = '';

    const oldSpacesContainer = document.getElementById('modalSpaces')?.closest('.modal-section');
    if (oldSpacesContainer) oldSpacesContainer.style.display = 'none';

    let statsHTML = '';

    if (item.dano) {
        statsHTML += `
            <div class="stat-box"><p class="stat-label">Dano</p><p class="stat-value">${item.dano}</p></div>
            <div class="stat-box"><p class="stat-label">Crítico</p><p class="stat-value">${item.critico}</p></div>
            <div class="stat-box"><p class="stat-label">Alcance</p><p class="stat-value">${item.alcance || '—'}</p></div>
            <div class="stat-box"><p class="stat-label">Tipo</p><p class="stat-value">${item.tipo_dano || '—'}</p></div>`;
    }

    if (item.bonus_defesa) {
        statsHTML += `
            <div class="stat-box"><p class="stat-label">Defesa</p><p class="stat-value">${item.bonus_defesa}</p></div>
            <div class="stat-box"><p class="stat-label">Penalidade</p><p class="stat-value">${item.penalidade_armadura || '0'}</p></div>`;
    }

    statsHTML += `<div class="stat-box"><p class="stat-label">Espaços</p><p class="stat-value">${item.espacos || '—'}</p></div>`;

    if (isVestido(item)) {
        statsHTML += `
            <div class="stat-box" style="background-color:rgba(74,222,128,0.1);border:1px solid var(--success-color);">
                <p class="stat-label" style="color:var(--success-color);">Vestido</p>
                <p class="stat-value" style="color:var(--success-color);">Sim</p>
            </div>`;
    }

    document.getElementById('weaponStats').innerHTML = `<div class="modal-stats">${statsHTML}</div>`;
    document.getElementById('modalSpaces').textContent = item.espacos || '—';
}

function getActiveModNames() {
    return Array.from(modSelectorsContainer.querySelectorAll('select'))
        .map(s => s.value)
        .filter(v => v && v !== 'nenhum/a' && v !== 'Material Especial');
}

function getActiveEnchantNames() {
    return Array.from(enchantSelectorsContainer.querySelectorAll('select'))
        .map(s => s.value)
        .filter(v => v && v !== 'nenhum/a');
}

// ===== EFEITOS NUMÉRICOS DOS ENCANTAMENTOS =====
function applyEnchantEffects(baseItem, modifiedItem, selectedEnchantNames) {
    const result = { ...modifiedItem };

    const hasGuardião = selectedEnchantNames.includes('Encanto Guardião');
    let defenseDelta = 0;

    for (const enchName of selectedEnchantNames) {
        switch (enchName) {
            case 'Encanto Ameaçadora':
                if (baseItem.critico && baseItem.critico !== '—') {
                    let baseStart = 20;
                    if (baseItem.critico.includes('/')) {
                        baseStart = parseInt(baseItem.critico.split('/')[0]);
                    } else if (!baseItem.critico.startsWith('x')) {
                        baseStart = parseInt(baseItem.critico);
                    }
                    const baseMarginSize = 21 - baseStart;
                    result.critico = reduceCritMargin(result.critico, baseMarginSize);
                }
                break;

            case 'Encanto Defensor':
                if (!hasGuardião) defenseDelta += 2; // Não acumula quando Guardião está ativo
                break;

            case 'Encanto Guardião':
                defenseDelta += 4; // Substitui Defensor (+4 no total, não +2+4)
                break;
        }
    }

    if (defenseDelta !== 0 && result.bonus_defesa) {
        let defStr = String(result.bonus_defesa || 0).replace(/[—–]/g, '-');
        result.bonus_defesa = String(parseInt(defStr) + defenseDelta);
    }

    return result;
}

function updateModalStatsFromMods() {
    if (!currentModalItem) return;
    const activeMods = getActiveModNames();
    const activeEnchants = getActiveEnchantNames();
    const modifiedByMods = applyModEffects(currentModalItem, activeMods);
    const fullyModified = applyEnchantEffects(currentModalItem, modifiedByMods, activeEnchants);
    renderModalStats(fullyModified);
}

// ===== REFRESH DOS SELETORES DE ENCANTAMENTO (pré-requisitos + duplicatas) =====
function refreshEnchantSelectorOptions() {
    if (!currentModalItem) return;
    const selects = Array.from(enchantSelectorsContainer.querySelectorAll('select'));
    if (selects.length === 0) return;

    const item = currentModalItem;

    // Determina o pool correto para este item
    let fullPool = [];
    if (item.categoria === 'Arma' || item.contaComoArma || item.tipo === 'Munição') {
        fullPool = allEnchantments.filter(m => m.tipo === 'Arma' || m.tipo?.includes('Todos'));
    } else if (item.categoria === 'Armadura' || item.categoria === 'Escudo') {
        fullPool = allEnchantments.filter(m => m.tipo === 'Armadura/Escudo' || m.tipo?.includes('Todos'));
    } else if (item.tipo === 'Esotérico' || item.tipo === 'Esotérico Mágico') {
        fullPool = allEsotericEnchantments;
    } else if (item.tipo === 'Ferramenta' || item.tipo === 'Vestuário' || item.tipo === 'Acessório') {
        fullPool = allAccessoryEnchantments;
    }

    selects.forEach((select, i) => {
        const currentVal = select.value;

        const otherSelected = selects
            .filter((_, j) => j !== i)
            .map(s => s.value)
            .filter(v => v && v !== 'nenhum/a');

        const visibleOpts = fullPool.filter(opt => {
            // Sem duplicatas
            if (otherSelected.includes(opt.nome)) return false;
            // Pré-requisito: mostra só se o prereq já está selecionado em outro slot
            const prereqs = enchantmentPrereqs[opt.nome];
            if (!prereqs || prereqs.length === 0) return true;
            return prereqs.some(p => otherSelected.includes(p));
        });

        const optionsHTML = `<option value="nenhum/a">--- Escolha ---</option>` +
            visibleOpts.map(opt => `<option value="${opt.nome}">${opt.nome}</option>`).join('');

        select.innerHTML = optionsHTML;

        // Restaura seleção anterior se ainda disponível
        if (select.querySelector(`option[value="${CSS.escape(currentVal)}"]`)) {
            select.value = currentVal;
        } else {
            select.value = 'nenhum/a';
        }
    });

    updateModalStatsFromMods();
}

function openModal(index) {
    currentModalItem = filteredItems[index];
    currentModalIndex = index;
    const item = currentModalItem;

    if (!item) {
        console.error("Item não encontrado para o índice:", index);
        return;
    }

    // Reseta o customizador
    itemCustomizer.style.display = 'none';
    modQuantitySelect.value = 0;
    enchantQuantitySelect.value = 0;
    modSelectorsContainer.innerHTML = '';
    enchantSelectorsContainer.innerHTML = '';

    // NOVO: Reseta o customizador de maldição
    curseCheckbox.checked = false;
    curseQuantityContainer.style.display = 'none';
    curseQuantitySelect.value = 0;
    curseSelectorsContainer.innerHTML = '';


    addItemBtn.style.display = 'flex';
    document.querySelector('.modal-add-item').style.display = 'flex';


    const isCustomizable = [
        'Arma',
        'Armadura',
        'Escudo'
    ].includes(item.categoria) || [
        'Esotérico',
        'Ferramenta',
        'Vestuário',
        'Munição',
        'Acessório' // Acessórios também podem ser customizados
    ].includes(item.tipo);

    const isModOrEnchant = item.categoria === 'Item Superior' || allEnchantments.some(enc => enc.nome === item.nome) || allEsotericEnchantments.some(enc => enc.nome === item.nome) || allAccessoryEnchantments.some(enc => enc.nome === item.nome);
    const isCurse = item.categoria === 'Maldição';

    if (isCustomizable) {
        itemCustomizer.style.display = 'flex';

        // Esconde encantamentos para itens que não os têm
        if ((item.tipo === 'Ferramenta' || item.tipo === 'Vestuário') && !item.contaComoArma) {
            enchantQuantitySelect.parentElement.parentElement.style.display = 'none';
        } else {
            enchantQuantitySelect.parentElement.parentElement.style.display = 'block';
        }

    } else if (isModOrEnchant || isCurse) {
        document.querySelector('.modal-add-item').style.display = 'none';
    } else if (item.preco.startsWith('+') || item.preco === 'Variável' || item.preco === "") {
        document.querySelector('.modal-add-item').style.display = 'none';
    }


    document.getElementById('modalTitle').textContent = item.nome;
    document.getElementById('modalPrice').textContent = item.preco || "—";

    const modalImage = document.getElementById('modalImage');
    const imagePath = getImagePath(item);

    if (imagePath) {
        modalImage.src = imagePath;
        modalImage.style.display = 'block';
    } else {
        modalImage.style.display = 'none';
    }

    const sourceBadge = item.fonte ? `<span class="badge badge-fonte">${item.fonte}</span>` : '';
    const badgesContainer = document.getElementById('modalBadges');
    badgesContainer.innerHTML = `
        ${item.categoria ? `<span class="badge badge-cat">${item.categoria}</span>` : ''}
        ${item.tipo ? `<span class="badge badge-tipo">${item.tipo}</span>` : ''}
        ${item.empunhadura ? `<span class="badge badge-extra">${item.empunhadura}</span>` : ''}
        ${isVestido(item) ? '<span class="badge badge-vestido">Vestido</span>' : ''}
        ${sourceBadge}
    `;

    document.getElementById('modalDescription').textContent = item.descricao;

    // Ações extras no modal (botões de link para outros apps)
    const modalCustomActions = document.getElementById('modalCustomActions');
    if (modalCustomActions) {
        if (item.nome === 'Comprar Criatura (Serviço)' || item.nome === 'Comprar Construto (Serviço)') {
            modalCustomActions.innerHTML = `<a href="../parceiros/index.html" class="add-item-btn" style="justify-content:center; text-decoration:none;">🦅 Ver Parceiros</a>`;
        } else {
            modalCustomActions.innerHTML = '';
        }
    }

    // Renderiza os stats base (sem melhorias ainda)
    renderModalStats(item);

    modalQuantityInput.value = "1";

    document.querySelector('.modal-nav-prev').disabled = currentModalIndex === 0;
    document.querySelector('.modal-nav-next').disabled = currentModalIndex === filteredItems.length - 1;

    itemModal.classList.add('active');
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    itemModal.classList.remove('active');
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentModalItem = null;
}

function navigateModal(direction) {
    const newIndex = currentModalIndex + direction;
    if (newIndex >= 0 && newIndex < filteredItems.length) {
        currentModalIndex = newIndex;
        openModal(currentModalIndex);
    }
}

function enviarInventarioCompletoParaFicha() {
    if (!inventory || inventory.length === 0) {
        alert("O inventário está vazio! Adicione itens antes de exportar.");
        return;
    }

    // Monta os itens no formato completo esperado pela ficha
    const itensParaEnviar = inventory.map(invItem => {
        const item = invItem.baseItem;
        const noteLines = [];
        if (item.descricao) noteLines.push(item.descricao);
        if (invItem.modifications?.length) noteLines.push('📌 Modificações: ' + invItem.modifications.join(', '));
        if (invItem.enchantments?.length) noteLines.push('✨ Encantamentos: ' + invItem.enchantments.join(', '));

        return {
            name: invItem.customName || item.nome || 'Item',
            qtd: String(invItem.quantity || 1),
            slots: String(invItem.finalSpaces ?? 0),
            note: noteLines.join('\n'),
            combatData: item.dano ? {
                nome: invItem.customName || item.nome,
                dano: item.dano,
                critico: item.critico,
                tipo_dano: item.tipo_dano || '',
                alcance: item.alcance || ''
            } : null,
            defenseData: item.bonus_defesa ? {
                nome: invItem.customName || item.nome,
                bonus: item.bonus_defesa,
                penalidade: item.penalidade_armadura || '0',
                tipo: item.tipo || ''
            } : null
        };
    });

    // Sobrescreve a fila — ao clicar "Enviar", substitui qualquer envio anterior pendente
    localStorage.setItem('t20_sheet_queue', JSON.stringify(itensParaEnviar));

    alert(`${itensParaEnviar.length} item(s) preparado(s) para a ficha!\n\nClique em "Sync Loja" na ficha para importar, ou ela importará ao abrir.`);

    window.open('../ficha/', '_blank');
}

// ===== MAPA DE IMAGENS (SIMPLIFICADO) =====
function getImagePath(item) {
    if (!item) return null;
    return item.imagem || null;
}

// ===================================================
// ===== RANDOMIZADOR DE ITENS =====
// ===================================================

let randMode = 'aleatorio';
let currentRandomResult = null;

function openRandomizerModal() {
    const modal = document.getElementById('randomizerModal');
    const overlay = document.getElementById('modalOverlay');
    document.getElementById('randResult').style.display = 'none';
    document.getElementById('randConfig').style.display = 'flex';
    currentRandomResult = null;
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeRandomizerModal() {
    document.getElementById('randomizerModal').classList.remove('active');
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function setRandMode(mode) {
    randMode = mode;
    document.getElementById('randModeAleatorio').classList.toggle('active', mode === 'aleatorio');
    document.getElementById('randModeEscolher').classList.toggle('active', mode === 'escolher');
    document.getElementById('randModeItem').classList.toggle('active', mode === 'item');
    document.getElementById('randCategorySection').style.display = mode === 'escolher' ? 'flex' : 'none';
    document.getElementById('randItemSection').style.display = mode === 'item' ? 'flex' : 'none';
    if (mode === 'item') populateItemPicker();
}

function populateItemPicker() {
    const cat = document.getElementById('randItemCatFilter').value;
    const select = document.getElementById('randItemSelect');
    const pool = allItems.filter(item =>
        (item.categoria === cat || item.tipo === cat) && isRandomizable(item)
    ).sort((a, b) => a.nome.localeCompare(b.nome));

    select.innerHTML = pool.length > 0
        ? pool.map(item => `<option value="${item.nome}">${item.nome}</option>`).join('')
        : '<option value="">Nenhum item disponível</option>';
}

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const RANDOMIZABLE_CATS = ['Arma', 'Armadura', 'Escudo'];
const RANDOMIZABLE_TIPOS = ['Esotérico', 'Ferramenta', 'Vestuário', 'Munição', 'Acessório'];

function isRandomizable(item) {
    return RANDOMIZABLE_CATS.includes(item.categoria) || RANDOMIZABLE_TIPOS.includes(item.tipo);
}

/**
 * Extrai a lista de categorias/tipos aplicáveis de uma modificação
 * lendo o campo descricao ("Aplicável em: X" ou "Melhoria para X").
 * Retorna um array com os valores de categoria/tipo compatíveis.
 */
function getModAplicavelEm(mod) {
    const desc = mod.descricao || '';
    const TODOS = ['Arma', 'Armadura', 'Escudo', 'Esotérico', 'Ferramenta', 'Vestuário', 'Munição'];

    // Extrai o trecho após "Aplicável em:" ou "Melhoria para"
    const match = desc.match(/Aplicável em:\s*([^.(]+)/i)
        || desc.match(/Melhoria para\s+([^.(,]+)/i);

    if (!match) return TODOS; // sem restrição explícita → aplica em tudo

    const texto = match[1];
    if (/todos/i.test(texto)) return TODOS;

    const result = [];

    // IMPORTANTE: checar 'Armadura' ANTES de 'Arma', e usar \b para evitar
    // que "Armaduras" dê match no teste de "Armas" (substring collision)
    if (/\barmaduras?\b/i.test(texto)) result.push('Armadura');
    if (/\bescudos?\b/i.test(texto)) result.push('Escudo');
    if (/\barmas?\b/i.test(texto)) result.push('Arma');   // "Armas" mas não "Armaduras"
    if (/\bmunições?\b|\bmunição\b/i.test(texto)) result.push('Munição');
    if (/\besotéric/i.test(texto)) result.push('Esotérico');
    if (/\bferramentas?\b/i.test(texto)) result.push('Ferramenta');
    if (/\bvestuário\b/i.test(texto)) result.push('Vestuário');

    return result.length > 0 ? result : TODOS;
}

/**
 * Extrai da descrição do ITEM quais modificações estão explicitamente proibidas.
 * Retorna um array com os nomes das modificações bloqueadas.
 *
 * Padrões detectados na descricao do item:
 *  - "Não pode receber material especial" → bloqueia 'Material Especial'
 *  - "Não pode ter penalidade reduzida"   → bloqueia 'Ajustada' e 'Sob Medida'
 */
function getModExcecoesPorItem(item) {
    const bloqueadas = [];

    // Itens com restrição explícita na descrição
    if (/não pode receber (melhoria )?material especial/i.test(item.descricao)) {
        bloqueadas.push('Material Especial');
    }

    if (/não pode ter penalidade reduzida/i.test(item.descricao)) {
        bloqueadas.push('Ajustada', 'Sob Medida');
    }

    // Itens nomeados que não aceitam Material Especial
    const semMaterialEspecial = [
        'Presa de Serpente',         // Arma
        'Armadura de Pedra',         // Armadura
        'Veste de Teia de Aranha'    // Armadura
    ];
    if (semMaterialEspecial.includes(item.nome)) {
        bloqueadas.push('Material Especial');
    }

    return bloqueadas;
}

/**
 * Verifica se uma modificação é compatível com o item:
 * 1. A modificação precisa ser aplicável na categoria/tipo do item.
 * 2. O item não pode proibir explicitamente essa modificação.
 */
function isModCompativel(mod, item) {
    const bloqueadas = getModExcecoesPorItem(item);
    if (bloqueadas.includes(mod.nome)) return false;

    const aplicavel = getModAplicavelEm(mod);
    return aplicavel.includes(item.categoria) || aplicavel.includes(item.tipo);
}

/**
 * Retorna o pool de encantamentos correto para o item base.
 */
function getEnchPoolForItem(item) {
    if (item.categoria === 'Arma' || item.contaComoArma || item.tipo === 'Munição') {
        return allEnchantments.filter(e => e.tipo === 'Arma');
    }
    if (item.categoria === 'Armadura' || item.categoria === 'Escudo') {
        return allEnchantments.filter(e => e.tipo === 'Armadura/Escudo');
    }
    if (item.tipo === 'Esotérico' || item.tipo === 'Esotérico Mágico') {
        return allEsotericEnchantments;
    }
    if (item.tipo === 'Acessório' || item.tipo === 'Vestuário' || item.tipo === 'Ferramenta') {
        return allAccessoryEnchantments;
    }
    return allEnchantments; // fallback
}

function generateRandomItem() {
    let baseItem;

    if (randMode === 'aleatorio') {
        const pool = allItems.filter(isRandomizable);
        if (pool.length === 0) { alert('Nenhum item disponível. Verifique se os dados foram carregados.'); return; }
        baseItem = pickRandom(pool);

    } else if (randMode === 'escolher') {
        const cat = document.getElementById('randCategorySelect').value;
        const pool = allItems.filter(item => (item.categoria === cat || item.tipo === cat) && isRandomizable(item));
        if (pool.length === 0) { alert('Nenhum item disponível nessa categoria.'); return; }
        baseItem = pickRandom(pool);

    } else { // modo 'item'
        const nomeSelecionado = document.getElementById('randItemSelect').value;
        baseItem = allItems.find(item => item.nome === nomeSelecionado);
        if (!baseItem) { alert('Item não encontrado.'); return; }
    }

    const modQtyVal = parseInt(document.getElementById('randModQty').value);
    const enchQtyVal = parseInt(document.getElementById('randEnchQty').value);
    const modQty = modQtyVal === -1 ? Math.floor(Math.random() * 5) : modQtyVal;
    const enchQty = enchQtyVal === -1 ? Math.floor(Math.random() * 4) : enchQtyVal;

    // Pool de modificações filtrado pela função de compatibilidade
    const modsPool = allModifications.filter(m => isModCompativel(m, baseItem));
    const selectedMods = [];
    const availableMods = [...modsPool];
    for (let i = 0; i < modQty && availableMods.length > 0; i++) {
        const idx = Math.floor(Math.random() * availableMods.length);
        selectedMods.push(availableMods.splice(idx, 1)[0]);
    }

    // Pool de encantamentos filtrado pelo tipo do item
    const enchPool = getEnchPoolForItem(baseItem);
    const selectedEnchs = [];
    const availableEnchs = [...enchPool];
    for (let i = 0; i < enchQty && availableEnchs.length > 0; i++) {
        const idx = Math.floor(Math.random() * availableEnchs.length);
        selectedEnchs.push(availableEnchs.splice(idx, 1)[0]);
    }

    const basePrice = parsePrice(baseItem.preco);
    const modSlotPrice = modificationPrices[modQty] || 0;
    const enchPrice = enchantmentPrices[enchQty] || 0;
    const finalPrice = basePrice + modSlotPrice + enchPrice;

    let customName = baseItem.nome;
    const allCustomNames = [...selectedMods.map(m => m.nome), ...selectedEnchs.map(e => e.nome)];
    if (allCustomNames.length > 0) {
        customName += ` (${allCustomNames.map(c => c.split(' ')[0].replace('(', '')).join(', ')})`;
    }

    currentRandomResult = {
        baseItem, customName,
        modifications: selectedMods,
        enchantments: selectedEnchs,
        modQty, enchQty, finalPrice,
        finalSpaces: parseSpaces(baseItem.espacos)
    };

    renderRandomResult(currentRandomResult);
}

function renderRandomResult(result) {
    const { baseItem, customName, modifications, enchantments, finalPrice } = result;

    document.getElementById('randResultName').textContent = customName;
    document.getElementById('randResultPrice').textContent = `T$ ${finalPrice.toLocaleString('pt-BR')}`;
    document.getElementById('randResultDesc').textContent = baseItem.descricao || '—';

    const sourceBadge = baseItem.fonte ? `<span class="badge badge-fonte">${baseItem.fonte}</span>` : '';
    document.getElementById('randResultBadges').innerHTML = `
        ${baseItem.categoria ? `<span class="badge badge-cat">${baseItem.categoria}</span>` : ''}
        ${baseItem.tipo ? `<span class="badge badge-tipo">${baseItem.tipo}</span>` : ''}
        ${isVestido(baseItem) ? '<span class="badge badge-vestido">Vestido</span>' : ''}
        ${sourceBadge}
    `;

    let statsHTML = '';
    if (baseItem.dano) {
        statsHTML += `
            <div class="stat-box"><p class="stat-label">Dano</p><p class="stat-value">${baseItem.dano}</p></div>
            <div class="stat-box"><p class="stat-label">Crítico</p><p class="stat-value">${baseItem.critico}</p></div>
            <div class="stat-box"><p class="stat-label">Alcance</p><p class="stat-value">${baseItem.alcance || '—'}</p></div>
        `;
    }
    if (baseItem.bonus_defesa) {
        statsHTML += `
            <div class="stat-box"><p class="stat-label">Defesa</p><p class="stat-value">${baseItem.bonus_defesa}</p></div>
            <div class="stat-box"><p class="stat-label">Penalidade</p><p class="stat-value">${baseItem.penalidade_armadura}</p></div>
        `;
    }
    statsHTML += `<div class="stat-box"><p class="stat-label">Espaços</p><p class="stat-value">${baseItem.espacos || '—'}</p></div>`;
    document.getElementById('randResultStats').innerHTML = statsHTML;

    let custHTML = '';
    if (modifications.length > 0) {
        custHTML += `<div class="rand-custom-group">
            <p class="rand-custom-group-title">Modificações (${result.modQty})</p>
            ${modifications.map(m => `
                <p class="rand-custom-item">• ${m.nome}</p>
                <p class="rand-custom-item-desc">${m.descricao || ''}</p>
            `).join('')}
        </div>`;
    }
    if (enchantments.length > 0) {
        custHTML += `<div class="rand-custom-group">
            <p class="rand-custom-group-title">Encantamentos (${result.enchQty})</p>
            ${enchantments.map(e => `
                <p class="rand-custom-item">• ${e.nome}</p>
                <p class="rand-custom-item-desc">${e.descricao || ''}</p>
            `).join('')}
        </div>`;
    }
    document.getElementById('randResultCustomizations').innerHTML = custHTML;
    document.getElementById('randResult').style.display = 'flex';
}

function exportToSheet(index, btnEl) {
    const invItem = inventory[index];
    const item = invItem.baseItem;

    // Monta o texto de anotação
    const noteLines = [];
    if (item.descricao) noteLines.push(item.descricao);
    if (invItem.modifications?.length) noteLines.push('📌 Modificações: ' + invItem.modifications.join(', '));
    if (invItem.enchantments?.length) noteLines.push('✨ Encantamentos: ' + invItem.enchantments.join(', '));
    if (item.dano) noteLines.push(`⚔️ Dano: ${item.dano} | Crítico: ${item.critico} | Tipo: ${item.tipo_dano || '—'} | Alcance: ${item.alcance || '—'}`);
    if (item.bonus_defesa) noteLines.push(`🛡️ Defesa: ${item.bonus_defesa} | Penalidade: ${item.penalidade_armadura || '0'}`);

    const transferItem = {
        name: invItem.customName,
        qtd: String(invItem.quantity),
        slots: String(invItem.finalSpaces || 0),
        note: noteLines.join('\n'),
        combatData: item.dano ? {
            nome: invItem.customName,
            dano: item.dano,
            critico: item.critico,
            tipo_dano: item.tipo_dano || '',
            alcance: item.alcance || ''
        } : null,
        defenseData: item.bonus_defesa ? {
            nome: invItem.customName,
            bonus: item.bonus_defesa,
            penalidade: item.penalidade_armadura || '0'
        } : null
    };

    const queue = JSON.parse(localStorage.getItem('t20_sheet_queue') || '[]');
    queue.push(transferItem);
    localStorage.setItem('t20_sheet_queue', JSON.stringify(queue));

    // Feedback visual no botão
    if (btnEl) {
        const original = btnEl.textContent;
        btnEl.textContent = '✅';
        btnEl.disabled = true;
        setTimeout(() => { btnEl.textContent = original; btnEl.disabled = false; }, 2500);
    }
}

function autoExportToSheet(invItem) {
    const item = invItem.baseItem;

    // Anotação: apenas descrição e modificações — dados de combate/defesa ficam nos botões
    const noteLines = [];
    if (item.descricao) noteLines.push(item.descricao);
    if (invItem.modifications?.length) noteLines.push('📌 Modificações: ' + invItem.modifications.join(', '));
    if (invItem.enchantments?.length) noteLines.push('✨ Encantamentos: ' + invItem.enchantments.join(', '));

    const transferItem = {
        name: invItem.customName,
        qtd: String(invItem.quantity),
        slots: String(invItem.finalSpaces || 0),
        note: noteLines.join('\n'),
        combatData: item.dano ? {
            nome: invItem.customName,
            dano: item.dano,
            critico: item.critico,
            tipo_dano: item.tipo_dano || '',
            alcance: item.alcance || ''
        } : null,
        defenseData: item.bonus_defesa ? {
            nome: invItem.customName,
            bonus: item.bonus_defesa,
            penalidade: item.penalidade_armadura || '0',
            tipo: item.tipo || ''   // "Armadura Leve", "Armadura Pesada", "Escudo Leve", "Escudo Pesado"
        } : null
    };

    // Apenas fila no localStorage — o storage event notifica a ficha sem duplicar
    const queue = JSON.parse(localStorage.getItem('t20_sheet_queue') || '[]');
    queue.push(transferItem);
    localStorage.setItem('t20_sheet_queue', JSON.stringify(queue));

    showShopToast(`📋 <strong>${invItem.customName}</strong> enviado para a ficha!`);
}

function showShopToast(html) {
    const t = document.createElement('div');
    t.className = 'shop-toast';
    t.innerHTML = html;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2800);
}

function addRandomItemToInventory() {
    if (!currentRandomResult) return;
    const qty = parseInt(document.getElementById('randResultQty').value, 10) || 1;

    const inventoryItem = {
        baseItem: currentRandomResult.baseItem,
        customName: currentRandomResult.customName,
        quantity: qty,
        modifications: currentRandomResult.modifications.map(m => m.nome),
        enchantments: currentRandomResult.enchantments.map(e => e.nome),
        finalPrice: currentRandomResult.finalPrice,
        finalSpaces: currentRandomResult.finalSpaces
    };

    inventory.push(inventoryItem);
    renderInventory();
    closeRandomizerModal();
}
