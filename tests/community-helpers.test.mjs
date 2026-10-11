// Class 33 · Community Helpers & Our Neighborhood — page-type law and content locks.
// Owner doctrine (2026-10-12): the class page is a compact HUB; every helper
// teaches on its own /learn/ page (original flashcard LEFT, step-by-step
// teaching RIGHT, NO canvas); the 29 library card pages are a separate
// WHAT/WHY/PRACTISE experience; NO worksheets until genuine artwork arrives.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {lesson,meta,cards} from '../src/flashcards/data-community-helpers.mjs';
import {lpContent} from '../src/flashcards/lp-community-helpers.mjs';
import {CH_CLASS_PATH} from '../src/community-helpers.mjs';

const read=p=>readFileSync('dist/'+p,'utf8');
const CLASS=CH_CLASS_PATH;
const LIB='/flashcards/community-helpers-and-our-neighborhood/';

test('the Class 33 data carries exactly the 29 verified R2 cards plus cover',()=>{
 const files=lesson.cards.map(c=>c.file).sort();
 assert.equal(files.length,29,'29 cards');
 assert.equal(lesson.cover.w,1414,'cover width (probed on R2)');
 assert.equal(lesson.cover.h,2000,'cover height (probed on R2)');
 for(const c of lesson.cards){
  assert.equal(c.w,1414,c.file+' width (probed on R2)');
  assert.equal(c.h,2000,c.file+' height (probed on R2)');
  assert.ok(!c.file.includes('cover'),'cover.webp is never counted as a card');
 }
 assert.equal(Object.keys(cards).length,29,'29 library card contents');
 assert.equal(Object.keys(lpContent).length,29,'29 Learning Path lessons');
 const slugs=lesson.cards.map(c=>c.file.replace(/\.webp$/,'')).sort();
 assert.deepEqual(Object.keys(lpContent).sort(),slugs,'lesson slugs match the real filenames');
 assert.deepEqual(Object.keys(cards).sort(),slugs,'library slugs match the real filenames');
 assert.ok(lesson.r2Base.endsWith('school/preschool/4-years/community-helpers-and-our-neighborhood/'),'r2 folder is the owner’s verified upload folder');
});

test('the Class 33 hub is a compact classroom: lesson nav + ONE collection link, no gallery, no canvas, no guides',()=>{
 const hub=read(CLASS.slice(1)+'index.html');
 assert.ok(existsSync('dist'+CLASS),'class page built');
 const learnLinks=[...hub.matchAll(/href="\/preschool\/4-years\/community-helpers-and-our-neighborhood\/learn\/([a-z-]+)\/"/g)].map(m=>m[1]);
 assert.equal(new Set(learnLinks).size,29,'29 unique lesson links on the hub');
 const libLinks=[...hub.matchAll(/href="(\/flashcards\/community-helpers-and-our-neighborhood\/[a-z-]+\/)"/g)].map(m=>m[1]);
 assert.equal(libLinks.length,0,'no individual library card links on the hub');
 // Two set-level links, exactly like Classes 31/32: the .fc-res resource section
 // (cover + button) plus the site-wide injected “Prefer printed cards?” pill.
 assert.equal((hub.match(/href="\/flashcards\/community-helpers-and-our-neighborhood\/"/g)||[]).length,2,'exactly the resource-section + injected-pill collection links');
 assert.ok(!hub.includes('data-wc'),'no drawing canvas on the hub');
 assert.ok(!hub.includes('fc2-cardlink'),'no flashcard gallery grid on the hub');
 assert.ok(!hub.includes('What is this?'),'no full teaching-guide blocks on the hub (lessons live on /learn/ pages)');
 assert.ok(hub.includes('cover.webp'),'the original collection cover appears once as the resource art');
 assert.ok(hub.includes('Class 33'),'class chip present');
});

