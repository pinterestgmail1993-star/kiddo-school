#!/usr/bin/env python3
"""Live probe for the owner 2026-11-01 round — production checks after the
push (deploy live ~20s):
A) CLASS 44 · Position & Direction Words: the class page + all 22 word pages
   200, cover leading, LP row 44 + forty-four counts, sitemap carrying the 23
   new URLs with the cover in the image sitemap, short page contract on
   /prepositions/above/ (the owner's own example), inbound sections
   live on Classes 19/33/42.
B) The Nature Club deck: /nature/ carries the 41-card shelf family and the
   /nature/ sitemap entry carries all 41 <image:image> entries.
Paced GETs with backoff (house lesson: bursting the edge rate-limits the
probe)."""
import time, urllib.request

BASE = 'https://kiddo.school'
fails = []
def ck(name, ok, extra=''):
    print(('PASS ' if ok else 'FAIL ') + name + (('  ' + str(extra)) if extra else ''))
    if not ok: fails.append(name)

def get(path, tries=3):
    for i in range(tries):
        try:
            req = urllib.request.Request(BASE + path, headers={'User-Agent': 'kiddo-live-probe/1.0'})
            with urllib.request.urlopen(req, timeout=30) as r:
                return r.status, r.read().decode('utf-8', 'replace')
        except Exception as e:
            if i == tries - 1: return 0, str(e)[:90]
            time.sleep(3 * (i + 1))

time.sleep(1)
s, pd = get('/prepositions/')
ck('/prepositions/ 200', s == 200, s)
ck('cover leads as the main image', 'position-and-direction-words-flashcards-for-kids-cover.webp' in pd and 'lesson-hero-cover' in pd)
ck('CLASS 44 eyebrow', 'CLASS 44' in pd)
ck('22 card tiles + four shelves',
   pd.count('class="mn-card"') == 22 and 'UP &amp; DOWN SHELF' in pd and 'SIDES &amp; DISTANCE SHELF' in pd)
ck('word-page links present', 'href="/prepositions/above/"' in pd)

time.sleep(1)
s, above = get('/prepositions/above/')
ck('/prepositions/above/ 200', s == 200, s)
ck('word h1 + verbatim labels + try-it + counter',
   '<h1>Above</h1>' in above and 'Balloon above' in above and 'Try it today' in above and 'CARD 1 OF 22' in above)
ck('card og:image with transcribed alt',
   'og:image" content="https://assets.kiddo.school/school/learning-path/position-and-direction-words/flashcards/above-position-word-flashcard-for-kids.webp' in above)

time.sleep(1)
words = ['across','around','away-from','back-behind','below','between','down','far','in-front-of','inside',
 'left','near','next-to','on','outside','over','right','through','toward','under','up']
bad = []
for w in words:
    s, _ = get('/prepositions/' + w + '/')
    if s != 200: bad.append((w, s))
    time.sleep(0.4)
ck('all 22 word pages 200 (paced)', not bad, bad)

time.sleep(1)
s, lp = get('/learning-path/')
ck('LP row 44 after row 43', 'Class 44: <a href="/prepositions/">Position &amp; Direction Words</a>' in lp and '<span>44</span>' in lp)
ck('LP counts say forty-four', 'forty-four age-guided classes' in lp and 'Forty-four classes are ready now' in lp)

time.sleep(1)
s, home = get('/')
ck('homepage lede says forty-four', 'Forty-four classes are ready now' in home)

time.sleep(1)
s, opp = get('/preschool/3-years/opposites-and-comparing/')
ck('Class 19 inbound section live', 'href="/prepositions/"' in opp)
time.sleep(0.5)
s, ch = get('/preschool/4-years/community-helpers-and-our-neighborhood/')
ck('Class 33 inbound section live', 'href="/prepositions/"' in ch)
time.sleep(0.5)
s, mm = get('/measuring-and-money/')
ck('Class 42 inbound section live', 'href="/prepositions/"' in mm)

time.sleep(1)
s, xml = get('/sitemap.xml')
ck('sitemap carries the 23 new URLs', xml.count('<loc>https://kiddo.school/prepositions/') == 23)
ck('cover in the image sitemap', '<image:loc>https://assets.kiddo.school/school/learning-path/position-and-direction-words/flashcards/position-and-direction-words-flashcards-for-kids-cover.webp</image:loc>' in xml)

time.sleep(1)
s, nature = get('/nature/')
ck('/nature/ 200', s == 200, s)
ck('41-card shelf family live', 'THE NATURE CLUB SHELF · 41 FLASHCARDS' in nature and nature.count('class="mn-card"') == 41)
ck('all five shelves live', all(x in nature for x in ['PLANT SHELF', 'ANIMAL SHELF', 'BUG SHELF', 'SKY &amp; WEATHER SHELF', 'WILD PLACES SHELF']))
ck('manners.js ships with /nature/', 'assets/manners.js' in nature)

time.sleep(1)
s, xml2 = get('/sitemap.xml')
n_entry = xml2.split('<loc>https://kiddo.school/nature/</loc>')[1].split('</url>')[0] if s == 200 else ''
ck('/nature/ sitemap entry carries 41 images', (n_entry.count('<image:loc>') == 41), n_entry.count('<image:loc>'))
ck('sitemap total 3950 locs', xml2.count('<loc>') == 3950, xml2.count('<loc>'))

time.sleep(1)
s, nat_r2 = get('/school/nature-club/flashcards/bee-insect-flashcard-for-kids.webp'.replace('/school/', '/school/'), tries=2) if False else (None, None)
req = urllib.request.Request('https://assets.kiddo.school/school/nature-club/flashcards/bee-insect-flashcard-for-kids.webp', headers={'User-Agent': 'kiddo-live-probe/1.0'})
with urllib.request.urlopen(req, timeout=30) as r:
    ck('R2 nature card 200 image/webp', r.status == 200 and r.headers.get('Content-Type') == 'image/webp')

print(f"\n{len(fails)} fails" + ((': ' + ', '.join(fails)) if fails else ''))
raise SystemExit(1 if fails else 0)
