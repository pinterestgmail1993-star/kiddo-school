// clubs — the SCHOOL ROOM · The Clubs (owner 2026-10-25): 45 extra-curricular
// activity cards on R2 at school/club/ (the owner's real upload location —
// the brief's school/rooms/clubs/flashcards/ is empty), cover first, then
// the 15 Ages 3+ clubs in the owner's order and the 30 Ages 6+ clubs in file
// order, one short page per activity at /clubs/<slug>/ (slug = file name)
// showing the card, the card's SKILL pill verbatim and a link back to
// /clubs/, individual /learn/ lessons via LP_REGISTRY, individual library
// cards at /flashcards/extra-curricular-activities/ — the deck's printed
// name (owner 2026-10-26 renamed the set URL: "who will search for club?") —
// with honest per-card age pills (Ages 3+ /
// Ages 6+), the trained-coach line on fencing and archery (owner safety
// rule), Explore the School (/rooms/) and the Learning Path's Growing-up
// classrooms row linked both ways, games-shelf links per the owner's
// standing rule, no existing URL changed.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {CLUBS_ORDER,CLUBS_YOUNG,CLUBS_OLDER,CLUBS_SKILLS,CLUBS_COVER,CLUBS_COACH} from '../src/flashcards/data-clubs.mjs';
import {lpContent as clubsLp} from '../src/flashcards/lp-clubs.mjs';
import {fcSetBySlug} from '../src/flashcards/index.mjs';
import {ROOMS} from '../src/school-rooms.mjs';
const read=f=>readFileSync(f,'utf8');
const readPage=p=>readFileSync('dist'+p+'index.html','utf8');
const set=fcSetBySlug['extra-curricular-activities'];
const R2BASE='https://assets.kiddo.school/school/club/';

const YOUNG=['art','music','dance','sports','drama','gardening','cooking','ballet','yoga','swimming','reading','crafts','drawing','baking','singing'];
const OLDER=['archery','astronomy','bird-watching','calligraphy','chess','choir','climbing','coding','cycling','debate','fencing','fashion-design','filmmaking','first-aid','gymnastics','horse-riding','journaling','lego','martial-arts','nature-crafts','photography','poetry','pottery','puppetry','robotics','science','skateboarding','table-tennis','tennis','volunteering'];

