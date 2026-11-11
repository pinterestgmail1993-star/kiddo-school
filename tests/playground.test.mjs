import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fcSetBySlug} from '../src/flashcards/index.mjs';
const read=f=>readFileSync(f,'utf8');
const site='https://kiddo.school';
const readPage=p=>readFileSync('dist'+p+'index.html','utf8');

/* ------------------------------------------------ THE PLAYGROUND SET */
const set=fcSetBySlug['playground'];
const setHtml=readPage('/flashcards/playground/');
const cover=set.cover;





/* ------------------------------------------------ THE PLAYGROUND ROOM */
const roomHtml=readPage('/playground/');


/* ------------------------------------------------ PLAYGROUND LESSONS */


/* ------------------------------------------------ SCHOOL ROOMS HUB */
const hubHtml=readPage('/rooms/');
test('school rooms hub: four covered rooms at /rooms/',()=>{
 assert.ok(hubHtml.includes('rel="canonical" href="'+site+'/rooms/"'),'canonical');
 assert.ok(hubHtml.includes('SCHOOL ROOMS'),'hub heading');
 for(const href of ['/learning-library/','/toddler/2-years/school-garden/','/playground/','/music-room/'])
  assert.ok(hubHtml.includes('href="'+href+'"'),'hub links '+href);
 for(const cover of ['books/age-2/bunny-finds-a-friend/cover.webp','garden-bugs-and-friends-age-2/cover.webp','school/playground/flashcards/cover.webp','school/music-room/flashcards/cover.webp'])
  assert.ok(hubHtml.includes(cover),'hub cover '+cover);
 assert.ok(hubHtml.includes('room-cover'),'covered room cards');
 assert.ok(hubHtml.includes('href="/flashcards/"')&&hubHtml.includes('href="/learning-path/"'),'rooms hub points back to the library and path');
});

/* ------------------------------------------------ HOMEPAGE SECTION */
const home=readPage('/');
test('homepage School Rooms section: six covers + Explore the School button',()=>{
 assert.ok(home.includes('id="school-rooms"'),'section present');
 const sec=home.slice(home.indexOf('id="school-rooms"'),home.indexOf('id="school-rooms"')+14000);
 assert.ok(sec.includes('SCHOOL ROOMS'),'section eyebrow');
 assert.ok(sec.includes('href="/rooms/"'),'section links the hub');
 assert.ok(sec.includes('>Explore the School'),'button text');
 assert.ok((sec.match(/class="room-card"/g)||[]).length===8,'eight room cards — the School Hall joined (owner 2026-10-30)');
 for(const cover of ['bunny-finds-a-friend','garden-bugs-and-friends-age-2','school/playground/flashcards/cover.webp','school/music-room/flashcards/cover.webp','school/art-room/cover.webp','school/club/cover.webp','school/cafeteria/cover.webp','school/hall/halloween/action-verbs/01-cat-ghost-pumpkin-bat.webp'])
  assert.ok(sec.includes(cover),'section cover '+cover);
});

/* ------------------------------------------------ FOOTER */
test('footer keeps the School Rooms hub, drops the individual room links (owner directive)',()=>{
 const footer=home.slice(home.indexOf('<footer>'));
 assert.ok(footer.includes('href="/rooms/"'),'footer School Rooms hub kept');
 // owner directive: the six per-room footer links are gone from every page's footer
 for(const gone of ['href="/learning-library/"','href="/toddler/2-years/school-garden/"','href="/playground/"','href="/music-room/"','href="/toddler-room/"','href="/kitchen/"'])
  assert.ok(!footer.includes(gone),`footer must NOT list ${gone}`);
 // the hub link only — every other room link in the footer School column must be gone
 const schoolCol=footer.slice(footer.indexOf('<h2>School</h2>'),footer.indexOf('<h2>Learn</h2>'));
 assert.ok(schoolCol.includes('href="/rooms/"'),'School column keeps the rooms hub');
 for(const gone of ['/toddler/2-years/school-garden/','/playground/','/music-room/','/toddler-room/','/kitchen/','/learning-library/'])
  assert.ok(!schoolCol.includes(gone),`School column must NOT link ${gone}`);
 // rooms stay discoverable: the /rooms/ hub still links all four core rooms
 const roomsHub=readPage('/rooms/');
 for(const room of ['href="/toddler/2-years/school-garden/"','href="/playground/"','href="/music-room/"','href="/learning-library/"'])
  assert.ok(roomsHub.includes(room),`/rooms/ hub links ${room}`);
});

/* ------------------------------------------------ LEARNING PATH UNTOUCHED */
test('playground stays off the Learning Path',()=>{
 const lpAll=readPage('/learning-path/');
 // the footer (with its School Rooms links) sits on every page — check the main content only
 const lp=lpAll.slice(lpAll.indexOf('<main id="main">'),lpAll.indexOf('<footer>'));
 assert.ok(!lp.includes('/playground/'),'no playground links in the Learning Path content');
 const xml=read('dist/sitemap.xml');
 assert.ok(xml.includes('<loc>'+site+'/rooms/</loc>'),'rooms hub indexed');
 assert.ok(xml.includes('<loc>'+site+'/playground/</loc>'),'playground room indexed');
 assert.ok(xml.includes('<loc>'+site+'/flashcards/playground/</loc>'),'set indexed');
});
