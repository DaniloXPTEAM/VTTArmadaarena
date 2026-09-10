import re

R = '/home/user/arsenal/'
SHARED = '../assets/templates/theme-init.js'
log = []

def load(path):
    raw = open(R + path, 'rb').read()
    crlf = b'\r\n' in raw
    text = raw.decode('utf-8', errors='replace')
    if crlf: text = text.replace('\r\n', '\n')
    return text, crlf

def save(path, text, crlf):
    if crlf: text = text.replace('\n', '\r\n')
    open(R + path, 'wb').write(text.encode('utf-8'))

def del_span(path, start_marker, end_marker, descr, end_is_first_after=True):
    """Deleta do start_marker até o fim do end_marker (primeira ocor. após start)."""
    text, crlf = load(path)
    assert text.count(start_marker) == 1, f"{path}: start não-único: {start_marker[:60]!r}"
    si = text.index(start_marker)
    if end_is_first_after:
        ei = text.index(end_marker, si) + len(end_marker)
    else:
        ei = text.rindex(end_marker) + len(end_marker)
    # inclui quebra(s) de linha sobrando após o bloco (máx 2)
    rest = text[ei:]
    stripped = rest.lstrip('\n')
    removed_lf = len(rest) - len(stripped)
    ei += min(removed_lf, 2 if stripped.startswith('\n') else removed_lf)
    # garante 1 linha em branco onde havia bloco no meio de código? não: só remove
    deleted = text[si:ei]
    text = text[:si] + text[ei:]
    # colapsa 3+ quebras em 2 (evita buracos)
    text = re.sub(r'\n{4,}', '\n\n\n', text)
    save(path, text, crlf)
    log.append(f"DEL-BLOCO {path} [{descr}] ({len(deleted)} chars)")

def insert_before_line_with(path, needle, new_line, descr):
    text, crlf = load(path)
    lines = text.split('\n')
    idx = [i for i, l in enumerate(lines) if needle in l]
    assert len(idx) == 1, f"{path}: âncora {needle!r} achada {len(idx)}x"
    i = idx[0]
    indent = lines[i][:len(lines[i]) - len(lines[i].lstrip())]
    lines.insert(i, indent + new_line)
    save(path, '\n'.join(lines), crlf)
    log.append(f"INSERT {path} [{descr}] antes de: {lines[i+1].strip()[:60]!r}")

def insert_after_line_with(path, needle, new_line, descr):
    text, crlf = load(path)
    lines = text.split('\n')
    idx = [i for i, l in enumerate(lines) if needle in l]
    assert len(idx) == 1, f"{path}: âncora {needle!r} achada {len(idx)}x"
    i = idx[0]
    indent = lines[i][:len(lines[i]) - len(lines[i].lstrip())]
    lines.insert(i + 1, indent + new_line)
    save(path, '\n'.join(lines), crlf)
    log.append(f"INSERT {path} [{descr}] após: {lines[i].strip()[:60]!r}")

def replace_span(path, start_marker, end_marker, replacement, descr):
    text, crlf = load(path)
    assert text.count(start_marker) == 1, f"{path}: start não-único: {start_marker[:60]!r}"
    si = text.index(start_marker)
    ei = text.index(end_marker, si) + len(end_marker)
    text = text[:si] + replacement + text[ei:]
    save(path, text, crlf)
    log.append(f"REPLACE {path} [{descr}]")

TAG = '<script src="' + SHARED + '"></script>'

# ============ 1. DELEÇÕES DE IIFE EM .js ============
del_span('EncontrosAleatorios/js.js', '    // ===== TEMA (SANGUE / SOMBRAS / CLÁSSICO) =====',
         '    })();', 'IIFE tema')
del_span('STR/script.js', '    // --- TEMA ---', '    })();', 'IIFE tema')
del_span('combate/script.js', '  // ===== TEMA SANGUE/SOMBRAS/CLÁSSICO =====',
         '  })();', 'IIFE tema')
del_span('espolio/js.js', '// ===================== TEMAS =====================',
         '})();', 'IIFE tema')
# libertacao: expande início até a linha ==== anterior ao título TEMA
t, c = load('libertacao/script.js')
anchor = '  // TEMA (SANGUE / SOMBRAS / CLÁSSICO)'
assert t.count(anchor) == 1
si = t.index(anchor)
start_eq = t.rindex('  // ====', 0, si)
assert si - start_eq < 120
ei = t.index('  })();', si) + len('  })();')
t = t[:start_eq] + t[ei:]
t = re.sub(r'\n{4,}', '\n\n\n', t)
save('libertacao/script.js', t, c)
log.append('DEL-BLOCO libertacao/script.js [IIFE tema]')
del_span('grimorio/app.js', '    // ===== TEMA SANGUE/SOMBRAS/CLÁSSICO =====',
         '    })();', 'IIFE tema')
