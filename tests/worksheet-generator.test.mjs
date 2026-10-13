// The worksheet generator — regression suite (hub + four machine pages).
// Locks what the owner ordered 2026-10-13 ('can we make this with code like
// he made?' + 'include all this what he included and let the download or
// solve on the screen too'): four client-side machines — word search, math
// practice, tracing, matching pairs — each on its own indexable page:
//  - pure logic in public/assets/wsgen-core.js — tested here for real:
//    every word lands in the grid, sums stay in their level, pairs carry a
//    valid solution, answer bubbles contain the right answer;
//  - wsgen.js runs word search + math; wsgen-more.js runs tracing + matching;
//  - every sheet: solve ON SCREEN, print (A4 print root), PNG download;
//  - CSP law: no inline styles, no inline <script>, external files only;
//  - discoverable: sitemap + canonical, hub card on /worksheets/, footer link.
import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import assert from 'node:assert/strict';

await import('../public/assets/wsgen-core.js');
const W=globalThis.WSGEN;

const HUB='/worksheet-generator/';
const MACHINES=['word-search','math-practice','tracing','matching-pairs'];
const read=p=>readFileSync('dist'+p,'utf8');
const pageFile=p=>readFileSync('dist'+p+'index.html','utf8');

/* ---------- the pure logic: word search + math (machine 1 & 2) ---------- */

test('wsgen-core: word search places EVERY word, readable forwards, grid fully filled',()=>{
 const words=['RABBIT','CAMEL','WHALE','PANDA','LION','FOX','OWL','FROG','DOLPHIN','PENGUIN'];
 for(let seed=1;seed<=25;seed++){
  const rng=W.mulberry32(seed);
  const built=W.buildWordSearch(words,10,false,rng);
  assert.ok(built,'seed '+seed+': all 10 words fit a 10×10 grid');
  const filled=W.fillGrid(built.grid,W.mulberry32(seed^0x9e3779b9));
  for(const row of filled)for(const ch of row)assert.match(ch,/^[A-Z]$/,'only A-Z letters in the grid');
  for(const p of built.placements){
   let found='';
   for(let i=0;i<p.word.length;i++)found+=filled[p.row+p.dr*i][p.col+p.dc*i];
   assert.equal(found,p.word,'seed '+seed+': '+p.word+' reads correctly in the grid');
  }
  assert.equal(built.placements.length,words.length,'every word placed');
 }
});

test('wsgen-core: easy mode only uses across/down; diagonals mode adds the two diagonals — never backwards',()=>{
 const dirsOk=(dr,dc,hard)=>hard
  ?(dr===0&&dc===1)||(dr===1&&dc===0)||(dr===1&&dc===1)||(dr===1&&dc===-1)
  :(dr===0&&dc===1)||(dr===1&&dc===0);
 for(const hard of [false,true]){
  for(let seed=1;seed<=10;seed++){
   const built=W.buildWordSearch(['ELEPHANT','TIGER','ZEBRA','BEAR','DEER'],8,hard,W.mulberry32(seed));
   assert.ok(built);
   for(const p of built.placements)assert.ok(dirsOk(p.dr,p.dc,hard),'direction '+p.dr+','+p.dc+' allowed (hard='+hard+')');
  }
 }
});

test('wsgen-core: custom word parsing — letters only, length-capped, deduped, max 12',()=>{
 const out=W.parseWords('Cat, DOG!! sun 42 CA the- elephant supersupercalifragious cAt',12,12);
 assert.ok(out.includes('CAT')&&out.includes('DOG')&&out.includes('SUN')&&out.includes('ELEPHANT'),'clean words kept');
 assert.equal(out.filter(w=>w==='CAT').length,1,'deduped case-insensitively');
 assert.ok(!out.includes('42'),'numbers dropped');
 assert.ok(out.every(w=>w.length<=12),'length capped at grid max');
 assert.equal(W.parseWords('one two three four five six seven eight nine ten eleven twelve thirteen fourteen',12,12).length,12,'capped at 12 words');
});

