#!/usr/bin/env python3
"""Bump the honest test locks for the Question Words round (owner 2026-10-28):
+2 pages (class page + parents' shelf), -4 sitemap (the /ages/ de-index),
EXTRA_CLASSES 11->12, wall 60->61, shelves 13->14, age-4-5 filter 28->29."""
import sys

def patch(path, pairs):
    src = open(path, encoding='utf-8').read()
    for old, new in pairs:
        n = src.count(old)
        if n != 1:
            print(f'FAIL {path}: {n} matches for: {old[:80]!r}')
            sys.exit(1)
        src = src.replace(old, new)
    open(path, 'w', encoding='utf-8').write(src)
    print(f'ok   {path} ({len(pairs)} edits)')

# ---- site locks: html 3891->3893, sitemap 3873->3871 + history note ----
patch('tests/site.test.mjs', [
    ('assert.equal(htmlFiles.length,3891);',
     'assert.equal(htmlFiles.length,3893);'),
    ('assert.equal(links.length,3873);assert.equal(new Set(links).size,3873);',
     'assert.equal(links.length,3871);assert.equal(new Set(links).size,3871);'),
    ('the whole deck prints from the shelf itself).',
     "the whole deck prints from the shelf itself); +2 for the Question Words extra class (owner 2026-10-28, 'same — no individual pages'): the /question-words/ class page (cover first, then the six core questions, then the rest — all 16 cards with tips, downloads and per-card printing on the ONE page) + the /flashcards/question-words/ parents' shelf; -4 in the same round: the /ages/ activity pages de-indexed at the owner's GSC instruction (ages/tag/filter pages stay out of Google) — noindex,follow meta + out of the sitemap, the pages still build and keep their URLs)."),
])

# ---- extra-classes shelf: 11 -> 12 ----
for f in ['tests/animal-categories.test.mjs','tests/dinosaurs.test.mjs',
          'tests/doctor-visit.test.mjs','tests/home-daily-life.test.mjs',
          'tests/kids-games.test.mjs','tests/places-community.test.mjs']:
    patch(f, [
        ('assert.equal(EXTRA_CLASSES.length,11,',
         'assert.equal(EXTRA_CLASSES.length,12,'),
        ('eleven extra classes — Manners joined (owner 2026-10-27',
         'twelve extra classes — Question Words joined (owner 2026-10-28; Manners joined 2026-10-27'),
    ])

# ---- hub copy Eleven -> Twelve (colors-extra + manners) ----
patch('tests/colors-extra.test.mjs', [
    ("hub.includes('Eleven extra classes'),'hub copy counts ten — Dinosaurs joined (owner 2026-10-25)'",
     "hub.includes('Twelve extra classes'),'hub copy counts twelve — Question Words joined (owner 2026-10-28; Dinosaurs 2026-10-25)'"),
])
patch('tests/manners.test.mjs', [
    ("hub.includes('Eleven extra classes'),'hub copy counts Eleven'",
     "hub.includes('Twelve extra classes'),'hub copy counts Twelve — Question Words joined (owner 2026-10-28)'"),
    ("assert.ok(fcHub.includes('Showing all 60 sets'),'the wall count grew to 60');",
     "assert.ok(fcHub.includes('Showing all 61 sets'),'the wall count grew to 61 — the Question Words parents’ shelf joined (owner 2026-10-28)');"),
])

# ---- feelings-kindness wall count ----
patch('tests/feelings-kindness.test.mjs', [
    ("assert.ok(wall.includes('Showing all 60 sets'),'wall count is 60 — the Manners parents’ shelf joined the library (owner 2026-10-27); the Cafeteria set joined earlier (owner 2026-10-26)');",
     "assert.ok(wall.includes('Showing all 61 sets'),'wall count is 61 — the Question Words parents’ shelf joined the library (owner 2026-10-28); Manners joined 2026-10-27, the Cafeteria set earlier (owner 2026-10-26)');"),
])

# ---- hub-filters: shelves 13->14, wall 60->61, age-4-5 filter 28->29 ----
patch('tests/hub-filters.test.mjs', [
    (""".length,13,'twelve shelves + the Manners parents’ shelf');""",
     """.length,14,'thirteen shelves + the Manners and Question Words parents’ shelves');"""),
    ('for(let i=0;i<13;i++)', 'for(let i=0;i<14;i++)'),
    ("fcHtml.includes('Showing all 60 sets'),'count says 60 sets'",
     "fcHtml.includes('Showing all 61 sets'),'count says 61 sets'"),
    ("'Showing 6 of 60 sets'", "'Showing 6 of 61 sets'"),
    ("'Showing 4 of 60 sets'", "'Showing 4 of 61 sets'"),
    ("assert.equal(after.length,28,'twenty-eight Ages 4–5 sets return — the two animal decks, the Colors deck, Class 38 Feelings & Kindness, the Dinosaurs deck, the Art Room deck, the Clubs deck (its Ages 3+ half serves 4–5s), the Cafeteria deck and the Manners parents’ shelf joined the shelf (owner 2026-10-21/22/23/25/26/27)');",
     "assert.equal(after.length,29,'twenty-nine Ages 4–5 sets return — the two animal decks, the Colors deck, Class 38 Feelings & Kindness, the Dinosaurs deck, the Art Room deck, the Clubs deck (its Ages 3+ half serves 4–5s), the Cafeteria deck, and the Manners and Question Words parents’ shelves joined the shelf (owner 2026-10-21/22/23/25/26/27/28)');"),
    ("assert.equal(h.cards.filter(c=>!c.hidden).length,60,'whole wall returns');",
     "assert.equal(h.cards.filter(c=>!c.hidden).length,61,'whole wall returns');"),
    ("startsWith('Showing all 60')", "startsWith('Showing all 61')"),
    ("'Showing 0 of 60 sets'", "'Showing 0 of 61 sets'"),
])
print('all patches applied')
