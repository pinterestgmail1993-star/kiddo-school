// QA gate for the flashcard library copy (5-field, per-set frames).
// Checks: parse, field presence, slug parity vs built sets, word caps,
// banned words, opener variety, and Jaccard overlap vs Learning Path lessons.
import LIBCOPY from '../src/flashcards/libcopy/index.mjs';
import {fcSets} from '../src/flashcards/index.mjs';
import {LP_REGISTRY} from '../src/flashcards/lp-lessons.mjs';

const CAPS={helps:16,roleplay:15,learn:13,print:12,teachTip:12};
const FIELDS=Object.keys(CAPS);
const BANNED=['ritual','ceremony','salute','bless','grace','prayer','holy','sacred','worship','chant','mantra','altar','offering','divine','spirit','zen','namaste','amen'];
const words=s=>String(s).toLowerCase().match(/[a-z0-9']+/g)||[];
const wc=s=>words(s).length;
const toks=s=>words(s).filter(w=>w.length>3);
const jac=(a,b)=>{const A=new Set(toks(a)),B=new Set(toks(b));if(!A.size||!B.size)return 0;let n=0;for(const x of A)if(B.has(x))n++;return n/(A.size+B.size-n)};
let problems=0;const fail=m=>{problems++;console.log('FAIL',m)};
const warn=m=>console.log('WARN',m);

for(const set of fcSets){
 const lib=LIBCOPY[set.slug];
 if(!lib){fail(`no libcopy for set ${set.slug}`);continue}
 const setSlugs=set.cards.map(c=>c.slug);
 const missing=setSlugs.filter(s=>!lib.cards[s]);
 const extra=Object.keys(lib.cards).filter(s=>!setSlugs.includes(s));
 if(missing.length)fail(`${set.slug}: cards without copy: ${missing.join(',')}`);
 if(extra.length)warn(`${set.slug}: extra copy keys: ${extra.join(',')}`);
 for(const [slug,c] of Object.entries(lib.cards)){
  for(const f of FIELDS){
   if(!c[f]){fail(`${set.slug}/${slug}: missing field ${f}`);continue}
   if(wc(c[f])>CAPS[f])fail(`${set.slug}/${slug}.${f}: ${wc(c[f])} words > cap ${CAPS[f]} :: ${c[f]}`);
   const low=' '+String(c[f]).toLowerCase()+' ';
   for(const b of BANNED){const re=new RegExp(`\\b${b}\\w*`,'g');if(re.test(low))fail(`${set.slug}/${slug}.${f}: banned word "${b}"`)}
  }
 }
 // opener variety per field
 for(const f of FIELDS){
  const seq=setSlugs.filter(s=>lib.cards[s]&&lib.cards[s][f]).map(s=>words(lib.cards[s][f])[0]);
  for(let i=1;i<seq.length;i++)if(seq[i]===seq[i-1])warn(`${set.slug}: two adjacent "${f}" open with "${seq[i]}"`);
  const counts={};for(const w of seq)counts[w]=(counts[w]||0)+1;
  for(const [w,n] of Object.entries(counts))if(n>4)warn(`${set.slug}: "${f}" opener "${w}" used ${n}x`);
 }
}
// overlap vs lessons
const reg=Object.fromEntries(LP_REGISTRY.map(r=>[r.slug,r.content]));
let worst=[];
for(const set of fcSets){
 const content=reg[set.slug];const lc=LIBCOPY[set.slug];if(!content||!lc||!lc.cards)continue;
 for(const card of set.cards){
  const l=content[card.slug];const c=lc.cards[card.slug];
  if(!l||!c)continue;
  for(const f of FIELDS){
   if(!c[f])continue;
   for(const [lf,lt] of Object.entries(l)){
    if(typeof lt!=='string'||lt.length<30)continue;
    const j=jac(c[f],lt);
    if(j>0.30){fail(`${set.slug}/${card.slug}.${f} overlaps lesson.${lf} J=${j.toFixed(2)}`)}
    else if(j>0.22)worst.push([j,`${set.slug}/${card.slug}.${f}~lesson.${lf}`]);
   }
  }
 }
}
worst.sort((a,b)=>b[0]-a[0]).slice(0,8).forEach(([j,m])=>console.log('near',j.toFixed(2),m));
console.log(problems?`\n${problems} PROBLEMS`:'\nALL CLEAN');
