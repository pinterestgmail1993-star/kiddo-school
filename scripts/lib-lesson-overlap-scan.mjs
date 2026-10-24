// Scan: how much do library data fields (say/try/note/why) overlap the lesson
// fields (say/play/tips/why)? Jaccard on content words, per card, per set.
import fs from 'fs';
const norm=s=>String(s||'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const words=s=>new Set(norm(s).split(' ').filter(w=>w.length>3));
const jac=(a,b)=>{const A=words(a),B=words(b);if(!A.size||!B.size)return null;let i=0;for(const w of A)if(B.has(w))i++;return i/Math.max(A.size,B.size);};

const {LP_REGISTRY}=await import('/home/z/my-project/ks-inspect/src/flashcards/lp-lessons.mjs');

const pairs=[
 ['say','say','SAY '],['try','play','TRYvsPLAY'],['note','tips','NOTEvsTIPS'],['why','why','WHYvsWHY']
];
let rows=[];
for(const reg of LP_REGISTRY){
  const {content,slug}=reg;
  const set=(await import('/home/z/my-project/ks-inspect/src/flashcards/index.mjs')).fcSetBySlug[slug];
  if(!set) continue;
  const stats={say:[],play:[],tips:[],why:[]};
  let n=0;
  for(const c of set.cards){
    const L=content[c.slug]; if(!L) continue; n++;
    const m={'say':jac(c.say,L.say),'play':jac(c.try,L.play),'tips':jac(c.note,L.tips),'why':jac(c.why,L.why)};
    for(const k of Object.keys(m)) if(m[k]!=null) stats[k].push(m[k]);
  }
  const avg=a=>a.length?(a.reduce((x,y)=>x+y,0)/a.length):null;
  const hi=a=>a.length?a.filter(v=>v>=0.5).length:0;
  rows.push([slug.padEnd(40),String(n).padStart(3),
    avg(stats.say)==null?'  -- ':avg(stats.say).toFixed(2),
    avg(stats.play)==null?'  -- ':avg(stats.play).toFixed(2),
    avg(stats.tips)==null?'  -- ':avg(stats.tips).toFixed(2),
    avg(stats.why)==null?'  -- ':avg(stats.why).toFixed(2),
    hi(stats.say),hi(stats.play),hi(stats.tips)].join(' '));
}
console.log('SET                                      n   SAY  TRY~PLAY  NOTE~TIPS  WHY~WHY  hi50: s p t');
console.log(rows.join('\n'));
