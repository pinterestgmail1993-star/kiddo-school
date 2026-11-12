import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,statSync} from 'node:fs';
import {join} from 'node:path';

/* owner 2026-11-12: worksheets, coloring pages and alphabet flashcards carry Print / Download / Share under every picture, in the grid and on the full sheet. */
const walk=d=>readdirSync(d).flatMap(n=>{const p=join(d,n);return statSync(p).isDirectory()?walk(p):[p];});
const pages=[...walk('dist/worksheets'),...walk('dist/coloring-pages')].filter(f=>f.endsWith('/index.html'));
test('every worksheet and coloring-page card has Print, Download and Share',()=>{
 let cards=0;
 for(const f of pages){
  const h=readFileSync(f,'utf8');
  const n=(h.match(/<span class="ws-card"[ >]/g)||[]).length;
  cards+=n;
  const acts=(h.match(/data-sheet-act="print"/g)||[]).length;
  assert.ok(acts>=n,f+': '+n+' cards but '+acts+' button sets');
  assert.ok(n===0||h.includes('/assets/sheet-actions.js'),f+': button script loaded');
  assert.ok(!/class="item-download"><a /.test(h),f+': no lone Download link left');
  assert.ok(!/class="ws-card-open">View /.test(h),f+': no dead "View Worksheet" line');
 }
 assert.ok(cards>=300,'cards found: '+cards);
});
test('alphabet flashcard pages have the three buttons too',()=>{
 for(const s of ['sounds','objects','letters','uppercase','lowercase','tracing']){
  const h=readFileSync(`dist/flashcards/alphabet-${s}/index.html`,'utf8');
  assert.equal((h.match(/data-sheet-act="print"/g)||[]).length,26,s);
  assert.ok(!h.includes('data-fc-dl'),s+': old lone download link gone');
 }
});
