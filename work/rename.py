import re

R = '/home/user/arsenal/'
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

# ---------- PASSO 1: URLs absolutas conta-antiga -> relativas ----------
PAGES = ['ficha', 'itens', 'poderes', 'EncontrosAleatorios', 'calculadoraND_Tormenta', 'combate', 'calculadora']
URL_FILES = {  # arquivo -> prefixo relativo
    'index.html': '',
    'Vtt/ficha-vtt.html': '../', 'calculadora/index.html': '../',
    'macrosroll20/index.html': '../', 'parceiros/index.html': '../',
    'poderes/index.html': '../', 'EncontrosAleatorios/index.html': '../',
    'calculadoraND_Tormenta/index.html': '../', 'campanha/index.html': '../',
    'combate/index.html': '../', 'itens/index.html': '../',
}
for path, p in URL_FILES.items():
    text, crlf = load(path)
    n0 = len(re.findall(r'nicholemos\.github\.io/(arsenal/)?(STR|ficha|itens|poderes|EncontrosAleatorios|calculadoraND_Tormenta|combate|calculadora|CalculadoradeAtributos)?/?(?=")', text))
    for base in ['https://nicholemos.github.io/arsenal/', 'https://nicholemos.github.io/']:
        text = text.replace(f'href="{base}"', f'href="{p}index.html"')
        text = text.replace(f'href="{base}STR"', f'href="{p}STR/index.html"')
        for pg in PAGES:
            text = text.replace(f'href="{base}{pg}/"', f'href="{p}{pg}/index.html"')
        text = text.replace(f'href="{base}CalculadoradeAtributos/"', f'href="{p}calculadora/index.html"')
    # textos visíveis (CTA mostrava a URL crua)
    text = text.replace('https://nicholemos.github.io/arsenal/', '🏰 VTTArmada')
    text = text.replace('https://nicholemos.github.io/', '🏰 VTTArmada')
    # displays coerentes no caminho corrigido
    text = text.replace('nicholemos.github.io/CalculadoradeAtributos', 'nicholemos.github.io/calculadora')
    assert 'github.io/arsenal' not in text, f"{path}: restou github.io/arsenal!"
    assert 'href="https://nicholemos.github.io/' not in text, f"{path}: restou href flavor!"
    save(path, text, crlf)
    log.append(f"URLS {path}: absolutas -> relativas (prefixo '{p or './'}')")

# ---------- PASSO 2: arquivos explícitos (conteúdo de jogo preservado) ----------
text, crlf = load('compendio/script.js')
assert text.count('Arsenal T20') == 6, f"compendio: {text.count('Arsenal T20')}"
text = text.replace('Arsenal T20', 'VTTArmada T20')
assert 'detalhes.arsenal' in text and 'arsenalHtml' in text  # engrenagem intacta
save('compendio/script.js', text, crlf)
log.append("EXPLÍCITO compendio/script.js: 6x 'Arsenal T20' (gear .arsenal intacto)")

text, crlf = load('itens/map_images.js')
assert text.count('ARSENAL_DATA') == 2 and text.count('arsenal-main') == 4
text = text.replace('ARSENAL_DATA', 'VTTARMADA_DATA').replace('arsenal-main', 'VTTArmada-main')
assert text.count('os itens do arsenal') == 1 and text.count('→ Arsenal') == 1
text = text.replace('os itens do arsenal', 'os itens do VTTArmada').replace('→ Arsenal', '→ VTTArmada')
save('itens/map_images.js', text, crlf)
log.append("EXPLÍCITO itens/map_images.js: const, paths dev, log, comentário")

# ---------- PASSO 3: rename genérico na allowlist (só marca) ----------
import subprocess
all_text = subprocess.run(['git', 'ls-files'], capture_output=True, text=True, cwd=R).stdout.split()
BLOCK = {'ameacas/db/ameacas_db.js', 'grimorio/spells_db.js', 'STR/database.js',
         'STR/breves_jornadas.js', 'calculadora/racas.js', 'calculadora/racas_dragaobrasil.js',
         'ameacas/db/jornadas.js', 'ameacas/db/guerra.js', 'itens/data/itens.js',
         'EncontrosAleatorios/data.js', 'poderes/js/data.js', 'poderes/js/distincoes-data.js',
         'poderes/js/distincoes-main.js', 'poderes/js/main.js', 'poderes/css/distincoes.css',
         'espolio/js.js', 'compendio/script.js', 'itens/map_images.js'}
def allowlisted(f):
    if not f.endswith(('.html', '.js', '.css', '.md')): return False
    if f.startswith('ficha/') or f in BLOCK: return False
    return True

def brand_replace(text):
    text = text.replace('arsenalApplyTheme', 'vttArmadaApplyTheme')
    text = text.replace('arsenalGetTheme', 'vttArmadaGetTheme')
    text = text.replace('__arsenalThemeBound', '__vttArmadaThemeBound')
    text = text.replace('Arsenal VTT', 'VTTArmada')
    text = text.replace('Arsenal do Mestre', 'VTTArmada do Mestre')
    text = text.replace('Arsenal T20', 'VTTArmada T20')
    text = re.sub(r'\bArsenal\b', 'VTTArmada', text)
    text = re.sub(r'\bARSENAL\b', 'VTTARMADA', text)
    text = re.sub(r'\barsenal\b', 'VTTArmada', text)
    return text

n_files = 0
for f in all_text:
    if not allowlisted(f): continue
    text, crlf = load(f)
    if not re.search(r'[Aa]rsenal|ARSENAL', text): continue
    new = brand_replace(text)
    assert not re.search(r'[Aa]rsenal|ARSENAL', new), f"{f}: RESTOU marca! {[m.group(0) for m in re.finditer(r'.{30}[Aa]rsenal.{30}|.{30}ARSENAL.{30}', new)][:2]}"
    save(f, new, crlf)
    n_files += 1
log.append(f"MARCA: {n_files} arquivos com rename total e resíduo zero")

print('\n'.join(log))
print('\nOK ✓')
