// Kiddo School — My School Bag (the backpack: real saved creations + real
// printables) and the Learning Library (the bookshelf: every real destination,
// organised for browsing). Nothing fake: no certificates, no favorites, no
// invented content — every visible item goes somewhere real.
import {csLesson,vhLesson,emLesson,anLesson,msLesson,fwfhLesson,fcLesson,gbLesson,gfLesson,lessonsBase} from './lessons.mjs';
import {helloSchool as helloSchoolCt,circleBase} from './circle-time.mjs';
import {BOOKS,BOOK_CATEGORIES,BOOK_AGES} from './books.mjs';
import {alphabetLesson} from './flashcards/data-alphabet.mjs';
import {numbersLesson} from './flashcards/data-numbers.mjs';
import {shapesLesson} from './flashcards/data-shapes.mjs';
import {colorsLesson} from './flashcards/data-colors.mjs';
import {oppositesLesson} from './flashcards/data-opposites.mjs';
import {animalsLesson} from './flashcards/data-animals.mjs';
import {bodyPartsLesson} from './flashcards/data-body-parts.mjs';
import {fruitsLesson} from './flashcards/data-fruits-vegetables.mjs';
export const bagBase='/my-school-bag/';
export const libraryBase='/learning-library/';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const crumbs=(parts)=>`<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a>${parts.map(([label,href])=>`<span aria-hidden="true">/</span>${href?`<a href="${href}">${esc(label)}</a>`:`<span aria-current="page">${esc(label)}</span>`}`).join('')}</nav>`;
const bcSchema=(site,parts)=>({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[['Home','/'],...parts].map(([name,path],i)=>({'@type':'ListItem',position:i+1,name,item:site+path}))});
const coverImg=(L,eager)=>`<img src="${L.r2Base||lessonsBase}${L.folder}${L.cover.file}" width="${L.cover.w}" height="${L.cover.h}" alt="${esc(L.cover.alt)}"${eager?'':' loading="lazy"'}>`;
const ctCover=`<img src="${circleBase}cover.webp" width="1920" height="1080" alt="Kiddo School teacher welcoming children to Circle Time" loading="lazy">`;
const doodle=kind=>kind==='draw'
 ?'<svg viewBox="0 0 120 90" width="120" height="90" focusable="false" aria-hidden="true"><path d="M14 62 C 30 22, 52 20, 60 44 S 92 74, 106 34" fill="none" stroke="#c9452c" stroke-width="9" stroke-linecap="round"/></svg>'
 :kind==='trace'
 ?'<svg viewBox="0 0 120 90" width="120" height="90" focusable="false" aria-hidden="true"><path d="M12 45 H 108" fill="none" stroke="#8a8f7a" stroke-width="7" stroke-linecap="round" stroke-dasharray="2 16"/></svg>'
 :kind==='match'
 ?'<svg viewBox="0 0 120 90" width="120" height="90" focusable="false" aria-hidden="true"><circle cx="38" cy="45" r="22" fill="#c9452c"/><circle cx="82" cy="45" r="22" fill="none" stroke="#c9452c" stroke-width="6" stroke-dasharray="1 12" stroke-linecap="round"/></svg>'
 :kind==='sort'
 ?'<svg viewBox="0 0 120 90" width="120" height="90" focusable="false" aria-hidden="true"><rect x="12" y="52" width="42" height="26" rx="5" fill="none" stroke="#33628c" stroke-width="5"/><rect x="66" y="52" width="42" height="26" rx="5" fill="none" stroke="#4a7c3f" stroke-width="5"/><circle cx="33" cy="28" r="13" fill="#33628c"/></svg>'
 :'<svg viewBox="0 0 120 90" width="120" height="90" focusable="false" aria-hidden="true"><circle cx="30" cy="40" r="17" fill="#dda233"/><circle cx="64" cy="40" r="17" fill="#dda233"/><path d="M92 24 105 56H79z" fill="#33628c"/></svg>';

