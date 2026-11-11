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



test('cover fronts the room, hero carries the tray art and the room stats',()=>{
  assert.ok(hub.includes('https://assets.kiddo.school/school/cafeteria/cover.webp'),'cover art');
  assert.ok(hub.indexOf('school/cafeteria/cover.webp')<hub.indexOf('school/cafeteria/apple.webp'),'cover before every card');
  assert.ok(hub.includes('62 CARDS · AGES 2–5'),'deck size + ages eyebrow');
  assert.ok(hub.includes('School Cafeteria Flashcards'),'cover art alt names the deck');
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
  assert.ok(home.includes('Eight rooms'),'homepage counts eight rooms — the School Hall joined (owner 2026-10-30)');
  const fruits=read('/preschool/3-years/fruits-and-vegetables/');
  assert.ok(fruits.includes('href="/cafeteria/"'),'Class 22 links the Cafeteria');
  const kitchen=read('/kitchen/');
  assert.ok(kitchen.includes('href="/cafeteria/"'),'Kitchen links the Cafeteria');
  assert.ok(rooms.includes('Eight rooms'),'rooms hub counts eight rooms — the School Hall joined (owner 2026-10-30)');
});



test('games-shelf links per the standing rule',()=>{
  assert.ok(hub.includes('href="/games/"'),'games shelf link');
  assert.ok(hub.includes('href="/games/#hot-potato"'),'hot potato');
  assert.ok(hub.includes('href="/games/#simon-says"'),'simon says');
  assert.ok(hub.includes('href="/games/#treasure-hunt"'),'treasure hunt');
});




