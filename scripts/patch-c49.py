#!/usr/bin/env python3
"""CLASS 49 · Action Words wiring patch: build.mjs + friends. Surgical string
replacements, every one asserted to hit exactly once (unless stated)."""
import re, sys, pathlib

ROOT = pathlib.Path('/home/z/my-project/kiddo-school')
def patch(rel, pairs, optional=False):
    p = ROOT / rel
    s = p.read_text()
    for old, new, *cnt in pairs:
        want = cnt[0] if cnt else 1
        got = s.count(old)
        if got == 0 and s.count(new) >= want:
            print(f"skip {rel}: already applied ({new[:60]!r}…)")
            continue
        if got != want:
            print(f"FAIL {rel}: {got} hits for {old[:90]!r} (want {want})")
            sys.exit(1)
        s = s.replace(old, new)
    p.write_text(s)
    print(f"ok {rel} ({len(pairs)} edits)")

# ---------- build.mjs ----------
B = 'scripts/build.mjs'

# 1. Import.
patch(B, [(
 "import {PGP_PATH,PGP_BASE,PGP_COVER,PGP_ORDER,PGP_CARDS,pgpBySlug,pgpClassBody,pgpLibBody,PGP_LIB_SET,PGP_SCIENCE_LINK,PGP_HABITATS_LINK,PGP_FRUITS_LINK} from '../src/plants-grow.mjs';",
 "import {PGP_PATH,PGP_BASE,PGP_COVER,PGP_ORDER,PGP_CARDS,pgpBySlug,pgpClassBody,pgpLibBody,PGP_LIB_SET,PGP_SCIENCE_LINK,PGP_HABITATS_LINK,PGP_FRUITS_LINK} from '../src/plants-grow.mjs';\nimport {AW_PATH,AW_BASE,AW_CARDS,AW_ORDER,awBySlug,awClassBody,awShortBody,awShortTitle,awShortDesc,awShortAlt,AW_SPORTS_LINK,AW_FIRST_ACTIONS_LINK,AW_LIFE_SKILLS_LINK} from '../src/action-words.mjs';"
)])

# 2. Page-type classifier: /action-words/ is a Class.
patch(B, [(
 "||p.startsWith('/plants-and-how-they-grow/')?'Class'",
 "||p.startsWith('/plants-and-how-they-grow/')||p.startsWith('/action-words/')?'Class'"
)])

# 3. manners.js print-contract chain (the Class 39 short-page treatment).
patch(B, [(
 "||path.startsWith('/plants-and-how-they-grow/')||path==='/flashcards/plants-and-how-they-grow/'?'<script src=\"/assets/manners.js\" defer></script>':''",
 "||path.startsWith('/plants-and-how-they-grow/')||path.startsWith('/action-words/')||path==='/flashcards/plants-and-how-they-grow/'?'<script src=\"/assets/manners.js\" defer></script>':''"
)])