del_span('perigos/script.js', '//  TEMA SANGUE/SOMBRAS/CLÁSSICO', '})();', 'IIFE tema')
del_span('poderes/js/main.js', '// ===== TEMA SANGUE/SOMBRAS/CLÁSSICO =====',
         '})();', 'IIFE tema')
# itens: fim = fechamento do forEach de listeners (indentado 4)
t, c = load('itens/script.js')
start_m = '    // Inicialização do Tema Sangue/Sombras/Clássico'
assert t.count(start_m) == 1
si = t.index(start_m)
click = t.index("btn.addEventListener('click'", si)
ei = t.index('\n    });\n', click) + len('\n    });')
t = t[:si] + t[ei:]
t = re.sub(r'\n{4,}', '\n\n\n', t)
save('itens/script.js', t, c)
log.append('DEL-BLOCO itens/script.js [função tema + listeners]')

# ============ 2. AMEACAS: delegar (mantém currentTheme + listeners) ============
t, c = load('ameacas/app.js')
old_fn_start = '// 10. Theme Switcher\nfunction applyTheme(theme) {'
assert t.count(old_fn_start) == 1
si = t.index(old_fn_start)
load_fn = '\nfunction loadSavedTheme() {'
ei = t.index(load_fn, si)
new_fn = ('// 10. Theme Switcher (lógica centralizada em assets/templates/theme-init.js)\n'
          'function applyTheme(theme) {\n'
          '    currentTheme = theme;\n'
          '    if (window.arsenalApplyTheme) window.arsenalApplyTheme(theme);\n'
          '}\n')
t = t[:si] + new_fn + t[ei+1:]
save('ameacas/app.js', t, c)
log.append('REPLACE ameacas/app.js [applyTheme delega p/ compartilhado]')

# ============ 3. MACROS: deleta bloco morto macroTheme no script.js ============
t, c = load('macrosroll20/script.js')
dead_start = '//  TEMA (CLARO / ESCURO / CLÁSSICO)'
assert t.count(dead_start) == 1
si = t.index(dead_start)
# volta até o header ==== anterior
si = t.rindex('// ====', 0, si)
ei = t.index('})();', si) + len('})();')
t = t[:si] + t[ei:].lstrip('\n')
assert 'macroTheme' not in t
save('macrosroll20/script.js', t, c)
log.append('DEL-BLOCO macrosroll20/script.js [macroTheme morto]')

# ============ 4. HTML: blocos standalone -> tag compartilhada ============
replace_span('golpe/index.html', '<script>\n(function(){\n  var body = document.body;',
             '</script>', TAG, 'bloco tema -> compartilhado')
replace_span('calculadora/index.html', '<!-- Toggle tema -->', '</script>',
             '<!-- Tema: sistema compartilhado do Arsenal -->\n' + TAG, 'bloco tema -> compartilhado')
replace_span('calculadoraND_Tormenta/index.html',
             '<script>\n(function () {\n  var body = document.body;\n  var key =',
             '</script>', TAG, 'bloco tema -> compartilhado')
replace_span('campanha/index.html',
             '<script>\n(function () {\n  var body = document.body;\n  var html = document.documentElement;\n  var key =',
             '</script>', TAG, 'bloco tema -> compartilhado')
replace_span('macrosroll20/index.html',
             '<script>\n(function () {\n  var body = document.body;\n  var html = document.documentElement;\n  var key =',
             '</script>', TAG, 'bloco tema -> compartilhado')

# ============ 5. HTML: blocos mid-script (deleta IIFE + insere tag) ============
# dados: deleta da lógica até })(); e insere tag após o </script> seguinte
t, c = load('dados/index.html')
si = t.index('// Theme Switcher Logic')
assert t.count('// Theme Switcher Logic') == 1
ei = t.index('})();', si) + len('})();')
t = t[:si] + t[ei:]
script_close = t.index('</script>', si) + len('</script>')
t = t[:script_close] + '\n' + TAG + t[script_close:]
save('dados/index.html', t, c)
log.append('REPLACE dados/index.html [IIFE tema -> tag compartilhada]')

# parceiros e hub: deleta IIFE, insere tag antes do <script> que a contém
for path in ['parceiros/index.html', 'index.html']:
    t, c = load(path)
    si = t.index("    (function () {\n      var body = document.body;\n      var key = 't20_theme';")
    ei = t.index('    })();', si) + len('    })();')
    t = t[:si] + t[ei:]
    t = re.sub(r'\n{4,}', '\n\n\n', t)
    script_open = t.rindex('<script', 0, si)
    line_start = t.rindex('\n', 0, script_open) + 1
    indent = t[line_start:script_open]
    indent = indent if indent.strip() == '' else '  '
    t = t[:line_start] + indent + TAG + '\n' + t[line_start:]
    save(path, t, c)
    log.append(f'REPLACE {path} [IIFE tema -> tag compartilhada]')

