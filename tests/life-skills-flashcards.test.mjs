// Class 32 flashcards — regression guards for the owner's correction:
// the 28 life-skills Canva images are FLASHCARDS (paper), never worksheets,
// never interactive drawing pages, and cover.webp is never a card.
//   1. the set registry locks the EXACT 28 R2 filenames, in order
//   2. 29 built pages (set + 28 cards), unique SEO, real artwork
//   3. card pages are PAPER: no canvas, no tools — download/print/share,
//      prev/next, community feedback, honest schema
//   4. the set page: 28 whole-card links (no download buttons in the grid),
//      class-page link, cover fronts the set but is not a card
//   5. the Class 32 Learning Path page teaches all 28 skills with links to
//      every individual flashcard, and its ACTIVITY grid stays activities
//   6. the flashcards wall, Learning Path hub row, sitemap and search all
//      carry the set
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {join} from 'node:path';
import {execSync} from 'node:child_process';
import {lesson,meta,cards as lsCards} from '../src/flashcards/data-life-skills-and-good-habits.mjs';
import {fcSets,fcSetBySlug} from '../src/flashcards/index.mjs';

const root='dist';
const read=p=>readFileSync(join(root,p),'utf8');
const page=p=>readFileSync(join(root,p.replace(/\/+$/,''),'index.html'),'utf8');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const SET_URL='/flashcards/life-skills-and-good-habits/';
const CLASS_PAGE='preschool/4-years/life-skills-and-good-habits';

// The 28 filenames exactly as uploaded by the owner to
// school/preschool/4-years/life-skills-and-good-habits/ — probed live on R2
// (HEAD 200) and audited image-by-image against their artwork. Order is the
// set's teaching order, not the alphabetical folder order.
const R2_FILES=['wash-your-hands','brush-your-teeth','use-the-toilet','blow-your-nose','clean-up-after-eating','eat-healthy-food','get-dressed','put-on-your-shoes','pack-your-bag','put-clothes-away','sort-the-laundry','tidy-up-toys','water-the-plants','use-an-inside-voice','say-please-and-thank-you','say-excuse-me','use-gentle-hands','be-kind','share-your-toys','share-and-take-turns','wait-your-turn','listen-carefully','follow-directions','ask-for-help','take-deep-breaths','keep-your-room-safe','stay-with-a-grown-up','wear-your-seat-belt'];

const set=fcSetBySlug['life-skills-and-good-habits'];

test('the set is registered with exactly the 28 uploaded filenames — cover.webp is not a card',()=>{
 assert.ok(set,'life-skills-and-good-habits set registered');
 assert.equal(set.cards.length,28);
 assert.deepEqual(set.cards.map(c=>c.slug),R2_FILES,'card slugs are the uploaded filenames, in teaching order');
 assert.ok(!set.cards.some(c=>c.file==='cover.webp'),'cover is never a card');
 assert.ok(!existsSync(join(root,'flashcards/life-skills-and-good-habits/cover','index.html')),'no cover card page');
 for(const c of set.cards){assert.equal(c.w,1414);assert.equal(c.h,2000);}
 // every content block is present for every card
 for(const slug of R2_FILES){
  const d=lsCards[slug];
  assert.ok(d.word,'word for '+slug);
  assert.ok(d.intro.length>60,'intro for '+slug);
  assert.ok(d.say.length>20,'say for '+slug);
  assert.ok(d.try.length>40,'try for '+slug);
  assert.ok(d.note.length>40,'note for '+slug);
  assert.ok(d.teach.length>40,'teach blurb for '+slug);
  assert.ok(d.metaDescription.length>80,'unique meta for '+slug);
 }
 // no duplicate words or descriptions across the set
 const words=R2_FILES.map(s=>lsCards[s].word);
 assert.equal(new Set(words).size,28,'card words unique');
 assert.equal(new Set(R2_FILES.map(s=>lsCards[s].metaDescription)).size,28,'card metas unique');
});