# 4. Page calls: the class page + the 24 short pages, inserted after the
#    plants parents' shelf page() call (registered BEFORE the search-index
#    write, standing owner rule).
CLASS_CALL = """/* ---- CLASS 49 · Action Words (owner 2026-11-02): the Learning Path class
   page at /action-words/ — the first card of the deck (the owner's R2 panel
   row 1, bite-chew-smell-touch-feel) is its main image — plus ONE SHORT PAGE
   PER CARD at /action-words/<slug>/ with a link back, the owner's brief
   verbatim: "Create one short page per card at /action-words/<slug>/ with a
   link back, where <slug> is the file name without
   '-action-words-flashcard-for-kids.jpg', for example
   /action-words/run-jump-climb-push/." The Class 39 · Staying Safe shape.
   NUMBERING: the owner's gate — "If Class 48 is not live, tell me before
   assigning numbers" — Class 48 · Plants & How They Grow WAS probed LIVE
   (LP row 48, count word forty-eight) before 49 was assigned; the number
   rides display copy only, the URL carries no class number. DECK: 24/24
   files probed LIVE on R2 at school/learning-path/action-words/ (HTTP 200
   image/jpeg, every file exactly 1414×2000, byte sizes matching the
   owner's panel). THE JPG MASTERS RIDE EXACTLY AS UPLOADED (owner: "The
   images are JPG, so do not convert or re-compress them, and keep the file
   names exactly as they are"). FOLDER: the brief said …/flashcards/ but the
   live bucket keeps the deck at the folder ROOT (probed 404 at flashcards/,
   200 at the root — the Class-39 quirk); the real R2 location is the truth
   and the owner is told. Titles/words/alts transcribed off 4 labeled
   contact sheets (scripts/aw-sheets.py — all 24 faces read). Inbound
   links: Classes 37, 6, 32 — all three link back. ---- */
page(AW_PATH,'Action Words for Kids — 24 Printable Verb Flashcards (Ages 4\\u20135)','Twenty-four printable action-word flashcards for ages 4\\u20135 in five shelves — every day, big moves, make and do, go and play, and people words — each card showing four or five labeled actions a child can do while naming them: bite the apple, run to the tree, mix the batter, wait your turn. Every card opens its own short page with its printed words, one way to try it today and a link back, starting from the deck\\u2019s first card, Bite, Chew, Smell, Touch & Feel.',crumb([['Learning Path','/learning-path/'],['Action Words']])+awClassBody(),{schema:[ssBc(site,[['Learning Path','/learning-path/'],['Action Words',AW_PATH]])],ogImage:AW_BASE+AW_CARDS[0].file,ogAlt:AW_CARDS[0].alt,ogW:AW_CARDS[0].w,ogH:AW_CARDS[0].h});
for(const aw of AW_ORDER){
 const p=AW_PATH+aw+'/';
 page(p,awShortTitle(aw),awShortDesc(aw),awShortBody(aw),{ogImage:AW_BASE+awBySlug[aw].file,ogAlt:awShortAlt(aw),ogW:1414,ogH:2000});
}
"""
s = (ROOT / B).read_text()
if "page(AW_PATH,'Action Words for Kids" not in s:
    anchor = "+pgpLibBody(),{schema:[ssBc(site,[['Flashcards','/flashcards/'],['Plants & How They Grow','/flashcards/plants-and-how-they-grow/']])],ogImage:PGP_BASE+PGP_COVER.file,ogAlt:PGP_COVER.alt,ogW:PGP_COVER.w,ogH:PGP_COVER.h});"
    assert s.count(anchor) == 1, 'PGP shelf page call anchor not unique'
    s = s.replace(anchor, anchor + '\n' + CLASS_CALL)
    (ROOT / B).write_text(s)
    print('ok build.mjs page calls inserted')
else:
    print('skip build.mjs page calls (already present)')

# 5. Count words: forty-eight → forty-nine (LP title+meta, LP lede, homepage lede).
patch(B, [
 ("forty-eight age-guided classes from birth to age 5", "forty-nine age-guided classes from birth to age 5", 2),
 ("Forty-eight classes are ready now, from birth to age five", "Forty-nine classes are ready now, from birth to age five", 2),
])

# 6. LP row 49 after row 48.
s = (ROOT / B).read_text()
ROW49 = ('<div class="lp-row"><div class="lp-marker" aria-hidden="true"><span>49</span></div>'
 '<div class="lp-stage-card"><div class="fc-stage-pills"><span class="fc-age">Preschool</span>'
 '<span class="fc-class">Ages 4\u20135</span></div><h2>Preschool: Action Words</h2>'
 '<p class="lp-class">Class 49: <a href="/action-words/">Action Words</a></p>'
 '<p class="lp-hublink">The whole class lives at <a href="/action-words/">Action Words</a>'
 ' \u2014 twenty-four printable verb flashcards in five shelves (every day, big moves,'
 ' make &amp; do, go &amp; play, people), every card showing four or five labeled actions a'
 ' child can DO while naming them \u2014 and every card opening its own short page at'
 ' /action-words/&lt;card&gt;/ with the printed words, one way to try it today and a'
 ' link back to the class.</p></div></div>')
if 'Class 49: <a href="/action-words/">' not in s:
    k = s.find('Class 48: <a href="/plants-and-how-they-grow/">Plants &amp; How They Grow</a>')
    assert k > 0, 'LP row 48 not found'
    end = s.find('</div></div>', k)
    assert end > 0
    end += len('</div></div>')
    s = s[:end] + ROW49 + s[end:]
    (ROOT / B).write_text(s)
    print('ok LP row 49 inserted')
else:
    print('skip LP row 49 (already present)')