test('all 29 Learning Path lessons exist with image left, teaching right, NO canvas',()=>{
 const slugs=lesson.cards.map(c=>c.file.replace(/\.webp$/,''));
 const seenTitles=new Set();
 for(const slug of slugs){
  const p=CLASS+'learn/'+slug+'/';
  assert.ok(existsSync('dist'+p+'index.html'),'lesson built: '+p);
  const h=read(p.slice(1)+'index.html');
  const card=lesson.cards.find(c=>c.file===slug+'.webp');
  const l=lpContent[slug];
  assert.ok(h.includes(`src="${lesson.r2Base}${slug}.webp"`),'original R2 flashcard displayed on '+slug);
  assert.ok(h.includes(`width="1414" height="2000"`),'aspect ratio preserved on '+slug);
  assert.ok(!h.includes('data-wc'),'no drawing canvas on '+slug);
  assert.ok(!h.includes('fc2-cardlink'),'no flashcard grid on '+slug);
  assert.ok(h.includes('LEARNING PATH LESSON'),'lesson eyebrow on '+slug);
  for(const f of ['What is this?','What does it mean?','Why this matters','Step by step','Say this to your child','Ask your child','Try it together','Understanding check'])
   assert.ok(h.includes(f),`"${f}" block on ${slug}`);
  assert.ok(h.includes('Words to learn'),'vocab block on '+slug);
  assert.ok(h.includes('Look closer at the picture'),'image-notice block on '+slug);
  assert.ok(h.includes('rel="prev"')&&h.includes('rel="next"'),'prev/next navigation on '+slug);
  assert.ok(new RegExp(`<title>[^<]*${l.seoTitle.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}[^<]*</title>`).test(h),'unique SEO title on '+slug);
  assert.ok(h.includes(`name="description" content="${l.metaDescription}`),'unique meta description on '+slug);
  assert.ok(h.includes('BreadcrumbList'),'structured data on '+slug);
  assert.ok(h.includes(LIB+slug+'/'),'links to its library card on '+slug);
  assert.ok(!seenTitles.has(l.seoTitle),'SEO titles are unique: '+l.seoTitle);
  seenTitles.add(l.seoTitle);
 }
});

test('lesson teaching content is genuinely unique per helper — no word-swapped clones',()=>{
 const slugs=Object.keys(lpContent);
 const sig=new Map();
 for(const s of slugs){
  const m=lpContent[s].mean;
  assert.ok(!sig.has(m),'two lessons share identical "What does it mean?" text: '+s+' vs '+sig.get(m));
  sig.set(m,s);
 }
 for(const s of slugs){
  const steps=lpContent[s].teach;
  assert.ok(steps.split('\n').length>=5,'at least 5 teaching steps for '+s);
  assert.ok(lpContent[s].play&&lpContent[s].play.length>60,'real practice activity for '+s);
  assert.ok(lpContent[s].say&&lpContent[s].say.length>40,'parent script for '+s);
 }
});

test('no inaccurate reassurances — the owner correction is enforced',()=>{
 for(const s of Object.keys(lpContent)){
  const blob=JSON.stringify(lpContent[s]).toLowerCase();
  assert.ok(!/never hurt/.test(blob),'banned reassurance "never hurt" in '+s);
 }
 for(const s of Object.keys(cards)){
  const blob=JSON.stringify(cards[s]).toLowerCase();
  assert.ok(!/never hurt/.test(blob),'banned reassurance "never hurt" in library card '+s);
 }
});

