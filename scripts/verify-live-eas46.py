#!/usr/bin/env python3
"""verify-live-eas46.py — the production probe for the Class 46 · Early
Addition & Subtraction round."""
import re, sys, time, json
import urllib.request

BASE='https://kiddo.school'
R2='https://assets.kiddo.school/school/learning-path/early-addition-and-subtraction/flashcards/'
ADDITION=['1-plus-2','1-plus-4','1-plus-5','2-plus-3','2-plus-5','2-plus-6','3-plus-1','3-plus-3','3-plus-4','4-plus-1','4-plus-5','5-plus-2','5-plus-3','5-plus-4','6-plus-2','6-plus-4']
SUBTRACTION=['10-minus-1','10-minus-2','10-minus-3','10-minus-4','10-minus-6','10-minus-7','10-minus-8','5-minus-2','6-minus-1','7-minus-1','8-minus-2','8-minus-3','9-minus-4','9-minus-5']
ALL=ADDITION+SUBTRACTION
fails=[]
def get(url, timeout=30):
    req=urllib.request.Request(url, headers={'User-Agent':'kiddo-verify/1.0'})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.status, r.read().decode('utf-8','replace')
def check(name, cond, extra=''):
    print(('PASS ' if cond else 'FAIL ')+name+((' — '+extra) if extra and not cond else ''))
    if not cond: fails.append(name)

time.sleep(25)  # Pages deploy window

# 1. the class page
code, html = get(BASE+'/early-addition-and-subtraction/')
check('class page 200', code==200, str(code))
check('SEO title', 'Early Addition &amp; Subtraction for Kids — 30 Printable Math Flashcards (Ages 4–5)' in html)
check('CLASS 46 eyebrow', 'CLASS 46' in html)
check('two shelves honest counts', 'ADDITION SHELF · 16 CARDS' in html and 'SUBTRACTION SHELF · 14 CARDS' in html)
check('cover is the main image', R2+'early-addition-and-subtraction-flashcards-for-kids-cover.jpg' in html)
check('cover og:image', 'og:image" content="'+R2+'early-addition-and-subtraction-flashcards-for-kids-cover.jpg' in html)
check('30 card tiles on the page', html.count('class="mn-card"')==30, str(html.count('class="mn-card"')))
check('lazy + dims on tiles', 'loading="lazy"' in html and 'width="1414"' in html)
check('index,follow', 'content="index,follow"' in html)
check('no word-ban hits', not re.search(r'no sign up|no paywall|free to use|no account|free forever', html, re.I))

# 2. every short page
bad=[]
for s in ALL:
    c,h = get(f'{BASE}/early-addition-and-subtraction/{s}/')
    ok = c==200 and '<h1>' in h and R2 in h and 'data-mn-print' in h and f'download="{s}.jpg"' in h
    if not ok: bad.append((s,c))
check('30/30 short pages live with card+download+print', not bad, str(bad))
code, d = get(BASE+'/early-addition-and-subtraction/10-minus-3/')
check('10-minus-3: BOTH artworks print', R2+'10-minus-3-subtraction-flashcard-for-kids.jpg' in d and R2+'10-minus-3-subtraction-flashcard-for-kids-2.jpg' in d)
check('10-minus-3: second download button', 'download="10-minus-3-2.jpg"' in d)
code, p12 = get(BASE+'/early-addition-and-subtraction/1-plus-2/')
check('1-plus-2: SUM 1 OF 30 counter', 'SUM 1 OF 30' in p12)
check('1-plus-2: no-spoiler line', 'The equation prints with the answer blank on purpose' in p12)
check('1-plus-2: link back', 'href="/early-addition-and-subtraction/"' in p12)

# 3. LP + counts everywhere
code, lp = get(BASE+'/learning-path/')
rows=[int(m) for m in re.findall(r'lp-class">Class (\d+):', lp)]
check('LP sequence is exactly 1–46, no gap', rows==list(range(1,47)), str(rows[-3:]))
check('LP row 46 links the class', 'Class 46: <a href="/early-addition-and-subtraction/">Early Addition &amp; Subtraction</a>' in lp)
check('LP title says forty-six', 'forty-six age-guided classes' in lp)
code, home = get(BASE+'/')
check('homepage lede says forty-six', 'Forty-six classes are ready now, from birth to age five' in home)
code, about = get(BASE+'/about/')
check('About says forty-six', 'Forty-six classes from birth to age five are ready today' in about)

# 4. sitemap + image sitemap (incl. the 10-minus-3 pair)
code, xml = get(BASE+'/sitemap.xml')
check('class page in sitemap', '<loc>https://kiddo.school/early-addition-and-subtraction/</loc>' in xml)
missing=[s for s in ALL if f'<loc>https://kiddo.school/early-addition-and-subtraction/{s}/</loc>' not in xml]
check('30/30 short pages in sitemap', not missing, str(missing))
check('cover in image sitemap', f'<image:loc>{R2}early-addition-and-subtraction-flashcards-for-kids-cover.jpg</image:loc>' in xml)
seg=xml.split('<loc>https://kiddo.school/early-addition-and-subtraction/10-minus-3/</loc>')[1].split('</url>')[0]
check('BOTH 10-minus-3 artworks in image sitemap', f'<image:loc>{R2}10-minus-3-subtraction-flashcard-for-kids.jpg</image:loc>' in seg and f'<image:loc>{R2}10-minus-3-subtraction-flashcard-for-kids-2.jpg</image:loc>' in seg)

# 5. inbound links on Classes 35/42/30
for p,label in [('/preschool/4-years/numbers-counting-and-early-math/','Class 35'),
                ('/measuring-and-money/','Class 42'),
                ('/preschool/4-years/logic-thinking-and-problem-solving/','Class 30')]:
    c,h = get(BASE+p)
    check(f'{label} links back', c==200 and 'href="/early-addition-and-subtraction/"' in h)

# 6. ZERO existing URLs touched
for p in ['/learning-path/','/prepositions/','/family-and-friends/','/earth-and-space/','/prepositions/above/','/art/','/nature/','/all-pages/']:
    c,_ = get(BASE+p)
    check(f'existing URL intact: {p}', c==200, str(c))

# 7. search index kind
code, si = get(BASE+'/assets/search-index.json')
ff=[x for x in json.loads(si) if str(x.get('u','')).startswith('/early-addition-and-subtraction/')]
check('search: 31 entries, kind Class', len(ff)==31 and all(x.get('k')=='Class' for x in ff), str(len(ff)))

print()
print('RESULT:', 'ALL PASS' if not fails else f'{len(fails)} FAILURES: '+', '.join(fails))
sys.exit(1 if fails else 0)
