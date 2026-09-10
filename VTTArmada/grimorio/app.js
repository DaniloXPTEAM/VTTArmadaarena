/**
 * Grimório de Arton - Application Logic
 * Interactive Spellbook, Filter Manager and Mana Calculator for Tormenta 20 Spells
 */

// ==========================================================================
// 1. STATE MANAGEMENT
// ==========================================================================

const STATE = {
    // Current Custom Grimoires Map
    // Key: Grimoire Name, Value: Array of Spell Names
    grimoires: {},
    activeGrimoireName: "Grimório Padrão",
    
    // UI Filters State
    filters: {
        search: "",
        favoritesOnly: false,
        circles: new Set(),
        schools: new Set(),
        tipos: new Set(),
        range: "",
        execution: "",
        resistance: ""
    },
    sortBy: "name-asc",
    
    // Spell Details Selection State
    selectedSpell: null,
    selectedUpgrades: new Set() // Indices of selected upgrades
};

// Map circle levels to Base PM cost in T20
const CIRCLE_PM_COSTS = {
    1: 1,
    2: 3,
    3: 6,
    4: 10,
    5: 15
};

// Magic school color hex codes (same as CSS variables)
const SCHOOL_COLORS = {
    "Abjuração": "#29b6f6",
    "Adivinhação": "#ffb74d",
    "Convocação": "#00e5ff",
    "Encantamento": "#ff80ab",
    "Evocação": "#ff1744",
    "Ilusão": "#e040fb",
    "Necromancia": "#7c4dff",
    "Transmutação": "#00e676"
};

// ==========================================================================
// 2. PARTICLE BACKGROUND SYSTEM
// ==========================================================================

function initParticleSystem() {
    const canvas = document.getElementById("particleCanvas");
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    
    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 50;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedY = -(Math.random() * 0.6 + 0.2);
            this.speedX = Math.random() * 0.4 - 0.2;
            
            // Random color from schools palette or gold
            const colors = ["#ffd54f", "#29b6f6", "#00e5ff", "#7c4dff", "#00e676"];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = Math.random() * 0.4 + 0.1;
            this.fadeSpeed = Math.random() * 0.002 + 0.001;
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            
            // Fade out as it rises
            if (this.y < canvas.height * 0.8) {
                this.opacity -= this.fadeSpeed;
            }
            
            // Respawn if invisible or out of screen
            if (this.opacity <= 0 || this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + Math.random() * 20;
                this.opacity = Math.random() * 0.4 + 0.1;
                this.size = Math.random() * 2.5 + 0.5;
                this.speedY = -(Math.random() * 0.6 + 0.2);
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.shadowBlur = 4;
            ctx.shadowColor = this.color;
            ctx.fill();
        }
    }
    
    // Generate initial particles
    const particleCount = Math.min(60, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ==========================================================================
// 3. STORAGE & SPELLBOOKS PROFILE MANAGEMENT
// ==========================================================================

function loadFromStorage() {
    try {
        const storedGrimoires = localStorage.getItem("grimorio_arton_grimoires");
        const storedActive = localStorage.getItem("grimorio_arton_active");
        
        if (storedGrimoires) {
            STATE.grimoires = JSON.parse(storedGrimoires);
        } else {
            // Setup default grimoire
            STATE.grimoires = {
                "Grimório Padrão": []
            };
        }
        
        if (storedActive && STATE.grimoires[storedActive]) {
            STATE.activeGrimoireName = storedActive;
        } else {
            // Fallback to first available key
            STATE.activeGrimoireName = Object.keys(STATE.grimoires)[0] || "Grimório Padrão";
        }

        // Carregar magias homebrew
        const storedHomebrews = localStorage.getItem("grimorio_arton_homebrews");
        if (storedHomebrews) {
            const homebrews = JSON.parse(storedHomebrews);
            homebrews.forEach(spell => {
                spell.isHomebrew = true;
                // Prevenir duplicatas na memória
                if (!SPELLS_DB.some(s => s.n.toLowerCase() === spell.n.toLowerCase())) {
                    SPELLS_DB.push(spell);
                }
            });
        }
    } catch (e) {
        console.error("Erro ao carregar dados do LocalStorage:", e);
        STATE.grimoires = { "Grimório Padrão": [] };
        STATE.activeGrimoireName = "Grimório Padrão";
    }
}

function saveToStorage() {
    try {
        localStorage.setItem("grimorio_arton_grimoires", JSON.stringify(STATE.grimoires));
        localStorage.setItem("grimorio_arton_active", STATE.activeGrimoireName);
    } catch (e) {
        console.error("Erro ao salvar dados no LocalStorage:", e);
    }
}

function updateGrimoireSelectDropdown() {
    const select = document.getElementById("grimoire-select");
    if (!select) return;
    
    select.innerHTML = "";
    Object.keys(STATE.grimoires).forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        if (name === STATE.activeGrimoireName) {
            option.selected = true;
        }
        select.appendChild(option);
    });
}

function updateStatsDashboard() {
    // Spells matching search/filters
    const matchingSpells = getFilteredSpells();
    const totalSpellsBadge = document.getElementById("stat-total-spells");
    if (totalSpellsBadge) {
        totalSpellsBadge.textContent = matchingSpells.length;
    }
    
    // Spells bookmarked in the active grimoire
    const activeFavorites = STATE.grimoires[STATE.activeGrimoireName] || [];
    const activeCountBadge = document.getElementById("stat-active-grimoire-spells");
    if (activeCountBadge) {
        activeCountBadge.textContent = activeFavorites.length;
    }
}

