// Class 32 · Life Skills & Good Habits — the 28 individual Learning Path
// teaching lessons (owner doctrine: the class page keeps only a compact nav;
// every skill teaches on its own /learn/ page — original flashcard LEFT,
// step-by-step teaching RIGHT, NO canvas; the 29 activities, the 29 printable
// worksheets and the 28 library card pages are untouched separate experiences).
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {lesson as lsLesson,cards as lsCards} from '../src/flashcards/data-life-skills-and-good-habits.mjs';
import {lpContent} from '../src/flashcards/lp-life-skills.mjs';

const read=p=>readFileSync('dist/'+p,'utf8');
const CLASS='/preschool/4-years/life-skills-and-good-habits/';
const LIB='/flashcards/life-skills-and-good-habits/';

test('the 28 lessons match the 28 uploaded flashcards exactly',()=>{
 const slugs=lsLesson.cards.map(c=>c.file.replace(/\.webp$/,'')).sort();
 assert.equal(slugs.length,28,'28 cards');
 assert.equal(Object.keys(lpContent).length,28,'28 lessons');
 assert.deepEqual(Object.keys(lpContent).sort(),slugs,'lesson slugs match the real filenames');
});

test('all 28 /learn/ lessons exist: flashcard + drawing canvas left, teaching right',()=>{
 const seen=new Set();
 for(const card of lsLesson.cards){
  const slug=card.file.replace(/\.webp$/,'');
  const p=CLASS+'learn/'+slug+'/';
  assert.ok(existsSync('dist'+p+'index.html'),'lesson built: '+p);
  const h=read(p.slice(1)+'index.html');
  const l=lpContent[slug];
  assert.ok(h.includes(`src="${lsLesson.r2Base}${card.file}?draw=1"`),'original R2 flashcard displayed with the drawing cache key on '+slug);
  assert.ok(h.includes('data-wc data-wc-src='),'drawing canvas mounted over the flashcard on '+slug);
  assert.ok(h.includes(`data-wc-restore="learn/life-skills-and-good-habits/${slug}"`),'per-child save & restore on '+slug);
  assert.ok(h.includes('data-wc-name='),'drawing tools mount named for the child on '+slug);
  assert.ok(h.includes('width="1414" height="2000"'),'aspect ratio preserved on '+slug);
  assert.ok(!h.includes('fc2-cardlink'),'no flashcard grid on '+slug);
  assert.ok(h.includes('LEARNING PATH LESSON'),'lesson eyebrow on '+slug);
  for(const f of ['What is this?','What does it mean?','Why this matters','Step by step','Say this to your child','Ask your child','Try it together','Understanding check','Look closer at the picture'])
   assert.ok(h.includes(f),`"${f}" block on ${slug}`);
  assert.ok(h.includes('rel="prev"')&&h.includes('rel="next"'),'prev/next on '+slug);
  assert.ok(new RegExp(`<title>[^<]*${l.seoTitle.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}[^<]*</title>`).test(h),'unique SEO title on '+slug);
  assert.ok(h.includes(`name="description" content="${l.metaDescription}`),'unique meta description on '+slug);
  assert.ok(h.includes('BreadcrumbList'),'structured data on '+slug);
  assert.ok(h.includes(LIB+slug+'/'),'links to its library card on '+slug);
  assert.ok(!seen.has(l.seoTitle),'SEO titles unique ('+slug+')');seen.add(l.seoTitle);
 }
});

test('lesson teaching content is genuinely unique per skill — no word-swapped clones',()=>{
 const sig=new Map();
 for(const s of Object.keys(lpContent)){
  const m=lpContent[s].mean;
  assert.ok(!sig.has(m),'two lessons share identical "What does it mean?" text: '+s+' vs '+sig.get(m));
  sig.set(m,s);
  assert.ok(lpContent[s].teach.split('\n').length>=5,'at least 5 teaching steps for '+s);
  assert.ok(lpContent[s].play&&lpContent[s].play.length>60,'practice activity for '+s);
  assert.ok(lpContent[s].say&&lpContent[s].say.length>40,'parent script for '+s);
 }
});

test('safety guidance ships on the skills that need it, honestly phrased',()=>{
 const withSafety=['use-the-toilet','blow-your-nose','clean-up-after-eating','eat-healthy-food','get-dressed','put-on-your-shoes','pack-your-bag','put-clothes-away','sort-the-laundry','tidy-up-toys','water-the-plants','say-please-and-thank-you','say-excuse-me','be-kind','share-your-toys','use-gentle-hands','ask-for-help','take-deep-breaths','keep-your-room-safe','stay-with-a-grown-up','wear-your-seat-belt','brush-your-teeth'];
 for(const s of withSafety){
  assert.ok(lpContent[s].safety&&lpContent[s].safety.length>40,'safety guidance on '+s);
  assert.ok(read(CLASS.slice(1)+'learn/'+s+'/index.html').includes('Staying safe'),'safety block rendered on '+s);
 }
});

test('no inaccurate reassurances anywhere in the Class 32 lessons',()=>{
 for(const s of Object.keys(lpContent)){
  assert.ok(!/never hurt/.test(JSON.stringify(lpContent[s]).toLowerCase()),'banned reassurance in '+s);
 }
});

test('the Class 32 hub links all 28 lessons and keeps activities + library separate',()=>{
 const hub=read(CLASS.slice(1)+'index.html');
 const learnLinks=[...hub.matchAll(new RegExp('href="\\/'+CLASS.slice(1).replace(/\//g,'\\/')+'learn\\/([a-z-]+)\\/"','g'))].map(m=>m[1]);
 assert.equal(new Set(learnLinks).size,28,'28 unique lesson links on the hub');
 assert.ok(!hub.includes('data-wc'),'no canvas on the hub');
 assert.equal([...hub.matchAll(/<a class="sa-card" href="([^"]+)"/g)].length,29,'29 activity cards intact on the hub');
 assert.ok(!hub.includes('What does it mean?'),'no full teaching-guide blocks on the hub');
});
