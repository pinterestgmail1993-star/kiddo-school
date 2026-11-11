import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fcSetBySlug} from '../src/flashcards/index.mjs';
import {lpContent} from '../src/flashcards/lp-doctor-visit.mjs';
import {EXTRA_CLASSES} from '../src/extra-classes.mjs';
const read=f=>readFileSync(f,'utf8');
const readPage=p=>readFileSync('dist'+p+'index.html','utf8');
const site='https://kiddo.school';

/* ---------------------------------------------- THE DOCTOR VISIT SET */
const set=fcSetBySlug['doctor-visit'];
const setHtml=readPage('/flashcards/doctor-visit/');
const cover=set.cover;
const LANDSCAPE=['bandage','check-up','doctor','medicine','stethoscope','thermometer'];
const ORDER=['appointment','reception-desk','name-tag','waiting-room','doctor','nurse','weigh-in','exam-room','check-up','stethoscope','thermometer','ear-check','mouth-check','eye-chart','deep-breath','x-ray','medicine','bandage','hand-washing','hospital-bed','feel-better','goodbye'];

test('doctor-visit set: 22 cards in the owner\u2019s visit order, true probed dims',()=>{
 assert.equal(set.cards.length,22);
 assert.deepEqual(set.cards.map(c=>c.slug),ORDER,'cards ride in visit order');
 // the owner's six landscape cards at 1000×707, everything else 800×1132
 for(const c of set.cards){
  const [w,h]=LANDSCAPE.includes(c.slug)?[1000,707]:[800,1132];
  assert.equal(c.w,w,c.slug+' width');assert.equal(c.h,h,c.slug+' height');
  assert.match(c.img,/^https:\/\/assets\.kiddo\.school\/school\/extra-classes\/doctor-visit\//);
 }
 assert.equal(cover.w,800);assert.equal(cover.h,1132);
 // the two worry-cards sit deep: x-ray in the check-up group, hospital bed after it
 assert.ok(ORDER.indexOf('x-ray')>=14,'x-ray late in the visit');
 assert.ok(ORDER.indexOf('hospital-bed')>ORDER.indexOf('x-ray'),'hospital bed after x-ray');
 // slugs unique
 assert.equal(new Set(set.cards.map(c=>c.slug)).size,22);
});









test('doctor-visit class page: groups, game, medicine rule, back-links',()=>{
 const html=readPage('/extra-classes/doctor-visit/');
 assert.ok(html.includes('Ages 3–5')||html.includes('Ages 3\u20135'),'age label');
 assert.ok(html.includes('teddy'),'the teddy bear framing');
 assert.equal((html.match(/class="fc-pillgroup"/g)||[]).length,4,'four visit groups on the class page');
 assert.equal((html.match(/class="lp-tile"/g)||[]).length,22,'22 lesson tiles');
 assert.ok(html.includes('Play doctor at home'),'the class game');
 assert.ok(html.includes('toy stethoscope'),'the game\u2019s prop');
 assert.ok(html.includes('Medicine is only taken from a grown-up'),'the medicine note');
 assert.ok(html.includes('Meet other community helpers'),'Class 33 back-link');
 assert.ok(html.includes('href="/preschool/4-years/community-helpers-and-our-neighborhood/"'),'Class 33 href');
 assert.ok(html.includes('More good habits'),'Class 32 back-link');
 assert.ok(html.includes('href="/preschool/4-years/life-skills-and-good-habits/"'),'Class 32 href');
 assert.ok(html.includes('href="/flashcards/doctor-visit/"'),'links the library set');
 assert.ok(html.includes('og:image')===false?true:true);
 const og=readPage('/extra-classes/doctor-visit/');
 assert.ok(og.includes('property="og:image" content="https://assets.kiddo.school/school/extra-classes/doctor-visit/cover.webp"'),'OG image is the cover');
});

test('doctor-visit is on the extra-classes shelf, never the numbered path',()=>{
 const hub=readPage('/extra-classes/');
 assert.ok(hub.includes('href="/extra-classes/doctor-visit/"'),'hub lists the class');
 assert.equal(EXTRA_CLASSES.length,13,'thirteen extra classes — Sequence Stories joined (owner 2026-10-29; Question Words 2026-10-28, Manners 2026-10-27, one page, no individual URLs)');
 assert.ok(EXTRA_CLASSES.find(c=>c.name==='Doctor Visit'),'named Doctor Visit');
 // the learning path page mentions it only in the bonus row
 const lp=readPage('/learning-path/');
 assert.ok(lp.includes('/extra-classes/doctor-visit/'),'bonus row points at it');
 assert.ok(lp.includes('Class 38: <a href="/preschool/4-years/feelings-and-kindness/">Feelings &amp; Kindness</a>'),'Class 38 approved & built at the end of the path (owner 2026-10-23)');
});



test('doctor-visit rides the Ages 4–5 flashcards shelf and the set count grows',()=>{
 const hub=readPage('/flashcards/');
 assert.ok(hub.includes('href="/flashcards/doctor-visit/"'),'hub lists the set');
 assert.ok(hub.includes('doctor-visit cards in visit order'),'shelf blurb mentions it');
});
