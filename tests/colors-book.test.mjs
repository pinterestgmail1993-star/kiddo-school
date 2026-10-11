// Kiddo School — My First Colors book. Verifies the R2 asset contract (the
// owner's exact eleven files, the owner's reading order — all eight colors
// first, then the find-the-colors challenge, then the celebration ending —
// nothing invented), the built page (SEO, schema, review mount, reader data,
// honest premium copy) and the Library listing (Educational Books shelf,
// ages 2–3, Read Free label, page-1 cover thumbnail). Runs against dist/
// after `npm run build`.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {myFirstColors,R2_SCHOOL} from '../src/books.mjs';

const read=f=>readFileSync(f,'utf8');
const PATH='/library/books/age-2/my-first-colors/';
const page=read('dist'+PATH+'index.html');
const library=read('dist/learning-library/index.html');
const sitemap=read('dist/sitemap.xml');
const site=JSON.parse(read('dist/build-info.json')).siteUrl;
const data=JSON.parse(page.match(/<script type="application\/json" data-book-data>(.*?)<\/script>/s)[1]);
const schema=JSON.parse(page.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);

const BASE=R2_SCHOOL+'books/my-first-colors/';
const COVER='my-first-colors-page-01.png';
const STORY=[
 ['my-first-colors-page-02.png','Red — a juicy red apple!'],
 ['my-first-colors-page-03.png','Orange — a happy orange flower!'],
 ['my-first-colors-page-04.png','Purple — a bunch of purple grapes!'],
 ['my-first-colors-page-05.png','Pink — a pretty pink flower!'],
 ['my-first-colors-page-06.png','Brown — a cuddly brown teddy bear!'],
 ['my-first-colors-page-09.png','Yellow — a bright yellow sun!'],
 ['my-first-colors-page-10.png','Blue — a beautiful blue butterfly!'],
 ['my-first-colors-page-11.png','Green — a fresh green leaf!'],
 ['my-first-colors-page-07.png','Let’s find the colors — can you find all the colors? Point and say their names!'],
 ['my-first-colors-page-08.png','Wonderful work, little explorer! The world is full of colors. Keep looking, learning, and discovering.']
];

test('book data: the owner’s exact eleven files, first page as cover, nothing invented',()=>{
 assert.equal(myFirstColors.path,PATH);
 assert.equal(myFirstColors.base,BASE);
 assert.equal(myFirstColors.cover.file,COVER,'page 1 is the cover');
 assert.equal(myFirstColors.pages.length,10,'the remaining ten pages are the story');
 assert.equal(myFirstColors.w,2000);assert.equal(myFirstColors.h,1545,'true probed dims, no crop or stretch');
 STORY.forEach(([file,text],i)=>{
  assert.equal(myFirstColors.pages[i].file,file,'page order '+i);
  assert.equal(myFirstColors.pages[i].text,text,'transcribed line '+i);
  assert.ok(myFirstColors.pages[i].alt.length>=20,'alt text on page '+i);
 });
 // the reading flow the owner asked for: eight colors, then the challenge, then the ending
 assert.equal(myFirstColors.pages[7].file,'my-first-colors-page-11.png','green is the last color page');
 assert.match(myFirstColors.pages[8].text,/find all the colors/,'the challenge comes after every color');
 assert.match(myFirstColors.pages[9].text,/Wonderful work/,'the celebration ends the book');
 const green=myFirstColors.pages[7];
 assert.equal(green.w,1999);assert.equal(green.h,1545,'page 11 ships at its own true size');
 // exactly eleven distinct files are referenced and no twelfth page exists
 const files=new Set([COVER,...myFirstColors.pages.map(p=>p.file)]);
 assert.equal(files.size,11,'eleven files, no duplicates');
 assert.ok(![...files].some(f=>/page-12/.test(f)),'no fake twelfth page');
 assert.equal(myFirstColors.category,'educational');
 assert.equal(myFirstColors.age,'age-2');
 assert.equal(myFirstColors.ageRange,'2-3');
});

test('alt text describes the artwork, never search keywords',()=>{
 const banned=/picture book|picture books|2 year old|2-year-old|toddler|interactive story|online book/i;
 assert.doesNotMatch(myFirstColors.cover.alt,banned);
 for(const p of myFirstColors.pages)assert.doesNotMatch(p.alt,banned,p.file);
});

test('reader data carries the whole book: cover first, then pages in order',()=>{
 assert.equal(data.cover.src,BASE+COVER);
 assert.equal(data.pages.length,10);
 data.pages.forEach((p,i)=>{
  assert.equal(p.src,BASE+STORY[i][0],'page src '+i);
  assert.equal(p.text,STORY[i][1]);
  assert.ok(p.w>0&&p.h>0,'reserved dimensions on page '+i);
 });
 assert.equal(data.pages[7].w,1999,'page 11 keeps its own true width');
 assert.match(data.completionTitle,/You finished My First Colors!/);
 assert.equal(data.backHref,'/learning-library/');
 assert.equal(data.backLabel,'Back to the Library');
});

