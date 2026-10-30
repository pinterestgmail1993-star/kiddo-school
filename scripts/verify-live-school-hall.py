#!/usr/bin/env python3
"""Live QA for the School Hall round on production (kiddo.school)."""
import subprocess, sys, time

def curl(url, head=False):
    args = ['curl', '-sS', '-o', '/dev/null', '-w', '%{http_code} %{content_type}']
    if head: args.append('-I')
    out = subprocess.run(args + [url], capture_output=True, text=True, timeout=30)
    return out.stdout.strip(), out.stderr.strip()

def page(url):
    out = subprocess.run(['curl', '-sS', url], capture_output=True, text=True, timeout=30)
    return out.stdout

fails = []
def ck(name, ok):
    print(('PASS ' if ok else 'FAIL ') + name)
    if not ok: fails.append(name)

PAGES = ['/', '/rooms/', '/school-hall/', '/halloween/', '/thanksgiving/', '/christmas/',
         '/valentines-day/', '/eid/', '/question-words/', '/sequence-stories/',
         '/preschool/4-years/weather-seasons-and-what-we-wear/', '/art-room/']
html = {}
for p in PAGES:
    code, ct = curl('https://kiddo.school' + p, head=True)
    ck('live 200 ' + p, code.startswith('200'))
    if code.startswith('200'):
        html[p] = page('https://kiddo.school' + p)

hall = html.get('/school-hall/', '')
ck('hall title', 'The School Hall — Holidays &amp; Special Days for Kids' in hall)
ck('hall calendar order: halloween before thanksgiving',
   hall.find('href="/halloween/"') < hall.find('href="/thanksgiving/"') < hall.find('href="/christmas/"') <
   hall.find('href="/valentines-day/"') < hall.find('href="/eid/"'))
ck('hall first day flagged', 'coming up next' in hall)
ck('hall links Class 34 + Art Room', '/preschool/4-years/weather-seasons-and-what-we-wear/' in hall and 'href="/art-room/"' in hall)
ck('hall no Etsy', 'etsy' not in hall.lower())

hw = html.get('/halloween/', '')
ck('halloween what/why + activities', 'WHAT IS HALLOWEEN?' in hw and 'TRY IT' in hw)
ck('halloween 34 downloads', hw.count('.webp" download') == 34)
ck('halloween 34 print buttons', hw.count('data-mn-print') == 34)
ck('halloween links back to hall', 'href="/school-hall/"' in hw)
ck('halloween no per-card links', '/halloween/01-' not in hw)

for p, needle in [('/thanksgiving/', 'thank you'), ('/christmas/', 'December 25'),
                  ('/valentines-day/', 'Valentine'), ('/eid/', 'Eid Mubarak')]:
    pg = html.get(p, '')
    ck(p + ' what/why + kids voice', 'WHAT IS' in pg and 'TRY IT' in pg and needle in pg)
    ck(p + ' links back to the Hall', 'href="/school-hall/"' in pg)

home = html.get('/', '')
ck('home lists the Hall (eight rooms)', 'href="/school-hall/"' in home and 'Eight rooms' in home)
rooms = html.get('/rooms/', '')
ck('/rooms/ lists the Hall', 'href="/school-hall/"' in rooms and 'Eight rooms' in rooms)
cls34 = html.get('/preschool/4-years/weather-seasons-and-what-we-wear/', '')
ck('Class 34 links the Hall', 'href="/school-hall/"' in cls34)
art = html.get('/art-room/', '')
ck('Art Room links the Hall', 'href="/school-hall/"' in art)

# inbound links from the remote decks still live
qw = html.get('/question-words/', '')
ss = html.get('/sequence-stories/', '')
ck('question-words still one page, 16 downloads', qw.count('.webp" download') == 16)
ck('sequence-stories still one page, 2 badges', ss.count('Ask a grown-up') >= 2)

sm = page('https://kiddo.school/sitemap.xml')
for u in ['/school-hall/', '/halloween/', '/thanksgiving/', '/christmas/', '/valentines-day/', '/eid/']:
    ck('sitemap has ' + u, '<loc>https://kiddo.school' + u + '</loc>' in sm)
ck('sitemap has no per-card halloween', '/halloween/01-' not in sm)

# R2 assets live
for u in ['https://assets.kiddo.school/school/hall/halloween/action-verbs/01-cat-ghost-pumpkin-bat.webp',
          'https://assets.kiddo.school/school/hall/halloween/activities/01-pumpkin-carving-costume-parade-apple-bobbing-trick-or-treat.webp',
          'https://assets.kiddo.school/school/hall/halloween/feelings-and-emotions/01-happy-sad-angry-scared.webp',
          'https://assets.kiddo.school/school/hall/halloween/items/01-pumpkin-ghost-bat-witch.webp']:
    code, ct = curl(u, head=True)
    ck('R2 200 ' + u.rsplit('/', 2)[-2] + '/' + u.rsplit('/', 1)[-1][:24], code.startswith('200') and 'image/webp' in code)

print('\n== %d checks failed ==' % len(fails))
for f in fails: print('  -', f)
sys.exit(1 if fails else 0)
