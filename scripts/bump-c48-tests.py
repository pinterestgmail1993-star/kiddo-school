#!/usr/bin/env python3
"""CLASS 48 test bumps: count words forty-seven → forty-eight everywhere,
LP sequences 1–47 → 1–48, wall 70 → 71 (+ age-4-5 38 → 39, sections 23 → 24),
html 3959 → 3941, sitemap 3937 → 3939."""
import pathlib, sys

ROOT = pathlib.Path('/home/z/my-project/kiddo-school/tests')

def bump(rel, pairs):
    p = ROOT / rel
    s = p.read_text()
    changed = 0
    for old, new in pairs:
        n = s.count(old)
        if n:
            s = s.replace(old, new)
            changed += n
    p.write_text(s)
    print(f"{rel}: {changed} replacements")

# --- bulk count words in the tests that lock the CURRENT copy ---
BULK = [
    ("forty-seven age-guided classes", "forty-eight age-guided classes"),
    ("Forty-seven classes are ready now, from birth to age five, in one calm sequence",
     "Forty-eight classes are ready now, from birth to age five, in one calm sequence"),
    ("Forty-seven classes are ready now, from birth to age five",
     "Forty-eight classes are ready now, from birth to age five"),
    ("Forty-seven classes are ready now", "Forty-eight classes are ready now"),
    ("Forty-seven classes from birth to age five are ready today",
     "Forty-eight classes from birth to age five are ready today"),
    ("About page says forty-seven", "About page says forty-eight"),
    ("the count says forty-seven everywhere", "the count says forty-eight everywhere"),
    ("LP sequence is exactly 1\u201347, no gap", "LP sequence is exactly 1\u201348, no gap"),
    ("LP sequence is exactly 1\u201347", "LP sequence is exactly 1\u201348"),
    ("sequence is exactly Classes 1\u201347, no gap", "sequence is exactly Classes 1\u201348, no gap"),
    ("[...Array(47).keys()]", "[...Array(48).keys()]"),
]
for rel in ['feelings-kindness.test.mjs','earth-and-space.test.mjs','staying-safe.test.mjs',
            'alphabet.test.mjs','position-direction.test.mjs','age3-class4.test.mjs',
            'adventures.test.mjs','caring-planet.test.mjs','healthy-food.test.mjs',
            'age3-class8.test.mjs','early-addition.test.mjs','age3-class2-3.test.mjs',
            'age3-class6.test.mjs','weather-seasons.test.mjs','science.test.mjs',
            'lesson14.test.mjs','family-friends.test.mjs','age3-class7.test.mjs',
            'curriculum.test.mjs','age3-class5.test.mjs','time-and-daily-routine.test.mjs',
            'measuring-and-money.test.mjs']:
    bump(rel, BULK)

# --- art-deck: the LP count word lock ---
bump('art-deck.test.mjs', [
    ("before.includes('forty-seven')", "before.includes('forty-eight')"),
    ("the LP count now says forty-seven", "the LP count now says forty-eight"),
])

# --- nature-deck: sitemap baseline + LP count ---
bump('nature-deck.test.mjs', [
    ("const before=3937;", "const before=3939;"),
    ("assert.ok(lp.includes('forty-seven age-guided classes'),'the LP count stays forty-four');",
     "assert.ok(lp.includes('forty-eight age-guided classes'),'the LP count stays forty-four');"),
])

# --- hub-filters: sections 23→24, wall 70→71, age-4-5 38→39 ---
bump('hub-filters.test.mjs', [
    ("bar, four groups, twenty-three shelves", "bar, four groups, twenty-four shelves"),
    ("[...fcHtml.matchAll(/data-hub-section/g)].length,23,", "[...fcHtml.matchAll(/data-hub-section/g)].length,24,"),
    ("thirteen shelves + the nine class parents\u2019 shelves", "thirteen shelves + the ten class parents\u2019 shelves"),
    ("fcHtml.includes('Showing all 70 sets')", "fcHtml.includes('Showing all 71 sets')"),
    ("'Showing 4 of 70 sets'", "'Showing 4 of 71 sets'"),
    ("assert.equal(after.length,38,", "assert.equal(after.length,39,"),
    ("thirty-eight Ages 4\u20135 sets return", "thirty-nine Ages 4\u20135 sets return"),
    ("assert.equal(h.cards.filter(c=>!c.hidden).length,70,'whole wall returns');",
     "assert.equal(h.cards.filter(c=>!c.hidden).length,71,'whole wall returns');"),
    ("'Showing all 70'", "'Showing all 71'"),
])

# --- the other three wall locks ---
bump('feelings-kindness.test.mjs', [("wall.includes('Showing all 70 sets')", "wall.includes('Showing all 71 sets')")])
bump('manners.test.mjs', [("fcHub.includes('Showing all 70 sets')", "fcHub.includes('Showing all 71 sets')")])
bump('question-words.test.mjs', [("fcHub.includes('Showing all 70 sets')", "fcHub.includes('Showing all 71 sets')")])

# --- site: html + sitemap totals ---
p = ROOT / 'site.test.mjs'
s = p.read_text()
s = s.replace("assert.equal(htmlFiles.length,3959);", "assert.equal(htmlFiles.length,3941);")
s = s.replace("assert.equal(links.length,3937);assert.equal(new Set(links).size,3937);",
              "assert.equal(links.length,3939);assert.equal(new Set(links).size,3939);")
p.write_text(s)
print('site.test.mjs: html 3941, sitemap 3939')

print('ALL TEST BUMPS DONE')
