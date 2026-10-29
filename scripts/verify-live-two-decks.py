#!/usr/bin/env python3
"""Live QA for the Sequence Stories extra class (owner 2026-10-29) on the
production site, in the spirit of scripts/verify-live-manners.py:
page 200 + structure + the two R2 decks' every file + cross-links live."""
import re, sys, time, urllib.request

SITE='https://kiddo.school'
SS_BASE='https://assets.kiddo.school/school/extra-classes/sequence-stories/flashcards/'
QW_BASE='https://assets.kiddo.school/school/extra-classes/question-words/'
SS=['bedtime','blow-bubbles','build-a-snowman','build-a-tower','find-teddy',
 'fly-a-kite','go-to-the-park','jump-in-the-puddle','make-a-paper-boat',
 'make-a-paper-crown','make-a-sandwich','make-lemonade','make-toast',
 'pick-up-the-banana-peel','plant-a-seed','put-on-socks-and-shoes',
 'put-on-your-coat','read-a-book','set-the-table','sock-puppet',
 'tidy-the-toys','wash-and-eat-an-apple','wash-your-hands','water-the-plant']
QW=['how-many','how-much','how-old','how','what-happened','what-next',
 'what-time','what','when','where-are-you','where','which','who-are-you','who',
 'whose-turn','why']

def get(url):
    req=urllib.request.Request(url,headers={'User-Agent':'qa'})
    with urllib.request.urlopen(req,timeout=30) as r:
        return r.status, r.headers.get('Content-Type'), r.read()

fails=[]
def check(name,cond):
    print(('PASS ' if cond else 'FAIL ')+name)
    if not cond: fails.append(name)

# wait for Pages deploy
print('waiting for deploy...',flush=True)
for i in range(30):
    try:
        c,_,b=get(SITE+'/sequence-stories/')
        if c==200: break
    except Exception:
        pass
    time.sleep(10)
html=get(SITE+'/sequence-stories/')[2].decode()
c,ct,_=get(SITE+'/sequence-stories/')
check('/sequence-stories/ is 200 html', c==200 and 'text/html' in ct)
check('cover first', html.find('sequence-stories/flashcards/cover.webp')<html.find('sequence-stories/flashcards/bedtime.webp') and 'sequence-stories/flashcards/cover.webp' in html)
check('24 tiles + 24 downloads', len(re.findall(r'data-mn-print',html))==24 and len(re.findall(r'download="[a-z-]+\.webp"',html))==24)
tiles=[t for t in html.split('<figure class="mn-card">')[1:]]
badge_tiles=[re.search(r'sequence-stories/flashcards/([a-z-]+)\.webp',t).group(1) for t in tiles if 'mn-grownup' in t]
check('Ask a grown-up ×2 on make-toast + make-lemonade', len(re.findall(r'class="mn-grownup">Ask a grown-up',html))==2 and sorted(badge_tiles)==['make-lemonade','make-toast'])
check('zero Etsy on the page', not re.search(r'[Ee]tsy',html))
check('no jump links beyond skip', all(m=='main' for m in re.findall(r'href="#([a-z][a-z-]*)"',html)))
back=['/preschool/4-years/storytime-and-pre-reading/','/preschool/4-years/logic-thinking-and-problem-solving/','/preschool/4-years/life-skills-and-good-habits/','/extra-classes/']
check('back links to Class 29/30/32 + hub', all(f'href="{h}"' in html for h in back))
print('R2 sequence-stories assets...',flush=True)
ok=0
for s in ['cover']+SS:
    try:
        c,ct,_=get(SS_BASE+s+'.webp')
        ok+= (c==200 and 'image/webp' in ct)
    except Exception: pass
check(f'25/25 R2 sequence-stories files 200 image/webp (got {ok})', ok==25)

print('R2 question-words assets...',flush=True)
ok=0
for s in ['cover']+QW:
    try:
        c,ct,_=get(QW_BASE+s+'.webp')
        ok+= (c==200 and 'image/webp' in ct)
    except Exception: pass
check(f'17/17 R2 question-words files 200 image/webp (got {ok})', ok==17)

qw=get(SITE+'/question-words/')[2].decode()
check('/question-words/ live: 16 prints + core six lead', len(re.findall(r'data-mn-print',qw))==16 and qw.find('question-words/who.webp')<qw.find('question-words/what.webp')<qw.find('question-words/when.webp')<qw.find('question-words/where.webp')<qw.find('question-words/why.webp')<qw.find('question-words/how.webp'))
check('/question-words/ live: zero Etsy', not re.search(r'[Ee]tsy',qw))

c29=get(SITE+'/preschool/4-years/storytime-and-pre-reading/')[2].decode()
c30=get(SITE+'/preschool/4-years/logic-thinking-and-problem-solving/')[2].decode()
c32=get(SITE+'/preschool/4-years/life-skills-and-good-habits/')[2].decode()
c21=get(SITE+'/preschool/3-years/body-parts-and-five-senses/')[2].decode()
check('Class 29 links both new classes', 'href="/sequence-stories/"' in c29 and 'href="/question-words/"' in c29)
check('Class 30 links both new classes', 'href="/sequence-stories/"' in c30 and 'href="/question-words/"' in c30)
check('Class 32 links sequence-stories', 'href="/sequence-stories/"' in c32 and 'Put the story in order' not in c29[:100])
check('Class 32 carries the SS section', 'The habits, four steps at a time' in c32)
check('Class 21 links question-words', 'href="/question-words/"' in c21)
hub=get(SITE+'/extra-classes/')[2].decode()
check('hub: Thirteen + both cards', 'Thirteen extra classes' in hub and 'href="/sequence-stories/"' in hub and 'href="/question-words/"' in hub)
check('hub: zero Etsy', not re.search(r'[Ee]tsy',hub))
lp=get(SITE+'/learning-path/')[2].decode()
check('LP bonus row lists both', 'href="/sequence-stories/">Sequence Stories</a> (ages 3–5)' in lp and 'href="/question-words/">Question Words</a> (ages 3–5)' in lp)
sm=get(SITE+'/sitemap.xml')[2].decode()
check('sitemap has both, no per-card', 'https://kiddo.school/sequence-stories/</loc>' in sm and 'https://kiddo.school/question-words/</loc>' in sm and '/sequence-stories/bedtime' not in sm)
m=get(SITE+'/manners/')[2].decode()
check('manners untouched: no jump links, zero Etsy', all(x=='main' for x in re.findall(r'href="#([a-z][a-z-]*)"',m)) and not re.search(r'[Ee]tsy',m))
print()
print('FAILURES:',len(fails))
sys.exit(1 if fails else 0)