test('the 29 library card pages carry helper content, downloads and NO canvas',()=>{
 const slugs=lesson.cards.map(c=>c.file.replace(/\.webp$/,''));
 for(const slug of slugs){
  const h=read(LIB.slice(1)+slug+'/index.html');
  const c=cards[slug];
  assert.ok(h.includes('What is this community helper?'),'who block on '+slug);
  assert.ok(h.includes('What do they do?'),'job block on '+slug);
  assert.ok(h.includes('Why it helps a preschooler'),'why block on '+slug);
  assert.ok(h.includes('Say it together'),'say block on '+slug);
  assert.ok(h.includes('Try this'),'try block on '+slug);
  assert.ok(h.includes('Quick parent note'),'note block on '+slug);
  assert.ok(!h.includes('data-wc'),'no drawing canvas on library card '+slug);
  assert.ok(h.includes('Download card'),'download button on '+slug);
  assert.ok(h.includes('fcCommunityMount')||h.includes('data-fc-reactions')||h.includes('community'),'community mount on '+slug);
 }
 const set=read(LIB.slice(1)+'index.html');
 assert.equal((set.match(/fc2-cardlink/g)||[]).length,29,'collection grid shows exactly 29 cards');
 assert.ok(set.includes('cover.webp'),'collection cover present');
 assert.ok(!set.includes('Download card'),'no download buttons on the collection grid');
});

test('safety guidance ships where relevant, honestly phrased',()=>{
 const withSafety=['doctor','nurse','paramedic','police-officer','firefighter','crossing-guard','lifeguard','mail-carrier','bus-driver','pilot','farmer','chef','baker','gardener','veterinarian','scientist','dentist','sanitation-worker','hairdresser','carpenter','construction-worker','electrician','plumber','mechanic','bus-mechanic'];
 for(const s of withSafety){
  assert.ok(cards[s].safety&&cards[s].safety.length>40,'safety guidance on '+s);
  assert.ok(lpContent[s].safety&&lpContent[s].safety.length>40,'safety guidance on LP lesson '+s);
  const h=read(LIB.slice(1)+s+'/index.html');
  assert.ok(h.includes('Staying safe'),'safety block rendered on '+s);
 }
});

test('Class 33 is wired into navigation: LP row, stage hub, flashcards hub',()=>{
 const lp=read('learning-path/index.html');
 assert.ok(lp.includes('Class 33: <a href="/preschool/4-years/community-helpers-and-our-neighborhood/">'),'LP row after Class 32');
 const lp32=lp.indexOf('Class 32:'),lp33=lp.indexOf('Class 33:');
 assert.ok(lp32>-1&&lp33>lp32,'Class 33 sits after Class 32');
 const hub=read('preschool/4-years/index.html');
 assert.ok(hub.includes('Class 33'),'Age 4 stage hub carries the Class 33 card');
 const fc=read('flashcards/index.html');
 assert.ok(fc.includes(LIB),'collection listed on the Flashcards hub');
});

test('the 35 GENUINE worksheets ship: activity + printable + collection, verified artwork',()=>{
 // the owner's real Canva worksheet upload is verified on R2 (36 objects incl.
 // cover, all 1545×2000 image/webp) — the package ships now, with both page
 // types per sheet and no fabricated flashcards for the extra professions
 const ws=read('worksheets/community-helpers-and-our-neighborhood/index.html');
 assert.ok(existsSync('dist/worksheets/community-helpers-and-our-neighborhood/'),'worksheet collection built');
 const wsLinks=[...ws.matchAll(/href="\/worksheets\/community-helpers-and-our-neighborhood\/([a-z-]+)\/"/g)].map(m=>m[1]);
 assert.equal(new Set(wsLinks).size,35,'35 printable worksheets on the collection');
 assert.ok(ws.includes('cover.webp'),'the original worksheet cover is shown');
 assert.ok(ws.includes('data-wc')===false,'no canvas on the collection page');
 // hub: section 3 links all 35 activities, resource section links the collection
 const hub=read(CLASS.slice(1)+'index.html');
 const actLinks=[...hub.matchAll(/href="\/preschool\/4-years\/community-helpers-and-our-neighborhood\/worksheets\/([a-z-]+)\/"/g)].map(m=>m[1]);
 assert.equal(new Set(actLinks).size,35,'35 activity links on the hub');
 assert.ok(hub.includes('href="/worksheets/community-helpers-and-our-neighborhood/"'),'hub links the printable collection');
});
