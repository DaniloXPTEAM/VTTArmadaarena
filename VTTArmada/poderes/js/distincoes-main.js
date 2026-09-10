let _distincaoAberta = null;
let _savedScrollPos = 0; // Stores scroll position when opening a distinction
let distincoesState = { source: 'all', search: '' }; // Filter state for distinctions

const distincoesContainer = document.getElementById('distincoesContainer');
const distincoesSearchInput = document.getElementById('distincoesSearch');

function renderDistincoes() {
    if (!distincoesContainer || !distincoesSearchInput) return;

    const term = distincoesSearchInput.value.toLowerCase();
    distincoesContainer.innerHTML = '';

    if (_distincaoAberta) {
        renderPoderesDaDistincao(_distincaoAberta);
        return;
    }

    const filtradas = distincoesData.filter(d => {
        const source = d.source || 'herois';
        const sourceMatch = distincoesState.source === 'all' || distincoesState.source === source;
        const termMatch = d.name.toLowerCase().includes(term) || d.admissao.toLowerCase().includes(term);
        return sourceMatch && termMatch;
    });

    filtradas.forEach(dist => {
        const card = document.createElement('div');
        const jaIngressou = cart.some(p => p.originId === dist.id);

        card.className = `power-card distinction-card ${jaIngressou ? 'distinction-in-cart' : ''}`;
        card.style.cursor = 'pointer';

        card.innerHTML = `
            <div class="power-header">
                <span class="power-name" style="font-size:1.4rem;">${dist.name}</span>
                <span class="power-type badge-distinction">Distinção</span>
            </div>
            <div class="distinction-admissao">${dist.admissao}</div>
            <div class="distinction-marca">
                <strong>${dist.marca.name}</strong>
                <span>${dist.marca.desc}</span>
            </div>
            <div class="power-hint">Clique para ver os poderes desta distinção</div>
            <div style="margin-top:15px;" onclick="event.stopPropagation();">
                <button class="modal-cart-btn" style="width:100%;" onclick="adicionarDistincaoAoCarrinho('${dist.id}')">
                    ${jaIngressou ? '✓ Já Ingressou' : '＋ Ingressar nesta Distinção'}
                </button>
            </div>
        `;

        card.addEventListener('click', () => {
            // Save current scroll position before opening the distinction details
            _savedScrollPos = window.scrollY || window.pageYOffset;
            _distincaoAberta = dist;
            renderDistincoes();
        });

        distincoesContainer.appendChild(card);
    });
}

function renderPoderesDaDistincao(dist) {
    const container = distincoesContainer;
    container.innerHTML = '';

    // Botão Voltar e Título
    const header = document.createElement('div');
    header.style.cssText = 'grid-column: 1/-1; margin-bottom: 20px;';
    header.innerHTML = `
        <button class="view-btn active" style="background: var(--str-accent); color: white; border: none; padding: 8px 16px; border-radius: 20px; cursor: pointer;" 
                onclick="voltarParaListaDistincoes()">← Voltar</button>
        <h2 style="color:#d4af37; margin-top:15px; font-family:serif;">Poderes de ${dist.name}</h2>
    `;
    container.appendChild(header);

    // Bloco Colapsável de Regras Extras
    if (dist.detalhes) {
        const detailsEl = document.createElement('details');
        detailsEl.className = 'distinction-rules-collapsible'; // Nova classe para o CSS
        detailsEl.innerHTML = `
            <summary class="rules-summary">
                <span>${dist.detalhes.titulo}</span>
                <span class="summary-hint">(clique para expandir)</span>
            </summary>
            <div class="distinction-rules-box">
                <p style="font-size: 0.9rem; line-height: 1.5; margin-bottom: 15px;">${dist.detalhes.conteudo}</p>
                <div class="arsenal-grid">
                    ${dist.detalhes.arsenal.map(a => `
                        <div class="arsenal-item">
                            <strong>${a.n}</strong>
                            <span>${a.d}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        container.appendChild(detailsEl);
    }

    const powersList = dist.poderes.map(power => ({
        name: power.name,
        type: 'distinction-power',
        category: `Poder (${dist.name})`,
        req: power.req,
        desc: power.desc
    }));

    dist.poderes.forEach((power, idx) => {
        const card = document.createElement('div');
        const poderNoCarrinho = cart.some(p => p.name === power.name);

        card.className = `power-card ${poderNoCarrinho ? 'distinction-in-cart' : ''}`;
        card.style.cursor = 'pointer';

        card.innerHTML = `
            <div class="power-header">
                <span class="power-name">${power.name}</span>
                <span class="power-type">Poder (${dist.name})</span>
            </div>
            <div class="power-meta"><strong>Pré-requisito:</strong> ${power.req}</div>
            <div class="power-desc">${power.desc}</div>
            <div class="power-hint">Clique para adicionar ao carrinho</div>
        `;

        card.addEventListener('click', () => {
            if (typeof openModal === 'function') openModal(powersList[idx], powersList);
        });

        distincoesContainer.appendChild(card);
    });
}

function voltarParaListaDistincoes() {
    _distincaoAberta = null;
    renderDistincoes();
    // Restore previous scroll position when returning to the list
    window.scrollTo(0, _savedScrollPos);
}

function adicionarDistincaoAoCarrinho(distId) {
    const dist = distincoesData.find(d => d.id === distId);
    if (!dist) return;

    const itemMarca = {
        name: dist.marca.name,
        type: 'distinction',
        category: 'Distinção',
        req: `Distinção: ${dist.name}`,
        desc: dist.marca.desc,
        originId: dist.id // NOVO: Campo para diferenciar marcas com nomes iguais
    };

    // Agora buscamos pelo originId em vez de apenas pelo nome
    const index = cart.findIndex(p => p.originId === dist.id);

    if (index === -1) {
        cart.push(itemMarca);
    } else {
        cart.splice(index, 1);
    }

    if (typeof renderCart === 'function') renderCart();
    renderDistincoes();
}

if (distincoesSearchInput) {
    distincoesSearchInput.addEventListener('input', renderDistincoes);
}

const distSourceButtons = document.querySelectorAll('[data-distincao-source]');

distSourceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Atualiza o estado
        distincoesState.source = btn.getAttribute('data-distincao-source');

        // Atualiza a UI dos botões
        distSourceButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Renderiza novamente
        renderDistincoes();
    });
});