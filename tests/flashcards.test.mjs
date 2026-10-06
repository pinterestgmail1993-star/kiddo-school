import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {flashcardSets} from '../src/flashcards-project.mjs';

test('flashcards hub lists every set and links from home nav and footer',()=>{
 const hub=readFileSync('dist/flashcards/index.html','utf8');
 for(const s of flashcardSets)assert.match(hub,new RegExp('/flashcards/'+s.slug+'/'));
 assert.match(hub,/first-discoveries-look-together-cutout-sheet\.webp/);
 const home=readFileSync('dist/index.html','utf8');
 assert.match(home,/href="\/flashcards\/"/);
});

test('black and white baby cards page shows flashcards, stages grid, guide and safety',()=>{
 const s=flashcardSets[0];
 const html=readFileSync(`dist/flashcards/${s.slug}/index.html`,'utf8');
 assert.match(html,/Black and White Baby Flashcards – Free Printable Cards/);
 for(const c of s.cards){assert.match(html,new RegExp(c.file));assert.match(html,new RegExp(c.word));}
 assert.doesNotMatch(html,/cutout/i);
 assert.match(html,/Newborn 1/);
 assert.match(html,/Newborn 2/);
 assert.match(html,/Infant 1/);
 assert.match(html,/0–6 weeks/);
 assert.match(html,/Visual tracking/);
 assert.match(html,/first-discoveries-look-together-parent-guide\.webp/);
 assert.match(html,/FOR THE GROWN-UPS/);
 assert.match(html,/The parents guide\./);
 assert.match(html,/shared looking, not a test\./i);
 assert.match(html,/25 to 40 centimetres/);
 assert.match(html,/out of sleep spaces/i);
 const urls=[...html.matchAll(/<img[^>]+src="(https:\/\/pub-f2fcb7[^"]+)"/g)].map(m=>m[1]);
 assert.ok(urls.length>=16,'set page should embed the fifteen flashcards plus the parents guide');
});
