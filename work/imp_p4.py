
# ---------------- roteamento ----------------
adds = {k: [] for k in ('data', 'dist', 'chassi', 'heranca', 'parc', 'itens', 'armas', 'armad', 'itesm',
                        'grim', 'orig', 'arsenal')}
skipped, unmatched, LOG = [], [], []
COBAIA = {'pod': [], 'marca': None}
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
        tiers, intro = parse_tiers(cleand(d))
        if tiers is None:
            DBG['tier_fail'].append(NAME)
            tiers, intro = None, sp(cleand(d))
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
        if NAME == 'Procedimento Inicial (Marca)':
            COBAIA['marca'] = (pack, d)
        else:
            COBAIA['pod'].append((pack, d))
        LOG.append((NAME, 'dist-new/cobaia', pack, TIPO, ST))
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
