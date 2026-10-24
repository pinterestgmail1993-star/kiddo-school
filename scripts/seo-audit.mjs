/* SEO images audit: scan dist index.html files, extract meta, report issues. */
import {readdirSync,readFileSync,statSync,writeFileSync} from 'node:fs';
import {join,relative} from 'node:path';

const dist='dist';
const pages=[];
function walk(dir){
  for(const f of readdirSync(dir)){
    const p=join(dir,f);
    if(statSync(p).isDirectory())walk(p);
    else if(f==='index.html')pages.push(p);
  }
}
walk(dist);

const get=(html,re)=>{const m=html.match(re);return m?m[1]:null;};
const rows=pages.map(p=>{
  const html=readFileSync(p,'utf8');
  return {
    file:relative(dist,p).replace(/\/index\.html$/,'/'),
    canonical:get(html,/<link rel="canonical" href="([^"]+)"/),
    robots:get(html,/<meta name="robots" content="([^"]+)"/),
    ogImage:get(html,/<meta property="og:image" content="([^"]+)"/),
    ogAlt:get(html,/<meta property="og:image:alt" content="([^"]+)"/),
    twCard:get(html,/<meta name="twitter:card" content="([^"]+)"/),
    title:get(html,/<title>([^<]+)<\/title>/),
  };
});

const DEFAULT='https://assets.kiddo.school/school/branding/kiddo-social-sharing-art.webp';
const issues=[];
const ogCount=new Map();
for(const r of rows){
  ogCount.set(r.ogImage,(ogCount.get(r.ogImage)||0)+1);
  if(!r.ogImage)issues.push(['MISSING og:image',r.file]);
  if(r.ogImage&&!/^https:\/\//.test(r.ogImage))issues.push(['NON-ABSOLUTE og:image',r.file,r.ogImage]);
  if(!r.ogAlt)issues.push(['MISSING og:image:alt',r.file]);
  if(!r.twCard)issues.push(['MISSING twitter:card',r.file]);
  if(!r.canonical||!/^(https:\/\/kiddo\.school|https:\/\/.+\.pages\.dev)\//.test(r.canonical))issues.push(['BAD canonical',r.file,r.canonical]);
  if(!r.robots)issues.push(['MISSING robots',r.file]);
}
const usingDefault=rows.filter(r=>r.ogImage===DEFAULT);
const indexable=rows.filter(r=>r.robots&&r.robots.startsWith('index'));
const noindex=rows.filter(r=>r.robots&&r.robots.startsWith('noindex'));

console.log('total pages:',rows.length);
console.log('indexable:',indexable.length,' noindex:',noindex.length);
console.log('pages on DEFAULT social image:',usingDefault.length);
console.log('unique og:image URLs:',ogCount.size);
console.log('\n--- issues:',issues.length);
issues.slice(0,30).forEach(i=>console.log(i.join(' | ')));

console.log('\n--- pages on default image, by section:');
const bySec=new Map();
for(const r of usingDefault){
  const sec=r.file.split('/').filter(Boolean).slice(0,2).join('/');
  bySec.set(sec,(bySec.get(sec)||0)+1);
}
[...bySec.entries()].sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>console.log(String(v).padStart(5),k));

console.log('\n--- most-duplicated og:images (top 15):');
[...ogCount.entries()].filter(([k,v])=>v>5).sort((a,b)=>b[1]-a[1]).slice(0,15).forEach(([k,v])=>console.log(String(v).padStart(5),k));

console.log('\n--- sample noindex pages:');
noindex.slice(0,15).forEach(r=>console.log(' ',r.file));

writeFileSync('/tmp/seo-audit-rows.json',JSON.stringify(rows,null,1));
console.log('\nrows written to /tmp/seo-audit-rows.json');
