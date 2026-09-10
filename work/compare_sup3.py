import json, re, sys, unicodedata
from collections import Counter
sys.path.insert(0, '/home/user/work')
from leveldb_read import read_pack
V = '/home/user/VTTArmada/'
def norm(s):
    s = unicodedata.normalize('NFKD', s or '').encode('ascii', 'ignore').decode()
    s = re.sub(r'\([^)]*\)', '', s)
    return re.sub(r'[^a-z0-9 ]', '', s.lower()).strip()

sup = json.load(open('/home/user/work/sup_names.json'))

# ---------- RAÇAS: listas completas + match cuidadoso ----------
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
rnames = sorted(v['name'] for v in races.values())
sup_races = sorted({n for _, t, n, _ in sup if t == 'race'})
print(f"RAÇAS sup ({len(sup_races)}): {sup_races}")
o = {norm(x): x for x in rnames}
def match_race(sr):
    n = norm(sr)
    if n in o: return o[n]
    if n.startswith('moreau'): return 'Moreau* (nós)'
    sing = n[:-1] if n.endswith('s') else n
    if sing in o: return o[sing] + ' (?)'
    for k in o:  # contém / contido
        if k and (k in n or n in k): return o[k] + ' (~)'
    return None
print("\nmatch sup->nós:")
missing_r = []
for sr in sup_races:
    m = match_race(sr)
    print(f"   {sr:35s} -> {m or '✗ AUSENTE'}")
    if not m: missing_r.append(sr)
print("raças sup ausentes:", missing_r)

# ---------- PODERES: agrupar subtipo ----------
txt = open(V + 'poderes/js/data.js', encoding='utf-8').read()
pnames = re.findall(r'^        name: "((?:[^"\\]|\\.)*)",?\s*$', txt, re.M)
opow = {norm(x) for x in pnames}
BASE14 = {'arcanista','barbaro','bardo','bucaneiro','cacador','cavaleiro','clerigo','druida','guerreiro','inventor','ladino','lutador','nobre','paladino'}
NEWCLASS = {'mistico','samurai','treinador','frade'}
def grupo(st):
    s = norm(st or '')
    if not s: return 'SEM SUBTIPO'
    if s in BASE14: return 'classe-base'
    if s in NEWCLASS: return 'NOVA CLASSE'
    if 'deus' in s or 'deusa' in s or 'dragao' in s or 'dragoa' in s: return 'divindade'
    if s in ('combate',): return 'combate'
    if s in ('destino',): return 'destino'
    if s in ('grupo','geupo'): return 'grupo'
    if s in ('tormenta',): return 'tormenta'
    if s in ('magia','mistico'): return 'magia'
    if s in ('montaria','parceiros','parceiro','melhor amigo','mashin','heroi henshin'): return 'montaria/parceiro'
    if s in ('armadilhas','armadilheiro','inovacao','gambiarra'): return 'armadilha/inovação'
    if s in ('mundana',): return 'mundana'
    if s in ('complicacao','complicacao do clerigo'): return 'complicação'
    if s.startswith('moreau') or 'qareen' in s or 'lefou' in s or 'goblin' in s or 'suraggel' in s or 'trog' in s or 'minotauro' in s or 'nagah' in s or 'orc' in s or 'osteon' in s or 'hynne' in s or 'anao' in s or 'medusa' in s or 'elfo' in s or 'humano' in s or 'sereia' in s or 'meio' in s or 'kliren' in s or 'duende' in s or 'golem' in s or 'kallyanach' in s or 'gnoll' in s or 'finntroll' in s or 'fintroll' in s or 'kaijin' in s or 'satiro' in s or 'centauro' in s or 'harpia' in s or 'hobgoblin' in s or 'kappa' in s or 'nezumi' in s or 'dahllan' in s or 'silfide' in s or 'kobolds' in s or 'tengu' in s or 'ogro' in s or 'pteros' in s or 'aggelus' in s or 'sulfure' in s or 'eiradaan' in s or 'galokk' in s or 'bugbear' in s or 'tabrachi' in s or 'velocis' in s or 'voracis' in s or 'yidishan' in s or 'doherimm' in s or s in ('honra','ambicao'): return 'RAÇA'
    return 'distinção/variante'
g = Counter(); gm = Counter(); gex = {}
for p, t, n, st in sup:
    if t != 'poder': continue
    gr = grupo(st); g[gr] += 1
    if norm(n) not in opow:
        gm[gr] += 1; gex.setdefault(gr, []).append((n, st))
print("\n== PODERES sup por grupo: total / ausentes em nós ==")
for gr, c in g.most_common():
    print(f"   {c:4d} / {gm[gr]:4d} ausentes  {gr:22s} ex: {[x[0] for x in gex.get(gr, [])][:3]}")

# divindades: detalhe
divs = sorted({st for _, t, _, st in sup if t == 'poder' and grupo(st) == 'divindade'})
print(f"\ndivindades com poderes-sup: {len(divs)}")

# ---------- EQUIP: nós temos catálogo? ----------
print("\n== EQUIP na nossa casa? ==")
import glob
cands = [f for f in glob.glob(V + '**/*.js', recursive=True) if re.search(r'loja|shop|equip|arma|armas|item|itens|tesouro|consum', f, re.I) and 'ficha/' not in f and 'imagens' not in f]
print("arquivos candidatos:", cands if cands else "NENHUM")
forja = open(V + 'forja/index.html', encoding='utf-8').read()
print("forja: <option>:", forja.count('<option'), "| select names:", re.findall(r'<select[^>]*name="([^"]*)"', forja)[:10])

# ---------- as 2 magias: círculo/desc ----------
kvs = read_pack('/home/user/vendor-review/Suplementos-de-Arton/packs/deuses-de-arton')
kvs2 = read_pack('/home/user/vendor-review/Suplementos-de-Arton/packs/guia-de-npcs-and-dbs')
for k, v in list(kvs.items()) + list(kvs2.items()):
    d = json.loads(v.decode('utf-8'))
    if isinstance(d, dict) and d.get('name') in ('Bola de Fogo Flamejante', 'Controlar Ar'):
        s = d.get('system', {})
        print(f"\n{d.get('name')}: circulo={s.get('circulo')} escola={s.get('escola')} | desc={str((s.get('description') or {}).get('value'))[:220]}")
