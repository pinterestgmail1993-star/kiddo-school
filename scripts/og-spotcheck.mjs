/* Spot-check: HEAD a sample of og:image URLs across all groups. */
import {readdirSync,readFileSync,statSync} from 'node:fs';
import {join,relative} from 'node:path';
const pages=[];
(function walk(dir){for(const f of readdirSync(dir)){const p=join(dir,f);statSync(p).isDirectory()?walk(p):f==='index.html'&&pages.push(p);}})('dist');
const get=(h,re)=>{const m=h.match(re);return m?m[1]:null;};
const DEF='kiddo-social-sharing-art';
const byGroup=new Map();
for(const p of pages){
  const h=readFileSync(p,'utf8');
  const og=get(h,/<meta property="og:image" content="([^"]+)"/)||'';
  let g='other';
  if(og.includes(DEF))g='default-brand';
  else if(og.includes('/adventures/'))g='adventures';
  else if(og.includes('/worksheets/'))g='worksheets';
  else if(og.includes('/flashcards/'))g='flashcards';
  else if(og.includes('/activities/'))g='projects';
  else if(og.includes('/branding/'))g='branding';
  else if(og.includes('kiddo.school/assets/'))g='local';
  if(!byGroup.has(g))byGroup.set(g,[]);
  byGroup.get(g).push(og);
}
const picks=[];
for(const [g,urls] of byGroup){picks.push([g,urls[0],urls[Math.floor(urls.length/2)]]);}
let bad=0,total=0;
for(const [g,...urls] of picks){
  for(const u of urls.filter(Boolean)){
    total++;
    const r=await fetch(u,{method:'HEAD'}).catch(e=>({status:'ERR '+e.message}));
    const ok=r.status===200;
    if(!ok)bad++;
    console.log(ok?'OK ':'FAIL',r.status,g,u.slice(0,110));
  }
}
console.log(`checked ${total} sample URLs, ${bad} failures`);
