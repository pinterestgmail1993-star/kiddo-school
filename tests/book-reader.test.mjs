// Kiddo School — Bunny Finds a Friend book + the reusable Book Reader.
// Verifies the R2 asset contract (exact files, exact order, nothing invented),
// the built page (SEO, schema, review mount, reader data) and the reader
// component's behaviour promises (keyboard, swipe, reduced motion, no data
// collection). Runs against dist/ after `npm run build`.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {bunnyBook,R2_BOOKS} from '../src/books.mjs';

const read=f=>readFileSync(f,'utf8');
const PATH='/library/books/age-2/bunny-finds-a-friend/';
const page=read('dist'+PATH+'index.html');
const library=read('dist/learning-library/index.html');
const reader=read('dist/assets/book-reader.js');
const sitemap=read('dist/sitemap.xml');
const site=JSON.parse(read('dist/build-info.json')).siteUrl;
const data=JSON.parse(page.match(/<script type="application\/json" data-book-data>(.*?)<\/script>/s)[1]);
const schema=JSON.parse(page.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);

const STORY=[
 ['01-this-is-bunny.webp','This is Bunny.'],
 ['02-bunny-sees-a-butterfly.webp','Bunny sees a butterfly.'],
 ['03-bunny-follows-the-butterfly.webp','Bunny follows the butterfly.'],
 ['04-butterfly-flies-over-flowers.webp','The butterfly flies over the flowers.'],
 ['05-bunny-sees-a-ladybug.webp','Bunny sees a ladybug.'],
 ['06-bunny-sees-a-snail.webp','Bunny sees a snail.'],
 ['07-bunny-sees-a-bee.webp','Bunny sees a bee.'],
 ['08-bunny-makes-a-new-friend.webp','Bunny makes a new friend!']
];

test('book data: exact R2 files in exact story order, nothing invented',()=>{
 assert.equal(bunnyBook.path,PATH);
 assert.equal(bunnyBook.cover.file,'cover.webp');
 assert.equal(bunnyBook.pages.length,8);
 STORY.forEach(([file,text],i)=>{
  assert.equal(bunnyBook.pages[i].file,file,'page order '+i);
  assert.equal(bunnyBook.pages[i].text,text,'story line '+i);
  assert.ok(bunnyBook.pages[i].alt.length>=20,'alt text on page '+i);
 });
 assert.equal(bunnyBook.base,R2_BOOKS+'age-2/bunny-finds-a-friend/');
});

test('alt text describes the artwork, never search keywords',()=>{
 const banned=/picture book|picture books|2 year old|2-year-old|toddler|interactive story|online book/i;
 assert.doesNotMatch(bunnyBook.cover.alt,banned);
 for(const p of bunnyBook.pages)assert.doesNotMatch(p.alt,banned,p.file);
});

test('reader data carries the whole book: cover, pages, text, completion',()=>{
 assert.equal(data.cover.src,bunnyBook.base+'cover.webp');
 assert.equal(data.pages.length,8);
 data.pages.forEach((p,i)=>{
  assert.equal(p.src,bunnyBook.base+bunnyBook.pages[i].file);
  assert.equal(p.text,STORY[i][1]);
  assert.ok(p.w>0&&p.h>0,'reserved dimensions on page '+i);
 });
 assert.match(data.completionTitle,/You finished Bunny Finds a Friend!/);
 assert.equal(data.backHref,'/learning-library/');
});

test('page SEO: title, meta, canonical, one H1, breadcrumbs',()=>{
 assert.equal(page.match(/<title>(.*?)<\/title>/)[1],'Bunny Finds a Friend | Picture Book for 2 Year Olds | Kiddo.school');
 assert.equal(page.match(/name="description" content="([^"]+)"/)[1],bunnyBook.description);
 assert.equal(page.match(/rel="canonical" href="([^"]+)"/)[1],site+PATH);
 assert.equal([...page.matchAll(/<h1[ >]/g)].length,1);
 assert.match(page,/<h1>Bunny Finds a Friend<\/h1>/);
 assert.match(page,/href="\/learning-library\/">Learning Library<\/a>/);
 assert.match(page,/href="\/learning-library\/#books">Books<\/a>/);
 assert.match(page,/href="\/toddler\/2-years\/">Age 2<\/a>/);
});

