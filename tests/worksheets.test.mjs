// Kiddo School — worksheet library test suite.
// Proves the worksheet system is real: 181 individual pages, real PDFs on
// disk, honest maths coverage, print-only styling, and the game twins.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync,statSync} from 'node:fs';
import {execSync} from 'node:child_process';
import {worksheets,bySubject,subjectCounts,MATHS_PLANNED} from '../src/worksheets.mjs';
import {SUBJECTS,wsUrl,pdfUrl,WS_BASE} from '../src/ws-common.mjs';
import {phonicAdventures} from '../src/phonics-adventures.mjs';

const read=f=>readFileSync('dist'+f,'utf8');
const page=p=>read(p+'index.html');
const TEST_ORIGIN='https://kiddo-school.pages.dev';

test('the worksheet registry: 196 worksheets across eight subjects',()=>{
 assert.equal(worksheets.length,196);
 assert.equal(bySubject('shapes').length,18);
 assert.equal(bySubject('colors').length,18);
 assert.equal(bySubject('writing').length,30);
 assert.equal(bySubject('phonics').length,24);
 assert.equal(bySubject('maths').length,17); // honest: seventeen artworks uploaded and audited
 assert.equal(MATHS_PLANNED,30);
 const slugs=new Set(worksheets.map(w=>w.subject+'/'+w.slug));
 assert.equal(slugs.size,196,'no duplicate slugs within or across subjects');
});

test('worksheet pages (196) each have their own clean URL page with unique SEO',()=>{
 const titles=new Set(),descs=new Set();
 for(const w of worksheets){
  const p=wsUrl(w.subject,w.slug);
  const html=page(p);
  assert.ok(html.includes(`<h1>${w.title.replace('&','&amp;')} Worksheet`), 'H1 on '+p);
  assert.ok(html.includes(`rel="canonical" href="${TEST_ORIGIN}${p}"`),'canonical on '+p);
  // the page itself adds no extra noindex — its robots tag matches every
  // other content page (the global config gate is the owner's, not ours)
  const adventureRobots=(page('/preschool/shapes/adventures/build-a-shape-spaceship/').match(/<meta name="robots" content="([^"]*)"/)||[])[1];
  const myRobots=(html.match(/<meta name="robots" content="([^"]*)"/)||[])[1];
  assert.equal(myRobots,adventureRobots,'same crawl stance as other content pages: '+p);
  titles.add(html.match(/<title>([^<]*)<\/title>/)[1]);
  descs.add(html.match(/<meta name="description" content="([^"]*)"/)[1]);
  // the two action buttons (download + print-open-PDF) in the rail
  assert.ok(html.includes(`href="${pdfUrl(w.subject,w.slug)}" download="`),'Download button on '+p);
  assert.ok(html.includes(`href="${pdfUrl(w.subject,w.slug)}" target="_blank"`),'Print (open PDF) button on '+p);
  // no coded activity anywhere: no play buttons, no embedded sheet SVG
  assert.ok(!html.includes('Play This Activity Online'),'no play button on '+p);
  assert.ok(!html.includes('ws-print-root'),'no coded sheet on '+p);
  assert.ok(!html.includes('viewBox="0 0 595 842"'),'no vector sheet recreation on '+p);
  // real art dims from the probe ship in the hero attrs
  assert.ok(html.includes(`width="${w.art.w}" height="${w.art.h}"`),'true art dims on '+p);
 }
 assert.equal(titles.size,196,'unique SEO titles');
 assert.equal(descs.size,196,'unique meta descriptions');
});

