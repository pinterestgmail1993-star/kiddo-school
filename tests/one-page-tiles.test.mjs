/* ONE-PAGE TILES (owner 2026-11-11 v2: "render them small — there is a lot of
   empty — told you make horizontal — you still making vertical"). The folded
   card / lesson items on the deck and class pages must be REBUILT as compact
   tiles (.op-tile) for the horizontal shelf: picture(s) first, then the
   title, the age/subject pills, the description and the download button UNDER
   the picture, and the teaching copy folded into a closed <details>. Books
   keep the full-width reader. The CSS shelf pins the small horizontal grid. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';

const read=p=>readFileSync(new URL('../dist'+p+(p.endsWith('/')?'index.html':''),import.meta.url),'utf8');
const tiles=h=>[...h.matchAll(/<article class="one-page-item op-tile" id="([a-z0-9-]+)">([\s\S]*?)<\/article>/g)];

test('the colors deck renders its 12 cards as tiles: both pictures, title, description, download under the picture',()=>{
 const h=read('/flashcards/colors/');
 const ts=tiles(h);
 assert.equal(ts.length,12,'twelve color tiles');
 for(const [,id,body] of ts){
  assert.ok(body.includes('class="op-media"'),id+' leads with its pictures');
  const media=body.slice(body.indexOf('class="op-media"'),body.indexOf('</h3>'));
  assert.equal((media.match(/<figure/g)||[]).length,2,id+' keeps splash + picture pair');
  const dlAt=body.indexOf('class="item-download"');
  const mediaEnd=body.indexOf('</div>',body.indexOf('class="op-media"'));
  assert.ok(dlAt>mediaEnd,id+' download sits under the picture');
  assert.ok(body.includes('data-sheet-act="download"')&&body.includes('data-sheet-act="print"')&&body.includes('data-sheet-act="share"'),id+' has Print, Download and Share');
  assert.ok(body.includes('<details class="op-more"><summary>Teaching tips</summary>'),id+' folds its teaching tips');
  const head=body.slice(0,body.indexOf('<details'));
  assert.ok(!head.includes('class="fc2-dual"')&&!head.includes('class="fc2-pair"'),id+' drops the old card-page wrappers at tile level');
 }
});

test('flashcard deck tiles carry pills and the real lede description (not the pill paragraph)',()=>{
 const h=read('/flashcards/transportation-and-vehicles/');
 const ts=tiles(h);
 assert.equal(ts.length,32,'thirty-two transport tiles');
 for(const [,id,body] of ts){
  assert.ok(body.includes('class="op-pills"'),id+' shows its pills');
  assert.ok(body.includes('fc-pill-age'),id+' keeps the age pill');
  assert.ok(body.includes('class="item-desc"'),id+' keeps a description');
  assert.ok(!/<p class="item-desc"><span class="fc-pill/.test(body),id+' description is text, not pills');
  assert.ok(body.includes('<details class="op-more"><summary>Teaching tips</summary>'),id+' folds its tips');
  assert.ok(!body.includes('class="fc2-lesson"'),id+' drops the from-the-class line');
 }
});

test('lesson pages do not repeat the flashcard shelf (owner 2026-11-11: lesson = class, flashcards = the parents\' downloads)',()=>{
 assert.equal(tiles(read('/preschool/4-years/sight-words/')).length,0,'no card tiles under the sight-words class');
 const shelf=tiles(read('/flashcards/sight-words/'));
 assert.ok(shelf.length>=52,'the flashcards shelf keeps every card ('+shelf.length+')');
for(const [,id,body] of shelf)assert.ok(body.includes('data-sheet-act="download"'),id+' has Download on the shelf');
});

test('NO DUPLICATES anywhere (owner 2026-11-12: "on lesson the flashcards are shown on bottom and written open the lesson? you dont make duplicates — whats the difference between lesson and library"): class pages carry zero card tiles, zero download bands and one line pointing at the library',()=>{
 for(const p of ['/baby/6-9-months/animals-everyday-objects/','/preschool/3-years/animals-and-their-sounds/','/toddler/2-years/animals-and-sounds/','/newborn/6-12-weeks/faces-and-visual-tracking/','/preschool/4-years/numbers-counting-and-early-math/','/preschool/4-years/sight-words/']){
  const h=read(p);
  assert.ok(!h.includes('one-page-item op-tile'),p+' has no deck dump at the bottom');
  assert.ok(!h.includes('Open the full lesson'),p+' has no open-the-lesson tiles');
  assert.ok(!h.includes('Download the card'),p+' has no per-card download band');
  assert.ok(h.includes('Prefer printed cards'),p+' keeps its single one-line pointer to the library');
 }
 const deck=tiles(read('/flashcards/animals-everyday-objects/'));
 assert.equal(deck.length,12,'the library deck keeps its twelve tiles');
 for(const [,id,body] of deck){
  assert.ok(body.includes('data-sheet-act="download"'),id+' keeps Download on the shelf');
  assert.ok(body.includes('data-sheet-act="print"')&&body.includes('data-sheet-act="share"'),id+' keeps Print and Share');
 }
 assert.ok(!deck.map(t=>t[1]).some(id=>read('/baby/6-9-months/animals-everyday-objects/').includes('id="'+id+'"')),'no deck card id repeats on the class page');
 /* room pages keep their own non-flashcard activities, but NO page anywhere
    still carries the duplicated card bands — the library is the one home of
    the shelf (site-wide sweep) */
 const caf=tiles(read('/cafeteria/'));
 assert.ok(caf.length===0,'the cafeteria repeats no flashcard cards ('+caf.length+')');
 assert.ok(tiles(read('/toddler/2-years/matching-and-sorting/')).length>=31,'non-flashcard game activities stay on the class page');
 const banned=['Open the full lesson','Download the card'];
 const walk=d=>readdirSync(new URL('../dist'+d,import.meta.url),{withFileTypes:true}).flatMap(e=>{
  const p=d+'/'+e.name;
  return e.isDirectory()?walk(p):(e.name.endsWith('.html')?[p]:[]);
 });
 const offenders=[];
 for(const f of walk('')){
  const h=read(f);
  for(const b of banned)if(h.includes(b))offenders.push(f+' says '+b);
 }
 assert.deepEqual(offenders,[],'no page anywhere says "'+banned.join('" or "')+'"');
 /* every deck card link points at the CLASS page itself, never a per-card lesson */
 for(const [,id,body] of deck){
  const m=body.match(/<a [^>]*href="(\/(?:baby|newborn|toddler|preschool)\/[^"]*)"[^>]*>([^<]+)/);
  if(m)assert.ok(!m[1].includes('/learn/')&&!m[1].includes('#'),id+' links the plain class page ('+m[1]+')');
 }
});

