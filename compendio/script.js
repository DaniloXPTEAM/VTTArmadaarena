/**
 * COMPÊNDIO DE ARTON — VTTArmada T20
 * Lê dados estáticos (racas.js/racas_dragaobrasil.js, origens.js, distincoes-data.js)
 * e monta um visualizador de consulta "lista + ficha" (5e.tools) com abas por coleção.
 *
 * Este script NUNCA chama createCustomUi()/calculateAttributes() das raças —
 * essas funções pertencem à Calculadora de Atributos e dependem de elementos
 * de DOM que não existem aqui. Usamos apenas os campos estáticos de dados.
 */

(function () {
  'use strict';

  // ── Helpers compartilhados ────────────────────────────────────────
  function stripAccents(str) {
    return (str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  function escapeHtml(str) {
    return (str || '').replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function nl2p(str, cls) {
    var lines = (str || '').split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
    if (!lines.length) return '';
    return lines.map(function (l) {
      return '<p class="' + (cls || 'power-desc') + '">' + escapeHtml(l) + '</p>';
    }).join('');
  }

  function cap(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function powerCard(name, descHtml, extraClass, id) {
    return '<div class="power-card' + (extraClass ? ' ' + extraClass : '') + '"' + (id ? ' id="' + escapeHtml(id) + '"' : '') + '>' +
      '<h4 class="power-name">' + escapeHtml(name) + '</h4>' +
      (descHtml || '<p class="power-desc">—</p>') +
      '</div>';
  }

  function runeDivider() {
    return '<div class="rune-divider">' +
      '<svg width="16" height="16" viewBox="0 0 16 16"><polygon points="8,0 16,8 8,16 0,8" fill="currentColor"/></svg>' +
      '</div>';
  }

  var DEFAULT_SOURCE = { label: 'Fonte Desconhecida', short: '???', color: '#888888' };

  function metaFor(collection, sourceKey) {
    return collection.sourceMeta[sourceKey] || DEFAULT_SOURCE;
  }

  // ══════════════════════════════════════════════════════════════════
  //  COLEÇÃO: RAÇAS
  // ══════════════════════════════════════════════════════════════════
  function buildRacasCollection() {
    var SOURCE_META = {
      base: { label: 'Livro Básico', short: 'Básico', color: '#c9933a' },
      ghanor: { label: 'A Lenda de Ghanor RPG', short: 'Ghanor', color: '#4f9d69' },
      ameacas: { label: 'Ameaças de Arton', short: 'Ameaças', color: '#b5384f' },
      DHracas: { label: 'Heróis de Arton', short: 'Heróis', color: '#4a72b0' },
      dragaobrasil: { label: 'Dragão Brasil', short: 'DB', color: '#e07b39' },
      outraRaca: { label: 'Outras Fontes', short: 'Outras', color: '#8a63b5' }
    };
    var SOURCE_ORDER = ['base', 'ghanor', 'ameacas', 'DHracas', 'dragaobrasil', 'outraRaca'];

    var ATTR_ABBR = {
      forca: 'FOR', destreza: 'DES', constituicao: 'CON',
      inteligencia: 'INT', sabedoria: 'SAB', carisma: 'CAR'
    };
    var SIZE_ABBR = {
      'Minúsculo': 'Min', 'Pequeno': 'Peq', 'Médio': 'Méd', 'Medio': 'Méd',
      'Grande': 'Gde', 'Variável': 'Var'
    };

    function shortAttrs(d) {
      var parts = [];
      Object.keys(d.attributes || {}).forEach(function (k) {
        var v = d.attributes[k];
        if (v) parts.push((ATTR_ABBR[k] || k.slice(0, 3).toUpperCase()) + (v > 0 ? '+' : '') + v);
      });
      if (d.isChoice) {
        parts.push('+1×' + (d.choiceCount || 1) + (d.lockedChoiceAttributes && d.lockedChoiceAttributes.length ? '*' : ''));
      }
      if (!parts.length && d.bonusMessage) {
        return d.bonusMessage.length > 34 ? d.bonusMessage.slice(0, 32) + '…' : d.bonusMessage;
      }
      return parts.join(' ');
    }

    function shortSize(d) {
      var t = d.tamanho || 'Variável';
      return SIZE_ABBR[t] || t;
    }

    // ── Tabelas de variantes/opções especiais por raça ───────────────
    var VARIANT_SPECS = {};
    if (typeof GOLEM_CHASSI !== 'undefined') {
      VARIANT_SPECS.golem = [
        { title: 'Chassis Disponíveis', source: GOLEM_CHASSI, nameField: 'label', descField: 'attrDesc', powersField: 'powers' },
        { title: 'Fontes de Energia', source: (typeof GOLEM_FONTES !== 'undefined' ? GOLEM_FONTES : {}), keyAsLabel: true, powersField: 'powers' },
        { title: 'Maravilhas Mecânicas (chassi Mashin)', source: (typeof GOLEM_MARAVILHAS !== 'undefined' ? GOLEM_MARAVILHAS : {}), nameField: 'name', descField: 'desc' }
      ];
    }
    if (typeof KOBOLD_TALENTS !== 'undefined') {
      VARIANT_SPECS.kobold = [
        { title: 'Talentos de Bando', source: KOBOLD_TALENTS, nameField: 'name', descField: 'desc' }
      ];
    }
    if (typeof SURAGEL_HERANCAS !== 'undefined') {
      var suragelSpec = [
        { title: 'Heranças de Suragel', source: SURAGEL_HERANCAS, keyAsLabel: true, htmlDescField: 'description' }
      ];
      VARIANT_SPECS.aggelus = suragelSpec;
      VARIANT_SPECS.sulfure = suragelSpec;
    }
    if (typeof DUENDE_PRESENTES !== 'undefined') {
      VARIANT_SPECS.duende = [
        { title: 'Naturezas (escolha 1)', source: {
            Animal: { name: 'Natureza Animal', desc: 'Pode adicionar +1 em um atributo à sua escolha (Dons). Sem poder racial adicional.' },
            Vegetal: { name: 'Natureza Vegetal', desc: 'Imune a atordoamento e metamorfose.' },
            Mineral: { name: 'Natureza Mineral', desc: 'Imune a metabolismo e RD 5 (Corte, Fogo, Perfuração).' }
          }, nameField: 'name', descField: 'desc' },
        { title: 'Poderes Extras de Natureza (conforme natureza)', source: {
            florescerFeerico: { name: 'Florescer Feérico (Vegetal)', desc: 'Pode gastar PM (limite Constituição) para curar 2d8 PV por PM gasto.' }
          }, nameField: 'name', descField: 'desc' },
        { title: 'Presentes de Magia e Caos (escolha até 3)', source: DUENDE_PRESENTES, nameField: 'name', descField: 'desc' }
      ];
    }
    if (typeof FEERICO_BENCAOS !== 'undefined') {
      VARIANT_SPECS.feerico = [
        { title: 'Bênçãos das Fadas (escolha 4)', source: FEERICO_BENCAOS, nameField: 'name', descField: 'desc' }
      ];
    }
    if (typeof VAMPIRO_BENCAOS !== 'undefined') {
      VARIANT_SPECS.vampiro = [
        { title: 'Bênçãos Vampíricas (escolha 1)', source: VAMPIRO_BENCAOS, nameField: 'name', descField: 'desc' }
      ];
    }
    if (typeof KALLYANACH_BENCAOS !== 'undefined') {
      VARIANT_SPECS.kallyanach = [
        { title: 'Bênçãos de Kallyadranoch (escolha 2)', source: KALLYANACH_BENCAOS, nameField: 'name', descField: 'desc' }
      ];
    }
    if (typeof ABERRANT_MUTATIONS !== 'undefined') {
      VARIANT_SPECS.aberrant = [
        { title: 'Mutações (escolha até 4)', source: ABERRANT_MUTATIONS, nameField: 'name', descField: 'desc' }
      ];
    }
    if (typeof MOREAU_HERANCAS !== 'undefined') {
      VARIANT_SPECS.moreau = [
        { title: 'Heranças Animais (escolha 1)', source: MOREAU_HERANCAS, nameField: 'attrDesc', powersField: 'powers' }
      ];
    }

    var RAW = (typeof RACE_DATA !== 'undefined') ? RACE_DATA : {};

    var inheritableRaces = ['osteon', 'yidishan', 'vampiro'];
    inheritableRaces.forEach(function (raceKey) {
      if (RAW[raceKey] && !VARIANT_SPECS[raceKey]) {
        VARIANT_SPECS[raceKey] = [
          { title: 'Memória Póstuma / Resquícios (herança de raça humanoide)', source: {}, nameField: 'name', descField: 'desc' }
        ];
      }
    });

    function buildBlob(key, d) {
      var parts = [d.name, d.raca, d.tamanho, d.bonusMessage];
      (d.racialPowers || []).forEach(function (p) { parts.push(p.name, p.desc); });
      return stripAccents(parts.filter(Boolean).join(' | '));
    }

    var items = Object.keys(RAW)
      .map(function (key) { return { key: key, data: RAW[key] }; })
      .filter(function (r) { return r.data && typeof r.data === 'object' && r.data.name; })
      .map(function (r) { r._blob = buildBlob(r.key, r.data); return r; });

    function renderVariantBlock(spec) {
      var entries = Object.keys(spec.source || {});
      if (!entries.length) return '';

      var cards = entries.map(function (key) {
        var val = spec.source[key];
        var label = spec.nameField ? val[spec.nameField] : (spec.keyAsLabel ? cap(key) : key);
        var bodyHtml = '';

        if (spec.htmlDescField && val[spec.htmlDescField]) {
          bodyHtml += '<p class="power-desc">' + val[spec.htmlDescField] + '</p>';
        } else if (spec.descField && val[spec.descField]) {
          bodyHtml += '<p class="power-desc">' + escapeHtml(val[spec.descField]) + '</p>';
        }

        if (spec.powersField && Array.isArray(val[spec.powersField])) {
          bodyHtml += val[spec.powersField].map(function (p) {
            return '<p class="power-desc"><b>' + escapeHtml(p.name) + '.</b> ' + escapeHtml(p.desc) + '</p>';
          }).join('');
        }

        if (!bodyHtml) bodyHtml = '<p class="power-desc">—</p>';
        return powerCard(label, bodyHtml);
      }).join('');

      return '' +
        '<div class="variant-block">' +
        '<p class="variant-label">' + escapeHtml(spec.title) + '</p>' +
        '<div class="power-grid">' + cards + '</div>' +
        '</div>';
    }

    function renderPowersTable(powers) {
      var rows = powers.map(function (p) {
        var desc = (p.desc || '').replace(/<[^>]*>/g, ' ').trim();
        return '<tr class="powers-table-row" data-name="' + escapeHtml(p.name) + '">' +
          '<td class="pt-name">' + escapeHtml(p.name) + '</td>' +
          '<td class="pt-desc">' + escapeHtml(desc) + '</td>' +
          '</tr>';
      }).join('');

      return '<div class="powers-table-wrap">' +
        '<table class="powers-table">' +
        '<thead><tr>' +
        '<th class="pth-name">Nome</th>' +
        '<th class="pth-desc">Descrição</th>' +
        '</tr></thead>' +
        '<tbody>' + rows + '</tbody>' +
        '</table></div>';
    }

    function renderDetail(key) {
      var race = RAW[key];
      if (!race) return '';
      var meta = metaFor(collection, race.type);
      var powers = race.racialPowers || [];

      var portraitStyle = race.imageUrl
        ? ' style="background-image:url(\'' + race.imageUrl.replace(/'/g, "\\'") + '\')"'
        : '';

      var badges = '<span class="badge source" style="--source-color:' + meta.color + '">' + escapeHtml(meta.label) + '</span>';
      badges += '<span class="badge">' + escapeHtml(race.tamanho || 'Tamanho variável') + '</span>';
      if (race.raca && race.raca !== '-') {
        badges += '<span class="badge">' + escapeHtml(race.raca) + '</span>';
      }

      var isGrid = racasViewMode === 'grid';
      var toggleIcon = isGrid ? '&#9638;' : '&#9776;';
      var toggleLabel = isGrid ? 'Tabela' : 'Grade';

      var powersHtml = isGrid
        ? '<div class="power-grid">' + (powers.map(function (p) {
            return powerCard(p.name, '<p class="power-desc">' + escapeHtml(p.desc) + '</p>');
          }).join('') || '<p class="power-desc">Nenhum poder racial fixo cadastrado.</p>') + '</div>'
        : (renderPowersTable(powers) || '<p class="power-desc">Nenhum poder racial fixo cadastrado.</p>');

      var variantHtml = '';
      var specs = VARIANT_SPECS[key];
      if (specs) variantHtml = specs.map(renderVariantBlock).join('');

      return '' +
        '<header class="detail-header">' +
        '<div class="detail-portrait"' + portraitStyle + '></div>' +
        '<div class="detail-heading">' +
        '<div class="detail-title-row">' +
        '<h2 class="detail-name">' + escapeHtml(race.name) + '</h2>' +
        (powers.length ? '<button class="view-toggle-btn" title="Alternar entre grade e tabela">' +
        '<span class="view-toggle-icon">' + toggleIcon + '</span>' +
        '<span class="view-toggle-label">' + toggleLabel + '</span>' +
        '</button>' : '') +
        '</div>' +
        '<div class="detail-badges">' + badges + '</div>' +
        '<a class="calc-link" href="../calculadora/index.html?raca=' + encodeURIComponent(key) + '" rel="noopener" title="Abrir esta raça na Calculadora de Atributos">' +
        '<span class="calc-link-icon" aria-hidden="true">🧮</span>' +
        '<span class="calc-link-text">Usar na Calculadora</span>' +
        '</a>' +
        '</div>' +
        '</header>' +

        '<h3 class="section-title">Modificadores de Atributo</h3>' +
        '<div class="bonus-message">' + escapeHtml(race.bonusMessage || 'Sem modificadores fixos.') + '</div>' +

        runeDivider() +

        '<h3 class="section-title">Poderes Raciais</h3>' +
        powersHtml +

        (variantHtml ? runeDivider() + '<h3 class="section-title">Variantes e Opções Especiais</h3>' + variantHtml : '') +

        '<p class="detail-footnote">Dados extraídos do compêndio de raças do VTTArmada T20 — consulte o mestre para eventuais erratas ou regras de mesa.</p>';
    }

    var collection = {
      id: 'racas',
      navLabel: 'Raças',
      labelSingular: 'raça',
      labelPlural: 'raças',
      searchPlaceholder: 'Buscar por nome, poder ou palavra-chave...',
      items: items,
      sourceMeta: SOURCE_META,
      sourceOrder: SOURCE_ORDER,
      getSourceKey: function (d) { return d.type; },
      columns: [
        {
          key: 'name', label: 'Nome',
          sortValue: function (d) { return stripAccents(d.name); },
          cellHtml: function (d, meta) { return '<span class="source-dot" style="--source-color:' + meta.color + '"></span><span class="name-text">' + escapeHtml(d.name) + '</span>'; },
          title: function (d, meta) { return meta.label; }
        },
        {
          key: 'attrs', label: 'Atributos',
          sortValue: function (d) { return stripAccents(shortAttrs(d)); },
          cellHtml: function (d) { return escapeHtml(shortAttrs(d)); },
          title: function (d) { return d.bonusMessage || ''; }
        },
        {
          key: 'tamanho', label: 'Tam.',
          sortValue: function (d) { return stripAccents(d.tamanho || 'zzz'); },
          cellHtml: function (d) { return escapeHtml(shortSize(d)); },
          title: function (d) { return d.tamanho || 'Variável'; }
        }
      ],
      renderDetail: renderDetail
    };
    return collection;
  }

  // ══════════════════════════════════════════════════════════════════
  //  COLEÇÃO: ORIGENS
  // ══════════════════════════════════════════════════════════════════
  function buildOrigensCollection() {
    var SOURCE_META = {
      'T20': { label: 'Livro Básico', short: 'Básico', color: '#c9933a' },
      'Atlas': { label: 'Atlas Tormenta20', short: 'Atlas', color: '#4f9d69' },
      'Heróis de Arton': { label: 'Heróis de Arton', short: 'Heróis', color: '#4a72b0' },
      'A Lenda de Ruff Ghanor': { label: 'A Lenda de Ruff Ghanor', short: 'Ghanor', color: '#8a63b5' },
      'Libertação de Valkaria': { label: 'Libertação de Valkaria', short: 'Valkaria', color: '#b5384f' }
    };
    var SOURCE_ORDER = ['T20', 'Atlas', 'Heróis de Arton', 'A Lenda de Ruff Ghanor', 'Libertação de Valkaria'];
    var BENEFIT_TYPE_LABEL = { skill: 'Perícia', power: 'Poder', special: 'Especial' };

    var RAW = (typeof origensData !== 'undefined') ? origensData : [];

    function buildBlob(o) {
      var parts = [o.name, o.desc, o.items, o.region];
      (o.benefits || []).forEach(function (b) { parts.push(b.name, b.desc); });
      if (o.autoTraining) parts = parts.concat(o.autoTraining);
      if (o.uniqueBenefit) parts.push(o.uniqueBenefit.name, o.uniqueBenefit.desc);
      return stripAccents(parts.filter(Boolean).join(' | '));
    }

    var items = RAW
      .filter(function (o) { return o && o.id && o.name; })
      .map(function (o) { return { key: o.id, data: o, _blob: buildBlob(o) }; });

    function renderBenefitsTable(benefits) {
      var rows = benefits.map(function (b) {
        var desc = (b.desc || 'Descrição no livro de origem (busque pelo nome do poder).').replace(/<[^>]*>/g, ' ').trim();
        return '<tr class="powers-table-row" data-name="' + escapeHtml(b.name) + '">' +
          '<td class="pt-name">' + escapeHtml(b.name) + '</td>' +
          '<td class="pt-req">' + escapeHtml(BENEFIT_TYPE_LABEL[b.type] || cap(b.type || '')) + '</td>' +
          '<td class="pt-desc">' + escapeHtml(desc) + '</td>' +
          '</tr>';
      }).join('');

      return '<div class="powers-table-wrap">' +
        '<table class="powers-table">' +
        '<thead><tr>' +
        '<th class="pth-name">Nome</th>' +
        '<th class="pth-req">Tipo</th>' +
        '<th class="pth-desc">Descrição</th>' +
        '</tr></thead>' +
        '<tbody>' + rows + '</tbody>' +
        '</table></div>';
    }

    function renderDetail(key) {
      var o = null;
      for (var i = 0; i < RAW.length; i++) { if (RAW[i].id === key) { o = RAW[i]; break; } }
      if (!o) return '';
      var meta = metaFor(collection, o.source);
      var benefits = o.benefits || [];

      var badges = '<span class="badge source" style="--source-color:' + meta.color + '">' + escapeHtml(meta.label) + '</span>';
      if (o.region) badges += '<span class="badge">' + escapeHtml(o.region) + '</span>';
      badges += '<span class="badge">' + (o.chooseCount ? 'Escolha ' + o.chooseCount : 'Benefícios automáticos') + '</span>';

      var isGrid = origensViewMode === 'grid';
      var toggleIcon = isGrid ? '&#9638;' : '&#9776;';
      var toggleLabel = isGrid ? 'Tabela' : 'Grade';

      var benefitsHtml;
      var benefitsTitle;
      if (benefits.length) {
        benefitsTitle = 'Benefícios (escolha ' + (o.chooseCount || 1) + ')';
        if (isGrid) {
          benefitsHtml = '<div class="power-grid">' + benefits.map(function (b) {
            var tag = '<p class="power-req">' + (BENEFIT_TYPE_LABEL[b.type] || cap(b.type || '')) + '</p>';
            var desc = b.desc
              ? '<p class="power-desc">' + escapeHtml(b.desc) + '</p>'
              : '<p class="power-desc">Descrição no livro de origem (busque pelo nome do poder).</p>';
            return powerCard(b.name, tag + desc);
          }).join('') + '</div>';
        } else {
          benefitsHtml = renderBenefitsTable(benefits);
        }
      } else {
        benefitsTitle = 'Benefícios';
        var chipsHtml = (o.autoTraining && o.autoTraining.length)
          ? '<div class="detail-badges skill-chip-row">' + o.autoTraining.map(function (s) {
              return '<span class="badge skill-chip">Treinado: ' + escapeHtml(s) + '</span>';
            }).join('') + '</div>'
          : '';
        var uniqueHtml = o.uniqueBenefit
          ? '<div class="power-grid">' + powerCard(o.uniqueBenefit.name, nl2p(o.uniqueBenefit.desc), 'marca-card') + '</div>'
          : '<p class="power-desc">Nenhum benefício adicional cadastrado.</p>';
        benefitsHtml = chipsHtml + uniqueHtml;
      }

      return '' +
        '<header class="detail-header">' +
        '<div class="detail-heading" style="width:100%">' +
        '<div class="detail-title-row">' +
        '<h2 class="detail-name">' + escapeHtml(o.name) + '</h2>' +
        (benefits.length ? '<button class="view-toggle-btn" title="Alternar entre grade e tabela">' +
        '<span class="view-toggle-icon">' + toggleIcon + '</span>' +
        '<span class="view-toggle-label">' + toggleLabel + '</span>' +
        '</button>' : '') +
        '</div>' +
        '<div class="detail-badges">' + badges + '</div>' +
        '</div>' +
        '</header>' +

        '<h3 class="section-title">Descrição</h3>' +
        '<div class="bonus-message">' + escapeHtml(o.desc || 'Sem descrição cadastrada.') + '</div>' +

        (o.items ? '<h3 class="section-title" style="margin-top:1.25rem">Itens Iniciais</h3><div class="bonus-message">' + escapeHtml(o.items) + '</div>' : '') +

        runeDivider() +

        '<h3 class="section-title">' + escapeHtml(benefitsTitle) + '</h3>' +
        benefitsHtml +

        '<p class="detail-footnote">Dados extraídos do compêndio de origens do VTTArmada T20 — consulte o mestre para eventuais erratas ou regras de mesa.</p>';
    }

    var collection = {
      id: 'origens',
      navLabel: 'Origens',
      labelSingular: 'origem',
      labelPlural: 'origens',
      searchPlaceholder: 'Buscar por nome, perícia, item ou poder...',
      items: items,
      sourceMeta: SOURCE_META,
      sourceOrder: SOURCE_ORDER,
      getSourceKey: function (d) { return d.source; },
      columns: [
        {
          key: 'name', label: 'Nome',
          sortValue: function (d) { return stripAccents(d.name); },
          cellHtml: function (d, meta) { return '<span class="source-dot" style="--source-color:' + meta.color + '"></span><span class="name-text">' + escapeHtml(d.name) + '</span>'; },
          title: function (d, meta) { return meta.label; }
        },
        {
          key: 'fonte', label: 'Fonte',
          sortValue: function (d) { return stripAccents(d.source || ''); },
          cellHtml: function (d, meta) { return escapeHtml(meta.short); },
          title: function (d, meta) { return meta.label + (d.region ? ' — ' + d.region : ''); }
        },
        {
          key: 'beneficios', label: 'Benefícios',
          sortValue: function (d) { return d.chooseCount ? 'a' + d.chooseCount : 'z'; },
          cellHtml: function (d) { return d.chooseCount ? 'Escolha ' + d.chooseCount : 'Fixos'; },
          title: function (d) { return d.chooseCount ? 'Escolha ' + d.chooseCount + ' benefícios' : 'Benefícios automáticos (sem escolha)'; }
        }
      ],
      renderDetail: renderDetail
    };
    return collection;
  }

  // ══════════════════════════════════════════════════════════════════
  //  COLEÇÃO: CLASSES
  // ══════════════════════════════════════════════════════════════════
  function buildClassesCollection() {
    var SOURCE_META = {
      'T20': { label: 'Livro Básico', short: 'Básico', color: '#c9933a' },
      'Dragão Brasil': { label: 'Dragão Brasil', short: 'DB', color: '#e07b39' },
      'A Lenda de Ruff Ghanor': { label: 'A Lenda de Ruff Ghanor', short: 'Ghanor', color: '#8a63b5' }
    };
    var SOURCE_ORDER = ['T20', 'Dragão Brasil', 'A Lenda de Ruff Ghanor'];

    var RAW = (typeof classesData !== 'undefined') ? classesData : [];
    var POWERS_BASE = (typeof powersData !== 'undefined') ? powersData : [];
    var POWERS_DB = (typeof classesDbPowers !== 'undefined') ? classesDbPowers : [];
    var POWERS_DB_BASE = (typeof classesDbBasePowers !== 'undefined') ? classesDbBasePowers : [];
    var POWERS = POWERS_BASE.concat(POWERS_DB).concat(POWERS_DB_BASE);
    var VARIANTS_META = (typeof classesDbVariantsMeta !== 'undefined') ? classesDbVariantsMeta : [];

    function variantMetaFor(classId, variantSlug) {
      for (var i = 0; i < VARIANTS_META.length; i++) {
        var v = VARIANTS_META[i];
        if (v.classId === classId && v.variantSlug === variantSlug) return v;
      }
      return null;
    }

    function slugify(name) {
      return stripAccents(name).replace(/[^a-z0-9]/g, '');
    }

    function countSkills(skills) {
      if (!skills) return '—';
      // Conta quantas perícias fixas (antes da vírgula ou "e")
      var fixed = 0;
      var beforeMais = (skills.split(/mais/i)[0] || '').trim();
      if (beforeMais) {
        // Conta por vírgulas e "e"
        var parts = beforeMais.split(/,|\be\b/).filter(function (s) { return s.trim(); });
        fixed = parts.length;
      }
      // Conta as perícias variáveis (após "mais")
      var match = skills.match(/mais\s+(\d+)/i);
      var variable = match ? parseInt(match[1], 10) : 0;
      var total = fixed + variable;
      return total > 0 ? total : '—';
    }

    function powersForClass(id) {
      return POWERS.filter(function (p) { return p.type === 'class' && p.class === id; });
    }

    function levelInfo(req) {
      var m = /Nível\s*(\d+)/i.exec(req || '');
      var level = m ? parseInt(m[1], 10) : 1;
      var note = (req || '').replace(/Nível\s*\d+\s*/i, '').trim();
      return { level: level, note: note };
    }

    // Observação: as descrições em data.js já vêm com HTML intencional
    // (<br>, <strong>...) para formatação, então não passam por escapeHtml aqui.
    function abilityCard(p) {
      var li = levelInfo(p.req);
      var tag = li.note ? '<p class="power-req">' + escapeHtml(li.note) + '</p>' : '';
      return powerCard('Nível ' + li.level + ' — ' + p.name, tag + '<p class="power-desc">' + (p.desc || '') + '</p>');
    }

    function powerCardWithReq(p) {
      var tag = p.req ? '<p class="power-req">Requer: ' + escapeHtml(p.req) + '</p>' : '';
      return powerCard(p.name, tag + '<p class="power-desc">' + (p.desc || '') + '</p>');
    }

    function stripTags(str) { return (str || '').replace(/<[^>]*>/g, ' '); }

    function renderAbilitiesTable(abilities) {
      var rows = abilities.map(function (p) {
        var li = levelInfo(p.req);
        var desc = (p.desc || '').replace(/<[^>]*>/g, ' ').trim();
        return '<tr class="powers-table-row" data-name="' + escapeHtml(p.name) + '">' +
          '<td class="pt-level">' + li.level + '</td>' +
          '<td class="pt-name">' + escapeHtml(p.name) + '</td>' +
          '<td class="pt-desc">' + escapeHtml(desc) + '</td>' +
          '</tr>';
      }).join('');

      return '<div class="powers-table-wrap">' +
        '<table class="powers-table">' +
        '<thead><tr>' +
        '<th class="pth-level">Nv.</th>' +
        '<th class="pth-name">Nome</th>' +
        '<th class="pth-desc">Descrição</th>' +
        '</tr></thead>' +
        '<tbody>' + rows + '</tbody>' +
        '</table></div>';
    }

    function renderPowersWithReqTable(powers) {
      var rows = powers.map(function (p) {
        var desc = (p.desc || '').replace(/<[^>]*>/g, ' ').trim();
        return '<tr class="powers-table-row" data-name="' + escapeHtml(p.name) + '">' +
          '<td class="pt-name">' + escapeHtml(p.name) + '</td>' +
          '<td class="pt-req">' + escapeHtml(p.req || '—') + '</td>' +
          '<td class="pt-desc">' + escapeHtml(desc) + '</td>' +
          '</tr>';
      }).join('');

      return '<div class="powers-table-wrap">' +
        '<table class="powers-table">' +
        '<thead><tr>' +
        '<th class="pth-name">Nome</th>' +
        '<th class="pth-req">Requisito</th>' +
        '<th class="pth-desc">Descrição</th>' +
        '</tr></thead>' +
        '<tbody>' + rows + '</tbody>' +
        '</table></div>';
    }

    function buildBlob(c) {
      var parts = [c.name, c.desc, c.attribute, c.skills];
      (c.variants || []).forEach(function (v) { parts.push(v.name); });
      powersForClass(c.id).forEach(function (p) { parts.push(p.name, stripTags(p.desc)); });
      return stripAccents(parts.filter(Boolean).join(' | '));
    }

    var items = RAW
      .filter(function (c) { return c && c.id && c.name; })
      .map(function (c) { return { key: c.id, data: c, _blob: buildBlob(c) }; });

    function renderDetail(key) {
      var c = null;
      for (var i = 0; i < RAW.length; i++) { if (RAW[i].id === key) { c = RAW[i]; break; } }
      if (!c) return '';
      var meta = metaFor(collection, c.source);
      var all = powersForClass(c.id);
      var basePathSlug = c.id + '-base';

      var badges = '<span class="badge source" style="--source-color:' + meta.color + '">' + escapeHtml(meta.label) + '</span>';
      badges += '<span class="badge">Atributo-chave: ' + escapeHtml(c.attribute) + '</span>';
      badges += '<span class="badge">PV inicial ' + c.pv + ' · PM ' + c.pm + '/nível</span>';

      var noDataNotice = !all.length
        ? '<div class="bonus-message" style="margin-top:0.85rem">Ainda não há poderes/habilidades cadastrados em <code>data.js</code> para esta classe — por enquanto, só os dados básicos da tabela.</div>'
        : '';

      var baseAbilities = all
        .filter(function (p) { return p.subType === 'ability' && (p.pathReq === 'all' || p.pathReq === basePathSlug); })
        .sort(function (a, b) { return levelInfo(a.req).level - levelInfo(b.req).level; });

      var basePowers = all.filter(function (p) { return p.subType === 'power' && p.pathReq === 'all'; });

      // Caminhos / variantes presentes nos dados (pathReq diferente de 'all' e da base)
      var otherPaths = [];
      all.forEach(function (p) {
        if (p.pathReq && p.pathReq !== 'all' && p.pathReq !== basePathSlug && otherPaths.indexOf(p.pathReq) === -1) {
          otherPaths.push(p.pathReq);
        }
      });

      var pathBlocks = otherPaths.map(function (pathSlug) {
        var variantMeta = (c.variants || []).filter(function (v) { return slugify(v.name) === pathSlug; })[0];
        var label = variantMeta ? variantMeta.name : cap(pathSlug);
        var heading = variantMeta ? 'Variante: ' + label + ' (' + variantMeta.source + ')' : 'Caminho: ' + label;

        var dbMeta = variantMetaFor(c.id, pathSlug);
        var metaHtml = '';
        if (dbMeta) {
          metaHtml = '<div class="bonus-message" style="margin-bottom:0.85rem">' +
            (dbMeta.flavor ? dbMeta.flavor + '<br><br>' : '') +
            '<b>PV.</b> Começa com ' + dbMeta.pvInicial + ' (+Con) e ganha ' + dbMeta.pvPorNivel + ' (+Con) por nível.<br>' +
            '<b>PM.</b> ' + dbMeta.pm + ' por nível.<br>' +
            '<b>Perícias.</b> ' + escapeHtml(dbMeta.skills) +
            (dbMeta.proficiencias ? '<br><b>Proficiências.</b> ' + escapeHtml(dbMeta.proficiencias) : '') +
            '</div>';
        }

        var abilities = all
          .filter(function (p) { return p.subType === 'ability' && p.pathReq === pathSlug; })
          .sort(function (a, b) { return levelInfo(a.req).level - levelInfo(b.req).level; });
        var powers = all.filter(function (p) { return p.subType === 'power' && p.pathReq === pathSlug; });

        var cards = abilities.map(abilityCard).join('') + powers.map(powerCardWithReq).join('');

        return '<div class="variant-block" id="variant-' + pathSlug + '"><p class="variant-label">' + escapeHtml(heading) + '</p>' + metaHtml + '<div class="power-grid">' + (cards || '<p class="power-desc">Nenhum dado cadastrado.</p>') + '</div></div>';
      }).join('');

      // Variantes conhecidas (da tabela) que ainda não têm dados locais em data.js
      var missingVariants = (c.variants || []).filter(function (v) { return otherPaths.indexOf(slugify(v.name)) === -1; });
      var missingHtml = missingVariants.length
        ? '<div class="power-grid">' + missingVariants.map(function (v) {
            return powerCard(
              v.name,
              '<p class="power-req">' + escapeHtml(v.source) + '</p><p class="power-desc">Poderes ainda não digitalizados — <a href="' + v.url + '" target="_blank" rel="noopener">ver na wiki</a>.</p>',
              '',
              'variant-' + slugify(v.name)
            );
          }).join('') + '</div>'
        : '';

      // Links diretos para navegar até as variantes da classe
      var seenTargets = {};
      var variantChips = [];
      otherPaths.forEach(function (pathSlug) {
        var targetId = 'variant-' + pathSlug;
        if (seenTargets[targetId]) return;
        seenTargets[targetId] = true;
        var variantMeta = (c.variants || []).filter(function (v) { return slugify(v.name) === pathSlug; })[0];
        var label = variantMeta ? variantMeta.name : cap(pathSlug);
        var src = variantMeta ? variantMeta.source : '';
        variantChips.push({
          name: label,
          targetId: targetId,
          source: src
        });
      });

      missingVariants.forEach(function (v) {
        var targetId = 'variant-' + slugify(v.name);
        if (seenTargets[targetId]) return;
        seenTargets[targetId] = true;
        variantChips.push({
          name: v.name,
          targetId: targetId,
          source: v.source
        });
      });

      var variantsNavHtml = '';
      if (variantChips.length) {
        variantsNavHtml = '<div class="class-variants-nav">' +
          '<span class="variants-nav-label">Variantes:</span>' +
          variantChips.map(function (v) {
            var title = 'Ir para variante ' + escapeHtml(v.name) + (v.source ? ' (' + escapeHtml(v.source) + ')' : '');
            return '<a href="#' + v.targetId + '" class="variant-nav-chip" data-target="' + v.targetId + '" title="' + title + '">' +
              '<span class="variant-chip-icon" aria-hidden="true">✦</span>' + escapeHtml(v.name) +
              '</a>';
          }).join('') +
          '</div>';
      }

      return '' +
        '<header class="detail-header">' +
        '<div class="detail-heading" style="width:100%">' +
        '<div class="detail-title-row">' +
        '<h2 class="detail-name">' + escapeHtml(c.name) + '</h2>' +
        variantsNavHtml +
        '</div>' +
        '<div class="detail-badges">' + badges + '</div>' +
        '</div>' +
        '</header>' +

        '<h3 class="section-title">Descrição</h3>' +
        '<div class="bonus-message">' + escapeHtml(c.desc || 'Sem descrição cadastrada.') + '</div>' +

        '<h3 class="section-title" style="margin-top:1.25rem">Perícias</h3>' +
        '<div class="bonus-message">' + escapeHtml(c.skillsFull || c.skills || '—') + '</div>' +

        (c.proficiencies ? '<h3 class="section-title" style="margin-top:1.25rem">Proficiências</h3><div class="bonus-message">' + escapeHtml(c.proficiencies) + '</div>' : '') +

        noDataNotice +

        (baseAbilities.length ? runeDivider() + '<div class="detail-title-row"><h3 class="section-title">Progressão de Nível</h3>' +
        '<button class="view-toggle-btn" title="Alternar entre grade e tabela">' +
        '<span class="view-toggle-icon">' + (classesViewMode === 'grid' ? '&#9638;' : '&#9776;') + '</span>' +
        '<span class="view-toggle-label">' + (classesViewMode === 'grid' ? 'Tabela' : 'Grade') + '</span>' +
        '</button></div>' +
        (classesViewMode === 'grid'
          ? '<div class="power-grid">' + baseAbilities.map(abilityCard).join('') + '</div>'
          : renderAbilitiesTable(baseAbilities)) : '') +

        (basePowers.length ? runeDivider() + '<div class="detail-title-row"><h3 class="section-title">Poderes de Classe (escolha livre)</h3>' +
        '<button class="view-toggle-btn" title="Alternar entre grade e tabela">' +
        '<span class="view-toggle-icon">' + (classesViewMode === 'grid' ? '&#9638;' : '&#9776;') + '</span>' +
        '<span class="view-toggle-label">' + (classesViewMode === 'grid' ? 'Tabela' : 'Grade') + '</span>' +
        '</button></div>' +
        (classesViewMode === 'grid'
          ? '<div class="power-grid">' + basePowers.map(powerCardWithReq).join('') + '</div>'
          : renderPowersWithReqTable(basePowers)) : '') +

        (pathBlocks ? runeDivider() + '<h3 class="section-title">Caminhos e Variantes</h3>' + pathBlocks : '') +

        (missingHtml ? runeDivider() + '<h3 class="section-title">Outras Variantes</h3>' + missingHtml : '') +

        '<p class="detail-footnote">Dados extraídos do compêndio de classes do VTTArmada T20 — consulte o mestre para eventuais erratas ou regras de mesa.</p>';
    }

    var collection = {
      id: 'classes',
      navLabel: 'Classes',
      labelSingular: 'classe',
      labelPlural: 'classes',
      searchPlaceholder: 'Buscar por nome, atributo ou poder...',
      items: items,
      sourceMeta: SOURCE_META,
      sourceOrder: SOURCE_ORDER,
      getSourceKey: function (d) { return d.source; },
      columns: [
        {
          key: 'name', label: 'Nome',
          sortValue: function (d) { return stripAccents(d.name); },
          cellHtml: function (d, meta) { return '<span class="source-dot" style="--source-color:' + meta.color + '"></span><span class="name-text">' + escapeHtml(d.name) + '</span>'; },
          title: function (d, meta) { return meta.label; }
        },
        {
          key: 'pvpm', label: 'PV / PM',
          sortValue: function (d) { return d.pv; },
          cellHtml: function (d) { return d.pv + ' / ' + d.pm; },
          title: function (d) { return 'PV ' + d.pv + ' e PM ' + d.pm + ' por nível'; }
        },
        {
          key: 'pericias', label: 'Perícias',
          sortValue: function (d) { return countSkills(d.skills); },
          cellHtml: function (d) { return countSkills(d.skills); },
          title: function (d) { return d.skills || '—'; }
        }
      ],
      renderDetail: renderDetail
    };
    return collection;
  }

  // ══════════════════════════════════════════════════════════════════
  //  COLEÇÃO: OUTROS PODERES (combate, concedidos, destino, grupo,
  //  magia, raciais, tormenta, complicações — tudo que não é de classe)
  // ══════════════════════════════════════════════════════════════════
  var outrosPoderesViewMode = 'grid';
  var racasViewMode = 'grid';
  var origensViewMode = 'grid';
  var classesViewMode = 'grid';
  var distsViewMode = 'grid';

  function buildOutrosPoderesCollection() {
    var TYPE_META = {
      combat: { label: 'Poder de Combate', short: 'Combate', color: '#b5384f' },
      magic: { label: 'Poder Mágico', short: 'Mágico', color: '#4a72b0' },
      destiny: { label: 'Poder de Destino', short: 'Destino', color: '#8a63b5' },
      grupo: { label: 'Poder de Grupo', short: 'Grupo', color: '#4f9d69' },
      conceded: { label: 'Poder Concedido', short: 'Concedido', color: '#c9933a' },
      raca: { label: 'Poder Racial', short: 'Racial', color: '#e07b39' },
      tormenta: { label: 'Poder da Tormenta', short: 'Tormenta', color: '#7a2848' },
      complication: { label: 'Complicação', short: 'Complicação', color: '#666666' }
    };
    var TYPE_ORDER = ['combat', 'magic', 'destiny', 'grupo', 'conceded', 'raca', 'tormenta', 'complication'];

    var RAW = (typeof powersData !== 'undefined')
      ? powersData.filter(function (p) { return p.type !== 'class'; })
      : [];

    function stripTags(str) { return (str || '').replace(/<[^>]*>/g, ' '); }

    // Agrupa poderes por tipo
    var powersByType = {};
    TYPE_ORDER.forEach(function (t) { powersByType[t] = []; });
    RAW.forEach(function (p) {
      if (p && p.name && powersByType[p.type]) {
        powersByType[p.type].push(p);
      }
    });

    // Itens da lista = categorias
    var items = TYPE_ORDER
      .filter(function (t) { return powersByType[t].length > 0; })
      .map(function (t) {
        var powers = powersByType[t];
        var blob = stripAccents(
          [TYPE_META[t].label, TYPE_META[t].short].concat(
            powers.map(function (p) { return p.name + ' | ' + (p.category || '') + ' | ' + (p.req || '') + ' | ' + stripTags(p.desc || ''); })
          ).join(' | ')
        );
        return { key: t, data: { type: t, powers: powers }, _blob: blob };
      });

    function renderPowersGrid(powers) {
      return powers.map(function (p) {
        var req = p.req ? '<p class="power-req">Requer: ' + escapeHtml(p.req) + '</p>' : '';
        var catTag = p.category ? '<p class="power-req">' + escapeHtml(p.category) + '</p>' : '';
        return powerCard(p.name, req + catTag + '<p class="power-desc">' + (p.desc || '') + '</p>');
      }).join('');
    }

    function renderPowersTable(powers) {
      var rows = powers.map(function (p) {
        var desc = (p.desc || '').replace(/<[^>]*>/g, ' ').trim();
        return '<tr class="powers-table-row" data-name="' + escapeHtml(p.name) + '">' +
          '<td class="pt-name">' + escapeHtml(p.name) + '</td>' +
          '<td class="pt-req">' + escapeHtml(p.req || '—') + '</td>' +
          '<td class="pt-desc">' + escapeHtml(desc) + '</td>' +
          '</tr>';
      }).join('');

      return '<div class="powers-table-wrap">' +
        '<table class="powers-table">' +
        '<thead><tr>' +
        '<th class="pth-name">Nome</th>' +
        '<th class="pth-req">Requisito</th>' +
        '<th class="pth-desc">Descrição</th>' +
        '</tr></thead>' +
        '<tbody>' + rows + '</tbody>' +
        '</table></div>';
    }

    function renderDetail(key) {
      var cat = null;
      for (var i = 0; i < items.length; i++) { if (items[i].key === key) { cat = items[i]; break; } }
      if (!cat) return '';
      var meta = TYPE_META[key];
      var powers = cat.data.powers;

      var badges = '<span class="badge source" style="--source-color:' + meta.color + '">' + escapeHtml(meta.label) + '</span>';
      badges += '<span class="badge">' + powers.length + ' poderes</span>';

      var isGrid = outrosPoderesViewMode === 'grid';
      var toggleIcon = isGrid ? '&#9638;' : '&#9776;';
      var toggleLabel = isGrid ? 'Tabela' : 'Grade';

      var powersHtml = isGrid
        ? '<div class="power-grid">' + (renderPowersGrid(powers) || '<p class="power-desc">Nenhum poder cadastrado nesta categoria.</p>') + '</div>'
        : (renderPowersTable(powers) || '<p class="power-desc">Nenhum poder cadastrado nesta categoria.</p>');

      return '' +
        '<header class="detail-header">' +
        '<div class="detail-heading" style="width:100%">' +
        '<div class="detail-title-row">' +
        '<h2 class="detail-name">' + escapeHtml(meta.label) + '</h2>' +
        '<button class="view-toggle-btn" data-view-mode="' + outrosPoderesViewMode + '" title="Alternar entre grade e tabela">' +
        '<span class="view-toggle-icon">' + toggleIcon + '</span>' +
        '<span class="view-toggle-label">' + toggleLabel + '</span>' +
        '</button>' +
        '</div>' +
        '<div class="detail-badges">' + badges + '</div>' +
        '</div>' +
        '</header>' +

        powersHtml +

        '<p class="detail-footnote">Dados extraídos do compêndio de poderes do VTTArmada T20 — consulte o mestre para eventuais erratas ou regras de mesa.</p>';
    }

    var collection = {
      id: 'outros-poderes',
      navLabel: 'Outros Poderes',
      labelSingular: 'categoria',
      labelPlural: 'categorias',
      searchPlaceholder: 'Buscar por nome de poder, categoria ou requisito...',
      items: items,
      sourceMeta: TYPE_META,
      sourceOrder: TYPE_ORDER,
      getSourceKey: function (d) { return d.type; },
      columns: [
        {
          key: 'name', label: 'Categoria',
          sortValue: function (d) { return TYPE_ORDER.indexOf(d.type); },
          cellHtml: function (d, meta) { return '<span class="source-dot" style="--source-color:' + meta.color + '"></span><span class="name-text">' + escapeHtml(meta.label) + '</span>'; },
          title: function (d, meta) { return meta.label; }
        },
        {
          key: 'qtd', label: 'Qtd.',
          sortValue: function (d) { return d.powers.length; },
          cellHtml: function (d) { return d.powers.length + ' poderes'; },
          title: function (d) { return d.powers.length + ' poderes nesta categoria'; }
        }
      ],
      renderDetail: renderDetail
    };
    return collection;
  }

  // ══════════════════════════════════════════════════════════════════
  //  COLEÇÃO: DISTINÇÕES
  // ══════════════════════════════════════════════════════════════════
  function buildDistincoesCollection() {
    var SOURCE_META = {
      herois: { label: 'Heróis de Arton', short: 'Heróis', color: '#4a72b0' },
      deuses: { label: 'Deuses de Arton', short: 'Deuses', color: '#4f9d69' },
      'heróicas': { label: 'Distinções Heroicas', short: 'Heroicas', color: '#c9933a' },
      'revista-tormenta': { label: 'Revista Tormenta', short: 'Revista', color: '#8a63b5' }
    };
    var SOURCE_ORDER = ['herois', 'deuses', 'heróicas', 'revista-tormenta'];

    var RAW = (typeof distincoesData !== 'undefined') ? distincoesData : [];

    function buildBlob(x) {
      var parts = [x.name, x.admissao];
      if (x.marca) parts.push(x.marca.name, x.marca.desc);
      (x.poderes || []).forEach(function (p) { parts.push(p.name, p.req, p.desc); });
      if (x.detalhes) {
        parts.push(x.detalhes.titulo, x.detalhes.conteudo);
        (x.detalhes.arsenal || []).forEach(function (a) { parts.push(a.n, a.d); });
      }
      return stripAccents(parts.filter(Boolean).join(' | '));
    }

    var items = RAW
      .filter(function (x) { return x && x.id && x.name; })
      .map(function (x) { return { key: x.id, data: x, _blob: buildBlob(x) }; });

    function renderDetail(key) {
      var x = null;
      for (var i = 0; i < RAW.length; i++) { if (RAW[i].id === key) { x = RAW[i]; break; } }
      if (!x) return '';
      var meta = metaFor(collection, x.source);
      var poderes = x.poderes || [];

      var badges = '<span class="badge source" style="--source-color:' + meta.color + '">' + escapeHtml(meta.label) + '</span>';
      if (x.exclusiva) badges += '<span class="badge">Exclusiva</span>';
      if (poderes.length) badges += '<span class="badge">' + poderes.length + ' poderes</span>';

      var isGrid = distsViewMode === 'grid';
      var toggleIcon = isGrid ? '&#9638;' : '&#9776;';
      var toggleLabel = isGrid ? 'Tabela' : 'Grade';

      var poderesHtml;
      if (isGrid) {
        poderesHtml = '<div class="power-grid">' + (poderes.map(function (p) {
          var req = p.req ? '<p class="power-req">Requer: ' + escapeHtml(p.req) + '</p>' : '';
          return powerCard(p.name, req + '<p class="power-desc">' + escapeHtml(p.desc) + '</p>');
        }).join('') || '<p class="power-desc">Nenhum poder cadastrado.</p>') + '</div>';
      } else {
        var rows = poderes.map(function (p) {
          var desc = (p.desc || '').replace(/<[^>]*>/g, ' ').trim();
          return '<tr class="powers-table-row" data-name="' + escapeHtml(p.name) + '">' +
            '<td class="pt-name">' + escapeHtml(p.name) + '</td>' +
            '<td class="pt-req">' + escapeHtml(p.req || '—') + '</td>' +
            '<td class="pt-desc">' + escapeHtml(desc) + '</td>' +
            '</tr>';
        }).join('');
        poderesHtml = rows
          ? '<div class="powers-table-wrap"><table class="powers-table"><thead><tr><th class="pth-name">Nome</th><th class="pth-req">Requisito</th><th class="pth-desc">Descrição</th></tr></thead><tbody>' + rows + '</tbody></table></div>'
          : '<p class="power-desc">Nenhum poder cadastrado.</p>';
      }

      var detalhesHtml = '';
      if (x.detalhes) {
        var arsenalHtml = '';
        if (x.detalhes.arsenal && x.detalhes.arsenal.length) {
          arsenalHtml = '<div class="power-grid">' + x.detalhes.arsenal.map(function (a) {
            return powerCard(a.n, '<p class="power-desc">' + escapeHtml(a.d) + '</p>');
          }).join('') + '</div>';
        }
        detalhesHtml = runeDivider() +
          '<h3 class="section-title">' + escapeHtml(x.detalhes.titulo || 'Regras Adicionais') + '</h3>' +
          (x.detalhes.conteudo ? '<div class="bonus-message">' + escapeHtml(x.detalhes.conteudo) + '</div>' : '') +
          (arsenalHtml ? '<div style="margin-top:0.85rem">' + arsenalHtml + '</div>' : '');
      }

      return '' +
        '<header class="detail-header">' +
        '<div class="detail-heading" style="width:100%">' +
        '<div class="detail-title-row">' +
        '<h2 class="detail-name">' + escapeHtml(x.name) + '</h2>' +
        (poderes.length ? '<button class="view-toggle-btn" title="Alternar entre grade e tabela">' +
        '<span class="view-toggle-icon">' + toggleIcon + '</span>' +
        '<span class="view-toggle-label">' + toggleLabel + '</span>' +
        '</button>' : '') +
        '</div>' +
        '<div class="detail-badges">' + badges + '</div>' +
        '</div>' +
        '</header>' +

        '<h3 class="section-title">Admissão</h3>' +
        '<div class="bonus-message">' + escapeHtml(x.admissao || 'Sem requisitos narrativos cadastrados.') + '</div>' +

        runeDivider() +

        '<h3 class="section-title">Marca da Distinção</h3>' +
        '<div class="power-grid">' + (x.marca ? powerCard(x.marca.name, '<p class="power-desc">' + escapeHtml(x.marca.desc) + '</p>', 'marca-card') : '<p class="power-desc">—</p>') + '</div>' +

        runeDivider() +

        '<h3 class="section-title">Poderes da Distinção</h3>' +
        poderesHtml +

        detalhesHtml +

        '<p class="detail-footnote">Dados extraídos do compêndio de distinções do VTTArmada T20 — consulte o mestre para eventuais erratas ou regras de mesa.</p>';
    }

    var collection = {
      id: 'distincoes',
      navLabel: 'Distinções',
      labelSingular: 'distinção',
      labelPlural: 'distinções',
      searchPlaceholder: 'Buscar por nome, requisito ou poder...',
      items: items,
      sourceMeta: SOURCE_META,
      sourceOrder: SOURCE_ORDER,
      getSourceKey: function (d) { return d.source; },
      columns: [
        {
          key: 'name', label: 'Nome',
          sortValue: function (d) { return stripAccents(d.name); },
          cellHtml: function (d, meta) { return '<span class="source-dot" style="--source-color:' + meta.color + '"></span><span class="name-text">' + escapeHtml(d.name) + '</span>'; },
          title: function (d, meta) { return meta.label; }
        },
        {
          key: 'fonte', label: 'Fonte',
          sortValue: function (d) { return stripAccents(d.source || ''); },
          cellHtml: function (d, meta) { return escapeHtml(meta.short); },
          title: function (d, meta) { return meta.label; }
        },
        {
          key: 'exclusiva', label: 'Exclusiva',
          sortValue: function (d) { return d.exclusiva ? 0 : 1; },
          cellHtml: function (d) { return d.exclusiva ? 'Sim' : '—'; },
          title: function (d) { return d.exclusiva ? 'Distinção exclusiva' : 'Distinção não exclusiva'; }
        }
      ],
      renderDetail: renderDetail
    };
    return collection;
  }

  // ══════════════════════════════════════════════════════════════════
  //  MOTOR GENÉRICO
  // ══════════════════════════════════════════════════════════════════
  var COLLECTIONS = {
    racas: buildRacasCollection(),
    origens: buildOrigensCollection(),
    classes: buildClassesCollection(),
    'outros-poderes': buildOutrosPoderesCollection(),
    distincoes: buildDistincoesCollection()
  };
  var COLLECTION_ORDER = ['racas', 'origens', 'classes', 'outros-poderes', 'distincoes'];

  var state = {
    activeId: 'racas',
    byId: {}
  };
  COLLECTION_ORDER.forEach(function (id) {
    var col = COLLECTIONS[id];
    state.byId[id] = {
      query: '',
      activeSources: new Set(sourcesPresent(col)),
      selectedKey: null,
      sortKey: 'source',
      sortDir: 1
    };
  });

  function sourcesPresent(col) {
    var seen = {};
    col.items.forEach(function (r) { seen[col.getSourceKey(r.data)] = true; });
    return col.sourceOrder.filter(function (s) { return seen[s]; })
      .concat(Object.keys(seen).filter(function (s) { return col.sourceOrder.indexOf(s) === -1; }));
  }

  function current() { return COLLECTIONS[state.activeId]; }
  function cState() { return state.byId[state.activeId]; }

  // ── Elementos ─────────────────────────────────────────────────────
  var tableBodyEl = document.getElementById('race-table-body');
  var tableHeadEl = document.querySelector('#race-table thead');
  var searchInput = document.getElementById('search-input');
  var filtersEl = document.getElementById('source-filters');
  var resultCountEl = document.getElementById('result-count');
  var clearBtn = document.getElementById('clear-filters');
  var detailEmpty = document.getElementById('detail-empty');
  var detailContent = document.getElementById('detail-content');
  var backBtn = document.getElementById('back-to-list');
  var mainEl = document.getElementById('app-main');
  var tabBarEl = document.getElementById('collection-tabs');

  // ── Modal ─────────────────────────────────────────────────────────
  var modalOverlay = document.getElementById('modal-overlay');
  var modalBody = document.getElementById('modal-body');
  var modalClose = document.getElementById('modal-close');
  var modalPrev = document.getElementById('modal-prev');
  var modalNext = document.getElementById('modal-next');
  var modalCurrentIndex = -1;
  var currentPowerCards = null;

  // ── Abas de coleção ─────────────────────────────────────────────
  function renderTabs() {
    if (!tabBarEl) return;
    tabBarEl.innerHTML = COLLECTION_ORDER.map(function (id) {
      var col = COLLECTIONS[id];
      return '<button type="button" class="tab-btn' + (state.activeId === id ? ' active' : '') + '" data-collection="' + id + '" role="tab" aria-selected="' + (state.activeId === id) + '">' + escapeHtml(col.navLabel) + '</button>';
    }).join('');
    tabBarEl.querySelectorAll('.tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { switchCollection(btn.dataset.collection); });
    });
  }

  function switchCollection(id) {
    if (!COLLECTIONS[id] || state.activeId === id) return;
    state.activeId = id;
    mainEl.classList.remove('showing-detail');
    detailEmpty.classList.remove('hidden');
    detailContent.classList.add('hidden');
    detailContent.innerHTML = '';
    searchInput.value = cState().query;
    searchInput.placeholder = current().searchPlaceholder;
    renderTabs();
    renderTableHead();
    renderFilters();
    renderList();
  }

  // ── Cabeçalho da tabela (colunas variam por coleção) ─────────────
  function renderTableHead() {
    var col = current();
    tableHeadEl.innerHTML = '<tr>' + col.columns.map(function (c) {
      return '<th class="sortable" data-sort="' + c.key + '">' + escapeHtml(c.label) + '<span class="sort-arrow"></span></th>';
    }).join('') + '</tr>';

    tableHeadEl.querySelectorAll('th.sortable').forEach(function (th) {
      th.addEventListener('click', function () {
        var key = th.dataset.sort;
        var st = cState();
        // A primeira coluna (Nome) é especial: "esconde" o modo 'source' (ordem por livro).
        // source → name (asc) → name (desc) → source ...
        if (key === 'name') {
          if (st.sortKey === 'source') {
            st.sortKey = 'name'; st.sortDir = 1;
          } else if (st.sortKey === 'name' && st.sortDir === 1) {
            st.sortDir = -1;
          } else {
            st.sortKey = 'source'; st.sortDir = 1;
          }
        } else if (st.sortKey === key) {
          st.sortDir *= -1;
        } else {
          st.sortKey = key; st.sortDir = 1;
        }
        renderList();
      });
    });
  }

  // ── Filtros de fonte (chips) ───────────────────────────────────────
  function renderFilters() {
    var col = current();
    var st = cState();
    var present = sourcesPresent(col);
    filtersEl.innerHTML = '';
    present.forEach(function (sourceKey) {
      var meta = metaFor(col, sourceKey);
      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'filter-chip' + (st.activeSources.has(sourceKey) ? ' active' : '');
      chip.style.setProperty('--chip-color', meta.color);
      chip.innerHTML = '<span class="dot"></span>' + meta.short;
      chip.addEventListener('click', function () {
        if (st.activeSources.has(sourceKey)) st.activeSources.delete(sourceKey);
        else st.activeSources.add(sourceKey);
        renderFilters();
        renderList();
      });
      filtersEl.appendChild(chip);
    });
  }

  // ── Lista ─────────────────────────────────────────────────────────
  function getFiltered() {
    var col = current();
    var st = cState();
    var q = stripAccents(st.query.trim());
    return col.items.filter(function (r) {
      if (!st.activeSources.has(col.getSourceKey(r.data))) return false;
      if (q && r._blob.indexOf(q) === -1) return false;
      return true;
    });
  }

  function sourceIndex(col, key) {
    var i = col.sourceOrder.indexOf(key);
    return i === -1 ? 999 : i;
  }

  function sortValue(col, r, key) {
    if (key === 'source') return sourceIndex(col, col.getSourceKey(r.data));
    var column = col.columns.filter(function (c) { return c.key === key; })[0];
    if (column) return column.sortValue(r.data);
    return stripAccents(r.data.name);
  }

  function renderSortIndicators() {
    var st = cState();
    tableHeadEl.querySelectorAll('th.sortable').forEach(function (th) {
      var key = th.dataset.sort;
      var arrow = th.querySelector('.sort-arrow');
      var isSorted = (st.sortKey === key) || (key === 'name' && st.sortKey === 'source');
      th.classList.toggle('sorted', isSorted);
      arrow.textContent = isSorted ? (st.sortDir === 1 ? '▲' : '▼') : '';
      if (key === 'name') {
        th.title = st.sortKey === 'source'
          ? 'Ordenado por livro (clique para A→Z)'
          : (st.sortDir === 1 ? 'A→Z' : 'Z→A') + ' (clique duplo para voltar a agrupar por livro)';
      }
    });
  }

  function renderList() {
    var col = current();
    var st = cState();
    var filtered = getFiltered();
    resultCountEl.textContent = filtered.length + ' ' + (filtered.length === 1 ? col.labelSingular : col.labelPlural);
    renderSortIndicators();

    if (!filtered.length) {
      tableBodyEl.innerHTML = '<tr><td colspan="' + col.columns.length + '" class="no-results">Nenhuma ' + col.labelSingular + ' encontrada com esses filtros.</td></tr>';
      return;
    }

    filtered.sort(function (a, b) {
      var va = sortValue(col, a, st.sortKey);
      var vb = sortValue(col, b, st.sortKey);
      if (va < vb) return -1 * st.sortDir;
      if (va > vb) return 1 * st.sortDir;
      return a.data.name.localeCompare(b.data.name, 'pt-BR');
    });

    var html = filtered.map(function (r) {
      var d = r.data;
      var meta = metaFor(col, col.getSourceKey(d));
      var cells = col.columns.map(function (c, idx) {
        var cls = idx === 0 ? 'col-name' : (idx === 1 ? 'col-2' : 'col-3');
        var title = c.title ? c.title(d, meta) : '';
        return '<td class="' + cls + '" title="' + escapeHtml(title) + '">' + c.cellHtml(d, meta) + '</td>';
      }).join('');
      return '<tr class="race-row' + (st.selectedKey === r.key ? ' active' : '') + '" style="--source-color:' + meta.color + '" data-key="' + r.key + '" role="option" tabindex="0">' + cells + '</tr>';
    }).join('');

    tableBodyEl.innerHTML = html;

    tableBodyEl.querySelectorAll('.race-row').forEach(function (row) {
      row.addEventListener('click', function () { selectItem(row.dataset.key); });
      row.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectItem(row.dataset.key); }
      });
    });
  }

  // ── Ficha detalhada ────────────────────────────────────────────────
  function renderDetail(key) {
    var col = current();
    var html = col.renderDetail(key);
    if (!html) return;

    detailContent.innerHTML = html;
    detailEmpty.classList.add('hidden');
    detailContent.classList.remove('hidden');

    cState().selectedKey = key;
    mainEl.classList.add('showing-detail');
    renderList();
    detailContent.scrollTop = 0;
    document.getElementById('detail-pane').scrollTop = 0;
  }

  function selectItem(key) {
    renderDetail(key);
  }

  function openModal(powerCards, index) {
    if (!powerCards || !powerCards.length) return;

    modalCurrentIndex = index;
    renderModalPower(powerCards, index);
    modalOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    updateModalNav(powerCards.length);
  }

  function renderModalPower(powerCards, index) {
    var card = powerCards[index];
    if (!card) return;

    var name, desc, req;
    if (card.nodeType === 1) {
      name = card.querySelector('.power-name');
      desc = card.querySelector('.power-desc');
      req = card.querySelector('.power-req');
      name = name ? name.textContent : '';
      desc = desc ? desc.innerHTML : '';
      req = req ? req.textContent : '';
    } else {
      name = card.name || '';
      desc = card.desc || '';
      req = card.req || '';
    }

    var html = '<div class="modal-power-detail">';
    html += '<h2 class="detail-name">' + escapeHtml(name) + '</h2>';
    if (req) html += '<p class="power-req">' + escapeHtml(req) + '</p>';
    html += '<div class="bonus-message">';
    html += desc || '<p class="power-desc">—</p>';
    html += '</div></div>';

    modalBody.innerHTML = html;
    modalBody.scrollTop = 0;
  }

  function closeModal() {
    modalOverlay.classList.add('hidden');
    modalBody.innerHTML = '';
    document.body.style.overflow = '';
    modalCurrentIndex = -1;
    currentPowerCards = null;
  }

  function navigateModal(direction) {
    if (!currentPowerCards) return;

    var newIndex = modalCurrentIndex + direction;
    if (newIndex < 0 || newIndex >= currentPowerCards.length) return;

    modalCurrentIndex = newIndex;
    renderModalPower(currentPowerCards, newIndex);
    updateModalNav(currentPowerCards.length);
  }

  function updateModalNav(total) {
    modalPrev.disabled = modalCurrentIndex <= 0;
    modalNext.disabled = modalCurrentIndex >= total - 1;
  }

  // ── Eventos globais ──────────────────────────────────────────────
  searchInput.addEventListener('input', function (e) {
    cState().query = e.target.value;
    renderList();
  });

  clearBtn.addEventListener('click', function () {
    var st = cState();
    st.query = '';
    searchInput.value = '';
    st.activeSources = new Set(sourcesPresent(current()));
    renderFilters();
    renderList();
  });

  backBtn.addEventListener('click', function () {
    mainEl.classList.remove('showing-detail');
  });

  // ── Eventos do modal ─────────────────────────────────────────────
  modalClose.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) closeModal();
  });

  modalPrev.addEventListener('click', function () { navigateModal(-1); });
  modalNext.addEventListener('click', function () { navigateModal(1); });

  document.addEventListener('keydown', function (e) {
    if (modalOverlay.classList.contains('hidden')) return;

    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      navigateModal(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      navigateModal(1);
    }
  });

  // ── Power cards → modal ────────────────────────────────────────────
  detailContent.addEventListener('click', function (e) {
    // Toggle view mode (grid/table)
    var toggleBtn = e.target.closest('.view-toggle-btn');
    if (toggleBtn) {
      var activeId = state.activeId;
      if (activeId === 'racas') racasViewMode = racasViewMode === 'grid' ? 'table' : 'grid';
      else if (activeId === 'origens') origensViewMode = origensViewMode === 'grid' ? 'table' : 'grid';
      else if (activeId === 'classes') classesViewMode = classesViewMode === 'grid' ? 'table' : 'grid';
      else if (activeId === 'outros-poderes') outrosPoderesViewMode = outrosPoderesViewMode === 'grid' ? 'table' : 'grid';
      else if (activeId === 'distincoes') distsViewMode = distsViewMode === 'grid' ? 'table' : 'grid';
      var st = cState();
      if (st.selectedKey) renderDetail(st.selectedKey);
      return;
    }

    // Clique em linha da tabela → abrir modal
    var tableRow = e.target.closest('.powers-table-row');
    if (tableRow) {
      var name = tableRow.getAttribute('data-name');
      var st = cState();
      var activeId = state.activeId;
      var item = null;
      var allItems = current().items;
      for (var i = 0; i < allItems.length; i++) {
        if (allItems[i].key === st.selectedKey) { item = allItems[i]; break; }
      }
      if (item) {
        var powers = [];
        if (activeId === 'outros-poderes') {
          powers = item.data.powers || [];
        } else if (activeId === 'racas') {
          powers = item.data.racialPowers || [];
        } else if (activeId === 'origens') {
          powers = item.data.benefits || [];
        } else if (activeId === 'classes') {
          var all = powersForClass(item.data.id);
          powers = all.filter(function (p) { return p.subType === 'ability' || p.subType === 'power'; });
        } else if (activeId === 'distincoes') {
          powers = item.data.poderes || [];
        }
        var idx = -1;
        for (var j = 0; j < powers.length; j++) {
          if (powers[j].name === name) { idx = j; break; }
        }
        if (idx >= 0) {
          currentPowerCards = powers;
          openModal(powers, idx);
        }
      }
      return;
    }

    // Navegação de variantes (manter existente)
    var chip = e.target.closest('.variant-nav-chip, a[href^="#variant-"]');
    if (chip) {
      var targetId = chip.getAttribute('data-target') || (chip.getAttribute('href') || '').replace(/^#/, '');
      if (targetId) {
        var targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          targetEl.classList.remove('variant-highlight');
          void targetEl.offsetWidth;
          targetEl.classList.add('variant-highlight');
        }
      }
      return;
    }

    // Clique em power card → abrir modal
    var card = e.target.closest('.power-card');
    if (!card) return;

    // Coleta todos os power cards visíveis no detalhe
    var allCards = Array.from(detailContent.querySelectorAll('.power-card'));
    var index = allCards.indexOf(card);
    if (index === -1) return;

    currentPowerCards = allCards;
    openModal(allCards, index);
  });

  // ── Descrições colapsáveis ────────────────────────────────────────
  function initCollapsibleDescs() {
    // Usar requestAnimationFrame duplo para garantir que o DOM está renderizado
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        // Descrições de poderes
        var descs = detailContent.querySelectorAll('.power-desc');
        descs.forEach(function (desc) {
          if (desc.scrollHeight <= desc.clientHeight + 10) {
            desc.classList.add('short');
            return;
          }
          desc.addEventListener('click', function () {
            desc.classList.toggle('expanded');
          });
        });

        // Mensagens de bônus em variantes
        var bonusMsgs = detailContent.querySelectorAll('.variant-block .bonus-message');
        bonusMsgs.forEach(function (msg) {
          if (msg.scrollHeight <= msg.clientHeight + 10) {
            msg.classList.add('short');
            return;
          }
          msg.classList.add('collapsible');
          msg.addEventListener('click', function () {
            msg.classList.toggle('expanded');
          });
        });
      });
    });
  }

  // ── Botão voltar ao topo ──────────────────────────────────────────
  var backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Inicialização ────────────────────────────────────────────────
  searchInput.placeholder = current().searchPlaceholder;
  renderTabs();
  renderTableHead();
  renderFilters();
  renderList();

  // Observar mudanças no detailContent para inicializar colapsáveis
  var observer = new MutationObserver(function () {
    if (detailContent.innerHTML) {
      initCollapsibleDescs();
    }
  });
  observer.observe(detailContent, { childList: true });
})();
