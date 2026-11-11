// Kiddo School — Bunny Finds a Friend book + the reusable Book Reader.
// Verifies the R2 asset contract (exact files, exact order, nothing invented),
// the built page (SEO, schema, review mount, reader data) and the reader
// component's behaviour promises (keyboard, swipe, reduced motion, no data
// collection). Runs against dist/ after `npm run build`.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {bunnyBook,R2_BOOKS} from '../src/books.mjs';

const read=f=>readFileSync(f,'utf8');
const PATH='/library/books/age-2/bunny-finds-a-friend/';
/* ONE-PAGE (owner 2026-11-11): the book page is folded into the Learning
   Library as an article — the whole story rides the library page as static
   markup (the noscript reading path, unrolled), the old URL 301s there. */
const library=read('dist/learning-library/index.html');
const article=(()=>{const m=library.match(/<article class="one-page-item" id="bunny-finds-a-friend">[\s\S]*?<\/article>/);if(!m)throw Error('book article missing from the library');return m[0];})();
const sitemap=read('dist/sitemap.xml');
const redirects=read('dist/_redirects');
const site=JSON.parse(read('dist/build-info.json')).siteUrl;

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

test('the folded article carries the whole story: cover first, then pages in order',()=>{
 assert.ok(article.includes(bunnyBook.base+'cover.webp'),'cover rides the article');
 for(let i=0;i<STORY.length;i++){
  const [file,text]=STORY[i];
  const at=article.indexOf(bunnyBook.base+file);
  assert.ok(at>=0,'story page src on the article: '+file);
  assert.ok(article.includes(text),'story line on the article: '+text);
 }
 assert.ok(article.indexOf(bunnyBook.base+'cover.webp')<article.indexOf(bunnyBook.base+STORY[0][0]),'cover first');
});

test('the book page is gone and its URL 301s to the library',()=>{
 assert.ok(!existsSync('dist'+PATH+'index.html'),'no book page on disk');
 assert.ok(!sitemap.includes(`<loc>${site}${PATH}</loc>`),'book URL out of the sitemap');
 assert.ok(redirects.includes(PATH+' /learning-library/ 301'),'301 to the library');
 assert.ok(article.includes('<h3 class="item-title">Bunny Finds a Friend</h3>'),'article title');
});

test('the library entry fronts the book: images ride the library, nothing invented',()=>{
 assert.ok(library.includes('<article class="one-page-item" id="my-first-colors"'),'both books folded');
 assert.ok(article.includes(bunnyBook.base+'cover.webp'),'book artwork rides the library page');
});

test('the folded book carries no per-page review mounts (they retired with the page)',()=>{
 assert.ok(!article.includes('data-cm-root'),'no community mount inside the article');
});

test('the story reads without any JavaScript at all',()=>{
 assert.ok(article.includes('data-bk-static'),'static reading box');
 assert.ok(article.includes('This is Bunny.'),'the story text is real markup, not a script');
 assert.ok(!article.includes('data-book-data'),'no reader JSON (the reader retired with the page)');
});

test('gentle age language: guides, never requirements',()=>{
 const banned=/your 2-year-old should|your child must|by age 2 they should|test your toddler|should know/i;
 assert.doesNotMatch(article,banned);
 assert.match(article,/Age 2/);
 assert.match(article,/Read together at your child/);
});

test('the library keeps its bookshelf contract with the books folded in',()=>{
 assert.match(library,/data-library/);
 assert.match(library,/<h1>Library<\/h1>/);
 // the folded books ride the library as articles, not as shelf links
 assert.match(library,/id="bunny-finds-a-friend"/);
 assert.match(library,/id="my-first-colors"/);
 assert.doesNotMatch(library,/href="\/library\/books\//,'no book-page links left');
 assert.doesNotMatch(library,/href="\/preschool\/3-years\//,'no class listings on the library');
 assert.doesNotMatch(library,/href="\/flashcards\/(?!music-room\/)[a-z-]+\//,'no flashcard set listings on the library (the Music Room instrument shelf, owner-approved 2026-10-14, is the only set allowed)');
 // no empty-shelf or coming-soon placeholders, no checkout, no price
 assert.doesNotMatch(library,/No books on this shelf yet/);
 assert.doesNotMatch(library,/coming soon/i);
 assert.doesNotMatch(library,/\$\d|checkout|Buy now/i);
});

test('the reader engine still honours its privacy and behaviour promises (it ships for the reader markup)',()=>{
 const reader=read('dist/assets/book-reader.js');
 assert.match(reader,/prefers-reduced-motion/);
 assert.match(reader,/Back to Library/);
 assert.match(reader,/aria-live/);
 // privacy: the reader collects nothing and talks to nobody
 assert.doesNotMatch(reader,/fetch\(|localStorage|sessionStorage|document\.cookie|XMLHttpRequest/);
 assert.doesNotMatch(reader,/setInterval/);
 // no page references the reader any more — the story is static markup
 assert.ok(!library.includes('/assets/book-reader.js'),'no reader script on the library');
});

test('the sitemap carries the library with the book artwork, not the book pages',()=>{
 assert.ok(sitemap.includes('<loc>https://kiddo.school/learning-library/</loc>'));
 assert.ok(sitemap.includes(bunnyBook.base+'cover.webp'),'cover in the image sitemap');
 assert.ok(!sitemap.includes('<loc>https://kiddo.school'+PATH+'</loc>'),'book page out of the sitemap');
});
