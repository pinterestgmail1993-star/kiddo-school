#!/usr/bin/env node
/* LP lesson validator — run: node scripts/validate-lp.mjs <lp-file.mjs> <data-file.mjs> <lessonExportName>
   Checks a flashcards/lp-*.mjs lesson module against its set data module:
   every card slug has a lesson; every lesson has all required fields with
   real length; teach has >=5 numbered steps; vocab <= 8 comma items; no
   banned phrases; no 6-gram overlap with the library card text (the two
   experiences stay separate); no 10-gram clones across lessons. */
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const [,,lpFile,dataFile,exportName='lpContent',lessonFile,lessonExport]=process.argv;
if(!lpFile||!dataFile){console.error('usage: validate-lp.mjs <lp-file> <data-file> [exportName]');process.exit(2);}
const lp=await import(pathToFileURL(path.join(root,lpFile)).href);
const ds=await import(pathToFileURL(path.join(root,dataFile)).href);
const content=lp[exportName];
if(!content){console.error('FAIL: no export named '+exportName+' in '+lpFile);process.exit(1);}
let slugs=[];let setLesson=null;
if(lessonFile){const lm=await import(pathToFileURL(path.join(root,lessonFile)).href);const le=lm[lessonExport||'lesson'];if(le&&Array.isArray(le.cards))setLesson=le;}
if(!setLesson&&ds.lesson&&Array.isArray(ds.lesson.cards))setLesson=ds.lesson;
// auto-detect the set lesson: an object export carrying a cards array (handles <name>Lesson-style data files)
if(!setLesson){for(const k of Object.keys(ds)){const v=ds[k];
 if(v&&typeof v==='object'&&!Array.isArray(v)&&Array.isArray(v.cards)&&v.cards.length){setLesson=v;break;}}}
if(setLesson&&setLesson.cards)slugs=setLesson.cards.map(c=>(c.slug||c.file.replace(/^\d+-/,'').replace(/\.webp$/,'')));
else{console.error('FAIL: cannot read cards from '+(lessonFile||dataFile));process.exit(1);}
// auto-detect the library content map: an export whose keys cover the card slugs
let libCards=ds.cards||{};
if(!Object.keys(libCards).length){for(const k of Object.keys(ds)){const v=ds[k];
 if(v&&typeof v==='object'&&!Array.isArray(v)){const hit=slugs.filter(s=>s in v).length;
  if(hit>slugs.length*0.5){libCards=v;break;}}}}
const errs=[];const warn=[];
// 1. slug coverage
const keys=Object.keys(content).sort();
const want=[...new Set(slugs)].sort();
for(const s of want)if(!content[s])errs.push('missing lesson for card: '+s);
for(const k of keys)if(!want.includes(k))errs.push('lesson without a real card: '+k);
// 2. fields
const REQ=['title','one','seoTitle','metaDescription','intro','what','mean','know','why','dev','vocab','teach','say','notice','ask','childSay','real','play','check'];
for(const k of keys){
 for(const f of REQ){const v=content[k][f];
  const min=(f==='title'?4:f==='vocab'?10:f==='seoTitle'?25:f==='one'?30:60);if(!v||String(v).length<min)errs.push(`${k}.${f} too short/missing`);}
 if(!content[k].teach||content[k].teach.split('\n').length<5)errs.push(k+'.teach needs >=5 lines');
 if(content[k].vocab&&content[k].vocab.split(',').length>8)errs.push(k+'.vocab too many chips');
 if(!/(Class \d+|School Garden)/.test(content[k].seoTitle||''))errs.push(k+'.seoTitle lacks a class/space tag');
}
// 3. banned phrases / inaccurate reassurances
const banned=[/never hurt/i,/won't feel a thing/i,/doesn't hurt at all/i,/promise it won't hurt/i];
for(const k of keys){const blob=JSON.stringify(content[k]);
 for(const b of banned)if(b.test(blob))errs.push(k+' contains banned reassurance '+b);}
// 4. 6-gram overlap with library card text (library stays a separate experience)
const norm=s=>String(s).toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const grams=(s,n)=>{const w=norm(s).split(' ');const o=new Set();for(let i=0;i<=w.length-n;i++)o.add(w.slice(i,i+n).join(' '));return o;};
const LF=['intro','what','mean','know','why','dev','teach','say','notice','ask','childSay','real','play','check','tips','safety'];
const DF=['intro','say','try','note','teach','metaDescription'];
let overlap=0;
for(const k of keys){
 const dg6=new Set(),dg8=new Set();const d=libCards[k]||{};
 DF.forEach(f=>{if(d[f]){grams(d[f],6).forEach(g=>dg6.add(g));grams(d[f],8).forEach(g=>dg8.add(g));}});
 LF.forEach(f=>{(content[k][f]?grams(content[k][f],6):new Set()).forEach(g=>{if(dg6.has(g))overlap++;});
  (content[k][f]?grams(content[k][f],10):new Set()).forEach(g=>{if(dg8.has(g))warn.push(k+'.'+f+' echoes the library page: "'+g+'"');});});
}
// 5. 10-gram clones across lessons
const seen=new Map();

for(const k of keys)for(const f of LF){(content[k][f]?grams(content[k][f],10):new Set()).forEach(g=>{
 const owner=seen.get(g);
 if(owner&&owner.split('.')[0]!==k)errs.push('10-gram clone across lessons: "'+g+'" ('+owner+' vs '+k+'.'+f+')');
 else if(!owner)seen.set(g,k+'.'+f);});}
// report
warn.forEach(e=>console.log('  ~ '+e));
console.log(`lessons: ${keys.length} / cards: ${want.length} | 6-gram overlaps: ${overlap} | errors: ${errs.length}`);
errs.slice(0,40).forEach(e=>console.log('  ✗ '+e));
process.exit(errs.length?1:0);
