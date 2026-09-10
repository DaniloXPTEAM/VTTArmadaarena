"""Importa conteúdo ausente dos Suplementos p/ VTTArmada. Uso: import_sup.py [--dry-run|--apply]"""
import json, sys, re, os, shutil, unicodedata, html as ihtml
from collections import Counter, defaultdict
sys.path.insert(0, '/home/user/work')
from leveldb_read import read_pack, split_key

DRY = '--apply' not in sys.argv
V = '/home/user/VTTArmada/'
R = '/home/user/vendor-review/Suplementos-de-Arton/packs/'
PACKS = ['ameacas-de-arton', 'atlas-de-arton', 'deuses-de-arton', 'distincoes',
         'guia-de-deuses-menores', 'guia-de-npcs-and-dbs', 'herois-de-arton']
BK = '/home/user/work/backup-imp/'

def norm(s):
    s = unicodedata.normalize('NFKD', s or '').encode('ascii', 'ignore').decode()
    return re.sub(r'[^a-z0-9 ]', '', s.lower()).strip()

def norm_np(s):  # sem parênteses
    s = unicodedata.normalize('NFKD', s or '').encode('ascii', 'ignore').decode()
    s = re.sub(r'\([^)]*\)', '', s)
    return re.sub(r'[^a-z0-9 ]', '', s.lower()).strip()

def clean(h):
    if not h: return ''
    h = re.sub(r'@UUID\[[^\]]*\]\{([^}]*)\}', r'\1', h)
    t = re.sub(r'<br\s*/?>', '\n', h)
    t = re.sub(r'</p\s*>', '\n\n', t)
    t = re.sub(r'<[^>]+>', '', t)
    t = ihtml.unescape(t)
    t = re.sub(r'[ \t]+', ' ', t)
    return re.sub(r'\n\s*\n+', '\n\n', t).strip()

def split_req(desc):
    m = re.search(r'\s*Pré-requisitos?:\s*(.+?)\s*$', desc, re.S)
    if m:
        req = re.sub(r'\s+', ' ', m.group(1)).strip()
        return req, desc[:m.start()].strip()
    return None, desc

def jstr(s):
    return json.dumps(s, ensure_ascii=False)

def sstr(s):  # single-quoted JS
    s = re.sub(r'\s+', ' ', s).strip()
    return "'" + s.replace('\\', '\\\\').replace("'", "\\'") + "'"

PACK_SRC = {'ameacas-de-arton': 'ameacas', 'atlas-de-arton': 'atlas', 'deuses-de-arton': 'deuses',
            'herois-de-arton': 'herois', 'distincoes': 'herois',
            'guia-de-deuses-menores': 'deuses', 'guia-de-npcs-and-dbs': 'outras'}
PACK_FONTE = {'ameacas-de-arton': 'Ameaças de Arton', 'atlas-de-arton': 'Atlas de Arton',
              'deuses-de-arton': 'Deuses de Arton', 'herois-de-arton': 'Heróis de Arton',
              'distincoes': 'Heróis de Arton', 'guia-de-deuses-menores': 'Guia de Deuses Menores',
              'guia-de-npcs-and-dbs': 'Guia de NPCs'}
def slug_of(pack, docsrc):
    if re.search(r'dragão brasil|db#|db\s*\d', docsrc or '', re.I): return 'dragaobrasil'
    return PACK_SRC[pack]
def fonte_of(pack, docsrc):
    if re.search(r'dragão brasil|db#|db\s*\d', docsrc or '', re.I): return 'Dragão Brasil'
    return PACK_FONTE[pack]

TYPO_FIX = {'Estudante Deligente': 'Estudante Diligente',
            'Sacrário do Compartilhamneto': 'Sacrário do Compartilhamento'}

# ---------------- carrega sup ----------------
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
print(f"sup docs topo: {len(docs)}")

# ---------------- carrega nosso lado (dedupe) ----------------
ptxt = open(V + 'poderes/js/data.js', encoding='utf-8').read()
POW_NAMES = re.findall(r'^        name: "((?:[^"\\]|\\.)*)",?\s*$', ptxt, re.M)
POW_NORM = {norm(x) for x in POW_NAMES}
blocks = re.split(r'\n    \},', ptxt)
POW_TRIPLE = set()
for b in blocks:
    mn = re.search(r'name: "((?:[^"\\]|\\.)*)"', b)
    mc = re.search(r'class: "([a-z-]+)"', b)
    mp = re.search(r'pathReq: "([a-z-]+)"', b)
    if mn and mc and mp: POW_TRIPLE.add((norm(mn.group(1)), mc.group(1), mp.group(1)))
dtxt = open(V + 'poderes/js/distincoes-data.js', encoding='utf-8').read()
DIST_POD = defaultdict(set)  # dist name -> set norm poderes
for m in re.finditer(r"name: '((?:[^'\\]|\\.)*)',\n        source:", dtxt):
    dname = m.group(1)
    seg = dtxt[m.start():m.start() + 12000]
    pm = re.search(r'poderes: \[(.*?)\n        \]', seg, re.S)
    if pm: DIST_POD[dname] = {norm_np(x) for x in re.findall(r"name: '((?:[^'\\]|\\.)*)'", pm.group(1))}
DIST_NORM = {norm_np(k): k for k in DIST_POD}
ARSENAL = {norm_np(x) for x in re.findall(r"\{ n: '((?:[^'\\]|\\.)*)'", dtxt)}
partxt = open(V + 'parceiros/parceiros.js', encoding='utf-8').read()
PAR_NORM = {norm(x) for x in re.findall(r'"name": "((?:[^"\\]|\\.)*)"', partxt)}
IT_NORM = set()
for f in ('itens/data/armas.js', 'itens/data/armaduras.js', 'itens/data/itens.js', 'itens/data/itensmagicos.js'):
    IT_NORM |= {norm(x) for x in re.findall(r'"nome": "((?:[^"\\]|\\.)*)"', open(V + f, encoding='utf-8').read())}
SPELL_NORM = {norm(x) for x in re.findall(r'"n": "((?:[^"\\]|\\.)*)"', open(V + 'grimorio/spells_db.js', encoding='utf-8').read())}
otxt = open(V + 'poderes/js/origens.js', encoding='utf-8').read()
ORIG_NORM = {norm(x) for x in re.findall(r"^    name: '((?:[^'\\]|\\.)*)',?\s*$", otxt, re.M)}
rtxt = open(V + 'calculadora/racas.js', encoding='utf-8').read()
GOLEM_POW = {}
for ch in ('mashin', 'barro', 'bronze', 'carne', 'espelho', 'ferro', 'gelo', 'pedra', 'sucata', 'dourado'):
    m = re.search(ch + r': \{(.*?)\n    \},', rtxt, re.S)
    GOLEM_POW[ch] = {norm(x) for x in re.findall(r"name: '((?:[^'\\]|\\.)*)'", m.group(1))} if m else set()
mm = re.search(r'MOREAU_HERANCAS = \{(.*?)\n\};', rtxt, re.S)
MOREAU_POW = {norm(x) for x in re.findall(r"name: '((?:[^'\\]|\\.)*)'", mm.group(1))}

