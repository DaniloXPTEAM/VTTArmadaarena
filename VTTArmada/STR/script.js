document.addEventListener('DOMContentLoaded', function () {
    const contentArea = document.getElementById('content-area');

    if (typeof DATABASE === 'undefined') {
        contentArea.innerHTML = `
            <div id="sticky-text">
                Erro: <strong>database.js</strong> não encontrado.<br>
                Certifique-se de que o arquivo database.js está na mesma pasta.
            </div>
        `;
        return;
    }

    // --- RENDERIZA O HTML A PARTIR DO JSON ---
    function renderDatabase(db) {
        let html = '';
        let passedJda = false;
        db.forEach(edition => {
            const match = edition.id?.match(/db(\d+)/);
            const isPreJda = match && parseInt(match[1], 10) <= 182;

            if (isPreJda && !passedJda) {
                passedJda = true;
                html += `
                <div class="jda-warning">
                    <p><strong>Conteúdo anterior ao Jogo do Ano</strong></p>
                    <p>As edições abaixo são da versão anterior de <strong>Tormenta20</strong>, anteriores ao lançamento do <strong>Jogo do Ano</strong>. Com a publicação da nova edição, estas respostas podem estar desatualizadas.</p>
                </div>`;
            }

            const articles = edition.artigos.map(art => {
                const classes = ['article', 'searchable', art.sistema, ...art.tags].join(' ');
                return `
                <div class="${classes}">
                    <p><strong>${art.pergunta}</strong></p>
                    <p><em>${art.conselheiro}</em></p>
                    <p>${art.resposta}</p>
                </div>`;
            }).join('\n');

            html += `
            <div class="edition" id="${edition.id}" data-label="${edition.label}">
                <button class="edition-title">
                    <span>${edition.label}</span><span class="icon">▶</span>
                </button>
                <div class="edition-content">
                    ${articles}
                </div>
            </div>`;
        });
        return html;
    }

    // --- RENDERIZA A LISTA DE BREVES JORNADAS ---
    const BJ_EMOJIS = {
        171: '🎪', 172: '💀', 173: '🏰', 174: '🌋', 175: '⚖️', 176: '🎊',
        177: '🗺️', 178: '🏔️', 179: '🧚', 180: '🔮', 181: '🦇', 182: '⚔️',
        183: '🏹', 184: '🧙‍♀️', 185: '⚗️', 186: '🏴‍☠️', 187: '🛡️', 188: '🥂',
        189: '🐍', 190: '💎', 191: '⛏️', 192: '🦎', 193: '🪦', 194: '🎭',
        195: '💰', 196: '🧛', 197: '🍽️', 198: '🌀', 199: '🥷', 200: '🐉',
        201: '🗝️', 202: '🌙', 203: '👹', 204: '💥', 205: '🔪', 206: '⚒️',
        207: '🐾', 208: '⚰️', 209: '🦸', 210: '🕵️', 211: '🏅', 212: '🐲',
        213: '🗼', 214: '🏝️', 215: '🎻', 216: '🦷', 217: '✨', 218: '🦊',
        219: '📚', 220: '🐺', 221: '🏊', 222: '🔍', 223: '💤', 224: '👣',
        225: '👁️', 226: '😈', 227: '🗡️', 228: '🕳️', 229: '🗿', 230: '🏁'
    };

    function renderBrevesJornadas() {
        const sorted = [...BJ_DATABASE].sort((a, b) => {
            const na = parseInt(String(a.db).replace(/\D/g, ''), 10);
            const nb = parseInt(String(b.db).replace(/\D/g, ''), 10);
            return nb - na;
        });

        const jdaWarning = `
            <div class="jda-warning">
                <p><strong>Conteúdo anterior ao Jogo do Ano</strong></p>
                <p>As aventuras das edições abaixo são da versão anterior de <strong>Tormenta20</strong>, anteriores ao lançamento do <strong>Jogo do Ano</strong>. Com a publicação da nova edição, estas aventuras podem estar desatualizadas.</p>
            </div>`;

        let warningInserted = false;
        const rows = sorted.map(item => {
            const nivel = String(item.nivel).replace(/ /g, '&nbsp;');
            const resumo = item.resumo
                ? `<div class="bj-resumo"><p>${item.resumo}</p></div>`
                : '';
            const num = parseInt(String(item.db).replace(/\D/g, ''), 10);
            const emoji = BJ_EMOJIS[num] || '📜';
            const rowOpen = `
                <div class="bj-row" data-db="${item.db}" data-prejda="${num <= 182}" data-nivel="${item.nivel}">
                    <span class="bj-check" title="Marcar como lida"><i class="fa-solid fa-circle-check"></i></span>
                    <span class="bj-db">${item.db}</span>
                    <span class="bj-titulo"><span class="bj-emoji">${emoji}</span>${item.titulo}</span>
                    <span class="bj-nivel">${nivel}</span>
                    ${resumo}
                </div>`;

            if (!warningInserted && num <= 182) {
                warningInserted = true;
                return jdaWarning + rowOpen;
            }

            return rowOpen;
        }).join('\n');

        return `
            <div class="bj-intro">
                <button class="bj-intro-toggle" id="bjIntroToggle" aria-expanded="false">
                    <span>O que é Breves Jornadas?</span><span class="icon">▶</span>
                </button>
                <div class="bj-intro-content">
                    <p>A ideia de Breves Jornadas é clara: oferecer aventuras completas de <strong>Tormenta20</strong>, de forma rápida e descomplicada, com tudo o que você precisa ao alcance das mãos. Fichas específicas são fornecidas, enquanto as estatísticas presentes no livro básico têm indicada a página em que se encontram. O objetivo é fazer com que mestres tenham um ponto de partida eficiente para se divertir por uma tarde — ou até começar uma campanha.</p>
                    <p class="bj-intro-credits">Um agradecimento especial ao <strong>Daniel Duran</strong>, autor destas aventuras.</p>
                </div>
            </div>
            <div class="bj-search">
                <label for="bjSearchInput">Buscar por palavra:</label>
                <input type="text" id="bjSearchInput" class="filter-input" placeholder="Digite para buscar...">
                <label for="bjLevelFilter">Nível:</label>
                <select id="bjLevelFilter" class="filter-select">
                    <option value="all">Todos</option>
                    ${[...new Set(BJ_DATABASE.map(i => i.nivel))].sort((a, b) => {
                        const numA = parseInt(a) || 0;
                        const numB = parseInt(b) || 0;
                        return numA - numB;
                    }).map(lv => `<option value="${lv}">${lv}</option>`).join('')}
                </select>
            </div>
            <div class="bj-chips" id="bjChips"></div>
            <div class="checkbox-container">
                <label>
                    <input type="checkbox" id="bjCheckJda"> Ocultar conteúdo pré Jogo do Ano
                </label>
            </div>
            <div class="bj-list">
                <div class="bj-list-header">
                    <span class="bj-check-col"></span>
                    <span>DB</span>
                    <span>Aventura</span>
                    <span>Nível</span>
                </div>
                ${rows}
                <div class="bj-count" id="bjCount"></div>
            </div>`;
    }

    // --- ACORDEÃO ---
    function openAccordion(edition) {
        const content = edition.querySelector('.edition-content');
        if (!content || edition.classList.contains('active')) return;
        edition.classList.add('active');
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.padding = "0 1.5rem";
    }

    function closeAccordion(edition) {
        const content = edition.querySelector('.edition-content');
        if (!content || !edition.classList.contains('active')) return;
        edition.classList.remove('active');
        content.style.maxHeight = null;
        content.style.padding = "0 1.5rem";
    }

    function initAccordion() {
        document.querySelectorAll('.edition').forEach(edition => {
            const title = edition.querySelector('.edition-title');
            if (!title) return;
            title.addEventListener('click', () => {
                edition.classList.contains('active') ? closeAccordion(edition) : openAccordion(edition);
            });
        });
    }

    // --- NAVEGAÇÃO ENTRE EDIÇÕES (PRÓXIMA/ANTERIOR) ---
    const editionNav   = document.getElementById('editionNav');
    const editionPrev  = document.getElementById('editionPrev');
    const editionNext  = document.getElementById('editionNext');
    const editionNavLabel = document.getElementById('editionNavLabel');

    function visibleEditions() {
        return [...document.querySelectorAll('.edition')].filter(e => e.style.display !== 'none');
    }

    function currentEditionIndex() {
        const list = visibleEditions();
        if (!list.length) return 0;
        const anchor = window.scrollY + 80;
        let idx = 0;
        list.forEach((el, i) => { if (el.offsetTop <= anchor) idx = i; });
        return idx;
    }

    function updateEditionNav() {
        if (!editionNav || !editionNavLabel) return;
        if (currentView !== 'str' || !visibleEditions().length) {
            editionNav.style.display = 'none';
            return;
        }
        editionNav.style.display = 'flex';
        const idx = currentEditionIndex();
        const list = visibleEditions();
        editionPrev.disabled = idx === 0;
        editionNext.disabled = idx === list.length - 1;
        const current = list[idx];
        editionNavLabel.textContent = current ? current.dataset.label : '';
    }

    function scrollToEdition(index) {
        const list = visibleEditions();
        if (index < 0 || index >= list.length) return;
        openAccordion(list[index]);
        list[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(updateEditionNav, 400);
    }

    editionPrev?.addEventListener('click', () => scrollToEdition(currentEditionIndex() - 1));
    editionNext?.addEventListener('click', () => scrollToEdition(currentEditionIndex() + 1));
    window.addEventListener('scroll', () => { if (currentView === 'str') updateEditionNav(); });

    function initBrevesJornadas() {
        const searchInput = document.getElementById('bjSearchInput');
        const jdaCheckbox = document.getElementById('bjCheckJda');
        const levelFilter = document.getElementById('bjLevelFilter');
        const chipsContainer = document.getElementById('bjChips');
        const introToggle = document.getElementById('bjIntroToggle');
        const introContent = introToggle?.nextElementSibling;
        const storageKey = 'bj_read';
        let read = {};
        try { read = JSON.parse(localStorage.getItem(storageKey)) || {}; } catch (e) { read = {}; }

        function saveRead() {
            try { localStorage.setItem(storageKey, JSON.stringify(read)); } catch (e) {}
        }

        function buildChips() {
            if (!chipsContainer) return;
            const levels = ['all', ...new Set(BJ_DATABASE.map(i => i.nivel))];
            chipsContainer.innerHTML = levels.map(lv => {
                const label = lv === 'all' ? 'Todos' : lv;
                return `<button class="bj-chip" data-level="${lv}">${label}</button>`;
            }).join('');
            chipsContainer.querySelectorAll('.bj-chip').forEach(chip => {
                chip.addEventListener('click', () => {
                    const value = chip.dataset.level;
                    if (levelFilter) levelFilter.value = value;
                    setActiveChip(value);
                    applyFilters();
                });
            });
            setActiveChip(levelFilter?.value || 'all');
        }

        function setActiveChip(value) {
            chipsContainer?.querySelectorAll('.bj-chip').forEach(chip => {
                chip.classList.toggle('active', chip.dataset.level === value);
            });
        }

        introToggle?.addEventListener('click', () => {
            const open = introToggle.getAttribute('aria-expanded') === 'true';
            introToggle.setAttribute('aria-expanded', String(!open));
            introContent.style.maxHeight = open ? null : introContent.scrollHeight + 'px';
        });

        function applyFilters() {
            const term = (searchInput?.value || '').toLowerCase().trim();
            const hidePreJda = jdaCheckbox?.checked || false;
            const levelValue = levelFilter?.value || 'all';
            const countEl = document.getElementById('bjCount');
            let visibleCount = 0;
            document.querySelectorAll('.bj-row').forEach(row => {
                const textMatch = term === '' || row.textContent.toLowerCase().includes(term);
                const jdaMatch = !hidePreJda || row.dataset.prejda !== 'true';
                const levelMatch = levelValue === 'all' || row.dataset.nivel === levelValue;
                const visible = textMatch && jdaMatch && levelMatch;
                row.style.display = visible ? '' : 'none';
                if (visible) visibleCount++;
            });
            if (countEl) countEl.textContent = `Exibindo ${visibleCount} de ${BJ_DATABASE.length} aventuras`;
        }

        searchInput?.addEventListener('input', applyFilters);
        jdaCheckbox?.addEventListener('change', applyFilters);
        levelFilter?.addEventListener('change', () => {
            setActiveChip(levelFilter.value);
            applyFilters();
        });

        document.querySelectorAll('.bj-row').forEach(row => {
            const dbKey = row.dataset.db;
            if (dbKey && read[dbKey]) row.classList.add('lida');

            const check = row.querySelector('.bj-check');
            if (check) {
                check.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (read[dbKey]) delete read[dbKey];
                    else read[dbKey] = true;
                    row.classList.toggle('lida');
                    saveRead();
                });
            }

            if (!row.querySelector('.bj-resumo')) return;
            row.addEventListener('click', () => {
                const alreadyOpen = row.classList.contains('open');
                document.querySelectorAll('.bj-row.open').forEach(r => r.classList.remove('open'));
                if (!alreadyOpen) row.classList.add('open');
            });
        });

        applyFilters();
        buildChips();
    }

    // --- TROCA DE VISTA: STR ⇄ BREVES JORNADAS ---
    const headerSwitch   = document.getElementById('headerSwitch');
    const headerTitle    = document.getElementById('headerTitle');
    const headerSubtitle = document.getElementById('headerSubtitle');
    const filtersPanel   = document.querySelector('.filters-container');
    const checkboxPanel  = document.querySelector('.checkbox-container');

    let currentView = 'str';
    const viewStorageKey = 'str_view';

    function renderView(view) {
        currentView = view;
        const isBj = view === 'bj';
        try { localStorage.setItem(viewStorageKey, view); } catch (e) {}

        if (isBj) {
            headerTitle.textContent = 'Breves Jornadas';
            headerSubtitle.style.display = 'none';
            document.title = 'Breves Jornadas';
            if (filtersPanel) filtersPanel.style.display = 'none';
            if (checkboxPanel) checkboxPanel.style.display = 'none';
            if (typeof BJ_DATABASE === 'undefined') {
                contentArea.innerHTML = `
                    <div id="sticky-text">
                        Erro: <strong>breves_jornadas.js</strong> não encontrado.<br>
                        Certifique-se de que o arquivo breves_jornadas.js está na mesma pasta.
                    </div>
                `;
                return;
            }
            contentArea.innerHTML = renderBrevesJornadas();
        } else {
            headerTitle.textContent = 'STR';
            headerSubtitle.style.display = '';
            headerSubtitle.textContent = 'Supremo Tribunal Regreiro';
            document.title = 'STR — Supremo Tribunal Regreiro';
            if (filtersPanel) filtersPanel.style.display = '';
            if (checkboxPanel) checkboxPanel.style.display = '';
            contentArea.innerHTML = renderDatabase(DATABASE);
            applyAllFilters();
            updateEditionNav();
        }

        initAccordion();
        if (isBj) initBrevesJornadas();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (headerSwitch) headerSwitch.addEventListener('click', () => {
        if (contentArea.classList.contains('page-flip')) return;
        contentArea.classList.add('page-flip');
        setTimeout(() => {
            renderView(currentView === 'str' ? 'bj' : 'str');
            setTimeout(() => contentArea.classList.remove('page-flip'), 300);
        }, 300);
    });

    // --- FILTROS ---
    const dbSelector   = document.getElementById('dbSelector');
    const searchInput  = document.getElementById('searchInput');
    const filterClass  = document.getElementById('filterClass');
    const filterSistema = document.getElementById('filterSistema');
    const jdaCheckbox  = document.getElementById('check');

    // Preenche seletor de DBs
    if (dbSelector) {
        dbSelector.innerHTML = '<option value="all">Todas</option>';
        DATABASE.forEach(edition => {
            const opt = document.createElement('option');
            opt.value = edition.id;
            opt.textContent = edition.label;
            dbSelector.appendChild(opt);
        });
    }

    function applyAllFilters() {
        const searchTerm  = (searchInput?.value || '').toLowerCase();
        const classValue  = filterClass?.value  || 'all';
        const systemValue = filterSistema?.value || 'all';
        const selectedDB  = dbSelector?.value   || 'all';

        const hidePreJda = jdaCheckbox?.checked || false;

        const hasActiveFilter = searchTerm || classValue !== 'all' || systemValue !== 'all' || selectedDB !== 'all' || hidePreJda;

        document.querySelectorAll('.edition').forEach(edition => {
            if (selectedDB !== 'all' && edition.id !== selectedDB) {
                edition.style.display = 'none';
                return;
            }
            if (hidePreJda) {
                const match = edition.id?.match(/db(\d+)/);
                if (match && parseInt(match[1], 10) <= 182) {
                    edition.style.display = 'none';
                    return;
                }
            }
            edition.style.display = 'block';

            let editionHasVisibleArticle = false;

            edition.querySelectorAll('.searchable').forEach(article => {
                const textMatch   = article.textContent.toLowerCase().includes(searchTerm);
                const classMatch  = classValue  === 'all' || article.classList.contains(classValue);
                const systemMatch = systemValue === 'all' || article.classList.contains(systemValue);

                const visible = textMatch && classMatch && systemMatch;
                article.style.display = visible ? '' : 'none';
                if (visible) editionHasVisibleArticle = true;
            });

            if (hasActiveFilter) {
                editionHasVisibleArticle ? openAccordion(edition) : closeAccordion(edition);
            } else {
                closeAccordion(edition);
            }
        });
    }

    dbSelector?.addEventListener('change', applyAllFilters);
    searchInput?.addEventListener('input', applyAllFilters);
    filterClass?.addEventListener('change', applyAllFilters);
    filterSistema?.addEventListener('change', applyAllFilters);

    jdaCheckbox?.addEventListener('change', function () {
        document.querySelectorAll('.edition').forEach(edition => {
            const id = edition.id;
            if (!id) return;
            const match = id.match(/db(\d+)/);
            if (!match) return;
            const num = parseInt(match[1], 10);
            if (num <= 182) {
                edition.dataset.preJda = 'true';
                edition.style.display = this.checked ? 'none' : '';
            } else {
                edition.dataset.preJda = 'false';
            }
        });
    });

    renderView('str');

    // Restaura a última vista salva
    let savedView = null;
    try { savedView = localStorage.getItem(viewStorageKey); } catch (e) {}
    if (savedView === 'bj' || savedView === 'str') renderView(savedView);

    // --- BOTÃO VOLTAR AO TOPO ---
    const backToTopButton = document.getElementById("backToTop");

    window.onscroll = function () {
        if (!backToTopButton) return;
        backToTopButton.style.display =
            (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100)
            ? "block" : "none";
    };

    backToTopButton?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // --- PARTÍCULAS ---
    (function initParticles() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let w, h;

        function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
        window.addEventListener('resize', resize);
        resize();

        const particles = Array.from({ length: 50 }, () => ({
            x: Math.random() * w, y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
            r: Math.random() * 2 + 1, alpha: Math.random() * 0.5 + 0.1,
        }));

        function draw() {
            ctx.clearRect(0, 0, w, h);
            particles.forEach(p => {
                p.x = (p.x + p.vx + w) % w;
                p.y = (p.y + p.vy + h) % h;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 213, 79, ${p.alpha})`;
                ctx.fill();
            });
            requestAnimationFrame(draw);
        }
        draw();
    })();
});
