#!/usr/bin/env python3
"""Class 41 wiring (owner 2026-10-31): build.mjs imports/kindFor/manners.js/
fcAllBySlug/FC_SECTIONS/page() calls (class + 41 short pages + parents'
shelf), LP row 41 + forty→forty-one counts + magic games → Class 17/20,
weather/LS/sequence-stories inbound links, hub-filters FC_TAGS, all-pages
room, extra-classes Dinosaurs row, magic modules' pills, First Glance
fg-more pointers, About count, float-to-top (markup+CSS+JS)."""
import io, sys

def sub(path, pairs, must_all=True):
    s = io.open(path, encoding='utf-8').read()
    for old, new in pairs:
        n = s.count(old)
        if n == 0:
            print(f'MISS in {path}: {old[:90]!r}')
            if must_all: sys.exit(1)
        elif n > 1:
            print(f'MULTI({n}) in {path}: {old[:90]!r}')
            if must_all: sys.exit(1)
        s = s.replace(old, new)
    io.open(path, 'w', encoding='utf-8').write(s)
    print('ok', path)

# ---------------- scripts/build.mjs ----------------
IMPORT = "import {TR_PATH,TR_BASE,TR_ORDER,TR_COVER,TR_CARDS,trClassBody,trShortBody,trBySlug,TR_LIFE_SKILLS_LINK,TR_WEATHER_LINK,TR_SEQ_LINK,trLibBody,TR_LIB_SET} from '../src/time-and-daily-routine.mjs';\n"
ANCH_HF_IMPORT = "import {HF_PATH,HF_BASE,HF_ORDER,HF_COVER,HF_CARDS,healthyFoodClassBody,hfShortBody,hfBySlug,HF_FRUITS_LINK,HF_LIFE_SKILLS_LINK,healthyFoodLibBody,HF_LIB_SET} from '../src/healthy-food.mjs';\n"

TR_SHELF_PAGE = "page('/flashcards/time-and-daily-routine/','Time & Daily Routine Flashcards to Print \\u2014 41 Time Cards for Parents (Ages 4\\u20135)','The parents\\u2019 shelf for Class 41 \\u00b7 Time & Daily Routine: all forty-one time-and-routine cards for ages 4\\u20135 on one printable page \\u2014 every card with its parent tip, an age, subject and level pill, a download button and one-tap printing, and no card pages to hop through. The child\\u2019s lesson lives in the Time & Daily Routine class.',crumb([['Flashcards','/flashcards/'],['Time & Daily Routine']])+heading('FLASHCARD SET \\u00b7 AGES 4\\u20135','Time & Daily Routine flashcards \\u2014 the parent shelf: 41 cards to download and print.','The whole time deck for printing at home: forty-one time-and-routine cards for ages four to five, each with its parent tip, its three pills \\u2014 age, subject, level \\u2014 its download button and one-tap printing; the library is the parents\\u2019 side of the class, so everything happens on this one shelf.')+trLibBody(),{schema:[ssBc(site,[['Flashcards','/flashcards/'],['Time & Daily Routine','/flashcards/time-and-daily-routine/']])],ogImage:TR_LIB_SET.coverUrl,ogAlt:TR_LIB_SET.cover.alt,ogW:TR_LIB_SET.cover.w,ogH:TR_LIB_SET.cover.h});\n"

TR_CLASS_PAGE = "/* CLASS 41 · Time & Daily Routine (owner 2026-10-31): the class page + one\n   short page per card (page slugs carried by the R2 file names, minus the\n   shared -flashcard-for-kids suffix) + the parents' shelf. Inbound links:\n   Class 32, Class 34, Sequence Stories and the First Glance Daily Routine\n   and Times of Day sheets point here; the class page links back to all\n   four. ---- */\npage(TR_PATH,'Class 41 \\u00b7 Time & Daily Routine \\u2014 41 Printable Time Cards for Kids (Ages 4\\u20135)','Forty-one printable time cards for ages 4\\u20135 in five shelves \\u2014 your day, the calendar, the parts of the day, the time words and the plan-and-patience skills \\u2014 every card carrying one rule a child can say back: first, next, last; now, soon, later; yesterday, today, tomorrow. Each card has its own short page with one way to try it today, starting from the waving cover boy.',crumb([['Learning Path','/learning-path/'],['Time & Daily Routine']])+trClassBody(),{schema:[ssBc(site,[['Learning Path','/learning-path/'],['Time & Daily Routine',TR_PATH]])],ogImage:TR_BASE+TR_COVER.file,ogAlt:TR_COVER.alt,ogW:TR_COVER.w,ogH:TR_COVER.h});\nfor(const s of TR_ORDER){\n const c=trBySlug[s];\n page(TR_PATH+s+'/',c.word+' \\u2014 Time & Routine Card, Practice & Ideas for Kids (Ages 4\\u20135)',c.word+' (Class 41 \\u00b7 Time & Daily Routine): the card\\u2019s rule \\u2014 \\u201c'+c.say+'\\u201d \\u2014 quoted word for word, plus one tiny thing to try today, with download, one-tap printing and a link back to the full class. Part of the 41-card Time & Daily Routine shelf.',trShortBody(s),{ogImage:TR_BASE+c.file,ogAlt:c.alt,ogW:c.w,ogH:c.h});\n}\n"

