/* ONE-PAGE EVERYTHING (owner 2026-11-11: "delete all individual lesson pages
   and library pages — all the content should be on the main page, no
   individual pages").  Every lesson card page, library card page and
   worksheet page folds into its class / deck page as an anchored section,
   the old URL 301s to the parent, and the sitemap lists the parent only.
   This is the Class 41-48 one-page treatment, applied to the whole school by
   one generic step that runs after the last page() call and before the
   search index, /all-pages/ and the sitemap are written. */
import {readFileSync,writeFileSync,rmSync,existsSync,readdirSync,statSync} from 'node:fs';

/* Only these areas collapse. Games, the worksheet generator, books, activities
   and the singleton pages are real tools or one-off pages — they stay. */
const ROOTS=['/flashcards/','/worksheets/','/preschool/','/toddler/','/baby/','/newborn/','/cafeteria/','/clubs/','/dinosaurs/','/art-room/','/action-words/','/healthy-food/','/staying-safe/','/coloring-pages/','/extra-classes/','/kitchen/','/music-room/','/playground/','/toddler-room/','/nature-club/','/games/'];
/* Pages that list classes or decks — never a merge target. */
const AGGREGATORS=new Set(['/','/flashcards/','/worksheets/','/preschool/','/preschool/3-years/','/preschool/4-years/','/toddler/','/toddler/2-years/','/toddler/12-18-months/','/toddler/18-24-months/','/baby/','/newborn/','/extra-classes/','/coloring-pages/','/learning-path/','/learning-library/','/rooms/','/subjects/']);

/* markers of a playable tool page */
const INTERACTIVE=/id="(ia-tools|ms-tools|play)"|data-ia-|data-ms-|class="[^"]*\b(ia-stage|ms-stage|wsgen)\b/;
const parentOf=p=>p.slice(0,p.lastIndexOf('/',p.length-2)+1);

/* Remove every element whose opening tag matches openRe, with its whole
   subtree (balanced on the tag name). */
function removeEl(html,openRe){
 const re=new RegExp(openRe.source,'g'+(openRe.flags.replace('g','')));
 let out='',last=0,m;
 while((m=re.exec(html))){
  const tag=/^<([a-z0-9]+)/i.exec(m[0])[1].toLowerCase();
  const start=m.index;let depth=1;
  const scan=new RegExp('<(/?)'+tag+'\\b[^>]*>','gi');scan.lastIndex=start+m[0].length;
  let s,end=-1;
  while((s=scan.exec(html))){
   if(s[1]==='/'){depth--;if(depth===0){end=s.index+s[0].length;break;}}
   else if(!/\/>$/.test(s[0]))depth++;
  }
  if(end<0)continue;
  out+=html.slice(last,start);last=end;re.lastIndex=end;
 }
 return out+html.slice(last);
}

const txt=h=>h.replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim();

