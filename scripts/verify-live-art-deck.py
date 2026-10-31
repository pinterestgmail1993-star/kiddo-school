#!/usr/bin/env python3
"""Live production probe for the Art Room deck (owner 2026-10-31: "include
these https://kiddo.school/art/") — run AFTER the deploy lands (~20s after
the push). Paced GETs with backoff (house lesson: bursting the edge
rate-limits the probe). Zero new URLs — the checks are all on the existing
/art/ page, the sitemap entry and two of the R2 files."""
import re, time, urllib.request

BASE = "https://kiddo.school"
R2 = "https://assets.kiddo.school/school/art-room/flashcards/"
fails = []

def get(url, binary=False, tries=3):
    delay = 1.5
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (kiddo-live-probe)"})
            with urllib.request.urlopen(req, timeout=30) as r:
                data = r.read()
                return r.status, (data if binary else data.decode("utf-8", "replace"))
        except Exception as e:
            if i == tries - 1:
                return -1, str(e)[:120]
            time.sleep(delay)
            delay *= 2

def ck(name, ok, extra=""):
    print(("PASS " if ok else "FAIL ") + name + (("  " + str(extra)) if extra else ""))
    if not ok: fails.append(name)

def main():
    # 1) the existing Art Studio page carries the whole deck
    s, html = get(BASE + "/art/")
    ck("/art/ 200", s == 200, s)
    if s == 200:
        ck("title still Art Studio", "Art Studio: hands-on activities" in html)
        ck("shelf intro", "THE ART ROOM SHELF" in html and "14 FLASHCARDS" in html)
        ck("14 tiles", html.count('class="mn-card"') == 14, html.count('class="mn-card"'))
        ck("14 download buttons", html.count("download=") >= 14)
        ck("14 print buttons", html.count("data-mn-print") == 14)
        ck("lazy + dims on the deck", html.count('loading="lazy"') >= 14 and 'width="800" height="1131"' in html and 'width="800" height="566"' in html)
        ck("14 R2 art-room images on the page", html.count("school/art-room/flashcards/") == 28, html.count("school/art-room/flashcards/"))
        ck("one Ask-a-grown-up badge", html.count('class="mn-grownup"') == 1)
        ck("manners.js rides along", "/assets/manners.js" in html)
        ck("four shelves", all(x in html for x in ["DRAW &amp; COLOR SHELF", "PAINT &amp; MIX SHELF", "CUT, GLUE &amp; TAPE SHELF", "BUILD, SHAPE &amp; PRINT SHELF"]))
        ck("SEO file names kept", all(f + "-flashcard-for-kids.webp" in html for f in
           ["beads-craft-wire-pipe-cleaner", "canvas-brush-cleaner-masking-tape", "cardboard-tissue-paper-foam-sheet",
            "clay-rolling-pin-modeling-tool", "colored-paper-cardboard-tube-tissue-paper", "crayons-colored-pencils-marker",
            "glue-stick-tape-paper", "glue-stick-washi-tape-craft-punch", "ink-bottle-dip-pen-charcoal",
            "light-box-tracing-paper-clipboard", "paintbrush-paint-palette-paint-tube", "scissors-glue-ruler",
            "stamp-ink-pad-brayer", "water-cup-sponge-mixing-tray"]))
        ck("no new per-card links", not re.search(r'href="/art/[a-z0-9-]+/"', html.replace("/art/paper-shape-collage/", "").replace("/art/mixing-colours/", "")))
        low = html.lower()
        ck("word-ban holds", not any(b in low for b in ["no sign up", "no paywall", "free to use", "no account", "free forever"]))
    time.sleep(1.2)

    # 2) the sitemap carries all fourteen images on the /art/ entry
    s, xml = get(BASE + "/sitemap.xml")
    ck("sitemap 200", s == 200, s)
    if s == 200:
        m = re.search(r"<url><loc>https://kiddo\.school/art/</loc>([\s\S]*?)</url>", xml)
        ck("/art/ sitemap entry", bool(m))
        if m:
            imgs = re.findall(r"<image:loc>([^<]+)</image:loc>", m.group(1))
            ck("14 images on the /art/ entry", len(imgs) == 14, len(imgs))
    time.sleep(1.2)

    # 3) two R2 cards still answer live (the portrait lead + the landscape)
    s, _ = get(R2 + "crayons-colored-pencils-marker-flashcard-for-kids.webp", binary=True)
    ck("R2 portrait card 200", s == 200, s)
    time.sleep(1.2)
    s, _ = get(R2 + "glue-stick-tape-paper-flashcard-for-kids.webp", binary=True)
    ck("R2 landscape card 200", s == 200, s)
    time.sleep(1.2)

    # 4) zero URLs changed: the Learning Path still closes at 43 and the studio stays a room
    s, lp = get(BASE + "/learning-path/")
    ck("LP 200", s == 200, s)
    if s == 200:
        ck("LP still forty-three", "forty-three" in lp)
        rows = re.findall(r'lp-class">Class (\d+): <a href="([^"]+)"', lp)
        ck("LP sequence 1–43 intact", [int(n) for n, _ in rows] == list(range(1, 44)), f"{len(rows)} rows")
        ck("studio not numbered", all(u != "/art/" for _, u in rows))

    print(f"\n{len(fails)} fails" + ((": " + ", ".join(fails)) if fails else ""))
    raise SystemExit(1 if fails else 0)

if __name__ == "__main__":
    main()
