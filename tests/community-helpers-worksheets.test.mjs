// Class 33 · Community Helpers worksheets — the 35 GENUINE sheets (owner's
// Canva upload, verified on R2 under .../worksheets/, all 1545×2000 portrait,
// audited image by image). Two pages per sheet: the Learning Path ACTIVITY
// (drawing canvas aligned over the original art, save & restore, per-child
// progress) and the PRINTABLE library page (download / print / share, NO
// canvas). No flashcard is fabricated for the professions that only exist as
// worksheets (photographer, musician, flight attendant, school counselor,
// train conductor, cashier and friends).
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {execSync} from 'node:child_process';
import {communityWs,CH_WS_BASE,CH_WS_CLASS,CH_WS_LIB,CH_WS_COVER} from '../src/community-ws.mjs';

const read=p=>readFileSync('dist/'+p,'utf8');

test('the data carries exactly the 35 verified R2 sheets plus the separate cover',()=>{
 assert.equal(communityWs.length,35,'35 sheets');
 const expect='animal-shelter-worker artist baker barber bus-driver cashier chef construction-worker crossing-guard delivery-driver dentist doctor electrician farmer firefighter flight-attendant florist librarian lifeguard mail-carrier mechanic musician nurse paramedic park-ranger photographer pilot plumber police-officer sanitation-worker school-counselor scientist teacher train-conductor veterinarian'.split(' ').sort();
 assert.deepEqual(communityWs.map(w=>w.slug).sort(),expect,'slugs are the exact R2 filenames');
 for(const w of communityWs){
  assert.equal(w.w,1545,w.slug+' width (probed on R2)');
  assert.equal(w.h,2000,w.slug+' height (probed on R2)');
  assert.ok(w.file===w.slug+'.webp',w.slug+' file matches');
  assert.ok(w.steps.length===5,w.slug+' has 5 steps');
  for(const f of ['tag','meta','learn','know','why','say','look','ask','hint','tips','check','real'])
   assert.ok(w[f]&&w[f].length>40,w.slug+' field '+f);
  assert.ok(w.skills.length>=4,w.slug+' skills list');
 }
 assert.equal(CH_WS_COVER.file,'cover.webp','cover is separate, never a sheet');
});

test('all 35 ACTIVITY pages exist: canvas over the original sheet, per-child restore, guidance right',()=>{
 const seen=new Set();
 for(const w of communityWs){
  const p=CH_WS_CLASS+w.slug+'/';
  assert.ok(existsSync('dist'+p+'index.html'),'activity built: '+p);
  const h=read(p.slice(1)+'index.html');
  assert.ok(h.includes(`data-wc-src="${CH_WS_BASE}${w.file}?draw=1"`),'canvas mounts the ORIGINAL sheet on '+w.slug);
  assert.ok(h.includes('data-wc-w="1545" data-wc-h="2000"'),'canvas aligned to true dims on '+w.slug);
  assert.ok(h.includes('data-wc-restore="community-helpers/'+w.slug+'"'),'per-child restore key on '+w.slug);
  assert.ok(h.includes('data-wc-toolbar="#chws-tools"'),'toolbar wired on '+w.slug);
  for(const f of ['HOW TO DO IT','MY PROGRESS','PREFER PAPER?','What this worksheet teaches','Knowledge to have ready','Why this activity matters','What to say before you start','What to look for on the sheet','Questions to ask along the way','Helpful hints without giving it away','Parent tips','Understanding check','Real-life practice'])
   assert.ok(h.includes(f),`"${f}" block on activity ${w.slug}`);
  assert.ok(h.includes(w.steps.map(s=>s[1]).join('').slice(0,30))||h.includes(w.steps[0][1].slice(0,40)),'sheet-exact steps on '+w.slug);
  assert.ok(h.includes('rel="prev"')&&h.includes('rel="next"'),'prev/next on activity '+w.slug);
  assert.ok(new RegExp(`<title>[^<]*${w.title} — Community Helpers Worksheet Activity[^<]*</title>`).test(h),'activity SEO title on '+w.slug);
  assert.ok(!seen.has('a'+w.slug));seen.add('a'+w.slug);
  assert.ok(h.includes(CH_WS_LIB+w.slug+'/'),'links its printable twin on '+w.slug);
 }
});

