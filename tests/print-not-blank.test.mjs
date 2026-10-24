// print-not-blank — regression suite for the 2026-10-15 print fix.
//
// Owner report: "Print this card" printed the page WITHOUT the card image —
// in fact every print path on the site produced a blank page. Root cause: the
// worksheet-generator commit (ebc1790a8) put a bare `body>*{display:none!important}`
// inside `@media print` to hide furniture around ITS appended #wsgen-print
// root — but unscoped it also hid <main> on every other page in print.
//
// The contract now locked here:
//  1. style.css hides body children in print ONLY under body.wsgen-page
//     (the four /worksheet-generator/ machines) — never bare body>*;
//  2. the four machine pages carry <body class="wsgen-page"> so their
//     print root still takes over the printed sheet;
//  3. every other printable page kind (flashcard card page, print-view
//     set page, worksheet sheet, coloring page) keeps a plain <body> —
//     its <main> stays visible in print, and the card image lives in the
//     visible print chain (.fc2-dual > .fc2-main > .fc2-hero).
import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import assert from 'node:assert/strict';

const css=readFileSync('public/assets/style.css','utf8');
const read=p=>readFileSync('dist'+p+'index.html','utf8');

test('print: no bare body>* nuke anywhere in the stylesheet',()=>{
 // The unscoped rule blank-printed EVERY page on the site (card pages,
 // print-view set pages, worksheets, coloring pages) — forbidden forever.
 assert.doesNotMatch(css,/[^.\w-]body>\*\s*\{[^}]*display:\s*none/,'a bare body>*{display:none} in @media print hides <main> on every page — scope it to body.wsgen-page');
});

test('print: the generator print-root takeover is scoped to body.wsgen-page',()=>{
 assert.match(css,/body\.wsgen-page>\*\s*\{display:none!important\}/,'generator pages hide their furniture in print via body.wsgen-page>*');
 assert.match(css,/body\.wsgen-page>#wsgen-print\s*\{display:block!important\}/,'the JS-appended #wsgen-print root takes over the printed sheet');
 assert.match(css,/#wsgen-print\{display:none\}/,'on screen the print root stays hidden');
});

test('print: the four generator machines carry body.wsgen-page',()=>{
 for(const m of ['word-search','math-practice','tracing','matching-pairs']){
  const html=read(`/worksheet-generator/${m}/`);
  assert.match(html,/<body class="wsgen-page">/,`/worksheet-generator/${m}/ must carry the wsgen-page body class`);
 }
 // The hub has no print machinery: it stays an ordinary page.
 assert.doesNotMatch(read('/worksheet-generator/'),/<body class="wsgen-page">/,'the generator hub is not a machine page');
});

test('print: flashcard card page keeps a plain <body> and a visible print chain',()=>{
 const html=read('/flashcards/classroom/object-map/');
 assert.match(html,/<body>/,'card pages must NOT carry wsgen-page — main must print');
 assert.match(html,/class="fc2-dual wrap">\s*<div class="fc2-main"><figure class="fc2-hero">/,'the card image sits in the .fc2-dual > .fc2-main > .fc2-hero print chain');
 assert.match(html,/<figure class="fc2-hero"><img src="https:\/\/assets\.kiddo\.school\//,'the hero image is a real R2 asset, not a background');
});

test('print: print-view set page and worksheet/coloring pages keep a plain <body>',()=>{
 assert.match(read('/toddler/2-years/school-garden/garden-flowers/print/'),/<body class="print-view">/,'print-view pages keep their own class — main visible in print');
 assert.doesNotMatch(read('/toddler/2-years/school-garden/garden-flowers/print/'),/<body class="wsgen-page">/,'print-view pages are not wsgen machines');
 assert.match(read('/worksheet-generator/word-search/'),/<body class="wsgen-page">/,'machine pages keep theirs');
 const ws=read('/worksheets/');
 assert.match(ws,/<body>/,'the worksheets hub prints as an ordinary page');
});
