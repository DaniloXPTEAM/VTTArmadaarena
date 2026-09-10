document.addEventListener("DOMContentLoaded", function () {
    // ===== ELEMENTOS DO DOM =====
    const diasSemEncontroVal = document.getElementById("diasSemEncontroVal");
    const chanceEncontroVal = document.getElementById("chanceEncontroVal");
    const rolagensAnterioresInput = document.getElementById("rolagensAnterioresInput");
    
    const btnAvancarDia = document.getElementById("btnAvancarDia");
    const btnResetarViagem = document.getElementById("btnResetarViagem");
    
    const rollEncounterBtn = document.getElementById("rollEncounter");
    
    const tabelaEncontro = document.getElementById("tabelaEncontro");
    const tipoTerrenoSelect = document.getElementById("tipoTerreno");
    const rollAutomaticallyBtn = document.getElementById("rollAutomatically");
    
    const resultPanel = document.getElementById("resultPanel");
    const threatsSection = document.getElementById("threatsSection");
    const threatCardsContainer = document.getElementById("threatCardsContainer");
    const listaHistorico = document.getElementById("historicoEncontros");
    
    // ===== ESTADO DO DIÁRIO DE VIAGEM =====
    let diasSemEncontro = 0;
    let currentMatchedThreats = [];
    
    // Carregar dias anteriores salvos
    try {
        const salvos = localStorage.getItem("t20_travel_days");
        if (salvos !== null) {
            diasSemEncontro = parseInt(salvos) || 0;
        }
    } catch(e) {
        console.warn("Falha ao carregar dias de viagem", e);
    }
    
    updateTravelUI();

    // ===== CONTROLES DO GUIA =====
    const toggleGuide = document.getElementById("toggleGuide");
    const guideContent = document.getElementById("guideContent");
    const guideIcon = document.getElementById("guideIcon");

    if (toggleGuide && guideContent) {
        toggleGuide.addEventListener("click", function () {
            const isHidden = guideContent.style.display === "none";
            if (isHidden) {
                guideContent.style.display = "block";
                guideIcon.textContent = "[Ocultar]";
            } else {
                guideContent.style.display = "none";
                guideIcon.textContent = "[Mostrar]";
            }
        });
    }

    // ===== UI SEGMENTED BUTTONS (PATAMAR) =====
    const segButtons = Array.from(document.querySelectorAll('.seg-btn'));
    segButtons.forEach(lbl => {
        const input = lbl.querySelector('input[type="radio"]');
        if (!input) return;
        input.addEventListener('change', () => {
            if (!input.checked) return;
            segButtons.forEach(b => b.classList.remove('active'));
            lbl.classList.add('active');
        });
    });

    // ===== TOAST NOTIFICATIONS =====
    function mostrarToast(mensagem, tipo = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = `toast toast-${tipo}`;
        toast.textContent = mensagem;
        container.appendChild(toast);

        requestAnimationFrame(() => toast.classList.add('visible'));

        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }

    // ===== LÓGICA DO DIÁRIO DE VIAGEM =====
    function updateTravelUI() {
        if (diasSemEncontroVal) diasSemEncontroVal.textContent = diasSemEncontro;
        const chance = 5 + (diasSemEncontro * 5);
        if (chanceEncontroVal) chanceEncontroVal.textContent = chance + "%";
        if (rolagensAnterioresInput) rolagensAnterioresInput.value = diasSemEncontro;
        
        try {
            localStorage.setItem("t20_travel_days", diasSemEncontro);
        } catch(e) {
            console.warn("Falha ao salvar dias de viagem", e);
        }
    }

    // Avançar Dia de Viagem
    if (btnAvancarDia) {
        btnAvancarDia.addEventListener("click", function () {
            diasSemEncontro++;
            updateTravelUI();
            
            const chance = 5 + (diasSemEncontro * 5);
            adicionarAoHistorico(`☀️ Avançou para o dia ${diasSemEncontro} de viagem (Chance de perigo: ${chance}%)`);
            mostrarToast(`☀️ Viagem prossegue. Chance de perigo agora é de ${chance}%`);
        });
    }

    // Resetar Viagem
    if (btnResetarViagem) {
        btnResetarViagem.addEventListener("click", function () {
            if (confirm("Resetar diário de viagem para o Dia 0?")) {
                diasSemEncontro = 0;
                updateTravelUI();
                adicionarAoHistorico(`⟳ Diário de viagem reiniciado para o Dia 0.`);
                mostrarToast("⟳ Diário de viagem reiniciado!");
            }
        });
    }

    // Rolar Encontro (Testar Sorte do Dia)
    rollEncounterBtn.addEventListener("click", function (event) {
        event.preventDefault();
        
        const chanceDeAparecer = 5 + (diasSemEncontro * 5);
        const randomPercentage = Math.floor(Math.random() * 100) + 1;

        adicionarAoHistorico(`🎲 Testando sorte do dia... tirou ${randomPercentage} contra ${chanceDeAparecer}%`);

        if (randomPercentage <= chanceDeAparecer) {
            // ENCONTRO DESENCADEADO!
            diasSemEncontro = 0;
            updateTravelUI();
            
            mostrarToast("⚠️ Perigo! Um encontro selvagem foi desencadeado!", "aviso");
            adicionarAoHistorico(`⚠️ Perigo! Encontro aleatório disparado com rolagem de ${randomPercentage}%!`);
            
            // Auto rolar desafio na tabela
            rolarEncontros();
        } else {
            // Dia Pacífico
            diasSemEncontro++;
            updateTravelUI();
            mostrarToast("☀️ A viagem prossegue pacificamente por mais um dia.");
            adicionarAoHistorico(`☀️ Dia pacífico. Total acumulado: ${diasSemEncontro} dias.`);
        }
    });

    // ===== AJUSTE DE PATAMAR =====
    function getAjustePatamar() {
        if (document.getElementById("veterano").checked) return 30;
        if (document.getElementById("campeao").checked) return 70;
        if (document.getElementById("lenda").checked) return 110;
        return 0; // Iniciante
    }

    // ===== BUSCAR ENCONTRO NA TABELA =====
    function encontrarResultado(terreno, rolagem) {
        if (!terrenos || !terrenos[terreno]) return null;
        for (const encontro of terrenos[terreno]) {
            if (rolagem <= encontro.porcentagem) {
                return encontro;
            }
        }
        // Se passar da tabela, retorna o último item
        const list = terrenos[terreno];
        return list[list.length - 1];
    }

    // ===== ALGORITMO INTELIGENTE DE DETECÇÃO DE AMEAÇAS =====
    function findThreatsInDescription(desc) {
        if (!desc || typeof AMEACAS_DB === "undefined" || !Array.isArray(AMEACAS_DB)) return [];
        
        // Normaliza a descrição
        const normDesc = desc.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/\*/g, "")
            .replace(/['’‘]/g, "") // remove apostrofes completamente
            .replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, " ");
            
        const STOP_WORDS = new Set(["das", "dos", "com", "sob", "uma", "uns", "para", "pelo", "pela", "pelos", "pelas", "como", "sob"]);
        
        const spellingFixes = {
            "defeitusos": "defeituosos",
            "defeituso": "defeituoso",
            "namasquall": "namasqall",
            "hallustir": "hallustir"
        };

        const words = normDesc.split(/\s+/)
            .filter(w => w.length > 2 && !STOP_WORDS.has(w))
            .map(w => spellingFixes[w] || w);
            
        const getStem = (word) => {
            let stem = word;
            if (stem.endsWith("oes")) {
                stem = stem.slice(0, -3) + "ao";
            } else if (stem.endsWith("ais")) {
                stem = stem.slice(0, -3) + "al";
            } else if (stem.endsWith("eis")) {
                stem = stem.slice(0, -3) + "el";
            } else if (stem.endsWith("nns")) {
                stem = stem.slice(0, -1);
            } else if (stem.endsWith("ens")) {
                stem = stem.slice(0, -3) + "em";
            } else if (stem.endsWith("ins")) {
                stem = stem.slice(0, -3) + "im";
            } else if (stem.endsWith("uns")) {
                stem = stem.slice(0, -3) + "um";
            } else if (stem.endsWith("ons")) {
                stem = stem.slice(0, -1);
            } else if (stem.endsWith("ans")) {
                stem = stem.slice(0, -1);
            } else if (stem.endsWith("res") || stem.endsWith("ses") || stem.endsWith("zes")) {
                stem = stem.slice(0, -2);
            } else if (stem.endsWith("is") && !stem.endsWith("lis") && !stem.endsWith("mis") && !stem.endsWith("ris")) {
                stem = stem.slice(0, -1);
            } else if (stem.endsWith("s")) {
                stem = stem.slice(0, -1);
            }
            
            if (stem === "cae") {
                stem = "cao";
            }
            return stem;
        };
        
        const stemsInDesc = words.map(getStem);
        const matches = [];
        
        for (const threat of AMEACAS_DB) {
            const threatName = threat.nome || "";
            const normThreatName = threatName.toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/\*/g, "")
                .replace(/['’‘]/g, "") // remove apostrofes completamente
                .replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, " ");
                
            const threatWords = normThreatName.split(/\s+/)
                .filter(w => w.length > 2 && !STOP_WORDS.has(w))
                .map(w => spellingFixes[w] || w);
                
            if (threatWords.length === 0) continue;
            
            const isMatch = threatWords.every(tWord => {
                const tStem = getStem(tWord);
                return stemsInDesc.some(dStem => dStem === tStem);
            });
            
            if (isMatch) {
                matches.push(threat);
            }
        }
        
        return matches.sort((a, b) => b.nome.length - a.nome.length);
    }

    // ===== EXIBIR RESULTADOS E DETALHES DE CRIATURAS =====
    function exibirResultado(rolagem, resultado) {
        // Limpa a tabela
        const tbody = tabelaEncontro.querySelector("tbody") || tabelaEncontro;
        tbody.innerHTML = "";
        
        if (!resultado) {
            resultPanel.style.display = "none";
            return;
        }

        resultPanel.style.display = "block";

        // Cria a linha do resultado
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong>${rolagem}</strong></td>
            <td>${resultado.descricao}</td>
            <td><small class="text-muted">${resultado.pag || "não possui"}</small></td>
        `;
        tbody.appendChild(row);

        // Roda a detecção de ameaças
        currentMatchedThreats = findThreatsInDescription(resultado.descricao);
        renderThreatCards(currentMatchedThreats);

        // Adiciona ao histórico principal
        adicionarAoHistorico(`🗺️ <strong>[${rolagem}]</strong> ${resultado.descricao}`);
    }

    // Renderiza os Cards de Fichas das Criaturas
    function renderThreatCards(threats) {
        threatCardsContainer.innerHTML = "";
        
        if (!threats || threats.length === 0) {
            threatsSection.style.display = "none";
            return;
        }

        threatsSection.style.display = "block";

        threats.forEach((threat, index) => {
            const card = document.createElement("div");
            card.className = "threat-card";
            
            const hasPM = parseInt(threat.pm) > 0;
            const defObs = threat.defesaObs ? ` (${threat.defesaObs})` : "";
            
            card.innerHTML = `
                <div class="threat-header">
                    <div class="threat-name-row">
                        <span class="threat-title">${threat.nome}</span>
                        <span class="threat-type">${threat.tipo || "Ameaça"}</span>
                    </div>
                    <span class="threat-nd-badge">ND ${threat.nd || "—"}</span>
                </div>
                <div class="threat-summary">
                    <div class="threat-summary-item">
                        <span class="threat-summary-label">PV</span>
                        <span class="threat-summary-val text-rubi">${threat.pv || "—"}</span>
                    </div>
                    <div class="threat-summary-item">
                        <span class="threat-summary-label">PM</span>
                        <span class="threat-summary-val text-accent">${hasPM ? threat.pm : '—'}</span>
                    </div>
                    <div class="threat-summary-item">
                        <span class="threat-summary-label">Defesa</span>
                        <span class="threat-summary-val text-accent">${threat.defesa || "—"}${defObs}</span>
                    </div>
                </div>
                
                <div class="threat-actions">
                    <button class="btn btn-secondary btn-sm" id="btnToggleDetails-${index}" type="button">
                        <i class="fa-solid fa-eye"></i> Ver Ficha
                    </button>
                    <button class="btn btn-primary btn-sm" id="btnSendToCombat-${index}" type="button">
                        <i class="fa-solid fa-swords"></i> Enviar ao Combate
                    </button>
                </div>
                
                <div class="threat-details" id="threatDetails-${index}" style="display: none;">
                    <!-- Atributos -->
                    <div class="threat-attrs-grid">
                        <div class="threat-attr-item"><span class="threat-attr-lbl">FOR</span><span class="threat-attr-val">${threat.atributos?.for || '—'}</span></div>
                        <div class="threat-attr-item"><span class="threat-attr-lbl">DES</span><span class="threat-attr-val">${threat.atributos?.des || '—'}</span></div>
                        <div class="threat-attr-item"><span class="threat-attr-lbl">CON</span><span class="threat-attr-val">${threat.atributos?.con || '—'}</span></div>
                        <div class="threat-attr-item"><span class="threat-attr-lbl">INT</span><span class="threat-attr-val">${threat.atributos?.int || '—'}</span></div>
                        <div class="threat-attr-item"><span class="threat-attr-lbl">SAB</span><span class="threat-attr-val">${threat.atributos?.sab || '—'}</span></div>
                        <div class="threat-attr-item"><span class="threat-attr-lbl">CAR</span><span class="threat-attr-val">${threat.atributos?.car || '—'}</span></div>
                    </div>
                    
                    <!-- Deslocamento e Percepção -->
                    <div class="threat-details-block">
                        <span class="threat-details-lbl">Deslocamento</span>
                        <span class="threat-details-val">${threat.desl || '—'}</span>
                    </div>
                    
                    <div class="threat-details-block">
                        <span class="threat-details-lbl">Resistências</span>
                        <span class="threat-details-val">Fort ${threat.fort || '+0'}, Ref ${threat.ref || '+0'}, Von ${threat.von || '+0'}</span>
                    </div>
                    
                    <div class="threat-details-block">
                        <span class="threat-details-lbl">Percepção</span>
                        <span class="threat-details-val">${threat.percepcao || '+0'} ${threat.percepcaoObs ? `(${threat.percepcaoObs})` : ''}</span>
                    </div>
                    
                    <!-- Ataques -->
                    <div class="threat-details-block">
                        <span class="threat-details-lbl">Ataques</span>
                        <ul class="threat-attacks-list">
                            ${renderAttacksList(threat.ataques)}
                        </ul>
                    </div>
                    
                    <!-- Habilidades -->
                    <div class="threat-details-block">
                        <span class="threat-details-lbl">Habilidades Especiais</span>
                        <ul class="threat-skills-list">
                            ${renderSkillsList(threat.habilidades)}
                        </ul>
                    </div>
                    
                    <div class="threat-details-block" style="margin-bottom: 0;">
                        <span class="threat-details-lbl">Tesouro / Fonte</span>
                        <span class="threat-details-val text-muted">${threat.tesouro || 'Nenhum'} | ${threat.fonte || 'Livro Básico'}</span>
                    </div>
                </div>
                
                <!-- Box de Configuração para Envio ao Combate -->
                <div class="combat-sender-box" id="combatSender-${index}" style="display: none;">
                    <div class="combat-sender-inputs">
                        <span style="font-size: 0.8rem; font-weight: bold; color: var(--ouro);">Qtd:</span>
                        <input type="number" id="combatSendQty-${index}" value="1" min="1" max="20" class="combat-qty-input select">
                    </div>
                    <div class="actions-row">
                        <button class="btn btn-primary btn-sm" id="btnConfirmSend-${index}" type="button">
                            <i class="fa-solid fa-check"></i> Enviar
                        </button>
                        <button class="btn btn-ghost btn-sm" id="btnCancelSend-${index}" type="button">
                            Cancelar
                        </button>
                    </div>
                </div>
            `;
            
            threatCardsContainer.appendChild(card);
            
            // Vincular eventos
            const btnDetails = card.querySelector(`#btnToggleDetails-${index}`);
            const panelDetails = card.querySelector(`#threatDetails-${index}`);
            const btnSend = card.querySelector(`#btnSendToCombat-${index}`);
            const boxSender = card.querySelector(`#combatSender-${index}`);
            
            btnDetails.addEventListener("click", () => {
                const isHidden = panelDetails.style.display === "none";
                panelDetails.style.display = isHidden ? "block" : "none";
                btnDetails.innerHTML = isHidden ? `<i class="fa-solid fa-eye-slash"></i> Ocultar Ficha` : `<i class="fa-solid fa-eye"></i> Ver Ficha`;
            });
            
            btnSend.addEventListener("click", () => {
                boxSender.style.display = "flex";
            });
            
            card.querySelector(`#btnCancelSend-${index}`).addEventListener("click", () => {
                boxSender.style.display = "none";
            });
            
            card.querySelector(`#btnConfirmSend-${index}`).addEventListener("click", () => {
                const qty = parseInt(card.querySelector(`#combatSendQty-${index}`).value) || 1;
                enviarCriaturaParaGerenciadorCombate(threat, qty);
                boxSender.style.display = "none";
            });
        });
    }

    // Ouvinte para o botão "Enviar Todas ao Combate"
    const btnSendAll = document.getElementById("btnSendAllToCombat");
    if (btnSendAll) {
        btnSendAll.addEventListener("click", function () {
            if (!currentMatchedThreats || currentMatchedThreats.length === 0) return;
            
            currentMatchedThreats.forEach((threat, index) => {
                const qtyInput = document.getElementById(`combatSendQty-${index}`);
                const qty = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;
                enviarCriaturaParaGerenciadorCombate(threat, qty, false);
            });
            
            mostrarToast(`⚔️ Todas as ${currentMatchedThreats.length} ameaças foram enviadas ao combate!`, "sucesso");
        });
    }

    function renderAttacksList(attacks) {
        if (!attacks || attacks.length === 0) return `<li class="text-muted">Nenhum ataque registrado.</li>`;
        return attacks.map(atk => `
            <li class="threat-attack-item">
                <span class="threat-attack-title">${atk.nome}</span> 
                <span class="text-muted">${atk.tipo || ''}</span> 
                <strong class="text-accent">${atk.bonus || ''}</strong> 
                <span class="threat-attack-dano">(${atk.dano || ''})</span>
                ${atk.desc ? `<div class="threat-attack-desc">${atk.desc}</div>` : ''}
            </li>
        `).join("");
    }

    function renderSkillsList(skills) {
        if (!skills || skills.length === 0) return `<li class="text-muted">Nenhuma habilidade registrada.</li>`;
        return skills.map(h => `
            <li class="threat-skill-item">
                <span class="threat-skill-title">${h.nome}</span> 
                <span class="text-muted">(${h.tipo || ''})</span>
                <div class="threat-skill-desc">${h.desc || ''}</div>
            </li>
        `).join("");
    }

    // ===== EXPORTAR MONSTROS PARA O COMBATE NO LOCALSTORAGE =====
    function enviarCriaturaParaGerenciadorCombate(threat, qty, exibirToast = true) {
        const STORAGE_KEY = "t20_combat_app_v1";
        let combatState = null;

        // Tenta ler o combate atual do localStorage
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                combatState = JSON.parse(raw);
            }
        } catch(e) {
            console.error("Falha ao ler o combate do localStorage", e);
        }

        // Se não existir, inicializa um estado padrão
        if (!combatState || typeof combatState !== "object") {
            combatState = {
                round: 1,
                activeId: null,
                combatants: [],
                log: [],
                logOpen: false,
                autoSort: false
            };
        }

        if (!Array.isArray(combatState.combatants)) combatState.combatants = [];

        for (let i = 1; i <= qty; i++) {
            const id = `c${Date.now()}${Math.floor(Math.random() * 99999)}`;
            
            // Se enviar múltiplos, adiciona número ao nome (ex: Lobo 1, Lobo 2)
            const nomeFinal = qty > 1 ? `${threat.nome} ${i}` : threat.nome;

            // Rola Iniciativa Automaticamente
            const initText = threat.iniciativa || "+0";
            const initMod = parseInt(initText.replace("+", "")) || 0;
            const roll = Math.floor(Math.random() * 20) + 1;
            const totalInit = roll + initMod;

            // Extrai Defesa e Resistências
            const defVal = threat.defesa + (threat.defesaObs ? ` (${threat.defesaObs})` : "");
            const resVal = `Fort ${threat.fort || "+0"}, Ref ${threat.ref || "+0"}, Von ${threat.von || "+0"}`;
            
            // Busca CD na ficha da criatura
            let cdVal = "";
            const descTexts = [];
            if (Array.isArray(threat.ataques)) threat.ataques.forEach(a => descTexts.push(a.desc || ""));
            if (Array.isArray(threat.habilidades)) threat.habilidades.forEach(h => descTexts.push(h.desc || ""));
            const cdMatch = descTexts.join(" ").match(/CD\s*(\d+)/i);
            if (cdMatch) cdVal = cdMatch[1];

            // Monta as Anotações Completas
            let notesStr = "";
            notesStr += `Tipo: ${threat.tipo || "—"} | ND: ${threat.nd || "—"}\n`;
            notesStr += `Deslocamento: ${threat.desl || "—"}\n`;
            if (threat.atributos) {
                const atr = threat.atributos;
                notesStr += `Atributos: FOR ${atr.for || "—"}, DES ${atr.des || "—"}, CON ${atr.con || "—"}, INT ${atr.int || "—"}, SAB ${atr.sab || "—"}, CAR ${atr.car || "—"}\n`;
            }
            if (threat.percepcao) {
                notesStr += `Percepção: ${threat.percepcao} ${threat.percepcaoObs ? `(${threat.percepcaoObs})` : ""}\n`;
            }
            if (threat.tesouro) {
                notesStr += `Tesouro: ${threat.tesouro}\n`;
            }
            notesStr += `\n--- ATAQUES ---\n`;
            if (Array.isArray(threat.ataques) && threat.ataques.length > 0) {
                threat.ataques.forEach(atk => {
                    notesStr += `• ${atk.nome}: ${atk.tipo || ""} ${atk.bonus || ""} (${atk.dano || ""})${atk.desc ? ` - ${atk.desc}` : ""}\n`;
                });
            } else {
                notesStr += `Nenhum ataque registrado.\n`;
            }
            notesStr += `\n--- HABILIDADES ---\n`;
            if (Array.isArray(threat.habilidades) && threat.habilidades.length > 0) {
                threat.habilidades.forEach(hab => {
                    notesStr += `• ${hab.nome} (${hab.tipo || ""}): ${hab.desc || ""}\n`;
                });
            } else {
                notesStr += `Nenhuma habilidade registrada.\n`;
            }

            combatState.combatants.push({
                id,
                name: nomeFinal,
                init: totalInit,
                hpCur: parseInt(threat.pv) || 0,
                hpMax: parseInt(threat.pv) || 0,
                mpCur: parseInt(threat.pm) || 0,
                mpMax: parseInt(threat.pm) || 0,
                notes: notesStr,
                conditions: [],
                stats: { def: defVal, res: resVal, cd: cdVal },
                open: false
            });

            // Se for o primeiro, define como vez dele
            if (!combatState.activeId) combatState.activeId = id;
            
            // Log do combate
            if (!Array.isArray(combatState.log)) combatState.log = [];
            combatState.log.push(`[Importado] + ${nomeFinal} (INI ${totalInit})`);
        }

        // Salva de volta
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(combatState));
            if (exibirToast) {
                mostrarToast(`⚔️ ${qty}x "${threat.nome}" enviados para o Gerenciador de Combate!`, "sucesso");
            }
            adicionarAoHistorico(`⚔️ Enviou ${qty}x ${threat.nome} ao combate (Iniciativa auto-rolada).`);
        } catch(e) {
            console.error("Falha ao salvar no localStorage do Combate", e);
            if (exibirToast) {
                mostrarToast("❌ Erro ao exportar para o combate.", "aviso");
            }
        }
    }

    // ===== FUNÇÃO PRINCIPAL DE ROLAGEM DOS ENCONTROS =====
    function rolarEncontros() {
        let randomPercentage = Math.floor(Math.random() * 100) + 1;

        // ROLAGEM ESPECIAL DE "O RHANDOMM"
        if (randomPercentage === 100) {
            const segundaRolagem = Math.floor(Math.random() * 100) + 1;
            if (segundaRolagem <= 25) {
                const resultadoEspecial = {
                    descricao: "O Rhandomm",
                    pag: "Ameaças, pag. 113",
                    imagem: "img/lenda.png"
                };
                exibirResultado(100, resultadoEspecial);
                mostrarToast("👹 Evento Lendário: O Rhandomm apareceu!", "aviso");
                return;
            }
        }

        const ajuste = getAjustePatamar();
        const rolagemFinal = randomPercentage + ajuste;
        const tipoTerreno = tipoTerrenoSelect.value;
        const resultado = encontrarResultado(tipoTerreno, rolagemFinal);

        exibirResultado(rolagemFinal, resultado);
    }

    // Evento para o botão "Gerar Desafio"
    rollAutomaticallyBtn.addEventListener("click", function (event) {
        event.preventDefault();
        rolarEncontros();
    });

    // ===== HISTÓRICO DE ATIVIDADES =====
    function adicionarAoHistorico(htmlContent) {
        if (!listaHistorico) return;

        // Limpa mensagem inicial se houver
        const empty = listaHistorico.querySelector(".history-empty");
        if (empty) {
            listaHistorico.innerHTML = "";
        }

        const li = document.createElement("li");
        const tempo = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        li.innerHTML = `<span>${htmlContent}</span> <small>(${tempo})</small>`;
        
        listaHistorico.prepend(li);

        // Mantém limite de 10 itens
        if (listaHistorico.children.length > 10) {
            listaHistorico.removeChild(listaHistorico.lastChild);
        }
    }
});