// ==========================================================================
// 4. SPELL FILTERING AND SORTING
// ==========================================================================

function getFilteredSpells() {
    return SPELLS_DB.filter(spell => {
        // 1. Text Search (Matches Name, Tipo or Description)
        if (STATE.filters.search) {
            const query = STATE.filters.search.toLowerCase();
            const matchesName = spell.n.toLowerCase().includes(query);
            const matchesTipo = (spell.t || 'Universal').toLowerCase().includes(query);
            const matchesDesc = spell.desc.toLowerCase().includes(query);
            if (!matchesName && !matchesTipo && !matchesDesc) return false;
        }
        
        // 2. Favorites Mode
        if (STATE.filters.favoritesOnly) {
            const favorites = STATE.grimoires[STATE.activeGrimoireName] || [];
            if (!favorites.includes(spell.n)) return false;
        }
        
        // 3. Circle Filter
        if (STATE.filters.circles.size > 0) {
            if (!STATE.filters.circles.has(spell.c)) return false;
        }
        
        // 4. School Filter
        if (STATE.filters.schools.size > 0) {
            if (!STATE.filters.schools.has(spell.e)) return false;
        }
        
        // 4b. Tipo Filter
        if (STATE.filters.tipos.size > 0) {
            const tipo = spell.t || 'Universal';
            if (!STATE.filters.tipos.has(tipo)) return false;
        }
        
        // 5. Technical Attribute - Range (Alcance)
        if (STATE.filters.range) {
            const spellRange = spell.a.toLowerCase();
            const targetRange = STATE.filters.range.toLowerCase();
            // Fuzzy check (e.g. if selection is "curto", matches "curto" or "curto (veja texto)")
            if (!spellRange.includes(targetRange)) return false;
        }
        
        // 6. Technical Attribute - Execution (Execução)
        if (STATE.filters.execution) {
            const spellExec = spell.ex.toLowerCase();
            const targetExec = STATE.filters.execution.toLowerCase();
            
            // Check for match:
            // "padrão" matches both "padrão", "ação padrão", etc.
            if (targetExec === "padrão") {
                if (!spellExec.includes("padrão")) return false;
            } else {
                if (!spellExec.includes(targetExec)) return false;
            }
        }
        
        // 7. Technical Attribute - Resistance (Resistência)
        if (STATE.filters.resistance) {
            const spellRes = spell.r.toLowerCase();
            const targetRes = STATE.filters.resistance.toLowerCase();
            
            if (targetRes === "nenhuma") {
                if (spellRes !== "nenhuma" && spellRes !== "nenhum") return false;
            } else {
                if (!spellRes.includes(targetRes)) return false;
            }
        }
        
        return true;
    }).sort((a, b) => {
        // Sort Rules
        switch (STATE.sortBy) {
            case "name-asc":
                return a.n.localeCompare(b.n, 'pt');
            case "name-desc":
                return b.n.localeCompare(a.n, 'pt');
            case "circle-asc":
                return a.c - b.c || a.n.localeCompare(b.n, 'pt');
            case "circle-desc":
                return b.c - a.c || a.n.localeCompare(b.n, 'pt');
            default:
                return 0;
        }
    });
}

// ==========================================================================
// 5. RENDERING SPELL CARDS GRID
// ==========================================================================

function renderSpellsGrid() {
    const grid = document.getElementById("spells-grid");
    const emptyState = document.getElementById("empty-state");
    if (!grid) return;
    
    grid.innerHTML = "";
    
    const filteredSpells = getFilteredSpells();
    
    if (filteredSpells.length === 0) {
        emptyState.classList.remove("hidden");
        return;
    } else {
        emptyState.classList.add("hidden");
    }
    
    const favorites = STATE.grimoires[STATE.activeGrimoireName] || [];
    
    filteredSpells.forEach(spell => {
        const isFav = favorites.includes(spell.n);
        const card = document.createElement("div");
        
        // Generate school-specific css class
        const schoolClass = getSchoolCssClass(spell.e);
        card.className = `spell-card ${schoolClass}`;
        card.setAttribute("data-name", spell.n);
        
        // Count total enhancements (aprimoramentos)
        const enhancementsCount = spell.aprimoramentos ? spell.aprimoramentos.length : 0;
        
        card.innerHTML = `
            <button class="fav-card-btn ${isFav ? 'favorited' : ''}" title="${isFav ? 'Remover do Grimório' : 'Adicionar ao Grimório'}">
                <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-star"></i>
            </button>
            <div class="spell-card-header">
                <span class="spell-card-school">
                    ${spell.e}
                    ${spell.t ? `<span class="badge-tipo badge-tipo-${spell.t.toLowerCase()}">${spell.t}</span>` : '<span class="badge-tipo badge-tipo-universal">Universal</span>'}
                    ${spell.isHomebrew ? '<span class="badge-homebrew">Homebrew</span>' : ''}
                </span>
                <h2 class="spell-card-title">${spell.n}</h2>
            </div>
            <p class="spell-card-body">${spell.desc}</p>
            <div class="spell-card-footer">
                <span class="spell-card-circle-badge">${spell.c}º Círculo</span>
                <div class="spell-card-footer-info">
                    <span><i class="fa-solid fa-hourglass-start"></i> ${spell.d.split(' ')[0]}</span>
                    ${enhancementsCount > 0 ? `<span><i class="fa-solid fa-wand-magic"></i> +${enhancementsCount}</span>` : ''}
                </div>
            </div>
        `;
        
        // Click on Favorite Icon
        const favBtn = card.querySelector(".fav-card-btn");
        favBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Avoid opening detailed sidebar
            toggleFavoriteSpell(spell.n);
        });
        
        // Click on Card
        card.addEventListener("click", () => {
            openSpellDetails(spell);
        });
        
        grid.appendChild(card);
    });
}

