#!/usr/bin/env python3
"""Probe exact dimensions of the 36 family-and-friends master JPGs (no re-compress)."""
import os, json
from PIL import Image

D = '/tmp/ff46'
out = {}
for f in sorted(os.listdir(D)):
    if not f.endswith('.jpg'):
        continue
    p = os.path.join(D, f)
    with Image.open(p) as im:
        w, h = im.size
        fmt = im.format
    out[f] = {'w': w, 'h': h, 'fmt': fmt, 'bytes': os.path.getsize(p)}

dims = {(v['w'], v['h']) for v in out.values()}
fmts = {v['fmt'] for v in out.values()}
print('DISTINCT DIMS:', sorted(dims))
print('FORMATS:', fmts)
print('TOTAL FILES:', len(out))
with open('/home/z/my-project/scripts/ff46-dims.json', 'w') as fh:
    json.dump(out, fh, indent=1, sort_keys=True)
# print per-file compact
for k in sorted(out):
    v = out[k]
    print(f"{k} {v['w']}x{v['h']} {v['bytes']}")
