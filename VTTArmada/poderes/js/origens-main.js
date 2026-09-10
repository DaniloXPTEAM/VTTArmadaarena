// ============================================================
//  ORIGENS — View & Logic
//  Carregado APÓS data.js, origens.js e main.js
// ============================================================

// ── Elementos de controle de view ──────────────────────────
const viewPoderesBtn = document.getElementById('viewPoderesBtn');
const viewOrigensBtn = document.getElementById('viewOrigensBtn');

// ── Seções da tela ─────────────────────────────────────────
const powersSection = document.getElementById('powersContainer');
const origensSection = document.getElementById('origensSection');
const origensContainer = document.getElementById('origensContainer');

// ── Filtros de poderes (esconder na view de origens) ───────
const powersMainFilters = document.getElementById('powersMainFilters');
const _classFilters = document.getElementById('classFilters');
const _concededFilters = document.getElementById('concededFilters');
const _complicationFilters = document.getElementById('complicationFilters');
const _complicationNotice = document.getElementById('complicationNotice');

// ── Search inputs ──────────────────────────────────────────
const powersSearchInput = document.getElementById('searchInput');
const origensSearchInput = document.getElementById('origensSearch');

// ── Filtros de origens ─────────────────────────────────────
const origensFiltersDiv = document.getElementById('origensFilters');
const originTypeBtns = document.querySelectorAll('[data-origemtype]');
const atlasRegionSelector = document.getElementById('atlasRegionSelector');

// ── Modal de origens ───────────────────────────────────────
const origensModal = document.getElementById('origensModal');
const origensCloseBtn = document.getElementById('origensCloseBtn');
const origensModalTitle = document.getElementById('origensModalTitle');
const origensModalBadge = document.getElementById('origensModalBadge');
const origensModalRegion = document.getElementById('origensModalRegion');
const origensModalDesc = document.getElementById('origensModalDesc');
const origensModalItems = document.getElementById('origensModalItems');
const normalBenefitPicker = document.getElementById('normalBenefitPicker');
const benefitCountLabel = document.getElementById('benefitCount');
const benefitList = document.getElementById('benefitList');
const atlasBenefitSection = document.getElementById('atlasBenefits');
const atlasTrainingList = document.getElementById('atlasTrainingList');
const atlasUniqueBenefit = document.getElementById('atlasUniqueBenefit');
const origensCartBtn = document.getElementById('origensCartBtn');

// ── Estado ─────────────────────────────────────────────────
let currentView = 'powers';
let origensState = { type: 'all', region: 'all', search: '' };
let _currentOrigem = null;
let _chosenBenefits = [];

// ============================================================
//  VIEW SWITCHER
// ============================================================

