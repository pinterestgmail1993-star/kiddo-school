#!/usr/bin/env python3
"""Live probe for the CLASS 48 · Plants & How They Grow round — production
checks after the push (deploy live ~20s). All checks hit
https://kiddo.school/ directly."""
import re, sys, urllib.request, gzip, io

BASE='https://kiddo.school'
R2='https://assets.kiddo.school/school/learning-path/plants-and-how-they-grow/flashcards/'
ok=[]; bad=[]
def check(name, cond):
    (ok if cond else bad).append(name)
    print(('PASS ' if cond else 'FAIL ')+name)

def get(path, host=BASE):
    req=urllib.request.Request(host+path, headers={'User-Agent':'kiddo-live-probe/1','Accept-Encoding':'gzip'})
    r=urllib.request.urlopen(req, timeout=40)
    data=r.read()
    if r.headers.get('Content-Encoding')=='gzip':
        data=gzip.GzipFile(fileobj=io.BytesIO(data)).read()
    return r.status, data.decode('utf8','ignore'), r.headers.get('Content-Type')

# 1. the class page is live
st,html,ct=get('/plants-and-how-they-grow/')
check('class page 200 text/html (%s)'%st, st==200 and 'html' in (ct or ''))
check('eyebrow says CLASS 48 · PLANTS & HOW THEY GROW · AGES 4–5', 'CLASS 48 \u00b7 PLANTS &amp; HOW THEY GROW \u00b7 AGES 4\u20135' in html)
check('41 card tiles on the class page', html.count('class="mn-card"')==41)
check('cover is the main image (og:image)', 'og:image" content="'+R2+'plants-and-how-they-grow-flashcards-for-kids-cover.jpg' in html)
check('six shelves named', all(s in html for s in ['GROWING SHELF','PLANT PARTS SHELF','PLANT CARE SHELF','FLOWERS &amp; SEEDS SHELF','WILD PLACES SHELF','PLANT DEFENSE SHELF']))
check('Ask-a-grown-up badge rides once', html.count('mn-grownup')==1)
check('manners.js ships (print contract)', 'assets/manners.js' in html)
check('links back: C31/C36/C22/LP/shelf', all(h in html for h in ['href="/preschool/4-years/science-nature-and-discovery/"','href="/preschool/4-years/animals-and-their-habitats/"','href="/preschool/3-years/fruits-and-vegetables/"','href="/learning-path/"','href="/flashcards/plants-and-how-they-grow/"']))
check('lazy loading + honest dims on a card', 'loading="lazy"' in html and 'width="1414" height="2000"' in html)
check('zero per-card URLs on the page', not re.search(r'href="/plants-and-how-they-grow/[a-z0-9-]+/"', html.replace('/plants-and-how-they-grow/"','')))

# 2. the parents' shelf is live
st,lib,ct=get('/flashcards/plants-and-how-they-grow/')
check('parents\u2019 shelf 200 (%s)'%st, st==200)
check('shelf h1 present', '<h1>Plants & How They Grow — the parent shelf: 41 cards to download and print.' in lib)
check('41 tiles on the shelf', lib.count('class="mn-card"')==41)
check('feedback block mounts', 'data-fc-root' in lib)
check('shelf links back to the class', 'href="/plants-and-how-they-grow/"' in lib)

# 3. the Learning Path: rows 1–48, count forty-eight, row 48 wired
st,lp,ct=get('/learning-path/')
rows=[int(m) for m in re.findall(r'lp-class">Class (\d+):', lp)]
check('LP 200 with rows exactly 1–48', st==200 and rows==list(range(1,49)))
check('LP says Forty-eight classes are ready now', 'Forty-eight classes are ready now' in lp)
check('LP row 48 links the class', 'Class 48: <a href="/plants-and-how-they-grow/">Plants &amp; How They Grow</a>' in lp)
check('homepage lede says forty-eight', 'Forty-eight classes are ready now, from birth to age five' in get('/')[1])

# 4. image sitemap: both URLs, cover + 41 masters each
st,xml,ct=get('/sitemap.xml')
def entry(loc):
    return xml.split('<loc>'+loc+'</loc>')[1].split('</url>')[0] if '<loc>'+loc+'</loc>' in xml else ''
ce=entry('https://kiddo.school/plants-and-how-they-grow/')
le=entry('https://kiddo.school/flashcards/plants-and-how-they-grow/')
check('class page in the sitemap', ce!='')
check('shelf in the sitemap', le!='')
cover='plants-and-how-they-grow-flashcards-for-kids-cover.jpg'
import json
dims=json.load(open('/home/z/my-project/kiddo-school/scripts/plants-dims.json'))
files=sorted(f for f in dims if 'cover' not in f)
check('class-page image entries: cover + 41 masters', ce.count('<image:loc>')==42 and all('<image:loc>'+R2+f+'</image:loc>' in ce for f in files))
check('shelf image entries: cover + 41 masters', le.count('<image:loc>')==42 and all('<image:loc>'+R2+f+'</image:loc>' in le for f in files))

# 5. R2 masters really serve (cover + two cards, one of each name shape)
for f in [cover,'inside-a-leaf-plant-flashcard-for-kids.jpg','how-plants-make-food-flashcard-for-kids.jpg']:
    st2,_,ct2=get('/'+f, host=R2.rstrip('/'))
    check('R2 master 200 image/jpeg: '+f, st2==200 and (ct2 or '').startswith('image/jpeg'))

# 6. inbound classes live and pointing here
for p,label in [('/preschool/4-years/science-nature-and-discovery/','Class 31'),('/preschool/4-years/animals-and-their-habitats/','Class 36'),('/preschool/3-years/fruits-and-vegetables/','Class 22')]:
    st3,body,_=get(p)
    check(label+' 200 and points here', st3==200 and 'href="/plants-and-how-they-grow/"' in body)

# 7. no regressions next door
st4,b4,_=get('/caring-for-our-planet/')
check('Class 47 still 200 with 30 tiles', st4==200 and b4.count('class="mn-card"')==30)

print('\nPASS %d / FAIL %d'%(len(ok),len(bad)))
if bad:
    print('FAILURES:'); [print(' -',b) for b in bad]; sys.exit(1)
print('ALL LIVE CHECKS PASS')
