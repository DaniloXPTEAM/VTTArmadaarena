import json, sys, re, unicodedata
sys.path.insert(0, '/home/user/work')
from leveldb_read import read_pack, split_key
from collections import Counter
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
def norm(s):
    s = unicodedata.normalize('NFKD', s or '').encode('ascii', 'ignore').decode()
    return re.sub(r'[^a-z0-9 ]', '', s.lower()).strip()
print("== ALL 64 DIST keys ==")
dtxt = open('/home/user/VTTArmada/poderes/js/distincoes-data.js', encoding='utf-8').read()
keys = [m.group(1) for m in re.finditer(r"name: '((?:[^'\\]|\\.)*)',\r?\n        source:", dtxt)]
print(keys)
print("exclusiva non-true:", len(re.findall(r'exclusiva: (?!true)', dtxt)))
print("entries w/o detalhes:", len(re.findall(r'\n    \{', dtxt)) - len(re.findall(r'detalhes: \{', dtxt)))
for tipo in ('geral', 'classe', 'ability', 'distincao', 'concedido', 'complicacao', 'racial', 'origem'):
    c = Counter(S(d).get('subtipo') for _, d in docs if d.get('type') == 'poder' and S(d).get('tipo') == tipo)
    print(f"== poder/{tipo} ({sum(c.values())}) ==", dict(sorted(c.items(), key=lambda x: -x[1])))
print("== Implante/Cobaia ==")
print([(d.get('name'), S(d).get('tipo'), S(d).get('subtipo')) for _, d in docs if 'mplante' in (d.get('name') or '') or 'obaia' in (d.get('name') or '')])
print("tipo=distincao st='':", [(d.get('name')) for _, d in docs if d.get('type') == 'poder' and S(d).get('tipo') == 'distincao' and not S(d).get('subtipo')][:20])
print("== Sulfure ==", [(p, d.get('name'), S(d).get('tipo'), re.sub(r'\s+', ' ', D(d))[:200]) for p, d in docs if S(d).get('subtipo') == 'Sulfure'])
print("== Suraggel sup nomes ==", sorted({d.get('name') for _, d in docs if S(d).get('subtipo') == 'Suraggel'}))
rtxt = open('/home/user/VTTArmada/calculadora/racas.js', encoding='utf-8').read()
m = re.search(r'SURAGEL_HERANCAS = \{(.*?)\n\};', rtxt, re.S)
print("== Suraggel ours nomes ==", sorted(set(re.findall(r"name: '((?:[^'\\]|\\.)*)'", m.group(1)))) if m else "NOMATCH")