function switchView(view) {
  currentView = view;

  // Elementos das seções
  const sections = {
    powers: document.getElementById('powersContainer'),
    origins: document.getElementById('origensSection'),
    distinctions: document.getElementById('distincoesSection')
  };

  // Elementos de busca
  const searchInputs = {
    powers: document.getElementById('searchInput'),
    origins: document.getElementById('origensSearch'),
    distinctions: document.getElementById('distincoesSearch')
  };

  // 1. Esconder TUDO primeiro
  Object.values(sections).forEach(s => { if (s) s.style.display = 'none'; });
  Object.values(searchInputs).forEach(i => { if (i) i.style.display = 'none'; });

  // Esconder filtros específicos
  if (typeof powersMainFilters !== 'undefined' && powersMainFilters) powersMainFilters.style.display = 'none';
  if (typeof origensFiltersDiv !== 'undefined' && origensFiltersDiv) origensFiltersDiv.style.display = 'none';
  if (typeof _classFilters !== 'undefined' && _classFilters) _classFilters.style.display = 'none';
  if (typeof _concededFilters !== 'undefined' && _concededFilters) _concededFilters.style.display = 'none';
  if (typeof _complicationFilters !== 'undefined' && _complicationFilters) _complicationFilters.style.display = 'none';
  if (typeof _complicationNotice !== 'undefined' && _complicationNotice) _complicationNotice.style.display = 'none';
  const distincoesFilters = document.getElementById('distincoesFilters');
  if (typeof distincoesFilters !== 'undefined' && distincoesFilters) distincoesFilters.style.display = 'none';
  const sourceFilters = document.getElementById('sourceFilters');
  if (typeof sourceFilters !== 'undefined' && sourceFilters) sourceFilters.style.display = 'none';

  // 2. Resetar classes dos botões
  if (typeof viewPoderesBtn !== 'undefined') viewPoderesBtn.classList.remove('active');
  if (typeof viewOrigensBtn !== 'undefined') viewOrigensBtn.classList.remove('active');
  if (typeof viewDistincoesBtn !== 'undefined') viewDistincoesBtn.classList.remove('active');

  // 3. Ativar a aba selecionada
  if (view === 'powers') {
    if (sections.powers) sections.powers.style.display = '';
    if (searchInputs.powers) searchInputs.powers.style.display = '';
    if (typeof powersMainFilters !== 'undefined' && powersMainFilters) powersMainFilters.style.display = '';
    if (typeof sourceFilters !== 'undefined' && sourceFilters) sourceFilters.style.display = 'flex';
    if (typeof viewPoderesBtn !== 'undefined') viewPoderesBtn.classList.add('active');
  }
  else if (view === 'origins') {
    if (sections.origins) sections.origins.style.display = '';
    if (searchInputs.origins) searchInputs.origins.style.display = '';
    if (typeof origensFiltersDiv !== 'undefined' && origensFiltersDiv) origensFiltersDiv.style.display = 'flex';
    if (typeof viewOrigensBtn !== 'undefined') viewOrigensBtn.classList.add('active');

    if (typeof populateAtlasRegions === 'function') populateAtlasRegions();
    if (typeof renderOrigens === 'function') renderOrigens();
  }
  // Dentro de if (view === 'distinctions') no js/origens-main.js[cite: 11]
  else if (view === 'distinctions') {
    if (sections.distinctions) sections.distinctions.style.display = 'block';
    if (searchInputs.distinctions) {
      searchInputs.distinctions.style.display = ''; // Remove o inline para herdar o flex:1[cite: 3]
    }
    const distincoesFilters = document.getElementById('distincoesFilters');
    if (typeof distincoesFilters !== 'undefined' && distincoesFilters) distincoesFilters.style.display = 'flex';
    if (typeof viewDistincoesBtn !== 'undefined') viewDistincoesBtn.classList.add('active');
    if (typeof renderDistincoes === 'function') renderDistincoes();
  }
}

viewPoderesBtn.addEventListener('click', () => switchView('powers'));
viewOrigensBtn.addEventListener('click', () => switchView('origins'));
viewDistincoesBtn.addEventListener('click', () => switchView('distinctions'));

// ============================================================
//  BUSCA E FILTROS
// ============================================================

function populateAtlasRegions() {
  const regions = [...new Set(
    origensData
      .filter(o => o.type === 'atlas' && o.region)
      .map(o => o.region)
  )].sort();

  atlasRegionSelector.innerHTML =
    '<option value="all">— Todas as Regiões —</option>' +
    regions.map(r => `<option value="${r}">${r}</option>`).join('');
}

originTypeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    originTypeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    origensState.type = btn.getAttribute('data-origemtype');
    atlasRegionSelector.style.display =
      origensState.type === 'atlas' ? 'inline-block' : 'none';
    if (origensState.type !== 'atlas') origensState.region = 'all';
    renderOrigens();
  });
});

atlasRegionSelector.addEventListener('change', () => {
  origensState.region = atlasRegionSelector.value;
  renderOrigens();
});

origensSearchInput.addEventListener('input', () => {
  origensState.search = origensSearchInput.value.toLowerCase();
  renderOrigens();
});

// ============================================================
//  RENDER GRID
// ============================================================