test('wsgen-core: math practice stays inside its level, subtraction never negative',()=>{
 for(const level of [10,20,100]){
  for(const op of ['add','sub','mixed']){
   for(let seed=1;seed<=15;seed++){
    const ps=W.makeMath(op,level,20,W.mulberry32(seed));
    assert.equal(ps.length,20);
    for(const p of ps){
     if(p.op==='+'){assert.equal(p.answer,p.a+p.b,'answer is a+b');assert.ok(p.answer<=level,'sum within '+level);}
     else{assert.equal(p.answer,p.a-p.b);assert.ok(p.answer>=0,'never negative');assert.ok(p.a<=level&&p.b<=p.a,'take-away stays inside its level');}
    }
   }
  }
 }
 const mixed=W.makeMath('mixed',10,40,W.mulberry32(7));
 assert.ok(mixed.some(p=>p.op==='+')&&mixed.some(p=>p.op==='-'),'mixed really mixes');
});

/* ---------- the pure logic: matching pairs + choices + tracing (machines 3 & 4) ---------- */

test('wsgen-core: matching pairs carry a valid solution, shuffled right column, every shelf works',()=>{
 for(const key of ['letters','numbers','helpers','homes','weather']){
  for(let seed=1;seed<=15;seed++){
   const m=W.makePairs(key,5,W.mulberry32(seed));
   assert.equal(m.left.length,5);assert.equal(m.right.length,5);assert.equal(m.solution.length,5);
   /* every right entry used exactly once — the columns are a permutation */
   assert.ok(new Set(m.right).size===5,'right column has no duplicates ('+key+')');
   /* the solution really pairs the right partner with each left card */
   for(let i=0;i<5;i++){
    if(key==='letters')assert.equal(m.right[m.solution[i]],m.left[i].toLowerCase(),'letters pair '+m.left[i]);
    else if(key==='numbers'){
     const n=parseInt(m.left[i],10);
     assert.equal(m.right[m.solution[i]].length,n,'number '+n+' pairs with '+n+' dots');
    }else assert.notEqual(m.left[i],m.right[m.solution[i]]);
   }
   /* right column must NOT be already in order (it is a real shuffle) */
   const shelfOrder=[...Array(5).keys()];
   assert.notDeepEqual(m.solution,shelfOrder,'seed '+seed+' '+key+': right column is genuinely shuffled');
  }
 }
 for(const key of ['letters','numbers','helpers','homes','weather']){
  const m8=W.makePairs(key,8,W.mulberry32(3));
  assert.equal(m8.left.length,8,'8 pairs when asked (shelf has enough)');
 }
});

test('wsgen-core: answer bubbles always contain the right answer + two distinct in-range neighbours',()=>{
 for(const answer of [0,1,3,7,10,20]){
  for(let seed=1;seed<=15;seed++){
   const ch=W.makeChoices(answer,20,W.mulberry32(seed));
   assert.equal(ch.length,3,'three bubbles');
   assert.ok(ch.includes(answer),'right answer is among the bubbles');
   assert.equal(new Set(ch).size,3,'no duplicate bubbles');
   assert.ok(ch.every(v=>v>=0&&v<=20),'all bubbles inside 0..20');
  }
 }
});

test('wsgen-core: tracing parsers clean free text; shelves exist for the word tracer',()=>{
 assert.equal(W.parseTrace('Em-my  O\'Neil!',12),'EM MY O NEIL','letters/digits/spaces only, uppercased, separators become spaces');
 assert.equal(W.parseTrace('ABCDEFGHIJKL',12),'ABCDEFGHIJKL');
 assert.equal(W.parseTrace('ABCDEFGHIJKLM',12),'ABCDEFGHIJKL','capped at 12 chars');
 assert.deepEqual(W.traceWords('cat, DOG!! the elephant supersupercalifragious cat',5,10),['CAT','DOG','THE','ELEPHANT'],'2..10-letter words, deduped, capped');
 for(const key of ['habitats','helpers','weather','colors','numbers']){
  const shelf=W.TRACE_SHELVES[key];
  assert.ok(Array.isArray(shelf)&&shelf.length>=6&&shelf.every(w=>/^[A-Z]{2,10}$/.test(w)),key+' tracing shelf ready');
 }
});

/* ---------- the pages: hub + four machines ---------- */

test('generator hub: live, canonical, in sitemap, links all four machine pages',()=>{
 const html=pageFile(HUB);
 assert.match(html,/rel="canonical" href="https:\/\/kiddo\.school\/worksheet-generator\/"/);
 for(const m of MACHINES){
  assert.ok(html.includes('href="/worksheet-generator/'+m+'/"'),'hub links /worksheet-generator/'+m+'/');
  assert.ok(read('/sitemap.xml').includes('https://kiddo.school/worksheet-generator/'+m+'/'),m+' in sitemap');
  assert.match(pageFile('/worksheet-generator/'+m+'/'),new RegExp('rel="canonical" href="https://kiddo\\.school/worksheet-generator/'+m+'/"'),m+' canonical');
 }
 assert.ok(!html.includes('wsgen-tab'),'tabs are gone — each machine has its own page now');
 assert.ok(html.includes('Four little machines'),'hub copy present');
});

