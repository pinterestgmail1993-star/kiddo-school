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

test('playground set: 32 cards in three groups, room link, honest grid',()=>{
 assert.equal(set.cards.length,32);
 assert.equal(set.cards.filter(c=>c.file.startsWith('action-')).length,15);
 assert.equal(set.cards.filter(c=>c.file.startsWith('equipment-')).length,12);
 assert.equal(set.cards.filter(c=>c.file.startsWith('manner-')).length,5);
 // All 32 art files probed at 1728×2304 — nothing assumed
 for(const c of set.cards){assert.equal(c.w,1728);assert.equal(c.h,2304);assert.match(c.img,/^(https:\/\/assets\.kiddo\.school\/school\/playground\/)/);}
 assert.equal(cover.w,1728);assert.equal(cover.h,2304);
 // The set links its ROOM (/playground/), never a class or the Learning Path;
 // the room hosts the /learn/ lessons, so the set's lessonPath IS the room.
 assert.equal(set.classUrl,'/playground/');
 assert.equal(set.lessonPath,'/playground/');
 assert.ok(!set.stageName&&!set.stageHref,'playground set has no class stage');
 assert.ok(setHtml.includes('href="/playground/"'),'set page links the Playground room');
 assert.ok(setHtml.includes('Step into the room these cards come from'),'room-labelled button');
 assert.ok(!setHtml.includes('on the Kiddo School learning path'),'no learning-path claim for a room set');
 assert.ok(!setHtml.includes('View the class'),'no class wording for a room set');
 // duplicate picture words keep unique slugs and pages
 assert.ok(existsSync('dist/flashcards/playground/action-slide/index.html'));
 assert.ok(existsSync('dist/flashcards/playground/equipment-slide/index.html'));
 assert.ok(existsSync('dist/flashcards/playground/action-swing/index.html'));
 assert.ok(existsSync('dist/flashcards/playground/equipment-swing/index.html'));
 assert.ok(existsSync('dist/flashcards/playground/equipment-climbing-frame/index.html'));
});

test('playground card pages: classic blocks, download, honest room framing',()=>{
 const titles=new Set();
 for(const c of set.cards){
  const html=readPage(c.url);
  const title=html.match(/<title>(.*?)<\/title>/)[1];
  assert.ok(!titles.has(title),`duplicate title: ${title}`);titles.add(title);
  assert.ok(html.includes('Say it together'),`${c.url} missing say`);
  assert.ok(html.includes('Try this'),`${c.url} missing try`);
  assert.ok(html.includes('Quick parent note'),`${c.url} missing note`);
  assert.ok(html.includes(`href="${c.img}" download=`),`${c.url} download button`);
  assert.ok(html.includes('href="/flashcards/playground/"'),`${c.url} set back-link`);
  assert.ok(!html.includes('class on the Learning Path'),`${c.url} must not claim a class`);
  assert.ok(!/\bfree\b|no sign-up/i.test(html.replace(/<script[\s\S]*?<\/script>/g,'')),`${c.url} banned wording`);
 }
 // the duplicate-word pages stay distinct
 const aSlide=readPage('/flashcards/playground/action-slide/');
 const eSlide=readPage('/flashcards/playground/equipment-slide/');
 assert.ok(aSlide.includes('<h1>Slide Flashcard for Preschoolers</h1>'),'action slide H1');
 assert.ok(eSlide.includes('<h1>Playground Slide Flashcard for Preschoolers</h1>'),'equipment slide H1 differs');
 const cf=readPage('/flashcards/playground/equipment-climbing-frame/');
 assert.ok(cf.includes('Climbing Frame'),'climbing-frame page names the thing');
});

