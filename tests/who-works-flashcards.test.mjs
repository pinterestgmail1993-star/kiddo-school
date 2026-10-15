// who-works-flashcards — the School People library set (owner request
// 2026-10-15: "you didn't [make] library flashcards of who works at my school
// in case they want to download these"). The people page /who-works-at-my-
// school/ showed the 16 person cards but nothing could be downloaded; this
// set gives every person a card page of its own with a download button.
// Locks: set shape and probed dims (all 1000×707), the owner's three groups,
// 16 card pages with unique titles + download buttons, the people page's 14
// tile links + 2 owner-ordered doors, the set link line, hub shelf, sitemap,
// and the honest non-class framing (no Learning Path claims, no lessons).
import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {fcSetBySlug} from '../src/flashcards/index.mjs';
import {TEACH,HELP,SAFE,WW_BASE,WW_PATH} from '../src/who-works.mjs';

const read=p=>readFileSync('dist'+p+'index.html','utf8');
const SET=fcSetBySlug['who-works-at-my-school'];
const SETPATH='/flashcards/who-works-at-my-school/';
const PEOPLE=[...TEACH,...HELP,...SAFE];
const site='https://kiddo.school';

test('school-people set: 16 cards, three owner groups, true probed dims',()=>{
 assert.ok(SET,'set exists in SOURCES');
 assert.equal(SET.cards.length,16,'16 person cards');
 assert.equal(SET.pillGroups.length,3,'three pill groups');
 assert.deepEqual(SET.pillGroups.map(g=>g[2].length),[6,5,5],'teach 6, help 5, safe 5 — the owner split');
 for(const c of SET.cards){
  assert.equal(c.w,1000,'landscape width probed');assert.equal(c.h,707,'landscape height probed');
  assert.ok(c.img.startsWith(WW_BASE),c.slug+' image lives in the owner folder');
  assert.ok(c.ages&&c.pill,c.slug+' carries age + group pills');
 }
 assert.equal(SET.stageName,null,'no Learning Path stage — people, not a class');
 assert.equal(SET.classUrl,WW_PATH,'the set points back to the people page');
});

test('school-people set page: groups render, class button is honest',()=>{
 const html=read(SETPATH);
 assert.ok(html.includes('Who Works at My School flashcards'),'h1');
 assert.ok(html.includes('People who teach')&&html.includes('People who help')&&html.includes('People who keep us safe'),'three group headings');
 for(const g of SET.pillGroups)assert.ok(html.includes(esc(g[0])),'group heading rendered: '+g[0]);
 assert.ok(html.includes('Open the Who Works people page'),'honest class button (a page, not a class)');
 assert.ok(!html.includes('class on the Learning Path'),'no Learning Path claim on the set page');
 const imgs=[...html.matchAll(new RegExp('<img src="'+WW_BASE,'g'))].length;
 assert.equal(imgs,16,'16 person images on the set page');
});

test('school-people card pages: every person has a page with a download button',()=>{
 for(const p of PEOPLE){
  const html=read(SETPATH+p.slug+'/');
  assert.ok(html.includes('Download card'),'download button on '+p.slug);
  assert.ok(html.includes(`href="${WW_BASE}${p.slug}.webp"`),'full-size R2 download href on '+p.slug);
  assert.ok(html.includes('data-tc-print-view'),'Print this card on '+p.slug);
  assert.ok(html.includes(`width="1000" height="707"`),'true dims on '+p.slug+' hero');
  assert.ok(html.includes('people page'),'people-page link on '+p.slug);
  const t=[...html.matchAll(/<title>([^<]+)<\/title>/g)].map(m=>m[1]);
  assert.equal(new Set(t).size,1,'one title tag on '+p.slug);
 }
 const titles=PEOPLE.map(p=>read(SETPATH+p.slug+'/').match(/<title>([^<]+)<\/title>/)[1]);
 assert.equal(new Set(titles).size,16,'16 unique card-page titles');
});

test('people page: 14 tiles open card pages, the two doors stay doors',()=>{
 const html=read(WW_PATH);
 for(const p of PEOPLE){
  if(p.slug==='principal'||p.slug==='school-nurse')continue;
  assert.ok(html.includes(`href="${SETPATH}${p.slug}/"`),p.slug+' tile opens its card page');
 }
 assert.ok(html.includes('href="/principals-office/"'),'principal door intact');
 assert.ok(html.includes('Visit the Principal’s Office'),'principal door label intact');
 assert.ok(html.includes('href="/extra-classes/doctor-visit/"'),'nurse door intact');
 assert.ok(html.includes('Meet the nurse at the doctor'),'nurse door label intact');
 assert.ok(html.includes(`href="${SETPATH}"`),'the whole School People set is linked');
 assert.ok(html.includes('open the whole School People set'),'set link line present');
});

test('school-people is discoverable: hub shelf, sitemap, related sets',()=>{
 const hub=read('/flashcards/');
 assert.ok(hub.includes('href="'+SETPATH+'"'),'flashcards hub lists the set');
 const xml=readFileSync('dist/sitemap.xml','utf8');
 assert.ok(xml.includes('<loc>'+site+SETPATH+'</loc>'),'set in sitemap');
 for(const p of PEOPLE)assert.ok(xml.includes('<loc>'+site+SETPATH+p.slug+'/</loc>'),p.slug+' in sitemap');
 const rel=read(SETPATH+'teacher/');
 assert.ok(rel.includes('href="/flashcards/classroom/object-'),'related cards reach the Classroom set');
});

function esc(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