test('books stay full-width one-page items with their reader, never tiles',()=>{
 const h=read('/learning-library/');
 assert.equal((h.match(/<article class="one-page-item" id="/g)||[]).length,2,'both books plain');
 assert.ok(!h.includes('one-page-item op-tile'),'no tile on the library');
 assert.equal((h.match(/class="bk-noscript-grid"/g)||[]).length,2,'both readers intact');
});

test('the shelf CSS pins the small horizontal tile grid and the compact under-picture actions',()=>{
 const css=read('/assets/style.css');
 assert.ok(css.includes('.one-page-items{grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:18px;align-items:start}'),'horizontal shelf grid');
 assert.ok(css.includes('.one-page-item.op-tile'),'tile card styles');
 assert.ok(css.includes('.op-tile .op-media img'),'media cap');
 assert.ok(css.includes('.op-tile .item-download .button'),'compact button');
 assert.ok(css.includes('.op-tile .op-more'),'details styles');
 assert.ok(css.includes('.one-page-item{grid-column:1/-1;margin:0}'),'non-tiles keep full width');
});

test('no URL changed: the sitemap keeps its 305 pages',()=>{
 const s=read('/sitemap.xml');
 assert.equal((s.match(/<loc>/g)||[]).length,305,'sitemap unchanged');
});
