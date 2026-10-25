// Kiddo School — Matching & Sorting for 2-Year-Olds (Toddler 4, Class 10).
// Thirty-one original Canva activity sheets the owner uploaded to
// school/toddler/2-years/matching-and-sorting/ (all verified 1414×2000
// portrait, audited image by image — see src/ms-data.mjs).
//
// THE ACTIVITY is the learning-path page: /toddler/2-years/matching-and-sorting/{slug}/
//   LEFT: the full original picture (never cropped) with the transparent
//   write-color drawing layer directly on top — pencil, colors, eraser,
//   undo, redo, clear, save; mouse, finger and stylus all work. Each
//   child's drawing is saved per child and restored when they come back.
//   RIGHT: simple text instructions and the drawing tools, with Previous /
//   Next activities and one honest link to the printable twin.
// THE PRINTABLE page: /worksheets/toddler/matching-and-sorting/{slug}/ —
//   download the original WebP, print, share, family reactions and parent
//   reviews (the school's existing moderated system), a link to solve the
//   same picture on screen, Previous / Next and related worksheets. No
//   drawing canvas on printables, and no PDFs: Canva made the artwork, the
//   school adds only the functionality.
// Progress saves per selected child in the site's existing localStorage
// store, in its own 'matching-sorting' band. Opening a page never
// completes anything — only a real save of the child's own drawing does.
import {R2,crumbNav,esc} from './adventure-kit.mjs';
import {fcCommunityMount} from './flashcards/index.mjs';
import {msPages,MS_W,MS_H} from './ms-data.mjs';

/* the registry travels with the builders so every consumer imports one module */
export {msPages};

export const MS_BASE=R2+'school/toddler/2-years/matching-and-sorting/';
export const MS_CLASS_PATH='/toddler/2-years/matching-and-sorting/';
/* The activities ARE the class's own section: each activity page sits
   directly under the class path, exactly as approved. */
export const MS_ACT_PATH=MS_CLASS_PATH;
export const MS_WS_BASE='/worksheets/toddler/matching-and-sorting/';

/* The owner's category cover, uploaded alongside the thirty-one sheets.
   It is the FACE of the class and of the worksheet category (hub card,
   category hero, og:image) and NEVER an activity: it stays out of the
   registry, the grids, the prev/next chains and every individual page. */
export const MS_COVER={file:'cover.webp',w:1264,h:1264,
 alt:'The cover of the Matching and Sorting worksheets for 2-year-olds — thirty-one printable matching and sorting activities.',
 get url(){return MS_BASE+this.file;}};

export const msBySlug=Object.fromEntries(msPages.map(a=>[a.slug,a]));

export function msNeighbours(a){
 const i=msPages.indexOf(a);
 return {prev:msPages[(i-1+msPages.length)%msPages.length],next:msPages[(i+1)%msPages.length]};
}

const shareBlock=(eyebrow,heading,url,title,media)=>{
 const enc=encodeURIComponent;
 const pin=media?`<a class="fc2-share-btn" href="https://pinterest.com/pin/create/button/?url=${enc(url)}&media=${enc(media)}&description=${enc(title)}" target="_blank" rel="noopener" aria-label="Save this on Pinterest">Pinterest</a>`:'';
 return `<div class="fc2-block fc2-share-block"><span class="eyebrow">${eyebrow}</span><h2>${heading}</h2><div class="fc2-share"><a class="fc2-share-btn" href="https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}" target="_blank" rel="noopener" aria-label="Share on X">X</a><a class="fc2-share-btn" href="https://www.facebook.com/sharer/sharer.php?u=${enc(url)}" target="_blank" rel="noopener" aria-label="Share on Facebook">Facebook</a><a class="fc2-share-btn" href="https://wa.me/?text=${enc(title+' '+url)}" target="_blank" rel="noopener" aria-label="Share on WhatsApp">WhatsApp</a>${pin}<button type="button" class="fc2-share-btn" data-fc-copy>Copy link</button></div><p class="fc-hint">Share buttons open in a new tab. The copy button copies this page’s address — nothing is tracked.</p></div>`;
};

