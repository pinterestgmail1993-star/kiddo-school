#!/usr/bin/env python3
"""Live probe for the one-page round (owner 2026-10-31): the Class 41 short
pages are gone (301 to the class page, which carries the whole deck with four
pills + Download/Print per card), Class 42 /measuring-and-money/ joins at
forty-two, the 53-card science-lab shelf lives on /science/, and the LP count
says forty-two. Paced GETs with backoff (bursting the edge rate-limits the
probe, house lesson)."""
import re, time, urllib.request, gzip, io, sys

BASE = 'https://kiddo.school'
fails = []
def ck(name, ok, extra=''):
    print(('PASS ' if ok else 'FAIL ') + name + (('  ' + str(extra)) if extra else ''))
    if not ok: fails.append(name)

def get(path, tries=4):
    for i in range(tries):
        try:
            req = urllib.request.Request(BASE + path, headers={'User-Agent': 'kiddo-qa/1.0', 'Accept-Encoding': 'gzip'})
            with urllib.request.urlopen(req, timeout=45) as r:
                data = r.read()
                if r.headers.get('Content-Encoding') == 'gzip':
                    data = gzip.decompress(data)
                return r.status, data, (r.url or '')
        except urllib.error.HTTPError as e:
            if e.code in (429, 503) and i < tries - 1:
                time.sleep(3 * (i + 1)); continue
            return e.code, b'', ''
        except Exception as e:
            if i < tries - 1: time.sleep(3 * (i + 1)); continue
            raise
    return 0, b'', ''

# deploy wait: poll /time-and-daily-routine/ until 200
for i in range(20):
    c, _, _ = get('/time-and-daily-routine/')
    if c == 200: break
    print('waiting for deploy...', c); time.sleep(10)

c, html, _ = get('/')
H = html.decode('utf8', 'replace')
ck('home 200', c == 200, c)
ck('home First Glance chip', 'class="header-fg" href="/first-glance/"' in H and '58 first-picture sheets · Ages 2–5' in H)
ck('home Science chip beside it', 'class="header-fg" href="/science-at-a-glance/"' in H and '65 first-picture sheets · Ages 2–5' in H)
ck('home to-top button', 'class="to-top" data-to-top' in H)
ck('home count says Forty-two', 'Forty-two classes are ready now' in H)
time.sleep(0.4)

c, sg, _ = get('/science-at-a-glance/')
S = sg.decode('utf8', 'replace')
ck('/science-at-a-glance/ 200 (restored, no redirect)', c == 200, c)
ck('science 65 tiles', S.count('figure class="mn-card sg-card"') == 65, S.count('figure class="mn-card sg-card"'))
ck('science chip aria-current on self', 'class="header-fg" href="/science-at-a-glance/" aria-current="page"' in S)
time.sleep(0.4)

c, fg, _ = get('/first-glance/')
F = fg.decode('utf8', 'replace')
ck('/first-glance/ 200 with 58 sheets', c == 200 and F.count('class="fc-card fg-card"') == 58, (c, F.count('class="fc-card fg-card"')))
ck('first-glance own chip aria-current', 'class="header-fg" href="/first-glance/" aria-current="page"' in F)
ck('first-glance NOT the 123 page', '123 first-picture sheets' not in F)
time.sleep(0.4)

c, tr, _ = get('/time-and-daily-routine/')
T = tr.decode('utf8', 'replace')
main = T.split('</main>')[0]
ck('/time-and-daily-routine/ 200 (Class 41 live)', c == 200, c)
ck('cover leads the class page', 'time-and-daily-routine-flashcards-for-kids-cover.webp' in T)
ck('41 mn-card tiles on the one page', main.count('class="mn-card"') == 41, main.count('class="mn-card"'))
ck('four pills + download + print per card', main.count('fc-pill fc-pill-level') == 41 and main.count('fc-pill fc-pill-skill') == 41 and main.count('data-mn-print') == 41 and main.count('download="') >= 41)
ck('zero per-card links', 'href="/time-and-daily-routine/morning-routine/"' not in T)
ck('five shelves', all(s in T for s in ['MY-DAY SHELF', 'CALENDAR SHELF', 'DAY-PARTS SHELF', 'TIME-WORDS SHELF', 'OWN-IT SHELF']))
ck('links back to all four + shelf', all(h in T for h in ['/preschool/4-years/life-skills-and-good-habits/', '/preschool/4-years/weather-seasons-and-what-we-wear/', '/sequence-stories/', '/first-glance/', '/flashcards/time-and-daily-routine/']))
time.sleep(0.4)

