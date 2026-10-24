/* Full-site internal link + asset audit over dist/. Walks every index.html,
   collects href/src/srcset/poster urls, resolves local ones to real files,
   flags: broken pages, broken assets, undefined/href="undefined", empty href,
   javascript: links, and duplicate-content fingerprints (repeated <h1>).
   Run: node scripts/link-audit-full.mjs */
import {readdirSync,readFileSync,statSync,existsSync} from 'node:fs';
import {join,relative,dirname,normalize} from 'node:path';

const dist='dist';
const pages=[];
(function walk(dir){
  for(const f of readdirSync(dir)){
    const p=join(dir,f);
    if(statSync(p).isDirectory())walk(p);
    else if(f.endsWith('.html'))pages.push(p);
  }
})(dist);

const local=readdirSync(join(dist,'assets')).map(f=>'assets/'+f);
const assetSet=new Set(local);

const brokenPages=new Map();   // url -> [source pages]
const brokenAssets=new Map();  // url -> [source pages]
const weird=new Map();         // anomaly -> [source pages]
const h1dup=new Map();         // h1 text -> [pages]
let linkCount=0,srcCount=0;

function flag(map,key,src){
  if(!map.has(key))map.set(key,new Set());
  map.get(key).add(src);
}

for(const p of pages){
  const html=readFileSync(p,'utf8');
  const src='.'+relative(dist,p).replace(/\/?index\.html$/,'/');
  // h1 duplicates
  const h1=html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if(h1){const t=h1[1].replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();if(t)flag(h1dup,t,src);}
  // links
  for(const m of html.matchAll(/(?:href|src|poster)="([^"]*)"/g)){
    const u=m[1];linkCount++;
    if(u.startsWith('javascript:')||u===''||u==='#')flag(weird,'js/empty href: "'+u+'"',src);
    if(/undefined|null"/.test(u))flag(weird,'undefined/null url: '+u,src);
    if(u.startsWith('/')){
      const path=u.split('#')[0].split('?')[0];
      if(path.endsWith('.webp')||path.endsWith('.png')||path.endsWith('.jpg')||path.endsWith('.svg')||path.endsWith('.ico')){
        srcCount++;
        const f=normalize(path.replace(/^\//,''));
        if(!assetSet.has(f)&&!existsSync(join(dist,f)))flag(brokenAssets,path,src);
      }else if(path.endsWith('.pdf')||path.endsWith('.css')||path.endsWith('.js')||path.endsWith('.json')||path.endsWith('.txt')||path.endsWith('.webmanifest')){
        srcCount++;
        const f=normalize(path.replace(/^\//,''));
        if(!assetSet.has(f)&&!existsSync(join(dist,f)))flag(brokenAssets,path,src);
      }else{
        // page link
        const f=normalize(path.replace(/^\//,''));
        const target=join(dist,f,'index.html');
        const fileTarget=join(dist,f);
        if(!existsSync(target)&&!existsSync(fileTarget))flag(brokenPages,path,src);
      }
    }
  }
  // srcset entries
  for(const m of html.matchAll(/srcset="([^"]*)"/g)){
    for(const part of m[1].split(',')){
      const u=part.trim().split(/\s+/)[0];
      if(!u||!u.startsWith('/'))continue;
      srcCount++;
      const f=normalize(u.split('?')[0].replace(/^\//,''));
      if(!assetSet.has(f)&&!existsSync(join(dist,f)))flag(brokenAssets,u.split('?')[0],src);
    }
  }
}

console.log(`pages scanned: ${pages.length}; href/src checked: ${linkCount} (+${srcCount} assets via srcset)`);
const rep=(name,map,max=40)=>{
  const keys=[...map.keys()];
  console.log(`\n== ${name}: ${keys.length} unique ==`);
  for(const k of keys.slice(0,max)){
    const srcs=map.get(k);
    console.log(`  ${k}  ← ${[...srcs].slice(0,4).join(', ')}${srcs.size>4?' (+'+(srcs.size-4)+' more)':''}`);
  }
};
rep('BROKEN PAGE LINKS',brokenPages);
rep('BROKEN ASSETS',brokenAssets);
rep('ANOMALIES',weird);
const dupH1=[...h1dup.entries()].filter(([,s])=>s.size>1);
console.log(`\n== duplicate <h1> texts across pages: ${dupH1.length} ==`);
for(const [t,s] of dupH1.slice(0,20))console.log(`  "${t.slice(0,70)}"  ×${s.size}  e.g. ${[...s].slice(0,3).join(', ')}`);
