import json, sys, re
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
print("total:", len(docs))
print("types:", Counter(d.get('type') for _, d in docs).most_common())
print("poder.tipos:", Counter((d.get('system') or {}).get('tipo') for _, d in docs if d.get('type') == 'poder').most_common())
for t in ('magia', 'arma', 'armadura', 'equipamento', 'consumivel', 'tesouro', 'classe'):
    c = Counter(json.dumps((d.get('system') or {}).get('tipo'), ensure_ascii=False) for _, d in docs if d.get('type') == t).most_common(15)
    if c: print(t, "tipos:", c)
print("atlas:", Counter(((d.get('system') or {}).get('tipo'), (d.get('system') or {}).get('subtipo')) for p, d in docs if p == 'atlas-de-arton' and d.get('type') == 'poder').most_common())
for t in ('poder', 'magia', 'arma', 'armadura', 'equipamento'):
    for _, d in docs:
        if d.get('type') == t:
            print(t, "syskeys:", sorted((d.get('system') or {}).keys())); break
for _, d in docs:
    if d.get('type') == 'poder' and d.get('name') == 'Controlar Ar':
        print("ControlarAr:", json.dumps(d.get('system'), ensure_ascii=False)[:400]); break
for _, d in docs:
    if (d.get('system') or {}).get('tipo') == 'origem' and d.get('name') == 'Nitamuraniano':
        print("Nita:", json.dumps(d.get('system'), ensure_ascii=False)[:600]); break