test('29 pages built: the set page + one page per card, unique titles, canonicals and descriptions',()=>{
 for(const c of set.cards)assert.ok(existsSync(join(root,'flashcards/life-skills-and-good-habits',c.slug,'index.html')),c.slug+' page exists');
 const titles=new Set(),descs=new Set(),cans=new Set();
 for(const c of [ {slug:'',url:set.url,word:'SET'}, ...set.cards.map(x=>({...x,url:SET_URL+x.slug+'/'})) ]){
  const html=page('flashcards/life-skills-and-good-habits/'+c.slug);
  const t=html.match(/<title>(.*?)<\/title>/)[1];
  const d=html.match(/name="description" content="([^"]+)"/)[1];
  const can=html.match(/rel="canonical" href="([^"]+)"/)[1];
  assert.ok(!titles.has(t),'dup title '+t);titles.add(t);
  assert.ok(!descs.has(d),'dup desc '+c.slug);descs.add(d);
  assert.ok(!cans.has(can),'dup canonical '+can);cans.add(can);
  if(c.slug)assert.ok(can.endsWith(SET_URL+c.slug+'/'),'canonical for '+c.slug);
 }
 assert.equal(titles.size,29);
});

test('card pages are PAPER: no canvas, no tools, no draw hints — but full download/print/share/prev/next/feedback',()=>{
 for(const c of set.cards){
  const html=page('flashcards/life-skills-and-good-habits/'+c.slug);
  // the owner's rule: NO drawing canvas or drawing tools on flashcards
  // ('data-wc' is the mount attribute — the write-color <script src> in the
  // shared head loads on every page and is not a mount)
  for(const bad of ['data-wc','wc-mount','wc-canvas','class="wc-','#ls-tools','Save my work'])
   assert.ok(!html.includes(bad),bad+' must not appear on flashcard '+c.slug);
  // download points at the real R2 file, print + share exist
  assert.ok(html.includes(`href="${c.img}" download=`),'download button on '+c.slug);
  assert.ok(html.includes('data-tc-print-view'),'print button on '+c.slug);
  assert.ok(html.includes('fc2-share-btn'),'share buttons on '+c.slug);
  // prev/next cycle covers the whole set
  const prev=html.match(/class="fc2-pn-btn" href="([^"]+)" rel="prev"/)[1];
  const next=html.match(/class="fc2-pn-btn fc2-pn-next" href="([^"]+)" rel="next"/)[1];
  const i=R2_FILES.indexOf(c.slug);
  assert.ok(next===SET_URL+R2_FILES[(i+1)%28]+'/',c.slug+' next wraps correctly');
  assert.ok(prev===SET_URL+R2_FILES[(i+27)%28]+'/',c.slug+' prev wraps correctly');
  // community feedback mounted for THIS page, with the shared runtime
  assert.ok(html.includes('data-page-path="'+SET_URL+c.slug+'/"'),'community mount on '+c.slug);
  assert.ok(html.includes('How did your kiddo like this?'),'reactions on '+c.slug);
  assert.ok(html.includes('No parent reviews yet'),'honest empty reviews on '+c.slug);
  assert.ok(html.includes('No parent comments yet'),'honest empty comments on '+c.slug);
  assert.ok(html.includes('flashcards-community.js'),'feedback runtime on '+c.slug);
  // honest schema: card image is the og image; no fabricated ratings
  assert.ok(html.includes('property="og:image" content="'+c.img+'"'),'og:image is the card artwork on '+c.slug);
  assert.ok(!html.includes('aggregateRating'),'no fabricated ratings on '+c.slug);
  assert.ok(html.includes('"BreadcrumbList"'),'breadcrumbs on '+c.slug);
  // the card links home to the class
  assert.ok(html.includes('href="/preschool/4-years/life-skills-and-good-habits/"'),'class link on '+c.slug);
  // unique per-card alt text on the hero image
  assert.match(html,/alt="A life-skills flashcard: /,'descriptive alt on '+c.slug);
 }
});