# ---------------- roteamento ----------------
CLASS_SUB = {'Místico': ('mistico', 'all', 'Místico'), 'Samurai': ('samurai', 'all', 'Samurai'),
             'Treinador': ('treinador', 'all', 'Treinador'), 'Frade': ('frade', 'all', 'Frade'),
             'Melhor Amigo': ('treinador', 'melhoramigo', 'Melhor Amigo'),
             'Miragem': ('cacador', 'miragem', 'Miragem'), 'MIragem': ('cacador', 'miragem', 'Miragem'),
             'Duelista': ('bucaneiro', 'duelista', 'Duelista'), 'Vassalo': ('cavaleiro', 'vassalo', 'Vassalo'),
             'Usurpador': ('clerigo', 'usurpador', 'Usurpador'), 'Ermitão': ('druida', 'ermitao', 'Ermitão'),
             'Seteiro': ('cacador', 'seteiro', 'Seteiro'),
             'Machado de Pedra': ('barbaro', 'machadodepedra', 'Machado de Pedra'),
             'Magimarcialista': ('bardo', 'magimarcialista', 'Magimarcialista'),
             'Inovador': ('guerreiro', 'inovador', 'Inovador'), 'Burguês': ('nobre', 'burgues', 'Burguês'),
             'Ventanista': ('ladino', 'ventanista', 'Ventanista'),
             'Necromante': ('arcanista', 'necromante', 'Necromante'),
             'Atleta': ('lutador', 'atleta', 'Atleta'),
             'Inovação': ('inventor', 'all', 'Inventor'), 'inovação': ('inventor', 'all', 'Inventor'),
             'inventor': ('inventor', 'all', 'Inventor'), 'Inventor': ('inventor', 'all', 'Inventor'),
             'Arcanista': ('arcanista', 'arcanista-base', 'Arcanista'), 'Bárbaro': ('barbaro', 'barbaro-base', 'Bárbaro'),
             'Bardo': ('bardo', 'bardo-base', 'Bardo'), 'Bucaneiro': ('bucaneiro', 'bucaneiro-base', 'Bucaneiro'),
             'Caçador': ('cacador', 'cacador-base', 'Caçador'), 'Cavaleiro': ('cavaleiro', 'cavaleiro-base', 'Cavaleiro'),
             'Clérigo': ('clerigo', 'clerigo-base', 'Clérigo'), 'Druida': ('druida', 'druida-base', 'Druida'),
             'Guerreiro': ('guerreiro', 'guerreiro-base', 'Guerreiro'), 'Ladino': ('ladino', 'ladino-base', 'Ladino'),
             'Lutador': ('lutador', 'lutador-base', 'Lutador'), 'Nobre': ('nobre', 'nobre-base', 'Nobre'),
             'Paladino': ('paladino', 'paladino-base', 'Paladino')}
NAME_CLASS = {'Treino Intensivo (Melhor Amigo)': ('treinador', 'melhoramigo', 'Melhor Amigo'),
              'Código do Samurai': ('samurai', 'all', 'Samurai'),
              'Melhor Amigo': ('treinador', 'all', 'Treinador')}
VAMPIRE = {'Forma de Morcego', 'Forma de Lobo', 'Drenar Sangue', 'Dominação Vampírica', 'Natureza Não Viva',
           'Sede de Sangue', 'Sensibilidade ao Sol', 'Chamado das Trevas', 'Resquícios da Outra Vida',
           'Passo Vampírico', 'Manto das Sombras', 'Resiliência Sombria'}
RACE_CAT = {'Finntroll': 'Fintroll', 'Qareen de Luz': 'Qareen', 'Sulfure': 'Suraggel - Sulfure',
            'Elfo-do-Mar': 'Elfo do Mar'}
MOREAU_MAP = {'Moreau (Crocodilo)': 'crocodilo', 'Moreau (Hiena)': 'hiena', 'Moreau (Serpente)': 'serpente',
              'Moreau (Urso)': 'urso', 'Moreau (Lobo)': 'lobo', 'Moreau (Raposa)': 'raposa',
              'Moreau (Morcego)': 'morcego', 'Moreau (Coelho)': 'coelho',
              'Moreau (Bufalo)': 'bufalo', 'Moreau (Búlfalo)': 'bufalo', 'Moreau (Gato)': 'gato',
              'Moreau (Leão)': 'leao', 'Moreau (Leao)': 'leao', 'Moreau do Lobo': 'lobo',
              'Moreau (Coruja)': 'coruja'}
CLASS_SUB['Santo'] = ('paladino', 'santo', 'Santo')
CLASS_SUB['Alquimista'] = ('inventor', 'alquimista', 'Alquimista')
NAME_CLASS['Magias'] = ('mistico', 'all', 'Místico')
SKIPS = {'Devoção Ampla': 'dupe-conhecida', 'Ferro': 'chassi-ferro', 'Propósito': 'equiv-proposito-de-criacao',
         'Criatura Artificial': 'dupe-golem', 'Chassi - Mashin': 'equiv-chassi-mashin',
         'Mestre Dracônico (Marca)': 'marca-dupe', 'Bode Espiatório': 'variante-ortografica',
         'Bola de Fogo Flamejante': 'magia-vazia', 'Revoada de Texugos': 'subtipo-corrompido',
         'Golpe Semântico': 'sem-classe-atribuivel', 'Andarilho Carregado': 'sem-classe-atribuivel',
         'Agarre-me se Puder': 'variante-ortografica-moreau', 'Abraço do Urso': 'variante-ortografica-moreau',
         'Arborícula': 'variante-ortografica-moreau', 'Dourado': 'equiv-chassi-inevitavel',
         'Chassi Dourado': 'equiv-chassi-inevitavel', 'Espelhos': 'equiv-chassi-ours', 'Carne': 'equiv-chassi-ours',
         'Gelo': 'equiv-chassi-ours', 'Bronze': 'equiv-chassi-ours', 'Barro': 'equiv-chassi-ours',
         'Pedra': 'equiv-chassi-ours', 'Sucata': 'equiv-chassi-ours', 'Chassi': 'mecanica-calculadora',
         'Propósito de Criação': 'dupe-golem'}
GOLEM_RACA = {'Pequeno', 'Grande', 'Vapor', 'Sagrada', 'Alquímica', 'Elemental'}
GOLEM_CHASSI = {}
DIST_ALIAS = {'Caçador de Cabeça': 'Caçador de Cabeças', 'Caveleiro Feérico': 'Cavaleiro Feérico',
              'Aeronauto Goblin': 'Aeronauta Goblin', 'Armadilhas': 'Armadilheiro Mestre',
              'Armadilheiro': 'Armadilheiro Mestre', 'Capitão do Conclave Pirata': 'Capitão do Conclave',
              'Mestre Mahou-Jutsu': 'Mahou-Jutsu', 'Dracomante': 'Dracomante Real'}
DIST_SKIP = {'Mutagênico', 'Cabriolas de Bobo', 'Ingredientes Monstruosos', 'Gambiarra', 'Informantes'}
DIST_GERAL_OK = {'Mago de batalha de Wynlla', 'Gigante Furioso'}
RACE_CAT2 = {'Meio-elfo': 'Meio-Elfo', 'Qareen de Luz': 'Qareen da Luz'}
RACE_SUBS = {'Minotauro', 'Trog', 'Orc', 'Dahllan', 'Sílfide', 'Gnoll', 'Sátiro', 'Lefou', 'Qareen', 'Goblin',
             'Nagah', 'Duende', 'Osteon', 'Hynne', 'Anão', 'Medusa', 'Kallyanach', 'Kobolds', 'Kaijin',
             'Meio-elfo', 'Humano', 'Golem', 'Galokk', 'Elfo', 'Sereia/Tritão', 'Eiradaan', 'Hobgoblin',
             'Qareen de Luz', 'Kliren', 'Harpia', 'Sulfure', 'Aggelus'}
GOD_FIX = {'A Espada-Deus': 'A Espada Deus', 'Tanna-toh': 'Tanna-Toh',
           'Inghlblhpholstgt': 'Inghlblhpholtsgt'}
ARMA_TIPO = {'simples': 'Simples', 'marcial': 'Marcial', 'exotica': 'Exótica', 'fogo': 'De Fogo',
             'natural': 'Natural', 'improvisada': 'Improvisada'}