/* --------------------------------------------------------- MY SCHOOL BAG */
export const schoolBag={
 path:bagBase,
 seoTitle:'My School Bag',
 title:'My School Bag',
 h1:'My School Bag',
 description:'Keep your Kiddo School creations and learning printables together in My School Bag.',
 eyebrow:'YOUR BACKPACK',
 intro:'Your school things, all in one place.',
 note:'Saved on this device.',
 emptyTitle:'Nothing here yet.',
 emptyLine:'Make a picture at your desk and save it here.',
 printables:{
  heading:'Printables',
  line:'Real cards and packs from our classes, ready for your printer.',
  items:[
   {href:'/toddler/2-years/colors-and-shapes/print/',name:'Colors & Shapes Activity Pack',meta:'Eight printable pages',lesson:csLesson},
   {href:'/toddler/2-years/vehicles-and-sounds/print/',name:'Vehicle Learning Cards',meta:'Twenty cards, two to a page',lesson:vhLesson},
   {href:'/toddler/2-years/emotions-and-feelings/print/',name:'Feeling Learning Cards',meta:'Twenty cards, two to a page',lesson:emLesson}
  ],
  more:{href:'/flashcards/',label:'More printable cards'}
 }
};
export function schoolBagBody(B){
 return `${crumbs([['My School Bag',null]])}
 <section class="wrap section compact"><span class="eyebrow">${B.eyebrow}</span>
 <h1>${esc(B.h1)}</h1>
 <p class="mw-lede">${B.intro}</p>
 <div class="bag-area" id="creations">
  <h2>My Creations</h2>
  <p class="fc-hint">${B.note}</p>
  <div class="bag-gallery" data-bag-gallery aria-live="polite">
   <div class="bag-empty" data-bag-empty>
    <p class="bag-empty-title">${B.emptyTitle}</p>
    <p>${B.emptyLine}</p>
    <a class="button" href="/toddler/2-years/my-work/draw-and-scribble/">Go to My Work</a>
   </div>
  </div>
  <template data-bag-itemtpl>
   <figure class="bag-item"><img data-bag-img width="480" height="360" alt="Saved drawing">
    <figcaption><span class="bag-date" data-bag-date></span>
     <span class="bag-actions"><button type="button" class="button button-ghost mw-small" data-bag-open>Open</button>
     <button type="button" class="button button-ghost mw-small" data-bag-delete>Delete</button></span></figcaption>
    <div class="bag-confirm" hidden><p>Remove this drawing?</p>
     <span class="bag-actions"><button type="button" class="button button-ghost mw-small" data-bag-keep>Keep It</button>
     <button type="button" class="button mw-small" data-bag-remove>Remove</button></span></div>
   </figure></template>
  <div class="bag-openview" data-bag-openview hidden><img data-bag-big width="1200" height="900" alt="Saved drawing, opened"><div class="hero-actions"><button type="button" class="button button-ghost" data-bag-close>Close</button></div></div>
  <p class="mw-live" data-bag-live aria-live="polite"></p>
 </div>
 <div class="bag-area" id="printables">
  <h2>${B.printables.heading}</h2>
  <p class="fc-hint">${B.printables.line}</p>
  <div class="bag-printables">
   ${B.printables.items.map(p=>`<a class="bag-print" href="${p.href}"><figure class="pp-card">${coverImg(p.lesson)}</figure>
    <span class="mw-choice-copy"><strong>${p.name}</strong><span>${p.meta}</span></span>
    <span class="fc-open">Open <span aria-hidden="true">↗</span></span></a>`).join('\n   ')}
  </div>
  <p class="fc-hint"><a href="${B.printables.more.href}">${B.printables.more.label}</a> live in the library too.</p>
 </div>
 <div class="hero-actions"><a class="button button-ghost" href="/my-classroom/">Back to My Classroom</a></div>
 </section>`;
}

