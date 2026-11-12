/* ONE-PAGE EVERYTHING (owner 2026-11-11: "delete all individual lesson pages
   and library pages — all the content should be on the main page, no
   individual pages").  Every lesson card page, library card page and
   worksheet page folds into its class / deck page as an anchored section,
   the old URL 301s to the parent, and the sitemap lists the parent only.
   This is the Class 41-48 one-page treatment, applied to the whole school by
   one generic step that runs after the last page() call and before the
   search index, /all-pages/ and the sitemap are written. */
import {readFileSync,writeFileSync,rmSync,existsSync,readdirSync,statSync} from 'node:fs';

/* Only these areas collapse. The worksheet generator, the play games and the
   other real tools are one-off pages — they stay. OWNER 2026-11-11, second
   pass: "remove all individual pages they are still opening — check the whole
   site" — the library books, the draw-on-the-picture adventures, the toddler
   matching games and worksheet sheets, the Look & Learn word pages and the
   life-skills activity pages now fold too (the first pass kept them as
   "tools"; the owner overruled: no individual pages anywhere). */
const ROOTS=['/flashcards/','/worksheets/','/preschool/','/toddler/','/baby/','/newborn/','/cafeteria/','/clubs/','/dinosaurs/','/art-room/','/action-words/','/healthy-food/','/staying-safe/','/coloring-pages/','/extra-classes/','/kitchen/','/music-room/','/playground/','/toddler-room/','/nature-club/','/games/','/library/'];
/* Pages that list classes or decks — never a merge target. */
const AGGREGATORS=new Set(['/','/flashcards/','/worksheets/','/preschool/','/preschool/3-years/','/preschool/4-years/','/toddler/','/toddler/2-years/','/toddler/12-18-months/','/toddler/18-24-months/','/baby/','/newborn/','/extra-classes/','/coloring-pages/','/learning-path/','/learning-library/','/rooms/','/subjects/']);

/* The only static markup that still marks a real tool: a canvas that exists
   without JavaScript (the draw-and-scribble desk). Everything else — the
   write-color mounts, the progress markers — folds with its page now. */