ARMA_EMP = {'uma': 'Uma Mão', 'duas': 'Duas Mãos', 'leve': 'Leve'}
ARMA_ALC = {'': '—', 'short': 'Curto', 'medium': 'Médio', 'long': 'Longo'}
ITEM_TIPO = {'acessorio': 'Acessório', 'traje': 'Vestuário', 'esoterico': 'Esotérico', 'ferramenta': 'Ferramenta',
             'alchemy': 'Preparado Alquímico', 'food': 'Alimento', 'ammo': 'Munição', 'material': 'Material',
             'potion': 'Poção', 'tesouro': 'Tesouro'}

# ---------------- índices refeitos (CRLF-safe) ----------------
POW_NP = {norm_np(x) for x in POW_NAMES}
DT = dtxt.replace('\r\n', '\n')
DCH = re.split(r"\n    \{\n(?=        \w)", DT)[1:]
DIST2 = {}
for _i, _ch in enumerate(DCH):
    _h = re.search(r"name: '((?:[^'\\]|\\.)*)',\n        source:", _ch)
    if not _h:
        continue
    _dn = _h.group(1)
    _cut = _ch.find('\n        ],\n')
    _seg = _ch[:_cut + 1] if _cut > 0 else _ch
    _mm = re.search(r"marca: \{\n\s+name: '((?:[^'\\]|\\.)*)',", _ch)
    _mc = norm(re.sub(r'^Marca da Distinção:\s*', '', _mm.group(1), flags=re.I)) if _mm else None
    DIST2[norm_np(_dn)] = {'name': _dn, 'idx': _i, 'marca': _mc,
                           'pod': {norm_np(x) for x in re.findall(r"name: '((?:[^'\\]|\\.)*)',\n\s+req:", _seg)}}
_MH = re.search(r'MOREAU_HERANCAS = \{(.*?)\n\};', rtxt, re.S).group(1)
MH_POW = {}
for _hm in re.finditer(r'\n    (\w+): \{\n        attr:.*?\n        powers: \[(.*?)\n        \]', _MH, re.S):
    MH_POW[_hm.group(1)] = {norm(x) for x in re.findall(r"name: '((?:[^'\\]|\\.)*)'", _hm.group(2))}
ITF = {}
for _f, _k in (('itens/data/itens.js', 'itens'), ('itens/data/armas.js', 'armas'),
               ('itens/data/armaduras.js', 'armad'), ('itens/data/itensmagicos.js', 'itesm')):
    _t = open(V + _f, encoding='utf-8').read()
    ITF[_k] = {norm(x) for x in re.findall(r'"nome": "((?:[^"\\]|\\.)*)"', _t)}
    ITF[_k] |= {norm(x) for x in re.findall(r'(?<![\w"])nome: "((?:[^"\\]|\\.)*)"', _t)}
_TM = open(V + 'itens/data/itensmagicos.js', encoding='utf-8').read()
ITF['itesm'] |= {norm(x) for x in re.findall(r'nome: "((?:[^"\\]|\\.)*)"', _TM)}

# ---------------- helpers de texto ----------------
def cleand(d):
    return clean((((d.get('system') or {}).get('description')) or {}).get('value'))


def br(t):
    return re.sub(r'\n+', '<br>', t or '')


def sp(t):
    return re.sub(r'\s+', ' ', t or '').strip()


def _dcv(d):
    return (((d.get('system') or {}).get('description')) or {}).get('value')


def parse_tiers(desc):
    ms = list(re.finditer(r'(Iniciante|Veterano|Mestre):', desc or ''))
    if len(ms) < 3:
        return None, sp(desc)
    if [m.group(1) for m in ms[:3]] != ['Iniciante', 'Veterano', 'Mestre']:
        return None, sp(desc)
    tiers = {}
    for i, m in enumerate(ms[:3]):
        end = ms[i + 1].start() if i + 1 < len(ms) else len(desc)
        tiers[m.group(1).lower()] = sp(desc[m.end():end])
    return tiers, sp(desc[:ms[0].start()])


def fam_benefit(desc):
    m = re.search(r'\n\n[^.\n]{1,40}\.\s*(.+)$', desc or '', re.S)
    return sp(m.group(1)) if m else None


def fmt_preco(n):
    if n is None:
        return 'T$ —'
    if isinstance(n, float) and not n.is_integer():
        return 'T$ %s' % str(n).replace('.', ',')
    n = int(n)
    if n == 0:
        return 'T$ —'
    s = '%d' % n
    g = []
    while s:
        g.append(s[-3:])
        s = s[:-3]
    return 'T$ %s' % '.'.join(reversed(g))


def fmt_esp(n):
    if n is None:
        return '—'
    if isinstance(n, float) and not n.is_integer():
        return str(n).replace('.', ',')
    return str(int(n))

# ---------------- builders ----------------
def pw_entry(name, typ, cat=None, sub=None, src=None, req=None, path=None, desc=None, cls=None):
    L = ['        name: %s,' % name, '        type: %s,' % typ]
    if cls:
        L.append('        class: %s,' % cls)
    if sub:
        L.append('        subType: %s,' % sub)
    if cat:
        L.append('        category: %s,' % cat)
    if src:
        L.append('        source: %s,' % src)
    if req:
        L.append('        req: %s,' % req)
    if path:
        L.append('        pathReq: %s,' % path)
    L.append('        desc: %s' % desc)
    return '    {\n' + '\n'.join(L) + '\n    }'


def dist_entry(name, req, desc):
    return ('            {\n                name: %s,\n                req: %s,\n                desc: %s\n            }'
            % (name, req, desc))


def ch_entry(name, desc):
    return '{ name: %s, desc: %s }' % (name, desc)


def mo_entry(name, desc):
    return '            { name: %s, desc: %s },' % (name, desc)


def parc_entry(name, cat, src, desc, tiers):
    if tiers:
        t = ',\n'.join('      "%s": %s' % (k, jstr(v)) for k, v in
                       (('iniciante', tiers.get('iniciante', '')), ('veterano', tiers.get('veterano', '')),
                        ('mestre', tiers.get('mestre', ''))))
        tb = '{\n%s\n    }' % t
    else:
        tb = 'null'
    return ('  {\n    "name": %s,\n    "category": %s,\n    "source": %s,\n    "desc": %s,\n    "tiers": %s\n  }'
            % (name, cat, src, desc, tb))


def grim_entry(name, c, t, e, ex, a, al, d, r, desc):
    return ('    {\n        "n": %s,\n        "c": %d,\n        "t": %s,\n        "e": %s,\n        "ex": %s,\n'
            '        "a": %s,\n        "al": %s,\n        "d": %s,\n        "r": %s,\n        "desc": %s\n    }'
            % (name, c, t, e, ex, a, al, d, r, desc))


def orig_entry(i, name, region, desc, ubn, ubd):
    return ('  {\n    id: %s,\n    name: %s,\n    type: %s,\n    source: %s,\n    region: %s,\n'
            '    desc: %s,\n    autoTraining: [],\n    uniqueBenefit: {\n      name: %s,\n      desc: %s\n    }\n  }'
            % (i, name, sstr('atlas'), sstr('Atlas'), region, desc, ubn, ubd))


MAT_DEC = {}

# ---------------- roteamento ----------------
adds = {k: [] for k in ('data', 'dist', 'chassi', 'heranca', 'parc', 'itens', 'armas', 'armad', 'itesm',
                        'grim', 'orig', 'arsenal')}
skipped, unmatched, LOG = [], [], []
DBG = {'golem': [], 'moreau': [], 'marca_cmp': [], 'fam_fail': [], 'tier_fail': [], 'magia_new': [],
       'orig_new': [], 'arma_nodano': 0, 'arma_notd': 0, 'dist_noreq': 0}


