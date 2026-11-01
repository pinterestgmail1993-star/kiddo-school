#!/usr/bin/env python3
"""verify-live-ff45.py — the production probe for the Class 45 · Family &
Friends round + the high-resolution master-assets print contract."""
import re, sys, time
import urllib.request

BASE='https://kiddo.school'
R2='https://assets.kiddo.school/school/learning-path/family-and-friends/flashcards/'
WORDS=['aunt','baby','best-friend','boyfriend','brother','brother-in-law','children',
 'classmate','colleague','cousin','dad','daughter','family','friend','girlfriend',
 'grandchild','grandma','grandpa','husband','mum','neighbour','nephew','niece','parents',
 'partner','roommate','sibling','sister','sister-in-law','son','teacher','team','twin',
 'uncle','wife']
fails=[]
def get(url, timeout=30):
    req=urllib.request.Request(url, headers={'User-Agent':'kiddo-verify/1.0'})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.status, r.read().decode('utf-8','replace')
def check(name, cond, extra=''):
    print(('PASS ' if cond else 'FAIL ')+name+((' — '+extra) if extra and not cond else ''))
    if not cond: fails.append(name)

time.sleep(25)  # Pages deploy window (~20s per house docs)

# 1. the class page
code, html = get(BASE+'/family-and-friends/')
check('class page 200', code==200, str(code))
check('SEO title', 'Family &amp; Friends Flashcards for Kids — 35 Printable Family Member Cards (Ages 4–5)' in html)
check('CLASS 45 eyebrow', 'LEARNING PATH &#183; CLASS 45 &#183; FAMILY &amp; FRIENDS' in html or 'CLASS 45' in html)
check('cover is the main image', R2+'family-and-friends-flashcards-for-kids-cover.jpg' in html)
check('cover og:image', 'og:image" content="'+R2+'family-and-friends-flashcards-for-kids-cover.jpg' in html)
check('35 card tiles on the page', html.count('class="mn-card"')==35, str(html.count('class="mn-card"')))
check('lazy + dims on tiles', 'loading="lazy"' in html and 'width="1414"' in html)
check('index,follow', 'content="index,follow"' in html)
check('no word-ban hits', not re.search(r'no sign up|no paywall|free to use|no account|free forever', html, re.I))

# 2. every short page + a deep content check on three
bad=[]
for w in WORDS:
    c,h = get(f'{BASE}/family-and-friends/{w}/')
    ok = c==200 and f'<h1>' in h and R2 in h and 'data-mn-print' in h and f'download="{w}.jpg"' in h
    if not ok: bad.append((w,c))
check('35/35 short pages live with card+download+print', not bad, str(bad))
code, mum = get(BASE+'/family-and-friends/mum/')
check('mum: CARD 20 OF 35 counter', 'CARD 20 OF 35' in mum)
check('mum: who-they-are + try-it', 'Who they are' in mum and 'Try it today' in mum)
check('mum: master JPG og:image', f'og:image" content="{R2}mum-family-member-flashcard-for-kids.jpg' in mum)
check('mum: link back', 'href="/family-and-friends/"' in mum)
check('mum: breadcrumbs', 'breadcrumbs' in mum)
code, nb = get(BASE+'/family-and-friends/neighbour/')
check('neighbour: artwork spelling verbatim', '<h1>Neighbour</h1>' in nb)

# 3. Learning Path + counts everywhere
code, lp = get(BASE+'/learning-path/')
rows=[int(m) for m in re.findall(r'lp-class">Class (\d+):', lp)]
check('LP sequence is exactly 1–45, no gap', rows==list(range(1,46)), str(rows[-3:]))
check('LP row 45 links the class', 'Class 45: <a href="/family-and-friends/">Family &amp; Friends</a>' in lp)
check('LP title says forty-five', 'forty-five age-guided classes' in lp)
code, home = get(BASE+'/')
check('homepage lede says forty-five', 'Forty-five classes are ready now, from birth to age five' in home)
code, about = get(BASE+'/about/')
check('About says forty-five', 'Forty-five classes from birth to age five are ready today' in about)

# 4. sitemap + image sitemap
code, xml = get(BASE+'/sitemap.xml')
check('class page in sitemap', '<loc>https://kiddo.school/family-and-friends/</loc>' in xml)
missing=[w for w in WORDS if f'<loc>https://kiddo.school/family-and-friends/{w}/</loc>' not in xml]
check('35/35 short pages in sitemap', not missing, str(missing))
check('cover in image sitemap', f'<image:loc>{R2}family-and-friends-flashcards-for-kids-cover.jpg</image:loc>' in xml)
check('card in image sitemap', f'<image:loc>{R2}mum-family-member-flashcard-for-kids.jpg</image:loc>' in xml)

# 5. inbound links on Classes 38/33/32
for p,label in [('/preschool/4-years/feelings-and-kindness/','Class 38'),
                ('/preschool/4-years/community-helpers-and-our-neighborhood/','Class 33'),
                ('/preschool/4-years/life-skills-and-good-habits/','Class 32')]:
    c,h = get(BASE+p)
    check(f'{label} links back', c==200 and 'href="/family-and-friends/"' in h)

# 6. ZERO existing URLs touched — spot checks + the old 301s still fire
for p in ['/learning-path/','/prepositions/','/prepositions/above/','/earth-and-space/','/nature/','/art/','/flashcards/','/all-pages/']:
    c,_ = get(BASE+p)
    check(f'existing URL intact: {p}', c==200, str(c))
req=urllib.request.Request(BASE+'/position-and-direction/', headers={'User-Agent':'kiddo-verify/1.0'})
opener=urllib.request.build_opener(urllib.request.HTTPRedirectHandler)
class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self,*a,**k): return None
op=urllib.request.build_opener(NoRedirect)
try:
    r=op.open(urllib.request.Request(BASE+'/position-and-direction/',headers={'User-Agent':'kiddo-verify/1.0'}),timeout=30)
    loc=r.headers.get('Location','')
except urllib.error.HTTPError as e:
    loc=e.headers.get('Location','')
check('old PD URL still 301s to /prepositions/', '301' in str(loc) or '/prepositions/' in str(loc), str(loc))

# 7. search index kind
code, si = get(BASE+'/assets/search-index.json')
ff=[x for x in __import__('json').loads(si) if str(x.get('u','')).startswith('/family-and-friends/')]
check('search: 36 FF entries, kind Class', len(ff)==36 and all(x.get('k')=='Class' for x in ff), str(len(ff)))

print()
print('RESULT:', 'ALL PASS' if not fails else f'{len(fails)} FAILURES: '+', '.join(fails))
sys.exit(1 if fails else 0)
