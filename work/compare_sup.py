import json, re, sys, unicodedata
from collections import Counter
sys.path.insert(0, '/home/user/work')
from leveldb_read import read_pack, split_key

V = '/home/user/VTTArmada/'
def norm(s):
    s = unicodedata.normalize('NFKD', s or '').encode('ascii', 'ignore').decode()
    return re.sub(r'[^a-z0-9 ]', '', s.lower()).strip()

# ---- NOSSO LADO ----
# raças
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
            m3 = re.search(r"type: '([a-zA-Z]+)'", ln)
            if m3 and 'type' not in races[cur]: races[cur]['type'] = m3.group(1)
    # fim: arquivo pode ter código após; entradas sem name são lixo
races = {k: v for k, v in races.items() if 'name' in v}
print(f"NOSSAS raças: {len(races)} | tipos: {Counter(v['type'] for v in races.values() if 'type' in v)}")

# classes
classes = []
for f in ('poderes/js/classes-data.js', 'poderes/js/classes-db-base-data.js', 'poderes/js/classes-db-data.js'):
    for ln in open(V + f, encoding='utf-8'):
        m = re.match(r"^    name: '((?:[^'\\]|\\.)*)',?\s*$", ln)
        if m: classes.append((m.group(1), f.split('/')[-1]))
print(f"NOSSAS classes: {len(classes)}")

# poderes (data.js): parear name/type por ordem
txt = open(V + 'poderes/js/data.js', encoding='utf-8').read()
names = re.findall(r'^        name: "((?:[^"\\]|\\.)*)",?\s*$', txt, re.M)
types = re.findall(r'^        type: "([a-zA-Z]+)",?\s*$', txt, re.M)
print(f"powersData names={len(names)} types={len(types)}")
powers = list(zip(names, types))

# distinções
dist = re.findall(r"^        name: '((?:[^'\\]|\\.)*)',?\s*$", open(V + 'poderes/js/distincoes-data.js', encoding='utf-8').read(), re.M)
print(f"NOSSAS distinções: {len(dist)}")

# origens
orig = re.findall(r"^    name: '((?:[^'\\]|\\.)*)',?\s*$", open(V + 'poderes/js/origens.js', encoding='utf-8').read(), re.M)
print(f"NOSSAS origens: {len(orig)}")

# magias ficha
spells = re.findall(r'"n": "((?:[^"\\]|\\.)*)"', open(V + 'ficha/spells_db.js', encoding='utf-8').read())
print(f"NOSSAS magias (ficha): {len(spells)}")

# ---- LADO SUPLEMENTOS ----
SUP = '/home/user/vendor-review/Suplementos-de-Arton/packs/'
sup = []  # (pack, type, name, subtipo)
for pack in ('ameacas-de-arton', 'atlas-de-arton', 'deuses-de-arton', 'distincoes', 'guia-de-deuses-menores', 'guia-de-npcs-and-dbs', 'herois-de-arton'):
    for k, v in read_pack(SUP + pack).items():
        try: d = json.loads(v.decode('utf-8'))
        except Exception: continue
        try: ns, kp = split_key(k)
        except Exception: continue
        if '.' in ns or ns in ('folders', '?'): continue
        if not isinstance(d, dict) or 'system' not in d: continue
        sup.append((pack, d.get('type'), d.get('name'), (d.get('system') or {}).get('subtipo')))
print(f"\nSUPLEMENTOS itens topo: {len(sup)} | tipos: {Counter(s[1] for s in sup)}")
print("subtipos de poder:", Counter(s[3] for s in sup if s[1] == 'poder'))
print("subtipos de magia:", Counter(s[3] for s in sup if s[1] == 'magia'))
json.dump(sup, open('/home/user/work/sup_names.json', 'w'), ensure_ascii=False)

def show(label, ours_list, sup_list):
    o = {norm(x): x for x in ours_list}
    s = {norm(x): x for x in sup_list}
    both = set(o) & set(s)
    only_o = [o[k] for k in sorted(set(o) - set(s))]
    only_s = [s[k] for k in sorted(set(s) - set(o))]
    print(f"\n===== {label} =====")
    print(f"nossos={len(o)} sup={len(s)} ambos={both and len(both)} só-nós={len(only_o)} só-sup={len(only_s)}")
    if only_s: print("  SÓ-SUP:", only_s[:25], ('...' if len(only_s) > 25 else ''))
    if only_o: print("  SÓ-NÓS:", only_o[:25], ('...' if len(only_o) > 25 else ''))

show("RAÇAS", [v['name'] for v in races.values()], [n for _, t, n, _ in sup if t == 'race'])
show("CLASSES", [c[0] for c in classes], [n for _, t, n, _ in sup if t == 'classe'])
show("PODERES (todos os nossos types vs poder-sup)", [n for n, t in powers], [n for _, t, n, _ in sup if t == 'poder'])
show("MAGIAS", spells, [n for _, t, n, _ in sup if t == 'magia'])
# poderes por tipo nosso
for t in sorted(set(t for _, t in powers)):
    show(f"poder-sup vs nossos[{t}]", [n for n, tt in powers if tt == t], [n for _, ty, n, _ in sup if ty == 'poder'])