def do_class(pack, d, S, NAME, cls, path, pretty):
    ln = norm(NAME)
    if (ln, cls, path) in POW_TRIPLE:
        skipped.append((NAME, 'dupe-triplo'))
        return
    req, desc = split_req(cleand(d))
    e = pw_entry(jstr(TYPO_FIX.get(NAME, NAME)), '"class"', sub='"ability"' if S.get('tipo') == 'ability' else '"power"',
                 src=jstr(slug_of(pack, S.get('source'))), req=jstr(req or '—'),
                 path='"%s"' % path, desc=jstr(br(desc)), cls='"%s"' % cls)
    adds['data'].append(e)
    POW_TRIPLE.add((ln, cls, path))
    POW_NORM.add(ln)
    POW_NP.add(norm_np(NAME))
    LOG.append((NAME, 'class/%s/%s' % (cls, path), pack, S.get('tipo'), S.get('subtipo')))


def do_simple(pack, d, S, NAME, typ, cat, reqfb='—', nosrc=False):
    ln = norm(NAME)
    if ln in POW_NORM:
        skipped.append((NAME, 'dupe-nome'))
        return
    req, desc = split_req(cleand(d))
    e = pw_entry(jstr(TYPO_FIX.get(NAME, NAME)), '"%s"' % typ,
                 cat and jstr(cat) or None, None,
                 None if nosrc else jstr(slug_of(pack, S.get('source'))),
                 jstr(req or reqfb), None, jstr(br(desc)), cls=None)
    adds['data'].append(e)
    POW_NORM.add(ln)
    POW_NP.add(norm_np(NAME))
    LOG.append((NAME, '%s/%s' % (typ, cat or '-'), pack, S.get('tipo'), S.get('subtipo')))


def do_dist(pack, d, S, NAME, distkey):
    req, desc = split_req(cleand(d))
    if not req:
        DBG['dist_noreq'] += 1
    e = dist_entry(sstr(TYPO_FIX.get(NAME, NAME)), sstr(req or '—'), sstr(desc))
    adds['dist'].append((DIST2[distkey]['name'], e))
    DIST2[distkey]['pod'].add(norm_np(NAME))
    LOG.append((NAME, 'dist/%s' % DIST2[distkey]['name'], pack, S.get('tipo'), S.get('subtipo')))


def dist_route(pack, d, S, NAME, ST):
    tgt = DIST_ALIAS.get(ST, ST)
    key = norm_np(tgt)
    if key not in DIST2:
        unmatched.append((NAME, S.get('tipo'), ST, pack, 'dist-alvo-ausente'))
        return
    mm = re.search(r' \(marca\)$', NAME, re.I)
    if mm:
        core = norm(NAME[:mm.start()])
        ours = DIST2[key]['marca']
        DBG['marca_cmp'].append((DIST2[key]['name'], NAME, ours, core == ours))
        skipped.append((NAME, 'marca-dupe' if core == ours else 'marca-diverge-mantida'))
        return
    if norm_np(NAME) in DIST2[key]['pod']:
        skipped.append((NAME, 'dist-dupe'))
        return
    do_dist(pack, d, S, NAME, key)