test('word search page: full option set + solve/print/download actions server-rendered',()=>{
 const html=pageFile('/worksheet-generator/word-search/');
 for(const bit of ['wsgen-theme','wsgen-custom','wsgen-size','wsgen-dirs','wsgen-ws-key',
  'wsgen-ws-shuffle','wsgen-ws-solve','wsgen-ws-print','wsgen-ws-png','wsgen-ws-png-key',
  'wsgen-ws-sheet','wsgen-ws-status','Solve on screen','noscript'])
  assert.ok(html.includes(bit),'word search shell has '+bit);
 assert.ok(html.includes('Class 36')&&html.includes('Class 33')&&html.includes('Class 34'),'word shelves reference their classes');
});

test('math page: option set + solve/print/download actions server-rendered',()=>{
 const html=pageFile('/worksheet-generator/math-practice/');
 for(const bit of ['wsgen-op','wsgen-level','wsgen-count','wsgen-math-key',
  'wsgen-math-shuffle','wsgen-math-solve','wsgen-math-print','wsgen-math-png','wsgen-math-png-key',
  'wsgen-math-sheet','wsgen-math-status','Solve on screen','noscript'])
  assert.ok(html.includes(bit),'math shell has '+bit);
});

test('tracing page: modes, name input, shelves, finger pad server-rendered',()=>{
 const html=pageFile('/worksheet-generator/tracing/');
 for(const bit of ['wsgen-tmode','wsgen-tcase','wsgen-tletters','wsgen-tname','wsgen-tshelf',
  'wsgen-ttitle','wsgen-trace-shuffle','wsgen-trace-print','wsgen-trace-png',
  'wsgen-trace-sheet','wsgen-trace-canvas','wsgen-trace-chips','wsgen-trace-clear','wsgen-trace-next',
  'wsgen-tletters-wrap','wsgen-tname-wrap','wsgen-twords-wrap','noscript'])
  assert.ok(html.includes(bit),'tracing shell has '+bit);
});

test('matching page: shelves, pair counts, solve/print/download actions server-rendered',()=>{
 const html=pageFile('/worksheet-generator/matching-pairs/');
 for(const bit of ['wsgen-mshelf','wsgen-mcount','wsgen-mtitle','wsgen-match-key',
  'wsgen-match-shuffle','wsgen-match-solve','wsgen-match-print','wsgen-match-png','wsgen-match-png-key',
  'wsgen-match-sheet','wsgen-match-status','Solve on screen','noscript'])
  assert.ok(html.includes(bit),'matching shell has '+bit);
});