/* ------------------------------------------------ THE PLAYGROUND ROOM */
const roomHtml=readPage('/playground/');
test('playground room page: built from the set, three shelves of LESSONS, off the learning path',()=>{
 assert.ok(roomHtml.includes('rel="canonical" href="'+site+'/playground/"'),'canonical');
 assert.ok(roomHtml.includes('THE PLAYGROUND'),'room heading');
 // owner doctrine: room tiles open LESSON pages (/playground/learn/...), never the flashcard pages
 assert.ok(roomHtml.includes('href="/playground/learn/action-balance/"'),'action tile → lesson');
 assert.ok(roomHtml.includes('href="/playground/learn/equipment-tunnel/"'),'equipment tile → lesson');
 assert.ok(roomHtml.includes('href="/playground/learn/manner-wait/"'),'manner tile → lesson');
 assert.ok(!roomHtml.includes('href="/flashcards/playground/action-balance/"'),'no tile points at a flashcard page');
 assert.ok(roomHtml.includes('href="/flashcards/playground/"'),'set link');
 assert.ok(roomHtml.includes('href="/rooms/"'),'rooms hub link');
 assert.ok(roomHtml.includes('href="/music-room/"')&&roomHtml.includes('href="/toddler/2-years/school-garden/"')&&roomHtml.includes('href="/learning-library/"'),'sibling rooms');
 assert.ok(!roomHtml.includes('Class 2')||!roomHtml.includes('Class 23'),'no class number claimed');
 assert.ok(!roomHtml.includes('learning path'),'no learning-path claim');
});

/* ------------------------------------------------ PLAYGROUND LESSONS */
test('playground lessons: 32 /learn/ pages, room breadcrumbs, distinct from the flashcard pages',()=>{
 assert.ok(existsSync('dist/playground/learn/action-balance/index.html'),'first lesson page');
 assert.ok(existsSync('dist/playground/learn/equipment-tunnel/index.html'),'equipment lesson');
 assert.ok(existsSync('dist/playground/learn/manner-wait/index.html'),'manner lesson');
 assert.ok(existsSync('dist/playground/learn/action-slide/index.html'),'duplicate-word slug kept');
 const lessonHtml=readPage('/playground/learn/action-balance/');
 const lesson=lessonHtml.slice(lessonHtml.indexOf('<main id="main">'),lessonHtml.indexOf('<footer>'));
 // room framing: School Rooms breadcrumb, PLAYGROUND LESSON eyebrow, NO learning-path claim
 assert.ok(lesson.includes('href="/rooms/"'),'lesson breadcrumbs through School Rooms');
 assert.ok(!lesson.includes('href="/learning-path/"'),'no learning-path crumb in the content');
 assert.ok(lesson.includes('PLAYGROUND LESSON'),'room lesson eyebrow');
 // lessons are DISTINCT from the flashcard card pages (no shared text)
 const card=readPage('/flashcards/playground/action-balance/');
 const lessonText=lesson.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ');
 const cardText=card.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ');
 const cardSentences=cardText.split(/[.!?]\s/).map(s=>s.trim()).filter(s=>s.length>60);
 for(const s of cardSentences)assert.ok(!lessonText.includes(s),'lesson shares a library sentence: '+s.slice(0,60));
 // card pages link their lesson (Teach it, step by step)
 assert.ok(card.includes('href="/playground/learn/action-balance/"'),'card page → lesson link');
 // sitemap: all 32 lessons indexed, under the room path
 const xml=read('dist/sitemap.xml');
 assert.equal((xml.match(/playground\/learn\//g)||[]).length,32,'32 lesson URLs in the sitemap');
});

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
test('homepage School Rooms section: four covers + Explore the School button',()=>{
 assert.ok(home.includes('id="school-rooms"'),'section present');
 const sec=home.slice(home.indexOf('id="school-rooms"'),home.indexOf('id="school-rooms"')+9000);
 assert.ok(sec.includes('SCHOOL ROOMS'),'section eyebrow');
 assert.ok(sec.includes('href="/rooms/"'),'section links the hub');
 assert.ok(sec.includes('>Explore the School'),'button text');
 assert.ok((sec.match(/class="room-card"/g)||[]).length===4,'four room cards');
 for(const cover of ['bunny-finds-a-friend','garden-bugs-and-friends-age-2','school/playground/flashcards/cover.webp','school/music-room/flashcards/cover.webp'])
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
