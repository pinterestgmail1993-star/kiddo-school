/* ONE-PAGE TILES (owner 2026-11-11 v2: "render them small — there is a lot of
   empty — told you make horizontal — you still making vertical"). The folded
   card / lesson items on the deck and class pages must be REBUILT as compact
   tiles (.op-tile) for the horizontal shelf: picture(s) first, then the
   title, the age/subject pills, the description and the download button UNDER
   the picture, and the teaching copy folded into a closed <details>. Books
   keep the full-width reader. The CSS shelf pins the small horizontal grid. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

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
  assert.ok(/<a class="button" [^>]*download=/.test(body),id+' keeps the download anchor');
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
 for(const [,id,body] of shelf)assert.ok(/<a class=\"button\" href=\"[^\"]+\" download=\"/.test(body),id+' has a download on the shelf');
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
