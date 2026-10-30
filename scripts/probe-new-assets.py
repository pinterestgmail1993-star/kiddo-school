# Probe the three new R2 decks (halloween hall sets, question-words,
# sequence-stories): confirm every card the owner pasted is live (HTTP 200,
# image/webp), report pixel dimensions, and build one labeled contact sheet
# per deck so the page copy/alts can be written from the real artwork.
import json, os, io, urllib.request

BASE_HW = 'https://assets.kiddo.school/school/hall/halloween/'
BASE_QW = 'https://assets.kiddo.school/school/extra-classes/question-words/flashcards/'
BASE_SS = 'https://assets.kiddo.school/school/extra-classes/sequence-stories/flashcards/'

HW = {
 'action-verbs': ['01-cat-ghost-pumpkin-bat','02-skeleton-witch-spider-mummy','03-vampire-werewolf-zombie-dragon','04-cauldron-monster-ghost-crow','05-alien-scarecrow-witch-owl','06-broom-goblin-frankenstein-moon','07-ghost-bat-pumpkin-witch-hat','08-ghost-spider-monster-bat','09-scarecrow-skeleton-cauldron-werewolf','10-vampire-zombie-witch-goblin','11-mummy-pumpkin-monster-witch','12-wizard-owl-ghost-frankenstein'],
 'activities': ['01-pumpkin-carving-costume-parade-apple-bobbing-trick-or-treat','02-ghost-story-dance-costume-photo-mask-making','03-scavenger-hunt-potion-bingo-ghost-craft','04-haunted-house-pumpkin-toss-zombie-freeze-bat-craft','05-candy-sorting-puzzle-monster-mask-storybook','06-movie-cupcakes-parade-treasure-hunt','07-pumpkin-painting-candy-relay-ghost-bowling-hat-toss','08-mummy-wrap-bat-pinata-spider-web-musical-chairs','09-monster-dress-up-memory-game-charades-crawl-race','10-puppet-show-glow-dance-i-spy-monster-relay','11-pumpkin-roll-costume-guessing-broom-race-sound-game','12-candy-counting-balloon-pop-coloring-obstacle-course'],
 'feelings-and-emotions': ['01-happy-sad-angry-scared','02-excited-worried-surprised-sleepy','03-proud-shy-confused-bored','04-calm-silly-lonely-jealous','05-loved-frustrated-relaxed-curious'],
 'items': ['01-pumpkin-ghost-bat-witch','02-monster-owl-goblin-mummy','03-vampire-spider-skeleton-scarecrow','04-werewolf-cauldron-wizard-scarecrow','05-dragon-ghost-pumpkin-witch-hat','06-moon-frankenstein-bat-zombie'],
}
QW_NAMES = ['how-many','how-much','how-old','how','what-happened','what-next','what-time','what','when','where-are-you','where','which','who-are-you','who','whose-turn','why']
SS_NAMES = ['bedtime','blow-bubbles','build-a-snowman','build-a-tower','find-teddy','fly-a-kite','go-to-the-park','jump-in-the-puddle','make-a-paper-boat','make-a-paper-crown','make-a-sandwich','make-lemonade','make-toast','pick-up-the-banana-peel','plant-a-seed','put-on-socks-and-shoes','put-on-your-coat','read-a-book','set-the-table','sock-puppet','tidy-the-toys','wash-and-eat-an-apple','wash-your-hands','water-the-plant']

def variants(base, names):
    """cover first, then each card name with and without a numeric prefix."""
    out = [('cover.webp', base + 'cover.webp')]
    for n in names:
        out.append((n + '.webp', base + n + '.webp'))
        out.append(('01-' + n + '.webp', base + '01-' + n + '.webp'))
    return out

def probe(url):
    req = urllib.request.Request(url, method='HEAD', headers={'User-Agent': 'kiddo-probe/1.0'})
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return r.status, r.headers.get('content-type', ''), int(r.headers.get('content-length', '0'))
    except Exception as e:
        code = getattr(e, 'code', None)
        return (code if code else 'ERR'), str(e)[:40], 0

