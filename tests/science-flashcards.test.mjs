// Class 31 flashcards — regression guards for the owner's spec:
// the 35 science Canva images are FLASHCARDS (paper) explaining WHAT each
// idea means — never worksheets, never drawing activities — and cover.webp
// is never a card. Purpose separation is locked here:
//   Learning Path Class 31 = HOW to explore (adventures, canvas, tools)
//   Flashcards             = WHAT it means, why it helps, try at home
//   /worksheets/science/   = untouched paper twins (no new worksheets)
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {join} from 'node:path';
import {execSync} from 'node:child_process';
import {lesson,meta,cards as sciCards} from '../src/flashcards/data-science-nature-and-discovery.mjs';
import {fcSets,fcSetBySlug} from '../src/flashcards/index.mjs';

const root='dist';
const read=p=>readFileSync(join(root,p),'utf8');
const page=p=>readFileSync(join(root,p.replace(/\/+$/,''),'index.html'),'utf8');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const SET_URL='/flashcards/science-nature-and-discovery/';
const CLASS_PAGE='preschool/4-years/science-nature-and-discovery';

// The 35 filenames exactly as uploaded by the owner, in the set's teaching
// order (animals → body → plants → weather → earth/space → forces). Dims are
// the probed true values: mixed portrait 1587×2245 / 1414×2000 and landscape
// 2000×1414 — all the same √2 paper family.
const CARDS=[
 ['ant',1587,2245],['bee',1414,2000],['snail',1414,2000],['spider',1414,2000],
 ['butterfly-caterpillar',1414,2000],['butterfly-life-cycle',1587,2245],['frog',1414,2000],['fish',2000,1414],
 ['bones',1414,2000],['eyes',1587,2245],['heart',1414,2000],['teeth',1414,2000],
 ['plant',1587,2245],['seed',1414,2000],['tree',2000,1414],['cactus',1587,2245],['mushroom',1587,2245],['pond',1414,2000],
 ['cloud',1414,2000],['rain',1587,2245],['rain-helps-plants',1414,2000],['rainbow',1414,2000],['wind',1414,2000],['ice',1414,2000],
 ['rock',1587,2245],['sun',1587,2245],['moon',2000,1414],['day-and-night',1587,2245],['volcano',2000,1414],['dinosaur-fossil',2000,1414],
 ['magnet-attracts-metal',1414,2000],['magnet',1587,2245],['sound',2000,1414],['shadow',1414,2000],['feather',1587,2245]
];

const set=fcSetBySlug['science-nature-and-discovery'];

test('the set is registered with exactly the 35 uploaded filenames, true dims, cover excluded',()=>{
 assert.ok(set,'science-nature-and-discovery set registered');
 assert.equal(set.cards.length,35);
 assert.deepEqual(set.cards.map(c=>c.slug),CARDS.map(c=>c[0]),'card slugs are the uploaded filenames, in teaching order');
 assert.ok(!set.cards.some(c=>c.file==='cover.webp'),'cover is never a card');
 assert.ok(!existsSync(join(root,'flashcards/science-nature-and-discovery/cover','index.html')),'no cover card page');
 for(const [slug,w,h] of CARDS){
  const c=set.cards.find(x=>x.slug===slug);
  assert.equal(c.w,w,slug+' true width');assert.equal(c.h,h,slug+' true height');
  const d=sciCards[slug];
  assert.ok(d.word,'word for '+slug);
  assert.ok(d.intro.length>80,'intro (what the child is learning) for '+slug);
  assert.ok(d.why.length>80,'why-it-helps for '+slug);
  assert.ok(d.say.length>25,'exploration question for '+slug);
  assert.ok(d.try.length>60,'home experiment for '+slug);
  assert.ok(d.note.length>60,'tip or fact for '+slug);
  assert.ok(d.spot.length>25,'class-page blurb for '+slug);
  assert.ok(d.metaDescription.length>90,'unique meta for '+slug);
 }
 const words=CARDS.map(c=>sciCards[c[0]].word);
 assert.equal(new Set(words).size,35,'card words unique');
 assert.equal(new Set(CARDS.map(c=>sciCards[c[0]].metaDescription)).size,35,'card metas unique');
 // purpose separation: the set page copy names the WHAT purpose
 assert.ok(set.h1.includes('flashcards'),'set h1 names flashcards');
});

