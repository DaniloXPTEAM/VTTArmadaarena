import json, sys, re, unicodedata, html as ihtml
from collections import Counter
sys.path.insert(0, '/home/user/work')
from leveldb_read import read_pack, split_key
R = '/home/user/vendor-review/Suplementos-de-Arton/packs/'
PACKS = ['ameacas-de-arton','atlas-de-arton','deuses-de-arton','distincoes','guia-de-deuses-menores','guia-de-npcs-and-dbs','herois-de-arton']
docs = []
for pack in PACKS:
    for k, v in read_pack(R + pack).items():
        try: d = json.loads(v.decode('utf-8'))
        except Exception: continue
        try: ns, kp = split_key(k)
        except Exception: continue
        if '.' in ns or ns in ('folders','?'): continue
        if not isinstance(d, dict) or 'system' not in d: continue
        docs.append((pack, d))
def clean(h):
    if not h: return ''
    h = re.sub(r'@UUID\[[^\]]*\]\{([^}]*)\}', r'\1', h)
    t = re.sub(r'<br\s*/?>', '\n', h); t = re.sub(r'</p\s*>', '\n\n', t)
    t = re.sub(r'<[^>]+>', '', t); t = ihtml.unescape(t)
    return re.sub(r'\n\s*\n+', '\n\n', re.sub(r'[ \t]+', ' ', t)).strip()

print("== arma: ataques sample (2) + distincts ==")
n = 0
for pack, d in docs:
    if d.get('type') == 'arma' and n < 2 and (d.get('system') or {}).get('ataques'):
        print(f"--- {d.get('name')}: ataques={json.dumps((d.get('system') or {}).get('ataques'), ensure_ascii=False)[:600]}")
        n += 1
for f in ('alcance','empunhadura','proficiencia'):
    print(f, Counter(json.dumps((d.get('system') or {}).get(f), ensure_ascii=False) for _, d in docs if d.get('type') == 'arma').most_common(12))
print("arma sem ataques:", sum(1 for _, d in docs if d.get('type') == 'arma' and not (d.get('system') or {}).get('ataques')))
print("\n== equipamento tipo distinct ==")
print(Counter(json.dumps((d.get('system') or {}).get('tipo'), ensure_ascii=False) for _, d in docs if d.get('type') == 'equipamento').most_common(12))
print("equip com armadura>0:", sum(1 for _, d in docs if d.get('type') == 'equipamento' and ((d.get('system') or {}).get('armadura') or {}).get('value')))
print("\n== consumivel tipo distinct ==")
print(Counter(json.dumps((d.get('system') or {}).get('tipo'), ensure_ascii=False) for _, d in docs if d.get('type') == 'consumivel').most_common(12))
print("\n== tesouro sample ==")
for pack, d in docs:
    if d.get('type') == 'tesouro' and d.get('name') == 'Tatuagem Mística':
        print(json.dumps(d.get('system'), ensure_ascii=False)[:500]); print("DESC:", clean(((d.get('system') or {}).get('description') or {}).get('value'))[:300])
        break
print("\n== Melhor Amigo CLASSE doc ==")
for pack, d in docs:
    if d.get('type') == 'classe' and d.get('name') == 'Melhor Amigo':
        s = d.get('system', {})
        print("keys:", sorted(s.keys()))
        print("DESC:", clean((s.get('description') or {}).get('value'))[:600])
print("\n== Controlar Ar FULL desc len ==")
for pack, d in docs:
    if d.get('name') == 'Controlar Ar':
        dd = clean(((d.get('system') or {}).get('description') or {}).get('value'))
        print(len(dd))
        open('/home/user/work/controlar_ar.txt','w').write(dd)