def dims(data):
    try:
        from PIL import Image
        im = Image.open(io.BytesIO(data))
        return im.size
    except Exception:
        return None

results = {'hw': [], 'qw': [], 'ss': []}
# --- halloween sets: exactly as pasted, no variants needed
for set_name, names in HW.items():
    for n in names:
        f = n + '.webp'
        s, ct, cl = probe(BASE_HW + set_name + '/' + f)
        results['hw'].append({'set': set_name, 'file': f, 'status': s, 'ct': ct, 'len': cl})
# halloween cover? (not in the paste — check anyway)
results['hw'].append({'set': 'root', 'file': 'cover.webp', 'status': probe(BASE_HW + 'cover.webp')[0], 'ct': '-', 'len': 0})
# --- question words + sequence stories: try both name patterns
for key, base, names in (('qw', BASE_QW, QW_NAMES), ('ss', BASE_SS, SS_NAMES)):
    for label, url in variants(base, names):
        s, ct, cl = probe(url)
        if s == 200:
            results[key].append({'file': label, 'status': s, 'ct': ct, 'len': cl, 'url': url})
for k, v in results.items():
    ok = [x for x in v if x['status'] == 200]
    bad = [x for x in v if x['status'] != 200]
    print(f"== {k}: {len(ok)} live / {len(bad)} failed")
    for x in bad:
        print('  FAIL', x['file'] if 'file' in x else x, x['status'])
json.dump(results, open('scripts/manners-tmp/probe-new.json', 'w'), indent=1)

# --- contact sheets (3 decks) --------------------------------------------
os.makedirs('scripts/manners-tmp/sheets', exist_ok=True)
from PIL import Image, ImageDraw

def sheet(items, out, cols=6, cell=300):
    rows = (len(items) + cols - 1) // cols
    W, H = cols * cell, rows * (cell + 26)
    canvas = Image.new('RGB', (W, H), 'white')
    d = ImageDraw.Draw(canvas)
    for i, it in enumerate(items):
        r, c = divmod(i, cols)
        x, y = c * cell, r * (cell + 26)
        try:
            req = urllib.request.Request(it['url'], headers={'User-Agent': 'kiddo-probe/1.0'})
            data = urllib.request.urlopen(req, timeout=30).read()
            im = Image.open(io.BytesIO(data)).convert('RGB')
            im.thumbnail((cell - 8, cell - 8))
            canvas.paste(im, (x + 4, y + 4))
            it['dims'] = im.size
        except Exception as e:
            d.text((x + 6, y + 6), 'ERR ' + str(e)[:20], fill='red')
        d.text((x + 6, y + cell + 2), it['label'][:46], fill='black')
    canvas.save(out, quality=82)
    print('sheet ->', out, canvas.size)

hw_items = [{'url': BASE_HW + s + '/' + n + '.webp', 'label': s + '/' + n[:34]} for s, ns in HW.items() for n in ns]
sheet(hw_items, 'scripts/manners-tmp/sheets/halloween.jpg', cols=6)
qw_live = [x for x in results['qw'] if x['status'] == 200 and x['file'] != 'cover.webp']
qw_items = [{'url': BASE_QW + 'cover.webp', 'label': 'cover'}] + [{'url': x['url'], 'label': x['file'][:38]} for x in qw_live]
sheet(qw_items, 'scripts/manners-tmp/sheets/question-words.jpg', cols=6)
ss_live = [x for x in results['ss'] if x['status'] == 200 and x['file'] != 'cover.webp']
ss_items = [{'url': BASE_SS + 'cover.webp', 'label': 'cover'}] + [{'url': x['url'], 'label': x['file'][:38]} for x in ss_live]
sheet(ss_items, 'scripts/manners-tmp/sheets/sequence-stories.jpg', cols=7)
json.dump({'hw_dims': {it['label']: it.get('dims') for it in hw_items}}, open('scripts/manners-tmp/hw-dims.json', 'w'))
print('PROBE DONE')
