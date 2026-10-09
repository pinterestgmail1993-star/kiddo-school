// Kiddo School — My School Bag (the backpack: real saved creations + real
// printables) and the Learning Library (the bookshelf: every real destination,
// organised for browsing). Nothing fake: no certificates, no favorites, no
// invented content — every visible item goes somewhere real.
import {csLesson,vhLesson,emLesson,anLesson,msLesson,fwfhLesson,fcLesson,gbLesson,gfLesson,lessonsBase} from './lessons.mjs';
import {helloSchool as helloSchoolCt,circleBase} from './circle-time.mjs';
import {bunnyBook} from './books.mjs';
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
const MG='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/school/interactive-activities/';
const mgThumb=(file,alt)=>`<img src="${MG}${file}" width="1080" height="1080" alt="${alt}" loading="lazy">`;
const mgSplash='<svg viewBox="0 0 120 90" width="120" height="90" focusable="false" aria-hidden="true"><path d="M42 8 C58 4 78 15 83 33 C88 50 78 61 81 75 C84 88 66 95 47 92 C32 90 24 95 12 87 C0 79 -3 61 1 46 C5 31 2 19 12 10 C21 2 32 4 42 8 Z" fill="#d93a3a" transform="translate(2,0) scale(.62)"/><path d="M42 8 C58 4 78 15 83 33 C88 50 78 61 81 75 C84 88 66 95 47 92 C32 90 24 95 12 87 C0 79 -3 61 1 46 C5 31 2 19 12 10 C21 2 32 4 42 8 Z" fill="#f5c531" transform="translate(46,2) scale(.62)"/><path d="M42 8 C58 4 78 15 83 33 C88 50 78 61 81 75 C84 88 66 95 47 92 C32 90 24 95 12 87 C0 79 -3 61 1 46 C5 31 2 19 12 10 C21 2 32 4 42 8 Z" fill="#2f6fd0" transform="translate(88,4) scale(.62)"/></svg>';
export const learningLibrary={
 path:libraryBase,
 seoTitle:'Learning Library — Toddler Activities & Classes',
 title:'Learning Library — Toddler Activities & Classes',
 h1:'Learning Library',
 description:'Explore Kiddo School classes, games, Circle Time and creative activities for toddlers, all organized in one simple Learning Library.',
 eyebrow:'THE BOOKSHELF',
 intro:'Find something to learn, play or explore.',
 ages:{heading:'Browse by age',items:[
  ['Newborn','/newborn/'],['Baby','/baby/'],['12–18 Months','/toddler/12-18-months/'],['18–24 Months','/toddler/18-24-months/'],['Age 2','/toddler/2-years/'],['Age 3','/preschool/3-years/']]},
 sections:[
  {id:'magic-games',title:'Magic Games · playful practice for Age 3',items:[
   {kind:'Magic game · Class 2',href:'/preschool/3-years/magic-number-garden/',name:'Magic Counting Garden',img:mgThumb('magic-number-garden-age-3/06-magic-number-garden-cover.webp','The Magic Counting Garden cover: a smiling garden with flowers, a bee, a butterfly, ladybugs and a watering can')},
   {kind:'Magic game · Class 3',href:'/preschool/3-years/magic-shape-builder/',name:'Look & Draw — Magic Shapes',img:mgThumb('magic-shape-builder-age-3/06-magic-shape-builder-cover.webp','The Look & Draw — Magic Shapes cover: a house, rocket, tree, robot and butterfly built from colorful shapes')},
   {kind:'Magic game · Class 4',href:'/preschool/3-years/magic-color-mixing/',name:'Magic Color Lab',img:mgSplash},
   {kind:'Magic game · Class 5',href:'/preschool/3-years/magic-opposites-adventure/',name:'Magic Opposites Finder',img:mgThumb('magic-opposites-adventure-age-3/07-magic-opposites-adventure-cover.webp','The Magic Opposites Finder cover: a ball, a tree, a pencil, a glass, a soup bowl and a door')},
   {kind:'Magic game · Class 6',href:'/preschool/3-years/magic-animal-playground/',name:'Animal Sound Safari',img:mgThumb('magic-animal-playground-age-3/07-animal-playground-cover.webp','The Animal Sound Safari cover: six friendly animals on a playground')},
   {kind:'Magic game · Class 8',href:'/preschool/3-years/magic-fruit-basket/',name:'Magic Fruit Basket',img:mgThumb('magic-fruit-basket-age-3/10-fruit-basket-cover.webp','The Magic Fruit Basket cover: a woven basket surrounded by colorful fruit')}]},
  {id:'preschool',title:'Preschool · Letters, Numbers & Shapes',items:[
   {kind:'Class · Age 3',href:alphabetLesson.path,name:'Alphabet & Letter Sounds',lesson:alphabetLesson},
   {kind:'Class · Age 3',href:numbersLesson.path,name:'Numbers & Counting (1–10)',lesson:numbersLesson},
   {kind:'Class · Age 3',href:shapesLesson.path,name:'Shapes & Patterns',lesson:shapesLesson},
   {kind:'Class · Age 3',href:colorsLesson.path,name:'Colors & Color Mixing',lesson:colorsLesson},
   {kind:'Class · Age 3',href:oppositesLesson.path,name:'Opposites & Comparing',lesson:oppositesLesson},
   {kind:'Class · Age 3',href:animalsLesson.path,name:'Animals & Their Sounds',lesson:animalsLesson},
   {kind:'Class · Age 3',href:bodyPartsLesson.path,name:'Body Parts & My Five Senses',lesson:bodyPartsLesson},
   {kind:'Class · Age 3',href:fruitsLesson.path,name:'Fruits & Vegetables',lesson:fruitsLesson},
   {kind:'Flashcards · Age 3',href:'/flashcards/alphabet/',name:'Alphabet Flashcards A–Z',lesson:alphabetLesson},
   {kind:'Flashcards · Age 3',href:'/flashcards/numbers-and-counting/',name:'Numbers 1–10 Flashcards',lesson:numbersLesson},
   {kind:'Flashcards · Age 3',href:'/flashcards/shapes/',name:'Shape Flashcards',lesson:shapesLesson},
   {kind:'Flashcards · Age 3',href:'/flashcards/colors/',name:'Color Flashcards',lesson:colorsLesson},
   {kind:'Flashcards · Age 3',href:'/flashcards/opposites/',name:'Opposite Flashcards',lesson:oppositesLesson},
   {kind:'Flashcards · Age 3',href:'/flashcards/animal-sounds/',name:'Animal Flashcards',lesson:animalsLesson},
   {kind:'Flashcards · Age 3',href:'/flashcards/body-parts-and-five-senses/',name:'Body Parts & Five Senses Flashcards',lesson:bodyPartsLesson},
   {kind:'Flashcards · Age 3',href:'/flashcards/fruits-and-vegetables/',name:'Fruit & Vegetable Flashcards',lesson:fruitsLesson}]},
  {id:'books',title:'Books & Stories',items:[
   {kind:'Age 2 · Picture Story',href:bunnyBook.path,name:'Bunny Finds a Friend',cta:'Read Book',bookThumb:`<img src="${bunnyBook.base}${bunnyBook.cover.file}" width="2000" height="1545" alt="Cover of the picture book Bunny Finds a Friend: a smiling rabbit in a garden" loading="lazy">`}]},
  {id:'words',title:'Words & Talking',items:[
   {kind:'Class',href:anLesson.path,name:'Animals & Sounds',lesson:anLesson},
   {kind:'Class',href:vhLesson.path,name:'Vehicles & Sounds',lesson:vhLesson},
   {kind:'Class',href:fwfhLesson.path,name:'First Words: Food & Home',lesson:fwfhLesson}]},
  {id:'colors',title:'Colors & Shapes',items:[
   {kind:'Class',href:csLesson.path,name:'Colors & Shapes',lesson:csLesson},
   {kind:'Game',href:'/toddler/2-years/play-and-practice/sort-it/',name:'Sort It',doodle:'sort'}]},
  {id:'animals',title:'Animals',items:[
   {kind:'Class',href:anLesson.path,name:'Animals & Sounds',lesson:anLesson},
   {kind:'Game',href:'/toddler/2-years/play-and-practice/match-it/',name:'Match It',doodle:'match'}]},
  {id:'school-garden',title:'School Garden',items:[
   {kind:'Collections',href:'/toddler/2-years/school-garden/',name:'School Garden'},
   {kind:'Class',href:'/toddler/2-years/garden-bugs-and-friends/',name:'Bugs & Insects',lesson:gbLesson},
   {kind:'Class',href:gfLesson.path,name:'Garden Animals & Friends',img:`<img src="${gfLesson.ogImage}" width="1414" height="2000" alt="${gfLesson.ogAlt}" loading="lazy">`}]},
  {id:'vehicles',title:'Vehicles',items:[
   {kind:'Class',href:vhLesson.path,name:'Vehicles & Sounds',lesson:vhLesson}]},
  {id:'feelings',title:'Feelings',items:[
   {kind:'Class',href:emLesson.path,name:'Emotions & Feelings',lesson:emLesson}]},
  {id:'thinking',title:'Thinking & Matching',items:[
   {kind:'Class',href:msLesson.path,name:'Matching & Sorting',lesson:msLesson},
   {kind:'Class',href:fcLesson.path,name:'First Concepts: Big & Small, Up & Down',lesson:fcLesson},
   {kind:'Game',href:'/toddler/2-years/play-and-practice/match-it/',name:'Match It',doodle:'match'},
   {kind:'Game',href:'/toddler/2-years/play-and-practice/sort-it/',name:'Sort It',doodle:'sort'},
   {kind:'Game',href:'/toddler/2-years/play-and-practice/whats-different/',name:'What’s Different?',doodle:'diff'}]},
  {id:'circle-time',title:'Circle Time',items:[
   {kind:'Circle Time',href:helloSchoolCt.path,name:'Hello School!',ct:true}]},
  {id:'play',title:'Play & Practice',items:[
   {kind:'Games',href:'/toddler/2-years/play-and-practice/',name:'Play & Practice',doodle:'diff'}]},
  {id:'my-work',title:'My Work',items:[
   {kind:'Activities',href:'/toddler/2-years/my-work/',name:'My Work',doodle:'draw'},
   {kind:'Activity',href:'/toddler/2-years/my-work/draw-and-scribble/',name:'Draw & Scribble',doodle:'draw'},
   {kind:'Activity',href:'/toddler/2-years/my-work/trace-and-follow/',name:'Trace & Follow',doodle:'trace'}]}
 ]
};
export function learningLibraryBody(Lb){
 const item=it=>`<a class="lib-item" href="${it.href}">
  <span class="lib-thumb${it.bookThumb?' lib-thumb--book':''}">${it.img?it.img:it.bookThumb?it.bookThumb:it.ct?ctCover:it.lesson?coverImg(it.lesson):`<span class="lib-doodle">${doodle(it.doodle)}</span>`}</span>
  <span class="lib-copy"><strong>${esc(it.name)}</strong><span class="lib-kind">${it.kind}</span></span>
  <span class="fc-open">${it.cta||'Open'} <span aria-hidden="true">↗</span></span></a>`;
 return `${crumbs([['Learning Library',null]])}
 <section class="wrap section compact"><span class="eyebrow">${Lb.eyebrow}</span>
 <h1>${esc(Lb.h1)}</h1>
 <p class="mw-lede">${Lb.intro}</p>
 <div class="lib-ages"><span class="lib-ages-label">${Lb.ages.heading}:</span>
  ${Lb.ages.items.map(([label,href])=>`<a class="lib-age${href==='/toddler/2-years/'?' is-on':''}" href="${href}">${label}</a>`).join('')}
 </div>
 ${Lb.sections.map(s=>`<div class="lib-section" id="${s.id}"><h2>${esc(s.title)}</h2>
  <div class="lib-grid">${s.items.map(item).join('\n  ')}</div></div>`).join('\n')}
 <p class="fc-hint">Looking for today’s class? It is on the board in <a href="/my-classroom/">My Classroom</a>, and the whole journey is on the <a href="/learning-path/">Learning Path</a>.</p>
 <div class="hero-actions"><a class="button button-ghost" href="/my-classroom/">Back to My Classroom</a></div>
 </section>`;
}
export {bcSchema};
