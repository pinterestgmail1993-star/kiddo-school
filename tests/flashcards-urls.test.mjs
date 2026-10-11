// Automated guard so the wrong-URL / wrong-label flashcard bug can never
// come back. The bug: the apple/ball/cat word list was reused as the slug,
// label and copy source of every alphabet letter set, so the uppercase A
// page lived at /alphabet-uppercase/apple/ and was titled "(Apple)".
// These checks lock in the corrected system:
//   1. every card URL in the whole library is unique
//   2. letter-set cards (uppercase, lowercase, pair, sounds, tracing) use
//      /letter-x/ slugs and NEVER carry an object word in slug or copy
//   3. picture-set cards (objects) use the object word the card really shows
//   4. every card URL exists as a built page with a unique title + canonical
//   5. set grids have no download buttons — the whole card is the link
//   6. all 130 old wrong URLs are 301-redirected
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {babySet} from '../src/flashcards-project.mjs';
import {fcSets} from '../src/flashcards/index.mjs';
import {alphabetVariantSets, OBJECT_SLUGS} from '../src/flashcards/data-alphabet-variants.mjs';
import {alphabetCardContent} from '../src/flashcards/data-alphabet.mjs';

const LETTERS='abcdefghijklmnopqrstuvwxyz'.split('');
const root='dist';
const read=p=>readFileSync(join(root,p),'utf8');
const page=p=>read(join(p,'index.html').replace(/\/\//g,'/'));
const OBJECT_WORDS=OBJECT_SLUGS.map(w=>w.toLowerCase());
// Kinds whose cards show NOTHING but the letter — words like “apple” are
// forbidden in their copy. Sound cards DO show the picture, so words are
// allowed there (but their slug is still the letter slug).
const LETTER_ONLY_KINDS=['uppercase','lowercase','pair','tracing'];

function variantCard(kind,letter){
 const s=alphabetVariantSets.find(x=>x.kind===kind);
 return s.cards.find(c=>c.letter===letter);
}

test('every flashcard URL in the library is unique (cards and sets)',()=>{
 const seen=new Map();
 const bump=(url,what)=>{
  assert.ok(!seen.has(url),'duplicate URL '+url+' ('+what+' vs '+seen.get(url)+')');
  seen.set(url,what);
 };
 for(const s of alphabetVariantSets){bump(s.url,'set '+s.slug);for(const c of s.cards)bump(c.url,'card '+s.slug+'/'+c.slug);}
 for(const s of fcSets){bump(s.url,'set '+s.slug);for(const c of s.cards)bump(c.url,'card '+s.slug+'/'+c.slug);}
 for(const c of babySet.cards)bump(c.url,'card baby/'+c.slug);
 assert.ok(seen.size>500,'library inventory is complete, got '+seen.size);
});

test('letter-set cards use /letter-x/ slugs; letter-only cards never reuse object words',()=>{
 for(const kind of ['uppercase','lowercase','pair','sound','tracing']){
  for(const l of LETTERS){
   const c=variantCard(kind,l);
   assert.equal(c.slug,'letter-'+l,kind+' '+l+' slug is letter-based');
  }
 }
 for(const kind of LETTER_ONLY_KINDS){
  for(const l of LETTERS){
   const c=variantCard(kind,l);
   const hay=[c.cardTitle,c.intro,c.metaDescription,c.alt,c.label].join(' ').toLowerCase();
   for(const w of OBJECT_WORDS){
    assert.ok(!new RegExp('\\b'+w.replace(/-/g,'\\-')+'\\b').test(hay),
     kind+' letter '+l+' copy must not contain the object word "'+w+'" (slug '+c.slug+')');
   }
  }
 }
 // the exact reported bugs, pinned forever:
 assert.equal(variantCard('uppercase','a').url,'/flashcards/alphabet-uppercase/letter-a/');
 assert.ok(!variantCard('uppercase','a').cardTitle.includes('Apple'),'uppercase A is not titled Apple');
 assert.equal(variantCard('lowercase','a').url,'/flashcards/alphabet-lowercase/letter-a/');
 assert.equal(variantCard('tracing','a').url,'/flashcards/alphabet-tracing/letter-a/');
 assert.ok(variantCard('uppercase','a').cardTitle.includes('Uppercase Letter A'));
 assert.ok(variantCard('lowercase','a').cardTitle.includes('Lowercase Letter a'));
});

test('picture cards (objects + sounds) carry the object word their card shows',()=>{
 const norm=s=>s.toLowerCase().replace(/[^a-z]/g,'');
 for(const l of LETTERS){
  const word=OBJECT_SLUGS[LETTERS.indexOf(l)];
  const ob=variantCard('object',l);
  assert.equal(ob.slug,word,'objects set keeps the word slug for '+l);
  assert.equal(norm(ob.label),norm(word),'objects label is the word itself for '+l);
  const content=alphabetCardContent[word];
  assert.ok(content&&content.intro&&content.say&&content.try&&content.note,'objects '+word+' has its own words');
  const so=variantCard('sound',l);
  assert.equal(so.slug,'letter-'+l,'sounds set uses the letter slug for '+l);
  assert.ok(norm(so.label).includes(norm(word)),'sounds label names its picture for '+l);
 }
});

test('every card URL exists on disk with a unique title and canonical',()=>{
 const titles=new Map(),canonicals=new Map();
 const check=(url,label)=>{
  const html=page(url.slice(1));
  const t=(html.match(/<title>([^<]+)<\/title>/)||[])[1];
  assert.ok(t,label+' has a <title>');
  assert.ok(!titles.has(t),'duplicate <title> across flashcards: '+t);
  titles.set(t,label);
  const can=(html.match(/rel="canonical" href="([^"]+)"/)||[])[1];
  assert.ok(can&&can.endsWith(url),label+' canonical matches its own URL ('+can+')');
  assert.ok(!canonicals.has(can),'duplicate canonical: '+can);
  canonicals.set(can,label);
 };
 for(const s of alphabetVariantSets){check(s.url,'set '+s.slug);for(const c of s.cards)check(c.url,'card '+s.slug+'/'+c.slug);}
 for(const s of fcSets){check(s.url,'set '+s.slug);for(const c of s.cards)check(c.url,'card '+s.slug+'/'+c.slug);}
 for(const c of babySet.cards)check(c.url,'card baby/'+c.slug);
 // every flashcard card image points at exactly one page: no two cards share a page
});

test('set grids are tap-through: whole card is the link, zero download buttons',()=>{
 for(const s of alphabetVariantSets){
  const html=page(s.url.slice(1));
  assert.equal((html.match(/class="fcv-card" href="/g)||[]).length,26,s.url+' all 26 cards are single links');
  assert.equal((html.match(/data-fc-dl/g)||[]).length,0,s.url+' grid has no download buttons');
  assert.equal((html.match(/fcv-actions/g)||[]).length,0,s.url+' grid has no action row');
  for(const c of s.cards){
   const ch=page(c.url.slice(1));
   assert.ok(ch.includes('data-fc-dl'),c.url+' keeps its download button');
   assert.ok(ch.includes('data-tc-print-view'),c.url+' has a print button');
   assert.ok(ch.includes('SHARE THIS CARD'),c.url+' has share buttons');
   assert.ok(ch.includes('rel="prev"')&&ch.includes('rel="next"'),c.url+' has prev/next');
   assert.ok(ch.includes('href="'+s.url+'"'),c.url+' links back to its set');
  }
 }
});

test('all 130 old wrong card URLs are 301-redirected to the letter URLs',()=>{
 const red=read('_redirects');
 let count=0;
 for(const set of ['alphabet-uppercase','alphabet-lowercase','alphabet-letters','alphabet-sounds','alphabet-tracing']){
  for(let i=0;i<26;i++){
   const from=`/flashcards/${set}/${OBJECT_SLUGS[i]}/`;
   const to=`/flashcards/${set}/letter-${LETTERS[i]}/`;
   assert.ok(red.includes(from+' '+to+' 301'),'redirect missing: '+from);
   count++;
  }
 }
 assert.equal(count,130,'130 redirects audited');
 // the objects set keeps its word URLs — they were always correct
 assert.ok(!red.includes('/flashcards/alphabet-objects/apple/'),'objects URLs are not redirected');
});

test('sitemap carries only the corrected URLs',()=>{
 const xml=read('sitemap.xml');
 for(const bad of ['/flashcards/alphabet-uppercase/apple/','/flashcards/alphabet-lowercase/ball/','/flashcards/alphabet-tracing/zebra/'])
  assert.ok(!xml.includes(bad),'sitemap must not list old wrong URL '+bad);
 assert.ok(xml.includes('/flashcards/alphabet-uppercase/letter-a/'));
 assert.ok(xml.includes('/flashcards/alphabet-objects/apple/'),'objects keeps its correct word URL');
 const locs=xml.match(/<loc>/g).length;
 assert.ok(new Set(xml.match(/<loc>[^<]+<\/loc>/g)).size===locs,'sitemap has no duplicate <loc> entries');
});
