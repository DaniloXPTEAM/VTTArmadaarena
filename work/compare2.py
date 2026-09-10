import re, json

def load_db(path, varname):
    src = open(path, encoding='utf-8').read()
    start = src.index('[', src.index(varname))
    # fim: último ']' antes de ';' ou fim de bloco
    end = src.rindex(']')
    arr = src[start:end+1]
    arr = re.sub(r'([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)(\s*:)', r'\1"\2"\3', arr)
    arr = re.sub(r',\s*([}\]])', r'\1', arr)
    return json.loads(arr)

R = '/home/user/arsenal-ref/'
g = {e['n'].strip(): e for e in load_db(R+'grimorio/spells_db.js','SPELLS_DB')}
m = {e['n'].strip(): e for e in load_db(R+'macrosroll20/spells_db.js','SPELLS_DB')}
print(f"grimorio (19jun) = ficha (22jun, idêntico md5): {len(g)} magias")
print(f"macrosroll20 (23mai): {len(m)} magias")
print(f"Só no grimorio/ficha: {len(set(g)-set(m))} -> {sorted(set(g)-set(m))[:15]}")
print(f"Só no macros: {len(set(m)-set(g))} -> {sorted(set(m)-set(g))[:15]}")
common = set(g)&set(m)
chg = [k for k in common if json.dumps(g[k],sort_keys=True,ensure_ascii=False)!=json.dumps(m[k],sort_keys=True,ensure_ascii=False)]
print(f"Em comum com conteúdo diferente: {len(chg)} -> exemplos: {sorted(chg)[:10]}")
print(f"Campos grimorio: {sorted(g[list(g)[0]].keys())}")
print(f"Campos macros: {sorted(m[list(m)[0]].keys())}")

# detalhe das 4 ameaças que mudaram entre 20ago e 28ago
a28 = {e['nome'].strip(): e for e in load_db(R+'ameacas/db/ameacas_db.js','AMEACAS_DB')}
a20 = {e['nome'].strip(): e for e in load_db(R+'ameacas/ameacas_db.js','AMEACAS_DB')}
for k in ['Alto sacerdote de Hyninn','Iniciado da Agonia','Sacerdote de Hyninn','Soldado Mecânico']:
    print(f"\n--- {k} ---")
    for field in a28[k]:
        v28, v20 = a28[k].get(field), a20[k].get(field)
        if v28 != v20:
            print(f"  [{field}] 20ago: {str(v20)[:120]}")
            print(f"  [{field}] 28ago: {str(v28)[:120]}")
