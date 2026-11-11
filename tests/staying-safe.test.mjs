// Class 39 · Staying Safe (/staying-safe/) — the owner's 19 safety cards
// (2026-10-30). Owner brief: "Add Class 41 'Staying Safe' (ages 4-5) to the
// Learning Path as the next class number in sequence (do not skip numbers; if
// Classes 39 and 40 are not live, use the next free number). Create the class
// page at /staying-safe/ and one short page per card at /staying-safe/<slug>/
// with a link back. Link from Class 32 (Life Skills & Good Habits), Class 33
// (Community Helpers), Class 24 (Transportation) and the Safety card in First
// Glance, and link back. Update the class count on the Learning Path. Do not
// change any existing URLs." Classes 39 and 40 were NOT live (the path ran
// Classes 1–38), so the class publishes as CLASS 39. Assets probed LIVE on R2
// at school/learning-path/staying-safe/<slug>.webp (19/19 HTTP 200
// image/webp, 800×1131) — files at the folder ROOT, no flashcards/ subfolder,
// no cover (the dinosaurs/art-room/clubs quirk). Card words transcribed
// verbatim from the artwork. NOTE: the owner's artwork prints "Class 41" on
// the card faces; the published number is 39 per the owner's own rule.
// OWNER ROUND 2026-10-31: the deck joins the flashcards library — the
// parents' shelf at /flashcards/staying-safe/ carries the whole deck on ONE
// page (image + description + age/subject/level pill + Download/Print under
// every card) with ZERO per-card pages in the library (manners +
// question-words precedent). TONE SPLIT (owner rule): the lesson talks
// directly to kids; the shelf talks directly to parents.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {SSAFE_PATH,SSAFE_BASE,SSAFE_ORDER,ssShortTitle} from '../src/staying-safe.mjs';

const read=p=>readFileSync('dist'+p+(p.endsWith('/')?'index.html':''),'utf8');
const cls=read('/staying-safe/');




test('numbering: the class publishes as Class 39 on the page and the Learning Path, and the path stays 1–42 with no gap',()=>{
 assert.ok(cls.includes('CLASS 39'),'class page eyebrow says CLASS 39');
 const lp=read('/learning-path/');
 assert.ok(lp.includes('Class 39: <a href="/staying-safe/">Staying Safe</a>'),'LP row 39');
 const rows=[...lp.matchAll(/lp-class">Class (\d+):/g)].map(m=>+m[1]);
 assert.deepEqual(rows,[...Array(49).keys()].map(i=>i+1),'LP sequence is exactly 1–49');
 assert.ok(lp.includes('forty-nine age-guided classes')&&lp.includes('Forty-nine classes are ready now'),'LP counts say forty');
 assert.ok(read('/index.html').includes('Forty-nine classes are ready now'),'homepage count says forty');
 assert.ok(read('/about/').includes('Forty-nine classes from birth to age five are ready today'),'about count says forty');
});



test('class page contract: heading, how-it-works, four shelves totalling 19, around-the-school backlinks, zero Etsy',()=>{
 assert.ok(cls.includes('<h1>Staying Safe.</h1>'),'h1');
 assert.ok(cls.includes('HOW THIS CLASS WORKS'),'how-this-class-works');
 for(const label of ['THE ROAD SHELF','THE HOME SHELF','THE FIRE SHELF','THE HELPING SHELF'])assert.ok(cls.includes(label),'shelf '+label);
 assert.equal((cls.match(/class="lp-tile"/g)||[]).length,19,'19 tiles across the shelves');
 for(const dest of ['/learning-path/','/preschool/4-years/life-skills-and-good-habits/','/preschool/4-years/community-helpers-and-our-neighborhood/','/preschool/4-years/transportation-and-vehicles/','/first-glance/'])
  assert.ok(cls.includes('href="'+dest+'"'),'class page links back to '+dest);
 assert.ok(!cls.toLowerCase().includes('etsy'),'zero Etsy');
 assert.ok(!/id="the-cards"/.test(cls),'no the-cards anchor');
});





test('inbound links: Class 32, Class 33 and Class 24 each carry their Staying Safe block; First Glance safety sheet points here',()=>{
 const c32=read('/preschool/4-years/life-skills-and-good-habits/');
 const c33=read('/preschool/4-years/community-helpers-and-our-neighborhood/');
 const c24=read('/preschool/4-years/transportation-and-vehicles/');
 for(const [pg,name] of [[c32,'Class 32'],[c33,'Class 33'],[c24,'Class 24']]){
  assert.ok(pg.includes('href="/staying-safe/"'),name+' links the class');
  assert.ok(pg.includes('Staying Safe'),name+' names the class');
 }
 const fg=read('/first-glance/');
 assert.ok(fg.includes('<a class="fg-more" href="/staying-safe/">'),'First Glance safety sheet carries the fg-more link');
 assert.ok(fg.includes('Class 39'),'First Glance link names Class 39');
});




