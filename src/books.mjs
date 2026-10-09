// Kiddo School — Digital books (/library/books/…). One reusable data
// structure drives every book: the same Book Reader component renders any
// book that supplies title, slug, age, cover, page images, alt text, page
// text and optional reading prompts. Future books are a new object here —
// the reader is never rebuilt.
//
// Book artwork lives in the public R2 bucket (kiddo-school-assets) under
// books/<age>/<slug>/. If the asset domain ever moves, update R2_BOOKS and
// the CSP img-src allow-list in scripts/build.mjs together.
export const R2_BOOKS='https://pub-f2fcb7c9b45a496cbeefef18dbba0ec0.r2.dev/books/';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const crumbs=parts=>`<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a>${parts.map(([label,href])=>`<span aria-hidden="true">/</span>${href?`<a href="${href}">${esc(label)}</a>`:`<span aria-current="page">${esc(label)}</span>`}`).join('')}</nav>`;

/* ------------------------------------------------------------------ SHELVES */
// The Library organizes books into four categories and six age groups. Both
// lists are data, not prose: the Library page renders its filters and any
// friendly empty states from them, so a new book only needs the two fields.
export const BOOK_CATEGORIES=[
 {id:'storybooks',name:'Storybooks',blurb:'Picture stories, bedtime stories, adventures, friendship and kindness.'},
 {id:'educational',name:'Educational Books',blurb:'Alphabet, numbers, shapes, colors, animals, nature and first words.'},
 {id:'activity',name:'Activity & Coloring Books',blurb:'Coloring, tracing, drawing, matching and puzzles.'},
 {id:'life-skills',name:'Life Skills & Feelings Books',blurb:'Emotions, manners, routines, hygiene and independence.'}
];
export const BOOK_AGES=[
 {id:'newborn',label:'Newborn'},
 {id:'baby',label:'Baby'},
 {id:'12-18',label:'12–18 Months'},
 {id:'18-24',label:'18–24 Months'},
 {id:'age-2',label:'Age 2'},
 {id:'age-3',label:'Age 3'}
];

/* ----------------------------------------------------- BUNNY FINDS A FRIEND */
// All nine artwork files are exactly as uploaded to R2 — same names, same
// order, nothing invented. Artwork is 2000×1545 landscape; page numbers and
// the story lines are part of the illustrations themselves.
export const bunnyBook={
 slug:'bunny-finds-a-friend',
 path:'/library/books/age-2/bunny-finds-a-friend/',
 seoTitle:'Bunny Finds a Friend | Picture Book for 2 Year Olds',
 h1:'Bunny Finds a Friend',
 title:'Bunny Finds a Friend',
 description:'Read Bunny Finds a Friend, a short picture story for toddlers about a bunny exploring the garden and meeting little garden friends.',
 eyebrow:'A KIDDO SCHOOL BOOK',
 lede:'A short picture story about a little bunny, a butterfly and a garden full of friends.',
 age:'age-2',
 ageLabel:'Age 2',
 kind:'Picture Story',
 category:'storybooks',
 backHref:'/learning-library/',
 backLabel:'Back to the Library',
 completionTitle:'You finished Bunny Finds a Friend!',
 completionSub:'The end of this little story — read it again, or find your next adventure in the library.',
 base:R2_BOOKS+'age-2/bunny-finds-a-friend/',
 w:2000,
 h:1545,
 cover:{file:'cover.webp',alt:'Bunny Finds a Friend book cover: a smiling rabbit in a garden with a butterfly, a bee, a ladybug and a snail'},
 pages:[
  {file:'01-this-is-bunny.webp',text:'This is Bunny.',prompt:'Can you point to Bunny?',alt:'Bunny, a happy brown rabbit, sitting in a garden with a butterfly, a bee, a ladybug and a snail nearby'},
  {file:'02-bunny-sees-a-butterfly.webp',text:'Bunny sees a butterfly.',prompt:'Can you find the butterfly?',alt:'Bunny reaching up happily as an orange butterfly flutters above the flowers'},
  {file:'03-bunny-follows-the-butterfly.webp',text:'Bunny follows the butterfly.',prompt:'Where is the butterfly going?',alt:'Bunny hopping along a garden path, following the dotted trail of the butterfly'},
  {file:'04-butterfly-flies-over-flowers.webp',text:'The butterfly flies over the flowers.',prompt:'What do you see?',alt:'The butterfly flying over pink, yellow and white flowers while Bunny watches'},
  {file:'05-bunny-sees-a-ladybug.webp',text:'Bunny sees a ladybug.',prompt:'Can you count the spots?',alt:'Bunny leaning down to look closely at a red ladybug on a green leaf'},
  {file:'06-bunny-sees-a-snail.webp',text:'Bunny sees a snail.',prompt:'Can you point to the snail?',alt:'Bunny smiling at a little brown snail sitting on a stone'},
  {file:'07-bunny-sees-a-bee.webp',text:'Bunny sees a bee.',prompt:'What does the bee say? Buzz!',alt:'Bunny looking up at a friendly bee flying past the flowers'},
  {file:'08-bunny-makes-a-new-friend.webp',text:'Bunny makes a new friend!',prompt:'Who landed on Bunny\u2019s nose?',alt:'The butterfly landing on Bunny\u2019s nose while the ladybug, the snail and the bee watch happily'}
 ]
};

