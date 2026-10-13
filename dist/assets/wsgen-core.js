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

const WSGEN={mulberry32:mulberry32,parseWords:parseWords,buildWordSearch:buildWordSearch,
 fillGrid:fillGrid,wordCells:wordCells,makeMath:makeMath,FILL:FILL,
 DIRS_EASY:DIRS_EASY,DIRS_HARD:DIRS_HARD};
g.WSGEN=WSGEN;

})(typeof window!=='undefined'?window:globalThis);