TR_LP_ROW = "<div class=\"lp-row\"><div class=\"lp-marker\" aria-hidden=\"true\"><span>41</span></div><div class=\"lp-stage-card\"><div class=\"fc-stage-pills\"><span class=\"fc-age\">Preschool</span><span class=\"fc-class\">Ages 4\u20135</span></div><h2>Preschool: Time &amp; Daily Routine</h2><p class=\"lp-class\">Class 41: <a href=\"/time-and-daily-routine/\">Time &amp; Daily Routine</a></p><p class=\"lp-hublink\">The whole class lives at <a href=\"/time-and-daily-routine/\">Time &amp; Daily Routine</a> \u2014 forty-one time cards in five shelves (my day, the calendar, the day parts, the time words, own it), one short page per card with the rule and one way to try it today \u2014 and the <a href=\"/first-glance/\">First Glance</a> Daily Routine and Times of Day sheets hold the youngest words.</p></div></div>"

FC_SECTION_TR = " /* CLASS 41 · TIME & DAILY ROUTINE (owner 2026-10-31): the parents' shelf —\n    the whole 41-card deck on ONE library page, Download + Print under every\n    image, three pills per card, a parent tip under each. Appended last so\n    the existing chip anchors never move. */\n ['Time & Daily Routine \\u00b7 Class 41','The time-and-daily-routine deck for parents to print: forty-one time cards for ages four to five \\u2014 the my-day shelf, the calendar shelf, the day-parts shelf, the time-words shelf and the own-it shelf \\u2014 every card with its parent tip, an age, subject and level pill, a download button and one-tap printing straight from the shelf, no card pages. The child\\u2019s lesson lives in the Time & Daily Routine class.',['time-and-daily-routine']]\n];"

TOTOP_BTN = "</footer><button type=\"button\" class=\"to-top\" data-to-top aria-label=\"Back to top\" hidden><svg aria-hidden=\"true\" width=\"12\" height=\"12\" viewBox=\"0 0 12 12\"><path d=\"M6 10V2M2 6l4-4 4 4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg><span>Top</span></button></body></html>";

