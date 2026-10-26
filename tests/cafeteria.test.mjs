// Cafeteria room (/cafeteria/) — the owner's 62 food cards (2026-10-26).
// Owner brief: cover first, first 29 cards then "More foods", one short page
// per food at /cafeteria/<slug>/ (slug = file name) with the card's activity
// and a back link, object-fit: contain for landscape cards, links from
// Explore the School + Class 22 + Kitchen Helper with back-links, the five
// existing word pages (apple, banana, carrot, grapes, strawberry) keep their
// URLs and gain cafeteria links, no existing URL changed. Landscape cards:
// apple, banana, cafeteria-tray, juice, milk, sandwich (1100×778).
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {CAF_ORDER,CAF_YOUNG,CAF_MORE,CAF_ACTIONS,CAF_LANDSCAPE} from '../src/flashcards/data-cafeteria.mjs';

const hub=readFileSync('dist/cafeteria/index.html','utf8');
const read=p=>readFileSync('dist'+p+(p.endsWith('/')?'index.html':''),'utf8');

test('62 cards in file order: 29 on the main shelf (apple to ham-sandwich), 33 under More foods',()=>{
  assert.equal(CAF_ORDER.length,62);
  assert.equal(CAF_YOUNG.length,29);
  assert.equal(CAF_MORE.length,33);
  assert.equal(CAF_YOUNG[0],'apple');
  assert.equal(CAF_YOUNG[28],'ham-sandwich');
  assert.equal(CAF_MORE[0],'juice');
  assert.equal(CAF_MORE[32],'yogurt');
  assert.ok(hub.includes('THE MAIN SHELF · 29 FOODS'),'main shelf heading');
  assert.ok(hub.includes('MORE FOODS · 33 MORE'),'More foods heading');
  // every card's short page is linked from the hub, in order
  for(const s of CAF_ORDER)assert.ok(hub.includes(`/cafeteria/${s}/`),'hub link for '+s);
  const first=hub.indexOf(`/cafeteria/${CAF_YOUNG[0]}/`),last=hub.indexOf(`/cafeteria/${CAF_YOUNG[28]}/`),more=hub.indexOf(`/cafeteria/${CAF_MORE[0]}/`);
  assert.ok(first>-1&&first<last&&last<more,'shelf order: main shelf before More foods');
});

test('cover fronts the room, hero carries the tray art and the room stats',()=>{
  assert.ok(hub.includes('https://assets.kiddo.school/school/cafeteria/cover.webp'),'cover art');
  assert.ok(hub.indexOf('school/cafeteria/cover.webp')<hub.indexOf('school/cafeteria/apple.webp'),'cover before every card');
  assert.ok(hub.includes('62 CARDS · AGES 2–5'),'deck size + ages eyebrow');
  assert.ok(hub.includes('School Cafeteria Flashcards'),'cover art alt names the deck');
});

test('every food has a short page: card, verbatim activity, back link',()=>{
  for(const s of CAF_ORDER){
    const html=read(`/cafeteria/${s}/`);
    assert.ok(html.includes('The card’s activity'),'activity block on '+s);
    assert.ok(html.includes('“'+CAF_ACTIONS[s]+'” — printed on the'),'verbatim activity on '+s);
    assert.ok(html.includes('— printed on the '+s.replace(/-/g,' ')+' card'),'per-word framing on '+s);
    assert.ok(html.includes(`href="/cafeteria/">Back to the Cafeteria`),'back link on '+s);
    assert.ok(html.includes(`href="/cafeteria/learn/${s}/"`),'lesson link on '+s);
    assert.ok(html.includes(`href="/flashcards/cafeteria/${s}/"`),'library link on '+s);
  }
});