function renderOrigens() {
  const filtered = origensData.filter(o => {
    if (origensState.type !== 'all' && o.type !== origensState.type) return false;
    if (origensState.type === 'atlas' && origensState.region !== 'all'
      && o.region !== origensState.region) return false;
    if (origensState.search) {
      const q = origensState.search;
      const hit = o.name.toLowerCase().includes(q)
        || o.desc.toLowerCase().includes(q)
        || (o.items || '').toLowerCase().includes(q);
      if (!hit) return false;
    }
    return true;
  });

  origensContainer.innerHTML = '';

  if (filtered.length === 0) {
    origensContainer.innerHTML =
      '<p class="origins-empty">Nenhuma origem encontrada para os filtros atuais.</p>';
    return;
  }

  filtered.forEach(origem => {
    const card = document.createElement('div');
    card.className = 'power-card origin-card';
    if (isOrigemInCart(origem)) {
      card.className += ' in-cart-highlight';
    }
    card.style.cursor = 'pointer';

    const badgeHtml = origem.type === 'herois'
      ? `<span class="power-type origin-badge-herois">Heróis de Arton</span>`
      : origem.type === 'atlas'
        ? `<span class="power-type origin-badge-atlas">Atlas · ${origem.region}</span>`
        : origem.type === 'outras'
          ? `<span class="power-type origin-badge-outras">${origem.source}</span>`
          : `<span class="power-type origin-badge-t20">T20</span>`;

    card.innerHTML = `
      <div class="power-header">
        <span class="power-name">${origem.name}</span>
        ${badgeHtml}
      </div>
      <div class="power-desc" style="margin-top:8px;">${origem.desc}</div>
      <div class="origin-benefits-preview">${buildBenefitSummary(origem)}</div>
      <div class="power-hint">Clique para ver e selecionar benefícios</div>
    `;

    card.addEventListener('click', () => openOrigensModal(origem));
    origensContainer.appendChild(card);
  });
}

function buildBenefitSummary(origem) {
  if (origem.type === 'atlas' || origem.type === 'herois' || origem.type === 'outras') {
    const treinos = origem.autoTraining
      .map(s => `<span class="origin-tag origin-tag-skill">${s}</span>`).join('');
    const unique = `<span class="origin-tag origin-tag-power">${origem.uniqueBenefit.name}</span>`;
    return `<strong>Benefícios automáticos:</strong> ${treinos}${unique}`;
  }
  const tags = origem.benefits.map(b => {
    const cls = b.type === 'skill' ? 'origin-tag-skill' : 'origin-tag-power';
    return `<span class="origin-tag ${cls}">${b.type === 'skill' ? b.name : b.name}</span>`;
  }).join('');
  return `<strong>Escolha ${origem.chooseCount}:</strong> ${tags}`;
}

// ============================================================
//  MODAL
// ============================================================

function openOrigensModal(origem) {
  _currentOrigem = origem;
  _chosenBenefits = [];

  origensModalTitle.textContent = origem.name;
  origensModalDesc.textContent = origem.desc;
  origensModalItems.textContent = origem.items || '—';

  if (origem.type === 'herois') {
    origensModalBadge.textContent = 'Heróis de Arton';
    origensModalBadge.className = 'power-type origin-badge-herois';
    origensModalRegion.textContent = '';
    origensModalRegion.style.display = 'none';
  } else if (origem.type === 'outras') {
    origensModalBadge.textContent = origem.source; // mostra o nome do livro
    origensModalBadge.className = 'power-type origin-badge-outras';
    origensModalRegion.textContent = '';
    origensModalRegion.style.display = 'none';
  } else if (origem.type === 'atlas') {
    origensModalBadge.textContent = 'Atlas';
    origensModalBadge.className = 'power-type origin-badge-atlas';
    origensModalRegion.textContent = '· ' + (origem.region || '');
    origensModalRegion.style.display = 'inline';
  } else {
    origensModalBadge.textContent = 'T20';
    origensModalBadge.className = 'power-type origin-badge-t20';
    origensModalRegion.textContent = '';
    origensModalRegion.style.display = 'none';
  }

  if (origem.type === 'normal') {
    normalBenefitPicker.style.display = '';
    atlasBenefitSection.style.display = 'none';
    buildBenefitPicker(origem);
  } else {
    normalBenefitPicker.style.display = 'none';
    atlasBenefitSection.style.display = '';
    buildAtlasBenefits(origem);
  }

  updateOrigensCartBtn();
  origensModal.style.display = 'flex';
}