for pack, d in docs:
    S = d.get('system') or {}
    NAME = d.get('name') or ''
    NAME = TYPO_FIX.get(NAME, NAME)  # normaliza antes de checar/escrever (idempotencia)
    ST = S.get('subtipo') or ''
    TIPO = S.get('tipo')
    DTYP = d.get('type')
    ln = norm(NAME)
    if NAME in SKIPS:
        skipped.append((NAME, SKIPS[NAME]))
        continue
    if DTYP in ('race', 'classe'):
        skipped.append((NAME, 'tipo-' + DTYP))
        continue
    # ---- magia ----
    if DTYP == 'magia':
        if ln in SPELL_NORM:
            skipped.append((NAME, 'magia-dupe'))
        elif not cleand(d):
            skipped.append((NAME, 'magia-vazia'))
        elif NAME == 'Controlar Ar':
            adds['grim'].append(grim_entry(jstr(NAME), 2, jstr('Divina'), jstr('Transmutação'), jstr('padrão'),
                                           jstr('médio'), jstr('Varia (ver texto)'), jstr('cena'), jstr('Ver texto'),
                                           jstr(sp(split_req(cleand(d))[1]))))
            SPELL_NORM.add(ln)
            LOG.append((NAME, 'grimorio', pack, TIPO, ST))
            DBG['magia_new'].append(NAME)
        else:
            DBG['magia_new'].append(NAME + ' (UNMATCHED?)')
            unmatched.append((NAME, TIPO, ST, pack, 'magia-nova'))
        continue
    # ---- itens ----
    if DTYP in ('arma', 'equipamento', 'consumivel', 'tesouro'):
        tgt = None
        if DTYP == 'arma':
            tgt = 'armas'
        elif DTYP == 'equipamento':
            tgt = 'armad' if TIPO in ('leve', 'pesada', 'escudo') else 'itens'
        elif DTYP == 'consumivel':
            tgt = 'itesm' if TIPO == 'potion' else 'itens'
        else:
            tgt = 'itens'
        if ln in ITF[tgt]:
            skipped.append((NAME, 'item-dupe'))
            continue
        desc = sp(split_req(cleand(d))[1])
        if not desc:
            skipped.append((NAME, 'desc-vazia'))
            continue
        fonte = jstr(fonte_of(pack, S.get('source')))
        nm = jstr(TYPO_FIX.get(NAME, NAME))
        if tgt == 'armas':
            dm = re.search(r'dano (\d+d\d+(?:\s*[+-]\s*\d+)?)', desc, re.I)
            if not dm:
                DBG['arma_nodano'] += 1
            dano = dm.group(1).replace(' ', '') if dm else 'ver texto'
            M, X = S.get('criticoM'), S.get('criticoX')
            crit = '—' if M is None else ('x%d' % X if M == 20 else '%d/x%d' % (M, X))
            tm = re.search(r'dano de ([a-záéíóúç]+(?:/[a-záéíóúç]+)?)', desc, re.I)
            if tm:
                td = '/'.join(w.capitalize() for w in tm.group(1).split('/'))
                td = {'Perfuracao': 'Perfuração'}.get(td, td)
            else:
                DBG['arma_notd'] += 1
                td = '—'
            e = ('        {\n            "nome": %s,\n            "preco": %s,\n            "dano": %s,\n'
                 '            "critico": %s,\n            "alcance": %s,\n            "tipo_dano": %s,\n'
                 '            "espacos": %s,\n            "categoria": "Arma",\n            "tipo": %s,\n'
                 '            "empunhadura": %s,\n            "descricao": %s,\n            "fonte": %s\n        }'
                 % (nm, jstr(fmt_preco(S.get('preco'))), jstr(dano), jstr(crit),
                    jstr(ARMA_ALC.get(S.get('alcance') or '', '—')), jstr(td),
                    jstr(fmt_esp(S.get('espacos'))), jstr(ARMA_TIPO.get(S.get('proficiencia') or '', 'Exótica')),
                    jstr(ARMA_EMP.get(S.get('empunhadura') or '', 'Uma Mão')), jstr(desc), fonte))
            adds['armas'].append(e)
        elif tgt == 'armad':
            arm = S.get('armadura') or {}
            bv = arm.get('value') or 0
            pv = arm.get('penalidade') or 0
            e = ('        {\n            "nome": %s,\n            "preco": %s,\n            "bonus_defesa": %s,\n'
                 '            "penalidade_armadura": %s,\n            "espacos": %s,\n            "categoria": %s,\n'
                 '            "tipo": %s,\n            "descricao": %s,\n            "fonte": %s\n        }'
                 % (nm, jstr(fmt_preco(S.get('preco'))), jstr('+%d' % bv),
                    jstr('0' if not pv else '–%d' % pv), jstr(fmt_esp(S.get('espacos'))),
                    jstr('Escudo' if TIPO == 'escudo' else 'Armadura'),
                    jstr('Escudo Pesado' if TIPO == 'escudo' and bv >= 2 else
                         ('Escudo Leve' if TIPO == 'escudo' else ('Armadura Pesada' if TIPO == 'pesada'
                                                                 else 'Armadura Leve'))),
                    jstr(desc), fonte))
            adds['armad'].append(e)
        elif tgt == 'itesm':
            e = ('        {\n            nome: %s,\n            preco: %s,\n            espacos: %s,\n'
                 '            categoria: "Item Mágico",\n            tipo: "Poção",\n            descricao: %s,\n'
                 '            fonte: %s\n        }' % (nm, jstr(fmt_preco(S.get('preco'))),
                                                     jstr(fmt_esp(S.get('espacos'))), jstr(desc), fonte))
            adds['itesm'].append(e)
        else:
            e = ('        {\n            "nome": %s,\n            "preco": %s,\n            "espacos": %s,\n'
                 '            "categoria": "Item Geral",\n            "tipo": %s,\n            "descricao": %s,\n'
                 '            "fonte": %s\n        }' % (nm, jstr(fmt_preco(S.get('preco'))),
                                                      jstr(fmt_esp(S.get('espacos'))),
                                                      jstr(ITEM_TIPO.get(TIPO or 'tesouro', 'Ferramenta')),
                                                      jstr(desc), fonte))
            adds['itens'].append(e)
        ITF[tgt].add(ln)
        LOG.append((NAME, tgt, pack, TIPO, ST))
        continue
    # ---- poderes ----
    if DTYP != 'poder':
        unmatched.append((NAME, TIPO, ST, pack, 'type-%s?' % DTYP))
        continue
    if '(Familiar)' in NAME:
        if ln in PAR_NORM:
            skipped.append((NAME, 'parc-dupe'))
            continue
        ben = fam_benefit(cleand(d))
        if ben is None:
            DBG['fam_fail'].append(NAME)
            ben = sp(cleand(d))
        adds['parc'].append(parc_entry(jstr(NAME), jstr('familiar'), jstr(slug_of(pack, S.get('source'))),
                                       jstr(ben), None))
        PAR_NORM.add(ln)
        LOG.append((NAME, 'parc/familiar', pack, TIPO, ST))
        continue
    if NAME.startswith('Montaria: '):
        base = NAME[len('Montaria: '):] + ' (Montaria)'
        if norm(base) in PAR_NORM:
            skipped.append((NAME, 'parc-dupe'))
            continue
        dc = re.split(r'Regras de Montarias', cleand(d))[0]
        tiers, intro = parse_tiers(dc)
        if tiers is None:
            DBG['tier_fail'].append(NAME)
            tiers, intro = None, sp(dc)
        adds['parc'].append(parc_entry(jstr(base), jstr('montaria'), jstr(slug_of(pack, S.get('source'))),
                                       jstr(intro), tiers))
        PAR_NORM.add(norm(base))
        LOG.append((NAME, 'parc/montaria', pack, TIPO, ST))
        continue
    if NAME.startswith('Mascote: '):
        base = NAME[len('Mascote: '):] + ' (Mascote)'
        if norm(base) in PAR_NORM:
            skipped.append((NAME, 'parc-dupe'))
            continue
        tiers, intro = parse_tiers(cleand(d))
        if tiers is None:
            tiers, intro = None, sp(cleand(d))
        adds['parc'].append(parc_entry(jstr(base), jstr('parceiro'), jstr(slug_of(pack, S.get('source'))),
                                       jstr(intro), tiers))
        PAR_NORM.add(norm(base))
        LOG.append((NAME, 'parc/mascote', pack, TIPO, ST))
        continue
    if '(Parceiro)' in NAME:
        base = re.sub(r'\s*\(Parceiro\)\s*$', '', NAME)
        if norm(base) in PAR_NORM:
            skipped.append((NAME, 'parc-dupe'))
            continue
        dc = cleand(d)
        paras = dc.split('\n\n')
        if paras and paras[0].startswith('Cada parceiro'):
            dc = '\n\n'.join(paras[1:])
        tiers, intro = parse_tiers(dc)
        if tiers is None:
            DBG['tier_fail'].append(NAME)
            tiers, intro = None, sp(dc)
        adds['parc'].append(parc_entry(jstr(base), jstr('parceiro'), jstr(slug_of(pack, S.get('source'))),
                                       jstr(intro), tiers))
        PAR_NORM.add(norm(base))
        LOG.append((NAME, 'parc/parceiro', pack, TIPO, ST))
        continue
    if NAME.startswith('Atributos -') or ST == 'system.pericias.perc.bonus' or ST == 'Mundana' \
       or ST == 'Suraggel':
        skipped.append((NAME, {'Atributos -': 'atributo-racial'}.get(NAME[:11], 'subtipo-disperso')))
        continue
    if ST in ('Ornitóptero Goblin', 'Ornitópteros Goblins'):
        if NAME == 'Material Especial':
            MAT_DEC['txt'] = cleand(d)
            LOG.append((NAME, 'arsenal/aeronauta', pack, TIPO, ST))
        elif norm_np(NAME) in ARSENAL:
            skipped.append((NAME, 'arsenal-dupe'))
        else:
            unmatched.append((NAME, TIPO, ST, pack, 'ornitoptero-novo?'))
        continue
    if NAME in GOLEM_RACA:
        do_simple(pack, d, S, NAME, 'raca', 'Golem', '-')
        continue
    if NAME in GOLEM_CHASSI:
        ch = GOLEM_CHASSI[NAME]
        if ln in GOLEM_POW.get(ch, set()):
            skipped.append((NAME, 'chassi-dupe'))
            continue
        req, desc = split_req(cleand(d))
        adds['chassi'].append((ch, ch_entry(sstr(TYPO_FIX.get(NAME, NAME)), sstr(br(desc)))))
        GOLEM_POW.setdefault(ch, set()).add(ln)
        LOG.append((NAME, 'chassi/%s' % ch, pack, TIPO, ST))
        continue
    if ST == 'Mashin':
        if ln in GOLEM_POW.get('mashin', set()):
            skipped.append((NAME, 'chassi-dupe'))
            continue
        req, desc = split_req(cleand(d))
        adds['chassi'].append(('mashin', ch_entry(sstr(TYPO_FIX.get(NAME, NAME)), sstr(br(desc)))))
        GOLEM_POW.setdefault('mashin', set()).add(ln)
        LOG.append((NAME, 'chassi/mashin', pack, TIPO, ST))
        continue
    if ST == 'Cobaia dos Médicos Monstros' or NAME.startswith('Implante: '):
        # mesma distincao que o nosso 'Medico Monstro' (marca Procedimento Inicial identica)
        dist_route(pack, d, S, NAME, 'Médico Monstro')
        continue
    if ST in ('Grupo', 'Geupo'):
        do_simple(pack, d, S, NAME, 'grupo', 'Grupo')
        continue
    if NAME in NAME_CLASS:
        cls, path, pretty = NAME_CLASS[NAME]
        do_class(pack, d, S, NAME, cls, path, pretty)
        continue
    if NAME.startswith('Demônio de Areia'):
        do_class(pack, d, S, NAME, 'cacador', 'miragem', 'Miragem')
        continue
    if TIPO in ('classe', 'ability', 'geral') and ST in CLASS_SUB:
        cls, path, pretty = CLASS_SUB[ST]
        do_class(pack, d, S, NAME, cls, path, pretty)
        continue
    if ST in DIST_SKIP:
        skipped.append((NAME, 'dist-ausente'))
        continue
    if TIPO == 'distincao' or (TIPO == 'geral' and ST in DIST_GERAL_OK) \
       or (TIPO == 'ability' and ST == 'Dracomante'):
        dist_route(pack, d, S, NAME, ST)
        continue
    if NAME == 'Jogo Perigoso':
        key = norm_np('Carteador')
        if norm_np(NAME) in DIST2[key]['pod']:
            skipped.append((NAME, 'dist-dupe'))
        else:
            do_dist(pack, d, S, NAME, key)
        continue
    if NAME in VAMPIRE:
        do_simple(pack, d, S, NAME, 'raca', 'Vampiro', '-')
        continue
    if NAME == 'Florescer Feérico':
        do_simple(pack, d, S, NAME, 'raca', 'Feérico', '-')
        continue
    if NAME == 'Soco Foguete':
        do_simple(pack, d, S, NAME, 'raca', 'Golem', '-')
        continue
    if NAME in ('Cura Acelerada', 'Devoção Iluminada', 'Presença Majestosa'):
        do_simple(pack, d, S, NAME, 'destiny', 'Geral')
        continue
    if ST == 'Golem':
        DBG['golem'].append((NAME, TIPO))
    if (ST or '').startswith('Moreau'):
        DBG['moreau'].append((NAME, ST))
    if TIPO == 'concedido':
        parts = [GOD_FIX.get(p.strip(), p.strip()) for p in ST.split(',')]
        parts = [p for p in parts if not (len(parts) > 1 and re.match(r'(?i)^\s*(a|o|as|os)\s+', p or ''))]
        cat = ', '.join(parts)
        if len(parts) > 1:
            fb = 'Devoto de ' + ', '.join(parts[:-1]) + ' ou ' + parts[-1]
        elif ST in ('Honra', 'Ambição'):
            fb = 'Seguir um código de conduta'
        else:
            fb = 'Devoto de ' + cat
        do_simple(pack, d, S, NAME, 'conceded', cat, fb)
        continue
    if TIPO == 'racial':
        if ST in MOREAU_MAP:
            her = MOREAU_MAP[ST]
            if ln in MH_POW.get(her, set()):
                skipped.append((NAME, 'moreau-dupe'))
                continue
            req, desc = split_req(cleand(d))
            adds['heranca'].append((her, mo_entry(sstr(TYPO_FIX.get(NAME, NAME)), sstr(br(desc)))))
            MH_POW.setdefault(her, set()).add(ln)
            LOG.append((NAME, 'moreau/%s' % her, pack, TIPO, ST))
            continue
        if ST in RACE_CAT2 or not ST.startswith('('):
            pass
        if not ST or ST == 'Golem':
            unmatched.append((NAME, TIPO, ST, pack, 'racial-stray'))
            continue
        do_simple(pack, d, S, NAME, 'raca', RACE_CAT2.get(ST, ST), '-')
        continue
    if TIPO == 'origem':
        if ln in ORIG_NORM:
            skipped.append((NAME, 'origem-dupe'))
        elif NAME == 'Nitamuraniano':
            req, desc = split_req(cleand(d))
            flv, ben = (desc.split('Benefício.', 1) + [''])[:2]
            adds['orig'].append(orig_entry(sstr('nitamuraniano'), sstr(NAME), sstr(ST),
                                           sstr(flv.strip()), sstr('Tradição Nitamuraniana'),
                                           sstr(ben.strip())))
            ORIG_NORM.add(ln)
            LOG.append((NAME, 'origem/atlas', pack, TIPO, ST))
            DBG['orig_new'].append(NAME)
        else:
            DBG['orig_new'].append(NAME + ' (UNMATCHED?)')
            unmatched.append((NAME, TIPO, ST, pack, 'origem-nova'))
        continue
    if TIPO == 'complicacao':
        do_simple(pack, d, S, NAME, 'complication', 'Geral', 'Nenhum', nosrc=True)
        continue
    if TIPO == 'geral':
        if ST in ('Combate', 'combate'):
            do_simple(pack, d, S, NAME, 'combat', 'Geral')
        elif ST in ('Destino', 'destino'):
            do_simple(pack, d, S, NAME, 'destiny', 'Geral')
        elif ST in ('Grupo', 'Geupo'):
            do_simple(pack, d, S, NAME, 'grupo', 'Grupo')
        elif ST in ('magia', 'Magia'):
            do_simple(pack, d, S, NAME, 'magic', 'Geral')
        elif ST == 'Tormenta':
            do_simple(pack, d, S, NAME, 'tormenta', 'Tormenta', '-')
        elif ST == 'Transformação Monstruosa':
            do_simple(pack, d, S, NAME, 'destiny', 'Transformação Monstruosa')
        elif ST == 'Conjuração Magibélica':
            do_simple(pack, d, S, NAME, 'magic', 'Geral')
        elif (ST or '').startswith('Complicação'):
            do_simple(pack, d, S, NAME, 'complication', 'Geral', 'Nenhum', nosrc=True)
        elif ST in RACE_SUBS:
            do_simple(pack, d, S, NAME, 'raca', RACE_CAT2.get(ST, ST), '-')
        elif ST == 'Várias':
            if norm_np(NAME) in POW_NP:
                skipped.append((NAME, 'varia-dupe'))
            else:
                unmatched.append((NAME, TIPO, ST, pack, 'varias-nova?'))
        elif ST in MOREAU_MAP:
            her = MOREAU_MAP[ST]
            if ln in MH_POW.get(her, set()):
                skipped.append((NAME, 'moreau-dupe'))
            else:
                req, desc = split_req(cleand(d))
                adds['heranca'].append((her, mo_entry(sstr(TYPO_FIX.get(NAME, NAME)), sstr(br(desc)))))
                MH_POW.setdefault(her, set()).add(ln)
                LOG.append((NAME, 'moreau/%s' % her, pack, TIPO, ST))
        elif not ST:
            if ln in POW_NORM:
                skipped.append((NAME, 'dupe-nome'))
            elif norm_np(NAME) in POW_NP:
                skipped.append((NAME, 'dupe-parcial'))
            else:
                unmatched.append((NAME, TIPO, ST, pack, 'geral-vazio'))
        else:
            unmatched.append((NAME, TIPO, ST, pack, 'geral-stray'))
        continue
    if TIPO in ('classe', 'ability'):
        unmatched.append((NAME, TIPO, ST, pack, 'class-stray'))
        continue
    if ln in POW_NORM:
        skipped.append((NAME, 'dupe-nome'))
    elif norm_np(NAME) in POW_NP:
        skipped.append((NAME, 'dupe-parcial'))
    else:
        unmatched.append((NAME, TIPO, ST, pack, 'stray'))

