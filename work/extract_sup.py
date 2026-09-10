import json, sys, re, html as ihtml
sys.path.insert(0, '/home/user/work')
from leveldb_read import read_pack, split_key
R = '/home/user/vendor-review/Suplementos-de-Arton/packs/'
PACKS = ['ameacas-de-arton','atlas-de-arton','deuses-de-arton','distincoes','guia-de-deuses-menores','guia-de-npcs-and-dbs','herois-de-arton']
alldocs = []
for pack in PACKS:
    for k, v in read_pack(R + pack).items():
        try: d = json.loads(v.decode('utf-8'))
        except Exception: continue
        try: ns, kp = split_key(k)
        except Exception: continue
        if '.' in ns or ns in ('folders','?'): continue
        if not isinstance(d, dict) or 'system' not in d: continue
        alldocs.append((pack, d))
print(f"total topo: {len(alldocs)}")

def clean(h):
    if not h: return ''
    t = re.sub(r'<br\s*/?>', '\n', h)
    t = re.sub(r'</p\s*>', '\n\n', t)
    t = re.sub(r'<[^>]+>', '', t)
    t = ihtml.unescape(t)
    t = re.sub(r'[ \t]+', ' ', t)
    t = re.sub(r'\n\s*\n+', '\n\n', t)
    return t.strip()

def desc_of(d):
    dd = (d.get('system') or {}).get('description') or {}
    return clean(dd.get('value') or '')

WANT = ['Disparo Elemental','Oito Nuvens','Avalanche das Três Mãos','Melhor Amigo','Amigo Feroz','Mashin','Chassi - Mashin',
 'Montaria: Troll','Pakk (Familiar)','Mestre Dracônico (Marca)','Implante: Garras','Chef Hynne','Forma de Morcego',
 'Pistola Demoníaca','Armadura de Ossos','Bomba de fumaça','Dente de Wisphago','Controlar Ar','Tempo Místico',
 'Medo Verdadeiro','Devoção Ampla','Ferro','Jogo Perigoso','Florescer Feérico','Cura Acelerada','Código do Samurai',
 'Atributos - Kobolds','Herança de Ordine','Afinidade Elemental (Água)','Bode Espiatório','Chuva de Flechas',
 'Mascote: Mico-Leão Dourado','Inovação: Cano Serrado (Arma)','Armadilha: Mina','Citadino Abastado','Bola de Fogo Flamejante']
seen = set()
out = []
for pack, d in alldocs:
    if d.get('name') in WANT and d.get('name') not in seen:
        seen.add(d.get('name'))
        s = d.get('system', {})
        out.append(f"===== {d.get('name')} [{d.get('type')}] pack={pack} subtipo={s.get('subtipo')} source={s.get('source')}")
        skip = {'description','chatFlavor','chatGif','automationtags','rolltags','rolls','grants','skills'}
        syscopy = {k: v for k, v in s.items() if k not in skip}
        out.append("SYS: " + json.dumps(syscopy, ensure_ascii=False)[:900])
        out.append("DESC: " + desc_of(d)[:700])
        out.append("")
print(f"achadas: {len(seen)}/{len(WANT)} faltando: {set(WANT)-seen}")
open('/home/user/work/sup_samples.txt','w').write('\n'.join(out))
# distinct system.source values
from collections import Counter
print("sources:", Counter((d.get('system') or {}).get('source') or '?' for _, d in alldocs).most_common(15))
