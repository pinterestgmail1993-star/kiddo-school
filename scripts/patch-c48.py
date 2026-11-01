#!/usr/bin/env python3
"""CLASS 48 wiring patch: build.mjs + friends. Surgical string replacements,
every one asserted to hit exactly once (unless stated)."""
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
            print(f"FAIL {rel}: {got} hits for {old[:80]!r} (want {want})")
            sys.exit(1)
        s = s.replace(old, new)
    p.write_text(s)
    print(f"ok {rel} ({len(pairs)} edits)")

# ---------- build.mjs ----------
B = 'scripts/build.mjs'

# 1. FC_SECTIONS: append the Class 48 wall card after the Caring entry.
patch(B, [(
 "The child\\u2019s lesson lives in the Caring for Our Planet class.',['caring-for-our-planet']]\n];",
 """The child\\u2019s lesson lives in the Caring for Our Planet class.',['caring-for-our-planet'],
 /* CLASS 48 · Plants & How They Grow (owner 2026-11-02): the parents' shelf —
    the whole 41-card deck on ONE library page, Download + Print under every
    image, four pills per card, a try-it job under each. Appended last so the
    existing chip anchors never move. */
 ['Plants & How They Grow \\u00b7 Class 48','The plants-and-how-they-grow deck for parents to print: forty-one plant flashcards for ages four to five \\u2014 the growing shelf, the plant parts shelf, the plant care shelf, the flowers and seeds shelf, the wild places shelf and the plant defense shelf \\u2014 every card with its try-it job, an age, subject and level pill, a download button and one-tap printing straight from the shelf, no card pages. The child\\u2019s lesson lives in the Plants & How They Grow class.',['plants-and-how-they-grow']]
];"""
)])

# 2. fcAllBySlug.
patch(B, [(
 "'caring-for-our-planet':CFP_LIB_SET};",
 "'caring-for-our-planet':CFP_LIB_SET,'plants-and-how-they-grow':PGP_LIB_SET};"
)])

# 3. Page calls: insert after the CFP shelf page() statement.
CLASS_CALL = """/* ---- CLASS 48 · Plants & How They Grow (owner 2026-11-02): the Learning
   Path class page at /plants-and-how-they-grow/ carrying the WHOLE 41-card
   deck on that ONE page (six shelves — growing, plant parts, plant care,
   flowers & seeds, wild places, plant defense — every card with
   age/subject/level/skill pills and Download + Print straight from the
   page; the owner's standing rule "dont make indiviual pages", reaffirmed
   in the brief: "no indiviual pages ok"), plus the parents' shelf at
   /flashcards/plants-and-how-they-grow/. ZERO per-card URLs. NUMBERING:
   the owner's gate said "Add Class 49 … as the next class number after
   Class 48. If Class 48 is not live, tell me before assigning numbers" —
   production probed 2026-11-02: the LP ends at Class 47 · Caring for Our
   Planet (row 47, count word forty-seven) and NO Class 48 exists anywhere
   (repo, sitemap, production), so by the site's own no-skip rule the
   honest number is 48, NOT 49 — assigning 49 would leave Class 48 a hole
   in the sequence the integrity test exists to prevent. The owner is told
   in the round report; the number rides DISPLAY COPY ONLY, the URL carries
   no class number, so a renumber is one commit with zero URL changes.
   DECK: 42/42 files probed LIVE on R2 at
   school/learning-path/plants-and-how-they-grow/flashcards/ (41 cards +
   the cover, HTTP 200 image/jpeg, every file exactly 1414×2000 portrait,
   byte sizes matching the owner's R2 panel to the kB). THE JPG MASTERS
   RIDE EXACTLY AS UPLOADED (owner: "The images are JPG, so do not convert
   or re-compress them, and keep the file names exactly as they are").
   Two panel names differ from the live R2 objects — the panel's
   how-plants-make-food-plant-… and how-plants-reproduce-plant-… ride on
   R2 WITHOUT the -plant infix, byte-matched to the panel's own sizes
   (159/172 kB) — the real R2 names are the truth and ride unchanged; the
   owner is told. Titles/alts transcribed off 7 labeled contact sheets
   (scripts/plants-sheets.py — all 42 faces read; the card printed "Plant
   Neighbours" keeps its British spelling verbatim). Inbound links:
   Classes 31, 36, 22 — all three link back. ---- */
page(PGP_PATH,'Plants & How They Grow for Kids — 41 Printable Plant Flashcards (Ages 4\\u20135)','Forty-one printable plant flashcards for ages 4\\u20135 on this one page in six shelves — growing, plant parts, plant care, flowers and seeds, wild places and plant defense — each card showing four labeled plant words a child can hold in one hand today: a seed to crack open, a celery race to run, a bud to watch burst, a root to count. Every card carries age, subject, level and skill pills plus Download and Print buttons on the full-resolution JPG, and the whole deck also prints from the /flashcards/plants-and-how-they-grow/ parents\\u2019 shelf.',crumb([['Learning Path','/learning-path/'],['Plants & How They Grow']])+pgpClassBody(),{schema:[ssBc(site,[['Learning Path','/learning-path/'],['Plants & How They Grow',PGP_PATH]])],ogImage:PGP_BASE+PGP_COVER.file,ogAlt:PGP_COVER.alt,ogW:PGP_COVER.w,ogH:PGP_COVER.h});
page('/flashcards/plants-and-how-they-grow/','Plants & How They Grow Flashcards to Print — 41 Plant Cards for Parents (Ages 4\\u20135)','The parents\\u2019 shelf for Class 48 \\u00b7 Plants & How They Grow: all forty-one plant flashcards for ages 4\\u20135 on one printable page — every card with its try-it job, an age, subject and level pill, a download button and one-tap printing, and no card pages to hop through. The child\\u2019s lesson lives in the Plants & How They Grow class.',crumb([['Flashcards','/flashcards/'],['Plants & How They Grow']])+pgpLibBody(),{schema:[ssBc(site,[['Flashcards','/flashcards/'],['Plants & How They Grow','/flashcards/plants-and-how-they-grow/']])],ogImage:PGP_BASE+PGP_COVER.file,ogAlt:PGP_COVER.alt,ogW:PGP_COVER.w,ogH:PGP_COVER.h});
"""
s = (ROOT / B).read_text()
if "page(PGP_PATH,'Plants & How They Grow for Kids" not in s:
    anchor = "page('/flashcards/caring-for-our-planet/'"
    i = s.find(anchor)
    assert i > 0, 'CFP shelf page call not found'
    j = s.find('});\n', i)
    assert j > 0
    j += len('});\n')
    s = s[:j] + CLASS_CALL + s[j:]
    (ROOT / B).write_text(s)
    print('ok build.mjs page calls inserted')