// ── Power Picker Helper ────────────────────────────────────

function createPowerPickerUI(origem, pp, pickedArray, updateCallback) {
  const availablePowers = (typeof powersData !== 'undefined')
    ? powersData.filter(p => pp.types.includes(p.type))
    : [];

  const pickerWrap = document.createElement('div');
  pickerWrap.className = 'dynamic-power-picker';
  pickerWrap.style.cssText = 'margin-top:12px;';

  pickerWrap.innerHTML = `
    <label style="font-weight:700; font-size:.85rem; display:block; margin-bottom:5px;">
      ⚡ Digite o nome ${pp.count > 1 ? 'dos ' + pp.count + ' poderes escolhidos' : 'do poder escolhido'}:
    </label>
    <input type="text" placeholder="Buscar poder..."
      style="width:100%; padding:8px 10px; border-radius:8px; border:1px solid var(--border);
      background:var(--card-bg); color:var(--text-main); font-size:.85rem; margin-bottom:6px;">
    <div class="picker-list" style="max-height:200px; overflow-y:auto; display:flex;
      flex-direction:column; gap:4px;"></div>
    <div class="picker-badges" style="margin-top:8px; display:flex; flex-wrap:wrap; gap:4px;"></div>
  `;

  const searchInput = pickerWrap.querySelector('input');
  const listContainer = pickerWrap.querySelector('.picker-list');
  const badgesContainer = pickerWrap.querySelector('.picker-badges');

  function renderPowerList(filter = '') {
    const q = filter.trim().toLowerCase();
    if (q === '') {
      listContainer.innerHTML = '';
      return;
    }

    const shown = availablePowers
      .filter(p => !pickedArray.some(x => x.name === p.name))
      .filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
      .slice(0, 30);

    listContainer.innerHTML = shown.map(p => `
      <div style="cursor:pointer; padding:10px 12px; font-size:.85rem; border:1px solid var(--border); border-radius:8px; background:var(--card-bg); flex-shrink:0; transition:border-color .15s;"
           data-pname="${p.name.replace(/"/g, "'")}"
           onmouseover="this.style.borderColor='var(--str-accent)'"
           onmouseout="this.style.borderColor='var(--border)'">
        <strong>${p.name}</strong>
        <span style="color:var(--text-muted); margin-left:6px; font-size:.78rem;">${typeof translateType !== 'undefined' ? translateType(p) : p.type}</span>
      </div>
    `).join('');

    listContainer.querySelectorAll('[data-pname]').forEach(el => {
      el.addEventListener('click', () => {
        const pname = el.getAttribute('data-pname');
        if (pickedArray.length >= pp.count) return;
        const found = availablePowers.find(p => p.name === pname);
        if (found) {
          pickedArray.push(found);
          renderPickedBadges();
          renderPowerList(searchInput.value);
          if (updateCallback) updateCallback();
        }
      });
    });
  }

  function renderPickedBadges() {
    badgesContainer.innerHTML = pickedArray.map((p, i) => `
      <span style="display:inline-flex; align-items:center; gap:4px; background:rgba(224,72,63,.12);
        color:var(--str-accent); border:1px solid rgba(224,72,63,.25); border-radius:999px;
        padding:2px 10px; font-size:.78rem; font-weight:700;">
        ${p.name}
        <button type="button" style="background:none;border:none;cursor:pointer;color:inherit;padding:0;font-size:.9rem;"
          data-badgeidx="${i}">✕</button>
      </span>
    `).join('');

    badgesContainer.querySelectorAll('button[data-badgeidx]').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.getAttribute('data-badgeidx'));
        pickedArray.splice(i, 1);
        renderPickedBadges();
        renderPowerList(searchInput.value);
        if (updateCallback) updateCallback();
      });
    });
  }

  searchInput.addEventListener('input', function () {
    renderPowerList(this.value);
  });

  renderPowerList();
  renderPickedBadges();

  return pickerWrap;
}

// ── Benefit picker (origens normais) ──────────────────────


