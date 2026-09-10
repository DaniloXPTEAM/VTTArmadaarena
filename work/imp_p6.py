
# ---------------- anchors + apply ----------------
G = {}
for _k, _p in (('grim', 'grimorio/spells_db.js'), ('main', 'poderes/js/main.js'),
               ('phtml', 'poderes/index.html'), ('ihtml', 'itens/index.html'),
               ('itens', 'itens/data/itens.js'), ('armas', 'itens/data/armas.js'),
               ('armad', 'itens/data/armaduras.js'), ('itesm', 'itens/data/itensmagicos.js')):
    G[_k] = open(V + _p, encoding='utf-8').read()
TX = {'data': ptxt, 'dist': dtxt, 'parc': partxt, 'orig': otxt, 'racas': rtxt}
TX.update(G)


def EOLof(t):
    return '\r\n' if t.count('\r\n') * 2 > t.count('\n') else '\n'


EOL = {k: EOLof(v) for k, v in TX.items()}
print('--- EOL ---')
print(' ', EOL)
CHK = []


def chk(name, ok):
    CHK.append((name, ok))
    print('  anchor %s: %s' % (name, 'OK' if ok else 'MISS'))


chk('data-end', bool(re.search(r'([^}]*)\]\s*$', TX['data'])))
chk('dist-end', bool(re.search(r'([^}]*)\]\s*$', TX['dist'])))
chk('orig-end', bool(re.search(r'([^}]*)\]\s*$', TX['orig'])))
chk('parc-end', bool(re.search(r'([^}]*)\]\s*$', TX['parc'])))
chk('grim-end', bool(re.search(r'([^}]*)\]\s*$', TX['grim'])))
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
    m = re.search(r'([^}]*)\]\s*$', txt)
    assert m and not m.group(1).strip(), 'end-' + k
    body = eolize(k, ',\n'.join(entries))
    NEW[k] = txt[:m.start()] + m.group(1).rstrip() + ',' + EOL[k] + body + EOL[k] + '];' \
        + txt[m.start() + len(m.group(1)) + 1:]


def arr_append(k, entries):
    txt = NEW[k]
    idx = txt.rfind('\n    ]')
    assert idx > 0 and re.match(r'\r?\n\};', txt[idx + 6:idx + 12]), 'arr-' + k
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
if COBAIA_ENTRY:
    end_append('dist', [COBAIA_ENTRY])
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
        mc = re.search(r"\n        \]\r?\n    \},", seg)
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
    items = eolize('dist', (',\n'.join('            { n: %s, d: %s },' % p for p in ARS_ADD))[:-1])
    a, b = est + ma.start(1), est + ma.end(2)
    NEW['dist'] = cur[:a] + ma.group(1).rstrip() + ',' + EOL['dist'] + items + EOL['dist'] \
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
                                  "    'cacador': ['cacador-base', 'seteiro', 'miragem'], 1)
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

RELP = {'data': 'poderes/js/data.js', 'dist': 'poderes/js/distincoes-data.js', 'parc': 'parceiros/parceiros.js',
        'orig': 'poderes/js/origens.js', 'racas': 'calculadora/racas.js', 'grim': 'grimorio/spells_db.js',
        'main': 'poderes/js/main.js', 'phtml': 'poderes/index.html', 'ihtml': 'itens/index.html',
        'itens': 'itens/data/itens.js', 'armas': 'itens/data/armas.js', 'armad': 'itens/data/armaduras.js',
        'itesm': 'itens/data/itensmagicos.js'}
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
