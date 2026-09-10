import json, sys
sys.path.insert(0, '/home/user/work')
from leveldb_read import read_pack, split_key

def classify(ns, kp, d):
    if ns == 'folders' or 'sorting' in d and 'prototypeToken' not in d and 'system' not in d and 'pages' not in d and 'command' not in d and 'background' not in d:
        return f"Folder({d.get('type')})"
    if '.' in ns:  # embedded
        leaf = ns.rsplit('.', 1)[-1]
        return f"emb:{leaf}:{d.get('type')}"
    if not isinstance(d, dict): return '?'
    if 'prototypeToken' in d: return f"Actor:{d.get('type')}"
    if 'background' in d and 'grid' in d: return "Scene"
    if 'pages' in d: return "JournalEntry"
    if 'command' in d: return "Macro"
    if 'system' in d: return f"Item:{d.get('type')}"
    if 'results' in d: return "RollTable"
    if 'sounds' in d: return "Playlist"
    if 'scenes' in d or 'actors' in d: return "Adventure?"
    return f"?ns={ns}"

def show(pack):
    print(f"\n===== {pack} =====", flush=True)
    kvs = read_pack(pack)
    print(f"registros únicos: {len(kvs)}", flush=True)
    cats, bad = {}, 0
    for k, v in kvs.items():
        try: d = json.loads(v.decode('utf-8'))
        except Exception: bad += 1; continue
        try: ns, kp = split_key(k)
        except Exception: ns, kp = '?', '?'
        c = classify(ns, kp, d)
        cats[c] = cats.get(c, 0) + 1
    for c in sorted(cats): print(f"  {c}: {cats[c]}", flush=True)
    if bad: print(f"  <não-JSON>: {bad}", flush=True)

R = '/home/user/vendor-review/'
import glob
for p in sorted(glob.glob(R + '*/*/packs/*')) + sorted(glob.glob(R + '*/packs/*')):
    show(p)
