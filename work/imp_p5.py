
# ---------------- COBAIA assembly (dry-run visible) ----------------
COBAIA_ENTRY = None
if COBAIA['pod'] or COBAIA['marca']:
    _pp = []
    for _pack, _d in COBAIA['pod']:
        _S = _d.get('system') or {}
        _rq, _dc = split_req(clean(_dcv(_d)))
        if not _rq:
            DBG['dist_noreq'] += 1
        _pp.append(dist_entry(sstr(TYPO_FIX.get(_d.get('name'), _d.get('name'))), sstr(_rq or '—'), sstr(_dc)))
    if COBAIA['marca']:
        _pack, _d = COBAIA['marca']
        _S = _d.get('system') or {}
        _rq, _dc = split_req(clean(_dcv(_d)))
        _mn = re.sub(r' \(marca\)$', '', _d.get('name'), flags=re.I)
        _marca = ('        marca: {\n            name: %s,\n            desc: %s\n        },'
                  % (sstr('Marca da Distinção: ' + _mn), sstr(_dc)))
    else:
        _marca = ''
    COBAIA_ENTRY = ('    {\n        id: %s,\n        name: %s,\n        source: %s,\n        exclusiva: true,\n'
                    '        admissao: %s,\n%s\n        poderes: [\n%s\n        ]\n    }'
                    % (sstr('cobaia-dos-medicos-monstros'), sstr('Cobaia dos Médicos Monstros'),
                       sstr('herois'),
                       sstr('Permitir que os Médicos Monstros realizem experimentos em seu corpo (ver Heróis de Arton).'),
                       _marca, ',\n'.join(_pp)))
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

print('adds: ' + ', '.join('%s=%d' % (k, len(v)) for k, v in adds.items())
print('cobaia: pod=%d marca=%s ars_add=%d' % (len(COBAIA['pod']), bool(COBAIA['marca']), len(ARS_ADD)))
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