# 7. Image sitemap: the class page carries cover-first all 24 masters (card
#    pages register their own og image inside page()). Inserted after the
#    FIRST plants routeImg line (the file carries harmless repeats of that
#    line from the Class 48 round); Map.set makes repeats idempotent.
s = (ROOT / B).read_text()
AW_IMG = "routeImg.set(AW_PATH,[AW_BASE+AW_CARDS[0].file,...AW_ORDER.map(sl=>AW_BASE+awBySlug[sl].file)]);"
if AW_IMG not in s:
    k = s.find("routeImg.set(PGP_PATH,[PGP_BASE+PGP_COVER.file,...PGP_ORDER.map(s=>PGP_BASE+pgpBySlug[s].file)]);")
    assert k > 0, 'PGP routeImg line not found'
    k += len("routeImg.set(PGP_PATH,[PGP_BASE+PGP_COVER.file,...PGP_ORDER.map(s=>PGP_BASE+pgpBySlug[s].file)]);")
    s = s[:k] + '\n' + AW_IMG + s[k:]
    (ROOT / B).write_text(s)
    print('ok routeImg AW entry inserted')
else:
    print('skip routeImg AW entry (already present)')

# 8. Inbound links appended to Classes 37 / 6 / 32.
patch(B, [
 ("+GR_CLASS_LINK,{schema:[age4Bc(SP_CLASS_PATH,", "+GR_CLASS_LINK+AW_SPORTS_LINK,{schema:[age4Bc(SP_CLASS_PATH,"),
 ("classLessonBody(fabLesson),{schema:classLessonSchema(site,fabLesson)", "classLessonBody(fabLesson)+AW_FIRST_ACTIONS_LINK,{schema:classLessonSchema(site,fabLesson)"),
 ("+FF_LIFE_SKILLS_LINK,{schema:[ssBc(site,[['Preschool','/preschool/'],['Age 4','/preschool/4-years/'],['Life Skills & Good Habits',LS_CLASS_PATH]])]",
  "+FF_LIFE_SKILLS_LINK+AW_LIFE_SKILLS_LINK,{schema:[ssBc(site,[['Preschool','/preschool/'],['Age 4','/preschool/4-years/'],['Life Skills & Good Habits',LS_CLASS_PATH]])]"),
])

# ---------- the one-page "in order" copy across class modules ----------
for rel in ['src/family-friends.mjs','src/early-addition.mjs','src/position-direction.mjs','src/caring-planet.mjs','src/plants-grow.mjs']:
    patch(rel, [("the Learning Path holds all forty-eight in order", "the Learning Path holds all forty-nine in order")])

# ---------- About page ----------
patch('src/legal-pages.mjs', [
 ("Forty-eight classes from birth to age five are ready today", "Forty-nine classes from birth to age five are ready today"),
])

# ---------- style.css: the tile word-row under the tile title ----------
patch('public/assets/style.css', [
 (".lp-tile .sa-card-num{width:30px;height:30px;font-size:13px;top:10px;left:10px}",
  ".lp-tile .lp-tile-sub{display:block;padding:0 12px 12px;font-size:12px;line-height:1.4;text-align:center;color:var(--muted)}\n.lp-tile .sa-card-num{width:30px;height:30px;font-size:13px;top:10px;left:10px}"),
])

# ---------- all-pages registration (+ dedupe of the doubled plants entry) ----------
patch('scripts/all-pages-dir.mjs', [
 ("'/caring-for-our-planet/','/plants-and-how-they-grow/','/plants-and-how-they-grow/',",
  "'/caring-for-our-planet/','/plants-and-how-they-grow/','/action-words/',"),
])

# ---------- tests: LP integrity 1–48 → 1–49 ----------
patch('tests/learning-path-integrity.test.mjs', [
 ("const APPROVED=[...Array(48).keys()].map(i=>i+1);", "const APPROVED=[...Array(49).keys()].map(i=>i+1);"),
 ("test('the Learning Path shows exactly the approved classes — unique, strictly increasing, no gap (1–48)',()=>{",
  "test('the Learning Path shows exactly the approved classes — unique, strictly increasing, no gap (1–49)',()=>{"),
 ("assert.deepEqual(nums,APPROVED,'sequence is exactly Classes 1–48, no gap');",
  "assert.deepEqual(nums,APPROVED,'sequence is exactly Classes 1–49, no gap');"),
])

