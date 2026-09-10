import json, re, unicodedata
from collections import Counter
V = '/home/user/VTTArmada/'
def norm(s):
    s = unicodedata.normalize('NFKD', s or '').encode('ascii', 'ignore').decode()
    s = re.sub(r'\([^)]*\)', '', s)  # tira (Ameaças), (Ghanor)...
    s = s.split('/')[0].split('-')[0]  # Anão/Anã -> Anão; Moreau - X -> Moreau
    return re.sub(r'[^a-z0-9 ]', '', s.lower()).strip()

sup = json.load(open('/home/user/work/sup_names.json'))  # [pack,type,name,subtipo]

# ---- nossas listas ----
races = {}
for f, start in (('calculadora/racas.js', 461), ('calculadora/racas_dragaobrasil.js', 128)):
    lines = open(V + f, encoding='utf-8').read().split('\n')
    cur = None
    for ln in lines[start:]:
        m = re.match(r"^    ([A-Za-z0-9_]+): \{$", ln)
        if m: cur = m.group(1); races[cur] = {}
        if cur:
            m2 = re.search(r"name: '((?:[^'\\]|\\.)*)'", ln)
            if m2 and 'name' not in races[cur]: races[cur]['name'] = m2.group(1)
races = {k: v for k, v in races.items() if 'name' in v}
rnames = [v['name'] for v in races.values()]

classes, variants = [], []
for f in ('poderes/js/classes-data.js', 'poderes/js/classes-db-base-data.js', 'poderes/js/classes-db-data.js'):
    for ln in open(V + f, encoding='utf-8'):
        m1 = re.match(r"^    name: '((?:[^'\\]|\\.)*)',?\s*$", ln)
        m2 = re.match(r"^      \{ name: '((?:[^'\\]|\\.)*)'", ln)
        if m1: classes.append(m1.group(1))
        if m2: variants.append(m2.group(1))
print("CLASSES nós:", classes)
print("VARIANTES nós:", len(variants), variants[:40])
print("CLASSES sup:", sorted({n for _, t, n, _ in sup if t == 'classe'}))

def show(label, ours, sups):
    o = {norm(x): x for x in ours}; s = {norm(x): x for x in sups}
    only_s = sorted(set(s) - set(o)); only_o = sorted(set(o) - set(s))
    print(f"\n== {label}: nós={len(o)} sup={len(s)} ambos={len(set(o)&set(s))} só-nós={len(only_o)} só-sup={len(only_s)}")
    if only_s: print("   SÓ-SUP:", [s[k] for k in only_s][:30])
    if only_o: print("   SÓ-NÓS:", [o[k] for k in only_o][:30])

show("RAÇAS (nomes limpos)", rnames, [n for _, t, n, _ in sup if t == 'race'])
show("CLASSES+VAR (nós, tudo) vs classes-sup", classes + variants, [n for _, t, n, _ in sup if t == 'classe'])

# distinções: subtipos do pack distincoes vs nossos nomes
dist_ours = re.findall(r"^        name: '((?:[^'\\]|\\.)*)',?\s*$", open(V + 'poderes/js/distincoes-data.js', encoding='utf-8').read(), re.M)
dist_sup = sorted({st for p, t, n, st in sup if p == 'distincoes' and st})
print(f"\ndistinções: nós={len(dist_ours)} nomes-dist-sup={len(dist_sup)}")
show("DISTINÇÕES", dist_ours, dist_sup)

# poderes faltantes por subtipo
txt = open(V + 'poderes/js/data.js', encoding='utf-8').read()
pnames = re.findall(r'^        name: "((?:[^"\\]|\\.)*)",?\s*$', txt, re.M)
o = {norm(x) for x in pnames}
miss = Counter(); miss_ex = {}
tot = Counter()
for p, t, n, st in sup:
    if t != 'poder': continue
    tot[st or '(sem subtipo)'] += 1
    if norm(n) not in o:
        miss[st or '(sem subtipo)'] += 1
        miss_ex.setdefault(st or '(sem subtipo)', []).append(n)
print("\n== PODERES sup ausentes em nós: por subtipo (top 30) ==")
for st, c in miss.most_common(30):
    print(f"   {c:4d}/{tot[st]:4d} {st}: {miss_ex[st][:4]}")

# magias: as 2 faltantes + detalhe
import sys
sys.path.insert(0, '/home/user/work')
spells = re.findall(r'"n": "((?:[^"\\]|\\.)*)"', open(V + 'ficha/spells_db.js', encoding='utf-8').read())
so = {norm(x) for x in spells}
print("\n== MAGIAS sup ausentes: ", [(n, p) for p, t, n, st in sup if t == 'magia' and norm(n) not in so])
print("temos 'bola de fogo'?:", [x for x in spells if 'Bola de Fogo' in x])
print("temos 'controlar'?:", [x for x in spells if x.startswith('Controlar')])

# origens atlas nós vs subtipos-região sup (atlas pack)
orig_txt = open(V + 'poderes/js/origens.js', encoding='utf-8').read()
print("\norigens type=:", Counter(re.findall(r"^    type: '([a-z]+)',?\s*$", orig_txt, re.M)))
print("origens source=:", Counter(re.findall(r"^    source: '([^']*)',?\s*$", orig_txt, re.M)))
atlas_regs = sorted({st for p, t, n, st in sup if p == 'atlas-de-arton' and st})
print("regiões sup-atlas:", atlas_regs)
