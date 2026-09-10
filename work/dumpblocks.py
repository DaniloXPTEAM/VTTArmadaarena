import re
files = ['EncontrosAleatorios/js.js','STR/script.js','ameacas/app.js','calculadora/index.html',
'calculadoraND_Tormenta/index.html','campanha/index.html','combate/script.js','dados/index.html',
'espolio/js.js','golpe/index.html','grimorio/app.js','itens/script.js','libertacao/script.js',
'macrosroll20/index.html','parceiros/index.html','perigos/script.js','poderes/js/main.js',
'Vtt/ficha-vtt.html','index.html']
R='/home/user/arsenal-ref/'
for f in files:
    src = open(R+f, encoding='utf-8', errors='replace').read()
    lines = src.split('\n')
    # acha linha com t20_theme setItem e volta até comentário TEMA/início do bloco; vai até fim do bloco
    idxs = [i for i,l in enumerate(lines) if 't20_theme' in l and 'setItem' in l]
    if not idxs:
        print(f"\n##### {f}: setItem t20_theme NÃO achado!"); continue
    i = idxs[0]
    s = i
    while s > max(0,i-12):
        if re.search(r'TEMA|THEME|Tema', lines[s]): break
        s -= 1
    e = i
    while e < min(len(lines), i+30):
        if 'addEventListener' in lines[e]:
            e += 4; break
        e += 1
    print(f"\n##### {f} [linhas {s+1}-{e}] #####")
    print('\n'.join(f"{n+1:5}| {lines[n][:115]}" for n in range(s, min(e, len(lines)))))