# ---------- tests: the no-invented-number lock moves to Class 50 ----------
patch('tests/science-lab.test.mjs', [
 ("assert.ok(!lp.includes('Class 49'),'no invented class number (Class 48 · Plants & How They Grow went live at /plants-and-how-they-grow/ on 2026-11-02 — numbered by the no-skip rule after Class 47 · Caring for Our Planet; the LP runs 1–48 with no gap);');",
  "assert.ok(!lp.includes('Class 50'),'no invented class number (Class 49 · Action Words went live at /action-words/ on 2026-11-02 — numbered by the no-skip rule after Class 48 · Plants & How They Grow probed live; the LP runs 1–49 with no gap — the Class 50 · Describing Words deck was 14 of 46 files short on R2 when probed 2026-11-02, so the number waits for the missing uploads);');"),
])

# ---------- tests: count/sequence locks across suites ----------
import glob
for tf in sorted(glob.glob(str(ROOT / 'tests' / '*.test.mjs'))):
    rel = str(pathlib.Path(tf).relative_to(ROOT))
    s0 = (ROOT / rel).read_text()
    s = s0
    s = s.replace("forty-eight age-guided classes", "forty-nine age-guided classes")
    s = s.replace("Forty-eight classes are ready now", "Forty-nine classes are ready now")
    s = s.replace("Forty-eight classes from birth to age five are ready today", "Forty-nine classes from birth to age five are ready today")
    s = s.replace("includes('Forty-eight classes')", "includes('Forty-nine classes')")
    s = s.replace("count says forty-eight everywhere", "count says forty-nine everywhere")
    s = s.replace("[...Array(48).keys()]", "[...Array(49).keys()]")
    s = s.replace("'LP sequence is exactly 1–48, no gap'", "'LP sequence is exactly 1–49, no gap'")
    s = s.replace("'LP sequence is exactly 1–48'", "'LP sequence is exactly 1–49'")
    s = s.replace("'sequence is exactly Classes 1–48, no gap'", "'sequence is exactly Classes 1–49, no gap'")
    s = s.replace("'LP sequence is exactly 1\\u201348, no gap'", "'LP sequence is exactly 1\\u201349, no gap'")
    if s != s0:
        (ROOT / rel).write_text(s)
        print(f"ok {rel} count/sequence locks bumped")
    else:
        print(f"-- {rel} unchanged")

# ---------- tests: exact-count locks (pages + sitemap) ----------
patch('tests/site.test.mjs', [
 ("assert.equal(htmlFiles.length,3961);assert.equal(activities.length,11);",
  "+25 for Class 49 · Action Words (owner 2026-11-02): the /action-words/ class page + 24 short pages at /action-words/<card>/ — the Class 39 short-page shape, probed live on R2 first\nassert.equal(htmlFiles.length,3986);assert.equal(activities.length,11);"),
 ("assert.equal(links.length,3939);assert.equal(new Set(links).size,3939);",
  "+25 for Class 49 · Action Words (owner 2026-11-02): /action-words/ + 24 card pages (the count word goes forty-eight → forty-nine everywhere)\nassert.equal(links.length,3964);assert.equal(new Set(links).size,3964);"),
])
patch('tests/nature-deck.test.mjs', [
 ("const before=3939; // the one-page round (owner 2026-11-01): −87 per-card pages (Classe",
  "const before=3964; // +25 for Class 49 · Action Words (owner 2026-11-02, /action-words/ + 24 card pages); before that: the one-page round (owner 2026-11-01): −87 per-card pages (Classe"),
])
# art-deck LP-count probe (asserts the raw word)
patch('tests/art-deck.test.mjs', [
 ("assert.ok(before.includes('forty-eight'),'the LP count now says forty-eight — Class 47 Caring for Our Planet joined (one-page round 2026-11-01); the Art Room still takes no class number');",
  "assert.ok(before.includes('forty-nine'),'the LP count now says forty-nine — Class 49 Action Words joined (owner brief 2026-11-02); the Art Room still takes no class number');"),
])
# plants-grow suite: its own LP-sequence lock and homepage/about count lines
patch('tests/plants-grow.test.mjs', [
 ("'LP count words say forty-eight'", "'LP count words say forty-nine'"),
 ("'homepage lede says forty-eight'", "'homepage lede says forty-nine'"),
 ("'About page says forty-eight'", "'About page says forty-nine'"),
])

print('ALL PATCHES APPLIED')