test('page SEO: title, meta, canonical, one H1, breadcrumbs, free reading',()=>{
 assert.equal(page.match(/<title>(.*?)<\/title>/)[1],'My First Colors | Free Colors Picture Book Online | Kiddo.school');
 assert.equal(page.match(/name="description" content="([^"]+)"/)[1],myFirstColors.description);
 assert.equal(page.match(/rel="canonical" href="([^"]+)"/)[1],site+PATH);
 assert.equal([...page.matchAll(/<h1[ >]/g)].length,1);
 assert.match(page,/<h1>My First Colors<\/h1>/);
 assert.match(page,/href="\/learning-library\/">Library<\/a>/);
 assert.match(page,/href="\/toddler\/2-years\/">Age 2<\/a>/);
 assert.match(page,/Reading online is free/);
});

test('structured data: a factual Book and a 4-step BreadcrumbList, nothing invented',()=>{
 const types=schema.map(s=>s['@type']);
 assert.ok(types.includes('Book')&&types.includes('BreadcrumbList'));
 const bk=schema.find(s=>s['@type']==='Book');
 assert.equal(bk.name,'My First Colors');
 assert.equal(bk.url,site+PATH);
 assert.equal(bk.image,BASE+COVER);
 assert.equal(bk.isAccessibleForFree,true);
 assert.equal(bk.typicalAgeRange,'2-3');
 for(const s of schema){
  const json=JSON.stringify(s);
  assert.ok(!/ISBN|isbn|AggregateRating|publisher|award|reviewCount/i.test(json),'no invented credentials in schema');
 }
 const bc=schema.find(s=>s['@type']==='BreadcrumbList');
 assert.equal(bc.itemListElement.length,4);
 assert.deepEqual(bc.itemListElement.map(i=>i.name),['Home','Library','Age 2','My First Colors']);
});

test('the review system is the real moderated backend, asked as a story',()=>{
 assert.match(page,/data-cm-root data-page-path="\/library\/books\/age-2\/my-first-colors\/"/);
 assert.match(page,/How was this story\?/);
 assert.doesNotMatch(page,/How was this activity\?/);
 for(const label of ['Loved it','Liked it','It was okay','Not for us'])assert.ok(page.includes(label),label);
 assert.match(page,/data-cm-comment/);
});

test('reader component: mounted with the reusable script and cover-first HTML',()=>{
 assert.match(page,/src="\/assets\/book-reader\.js"/);
 const staticCover=page.match(/data-bk-static>\s*<div class="bk-covercard"><img src="([^"]+)"[^>]*>/);
 assert.equal(staticCover[1],BASE+COVER,'page 1 ships as the cover in the initial HTML');
 assert.match(staticCover[0],/width="2000" height="1545"/,'cover at its true dims');
 assert.match(page,/<noscript>/,'the whole book still reads without JavaScript');
 assert.ok(page.includes('Cover')&&page.includes('Page 1:'),'the noscript story names the cover and pages');
});

test('premium printable is coming-soon only: no checkout, no price, no fake button',()=>{
 assert.match(page,/Get Printable PDF — Premium · Coming Soon/);
 assert.match(page,/coming soon/i);
 assert.doesNotMatch(page,/\$\d|checkout link|Buy now|Add to cart/i);
 assert.match(page,/free and unlimited/);
});

test('gentle age language: guides, never requirements',()=>{
 const banned=/your 2-year-old should|your child must|by age 2 they should|test your toddler|should know/i;
 assert.doesNotMatch(page,banned);
 assert.match(page,/Age 2/);
 assert.match(page,/Read together at your child/);
});

test('library: My First Colors sits on the Educational Books shelf, labeled Read Free',()=>{
 const card=library.match(/<article class="bookcard"[\s\S]*?my-first-colors[\s\S]*?<\/article>/);
 assert.ok(card,'My First Colors card exists on the bookshelf');
 assert.match(card[0],/href="\/library\/books\/age-2\/my-first-colors\/"/);
 assert.match(card[0],/My First Colors/);
 assert.match(card[0],/Read Free/);
 assert.match(card[0],/Colors Book/);
 assert.match(card[0],/Educational Books/);
 assert.match(card[0],/data-age="age-2"/);
 // the cover thumbnail is the first page of the book, at its true dims
 assert.match(card[0],new RegExp(BASE.replace(/[/.]/g,'\\$&')+COVER));
 assert.match(card[0],/width="2000" height="1545"/);
 // the educational shelf announces one book; storybooks still hold bunny
 const eduShelf=library.slice(library.indexOf('id="cat-educational"'),library.indexOf('id="cat-activity"'));
 assert.match(eduShelf,/1 book/);
 assert.match(eduShelf,/My First Colors/);
 const storyShelf=library.slice(library.indexOf('id="cat-storybooks"'),library.indexOf('id="cat-educational"'));
 assert.match(storyShelf,/Bunny Finds a Friend/);
 assert.match(storyShelf,/Read Book/,'bunny keeps its own label');
});

test('the book is in the sitemap once, under its canonical path',()=>{
 const loc=site+PATH;
 assert.equal([...sitemap.matchAll(new RegExp('<loc>'+loc.replace(/[/.]/g,'\\$&')+'</loc>','g'))].length,1);
});

test('every referenced artwork really exists on R2 and nothing else was invented',async()=>{
 // live network check on the exact files the page ships
 const files=[COVER,...myFirstColors.pages.map(p=>p.file)];
 for(const f of files){
  const r=await fetch(BASE+f,{method:'HEAD'});
  assert.equal(r.status,200,f+' is reachable at its uploaded R2 location');
  assert.ok(r.headers.get('content-type').startsWith('image/'),f+' is an image');
 }
});
