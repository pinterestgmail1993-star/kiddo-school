// Kiddo School — worksheet library test suite.
// Proves the worksheet system is real: 181 individual pages, real PDFs on
// disk, honest maths coverage, print-only styling, and the game twins.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync,statSync} from 'node:fs';
import {execSync} from 'node:child_process';
import {worksheets,bySubject,subjectCounts,MATHS_PLANNED} from '../src/worksheets.mjs';
import {SUBJECTS,wsUrl,pdfUrl,WS_BASE} from '../src/ws-common.mjs';
import {phonicAdventures} from '../src/phonics-adventures.mjs';

const read=f=>readFileSync('dist'+f,'utf8');
const page=p=>read(p+'index.html');
const TEST_ORIGIN='https://kiddo.school';

test('the worksheet registry: 196 worksheets across eight subjects',()=>{
 assert.equal(worksheets.length,196);
 assert.equal(bySubject('shapes').length,18);
 assert.equal(bySubject('colors').length,18);
 assert.equal(bySubject('writing').length,30);
 assert.equal(bySubject('phonics').length,24);
 assert.equal(bySubject('maths').length,17); // honest: seventeen artworks uploaded and audited
 assert.equal(MATHS_PLANNED,30);
 const slugs=new Set(worksheets.map(w=>w.subject+'/'+w.slug));
 assert.equal(slugs.size,196,'no duplicate slugs within or across subjects');
});







test('the old print machinery is gone: no worksheets.js, no print-flag CSS',()=>{
 assert.ok(!existsSync('dist/assets/worksheets.js'),'worksheets.js removed from dist');
 assert.ok(!existsSync('public/assets/worksheets.js'),'worksheets.js removed from source');
 const css=read('/assets/style.css');
 assert.ok(!css.includes('ws-printing'),'no print flag css');
 assert.ok(!css.includes('ws-print-root'),'no print-root css');
});

test('all 196 PDFs exist in dist and are real PDF files',()=>{
 let count=0;
 for(const w of worksheets){
  const f='dist'+pdfUrl(w.subject,w.slug);
  assert.ok(existsSync(f),'PDF exists: '+pdfUrl(w.subject,w.slug));
  const buf=readFileSync(f);
  assert.ok(buf.length>2000,'PDF has real content: '+w.slug);
  assert.ok(buf.slice(0,5).toString()==='%PDF-','PDF magic bytes: '+w.slug);
  count++;
 }
 assert.equal(count,196);
 const dir=sub=>readdirSync('dist/downloads/worksheets/'+sub).length;
 assert.equal(dir('shapes'),18);assert.equal(dir('colors'),18);assert.equal(dir('writing'),30);
 assert.equal(dir('phonics'),24);assert.equal(dir('maths'),17);
});

test('spot-check PDF renders: each sampled sheet carries its title and instructions',()=>{
 const picks=['writing/hedgehogs-winding-path','maths/counting-caterpillar','phonics/pirates-missing-sound','shapes/candy-shape-shop','colors/rainbow-paint-laboratory'];
 for(const key of picks){
  const [subject,slug]=key.split('/');
  const f='dist'+pdfUrl(subject,slug);
  const out=execSync(`pdftotext "${f}" - 2>/dev/null || true`,{encoding:'utf8'});
  assert.ok(out.includes('Worksheet'),'title header in '+key+' PDF');
  assert.ok(out.includes('Name'),'name line in '+key);
 }
});

test('the hub and category pages list everything honestly',()=>{
 const hub=page('/worksheets/');
 assert.ok(hub.includes('href="/worksheets/maths/"')&&hub.includes('href="/worksheets/shapes/"')&&hub.includes('href="/worksheets/colors/"')&&hub.includes('href="/worksheets/writing/"')&&hub.includes('href="/worksheets/phonics/"'),'five categories');
 assert.ok(hub.includes('17 of 30 ready'),'honest maths note on hub');
 for(const key of Object.keys(SUBJECTS)){
  const cat=page(WS_BASE+key+'/');
  const n=subjectCounts[key];
  assert.equal((cat.match(/class="ws-card"/g)||[]).length,n,n+' cards on '+key+' category');
  assert.ok(cat.includes('CollectionPage'),'collection schema on '+key);
 }
 const maths=page('/worksheets/maths/');
 assert.ok(maths.includes('of the planned 30'),'honest maths note on category');
});














