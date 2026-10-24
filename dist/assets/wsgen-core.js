/* Kiddo worksheet generator — pure logic, zero DOM.
   Loaded as a classic script in the browser (sets globalThis.WSGEN) and
   imported directly by tests (same global). wsgen.js owns the page. */
(function(g){
'use strict';

/* seeded PRNG so every "shuffle" is a fresh but reproducible sheet */
function mulberry32(seed){
 let a=seed>>>0;
 return function(){
  a|=0;a=a+0x6D2B79F5|0;
  let t=Math.imul(a^a>>>15,1|a);
  t=t+Math.imul(t^t>>>7,61|t)^t;
  return((t^t>>>14)>>>0)/4294967296;
 };
}

/* filler letters, weighted toward common ones so the puzzle reads naturally */
const FILL='EEAARRIIOOTTNNSSLLCCUUDDPPMMHHGGBBFFYYWWKVXZJQ';

/* words from free text: letters only, 2..maxLen chars, deduped, capped */
function parseWords(raw,maxLen,maxWords){
 const seen=new Set();const out=[];
 for(const w of String(raw).toUpperCase().split(/[^A-Z]+/)){
  if(w.length<2||w.length>maxLen||seen.has(w))continue;
  seen.add(w);out.push(w);
  if(out.length>=maxWords)break;
 }
 return out;
}

/* forward-reading directions only — little eyes never read backwards */
const DIRS_EASY=[[0,1],[1,0]];
const DIRS_HARD=[[0,1],[1,0],[1,1],[1,-1]];

function buildWordSearch(words,size,diagonals,rng){
 const dirs=diagonals?DIRS_HARD:DIRS_EASY;
 const sorted=words.slice().sort((a,b)=>b.length-a.length);
 for(let attempt=0;attempt<60;attempt++){
  const grid=Array.from({length:size},()=>Array(size).fill(''));
  const placements=[];
  let ok=true;
  for(const word of sorted){
   if(word.length>size){ok=false;break;}
   const spots=[];
   for(let r=0;r<size;r++)for(let c=0;c<size;c++)for(const[dr,dc]of dirs){
    const er=r+dr*(word.length-1),ec=c+dc*(word.length-1);
    if(er<0||er>=size||ec<0||ec>=size)continue;
    let fit=true;
    for(let i=0;i<word.length;i++){const ch=grid[r+dr*i][c+dc*i];if(ch&&ch!==word[i]){fit=false;break;}}
    if(fit)spots.push([r,c,dr,dc]);
   }
   if(!spots.length){ok=false;break;}
   const pick=spots[Math.floor(rng()*spots.length)];
   for(let i=0;i<word.length;i++)grid[pick[0]+pick[2]*i][pick[1]+pick[3]*i]=word[i];
   placements.push({word,row:pick[0],col:pick[1],dr:pick[2],dc:pick[3]});
  }
  if(ok)return{grid,placements};
  rng=mulberry32(Math.floor(rng()*4294967296));
 }
 return null;
}

function fillGrid(grid,rng){
 for(let r=0;r<grid.length;r++)for(let c=0;c<grid.length;c++)
  if(!grid[r][c])grid[r][c]=FILL[Math.floor(rng()*FILL.length)];
 return grid;
}

/* cells a word occupies — used for answer highlighting */
function wordCells(p){
 const cells=[];
 for(let i=0;i<p.word.length;i++)cells.push([p.row+p.dr*i,p.col+p.dc*i]);
 return cells;
}

/* a=Math.floor(rng()*(max+1)) … always a+b<=max, never a negative difference */
function makeMath(op,level,count,rng){
 const out=[];
 for(let i=0;i<count;i++){
  const isAdd=op==='add'||(op==='mixed'&&rng()<0.5);
  if(isAdd){
   const a=Math.floor(rng()*(level+1)),b=Math.floor(rng()*(level-a+1));
   out.push({a:a,b:b,op:'+',answer:a+b});
  }else{
   const a=Math.floor(rng()*(level+1)),b=Math.floor(rng()*(a+1));
   out.push({a:a,b:b,op:'-',answer:a-b});
  }
 }
 return out;
}

/* Fisher-Yates with our seeded rng — shared by pairs, choices, shelves */
function shuffle(arr,rng){
 const a=arr.slice();
 for(let i=a.length-1;i>0;i--){
  const j=Math.floor(rng()*(i+1));
  const t=a[i];a[i]=a[j];a[j]=t;
 }
 return a;
}

/* ---------- machine 3: tracing ---------- */
/* free text -> clean trace text: letters, digits and single spaces only */
function parseTrace(raw,maxChars){
 return String(raw).toUpperCase().replace(/[^A-Z0-9]+/g,' ').trim().slice(0,maxChars).trim();
}
/* free text -> up to maxWords clean words of 2..wordMaxLen letters, deduped */
function traceWords(raw,maxWords,wordMaxLen){
 const seen=new Set();const out=[];
 for(const w of String(raw).toUpperCase().split(/[^A-Z]+/)){
  if(w.length<2||w.length>wordMaxLen||seen.has(w))continue;
  seen.add(w);out.push(w);
  if(out.length>=maxWords)break;
 }
 return out;
}
/* word shelves for the tracing machine — tied to our classes */
const TRACE_SHELVES={
 habitats:['RABBIT','FOX','OWL','WHALE','PANDA','CAMEL'],
 helpers:['DOCTOR','NURSE','BAKER','PILOT','FARMER','COACH'],
 weather:['SUNNY','RAINY','WINDY','SNOWY','CLOUDY','FOGGY'],
 colors:['RED','BLUE','GREEN','PINK','PURPLE','ORANGE'],
 numbers:['ONE','TWO','THREE','FOUR','FIVE','SIX']
};

/* ---------- machine 4: matching pairs ---------- */
const DOTS='\u25CF';
/* word shelves tied to our classes; letters & numbers are generated */
const PAIR_SHELVES={
 helpers:[['Doctor','Stethoscope'],['Firefighter','Fire truck'],['Teacher','Books'],
  ['Farmer','Tractor'],['Chef','Mixing bowl'],['Mail carrier','Letter bag'],
  ['Pilot','Airplane'],['Baker','Bread'],['Police officer','Police car'],['Artist','Paintbrush']],
 homes:[['Rabbit','Burrow'],['Bird','Nest'],['Bee','Hive'],['Dog','Kennel'],
  ['Horse','Stable'],['Spider','Web'],['Bear','Cave'],['Ant','Anthill'],
  ['Cow','Barn'],['Duck','Pond']],
 weather:[['Snowy','Mittens'],['Sunny','Sun hat'],['Rainy','Rain boots'],
  ['Windy','Scarf'],['Cold','Warm coat'],['Hot','Shorts'],['Stormy','Flashlight'],
  ['Foggy','Warm jacket']]
};
/* pick `count` pairs from a shelf; returns {left[],right[] shuffled,
   solution[i]=index in right[] that matches left[i]} */
function makePairs(key,count,rng){
 count=Math.max(3,Math.min(count,8));
 let pairs;
 if(key==='letters'){
  const A='ABCDEFGHIJ';
  const idx=shuffle([0,1,2,3,4,5,6,7,8,9],rng).slice(0,count).sort((a,b)=>a-b);
  pairs=idx.map(i=>[A[i],A[i].toLowerCase()]);
 }else if(key==='numbers'){
  const nums=shuffle([1,2,3,4,5,6,7,8,9,10],rng).slice(0,count).sort((a,b)=>a-b);
  pairs=nums.map(n=>[String(n),new Array(n+1).join(DOTS)]);
 }else{
  const shelf=PAIR_SHELVES[key]||PAIR_SHELVES.homes;
  const idx=shuffle(shelf.map((_,i)=>i),rng).slice(0,count).sort((a,b)=>a-b);
  pairs=idx.map(i=>shelf[i]);
 }
 const left=pairs.map(p=>p[0]);
 const rightSorted=pairs.map(p=>p[1]);
 const right=shuffle(rightSorted,rng);
 const solution=rightSorted.map(r=>right.indexOf(r));
 return {left:left,right:right,solution:solution};
}

/* ---------- on-screen math: three answer bubbles per sum ---------- */
/* one right answer + two believable neighbours, all 0..hi, shuffled */
function makeChoices(answer,hi,rng){
 const opts=new Set([answer]);
 let guard=0;
 while(opts.size<3&&guard<200){
  guard++;
  const d=1+Math.floor(rng()*4);
  const cand=rng()<0.5?answer-d:answer+d;
  if(cand>=0&&cand<=hi&&cand!==answer)opts.add(cand);
 }
 for(let f=0;f<=hi&&opts.size<3;f++)if(!opts.has(f))opts.add(f);
 return shuffle(Array.from(opts),rng);
}

const WSGEN={mulberry32:mulberry32,parseWords:parseWords,buildWordSearch:buildWordSearch,
 fillGrid:fillGrid,wordCells:wordCells,makeMath:makeMath,FILL:FILL,
 DIRS_EASY:DIRS_EASY,DIRS_HARD:DIRS_HARD,
 shuffle:shuffle,makePairs:makePairs,makeChoices:makeChoices,
 parseTrace:parseTrace,traceWords:traceWords,
 PAIR_SHELVES:PAIR_SHELVES,TRACE_SHELVES:TRACE_SHELVES,DOTS:DOTS};
g.WSGEN=WSGEN;

})(typeof window!=='undefined'?window:globalThis);
