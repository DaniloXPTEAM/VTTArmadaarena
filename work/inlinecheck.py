import re, subprocess, tempfile, os
files = ['golpe/index.html','calculadora/index.html','calculadoraND_Tormenta/index.html',
'campanha/index.html','macrosroll20/index.html','dados/index.html','parceiros/index.html',
'index.html','Vtt/ficha-vtt.html','Vtt/index.html','EncontrosAleatorios/index.html','STR/index.html',
'ameacas/index.html','combate/index.html','espolio/index.html','grimorio/index.html','itens/index.html',
'libertacao/index.html','calculadoraND_Tormenta/index.html','campanha/index.html','combate/index.html','EncontrosAleatorios/index.html','macrosroll20/index.html','parceiros/index.html','poderes/index.html','calculadora/index.html','perigos/index.html','poderes/index.html']
for R in ['/home/user/VTTArmada/', '/home/user/arsenal-ref/']:
    tag = 'NOVO' if 'arsenal/' in R and 'ref' not in R else 'ORIG'
    bad = []
    for f in files:
        src = open(R+f, encoding='utf-8', errors='replace').read()
        for i, m in enumerate(re.finditer(r'<script(?![^>]*src=)[^>]*>(.*?)</script>', src, re.S)):
            code = m.group(1).strip()
            if len(code) < 20: continue
            with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False, encoding='utf-8') as tf:
                tf.write(code); tmp = tf.name
            r = subprocess.run(['node', '--check', tmp], capture_output=True, text=True)
            os.unlink(tmp)
            if r.returncode != 0:
                bad.append(f"{f}#{i}: {r.stderr.strip().splitlines()[0][:100] if r.stderr.strip() else '?'}")
    print(f"--- {tag}: {len(bad)} blocos inline com erro ---")
    for b in bad[:12]: print("   ", b)
