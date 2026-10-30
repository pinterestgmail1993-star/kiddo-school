// The School Hall room (/school-hall/ + one short page per holiday) — the
// owner's 2026-10-30 brief: a hub with a calendar of the five named holidays
// (Halloween, Thanksgiving, Christmas, Valentine's Day, Eid) with the NEXT
// holiday first; each holiday keeps ONE short page at /<holiday>/ whose URL
// stays the same every year, linking back to the Hall; the Hall is listed
// under School Rooms with the other rooms; Class 34 and the Art Room link to
// it, and it links back; "talk directly to kids" on the holiday pages (what
// it is, why we celebrate, activities); STILL zero per-card URLs (standing
// rule) — the Halloween sets download and print straight from /halloween/;
// zero Etsy mentions; no anchor links; no existing URL changed.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {hallCalendar,HALL_HOLIDAYS,HW_ALL_CARDS} from '../src/school-hall.mjs';

const hall=readFileSync('dist/school-hall/index.html','utf8');
const read=p=>readFileSync('dist'+p+(p.endsWith('/')?'index.html':''),'utf8');
const HOLIDAY_PATHS=['/halloween/','/thanksgiving/','/christmas/','/valentines-day/','/eid/'];

test('six URLs only: the Hall hub + five holiday pages, and no per-card URL anywhere',()=>{
 assert.ok(existsSync('dist/school-hall/index.html'),'the Hall hub exists');
 for(const p of HOLIDAY_PATHS)assert.ok(existsSync('dist'+p+'index.html'),'holiday page '+p);
 // zero per-card URLs (standing owner rule): nothing under /halloween/<card>/
 for(const c of HW_ALL_CARDS)assert.ok(!existsSync('dist/halloween/'+c.file.replace('.webp','')+'/'),'no card page for '+c.file);
 assert.ok(!existsSync('dist/halloween/learn'),'no lessons directory');
 assert.ok(!existsSync('dist/flashcards/halloween/'),'no library set either');
});

test('the calendar: five holidays, the NEXT one first, every holiday linked',()=>{
 assert.equal(HALL_HOLIDAYS.length,5,'the five holidays the owner named');
 const cal=hallCalendar();
 assert.equal(cal.length,5);
 for(let i=1;i<cal.length;i++)assert.ok(cal[i-1].iso<=cal[i].iso,'calendar stays date-sorted: '+cal[i-1].iso+' before '+cal[i].iso);
 assert.equal(cal[0].name,'Halloween','the next holiday comes first');
 // the hub page carries them in that order, first flagged as next
 const ol=hall.slice(hall.indexOf('<ol class="hall-cal">'),hall.indexOf('</ol>'));
 let at=-1;
 for(const h of cal){
  const i=ol.indexOf('href="'+h.path+'"');
  assert.ok(i>-1,'calendar links '+h.path);
  assert.ok(i>at,'calendar order on the page: '+h.name);at=i;
 }
 assert.ok(ol.includes('coming up next'),'the first day is flagged');
 assert.ok(hall.includes('the moon decides'),'the Eid honest-dates note');
});

test('the Hall is listed under School Rooms with the other rooms (home + /rooms/)',()=>{
 const home=read('/');
 assert.ok(home.includes('href="/school-hall/"'),'homepage School Rooms section carries the Hall');
 assert.ok(home.includes('Eight rooms'),'homepage copy counts eight rooms');
 const rooms=read('/rooms/');
 assert.ok(rooms.includes('href="/school-hall/"'),'the rooms hub carries the Hall');
 assert.ok(rooms.includes('Eight rooms'),'rooms hub copy counts eight rooms');
 const sec=home.slice(home.indexOf('id="school-rooms"'),home.indexOf('id="school-rooms"')+16000);
 assert.ok(sec.includes('school/hall/halloween/action-verbs/01-cat-ghost-pumpkin-bat.webp'),'the Hall room card shows the deck\u2019s own artwork');
});

