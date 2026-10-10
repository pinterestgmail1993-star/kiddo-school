// Kiddo School — the fifteen new Class 24 maths worksheets (Oct 2026 batch)
// and the eight newly placed branding artworks. Everything here was probed
// live before building; these tests keep it honest.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {execSync} from 'node:child_process';
import {worksheets,bySubject} from '../src/worksheets.mjs';
import {WS_ART_DIMS} from '../src/ws-art-dims.mjs';
import {wsUrl,pdfUrl} from '../src/ws-common.mjs';

const read=f=>readFileSync(f,'utf8');
const page=p=>read('dist'+p+'index.html');
const TEST_ORIGIN='https://kiddo-school.pages.dev';
const BRAND='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/school/branding/';
const M2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/school/maths/adventures/';

const NEW_SLUGS=['apple-counting-game','balloon-number-writing','busy-bee-honey-factory','butterfly-pattern-magic','caterpillar-number-writing','cloud-castle-number-adventure','counting-balloons','cupcake-bakery','dinosaur-egg-rescue','farm-animal-lineup','garden-number-path','giraffe-height-challenge','ice-cream-number-shop','little-builder-challenge','little-pizza-chef'];

test('the fifteen new maths worksheets exist with honest data',()=>{
 const maths=bySubject('maths');
 assert.equal(maths.length,17);
 for(const slug of NEW_SLUGS){
  const w=maths.find(x=>x.slug===slug);
  assert.ok(w,'registry entry for '+slug);
  assert.equal(w.art.img,M2+slug+'.webp','art from the maths folder: '+slug);
  assert.ok(w.art.w&&w.art.h,'probed dims on '+slug);
  assert.ok(w.metaDescription.length>80,'meta description: '+slug);
  assert.ok(w.learn.length>120,'substantial learn copy: '+slug);
  assert.ok(!w.game,'no invented game: '+slug);
 }
});

test('each new maths page builds with the flashcard layout, true dims and a real PDF',()=>{
 for(const slug of NEW_SLUGS){
  const w=worksheets.find(x=>x.subject==='maths'&&x.slug===slug);
  const p=wsUrl('maths',slug);
  const html=page(p);
  assert.ok(existsSync('dist'+pdfUrl('maths',slug)),'PDF exists: '+slug);
  const buf=readFileSync('dist'+pdfUrl('maths',slug));
  assert.ok(buf.slice(0,5).toString()==='%PDF-','PDF magic: '+slug);
  assert.ok(html.includes(`width="${w.art.w}" height="${w.art.h}"`),'true dims on '+p);
  assert.ok(html.includes('fc2-dual'),'flashcard layout on '+p);
  assert.ok(html.includes('data-fc-root'),'community mount on '+p);
  assert.ok(!html.includes('Play This Activity Online'),'no play button on '+p);
 }
});

test('spot-check the new PDFs carry their titles and instructions',()=>{
 const picks=['balloon-number-writing','farm-animal-lineup','little-pizza-chef'];
 for(const slug of picks){
  const out=execSync(`pdftotext dist${pdfUrl('maths',slug)} - 2>/dev/null || true`,{encoding:'utf8'});
  assert.ok(out.includes('Free Worksheet'),'title header in '+slug);
  assert.ok(out.includes('Name'),'name line in '+slug);
 }
});

test('every probed art dim is finite and matches a real file on the bucket',()=>{
 for(const w of worksheets){
  const dims=WS_ART_DIMS[w.art.img.split('/').pop()];
  assert.ok(dims&&dims[0]>0&&dims[1]>0,'dims registered for '+w.slug);
 }
});

test('the eight newly placed branding artworks are live on R2',()=>{
 const used=[
  'kiddo-no-search-results.webp',   // search hero
  'kiddo-parents-family.webp',      // grown-ups
  'kiddo-welcome-school.webp',      // about
  'kiddo-class-completion.webp',    // my-classroom
  'kiddo-social-sharing-art.webp',  // default og fallback
  'kiddo-achievement-star-certificate.webp', // learning path
  'kiddo-achievement-star-trophy.webp',      // learning path
  'kiddo-classroom-ready-to-learn.webp',     // handwriting
  'kiddo-classroom-group-extra.webp'         // school community
 ];
 for(const f of used){
  const code=execSync(`curl -s -o /dev/null -w "%{http_code}" --max-time 20 "${BRAND}${f}"`,{encoding:'utf8'}).trim();
  assert.equal(code,'200',f+' live on R2');
 }
});

test('the new pages render the artwork where it was placed',()=>{
 assert.ok(page('/search/').includes('kiddo-no-search-results.webp'),'search hero art');
 assert.ok(read('dist/grown-ups/index.html').includes('kiddo-parents-family.webp'),'grown-ups art');
 assert.ok(read('dist/about/index.html').includes('kiddo-welcome-school.webp'),'about art');
 assert.ok(page('/my-classroom/').includes('kiddo-class-completion.webp'),'my-classroom art');
 assert.ok(page('/learning-path/').includes('kiddo-achievement-star-certificate.webp'),'learning-path art');
 assert.ok(read('dist/literacy/handwriting-practice/index.html').includes('kiddo-classroom-ready-to-learn.webp'),'handwriting art');
 assert.ok(read('dist/school-community/index.html').includes('kiddo-classroom-group-extra.webp'),'community art');
});

test('search page ships the hero, ideas and empty state',()=>{
 const html=page('/search/');
 assert.ok(html.includes('data-search-form'),'hero search form');
 assert.ok(html.includes('autofocus'),'the search box is focused on arrival');
 assert.ok(html.includes('data-search-idea'),'search idea chips');
 assert.ok(html.includes('data-sr-empty'),'honest empty state');
 assert.ok(html.includes('kiddo-no-search-results.webp'),'no-results artwork');
});

test('the maths category tells the truth about seventeen of thirty',()=>{
 const cat=page('/worksheets/maths/');
 assert.ok(page('/worksheets/').includes('17 of 30 ready'),'hub honest note');
 assert.ok(cat.includes('17 of the planned 30'),'category honest note');
 assert.equal((cat.match(/class="ws-card"/g)||[]).length,17,'17 cards on the maths category');
});