test('every generator page: CSP-safe (right scripts, no inline handlers/script/styles)',()=>{
 for(const p of [HUB,...MACHINES.map(m=>HUB+m+'/')]){
  const html=pageFile(p);
  const main=html.slice(html.indexOf('<main'),html.indexOf('</main>'));
  assert.ok(!/ on[a-z]+="/.test(main),p+' — no inline event handlers');
  assert.ok(!/<script(?! src)/.test(main.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g,'')),p+' — no inline <script>');
  assert.ok(!/ style="/.test(main),p+' — zero inline styles (CSP style-src \'self\' would kill them)');
  if(p===HUB+'word-search/'||p===HUB+'math-practice/'){
   assert.ok(html.includes('src="/assets/wsgen-core.js?v='),p+' loads wsgen-core.js cache-busted');
   assert.ok(html.includes('src="/assets/wsgen.js?v='),p+' loads wsgen.js cache-busted');
   assert.ok(!html.includes('wsgen-more.js'),p+' does not load wsgen-more.js');
  }
  if(p===HUB+'tracing/'||p===HUB+'matching-pairs/'){
   assert.ok(html.includes('src="/assets/wsgen-core.js?v='),p+' loads wsgen-core.js cache-busted');
   assert.ok(html.includes('src="/assets/wsgen-more.js?v='),p+' loads wsgen-more.js cache-busted');
   assert.ok(!html.includes('"wsgen.js'),p+' does not load wsgen.js');
  }
 }
 assert.ok(readFileSync('dist/assets/wsgen-core.js','utf8').length>2000,'wsgen-core.js shipped');
 assert.ok(readFileSync('dist/assets/wsgen.js','utf8').length>8000,'wsgen.js shipped');
 assert.ok(readFileSync('dist/assets/wsgen-more.js','utf8').length>8000,'wsgen-more.js shipped');
});

test('generator wiring: /worksheets/ hub card first on the wall (four machines) + footer link',()=>{
 const hub=pageFile('/worksheets/');
 const first=hub.indexOf('class="ws-cat');
 const gen=hub.indexOf('href="/worksheet-generator/"');
 assert.ok(gen>-1,'hub links the generator');
 assert.ok(hub.indexOf('Worksheet Generator')>-1&&hub.indexOf('ws-cat-gen')>-1,'generator card present');
 const firstCard=hub.slice(first-120,first+1100);
 assert.ok(firstCard.includes('/worksheet-generator/'),'the generator card is the FIRST card on the hub');
 assert.ok(firstCard.includes('Tracing sheet maker')&&firstCard.includes('Matching pairs maker'),'card lists all four machines');
 for(const p of ['/flashcards/','/worksheets/','/activities/']){
  const foot=read(p+'index.html').match(/<footer[\s\S]*<\/footer>/)[0];
  assert.ok(foot.includes('href="/worksheet-generator/"'),p+' footer links the generator');
 }
});

test('generator styling: solve modes, tracing, matching, print rules all in style.css',()=>{
 const css=readFileSync('public/assets/style.css','utf8');
 for(const bit of ['.wsgen-grid-8','.wsgen-grid-10','.wsgen-grid-12','.wsgen-pill input:checked+span',
  '.wsgen-hit','.wsgen-blank','#wsgen-print','@media print','.wsgen-print-table','.wsgen-print-key',
  '.ws-cat-gen','@page{size:A4 portrait',
  /* solve on screen */
  '.wsgen-live','.wsgen-pick','.wsgen-found','.wsgen-nope','wsgen-shake','.wsgen-bubble.is-right','.wsgen-bubble.is-wrong','.wsgen-chip.is-done',
  /* matching pairs */
  '.wsgen-match-cols','.wsgen-match-item','.wsgen-match-lines','.wsgen-match-item.is-matched',
  /* tracing */
  '.wsgen-trace-row','.wsgen-tracepad','.wsgen-trace-canvas','.wsgen-trace-chip',
  /* hub cards + print additions */
  '.wsgen-hubcard','.wsgen-actions-center','.wsgen-print-cols','.wsgen-print-item','.wsgen-print-keypair'])
  assert.ok(css.includes(bit),'style.css has '+bit);
});

test('generator JS: solve logic, print roots, canvas export and runtime rules present',()=>{
 const js=readFileSync('public/assets/wsgen.js','utf8');
 for(const bit of ["id='wsgen-print'",'wsgen-print','toBlob','createElement(\x27canvas\x27)','addEventListener','wsgen-hit',
  'wsSolveToggle','mathSolveToggle','wsgen-found','makeChoices'])
  assert.ok(js.includes(bit),'wsgen.js has '+bit);
 assert.ok(!js.includes('setAttribute(\x27style\x27')&&!js.includes('setAttribute("style"'),'wsgen.js never sets inline styles (CSP)');
 assert.ok(!/ on[a-z]+="/.test(js),'wsgen.js injects no inline handlers');
 const more=readFileSync('public/assets/wsgen-more.js','utf8');
 for(const bit of ["id='wsgen-print'",'toBlob','addEventListener',
  'traceRowSvg','stroke-dasharray','wsgen-trace-canvas','pointerdown',
  'matchSolveToggle','drawBoardLine','wsgen-match-lines','createElementNS'])
  assert.ok(more.includes(bit),'wsgen-more.js has '+bit);
 assert.ok(!more.includes('setAttribute(\x27style\x27')&&!more.includes('setAttribute("style"'),'wsgen-more.js never sets inline styles (CSP)');
 assert.ok(!/ on[a-z]+="/.test(more),'wsgen-more.js injects no inline handlers');
 /* tracing rows must be SVG with dasharray (dashed trace shapes), not filled copies */
 assert.ok(more.includes("setAttribute('stroke-dasharray','7 7')"),'dashed trace outlines via SVG attributes');
});