function buildBenefitPicker(origem) {
  benefitCountLabel.textContent = `0/${origem.chooseCount} selecionados`;
  benefitList.innerHTML = '';

  origem.benefits.forEach((b, idx) => {
    let descHtml = '';
    if (b.type === 'skill') {
      descHtml = `Você é treinado em <strong>${b.name}</strong>.`;
    } else if (b.unique) {
      descHtml = b.desc || '';
    } else {
      const found = (typeof powersData !== 'undefined')
        ? powersData.find(p => p.name.toLowerCase() === b.name.toLowerCase())
        : null;
      descHtml = found ? found.desc : (b.desc || 'Consulte o livro para detalhes.');
    }

    const icon = b.type === 'skill' ? '📚' : (b.unique ? '✦' : '⚡');
    const typeLabel = b.type === 'skill'
      ? 'Treino de Perícia'
      : (b.unique ? 'Poder Exclusivo da Origem' : 'Poder');

    const item = document.createElement('div');
    item.className = 'benefit-item';
    item.innerHTML = `
      <label class="benefit-label">
        <input type="checkbox" class="benefit-check" data-idx="${idx}">
        <span class="benefit-icon">${icon}</span>
        <div class="benefit-label-info">
          <span class="benefit-label-name">${b.type === 'skill' ? 'Treino em ' + b.name : b.name}</span>
          <span class="benefit-label-type">${typeLabel}</span>
        </div>
      </label>
      <div class="benefit-desc">${descHtml}</div>
    `;

    const labelEl = item.querySelector('.benefit-label');
    const descEl = item.querySelector('.benefit-desc');
    const check = item.querySelector('.benefit-check');

    // Clique no label (exceto no checkbox) expande desc
    labelEl.addEventListener('click', (e) => {
      if (e.target !== check) {
        e.preventDefault();
        descEl.classList.toggle('open');
      }
    });

    check.addEventListener('change', () => handleBenefitCheck(origem, check, idx));
    benefitList.appendChild(item);
  });
}

function handleBenefitCheck(origem, checkEl, idx) {
  if (!origem._pickedPowers) origem._pickedPowers = {};

  if (checkEl.checked) {
    if (_chosenBenefits.length >= origem.chooseCount) {
      checkEl.checked = false;
      return;
    }
    _chosenBenefits.push(idx);

    const b = origem.benefits[idx];
    if (b.powerPicker) {
      origem._pickedPowers[idx] = [];
      const pickerUI = createPowerPickerUI(origem, b.powerPicker, origem._pickedPowers[idx], updateOrigensCartBtn);
      const descEl = checkEl.closest('.benefit-item').querySelector('.benefit-desc');
      descEl.appendChild(pickerUI);
      descEl.classList.add('open');
    }

  } else {
    _chosenBenefits = _chosenBenefits.filter(i => i !== idx);
    const b = origem.benefits[idx];
    if (b.powerPicker) {
      delete origem._pickedPowers[idx];
      const descEl = checkEl.closest('.benefit-item').querySelector('.benefit-desc');
      const dynPicker = descEl.querySelector('.dynamic-power-picker');
      if (dynPicker) dynPicker.remove();
    }
  }
  benefitCountLabel.textContent = `${_chosenBenefits.length}/${origem.chooseCount} selecionados`;
  updateOrigensCartBtn();
}

// ── Atlas benefits ─────────────────────────────────────────

