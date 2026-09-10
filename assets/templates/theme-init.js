/**
 * VTTARMADA – INICIALIZADOR DE TEMA (compartilhado por todos os módulos)
 * Arquivo: assets/templates/theme-init.js  (v2 — unificado)
 *
 * Uso: adicione antes do script do app (ou antes do fechamento do body):
 *   <script src="../assets/templates/theme-init.js"></script>
 *
 * Requer no HTML (normalmente no cabeçalho):
 *   <button class="theme-btn" data-theme="blood"   title="Tema Tormenta">🩸</button>
 *   <button class="theme-btn" data-theme="dark"    title="Tema Sombras">🌑</button>
 *   <button class="theme-btn" data-theme="classic" title="Tema Clássico">📜</button>
 *
 * Temas: 'blood' (padrão) | 'dark' | 'classic'.
 * Classes aplicadas em <body> E <html>: theme-blood | theme-dark | theme-classic.
 * Chave: 't20_theme' (+ migração automática das chaves legadas de cada app).
 * Extras: sincroniza abas abertas via evento 'storage'; expõe
 * window.vttArmadaApplyTheme(theme) para integrações (ex: ameacas/app.js).
 */

(function initTheme() {
  var STORAGE_KEY = 't20_theme';

  // Chaves legadas da época em que cada app era um programa separado.
  // Mantidas aqui para migrar automaticamente o tema de quem já usava o VTTArmada.
  var LEGACY_KEYS = ['hubTheme', 'diceTheme', 'grimorioTheme', 'poderesTheme',
    'perigosTheme', 'encontrosTheme', 'liberTheme', 'strTheme', 'calculadoraTheme',
    'calculadoraNDTheme', 'campanhaTheme', 'r20Theme', 't20FichaTheme'];

  var THEME_CLASSES = ['theme-blood', 'theme-dark', 'theme-classic'];

  /**
   * Aplica o tema ao <body> e <html>, marca o botão ativo e persiste.
   * @param {string} theme  'blood' | 'dark' | 'classic'
   */
  function applyTheme(theme) {
    if (theme !== 'dark' && theme !== 'classic') theme = 'blood';

    var body = document.body;
    var html = document.documentElement;
    for (var i = 0; i < THEME_CLASSES.length; i++) {
      body.classList.remove(THEME_CLASSES[i]);
      html.classList.remove(THEME_CLASSES[i]);
    }
    var cls = theme === 'dark' ? 'theme-dark'
            : theme === 'classic' ? 'theme-classic' : 'theme-blood';
    body.classList.add(cls);
    html.classList.add(cls);

    document.querySelectorAll('.theme-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
    });

    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* modo privado */ }
    return theme;
  }

  /**
   * Tema salvo, com fallback para as chaves legadas e para 'blood'.
   * @returns {string}
   */
  function getSavedTheme() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* modo privado */ }
    if (saved === 'dark' || saved === 'classic' || saved === 'blood') return saved;

    try {
      for (var i = 0; i < LEGACY_KEYS.length; i++) {
        var v = localStorage.getItem(LEGACY_KEYS[i]);
        if (v === 'dark') return 'dark';
        if (v === 'classic' || v === 'light') return 'classic';
        if (v === 'blood') return 'blood';
      }
    } catch (e) { /* modo privado */ }

    return 'blood'; // padrão
  }

  function bind() {
    applyTheme(getSavedTheme());

    // Registra os listeners nos botões de tema (sem duplicar se rodar 2x)
    document.querySelectorAll('.theme-btn').forEach(function (btn) {
      if (btn.__vttArmadaThemeBound) return;
      btn.__vttArmadaThemeBound = true;
      btn.addEventListener('click', function () {
        applyTheme(btn.getAttribute('data-theme') || 'blood');
      });
    });
  }

  // Sincroniza abas abertas: mudou o tema numa, atualiza as outras
  window.addEventListener('storage', function (e) {
    if (e.key === STORAGE_KEY && e.newValue) applyTheme(e.newValue);
  });

  // --- Inicialização (funciona com script no head ou no fim do body) ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }

  // Expõe globalmente para integrações (ex: ameacas/app.js mantém currentTheme)
  window.vttArmadaApplyTheme = applyTheme;
  window.vttArmadaGetTheme = getSavedTheme;
})();
