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
NAMES = ['Controlar Ar', 'Material Especial', 'Procedimento Inicial', 'Propósito', 'Pequeno',
         'Golem a Vapor', 'Programação Mágica', 'Chassi Dourado', 'Jogo Perigoso', 'Demônio de Areia',
         'Cura Acelerada', 'Ferro', 'Bode Espiatório', 'Florescer Feérico', 'Código do Samurai',
         'Melhor Amigo', 'Devoção Iluminada', 'Cobaia dos Médicos Monstros', 'Nitamuraniano']
for n in NAMES:
    hits = [(p, d) for p, d in docs if d.get('name') == n]
    for p, d in hits[:2]:
        print(f"### {n} [{p} type={d.get('type')} tipo={S(d).get('tipo')} subtipo={S(d).get('subtipo')} src={S(d).get('source')}]")
        print("DESC:", re.sub(r'\s+', ' ', D(d))[:500])
print("### Honra/Ambicao/Barba/syspath:")
for p, d in docs:
    if S(d).get('subtipo') in ('Honra', 'Ambição', 'Barba Branca', 'system.pericias.perc.bonus'):
        print(f"  [{S(d).get('subtipo')}/{S(d).get('tipo')}] {d.get('name')}: {re.sub(chr(92)+'s+', ' ', D(d))[:220]}")
print("### Varias/Geupo/Revoada/Dark:")
for p, d in docs:
    st = S(d).get('subtipo') or ''
    if st in ('Várias', 'Geupo') or d.get('name') in ('Revoada de Texugos', 'Bola de Fogo Flamejante'):
        print(f"  [{p}/{S(d).get('tipo')}/{st}] {d.get('name')}: {re.sub(chr(92)+'s+', ' ', D(d))[:200]}")
print("### amostras Montaria:/Mascote:/Familiar/Parceiro:")
for pat in ('Montaria: ', 'Mascote: '):
    for p, d in docs:
        if (d.get('name') or '').startswith(pat):
            print(f"  [{S(d).get('tipo')}/{S(d).get('subtipo')}] {d.get('name')}: {re.sub(chr(92)+'s+', ' ', D(d))[:400]}"); break
for p, d in docs:
    if (d.get('name') or '').endswith('(Familiar)') and 'Stagh' in d.get('name'):
        print(f"  FAM [{S(d).get('tipo')}/{S(d).get('subtipo')}] {d.get('name')}: {re.sub(chr(92)+'s+', ' ', D(d))[:500]}"); break
for p, d in docs:
    if '(Parceiro)' in (d.get('name') or ''):
        print(f"  PAR [{S(d).get('tipo')}/{S(d).get('subtipo')}] {d.get('name')}: {re.sub(chr(92)+'s+', ' ', D(d))[:300]}"); break
print("### arma sample:")
for p, d in docs:
    if d.get('type') == 'arma':
        s = S(d); print(" ", d.get('name'), "| emp:", s.get('empunhadura'), "| critM/X:", s.get('criticoM'), s.get('criticoX'),
              "| preco:", json.dumps(s.get('preco'), ensure_ascii=False), "| espacos:", json.dumps(s.get('espacos'), ensure_ascii=False),
              "| prof:", s.get('proficiencia'), "| alcance:", json.dumps(s.get('alcance'), ensure_ascii=False),
              "| tipoUso:", s.get('tipoUso'), "| src:", s.get('source'))
        print("  DESC:", re.sub(chr(92)+'s+', ' ', D(d))[:300]); break
print("### equip armor/escudo:")
for t in ('leve', 'pesada', 'escudo'):
    for p, d in docs:
        if d.get('type') == 'equipamento' and S(d).get('tipo') == t:
            s = S(d); print(" ", t, d.get('name'), "| armadura:", json.dumps(s.get('armadura'), ensure_ascii=False),
                  "| preco:", json.dumps(s.get('preco'), ensure_ascii=False), "| espacos:", json.dumps(s.get('espacos'), ensure_ascii=False),
                  "| src:", s.get('source')); print("  DESC:", re.sub(chr(92)+'s+', ' ', D(d))[:250]); break
print("### consumivel/tesouro:")
for p, d in docs:
    if d.get('type') == 'consumivel':
        s = S(d); print(" ", S(d).get('tipo'), d.get('name'), "| preco:", json.dumps(s.get('preco'), ensure_ascii=False),
              "| espacos:", json.dumps(s.get('espacos'), ensure_ascii=False)); print("  DESC:", re.sub(chr(92)+'s+', ' ', D(d))[:250]); break
for p, d in docs:
    if d.get('type') == 'tesouro':
        s = S(d); print(" ", d.get('name'), "| preco:", json.dumps(s.get('preco'), ensure_ascii=False),
              "| espacos:", json.dumps(s.get('espacos'), ensure_ascii=False), "| src:", s.get('source'))
        print("  DESC:", re.sub(chr(92)+'s+', ' ', D(d))[:250]); break
print("### magia sample (escola/alcance/duracao/resistencia/ativacao/circulo):")
for p, d in docs:
    if d.get('type') == 'magia' and d.get('name') == 'Controlar Ar':
        s = S(d); print("  ControlarAr:", json.dumps({k: s.get(k) for k in ('tipo', 'escola', 'alcance', 'duracao', 'resistencia', 'ativacao', 'circulo', 'alvo', 'area', 'duracao', 'source')}, ensure_ascii=False))
        break
else: print("  Controlar Ar NAO ACHADO como magia; nomes magia:", sorted({d.get('name') for _, d in docs if d.get('type') == 'magia'})[:60])