function buildAtlasBenefits(origem) {
  atlasTrainingList.innerHTML = origem.autoTraining
    .map(s => `<span class="origin-tag origin-tag-skill">📚 Treino em ${s}</span>`)
    .join('');

  atlasUniqueBenefit.innerHTML = `
    <span class="atlas-unique-name">✦ ${origem.uniqueBenefit.name}</span>
    <p class="atlas-unique-text">${origem.uniqueBenefit.desc}</p>
  `;

  if (origem.uniqueBenefit.powerPicker) {
    origem._pickedPowers = [];
    const pickerUI = createPowerPickerUI(origem, origem.uniqueBenefit.powerPicker, origem._pickedPowers, updateOrigensCartBtn);
    atlasUniqueBenefit.appendChild(pickerUI);
  }

  // NOVO: se o benefício tem um poder com variantes, mostrar seletor
  if (origem.uniqueBenefit.linkedPower) {
    const linkedPwr = (typeof powersData !== 'undefined')
      ? powersData.find(p => p.name === origem.uniqueBenefit.linkedPower)
      : null;

    if (linkedPwr && linkedPwr.variants) {
      const varBox = document.createElement('div');
      varBox.style.cssText = 'margin-top:10px;';
      varBox.innerHTML = `
        <label style="font-weight:700; font-size:.85rem; display:block; margin-bottom:5px;">
          Escolha seu deus (${linkedPwr.name}):
        </label>
        <select id="originVariantSelect" style="width:100%; padding:8px 12px;
          border-radius:10px; border:2px solid var(--border);
          background:var(--card-bg); color:var(--text-main); font-size:.88rem;">
          <option value="">— Selecione um deus maior —</option>
          ${linkedPwr.variants.map((v, i) =>
        `<option value="${i}">${v.deity}</option>`
      ).join('')}
        </select>
        <div id="originVariantDesc" style="margin-top:8px; padding:10px 12px;
          border-radius:10px; background:rgba(0,0,0,.04); border:1px solid var(--border);
          font-size:.85rem; line-height:1.5; color:var(--text-muted); display:none;"></div>
      `;
      atlasUniqueBenefit.appendChild(varBox);

      varBox.querySelector('#originVariantSelect').addEventListener('change', function () {
        const descEl = varBox.querySelector('#originVariantDesc');
        if (this.value === '') {
          descEl.style.display = 'none';
        } else {
          descEl.textContent = linkedPwr.variants[this.value].desc;
          descEl.style.display = 'block';
        }
      });

      // Guarda referência para usar no buildCartItemsFromOrigem
      origem._linkedPwr = linkedPwr;
    }
  }
}

// ── Botão do modal ─────────────────────────────────────────

function isOrigemInCart(origem) {
  return cart.some(p => p.originId === origem.id);
}

function updateOrigensCartBtn() {
  if (!_currentOrigem) return;

  if (isOrigemInCart(_currentOrigem)) {
    origensCartBtn.textContent = '✓ Remover do Carrinho';
    origensCartBtn.classList.add('in-cart');
    origensCartBtn.disabled = false;
    return;
  }

  if (_currentOrigem.type === 'normal') {
    let ready = _chosenBenefits.length === _currentOrigem.chooseCount;
    let missingPowers = 0;

    _chosenBenefits.forEach(idx => {
      const b = _currentOrigem.benefits[idx];
      if (b.powerPicker) {
        const picked = _currentOrigem._pickedPowers && _currentOrigem._pickedPowers[idx] ? _currentOrigem._pickedPowers[idx].length : 0;
        if (picked < b.powerPicker.count) {
          ready = false;
          missingPowers += (b.powerPicker.count - picked);
        }
      }
    });

    if (!ready && missingPowers > 0) {
      origensCartBtn.textContent = `Escolha ${missingPowers} poder(es) pendente(s)`;
      origensCartBtn.disabled = true;
    } else {
      origensCartBtn.textContent = ready
        ? '＋ Adicionar ao Carrinho'
        : `Selecione ${_currentOrigem.chooseCount} benefícios para continuar`;
      origensCartBtn.disabled = !ready;
    }
    origensCartBtn.classList.remove('in-cart');
  } else {
    // Verifica se há um powerPicker pendente
    const pp = _currentOrigem.uniqueBenefit && _currentOrigem.uniqueBenefit.powerPicker;
    const picked = _currentOrigem._pickedPowers ? _currentOrigem._pickedPowers.length : 0;
    const pickerDone = !pp || picked >= pp.count;

    origensCartBtn.textContent = pickerDone
      ? '＋ Adicionar ao Carrinho'
      : `Escolha ${pp.count - picked} poder(es) para continuar`;
    origensCartBtn.disabled = !pickerDone;
    origensCartBtn.classList.remove('in-cart');
  }
}