function entry(childHtml,slug){
 const mm=childHtml.match(/<main[^>]*>([\s\S]*)<\/main>/);
 if(!mm)return null;
 let c=mm[1];
 const title=txt((c.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)||[,''])[1]);
 /* keep the download link from the side rail before the rail goes */
 const dl=[...c.matchAll(/<a\b[^>]*\sdownload(?:="[^"]*")?[^>]*>[\s\S]*?<\/a>/g)].map(x=>x[0].replace(/\sid="[^"]*"/g,'')).slice(0,1);
 c=removeEl(c,/<nav\b[^>]*>/);
 c=removeEl(c,/<aside\b[^>]*>/);
 c=removeEl(c,/<section\b[^>]*\bcm\b[^>]*>/);
 c=removeEl(c,/<section\b[^>]*\bfc-section\b[^>]*>/);
 c=removeEl(c,/<form\b[^>]*>/);
 c=removeEl(c,/<script\b[^>]*>/);
 c=removeEl(c,/<noscript\b[^>]*>/);
 c=removeEl(c,/<button\b[^>]*>/);
 c=removeEl(c,/<canvas\b[^>]*>/);
 c=c.replace(/\sid="[^"]*"/g,'').replace(/\sdata-wc[a-z-]*(="[^"]*")?/g,'').replace(/\sfetchpriority="[^"]*"/g,'').replace(/\scrossorigin="[^"]*"/g,'');
 c=c.replace(/<img\b[^>]*>/g,t=>/\sloading=/.test(t)?t:t.replace('<img','<img loading="lazy" decoding="async"'));
 c=c.replace(/class="([^"]*)"/g,(_,k)=>'class="'+k.split(/\s+/).filter(x=>x&&x!=='wrap').join(' ')+'"');
 c=c.replace(/<h4\b/g,'<h5').replace(/<\/h4>/g,'</h5>').replace(/<h3\b/g,'<h4').replace(/<\/h3>/g,'</h4>').replace(/<h2\b/g,'<h4').replace(/<\/h2>/g,'</h4>');
 c=c.replace(/<h1\b[^>]*>/,'<h3 class="item-title">').replace(/<\/h1>/,'</h3>');
 c=c.replace(/<h1\b/g,'<h3').replace(/<\/h1>/g,'</h3>');
 c=c.replace(/\n\s*/g,' ').replace(/>\s+</g,'><');
 return {title,html:`<article class="one-page-item" id="${slug}">${c}${dl.length?`<p class="item-download">${dl[0]}</p>`:''}</article>`};
}

