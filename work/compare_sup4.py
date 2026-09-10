import json, re, unicodedata
from collections import Counter
V = '/home/user/VTTArmada/'
def norm(s):
    s = unicodedata.normalize('NFKD', s or '').encode('ascii', 'ignore').decode()
    s = re.sub(r'\([^)]*\)', '', s)
    return re.sub(r'[^a-z0-9 ]', '', s.lower()).strip()
sup = json.load(open('/home/user/work/sup_names.json'))

# raças: parser corrigido (multi + single-line)
races = {}
for f, start in (('calculadora/racas.js', 461), ('calculadora/racas_dragaobrasil.js', 128)):
    lines = open(V + f, encoding='utf-8').read().split('\n')
    cur = None
    for ln in lines[start:]:
        m = re.match(r"^    ([A-Za-z0-9_]+): \{", ln)
        if m:
            cur = m.group(1); races[cur] = {}
            m2 = re.search(r"name: '((?:[^'\\]|\\.)*)'", ln)
            if m2: races[cur]['name'] = m2.group(1)
            m3 = re.search(r"type: '([a-zA-Z]+)'", ln)
            if m3: races[cur]['type'] = m3.group(1)
        elif cur and 'name' not in races[cur]:
            m2 = re.search(r"name: '((?:[^'\\]|\\.)*)'", ln)
            if m2: races[cur]['name'] = m2.group(1)
races = {k: v for k, v in races.items() if 'name' in v}
print(f"RAÇAS nós (corrigido): {len(races)}")
o = {norm(v['name']): v['name'] for v in races.values()}
sup_races = sorted({n for _, t, n, _ in sup if t == 'race'})
miss = [sr for sr in sup_races if norm(sr) not in o and not (norm(sr).startswith('moreau'))]
# checar contains p/ Nagah etc
real_miss = []
for sr in miss:
    n = norm(sr)
    hit = [v for k, v in o.items() if k and (k in n or n in k)]
    if not hit: real_miss.append(sr)
print(f"raças sup ausentes (real): {real_miss}")
print("temos golem?:", [v['name'] for v in races.values() if 'olem' in v['name']])
print("temos moreau?:", [v['name'] for v in races.values() if 'oreau' in v['name']][:14])

# parceiros nós vs montaria/parceiro sup
ptxt = open(V + 'parceiros/parceiros.js', encoding='utf-8').read()
pnames = re.findall(r'"name": "((?:[^"\\]|\\.)*)"', ptxt)
pnames += re.findall(r'\n\s\sname: "((?:[^"\\]|\\.)*)"', ptxt)
pcats = Counter(re.findall(r'category": "([a-z]+)"', ptxt))
print(f"\nPARCEIROS nós: {len(set(pnames))} nomes | cats: {dict(pcats)}")
op = {norm(x) for x in pnames}
sup_mp = [(n, st) for _, t, n, st in sup if t == 'poder' and norm(st or '') in ('montaria', 'parceiros', 'parceiro', 'melhor amigo')]
print(f"sup montaria/parceiro: {len(sup_mp)} | ausentes: {sum(1 for n, s in sup_mp if norm(n) not in op)}")
print("ex ausentes:", [n for n, s in sup_mp if norm(n) not in op][:12])
print("ex parceiros nós:", sorted(set(pnames))[:20])

# itens nós vs equip sup
ours_items = {}
for f, label in (('itens/data/armas.js', 'arma'), ('itens/data/armaduras.js', 'armadura'), ('itens/data/itens.js', 'item'), ('itens/data/itensmagicos.js', 'magico'), ('itens/data/encantamentos.js', 'enc'), ('itens/data/modificacoes.js', 'mod')):
    t = open(V + f, encoding='utf-8').read()
    ns = re.findall(r'"nome": "((?:[^"\\]|\\.)*)"', t)
    ours_items[label] = ns
    print(f"itens nós [{label}]: {len(ns)}")
oi = {norm(x) for v in ours_items.values() for x in v}
for st in ('arma', 'equipamento', 'consumivel', 'tesouro'):
    sl = [(n, p) for p, t, n, s in sup if t == st]
    ms = [(n, p) for n, p in sl if norm(n) not in oi]
    print(f"\nsup[{st}]: {len(sl)} | ausentes em nós: {len(ms)}")
    if ms: print("   ex:", ms[:10])

# sem subtipo missing full + atributos-pattern + medo/chassi checks
txt = open(V + 'poderes/js/data.js', encoding='utf-8').read()
opow = {norm(x) for x in re.findall(r'^        name: "((?:[^"\\]|\\.)*)",?\s*$', txt, re.M)}
sem = [(n, p) for p, t, n, st in sup if t == 'poder' and not st and norm(n) not in opow]
print(f"\nSEM SUBTIPO ausentes ({len(sem)}): {sem}")
atr = [(n, st) for _, t, n, st in sup if t == 'poder' and n.startswith('Atributos - ') and norm(n) not in opow]
print(f"'Atributos - X' ausentes: {len(atr)}")
print("temos 'Medo Verdadeiro'?:", [x for x in re.findall(r'^        name: "((?:[^"\\]|\\.)*)",?\s*$', txt, re.M) if 'Medo' in x])
print("temos 'Bode Expiatório'?:", any('Bode Expiat' in x for x in re.findall(r'^        name: "((?:[^"\\]|\\.)*)",?\s*$', txt, re.M)))
