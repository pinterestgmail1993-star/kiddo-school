import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fcSetBySlug} from '../src/flashcards/index.mjs';
import {LP_REGISTRY} from '../src/flashcards/lp-lessons.mjs';
import {lpContent} from '../src/flashcards/lp-sight-words.mjs';
import LIBCOPY from '../src/flashcards/libcopy/index.mjs';

const set=fcSetBySlug['sight-words'];
const C29='/preschool/4-years/storytime-and-pre-reading/';
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
  const lp=read(`${C29}learn/${c.slug}/`);
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
   for(const lk of ['what','mean','know','why','dev','say','notice','ask','childSay','real','play','check','tips']){
    assert.notEqual(b[k],l[lk],`${c.slug}: library ${k} equals lesson ${lk}`);
   }
  }
  assert.notEqual(c.intro,l.what);assert.notEqual(c.intro,l.intro);
 }
 const titles=new Set(Object.values(lpContent).map(l=>l.seoTitle));
 assert.equal(titles.size,52,'unique lesson titles');
});
test('Class 29 page lists all 52 sight word lessons and links the flashcards',()=>{
 const html=read(C29);
 assert.ok(html.includes('id="sight-words"'));
 for(const c of set.cards)assert.ok(html.includes(`href="${C29}learn/${c.slug}/"`),c.slug);
 assert.ok(html.includes('href="/flashcards/sight-words/"'));
});
test('Flashcards hub shows the Sight Words set with its cover',()=>{
 const html=read('/flashcards/');
 assert.ok(html.includes('/flashcards/sight-words/'));
 assert.ok(html.includes('/assets/sight-words/cover.webp'));
});