test('clubs set: 45 cards, slug = file name, owner age split, real R2 art',()=>{
 assert.equal(set.cards.length,45,'45 club cards, cover never counted');
 assert.deepEqual(CLUBS_YOUNG,YOUNG,'the 15 Ages 3+ clubs, in the owner\u2019s own order');
 assert.deepEqual(CLUBS_OLDER,OLDER,'the 30 Ages 6+ clubs, in file order');
 assert.deepEqual(CLUBS_ORDER,[...YOUNG,...OLDER],'display order = young shelf then older shelf');
 for(const c of set.cards){
  assert.match(c.file,new RegExp('^'+c.slug+'\\.webp$'),c.slug+' file matches slug');
  assert.match(c.img,/^https:\/\/assets\.kiddo\.school\/school\/club\//,c.slug+' serves from the owner folder');
  assert.equal(c.w,800);assert.equal(c.h,1131);
  assert.ok(c.alt.length>=80,c.slug+' alt written from the artwork');
  assert.ok(['Ages 3+','Ages 6+'].includes(c.ages),c.slug+' carries an honest age pill');
  assert.ok(c.pill,c.slug+' carries its shelf pill');
 }
 assert.equal(set.cards.filter(c=>c.ages==='Ages 3+').length,15,'exactly 15 Ages 3+ cards');
 assert.equal(set.cards.filter(c=>c.ages==='Ages 6+').length,30,'exactly 30 Ages 6+ cards');
 for(const y of YOUNG)assert.equal(set.cards.find(c=>c.slug===y).ages,'Ages 3+',y+' is a young-shelf club');
 assert.equal(CLUBS_COVER.w,800);assert.equal(CLUBS_COVER.h,1131);
 assert.ok(CLUBS_COVER.alt.includes('Extra-Curricular Activities'),'cover alt honest');
});

test('every card carries its own SKILL pill, transcribed verbatim from the artwork',()=>{
 // The exact pills read off the labeled contact sheets (scripts/club-sheets.py):
 const exact={'art':'Painting & Creativity','music':'Rhythm & Sound','dance':'Movement & Expression',
  'sports':'Teamwork & Fitness','drama':'Stories & Confidence','gardening':'Nature & Care',
  'cooking':'Food & Independence','ballet':'Balance & Grace','yoga':'Calm & Wellbeing',
  'swimming':'Confidence & Safety','reading':'Imagine & Learn','crafts':'Make & Explore',
  'drawing':'See & Create','baking':'Measure & Create','singing':'Voice & Confidence',
  'archery':'Aim & Focus','astronomy':'Wonder & Discovery','bird-watching':'Observe & Discover',
  'calligraphy':'Letters & Patience','chess':'Focus & Strategy','choir':'Voice & Harmony',
  'climbing':'Courage & Movement','coding':'Logic & Discovery','cycling':'Balance & Adventure',
  'debate':'Speak & Listen','fencing':'Agility & Focus','fashion-design':'Imagine & Create',
  'filmmaking':'Imagine & Tell','first-aid':'Help & Care','gymnastics':'Strength & Flexibility',
  'horse-riding':'Courage & Care','journaling':'Reflect & Express','lego':'Build & Create',
  'martial-arts':'Discipline & Strength','nature-crafts':'Collect & Create','photography':'Observe & Create',
  'poetry':'Words & Feelings','pottery':'Shape & Imagine','puppetry':'Create & Perform',
  'robotics':'Build & Invent','science':'Explore & Experiment','skateboarding':'Balance & Confidence',
  'table-tennis':'React & Play','tennis':'Move & Compete','volunteering':'Share & Support'};
 assert.deepEqual(CLUBS_SKILLS,exact,'all 45 skill pills verbatim');
 for(const c of set.cards)assert.ok(CLUBS_SKILLS[c.slug].length>8,c.slug+' skill present');
});

test('/clubs/ hub: cover FIRST, young shelf then older shelf, cross-links + games shelf',()=>{
 const html=readPage('/clubs/');
 const iCover=html.indexOf('club/cover.webp'), iFirst=html.indexOf('club/art.webp');
 assert.ok(iCover>-1&&iFirst>-1,'cover + first card render');
 assert.ok(iCover<iFirst,'cover fronts the room');
 const positions=CLUBS_ORDER.map(s=>html.indexOf('club/'+s+'.webp'));
 assert.deepEqual(positions,[...positions].sort((a,b)=>a-b),'45 tiles: 15 Ages 3+ first, then 30 Ages 6+');
 assert.equal((html.match(/class="lp-tile"/g)||[]).length,45,'45 tiles');
 assert.ok(html.includes('THE YOUNG CLUB SHELF'),'young shelf section');
 assert.ok(html.toUpperCase().includes('AGES 3–12'),'age pill on the room');
 assert.ok(html.includes('href="/rooms/"'),'links Explore the School');
 assert.ok(html.includes('href="/learning-path/"'),'links the Learning Path (Growing-up classrooms)');
 assert.ok(html.includes('href="/flashcards/extra-curricular-activities/"'),'links the printable set');
 for(const g of ['/games/animal-walks/','/games/musical-statues/','/games/relay-race/','/games/obstacle-course/','/games/simon-says/'])
  assert.ok(html.includes('href="'+g+'"'),'games-shelf link (owner standing rule) '+g);
});









test('owner cross-links both ways: Explore the School + the Growing-up classrooms row',()=>{
 // Explore the School: /rooms/ lists six rooms and the homepage section carries the Clubs card
 const rooms=readPage('/rooms/');
 assert.ok(rooms.includes('href="/clubs/"'),'/rooms/ links the Clubs');
 assert.ok(rooms.includes('Eight rooms'),'/rooms/ copy says eight rooms — the School Hall joined (owner 2026-10-30)');
 assert.ok(rooms.includes('school/club/cover.webp'),'/rooms/ carries the Clubs cover');
 const home=read('dist/index.html');
 const sec=home.slice(home.indexOf('id="school-rooms"'),home.indexOf('id="school-rooms"')+14000);
 assert.ok(sec.includes('href="/clubs/"'),'homepage School Rooms section links the Clubs');
 assert.ok(ROOMS.some(r=>r.name==='Clubs'&&r.href==='/clubs/'),'ROOMS carries the Clubs');
 // The Learning Path Growing-up row links the room — and the room links back
 const lp=readPage('/learning-path/');
 assert.ok(lp.includes('href="/clubs/"'),'Growing-up classrooms row links /clubs/');
 assert.ok(readPage('/clubs/').includes('href="/learning-path/"'),'Clubs links the Learning Path back');
 assert.ok(readPage('/clubs/').includes('href="/rooms/"'),'Clubs links Explore the School back');
});


