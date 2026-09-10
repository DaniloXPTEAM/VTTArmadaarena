"""Leitor LevelDB (packs Foundry v13): .ldb via encadeamento Snappy + .log. Puro-Python."""
import os, struct, glob

def _varint(buf, pos):
    r = s = 0
    while True:
        b = buf[pos]; pos += 1
        r |= (b & 0x7F) << s
        if not (b & 0x80): break
        s += 7
    return r, pos

def snappy_decode_raw(buf):
    """Decodifica 1 bloco snappy-raw. Retorna (bytes, nº bytes de entrada consumidos)."""
    pos = 0; shift = 0; outlen = 0
    while True:
        b = buf[pos]; pos += 1
        outlen |= (b & 0x7f) << shift
        if not b & 0x80: break
        shift += 7
        if shift > 35: raise ValueError('preamble ruim')
    if outlen > 64*1024*1024: raise ValueError('grande demais')
    out = bytearray()
    while len(out) < outlen:
        tag = buf[pos]; pos += 1
        typ = tag & 3
        if typ == 0:
            l = tag >> 2
            if l < 60: length = l + 1
            else:
                n = l - 59
                length = int.from_bytes(buf[pos:pos+n], 'little') + 1
                pos += n
            out += buf[pos:pos+length]; pos += length
        else:
            if typ == 1:
                length = ((tag >> 2) & 7) + 4
                off = ((tag >> 5) << 8) | buf[pos]; pos += 1
            elif typ == 2:
                length = (tag >> 2) + 1
                off = buf[pos] | (buf[pos+1] << 8); pos += 2
            else:
                length = (tag >> 2) + 1
                off = int.from_bytes(buf[pos:pos+4], 'little'); pos += 4
            if off == 0 or off > len(out): raise ValueError('offset ruim')
            for _ in range(length): out.append(out[len(out)-off])
    return bytes(out), pos

def _entries(buf):
    if len(buf) < 4: return
    n = struct.unpack('<I', buf[-4:])[0]
    end = len(buf) - 4 - 4*n
    if end <= 0 or end > len(buf): return
    pos, last = 0, b''
    while pos < end:
        sh, pos = _varint(buf, pos)
        ns, pos = _varint(buf, pos)
        vl, pos = _varint(buf, pos)
        key = last[:sh] + buf[pos:pos+ns]; pos += ns
        yield key, buf[pos:pos+vl]; pos += vl
        last = key

def read_sstable(path):
    """Encadeia blocos de dados do off 0 até região não-snappy. Retorna [(user_key, seq, tipo, valor)]."""
    data = open(path, 'rb').read()
    out, off = [], 0
    while off + 10 < len(data):
        try:
            payload, consumed = snappy_decode_raw(data[off:])
        except Exception:
            break
        if data[off+consumed] != 1:  # trailer: ctype deve ser snappy
            break
        for ikey, val in _entries(payload):
            if len(ikey) < 8: continue
            user, trailer = ikey[:-8], ikey[-8:]
            typ = trailer[0]
            seq = struct.unpack('<Q', bytes(trailer[0:8]))[0] >> 8
            out.append((user, seq, typ, val))
        off += consumed + 5
    return out

def read_log(path):
    data = open(path, 'rb').read()
    out, frag, i = [], b'', 0
    def batch(b):
        if len(b) < 12: return
        cnt = struct.unpack('<I', b[8:12])[0]
        pos = 12
        for _ in range(cnt):
            if pos >= len(b): break
            tag = b[pos]; pos += 1
            kl, pos = _varint(b, pos)
            key = b[pos:pos+kl]; pos += kl
            if tag == 1:
                vl, pos = _varint(b, pos)
                out.append((key, 1, b[pos:pos+vl])); pos += vl
            else:
                out.append((key, 0, None))
    while i + 7 <= len(data):
        if i % 32768 + 7 > 32768:
            i += 32768 - (i % 32768); continue
        ln = struct.unpack('<H', data[i+4:i+6])[0]
        typ, pay = data[i+6], data[i+7:i+7+ln]
        i += 7 + ln
        if typ == 1: batch(pay)
        elif typ == 2: frag = pay
        elif typ == 3: frag += pay
        elif typ == 4: frag += pay; batch(frag); frag = b''
    return out

def _fnum(path):
    try: return int(os.path.basename(path).split('.')[0])
    except ValueError: return -1

def read_pack(pack_dir):
    files = sorted(glob.glob(os.path.join(pack_dir, '*.ldb')) + glob.glob(os.path.join(pack_dir, '*.log')), key=_fnum)
    best = {}
    for f in files:
        n = _fnum(f)
        try:
            if f.endswith('.ldb'):
                for k, seq, typ, v in read_sstable(f):
                    cur = best.get(k)
                    if cur is None or (n, seq) > (cur[0], cur[1]):
                        best[k] = (n, seq, typ, v)
            else:
                for j, (k, typ, v) in enumerate(read_log(f)):
                    cur = best.get(k)
                    if cur is None or (n, 10**18 + j) > (cur[0], cur[1]):
                        best[k] = (n, 10**18 + j, typ, v)
        except Exception as e:
            print(f'  [aviso] {f}: {e}')
    return {k: v for k, (_, _, t, v) in best.items() if t == 1}

def split_key(k):
    """'!actors.items!A.B' -> ('actors.items', 'A.B'). Tenta também '!!ns!k'."""
    s = k.decode('utf-8', 'replace')
    if s.startswith('!!'): s = s[1:]
    assert s.startswith('!'), s
    ns, _, kp = s[1:].partition('!')
    return ns, kp
