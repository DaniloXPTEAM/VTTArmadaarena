import re, json, hashlib
R='/home/user/arsenal-ref/'
vtt = open(R+'Vtt/ficha-vtt.html', encoding='utf-8', errors='replace').read()
m = re.search(r'<script>const SPELLS_DB = \[(.*?)\]</script>', vtt, re.S)
print("inline SPELLS_DB encontrado:", bool(m))
inline = '['+m.group(1)+']' if m else '[]'
inline = re.sub(r'([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)(\s*:)', r'\1"\2"\3', inline)
inline = re.sub(r',\s*([}\]])', r'\1', inline)
inl = json.loads(inline)
print("entradas inline:", len(inl), "| campos:", sorted(inl[0].keys()))
g = open(R+'grimorio/spells_db.js', encoding='utf-8').read()
start = g.index('[', g.index('SPELLS_DB')); end = g.rindex(']')
gj = json.loads(re.sub(r',\s*([}\]])', r'\1', re.sub(r'([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)(\s*:)', r'\1"\2"\3', g[start:end+1])))
print("entradas grimorio:", len(gj), "| campos:", sorted(gj[0].keys()))
gi = {e['n'].strip(): e for e in gj}; ii = {e['n'].strip(): e for e in inl}
print("só grimorio:", len(set(gi)-set(ii)), "só inline:", len(set(ii)-set(gi)))
common = set(gi)&set(ii)
chg = [k for k in common if json.dumps(gi[k],sort_keys=True,ensure_ascii=False)!=json.dumps(ii[k],sort_keys=True,ensure_ascii=False)]
print("conteúdo diferente:", len(chg), sorted(chg)[:8])
