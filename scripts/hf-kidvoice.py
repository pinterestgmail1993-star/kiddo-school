#!/usr/bin/env python3
"""Apply the kid-voice tryIt rewrites to src/healthy-food.mjs.
The file stores apostrophes as literal \\u2019 escapes and em-dashes as real
UTF-8 characters, so every old/new pair below mirrors the file exactly."""
import pathlib, sys

p = pathlib.Path('/home/z/my-project/kiddo-school/src/healthy-food.mjs')
s = p.read_text(encoding='utf-8')

PAIRS = [
 # (old, new) — each old must appear exactly once
 (' — lay out two good options at bedtime and the morning eats itself.',
  ' — pick your favorite from two good options at bedtime and the morning eats itself.'),
 ('then let your child teach the tortoise pace to the next bite',
  'then teach the tortoise pace to your next bite'),
 ('one fork carried to the table by the eater — dinner',
  'one fork carried to the table by YOU — dinner'),
 (' — and let your child pick the color the plate is missing for tomorrow.',
  ' — then pick the color the plate is missing for tomorrow.'),
 ('the eater who is ready first calls the family to the table',
  'when YOU are ready first, call the family to the table'),
 (r'halfway through the meal ask \u201chow does your tummy feel?\u201d and practise',
  'halfway through the meal say how your tummy feels and practise'),
 (r'fruit after dinner as the pudding it is — the apple\u2019s proud stance is the whole point: sweet needs no wrapper.',
  r'fruit after dinner is the pudding — the apple\u2019s proud stance is the whole point: sweet needs no wrapper, and tonight the fruit is yours to choose.'),
 ('offer two options you are happy to say yes to — apple or banana, yogurt or cheese — and let your child make the healthy call all by themselves.',
  'you get two options — apple or banana, yogurt or cheese — and YOU make the healthy call all by yourself, thumbs up like the apple.'),
 ('park the snack bowl where hands can reach it',
  'the snack bowl sits where YOUR hands can reach it'),
 ('the eating starts when the sitting does',
  'YOUR eating starts when the sitting does'),
 ('the thumbs-up stays on the table win',
  'the thumbs-up stays on YOUR table win'),
 ('let your child be its wash-and-carry helper — a vegetable you prepared yourself',
  'be its wash-and-carry helper — a vegetable YOU prepared yourself'),
 ('the thumbs-up means hands passed inspection',
  'the thumbs-up means YOUR hands passed inspection'),
 ('and the child who pours it drinks proudest.',
  'and the child who pours it drinks proudest. Tonight, that is you.'),
 # Class-page + short-page kid-voice copy
 ('Every card wears one big food habit in words a child can say back — and every card has its own short page that turns the habit into tonight\\u2019s job. It all starts with the smiling cover apple: healthy food is not a lecture, it is a plate a child is proud of.',
  'Every card wears one big food habit in words YOU can say back — and every card has its own short page that turns the habit into tonight\\u2019s job. It all starts with the smiling cover apple: healthy food is not a lecture, it is a plate YOU are proud of.'),
 ('The short pages turn every title into the child\\u2019s own sentence and add one thing to try tonight that takes less than a minute to set up',
  'The short pages turn every title into YOUR own sentence and add one thing to try tonight that takes less than a minute to set up'),
 ('The plate shelf names the food groups a four-year-old actually sees',
  'The plate shelf names the food groups you actually see'),
 ('The meals shelf walks the day:', 'The meals shelf walks YOUR day:'),
 ('one happy habit, said by the child, tried tonight.',
  'one happy habit, said by YOU, tried tonight.'),
 ('<strong>A plate a child helped build is a plate a child will eat.</strong> Every card here hands the habit to the child — the choosing, the washing, the trying — and the grown-up\\u2019s whole job is to keep the options worthy of a yes.',
  '<strong>A plate YOU helped build is a plate YOU will eat.</strong> Every card here hands the habit to you — the choosing, the washing, the trying — and your grown-up\\u2019s whole job is to keep the options worthy of a yes.'),
]

fails = []
for old, new in PAIRS:
    n = s.count(old)
    if n != 1:
        fails.append((n, old[:80]))
        continue
    s = s.replace(old, new)

if fails:
    for n, frag in fails:
        print(f'FAIL count={n}: {frag}')
    sys.exit(1)

p.write_text(s, encoding='utf-8')
print('all', len(PAIRS), 'replacements applied')
