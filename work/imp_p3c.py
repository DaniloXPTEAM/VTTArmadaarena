
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
