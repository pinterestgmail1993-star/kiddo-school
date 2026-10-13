// The worksheet generator (/worksheet-generator/) — regression suite.
// Locks what the owner ordered 2026-10-13 ('can we make this with code like
// he made?' — the kiddoworksheets benchmark): two client-side machines
// (word search + math practice), built entirely in the browser:
//  - pure logic in public/assets/wsgen-core.js — tested here for real:
//    every word lands in the grid, sums always within their level,
//    subtraction never negative, custom word parsing strict;
//  - the page shell is server-rendered (options, tabs, copy) and loads the
//    two scripts; the sheet itself is drawn by wsgen.js at runtime;
//  - CSP law: no inline styles, no inline <script>, external files only;
//  - discoverable: sitemap + canonical, hub card on /worksheets/, footer
//    link, print CSS and grid classes present.
import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import assert from 'node:assert/strict';

await import('../public/assets/wsgen-core.js');
const W=globalThis.WSGEN;

const GEN='/worksheet-generator/';
const read=p=>readFileSync('dist'+p,'utf8');
const pageFile=p=>readFileSync('dist'+p+'index.html','utf8');

/* ---------- the pure logic (the actual generator) ---------- */

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

/* ---------- the page shell ---------- */

test('generator page: live at /worksheet-generator/, canonical, in sitemap, both machines server-rendered',()=>{
 const html=pageFile(GEN);
 assert.match(html,/rel="canonical" href="https:\/\/kiddo\.school\/worksheet-generator\/"/);
 assert.ok(read('/sitemap.xml').includes('https://kiddo.school'+GEN),'generator in sitemap');
 for(const bit of ['wsgen-panel-words','wsgen-panel-math','wsgen-theme','wsgen-custom',
  'wsgen-size','wsgen-dirs','wsgen-op','wsgen-level','wsgen-count',
  'wsgen-ws-key','wsgen-math-key','Shuffle a new puzzle','Word search','Math practice','noscript'])
  assert.ok(html.includes(bit),'page shell has '+bit);
 assert.ok(html.includes('Class 36')&&html.includes('Class 33')&&html.includes('Class 34'),'word shelves reference their classes');
});

test('generator page: loads both scripts, CSP-safe (no inline handlers, no inline script, no inline styles)',()=>{
 const html=pageFile(GEN);
 assert.ok(html.includes('src="/assets/wsgen-core.js?v='),'wsgen-core.js loaded + cache-busted');
 assert.ok(html.includes('src="/assets/wsgen.js?v='),'wsgen.js loaded + cache-busted');
 const main=html.slice(html.indexOf('<main'),html.indexOf('</main>'));
 assert.ok(!/ on[a-z]+="/.test(main),'no inline event handlers in the page body');
 assert.ok(!/<script(?! src)/.test(main.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g,'')),'no inline <script> beyond the JSON-LD head block');
 assert.ok(!/ style="/.test(main),'zero inline styles — CSP style-src \'self\' would kill them');
 assert.ok(readFileSync('dist/assets/wsgen-core.js','utf8').length>500,'wsgen-core.js shipped in dist');
 assert.ok(readFileSync('dist/assets/wsgen.js','utf8').length>2000,'wsgen.js shipped in dist');
});

test('generator wiring: /worksheets/ hub card first on the wall + footer link',()=>{
 const hub=pageFile('/worksheets/');
 const first=hub.indexOf('class="ws-cat');
 const gen=hub.indexOf('href="/worksheet-generator/"');
 assert.ok(gen>-1,'hub links the generator');
 assert.ok(hub.indexOf('Worksheet Generator')>-1&&hub.indexOf('ws-cat-gen')>-1,'generator card present');
 const firstCard=hub.slice(first-120,first+400);
 assert.ok(firstCard.includes('/worksheet-generator/'),'the generator card is the FIRST card on the hub');
 for(const p of ['/flashcards/','/worksheets/','/activities/']){
  const foot=read(p+'index.html').match(/<footer[\s\S]*<\/footer>/)[0];
  assert.ok(foot.includes('href="/worksheet-generator/"'),p+' footer links the generator');
 }
});

test('generator styling: grid size classes, pills, print rules all in style.css',()=>{
 const css=readFileSync('public/assets/style.css','utf8');
 for(const bit of ['.wsgen-grid-8','.wsgen-grid-10','.wsgen-grid-12','.wsgen-pill input:checked+span',
  '.wsgen-hit','.wsgen-blank','#wsgen-print','@media print','.wsgen-print-table','.wsgen-print-key',
  '.ws-cat-gen','@page{size:A4 portrait'])
  assert.ok(css.includes(bit),'style.css has '+bit);
});

test('generator JS: print root, canvas export and runtime rules present',()=>{
 const js=readFileSync('public/assets/wsgen.js','utf8');
 for(const bit of ["id='wsgen-print'",'wsgen-print','toBlob','createElement(\x27canvas\x27)','addEventListener','wsgen-hit'])
  assert.ok(js.includes(bit),'wsgen.js has '+bit);
 assert.ok(!js.includes('setAttribute(\x27style\x27')&&!js.includes('setAttribute("style"'),'never sets inline styles via setAttribute (CSP)');
 assert.ok(!/ on[a-z]+="/.test(js),'no inline handlers injected');
});