test('structured data: a factual Book and a 5-step BreadcrumbList, nothing invented',()=>{
 const types=schema.map(s=>s['@type']);
 assert.ok(types.includes('Book')&&types.includes('BreadcrumbList'));
 const bk=schema.find(s=>s['@type']==='Book');
 assert.equal(bk.name,'Bunny Finds a Friend');
 assert.equal(bk.url,site+PATH);
 assert.equal(bk.image,bunnyBook.base+'cover.webp');
 assert.equal(bk.isAccessibleForFree,true);
 for(const s of schema){
  const json=JSON.stringify(s);
  assert.ok(!/ISBN|isbn|AggregateRating|publisher|award|reviewCount/i.test(json),'no invented credentials in schema');
 }
 const bc=schema.find(s=>s['@type']==='BreadcrumbList');
 assert.equal(bc.itemListElement.length,5);
 assert.deepEqual(bc.itemListElement.map(i=>i.name),['Home','Learning Library','Books','Age 2','Bunny Finds a Friend']);
});

test('the review system is the real moderated backend, asked as a story',()=>{
 assert.match(page,/data-cm-root data-page-path="\/library\/books\/age-2\/bunny-finds-a-friend\/"/);
 assert.match(page,/How was this story\?/);
 assert.doesNotMatch(page,/How was this activity\?/);
 for(const label of ['Loved it','Liked it','It was okay','Not for us'])assert.ok(page.includes(label),label);
 assert.match(page,/data-cm-comment/);
});

test('reader component: mounted with the reusable script and cover-first HTML',()=>{
 assert.match(page,/src="\/assets\/book-reader\.js"/);
 const staticCover=page.match(/data-bk-static>\s*<div class="bk-covercard"><img src="([^"]+)"[^>]*>/);
 assert.equal(staticCover[1],bunnyBook.base+'cover.webp','cover ships in the initial HTML');
 assert.match(staticCover[0],/fetchpriority="high"/,'cover is the priority image');
 assert.match(page,/<noscript>/,'the story still reads without JavaScript');
});

test('gentle age language: guides, never requirements',()=>{
 const banned=/your 2-year-old should|your child must|by age 2 they should|test your toddler|should know/i;
 assert.doesNotMatch(page,banned);
 assert.match(page,/For ages around 2/);
 assert.match(page,/Read together at your child/);
});

test('library: Books & Stories section with the Read Book card',()=>{
 assert.match(library,/id="books"/);
 assert.match(library,/<h2>Books &amp; Stories<\/h2>/);
 const card=library.match(/<a class="lib-item" href="\/library\/books\/age-2\/bunny-finds-a-friend\/">[\s\S]*?<\/a>/);
 assert.ok(card,'book card exists in the library');
 assert.match(card[0],/Bunny Finds a Friend/);
 assert.match(card[0],/Age 2 · Picture Story/);
 assert.match(card[0],/Read Book/);
 assert.match(card[0],/lib-thumb--book/);
});

test('reader behaviour: keyboard, swipe, reduced motion, honest controls',()=>{
 assert.match(reader,/ArrowRight/);
 assert.match(reader,/ArrowLeft/);
 assert.match(reader,/touchstart/);
 assert.match(reader,/touchend/);
 assert.match(reader,/prefers-reduced-motion/);
 assert.match(reader,/Restart Book/);
 assert.match(reader,/Read Again/);
 assert.match(reader,/Back to Library/);
 assert.match(reader,/aria-live/);
 // privacy: the reader collects nothing and talks to nobody
 assert.doesNotMatch(reader,/fetch\(|localStorage|sessionStorage|document\.cookie|XMLHttpRequest/);
 // no autoplay: pages turn only on user action
 assert.doesNotMatch(reader,/setInterval/);
});

test('the book is in the sitemap once, under its canonical path',()=>{
 const loc=site+PATH;
 assert.equal([...sitemap.matchAll(new RegExp('<loc>'+loc.replace(/[/.]/g,'\\$&')+'</loc>','g'))].length,1);
});
