/* =========================================================
   ESPÓLIO — LÓGICA DO ROLADOR (TORMENTA20)
   ========================================================= */

// ===================== GUIA "COMO FUNCIONA?" =====================
(function () {
    var toggle = document.getElementById('toggleGuide');
    var content = document.getElementById('guideContent');
    var icon = document.getElementById('guideIcon');
    toggle.addEventListener('click', function () {
        var open = content.style.display === 'none';
        content.style.display = open ? 'block' : 'none';
        icon.textContent = open ? '[Ocultar]' : '[Mostrar]';
        salvarConfigLocal();
    });
})();

// ===================== TOAST =====================
function showToast(message, type) {
    var container = document.getElementById('toastContainer');
    var toast = document.createElement('div');
    toast.className = 'toast' + (type ? ' ' + type : '');
    toast.textContent = message;
    container.appendChild(toast);

    requestAnimationFrame(function () { toast.classList.add('visible'); });
    setTimeout(function () {
        toast.classList.remove('visible');
        setTimeout(function () { toast.remove(); }, 400);
    }, 3500);
}

// ===================== SELEÇÃO SEGMENTADA (genérico) =====================
function refreshSegGroup(name) {
    document.querySelectorAll('.seg-btn input[name="' + name + '"]').forEach(function (input) {
        input.closest('.seg-btn').classList.toggle('active', input.checked);
    });
}
document.querySelectorAll('.seg-btn input').forEach(function (input) {
    input.addEventListener('change', function () {
        refreshSegGroup(input.name);
    });
});

// ===================== QUANTIDADE DE ROLAGENS =====================
(function () {
    var value = 1;
    var qtyValue = document.getElementById('qtyValue');
    var minus = document.getElementById('qtyMinus');
    var plus = document.getElementById('qtyPlus');

    function render() { qtyValue.textContent = value; }
    minus.addEventListener('click', function () { if (value > 1) { value--; render(); salvarConfigLocal(); } });
    plus.addEventListener('click', function () { if (value < 10) { value++; render(); salvarConfigLocal(); } });
    render();

    window.getQtyRolagens = function () { return value; };
    window.setQtyRolagens = function (v) { value = Math.max(1, Math.min(10, v)); render(); };
})();

// ===================== QTD "DINHEIRO ATRAI DINHEIRO" =====================
(function () {
    var value = 1;
    var qtyValue = document.getElementById('qtyDaaValue');
    var minus = document.getElementById('qtyDaaMinus');
    var plus = document.getElementById('qtyDaaPlus');

    function render() { qtyValue.textContent = value; }
    minus.addEventListener('click', function () { if (value > 1) { value--; render(); atualizarBonusTotal(); salvarConfigLocal(); } });
    plus.addEventListener('click', function () { if (value < 12) { value++; render(); atualizarBonusTotal(); salvarConfigLocal(); } });
    render();

    window.getQtyDinheiroAtrai = function () { return value; };
    window.setQtyDinheiroAtrai = function (v) { value = Math.max(1, Math.min(12, v)); render(); };
})();

// ===================== BÔNUS DE ROLAGEM =====================
var chkSala = document.getElementById('bonusSalaTesouro');
var chkDaa = document.getElementById('bonusDinheiroAtrai');
var rowDaaQty = document.getElementById('qtyDinheiroAtraiRow');

function calcularBonusTotal() {
    var total = 0;
    if (chkSala.checked) total += 5;
    if (chkDaa.checked) total += 5 * window.getQtyDinheiroAtrai();
    return total;
}

function atualizarBonusTotal() {
    var total = calcularBonusTotal();
    document.getElementById('bonusTotalDisplay').textContent = 'Bônus total na rolagem: +' + total + '%';
}

chkSala.addEventListener('change', atualizarBonusTotal);
chkDaa.addEventListener('change', function () {
    rowDaaQty.style.display = chkDaa.checked ? 'flex' : 'none';
    atualizarBonusTotal();
});
atualizarBonusTotal();

// ===================== ALTERNÂNCIA MISSÃO / BUSCA =====================
var blocoMissao = document.getElementById('blocoMissao');
var blocoBusca = document.getElementById('blocoBusca');
var btnRollLabel = document.getElementById('btnRollLabel');

function atualizarModo() {
    var modo = document.querySelector('input[name="modoRecompensa"]:checked').value;
    blocoMissao.style.display = modo === 'missao' ? 'grid' : 'none';
    blocoBusca.style.display = modo === 'busca' ? 'grid' : 'none';
    btnRollLabel.textContent = modo === 'missao' ? 'Abrir Baú' : 'Resolver Busca';
}
document.querySelectorAll('input[name="modoRecompensa"]').forEach(function (input) {
    input.addEventListener('change', atualizarModo);
});
atualizarModo();

// Adiciona um item ao histórico de rolagens (inserido no topo)
var HISTORY_STORAGE_KEY = 'arsenal_historico_v1';
var HISTORY_MAX_ITEMS = 50;

function salvarHistoricoLocal() {
    var history = document.getElementById('historicoTesouros');
    if (!history) return;
    var itens = [];
    var filhos = history.querySelectorAll('li');
    for (var i = 0; i < filhos.length; i++) {
        var li = filhos[i];
        if (li.className && li.className.indexOf('history-empty') >= 0) continue;
        if (li.outerHTML.length > 4000) continue;
        itens.push(li.outerHTML);
    }
    if (itens.length > HISTORY_MAX_ITEMS) itens = itens.slice(0, HISTORY_MAX_ITEMS);
    try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(itens));
    } catch (e) { }
}

function restaurarHistorico() {
    var history = document.getElementById('historicoTesouros');
    if (!history) return;
    var salvos = [];
    try {
        salvos = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY) || '[]');
    } catch (e) { salvos = []; }
    if (!salvos || !salvos.length) return;
    var empty = history.querySelector('.history-empty');
    salvos.forEach(function (html) {
        var li = document.createElement('li');
        li.innerHTML = html;
        history.appendChild(li);
    });
    if (empty) empty.remove();
    atualizarTotalSessao();
}

function adicionarAoHistorico(conteudoHtml, rolagensHtml, totalT$) {
    var history = document.getElementById('historicoTesouros');
    var empty = history.querySelector('.history-empty');
    if (empty) empty.remove();
    var li = document.createElement('li');
    if (totalT$ > 0) li.setAttribute('data-total', Math.round(totalT$));
    var now = new Date();
    var time = ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2);
    var rodape = time + (totalT$ > 0 ? ' · 🪙 ' + fmtTibares(totalT$) : '');
    li.innerHTML =
        '<div class="history-body">' +
        '  <span>' + conteudoHtml + '</span>' + (rolagensHtml || '') +
        '</div>' +
        '<small>' + rodape + '</small>';
    history.insertBefore(li, history.firstChild);
    salvarHistoricoLocal();
    atualizarTotalSessao();
}

function atualizarTotalSessao() {
    var elTotal = document.getElementById('historyTotal');
    var history = document.getElementById('historicoTesouros');
    if (!elTotal || !history) return;
    var soma = 0;
    var lis = history.querySelectorAll('li[data-total]');
    for (var i = 0; i < lis.length; i++) {
        soma += parseInt(lis[i].getAttribute('data-total'), 10) || 0;
    }
    elTotal.textContent = soma > 0 ? '🪙 ' + fmtTibares(soma) + ' na sessão' : '';
}

// ===================== PERSISTÊNCIA LOCAL =====================
var CONFIG_STORAGE_KEY = 'arsenal_espolio_config_v1';
var ULTIMO_BAU_STORAGE_KEY = 'arsenal_espolio_ultimo_bau_v1';

function salvarConfigLocal() {
    var cfg = {
        modo: document.querySelector('input[name="modoRecompensa"]:checked').value,
        nd: document.getElementById('ndEspecifico').value,
        multiplicador: document.getElementById('multiplicadorTesouro').value,
        usarMesa: document.getElementById('usarMesa').checked,
        mesaGrupos: mesaGrupos,
        qtdRolagens: window.getQtyRolagens(),
        separar: document.getElementById('separarPorCriatura').checked,
        nivelBusca: document.getElementById('nivelBusca').value,
        sucessosBusca: document.querySelector('input[name="sucessosBusca"]:checked').value,
        bonusSala: document.getElementById('bonusSalaTesouro').checked,
        bonusDaa: document.getElementById('bonusDinheiroAtrai').checked,
        qtyDaa: window.getQtyDinheiroAtrai(),
        guiaAberto: document.getElementById('guideContent').style.display === 'block'
    };
    try { localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(cfg)); } catch (e) { }
}