const INTERACTIVE=/<canvas[\s>]/;
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
 /* keep the download link from the side rail before the rail goes —
    and harvest the JS-driven download buttons (data-ms-download and
    friends) into a real anchor, so every folded sheet still downloads
    the owner's original file with its SEO file name */
 const dl=[...c.matchAll(/<a\b[^>]*\sdownload(?:="[^"]*")?[^>]*>[\s\S]*?<\/a>/g)].map(x=>x[0].replace(/\sid="[^"]*"/g,'')).slice(0,1);
 const dlBtn=[...c.matchAll(/<(?:a|button)\b[^>]*\sdata-[a-z]+-download="([^"]+)"[^>]*>/g)].map(x=>x[1]).slice(0,1);
 if(!dl.length&&dlBtn.length)dl.push(`<a href="${dlBtn[0]}" download>Download the sheet</a>`);
 c=removeEl(c,/<nav\b[^>]*>/);
 c=removeEl(c,/<aside\b[^>]*>/);
 c=removeEl(c,/<section\b[^>]*\bcm\b[^>]*>/);
 c=removeEl(c,/<section\b[^>]*\bfc-section\b[^>]*>/);
 c=removeEl(c,/<form\b[^>]*>/);
 /* the story pages of a folded book live in <noscript> (the no-JS reading
    path) — unroll them into the visible article before the strip, so the
    folded book carries its whole story on the main page */
 c=c.replace(/<noscript\b[^>]*>([\s\S]*?)<\/noscript>/g,'$1');
 c=removeEl(c,/<script\b[^>]*>/);
 c=removeEl(c,/<noscript\b[^>]*>/);
 c=removeEl(c,/<button\b[^>]*>/);
 c=removeEl(c,/<canvas\b[^>]*>/);
 c=c.replace(/\sid="[^"]*"/g,'').replace(/\sdata-(wc|ia|ms|tc|fc|sa|cc|wa|ph|st)-[a-z-]*(="[^"]*")?/g,'').replace(/\sfetchpriority="[^"]*"/g,'').replace(/\scrossorigin="[^"]*"/g,'');
 c=c.replace(/<img\b[^>]*>/g,t=>/\sloading=/.test(t)?t:t.replace('<img','<img loading="lazy" decoding="async"'));
 c=c.replace(/class="([^"]*)"/g,(_,k)=>'class="'+k.split(/\s+/).filter(x=>x&&x!=='wrap').join(' ')+'"');
 c=c.replace(/<h4\b/g,'<h5').replace(/<\/h4>/g,'</h5>').replace(/<h3\b/g,'<h4').replace(/<\/h3>/g,'</h4>').replace(/<h2\b/g,'<h4').replace(/<\/h2>/g,'</h4>');
 c=c.replace(/<h1\b[^>]*>/,'<h3 class="item-title">').replace(/<\/h1>/,'</h3>');
 c=c.replace(/<h1\b/g,'<h3').replace(/<\/h1>/g,'</h3>');
 c=c.replace(/\n\s*/g,' ').replace(/>\s+</g,'><');
 /* OWNER 2026-11-11: "download buttons are too bottom — put them in
    horizontal view, with their description and buttons below the image, not
    stacked vertical." Folded items used to end with the download button
    buried under the Try-it / Keep-going boxes, ~1300px under the picture.
    Now the item shows the sheet first, then a band directly under it: the
    lead description on the left, the download button on the right. The
    Try-it / Keep-going boxes follow after the band. Items without a
    download anchor (the library books) or without a picture figure keep
    the old shape. */
 const tp=c.match(/<h3 class="item-title">[\s\S]*?<\/h3><p(?:[^>]*)>((?:(?!<\/p>)[\s\S])*)<\/p>/);
 let banded=false;
 if(tp&&dl.length){
  c=c.replace(/(<h3 class="item-title">[\s\S]*?<\/h3>)<p(?:[^>]*)>(?:(?!<\/p>)[\s\S])*<\/p>/,'$1');
  const figI=c.indexOf('</figure>');
  if(figI>=0){
   const at=figI+9;
   c=c.slice(0,at)+`<div class="item-band"><p class="item-desc">${tp[1]}</p><p class="item-download">${dl[0]}</p></div>`+c.slice(at);
   banded=true;
  }
 }
 /* OWNER 2026-11-11 v2: "render them small — there is a lot of empty — told
    you make horizontal — you still making vertical." The first pass kept the
    old card-page bones (fc2-dual's phantom rail column, fc2-pair's dangling
    second picture, fcl's sticky two-column split, the learn boxes as
    full-width rows), so deck pages still stack giant vertical blocks with
    dead space and the download far from the picture. Card- and lesson-shaped
    items are now REBUILT as a small tile for the horizontal shelf: picture(s)
    first, then the title, the age/subject pills, the short description and
    the download button UNDER the picture, and the teaching copy folded into a
    <details> so nothing the owner wrote is lost. Books and the few items
    without card markup keep the banded shape above. */
 let html;
 if(/class="fcl"|class="fc2-dual"|class="fc2-pair"/.test(c)){
  const eyebrow=(c.match(/<span class="eyebrow">([\s\S]*?)<\/span>/)||[,''])[1];
  c=c.replace(/<span class="eyebrow">[\s\S]*?<\/span>/,'');
  const figs=[...c.matchAll(/<figure\b[\s\S]*?<\/figure>/g)].map(m=>m[0]);
  c=c.replace(/<figure\b[\s\S]*?<\/figure>/g,'');
  let titleHtml='',lede='';
  const lm=c.match(/<h3 class="item-title">[\s\S]*?<\/h3><p[^>]*>((?:(?!<\/p>)[\s\S])*)<\/p>/);
  if(lm){titleHtml=lm[0].slice(0,lm[0].indexOf('</h3>')+5);lede=lm[1];c=c.replace(lm[0],'');}
  else{const tm=c.match(/<h3 class="item-title">[\s\S]*?<\/h3>/);if(tm){titleHtml=tm[0];c=c.replace(tm[0],'');}}
  const bm=c.match(/<div class="item-band"><p class="item-desc">([\s\S]*?)<\/p><p class="item-download">([\s\S]*?)<\/p><\/div>/);
  let pills='',bandDesc='',dlHtml=dl.length?dl[0]:'';
  if(bm){
   if(/class="fc-pill/.test(bm[1]))pills=bm[1];else bandDesc=bm[1];
   if(bm[2])dlHtml=bm[2];
   c=c.replace(bm[0],'');
  }
  const desc=lede||bandDesc;
  /* lessons folded with no <a download> of their own (their rail went with
    the page) — the owner's standing rule is a download under every picture,
    so the tile's own artwork becomes the download, SEO file name and all */
  if(!dlHtml&&figs.length){
   const src=((figs[0].match(/\ssrc="([^"]+)"/)||[,''])[1]).split('?')[0];
   if(src)dlHtml=`<a class="button" href="${src}" download="${src.split('/').pop()||'card.webp'}">Download the card <span aria-hidden="true">↓</span></a>`;
  }
  /* the rest is the teaching copy — strip empty card-page shells and the
     per-card "From the … class" line (the deck page already says it), then
     fold what is left into the details */
  const more=c.replace(/<div(?:\s[^>]*)?><\/div>/g,'').replace(/<p class="fc2-lesson">[\s\S]*?<\/p>/g,'').trim();
  const summary=/class="fcl"|class="fcl-copy"/.test(more)?'Open the full lesson':'Teaching tips';
  const media=figs.length?`<div class="op-media">${figs.join('')}</div>`:'';
  const head=eyebrow?`<span class="eyebrow op-eyebrow">${eyebrow}</span>`:'';
  const pillRow=pills?`<p class="op-pills">${pills}</p>`:'';
  const descTag=desc?`<p class="item-desc">${desc}</p>`:'';
  const dlTag=dlHtml?`<p class="item-download">${dlHtml}</p>`:'';
  const moreTag=more?`<details class="op-more"><summary>${summary}</summary><div class="op-more-body">${more}</div></details>`:'';
  html=`<article class="one-page-item op-tile" id="${slug}">${media}${head}${titleHtml}${pillRow}${descTag}${dlTag}${moreTag}</article>`;
 }else{
  html=`<article class="one-page-item" id="${slug}">${c}${dl.length&&!banded?`<p class="item-download">${dl[0]}</p>`:''}</article>`;
 }
 return {title,html};
}

/* Learning-Path class roots: a folded /learn/ card lesson whose PARENT sits
   under one of these roots lands on a class page — the owner's no-duplicates
   rule says the class page IS the lesson, so there the item is dropped (301
   + folder removed) instead of folded into a deck dump at the page floor. */
const LP_CLASS_ROOTS=['/baby/','/newborn/','/toddler/','/preschool/'];

export function collapse({allRoutes,routeImg,searchPages,site,dist='dist',parentOverrides}){
 const S=new Set(allRoutes);
 const hasChild=new Set();
 for(const p of allRoutes){let a=parentOf(p);while(a&&a!=='/'){hasChild.add(a);a=parentOf(a);}}
 /* nearest ancestor that is a real page and not an aggregator — except the
    pages the build pins by hand: books → the Learning Library, Look & Learn
    words → the Look & Learn class, life-skills activities → their class page
    (their own folder is not a real page, so the walk would stop at an
    aggregator and keep them alive). */
 const pinned=p=>parentOverrides&&parentOverrides.get(p);
 const target=p=>{const pin=pinned(p);if(pin)return pin;let a=parentOf(p);while(a&&a!=='/'){if(S.has(a))return AGGREGATORS.has(a)?null:a;a=parentOf(a);}return null;};
 const items=[];const seen=new Set();
 for(const p of allRoutes){
  if(seen.has(p))continue;seen.add(p);
  if(!ROOTS.some(r=>p.startsWith(r)))continue;
  if(hasChild.has(p))continue;
  const parent=target(p);
  if(!parent||parent===p)continue;
  const cf=dist+p+'index.html';
  if(existsSync(cf)&&INTERACTIVE.test(readFileSync(cf,'utf8')))continue;
  items.push({path:p,parent});
 }
 const byParent=new Map();
 for(const it of items){if(!byParent.has(it.parent))byParent.set(it.parent,[]);byParent.get(it.parent).push(it);}
 let dropCount=0;               // /learn/ lessons dropped from class pages (owner: no duplicates)
 const moved=new Map();      // old path -> new href (parent#slug)
 const redirects=[];         // {from,to}
 for(const [parent,list] of byParent){
  const pf=dist+parent+'index.html';
  let ph=readFileSync(pf,'utf8');
  const used=new Set();
  const arts=[];
  for(const it of list){
   /* the anchor slug is ALWAYS the path's own last segment — pinned pages
      (books → the Library, word pages → Look & Learn) do not start with
      their parent's path, so slicing at parent.length would mangle them */
   const segs=it.path.replace(/\/$/,'').split('/');
   let slug=segs[segs.length-1];
   if(used.has(slug))slug=segs.join('-');
   used.add(slug);
   const isPrint=/^(print|print-view)$/.test(slug);
   /* OWNER 2026-11-12: "on lesson the flashcards are shown on bottom and
      written open the lesson? what is this? you dont make duplicates ... how
      many times whats the difference between lesson and library." The /learn/
      card lessons under a Learning-Path class were folding into that class
      page as a second copy of the deck — the class IS the lesson and the
      deck page already carries every card with its teaching tips and
      downloads. On class pages (/baby/, /newborn/, /toddler/, /preschool/)
      the /learn/ items are now dropped, not folded: the old URL 301s to the
      class page, the folder is removed, and NO tile is appended. Room pages
      (cafeteria, dinosaurs, playground, art-room, ...) and the sight-words
      hub keep their folded lessons — there the folded items ARE the page's
      own content and no class page duplicates them. */
   const dropLearn=!isPrint&&/(^|\/)learn\//.test(it.path)&&LP_CLASS_ROOTS.some(r=>parent.startsWith(r));
   const f=dist+it.path+'index.html';
   if(!isPrint&&!dropLearn&&existsSync(f)){
    const en=entry(readFileSync(f,'utf8'),slug);
    if(en)arts.push(en.html);
   }
   moved.set(it.path,isPrint||dropLearn?parent:parent+'#'+slug);
   if(dropLearn)dropCount++;
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
 /* PHASE 2 — thin landing pages: an age/stage page under /baby/, /newborn/
    or /toddler/ that is only a short intro pointing at ONE real lesson is
    removed; its URL 301s to that lesson. */
 const THIN_ROOTS=['/baby/','/newborn/','/toddler/'];
 const notPrint=q=>!/\/print\/$/.test(q);
 const thin=[];
 for(const p of [...allRoutes]){
  if(!THIN_ROOTS.some(r=>p.startsWith(r))||AGGREGATORS.has(p)||!notPrint(p))continue;
  const kids=allRoutes.filter(q=>q!==p&&q.startsWith(p)&&notPrint(q));
  if(kids.length!==1)continue;
  const f=dist+p+'index.html';
  if(!existsSync(f))continue;
  const mm=readFileSync(f,'utf8').match(/<main[^>]*>([\s\S]*)<\/main>/);
  const words=mm?txt(mm[1].replace(/<script[\s\S]*?<\/script>/g,'')).split(' ').length:0;
  if(words>=300)continue;
  thin.push({path:p,parent:kids[0]});
 }
 const moved2=new Map();
 for(const it of thin){
  if(routeImg.has(it.path)){
   const merged=new Set([].concat(routeImg.get(it.parent)||[],routeImg.get(it.path)));
   routeImg.set(it.parent,[...merged]);routeImg.delete(it.path);
  }
  rmSync(dist+it.path+'index.html',{force:true});
  moved.set(it.path,it.parent);moved2.set(it.path,it.parent);
  redirects.push({from:it.path,to:it.parent});items.push(it);
  const gi=allRoutes.indexOf(it.path);if(gi>=0)allRoutes.splice(gi,1);
  const si=searchPages.findIndex(x=>x.u===it.path);if(si>=0)searchPages.splice(si,1);
 }
 rewriteLinks(moved,dist);
 unwrapSelfLinks(byParent,dist);
 console.log('Folded ' + items.length + ' individual pages into ' + byParent.size + ' main pages:');
 if(dropCount)console.log('  (owner 2026-11-12 "dont make duplicates": ' + dropCount + ' /learn/ card lessons DROPPED from class pages — the deck page already carries every card with its tips; old URLs 301 to the class)');
 for(const [parent,list] of [...byParent].sort((a,b)=>b[1].length-a[1].length)) console.log('  ' + String(list.length).padStart(4) + '  →  ' + parent);
 return {items,redirects,moved,parents:[...byParent.keys()]};
}

/* ONE-PAGE RULE, phase 3 (owner 2026-11-11: "no link anywhere points at a card
   section"): on every main page that just absorbed children, an anchor that
   now targets one of its own folded sections becomes a styled span — same
   classes, same ribbon hooks, no href, no jump. The lp-tile precedent. */
function unwrapSelfLinks(byParent,dist='dist'){
 for(const parent of byParent.keys()){
  const f=dist+parent+'index.html';
  if(!existsSync(f))continue;
  let h=readFileSync(f,'utf8');
  const re=new RegExp('<a\\b([^>]*?)\\shref="'+parent.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'#[a-z0-9-]+"([^>]*)>([\\s\\S]*?)</a>','g');
  const out=h.replace(re,(m,pre,post,inner)=>{
   const attrs=(pre+' '+post).replace(/\s(?:href|target|rel|download)(="[^"]*")?/g,'').trim();
   return '<span'+(attrs?' '+attrs:'')+'>'+inner+'</span>';
  });
  if(out!==h)writeFileSync(f,out);
 }
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