# VTT ficha: deleta funções + init, insere tag após ameacas_db
t, c = load('Vtt/ficha-vtt.html')
si = t.index('//  SISTEMA DE ALTERNÂNCIA DE TEMA (CLARO / ESCURO)')
si = t.rindex('// ====', 0, si)
end_call = "document.addEventListener('DOMContentLoaded', () => {\n    initTheme();\n});"
assert t.count(end_call) == 1
ei = t.index(end_call, si) + len(end_call)
t = t[:si] + t[ei:]
t = re.sub(r'\n{4,}', '\n\n\n', t)
save('Vtt/ficha-vtt.html', t, c)
log.append('DEL-BLOCO Vtt/ficha-vtt.html [applyFichaTheme/initTheme]')
assert 'applyFichaTheme' not in t and 'initTheme();' not in t
insert_after_line_with('Vtt/ficha-vtt.html', '../ameacas/db/ameacas_db.js', TAG,
                       'tag compartilhada após ameacas_db')

# ============ 6. HTML: insere tag antes do script do app (módulos .js) ============
insert_before_line_with('EncontrosAleatorios/index.html', 'src="js.js"', TAG, 'tag tema')
insert_before_line_with('STR/index.html', 'src="script.js"', TAG, 'tag tema')
insert_before_line_with('ameacas/index.html', 'src="app.js"', TAG, 'tag tema')
insert_before_line_with('combate/index.html', 'src="script.js"', TAG, 'tag tema')
insert_before_line_with('espolio/index.html', 'src="js.js"', TAG, 'tag tema')
insert_before_line_with('grimorio/index.html', 'src="app.js"', TAG, 'tag tema')
insert_before_line_with('itens/index.html', 'src="script.js"', TAG, 'tag tema')
insert_before_line_with('libertacao/index.html', 'src="script.js"', TAG, 'tag tema')
insert_before_line_with('perigos/index.html', 'src="script.js"', TAG, 'tag tema')
insert_before_line_with('poderes/index.html', 'src="js/main.js"', TAG, 'tag tema')

# ============ 7. VTT index: botões + tag + CSS bridge ============
t, c = load('Vtt/index.html')
anchor = '<div class="header-actions">'
assert t.count(anchor) == 1
buttons = (anchor + '\n            <!-- Tema: sistema compartilhado do Arsenal -->\n'
           '            <div class="theme-switcher" id="theme-switcher">\n'
           '              <button class="theme-btn" data-theme="blood" title="Tema Sangue (padrão)">🩸</button>\n'
           '              <button class="theme-btn" data-theme="dark" title="Tema Sombras">🌑</button>\n'
           '              <button class="theme-btn" data-theme="classic" title="Tema Clássico">📜</button>\n'
           '            </div>')
t = t.replace(anchor, buttons)
save('Vtt/index.html', t, c)
log.append('INSERT Vtt/index.html [botões de tema no header-actions]')
insert_before_line_with('Vtt/index.html', 'src="app.js"', TAG, 'tag tema')

bridge = '''
/* ==========================================================================
   ARSENAL – PONTES DE TEMA (Sombras / Clássico) + botões .theme-btn
   Controlado por assets/templates/theme-init.js (chave t20_theme).
   O visual padrão (pergaminho) permanece intacto no :root acima.
   ========================================================================== */
.theme-dark {
  --parch: #0b0d14; --parch2: #11131e; --parch3: #1a1e2e;
  --border: #2a2e3d; --border-bright: #c9933a;
  --gold: #c9933a; --gold-light: #e8c87a;
  --text: #e2d8c3; --text-dim: #a89f8a; --text-muted: #6b6354;
  --red: #8b2a2a; --red-bright: #e0483f;
  --ink: #d4c4a8;
}
.theme-classic {
  --parch: #f0ece4; --parch2: #ffffff; --parch3: #e6e0d2;
  --border: #b0b8c8; --border-bright: #2c3e50;
  --gold: #8a6508; --gold-light: #b8860b;
  --text: #2c3e50; --text-dim: #4a5568; --text-muted: #7f8c8d;
  --red: #c0392b; --red-bright: #e74c3c;
  --ink: #2c3e50;
}
.theme-switcher { display: inline-flex; gap: 6px; align-items: center; margin-left: 8px; }
.theme-btn {
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid var(--border);
  font-size: 1rem; padding: 5px 8px; border-radius: 6px;
  cursor: pointer; line-height: 1;
  transition: border-color 0.15s ease, background 0.15s ease;
}
.theme-btn:hover { border-color: var(--gold-light); }
.theme-btn.active { background: rgba(201, 147, 58, 0.25); border-color: var(--gold); }
.theme-classic .theme-btn { background: rgba(44, 62, 80, 0.06); }
'''
t, c = load('Vtt/style.css')
assert 'ARSENAL – PONTES DE TEMA' not in t
if not t.endswith('\n'): t += '\n'
t += bridge
save('Vtt/style.css', t, c)
log.append('INSERT Vtt/style.css [bridge .theme-dark/.theme-classic + .theme-btn]')

print('\n'.join(log))
print(f'\nOK: {len(log)} operações')
