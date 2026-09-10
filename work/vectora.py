import re, os, hashlib

R = '/home/user/VTTArmada/'
BKP = '/home/user/work/backup-vect/'
os.makedirs(BKP, exist_ok=True)
log = []

HEXMAP = {
    '#0a0404': '#05080f', '#120a0a': '#0a1122', '#160e0e': '#101a30',
    '#241414': '#182642', '#1b0a0a': '#0b1428', '#1c0e0e': '#131f38',
    '#1c0f0f': '#131f38', '#4a1414': '#2b3a5c', '#8f1313': '#8a6a1f',
    '#8b0000': '#7a5c14', '#cc0d0d': '#c9933a', '#ff2e2e': '#e8c87a',
    '#ff4d4d': '#e8c87a', '#e8e4e4': '#e9eef6', '#a39898': '#a3b1c9',
    '#736868': '#66738e',
}
HEXRE = re.compile(r'#(?:' + '|'.join(sorted([h[1:] for h in HEXMAP], key=len, reverse=True)) + r')\b')
RGBAMAP = [
    (re.compile(r'rgba\(\s*204\s*,\s*13\s*,\s*13\s*,'), 'rgba(201, 147, 58,'),
    (re.compile(r'rgba\(\s*255\s*,\s*46\s*,\s*46\s*,'), 'rgba(232, 200, 122,'),
    (re.compile(r'rgba\(\s*22\s*,\s*14\s*,\s*14\s*,'), 'rgba(16, 26, 48,'),
]
THEMERE = re.compile(r'theme-(dark|classic|blood)')

def tokens_fn(css):
    css = HEXRE.sub(lambda m: HEXMAP[m.group(0)], css)
    for rx, rep in RGBAMAP:
        css = rx.sub(rep, css)
    return css

def split_regions(css):
    segs, i, n = [], 0, len(css)
    while i < n:
        j = css.find('{', i)
        if j == -1:
            segs.append((False, css[i:])); break
        depth, k = 0, j
        while k < n:
            if css[k] == '{': depth += 1
            elif css[k] == '}':
                depth -= 1
                if depth == 0: break
            k += 1
        seg = css[i:k+1]
        segs.append((bool(THEMERE.search(css[i:j])), seg))
        i = k + 1
    return segs

def remap_css(css):
    return ''.join(seg if is_theme else tokens_fn(seg) for is_theme, seg in split_regions(css))

def theme_code_hash(css):
    """Hash das regiões de tema IGNORANDO comentários (docs podem atualizar)."""
    h = hashlib.md5()
    for is_theme, seg in split_regions(css):
        if is_theme:
            code = re.sub(r'/\*.*?\*/', '', seg, flags=re.S)
            h.update(code.encode('utf-8'))
    return h.hexdigest()

def sources_outside_theme(css):
    """Conta tokens-fonte fora das regiões de tema (deve ser 0 após remap)."""
    n = 0
    for is_theme, seg in split_regions(css):
        if not is_theme:
            n += len(HEXRE.findall(seg))
            for rx, _ in RGBAMAP:
                n += len(rx.findall(seg))
    return n

SANGUE_RULES = [
    ('Identidade: sangue, magia negra, perigo. Fundo vinho escuro, vermelho vivo.',
     'Identidade: céu, nuvens e pedra flutuante. Fundo azul-noite profundo, dourado vivo.'),
    ('TEMA TORMENTA / SANGUE', 'TEMA VECTORA'),
    ('Tormenta/Sangue', 'Vectora'),
    ('Tema Sangue', 'Tema Vectora'),
    ('Padrão: Sangue', 'Padrão: Vectora'),
    ('(Sangue)', '(Vectora)'),
    ('Vermelho sangue', 'Dourado de Vectora'),
    ('vermelho sangue', 'dourado de Vectora'),
]
TORMENTA_RE = re.compile(r'Tema Tormenta(?![0-9A-Za-z])')

def sangue_fn(text):
    for old, new in SANGUE_RULES:
        text = text.replace(old, new)
    text = TORMENTA_RE.sub('Tema Vectora', text)
    return text

def load(path):
    raw = open(R + path, 'rb').read()
    crlf = b'\r\n' in raw
    text = raw.decode('utf-8', errors='replace')
    if crlf: text = text.replace('\r\n', '\n')
    return text, crlf

def save(path, text, crlf):
    if crlf: text = text.replace('\n', '\r\n')
    open(R + path, 'wb').write(text.encode('utf-8'))

def backup(path):
    dst = BKP + path
    if not os.path.exists(dst):
        os.makedirs(os.path.dirname(dst) or BKP, exist_ok=True)
        open(dst, 'wb').write(open(R + path, 'rb').read())