origensCartBtn.addEventListener('click', () => {
  if (!_currentOrigem) return;

  if (isOrigemInCart(_currentOrigem)) {
    cart = cart.filter(p => p.originId !== _currentOrigem.id);
    renderCart();
    updateOrigensCartBtn();
    renderOrigens(); // Re-render to update highlights
    return;
  }

  const newItems = buildCartItemsFromOrigem(_currentOrigem);
  cart.push(...newItems);
  renderCart();
  updateOrigensCartBtn();
  renderOrigens(); // Re-render to update highlights
});

// ── Monta os itens de carrinho ─────────────────────────────

function buildCartItemsFromOrigem(origem) {
  const items = [];
  const reqLabel = `Origem: ${origem.name}`;

  if (origem.type === 'normal') {
    _chosenBenefits.forEach(idx => {
      const b = origem.benefits[idx];

      if (b.type === 'skill') {
        items.push({
          name: `Treino em Perícia: ${b.name}`,
          type: 'origin', category: 'Origem',
          req: reqLabel,
          desc: `Você é treinado em ${b.name}.`,
          originId: origem.id
        });
      } else if (b.unique) {
        items.push({
          name: b.name,
          type: 'origin', category: 'Origem',
          req: reqLabel, desc: b.desc,
          originId: origem.id
        });
      } else {
        const found = (typeof powersData !== 'undefined')
          ? powersData.find(p => p.name.toLowerCase() === b.name.toLowerCase())
          : null;
        items.push({
          name: b.name,
          type: 'origin', category: 'Origem',
          req: reqLabel,
          desc: found ? found.desc : (b.desc || ''),
          originId: origem.id
        });
      }

      // Adiciona os poderes do picker se houver
      if (b.powerPicker && origem._pickedPowers && origem._pickedPowers[idx]) {
        origem._pickedPowers[idx].forEach(p => {
          items.push({
            name: p.name,
            type: 'origin', category: 'Origem',
            req: `${b.name} (poder à escolha)`,
            desc: p.desc,
            originId: origem.id
          });
        });
      }
    });

  } else {
    // Atlas: treinos automáticos
    origem.autoTraining.forEach(skill => {
      items.push({
        name: `Treino em Perícia: ${skill}`,
        type: 'origin', category: 'Origem',
        req: reqLabel,
        desc: `Você é treinado em ${skill}.`,
        originId: origem.id
      });
    });
    // Benefício único
    const variantSelect = document.getElementById('originVariantSelect');
    const chosenDeity = (variantSelect && variantSelect.value !== '')
      ? origem._linkedPwr.variants[variantSelect.value].deity
      : null;

    items.push({
      name: chosenDeity
        ? `${origem.uniqueBenefit.name} (${chosenDeity})`
        : origem.uniqueBenefit.name,
      type: 'origin', category: 'Origem',
      req: reqLabel,
      desc: origem.uniqueBenefit.desc,
      originId: origem.id
    });

    if (origem.uniqueBenefit.powerPicker && origem._pickedPowers && origem._pickedPowers.length > 0) {
      origem._pickedPowers.forEach(p => {
        items.push({
          name: p.name,
          type: 'origin', category: 'Origem',
          req: `${reqLabel} (poder à escolha)`,
          desc: p.desc,
          originId: origem.id
        });
      });
    }
  }

  // Item de equipamentos (informativo)
  if (origem.items) {
    items.push({
      name: `Itens: ${origem.name}`,
      type: 'origin', category: 'Origem',
      req: reqLabel,
      desc: `Equipamentos iniciais: ${origem.items}`,
      originId: origem.id
    });
  }

  return items;
}

// ── Fechar modal ───────────────────────────────────────────

origensCloseBtn.addEventListener('click', () => {
  origensModal.style.display = 'none';
  _currentOrigem = null;
});

origensModal.addEventListener('click', (e) => {
  if (e.target === origensModal) {
    origensModal.style.display = 'none';
    _currentOrigem = null;
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && origensModal.style.display === 'flex') {
    origensModal.style.display = 'none';
    _currentOrigem = null;
  }
});
