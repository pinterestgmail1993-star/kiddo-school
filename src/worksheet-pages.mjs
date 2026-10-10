// Kiddo School — worksheet page bodies: the main library (/worksheets/),
// the eight subject categories and the individual worksheet pages.
// The individual page mirrors the flashcard page architecture (fc2-dual
// layout, breadcrumbs, related cards, rail with actions) while keeping
// worksheets their own resource type with their own URLs and schema.
import {SUBJECTS,CLASS_GUIDE,wsUrl,pdfUrl,WS_BASE} from './ws-common.mjs';
import {worksheets,bySubject,subjectCounts,relatedFor,neighbours,MATHS_PLANNED,LAYOUT_BY_TYPE} from './worksheets.mjs';
import {layoutToSVG} from './ws-vector.mjs';
import * as L from './ws-layouts.mjs';
import {esc} from './adventure-kit.mjs';

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
 const fn=L[LAYOUT_BY_TYPE[w.wsType]];
 if(!fn)throw Error('no layout builder for '+w.wsType);
 const els=fn(w.ws);
 for(const el of els)if(el.t==='image')el.img=0;
 return els;
}
/* build the SVG for a worksheet (page preview + print source) */
export function worksheetSVG(w){
 return layoutToSVG(worksheetEls(w),595,842,{label:'Preview of the printable '+w.title+' worksheet'});
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
 <p class="lesson-note">Every worksheet is free, needs no sign-up, and prints on A4 or US Letter. The <span class="ws-hl">Play online</span> links open the matching interactive game \u2014 paper and screen practice the same skill.</p></section>
 <section class="wrap lesson-section" aria-label="How to use the library"><span class="eyebrow">FOR GROWN-UPS</span><h2>How the library works.</h2>
 <p class="lesson-copy">Each worksheet belongs to a class on the Learning Path and to the interactive game it twins with. The page for every worksheet shows a true preview of what prints, a <strong>Download Free Worksheet</strong> button (a real PDF file), a <strong>Print Worksheet</strong> button that prints only the sheet \u2014 never the website \u2014 and a <strong>Play This Activity Online</strong> link to its game.</p>
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
 return `<a class="ws-card" href="${wsUrl(w.subject,w.slug)}">
  <span class="ws-card-art"><img src="${esc(w.art.img)}" width="400" height="284" alt="${esc(w.art.alt)}" loading="lazy"></span>
  <span class="ws-card-body">
   <strong>${esc(w.title)}</strong>
   <span class="ws-card-meta"><span>Age 4</span><span>Class ${s.classNum}</span><span>${esc(s.crumb)}</span></span>
   <span class="ws-card-desc">${esc(w.lede)}</span>
  </span>
  <span class="ws-card-open">View Worksheet <span aria-hidden="true">→</span></span>
 </a>`;
}

/* ---------- the individual worksheet page ---------- */
const ageLabel=w=>w.subject==='phonics'?'4–5 Years':'4 Years';

