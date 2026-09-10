import json, sys, re
sys.path.insert(0, '/home/user/work')
from leveldb_read import read_pack, split_key
R = '/home/user/vendor-review/Suplementos-de-Arton/packs/'
PACKS = ['ameacas-de-arton', 'atlas-de-arton', 'deuses-de-arton', 'distincoes',
         'guia-de-deuses-menores', 'guia-de-npcs-and-dbs', 'herois-de-arton']
docs = []
for pack in PACKS:
    for k, v in read_pack(R + pack).items():
        try: d = json.loads(v.decode('utf-8'))
        except Exception: continue
        try: ns, kp = split_key(k)
        except Exception: continue
        if '.' in ns or ns in ('folders', '?'): continue
        if not isinstance(d, dict) or 'system' not in d: continue
        docs.append((pack, d))
def S(d): return d.get('system') or {}
def D(d): return ((S(d).get('description')) or {}).get('value') or ''
V = '/home/user/VTTArmada/'
t = open(V + 'poderes/js/data.js', encoding='utf-8').read()
rc = sorted(set(re.findall(r'type: "raca",\r?\n        category: "(.*?)"', t)))
print('raca cats:', rc)
print('Mauziell:', len(re.findall(r'category: "Mauziell"', t)))
ou = [l.strip()[:110] for l in t.splitlines() if 'Devoto' in l and l.count(' ou ') >= 1][:4]
print('req-ou:', ou)
ta = open(V + 'itens/data/armas.js', encoding='utf-8').read()
cr = sorted(set(re.findall(r'"critico": "(.*?)"', ta)))[:14]
print('crits:', cr)
ti = open(V + 'itens/data/itens.js', encoding='utf-8').read()
it = sorted(set(re.findall(r'"tipo": "(.*?)"', ti)))
print('item tipos:', it)
fi = len(re.findall(r'"fonte"', ti))
fa = len(re.findall(r'"fonte"', open(V + 'itens/data/armaduras.js', encoding='utf-8').read()))
fm = len(re.findall(r'fonte', open(V + 'itens/data/itensmagicos.js', encoding='utf-8').read()))
print('fonte item=%d armad=%d itesm=%d' % (fi, fa, fm))
print('traco espacos=%d preco=%d' % (ti.count('"espacos": "—"'), ti.count('"preco": "—"')))
print('== sup nomes p/ st ==')
for st in ('Mutagênico', 'Gigante Furioso', 'Mago de batalha de Wynlla', 'Conjuração Magibélica'):
    ns = sorted({(d.get('name'), S(d).get('tipo')) for _, d in docs if S(d).get('subtipo') == st})
    print(' ', st, ns)
print('== conjmag descs ==')
for _, d in docs:
    if S(d).get('subtipo') == 'Conjuração Magibélica':
        print('  ', d.get('name'), '|', re.sub(r'\s+', ' ', D(d))[:150])
print('== Presenca/Soco/Golpe/Magias/Andarilho ==')
for _, d in docs:
    if d.get('name') in ('Presença Majestosa', 'Soco Foguete', 'Golpe Semântico', 'Magias', 'Andarilho Carregado'):
        print('  ', d.get('name'), S(d).get('tipo'), S(d).get('subtipo'), '|', re.sub(r'\s+', ' ', D(d))[:260])
print('== suragel ours ==')
rtxt = open(V + 'calculadora/racas.js', encoding='utf-8').read()
m = re.search(r'SURAGEL_HERANCAS = \{(.*?)\n\};', rtxt, re.S)
if m:
    print('  keys:', re.findall(r'\n    (\w+): \{', m.group(1)))
    print('  sample:', m.group(1)[:400])
else:
    print('  NOMATCH')
print('== arma dano alt ==')
arms = [d for _, d in docs if d.get('type') == 'arma']
print('  XdY-any:', sum(1 for d in arms if re.search(r'\d+d\d+', D(d))), '| tem-dano:', sum(1 for d in arms if 'dano' in D(d).lower()))
for d in arms[:3]:
    print('   ', d.get('name'), '|', re.sub(r'\s+', ' ', D(d))[:200])
nn = sum(1 for _, d in docs if d.get('type') in ('arma', 'equipamento', 'consumivel', 'tesouro') and S(d).get('preco') is None)
zz = sum(1 for _, d in docs if d.get('type') in ('arma', 'equipamento', 'consumivel', 'tesouro') and S(d).get('preco') == 0)
nee = sum(1 for _, d in docs if d.get('type') in ('arma', 'equipamento', 'consumivel', 'tesouro') and S(d).get('espacos') is None)
print('preco None=%d zero=%d espacos None=%d' % (nn, zz, nee))