sub('scripts/build.mjs', [
 # 1. import
 (ANCH_HF_IMPORT, ANCH_HF_IMPORT + IMPORT),
 # 2. kindFor
 (":p.startsWith('/staying-safe/')||p.startsWith('/healthy-food/')?'Class'",
  ":p.startsWith('/staying-safe/')||p.startsWith('/healthy-food/')||p.startsWith('/time-and-daily-routine/')?'Class'"),
 # 3. manners.js paths
 ("||path===SG_PATH?'<script src=\"/assets/manners.js\" defer></script>':''",
  "||path===SG_PATH||path==='/flashcards/time-and-daily-routine/'||path===TR_PATH||path.startsWith('/time-and-daily-routine/')?'<script src=\"/assets/manners.js\" defer></script>':''"),
 # 4. wall registry
 ("'healthy-food':HF_LIB_SET};", "'healthy-food':HF_LIB_SET,'time-and-daily-routine':TR_LIB_SET};"),
 # 5. FC_SECTIONS tail
 ("The child\\u2019s lesson lives in the Healthy Food class.',['healthy-food']]\n];",
  "The child\\u2019s lesson lives in the Healthy Food class.',['healthy-food']],\n" + FC_SECTION_TR),
 # 6. parents' shelf page after HF shelf
 ("+healthyFoodLibBody(),{schema:[ssBc(site,[['Flashcards','/flashcards/'],['Healthy Food & Eating Well','/flashcards/healthy-food/']])],ogImage:HF_LIB_SET.coverUrl,ogAlt:HF_LIB_SET.cover.alt,ogW:HF_LIB_SET.cover.w,ogH:HF_LIB_SET.cover.h});",
  "+healthyFoodLibBody(),{schema:[ssBc(site,[['Flashcards','/flashcards/'],['Healthy Food & Eating Well','/flashcards/healthy-food/']])],ogImage:HF_LIB_SET.coverUrl,ogAlt:HF_LIB_SET.cover.alt,ogW:HF_LIB_SET.cover.w,ogH:HF_LIB_SET.cover.h});\n" + TR_SHELF_PAGE),
 # 7. class page + short loop after HF loop
 ("hfShortBody(s),{ogImage:HF_BASE+c.file,ogAlt:c.alt,ogW:c.w,ogH:c.h});\n}",
  "hfShortBody(s),{ogImage:HF_BASE+c.file,ogAlt:c.alt,ogW:c.w,ogH:c.h});\n}\n" + TR_CLASS_PAGE),
 # 8. weather class inbound
 ("weatherSeasonsClassBody()+HALL_CLASS34_LINK,",
  "weatherSeasonsClassBody()+HALL_CLASS34_LINK+TR_WEATHER_LINK,"),
 # 9. life-skills class inbound
 ("+SS_LIFE_SKILLS_LINK+SSAFE_LIFE_SKILLS_LINK+HF_LIFE_SKILLS_LINK,",
  "+SS_LIFE_SKILLS_LINK+SSAFE_LIFE_SKILLS_LINK+HF_LIFE_SKILLS_LINK+TR_LIFE_SKILLS_LINK,"),
 # 10. sequence-stories inbound
 ("+sequenceStoriesBody(),{schema:[ssBc(site,[['Extra Classes','/extra-classes/'],['Sequence Stories',SS_PATH]])]",
  "+sequenceStoriesBody()+TR_SEQ_LINK,{schema:[ssBc(site,[['Extra Classes','/extra-classes/'],['Sequence Stories',SS_PATH]])]"),
 # 11. LP row 41 + counts + magic games numbers
 ("${extraClassesLpRow()}", TR_LP_ROW + "${extraClassesLpRow()}"),
 ("forty age-guided classes from birth to age 5'", "forty-one age-guided classes from birth to age 5'"),
 ("Forty classes are ready now, from birth to age five, in one calm sequence.",
  "Forty-one classes are ready now, from birth to age five, in one calm sequence."),
 ("Magic Shapes</a> (Class 3)", "Magic Shapes</a> (Class 17)"),
 ("Animal Sound Safari</a> (Class 6)", "Animal Sound Safari</a> (Class 20)"),
 # 12. homepage lede count
 ("Forty classes are ready now, from birth to age five \u2014 each one a short, parent-led session",
  "Forty-one classes are ready now, from birth to age five \u2014 each one a short, parent-led session"),
 # 13. float-to-top markup before </body>
 ("</footer></body></html>`;", TOTOP_BTN + "`;"),
])

# ---------------- src/hub-filters.mjs (FC_TAGS) ----------------
sub('src/hub-filters.mjs', [
 ("'healthy-food':['age-4-5','lvl-prek','subj-first-words','subj-feelings','skill-vocab','skill-routines','skill-talking'],",
  "'healthy-food':['age-4-5','lvl-prek','subj-first-words','subj-feelings','skill-vocab','skill-routines','skill-talking'],\n // CLASS 41 \\u00b7 Time & Daily Routine (owner 2026-10-31): the day's words ride\n // first-words, routines are the heart of the deck and the talking-together\n // skill carries the calendar.\n 'time-and-daily-routine':['age-4-5','lvl-prek','subj-first-words','subj-feelings','skill-vocab','skill-routines','skill-talking'],"),
])

# ---------------- scripts/all-pages-dir.mjs (room list) ----------------
sub('scripts/all-pages-dir.mjs', [
 ("if(['/music-room/','/kitchen/','/manners/','/question-words/','/staying-safe/','/healthy-food/','/sequence-stories/',",
  "if(['/music-room/','/kitchen/','/manners/','/question-words/','/staying-safe/','/healthy-food/','/time-and-daily-routine/','/sequence-stories/',"),
])

# ---------------- src/extra-classes.mjs (Dinosaurs in the LP bonus row) ----------------
sub('src/extra-classes.mjs', [
 ("<a href=\"/look-and-learn/\">Look &amp; Learn</a> (ages 2\u20135) \u00b7 <a href=\"/nature-club/\">Nature Club</a> (ages 3\u20136)",
  "<a href=\"/look-and-learn/\">Look &amp; Learn</a> (ages 2\u20135) \u00b7 <a href=\"/dinosaurs/\">Dinosaurs</a> (ages 3\u20135) \u00b7 <a href=\"/nature-club/\">Nature Club</a> (ages 3\u20136)"),
])

