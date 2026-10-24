import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fcSetBySlug} from '../src/flashcards/index.mjs';
import {LP_REGISTRY} from '../src/flashcards/lp-lessons.mjs';
import {lpContent} from '../src/flashcards/lp-sight-words.mjs';
import LIBCOPY from '../src/flashcards/libcopy/index.mjs';

const set=fcSetBySlug['sight-words'];
const C29='/preschool/4-years/storytime-and-pre-reading/';
const SW='/preschool/4-years/sight-words/';
const read=p=>readFileSync(`dist${p}index.html`,'utf8');

test('Sight Words: 52 cards, all 600x800 portrait, real files on disk, cover separate',()=>{
 assert.ok(set,'set registered');
 assert.equal(set.cards.length,52);
 assert.equal(set.cover.w,600);assert.equal(set.cover.h,800);
 assert.ok(existsSync('public/assets/sight-words/cover.webp'));
 for(const c of set.cards){
  assert.equal(c.w,600);assert.equal(c.h,800,c.slug);
  assert.ok(existsSync(`public/assets/sight-words/${c.file}`),c.file);
  assert.notEqual(c.slug,'cover');
 }
});
test('Sight Words: every card has a library page and a lesson page with exact image dimensions',()=>{
 for(const c of set.cards){
  const lib=read(`/flashcards/sight-words/${c.slug}/`);
  assert.ok(lib.includes(`src="/assets/sight-words/${c.file}"`)&&lib.includes('width="600" height="800"'),'library image '+c.slug);
  const lp=read(`${SW}${c.slug}/`);
  assert.ok(lp.includes(`data-wc-w="600" data-wc-h="800"`),'lesson canvas ratio '+c.slug);
  assert.ok(lp.includes(`src="/assets/sight-words/${c.file}?draw=1"`),'lesson image '+c.slug);
 }
});
test('Sight Words: lesson page, library card and set data never share descriptive copy',()=>{
 const reg=LP_REGISTRY.find(r=>r.slug==='sight-words');
 assert.ok(reg,'in LP_REGISTRY');
 const lib=LIBCOPY['sight-words'].cards;
 for(const c of set.cards){
  const l=lpContent[c.slug],b=lib[c.slug];
  assert.ok(l&&b,c.slug);
  for(const k of ['helps','roleplay','learn','teachTip']){
   for(const lk of Object.keys(l).filter(x=>typeof l[x]==='string')){
    assert.notEqual(b[k],l[lk],`${c.slug}: library ${k} equals lesson ${lk}`);
   }
  }
  assert.notEqual(c.intro,l.intro);
  // the picture is described once (alt text); neither page repeats it in prose
  const lessonText=JSON.stringify(l),libText=JSON.stringify(b)+c.intro;
  const pic=c.alt.split(': ')[1].split(', with the word')[0];
  assert.ok(!lessonText.includes(pic)&&!libText.includes(pic),'picture sentence repeated in prose '+c.slug);
  // no sentence of 40+ characters appears on both pages
  const sents=s=>s.split(/(?<=[.!?])\s+/).map(x=>x.trim()).filter(x=>x.length>=40);
  const lessonSents=new Set(Object.values(l).filter(v=>typeof v==='string').flatMap(sents));
  for(const v of [...Object.values(b),c.intro])for(const x of sents(v))assert.ok(!lessonSents.has(x),`shared sentence on ${c.slug}: ${x}`);
 }
 const titles=new Set(Object.values(lpContent).map(l=>l.seoTitle));
 assert.equal(titles.size,52,'unique lesson titles');
});
test('Class 29 page lists all 52 sight word lessons at their new hub URLs and links the hub + flashcards',()=>{
 const html=read(C29);
 assert.ok(html.includes('id="sight-words"'));
 for(const c of set.cards)assert.ok(html.includes(`href="${SW}${c.slug}/"`),c.slug);
 assert.ok(html.includes('href="/preschool/4-years/sight-words/"'),'links the hub');
 assert.ok(html.includes('href="/flashcards/sight-words/"'));
});
test('Sight Words hub page: all 52 lessons, flashcards and the Class 29 page linked',()=>{
 const html=read(SW);
 for(const c of set.cards)assert.ok(html.includes(`href="${SW}${c.slug}/"`),'hub tile '+c.slug);
 assert.ok(html.includes('href="/flashcards/sight-words/"'),'links the card set');
 assert.ok(html.includes(`href="${C29}"`),'links back to Class 29');
 assert.ok(html.includes('/assets/sight-words/cover.webp'),'cover fronts the hub');
});
test('Sight Words: old /learn/ lesson URLs 301 to the new hub URLs',()=>{
 const red=readFileSync('public/_redirects','utf8');
 assert.ok(red.includes('/preschool/4-years/storytime-and-pre-reading/learn/* /preschool/4-years/sight-words/:splat 301'),'splat redirect present');
});
test('Flashcards hub shows the Sight Words set with its cover',()=>{
 const html=read('/flashcards/');
 assert.ok(html.includes('/flashcards/sight-words/'));
 assert.ok(html.includes('/assets/sight-words/cover.webp'));
});

test('Sight Words: the Learning Path hub and the Age 4 hub link the lessons and the cards',()=>{
 const lp=read('/learning-path/');
 assert.ok(lp.includes(`${SW}a/`),'learning path links the first lesson');
 assert.ok(lp.includes('Class 29: <a href="/preschool/4-years/storytime-and-pre-reading/">Storytime &amp; Pre-Reading Comprehension</a> · <a href="/preschool/4-years/sight-words/">Sight Words</a>'),'row reads Class 29 · Sight Words');
 assert.ok(lp.includes('href="/flashcards/sight-words/"'),'learning path links the card set');
 assert.ok(read('/preschool/4-years/').includes('href="/preschool/4-years/sight-words/"'),'Age 4 hub links the Sight Words hub');
});
test('Sight Words: lesson pages have the right sections and no template slips',()=>{
 for(const c of set.cards){
  const lp=read(`${SW}${c.slug}/`);
  for(const h of ['How to teach it','How to say it','Where to use it'])assert.ok(lp.includes(`<h2>${h}</h2>`),`${h} on ${c.slug}`);
  assert.ok(!lp.includes('Original Canva flashcard'),'caption '+c.slug);
  const lib=read(`/flashcards/sight-words/${c.slug}/`);
  assert.ok(!/Open the (The|A|I) lesson/.test(lib),'link wording '+c.slug);
 }
});
