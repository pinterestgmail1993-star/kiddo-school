// Kiddo School — My First Colors book. Verifies the R2 asset contract (the
// owner's exact eleven files, the owner's reading order — all eight colors
// first, then the find-the-colors challenge, then the celebration ending —
// nothing invented), the built page (SEO, schema, review mount, reader data,
// honest premium copy) and the Library listing (Educational Books shelf,
// ages 2–3, Read Free label, page-1 cover thumbnail). Runs against dist/
// after `npm run build`.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {myFirstColors,R2_SCHOOL} from '../src/books.mjs';

const read=f=>readFileSync(f,'utf8');
const PATH='/library/books/age-2/my-first-colors/';
/* ONE-PAGE (owner 2026-11-11): folded into the Learning Library, story and all. */
const library=read('dist/learning-library/index.html');
const article=(()=>{const m=library.match(/<article class="one-page-item" id="my-first-colors">[\s\S]*?<\/article>/);if(!m)throw Error('book article missing from the library');return m[0];})();
const sitemap=read('dist/sitemap.xml');
const redirects=read('dist/_redirects');
const site=JSON.parse(read('dist/build-info.json')).siteUrl;

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

test('the folded article carries the whole reading order: eight colors, the challenge, the ending',()=>{
 assert.ok(article.includes(BASE+COVER),'cover rides the article');
 for(let i=0;i<STORY.length;i++){
  const [file,text]=STORY[i];
  assert.ok(article.includes(BASE+file),'story page src: '+file);
  assert.ok(article.includes(text),'transcribed line: '+text);
 }
 assert.ok(article.indexOf(BASE+'my-first-colors-page-02.png')<article.indexOf(BASE+'my-first-colors-page-07.png'),'colors come before the challenge');
});

test('the book page is gone and its URL 301s to the library',()=>{
 assert.ok(!existsSync('dist'+PATH+'index.html'),'no book page on disk');
 assert.ok(!sitemap.includes(`<loc>${site}${PATH}</loc>`),'book URL out of the sitemap');
 assert.ok(redirects.includes(PATH+' /learning-library/ 301'),'301 to the library');
 assert.ok(article.includes('<h3 class="item-title">My First Colors</h3>'),'article title');
 assert.ok(article.includes('Read online as often as you like'),'reading promise kept');
});

test('the library carries both folded books with the owner\u2019s artwork',()=>{
 assert.ok(article.includes(BASE+COVER),'book artwork rides the library page');
 assert.ok(library.includes('<article class="one-page-item" id="bunny-finds-a-friend"'),'both books folded');
});

test('the folded book carries no per-page review mounts (they retired with the page)',()=>{
 assert.ok(!article.includes('data-cm-root'),'no community mount inside the article');
});

test('the story reads without any JavaScript at all',()=>{
 assert.ok(article.includes('data-bk-static'),'static reading box');
 assert.ok(article.includes('Red \u2014 a juicy red apple!'),'the story text is real markup, not a script');
 assert.ok(!article.includes('data-book-data'),'no reader JSON (the reader retired with the page)');
});

test('no premium placeholder on the folded book: no checkout, no price, no fake button',()=>{
 assert.doesNotMatch(article,/Get Printable PDF/);
 assert.doesNotMatch(article,/coming soon/i);
 assert.doesNotMatch(article,/\$\d|checkout|Buy now/i);
});

test('gentle age language: guides, never requirements',()=>{
 const banned=/your 2-year-old should|your child must|by age 2 they should|test your toddler|should know/i;
 assert.doesNotMatch(article,banned);
 assert.match(article,/Age 2/);
});

test('the library keeps its Educational Books shelf contract with the book folded in',()=>{
 assert.match(library,/data-cat="educational"/,'educational shelf present');
 assert.match(library,/id="my-first-colors"/,'the book rides the library');
 assert.doesNotMatch(library,/href="\/library\/books\//,'no book-page links left');
});

test('the sitemap carries the library with the book artwork, not the book page',()=>{
 assert.ok(sitemap.includes('<loc>https://kiddo.school/learning-library/</loc>'));
 assert.ok(sitemap.includes(BASE+COVER),'cover in the image sitemap');
 assert.ok(!sitemap.includes('<loc>https://kiddo.school'+PATH+'</loc>'),'book page out of the sitemap');
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