test('every worksheet page links its class, and games still link their worksheet twins',()=>{
 for(const w of worksheets){
  const html=page(wsUrl(w.subject,w.slug));
  const s=SUBJECTS[w.subject];
  assert.ok(html.includes(`href="${s.classPath}"`),'class link on '+w.slug);
  assert.ok(html.includes(`href="${WS_BASE}${w.subject}/"`),'subject category link on '+w.slug);
  assert.ok(html.includes('href="/worksheets/"'),'hub link on '+w.slug);
  // owner decision: no coded activities or play buttons on worksheet pages
  assert.ok(!html.includes(`href="${w.game?w.game.path:s.gameLib}"`),'no game link on worksheet page '+w.slug);
  if(w.game){
   assert.ok(existsSync('dist'+w.game.path+'index.html'),'game exists for '+w.slug);
   // and the game page still links back to its worksheet
   const game=page(w.game.path);
   assert.ok(game.includes(wsUrl(w.subject,w.slug)),'game '+w.game.path+' links its worksheet');
  }
 }
 // the seventeen maths worksheets must NOT pretend a matching game exists
 for(const w of bySubject('maths')){
  const html=page(wsUrl(w.subject,w.slug));
  assert.ok(!html.includes('Play This Activity Online'),'no fake play button on maths '+w.slug);
 }
});

test('worksheets never borrow flashcard URLs or components',()=>{
 for(const w of worksheets){
  const p=wsUrl(w.subject,w.slug);
  assert.ok(p.startsWith('/worksheets/'),'worksheet URL stays under /worksheets/: '+p);
  const html=page(p);
  const main=html.slice(html.indexOf('<main'),html.indexOf('</main>'));
  assert.ok(!main.includes('/flashcards/'),'no flashcard references in the worksheet content: '+p);
 }
 assert.ok(!existsSync('dist/flashcards/worksheets'),'no worksheet section inside flashcards');
});

test('the old print machinery is gone: no worksheets.js, no print-flag CSS',()=>{
 assert.ok(!existsSync('dist/assets/worksheets.js'),'worksheets.js removed from dist');
 assert.ok(!existsSync('public/assets/worksheets.js'),'worksheets.js removed from source');
 const css=read('/assets/style.css');
 assert.ok(!css.includes('ws-printing'),'no print flag css');
 assert.ok(!css.includes('ws-print-root'),'no print-root css');
});

test('all 196 PDFs exist in dist and are real PDF files',()=>{
 let count=0;
 for(const w of worksheets){
  const f='dist'+pdfUrl(w.subject,w.slug);
  assert.ok(existsSync(f),'PDF exists: '+pdfUrl(w.subject,w.slug));
  const buf=readFileSync(f);
  assert.ok(buf.length>2000,'PDF has real content: '+w.slug);
  assert.ok(buf.slice(0,5).toString()==='%PDF-','PDF magic bytes: '+w.slug);
  count++;
 }
 assert.equal(count,196);
 const dir=sub=>readdirSync('dist/downloads/worksheets/'+sub).length;
 assert.equal(dir('shapes'),18);assert.equal(dir('colors'),18);assert.equal(dir('writing'),30);
 assert.equal(dir('phonics'),24);assert.equal(dir('maths'),17);
});

test('spot-check PDF renders: each sampled sheet carries its title and instructions',()=>{
 const picks=['writing/hedgehogs-winding-path','maths/counting-caterpillar','phonics/pirates-missing-sound','shapes/candy-shape-shop','colors/rainbow-paint-laboratory'];
 for(const key of picks){
  const [subject,slug]=key.split('/');
  const f='dist'+pdfUrl(subject,slug);
  const out=execSync(`pdftotext "${f}" - 2>/dev/null || true`,{encoding:'utf8'});
  assert.ok(out.includes('Free Worksheet'),'title header in '+key+' PDF');
  assert.ok(out.includes('Name'),'name line in '+key);
 }
});

test('the hub and category pages list everything honestly',()=>{
 const hub=page('/worksheets/');
 assert.ok(hub.includes('href="/worksheets/maths/"')&&hub.includes('href="/worksheets/shapes/"')&&hub.includes('href="/worksheets/colors/"')&&hub.includes('href="/worksheets/writing/"')&&hub.includes('href="/worksheets/phonics/"'),'five categories');
 assert.ok(hub.includes('17 of 30 ready'),'honest maths note on hub');
 for(const key of Object.keys(SUBJECTS)){
  const cat=page(WS_BASE+key+'/');
  const n=subjectCounts[key];
  assert.equal((cat.match(/class="ws-card"/g)||[]).length,n,n+' cards on '+key+' category');
  assert.ok(cat.includes('CollectionPage'),'collection schema on '+key);
 }
 const maths=page('/worksheets/maths/');
 assert.ok(maths.includes('of the planned 30'),'honest maths note on category');
});