export function collapse({allRoutes,routeImg,searchPages,site,dist='dist'}){
 const S=new Set(allRoutes);
 const hasChild=new Set();
 for(const p of allRoutes){let a=parentOf(p);while(a&&a!=='/'){hasChild.add(a);a=parentOf(a);}}
 /* nearest ancestor that is a real page and not an aggregator */
 const target=p=>{let a=parentOf(p);while(a&&a!=='/'){if(S.has(a))return AGGREGATORS.has(a)?null:a;a=parentOf(a);}return null;};
 const items=[];const seen=new Set();
 for(const p of allRoutes){
  if(seen.has(p))continue;seen.add(p);
  if(!ROOTS.some(r=>p.startsWith(r)))continue;
  if(hasChild.has(p))continue;
  const parent=target(p);
  if(!parent||parent===p)continue;
  /* playable pages stay: the drawing adventures, matching/sorting tools and
     image activities are tools, not lessons or library cards */
  if(/\/adventures\//.test(p))continue;
  const cf=dist+p+'index.html';
  if(existsSync(cf)&&INTERACTIVE.test(readFileSync(cf,'utf8')))continue;
  items.push({path:p,parent});
 }
 const byParent=new Map();
 for(const it of items){if(!byParent.has(it.parent))byParent.set(it.parent,[]);byParent.get(it.parent).push(it);}
 const moved=new Map();      // old path -> new href (parent#slug)
 const redirects=[];         // {from,to}
 for(const [parent,list] of byParent){
  const pf=dist+parent+'index.html';
  let ph=readFileSync(pf,'utf8');
  const used=new Set();
  const arts=[];
  for(const it of list){
   const rel=it.path.slice(parent.length).replace(/\/$/,'');
   const segs=rel.split('/');
   let slug=segs[segs.length-1];
   if(used.has(slug))slug=segs.join('-');
   used.add(slug);
   const isPrint=/^(print|print-view)$/.test(slug);
   const f=dist+it.path+'index.html';
   if(!isPrint&&existsSync(f)){
    const en=entry(readFileSync(f,'utf8'),slug);
    if(en)arts.push(en.html);
   }
   moved.set(it.path,isPrint?parent:parent+'#'+slug);
   redirects.push({from:it.path,to:parent});
   /* image sitemap: the child's pictures ride on the parent */
   if(routeImg.has(it.path)){
    const merged=new Set([].concat(routeImg.get(parent)||[],routeImg.get(it.path)));
    routeImg.set(parent,[...merged]);routeImg.delete(it.path);
   }
   rmSync(dist+it.path,{recursive:true,force:true});
  }
  if(arts.length){
   const block=`<section class="wrap one-page-items" aria-label="Everything on this page">${arts.join('')}</section>`;
   const i=ph.lastIndexOf('</main>');
   ph=ph.slice(0,i)+block+ph.slice(i);
   writeFileSync(pf,ph);
  }
 }
 /* drop the children from every registry */
 const gone=new Set(items.map(i=>i.path));
 for(let i=allRoutes.length-1;i>=0;i--)if(gone.has(allRoutes[i]))allRoutes.splice(i,1);
 for(let i=searchPages.length-1;i>=0;i--)if(gone.has(searchPages[i].u))searchPages.splice(i,1);
 rewriteLinks(moved,dist);
 return {items,redirects,moved,parents:[...byParent.keys()]};
}
const walkHtml=d=>readdirSync(d).flatMap(n=>{const f=d+'/'+n;return statSync(f).isDirectory()?walkHtml(f):f.endsWith('.html')?[f]:[];});
export const walkAll=d=>readdirSync(d).flatMap(n=>{const f=d+'/'+n;return statSync(f).isDirectory()?walkAll(f):[f];});
/* every link that pointed at a removed page now points at parent#anchor */
export function rewriteLinks(moved,dist='dist'){
 for(const f of walkHtml(dist)){
  let h=readFileSync(f,'utf8');let ch=false;
  h=h.replace(/href="(\/[^"#?]*)"/g,(m,u)=>{if(moved.has(u)){ch=true;return 'href="'+moved.get(u)+'"';}return m;});
  if(ch)writeFileSync(f,h);
 }
}

/* ---- redirects ---------------------------------------------------------
   Cloudflare Pages takes 2,000 static + 100 dynamic (placeholder) rules, so
   3,500+ removed URLs are grouped into shapes and each shape becomes ONE
   placeholder rule per slash form. Every rule is checked against the pages and
   files that survive, so a rule can never swallow a live URL; a shape that
   would is written out as exact static rules instead. */
const PAGE_FIRST_VAR={flashcards:1,worksheets:1,'coloring-pages':1,preschool:2,toddler:2,baby:2,newborn:2};
export function buildRedirects({items,survivors,distFiles}){
 const fams=new Map();
 for(const it of items){
  const s=it.path.split('/').filter(Boolean),ps=it.parent.split('/').filter(Boolean);
  const from=PAGE_FIRST_VAR[s[0]]??1;
  const pat=s.map((seg,i)=>i<from||seg==='learn'||seg==='print'?seg:':p'+i);
  const key=pat.join('/')+'>'+ps.length;
  if(!fams.has(key))fams.set(key,{pat,plen:ps.length,list:[]});
  fams.get(key).list.push(it);
 }
 const toRe=pat=>new RegExp('^/'+pat.map(x=>x.startsWith(':')?'[^/]+':x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('/')+'/?$');
 const dyn=[],stat=[];
 for(const f of fams.values()){
  const re=toRe(f.pat);
  const live=[...survivors].some(u=>re.test(u))||distFiles.some(u=>re.test(u));
  const target='/'+f.pat.slice(0,f.plen).join('/')+'/';
  const ok=!live&&f.list.every(it=>{
   const s=it.path.split('/').filter(Boolean);
   const t='/'+f.pat.slice(0,f.plen).map((x,i)=>x.startsWith(':')?s[i]:x).join('/')+'/';
   return t===it.parent;
  });
  if(ok){
   const src='/'+f.pat.join('/');
   dyn.push(`${src} ${target} 301`,`${src}/ ${target} 301`);
  }else for(const it of f.list)stat.push(`${it.path} ${it.parent} 301`,`${it.path.replace(/\/$/,'')} ${it.parent} 301`);
 }
 return {dyn,stat};
}
