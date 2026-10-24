# Build labeled contact sheets from the downloaded flashcard art so every
# alt can be written from the actual artwork (the established process).
from PIL import Image, ImageDraw
import glob, os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

COLS, TH = 4, 300
PAD, LABEL_H = 8, 34

def sheet(prefix, out):
    files = sorted(glob.glob(prefix + '-*.webp'))
    if not files:
        return
    items = []
    for p in files:
        im = Image.open(p).convert('RGB')
        w = int(im.width * TH / im.height)
        items.append((p.split('-', 1)[1].replace('.webp', ''), im.resize((w, TH))))
    rows = (len(items) + COLS - 1) // COLS
    cw = max(i[1].width for i in items) + PAD * 2
    W, H = cw * COLS, (TH + LABEL_H + PAD) * rows
    canvas = Image.new('RGB', (W, H), 'white')
    d = ImageDraw.Draw(canvas)
    for idx, (name, im) in enumerate(items):
        r, c = divmod(idx, COLS)
        x, y = c * cw + PAD, r * (TH + LABEL_H + PAD)
        canvas.paste(im, (x, y))
        d.text((x + 2, y + TH + 4), name[:40], fill='black')
    canvas.save(out, quality=88)
    print(out, canvas.size, len(items), 'tiles')

sheet('ac', 'sheet-animal-categories.jpg')
sheet('nc', 'sheet-nature-club.jpg')