ARS_ADD = []
if MAT_DEC.get('txt'):
    for _it in MAT_DEC['txt'].split('•'):
        _it = _it.strip()
        if not _it or len(_it) < 4:
            continue
        _nn, _, _dd = _it.partition('. ')
        _dd = _dd.strip()
        if norm_np(_nn) in ARSENAL:
            skipped.append((_nn, 'arsenal-dupe'))
            continue
        _dd = re.sub(r'(\+T\$ [\d.]+)\.?$', r'(\1).', _dd)
        ARS_ADD.append((sstr(_nn), sstr(_dd)))
        ARSENAL.add(norm_np(_nn))
        LOG.append((_nn, 'arsenal/aeronauta', 'distincoes', '—', '—'))

print('adds: ' + ', '.join('%s=%d' % (k, len(v)) for k, v in adds.items()))
print('ars_add=%d' % len(ARS_ADD))
print('skipped: %d (%s)' % (len(skipped), dict(Counter(r for _, r in skipped))))
print('UNMATCHED: %d' % len(unmatched))
for _u in unmatched:
    print('  ??', _u)
print('--- risky skips (dupe-parcial/varia/geral-vazio review) ---')
for _n, _r in skipped:
    if _r in ('dupe-parcial', 'varia-dupe', 'marca-diverge-mantida', 'dist-ausente', 'sem-classe-atribuivel',
              'atributo-racial', 'subtipo-disperso', 'subtipo-corrompido'):
        print('  sk[%s] %s' % (_r, _n))
