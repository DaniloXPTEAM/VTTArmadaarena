import re
targets = {
 'EncontrosAleatorios/index.html': ['header-inner'],
 'STR/index.html': ['header-btns'],
 'Vtt/index.html': ['header-actions'],
 'Vtt/ficha-vtt.html': ['header-actions','room-header','topbar','toolbar'],
 'ameacas/index.html': ['app-header','header-logo','header-'],
 'calculadora/index.html': ['header-btns'],
 'calculadoraND_Tormenta/index.html': ['header-btns'],
 'campanha/index.html': ['header-btns'],
 'combate/index.html': ['header-btns'],
 'dados/index.html': ['header-buttons'],
 'espolio/index.html': ['header-inner'],
 'golpe/index.html': ['<header'],
 'grimorio/index.html': ['app-header','header-logo','header-'],
 'itens/index.html': ['header-btns'],
 'libertacao/index.html': ['main-header','header-left','header-'],
 'macrosroll20/index.html': ['header-inner'],
 'parceiros/index.html': ['header-btns'],
 'perigos/index.html': ['header-btns'],
 'poderes/index.html': ['header-btns'],
}
R='/home/user/arsenal-ref/'
for f, keys in targets.items():
    src = open(R+f, encoding='utf-8', errors='replace').read()
    print(f"\n===== {f} =====")
    print("  CSS locais:", re.findall(r'<link[^>]*href="([^"]+\.css)"', src))
    print("  JS locais:", re.findall(r'<script[^>]*src="([^"]+\.js)"', src))
    for k in keys:
        m = re.search(r'<[a-z]+[^>]*class="[^"]*'+re.escape(k) if not k.startswith('<') else re.escape(k), src)
        if m:
            start = m.start()
            snippet = src[start:start+600].split('\n')[:8]
            print(f"  --- âncora '{k}' ---")
            for line in snippet: print('   |'+line.strip()[:110])
            break