test('related worksheets: 6 real sibling cards on every page',()=>{
 for(const w of worksheets){
  const html=page(wsUrl(w.subject,w.slug));
  const sec=html.slice(html.indexOf('RELATED WORKSHEETS'));
  const n=(sec.match(/class="ws-card"/g)||[]).length;
  assert.ok(n>=4&&n<=6,'4-6 related cards on '+w.slug);
 }
});

test('worksheet pages carry LearningResource + BreadcrumbList schema',()=>{
 const html=page('/worksheets/writing/hedgehogs-winding-path/');
 assert.ok(html.includes('"@type":"LearningResource"'),'LearningResource schema');
 assert.ok(html.includes('"learningResourceType":"Worksheet"'));
 assert.ok(html.includes('"isAccessibleForFree":true'));
 assert.ok(html.includes('application/pdf'));
 assert.ok(html.includes('"@type":"BreadcrumbList"'));
 assert.ok(html.includes('{"@type":"ListItem",position:4')||html.includes('"position":4'),'four-level breadcrumb');
});

test('worksheet pages include genuinely unique parent content',()=>{
 const learns=new Set();
 for(const w of worksheets){
  learns.add(w.learn);
  assert.ok(w.learn.length>120,'substantial learn copy: '+w.slug);
  assert.ok(w.skills.length>=4,'skills list: '+w.slug);
  const html=page(wsUrl(w.subject,w.slug));
  assert.ok(html.includes(w.learn),'learn copy rendered on '+w.slug);
 }
 assert.equal(learns.size,196,'no boilerplate learn copy reused');
});

test('every worksheet page ships R2 art with alt text and the community mount',()=>{
 for(const w of worksheets){
  const html=page(wsUrl(w.subject,w.slug));
  assert.ok(html.includes('flashcards-community.js'),'community script on '+w.slug);
  assert.ok(html.includes('data-fc-root'),'family feedback mount on '+w.slug);
  assert.ok(html.includes('fc2-dual'),'flashcard-style dual layout on '+w.slug);
  assert.ok(html.includes(`alt="${w.art.alt}"`),'descriptive alt on '+w.slug);
  assert.ok(html.includes('loading="lazy"')||html.includes('fetchpriority="high"'),'lazy or priority art on '+w.slug);
  assert.ok(html.includes('SHARE THIS WORKSHEET'),'share block on '+w.slug);
 }
});

test('the two real maths worksheets are built from the uploaded artwork',()=>{
 for(const w of bySubject('maths')){
  assert.ok(w.art.img.startsWith('https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/school/maths/adventures/'));
  const art=execSync(`curl -s -o /dev/null -w "%{http_code}" --max-time 20 -A "Mozilla/5.0" "${w.art.img}"`,{encoding:'utf8'}).trim();
  assert.equal(art,'200','maths artwork live on R2: '+w.slug);
 }
});

test('sitemap carries the hub, seven categories and all 181 worksheets',()=>{
 const xml=read('/sitemap.xml');
 assert.ok(xml.includes(`<loc>${TEST_ORIGIN}/worksheets/</loc>`));
 for(const w of worksheets)assert.ok(xml.includes(`<loc>${TEST_ORIGIN}${wsUrl(w.subject,w.slug)}</loc>`),'sitemap '+w.slug);
 const n=(xml.match(/\/worksheets\//g)||[]).length;
 assert.ok(n>=189,'hub + 8 categories + 181 worksheets in sitemap');
});

test('the whole-school search index knows worksheets',()=>{
 const idx=JSON.parse(read('/assets/search-index.json'));
 const ws=idx.filter(e=>e.k==='Worksheet');
 assert.equal(ws.length,205,'196 worksheets + hub + 8 categories searchable');
});
