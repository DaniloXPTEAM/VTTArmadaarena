
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
