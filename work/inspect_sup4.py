import json, sys, re, unicodedata, html as ihtml
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
def norm(s):
    s = unicodedata.normalize('NFKD', s or '').encode('ascii','ignore').decode()
    return re.sub(r'[^a-z0-9 ]', '', s.lower()).strip()

print("== Golem-subtipo: descs ==")
for _, d in docs:
    if (d.get('system') or {}).get('subtipo') == 'Golem':
        print(f"  {d.get('name')}: {clean(((d.get('system') or {}).get('description') or {}).get('value'))[:130]}")
print("\n== Conjuracao Magibelica ==")
for _, d in docs:
    if (d.get('system') or {}).get('subtipo') == 'Conjuração Magibélica':
        s = d.get('system', {})
        print(f"  {d.get('name')} tipo={s.get('tipo')}: {clean((s.get('description') or {}).get('value'))[:250]}")
print("\n== Transformacao Monstruosa sample ==")
for _, d in docs:
    if (d.get('system') or {}).get('subtipo') == 'Transformação Monstruosa' and d.get('name') in ('Regeneração','Veneno'):
        print(f"  {d.get('name')}: {clean(((d.get('system') or {}).get('description') or {}).get('value'))[:250]}")
print("\n== Material Especial ==")
for _, d in docs:
    if d.get('name') == 'Material Especial':
        print(clean(((d.get('system') or {}).get('description') or {}).get('value'))[:400])
print("\n== Mutagenico/Gambiarra/Informantes/Ingredientes/Cabriolas: pack+tipo ==")
from collections import Counter
print(Counter((p, (d.get('system') or {}).get('tipo')) for p, d in docs if (d.get('system') or {}).get('subtipo') in ('Mutagênico','Gambiarra','Informantes','Ingredientes Monstruosos','Cabriolas de Bobo')))
print("\n== atlas poderes vs powersData ===")
V = '/home/user/VTTArmada/'
opow = {norm(x) for x in re.findall(r'^        name: "((?:[^"\\]|\\.)*)",?\s*$', open(V + 'poderes/js/data.js', encoding='utf-8').read(), re.M)}
atlas = [(d.get('name'), (d.get('system') or {}).get('tipo')) for p, d in docs if p == 'atlas-de-arton' and d.get('type') == 'poder']
print(f"atlas poderes: {len(atlas)}, já em powersData: {sum(1 for n, t in atlas if norm(n) in opow)}")
print("ex novos:", [(n, t) for n, t in atlas if norm(n) not in opow][:12])
print("\n== Moreau sup poderes vs ours ==")
moret = open(V + 'calculadora/racas.js', encoding='utf-8').read()
mm = re.search(r'MOREAU_HERANCAS = \{(.*?)\n\};', moret, re.S)
o_mp = {norm(x) for x in re.findall(r"name: '((?:[^'\\]|\\.)*)'", mm.group(1))}
sup_mo = [(d.get('name'), (d.get('system') or {}).get('subtipo')) for _, d in docs if (d.get('system') or {}).get('tipo') == 'racial' and norm((d.get('system') or {}).get('subtipo') or '').startswith('moreau')]
print(f"sup moreau: {len(sup_mo)}, já nas heranças: {sum(1 for n, s in sup_mo if norm(n) in o_mp)}")
print("novos:", [(n, s) for n, s in sup_mo if norm(n) not in o_mp][:20])