function getSchoolCssClass(school) {
    const map = {
        "Abjuração": "sc-abj",
        "Adivinhação": "sc-adi",
        "Convocação": "sc-con",
        "Encantamento": "sc-enc",
        "Evocação": "sc-evo",
        "Ilusão": "sc-ilu",
        "Necromancia": "sc-nec",
        "Transmutação": "sc-tra"
    };
    return map[school] || "";
}

// Toggle bookmark of a spell in the active spellbook
function toggleFavoriteSpell(spellName) {
    const favorites = STATE.grimoires[STATE.activeGrimoireName] || [];
    const index = favorites.indexOf(spellName);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(spellName);
    }
    
    STATE.grimoires[STATE.activeGrimoireName] = favorites;
    saveToStorage();
    
    // Re-render and update dashboards
    renderSpellsGrid();
    updateStatsDashboard();
    
    // If the active spell being viewed is the one being toggled, update detail view button state
    if (STATE.selectedSpell && STATE.selectedSpell.n === spellName) {
        const detailFavBtn = document.getElementById("btn-detail-fav");
        if (detailFavBtn) {
            const isFavNow = favorites.includes(spellName);
            detailFavBtn.className = isFavNow ? "favorited" : "";
            detailFavBtn.innerHTML = `<i class="${isFavNow ? 'fa-solid' : 'fa-regular'} fa-star"></i>`;
            detailFavBtn.title = isFavNow ? "Remover do Grimório" : "Adicionar ao Grimório";
        }
    }
}

// ==========================================================================
// 6. DETAILED SPELL VIEW & MANA CALCULATOR
// ==========================================================================

