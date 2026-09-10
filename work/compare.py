import re, json, sys

def load_db(path, varname):
    """Extrai o array JS de um arquivo 'const X = [...];' e converte em Python."""
    src = open(path, encoding='utf-8').read()
    # pega do primeiro '[' até o último '];'
    start = src.index('[', src.index(varname))
    end = src.rindex('];')
    arr = src[start:end+1]
    # chaves não-aspadas -> aspadas (ex: name: -> "name":)
    arr = re.sub(r'([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)(\s*:)', r'\1"\2"\3', arr)
    arr = re.sub(r',\s*([}\]])', r'\1', arr)  # trailing commas
    return json.loads(arr)

def keyfn(e):
    return (e.get('nome') or e.get('n') or e.get('name') or '?').strip()

def compare(label, files):
    print(f"\n{'='*70}\n{label}\n{'='*70}")
    dbs = {}
    for name, path, var in files:
        try:
            entries = load_db(path, var)
        except Exception as ex:
            print(f"  [ERRO] {name}: {ex}")
            continue
        dbs[name] = {keyfn(e): e for e in entries}
        print(f"  {name}: {len(entries)} entradas  ({path})")
    names = list(dbs.keys())
    if len(names) < 2: return
    base = names[0]
    allkeys = set()
    for n in names: allkeys |= set(dbs[n].keys())
    print(f"\n  Total de chaves únicas: {len(allkeys)}")
    for n in names[1:]:
        only_base = sorted(set(dbs[base]) - set(dbs[n]))
        only_n = sorted(set(dbs[n]) - set(dbs[base]))
        common = set(dbs[base]) & set(dbs[n])
        changed = [k for k in common if json.dumps(dbs[base][k], sort_keys=True, ensure_ascii=False) != json.dumps(dbs[n][k], sort_keys=True, ensure_ascii=False)]
        print(f"\n  --- {base}  VS  {n} ---")
        print(f"  Só em {base} ({len(only_base)}): {only_base[:12]}{'...' if len(only_base)>12 else ''}")
        print(f"  Só em {n} ({len(only_n)}): {only_n[:12]}{'...' if len(only_n)>12 else ''}")
        print(f"  Em comum com CONTEÚDO DIFERENTE: {len(changed)}")
        if changed:
            print(f"  Exemplos mudados: {sorted(changed)[:12]}")
    return dbs

R = '/home/user/arsenal-ref/'
compare("AMEAÇAS (AMEACAS_DB)", [
    ("ameacas/db (28ago)", R+'ameacas/db/ameacas_db.js', 'AMEACAS_DB'),
    ("ameacas/ (20ago)",   R+'ameacas/ameacas_db.js', 'AMEACAS_DB'),
    ("ameacas/bkp (19jun)",R+'ameacas/bkp ameacas_db.js', 'AMEACAS_DB'),
    ("ficha/ (23mai)",     R+'ficha/ameacas_db.js', 'AMEACAS_DB'),
])
compare("MAGIAS (SPELLS_DB)", [
    ("grimorio/ (19jun)", R+'grimorio/spells_db.js', 'SPELLS_DB'),
    ("ficha/ (22jun)",    R+'ficha/spells_db.js', 'SPELLS_DB'),
    ("macros/ (23mai)",   R+'macrosroll20/spells_db.js', 'SPELLS_DB'),
])
compare("JORNADAS (JORNADAS_DB)", [
    ("ameacas/db (28ago)", R+'ameacas/db/jornadas.js', 'JORNADAS_DB'),
    ("ameacas/ (20ago)",   R+'ameacas/jornadas.js', 'JORNADAS_DB'),
])