test('all 35 PRINTABLE pages exist: no canvas, download + print + share, sheet-exact guidance',()=>{
 for(const w of communityWs){
  const p=CH_WS_LIB+w.slug+'/';
  assert.ok(existsSync('dist'+p+'index.html'),'printable built: '+p);
  const h=read(p.slice(1)+'index.html');
  assert.ok(!h.includes('data-wc'),'NO canvas on printable '+w.slug);
  assert.ok(h.includes(`src="${CH_WS_BASE}${w.file}"`),'original sheet shown on '+w.slug);
  assert.ok(h.includes('data-chws-download'),'download button on '+w.slug);
  assert.ok(h.includes('data-chws-print'),'print button on '+w.slug);
  for(const f of ['HOW TO USE IT','The five steps on the sheet.','What this worksheet teaches.','Tips, questions and practice.','MORE COMMUNITY HELPERS SHEETS'])
   assert.ok(h.includes(f),`"${f}" block on printable ${w.slug}`);
  assert.ok(h.includes(CH_WS_CLASS+w.slug+'/'),'links its on-screen twin on '+w.slug);
  assert.ok(h.includes('BreadcrumbList'),'structured data on '+w.slug);
 }
});

test('worksheet pages never link flashcards and never fabricate cards for worksheet-only helpers',()=>{
 const wsOnly=['cashier','flight-attendant','musician','photographer','school-counselor','train-conductor','animal-shelter-worker','park-ranger','barber','florist','delivery-driver','artist'];
 for(const s of wsOnly){
  assert.ok(!existsSync('dist/flashcards/community-helpers-and-our-neighborhood/'+s+'/index.html'),'NO fabricated flashcard for '+s);
 }
 for(const w of communityWs){
  const a=read(CH_WS_CLASS.slice(1)+w.slug+'/index.html');
  const p=read(CH_WS_LIB.slice(1)+w.slug+'/index.html');
  assert.ok(!a.includes('/flashcards/community-helpers-and-our-neighborhood/'),'activity page links no community-helpers flashcard: '+w.slug);
  assert.ok(!p.includes('/flashcards/community-helpers-and-our-neighborhood/'),'printable page links no community-helpers flashcard: '+w.slug);
 }
});

test('the collection page shows the original cover + all 35 sheets, no canvas, no grid downloads',()=>{
 const h=read(CH_WS_LIB.slice(1)+'index.html');
 assert.ok(h.includes(CH_WS_BASE+'cover.webp'),'original worksheet cover shown');
 assert.equal([...h.matchAll(/class="ws-card" href="[^"]+"/g)].length,35,'35 sheet cards');
 assert.ok(!h.includes('data-wc'),'no canvas on the collection');
 assert.ok(!h.includes('ws-dl'),'no download buttons inside the collection grid');
});

test('the hub renders the worksheet section with 35 activity cards + ribbons + collection link',()=>{
 const hub=read('preschool/4-years/community-helpers-and-our-neighborhood/index.html');
 assert.ok(hub.includes('Solve the Community Helpers worksheets'),'worksheet section present');
 assert.equal([...hub.matchAll(/data-chws-card="([a-z-]+)"/g)].length,35,'35 activity cards on the hub');
 assert.ok(hub.includes('data-chws-done'),'cleared ribbons wired on the hub');
 assert.ok(hub.includes('community-helpers-and-our-neighborhood/worksheets/doctor/'),'activities open under the class path');
});

test('the activity + printable + hub pages load the community-ws script; R2 art is live',()=>{
 for(const p of [CH_WS_CLASS+'doctor/',CH_WS_LIB+'doctor/',CH_WS_LIB.slice(1,-1),'/preschool/4-years/community-helpers-and-our-neighborhood/']){
  assert.ok(read(p.replace(/^\//,'').replace(/\/?$/,'/index.html')).includes('/assets/community-ws.js'),'community-ws.js loads on '+p);
 }
 const files=[...communityWs.slice(0,5).map(w=>w.file),'cover.webp'];
 for(const f of files){
  const code=execSync(`curl -s -o /dev/null -w "%{http_code}" --max-time 20 -A "Mozilla/5.0" "${CH_WS_BASE+f}"`,{encoding:'utf8'}).trim();
  assert.equal(code,'200','R2 worksheet art live: '+f);
 }
});