/* ---------- the Matching & Sorting section on the Class 10 page ---------- */
export function matchingSortSection(){
 const cards=msPages.map((a,i)=>`<a class="sa-card" href="${MS_ACT_PATH}${a.slug}/" data-ms-card="${a.slug}">
   <span class="sa-card-num" aria-hidden="true">${i+1}</span>
   <span class="sa-card-done" data-ms-done hidden>Cleared!</span>
   <img src="${MS_BASE}${a.img}" width="707" height="1000" alt="Matching and sorting sheet ${i+1}: ${esc(a.tag)}" loading="lazy">
   <span class="sa-card-body"><strong>${a.label}</strong><span class="sa-card-tag">${esc(a.tag)}</span></span>
   <span class="sa-card-play">Start matching <span aria-hidden="true">→</span></span>
  </a>`).join('');
 return `<section class="wrap lesson-section" id="matching-sorting-fun" aria-label="Matching and sorting activities">
  <span class="eyebrow">MATCHING &amp; SORTING ACTIVITIES</span>
  <h2>Match, sort and draw — right on the sheet.</h2>
  <p class="lesson-copy">Thirty-one big, friendly activity sheets made for two-year-old hands: your child solves each one straight on the picture — drawing the matching lines, circling the twins and sorting the groups with a finger, a stylus or the mouse. Pencil, colors, eraser, undo and redo included, and every child’s drawing is saved for them in <a href="/my-classroom/">My Classroom</a> so they can come back and carry on where they left off.</p>
  <div class="sa-grid">${cards}</div>
  <p class="lesson-note">Prefer crayons on paper? Every sheet is also a printable worksheet in the <a href="${MS_WS_BASE}">Matching &amp; Sorting worksheet collection</a> — download and print.</p>
 </section>`;
}