function openSpellDetails(spell) {
    STATE.selectedSpell = spell;
    STATE.selectedUpgrades.clear(); // Reset selections
    
    const sidebar = document.getElementById("detail-sidebar");
    const content = document.getElementById("detail-content");
    if (!sidebar || !content) return;
    
    const favorites = STATE.grimoires[STATE.activeGrimoireName] || [];
    const isFav = favorites.includes(spell.n);
    
    // Style class for school
    const schoolClass = getSchoolCssClass(spell.e).replace("sc-", "scb-");
    
    // Description formatting helper (highlight numbers, damage dice, PM costs, test values)
    const formattedDesc = formatSpellDescription(spell.desc);
    
    // HTML Builder
    let html = `
        <div class="spell-detail-header">
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                <span class="spell-detail-school-badge ${schoolClass}">${spell.e}</span>
                ${spell.t ? `<span class="badge-tipo badge-tipo-${spell.t.toLowerCase()}">${spell.t}</span>` : '<span class="badge-tipo badge-tipo-universal">Universal</span>'}
                ${spell.isHomebrew ? '<span class="badge-homebrew">Homebrew</span>' : ''}
            </div>
            <div class="spell-detail-title-row">
                <h2 class="spell-detail-title">${spell.n}</h2>
                <button id="btn-detail-fav" class="${isFav ? 'favorited' : ''}" title="${isFav ? 'Remover do Grimório' : 'Adicionar ao Grimório'}">
                    <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-star"></i>
                </button>
            </div>
        </div>

        <div class="spell-props-grid">
            <div class="spell-prop-item">
                <span class="spell-prop-label">Círculo</span>
                <span class="spell-prop-value">${spell.c}º Círculo</span>
            </div>
            <div class="spell-prop-item">
                <span class="spell-prop-label">Execução</span>
                <span class="spell-prop-value">${spell.ex}</span>
            </div>
            <div class="spell-prop-item">
                <span class="spell-prop-label">Alcance</span>
                <span class="spell-prop-value">${spell.a}</span>
            </div>
            <div class="spell-prop-item">
                <span class="spell-prop-label">Alvo / Área</span>
                <span class="spell-prop-value">${spell.al || 'Nenhum'}</span>
            </div>
            <div class="spell-prop-item">
                <span class="spell-prop-label">Duração</span>
                <span class="spell-prop-value">${spell.d}</span>
            </div>
            <div class="spell-prop-item">
                <span class="spell-prop-label">Resistência</span>
                <span class="spell-prop-value">${spell.r}</span>
            </div>
        </div>

        <div class="spell-detail-description">
            ${formattedDesc}
        </div>
    `;
    
    // Append upgrades if present
    if (spell.aprimoramentos && spell.aprimoramentos.length > 0) {
        html += `
            <div class="spell-upgrades-section">
                <h4>Aprimoramentos Disponíveis</h4>
                <div class="upgrades-list">
        `;
        
        spell.aprimoramentos.forEach((upg, index) => {
            html += `
                <div class="upgrade-item" data-index="${index}">
                    <div class="upgrade-checkbox-wrapper">
                        <input type="checkbox" id="upg-check-${index}" value="${index}">
                        <span class="upgrade-checkmark"></span>
                    </div>
                    <div class="upgrade-details-wrapper">
                        <span class="upgrade-cost-badge">+${upg.cost} PM</span>
                        <p class="upgrade-desc">${formatSpellDescription(upg.desc)}</p>
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    }
    
    // Append the interactive Mana Planner Panel
    const basePM = CIRCLE_PM_COSTS[spell.c] || 1;
    html += `
        <div class="mana-planner-panel">
            <div class="mana-planner-header">
                <span class="mana-title"><i class="fa-solid fa-bolt"></i> Planejador de Mana</span>
                <span class="mana-cost-display" id="detail-total-pm">${basePM} PM</span>
            </div>
            <div class="mana-bar-track">
                <div class="mana-bar-fill" id="detail-mana-bar-fill" style="width: ${(basePM / 20) * 100}%"></div>
            </div>
            <div class="mana-cost-breakdown" id="detail-mana-breakdown">
                Base: ${basePM} PM + Aprimoramentos: 0 PM
            </div>
        </div>
    `;

    if (spell.isHomebrew) {
        html += `
            <button id="btn-delete-homebrew" class="btn-delete-homebrew-action">
                <i class="fa-solid fa-trash-can"></i> Excluir Magia Homebrew
            </button>
        `;
    }
    
    content.innerHTML = html;
    sidebar.classList.add("open");
    
    // Add Event Listeners for the dynamic components
    
    // Favorite Star Click inside details
    const favBtn = document.getElementById("btn-detail-fav");
    if (favBtn) {
        favBtn.addEventListener("click", () => {
            toggleFavoriteSpell(spell.n);
        });
    }
    
    // Delete Homebrew Button inside details
    const deleteHomebrewBtn = document.getElementById("btn-delete-homebrew");
    if (deleteHomebrewBtn) {
        deleteHomebrewBtn.addEventListener("click", () => {
            deleteHomebrewSpell(spell.n);
        });
    }
    
    // Checkbox upgrade changes
    const upgradeItems = content.querySelectorAll(".upgrade-item");
    upgradeItems.forEach(item => {
        const index = parseInt(item.getAttribute("data-index"));
        const checkbox = item.querySelector("input[type='checkbox']");
        
        // Clicks anywhere on the card toggles it
        item.addEventListener("click", (e) => {
            if (e.target !== checkbox && !checkbox.contains(e.target)) {
                checkbox.checked = !checkbox.checked;
            }
            toggleUpgradeSelection(index, checkbox.checked, item);
        });
    });
}

function toggleUpgradeSelection(index, isChecked, itemElement) {
    if (isChecked) {
        STATE.selectedUpgrades.add(index);
        itemElement.classList.add("selected");
    } else {
        STATE.selectedUpgrades.delete(index);
        itemElement.classList.remove("selected");
    }
    
    recalculateSpellPM();
}

function recalculateSpellPM() {
    if (!STATE.selectedSpell) return;
    
    const spell = STATE.selectedSpell;
    const basePM = CIRCLE_PM_COSTS[spell.c] || 1;
    let upgradesPM = 0;
    
    STATE.selectedUpgrades.forEach(index => {
        if (spell.aprimoramentos && spell.aprimoramentos[index]) {
            upgradesPM += spell.aprimoramentos[index].cost;
        }
    });
    
    const totalPM = basePM + upgradesPM;
    
    // Update DOM
    const pmDisplay = document.getElementById("detail-total-pm");
    const barFill = document.getElementById("detail-mana-bar-fill");
    const breakdown = document.getElementById("detail-mana-breakdown");
    
    if (pmDisplay) pmDisplay.textContent = `${totalPM} PM`;
    
    if (barFill) {
        // Limit visually to 100% capacity (assuming 20 PM is standard high end, but will scale if exceeds)
        const capPM = Math.max(20, totalPM);
        const percent = (totalPM / capPM) * 100;
        barFill.style.width = `${percent}%`;
        
        // If cost is high, tint it red-orange, if normal blue-cyan
        if (totalPM >= 15) {
            barFill.style.background = "linear-gradient(90deg, #ff1744, #e040fb)";
            barFill.style.boxShadow = "0 0 10px rgba(255, 23, 68, 0.6)";
        } else {
            barFill.style.background = "linear-gradient(90deg, #29b6f6, #00e5ff)";
            barFill.style.boxShadow = "0 0 10px rgba(0, 229, 255, 0.6)";
        }
    }
    
    if (breakdown) {
        breakdown.textContent = `Base: ${basePM} PM + Aprimoramentos: ${upgradesPM} PM`;
    }
}

// Parse description and wrap core mechanics keywords in highlights/bold tags
function formatSpellDescription(text) {
    if (!text) return "";
    
    let formatted = text;
    
    // 1. Highlight dice expressions (e.g., 2d6, 1d8+1, 10d8+10)
    const diceRegex = /(\b\d+d\d+(?:\+\d+)?\b)/gi;
    formatted = formatted.replace(diceRegex, '<span class="highlight-term">$1</span>');
    
    // 2. Highlight key game attributes and mechanical terms in bold
    const terms = [
        "Vontade", "Fortitude", "Reflexos", "CD", "PM", "PV", "T\\$",
        "cena", "sustentada", "instantânea", "rodadas", "rodada", "desprevenido", 
        "enredada", "lenta", "pasmo", "atordoado", "vulnerável", "dano de fogo",
        "dano de frio", "dano de trevas", "dano psíquico", "dano de eletricidade", 
        "dano de ácido", "dano de impacto", "Iniciativa", "Percepção", "Misticismo", 
        "Acrobacia", "Atletismo", "Sobrevivência", "Diplomacia", "Adestramento"
    ];
    
    terms.forEach(term => {
        const regex = new RegExp(`\\b(${term})\\b`, 'gi');
        formatted = formatted.replace(regex, '<b>$1</b>');
    });
    
    return formatted;
}

function closeSpellDetails() {
    const sidebar = document.getElementById("detail-sidebar");
    if (sidebar) {
        sidebar.classList.remove("open");
    }
    STATE.selectedSpell = null;
    STATE.selectedUpgrades.clear();
}

// ==========================================================================
// 7. GRIMOIRE LIST MODAL & MULTI-BOOK MANAGEMENT
// ==========================================================================

function openGrimoireModal() {
    const modal = document.getElementById("grimoire-modal");
    if (!modal) return;
    
    renderGrimoiresListInModal();
    modal.classList.remove("hidden");
}

function closeGrimoireModal() {
    const modal = document.getElementById("grimoire-modal");
    const input = document.getElementById("new-grimoire-name");
    if (modal) {
        modal.classList.add("hidden");
    }
    if (input) {
        input.value = "";
    }
}

function renderGrimoiresListInModal() {
    const list = document.getElementById("grimoires-list");
    if (!list) return;
    
    list.innerHTML = "";
    
    Object.keys(STATE.grimoires).forEach(name => {
        const isActive = name === STATE.activeGrimoireName;
        const spellCount = STATE.grimoires[name].length;
        
        const row = document.createElement("li");
        row.className = `grimoire-item-row ${isActive ? 'active' : ''}`;
        
        row.innerHTML = `
            <span class="grimoire-item-name">${name} (${spellCount} ${spellCount === 1 ? 'magia' : 'magias'})</span>
            <div class="grimoire-actions">
                ${Object.keys(STATE.grimoires).length > 1 ? `
                    <button class="btn-delete-grimoire" title="Excluir Grimório" data-name="${name}">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                ` : ''}
            </div>
        `;
        
        // Select profile
        row.querySelector(".grimoire-item-name").addEventListener("click", () => {
            switchActiveGrimoire(name);
            renderGrimoiresListInModal();
        });
        
        // Delete profile
        const deleteBtn = row.querySelector(".btn-delete-grimoire");
        if (deleteBtn) {
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                deleteGrimoire(name);
            });
        }
        
        list.appendChild(row);
    });
}

function createNewGrimoire() {
    const input = document.getElementById("new-grimoire-name");
    if (!input) return;
    
    const name = input.value.trim();
    if (!name) return;
    
    if (STATE.grimoires[name]) {
        alert("Já existe um grimório com este nome!");
        return;
    }
    
    STATE.grimoires[name] = [];
    STATE.activeGrimoireName = name;
    saveToStorage();
    
    input.value = "";
    
    // Updates
    updateGrimoireSelectDropdown();
    renderGrimoiresListInModal();
    renderSpellsGrid();
    updateStatsDashboard();
}

function deleteGrimoire(name) {
    if (Object.keys(STATE.grimoires).length <= 1) {
        alert("Você precisa manter pelo menos um grimório ativo!");
        return;
    }
    
    if (confirm(`Tem certeza de que deseja excluir o grimório "${name}"?`)) {
        delete STATE.grimoires[name];
        
        // If we deleted the active one, switch to another
        if (STATE.activeGrimoireName === name) {
            STATE.activeGrimoireName = Object.keys(STATE.grimoires)[0];
        }
        
        saveToStorage();
        updateGrimoireSelectDropdown();
        renderGrimoiresListInModal();
        renderSpellsGrid();
        updateStatsDashboard();
        
        // If current spell detail view is open, refresh fav star
        if (STATE.selectedSpell) {
            openSpellDetails(STATE.selectedSpell);
        }
    }
}

function switchActiveGrimoire(name) {
    if (!STATE.grimoires[name]) return;
    
    STATE.activeGrimoireName = name;
    saveToStorage();
    updateGrimoireSelectDropdown();
    renderSpellsGrid();
    updateStatsDashboard();
    
    // If spell details are open, refresh it
    if (STATE.selectedSpell) {
        openSpellDetails(STATE.selectedSpell);
    }
}

// ==========================================================================
// 7B. HOMEBREW SPELL CREATION & MANAGEMENT LOGIC
// ==========================================================================

function openHomebrewModal() {
    const modal = document.getElementById("homebrew-modal");
    if (!modal) return;
    
    // Reset form and dynamic upgrades container
    document.getElementById("homebrew-form").reset();
    document.getElementById("hb-upgrades-container").innerHTML = "";
    
    modal.classList.remove("hidden");
}

function closeHomebrewModal() {
    const modal = document.getElementById("homebrew-modal");
    if (modal) {
        modal.classList.add("hidden");
    }
}

function addHomebrewUpgradeRow() {
    const container = document.getElementById("hb-upgrades-container");
    if (!container) return;
    
    const rowIndex = container.children.length;
    
    const row = document.createElement("div");
    row.className = "hb-upgrade-row";
    row.innerHTML = `
        <div class="cost-input-wrapper">
            <label for="hb-upg-cost-${rowIndex}">Custo (PM)</label>
            <input type="number" id="hb-upg-cost-${rowIndex}" min="1" max="20" value="1" required>
        </div>
        <div class="desc-input-wrapper">
            <label for="hb-upg-desc-${rowIndex}">Descrição do Aprimoramento</label>
            <input type="text" id="hb-upg-desc-${rowIndex}" placeholder="ex: muda o alcance para médio." required autocomplete="off">
        </div>
        <button type="button" class="btn-remove-upgrade" title="Remover Aprimoramento">
            <i class="fa-solid fa-trash-can"></i>
        </button>
    `;
    
    // Bind remove button
    row.querySelector(".btn-remove-upgrade").addEventListener("click", () => {
        row.remove();
        reindexUpgradeRows();
    });
    
    container.appendChild(row);
    
    // Scroll container to bottom
    container.scrollTop = container.scrollHeight;
}

function reindexUpgradeRows() {
    const container = document.getElementById("hb-upgrades-container");
    if (!container) return;
    
    Array.from(container.children).forEach((row, index) => {
        const costInput = row.querySelector(".cost-input-wrapper input");
        const costLabel = row.querySelector(".cost-input-wrapper label");
        const descInput = row.querySelector(".desc-input-wrapper input");
        const descLabel = row.querySelector(".desc-input-wrapper label");
        
        if (costInput && costLabel) {
            costInput.id = `hb-upg-cost-${index}`;
            costLabel.setAttribute("for", `hb-upg-cost-${index}`);
        }
        if (descInput && descLabel) {
            descInput.id = `hb-upg-desc-${index}`;
            descLabel.setAttribute("for", `hb-upg-desc-${index}`);
        }
    });
}

function saveHomebrewSpell(e) {
    if (e) e.preventDefault();
    
    const nameInput = document.getElementById("hb-name");
    const name = nameInput.value.trim();
    if (!name) return;
    
    // Check duplication
    const isDuplicate = SPELLS_DB.some(s => s.n.toLowerCase() === name.toLowerCase());
    if (isDuplicate) {
        alert(`Já existe uma magia chamada "${name}"! Por favor, use um nome diferente.`);
        nameInput.focus();
        return;
    }
    
    const circle = parseInt(document.getElementById("hb-circle").value);
    const school = document.getElementById("hb-school").value;
    const tipo = document.getElementById("hb-tipo")?.value || 'Universal';
    const execution = document.getElementById("hb-execution").value.trim();
    const range = document.getElementById("hb-range").value.trim();
    const target = document.getElementById("hb-target").value.trim();
    const duration = document.getElementById("hb-duration").value.trim();
    const resistance = document.getElementById("hb-resistance").value.trim();
    const description = document.getElementById("hb-description").value.trim();
    
    // Collect Upgrades
    const upgrades = [];
    const rows = document.querySelectorAll(".hb-upgrade-row");
    rows.forEach(row => {
        const costInput = row.querySelector(".cost-input-wrapper input");
        const descInput = row.querySelector(".desc-input-wrapper input");
        if (costInput && descInput) {
            const cost = parseInt(costInput.value);
            const desc = descInput.value.trim();
            if (!isNaN(cost) && desc) {
                upgrades.push({ cost, desc });
            }
        }
    });
    
    const newSpell = {
        n: name,
        c: circle,
        t: tipo,
        e: school,
        ex: execution,
        a: range,
        al: target || "Nenhum",
        d: duration,
        r: resistance || "Nenhuma",
        desc: description,
        aprimoramentos: upgrades,
        isHomebrew: true
    };
    
    // Add to main spells database
    SPELLS_DB.push(newSpell);
    
    // Add to localStorage homebrews
    try {
        const storedHomebrews = localStorage.getItem("grimorio_arton_homebrews");
        const homebrews = storedHomebrews ? JSON.parse(storedHomebrews) : [];
        homebrews.push(newSpell);
        localStorage.setItem("grimorio_arton_homebrews", JSON.stringify(homebrews));
    } catch (err) {
        console.error("Erro ao salvar magia homebrew:", err);
    }
    
    // UI refreshes
    closeHomebrewModal();
    renderSpellsGrid();
    updateStatsDashboard();
    
    // Open detailed view for the new spell
    openSpellDetails(newSpell);
}

function deleteHomebrewSpell(spellName) {
    if (confirm(`Tem certeza de que deseja excluir a magia homebrew "${spellName}"? Isto a removerá permanentemente de todos os grimórios.`)) {
        // 1. Remove from SPELLS_DB
        const index = SPELLS_DB.findIndex(s => s.n.toLowerCase() === spellName.toLowerCase());
        if (index > -1) {
            SPELLS_DB.splice(index, 1);
        }
        
        // 2. Remove from LocalStorage
        try {
            const storedHomebrews = localStorage.getItem("grimorio_arton_homebrews");
            if (storedHomebrews) {
                const homebrews = JSON.parse(storedHomebrews);
                const filtered = homebrews.filter(s => s.n.toLowerCase() !== spellName.toLowerCase());
                localStorage.setItem("grimorio_arton_homebrews", JSON.stringify(filtered));
            }
        } catch (err) {
            console.error("Erro ao excluir magia homebrew do localStorage:", err);
        }
        
        // 3. Clean up bookmarks in grimoires
        Object.keys(STATE.grimoires).forEach(grimoireName => {
            STATE.grimoires[grimoireName] = STATE.grimoires[grimoireName].filter(name => name.toLowerCase() !== spellName.toLowerCase());
        });
        saveToStorage();
        
        // 4. UI refreshes
        closeSpellDetails();
        renderSpellsGrid();
        updateStatsDashboard();
    }
}

// ==========================================================================
// 8. INTERACTIVE FILTER & BADGE UI LOGIC
// ==========================================================================

function handleCircleFilterClick(btn, circle) {
    btn.classList.toggle("active");
    if (STATE.filters.circles.has(circle)) {
        STATE.filters.circles.delete(circle);
    } else {
        STATE.filters.circles.add(circle);
    }
    renderSpellsGrid();
    updateStatsDashboard();
    updateActiveFilterBadges();
}

function handleSchoolFilterClick(btn, school) {
    btn.classList.toggle("active");
    if (STATE.filters.schools.has(school)) {
        STATE.filters.schools.delete(school);
    } else {
        STATE.filters.schools.add(school);
    }
    renderSpellsGrid();
    updateStatsDashboard();
    updateActiveFilterBadges();
}

function handleTipoFilterClick(btn, tipo) {
    btn.classList.toggle("active");
    if (STATE.filters.tipos.has(tipo)) {
        STATE.filters.tipos.delete(tipo);
    } else {
        STATE.filters.tipos.add(tipo);
    }
    renderSpellsGrid();
    updateStatsDashboard();
    updateActiveFilterBadges();
}

function updateActiveFilterBadges() {
    const container = document.getElementById("active-filters-badges");
    if (!container) return;
    
    container.innerHTML = "";
    
    // Circles
    STATE.filters.circles.forEach(circle => {
        createBadge(container, `${circle}º Círculo`, () => {
            STATE.filters.circles.delete(circle);
            const btn = document.querySelector(`.circle-badge-btn[data-circle="${circle}"]`);
            if (btn) btn.classList.remove("active");
            updateActiveFilterBadges();
            renderSpellsGrid();
            updateStatsDashboard();
        });
    });
    
    // Schools
    STATE.filters.schools.forEach(school => {
        createBadge(container, school, () => {
            STATE.filters.schools.delete(school);
            const btn = document.querySelector(`.school-filter-btn[data-school="${school}"]`);
            if (btn) btn.classList.remove("active");
            updateActiveFilterBadges();
            renderSpellsGrid();
            updateStatsDashboard();
        });
    });
    
    // Tipos
    STATE.filters.tipos.forEach(tipo => {
        createBadge(container, tipo, () => {
            STATE.filters.tipos.delete(tipo);
            const btn = document.querySelector(`.tipo-filter-btn[data-tipo="${tipo}"]`);
            if (btn) btn.classList.remove("active");
            updateActiveFilterBadges();
            renderSpellsGrid();
            updateStatsDashboard();
        });
    });
    
    // Technical range
    if (STATE.filters.range) {
        createBadge(container, `Alcance: ${STATE.filters.range}`, () => {
            STATE.filters.range = "";
            document.getElementById("filter-range").value = "";
            updateActiveFilterBadges();
            renderSpellsGrid();
            updateStatsDashboard();
        });
    }
    
    // Technical execution
    if (STATE.filters.execution) {
        let label = STATE.filters.execution;
        if (label === "padrão") label = "Padrão";
        createBadge(container, `Execução: ${label}`, () => {
            STATE.filters.execution = "";
            document.getElementById("filter-execution").value = "";
            updateActiveFilterBadges();
            renderSpellsGrid();
            updateStatsDashboard();
        });
    }
    
    // Technical resistance
    if (STATE.filters.resistance) {
        createBadge(container, `Resistência: ${STATE.filters.resistance}`, () => {
            STATE.filters.resistance = "";
            document.getElementById("filter-resistance").value = "";
            updateActiveFilterBadges();
            renderSpellsGrid();
            updateStatsDashboard();
        });
    }
}

function createBadge(container, text, onRemove) {
    const badge = document.createElement("span");
    badge.className = "filter-badge";
    badge.innerHTML = `
        ${text}
        <i class="fa-solid fa-xmark"></i>
    `;
    badge.querySelector("i").addEventListener("click", onRemove);
    container.appendChild(badge);
}

function resetAllFilters() {
    STATE.filters.search = "";
    STATE.filters.favoritesOnly = false;
    STATE.filters.circles.clear();
    STATE.filters.schools.clear();
    STATE.filters.tipos.clear();
    STATE.filters.range = "";
    STATE.filters.execution = "";
    STATE.filters.resistance = "";
    
    // Reset DOM elements
    document.getElementById("search-input").value = "";
    document.getElementById("clear-search").classList.remove("visible");
    document.getElementById("btn-toggle-favorites").classList.remove("active");
    
    document.querySelectorAll(".circle-badge-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".school-filter-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".tipo-filter-btn").forEach(btn => btn.classList.remove("active"));
    
    document.getElementById("filter-range").value = "";
    document.getElementById("filter-execution").value = "";
    document.getElementById("filter-resistance").value = "";
    
    renderSpellsGrid();
    updateStatsDashboard();
    updateActiveFilterBadges();
}

// ==========================================================================
// 9. INITIALIZATION & BINDING
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // A. Init storage
    loadFromStorage();
    updateGrimoireSelectDropdown();
    
    // B. Init particle canvas background
    initParticleSystem();
    
    // C. Bind Search bar
    const searchInput = document.getElementById("search-input");
    const clearSearchBtn = document.getElementById("clear-search");
    
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            STATE.filters.search = e.target.value;
            if (e.target.value.length > 0) {
                clearSearchBtn.classList.add("visible");
            } else {
                clearSearchBtn.classList.remove("visible");
            }
            renderSpellsGrid();
            updateStatsDashboard();
        });
    }
    
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener("click", () => {
            searchInput.value = "";
            STATE.filters.search = "";
            clearSearchBtn.classList.remove("visible");
            renderSpellsGrid();
            updateStatsDashboard();
        });
    }
    
    // D. Bind Toggle Personal Grimoire Favorite filter
    const favToggleBtn = document.getElementById("btn-toggle-favorites");
    if (favToggleBtn) {
        favToggleBtn.addEventListener("click", () => {
            STATE.filters.favoritesOnly = !STATE.filters.favoritesOnly;
            favToggleBtn.classList.toggle("active");
            renderSpellsGrid();
            updateStatsDashboard();
        });
    }
    
    // E. Bind Circle buttons
    document.querySelectorAll(".circle-badge-btn").forEach(btn => {
        const circle = parseInt(btn.getAttribute("data-circle"));
        btn.addEventListener("click", () => handleCircleFilterClick(btn, circle));
    });
    
    // F. Bind School buttons
    document.querySelectorAll(".school-filter-btn").forEach(btn => {
        const school = btn.getAttribute("data-school");
        btn.addEventListener("click", () => handleSchoolFilterClick(btn, school));
    });
    
    // F2. Bind Tipo buttons
    document.querySelectorAll(".tipo-filter-btn").forEach(btn => {
        const tipo = btn.getAttribute("data-tipo");
        btn.addEventListener("click", () => handleTipoFilterClick(btn, tipo));
    });
    
    // G. Collapsible filter toggle
    const collHeader = document.getElementById("tech-filters-header");
    const collContent = document.getElementById("tech-filters-content");
    if (collHeader && collContent) {
        collHeader.addEventListener("click", () => {
            collHeader.classList.toggle("collapsed");
            collContent.classList.toggle("collapsed");
        });
    }
    
    // G2. Collapsible School filters toggle
    const schoolHeader = document.getElementById("school-filters-header");
    const schoolContent = document.getElementById("school-filters-content");
    if (schoolHeader && schoolContent) {
        schoolHeader.addEventListener("click", () => {
            schoolHeader.classList.toggle("collapsed");
            schoolContent.classList.toggle("collapsed");
        });
    }

    // G2b. Collapsible Tipo filters toggle
    const tipoHeader = document.getElementById("tipo-filters-header");
    const tipoContent = document.getElementById("tipo-filters-content");
    if (tipoHeader && tipoContent) {
        tipoHeader.addEventListener("click", () => {
            tipoHeader.classList.toggle("collapsed");
            tipoContent.classList.toggle("collapsed");
        });
    }

    // G3. Scroll to Top Button Action & Visibility
    const scrollTopBtn = document.getElementById("btn-scroll-top");
    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.remove("hidden");
            } else {
                scrollTopBtn.classList.add("hidden");
            }
        });
        
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
    
    // H. Bind Technical Filters select inputs
    const rangeSelect = document.getElementById("filter-range");
    if (rangeSelect) {
        rangeSelect.addEventListener("change", (e) => {
            STATE.filters.range = e.target.value;
            renderSpellsGrid();
            updateStatsDashboard();
            updateActiveFilterBadges();
        });
    }
    
    const execSelect = document.getElementById("filter-execution");
    if (execSelect) {
        execSelect.addEventListener("change", (e) => {
            STATE.filters.execution = e.target.value;
            renderSpellsGrid();
            updateStatsDashboard();
            updateActiveFilterBadges();
        });
    }
    
    const resSelect = document.getElementById("filter-resistance");
    if (resSelect) {
        resSelect.addEventListener("change", (e) => {
            STATE.filters.resistance = e.target.value;
            renderSpellsGrid();
            updateStatsDashboard();
            updateActiveFilterBadges();
        });
    }
    
    // I. Bind Sort select
    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
            STATE.sortBy = e.target.value;
            renderSpellsGrid();
        });
    }
    
    // J. Reset all filters
    const resetBtn = document.getElementById("btn-reset-filters");
    if (resetBtn) {
        resetBtn.addEventListener("click", resetAllFilters);
    }
    
    // K. Bind Close details panel btn
    const closeDetailBtn = document.getElementById("btn-close-detail");
    if (closeDetailBtn) {
        closeDetailBtn.addEventListener("click", closeSpellDetails);
    }
    
    // L. Bind dropdown profile switch
    const grimoireSelect = document.getElementById("grimoire-select");
    if (grimoireSelect) {
        grimoireSelect.addEventListener("change", (e) => {
            switchActiveGrimoire(e.target.value);
        });
    }
    
    // M. Bind Grimoire Management Modal Triggers
    const manageGrimoiresBtn = document.getElementById("btn-manage-grimoires");
    const closeModalBtn = document.getElementById("btn-close-modal");
    const createGrimoireBtn = document.getElementById("btn-create-grimoire");
    const overlay = document.getElementById("grimoire-modal");
    
    if (manageGrimoiresBtn) {
        manageGrimoiresBtn.addEventListener("click", openGrimoireModal);
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeGrimoireModal);
    }
    
    if (createGrimoireBtn) {
        createGrimoireBtn.addEventListener("click", createNewGrimoire);
    }
    
    if (overlay) {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                closeGrimoireModal();
            }
        });
    }

    // N. Bind Homebrew Modal Triggers
    const createSpellTrigger = document.getElementById("btn-create-spell-trigger");
    const closeHbModalBtn = document.getElementById("btn-close-homebrew-modal");
    const cancelHbBtn = document.getElementById("btn-cancel-homebrew");
    const addHbUpgradeBtn = document.getElementById("btn-add-hb-upgrade");
    const hbForm = document.getElementById("homebrew-form");
    const hbOverlay = document.getElementById("homebrew-modal");

    if (createSpellTrigger) {
        createSpellTrigger.addEventListener("click", openHomebrewModal);
    }
    
    if (closeHbModalBtn) {
        closeHbModalBtn.addEventListener("click", closeHomebrewModal);
    }
    
    if (cancelHbBtn) {
        cancelHbBtn.addEventListener("click", closeHomebrewModal);
    }
    
    if (addHbUpgradeBtn) {
        addHbUpgradeBtn.addEventListener("click", addHomebrewUpgradeRow);
    }
    
    if (hbForm) {
        hbForm.addEventListener("submit", saveHomebrewSpell);
    }
    
    if (hbOverlay) {
        hbOverlay.addEventListener("click", (e) => {
            if (e.target === hbOverlay) {
                closeHomebrewModal();
            }
        });
    }
    
    // Render initial grid and stats
    renderSpellsGrid();
    updateStatsDashboard();
    updateActiveFilterBadges();

});