test('36 pages built: the set page + one page per card, unique titles, canonicals, descriptions',()=>{
 for(const c of set.cards)assert.ok(existsSync(join(root,'flashcards/science-nature-and-discovery',c.slug,'index.html')),c.slug+' page exists');
 const titles=new Set(),descs=new Set(),cans=new Set();
 for(const c of [ {slug:'',url:set.url}, ...set.cards.map(x=>({...x,url:SET_URL+x.slug+'/'})) ]){
  const html=page('flashcards/science-nature-and-discovery/'+c.slug);
  const t=html.match(/<title>(.*?)<\/title>/)[1];
  const d=html.match(/name="description" content="([^"]+)"/)[1];
  const can=html.match(/rel="canonical" href="([^"]+)"/)[1];
  assert.ok(!titles.has(t),'dup title '+t);titles.add(t);
  assert.ok(!descs.has(d),'dup desc '+c.slug);descs.add(d);
  assert.ok(!cans.has(can),'dup canonical '+can);cans.add(can);
  if(c.slug)assert.ok(can.endsWith(SET_URL+c.slug+'/'),'canonical for '+c.slug);
 }
 assert.equal(titles.size,36);
});

test('card pages are PAPER and carry the five content blocks: what, why, say, try, note',()=>{
 for(const c of set.cards){
  const html=page('flashcards/science-nature-and-discovery/'+c.slug);
  for(const bad of ['data-wc','wc-mount','wc-canvas','class="wc-','#ls-tools','Save my work','pencil case','Your pencil'])
   assert.ok(!html.includes(bad),bad+' must not appear on science flashcard '+c.slug);
  // the five content elements
  assert.match(html,/alt="A science flashcard: /,'image alt on '+c.slug);
  assert.ok(html.includes('Why it helps a preschooler'),'why block on '+c.slug);
  assert.ok(html.includes(esc(sciCards[c.slug].why)),'why copy on '+c.slug);
  assert.ok(html.includes('Say it together'),'say block on '+c.slug);
  assert.ok(html.includes(esc(sciCards[c.slug].say)),'question copy on '+c.slug);
  assert.ok(html.includes('Try this'),'try block on '+c.slug);
  assert.ok(html.includes(esc(sciCards[c.slug].try)),'experiment copy on '+c.slug);
  assert.ok(html.includes('Quick parent note'),'note block on '+c.slug);
  assert.ok(html.includes(esc(sciCards[c.slug].note)),'fact copy on '+c.slug);
  // download/print/share, prev/next in teaching order, community, schema
  assert.ok(html.includes(`href="${c.img}" download=`),'download button on '+c.slug);
  assert.ok(html.includes('data-tc-print-view'),'print button on '+c.slug);
  assert.ok(html.includes('fc2-share-btn'),'share buttons on '+c.slug);
  const prev=html.match(/class="fc2-pn-btn" href="([^"]+)" rel="prev"/)[1];
  const next=html.match(/class="fc2-pn-btn fc2-pn-next" href="([^"]+)" rel="next"/)[1];
  const i=CARDS.findIndex(x=>x[0]===c.slug);
  assert.ok(next===SET_URL+CARDS[(i+1)%35][0]+'/',c.slug+' next follows teaching order');
  assert.ok(prev===SET_URL+CARDS[(i+34)%35][0]+'/',c.slug+' prev wraps correctly');
  assert.ok(html.includes('data-page-path="'+SET_URL+c.slug+'/"'),'community mount on '+c.slug);
  assert.ok(html.includes('How did your kiddo like this?'),'reactions on '+c.slug);
  assert.ok(html.includes('No parent reviews yet'),'honest empty reviews on '+c.slug);
  assert.ok(html.includes('No parent comments yet'),'honest empty comments on '+c.slug);
  assert.ok(html.includes('flashcards-community.js'),'feedback runtime on '+c.slug);
  assert.ok(html.includes('property="og:image" content="'+c.img+'"'),'og:image is the card artwork on '+c.slug);
  assert.ok(!html.includes('aggregateRating'),'no fabricated ratings on '+c.slug);
  assert.ok(html.includes('"BreadcrumbList"'),'breadcrumbs on '+c.slug);
  assert.ok(html.includes('href="/preschool/4-years/science-nature-and-discovery/"'),'class link on '+c.slug);
 }
});

