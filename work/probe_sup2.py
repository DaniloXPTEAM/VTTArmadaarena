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
def S(d): return d.get('system') or {}
def D(d): return ((S(d).get('description')) or {}).get('value') or ''
arms = [d for _, d in docs if d.get('type') == 'arma']
for f in ('tipoUso', 'empunhadura', 'proficiencia', 'alcance', 'criticoM', 'criticoX'):
    print("arma", f, Counter(json.dumps(S(d).get(f), ensure_ascii=False) for d in arms).most_common(10))
dano = sum(1 for d in arms if re.search(r'dano \d+d\d+', D(d), re.I))
td = sum(1 for d in arms if re.search(r'dano de [a-záéíóúç]+', D(d), re.I))
cat = Counter(m.group(1) for d in arms for m in [re.search(r'arma (simples|marcial|exótica|de fogo)', D(d), re.I)] if m)
print("arma dano-hit:", dano, "/113; tipo_dano-hit:", td, "/113; categoria-mencao:", dict(cat))
print("arma subtipo-vals:", Counter(S(d).get('subtipo') for d in arms).most_common(5))
print("tipoUso sample:", [(d.get('name'), S(d).get('tipoUso')) for d in arms[:8]])
print("== DIST keys ours ==")
import unicodedata
def norm(s):
    s = unicodedata.normalize('NFKD', s or '').encode('ascii', 'ignore').decode()
    return re.sub(r'[^a-z0-9 ]', '', s.lower()).strip()
dtxt = open('/home/user/VTTArmada/poderes/js/distincoes-data.js', encoding='utf-8').read()
keys = [m.group(1) for m in re.finditer(r"name: '((?:[^'\\]|\\.)*)',\r?\n        source:", dtxt)]
print(len(keys), "dists")
for want in ['Capitão Pirata', 'Mahou', 'Dracomante Real', 'Aeronauta Goblin', 'Aeronauta', 'Cavaleiro', 'Caçador de Cabeças', 'Mutagenista', 'Engenhoqueiro', 'Cozinheiro', 'Armadilheiro', 'Carteador', 'Exegeta do Akzath', 'Cavaleiro Feérico', 'Herói Henshin', 'Cavaleiro do Corvo']:
    print(" ", want, "->", "OK" if norm(want) in {norm(k) for k in keys} else "FALTA")
print("== Cobaia ==")
for p, d in docs:
    st = S(d).get('subtipo') or ''
    if st == 'Cobaia dos Médicos Monstros' or st.startswith('Implante:') or d.get('name') == 'Cobaia dos Médicos Monstros':
        print(f"  [{p}/{d.get('type')}/{S(d).get('tipo')}/{st}] {d.get('name')}")
print("== Suraggel subtipos ==", Counter(S(d).get('subtipo') for _, d in docs if (S(d).get('subtipo') or '').lower().startswith('suraggel') or S(d).get('subtipo') in ('Sulfure',)).most_common())
print("== Moreau unaccent ==", [(d.get('name'), S(d).get('subtipo')) for _, d in docs if S(d).get('subtipo') in ('Moreau (Bufalo)', 'Moreau (Leao)', 'Moreau do Lobo')])
print("== (Parceiro) nomes ==", [(d.get('name')) for _, d in docs if '(Parceiro)' in (d.get('name') or '')])
print("== Mascote nomes ==", [(d.get('name')) for _, d in docs if (d.get('name') or '').startswith('Mascote: ')])
print("== Montaria nomes ==", [(d.get('name')) for _, d in docs if (d.get('name') or '').startswith('Montaria: ')])
print("== ConjMag tipo ==", Counter((S(d).get('tipo'), S(d).get('subtipo')) for _, d in docs if (d.get('name') or '').startswith('Conjuração Magibélica')).most_common())
print("== Transformacao ==", Counter((S(d).get('tipo'), S(d).get('subtipo')) for _, d in docs if S(d).get('subtipo') == 'Transformação').most_common())
print("== geral st distinct ==", Counter(S(d).get('subtipo') for _, d in docs if d.get('type') == 'poder' and S(d).get('tipo') == 'geral').most_common(25))