else:
    print('skip build.mjs page calls (already present)')

# 4. LP title/meta + homepage lede + About (in build they are single lines).
patch(B, [
 ("forty-seven age-guided classes from birth to age 5", "forty-eight age-guided classes from birth to age 5", 2),
 ("Forty-seven classes are ready now, from birth to age five", "Forty-eight classes are ready now, from birth to age five", 2),
])

# 5. LP row 48 after row 47 (anchor: end of the row-47 </div></div>).
s = (ROOT / B).read_text()
ROW48 = ('<div class="lp-row"><div class="lp-marker" aria-hidden="true"><span>48</span></div>'
 '<div class="lp-stage-card"><div class="fc-stage-pills"><span class="fc-age">Preschool</span>'
 '<span class="fc-class">Ages 4\u20135</span></div><h2>Preschool: Plants &amp; How They Grow</h2>'
 '<p class="lp-class">Class 48: <a href="/plants-and-how-they-grow/">Plants &amp; How They Grow</a></p>'
 '<p class="lp-hublink">The whole class lives at <a href="/plants-and-how-they-grow/">Plants &amp; How They Grow</a>'
 ' \u2014 forty-one printable plant flashcards in six shelves (growing, plant parts, plant care,'
 ' flowers &amp; seeds, wild places, plant defense), every card showing four labeled plant words a child'
 ' can hold in one hand today \u2014 a seed to crack, a celery race to run, a bud to watch burst \u2014'
 ' downloading and printing straight from the class page with age, subject, level and skill pills'
 ' \u2014 and the whole deck printing again from the <a href="/flashcards/plants-and-how-they-grow/">'
 'Plants &amp; How They Grow parents\u2019 shelf</a>.</p></div></div>')
if 'Class 48: <a href="/plants-and-how-they-grow/">' not in s:
    k = s.find('Class 47: <a href="/caring-for-our-planet/">Caring for Our Planet</a>')
    assert k > 0, 'LP row 47 not found'
    end = s.find('</div></div>', k)
    assert end > 0
    end += len('</div></div>')
    s = s[:end] + ROW48 + s[end:]
    (ROOT / B).write_text(s)
    print('ok LP row 48 inserted')
else:
    print('skip LP row 48 (already present)')

