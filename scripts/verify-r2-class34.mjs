// Class 34 R2 asset verification — owner requirement: verify all 30 WebP files
// exist in R2 and record their exact filenames before any page is built.
// Public base: assets.kiddo.school
// Writes: scripts/c34-r2-verify.txt (log) + scripts/c34-dims.json (manifest).
import {R2} from '../src/adventure-kit.mjs';
import {writeFileSync} from 'node:fs';

const FOLDER='school/preschool/4-years/weather-seasons-and-what-we-wear/';
// The 30 filenames from the owner's R2 console listing (29 flashcards + cover).
const FILES=['autumn','clouds','cloudy-day','cold-weather','cool-weather','cover','foggy-day','hot-weather','rain-boots','rain','rainbow','raincoat','rainy-day','scarf-and-gloves','snow','snowy-day','spring','stormy-day','summer','sun-hat','sun','sunglasses','sunny-day','umbrella','warm-weather','weather-forecast','wind','windy-day','winter-coat','winter']
 .map(f=>f+'.webp');

const base=R2+FOLDER;
const lines=[]; const dims={}; let fail=0;
for(const f of FILES){
  const url=base+f;
  try{
    const res=await fetch(url,{method:'GET'});
    const type=res.headers.get('content-type');
    const buf=Buffer.from(await res.arrayBuffer());
    // Read WebP dimensions from the VP8/VP8L/VP8X chunk header.
    let w=0,h=0;
    if(buf.length>30 && buf.toString('ascii',0,4)==='RIFF' && buf.toString('ascii',8,12)==='WEBP'){
      const chunk=buf.toString('ascii',12,16);
      if(chunk==='VP8 '){ w=buf.readUInt16LE(26)&0x3fff; h=buf.readUInt16LE(28)&0x3fff; }
      else if(chunk==='VP8L'){ const b=buf.readUInt32LE(21); w=(b&0x3FFF)+1; h=((b>>14)&0x3FFF)+1; }
      else if(chunk==='VP8X'){ w=(buf.readUIntLE(24,3))+1; h=(buf.readUIntLE(27,3))+1; }
    }
    const ok=res.status===200 && /image\/webp/.test(type||'') && w>0 && h>0;
    if(!ok) fail++;
    lines.push(`${ok?'OK':'FAIL'} ${f} status=${res.status} type=${type} bytes=${buf.length} dims=${w}x${h}`);
    dims[f.replace(/\.webp$/,'')]={w,h,bytes:buf.length,status:res.status};
    console.log(lines[lines.length-1]);
  }catch(e){ fail++; lines.push(`FAIL ${f} error=${e.message}`); console.log(lines[lines.length-1]); }
}
const summary=`${FILES.length - fail}/${FILES.length} verified, ${fail} failures`;
lines.push(summary);
writeFileSync(new URL('./c34-r2-verify.txt',import.meta.url), lines.join('\n')+'\n');
writeFileSync(new URL('./c34-dims.json',import.meta.url), JSON.stringify(dims,null,1)+'\n');
console.log(summary);