print('--- LOG adds ---')
for _l in LOG:
    print('  ++', _l)
print('--- DBG golem-st names ---')
for _g in sorted(set(DBG['golem'])):
    print('  golem?', _g)
print('--- DBG moreau sup (name, st) ---')
for _m in sorted(set(DBG['moreau'])):
    print('  mor?', _m)
print('--- ours moreau/raposa check ---')
print('  raposa:', MH_POW.get('raposa'), '| urso:', MH_POW.get('urso'), '| serpente:', MH_POW.get('serpente'),
      '| bufalo:', MH_POW.get('bufalo'), '| leao:', MH_POW.get('leao'), '| lobo:', MH_POW.get('lobo'))
print('--- marca compares (False = DIVERGE, ours kept) ---')
for _c in DBG['marca_cmp']:
    if not _c[3]:
        print('  MARCA-DIVERGE:', _c)
print('  marca total:', len(DBG['marca_cmp']), 'diverges:',
      sum(1 for _c in DBG['marca_cmp'] if not _c[3]))
print('--- parse fails ---')
print('  fam_fail:', DBG['fam_fail'])
print('  tier_fail:', DBG['tier_fail'])
print('  magia_new:', DBG['magia_new'])
print('  orig_new:', DBG['orig_new'])
print('  arma sem dano:', DBG['arma_nodano'], '| arma sem tipo_dano:', DBG['arma_notd'],
      '| dist sem req:', DBG['dist_noreq'])
print('--- index sanity ---')
print('  POW=%d TRIPLE=%d DIST2=%d MH=%s GOLEM=%s ITF=%s ORIG=%d PAR=%d SPELL=%d ARS=%d' % (
    len(POW_NORM), len(POW_TRIPLE), len(DIST2), sorted(MH_POW), {k: len(v) for k, v in GOLEM_POW.items()},
    {k: len(v) for k, v in ITF.items()}, len(ORIG_NORM), len(PAR_NORM), len(SPELL_NORM), len(ARSENAL)))

# ---------------- anchors + apply ----------------
RELP = {'data': 'poderes/js/data.js', 'dist': 'poderes/js/distincoes-data.js', 'parc': 'parceiros/parceiros.js',
        'orig': 'poderes/js/origens.js', 'racas': 'calculadora/racas.js', 'grim': 'grimorio/spells_db.js',
        'main': 'poderes/js/main.js', 'phtml': 'poderes/index.html', 'ihtml': 'itens/index.html',
        'itens': 'itens/data/itens.js', 'armas': 'itens/data/armas.js', 'armad': 'itens/data/armaduras.js',
        'itesm': 'itens/data/itensmagicos.js'}
TX = {}
for _k, _p in RELP.items():
    TX[_k] = open(V + _p, encoding='utf-8', newline='').read()


def EOLof(t):
    return '\r\n' if t.count('\r\n') * 2 > t.count('\n') else '\n'


EOL = {k: EOLof(v) for k, v in TX.items()}
print('--- EOL ---')
print(' ', EOL)
CHK = []


def chk(name, ok):
    CHK.append((name, ok))
    print('  anchor %s: %s' % (name, 'OK' if ok else 'MISS'))


chk('data-end', bool(re.search(r'([^}]*)\](;?)\s*$', TX['data'])))
chk('dist-end', bool(re.search(r'([^}]*)\](;?)\s*$', TX['dist'])))
chk('orig-end', bool(re.search(r'([^}]*)\](;?)\s*$', TX['orig'])))
chk('parc-end', bool(re.search(r'([^}]*)\](;?)\s*$', TX['parc'])))
chk('grim-end', bool(re.search(r'([^}]*)\](;?)\s*$', TX['grim'])))
for _f in ('itens', 'armas', 'armad', 'itesm'):
    _i = TX[_f].rfind('\n    ]')
    chk(_f + '-end', _i > 0 and bool(re.match(r'\r?\n\};', TX[_f][_i + 6:_i + 12])))
_m = re.search(r"name: 'Aeronauta Goblin',\r?\n\s+source: '[a-z]+',", TX['dist'])
_est = [m.start() for m in re.finditer(r"\n    \{\r?\n        \w", TX['dist'][:_m.start()])][-1] if _m else None
chk('arsenal', bool(_est is not None and re.search(r"arsenal: \[\r?\n((?:.*\r?\n)*?)(            \])",
                                                  TX['dist'][_est:_est + 15000])))
for _ch in {c for c, _ in adds['chassi']}:
    chk('chassi-' + _ch, bool(re.search(_ch + r": \{.*?powers: \[(.*?)\]\r?\n    \},", TX['racas'], re.S)))
for _he in {h for h, _ in adds['heranca']}:
    chk('her-' + _he, bool(re.search(r"\n    " + _he + r": \{.*?powers: \[\n(.*?)\n        \]", TX['racas'],
                                      re.S)))
for _dn, _e in adds['dist']:
    _h = re.search(r"name: '" + re.escape(_dn) + r"',\r?\n\s+source: '[a-z]+',", TX['dist'])
    _ok = False
    if _h:
        _es = [m.start() for m in re.finditer(r"\n    \{\r?\n        \w", TX['dist'][:_h.start()])]
        if _es:
            _sg = TX['dist'][_es[-1]:]
            _ok = bool(re.search(r"poderes: \[\]", _sg) or re.search(r"\n        \]\r?\n    \},", _sg))
    chk('distpod-' + _dn, _ok)
chk('P1-opt', TX['phtml'].count('<option value="frade">Frade</option>') == 1)
chk('P2-btn', TX['phtml'].count('data-path="seteiro">Seteiro</button>') == 1)
chk('P3-cac', TX['main'].count("    'cacador': ['cacador-base', 'seteiro'],") == 1)
chk('P4-tre', TX['main'].count("    'treinador': [],") == 1)
chk('P5-fra', TX['main'].count("    'frade': [] // Adicione esta linha") == 1)
chk('P6-var', TX['main'].count("                    'cavaleiro-base', 'vassalo'].includes(power.pathReq);") == 1)
chk('P7-src', TX['ihtml'].count('<option value="Ameaças de Arton">Ameaças de Arton</option>') == 1)
print('node:', __import__('shutil').which('node') or 'AUSENTE')

if DRY:
    print('DRY-RUN: nada escrito. revise e rode com --apply')
    raise SystemExit(0)
if not all(ok for _, ok in CHK):
    print('ABORT: anchors com MISS')
    raise SystemExit(1)

NEW = dict(TX)


def eolize(k, s):
    return s.replace('\n', EOL[k])


def end_append(k, entries):
    txt = NEW[k]
    m = re.search(r'([^}]*)\](;?)(\s*)$', txt)
    assert m and not m.group(1).replace(',', '').strip(), 'end-' + k
    body = eolize(k, ',\n'.join(entries))
    NEW[k] = txt[:m.start()] + ',' + EOL[k] + body + EOL[k] + ']' + m.group(2) + m.group(3)