# 6. Image sitemap: two routeImg entries after the CFP pair.
patch(B, [(
 "routeImg.set('/flashcards/caring-for-our-planet/',[CFP_BASE+CFP_COVER.file,...CFP_ORDER.map(s=>CFP_BASE+cfpBySlug[s].file)]);",
 "routeImg.set('/flashcards/caring-for-our-planet/',[CFP_BASE+CFP_COVER.file,...CFP_ORDER.map(s=>CFP_BASE+cfpBySlug[s].file)]);\n"
 "routeImg.set(PGP_PATH,[PGP_BASE+PGP_COVER.file,...PGP_ORDER.map(s=>PGP_BASE+pgpBySlug[s].file)]);\n"
 "routeImg.set('/flashcards/plants-and-how-they-grow/',[PGP_BASE+PGP_COVER.file,...PGP_ORDER.map(s=>PGP_BASE+pgpBySlug[s].file)]);"
)])

# 7. Inbound links appended to Classes 31 / 36 / 22.
patch(B, [
 ("+ES_SCIENCE_LINK+CFP_SCIENCE_LINK+LL_CLASS_LINKS[C31_", "+ES_SCIENCE_LINK+CFP_SCIENCE_LINK+PGP_SCIENCE_LINK+LL_CLASS_LINKS[C31_"),
 ("alsHabitatsClassBody()+DINO_CLASS_LINK+CFP_HABITATS_LINK,{", "alsHabitatsClassBody()+DINO_CLASS_LINK+CFP_HABITATS_LINK+PGP_HABITATS_LINK,{"),
 ("sLesson.path]+CAF_FRUITS_LINK+HF_FRUITS_LINK,{", "sLesson.path]+CAF_FRUITS_LINK+HF_FRUITS_LINK+PGP_FRUITS_LINK,{"),
])

# ---------- the one-page "in order" copy across class modules ----------
for rel in ['src/family-friends.mjs','src/early-addition.mjs','src/position-direction.mjs','src/caring-planet.mjs']:
    patch(rel, [("the Learning Path holds all forty-seven in order", "the Learning Path holds all forty-eight in order")])

# ---------- About page ----------
patch('src/legal-pages.mjs', [
 ("Forty-seven classes from birth to age five are ready today", "Forty-eight classes from birth to age five are ready today"),
])

# ---------- all-pages registration ----------
patch('scripts/all-pages-dir.mjs', [
 ("'/early-addition-and-subtraction/','/caring-for-our-planet/',", "'/early-addition-and-subtraction/','/caring-for-our-planet/','/plants-and-how-they-grow/',"),
])

# ---------- hub filter tags ----------
patch('src/hub-filters.mjs', [
 ("'caring-for-our-planet':['age-4-5','lvl-prek','subj-science','skill-routines','skill-talking'],",
  "'caring-for-our-planet':['age-4-5','lvl-prek','subj-science','skill-routines','skill-talking'],\n 'plants-and-how-they-grow':['age-4-5','lvl-prek','subj-science','skill-vocab','skill-thinking'],"),
])

# ---------- tests: the no-invented-number lock moves to Class 49 ----------
patch('tests/science-lab.test.mjs', [
 ("assert.ok(!lp.includes('Class 48'),'no invented class number (Class 47 · Caring for Our Planet went live at /caring-for-our-planet/ on 2026-11-01 — numbered by the no-skip rule after Class 46 · Early Addition & Subtraction; the LP runs 1–47 with no gap);');",
  "assert.ok(!lp.includes('Class 49'),'no invented class number (Class 48 · Plants & How They Grow went live at /plants-and-how-they-grow/ on 2026-11-02 — numbered by the no-skip rule after Class 47 · Caring for Our Planet; the LP runs 1–48 with no gap);');"),
])

# ---------- tests: LP integrity 1–43 → 1–48 ----------
patch('tests/learning-path-integrity.test.mjs', [
 ("const APPROVED=[...Array(43).keys()].map(i=>i+1);", "const APPROVED=[...Array(48).keys()].map(i=>i+1);"),
 ("test('the Learning Path shows exactly the approved classes — unique, strictly increasing, no gap (1–43)',()=>{",
  "test('the Learning Path shows exactly the approved classes — unique, strictly increasing, no gap (1–48)',()=>{"),
 ("assert.deepEqual(nums,APPROVED,'sequence is exactly Classes 1–43, no gap');",
  "assert.deepEqual(nums,APPROVED,'sequence is exactly Classes 1–48, no gap');"),
])

print('ALL PATCHES APPLIED')
