
/* ---------- neighbours in upload order, wrapping at the ends ---------- */
export const chWsBySlug=Object.fromEntries(communityWs.map(w=>[w.slug,w]));
export function chWsNeighbours(w){
 const i=communityWs.indexOf(w);
 return {prev:communityWs[(i-1+communityWs.length)%communityWs.length],next:communityWs[(i+1)%communityWs.length]};
}
const stepCards=[['1','Trace it','Big dotted words to trace in your favorite color.'],['2','Match them','Draw lines from the helper to their tools.'],['3','Circle them','Look closely, then circle every one that fits.'],['4','Count it','Count with one touch per picture, then write the number.'],['5','Draw it','The last box is all yours — draw!']];

/* ---------- the Learning Path ACTIVITY page (canvas LEFT, guidance RIGHT) --- */
export function communityWsActivityBody(w,site){
 const {prev,next}=chWsNeighbours(w);
 const enc=encodeURIComponent;
 const pageUrl=site+CH_WS_CLASS+w.slug+'/';
 const shareTitle=`${w.title} — a free Community Helpers worksheet activity for ages 4–5 from Kiddo.school`;
 const stepsHtml=w.steps.map(([t,d],i)=>`<li><span class="fc-stepnum">${i+1}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('');
 const pn=`<nav class="fc2-pn" aria-label="Previous and next worksheet activity"><a class="fc2-pn-btn" href="${CH_WS_CLASS}${prev.slug}/" rel="prev"><span aria-hidden="true">←</span> <strong>${esc(prev.title)}</strong><span>Previous activity</span></a><a class="fc2-pn-btn fc2-pn-next" href="${CH_WS_CLASS}${next.slug}/" rel="next"><strong>${esc(next.title)}</strong> <span aria-hidden="true">→</span><span>Next activity</span></a></nav>`;
 return `${crumbNav([['Learning Path','/learning-path/'],['Community Helpers & Our Neighborhood',CH_CLASS_PATH],[esc(w.title)+' worksheet']])}
 <div class="page-heading wrap"><span class="eyebrow">COMMUNITY HELPERS WORKSHEET ACTIVITY · CLASS 33 · AGES 4–5</span><h1>${esc(w.title)} — solve it right on the sheet.</h1><p>${esc(w.tag)}</p></div>
 <div class="fc2-dual wrap ls-dual">
  <div class="fc2-main">
   <section class="wc-section" aria-label="The worksheet — draw right on it" id="the-activity">
    <div class="wc-head"><span class="eyebrow">THE WORKSHEET — WRITE AND DRAW RIGHT ON IT</span><h2>Your sheet is ready.</h2><p class="lesson-copy">Pick a color or the eraser, then trace, match, circle, count and draw straight on the sheet with your finger, a stylus or the mouse. Press Save my work when you are proud — that is what marks this activity cleared for your child.</p></div>
    <div class="wc-mount" data-chws-activity="${w.slug}" data-wc data-wc-src="${esc(CH_WS_BASE+w.file)}?draw=1" data-wc-name="${esc(w.title)} community helpers worksheet" data-wc-w="${w.w}" data-wc-h="${w.h}" data-wc-toolbar="#chws-tools" data-wc-restore="community-helpers/${w.slug}">
     <figure class="fc2-hero ws-hero-art ls-sheet"><img src="${esc(CH_WS_BASE+w.file)}?draw=1" width="${w.w}" height="${w.h}" alt="The full ${esc(w.title)} community-helpers worksheet: ${esc(w.tag)}" fetchpriority="high" crossorigin="anonymous"></figure>
    </div>
    <noscript><p class="fc-hint">Solving on the sheet needs JavaScript. The printable twin at <a href="${CH_WS_LIB}${w.slug}/">${CH_WS_LIB.slice(0,-1)+w.slug+'/'} /</a> always works.</p></noscript>
   </section>
   ${pn}
  </div>
  <aside class="fc2-rail" aria-label="Instructions, drawing tools and saved progress">
   <section class="fc2-block fc2-first-block"><span class="eyebrow">HOW TO DO IT</span><h2>Five little steps.</h2><ol class="fc-steps">${stepsHtml}</ol><p class="fc-hint">Ask a grown-up to read the steps aloud the first time. After that, you know just what to do.</p></section>
   <section class="fc2-block" id="chws-tools" aria-label="Drawing tools"><span class="eyebrow">YOUR PENCIL CASE</span><h2>Pick your tools.</h2><p class="fc-hint">Pencil, nine crayons, an eraser, undo, redo and clear — the tools appear right here and work on the sheet. Save keeps your finished work as a picture, and your saved work comes back next time.</p></section>
   <section class="fc2-block" data-chws-progress-block><span class="eyebrow">MY PROGRESS</span><h2>Save it to keep it.</h2><p class="ls-progress-line" data-chws-progress aria-live="polite">This activity is cleared for you the moment you save your finished sheet. Nothing counts until then — opening the page is just opening the door.</p><p class="ls-progress-done" data-chws-done hidden><strong>Cleared!</strong> Your saved work for this sheet is in your downloads, and the ribbon is on in <a href="${CH_CLASS_PATH}">Class 33</a>.</p></section>
   <section class="fc2-block fc2-share-block"><span class="eyebrow">SHARE THIS ACTIVITY</span><h2>Pass it on.</h2><div class="fc2-share"><a class="fc2-share-btn" href="https://twitter.com/intent/tweet?url=${enc(pageUrl)}&text=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Share this activity on X">X</a><a class="fc2-share-btn" href="https://www.facebook.com/sharer/sharer.php?u=${enc(pageUrl)}" target="_blank" rel="noopener" aria-label="Share this activity on Facebook">Facebook</a><a class="fc2-share-btn" href="https://wa.me/?text=${enc(shareTitle+' '+pageUrl)}" target="_blank" rel="noopener" aria-label="Share this activity on WhatsApp">WhatsApp</a><button type="button" class="fc2-share-btn" data-fc-copy>Copy link</button></div></section>
   <section class="fc2-block"><span class="eyebrow">PREFER PAPER?</span><h2>Print the twin.</h2><p class="fc-hint">The same sheet lives in the worksheet library with its download and print buttons: <a href="${CH_WS_LIB}${w.slug}/">/worksheets/community-helpers-and-our-neighborhood/${w.slug}/</a>. Crayons beat styluses sometimes.</p></section>
  </aside>
 </div>
 <section class="wrap lesson-section"><span class="eyebrow">FOR GROWN-UPS</span><h2>What this worksheet teaches.</h2>
  <p class="lesson-copy"><strong>What the child is learning:</strong> ${esc(w.learn)}</p>
  <p class="lesson-copy"><strong>Knowledge to have ready:</strong> ${esc(w.know)}</p>
  <p class="lesson-copy"><strong>Why this activity matters:</strong> ${esc(w.why)}</p>
  <ul class="ws-skills">${w.skills.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>
  <p class="lesson-copy"><strong>What to say before you start:</strong> ${esc(w.say)}</p>
  <p class="lesson-copy"><strong>What to look for on the sheet:</strong> ${esc(w.look)}</p>
  <p class="lesson-copy"><strong>Questions to ask along the way:</strong> ${esc(w.ask)}</p>
  <p class="lesson-copy"><strong>Helpful hints without giving it away:</strong> ${esc(w.hint)}</p>
  <p class="lesson-copy"><strong>Parent tips:</strong> ${esc(w.tips)}</p>
  <p class="lesson-copy"><strong>Understanding check:</strong> ${esc(w.check)}</p>
  <p class="lesson-copy"><strong>Real-life practice:</strong> ${esc(w.real)}</p>
  <p class="lesson-copy">This activity belongs to <a href="${CH_CLASS_PATH}">Class 33 — Community Helpers &amp; Our Neighborhood</a> on the Learning Path. Progress is saved on this device for the child chosen in <a href="/my-classroom/">My Classroom</a> — and only a real save of finished work marks it cleared, never just opening the page.</p>
 </section>
 ${fcCommunityMount(CH_WS_CLASS+w.slug+'/')}`;
}

/* ---------- the PRINTABLE library page (NO canvas) ---------- */
export function communityWsPrintableBody(w,site){
 const {prev,next}=chWsNeighbours(w);
 const enc=encodeURIComponent;
 const file=CH_WS_BASE+w.file;
 const pageUrl=site+CH_WS_LIB+w.slug+'/';
 const shareTitle=`${w.title} Worksheet for Ages 4–5 — free printable from Kiddo.school`;
 const dlName=`community-helpers-${w.slug}.webp`;
 const stepsHtml=w.steps.map(([t,d],i)=>`<li><span class="fc-stepnum">${i+1}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('');
 const pn=`<nav class="fc2-pn" aria-label="Previous and next worksheet"><a class="fc2-pn-btn" href="${CH_WS_LIB}${prev.slug}/" rel="prev"><span aria-hidden="true">←</span> <strong>${esc(prev.title)}</strong><span>Previous worksheet</span></a><a class="fc2-pn-btn fc2-pn-next" href="${CH_WS_LIB}${next.slug}/" rel="next"><strong>${esc(next.title)}</strong> <span aria-hidden="true">→</span><span>Next worksheet</span></a></nav>`;
 const share=`<div class="fc2-block fc2-share-block"><span class="eyebrow">SHARE THIS WORKSHEET</span><h2>Pass it on.</h2><div class="fc2-share"><a class="fc2-share-btn" href="https://twitter.com/intent/tweet?url=${enc(pageUrl)}&text=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Share this worksheet on X">X</a><a class="fc2-share-btn" href="https://www.facebook.com/sharer/sharer.php?u=${enc(pageUrl)}" target="_blank" rel="noopener" aria-label="Share this worksheet on Facebook">Facebook</a><a class="fc2-share-btn" href="https://wa.me/?text=${enc(shareTitle+' '+pageUrl)}" target="_blank" rel="noopener" aria-label="Share this worksheet on WhatsApp">WhatsApp</a><a class="fc2-share-btn" href="https://pinterest.com/pin/create/button/?url=${enc(pageUrl)}&media=${enc(file)}&description=${enc(shareTitle)}" target="_blank" rel="noopener" aria-label="Save this worksheet on Pinterest">Pinterest</a><button type="button" class="fc2-share-btn" data-fc-copy>Copy link</button></div><p class="fc-hint">Share buttons open in a new tab. The copy button copies this page’s address — nothing is tracked.</p></div>`;
 return `${crumbNav([['Worksheets','/worksheets/'],['Community Helpers & Our Neighborhood',CH_WS_LIB],[w.title]])}
 <div class="page-heading wrap"><span class="eyebrow">WORKSHEET · CLASS 33 · AGES 4–5</span><h1>${esc(w.title)} Worksheet for Ages 4–5</h1><p>${esc(w.meta)}</p></div>
 <div class="fc2-dual wrap">
  <div class="fc2-main">
   <section class="wc-section" aria-label="This worksheet" id="the-worksheet">
    <div class="wc-head"><span class="eyebrow">THE WORKSHEET</span><h2>The full sheet, exactly as the artist drew it.</h2><p class="lesson-copy">See the whole sheet, download the original file or print it from your browser. Want your child to solve it on screen first? The interactive version lives at <a href="${CH_WS_CLASS}${w.slug}/">${CH_WS_CLASS.slice(1)+w.slug+'/'} /</a> — same sheet, drawing layer included.</p></div>
    <figure class="fc2-hero ws-hero-art"><img src="${esc(file)}" width="${w.w}" height="${w.h}" alt="The full ${esc(w.title)} community-helpers worksheet: ${esc(w.tag)}" fetchpriority="high"></figure>
   </section>
   ${pn}
   <section class="fc2-learn" aria-label="About this worksheet">
    <section class="ws-rail-sec" aria-label="How to use"><span class="eyebrow">HOW TO USE IT</span><h2>The five steps on the sheet.</h2><ol class="fc-steps">${stepsHtml}</ol><p class="fc-hint">Before you start, have the words ready: ${esc(w.know)}</p></section>
    <section class="ws-rail-sec" aria-label="Why it helps"><span class="eyebrow">WHY IT HELPS</span><h2>What this worksheet teaches.</h2><p class="lesson-copy">${esc(w.learn)}</p><p class="lesson-copy">${esc(w.why)}</p><ul class="ws-skills">${w.skills.map(s=>`<li>${esc(s)}</li>`).join('')}</ul></section>
    <section class="ws-rail-sec" aria-label="Parent tips and questions"><span class="eyebrow">FOR GROWN-UPS</span><h2>Tips, questions and practice.</h2><p class="lesson-copy"><strong>Say before you start:</strong> ${esc(w.say)}</p><p class="lesson-copy"><strong>Questions to ask:</strong> ${esc(w.ask)}</p><p class="lesson-copy"><strong>Parent tips:</strong> ${esc(w.tips)}</p><p class="lesson-copy"><strong>Home practice:</strong> ${esc(w.real)}</p></section>
   </section>
  </div>
  <aside class="fc2-rail" aria-label="Download, print, share and family feedback">
   <section class="fc2-block fc2-first-block"><span class="eyebrow">TAKE IT TO THE TABLE</span><h2>Download &amp; print.</h2>
    <div class="fc2-actions"><button type="button" class="button ws-dl" data-chws-download="${esc(file)}" data-chws-filename="${dlName}">Download original sheet <span aria-hidden="true">↓</span></button><button type="button" class="button button-ghost ws-print" data-chws-print>Print this sheet <span aria-hidden="true">⌘</span></button></div>
    <p class="fc-hint">The download keeps the original WebP picture, full size (1545×2000, A4 portrait). Print opens your browser’s print dialog with just the sheet — no sign-up, nothing stored.</p>
   </section>
   ${share}
   ${fcCommunityMount(CH_WS_LIB+w.slug+'/')}
   <section class="fc2-block"><span class="eyebrow">PREFER ON SCREEN?</span><h2>Solve it here.</h2><p class="fc-hint">The on-screen version of this sheet — drawing layer, five steps, save-your-work and all — lives at <a href="${CH_WS_CLASS}${w.slug}/">${CH_WS_CLASS.slice(1)+w.slug+'/'} /</a>.</p></section>
   <section class="fc2-block"><span class="eyebrow">WHERE THIS FITS</span><h2>The class behind it.</h2><p class="lesson-copy">This worksheet belongs to <a href="${CH_CLASS_PATH}">Class 33 — Community Helpers &amp; Our Neighborhood</a> on the Learning Path, and the whole collection lives at <a href="${CH_WS_LIB}">/worksheets/community-helpers-and-our-neighborhood/</a>. One finished sheet is a full session — print it, solve it together, and let the fridge door be the gallery.</p></section>
  </aside>
 </div>
 <section class="wrap fc-section" aria-label="More community helpers worksheets"><span class="eyebrow">MORE COMMUNITY HELPERS SHEETS</span><h2>More sheets like this one.</h2>
  <div class="ws-grid">${communityWs.filter(x=>x.slug!==w.slug).map(x=>`<a class="ws-card" href="${CH_WS_LIB}${x.slug}/"><span class="ws-card-art"><img src="${esc(CH_WS_BASE+x.file)}" width="707" height="1000" alt="${esc(x.meta)}" loading="lazy"></span><span class="ws-card-body"><strong>${esc(x.title)} Worksheet</strong><span class="ws-card-meta"><span>Ages 4–5</span><span>Class 33</span></span><span class="ws-card-desc">${esc(x.tag)}</span></span><span class="ws-card-open">View Worksheet <span aria-hidden="true">→</span></span></a>`).join('')}</div>
 </section>`;
}

/* ---------- the /worksheets/ collection page ---------- */
export function communityWsCategoryBody(){
 const cards=communityWs.map(w=>`<a class="ws-card" href="${CH_WS_LIB}${w.slug}/">
  <span class="ws-card-art"><img src="${esc(CH_WS_BASE+w.file)}" width="707" height="1000" alt="${esc(w.meta)}" loading="lazy"></span>
  <span class="ws-card-body"><strong>${esc(w.title)} Worksheet</strong><span class="ws-card-meta"><span>Ages 4–5</span><span>Class 33</span><span>Community Helpers</span></span><span class="ws-card-desc">${esc(w.tag)}</span></span>
  <span class="ws-card-open">View Worksheet <span aria-hidden="true">→</span></span>
 </a>`).join('');
 return `${crumbNav([['Worksheets','/worksheets/'],['Community Helpers & Our Neighborhood']])}
 <div class="page-heading wrap"><span class="eyebrow">COMMUNITY HELPERS WORKSHEETS · AGES 4–5</span><h1>Community Helpers &amp; Our Neighborhood worksheets — free printables for little hands.</h1><p>Thirty-five genuine activity sheets about the people who help us: trace their names, match their tools, circle the right things, count, and draw. Download the original sheet, print it, or solve every sheet on screen in <a href="${CH_CLASS_PATH}">Class 33</a> first.</p></div>
 <section class="wrap section compact" aria-label="All community helpers worksheets">
  <div class="ws-grid">${cards}</div>
 </section>
 <section class="wrap lesson-section"><span class="eyebrow">KEEP EXPLORING</span><h2>Where these come from.</h2>
  <div class="fc-stages">
   <a class="fc-stage lesson-card-link" href="${CH_CLASS_PATH}"><div class="fc-stage-pills"><span class="fc-age">Ages 4–5</span><span class="fc-class">Class 33</span></div><h3>Community Helpers &amp; Our Neighborhood</h3><p>The class behind these worksheets — 29 step-by-step helper lessons and every sheet solvable on screen with the drawing layer.</p><span class="fc-open">Open Class 33 <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="/flashcards/community-helpers-and-our-neighborhood/"><div class="fc-stage-pills"><span class="fc-age">Ages 4–5</span><span class="fc-class">Library</span></div><h3>The Community Helpers Flashcards</h3><p>The matching card collection — what each helper does, why it helps a preschooler, and a printable card for the fridge.</p><span class="fc-open">Open the flashcards <span aria-hidden="true">↗</span></span></a>
   <a class="fc-stage lesson-card-link" href="/worksheets/"><div class="fc-stage-pills"><span class="fc-age">All ages</span><span class="fc-class">Library</span></div><h3>The Worksheet Library</h3><p>All the school’s printable subjects, each with its own page, download and print buttons.</p><span class="fc-open">Browse all worksheets <span aria-hidden="true">↗</span></span></a>
  </div>
 </section>`;
}

/* ---------- schema ---------- */
export function communityWsSchema(site,w){
 return {'@context':'https://schema.org','@type':'LearningResource',
  name:`${w.title} Worksheet for Ages 4–5`,
  description:w.meta,url:site+CH_WS_LIB+w.slug+'/',inLanguage:'en',
  learningResourceType:'Worksheet',educationalLevel:'Preschool',teaches:w.skills.join(', '),
  isAccessibleForFree:true,ageRange:'4-5',encodingFormat:'image/webp',contentUrl:CH_WS_BASE+w.file,image:CH_WS_BASE+w.file,
  about:{'@type':'Thing',name:'Community Helpers & Our Neighborhood'},
  provider:{'@type':'Organization',name:'Kiddo.school',url:site+'/'},
  isPartOf:{'@type':'CreativeWorkSeries',name:'Community Helpers & Our Neighborhood (Class 33)',url:site+CH_CLASS_PATH}};
}
