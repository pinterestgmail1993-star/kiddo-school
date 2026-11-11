// art-room — the SCHOOL ROOM · The Art Room (owner 2026-10-25): 27 cards on
// R2 at school/art-room/ (the owner's real upload location — the brief's
// school/rooms/art-room/flashcards/ is empty), cover first, then the cards
// in file order, one short page per item at /art-room/<slug>/ (slug = file
// name) showing the card, the card's ACTIVITY line verbatim and a link back
// to /art-room/, individual /learn/ lessons via LP_REGISTRY, individual
// library cards at /flashcards/art-room/ with age pills, American spelling
// in page titles (owner rule: "Colored Pencils"), Explore the School
// (/rooms/), the Coloring Pages hub and the Colors extra class linked both
// ways, games-shelf links per the owner's standing rule, no existing URL
// changed.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {ART_ORDER,ART_ACTIONS,ART_COVER} from '../src/flashcards/data-art-room.mjs';
import {lpContent as artLp} from '../src/flashcards/lp-art-room.mjs';
import {fcSetBySlug} from '../src/flashcards/index.mjs';
import {ROOMS} from '../src/school-rooms.mjs';
const read=f=>readFileSync(f,'utf8');
const readPage=p=>readFileSync('dist'+p+'index.html','utf8');
const set=fcSetBySlug['art-room'];
const R2BASE='https://assets.kiddo.school/school/art-room/';

const SLUGS=['chalk','clay','colored-pencils','cotton-balls','craft-sticks','crayon','drawing-pad','easel','eraser','feathers','glue','ink','markers','paintbrush','palette','paper-plate','paper','pencil','ribbon','ruler','scissors','sponge','stamps','stencil','stickers','tape','watercolors'];

test('art-room set: 27 cards, slug = file name, file order, real R2 art',()=>{
 assert.equal(set.cards.length,27,'27 art cards, cover never counted');
 assert.deepEqual(ART_ORDER,SLUGS,'file order exactly as the owner uploaded');
 for(const c of set.cards){
  assert.match(c.file,new RegExp('^'+c.slug+'\\.webp$'),c.slug+' file matches slug');
  assert.match(c.img,/^https:\/\/assets\.kiddo\.school\/school\/art-room\//,c.slug+' serves from the owner folder');
  assert.equal(c.w,800);assert.equal(c.h,1131);
  assert.ok(c.alt.length>=80,c.slug+' alt written from the artwork');
  assert.equal(c.ages,'Ages 2+',c.slug+' carries the age pill');
  assert.ok(c.pill,c.slug+' carries its shelf pill');
 }
 assert.equal(ART_COVER.w,800);assert.equal(ART_COVER.h,1131);
 assert.ok(ART_COVER.alt.includes('Art Activity Flashcards'),'cover alt honest');
});

test('every card carries its own ACTIVITY line, transcribed verbatim from the artwork',()=>{
 // The exact lines read off the labeled contact sheets (scripts/art-sheets.py):
 const exact={'chalk':'Draw a picture with shapes','clay':'Shape a tiny animal',
  'colored-pencils':'Shade a simple object','cotton-balls':'Dab paint to make clouds',
  'craft-sticks':'Build a tiny frame','crayon':'Draw a colourful picture',
  'drawing-pad':'Draw your favourite thing','easel':'Set up your artwork',
  'eraser':'Erase and redraw a shape','feathers':'Glue a colourful texture',
  'glue':'Make a paper collage','ink':'Make a fingerprint picture',
  'markers':'Make bold colourful lines','paintbrush':'Paint a bright background',
  'palette':'Mix two colours together','paper-plate':'Turn it into a funny face',
  'paper':'Fold a simple animal','pencil':'Sketch a simple face',
  'ribbon':'Make a colourful line collage','ruler':'Draw three straight lines',
  'scissors':'Cut out simple shapes','sponge':'Print a repeating pattern',
  'stamps':'Print a row of shapes','stencil':'Trace a simple shape',
  'stickers':'Make a simple picture','tape':'Join two paper shapes',
  'watercolors':'Paint a soft sky'};
 assert.deepEqual(ART_ACTIONS,exact,'all 27 activities verbatim');
 for(const c of set.cards)assert.ok(ART_ACTIONS[c.slug].length>10,c.slug+' activity present');
});

test('/art-room/ hub: cover FIRST, 27 tiles in file order, owner cross-links + games shelf',()=>{
 const html=readPage('/art-room/');
 const iCover=html.indexOf('art-room/cover.webp'), iFirst=html.indexOf('art-room/chalk.webp');
 assert.ok(iCover>-1&&iFirst>-1,'cover + first card render');
 assert.ok(iCover<iFirst,'cover fronts the room');
 const positions=SLUGS.map(s=>html.indexOf('art-room/'+s+'.webp'));
 assert.deepEqual(positions,[...positions].sort((a,b)=>a-b),'27 tiles in file order');
 assert.equal((html.match(/class="lp-tile"/g)||[]).length,27,'27 tiles');
 assert.ok(html.includes('href="/rooms/"'),'links Explore the School');
 assert.ok(html.includes('href="/coloring-pages/"'),'links the Coloring Pages');
 assert.ok(html.includes('href="/extra-classes/colors/"'),'links the Colors class');
 assert.ok(html.includes('href="/flashcards/art-room/"'),'links the printable set');
 for(const g of ['/games/colour-hunt/','/games/shape-hunt/','/games/shadow-shapes/','/games/follow-the-leader/'])
  assert.ok(html.includes('href="'+g+'"'),'games-shelf link (owner standing rule) '+g);
 assert.ok(html.toUpperCase().includes('AGES 2–5'),'age pill on the room');
});









test('owner cross-links both ways: Explore the School, Coloring Pages, Colors class',()=>{
 // Explore the School: /rooms/ lists six rooms and the homepage section carries the Art Room card
 const rooms=readPage('/rooms/');
 assert.ok(rooms.includes('href="/art-room/"'),'/rooms/ links the Art Room');
 assert.ok(rooms.includes('Eight rooms'),'/rooms/ copy says eight rooms — the School Hall joined (owner 2026-10-30)');
 const home=read('dist/index.html');
 const sec=home.slice(home.indexOf('id="school-rooms"'),home.indexOf('id="school-rooms"')+12000);
 assert.ok(sec.includes('href="/art-room/"'),'homepage School Rooms section links the Art Room');
 assert.ok(ROOMS.some(r=>r.name==='Art Room'&&r.href==='/art-room/'),'ROOMS carries the Art Room');
 // Coloring Pages hub links the room — and the room links back
 const cp=readPage('/coloring-pages/');
 assert.ok(cp.includes('href="/art-room/"'),'Coloring Pages links the Art Room');
 assert.ok(readPage('/art-room/').includes('href="/coloring-pages/"'),'Art Room links Coloring Pages back');
 // Colors extra class links the room — and the room links back
 const col=readPage('/extra-classes/colors/');
 assert.ok(col.includes('href="/art-room/"'),'Colors class links the Art Room');
 assert.ok(readPage('/art-room/').includes('href="/extra-classes/colors/"'),'Art Room links Colors back');
});


