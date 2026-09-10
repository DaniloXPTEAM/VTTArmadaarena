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
print("== geral st='' ==", sorted({(d.get('name'), p) for p, d in docs if d.get('type') == 'poder' and S(d).get('tipo') == 'geral' and not S(d).get('subtipo')}))
print("== ability st='' ==", sorted({(d.get('name'), p) for p, d in docs if d.get('type') == 'poder' and S(d).get('tipo') == 'ability' and not S(d).get('subtipo')}))
print("== racial st='' ==", [(p, d.get('name')) for p, d in docs if d.get('type') == 'poder' and S(d).get('tipo') == 'racial' and not S(d).get('subtipo')])
print("== classe Valkaria/ability Grupo ==", [(p, d.get('name'), S(d).get('tipo'), S(d).get('subtipo')) for p, d in docs if (S(d).get('tipo'), S(d).get('subtipo')) in (('classe', 'Valkaria'), ('ability', 'Grupo'))])
print("== (Marca) nomes ==", [(d.get('name'), S(d).get('tipo'), S(d).get('subtipo')) for _, d in docs if '(Marca)' in (d.get('name') or '')])
print("== Mashin nomes ==", sorted({(d.get('name'), S(d).get('tipo')) for _, d in docs if S(d).get('subtipo') == 'Mashin'}))
print("== Informantes ==", sorted({d.get('name') for _, d in docs if S(d).get('subtipo') == 'Informantes'}))
print("== Cabriolas ==", sorted({d.get('name') for _, d in docs if S(d).get('subtipo') == 'Cabriolas de Bobo'}))
print("== Ingredientes ==", sorted({d.get('name') for _, d in docs if S(d).get('subtipo') == 'Ingredientes Monstruosos'}))
print("== Gambiarra ==", sorted({d.get('name') for _, d in docs if S(d).get('subtipo') == 'Gambiarra'}))
print("== Dracomante ==", sorted({d.get('name') for _, d in docs if S(d).get('subtipo') == 'Dracomante'}))
print("== Armadilhas/Armadilheiro ==", sorted({d.get('name') for _, d in docs if S(d).get('subtipo') in ('Armadilhas', 'Armadilheiro')}))
print("== Capitao ==", sorted({d.get('name') for _, d in docs if S(d).get('subtipo') == 'Capitão do Conclave Pirata'}))
print("== Mahou ==", sorted({d.get('name') for _, d in docs if S(d).get('subtipo') == 'Mestre Mahou-Jutsu'}))
print("== Golem-geral ==", [(d.get('name')) for _, d in docs if d.get('type') == 'poder' and S(d).get('tipo') == 'geral' and S(d).get('subtipo') == 'Golem'])
print("== Suraggel-geral ==", [(d.get('name')) for _, d in docs if d.get('type') == 'poder' and S(d).get('tipo') == 'geral' and S(d).get('subtipo') == 'Suraggel'])
print("== Ornitopteros ==", sorted({(d.get('name'), S(d).get('tipo'), S(d).get('subtipo')) for _, d in docs if (S(d).get('subtipo') or '').startswith('Ornitóptero')}))
