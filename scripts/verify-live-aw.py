#!/usr/bin/env python3
"""Production probe for the Class 49 · Action Words round: the deployed site
must carry the class page (first card as main image), the owner's example
short page, the LP row 49 + count word forty-nine, the image sitemap entries,
the three inbound links — and the deck's 24 masters must answer 200 on R2."""
import json, urllib.request, sys

SITE='https://kiddo.school'
CDN='https://assets.kiddo.school/school/learning-path/action-words/'
AW=['bite-chew-smell-touch-feel','blow-wave-shake-stretch-bend','borrow-return-buy-sell-pay',
 'build-draw-cook-wash-read','clean-sweep-dry-fix-pack','crawl-kneel-point-clap-wave',
 'eat-drink-sleep-wake-rest','enjoy-love-like-hate-need','find-lose-choose-share-show',
 'knock-ring-answer-hang-unhang','look-listen-talk-smile-laugh','open-close-give-take-help',
 'plant-water-dig-cut-mix','pull-build-draw-cook','read-write-count-match-sort',
 'ride-drive-fly-sail-row','run-jump-climb-push','run-jump-climb-push-pull',
 'shout-whisper-ask-answer-think','sing-dance-swim-throw-catch','sit-stand-walk-hop-skip',
 'tie-untie-fold-carry-hold','turn-spin-stop-start-wait','win-miss-score-kick-hit']
SUF='-action-words-flashcard-for-kids.jpg'

def get(url):
    req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 kiddo-live-probe'})
    with urllib.request.urlopen(req,timeout=30) as r:
        return r.status, r.read().decode('utf8','replace')

checks=[]
def ok(name,cond,extra=''):
    print(('PASS ' if cond else 'FAIL ')+name+((' — '+extra) if extra and not cond else ''))
    checks.append(bool(cond))

st,h=get(SITE+'/action-words/')
ok('/action-words/ 200',st==200)
ok('eyebrow CLASS 49','CLASS 49' in h and 'ACTION WORDS' in h)
ok('first card is the main image',CDN+AW[0]+SUF in h and 'lesson-cover' in h)
ok('24 tiles ship lazy with dims','loading="lazy"' in h and 'width="1414" height="2000"' in h)
ok('links back to Classes 37/6/32 + LP',all(u in h for u in ['/preschool/4-years/sports-movement-and-play/','/baby/9-12-months/first-actions-body-parts/','/preschool/4-years/life-skills-and-good-habits/','/learning-path/']))
ok('no banned words',('no sign up' not in h.lower() and 'no paywall' not in h.lower()))

st,c=get(SITE+'/action-words/run-jump-climb-push/')
ok('/action-words/run-jump-climb-push/ 200 (the owner\u2019s example)',st==200)
ok('card 8 of 24','CARD 8 OF 24' in c)
ok('the card says quotes the printed words','RUN · JUMP · CLIMB · PUSH' in c)
ok('short page links back','href="/action-words/"' in c)
ok('download keeps the master','download="run-jump-climb-push.jpg"' in c)

st,b=get(SITE+'/action-words/bite-chew-smell-touch-feel/')
ok('card 1 page 200','CARD 1 OF 24' in b and st==200)

st,lp=get(SITE+'/learning-path/')
ok('/learning-path/ 200',st==200)
ok('count word forty-nine (title)','forty-nine age-guided classes' in lp)
ok('Forty-nine classes are ready now (lede)','Forty-nine classes are ready now' in lp)
i48=lp.find('Class 48: <a href="/plants-and-how-they-grow/">')
i49=lp.find('Class 49: <a href="/action-words/">')
ok('LP row 49 after row 48',0<i48<i49)

st,xml=get(SITE+'/sitemap.xml')
ok('sitemap carries the class page','<loc>https://kiddo.school/action-words/</loc>' in xml)
entry=xml.split('<loc>https://kiddo.school/action-words/</loc>')[1].split('</url>')[0]
n_img=entry.count('<image:loc>')
ok('class entry carries 24 images',n_img==24,f'got {n_img}')
ok('first image leads',entry.find('<image:loc>'+CDN+AW[0]+SUF+'</image:loc>')==entry.find('<image:loc>'))
missing=[s for s in AW if f'<loc>https://kiddo.school/action-words/{s}/</loc>' not in xml]
ok('all 24 short-page locs',not missing,str(missing))

for p,label in [('/preschool/4-years/sports-movement-and-play/','Class 37'),('/baby/9-12-months/first-actions-body-parts/','Class 6'),('/preschool/4-years/life-skills-and-good-habits/','Class 32')]:
    st,pg=get(SITE+p)
    ok(f'{label} points at /action-words/',st==200 and 'href="/action-words/"' in pg)

st,about=get(SITE+'/about/')
ok('About says Forty-nine','Forty-nine classes from birth to age five are ready today' in about)

bad=[]
for s in AW:
    u=CDN+s+SUF
    try:
        req=urllib.request.Request(u,method='HEAD',headers={'User-Agent':'Mozilla/5.0 kiddo-live-probe'})
        with urllib.request.urlopen(req,timeout=20) as r:
            if r.status!=200 or 'image/jpeg' not in r.headers.get('Content-Type',''):bad.append(s)
    except Exception as ex:bad.append(s+':'+str(ex)[:40])
ok('24/24 R2 masters answer 200 image/jpeg',not bad,str(bad))

print('RESULT:','ALL PASS' if all(checks) else 'FAILURES',f'({sum(checks)}/{len(checks)})')
sys.exit(0 if all(checks) else 1)
