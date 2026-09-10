R = '/home/user/arsenal/'
p = R + "Vtt/ficha-vtt.html"
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
assert text[end:end+11] == ';\n</script>', f"final inesperado: {text[end:end+30]!r}"
span = text[si:end+11]
assert span.count('const SPELLS_DB') == 1
replacement = '<script src="../grimorio/spells_db.js"></script>\n<!-- SPELLS_DB agora carregado do grimório compartilhado (antes: cópia inline desatualizada) -->'
text = text[:si] + replacement + text[end+11:]
open(p, 'wb').write(text.replace('\n', '\r\n').encode('utf-8'))
print(f"OK: SPELLS_DB inline ({len(span)//1024}KB) -> ../grimorio/spells_db.js")
# verificações
t2 = open(p,'rb').read().decode('utf-8', errors='replace')
print("const SPELLS_DB restantes na página:", t2.count('const SPELLS_DB'))
print("script grimorio referenciado:", t2.count('../grimorio/spells_db.js'))
print("Tormenta.ttf local restante:", t2.count("url('Tormenta.ttf')"))
print("../../assets restante:", t2.count('../../assets'))