function restaurarConfigLocal() {
    var cfg = null;
    try { cfg = JSON.parse(localStorage.getItem(CONFIG_STORAGE_KEY) || 'null'); } catch (e) { cfg = null; }
    if (!cfg) return;

    var modoInput = document.querySelector('input[name="modoRecompensa"][value="' + cfg.modo + '"]');
    if (modoInput) modoInput.checked = true;
    refreshSegGroup('modoRecompensa');

    var ndEl = document.getElementById('ndEspecifico');
    if (cfg.nd && ndEl) ndEl.value = cfg.nd;

    var multEl = document.getElementById('multiplicadorTesouro');
    if (cfg.multiplicador && multEl) multEl.value = cfg.multiplicador;

    var usarMesaEl = document.getElementById('usarMesa');
    if (usarMesaEl) usarMesaEl.checked = !!cfg.usarMesa;
    var mesaBuilderEl = document.getElementById('mesaBuilder');
    if (mesaBuilderEl) mesaBuilderEl.style.display = usarMesaEl && usarMesaEl.checked ? 'block' : 'none';

    if (Array.isArray(cfg.mesaGrupos)) mesaGrupos = cfg.mesaGrupos;

    if (cfg.qtdRolagens) window.setQtyRolagens(cfg.qtdRolagens);

    var separarEl = document.getElementById('separarPorCriatura');
    if (separarEl) separarEl.checked = !!cfg.separar;

    var nivelEl = document.getElementById('nivelBusca');
    if (cfg.nivelBusca && nivelEl) nivelEl.value = cfg.nivelBusca;

    var sucInput = document.querySelector('input[name="sucessosBusca"][value="' + cfg.sucessosBusca + '"]');
    if (sucInput) sucInput.checked = true;
    refreshSegGroup('sucessosBusca');

    var salaEl = document.getElementById('bonusSalaTesouro');
    if (salaEl) salaEl.checked = !!cfg.bonusSala;

    var daaEl = document.getElementById('bonusDinheiroAtrai');
    if (daaEl) daaEl.checked = !!cfg.bonusDaa;
    var rowDaaEl = document.getElementById('qtyDinheiroAtraiRow');
    if (rowDaaEl) rowDaaEl.style.display = daaEl && daaEl.checked ? 'flex' : 'none';

    if (cfg.qtyDaa) window.setQtyDinheiroAtrai(cfg.qtyDaa);

    if (cfg.guiaAberto) {
        var guideContent = document.getElementById('guideContent');
        var guideIcon = document.getElementById('guideIcon');
        if (guideContent) guideContent.style.display = 'block';
        if (guideIcon) guideIcon.textContent = '[Ocultar]';
    }

    atualizarModo();
    atualizarReferenciaND();
    atualizarLabelNDAtual();
    renderizarChipsMesa();
    atualizarHintMesa();
    atualizarBonusTotal();
}

function salvarUltimoBauLocal() {
    var panel = document.getElementById('resultPanel');
    if (!panel || panel.style.display === 'none' || !panel.innerHTML) return;
    var data = {
        html: panel.innerHTML,
        ultimoResultado: _ultimoResultado,
        ultimaRodada: _ultimaRodada
    };
    try { localStorage.setItem(ULTIMO_BAU_STORAGE_KEY, JSON.stringify(data)); } catch (e) { }
}

function restaurarUltimoBauLocal() {
    var data = null;
    try { data = JSON.parse(localStorage.getItem(ULTIMO_BAU_STORAGE_KEY) || 'null'); } catch (e) { data = null; }
    if (!data || !data.html) return;
    var panel = document.getElementById('resultPanel');
    if (!panel) return;
    panel.innerHTML = data.html;
    panel.style.display = 'block';
    _ultimoResultado = data.ultimoResultado || null;
    _ultimaRodada = data.ultimaRodada || null;
    _ultimaRodadaItensEls = [];
    var itens = panel.querySelectorAll('#treasureList .treasure-item');
    for (var i = 0; i < itens.length; i++) _ultimaRodadaItensEls.push(itens[i]);
    var btnCopiar = document.getElementById('btnCopyResult');
    var btnReroll = document.getElementById('btnReroll');
    var btnRerollCoins = document.getElementById('btnRerollCoins');
    var btnRerollItems = document.getElementById('btnRerollItems');
    if (btnCopiar) btnCopiar.style.display = _ultimoResultado ? '' : 'none';
    if (btnReroll) btnReroll.style.display = _ultimaRodada ? '' : 'none';
    if (btnRerollCoins) btnRerollCoins.style.display = _ultimaRodada ? '' : 'none';
    if (btnRerollItems) btnRerollItems.style.display = _ultimaRodada ? '' : 'none';
    atualizarLegendaAsteriscos();
}

// Sortear 3ª perícia de uma busca (Tabela 6-6), auxílio ao mestre
var btnSortearPericia = document.getElementById('btnSortearPericia');
if (btnSortearPericia) {
    btnSortearPericia.addEventListener('click', function () {
        var rolagem = (1 + Math.floor(Math.random() * 12)) + (1 + Math.floor(Math.random() * 12));
        var desafio = BUSCA_DESAFIOS[rolagem];
        showToast('🎲 2d12 = ' + rolagem + ' → ' + desafio.pericia + ' (' + desafio.exemplo + ')', 'toast-sucesso');
        adicionarAoHistorico('<strong>3ª Perícia (Busca)</strong> — ' + desafio.pericia, '🎲 2d12 = ' + rolagem);
    });
}

// ===================== DADOS E PARSER DE RESULTADOS =====================

// Registro dos valores rolados na rodada atual (usado no histórico)
var _registroRolagens = [];
var _capturandoRolagens = false;
// Último resultado gerado (para o botão "Copiar resultado")
var _ultimoResultado = null;
// Estado da última rolagem (para "Só moedas": mantém itens e refaz o Dinheiro)
var _ultimaRodada = null;
var _ultimaRodadaItensEls = [];

function registrarRolagem(rotulo, valor, ajustado) {
    if (!_capturandoRolagens || valor == null) return;
    var texto = rotulo + ' = ' + valor;
    if (ajustado != null && ajustado !== valor) texto += '→' + ajustado;
    _registroRolagens.push(texto);
}

function parseDado(expr) {
    var m = expr.match(/^(\d+)d(\d+)(?:\+(\d+))?$/);
    if (!m) return null;
    return { n: parseInt(m[1], 10), lados: parseInt(m[2], 10), bonus: m[3] ? parseInt(m[3], 10) : 0 };
}

function rolarDado(spec, rotulo) {
    var total = spec.bonus;
    for (var i = 0; i < spec.n; i++) total += 1 + Math.floor(Math.random() * spec.lados);
    registrarRolagem(rotulo || (spec.n + 'd' + spec.lados + (spec.bonus ? '+' + spec.bonus : '')), total);
    return total;
}

function tentarDinheiro(texto) {
    var m = texto.match(/^(\d+d\d+(?:\+\d+)?)x([\d.]+)\s*(TC|T\$|TO|PP|PC)$/);
    if (!m) return null;
    var dado = parseDado(m[1]);
    var mult = parseInt(m[2].replace(/\./g, ''), 10);
    return { valor: rolarDado(dado, m[1] + ' (dinheiro)') * mult, moeda: m[3] };
}

// Conversão para T$ (cotação oficial: 1 TC = 0,1 T$; 1 TO = 10 T$)
var CONVERSAO_TIBAR = { TC: 0.1, 'T$': 1, TO: 10, PP: 100, PC: 0.01 };

function moedaParaT$(moeda, valor) {
    return (CONVERSAO_TIBAR[moeda] != null ? CONVERSAO_TIBAR[moeda] : 1) * valor;
}

