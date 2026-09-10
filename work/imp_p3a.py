
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
    _mc = norm(re.sub(r'^marca da distinção:\s*', '', _mm.group(1))) if _mm else None
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
_TM = open(V + 'itens/data/itensmagicos.js', encoding='utf-8').read()
ITF['itesm'] |= {norm(x) for x in re.findall(r'nome: "((?:[^"\\]|\\.)*)"', _TM)}
