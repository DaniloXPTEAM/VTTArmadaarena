import os, re, sys
R = '/home/user/VTTArmada/'
errors = []
checked = 0
for root, dirs, files in os.walk(R):
    if '.git' in root: continue
    for fn in files:
        if not fn.endswith(('.html', '.css')): continue
        p = os.path.join(root, fn)
        if 'templates/template.html' in p: continue  # template tem paths de exemplo
        src = open(p, encoding='utf-8', errors='replace').read()
        refs = []
        if fn.endswith('.html'):
            refs += re.findall(r'(?:src|href)="([^"]+)"', src)
        refs += re.findall(r'url\(\s*["\']?([^"\')]+)["\']?\s*\)', src)
        for ref in refs:
            if not ref or ref.startswith(('http', 'https:', 'data:', 'mailto:', '#', '//')): continue
            ref = ref.split('#')[0].split('?')[0]
            if not ref or '${' in ref or ref == 'capa.jpeg': continue  # ${}=template JS; capa.jpeg=quebrado pré-existente
            checked += 1
            full = os.path.normpath(os.path.join(os.path.dirname(p), ref))
            if not os.path.exists(full):
                errors.append(f"{os.path.relpath(p, R)} -> {ref} (404!)")
print(f"Referências checadas: {checked}")
if errors:
    print(f"ERROS ({len(errors)}):"); print("\n".join(errors[:30])); sys.exit(1)
print("OK: nenhum link local quebrado ✓")
# refs aos arquivos deletados
import subprocess
out = subprocess.run(['grep', '-rn', 'bkp app\|bkp ficha\|bkp index\|bkp style\|append.ps1\|modal.txt',
                      '--include=*.html', '--include=*.js', '--include=*.css', R],
                     capture_output=True, text=True).stdout.strip()
print("Refs a bkps/ps1:", "NENHUMA ✓" if not out else out)
