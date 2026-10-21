/* all-pages — THE COMPLETE DIRECTORY (owner 2026-10-21: "make a sitemap of my
   website all links in one place" → option 2, a beautiful browsable page for
   parents). /all-pages/ is generated from the whole-school search registry
   after the last page registers, so its links can never drift from the real
   site. The classifier is exhaustive: an unclassified path throws at build
   time. This test locks the core promise — EVERY indexable page on the site
   (except the directory itself) appears as a link on the directory — plus
   the search filter wiring, the section/group structure and honest counts.
   Locks: coverage vs sitemap, listed-count integrity (no dupes, no extras
   beyond /search/), 12 sections, ≥150 groups, search input + JS asset,
   data-total equals listed links, footer "All pages" link, sitemap entry. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=f=>readFileSync(f,'utf8');
const html=read('dist/all-pages/index.html');
const main=html.split('</main>')[0];
const sitemapPaths=new Set([...read('dist/sitemap.xml').matchAll(/<loc>https:\/\/kiddo\.school(.*?)<\/loc>/g)].map(m=>m[1]));
const listed=[...main.matchAll(/<li><a href="([^"]+)"/g)].map(m=>m[1]);

test('directory page exists with honest title, description and canonical',()=>{
 assert.ok(html.includes('<title>All pages on Kiddo.school — the complete directory | Kiddo.school</title>'));
 assert.ok(html.includes('rel="canonical" href="https://kiddo.school/all-pages/"'));
 assert.ok(html.includes('Every page in one place'));
 assert.ok(html.includes('index,follow'));
});

test('EVERY sitemap page is linked on the directory (the core promise)',()=>{
 const missing=[...sitemapPaths].filter(p=>p!=='/all-pages/'&&!main.includes(`href="${p}"`));
 assert.deepEqual(missing,[],'pages missing from /all-pages/: '+missing.slice(0,10).join(' '));
});

test('listed links: exactly sitemap-minus-self + /search/, no duplicates, count label honest',()=>{
 assert.equal(listed.length,sitemapPaths.size); // sitemap includes /all-pages/, listing adds /search/ — net zero
 assert.equal(new Set(listed).size,listed.length,'duplicate links on the directory');
 assert.ok(listed.includes('/search/'),'the noindex search page is still listed for parents');
 assert.ok(!listed.includes('/all-pages/'),'the directory does not list itself');
 assert.equal(main.match(/data-total="(\d+)"/)[1],String(listed.length));
 assert.ok(html.includes(`All ${listed.length.toLocaleString('en-US')} pages of Kiddo.school`));
});

test('structure: 12 sections, plenty of collapsible groups, chips nav',()=>{
 assert.equal([...main.matchAll(/<section class="ap-sec wrap"/g)].length,12);
 const groups=[...main.matchAll(/<details class="ap-group"/g)].length;
 assert.ok(groups>=150,'expected ≥150 groups, got '+groups);
 assert.ok(main.includes('<nav class="ap-chips"'));
 assert.equal([...main.matchAll(/<a href="#ap-/g)].length,12,'chip per section');
});

test('search filter wiring: input, counter with data-total, deferred JS asset',()=>{
 assert.ok(main.includes('<input id="ap-q" type="search"'));
 assert.ok(main.includes('<label for="ap-q">Search all pages</label>'));
 assert.ok(main.includes('<span class="ap-count" id="ap-count"'));
 assert.ok(html.includes('<script src="/assets/all-pages.js?v='));
});

test('parents can always find it: footer link on every page + sitemap entry',()=>{
 assert.ok(read('dist/index.html').includes('<a href="/all-pages/">All pages</a>'));
 assert.ok(read('dist/learning-path/index.html').includes('<a href="/all-pages/">All pages</a>'));
 assert.ok(sitemapPaths.has('/all-pages/'));
});

test('spot checks: known pages live in the right sections',()=>{
 const sec=id=>main.split(`id="ap-${id}"`)[1].split('</section>')[0];
 assert.ok(sec('start').includes('href="/"'));
 assert.ok(sec('preschool').includes('href="/preschool/4-years/sight-words/"'),'sight-words under preschool');
 assert.ok(sec('extra').includes('href="/nature-club/animals/"'),'nature club under extra');
 assert.ok(sec('flashcards').includes('href="/flashcards/animal-categories/amphibians/"'),'amphibians card under flashcards');
 assert.ok(sec('worksheets').includes('href="/worksheets/phonics/"'),'phonics under worksheets');
 assert.ok(sec('parents').includes('href="/grown-ups/"'));
 const fc=sec('flashcards');
 assert.ok((fc.match(/<details class="ap-group"/g)||[]).length>=54,'53 sets + the hub wall under flashcards');
});
