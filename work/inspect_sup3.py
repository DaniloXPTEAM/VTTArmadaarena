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
def norm(s):
    s = unicodedata.normalize('NFKD', s or '').encode('ascii','ignore').decode()
    return re.sub(r'[^a-z0-9 ]', '', s.lower()).strip()

print("== Melhor Amigo classe: inicial/niveis/pericias/pv/pm ==")
for pack, d in docs:
    if d.get('type') == 'classe' and d.get('name') == 'Melhor Amigo':
        s = d.get('system', {})
        for f in ('pvPorNivel','pmPorNivel','pericias','inicial','niveis'):
            print(f, json.dumps(s.get(f), ensure_ascii=False)[:400])

print("\n== marca audit (novas distinções candidatas) ==")
cands = ['Transformação Monstruosa','Mutagênico','Gambiarra','Informantes','Ingredientes Monstruosos','Conjuração Magibélica','Cabriolas de Bobo','Mestre Mahou-Jutsu','Capitão do Conclave Pirata','Dracomante','Cobaia dos Médicos Monstros']
for c in cands:
    ps = [(d.get('name')) for _, d in docs if d.get('type') == 'poder' and (d.get('system') or {}).get('subtipo') == c]
    marca = [n for n in ps if '(Marca)' in n]
    print(f"{c}: {len(ps)} poderes, marca={marca}, ex={[n for n in ps if '(Marca)' not in n][:3]}")

print("\n== merges: nomes sup vs (verificar depois) ==")
for c in ['Aeronauto Goblin','Caveleiro Feérico','Caçador de Cabeça','Caçador de Cabeças','Ornitóptero Goblin','Ornitópteros Goblins','Armadilhas','Armadilheiro','Inovação','inovação','Golem','Mashin']:
    ps = [d.get('name') for _, d in docs if d.get('type') == 'poder' and (d.get('system') or {}).get('subtipo') == c]
    print(f"{c} ({len(ps)}): {ps}")

print("\n== Mundana 18 + tipo ==")
for _, d in docs:
    if (d.get('system') or {}).get('subtipo') == 'Mundana':
        print(f"  {(d.get('system') or {}).get('tipo')}: {d.get('name')}")

print("\n== atlas poderes sample (4) ==")
n = 0
for pack, d in docs:
    if pack == 'atlas-de-arton' and d.get('type') == 'poder' and n < 4:
        print(f"  [{(d.get('system') or {}).get('subtipo')}/{d.get('type')}] {d.get('name')}: {clean(((d.get('system') or {}).get('description') or {}).get('value'))[:200]}")
        n += 1
print("\n== Demonio de Areia ==")
for _, d in docs:
    if d.get('name') == 'Demônio de Areia: Serpente':
        print("tipo:", (d.get('system') or {}).get('tipo'), "|", clean(((d.get('system') or {}).get('description') or {}).get('value'))[:350])
print("\n== Frade/Treinador missing names ==")
V = '/home/user/VTTArmada/'
txt = open(V + 'poderes/js/data.js', encoding='utf-8').read()
opow = {norm(x) for x in re.findall(r'^        name: "((?:[^"\\]|\\.)*)",?\s*$', txt, re.M)}
for st in ('Frade','Treinador'):
    ms = [d.get('name') for _, d in docs if d.get('type') == 'poder' and (d.get('system') or {}).get('subtipo') == st and norm(d.get('name')) not in opow]
    print(f"{st} missing ({len(ms)}): {ms}")
print("\n== Suraggel sup vs ours ==")
sura = [d.get('name').replace('Herança de ','') for _, d in docs if (d.get('system') or {}).get('subtipo') == 'Suraggel']
ours_s = re.findall(r"^    '([^']+)': \{$", open(V + 'calculadora/racas.js', encoding='utf-8').read()[:20000], re.M)
print("sup:", sorted(sura))
print("ours-missing:", [x for x in sura if x not in ours_s])
print("\n== Dracomante/Mahou/Capitao marca texts ==")
for c in ['Dracomante','Mestre Mahou-Jutsu','Capitão do Conclave Pirata']:
    for _, d in docs:
        if d.get('type') == 'poder' and (d.get('system') or {}).get('subtipo') == c and '(Marca)' in (d.get('name') or ''):
            print(f"{c}: {clean(((d.get('system') or {}).get('description') or {}).get('value'))[:200]}")
