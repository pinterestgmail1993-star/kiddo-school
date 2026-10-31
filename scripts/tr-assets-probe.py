#!/usr/bin/env python3
"""Class 41 Time & Daily Routine (owner 2026-10-31): probe every R2 file in
school/learning-path/time-and-daily-routine/flashcards/ LIVE (the owner's
bucket listing shows 42 files: 41 cards + the cover), look for the owner's
time-and-daily-routine-image-seo.csv at the folder root and inside flashcards/,
download the cards for labeled contact sheets (the house transcription play:
card words and pill lines are read off the artwork, never invented)."""
import json, os, sys, urllib.request

BASE = 'https://assets.kiddo.school/school/learning-path/time-and-daily-routine/'
FILES = [
 'a-day-at-school-routine-flashcard-for-kids.webp','afternoon-activities-flashcard-for-kids.webp',
 'always-sometimes-never-flashcard-for-kids.webp','before-during-after-time-words-flashcard-for-kids.webp',
 'begin-continue-finish-flashcard-for-kids.webp','chores-in-order-flashcard-for-kids.webp',
 'countdown-to-a-special-day-flashcard-for-kids.webp','dawn-noon-dusk-midnight-flashcard-for-kids.webp',
 'days-of-the-week-flashcard-for-kids.webp','early-or-late-flashcard-for-kids.webp',
 'evening-and-night-routine-flashcard-for-kids.webp','fast-or-slow-flashcard-for-kids.webp',
 'first-next-last-sequence-words-flashcard-for-kids.webp','getting-ready-routine-flashcard-for-kids.webp',
 'healthy-habits-daily-routine-flashcard-for-kids.webp','how-long-might-it-take-flashcard-for-kids.webp',
 'how-often-time-words-flashcard-for-kids.webp','long-or-short-time-flashcard-for-kids.webp',
 'meal-times-breakfast-lunch-dinner-flashcard-for-kids.webp','months-of-the-year-flashcard-for-kids.webp',
 'morning-routine-flashcard-for-kids.webp','my-daily-routine-flashcard-for-kids.webp',
 'now-soon-later-time-words-flashcard-for-kids.webp','open-happening-closed-flashcard-for-kids.webp',
 'parts-of-the-day-flashcard-for-kids.webp','plan-my-day-flashcard-for-kids.webp',
 'read-the-clock-hour-oclock-flashcard-for-kids.webp','same-time-each-day-routine-flashcard-for-kids.webp',
 'seconds-minutes-hours-flashcard-for-kids.webp','start-and-stop-flashcard-for-kids.webp',
 'the-calendar-days-weeks-months-flashcard-for-kids.webp','time-changes-melt-grow-flashcard-for-kids.webp',
 'time-helpers-clock-calendar-timer-flashcard-for-kids.webp','time-order-words-first-second-third-flashcard-for-kids.webp',
 'time-words-review-flashcard-for-kids.webp','waiting-time-patience-flashcard-for-kids.webp',
 'week-month-year-flashcard-for-kids.webp','weekday-or-weekend-flashcard-for-kids.webp',
 'when-plans-change-flashcard-for-kids.webp','work-time-and-break-time-flashcard-for-kids.webp',
 'yesterday-today-tomorrow-flashcard-for-kids.webp',
]
COVER = 'time-and-daily-routine-flashcards-for-kids-cover.webp'
OUT = os.path.join(os.path.dirname(__file__), 'tr-assets')
os.makedirs(OUT, exist_ok=True)

def get(url, method='HEAD'):
    req = urllib.request.Request(url, method=method, headers={'User-Agent': 'kiddo-qa/1.0'})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status, dict(r.headers)
    except urllib.error.HTTPError as e:
        return e.code, dict(e.headers or {})

def fetch(url, path):
    req = urllib.request.Request(url, headers={'User-Agent': 'kiddo-qa/1.0'})
    with urllib.request.urlopen(req, timeout=60) as r, open(path, 'wb') as f:
        f.write(r.read())

report = {'base': BASE, 'csv': {}, 'cards': {}, 'cover': None}
# 1) CSV candidates (owner brief: time-and-daily-routine-image-seo.csv)
for cand in [BASE + 'time-and-daily-routine-image-seo.csv',
             BASE + 'flashcards/time-and-daily-routine-image-seo.csv']:
    s, h = get(cand)
    report['csv'][cand] = s
    if s == 200:
        fetch(cand, os.path.join(OUT, 'seo.csv'))
        print('CSV FOUND:', cand)
# 2) probe + download all 42
fails = []
for i, name in enumerate(FILES + [COVER], 1):
    url = BASE + 'flashcards/' + name
    s, h = get(url)
    ok = (s == 200 and 'image/webp' in h.get('Content-Type', ''))
    entry = {'status': s, 'type': h.get('Content-Type', ''), 'bytes': h.get('Content-Length', '')}
    (report['cards'] if name in FILES else report.__setitem__('cover', entry) or report['cards']) if False else None
    if name == COVER:
        report['cover'] = entry
    else:
        report['cards'][name] = entry
    if ok:
        try:
            fetch(url, os.path.join(OUT, name))
        except Exception as e:
            fails.append((name, f'download {e}'))
    else:
        fails.append((name, s))
    print(f"{i:02d}/42 {s} {name} {entry['bytes']}B")
    if name != COVER:
        import time; time.sleep(0.15)

from PIL import Image
dims = {}
for f in sorted(os.listdir(OUT)):
    if f.endswith('.webp'):
        with Image.open(os.path.join(OUT, f)) as im:
            dims[f] = im.size
report['dims'] = dims
sizes = set(dims.values())
print('---')
print('downloaded:', len([f for f in dims if f != COVER and not f.endswith('seo.csv')]), 'cards +cover',
      len([f for f in dims if f == COVER]))
print('distinct dimensions:', sizes)
print('FAILS:', fails)
json.dump(report, open(os.path.join(OUT, 'report.json'), 'w'), indent=1)
