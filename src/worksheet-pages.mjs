// Kiddo School — worksheet page bodies: the main library (/worksheets/),
// the eight subject categories and the individual worksheet pages.
// The individual page mirrors the flashcard page architecture (fc2-dual
// layout, breadcrumbs, related cards, rail with actions) while keeping
// worksheets their own resource type with their own URLs and schema.
import {SUBJECTS,CLASS_GUIDE,wsUrl,pdfUrl,WS_BASE} from './ws-common.mjs';
import {worksheets,bySubject,subjectCounts,relatedFor,neighbours,MATHS_PLANNED,LAYOUT_BY_TYPE} from './worksheets.mjs';
import * as L from './ws-layouts.mjs';
import * as ML from './ws-maths-layouts.mjs';
import {esc} from './adventure-kit.mjs';
import {fcCommunityMount} from './flashcards/index.mjs';

const crumbNav=parts=>`<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a>${parts.map(([label,href])=>`<span aria-hidden="true">/</span>${href?`<a href="${esc(href)}">${esc(label)}</a>`:`<span aria-current="page">${esc(label)}</span>`}`).join('')}</nav>`;
const heading=(eyebrow,title,desc)=>`<div class="page-heading wrap"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${desc}</p></div>`;

const SUBJECT_ORDER=['maths','shapes','colors','writing','phonics','reading','logic','science'];
const catDesc={
 maths:'Counting, numbers and number writing \u2014 printable maths practice built from our own artwork.',
 shapes:'Shape matching, patterns, sorting and symmetry \u2014 the printable twins of the Shape Adventures games.',
 colors:'Coloring, mixing, sorting and design \u2014 print the studio activities and color them for real.',
 writing:'Tracing guides, mazes and dot-to-dots \u2014 the exact strokes the Writing Adventures trace on screen.',
 phonics:'Beginning sounds, rhymes, blending and word building \u2014 every sheet works on paper with a parent sound script.',
 reading:'Sequencing, clues, feelings and retelling \u2014 the paper twins of the Storytime Adventures, with draw-and-tell panels.',
 logic:'Patterns, odd ones, keys and clues \u2014 the printable twins of the Logic Adventures, each with a grown-up answer line.',
 science:'Predict, sort, count and discover \u2014 the printable twins of the Science Adventures: plant growth, weather, insects, magnets, habitats and one graduation lab.'
};

/* spelled-out count for the library heading (worksheets.length is the honest
   number; it changes as classes ship, so it is never hard-coded) */
const countWords=n=>{
 const ones=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
 const tens=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
 const under100=x=>x<20?ones[x]:(tens[Math.floor(x/10)]+(x%10?'-'+ones[x%10]:''));
 if(n<100)return under100(n);
 return ones[Math.floor(n/100)]+' hundred'+(n%100?' '+under100(n%100):'');
};
const libraryCount=()=>{const w=countWords(worksheets.length);return w[0].toUpperCase()+w.slice(1);};

/* the raw layout elements (PDF backend consumes these) */
export function worksheetEls(w){
 const name=LAYOUT_BY_TYPE[w.wsType];
 const fn=L[name]||ML[name];
 if(!fn)throw Error('no layout builder for '+w.wsType);
 const els=fn(w.ws);
 for(const el of els)if(el.t==='image')el.img=0;
 return els;
}


/* the six Purple Academy subject illustrations (R2, 1264×1264 probed). Shared
   subjects (shapes+colors, writing+phonics) reuse one illustration on purpose. */
const SUBJECT_IMG={
 maths:'kiddo-subject-maths.webp',shapes:'kiddo-subject-shapes-colors.webp',colors:'kiddo-subject-shapes-colors.webp',
 writing:'kiddo-subject-writing-phonics.webp',phonics:'kiddo-subject-writing-phonics.webp',
 reading:'kiddo-subject-alphabet-reading.webp',logic:'kiddo-subject-logic.webp',science:'kiddo-subject-science.webp'
};
const BRAND_R2='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/school/branding/';