def arr_append(k, entries):
    txt = NEW[k]
    _tail = EOL[k] + '    ]'
    idx = txt.rfind(_tail)
    assert idx > 0 and re.match(r'\r?\n\};', txt[idx + len(_tail):idx + len(_tail) + 6]), 'arr-' + k
    body = eolize(k, ',\n'.join(entries))
    NEW[k] = txt[:idx].rstrip() + ',' + EOL[k] + body + txt[idx:]


if adds['data']:
    end_append('data', adds['data'])
if adds['orig']:
    end_append('orig', adds['orig'])
if adds['parc']:
    end_append('parc', adds['parc'])
if adds['grim']:
    end_append('grim', adds['grim'])
if adds['itens']:
    arr_append('itens', adds['itens'])
if adds['armas']:
    arr_append('armas', adds['armas'])
if adds['armad']:
    arr_append('armad', adds['armad'])
if adds['itesm']:
    arr_append('itesm', adds['itesm'])
for _dn, _e in adds['dist']:
    cur = NEW['dist']
    h = re.search(r"name: '" + re.escape(_dn) + r"',\r?\n\s+source: '[a-z]+',", cur)
    est = [m.start() for m in re.finditer(r"\n    \{\r?\n        \w", cur[:h.start()])][-1]
    seg = cur[est:]
    me = re.search(r"poderes: \[\]", seg)
    if me:
        ins = est + me.start() + len('poderes: [')
        NEW['dist'] = cur[:ins] + EOL['dist'] + eolize('dist', _e) + EOL['dist'] + '        ' + cur[ins:]
    else:
        mc = re.search(r"\r?\n        \]\r?\n    \},", seg)
        ins = est + mc.start()
        pre = cur[:ins].rstrip()
        NEW['dist'] = pre + ('' if pre.endswith('[') else ',') + EOL['dist'] + eolize('dist', _e) \
            + cur[ins:]
if ARS_ADD:
    cur = NEW['dist']
    h = re.search(r"name: 'Aeronauta Goblin',\r?\n\s+source: '[a-z]+',", cur)
    est = [m.start() for m in re.finditer(r"\n    \{\r?\n        \w", cur[:h.start()])][-1]
    seg = cur[est:est + 15000]
    ma = re.search(r"arsenal: \[\r?\n((?:.*\r?\n)*?)(            \])", seg)
    items = eolize('dist', ',\n'.join('            { n: %s, d: %s }' % p for p in ARS_ADD))
    a, b = est + ma.start(1), est + ma.end(2)
    NEW['dist'] = cur[:a] + ma.group(1).rstrip().rstrip(',') + ',' + EOL['dist'] + items + EOL['dist'] \
        + ma.group(2) + cur[b:]
for _ch in sorted({c for c, _ in adds['chassi']}):
    cur = NEW['racas']
    items = [e for c, e in adds['chassi'] if c == _ch]
    mc = re.search(_ch + r": \{.*?powers: \[(.*?)\]\r?\n    \},", cur, re.S)
    g = mc.group(1)
    NEW['racas'] = cur[:mc.start(1)] + g.rstrip() + (', ' if g.strip() else '') \
        + ', '.join(eolize('racas', e) for e in items) + cur[mc.end(1):]
for _he in sorted({h for h, _ in adds['heranca']}):
    cur = NEW['racas']
    items = [e for h, e in adds['heranca'] if h == _he]
    mh = re.search(r"\n    " + _he + r": \{.*?powers: \[\n(.*?)\n        \]", cur, re.S)
    g = mh.group(1)
    body = eolize('racas', ',\n'.join(items))
    NEW['racas'] = cur[:mh.start(1)] + g.rstrip() + ',' + EOL['racas'] + body + cur[mh.end(1):]

NEW['phtml'] = re.sub(r'^([ \t]*)<option value="frade">Frade</option>',
                      lambda m: m.group(0) + '\n' + m.group(1)
                      + '<option value="mistico">Místico</option>\n' + m.group(1)
                      + '<option value="samurai">Samurai</option>', NEW['phtml'], count=1, flags=re.M)
NEW['phtml'] = re.sub(r'^([ \t]*)<button class="filter-btn sm path-btn" data-path="seteiro">Seteiro</button>',
                      lambda m: m.group(0) + '\n' + m.group(1)
                      + '<button class="filter-btn sm path-btn" data-path="miragem">Miragem</button>\n'
                      + m.group(1)
                      + '<button class="filter-btn sm path-btn" data-path="treinador-base">Padrão</button>\n'
                      + m.group(1)
                      + '<button class="filter-btn sm path-btn" data-path="melhoramigo">Melhor Amigo</button>',
                      NEW['phtml'], count=1, flags=re.M)
NEW['main'] = NEW['main'].replace("    'cacador': ['cacador-base', 'seteiro'],",
                                  "    'cacador': ['cacador-base', 'seteiro', 'miragem'],", 1)
NEW['main'] = NEW['main'].replace("    'treinador': [],", "    'treinador': ['treinador-base', 'melhoramigo'],", 1)
NEW['main'] = NEW['main'].replace("    'frade': [] // Adicione esta linha",
                                  "    'frade': [],\n    'mistico': [],\n    'samurai': [] // Adicione esta linha", 1)
NEW['main'] = NEW['main'].replace("                    'cavaleiro-base', 'vassalo'].includes(power.pathReq);",
                                  "                    'cavaleiro-base', 'vassalo',\n"
                                  "                    'clerigo-base', 'usurpador',\n"
                                  "                    'treinador-base', 'melhoramigo',\n"
                                  "                    'machadodepedra', 'miragem'].includes(power.pathReq);", 1)
NEW['ihtml'] = re.sub(r'^([ \t]*)<option value="Ameaças de Arton">Ameaças de Arton</option>',
                      lambda m: m.group(0) + '\n' + m.group(1)
                      + '<option value="Atlas de Arton">Atlas de Arton</option>\n' + m.group(1)
                      + '<option value="Guia de Deuses Menores">Guia de Deuses Menores</option>',
                      NEW['ihtml'], count=1, flags=re.M)

touched = [k for k in NEW if NEW[k] != TX[k]]
os.makedirs(BK, exist_ok=True)
for k in touched:
    bp = BK + RELP[k]
    os.makedirs(os.path.dirname(bp), exist_ok=True)
    shutil.copy2(V + RELP[k], bp)
    open(V + RELP[k], 'w', encoding='utf-8', newline='').write(NEW[k])
    print('wrote', RELP[k])
print('backups em', BK)

import subprocess
for k in touched:
    if RELP[k].endswith('.js'):
        r = subprocess.run(['node', '--check', V + RELP[k]], capture_output=True, text=True)
        print(('NODE-OK ' if r.returncode == 0 else 'NODE-FAIL ') + RELP[k]
              + ('' if r.returncode == 0 else (' :: ' + r.stderr[:300])))

print('--- verify adds presentes ---')
MISS = 0
for _n, _t, _p, _ti, _st in LOG:
    _f = {'data': 'poderes/js/data.js'}.get(_t.split('/')[0], None)
    _map = {'class': 'data', 'combat': 'data', 'destiny': 'data', 'grupo': 'data', 'magic': 'data',
            'tormenta': 'data', 'complication': 'data', 'conceded': 'data', 'raca': 'data', 'dist': 'dist',
            'dist-new': 'dist', 'arsenal': 'dist', 'chassi': 'racas', 'moreau': 'racas', 'parc': 'parc',
            'itens': 'itens', 'armas': 'armas', 'armad': 'armad', 'itesm': 'itesm', 'grimorio': 'grim',
            'origem': 'orig'}
    _k = _map.get(_t.split('/')[0])
    if _k and norm(TYPO_FIX.get(_n, _n)) not in norm(NEW[_k]):
        print('  VERIFY-MISS:', _n, _t)
        MISS += 1
print('verify misses:', MISS, '/', len(LOG))