/* Every real book in the school. Nothing invented: a book appears here only
   when its artwork and story are actually uploaded and readable. */
export const BOOKS=[bunnyBook];

/* ------------------------------------------------------------- PAGE BUILDER */
// The reader mount ships with the cover in the HTML (fast first paint, the
// reader adopts the same <img>), the whole book as JSON for the reader, and
// a <noscript> copy of the story so the book still reads without JavaScript.
const pageSrc=(b,p)=>b.base+p.file;
const pageImg=(b,p,eager)=>`<img src="${pageSrc(b,p)}" width="${b.w}" height="${b.h}" alt="${esc(p.alt)}"${eager?' fetchpriority="high"':' loading="lazy"'}>`;
function readerData(b){
 return JSON.stringify({
  title:b.title,completionTitle:b.completionTitle,completionSub:b.completionSub,
  backHref:b.backHref,backLabel:b.backLabel,ageLabel:b.ageLabel,
  cover:{src:pageSrc(b,b.cover),alt:b.cover.alt,w:b.w,h:b.h},
  pages:b.pages.map(p=>({src:pageSrc(b,p),alt:p.alt,text:p.text,prompt:p.prompt,w:b.w,h:b.h}))
 }).replaceAll('<','\\u003c');
}
export function bookReaderBody(b){
 const story=`<div class="bk-noscript">
  <h2>${esc(b.title)} — the whole story</h2>
  <div class="bk-noscript-grid">
   <figure class="bk-covercard"><img src="${pageSrc(b,b.cover)}" width="${b.w}" height="${b.h}" alt="${esc(b.cover.alt)}" loading="lazy"><figcaption>Cover</figcaption></figure>
   ${b.pages.map((p,i)=>`<figure class="bk-covercard"><img src="${pageSrc(b,p)}" width="${b.w}" height="${b.h}" alt="${esc(p.alt)}" loading="lazy"><figcaption>Page ${i+1}: ${esc(p.text)}</figcaption></figure>`).join('\n   ')}
  </div>
 </div>`;
 return `${crumbs([['Library','/learning-library/'],[b.ageLabel,'/toddler/2-years/'],[b.title]])}
 <section class="wrap section compact book-page">
  <span class="eyebrow">${esc(b.eyebrow)}</span>
  <h1>${esc(b.h1)}</h1>
  <p class="mw-lede">${esc(b.lede)}</p>
  <p class="fc-hint">${esc(b.ageLabel)}. Read together at your child&rsquo;s pace &mdash; little hands can turn every page. Reading online is free, as often as you like.</p>
  <div class="bk-reader" data-book-reader>
   <script type="application/json" data-book-data>${readerData(b)}</script>
   <div class="bk-static" data-bk-static>
    <div class="bk-covercard"><img src="${pageSrc(b,b.cover)}" width="${b.w}" height="${b.h}" alt="${esc(b.cover.alt)}" fetchpriority="high"></div>
   </div>
  </div>
  <noscript>${story}</noscript>
 </section>
 <section class="wrap section compact" aria-label="Printable version">
  <span class="eyebrow">PREMIUM PRINTABLE</span>
  <h2>Get Printable PDF — Premium</h2>
  <p class="lesson-copy">A print-ready PDF of this book is planned as a premium product. It is <strong>coming soon</strong> &mdash; there is nothing to pay today, no checkout and no price to show, because the paid library is not built yet. When it arrives, printable PDFs will be protected and granted only after a real purchase.</p>
  <p class="lesson-copy">Reading this book online stays free and unlimited, always. The pages above are the whole book &mdash; enjoy them as often as you like.</p>
  <p><span class="bk-premium-badge">Get Printable PDF — Premium · Coming Soon</span></p>
 </section>
 <section class="wrap section compact" aria-label="Reading tips for grown-ups">
  <span class="eyebrow">FOR GROWN-UPS</span>
  <h2>Read together, not on a schedule.</h2>
  <p class="lesson-copy">This book has eight little pages and one big idea: a friendly bunny meets some garden friends. There are no scores, no timers and nothing to finish &mdash; the story moves only when your child is ready.</p>
  <p class="lesson-copy">Let your child point, name, listen, or simply enjoy the pictures. The small questions on each page are invitations, never tests: answer them together, or ignore them completely and make up your own.</p>
  <div class="lesson-linkrow">
   <a class="lesson-pill-link" href="/learning-library/">Back to the Library</a>
   <a class="lesson-pill-link" href="/toddler/2-years/">Age 2 classes</a>
   <a class="lesson-pill-link" href="/toddler/2-years/garden-bugs-and-friends/">Garden Bugs &amp; Friends</a>
  </div>
 </section>`;
}

/* --------------------------------------------------------- STRUCTURED DATA */
// Factual only: what the page really shows. No author, ratings, reviews,
// awards, ISBN or publisher claims — none of that exists here.
export function bookSchema(site,b){
 return [
  {'@context':'https://schema.org','@type':'Book',name:b.title,url:site+b.path,image:pageSrc(b,b.cover),description:b.description,inLanguage:'en',isAccessibleForFree:true,typicalAgeRange:'2'},
  {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[['Home','/'],['Library','/learning-library/'],['Age 2','/toddler/2-years/'],[b.title,b.path]].map(([name,path],i)=>({'@type':'ListItem',position:i+1,name,item:site+path}))}
 ];
}
