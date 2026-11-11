import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fcSetBySlug} from '../src/flashcards/index.mjs';
import {lpContent} from '../src/flashcards/lp-home-daily-life.mjs';
import {EXTRA_CLASSES} from '../src/extra-classes.mjs';
const read=f=>readFileSync(f,'utf8');
const readPage=p=>readFileSync('dist'+p+'index.html','utf8');
const site='https://kiddo.school';

/* ---------------------------------------------- THE HOME AND DAILY LIFE SET */
const set=fcSetBySlug['home-and-daily-life'];
const setHtml=readPage('/flashcards/home-and-daily-life/');
const cover=set.cover;
const ORDER=['rooms-at-home','parts-of-a-home-inside','parts-of-a-home-outside','living-room-words','furniture-words','bedroom-words','bedroom-objects','storage-words','household-objects','daily-routines','bedroom-routines','bathroom-words','more-bathroom-words','bathroom-routines','washing-and-bathing','personal-care','kitchen-actions','home-appliances','shopping-words','cleaning-and-tidying','cleaning-tools','laundry-words','outdoor-chores','garden-tools','tools-and-fix-it','more-tools','by-the-door','letters-and-parcels','outside-the-home','outdoor-home-words','pets-at-home','sounds-at-home','sounds-around-home','technology-at-home','safe-at-home','home-safety','water-and-energy','recycling-words','care-for-earth','plants-at-home','caring-for-plants'];
const GROUP_HEADS=['Rooms of the home','Wash and get ready','In the kitchen','Chores and tools','Around the home','Sounds and technology','Safe and green'];

test('home-and-daily-life set: 41 cards in tour order, every card 1100×778 landscape',()=>{
 assert.equal(set.cards.length,41);
 assert.deepEqual(set.cards.map(c=>c.slug),ORDER,'cards ride in tour order');
 for(const c of set.cards){
  assert.equal(c.w,1100,c.slug+' width');assert.equal(c.h,778,c.slug+' height');
  assert.match(c.img,/^https:\/\/assets\.kiddo\.school\/school\/extra-classes\/home-and-daily-life\//);
  assert.ok(c.alt.length>60,c.slug+' alt written from the artwork');
 }
 assert.equal(cover.w,1100);assert.equal(cover.h,778);
 assert.equal(new Set(set.cards.map(c=>c.slug)).size,41,'slugs unique');
 assert.equal(new Set(set.cards.map(c=>c.word)).size,41,'words unique');
});









test('home-and-daily-life class page: groups, house hunt, two-words section, back-links',()=>{
 const html=readPage('/extra-classes/home-and-daily-life/');
 assert.ok(html.includes('Ages 3–5')||html.includes('Ages 3\u20135'),'age label');
 assert.equal((html.match(/class="fc-pillgroup"/g)||[]).length,7,'seven tour groups on the class page');
 assert.equal((html.match(/class="lp-tile"/g)||[]).length,41,'41 lesson tiles');
 assert.ok(html.includes('The house hunt'),'the class game');
 assert.ok(html.includes('doormat'),'the game\u2019s prop');
 assert.ok(html.includes('Tap and faucet'),'the US/UK section headline');
 assert.ok(html.includes('flashlight'),'the flashlight pair');
 assert.ok(html.includes('trolley'),'the cart pair');
 assert.ok(html.includes('href="/flashcards/home-and-daily-life/"'),'links the library set');
 assert.ok(html.includes('href="/kitchen/"'),'Kitchen back-link');
 assert.ok(html.includes('href="/extra-classes/doctor-visit/"'),'Doctor Visit back-link');
 assert.ok(html.includes('href="/preschool/4-years/life-skills-and-good-habits/"'),'Class 32 back-link');
 const og=html;
 assert.ok(og.includes('property="og:image" content="https://assets.kiddo.school/school/extra-classes/home-and-daily-life/cover.webp"'),'OG image is the cover');
});

test('home-and-daily-life is on the extra-classes shelf, never the numbered path',()=>{
 const hub=readPage('/extra-classes/');
 assert.ok(hub.includes('href="/extra-classes/home-and-daily-life/"'),'hub lists the class');
 assert.equal(EXTRA_CLASSES.length,13,'thirteen extra classes — Sequence Stories joined (owner 2026-10-29; Question Words 2026-10-28, Manners 2026-10-27, one page, no individual URLs)');
 assert.ok(EXTRA_CLASSES.find(c=>c.name==='Home and Daily Life'),'named Home and Daily Life');
 // the learning path page mentions it only in the bonus row
 const lp=readPage('/learning-path/');
 assert.ok(lp.includes('/extra-classes/home-and-daily-life/'),'bonus row points at it');
 assert.ok(lp.includes('Class 38: <a href="/preschool/4-years/feelings-and-kindness/">Feelings &amp; Kindness</a>'),'Class 38 approved & built at the end of the path (owner 2026-10-23)');
});