/* ---------- the main library ---------- */
export function worksheetsHubBody(){
 const cards=SUBJECT_ORDER.map(k=>{
  const s=SUBJECTS[k],n=subjectCounts[k];
  const planned=k==='maths'?`<span class="ws-count-note">${n} of ${MATHS_PLANNED} ready \u2014 more arrive with their artwork</span>`:`<span class="ws-count-note">${n} free worksheets</span>`;
  const picks=bySubject(k).slice(0,3);
  return `<a class="ws-cat" href="${WS_BASE}${k}/">
   <span class="ws-cat-head"><img src="${BRAND_R2}${SUBJECT_IMG[k]}" width="1264" height="1264" alt="" aria-hidden="true" loading="lazy"><span class="ws-cat-pill" style="--tint:${s.tint};--accent:${s.accent}">Class ${s.classNum}</span><strong>${esc(s.label)}</strong></span>
   <p>${catDesc[k]}</p>
   ${planned}
   <span class="ws-cat-picks">${picks.map(p=>`<span>${esc(p.title)}</span>`).join('')}</span>
   <span class="fc-open">Browse ${esc(s.crumb)} worksheets <span aria-hidden="true">↗</span></span>
  </a>`;
 }).join('');
 return `${crumbNav([['Worksheets']])}
 ${heading('THE WORKSHEET LIBRARY','Free printable worksheets for little hands.',`${libraryCount()} printable activities \u2014 the paper twins of our games: tracing guides with the same strokes, counting rows, coloring outlines, sound sorts with parent scripts, and science labs with a grown-up answer line. Download a real PDF, print straight from the page, or play the matching game online.`)}
 <section class="wrap section compact" aria-label="Worksheet categories"><div class="ws-cats">${cards}</div>
 <p class="lesson-note">Every worksheet is free, needs no sign-up, and prints on A4 or US Letter. Each sheet&rsquo;s page keeps everything in reach: the artwork, the download and print buttons, and a place for families to react and comment.</p></section>
 <section class="wrap lesson-section" aria-label="How to use the library"><span class="eyebrow">FOR GROWN-UPS</span><h2>How the library works.</h2>
 <p class="lesson-copy">Each worksheet belongs to a class on the Learning Path. The page for every worksheet shows its artwork, a <strong>Download Free Worksheet</strong> button (a real PDF file) and a <strong>Print Worksheet</strong> button that opens the same PDF ready to print \u2014 never the website around it.</p>
 <p class="lesson-copy">Downloading or printing never marks anything complete in <a href="/my-classroom/">My Classroom</a> \u2014 worksheets are for tables, kitchens and fridge doors. Only the games save progress, and only for the child chosen there.</p></section>`;
}

