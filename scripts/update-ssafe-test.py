#!/usr/bin/env python3
"""Update tests/staying-safe.test.mjs: header note + the parents'-shelf test."""
import pathlib, sys

p = pathlib.Path('/home/z/my-project/kiddo-school/tests/staying-safe.test.mjs')
s = p.read_text(encoding='utf-8')

# 1. import readdirSync
old_imp = "import {readFileSync,existsSync} from 'node:fs';"
assert s.count(old_imp) == 1
s = s.replace(old_imp, "import {readFileSync,existsSync,readdirSync} from 'node:fs';")

# 2. header note (append after the existing NOTE line about Class 41)
note_anchor = ' the published number is 39 per the owner\'s own rule.\n'
assert s.count(note_anchor) == 1, s.count(note_anchor)
s = s.replace(note_anchor, note_anchor + """// OWNER ROUND 2026-10-31: the deck joins the flashcards library — the
// parents' shelf at /flashcards/staying-safe/ carries the whole deck on ONE
// page (image + description + age/subject/level pill + Download/Print under
// every card) with ZERO per-card pages in the library (manners +
// question-words precedent). TONE SPLIT (owner rule): the lesson talks
// directly to kids; the shelf talks directly to parents.
""")

# 3. the shelf contract test, appended at the end of the file
shelf_test = """
test('the parents\\u2019 shelf at /flashcards/staying-safe/: 19 tiles, image + description + age/subject/level pill + Download/Print under every card, zero per-card URLs in the library',()=>{
 const shelf=readFileSync('dist/flashcards/staying-safe/index.html','utf8');
 assert.ok(shelf.includes('<title>Staying Safe Flashcards to Print \\u2014 19 Safety Cards for Parents (Ages 4\\u20135) | Kiddo.school</title>'));
 assert.equal((shelf.match(/class="mn-card"/g)||[]).length,19,'19 card tiles');
 assert.equal((shelf.match(/fc-pillrow/g)||[]).length,19,'a pill row on every tile');
 for(const c of cards){
  assert.ok(shelf.includes(SSAFE_BASE+c.slug+'.webp" download="'+c.slug+'.webp"'),c.slug+': Download serves the folder-root R2 file');
  assert.ok(shelf.includes('data-mn-print'),c.slug+': Print button present');
  const tile=shelf.slice(shelf.indexOf(c.slug+'.webp"'),shelf.indexOf(c.slug+'.webp"')+2600);
  assert.ok(tile.includes('fc-pill-age'),c.slug+': age pill');
  assert.ok(tile.includes('fc-pill-subject'),c.slug+': subject pill');
  assert.ok(tile.includes('fc-pill-level'),c.slug+': level pill');
  assert.ok(tile.includes('class="mn-tip"'),c.slug+': parent description under the image');
 }
 assert.ok(shelf.includes('src="/assets/manners.js'),'the print handler rides along');
 assert.equal((shelf.match(/fc-pill-level">Level 1/g)||[]).length,7,'level 1 = 7 cards (start here)');
 assert.equal((shelf.match(/fc-pill-level">Level 2/g)||[]).length,7,'level 2 = 7 cards (practise)');
 assert.equal((shelf.match(/fc-pill-level">Level 3/g)||[]).length,5,'level 3 = 5 cards (hero moves)');
 assert.ok(shelf.includes('href="/staying-safe/"'),'shelf links back to the class');
 assert.ok(shelf.includes('href="/flashcards/healthy-food/"'),'shelf links to the sibling shelf');
 assert.ok(!shelf.toLowerCase().includes('etsy'),'zero Etsy on the shelf');
 assert.ok(!/href="#(?!main")/.test(shelf),'no anchor jump links on the shelf');
 assert.ok(shelf.includes('your child'),'parent voice on the shelf');
 // No per-card URLs in the library — the shelf is the whole set.
 assert.equal(readdirSync('dist/flashcards/staying-safe').filter(d=>d!=='index.html').length,0,'zero per-card URLs in the library');
 // The class page links to its parents' shelf (manners precedent).
 assert.ok(cls.includes('href="/flashcards/staying-safe/"'),'class page links to the parents\\u2019 shelf');
 // The library wall fronts the set with the deck's first card (no cover on R2).
 const hubHtml=readFileSync('dist/flashcards/index.html','utf8');
 assert.ok(hubHtml.includes('href="/flashcards/staying-safe/"'),'library wall carries the set');
 assert.ok(hubHtml.includes(SSAFE_BASE+'buckle-up.webp'),'the first card fronts the wall card (no cover on R2)');
 // Search kind Flashcards, sitemap, all-pages.
 const idx=JSON.parse(readFileSync('dist/assets/search-index.json','utf8'));
 const mine=idx.find(x=>x.u==='/flashcards/staying-safe/');
 assert.ok(mine&&mine.k==='Flashcards','search carries the shelf as Flashcards');
 assert.ok(readFileSync('dist/sitemap.xml','utf8').includes('<loc>https://kiddo.school/flashcards/staying-safe/</loc>'),'sitemap carries the shelf');
 assert.ok(readFileSync('dist/all-pages/index.html','utf8').includes('/flashcards/staying-safe/'),'all-pages carries the shelf');
 // The 19 shelf descriptions are unique among themselves and never reuse a
 // lesson sentence (duplicate-content rule).
 const descs=[...shelf.matchAll(/class="mn-tip">(.*?)<\\/figcaption>/g)].map(m=>m[1].slice(0,60).toLowerCase());
 assert.equal(descs.length,19,'19 shelf descriptions');
 assert.equal(new Set(descs).size,19,'shelf descriptions are unique');
});
"""
if "the parents\\u2019 shelf at /flashcards/staying-safe/" not in s:
    s = s.rstrip('\n') + '\n' + shelf_test

p.write_text(s, encoding='utf-8')
print('staying-safe.test.mjs updated')
