#!/usr/bin/env python3
"""verify-live for the ONE-PAGE ROUND + CLASS 47 · Caring for Our Planet:
production checks after the push of 8c6c521e7c."""
import urllib.request, re, sys, gzip, io

S='https://kiddo.school'
def get(path, redirect=True):
    req=urllib.request.Request(S+path, headers={'User-Agent':'kiddo-verify/1','Accept-Encoding':'gzip'})
    class NoRedirect(urllib.request.HTTPRedirectHandler):
        def redirect_request(self,*a,**k): return None
    op=urllib.request.build_opener() if redirect else urllib.request.build_opener(NoRedirect)
    try:
        r=op.open(req, timeout=30)
        body=r.read()
        if r.headers.get('Content-Encoding')=='gzip': body=gzip.decompress(body)
        return r.status, dict(r.headers), body.decode('utf8','replace')
    except urllib.error.HTTPError as e:
        return e.code, dict(e.headers), ''
fails=[]
def check(name, cond, detail=''):
    print(('PASS ' if cond else 'FAIL ')+name+((' — '+str(detail)) if detail and not cond else ''))
    if not cond: fails.append(name)

# 1) the Class 47 class page
c,h,b=get('/caring-for-our-planet/')
check('class page 200', c==200, c)
check('title is the eco deck', 'Caring for Our Planet for Kids — 30 Printable Eco Flashcards' in b)
check('eyebrow CLASS 47', 'CLASS 47 \u00b7 CARING FOR OUR PLANET \u00b7 AGES 4\u20135' in b)
check('30 tiles', b.count('class="mn-card"')==30, b.count('class="mn-card"'))
check('30 print buttons', b.count('data-mn-print')==30, b.count('data-mn-print'))
for sh,n in [('PLANTING SHELF',6),('CRITTER SHELF',5),('RECYCLE SHELF',6),('POWER-DOWN SHELF',6),('EVERY-DAY SHELF',7)]:
    check(f'shelf {sh} · {n}', (sh+' \u00b7 '+str(n)+' CARDS') in b)
check('cover leads', 'caring-for-our-planet-flashcards-for-kids-cover.jpg' in b)
check('seven landscape at own size', b.count('width="2000" height="1414"')==7, b.count('width="2000" height="1414"'))
check('23 portrait at own size', b.count('width="1414" height="2000"')==24, b.count('width="1414" height="2000"'))  # 23 cards + cover
check('lazy loading', b.count('loading="lazy"')>=30)
check('links back 31/36/43 + LP + shelf', all(p in b for p in ['/preschool/4-years/science-nature-and-discovery/','/preschool/4-years/animals-and-their-habitats/','/earth-and-space/','/learning-path/','/flashcards/caring-for-our-planet/']))
check('manners.js on class page', 'assets/manners.js' in b)

# 2) the parents' shelf
c,h,b=get('/flashcards/caring-for-our-planet/')
check('shelf 200', c==200, c)
check('shelf 30 tiles', b.count('class="mn-card"')==30, b.count('class="mn-card"'))
check('shelf print buttons', b.count('data-mn-print')==30)
check('shelf links back to class', 'href="/caring-for-our-planet/"' in b)
check('shelf feedback mount', 'data-fc-root' in b)

# 3) the other five parents' shelves
for p,tiles in [('/flashcards/prepositions/',22),('/flashcards/family-and-friends/',35),('/flashcards/early-addition-and-subtraction/',30),('/flashcards/measuring-and-money/',28),('/flashcards/earth-and-space/',24)]:
    c,h,b=get(p)
    check(f'shelf {p} 200', c==200, c)
    check(f'shelf {p} tiles={tiles}', b.count('class="mn-card"')==tiles, b.count('class="mn-card"'))

# 4) the three class pages stay whole-deck one-pagers
for p,tiles in [('/prepositions/',22),('/family-and-friends/',35),('/early-addition-and-subtraction/',30)]:
    c,h,b=get(p)
    check(f'class {p} 200', c==200, c)
    check(f'class {p} tiles={tiles}', b.count('class="mn-card"')==tiles, b.count('class="mn-card"'))
c,h,b=get('/early-addition-and-subtraction/')
check('10-minus-3 second artwork on the class tile', '10-minus-3-subtraction-flashcard-for-kids-2.jpg' in b)

# 5) removed per-card URLs 301 to their class pages
for p,target in [('/prepositions/above/','/prepositions/'),('/prepositions/above','/prepositions/'),
                 ('/family-and-friends/mum/','/family-and-friends/'),('/family-and-friends/mum','/family-and-friends/'),
                 ('/early-addition-and-subtraction/1-plus-2/','/early-addition-and-subtraction/'),
                 ('/early-addition-and-subtraction/10-minus-3','/early-addition-and-subtraction/')]:
    c,h,b=get(p, redirect=False)
    loc=h.get('Location') or h.get('location') or ''
    check(f'301 {p} -> {target}', c==301 and loc==target, f'{c} {loc}')

