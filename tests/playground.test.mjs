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
 // The set links its ROOM (/playground/), never a class or the Learning Path
 assert.equal(set.classUrl,'/playground/');
 assert.equal(set.lessonPath,null);
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
test('playground room page: built from the set, three shelves, off the learning path',()=>{
 assert.ok(roomHtml.includes('rel="canonical" href="'+site+'/playground/"'),'canonical');
 assert.ok(roomHtml.includes('THE PLAYGROUND'),'room heading');
 assert.ok(roomHtml.includes('href="/flashcards/playground/action-balance/"'),'action tile');
 assert.ok(roomHtml.includes('href="/flashcards/playground/equipment-tunnel/"'),'equipment tile');
 assert.ok(roomHtml.includes('href="/flashcards/playground/manner-wait/"'),'manner tile');
 assert.ok(roomHtml.includes('href="/flashcards/playground/"'),'set link');
 assert.ok(roomHtml.includes('href="/rooms/"'),'rooms hub link');
 assert.ok(roomHtml.includes('href="/music-room/"')&&roomHtml.includes('href="/toddler/2-years/school-garden/"')&&roomHtml.includes('href="/learning-library/"'),'sibling rooms');
 assert.ok(!roomHtml.includes('Class 2')||!roomHtml.includes('Class 23'),'no class number claimed');
 assert.ok(!roomHtml.includes('learning path'),'no learning-path claim');
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
test('footer lists the school rooms',()=>{
 const footer=home.slice(home.indexOf('<footer>'));
 assert.ok(footer.includes('href="/rooms/"'),'footer School Rooms');
 assert.ok(footer.includes('href="/playground/"'),'footer Playground');
 assert.ok(footer.includes('href="/music-room/"'),'footer Music Room');
 assert.ok(footer.includes('href="/toddler/2-years/school-garden/"'),'footer School Garden kept');
 assert.ok(footer.includes('href="/learning-library/"'),'footer Library kept');
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
