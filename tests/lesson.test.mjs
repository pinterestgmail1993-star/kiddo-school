import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {hcLesson,newbornBase} from '../src/newborn-project.mjs';
const read=f=>readFileSync(f,'utf8');
const lesson=read('dist/newborn/0-6-weeks/high-contrast-cards/index.html');

test('first lesson page follows the Kiddo School class spec',()=>{
 assert.match(lesson,/rel="canonical" href="https:\/\/kiddo-school\.pages\.dev\/newborn\/0-6-weeks\/high-contrast-cards\/"/);
 assert.match(lesson,/<title>High Contrast Cards for Newborns \(0–6 Weeks\) \| Kiddo\.school<\/title>/);
 assert.match(lesson,/content="Explore black-and-white high-contrast cards for newborns from birth to 6 weeks, with simple activities for early looking, focusing and visual tracking\."/);
 assert.match(lesson,/<h1>High-Contrast Cards for Newborns<\/h1>/);
 assert.match(lesson,/NEWBORN 1 · LESSON 1/);
 for(const chip of ['<strong>Age</strong> Birth–6 Weeks','<strong>Subject</strong> See','<strong>Class</strong> Newborn 1','<strong>Time</strong> 2–5 minutes'])assert.ok(lesson.includes(chip),chip);
 assert.ok([...lesson.matchAll(/Start Today’s Class/g)].length>=2);
 for(const c of hcLesson.cards){
  assert.match(lesson,new RegExp(c.file.replace(/\./g,'\\.')));
  assert.match(lesson,new RegExp('alt="'+c.alt+'"'));
 }
 assert.match(lesson,/data-lesson-viewer/);
 assert.match(lesson,/<button type="button" class="lv-btn" data-lv-prev>Previous<\/button>/);
 assert.match(lesson,/<button type="button" class="lv-btn" data-lv-next>Next<\/button>/);
 assert.match(lesson,/data-lv-full>Full screen<\/button>/);
 assert.match(lesson,/data-lv-finish>Finish<\/button>/);
 assert.match(lesson,/How to use these cards/);
 assert.match(lesson,/8–12 inches \(20–30 cm\)/);
 assert.match(lesson,/Every baby develops differently\.(?:<\/strong>)? Ages on Kiddo School are guides, not tests or deadlines\./);
 assert.doesNotMatch(lesson,/IQ|intelligen|brain development/i);
 assert.match(lesson,/href="\/newborn\/">Newborn Learning<\/a>/);
 assert.match(lesson,/href="\/newborn\/0-6-weeks\/">0–6 Weeks<\/a>/);
 assert.match(lesson,/href="\/subjects\/see\/">See<\/a>/);
 assert.match(lesson,/Next Class →/);
 assert.doesNotMatch(lesson,/href="[^"]*eye[^"]*"/i);
 assert.match(lesson,/BreadcrumbList/);
 assert.match(lesson,/<meta property="og:image" content="https:\/\/pub-f2fcb7[^"]*newborn-high-contrast-face\.webp">/);
 assert.match(lesson,/name="twitter:card" content="summary_large_image"/);
 const lazy=[...lesson.matchAll(/loading="lazy"/g)].length;
 assert.ok(lazy>=11,'below-fold images must lazy-load, got '+lazy);
});

test('all twelve cards are real verified R2 images at their natural 4:5 size',()=>{
 const urls=[...lesson.matchAll(/src="(https:\/\/pub-f2fcb7[^"]+\.webp)"/g)].map(m=>m[1]);
 assert.equal(new Set(urls).size,12);
 for(const c of hcLesson.cards){
  const tag=lesson.match(new RegExp('<img src="[^"]*'+c.file.replace(/\./g,'\\.')+'" width="(\\d+)" height="(\\d+)"'));
  assert.ok(tag,c.file+' embedded');
  assert.equal(tag[1],String(c.w));
  assert.equal(tag[2],String(c.h));
 }
});

test('baby, newborn, 0-6 weeks and See hub pages exist and interlink',()=>{
 const hubs=[
  ['dist/baby/index.html','https://kiddo-school.pages.dev/baby/'],
  ['dist/newborn/index.html','https://kiddo-school.pages.dev/newborn/'],
  ['dist/newborn/0-6-weeks/index.html','https://kiddo-school.pages.dev/newborn/0-6-weeks/'],
  ['dist/subjects/see/index.html','https://kiddo-school.pages.dev/subjects/see/']
 ];
 for(const [file,canonical] of hubs){
  assert.ok(existsSync(file),file);
  const html=read(file);
  assert.match(html,new RegExp('rel="canonical" href="'+canonical.replace(/[/.]/g,m=>'\\'+m)+'"'));
 }
 assert.match(read('dist/baby/index.html'),/href="\/newborn\/"/);
 for(const file of ['dist/newborn/index.html','dist/newborn/0-6-weeks/index.html','dist/subjects/see/index.html'])assert.match(read(file),/high-contrast-cards\//);
 const weeks=read('dist/newborn/0-6-weeks/index.html');
 assert.match(weeks,/Vision, bonding, sound/);
 assert.match(read('dist/newborn/index.html'),/href="\/newborn\/6-12-weeks\/faces-and-visual-tracking\/"/);
});

test('home page and navigation surface the newborn school',()=>{
 const home=read('dist/index.html');
 assert.match(home,/href="\/newborn\/0-6-weeks\/high-contrast-cards\/"/);
 // the Purple Academy hero replaced the newborn scrapbook; Class 1 is surfaced
 // through the Start Today's Class buttons and the smart hint instead.
 assert.match(home,/kiddo-homepage-hero\.webp/);
 assert.match(home,/data-tc-today/);
 const anyPage=read('dist/about/index.html');
 // Footer was simplified: Baby, Baby classes, Toddler, All subjects and
 // Browse by age no longer sit in the footer — their pages still exist.
 assert.match(anyPage,/href="\/learning-path\/">Learning Path<\/a>/);
 assert.doesNotMatch(anyPage,/href="\/baby\/">Baby<\/a>/);
 assert.doesNotMatch(anyPage,/href="\/newborn\/">Baby classes<\/a>/);
 assert.doesNotMatch(anyPage,/href="\/subjects\/">All subjects<\/a>/);
 assert.doesNotMatch(anyPage,/href="\/ages\/">Browse by age<\/a>/);
 for(const kept of ['dist/baby/index.html','dist/newborn/index.html','dist/toddler/index.html','dist/subjects/index.html','dist/ages/index.html'])
  assert.ok(read(kept).length>500,'page still exists: '+kept);
});