test('the set page: 28 whole-card links with no download buttons in the grid, class link, four use ideas',()=>{
 const html=page('flashcards/life-skills-and-good-habits');
 assert.equal([...html.matchAll(/class="fc-card fc2-cardlink" href="[^"]+"/g)].length,28,'28 grid cards');
 assert.ok(!/class="fc-card[^"]*"[^>]*>[\s\S]{0,400}?download=/.test(html),'no download buttons inside the set grid');
 for(const c of set.cards)assert.ok(html.includes(`href="${SET_URL}${c.slug}/"`),'grid link '+c.slug);
 assert.equal([...html.matchAll(/<h1[ >]/g)].length,1,'one h1');
 assert.ok(html.includes('href="/preschool/4-years/life-skills-and-good-habits/"'),'set links the class');
 assert.ok(html.includes('These cards belong to'),'stage link');
 assert.ok(html.includes('data-page-path="'+set.url+'"'),'community mount scoped to set');
 assert.ok(html.includes('How did your kiddo like this?'),'reactions on set');
 assert.ok(!html.includes('cover.webp" width'),'cover is not repeated as a card figure');
});

test('the Class 32 page teaches all 28 skills with links to every individual flashcard',()=>{
 const html=page(CLASS_PAGE);
 assert.ok(html.includes('Teach every skill with its flashcard.'),'teach section present');
 for(const c of set.cards){
  assert.ok(html.includes(`href="${SET_URL}${c.slug}/"`),'class page links '+c.slug);
  assert.ok(html.includes(esc(lsCards[c.slug].teach)),'teach blurb for '+c.slug);
 }
 assert.ok(html.includes(`href="${SET_URL}"`),'class page links the full set');
 // the activity grid is untouched: 29 activity cards opening activity pages
 const grid=[...html.matchAll(/<a class="sa-card" href="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(grid.length,29,'the existing activity grid is intact');
 assert.ok(grid.every(h=>h.startsWith('/preschool/life-skills/')),'activity cards open activities');
});

test('the flashcards wall and the Learning Path row carry the set',()=>{
 const wall=page('flashcards');
 assert.ok(wall.includes('Preschool · Ages 4–5'),'wall section for Ages 4–5');
 assert.ok(wall.includes('href="/flashcards/life-skills-and-good-habits/"'),'wall set card');
 assert.ok(wall.includes('cover.webp'),'wall card fronts the real cover');
 const lp=read('learning-path/index.html');
 const rowPos=lp.indexOf('/flashcards/life-skills-and-good-habits/');
 const wsPos=lp.indexOf('/worksheets/life-skills/');
 assert.ok(rowPos>-1,'LP row has the flashcards link');
 assert.ok(wsPos>-1,'LP row keeps the worksheets link');
 assert.ok(rowPos<wsPos,'flashcards before worksheets on the Class 32 row');
});

test('sitemap and search index carry the set',()=>{
 const xml=read('sitemap.xml');
 assert.equal([...xml.matchAll(new RegExp(SET_URL.replace(/\//g,'\\/'),'g'))].length,29,'29 sitemap URLs');
 const si=JSON.parse(read('assets/search-index.json'));
 const entries=si.filter(e=>e.u.startsWith(SET_URL));
 assert.equal(entries.length,29,'29 search entries');
 assert.ok(entries.every(e=>e.k==='Flashcards'),'search kind is Flashcards');
});

test('all 28 card images + cover are live on R2 (GET probe — R2 HEAD lies)',()=>{
 const files=[...R2_FILES.map(f=>f+'.webp'),'cover.webp'];
 for(const f of files){
  const url=lesson.r2Base+f;
  const code=execSync(`curl -s -o /dev/null -w "%{http_code}" --max-time 20 -A "Mozilla/5.0" "${url}"`,{encoding:'utf8'}).trim();
  assert.equal(code,'200','R2 artwork live: '+f);
 }
});