test('halloween page: what/why spoken to kids, activities, and 34 cards with Download + Print',()=>{
 const page=read('/halloween/');
 assert.ok(page.includes('WHAT IS HALLOWEEN?')&&page.includes('TRY IT'),'what-is + activities sections');
 assert.ok(page.includes('trick or treat'),'talked directly to kids');
 // the four sets, exactly as uploaded (12 action + 11 activities + 5 feelings + 6 items = 34)
 assert.equal(HW_ALL_CARDS.length,34);
 assert.ok(page.includes('hall/halloween/action-verbs/01-cat-ghost-pumpkin-bat.webp'),'action set present');
 assert.ok(page.includes('hall/halloween/activities/01-pumpkin-carving-costume-parade-apple-bobbing-trick-or-treat.webp'),'activities set present');
 assert.ok(page.includes('hall/halloween/feelings-and-emotions/01-happy-sad-angry-scared.webp'),'feelings set present');
 assert.ok(page.includes('hall/halloween/items/01-pumpkin-ghost-bat-witch.webp'),'items set present');
 const dls=[...page.matchAll(/href="https:\/\/assets\.kiddo\.school\/school\/hall\/halloween\/[a-z-]+\/[0-9a-z-]+\.webp" download/g)];
 assert.equal(dls.length,34,'34 download buttons');
 assert.equal([...page.matchAll(/data-mn-print/g)].length,34,'34 print buttons');
 // back to the Hall + zero per-card links
 assert.ok(page.includes('href="/school-hall/"'),'links back to the Hall');
 assert.ok(!/href="\/halloween\/[0-9]/.test(page),'no per-card links under /halloween/');
 assert.ok(page.includes('/assets/manners.js'),'loads the one-page print handler');
});

test('the four short holiday pages: what/why + activities, kid voice, back to the Hall',()=>{
 for(const [p,why] of [['/thanksgiving/','thank you'],['/christmas/','December 25'],['/valentines-day/','Valentine'],['/eid/','Eid Mubarak']]){
  const page=read(p);
  assert.ok(page.includes('WHAT IS'),'what-it-is section on '+p);
  assert.ok(page.includes('TRY IT'),'activities section on '+p);
  assert.ok(page.includes(why),'the core idea named on '+p);
  assert.ok(page.includes('href="/school-hall/"'),'links back to the Hall from '+p);
  assert.ok(!/[Ee]tsy/.test(page),'no Etsy mention on '+p);
  const jumps=[...page.matchAll(/href="#([a-z][a-z-]*)"/g)].map(m=>m[1]).filter(id=>id!=='main');
  assert.deepEqual(jumps,[],'no jump links on '+p);
 }
 assert.ok(read('/eid/').includes('follows the moon'),'Eid page says the date moves');
});

test('cross-links both ways: Class 34 and the Art Room — and back',()=>{
 const cls34=read('/preschool/4-years/weather-seasons-and-what-we-wear/');
 assert.ok(cls34.includes('SEASONS &amp; SPECIAL DAYS')&&cls34.includes('href="/school-hall/"'),'Class 34 links to the Hall');
 const art=read('/art-room/');
 assert.ok(art.includes('Make it for the celebration')&&art.includes('href="/school-hall/"'),'the Art Room links to the Hall');
 // the Hall links back to both
 for(const href of ['/preschool/4-years/weather-seasons-and-what-we-wear/','/art-room/','/rooms/'])
  assert.ok(hall.includes(`href="${href}"`),'Hall links back to '+href);
});

test('wiring: search index, sitemap and /all-pages/ carry all six — and nothing per card',()=>{
 const search=readFileSync('dist/assets/search-index.json','utf8');
 for(const p of ['/school-hall/',...HOLIDAY_PATHS])assert.ok(search.includes('"'+p+'"')||search.includes(p),'search index has '+p);
 const xml=readFileSync('dist/sitemap.xml','utf8');
 for(const p of ['/school-hall/',...HOLIDAY_PATHS])assert.ok(xml.includes('<loc>https://kiddo.school'+p+'</loc>'),'sitemap has '+p);
 assert.ok(!xml.includes('/halloween/01-'),'sitemap has no per-card halloween URLs');
 const all=read('/all-pages/');
 for(const p of ['/school-hall/',...HOLIDAY_PATHS])assert.ok(all.includes('href="'+p+'"'),'all-pages lists '+p);
});

test('page hygiene: zero Etsy, no anchor links, unique metadata on all six',()=>{
 const pages=[hall,...HOLIDAY_PATHS.map(read)];
 for(const html of pages){
  assert.ok(!/[Ee]tsy/.test(html),'no Etsy mention');
  const jumps=[...html.matchAll(/href="#([a-z][a-z-]*)"/g)].map(m=>m[1]).filter(id=>id!=='main');
  assert.deepEqual(jumps,[],'no jump links beyond the skip link');
  assert.ok(!html.includes('&amp;amp;')&&!html.includes('&#39;#39'),'no double escapes');
  assert.equal([...html.matchAll(/<h1[ >]/g)].length,1,'exactly one h1');
 }
 // each holiday page links the other holidays (the Hall calendar rows)
 const eid=read('/eid/');
 for(const p of HOLIDAY_PATHS.filter(p=>p!=='/eid/'))assert.ok(eid.includes('href="'+p+'"'),'Eid page links '+p);
});

test('no existing URL changed: the anchors keep their paths and titles',()=>{
 for(const [p,t] of [['/rooms/','School Rooms'],['/art-room/','The Art Room'],['/preschool/4-years/weather-seasons-and-what-we-wear/','Class 34']]){
  const html=read(p);
  assert.ok(html.includes(`<title>${t}`),'title intact for '+p);
 }
});