/* ---------- subject category pages ---------- */
export function worksheetCategoryBody(subjectKey){
 const s=SUBJECTS[subjectKey];
 const list=bySubject(subjectKey);
 const note=subjectKey==='maths'?`<p class="lesson-note">Class 24 is growing: ${list.length} of the planned ${MATHS_PLANNED} maths worksheets are ready now \u2014 the ones whose artwork has been uploaded. The remaining adventures appear here with their own real pages the moment their artwork lands; nothing is published before it can be printed honestly.</p>`:'';
 return `${crumbNav([['Worksheets',WS_BASE],[s.label]])}
 ${heading((s.label+' WORKSHEETS').toUpperCase(),`${esc(s.label)} worksheets \u2014 free printables for age 4.`,catDesc[subjectKey]+' Every sheet twins with a real game in '+s.classTitle+' \u2014 download the PDF, print from the page, or play online.')}
 <section class="wrap section compact" aria-label="All ${esc(s.crumb)} worksheets">
  <div class="ws-grid">${list.map(w=>wsCard(w)).join('')}</div>
  ${note}
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">KEEP EXPLORING</span><h2>Where these come from.</h2>
  <div class="fc-stages">
   <a class="fc-stage lesson-card-link" href="${s.classPath}"><div class="fc-stage-pills"><span class="fc-age">Age 4</span><span class="fc-class">Class ${s.classNum}</span></div><h3>${esc(s.classTitle)}</h3><p>The class behind these worksheets \u2014 the full interactive lesson.</p><span class="fc-open">Open Class ${s.classNum} <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="${s.gameLib}"><div class="fc-stage-pills"><span class="fc-age">Age 4</span><span class="fc-class">Games</span></div><h3>${esc(s.gameLibTitle)}</h3><p>The interactive games these worksheets twin with \u2014 playable with finger, stylus or mouse.</p><span class="fc-open">Open the library <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="${WS_BASE}"><div class="fc-stage-pills"><span class="fc-age">All ages</span><span class="fc-class">Library</span></div><h3>The Worksheet Library</h3><p>All eight subjects \u2014 maths, shapes, colors, writing, phonics, reading, logic and science.</p><span class="fc-open">Browse all worksheets <span aria-hidden="true">↗</span></span></a>
  </div>
 </section>`;
}

export function wsCard(w){
 const s=SUBJECTS[w.subject];
 // Real probed art dimensions in the attrs — the bucket mixes four ratios
 // (1264×1264, 1024×768, 1920×1080, 1748×1240); the CSS box letterboxes the
 // file's own ratio with object-fit:contain instead of cover-cropping it.
 return `<a class="ws-card" href="${wsUrl(w.subject,w.slug)}">
  <span class="ws-card-art"><img src="${esc(w.art.img)}" width="${w.art.w}" height="${w.art.h}" alt="${esc(w.art.alt)}" loading="lazy"></span>
  <span class="ws-card-body">
   <strong>${esc(w.title)}</strong>
   <span class="ws-card-meta"><span>Age 4</span><span>Class ${s.classNum}</span><span>${esc(s.crumb)}</span></span>
   <span class="ws-card-desc">${esc(w.lede)}</span>
  </span>
  <span class="ws-card-open">View Worksheet <span aria-hidden="true">→</span></span>
 </a>`;
}

/* ---------- the individual worksheet page ---------- */
// Layout: the worksheet's artwork and its teaching notes sit in the left
// column; download, print, share buttons and the three community blocks
// (reactions, reviews, comments) sit in a right-hand rail — the same
// fc2-dual architecture as the flashcard pages, so both resources feel
// like the same school. Nothing on this page is a coded activity: the
// page shows the real artwork and hands over the real PDF, nothing else.
const ageLabel=w=>w.subject==='phonics'?'4\u20135 Years':'4 Years';