# the removed short pages 301 to the class page
req = urllib.request.Request(BASE + '/time-and-daily-routine/morning-routine/', headers={'User-Agent': 'kiddo-qa/1.0'})
with urllib.request.urlopen(req, timeout=45) as r:
    ck('old short page 301s to the class page', r.status == 200 and r.url.endswith('/time-and-daily-routine/'), (r.status, r.url))
time.sleep(0.4)

c, mm, _ = get('/measuring-and-money/')
M = mm.decode('utf8', 'replace')
ck('/measuring-and-money/ 200 (Class 42 live)', c == 200, c)
ck('cover leads Class 42', 'measuring-and-money-flashcards-for-kids-cover.webp' in M)
ck('28 mn-card tiles', M.split('</main>')[0].count('class="mn-card"') == 28, M.split('</main>')[0].count('class="mn-card"'))
ck('Class 42 pills + buttons', M.count('fc-pill fc-pill-skill') == 28 and M.count('data-mn-print') == 28)
ck('zero per-card links on Class 42', 'href="/measuring-and-money/counting-1-to-10/"' not in M)
time.sleep(0.4)

c, lab, _ = get('/science/')
B = lab.decode('utf8', 'replace')
ck('/science/ 200 with the 53-card lab shelf', c == 200 and B.count('class="mn-card"') == 53, (c, B.count('class="mn-card"')))
ck('lab grown-up badges', B.count('mn-grownup') >= 9 and B.count('mn-sos') == 1)
time.sleep(0.4)

c, sh, _ = get('/flashcards/time-and-daily-routine/')
L = sh.decode('utf8', 'replace')
lmain = L.split('</main>')[0]
ck('parents shelf 200', c == 200, c)
ck('41 mn-card tiles', lmain.count('class="mn-card"') == 41, lmain.count('class="mn-card"'))
ck('pills + buttons per card', lmain.count('fc-pill fc-pill-level') == 41 and lmain.count('data-mn-print') == 41 and lmain.count('download="') >= 41)
time.sleep(0.4)

c, lp, _ = get('/learning-path/')
Lp = lp.decode('utf8', 'replace')
ck('LP 200 with row 42', c == 200 and '<span>42</span>' in Lp)
ck('LP links Class 42', 'href="/measuring-and-money/"' in Lp)
ck('LP magic games say Class 17 and Class 20', 'Magic Shapes</a> (Class 17)' in Lp and 'Animal Sound Safari</a> (Class 20)' in Lp)
ck('LP Dinosaurs row', '/dinosaurs/">Dinosaurs</a> (ages 3–5)' in Lp)
ck('LP count says forty-two', 'forty-two age-guided classes' in Lp and 'Forty-two classes are ready now' in Lp)
time.sleep(0.4)

c, sm, _ = get('/sitemap.xml')
locs = re.findall(r'<loc>(.*?)</loc>', sm.decode('utf8', 'replace'))
ck('sitemap 3926 locs', len(locs) == 3926, len(locs))
ck('exactly 2 Class 41 URLs in sitemap (class + shelf)', sum(1 for u in locs if '/time-and-daily-routine' in u) == 2, sum(1 for u in locs if '/time-and-daily-routine' in u))
ck('Class 42 URL in sitemap', 'https://kiddo.school/measuring-and-money/</loc>' in sm.decode('utf8', 'replace'))
ck('science URL back in sitemap', 'https://kiddo.school/science-at-a-glance/</loc>' in sm.decode('utf8', 'replace'))
time.sleep(0.4)

# Classes 39/40 untouched (owner: "dont touch staying safe is good")
for path, n, cls in [('/staying-safe/', 19, 'lp-tile'), ('/healthy-food/', 21, 'lp-tile'), ('/flashcards/staying-safe/', 19, 'mn-card'), ('/flashcards/healthy-food/', 21, 'mn-card')]:
    c, body, _ = get(path)
    m = body.decode('utf8', 'replace').split('</main>')[0]
    ck(f'{path} 200 with {n} {cls} tiles', c == 200 and m.count(f'class="{cls}"') == n, (c, m.count(f'class="{cls}"')))
    time.sleep(0.4)

# R2 sheets live (exact SEO file names)
for f in ['time-and-daily-routine-flashcards-for-kids-cover.webp', 'morning-routine-flashcard-for-kids.webp']:
    req = urllib.request.Request('https://assets.kiddo.school/school/learning-path/time-and-daily-routine/flashcards/' + f, method='HEAD', headers={'User-Agent': 'kiddo-qa/1.0'})
    with urllib.request.urlopen(req, timeout=30) as r:
        ck('R2 ' + f, r.status == 200 and 'image/webp' in r.headers.get('Content-Type', ''), r.status)

print('---')
print('FAILS:', len(fails), fails)
sys.exit(1 if fails else 0)