test('the set page: 35 whole-card links, no download buttons in the grid, class link, distinct purpose copy',()=>{
 const html=page('flashcards/science-nature-and-discovery');
 assert.equal([...html.matchAll(/class="fc-card fc2-cardlink" href="[^"]+"/g)].length,35,'35 grid cards');
 assert.ok(!/class="fc-card[^"]*"[^>]*>[\s\S]{0,400}?download=/.test(html),'no download buttons inside the set grid');
 for(const [slug] of CARDS)assert.ok(html.includes(`href="${SET_URL}${slug}/"`),'grid link '+slug);
 assert.equal([...html.matchAll(/<h1[ >]/g)].length,1,'one h1');
 assert.ok(html.includes('href="/preschool/4-years/science-nature-and-discovery/"'),'set links the class');
 assert.ok(html.includes('These cards belong to'),'stage link');
 assert.ok(html.includes('data-page-path="'+set.url+'"'),'community mount scoped to set');
 assert.ok(!html.includes('cover.webp" width'),'cover is not repeated as a card figure');
});

test('the Class 31 page: 30 adventures are the MAIN content, ONE small flashcard resource section',()=>{
 const html=page(CLASS_PAGE);
 // the 35-card grid is gone — zero individual flashcard links, no grid marker
 for(const [slug] of CARDS)assert.ok(!html.includes(`href="${SET_URL}${slug}/"`),'no individual card link on the class page: '+slug);
 assert.ok(!html.includes('Open the flashcard'),'the flashcard grid marker is gone');
 // main content: 30 adventures on their own activity URLs
 const shelf=[...html.matchAll(/<a class="sa-card sa-card-slim" href="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(shelf.length,30,'all 30 adventures still shelved');
 assert.ok(shelf.every(h=>h.startsWith('/preschool/science/adventures/')),'adventures still open activity pages');
 // order: the adventures section comes BEFORE the small flashcard resource
 const advPos=html.indexOf('id="adventures"'),fcPos=html.indexOf('id="flashcards"');
 assert.ok(advPos>-1&&fcPos>advPos,'adventures come before the flashcard resource section');
 // the small section: purpose copy + original collection cover + exactly one collection link
 const secHtml=html.slice(fcPos).slice(0,html.slice(fcPos).indexOf('</section>'));
 assert.ok(secHtml.includes('Explore the Science Flashcards'),'resource section present');
 assert.ok(secHtml.includes('HOW')&&secHtml.includes('WHAT'),'purpose separation stated: LP = HOW, flashcards = WHAT');
 assert.ok(secHtml.includes(lesson.r2Base+'cover.webp'),'the original collection cover is shown');
 assert.equal([...secHtml.matchAll(new RegExp('href="'+SET_URL+'"','g'))].length,1,'exactly one collection link inside the resource section');
 assert.ok(html.includes('Prefer printed cards?'),'the small bottom paper-cards note stays');
 assert.ok(html.includes('href="/worksheets/science/"'),'worksheets library still linked');
 assert.ok(!/class="sa-card[^"]*"[^>]*href="\/flashcards\//.test(html),'no adventure card opens a flashcard');
});

test('the flashcards wall and the Learning Path row carry the set',()=>{
 const wall=page('flashcards');
 assert.ok(wall.includes('href="/flashcards/science-nature-and-discovery/"'),'wall set card');
 assert.ok(wall.includes('cover.webp'),'wall card fronts the real cover');
 const lp=read('learning-path/index.html');
 const sciRow=lp.slice(lp.indexOf('Class 31:'),lp.indexOf('Class 32:'));
 assert.ok(sciRow.includes('/flashcards/science-nature-and-discovery/'),'LP row 31 has the flashcards link');
 assert.ok(sciRow.includes('/worksheets/science/'),'LP row 31 keeps the worksheets link');
 assert.ok(sciRow.indexOf('Flashcards:')<sciRow.indexOf('Worksheets:'),'flashcards before worksheets on row 31');
});

test('sitemap and search index carry the set',()=>{
 const xml=read('sitemap.xml');
 assert.equal([...xml.matchAll(new RegExp(SET_URL.replace(/\//g,'\\/'),'g'))].length,36,'36 sitemap URLs');
 const si=JSON.parse(read('assets/search-index.json'));
 const entries=si.filter(e=>e.u.startsWith(SET_URL));
 assert.equal(entries.length,36,'36 search entries');
 assert.ok(entries.every(e=>e.k==='Flashcards'),'search kind is Flashcards');
});

test('all 35 card images + cover are live on R2 (GET probe — R2 HEAD lies)',()=>{
 for(const [slug] of CARDS){
  const url=lesson.r2Base+slug+'.webp';
  const code=execSync(`curl -s -o /dev/null -w "%{http_code}" --max-time 20 -A "Mozilla/5.0" "${url}"`,{encoding:'utf8'}).trim();
  assert.equal(code,'200','R2 artwork live: '+slug);
 }
 const cover=execSync(`curl -s -o /dev/null -w "%{http_code}" --max-time 20 -A "Mozilla/5.0" "${lesson.r2Base}cover.webp"`,{encoding:'utf8'}).trim();
 assert.equal(cover,'200','R2 cover live');
});