export function worksheetPageBody(w,site){
 const s=SUBJECTS[w.subject];
 const guide=CLASS_GUIDE[w.subject];
 const {prev,next}=neighbours(w);
 const related=relatedFor(w,6);
 const dl=pdfUrl(w.subject,w.slug);
 const enc=encodeURIComponent;
 const pageUrl=(site||'').replace(/\/$/,'')+wsUrl(w.subject,w.slug);
 const shareTitle=`${w.title} Worksheet for Age 4 \u2014 free printable from Kiddo.school`;
 const about=`<section class="ws-rail-sec" aria-label="About this worksheet"><span class="eyebrow">ABOUT THIS WORKSHEET</span><h2>What your child practices.</h2><p class="lesson-copy">${esc(w.learn)}</p><ul class="ws-skills">${w.skills.map(k=>`<li>${esc(k)}</li>`).join('')}</ul><p class="lesson-lede"><strong>On the sheet:</strong> ${esc(w.task)}</p></section>`;
 const howto=`<section class="ws-rail-sec" aria-label="How to use"><span class="eyebrow">HOW TO USE IT</span><h2>Three easy steps.</h2><ol class="fc-steps">${guide.howto.map(([t,d])=>`<li><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('')}</ol></section>`;
 const tips=`<section class="ws-rail-sec" aria-label="Tips"><span class="eyebrow">TEACHING TIPS</span><h2>Little things that help.</h2><div class="ws-tips">${guide.tips.map(([t,d])=>`<div class="tc-hunt"><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div>${w.answers?`<div class="ws-answers"><h3>Answer guide</h3><p>${esc(w.answers)}</p></div>`:''}</section>`;
 const connect=`<section class="ws-rail-sec" aria-label="Where this fits"><span class="eyebrow">WHERE THIS FITS</span><h2>The class behind it.</h2><p class="lesson-copy">This worksheet belongs to <a href="${esc(s.classPath)}">${esc(s.classTitle)}</a> on the Age 4 learning path, and the whole ${esc(s.crumb.toLowerCase())} collection lives at <a href="${WS_BASE+s.key+'/'}">/worksheets/${s.key}/</a>. One finished sheet is a full session \u2014 download it, print it, and let the fridge door be the gallery.</p></section>`;
 const pn=`<nav class="fc2-pn" aria-label="Previous and next worksheet"><a class="fc2-pn-btn" href="${wsUrl(prev.subject,prev.slug)}" rel="prev"><span aria-hidden="true">\u2190</span> <strong>${esc(prev.title)}</strong><span>Previous worksheet</span></a><a class="fc2-pn-btn fc2-pn-next" href="${wsUrl(next.subject,next.slug)}" rel="next"><strong>${esc(next.title)}</strong> <span aria-hidden="true">\u2192</span><span>Next worksheet</span></a></nav>`;
 const actions=`<div class="fc2-actions"><a class="button ws-dl" href="${dl}" download="${w.subject}-${w.slug}.pdf">Download Free Worksheet <span aria-hidden="true">\u2193</span></a><a class="button button-ghost ws-print" href="${dl}" target="_blank" rel="noopener">Print Worksheet <span aria-hidden="true">\u2318</span></a></div>
  <p class="fc-hint">The PDF is a real printable file (A4, prints fine on US Letter). The print button opens the same PDF ready to print \u2014 no sign-up, nothing stored.</p>`;
 const share=`<div class="fc2-block fc2-share-block"><span class="eyebrow">SHARE THIS WORKSHEET</span><h2>Pass it on.</h2><div class="fc2-share"><a class="fc2-share-btn" href="https://twitter.com/intent/tweet?url=${enc(pageUrl)}&text=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Share this worksheet on X">X</a><a class="fc2-share-btn" href="https://www.facebook.com/sharer/sharer.php?u=${enc(pageUrl)}" target="_blank" rel="noopener" aria-label="Share this worksheet on Facebook">Facebook</a><a class="fc2-share-btn" href="https://wa.me/?text=${enc(shareTitle+' '+pageUrl)}" target="_blank" rel="noopener" aria-label="Share this worksheet on WhatsApp">WhatsApp</a><a class="fc2-share-btn" href="https://pinterest.com/pin/create/button/?url=${enc(pageUrl)}&media=${enc(w.art.img)}&description=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Save this worksheet on Pinterest">Pinterest</a><button type="button" class="fc2-share-btn" data-fc-copy>Copy link</button></div><p class="fc-hint">Share buttons open in a new tab. The copy button copies this page&rsquo;s address \u2014 nothing is tracked.</p></div>`;
 return `${crumbNav([['Worksheets',WS_BASE],[s.label,WS_BASE+s.key+'/'],[w.title]])}
 <div class="page-heading wrap"><span class="eyebrow">WORKSHEET \u00b7 CLASS ${s.classNum} \u00b7 AGES ${ageLabel(w).toUpperCase()}</span><h1>${esc(w.title)} Worksheet${w.subject==='phonics'?' for Ages 4\u20135':' for Age 4'}</h1><p>${esc(w.lede)}</p></div>
 <div class="fc2-dual wrap">
  <div class="fc2-main">
   <figure class="fc2-hero ws-hero-art"><img src="${esc(w.art.img)}" width="${w.art.w}" height="${w.art.h}" alt="${esc(w.art.alt)}" fetchpriority="high"><figcaption><strong>${esc(w.title)}</strong><span>Class ${s.classNum} \u00b7 ${esc(s.label)}</span></figcaption></figure>
   ${pn}
   <section class="fc2-learn" aria-label="About this worksheet">${about}${howto}${tips}${connect}</section>
  </div>
  <aside class="fc2-rail" aria-label="Download, print, share and family feedback"><section class="fc2-block fc2-first-block"><span class="eyebrow">PRINT &amp; PLAY ON PAPER</span><h2>Take it to the table.</h2>${actions}</section>${share}${fcCommunityMount(wsUrl(w.subject,w.slug))}</aside>
 </div>
 <section class="wrap fc-section" aria-label="Related worksheets"><span class="eyebrow">RELATED WORKSHEETS</span><h2>More sheets like this one.</h2>
  <p class="fc-hint">Nearby worksheets from ${esc(s.label)} and its friends \u2014 each with its own page, preview and PDF.</p>
  <div class="ws-grid">${related.map(r=>wsCard(r)).join('')}</div>
 </section>`;
}

/* breadcrumb schema for a worksheet page */
export function worksheetBc(site,w){
 const s=SUBJECTS[w.subject];
 return {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
  ['Home','/'],['Worksheets',WS_BASE],[s.label,WS_BASE+s.key+'/'],[w.title,wsUrl(w.subject,w.slug)]
 ].map(([name,item],i)=>({'@type':'ListItem',position:i+1,name,item:site+(i===3?wsUrl(w.subject,w.slug):item)}))};
}
export function worksheetSchema(site,w){
 const s=SUBJECTS[w.subject];
 return {'@context':'https://schema.org','@type':'LearningResource',
  name:`${w.title} Worksheet for Age 4`,
  description:w.metaDescription,
  url:site+wsUrl(w.subject,w.slug),
  inLanguage:'en',
  learningResourceType:'Worksheet',
  educationalLevel:'Preschool',
  teaches:w.task,
  isAccessibleForFree:true,
  ageRange:w.subject==='phonics'?'4-5':'4',
  encodingFormat:'application/pdf',
  contentUrl:site+pdfUrl(w.subject,w.slug),
  image:w.art.img,
  about:{'@type':'Thing',name:s.classTitle},
  provider:{'@type':'Organization',name:'Kiddo.school',url:site+'/'},
  isPartOf:{'@type':'CreativeWorkSeries',name:s.classTitle,url:site+s.classPath}
 };
}
export function categoryBc(site,subjectKey){
 const s=SUBJECTS[subjectKey];
 return {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
  ['Home','/'],['Worksheets',WS_BASE],[s.label,WS_BASE+subjectKey+'/']
 ].map(([name,item],i)=>({'@type':'ListItem',position:i+1,name,item:site+item}))};
}
export function hubBc(site){
 return {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
  {'@type':'ListItem',position:1,name:'Home',item:site+'/'},{'@type':'ListItem',position:2,name:'Worksheets',item:site+WS_BASE}]};
}
export function CollectionSchema(site,subjectKey){
 const s=SUBJECTS[subjectKey];
 return {'@context':'https://schema.org','@type':'CollectionPage',name:`${s.label} Worksheets for Age 4`,description:catDesc[subjectKey],url:site+WS_BASE+subjectKey+'/',inLanguage:'en',isAccessibleForFree:true,hasPart:bySubject(subjectKey).map(w=>({'@type':'LearningResource',name:`${w.title} Worksheet`,url:site+wsUrl(w.subject,w.slug)}))};
}
