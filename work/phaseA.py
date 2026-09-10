import os

R = '/home/user/arsenal/'
log = []
def rm(path):
    p = R + path
    if os.path.exists(p):
        os.remove(p); log.append(f"DEL  {path}")
    else:
        log.append(f"JÁ AUSENTE?! {path}")

def edit(path, old, new, count=1):
    """Edita preservando CRLF. old pode ser str exata."""
    p = R + path
    raw = open(p, 'rb').read()
    crlf = b'\r\n' in raw
    text = raw.decode('utf-8', errors='replace')
    if crlf: text = text.replace('\r\n', '\n')
    n = text.count(old)
    assert n == count, f"{path}: esperado {count}x, achei {n}x de: {old[:70]!r}"
    text = text.replace(old, new)
    if crlf: text = text.replace('\n', '\r\n')
    open(p, 'wb').write(text.encode('utf-8'))
    log.append(f"EDIT {path}: {old[:60]!r}...")

# ---------- 1. DELEÇÕES: backups e lixo ----------
for f in ["Vtt/bkp app.js", "Vtt/bkp ficha-vtt.html", "Vtt/bkp index.html",
          "Vtt/bkp style.css", "Vtt/append.ps1", "Vtt/modal.txt"]:
    rm(f)

# ---------- 2. DELEÇÕES: bancos de dados órfãos ----------
rm("ameacas/ameacas_db.js")          # órfão, mais antigo (20ago < 28ago)
rm("ameacas/bkp ameacas_db.js")      # bkp antigo (19jun)
rm("ameacas/jornadas.js")            # órfão, subconjunto do db/ (131 de 135)
rm("macrosroll20/spells_db.js")      # órfão, sem campo 't' (23mai < 19jun)

# ---------- 3. DELEÇÕES: fontes duplicadas (mantém assets/fonts + ficha) ----------
for f in ["EncontrosAleatorios/Tormenta.ttf", "STR/Tormenta.ttf", "Vtt/Tormenta.ttf",
          "calculadora/Tormenta.ttf", "calculadoraND_Tormenta/Tormenta.ttf",
          "campanha/Tormenta.ttf", "combate/Tormenta.ttf", "espolio/Tormenta.ttf",
          "itens/Tormenta.ttf", "libertacao/Tormenta.ttf", "macrosroll20/Tormenta.ttf",
          "poderes/assets/fonts/Tormenta.ttf"]:
    rm(f)

# ---------- 4. DELEÇÕES: ícones duplicados + txts lixo ----------
for f in ["calculadora/imagens/forca.png", "calculadora/imagens/destreza.png",
          "calculadora/imagens/constituicao.png", "calculadora/imagens/inteligencia.png",
          "calculadora/imagens/sabedoria.png", "calculadora/imagens/carisma.png",
          "calculadora/imagens/imagens.txt",
          "Vtt/imagens/forca.png", "Vtt/imagens/destreza.png",
          "Vtt/imagens/constituicao.png", "Vtt/imagens/inteligencia.png",
          "Vtt/imagens/sabedoria.png", "Vtt/imagens/carisma.png",
          "Vtt/imagens/readme",
          "poderes/assets/fonts/read.txt", "poderes/css/read.txt", "poderes/js/readme"]:
    rm(f)

# ---------- 5. FONTES: reapontar retardatários p/ assets/fonts/ ----------
edit("Vtt/ficha-vtt.html", "src: url('Tormenta.ttf')", "src: url('../assets/fonts/Tormenta.ttf')")
for f in ["dados/index.html", "golpe/index.html", "parceiros/index.html"]:
    edit(f, "../poderes/assets/fonts/Tormenta.ttf", "../assets/fonts/Tormenta.ttf")
edit("perigos/style.css", "../poderes/assets/fonts/Tormenta.ttf", "../assets/fonts/Tormenta.ttf")
edit("poderes/css/str-base.css", 'src:url("../assets/fonts/Tormenta.ttf")',
     'src:url("../../assets/fonts/Tormenta.ttf")')

# ---------- 6. VTT: corrigir caminho quebrado dos ícones (../../ -> ../) ----------
p = R + "Vtt/ficha-vtt.html"
raw = open(p, 'rb').read(); crlf = b'\r\n' in raw
text = raw.decode('utf-8', errors='replace').replace('\r\n', '\n')
n = text.count('../../assets/imagens/')
assert n == 6, f"ícones VTT: esperado 6, achei {n}"
text = text.replace('../../assets/imagens/', '../assets/imagens/')
open(p, 'wb').write((text.replace('\n', '\r\n') if crlf else text).encode('utf-8'))
log.append(f"EDIT Vtt/ficha-vtt.html: 6 ícones ../../assets -> ../assets")

# ---------- 7. VTT: SPELLS_DB inline (336KB, desatualizado) -> script compartilhado ----------
text = open(p, 'rb').read().decode('utf-8', errors='replace').replace('\r\n', '\n')
start_marker = '<script>const SPELLS_DB = ['
si = text.index(start_marker)
arr_start = si + len('<script>const SPELLS_DB = ')
depth = 0; instr = False; esc = False; end = None
for i in range(arr_start, len(text)):
    ch = text[i]
    if instr:
        if esc: esc = False
        elif ch == '\\': esc = True
        elif ch == '"': instr = False
    else:
        if ch == '"': instr = True
        elif ch == '[': depth += 1
        elif ch == ']':
            depth -= 1
            if depth == 0: end = i + 1; break
assert end, "fim do array inline não achado"
assert text[end:end+12] == ';\n</script>', f"final inesperado: {text[end:end+30]!r}"
span = text[si:end+12]
assert 'const SPELLS_DB' in span and span.count('const SPELLS_DB') == 1
replacement = '<script src="../grimorio/spells_db.js"></script>\n<!-- SPELLS_DB agora carregado do grimório compartilhado (antes: cópia inline desatualizada) -->'
text = text[:si] + replacement + text[end+12:]
open(p, 'wb').write(text.replace('\n', '\r\n').encode('utf-8'))
log.append(f"EDIT Vtt/ficha-vtt.html: SPELLS_DB inline ({len(span)//1024}KB) -> ../grimorio/spells_db.js")

print("\n".join(log))
print(f"\nOK: {len(log)} operações")
