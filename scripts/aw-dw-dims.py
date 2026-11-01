#!/usr/bin/env python3
"""Probe the Action Words (24) and Describing Words (46) masters on R2:
HTTP status, content-type, byte size vs the owner's panel (panel kB are
DECIMAL — one probe fixed for that in the Class 48 round), then download +
record real pixel dimensions. THE JPG MASTERS RIDE EXACTLY AS UPLOADED —
no conversion, no re-compression, file names char-for-char.
FOLDER: the brief said …/flashcards/ but the live bucket keeps both decks
at the folder ROOT (the dinosaurs/art-room/Class-39 quirk — probed 404 at
flashcards/, 200 image/jpeg at the root), so the real R2 location is the
truth and the BASEs point there; the owner is told in the round report."""
import os, json, urllib.request

CDN = 'https://assets.kiddo.school/'
AW = 'school/learning-path/action-words/'
DW = 'school/learning-path/describing-words/'
DA, DD = '/tmp/aw', '/tmp/dw'
os.makedirs(DA, exist_ok=True); os.makedirs(DD, exist_ok=True)

AW_FILES = {
 "bite-chew-smell-touch-feel-action-words-flashcard-for-kids.jpg": 197,
 "blow-wave-shake-stretch-bend-action-words-flashcard-for-kids.jpg": 201,
 "borrow-return-buy-sell-pay-action-words-flashcard-for-kids.jpg": 239,
 "build-draw-cook-wash-read-action-words-flashcard-for-kids.jpg": 242,
 "clean-sweep-dry-fix-pack-action-words-flashcard-for-kids.jpg": 198,
 "crawl-kneel-point-clap-wave-action-words-flashcard-for-kids.jpg": 187,
 "eat-drink-sleep-wake-rest-action-words-flashcard-for-kids.jpg": 185,
 "enjoy-love-like-hate-need-action-words-flashcard-for-kids.jpg": 191,
 "find-lose-choose-share-show-action-words-flashcard-for-kids.jpg": 203,
 "knock-ring-answer-hang-unhang-action-words-flashcard-for-kids.jpg": 201,
 "look-listen-talk-smile-laugh-action-words-flashcard-for-kids.jpg": 190,
 "open-close-give-take-help-action-words-flashcard-for-kids.jpg": 205,
 "plant-water-dig-cut-mix-action-words-flashcard-for-kids.jpg": 199,
 "pull-build-draw-cook-action-words-flashcard-for-kids.jpg": 205,
 "read-write-count-match-sort-action-words-flashcard-for-kids.jpg": 216,
 "ride-drive-fly-sail-row-action-words-flashcard-for-kids.jpg": 212,
 "run-jump-climb-push-action-words-flashcard-for-kids.jpg": 206,
 "run-jump-climb-push-pull-action-words-flashcard-for-kids.jpg": 207,
 "shout-whisper-ask-answer-think-action-words-flashcard-for-kids.jpg": 194,
 "sing-dance-swim-throw-catch-action-words-flashcard-for-kids.jpg": 221,
 "sit-stand-walk-hop-skip-action-words-flashcard-for-kids.jpg": 192,
 "tie-untie-fold-carry-hold-action-words-flashcard-for-kids.jpg": 193,
 "turn-spin-stop-start-wait-action-words-flashcard-for-kids.jpg": 186,
 "win-miss-score-kick-hit-action-words-flashcard-for-kids.jpg": 203,
}
DW_FILES = {
 "beautiful-describing-word-flashcard-for-kids.jpg": 119,
 "big-describing-word-flashcard-for-kids.jpg": 110,
 "brave-describing-word-flashcard-for-kids.jpg": 126,
 "clean-describing-word-flashcard-for-kids.jpg": 116,
 "closed-describing-word-flashcard-for-kids.jpg": 131,
 "cold-describing-word-flashcard-for-kids.jpg": 127,
 "dark-describing-word-flashcard-for-kids.jpg": 116,
 "deep-describing-word-flashcard-for-kids.jpg": 126,
 "dirty-describing-word-flashcard-for-kids.jpg": 123,
 "dry-describing-word-flashcard-for-kids.jpg": 114,
 "empty-describing-word-flashcard-for-kids.jpg": 116,
 "far-describing-word-flashcard-for-kids.jpg": 112,
 "fast-describing-word-flashcard-for-kids.jpg": 119,
 "full-describing-word-flashcard-for-kids.jpg": 124,
 "happy-describing-word-flashcard-for-kids.jpg": 121,
 "hard-describing-word-flashcard-for-kids.jpg": 117,
 "heavy-describing-word-flashcard-for-kids.jpg": 125,
 "high-describing-word-flashcard-for-kids.jpg": 107,
 "hot-describing-word-flashcard-for-kids.jpg": 121,
 "kind-describing-word-flashcard-for-kids.jpg": 124,
 "light-describing-word-flashcard-for-kids.jpg": 121,
 "loud-describing-word-flashcard-for-kids.jpg": 123,
 "low-describing-word-flashcard-for-kids.jpg": 113,
 "mean-describing-word-flashcard-for-kids.jpg": 118,
 "narrow-describing-word-flashcard-for-kids.jpg": 131,
 "near-describing-word-flashcard-for-kids.jpg": 113,
 "old-describing-word-flashcard-for-kids.jpg": 115,
 "open-describing-word-flashcard-for-kids.jpg": 117,
 "quiet-describing-word-flashcard-for-kids.jpg": 112,
 "rough-describing-word-flashcard-for-kids.jpg": 158,
 "sad-describing-word-flashcard-for-kids.jpg": 121,
 "scared-describing-word-flashcard-for-kids.jpg": 134,
 "short-describing-word-flashcard-for-kids.jpg": 116,
 "slow-describing-word-flashcard-for-kids.jpg": 126,
 "small-describing-word-flashcard-for-kids.jpg": 107,
 "smooth-describing-word-flashcard-for-kids.jpg": 112,
 "soft-describing-word-flashcard-for-kids.jpg": 115,
 "strong-describing-word-flashcard-for-kids.jpg": 132,
 "tall-describing-word-flashcard-for-kids.jpg": 103,
 "thick-describing-word-flashcard-for-kids.jpg": 115,
 "thin-describing-word-flashcard-for-kids.jpg": 105,
 "ugly-describing-word-flashcard-for-kids.jpg": 118,
 "weak-describing-word-flashcard-for-kids.jpg": 148,
 "wet-describing-word-flashcard-for-kids.jpg": 136,
 "wide-describing-word-flashcard-for-kids.jpg": 122,
 "young-describing-word-flashcard-for-kids.jpg": 120,
}