def walk(exts):
    out = []
    for root, dirs, files in os.walk(R):
        for fn in files:
            if fn.endswith(exts):
                p = os.path.relpath(os.path.join(root, fn), R)
                if p.startswith(('ficha/', 'forja/')) or p == 'Vtt/style.css':
                    continue
                out.append(p)
    return sorted(out)

# ---------- PASSO 1: paleta + labels nos .css ----------
n_css = 0
for f in walk(('.css',)):
    text, crlf = load(f)
    before = theme_code_hash(text)
    new = sangue_fn(remap_css(text))
    assert theme_code_hash(new) == before, f"{f}: REGIÃO DE TEMA ALTERADA!"
    assert sources_outside_theme(new) == 0, f"{f}: restou token-fonte fora de tema!"
    if new != text:
        backup(f); save(f, new, crlf); n_css += 1
log.append(f"PASSO 1: {n_css} stylesheets remapeados (.theme-* intactos ✓)")

# ---------- PASSO 2: <style> + labels (fora de <script>) nos HTML ----------
n_html = 0
for f in walk(('.html',)):
    text, crlf = load(f)
    def _remap_style(m):
        inner = m.group(1)
        new_inner = remap_css(inner)
        assert theme_code_hash(new_inner) == theme_code_hash(inner), f"{f}: REGIÃO DE TEMA ALTERADA!"
        assert sources_outside_theme(new_inner) == 0, f"{f}: restou token-fonte!"
        return '<style>' + new_inner + '</style>'
    text = re.sub(r'<style[^>]*>(.*?)</style>', _remap_style, text, flags=re.S)
    parts = re.split(r'(<script(?![^>]*src=)[^>]*>.*?</script>)', text, flags=re.S)
    for i in range(0, len(parts), 2):
        parts[i] = sangue_fn(parts[i])
    new = ''.join(parts)
    if new != text:
        backup(f); save(f, new, crlf); n_html += 1
log.append(f"PASSO 2: {n_html} HTMLs remapeados (<script> intacto ✓)")

# ---------- PASSO 3: hero + favicon no hub ----------
text, crlf = load('index.html')
if 'logo-vttarmada.png' not in text:
    fav = '  <link rel="icon" type="image/png" href="assets/imagens/logo-vttarmada.png">\n'
    anchor = '  <title>VTTArmada do Mestre — Tormenta20</title>'
    assert text.count(anchor) == 1
    text = text.replace(anchor, fav + anchor)
    logo = '    <img class="hub-logo" src="assets/imagens/logo-vttarmada.png" alt="VTTArmada — Armada de Vectora">\n'
    anchor2 = '    <h1 class="header-title">'
    assert text.count(anchor2) == 1
    text = text.replace(anchor2, logo + anchor2)
css = ('    .hub-logo {\n'
       '      width: min(560px, 88vw);\n'
       '      height: auto;\n'
       '      display: block;\n'
       '      margin: 0 auto 4px;\n'
       '      filter: drop-shadow(0 8px 28px rgba(201, 147, 58, 0.35));\n'
       '    }\n\n')
anchor3 = '    .header-btns {'
assert text.count(anchor3) >= 1
if '.hub-logo {' not in text:
    text = text.replace(anchor3, css + anchor3, 1)
backup('index.html'); save('index.html', text, crlf)
log.append("PASSO 3: hub com logo hero + favicon")

# ---------- PASSO 4: favicon no template + README ----------
text, crlf = load('assets/templates/template.html')
lines = text.split('\n')
if '../assets/imagens/logo-vttarmada.png' not in text:
    ti = [i for i, l in enumerate(lines) if l.strip().startswith('<title>')]
    assert len(ti) == 1
    lines.insert(ti[0] + 1, '  <link rel="icon" type="image/png" href="../assets/imagens/logo-vttarmada.png">')
    text = '\n'.join(lines)
backup('assets/templates/template.html'); save('assets/templates/template.html', text, crlf)
log.append("PASSO 4a: favicon no template")

text, crlf = load('README.md')
old_row = '| 🩸 Sangue (padrão) | `theme-blood` | Vinho escuro, vermelho vivo |'
if text.count(old_row) == 1:
    text = text.replace(old_row, '| 🏰 Vectora (padrão) | `theme-blood` | Céu-noite azul-profundo, dourado |')
else:
    assert 'Vectora (padrão)' in text
backup('README.md'); save('README.md', text, crlf)
log.append("PASSO 4b: README atualizado")

print('\n'.join(log))
print('OK ✓')
