// Probe the R2 assets for Class 39 Staying Safe + Class 40 Healthy Food.
// Every file must be HTTP 200 image/webp; sizes and content-lengths logged.
import {R2} from '../src/adventure-kit.mjs';
import {SSAFE_ORDER} from '../src/staying-safe.mjs';
import {HF_ORDER} from '../src/healthy-food.mjs';

const SS_BASE=R2+'school/learning-path/staying-safe/';
const HF_BASE=R2+'school/learning-path/healthy-food/flashcards/';

async function probe(url){
 try{
  const r=await fetch(url,{method:'GET'});
  const type=r.headers.get('content-type');
  const len=r.headers.get('content-length');
  return [r.status,type,len];
 }catch(e){return ['ERR',String(e).slice(0,60),null];}
}

let bad=0;
console.log('== Staying Safe (folder root) ==');
for(const s of SSAFE_ORDER){
 const [st,ty,le]=await probe(SS_BASE+s+'.webp');
 if(st!==200||!/image\/webp/.test(ty||''))bad++;
 console.log(st,ty,le,SS_BASE+s+'.webp');
}
console.log('== Healthy Food (flashcards/ subfolder) ==');
for(const s of [...HF_ORDER,'cover']){
 const [st,ty,le]=await probe(HF_BASE+s+'.webp');
 if(st!==200||!/image\/webp/.test(ty||''))bad++;
 console.log(st,ty,le,HF_BASE+s+'.webp');
}
console.log(bad===0?'ALL LIVE':'FAILURES: '+bad);
process.exit(bad===0?0:1);