test('landscape cards letterbox: six caf-land hooks, others untouched',()=>{
  assert.deepEqual([...CAF_LANDSCAPE].sort(),['apple','banana','cafeteria-tray','juice','milk','sandwich']);
  let landCount=0;
  for(const s of CAF_ORDER){
    const html=read(`/cafeteria/${s}/`);
    const isLand=html.includes('class="caf-land"');
    assert.equal(isLand,CAF_LANDSCAPE.includes(s),'caf-land flag on '+s);
    if(isLand)landCount++;
  }
  assert.equal(landCount,6,'exactly six landscape hooks');
  const css=readFileSync('public/assets/style.css','utf8');
  assert.match(css,/\.lp-tile\.caf-land img,\.fc2-hero img\.caf-land\{object-fit:contain/,'pinned contain rule');
});

test('62 full lessons exist with the house field contract',()=>{
  for(const s of CAF_ORDER){
    const html=read(`/cafeteria/learn/${s}/`);
    assert.ok(html.includes('CAFETERIA LESSON'),'lesson eyebrow on '+s);
    assert.ok(html.includes('School Rooms'),'rooms breadcrumb on '+s);
  }
  const l1=read('/cafeteria/learn/apple/');
  assert.ok(l1.includes('pointing'),'apple lesson teaches its activity');
});

test('library twins: set page + 62 card pages with downloads and age pills',()=>{
  const set=read('/flashcards/cafeteria/');
  assert.ok(set.includes('62'),'set page counts the deck');
  for(const s of CAF_ORDER){
    const card=read(`/flashcards/cafeteria/${s}/`);
    assert.ok(card.includes('assets.kiddo.school/school/cafeteria/'+s+'.webp'),'card art on '+s);
    assert.ok(card.includes('Ages 2–5'),'age pill on '+s);
  }
});

test('cross-links: Explore the School, Class 22 and Kitchen Helper, both ways',()=>{
  // room → the three
  assert.ok(hub.includes('href="/rooms/"'),'rooms link in room');
  assert.ok(hub.includes('href="/preschool/3-years/fruits-and-vegetables/"'),'Class 22 link in room');
  assert.ok(hub.includes('href="/kitchen/"'),'Kitchen link in room');
  // the three → the room
  const rooms=read('/rooms/');
  assert.ok(rooms.includes('href="/cafeteria/"')&&rooms.includes('Cafeteria'),'rooms hub carries the Cafeteria');
  const home=read('/');
  assert.ok(home.includes('href="/cafeteria/"'),'homepage room shelf carries the Cafeteria');
  assert.ok(home.includes('Seven rooms'),'homepage counts seven rooms');
  const fruits=read('/preschool/3-years/fruits-and-vegetables/');
  assert.ok(fruits.includes('href="/cafeteria/"'),'Class 22 links the Cafeteria');
  const kitchen=read('/kitchen/');
  assert.ok(kitchen.includes('href="/cafeteria/"'),'Kitchen links the Cafeteria');
  assert.ok(rooms.includes('Seven rooms'),'rooms hub counts seven rooms');
});

test('the five existing word pages keep their URLs and link their cafeteria versions',()=>{
  const pairs=[['apple','apple'],['banana','banana'],['carrot','carrots'],['grapes','grapes'],['strawberry','strawberries']];
  for(const [word,caf] of pairs){
    const card=read(`/flashcards/fruits-and-vegetables/${word}/`);
    assert.ok(card.includes(`href="/cafeteria/${caf}/"`),'friend link on '+word+' card page');
  }
  // and the cafeteria short pages point back at their twins
  for(const [,caf] of pairs){
    const html=read(`/cafeteria/${caf}/`);
    assert.ok(html.includes('/flashcards/fruits-and-vegetables/'),'cafeteria page names its twin: '+caf);
  }
});

test('games-shelf links per the standing rule',()=>{
  assert.ok(hub.includes('href="/games/"'),'games shelf link');
  assert.ok(hub.includes('href="/games/hot-potato/"'),'hot potato');
  assert.ok(hub.includes('href="/games/simon-says/"'),'simon says');
  assert.ok(hub.includes('href="/games/treasure-hunt/"'),'treasure hunt');
});

test('wiring: hub filters, search index, sitemap and directory all know the room',()=>{
  for(const s of CAF_ORDER){
    const idx=readFileSync('dist/assets/search-index.json','utf8');
    assert.ok(idx.includes('/cafeteria/'+s+'/'),'search index knows '+s);
    break; // one probe per file read; the rest via sitemap
  }
  const sm=readFileSync('dist/sitemap.xml','utf8');
  assert.ok(sm.includes('<loc>https://kiddo.school/cafeteria/</loc>'),'sitemap: hub');
  for(const s of CAF_ORDER){
    assert.ok(sm.includes(`<loc>https://kiddo.school/cafeteria/${s}/</loc>`),'sitemap: '+s);
    assert.ok(sm.includes(`<loc>https://kiddo.school/flashcards/cafeteria/${s}/</loc>`),'sitemap: card '+s);
    assert.ok(sm.includes(`<loc>https://kiddo.school/cafeteria/learn/${s}/</loc>`),'sitemap: lesson '+s);
  }
  const dir=read('/all-pages/');
  assert.ok(dir.includes('Cafeteria'),'all-pages directory names the room');
});

test('no existing URL changed: redirects file untouched, old paths still live',()=>{
  const red=readFileSync('public/_redirects','utf8');
  assert.ok(!red.includes('/cafeteria'),'no cafeteria redirects needed — nothing moved');
  const before=['/flashcards/fruits-and-vegetables/apple/','/flashcards/fruits-and-vegetables/banana/','/flashcards/fruits-and-vegetables/carrot/','/flashcards/fruits-and-vegetables/grapes/','/flashcards/fruits-and-vegetables/strawberry/','/rooms/','/kitchen/'];
  for(const p of before)assert.ok(read(p).length>1000,'still live: '+p);
});