export function worksheetPageBody(w){
 const s=SUBJECTS[w.subject];
 const guide=CLASS_GUIDE[w.subject];
 const {prev,next}=neighbours(w);
 const related=relatedFor(w,6);
 const svg=worksheetSVG(w);
 const skillChips=`<div class="fc-chips lesson-chips"><span><strong>Age</strong> ${ageLabel(w)}</span><span><strong>Class</strong> ${s.classNum} · ${esc(s.crumb)}</span><span><strong>Type</strong> Printable PDF</span><span><strong>Plays with</strong> ${esc(w.game?`<a href="${esc(w.game.path)}">the online game</a>`:'the Maths Room')}</span></div>`;
 const hero=`<div class="ws-actions" aria-label="Worksheet actions">
   <a class="button ws-dl" href="${pdfUrl(w.subject,w.slug)}" download="${w.subject}-${w.slug}.pdf">Download Free Worksheet <span aria-hidden="true">↓</span></a>
   <button type="button" class="button button-ghost ws-print" data-ws-print>Print Worksheet <span aria-hidden="true">⎙</span></button>
   ${w.game?`<a class="button button-ghost ws-play" href="${esc(w.game.path)}">Play This Activity Online <span aria-hidden="true">↗</span></a>`:`<a class="button button-ghost ws-play" href="${esc(s.gameLib)}">Explore the Maths Room <span aria-hidden="true">↗</span></a>`}
   <p class="ws-action-hint">The PDF is a real printable file (A4, prints fine on US Letter). The print button prints only the worksheet \u2014 never the website around it. No sign-up, nothing stored.</p>
  </div>`;
 return `${crumbNav([['Worksheets',WS_BASE],[s.label,WS_BASE+s.key+'/'],[w.title]])}
 <article class="wrap lesson-hero ws-hero">
  <div class="ws-hero-art"><img src="${esc(w.art.img)}" width="800" height="568" alt="${esc(w.art.alt)}" fetchpriority="high"><figcaption class="ws-hero-cap">From the interactive adventure \u2014 the worksheet below brings it to paper.</figcaption></div>
  <div class="lesson-hero-copy">
   <span class="eyebrow">WORKSHEET · CLASS ${s.classNum} · AGES ${ageLabel(w).toUpperCase()}</span>
   <h1>${esc(w.title)} Worksheet${w.subject==='phonics'?' for Ages 4–5':' for Age 4'}</h1>
   ${skillChips}
   <p class="lesson-lede">${esc(w.lede)}</p>
   <p class="lesson-lede"><strong>On the sheet:</strong> ${esc(w.task)}</p>
  </div>
 </article>
 <section class="wrap lesson-section ws-preview-sec" aria-label="The worksheet">
  <span class="eyebrow">THE ACTUAL WORKSHEET</span>
  <h2>Exactly what you\u2019ll print.</h2>
  <p class="lesson-copy">This is the real sheet \u2014 the same file the buttons above hand you. Title, instructions, the activity itself, and a grown-up answer line where it helps.</p>
  ${hero}
  <div class="ws-print-root"><div class="ws-sheet">${svg}</div></div>
 </section>
 <section class="wrap lesson-section" aria-label="About this worksheet"><span class="eyebrow">ABOUT THIS WORKSHEET</span><h2>What your child practices.</h2>
  <p class="lesson-copy">${esc(w.learn)}</p>
  <ul class="ws-skills">${w.skills.map(k=>`<li>${esc(k)}</li>`).join('')}</ul>
 </section>
 <section class="wrap lesson-section" aria-label="How to use"><span class="eyebrow">HOW TO USE IT</span><h2>Three easy steps.</h2>
  <ol class="fc-steps">${guide.howto.map(([t,d])=>`<li><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('')}</ol>
 </section>
 <section class="wrap lesson-section" aria-label="Tips"><span class="eyebrow">TEACHING TIPS</span><h2>Little things that help.</h2>
  <div class="ws-tips">${guide.tips.map(([t,d])=>`<div class="tc-hunt"><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div>
  ${w.answers?`<div class="ws-answers"><h3>Answer guide</h3><p>${esc(w.answers)}</p></div>`:''}
 </section>
 <section class="wrap lesson-section ws-connect" aria-label="Where this fits"><span class="eyebrow">WHERE THIS FITS</span><h2>The class and the game behind it.</h2>
  <p class="lesson-copy">This worksheet is the paper twin of <strong>${esc(w.title)}</strong>${w.game?`, a real game in the <a href="${esc(s.gameLib)}">${esc(s.gameLibTitle)}</a> library`:''}. It belongs to <a href="${esc(s.classPath)}">${esc(s.classTitle)}</a> on the Age 4 learning path, and the whole ${esc(s.crumb.toLowerCase())} collection lives at <a href="${WS_BASE+s.key+'/'}">/worksheets/${s.key}/</a>. Play the game on screen first, print the worksheet second \u2014 or the other way round; they practice the same skill in two languages.</p>
 </section>
 <nav class="wrap lesson-section sa-prevnext" aria-label="More worksheets">
  <a class="sa-navcard" href="${wsUrl(prev.subject,prev.slug)}"><span class="eyebrow">Previous</span><strong>${esc(prev.title)}</strong></a>
  <a class="sa-navcard" href="${WS_BASE+s.key+'/'}"><span class="eyebrow">All ${esc(s.crumb.toLowerCase())}</span><strong>${esc(s.label)} worksheets</strong></a>
  <a class="sa-navcard" href="${wsUrl(next.subject,next.slug)}"><span class="eyebrow">Next</span><strong>${esc(next.title)}</strong></a>
 </nav>
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