# ---------------- magic game modules (the owner's number fix) ----------------
sub('src/magic-shape-builder.mjs', [('<span class="fc-class">Class 3</span>', '<span class="fc-class">Class 17</span>')])
sub('src/magic-animal-playground.mjs', [('<span class="fc-class">Class 6</span>', '<span class="fc-class">Class 20</span>')])

# ---------------- src/first-glance.mjs (Daily Routine + Times of Day sheets) ----------------
sub('src/first-glance.mjs', [
 ("  :c.slug==='safety'?`<a class=\"fg-more\" href=\"/staying-safe/\">Every one of these words has a card: Class 39 \\u00b7 Staying Safe <span aria-hidden=\"true\">\u2197</span></a>`:'';",
  "  :c.slug==='safety'?`<a class=\"fg-more\" href=\"/staying-safe/\">Every one of these words has a card: Class 39 \\u00b7 Staying Safe <span aria-hidden=\"true\">\u2197</span></a>`\n  /* Owner cross-link (2026-10-31): the Daily Routine and Times of Day sheets\n     point to Class 41 \\u00b7 Time & Daily Routine. */\n  :c.slug==='daily-routine'?`<a class=\"fg-more\" href=\"/time-and-daily-routine/\">Every one of these steps has a card: Class 41 \\u00b7 Time &amp; Daily Routine <span aria-hidden=\"true\">\u2197</span></a>`\n  :c.slug==='times-of-day'?`<a class=\"fg-more\" href=\"/time-and-daily-routine/\">Morning to night has a whole class: Class 41 \\u00b7 Time &amp; Daily Routine <span aria-hidden=\"true\">\u2197</span></a>`:'';"),
])

# ---------------- src/legal-pages.mjs (About count) ----------------
sub('src/legal-pages.mjs', [
 ("Forty classes from birth to age five are ready today",
  "Forty-one classes from birth to age five are ready today"),
])

# ---------------- public/assets/style.css (float-to-top) ----------------
TOTOP_CSS = """
/* ---- Float-to-top (owner 2026-10-31: "i need float to top") ----
   A floating back-to-top pill on every page, house look: white card, ink
   border, offset shadow. Appears after 500px of scroll (site.js), respects
   prefers-reduced-motion, hidden from printers. */
.to-top{position:fixed;right:18px;bottom:18px;z-index:70;display:inline-flex;align-items:center;gap:7px;background:#fff;border:1.5px solid var(--ink);border-radius:999px;padding:9px 15px;font-size:12.5px;font-weight:700;color:var(--kiddo-purple);text-decoration:none;box-shadow:3px 3px 0 var(--kiddo-lavender);cursor:pointer;opacity:0;pointer-events:none;transform:translateY(8px);transition:opacity .2s,transform .2s,box-shadow .15s}
.to-top.is-visible{opacity:1;pointer-events:auto;transform:none}
.to-top:hover{transform:translate(-1px,-1px);box-shadow:4px 4px 0 var(--kiddo-lavender)}
.to-top svg{display:block}
@media(max-width:680px){.to-top{right:12px;bottom:12px;padding:8px 12px}}
@media print{.to-top{display:none}}
"""
s = io.open('public/assets/style.css', encoding='utf-8').read()
io.open('public/assets/style.css', 'w', encoding='utf-8').write(s + TOTOP_CSS)
print('ok public/assets/style.css (to-top appended)')

# ---------------- public/assets/site.js (float-to-top logic) ----------------
TOTOP_JS = """
/* Float-to-top (owner 2026-10-31: "i need float to top") — a floating
   back-to-top pill on every page; appears after 500px, scrolls home on
   tap (smooth unless prefers-reduced-motion), never printed. */
(() => {
  const btn = document.querySelector('[data-to-top]');
  if (!btn) return;
  btn.hidden = false;
  const toggle = () => btn.classList.toggle('is-visible', window.scrollY > 500);
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
  btn.addEventListener('click', () => {
    const calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: calm ? 'auto' : 'smooth' });
  });
})();
"""
s = io.open('public/assets/site.js', encoding='utf-8').read()
io.open('public/assets/site.js', 'w', encoding='utf-8').write(s + TOTOP_JS)
print('ok public/assets/site.js (to-top appended)')