/* ------------------------------------------------------- LEARNING LIBRARY */
/* ------------------------------------------------------- LEARNING LIBRARY */
// The Library is the school bookshelf: books only. Classes, games,
// flashcards and activities keep their own homes (Learning Path, My
// Classroom, the stage pages, the flashcards library) — this page stays a
// calm place to find and read real books. Nothing invented: a card exists
// only when the book's artwork and story are really uploaded.
export const learningLibrary={
 path:libraryBase,
 seoTitle:'Library — Free Picture Books to Read Online',
 title:'Library — Free Picture Books to Read Online',
 h1:'Library',
 description:'The Kiddo School Library: real picture books for toddlers, free to read online as often as you like, organized by age and category. Printable book PDFs are premium products, coming soon.',
 eyebrow:'THE BOOKSHELF',
 intro:'Every book in the school, on one shelf. Reading online is free and unlimited — no account, no payment, no limits.'
};
export function learningLibraryBody(Lb){
 const catCount=id=>BOOKS.filter(b=>b.category===id).length;
 const catName=id=>(BOOK_CATEGORIES.find(c=>c.id===id)||{}).name||id;
 const agesWithBooks=BOOK_AGES.filter(a=>BOOKS.some(b=>b.age===a.id));
 const ageHome=id=>{const b=BOOKS.find(x=>x.age===id);return b?'#cat-'+b.category:'#top';};
 const card=b=>`<article class="bookcard" data-lib-card data-age="${b.age}">
  <a class="bookcard-cover" href="${b.path}"><img src="${b.base}${b.cover.file}" width="${b.cover.w||b.w}" height="${b.cover.h||b.h}" alt="${esc(b.cover.alt)}" loading="lazy"></a>
  <div class="bookcard-body">
   <span class="lib-kind">${esc(b.kind)}</span>
   <h3><a href="${b.path}">${esc(b.title)}</a></h3>
   <p>${esc(b.description)}</p>
   <div class="bookcard-pills"><span class="pill">${esc(b.ageLabel)}</span><span class="pill">${esc(catName(b.category))}</span></div>
   <a class="button bookcard-read" href="${b.path}">Read Book <span aria-hidden="true">↗</span></a>
  </div>
 </article>`;
 return `${crumbs([['Library',null]])}
 <section class="wrap section compact" data-library id="top">
  <span class="eyebrow">${Lb.eyebrow}</span>
  <h1>${esc(Lb.h1)}</h1>
  <p class="mw-lede">${Lb.intro}</p>
  <p class="fc-hint">Printable book PDFs are premium products and are <strong>coming soon</strong> — reading every book right here on the site is free, with no account and no limits.</p>
  <div class="lib-ages" role="group" aria-label="Browse by category">
   <span class="lib-ages-label">Browse by category:</span>
   ${BOOK_CATEGORIES.map(c=>`<a class="lib-age" href="#cat-${c.id}" data-cat="${c.id}">${esc(c.name)} <span class="chip-count">${catCount(c.id)}</span></a>`).join('')}
  </div>
  <div class="lib-ages" role="group" aria-label="Browse by age">
   <span class="lib-ages-label">Browse by age:</span>
   ${agesWithBooks.length?agesWithBooks.map(a=>`<a class="lib-age" href="${ageHome(a.id)}" data-age-chip="${a.id}">${esc(a.label)}</a>`).join(''):'<span class="fc-hint">The first books are on their way.</span>'}
  </div>
  ${BOOK_CATEGORIES.map(c=>{
   const books=BOOKS.filter(b=>b.category===c.id);
   const label=books.length===1?'1 book':books.length+' books';
   const shelf=books.length
    ?`<div class="lib-grid bookshelf">${books.map(card).join('\n  ')}</div>`
    :`<div class="lib-empty"><p><strong>No books on this shelf yet.</strong></p><p>Nothing here is a placeholder — this shelf stays empty until a real book is ready to read.</p></div>`;
   return `<div class="lib-section lib-shelf" id="cat-${c.id}" data-lib-section data-cat="${c.id}">
    <h2>${esc(c.name)} <span class="chip-count">${label}</span></h2>
    <p class="lib-blurb">${esc(c.blurb)}</p>
    ${books.length?`<div class="lib-empty" data-lib-empty hidden><p><strong>No books on this shelf for that age yet.</strong></p><p>Try another age, or clear the filter to see the whole shelf.</p></div>`:''}
    ${shelf}
   </div>`;
  }).join('\n')}
  <p class="fc-hint">Looking for classes, games or flashcards? They keep their own rooms: the <a href="/learning-path/">Learning Path</a>, <a href="/my-classroom/">My Classroom</a> and the <a href="/flashcards/">Flashcards</a> library. The <a href="/toddler/2-years/school-garden/">School Garden</a> lives in Explore Our School on the <a href="/">School Home</a> page.</p>
  <div class="hero-actions"><a class="button button-ghost" href="/my-classroom/">Back to My Classroom</a></div>
 </section>`;
}
export {bcSchema};
