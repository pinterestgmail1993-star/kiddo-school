#!/usr/bin/env python3
"""Dims for the 32 early-addition-and-subtraction masters + duplicate check
for the two 10-minus-3 uploads (byte + pixel compare)."""
import os, json, hashlib
from PIL import Image, ImageChops

D = '/tmp/eas'
out = {}
for f in sorted(os.listdir(D)):
    if not f.endswith('.jpg'):
        continue
    p = os.path.join(D, f)
    with Image.open(p) as im:
        w, h = im.size
        fmt = im.format
    md5 = hashlib.md5(open(p, 'rb').read()).hexdigest()
    out[f] = {'w': w, 'h': h, 'fmt': fmt, 'bytes': os.path.getsize(p), 'md5': md5}

dims = {(v['w'], v['h']) for v in out.values()}
print('DISTINCT DIMS:', sorted(dims))
print('FORMATS:', {v['fmt'] for v in out.values()})
print('TOTAL FILES:', len(out))

a = out['10-minus-3-subtraction-flashcard-for-kids.jpg']
b = out['10-minus-3-subtraction-flashcard-for-kids-2.jpg']
print('dup bytes:', a['bytes'], b['bytes'])
print('same md5:', a['md5'] == b['md5'])
ia = Image.open(os.path.join(D, '10-minus-3-subtraction-flashcard-for-kids.jpg')).convert('RGB')
ib = Image.open(os.path.join(D, '10-minus-3-subtraction-flashcard-for-kids-2.jpg')).convert('RGB')
if ia.size != ib.size:
    print('PIXELS: different sizes', ia.size, ib.size)
else:
    diff = ImageChops.difference(ia, ib)
    bbox = diff.getbbox()
    hist = diff.convert('L').histogram()
    changed = sum(hist[8:])  # pixels differing by >8 levels
    print('PIXELS: diff bbox:', bbox, '| pixels >8 levels off:', changed, f'({100*changed/(ia.size[0]*ia.size[1]):.2f}%)')

with open('/home/z/my-project/scripts/eas-dims.json', 'w') as fh:
    json.dump(out, fh, indent=1, sort_keys=True)
for k in sorted(out):
    v = out[k]
    print(f"{k} {v['w']}x{v['h']} {v['bytes']} {v['md5'][:8]}")