function extrairValorT$(texto) {
    if (!texto) return 0;
    var m = texto.match(/\(\s*([\d.]+)\s*T\$/);
    if (m) return parseInt(m[1].replace(/\./g, ''), 10);
    m = texto.match(/\(T\$\s*([\d.]+)\)/);
    if (m) return parseInt(m[1].replace(/\./g, ''), 10);
    return 0;
}

function totalT$NoTexto(texto) {
    if (!texto) return 0;
    var soma = 0, m, re = /T\$\s*([\d.]+)/g;
    while ((m = re.exec(texto)) !== null) soma += parseInt(m[1].replace(/\./g, ''), 10);
    re = /\(\s*([\d.]+)\s*T\$/g;
    while ((m = re.exec(texto)) !== null) soma += parseInt(m[1].replace(/\./g, ''), 10);
    return soma;
}

function decomporSubRolado(texto) {
    var nome = (texto || '').trim();
    var detalhe = '';
    if (!nome) return { nome: nome, detalhe: detalhe };
    var i = nome.indexOf('— Ex.:');
    if (i < 0) i = nome.indexOf('– Ex.:');
    if (i < 0) i = nome.indexOf('- Ex.:');
    if (i >= 0) {
        detalhe = nome.slice(i).replace(/^[—–-]\s*/, '').trim();
        nome = nome.slice(0, i).trim();
    } else {
        var m = nome.match(/^(.*?)[—–]\s*T\$\s*[\d.]+$/);
        if (m) nome = m[1].trim();
    }
    return { nome: nome, detalhe: detalhe };
}

function tentarContagem(texto) {
    var m = texto.match(/^(\d+d\d+(?:\+\d+)?)\s+(.+)$/);
    if (m) {
        var dado = parseDado(m[1]);
        return { quantidade: rolarDado(dado, m[1] + ' (qtd)'), rotulo: m[2] };
    }
    m = texto.match(/^(\d+)\s+(.+)$/);
    if (m) return { quantidade: parseInt(m[1], 10), rotulo: m[2] };
    return null;
}

function resolverEntrada(textoOriginal) {
    if (!textoOriginal || textoOriginal === '—') return { tipo: 'vazio', bonusFlag: false, twoDFlag: false };
    var texto = textoOriginal.trim();
    var bonusFlag = false, twoDFlag = false;

    if (/\+%$/.test(texto)) { bonusFlag = true; texto = texto.replace(/\s*\+%$/, '').trim(); }
    if (/\s2D$/.test(texto)) { twoDFlag = true; texto = texto.replace(/\s2D$/, '').trim(); }

    var dinheiro = tentarDinheiro(texto);
    if (dinheiro) {
        return { tipo: 'dinheiro', valor: dinheiro.valor, moeda: dinheiro.moeda, bonusFlag: bonusFlag, twoDFlag: twoDFlag };
    }

    var contagem = tentarContagem(texto);
    if (contagem) {
        return { tipo: 'contagem', quantidade: contagem.quantidade, rotulo: contagem.rotulo, bonusFlag: bonusFlag, twoDFlag: twoDFlag };
    }

    return { tipo: 'rotulo', rotulo: texto, bonusFlag: bonusFlag, twoDFlag: twoDFlag };
}

// ===================== RESOLUÇÃO DE SUB-TABELAS =====================
function obterPickUnidadeSub(entrada) {
    var rotulo = (entrada.rotulo || '').toLowerCase();
    var bonus = entrada.bonusFlag ? 20 : 0;

    if (rotulo.indexOf('riqueza') >= 0) {
        var tipo = rotulo.indexOf('maior') >= 0 ? 'maior' :
            (rotulo.indexOf('média') >= 0 || rotulo.indexOf('media') >= 0) ? 'media' : 'menor';
        var fR = tipo === 'maior' ? getRiquezaMaior : tipo === 'media' ? getRiquezaMedia : getRiquezaMenor;
        return function () { return fR(bonus); };
    } else if (rotulo.indexOf('poç') >= 0 || rotulo.indexOf('poc') >= 0) {
        return function () { return getPocao(bonus); };
    } else if (rotulo.indexOf('item diverso') >= 0) {
        return function () { return getDiverso(); };
    } else if (rotulo.indexOf('equipamento') >= 0) {
        return getEquipamento;
    } else if (rotulo.indexOf('superior') >= 0) {
        var m = rotulo.match(/\((\d)\s*melhoria/);
        var n = m ? parseInt(m[1], 10) : 1;
        var fS = [getMelhoria, getMelhoria2, getMelhoria3, getMelhoria4][n - 1];
        return function () { return fS(); };
    } else if (rotulo.indexOf('mágico') >= 0 || rotulo.indexOf('magico') >= 0) {
        var m2 = rotulo.match(/\((\w+)\)/);
        var tg = m2 ? m2[1].toLowerCase() : 'menor';
        var fM = tg.indexOf('maior') >= 0 ? getMagicoMaior :
            tg.indexOf('menor') >= 0 ? getMagicoMenor : getMagicoMedio;
        return function () { return fM(); };
    }
    return null;
}

function resolverUnidadeSub(entrada) {
    var pick = obterPickUnidadeSub(entrada);
    if (!pick) return null;
    return pick();
}

function rolar2d6() {
    var total = (1 + Math.floor(Math.random() * 6)) + (1 + Math.floor(Math.random() * 6));
    registrarRolagem('2d6 (2D — escolha)', total);
    return total;
}

function criarCardEscolha2D(emoji, dado, opcao1, opcao2) {
    var el = document.createElement('div');
    el.className = 'treasure-item treasure-item-2d';
    el.innerHTML =
        '<div class="treasure-item-emoji">' + emoji + '</div>' +
        '<div class="treasure-item-body">' +
        '  <div class="treasure-item-top">' +
        '    <span class="treasure-item-name">Escolha um dos resultados</span>' +
        '    <span class="rarity-badge badge-2d">🎲 2D · ' + dado + '</span>' +
        '  </div>' +
        '  <div class="treasure-2d-options">' +
        '    <div class="treasure-2d-option">① ' + opcao1 + '</div>' +
        '    <div class="treasure-2d-option">② ' + opcao2 + '</div>' +
        '  </div>' +
        '</div>';
    return el;
}

function temUnidadeSub(entrada) {
    var rotulo = (entrada.rotulo || '').toLowerCase();
    return rotulo.indexOf('riqueza') >= 0 ||
        rotulo.indexOf('poç') >= 0 || rotulo.indexOf('poc') >= 0 ||
        rotulo.indexOf('item diverso') >= 0 ||
        rotulo.indexOf('equipamento') >= 0 ||
        rotulo.indexOf('superior') >= 0 ||
        rotulo.indexOf('mágico') >= 0 || rotulo.indexOf('magico') >= 0;
}

// ===================== REFERÊNCIA DE LIVRO (data_itens.js) =====================
function _coletarLinhas(fonte) {
    var out = [];
    (function anda(o) {
        if (Array.isArray(o)) { o.forEach(anda); return; }
        if (!o || typeof o !== 'object') return;
        if (o.linhas) { o.linhas.forEach(anda); return; }
        if (o.n) { out.push(o); return; }
        Object.keys(o).forEach(function (chave) { anda(o[chave]); });
    })(fonte);
    return out;
}

function _normalizarNome(s) {
    return (s || '').toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, ' ').trim();
}

function _tiraParenteses(s) {
    return (s || '').replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim();
}

function _construirMapa(linhas) {
    var full = {}, simples = {};
    linhas.forEach(function (item) {
        var k = _normalizarNome(item.n);
        var k2 = _normalizarNome(_tiraParenteses(item.n));
        var ref = { v: item.v, l: item.l, p: item.p };
        if (!full[k]) full[k] = ref;
        if (!simples[k2]) simples[k2] = ref;
    });
    return { full: full, simples: simples };
}

var REF_MAPAS = {};
function _referenciaDisponivel() {
    if (typeof ITENS_DIVERSOS === 'undefined') return false;
    if (!REF_MAPAS.diverso) {
        REF_MAPAS.diverso = _construirMapa(_coletarLinhas(ITENS_DIVERSOS));
        REF_MAPAS.pocoes = _construirMapa(_coletarLinhas(POCOES));
        REF_MAPAS.equip = _construirMapa(_coletarLinhas(EQUIPAMENTOS));
        REF_MAPAS.superiores = _construirMapa(_coletarLinhas(SUPERIORES));
        REF_MAPAS.encantos = _construirMapa(_coletarLinhas(MAGICOS_ENCANTOS));
        REF_MAPAS.acessorios = _construirMapa(_coletarLinhas(MAGICOS_ACESSORIOS));
        if (typeof MAGICOS_ESPECIFICOS !== 'undefined') {
            REF_MAPAS.especificos = _construirMapa(_coletarLinhas(MAGICOS_ESPECIFICOS));
        }
    }
    return true;
}

function _mapaParaRotulo(rotulo) {
    var r = (rotulo || '').toLowerCase();
    if (r.indexOf('diverso') >= 0) return REF_MAPAS.diverso;
    if (r.indexOf('poç') >= 0 || r.indexOf('poc') >= 0) return REF_MAPAS.pocoes;
    if (r.indexOf('equipamento') >= 0) return REF_MAPAS.equip;
    if (r.indexOf('superior') >= 0) return REF_MAPAS.superiores;
    if (r.indexOf('mágico') >= 0 || r.indexOf('magico') >= 0) return REF_MAPAS.encantos;
    return null;
}

function _limparBase(nome) {
    var s = (nome || '').trim();
    s = s.replace(/\s*—\s*T\$\s*[\d.]+/i, '').trim();
    s = s.replace(/^poção de\s+/i, '').trim();
    return s;
}

function _buscarReferencia(mapa, base) {
    if (!mapa || !base) return null;
    var limp = _limparBase(base);
    var b = _normalizarNome(limp);
    if (!b) return null;
    if (mapa.full[b]) return mapa.full[b];
    var b2 = _normalizarNome(_tiraParenteses(limp));
    if (b2 && b2 !== b && mapa.simples[b2]) return mapa.simples[b2];
    var keys = Object.keys(mapa.full);
    var i;
    for (i = 0; i < keys.length; i++) {
        var k = keys[i];
        if (!k) continue;
        if (b.indexOf(k) >= 0 || k.indexOf(b) >= 0) return mapa.full[k];
    }
    for (i = 0; i < keys.length; i++) {
        var kk = keys[i];
        if (!kk || !b2) continue;
        if (b2.indexOf(kk) >= 0 || kk.indexOf(b2) >= 0) return mapa.full[kk];
    }
    return null;
}

function sufixoReferencia(rotulo, nome) {
    if (!_referenciaDisponivel()) return '';
    var mapa = _mapaParaRotulo(rotulo);
    if (!mapa) return '';
    // Limpa prefixo de troféu (itens específicos)
    var nomeLimpo = (nome || '').replace(/^🏆\s*/, '').trim();
    var ref = _buscarReferencia(mapa, nomeLimpo);
    if (!ref) {
        var nomeBase = nomeLimpo.replace(/\s*\[.*\]\s*$/, '').trim();
        if (nomeBase && nomeBase !== nomeLimpo) {
            ref = _buscarReferencia(REF_MAPAS.equip, nomeBase);
        }
    }
    // Fallback: buscar em itens específicos (armas/armaduras/esotéricos nomeados)
    if (!ref && REF_MAPAS.especificos) {
        ref = _buscarReferencia(REF_MAPAS.especificos, nomeLimpo);
    }
    if (!ref || !ref.l) return '';
    var texto = ' 📖 ' + ref.l;
    if (ref.p) texto += ', p. ' + ref.p;
    if (ref.v) texto += ' — ' + ref.v.toLocaleString('pt-BR') + ' T$';
    return texto;
}

function renderizarItensResolvidos(lista, contexto, cor, acc) {
    var els = [];
    lista.forEach(function (item) {
        if (item.tipo === 'dinheiro') return;
        if (item.tipo === 'vazio') {
            var elVazio = criarItemEl('🫥', 'Sem recompensa', null, 1, 'A rolagem não trouxe nada de valor desta vez.', 'var(--text-muted)');
            elVazio.classList.add('treasure-item-empty');
            els.push(elVazio);
            return;
        }
        var qtdMax = Math.min(item.quantidade || 1, 12);
        if (temUnidadeSub(item)) {
            var pickSub = obterPickUnidadeSub(item);
            if (item.twoDFlag && pickSub) {
                for (var k = 0; k < qtdMax; k++) {
                    els.push(criarCardEscolha2D(
                        emojiParaRotulo(item.rotulo || ''),
                        rolar2d6(),
                        pickSub(),
                        pickSub()
                    ));
                }
            } else {
                for (var k = 0; k < qtdMax; k++) {
                    var subRolado = resolverUnidadeSub(item);
                    var valorT$ = totalT$NoTexto(subRolado);
                    var isRiqueza = !!(item.rotulo && item.rotulo.toLowerCase().indexOf('riqueza') >= 0);
                    if (acc) {
                        if (isRiqueza) {
                            acc.riquezas += valorT$;
                        } else {
                            acc.itensValor = (acc.itensValor || 0) + valorT$;
                        }
                    }
var decomp = decomporSubRolado(subRolado);
var badges = [];
var sufEspacos = '';
if (isRiqueza) {
    var rEsp = rolarEspacosRiqueza();
    badges.push('📦 ' + fmtEspacos(rEsp.espacos));
    if (rEsp.desc) sufEspacos = ' — ' + rEsp.desc;
}
if (!isRiqueza && valorT$ > 0) badges.push('🪙 ' + valorT$.toLocaleString('pt-BR') + ' T$');
if (item.bonusFlag) badges.push('+20% no tipo');
els.push(criarItemEl(
    emojiParaRotulo(item.rotulo || ''),
    decomp.nome,
    badges.length ? badges.join(' · ') : null,
    1,
    contexto + (decomp.detalhe ? ' ' + decomp.detalhe : '') + sufEspacos + sufixoReferencia(item.rotulo, subRolado),
    cor
));
                }
            }
        } else if (item.tipo === 'contagem') {
            els.push(criarItemEl(emojiParaRotulo(item.rotulo), capitalizar(item.rotulo), item.bonusFlag ? '+20% no tipo' : (item.twoDFlag ? '2D' : null), item.quantidade, contexto, cor));
        } else if (item.tipo === 'rotulo') {
            els.push(criarItemEl(emojiParaRotulo(item.rotulo), item.rotulo, item.twoDFlag ? '2D' : null, 1, contexto, cor));
        }
    });
    return els;
}

function escolherNaTabela(linhas, rolagem) {
    for (var i = 0; i < linhas.length; i++) {
        var partes = linhas[i][0].split('-');
        var min = parseInt(partes[0], 10), max = parseInt(partes[1], 10);
        if (rolagem >= min && rolagem <= max) return linhas[i][1];
    }
    return null;
}

function contarItensReais(els) {
    var contagem = 0;
    els.forEach(function (el) {
        var cls = el.className || '';
        if (cls.indexOf('treasure-item') >= 0 && cls.indexOf('treasure-item-empty') < 0) contagem++;
    });
    return contagem;
}

function criarTituloGrupoCriatura(indice, listaDinheiro, ndChave) {
    var moedas = [];
    listaDinheiro.forEach(function (item) {
        if (item.tipo === 'dinheiro') moedas.push(item.valor + ' ' + item.moeda);
    });
    var el = document.createElement('div');
    el.className = 'creature-group-title';
    el.innerHTML = '⚔️ <strong>Criatura ' + (indice + 1) + (ndChave ? ' · ND ' + ndChave : '') + '</strong>' +
        (moedas.length ? '<span class="creature-group-coins">🪙 ' + moedas.join(' · ') + '</span>' : '');
    return el;
}

function rolarD100ComBonus(bonusPct, rotulo) {
    var bruto = 1 + Math.floor(Math.random() * 100);
    var ajustado = Math.min(100, bruto + bonusPct);
    registrarRolagem(rotulo || 'd100', bruto, ajustado);
    return { bruto: bruto, ajustado: ajustado };
}

function obterLinhaND(ndChave) {
    for (var i = 0; i < TESOURO_ND.length; i++) if (TESOURO_ND[i].nd === ndChave) return TESOURO_ND[i];
    return null;
}

function fmtTibares(v) {
    return Math.round(v).toLocaleString('pt-BR') + ' T$';
}

function calcularRiquezaReferencia(tipo) {
    if (typeof RIQUEZAS === 'undefined' || !RIQUEZAS) return null;
    var peso = 0, soma = 0, menor = Infinity, maior = 0;
    RIQUEZAS.forEach(function (item) {
        var arr = item[tipo];
        if (!arr) return;
        var m = String(item.valor || '').match(/\(\s*([\d.]+)\s*\)/);
        if (!m) return;
        var v = parseInt(m[1].replace(/\./g, ''), 10);
        var w = (arr[1] - arr[0]) + 1;
        peso += w; soma += w * v;
        if (v < menor) menor = v;
        if (v > maior) maior = v;
    });
    if (!peso) return null;
    return { min: menor, max: maior, avg: soma / peso };
}

function parseReferenciaRiqueza(exprText) {
    var t = (exprText || '').replace(/\+%/g, '').trim();
    var m = t.match(/^(\d+)(?:d(\d+)(?:\+(\d+))?)?\s*riquezas?\s*(menor|média|media|maior)/);
    if (!m) return { min: 0, max: 0, avg: 0 };
    var tipo = m[4] === 'média' ? 'media' : m[4];
    var qMin, qMax, qAvg;
    if (m[2]) {
        var n = +m[1], s = +m[2], b = m[3] ? +m[3] : 0;
        qMin = n + b; qMax = n * s + b; qAvg = n * (s + 1) / 2 + b;
    } else {
        qMin = qMax = qAvg = +m[1];
    }
    var r = calcularRiquezaReferencia(tipo);
    if (!r) return { min: 0, max: 0, avg: 0 };
    return { min: qMin * r.min, max: qMax * r.max, avg: qAvg * r.avg };
}

function parseReferenciaDinheiro(exprText) {
    var t = (exprText || '').trim();
    if (!t || t === '—') return { min: 0, max: 0, avg: 0 };
    if (t.indexOf('riqueza') >= 0) return parseReferenciaRiqueza(t);
    var m = t.match(/^(\d+)d(\d+)(?:\+(\d+))?x([\d.]+)\s*(TC|T\$|TO|PP|PC)$/);
    if (!m) return { min: 0, max: 0, avg: 0 };
    var n = +m[1], d = +m[2], b = m[3] ? +m[3] : 0, x = parseFloat(m[4].replace(/\./g, ''));
    var fator = CONVERSAO_TIBAR[m[5]] || 0;
    return {
        min: (n + b) * x * fator,
        max: (n * d + b) * x * fator,
        avg: (n * (d + 1) / 2 + b) * x * fator
    };
}

function faixaReferenciaND(ndChave, multiplicador) {
    var linha = obterLinhaND(ndChave);
    if (!linha) return null;
    var sMin = 0, sMax = 0, sAvg = 0;
    linha.dinheiro.forEach(function (l) {
        var partes = l[0].split('-');
        var w = (parseInt(partes[1], 10) - parseInt(partes[0], 10) + 1) / 100;
        var r = parseReferenciaDinheiro(l[1]);
        var f = 1;
        if (multiplicador === 'metade' && (l[1] || '').indexOf('riqueza') < 0) f = 0.5;
        sMin += w * r.min * f;
        sMax += w * r.max * f;
        sAvg += w * r.avg * f;
    });
    if (multiplicador === 'dobro') { sMin *= 2; sMax *= 2; sAvg *= 2; }
    return { min: sMin, max: sMax, avg: sAvg };
}

function atualizarReferenciaND() {
    var el = document.getElementById('ndRefDisplay');
    if (!el) return;
    var ndChave = document.getElementById('ndEspecifico').value;
    var multiplicador = document.getElementById('multiplicadorTesouro').value;
    if (multiplicador === 'nenhum') {
        el.innerHTML = '<span class="nd-ref-note">Criatura escolhida não traz tesouro.</span>';
        return;
    }
    var r = faixaReferenciaND(ndChave, multiplicador);
    if (!r) { el.innerHTML = ''; return; }
    el.innerHTML = '<span class="nd-ref-note">Referência (ND ' + ndChave + '): </span>'
        + 'média ~' + fmtTibares(r.avg)
        + '<span class="nd-ref-range"> · faixa ~' + fmtTibares(r.min) + ' a ' + fmtTibares(r.max) + '</span>'
        + '<span class="nd-ref-note"> (apenas moedas/riquezas)</span>';
}

// ===================== ROLAGEM: COMPOSIÇÃO DE MESA =====================
var mesaGrupos = [];

function composicaoMesaValida(grupos) {
    if (!grupos) return false;
    for (var i = 0; i < grupos.length; i++) {
        if (!obterLinhaND(grupos[i].nd)) return false;
    }
    return true;
}

function descreverMesa(grupos) {
    return grupos.map(function (g) { return 'ND ' + g.nd + ' ×' + g.qtd; }).join(' + ');
}

function expandirMesa(grupos) {
    var plano = [];
    grupos.forEach(function (g) {
        for (var i = 0; i < g.qtd; i++) plano.push(g.nd);
    });
    return plano;
}

function obterQtdMesa() {
    var input = document.getElementById('mesaQty');
    var v = parseInt(input.value, 10);
    if (isNaN(v)) return 1;
    return Math.min(99, Math.max(1, v));
}

function setQtdMesa(valor) {
    document.getElementById('mesaQty').value = Math.min(99, Math.max(1, valor));
}

function mudarQtdMesa(delta) {
    setQtdMesa(obterQtdMesa() + delta);
}

function atualizarLabelNDAtual() {
    var el = document.getElementById('mesaNdAtual');
    if (!el) return;
    el.textContent = 'ND ' + document.getElementById('ndEspecifico').value;
}

function renderizarChipsMesa() {
    var wrapper = document.getElementById('mesaChips');
    var addBtn = document.getElementById('mesaAddBtn');
    var limparBtn = document.getElementById('mesaLimparBtn');
    if (!wrapper) return;
    wrapper.innerHTML = '';
    mesaGrupos.forEach(function (g, i) {
        var chip = document.createElement('span');
        chip.className = 'mesa-chip';

        var val = document.createElement('span');
        val.className = 'mesa-chip-val';
        val.textContent = 'ND ' + g.nd + ' ×' + g.qtd;

        var x = document.createElement('button');
        x.className = 'mesa-chip-x';
        x.type = 'button';
        x.innerHTML = '✕';
        x.title = 'Remover';
        x.setAttribute('aria-label', 'Remover ND ' + g.nd + ' ×' + g.qtd);
        x.addEventListener('click', function () { removerGrupoMesa(i); });

        chip.appendChild(val);
        chip.appendChild(x);
        wrapper.appendChild(chip);
    });
    if (addBtn) addBtn.textContent = mesaGrupos.length ? 'Adicionar outro' : '+ Adicionar';
    if (limparBtn) limparBtn.style.display = mesaGrupos.length ? 'inline' : 'none';
    atualizarHintMesa();
}

function adicionarGrupoMesa() {
    var nd = document.getElementById('ndEspecifico').value;
    var qtd = obterQtdMesa();
    if (!obterLinhaND(nd)) {
        showToast('ND inválido para composição.', 'toast-aviso');
        return;
    }
    mesaGrupos.push({ nd: nd, qtd: qtd });
    renderizarChipsMesa();
    salvarConfigLocal();
    showToast('Adicionado ND ' + nd + ' ×' + qtd, 'toast-sucesso');
}

function removerGrupoMesa(indice) {
    mesaGrupos.splice(indice, 1);
    renderizarChipsMesa();
    salvarConfigLocal();
}

function limparMesa() {
    mesaGrupos = [];
    renderizarChipsMesa();
    salvarConfigLocal();
}

function atualizarHintMesa() {
    var chk = document.getElementById('usarMesa');
    var hint = document.getElementById('mesaHint');
    if (!chk || !hint) return;
    if (chk.checked && mesaGrupos.length && composicaoMesaValida(mesaGrupos)) {
        var total = mesaGrupos.reduce(function (a, g) { return a + g.qtd; }, 0);
        hint.textContent = '✅ ' + descreverMesa(mesaGrupos) + ' → ' + total + ' criatura(s)';
        hint.style.color = 'var(--ouro)';
    } else if (chk.checked) {
        hint.textContent = mesaGrupos.length
            ? '⚠️ Algum ND da composição ficou fora do padrão (1/4 a 20).'
            : 'Selecione o ND acima e clique em "Adicionar" para montar a mesa.';
        hint.style.color = 'var(--rubi)';
    } else {
        hint.textContent = '';
    }
}

// ===================== ROLAGEM: RECOMPENSA DE MISSÃO =====================
function rolarMissao(ndChave, multiplicador, bonusPct) {
    var resultado = { dinheiro: [], itens: [] };
    var linha = obterLinhaND(ndChave);
    if (!linha || multiplicador === 'nenhum') return resultado;

    var vezes = multiplicador === 'dobro' ? 2 : 1;
    for (var v = 0; v < vezes; v++) {
        var rd = rolarD100ComBonus(bonusPct, 'd100 (Dinheiro)');
        var resD = resolverEntrada(escolherNaTabela(linha.dinheiro, rd.ajustado));
        if (resD) {
            if (multiplicador === 'metade' && resD.tipo === 'dinheiro') resD.valor = Math.floor(resD.valor / 2);
            resultado.dinheiro.push(resD);
        }
        var ri = rolarD100ComBonus(bonusPct, 'd100 (Itens)');
        var resI = resolverEntrada(escolherNaTabela(linha.itens, ri.ajustado));
        if (resI) resultado.itens.push(resI);
    }
    return resultado;
}

// ===================== ROLAGEM: RECOMPENSA DE BUSCA =====================
function rolarBusca(nivelChave, sucessos, bonusPct) {
    var conseq = BUSCA_CONSEQUENCIAS[sucessos];
    var efeitos = [];
    var tesouro = { dinheiro: [], itens: [] };

    for (var c = 0; c < conseq.castigos; c++) {
        var d6c = 1 + Math.floor(Math.random() * 6);
        registrarRolagem('1d6 (castigo)', d6c);
        var castigo = BUSCA_TABELA_1D6[d6c - 1].castigo;
        efeitos.push({ tipo: 'castigo', nome: castigo.nome, desc: castigo.desc });
    }

    for (var r = 0; r < conseq.recompensas; r++) {
        var d6r = 1 + Math.floor(Math.random() * 6);
        registrarRolagem('1d6 (recompensa)', d6r);
        var recompensa = BUSCA_TABELA_1D6[d6r - 1].recompensa;
        efeitos.push({ tipo: 'recompensa', nome: recompensa.nome, desc: recompensa.desc });

        if (recompensa.tesouro) {
            var linha = obterLinhaND(nivelChave);
            if (linha) {
                if (recompensa.tesouro === 'riqueza' || recompensa.tesouro === 'ambos') {
                    var rd = rolarD100ComBonus(bonusPct, 'd100 (Dinheiro)');
                    var resD = resolverEntrada(escolherNaTabela(linha.dinheiro, rd.ajustado));
                    if (resD) tesouro.dinheiro.push(resD);
                }
                if (recompensa.tesouro === 'item' || recompensa.tesouro === 'ambos') {
                    var ri = rolarD100ComBonus(bonusPct, 'd100 (Itens)');
                    var resI = resolverEntrada(escolherNaTabela(linha.itens, ri.ajustado));
                    if (resI) tesouro.itens.push(resI);
                }
            }
        }
    }
    return { efeitos: efeitos, tesouro: tesouro, consequencia: conseq };
}

// ===================== EMOJIS =====================
function emojiParaRotulo(rotulo) {
    var r = rotulo.toLowerCase();
    if (r.indexOf('riqueza') >= 0) return '💰';
    if (r.indexOf('poção') >= 0 || r.indexOf('pocao') >= 0) return '🧪';
    if (r.indexOf('mágico') >= 0 || r.indexOf('magico') >= 0) return '🔮';
    if (r.indexOf('superior') >= 0) return '✨';
    if (r.indexOf('equipamento') >= 0) return '⚔️';
    if (r.indexOf('item diverso') >= 0) return '📦';
    return '🎁';
}

function emojiParaEfeito(nome) {
    var n = nome.toLowerCase();
    if (n.indexOf('favor') >= 0) return '🤝';
    if (n.indexOf('informação') >= 0 || n.indexOf('informacao') >= 0) return '🧭';
    if (n.indexOf('poder') >= 0) return '💪';
    if (n.indexOf('tesouro') >= 0) return '💰';
    if (n.indexOf('abalo') >= 0) return '💔';
    if (n.indexOf('complicação') >= 0 || n.indexOf('complicacao') >= 0) return '🌀';
    if (n.indexOf('ferimento') >= 0) return '🩸';
    if (n.indexOf('maldição') >= 0 || n.indexOf('maldicao') >= 0) return '☠️';
    if (n.indexOf('ruína') >= 0 || n.indexOf('ruina') >= 0) return '📉';
    return '🎁';
}

// ===================== RENDERIZAÇÃO =====================
function criarItemEl(emoji, nome, badge, quantidade, descricao, corBorda) {
    var el = document.createElement('div');
    el.className = 'treasure-item';
    if (corBorda) el.style.borderLeftColor = corBorda;

    el.innerHTML =
        '<div class="treasure-item-emoji">' + emoji + '</div>' +
        '<div class="treasure-item-body">' +
        '  <div class="treasure-item-top">' +
        '    <span class="treasure-item-name">' + nome + '</span>' +
        (badge ? '    <span class="rarity-badge">' + badge + '</span>' : '') +
        (quantidade > 1 ? '    <span class="treasure-item-quantity">x' + quantidade + '</span>' : '') +
        '  </div>' +
        '  <div class="treasure-item-desc">' + descricao + '</div>' +
        '</div>';
    return el;
}

function atualizarLegendaAsteriscos() {
    var el = document.getElementById('legendAsteriscos');
    if (!el) return;
    var nomes = document.querySelectorAll('#treasureList .treasure-item-name');
    var mostra = false;
    for (var i = 0; i < nomes.length; i++) {
        if (nomes[i].textContent.indexOf('*') >= 0) { mostra = true; break; }
    }
    el.style.display = mostra ? 'flex' : 'none';
}

function fmtEspacos(n) {
    var s = String(n).replace('.', ',');
    return s + (n === 1 ? ' espaço' : ' espaços');
}

function rolarEspacosRiqueza() {
    var d20 = 1 + Math.floor(Math.random() * 20);
    registrarRolagem('1d20 (espaços da riqueza)', d20);
    var espacos = 0.5, desc = '';
    if (typeof RIQUEZAS_ESPACOS !== 'undefined' && RIQUEZAS_ESPACOS) {
        for (var i = 0; i < RIQUEZAS_ESPACOS.length; i++) {
            var e = RIQUEZAS_ESPACOS[i];
            if (d20 >= e.d[0] && d20 <= e.d[1]) { espacos = e.espacos; desc = e.desc || ''; break; }
        }
    }
    return { espacos: espacos, desc: desc };
}

function agregarMoedas(listaDinheiro, acumulador) {
    listaDinheiro.forEach(function (item) {
        if (item.tipo !== 'dinheiro') return;
        acumulador[item.moeda] = (acumulador[item.moeda] || 0) + item.valor;
    });
}

function rollChest() {
    var modo = document.querySelector('input[name="modoRecompensa"]:checked').value;
    var bonusPct = calcularBonusTotal();
    var qtd = window.getQtyRolagens();

    var moedasTotais = {};
    var itensRenderizados = [];
    var totalEfeitos = 0;
    var historicoResumo = '';
    var acumValores = { riquezas: 0, itensValor: 0 };
    _registroRolagens = [];
    _capturandoRolagens = true;
    _ultimaRodadaItensEls = [];

    if (modo === 'missao') {
        var ndChave = document.getElementById('ndEspecifico').value;
        var multiplicador = document.getElementById('multiplicadorTesouro').value;
        var separarEl = document.getElementById('separarPorCriatura');
        var chkMesa = document.getElementById('usarMesa');
        var gruposMesa = chkMesa && chkMesa.checked && mesaGrupos.length ? mesaGrupos.slice() : null;
        var planoMesa = gruposMesa && composicaoMesaValida(gruposMesa) ? expandirMesa(gruposMesa) : null;
        if (planoMesa) qtd = planoMesa.length;
        var separar = !!separarEl && separarEl.checked && qtd > 1;

        for (var i = 0; i < qtd; i++) {
            var ndAtual = planoMesa ? planoMesa[i] : ndChave;
            var res = rolarMissao(ndAtual, multiplicador, bonusPct);
            agregarMoedas(res.dinheiro, moedasTotais);

            if (separar) {
                itensRenderizados.push(criarTituloGrupoCriatura(i, res.dinheiro, planoMesa ? ndAtual : null));
            }
            itensRenderizados.push.apply(itensRenderizados, renderizarItensResolvidos(
                res.dinheiro,
                'Riqueza — coluna Dinheiro (ND ' + ndAtual + ').',
                'var(--ouro)',
                acumValores
            ));
            var elsItens = renderizarItensResolvidos(
                res.itens,
                'Resultado da coluna Itens (ND ' + ndAtual + ').',
                'var(--ouro)',
                acumValores
            );
            itensRenderizados.push.apply(itensRenderizados, elsItens);
            _ultimaRodadaItensEls = _ultimaRodadaItensEls.concat(elsItens);
        }
        totalEfeitos = contarItensReais(itensRenderizados);
        if (planoMesa) {
            historicoResumo = '<strong>Mesa</strong> — ' + descreverMesa(gruposMesa) + ' · ' + qtd + ' criatura(s)';
        } else {
            historicoResumo = '<strong>Recompensa de Missão</strong> — ND ' + ndChave + ', ' + qtd + ' rolagem(ns)' + (separar ? ', separado por criatura' : '');
        }
    } else {
        var nivelChave = document.getElementById('nivelBusca').value;
        var sucessos = parseInt(document.querySelector('input[name="sucessosBusca"]:checked').value, 10);

        for (var j = 0; j < qtd; j++) {
            var busca = rolarBusca(nivelChave, sucessos, bonusPct);
            agregarMoedas(busca.tesouro.dinheiro, moedasTotais);

            busca.efeitos.forEach(function (efeito) {
                var cor = efeito.tipo === 'castigo' ? 'var(--rubi)' : 'var(--ouro)';
                var badge = efeito.tipo === 'castigo' ? 'Castigo' : 'Recompensa';
                var elEfeito = criarItemEl(emojiParaEfeito(efeito.nome), efeito.nome, badge, 1, efeito.desc, cor);
                itensRenderizados.push(elEfeito);
                _ultimaRodadaItensEls.push(elEfeito);
            });
            itensRenderizados.push.apply(itensRenderizados, renderizarItensResolvidos(
                busca.tesouro.dinheiro,
                'Riqueza — recompensa de Busca (Nível ' + nivelChave + ').',
                'var(--ouro)',
                acumValores
            ));
            var elsItensBusca = renderizarItensResolvidos(
                busca.tesouro.itens,
                'Item de recompensa (Nível ' + nivelChave + ').',
                'var(--ouro)',
                acumValores
            );
            itensRenderizados.push.apply(itensRenderizados, elsItensBusca);
            _ultimaRodadaItensEls = _ultimaRodadaItensEls.concat(elsItensBusca);
        }
        totalEfeitos = contarItensReais(itensRenderizados);
        historicoResumo = '<strong>Recompensa de Busca</strong> — ' + BUSCA_CONSEQUENCIAS[sucessos].rotulo + ', ' + qtd + ' rolagem(ns)';
    }

    _capturandoRolagens = false;

    // Painel de resultado
    var resultPanel = document.getElementById('resultPanel');
    resultPanel.style.display = 'block';

    var moedasChaves = Object.keys(moedasTotais);
    var moedasEmT$ = 0;
    moedasChaves.forEach(function (m) { moedasEmT$ += moedaParaT$(m, moedasTotais[m]); });
    var totalEmT$ = moedasEmT$ + acumValores.riquezas + (acumValores.itensValor || 0);

    document.getElementById('resMoedas').textContent = moedasChaves.length
        ? moedasChaves.map(function (m) { return moedasTotais[m] + ' ' + m; }).join(' / ')
        : '—';
    document.getElementById('resItens').textContent = totalEfeitos;

    var fmtValor = function (v) {
        return v.toLocaleString('pt-BR') + ' T$';
    };
    document.getElementById('resValor').textContent = totalEmT$ > 0
        ? fmtValor(totalEmT$)
            + ' (moedas ' + (moedasEmT$ > 0 ? fmtValor(moedasEmT$) : '—')
            + ' + riquezas ' + (acumValores.riquezas > 0 ? fmtValor(acumValores.riquezas) : '—')
            + ' + itens ' + ((acumValores.itensValor || 0) > 0 ? fmtValor(acumValores.itensValor) : '—') + ')'
        : '—';

    var coinRow = document.getElementById('coinRow');
    coinRow.innerHTML = '';
    moedasChaves.forEach(function (moeda) {
        var el = document.createElement('span');
        el.className = 'coin-chip';
        el.innerHTML = '<span class="coin-emoji">🪙</span>' + moedasTotais[moeda] + ' ' + moeda;
        coinRow.appendChild(el);
    });

    var list = document.getElementById('treasureList');
    list.innerHTML = '';
    if (itensRenderizados.length === 0 && moedasChaves.length === 0) {
        var vazio = document.createElement('p');
        vazio.className = 'message text-muted';
        vazio.textContent = 'Nada digno de nota desta vez.';
        list.appendChild(vazio);
    } else {
        itensRenderizados.forEach(function (el, i) {
            el.style.animationDelay = (i * 0.06) + 's';
            list.appendChild(el);
        });
    }

    // Histórico
    var rolagensHtml = _registroRolagens.length
        ? '<span class="history-rolls">🎲 ' + _registroRolagens.join(' · ') + '</span>'
        : '';
    adicionarAoHistorico(historicoResumo, rolagensHtml, totalEmT$);

    // Snapshot do último resultado (para o botão "Copiar resultado")
    var moedasTexto = moedasChaves.length
        ? moedasChaves.map(function (m) { return moedasTotais[m] + ' ' + m; }).join(' / ')
        : '';
    var itensTexto = itensRenderizados.map(linhaDesdeElemento).filter(function (l) { return l !== ''; });
    _ultimoResultado = {
        resumo: historicoResumo.replace(/<[^>]+>/g, ''),
        moedasTexto: moedasTexto,
        totalTexto: totalEmT$ > 0 ? fmtValor(totalEmT$) : '',
        totalItens: totalEfeitos,
        itensTexto: itensTexto
    };
    var btnCopiar = document.getElementById('btnCopyResult');
    if (btnCopiar) btnCopiar.style.display = '';
    var btnReroll = document.getElementById('btnReroll');
    if (btnReroll) btnReroll.style.display = '';
    var btnRerollCoins = document.getElementById('btnRerollCoins');
    if (btnRerollCoins) btnRerollCoins.style.display = '';
    var btnRerollItems = document.getElementById('btnRerollItems');
    if (btnRerollItems) btnRerollItems.style.display = '';

    _ultimaRodada = {
        modo: modo,
        bonusPct: bonusPct,
        qtd: qtd,
        totalEfeitos: totalEfeitos,
        itensValor: acumValores.itensValor || 0,
        multiplicador: modo === 'missao' ? multiplicador : null,
        ndChave: modo === 'missao' ? ndChave : null,
        planoMesa: modo === 'missao' ? planoMesa : null,
        gruposMesa: modo === 'missao' ? gruposMesa : null,
        separar: modo === 'missao' ? separar : null,
        nivelChave: modo === 'busca' ? nivelChave : null,
        sucessos: modo === 'busca' ? sucessos : null
    };

    showToast('🪙 Recompensas reveladas!', 'toast-sucesso');
    atualizarLegendaAsteriscos();
    salvarUltimoBauLocal();
}

// "Só moedas": refaz apenas o Dinheiro, mantendo os itens da última rolagem
function rolarSoMoedas() {
    if (!_ultimaRodada) return;
    var cfg = _ultimaRodada;

    _registroRolagens = [];
    _capturandoRolagens = true;

    var moedasTotais = {};
    var acum = { riquezas: 0, itensValor: cfg.itensValor || 0 };
    var dinheiroEls = [];

    if (cfg.modo === 'missao') {
        var plano = cfg.planoMesa || null;
        for (var i = 0; i < cfg.qtd; i++) {
            var ndAtual = plano ? plano[i] : cfg.ndChave;
            var res = rolarMissao(ndAtual, cfg.multiplicador, cfg.bonusPct);
            agregarMoedas(res.dinheiro, moedasTotais);
            if (cfg.separar) dinheiroEls.push(criarTituloGrupoCriatura(i, res.dinheiro, plano ? ndAtual : null));
            dinheiroEls = dinheiroEls.concat(renderizarItensResolvidos(
                res.dinheiro,
                'Riqueza — coluna Dinheiro (ND ' + ndAtual + ').',
                'var(--ouro)',
                acum
            ));
        }
    } else {
        for (var j = 0; j < cfg.qtd; j++) {
            var busca = rolarBusca(cfg.nivelChave, cfg.sucessos, cfg.bonusPct);
            agregarMoedas(busca.tesouro.dinheiro, moedasTotais);
            dinheiroEls = dinheiroEls.concat(renderizarItensResolvidos(
                busca.tesouro.dinheiro,
                'Riqueza — recompensa de Busca (Nível ' + cfg.nivelChave + ').',
                'var(--ouro)',
                acum
            ));
        }
    }

    _capturandoRolagens = false;

    var moedasChaves = Object.keys(moedasTotais);
    var moedasEmT$ = 0;
    moedasChaves.forEach(function (m) { moedasEmT$ += moedaParaT$(m, moedasTotais[m]); });
    var totalEmT$ = moedasEmT$ + acum.riquezas + (acum.itensValor || 0);

    document.getElementById('resMoedas').textContent = moedasChaves.length
        ? moedasChaves.map(function (m) { return moedasTotais[m] + ' ' + m; }).join(' / ')
        : '—';
    document.getElementById('resItens').textContent = cfg.totalEfeitos;
    document.getElementById('resValor').textContent = totalEmT$ > 0
        ? fmtTibares(totalEmT$)
            + ' (moedas ' + (moedasEmT$ > 0 ? fmtTibares(moedasEmT$) : '—')
            + ' + riquezas ' + (acum.riquezas > 0 ? fmtTibares(acum.riquezas) : '—')
            + ' + itens ' + (acum.itensValor > 0 ? fmtTibares(acum.itensValor) : '—') + ')'
        : '—';

    var coinRow = document.getElementById('coinRow');
    coinRow.innerHTML = '';
    moedasChaves.forEach(function (moeda) {
        var el = document.createElement('span');
        el.className = 'coin-chip';
        el.innerHTML = '<span class="coin-emoji">🪙</span>' + moedasTotais[moeda] + ' ' + moeda;
        coinRow.appendChild(el);
    });

    var list = document.getElementById('treasureList');
    list.innerHTML = '';
    if (dinheiroEls.length === 0 && _ultimaRodadaItensEls.length === 0 && moedasChaves.length === 0) {
        var vazio = document.createElement('p');
        vazio.className = 'message text-muted';
        vazio.textContent = 'Nada digno de nota desta vez.';
        list.appendChild(vazio);
    } else {
        var delayBase = 0;
        dinheiroEls.forEach(function (el, i) {
            el.style.animationDelay = (i * 0.06) + 's';
            list.appendChild(el);
            delayBase = i + 1;
        });
        _ultimaRodadaItensEls.forEach(function (el, i) {
            el.style.animationDelay = ((delayBase + i) * 0.06) + 's';
            list.appendChild(el);
        });
    }

    var resumoBase = cfg.modo === 'missao'
        ? (cfg.planoMesa ? '<strong>Mesa</strong> — ' + descreverMesa(cfg.gruposMesa) : '<strong>Recompensa de Missão</strong> — ND ' + cfg.ndChave)
        : '<strong>Recompensa de Busca</strong> — ' + BUSCA_CONSEQUENCIAS[cfg.sucessos].rotulo;
    var rolagensHtml = _registroRolagens.length
        ? '<span class="history-rolls">🎲 ' + _registroRolagens.join(' · ') + '</span>'
        : '';
    adicionarAoHistorico(resumoBase + ' <em>(só moedas)</em>', rolagensHtml, totalEmT$);

    var moedasTexto = moedasChaves.length
        ? moedasChaves.map(function (m) { return moedasTotais[m] + ' ' + m; }).join(' / ')
        : '';
    _ultimoResultado = {
        resumo: resumoBase.replace(/<[^>]+>/g, '') + ' (só moedas)',
        moedasTexto: moedasTexto,
        totalTexto: totalEmT$ > 0 ? fmtTibares(totalEmT$) : '',
        totalItens: cfg.totalEfeitos,
        itensTexto: _ultimaRodadaItensEls.map(linhaDesdeElemento).filter(function (l) { return l !== ''; })
    };

    showToast('🪙 Moedas roladas de novo — itens mantidos!', 'toast-sucesso');
    atualizarLegendaAsteriscos();
    salvarUltimoBauLocal();
}

// "Só itens": refaz apenas os Itens, mantendo o dinheiro da última rolagem
function rolarSoItens() {
    if (!_ultimaRodada) return;
    var cfg = _ultimaRodada;

    _registroRolagens = [];
    _capturandoRolagens = true;

    var moedasTotais = {};
    var acum = { riquezas: 0, itensValor: 0 };
    var itensRenderizados = [];
    var dinheiroChaves = [];

    if (cfg.modo === 'missao') {
        var plano = cfg.planoMesa || null;
        for (var i = 0; i < cfg.qtd; i++) {
            var ndAtual = plano ? plano[i] : cfg.ndChave;
            var res = rolarMissao(ndAtual, cfg.multiplicador, cfg.bonusPct);
            if (i === 0) {
                agregarMoedas(res.dinheiro, moedasTotais);
                dinheiroChaves = Object.keys(moedasTotais);
            }
            if (cfg.separar) itensRenderizados.push(criarTituloGrupoCriatura(i, res.dinheiro, plano ? ndAtual : null));
            itensRenderizados = itensRenderizados.concat(renderizarItensResolvidos(
                res.dinheiro,
                'Riqueza — coluna Dinheiro (ND ' + ndAtual + ').',
                'var(--ouro)',
                acum
            ));
            var elsItens = renderizarItensResolvidos(
                res.itens,
                'Resultado da coluna Itens (ND ' + ndAtual + ').',
                'var(--ouro)',
                acum
            );
            itensRenderizados.push.apply(itensRenderizados, elsItens);
            _ultimaRodadaItensEls = _ultimaRodadaItensEls.concat(elsItens);
        }
    } else {
        for (var j = 0; j < cfg.qtd; j++) {
            var busca = rolarBusca(cfg.nivelChave, cfg.sucessos, cfg.bonusPct);
            if (j === 0) {
                agregarMoedas(busca.tesouro.dinheiro, moedasTotais);
                dinheiroChaves = Object.keys(moedasTotais);
            }
            busca.efeitos.forEach(function (efeito) {
                var cor = efeito.tipo === 'castigo' ? 'var(--rubi)' : 'var(--ouro)';
                var badge = efeito.tipo === 'castigo' ? 'Castigo' : 'Recompensa';
                var elEfeito = criarItemEl(emojiParaEfeito(efeito.nome), efeito.nome, badge, 1, efeito.desc, cor);
                itensRenderizados.push(elEfeito);
                _ultimaRodadaItensEls.push(elEfeito);
            });
            itensRenderizados.push.apply(itensRenderizados, renderizarItensResolvidos(
                busca.tesouro.dinheiro,
                'Riqueza — recompensa de Busca (Nível ' + cfg.nivelChave + ').',
                'var(--ouro)',
                acum
            ));
            var elsItensBusca = renderizarItensResolvidos(
                busca.tesouro.itens,
                'Item de recompensa (Nível ' + cfg.nivelChave + ').',
                'var(--ouro)',
                acum
            );
            itensRenderizados.push.apply(itensRenderizados, elsItensBusca);
            _ultimaRodadaItensEls = _ultimaRodadaItensEls.concat(elsItensBusca);
        }
    }

    _capturandoRolagens = false;

    var moedasEmT$ = 0;
    dinheiroChaves.forEach(function (m) { moedasEmT$ += moedaParaT$(m, moedasTotais[m]); });
    var totalEmT$ = moedasEmT$ + acum.riquezas + (acum.itensValor || 0);

    document.getElementById('resMoedas').textContent = dinheiroChaves.length
        ? dinheiroChaves.map(function (m) { return moedasTotais[m] + ' ' + m; }).join(' / ')
        : '—';
    document.getElementById('resItens').textContent = itensRenderizados.length;
    document.getElementById('resValor').textContent = totalEmT$ > 0
        ? fmtTibares(totalEmT$)
            + ' (moedas ' + (moedasEmT$ > 0 ? fmtTibares(moedasEmT$) : '—')
            + ' + riquezas ' + (acum.riquezas > 0 ? fmtTibares(acum.riquezas) : '—')
            + ' + itens ' + (acum.itensValor > 0 ? fmtTibares(acum.itensValor) : '—') + ')'
        : '—';

    var coinRow = document.getElementById('coinRow');
    coinRow.innerHTML = '';
    dinheiroChaves.forEach(function (moeda) {
        var el = document.createElement('span');
        el.className = 'coin-chip';
        el.innerHTML = '<span class="coin-emoji">🪙</span>' + moedasTotais[moeda] + ' ' + moeda;
        coinRow.appendChild(el);
    });

    var list = document.getElementById('treasureList');
    list.innerHTML = '';
    if (itensRenderizados.length === 0 && dinheiroChaves.length === 0) {
        var vazio = document.createElement('p');
        vazio.className = 'message text-muted';
        vazio.textContent = 'Nada digno de nota desta vez.';
        list.appendChild(vazio);
    } else {
        var delayBase = 0;
        itensRenderizados.forEach(function (el, i) {
            el.style.animationDelay = (i * 0.06) + 's';
            list.appendChild(el);
        });
    }

    var resumoBase = cfg.modo === 'missao'
        ? (cfg.planoMesa ? '<strong>Mesa</strong> — ' + descreverMesa(cfg.gruposMesa) : '<strong>Recompensa de Missão</strong> — ND ' + cfg.ndChave)
        : '<strong>Recompensa de Busca</strong> — ' + BUSCA_CONSEQUENCIAS[cfg.sucessos].rotulo;
    var rolagensHtml = _registroRolagens.length
        ? '<span class="history-rolls">🎲 ' + _registroRolagens.join(' · ') + '</span>'
        : '';
    adicionarAoHistorico(resumoBase + ' <em>(só itens)</em>', rolagensHtml, totalEmT$);

    var moedasTexto = dinheiroChaves.length
        ? dinheiroChaves.map(function (m) { return moedasTotais[m] + ' ' + m; }).join(' / ')
        : '';
    _ultimoResultado = {
        resumo: resumoBase.replace(/<[^>]+>/g, '') + ' (só itens)',
        moedasTexto: moedasTexto,
        totalTexto: totalEmT$ > 0 ? fmtTibares(totalEmT$) : '',
        totalItens: itensRenderizados.length,
        itensTexto: _ultimaRodadaItensEls.map(linhaDesdeElemento).filter(function (l) { return l !== ''; })
    };

    showToast('💎 Itens rolados de novo — dinheiro mantido!', 'toast-sucesso');
    atualizarLegendaAsteriscos();
    salvarUltimoBauLocal();
}

function capitalizar(texto) {
    if (!texto) return texto;
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function linhaDesdeElemento(el) {
    var cls = el.className || '';
    if (cls.indexOf('creature-group-title') >= 0) {
        var strong = el.querySelector('strong');
        var coins = el.querySelector('.creature-group-coins');
        var linha = '🏴 ' + (strong ? strong.textContent : '');
        if (coins) linha += ' — ' + coins.textContent;
        return linha;
    }
    var nomeEl = el.querySelector('.treasure-item-name');
    if (!nomeEl) return '';
    if (cls.indexOf('treasure-item-2d') >= 0) {
        var badge2d = el.querySelector('.badge-2d');
        var opts = el.querySelectorAll('.treasure-2d-option');
        var linhas = ['• ' + nomeEl.textContent + ' [' + (badge2d ? badge2d.textContent : '2D') + ']'];
        for (var o = 0; o < opts.length; o++) {
            linhas.push('   ' + (o + 1) + ') ' + opts[o].textContent);
        }
        return linhas.join('\n');
    }
    var nome = nomeEl.textContent;
    var qtd = el.querySelector('.treasure-item-quantity');
    if (qtd) nome += ' ' + qtd.textContent;
    var partes = [nome];
    var badge = el.querySelector('.rarity-badge');
    if (badge) partes.push('[' + badge.textContent + ']');
    return '• ' + partes.join(' ');
}

function escreverClipboard(texto, ok, erro) {
    function fallback() {
        var ta = document.createElement('textarea');
        ta.value = texto;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        try {
            document.execCommand('copy');
            if (ok) ok();
        } catch (e) {
            if (erro) erro();
        }
        document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(ok, function () { fallback(); });
    } else {
        fallback();
    }
}

// Botão "Copiar resultado" — copia apenas o último baú aberto
function copiarResultado() {
    if (!_ultimoResultado) return;
    var linhas = [];
    linhas.push('🪙 ' + _ultimoResultado.resumo);
    if (_ultimoResultado.moedasTexto) linhas.push('💰 Moedas: ' + _ultimoResultado.moedasTexto);
    if (_ultimoResultado.totalTexto) linhas.push('🎁 Valor total: ' + _ultimoResultado.totalTexto);
    if (_ultimoResultado.itensTexto.length) linhas.push('📜 Itens (' + _ultimoResultado.totalItens + '):');
    _ultimoResultado.itensTexto.forEach(function (l) { linhas.push(l); });
    escreverClipboard(linhas.join('\n'), function () {
        showToast('📋 Resultado copiado!', 'toast-sucesso');
    }, function () {
        showToast('Não foi possível copiar.', 'toast-aviso');
    });
}

document.getElementById('btnRollChest').addEventListener('click', rollChest);
document.getElementById('btnReroll').addEventListener('click', rollChest);
document.getElementById('btnRerollCoins').addEventListener('click', rolarSoMoedas);
document.getElementById('btnRerollItems').addEventListener('click', rolarSoItens);
document.getElementById('btnCopyResult').addEventListener('click', copiarResultado);
document.getElementById('ndEspecifico').addEventListener('change', atualizarReferenciaND);
document.getElementById('multiplicadorTesouro').addEventListener('change', atualizarReferenciaND);
atualizarReferenciaND();
restaurarHistorico();
var chkMesa = document.getElementById('usarMesa');
var mesaBuilder = document.getElementById('mesaBuilder');
chkMesa.addEventListener('change', function () {
    mesaBuilder.style.display = chkMesa.checked ? 'block' : 'none';
    atualizarHintMesa();
});
document.getElementById('ndEspecifico').addEventListener('change', atualizarLabelNDAtual);
document.getElementById('mesaAddBtn').addEventListener('click', adicionarGrupoMesa);
document.getElementById('mesaLimparBtn').addEventListener('click', limparMesa);
document.getElementById('mesaQtyMinus').addEventListener('click', function () { mudarQtdMesa(-1); });
document.getElementById('mesaQtyPlus').addEventListener('click', function () { mudarQtdMesa(1); });
document.getElementById('mesaQty').addEventListener('input', function () {
    var v = parseInt(this.value, 10);
    if (isNaN(v)) return;
    if (v < 1) this.value = 1;
    if (v > 99) this.value = 99;
    salvarConfigLocal();
});
atualizarLabelNDAtual();
renderizarChipsMesa();
atualizarHintMesa();
document.getElementById('btnClearHistory').addEventListener('click', function () {
    var history = document.getElementById('historicoTesouros');
    history.innerHTML = '<li class="history-empty">Nenhum tesouro descoberto ainda...</li>';
    try { localStorage.removeItem(HISTORY_STORAGE_KEY); } catch (e) { }
    atualizarTotalSessao();
});

// ===================== PERSISTÊNCIA: DISPARO AUTOMÁTICO =====================
['ndEspecifico', 'multiplicadorTesouro', 'usarMesa', 'separarPorCriatura', 'nivelBusca', 'bonusSalaTesouro', 'bonusDinheiroAtrai'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('change', salvarConfigLocal);
});
document.querySelectorAll('input[name="modoRecompensa"]').forEach(function (input) {
    input.addEventListener('change', salvarConfigLocal);
});
document.querySelectorAll('input[name="sucessosBusca"]').forEach(function (input) {
    input.addEventListener('change', salvarConfigLocal);
});

// ===================== BOTÃO "LIMPAR DADOS" =====================
var btnClearData = document.getElementById('btnClearData');
if (btnClearData) {
    btnClearData.addEventListener('click', function () {
        if (!confirm('Limpar todos os dados salvos do Espólio (configurações, último baú aberto e histórico)?')) return;
        try {
            localStorage.removeItem(CONFIG_STORAGE_KEY);
            localStorage.removeItem(ULTIMO_BAU_STORAGE_KEY);
            localStorage.removeItem(HISTORY_STORAGE_KEY);
        } catch (e) { }
        location.reload();
    });
}

restaurarConfigLocal();
restaurarUltimoBauLocal();