def probe(base, files, dest, tag):
    from PIL import Image
    out, bad = {}, []
    for f, panel_kb in files.items():
        url = CDN + base + f
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 kiddo-probe'})
            with urllib.request.urlopen(req, timeout=30) as r:
                data = r.read()
                ct = r.headers.get('Content-Type', '')
            ok = 200
        except Exception as ex:
            bad.append((f, str(ex)[:80])); continue
        p = os.path.join(dest, f)
        with open(p, 'wb') as fh: fh.write(data)
        w, h = Image.open(p).size
        kb_dec = len(data) / 1000.0
        drift = abs(kb_dec - panel_kb)
        out[f] = {'status': ok, 'ctype': ct, 'bytes': len(data), 'panel_kb': panel_kb,
                  'kb_decimal': round(kb_dec, 1), 'w': w, 'h': h}
        flag = '' if drift <= 1.0 else '  << BYTE DRIFT'
        print(f"{tag} {f[:58]:58s} {ok} {ct:10s} {w}x{h} {kb_dec:6.1f}kB panel {panel_kb}kB{flag}")
    return out, bad

aw, aw_bad = probe(AW, AW_FILES, DA, 'AW')
dw, dw_bad = probe(DW, DW_FILES, DD, 'DW')
if aw_bad or dw_bad:
    print('FAILURES:', json.dumps({'aw': aw_bad, 'dw': dw_bad}, indent=1))
    raise SystemExit(1)

json.dump({'action-words': aw, 'describing-words': dw},
          open('/home/z/my-project/kiddo-school/scripts/aw-dw-dims.json', 'w'), indent=1)
dims = {f: (v['w'], v['h']) for v in (aw, dw) for f, v in v.items()}
shapes = {}
for f, v in list(aw.items()) + list(dw.items()):
    shapes.setdefault((v['w'], v['h']), []).append(f)
print('SHAPES:', {f'{k[0]}x{k[1]}': len(v) for k, v in shapes.items()})
print('OK', len(aw), 'action-words +', len(dw), 'describing-words probed, downloaded, dims recorded')