/* ---------- the interactive activity page (the learning-path experience) ---------- */
export function matchingActivityBody(a,site){
 const {prev,next}=msNeighbours(a);
 const pageUrl=site+MS_ACT_PATH+a.slug+'/';
 const sheetUrl=MS_BASE+a.img;
 const twinUrl=MS_WS_BASE+a.slug+'/';
 const stepsHtml=a.steps.map(([t,d],i)=>`<li><span class="fc-stepnum">${i+1}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('');
 const pn=`<nav class="fc2-pn" aria-label="Previous and next matching and sorting activity"><a class="fc2-pn-btn" href="${MS_ACT_PATH}${prev.slug}/" rel="prev"><span aria-hidden="true">←</span> <strong>${prev.label}</strong><span>Previous activity</span></a><a class="fc2-pn-btn fc2-pn-next" href="${MS_ACT_PATH}${next.slug}/" rel="next"><strong>${next.label}</strong> <span aria-hidden="true">→</span><span>Next activity</span></a></nav>`;
 return `${crumbNav([['Learning Path','/learning-path/'],['Matching &amp; Sorting',MS_CLASS_PATH],[a.label]])}
 <div class="page-heading wrap"><span class="eyebrow">MATCHING &amp; SORTING \u00b7 TODDLER 4 \u00b7 AGE 2</span><h1>${esc(a.title)}</h1><p>${esc(a.tag)}</p></div>
 <div class="fc2-dual wrap">
  <div class="fc2-main">
   <section class="wc-section" aria-label="The activity sheet — solve it right on the picture" id="the-activity">
    <div class="wc-head"><span class="eyebrow">THE SHEET — SOLVE IT RIGHT ON IT</span><h2>Your activity is ready.</h2><p class="lesson-copy">Pick a color, then draw the matching lines, circle the twins or sort the groups straight on the picture with your finger, a stylus or the mouse. Press Save my work when you are proud — your drawing stays here for next time, and the picture is yours to keep.</p></div>
    <div class="wc-mount" data-ms-activity="${a.slug}" data-wc data-wc-src="${esc(sheetUrl)}?draw=1" data-wc-name="${esc(a.title)} — matching and sorting" data-wc-w="${MS_W}" data-wc-h="${MS_H}" data-wc-toolbar="#ms-tools" data-wc-restore="matching-sorting/${a.slug}">
     <figure class="fc2-hero ws-hero-art"><img src="${esc(sheetUrl)}?draw=1" width="${MS_W}" height="${MS_H}" alt="${esc(a.alt)}" fetchpriority="high" crossorigin="anonymous"></figure>
    </div>
    <noscript><p class="fc-hint">Solving on the screen needs JavaScript. The printable twin at <a href="${twinUrl}">${twinUrl}</a> always works — crayons included.</p></noscript>
   </section>
   ${pn}
  </div>
  <aside class="fc2-rail" aria-label="Instructions, drawing tools and saved progress">
   <section class="fc2-block fc2-first-block"><span class="eyebrow">HOW TO DO IT</span><h2>Three little steps.</h2><ol class="fc-steps">${stepsHtml}</ol><p class="fc-hint">Ask a grown-up to read the steps aloud the first time. After that, you know just what to do.</p></section>
   <section class="fc2-block" id="ms-tools" aria-label="Drawing tools"><span class="eyebrow">YOUR PENCIL CASE</span><h2>Pick your tools.</h2><p class="fc-hint">Pencil, nine crayons, an eraser, undo, redo and clear — the tools appear right here and work on the picture. Save keeps your finished drawing and remembers it for next time.</p></section>
   <section class="fc2-block" data-ms-progress-block><span class="eyebrow">MY PROGRESS</span><h2>Save it to keep it.</h2><p class="ls-progress-line" data-ms-progress aria-live="polite">This page is cleared for you the moment you save your finished drawing. Nothing counts until then — opening the page is just opening the door.</p><p class="ls-progress-done" data-ms-done hidden><strong>Cleared!</strong> Your drawing is saved on this device for your child, and the ribbon is on in <a href="${MS_CLASS_PATH}">Class 10</a>. Come back any time — your drawing will be waiting.</p></section>
   ${shareBlock('SHARE THIS ACTIVITY','Pass it on.',pageUrl,`${a.title} — matching and sorting activity for 2-year-olds from Kiddo.school`,false)}
   <section class="fc2-block"><span class="eyebrow">ON PAPER TOO</span><h2>Print the worksheet.</h2><p class="fc-hint">This sheet is also a printable worksheet with its own download and print buttons: <a href="${twinUrl}">${twinUrl}</a>.</p></section>
  </aside>
 </div>
 <section class="wrap lesson-section"><span class="eyebrow">FOR GROWN-UPS</span><h2>What this page practises.</h2>
  <p class="lesson-copy">${esc(a.grown)}</p>
  <ul class="ws-skills">${a.skills.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>
  <p class="lesson-copy">This activity belongs to <a href="${MS_CLASS_PATH}">Class 10 — Matching and Sorting (Age 2)</a> on the Learning Path, and the paper version lives with all thirty-one others in <a href="${MS_WS_BASE}">Matching &amp; Sorting Worksheets</a>. Progress is saved on this device for the child chosen in <a href="/my-classroom/">My Classroom</a> — and only a real save of finished work marks it cleared, never just opening the page.</p>
 </section>
 ${fcCommunityMount(MS_ACT_PATH+a.slug+'/')}`;
}

/* ---------- the worksheet category page ---------- */
export function msCategoryBody(){
 const cards=msPages.map(w=>`<a class="ws-card" href="${MS_WS_BASE}${w.slug}/">
  <span class="ws-card-art"><img src="${esc(MS_BASE+w.img)}" width="707" height="1000" alt="${esc(w.alt)}" loading="lazy"></span>
  <span class="ws-card-body"><strong>${w.title} Worksheet</strong><span class="ws-card-meta"><span>Age 2</span><span>Toddler 4 · Class 10</span></span><span class="ws-card-desc">${esc(w.tag)}</span></span>
  <span class="ws-card-open">View Worksheet <span aria-hidden="true">→</span></span>
 </a>`).join('');
 return `${crumbNav([['Worksheets','/worksheets/'],['Matching &amp; Sorting']])}
 <article class="wrap lesson-hero lesson-hero-cover"><div class="lesson-hero-copy">
  <span class="eyebrow">MATCHING &amp; SORTING \u00b7 31 WORKSHEETS \u00b7 AGE 2</span>
  <h1>Matching and sorting worksheets for 2-year-olds — printables.</h1>
  <p class="lesson-lede">Thirty-one matching and sorting worksheets from the owner’s own bold, friendly artwork: same-and-different pairs, animal twins and shadows, baby animals, big and small, color and shape sorts — every one a whole activity on a single page. Tap any picture to open it; download and print buttons live there.</p>
 </div><figure class="lesson-cover"><img src="${esc(MS_COVER.url)}" width="${MS_COVER.w}" height="${MS_COVER.h}" alt="${esc(MS_COVER.alt)}" fetchpriority="high"></figure></article>
 <section class="wrap section compact" aria-label="All matching and sorting worksheets">
  <div class="ws-grid">${cards}</div>
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">SOLVE THEM ON SCREEN TOO</span><h2>Every sheet has an on-screen twin.</h2>
  <p class="lesson-copy">Each of these thirty-one sheets can be solved right here on the website in <a href="${MS_CLASS_PATH}">Class 10 — Matching and Sorting (Age 2)</a>: the drawing layer sits on the picture, little hands draw the matching lines with a finger, a stylus or the mouse, and every child’s drawing is saved for next time. Open the class and start with <a href="${MS_ACT_PATH}match-same-colors/">Match Same Colors</a>.</p>
 </section>`;
}

/* ---------- the individual printable worksheet page ---------- */
export function msWorksheetBody(w,site){
 const {prev,next}=msNeighbours(w);
 const file=MS_BASE+w.img;
 const pageUrl=site+MS_WS_BASE+w.slug+'/';
 const actUrl=MS_ACT_PATH+w.slug+'/';
 const dlName=`matching-sorting-${w.slug}.webp`;
 const stepsHtml=w.steps.map(([t,d],i)=>`<li><span class="fc-stepnum">${i+1}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('');
 const pn=`<nav class="fc2-pn" aria-label="Previous and next worksheet"><a class="fc2-pn-btn" href="${MS_WS_BASE}${prev.slug}/" rel="prev"><span aria-hidden="true">←</span> <strong>${prev.label}</strong><span>Previous worksheet</span></a><a class="fc2-pn-btn fc2-pn-next" href="${MS_WS_BASE}${next.slug}/" rel="next"><strong>${next.label}</strong> <span aria-hidden="true">→</span><span>Next worksheet</span></a></nav>`;
 return `${crumbNav([['Worksheets','/worksheets/'],['Matching &amp; Sorting',MS_WS_BASE],[w.title]])}
 <div class="page-heading wrap"><span class="eyebrow">WORKSHEET \u00b7 MATCHING &amp; SORTING \u00b7 AGE 2</span><h1>${w.title} Worksheet</h1><p>${esc(w.meta)}</p></div>
 <div class="fc2-dual wrap">
  <div class="fc2-main">
   <section class="wc-section" aria-label="This worksheet" id="the-worksheet">
    <div class="wc-head"><span class="eyebrow">THE WORKSHEET</span><h2>The full sheet, exactly as the artist drew it.</h2><p class="lesson-copy">See the whole picture, download the original file or print it clean — just the picture, no buttons or banners. Want to solve it right now on this screen? <a href="${actUrl}">Solve it online</a> — same picture, drawing layer included.</p></div>
    <figure class="fc2-hero ws-hero-art"><img src="${esc(file)}" width="${MS_W}" height="${MS_H}" alt="${esc(w.alt)}" fetchpriority="high"></figure>
   </section>
   ${pn}
   <section class="fc2-learn" aria-label="About this worksheet"><section class="ws-rail-sec" aria-label="How to use"><span class="eyebrow">HOW TO USE IT</span><h2>Three little steps.</h2><ol class="fc-steps">${stepsHtml}</ol></section>
   <section class="ws-rail-sec" aria-label="Where this fits"><span class="eyebrow">WHERE THIS FITS</span><h2>The class behind it.</h2><p class="lesson-copy">This worksheet belongs to <a href="${MS_CLASS_PATH}">Class 10 — Matching and Sorting (Age 2)</a> on the Learning Path, and the whole collection lives at <a href="${MS_WS_BASE}">/worksheets/toddler/matching-and-sorting/</a>. Print it, solve it together, and let the fridge door be the gallery.</p></section></section>
  </div>
  <aside class="fc2-rail" aria-label="Download, print, share and family feedback">
   <section class="fc2-block fc2-first-block"><span class="eyebrow">TAKE IT TO THE TABLE</span><h2>Download &amp; print.</h2>
    <div class="fc2-actions"><button type="button" class="button ws-dl" data-ms-download="${esc(file)}" data-ms-filename="${dlName}">Download original image <span aria-hidden="true">\u2193</span></button><button type="button" class="button button-ghost ws-print" data-ms-print>Print this page <span aria-hidden="true">\u2318</span></button></div>
    <p class="fc-hint">The download keeps the original WebP picture, full size (1414\u00d72000, A4 portrait). Print opens your browser’s print dialog with just the picture — no header, no buttons, nothing stored.</p>
   </section>
   <div class="fc2-block"><span class="eyebrow">SOLVE IT ON SCREEN</span><h2>Solve it online.</h2><p class="fc-hint">The on-screen version of this sheet — drawing layer, three steps, save-your-work and all — lives at <a href="${actUrl}">${actUrl}</a>.</p><div class="fc2-actions"><a class="button" href="${actUrl}">Solve it online <span aria-hidden="true">↗</span></a></div></div>
   ${shareBlock('SHARE THIS WORKSHEET','Pass it on.',pageUrl,`${w.title} Worksheet — printable for 2-year-olds from Kiddo.school`,file)}
   ${fcCommunityMount(MS_WS_BASE+w.slug+'/')}
  </aside>
 </div>
 <section class="wrap fc-section" aria-label="Related worksheets"><span class="eyebrow">MORE MATCHING &amp; SORTING</span><h2>More worksheets like this one.</h2>
  <div class="ws-grid">${msPages.filter(x=>x.slug!==w.slug).slice(0,7).map(x=>`<a class="ws-card" href="${MS_WS_BASE}${x.slug}/"><span class="ws-card-art"><img src="${esc(MS_BASE+x.img)}" width="707" height="1000" alt="${esc(x.alt)}" loading="lazy"></span><span class="ws-card-body"><strong>${x.title} Worksheet</strong><span class="ws-card-meta"><span>Age 2</span><span>Toddler 4 · Class 10</span></span><span class="ws-card-desc">${esc(x.tag)}</span></span><span class="ws-card-open">View Worksheet <span aria-hidden="true">→</span></span></a>`).join('')}</div>
  <p class="lesson-copy"><a href="${MS_WS_BASE}">See all thirty-one matching and sorting worksheets <span aria-hidden="true">↗</span></a></p>
 </section>`;
}

/* ---------- schema helpers ---------- */
export function msWorksheetSchema(site,w){
 return {'@context':'https://schema.org','@type':'LearningResource',
  name:`${w.title} Worksheet for 2-Year-Olds`,
  description:w.meta,url:site+MS_WS_BASE+w.slug+'/',inLanguage:'en',
  learningResourceType:'Worksheet',educationalLevel:'Toddler',teaches:w.skills.join(', '),
 ageRange:'2',encodingFormat:'image/webp',contentUrl:MS_BASE+w.img,image:MS_BASE+w.img,
  about:{'@type':'Thing',name:'Matching and sorting'},
  provider:{'@type':'Organization',name:'Kiddo.school',url:site+'/'},
  isPartOf:{'@type':'CreativeWorkSeries',name:'Matching and Sorting (Toddler 4, Class 10)',url:site+MS_CLASS_PATH}};
}
