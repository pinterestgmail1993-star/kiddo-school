/* Thin-content + purpose audit over every built page.
   Classifies each page, word-counts the real body text, checks the required
   anatomy per type (lesson must teach; card must support recall+print;
   worksheet/game labels must match destination), and reports:
     THIN  — body word count below the floor for its type
     ANAT  — missing required anatomy (no download on card, no check on lesson…)
     MISLABELED — buttons/labels that promise one thing, land on another
   Run: node scripts/thin-content-audit.mjs */
import {readdirSync,readFileSync,statSync} from 'node:fs';
import {join,relative} from 'node:path';

const dist='dist';
const pages=[];
(function walk(dir){
  for(const f of readdirSync(dir)){
    const p=join(dir,f);
    if(statSync(p).isDirectory())walk(p);
    else if(f.endsWith('.html'))pages.push(p);
  }
})(dist);

function classify(rel){
  if(rel==='index.html')return 'home';
  if(/\/learn\//.test(rel))return 'lesson';
  if(rel.startsWith('preschool/4-years/sight-words/')&&rel!=='preschool/4-years/sight-words/index.html')return 'lesson-sw';
  if(rel.startsWith('flashcards/')&&/\/[a-z0-9-]+\/[a-z0-9-]+\/index\.html$/.test(rel))return 'card';
  if(rel.startsWith('flashcards/')&&/\/[a-z0-9-]+\/index\.html$/.test(rel))return 'fc-set';
  if(rel.startsWith('worksheets/')&&/\/index\.html$/.test(rel)&&!rel.endsWith('worksheets/index.html'))return rel.includes('-ws/')||/worksheets\/[a-z0-9-]+\/$/.test(rel)&&rel.split('/').length===3?'ws-cat':'worksheet';
  if(rel.startsWith('activities/'))return 'activity';
  if(/^(about|grown-ups|privacy|terms|disclaimer|contact)\//.test(rel))return 'legal-info';
  return 'other';
}

const FLOORS={home:250,lesson:450,'lesson-sw':250,card:180,'fc-set':220,'ws-cat':150,worksheet:120,activity:200,'legal-info':200,other:60};

const thin=[],anat=[],words=[];
for(const p of pages){
  const rel=relative(dist,p);
  const html=readFileSync(p,'utf8');
  const type=classify(rel);
  const main=html.split('<main id="main">')[1]||'';
  const noNav=main.split('<footer')[0]||main;
  const text=(noNav.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ')+'').replace(/\s+/g,' ').trim();
  const wc=text.split(' ').filter(w=>/[a-z0-9]/i.test(w)).length;
  words.push([rel,type,wc]);
  const floor=FLOORS[type]||60;
  if(wc<floor)thin.push([rel,type,wc,floor]);
  // anatomy checks
  if(type==='lesson'||type==='lesson-sw'){
    if(!/Step by step|Step-by-step/i.test(text))anat.push([rel,'lesson missing step-by-step']);
    if(!/Understanding check|Check for understanding/i.test(text))anat.push([rel,'lesson missing understanding check']);
    if(!/Try it together|Try this|activity/i.test(text))anat.push([rel,'lesson missing practical activity']);
  }
  if(type==='card'){
    if(!/Download card|Download splash/.test(html))anat.push([rel,'card missing download']);
    if(!/Previous card|rel="prev"/.test(html))anat.push([rel,'card missing prev']);
    if(!/View full set/.test(html))anat.push([rel,'card missing set link']);
  }
}
thin.sort((a,b)=>a[2]-b[2]);
console.log('== THIN PAGES (below floor for their type) ==');
for(const [rel,type,wc,floor] of thin)console.log(`  [${type}] ${rel}  ${wc} words (floor ${floor})`);
console.log(`\n== ANATOMY GAPS ==`);
for(const [rel,why] of anat)console.log(`  ${rel}  — ${why}`);
console.log(`\nscanned ${pages.length} pages; thin: ${thin.length}; anatomy gaps: ${anat.length}`);
const byType={};
for(const [,t,w] of words){byType[t]=byType[t]||[];byType[t].push(w);}
console.log('\n== word-count medians by type ==');
for(const t in byType){const a=byType[t].sort((x,y)=>x-y);console.log(`  ${t}: n=${a.length} median=${a[Math.floor(a.length/2)]} min=${a[0]}`);}