# 6) old URL-round redirects still work
c,h,b=get('/position-and-direction/above/', redirect=False)
check('old PD 301 chain start', c==301, c)

# 7) the Learning Path: 47 rows, no gap, count words, rows rewritten
c,h,lp=get('/learning-path/')
check('LP 200', c==200)
rows=[int(m) for m in re.findall(r'lp-class">Class (\d+):',lp)]
check('LP sequence 1–47 no gap', rows==list(range(1,48)), rows[-3:])
check('LP says forty-seven', 'forty-seven age-guided classes' in lp and 'Forty-seven classes are ready now' in lp)
check('LP row 47 present', '<span>47</span>' in lp and 'Class 47: <a href="/caring-for-our-planet/">Caring for Our Planet</a>' in lp)
check('LP rows no per-card advertising', '/prepositions/above/' not in lp and '/family-and-friends/mum/' not in lp and '/early-addition-and-subtraction/1-plus-2/' not in lp)
check('LP rows advertise parents\u2019 shelves', '/flashcards/prepositions/' in lp and '/flashcards/family-and-friends/' in lp and '/flashcards/caring-for-our-planet/' in lp)
c,h,home=get('/')
check('homepage says forty-seven', 'Forty-seven classes are ready now' in home)
c,h,about=get('/about/')
check('About says forty-seven', 'Forty-seven classes from birth to age five are ready today' in about)

# 8) inbound links on Classes 31/36/43
for p in ['/preschool/4-years/science-nature-and-discovery/','/preschool/4-years/animals-and-their-habitats/','/earth-and-space/']:
    c,h,b=get(p)
    check(f'inbound {p}', c==200 and 'href="/caring-for-our-planet/"' in b)

# 9) sitemap: locs, no short pages, image entries on class+shelf, /nature/ untouched
c,h,xml=get('/sitemap.xml')
locs=re.findall(r'<loc>(https://kiddo\.school.*?)</loc>',xml)
check('sitemap loc count 3937', len(locs)==3937, len(locs))
check('sitemap unique', len(set(locs))==len(locs))
check('no preposition word pages in sitemap', not any('/prepositions/a' in l and l!='https://kiddo.school/prepositions/' for l in locs))
check('no family word pages in sitemap', not any(l.startswith('https://kiddo.school/family-and-friends/') and l!='https://kiddo.school/family-and-friends/' for l in locs))
check('no sum pages in sitemap', not any(l.startswith('https://kiddo.school/early-addition-and-subtraction/') and l!='https://kiddo.school/early-addition-and-subtraction/' for l in locs))
def entry(url):
    seg=xml.split('<loc>'+url+'</loc>')
    return seg[1].split('</url>')[0] if len(seg)>1 else ''
ent=entry('https://kiddo.school/caring-for-our-planet/')
imgs=re.findall(r'<image:loc>(.*?)</image:loc>',ent)
check('CFP class entry: 31 images (cover + 30)', len(imgs)==31, len(imgs))
libent=entry('https://kiddo.school/flashcards/caring-for-our-planet/')
check('CFP shelf entry: 31 images', len(re.findall(r'<image:loc>',libent))==31, len(re.findall(r'<image:loc>',libent)))
for u in ['https://kiddo.school/flashcards/prepositions/','https://kiddo.school/flashcards/family-and-friends/','https://kiddo.school/flashcards/early-addition-and-subtraction/','https://kiddo.school/flashcards/measuring-and-money/','https://kiddo.school/flashcards/earth-and-space/']:
    check('shelf in sitemap: '+u, u+'</loc>' in xml)
nent=entry('https://kiddo.school/nature/')
check('/nature/ keeps its 41 images', len(re.findall(r'<image:loc>',nent))==41, len(re.findall(r'<image:loc>',nent)))

# 10) flashcards hub wall
c,h,hub=get('/flashcards/')
check('hub wall says 70', 'Showing all 70 sets' in hub, re.findall(r'Showing all \d+ sets',hub))
check('hub fronts the CFP shelf', 'href="/flashcards/caring-for-our-planet/"' in hub)

# 11) search index
c,h,sj=get('/assets/search-index.json')
import json
si=json.loads(sj)
cfp=[x for x in si if x['u'].startswith('/caring-for-our-planet/')]
check('search: exactly one Class 47 entry', len(cfp)==1 and cfp[0]['k']=='Class', cfp)
check('search: shelf is Flashcards', any(x['u']=='/flashcards/caring-for-our-planet/' and x['k']=='Flashcards' for x in si))

print()
print('RESULT:', 'ALL PASS' if not fails else f'{len(fails)} FAILURES: {fails}')
sys.exit(0 if not fails else 1)
