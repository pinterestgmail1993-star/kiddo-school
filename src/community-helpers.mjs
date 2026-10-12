// Kiddo School — Class 33 · Community Helpers & Our Neighborhood: the Learning
// Path class page. A compact classroom HUB (owner law): intro, how-the-class-
// works, a compact nav to the 29 individual /learn/ teaching lessons, and ONE
// small supporting-resource section linking the flashcard collection. NO
// flashcard gallery, NO full teaching guides on this page, NO canvas, and the
// worksheets section renders only when genuine worksheet artwork is supplied
// (wsContents !== null — until then it is simply absent).
import {lesson as chLesson,meta as chMeta} from './flashcards/data-community-helpers.mjs';
import {lpContent as chLp} from './flashcards/lp-community-helpers.mjs';
import {communityWs,CH_WS_CLASS,CH_WS_LIB,CH_WS_BASE} from './community-ws.mjs';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export const CH_CLASS_PATH='/preschool/4-years/community-helpers-and-our-neighborhood/';
export const CH_READY=29;
export const CH_TOTAL=29;
export const CH_WS_READY=communityWs.length;

// Set to the real worksheet grid the day the genuine Canva worksheet artwork
// is verified on R2 (35 sheets, all audited) — Section 3 and the worksheets
// resource link render then. It is non-null now: the 35 genuine sheets are
// verified live (HTTP 200 image/webp, 1545×2000, image-by-image audit).
export const chWsContents=communityWs.length?`<div class="sa-grid">${communityWs.map((w,i)=>`<a class="sa-card sa-card-imgonly" href="${CH_WS_CLASS}${w.slug}/" data-chws-card="${w.slug}">
   <span class="sa-card-num" aria-hidden="true">${i+1}</span>
   <span class="sa-card-done" data-chws-done hidden>Cleared!</span>
   <img src="${CH_WS_BASE}${w.file}" width="707" height="1000" alt="Community Helpers worksheet ${i+1}: ${esc(w.title)} — ${esc(w.tag)}" loading="lazy">
   <span class="sa-card-body"><strong>${esc(w.title)}</strong></span>
  </a>`).join('')}</div>
  <p class="lesson-note">All ${communityWs.length} genuine worksheets are ready now, each with its own on-screen activity above and its printable twin in the <a href="${CH_WS_LIB}">Community Helpers worksheet library</a>.</p>`:null;

export function communityHelpersClassBody(){
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const base=chLesson.r2Base;
 const cards=chLesson.cards.map(c=>({...c,slug:c.file.replace(/\.webp$/,''),img:base+c.file}));
 // Owner doctrine: the class listing shows every flashcard as a PICTURE —
 // each picture opens its own /learn/ page. No per-image description here;
 // the words live on the individual lesson pages.
 const learnRows=cards.map((c)=>{
  const l=chLp[c.slug];
  return `<a class="lp-tile" href="${CH_CLASS_PATH}learn/${c.slug}/"><img src="${c.img}" style="--iar:${c.w}/${c.h}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(l.title)}</strong></a>`;
 }).join('');
 const wsSection=chWsContents?`<section class="wrap lesson-section" id="worksheets"><span class="eyebrow">PRACTISE WITH WORKSHEETS</span><h2>Solve the Community Helpers worksheets.</h2><p class="lesson-copy">Thirty-five genuine activity sheets, one per helper — trace the helper’s name, match their tools, circle the right things, count, and draw. Every card below opens its own activity page: the sheet sits on the left and your child traces, circles and draws straight on top of it, with the instructions beside them and the tools under their fingers. Each sheet has a printable twin in the worksheet library.</p>${chWsContents}</section>`:'';
 const wsResource=chWsContents?`<a class="button" href="/worksheets/community-helpers-and-our-neighborhood/">Community Helpers worksheets <span aria-hidden="true">↗</span></a>`:'';
 return `<section class="wrap lesson-section"><div class="page-heading"><span class="eyebrow">CLASS 33 · AGES 4–5 · 29 HELPER LESSONS</span><h1>Community Helpers &amp; Our Neighborhood.</h1></div></section>
 <section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>Meet the people who keep our neighborhood running.</h2><p class="lesson-copy">Every helper in this class has its own step-by-step lesson: look at the picture together, learn what the job really is, say the parent script, ask the questions, play the practice game and finish with a small understanding check. One helper a day is plenty — the whole class is a month of five-minute sessions, in whatever order your child’s curiosity points.</p><p class="lesson-copy">Start with the helpers your child already meets — doctor, bus driver, teacher — then follow the given order for the full journey: health helpers, safety helpers, learning helpers, food and growing helpers, and the people who build and fix everything else.</p></section>
 <section class="wrap fc-section" id="learn"><span class="eyebrow">LEARN WITH FLASHCARDS</span><h2>${esc('Learn about our community helpers.')}</h2><p class="fc-hint">Twenty-nine helpers, one picture each. Tap any picture and it opens its own lesson page — the original artwork with a drawing canvas on the left, and what the helper does, taught step by step, on the right.</p><div class="lp-tiles">${learnRows}</div></section>
 ${wsSection}
 <section class="wrap fc-section fc-res"><div class="fc-res-copy"><span class="eyebrow">SUPPORTING RESOURCE</span><h2>Explore the flashcards.</h2><p class="fc-hint">Every lesson has a matching flashcard: the original artwork as a printable card with the words to say together, a try-at-home idea and a download button. The cards live in their own library — this class page keeps teaching.</p><div class="fc2-actions"><a class="button" href="/flashcards/community-helpers-and-our-neighborhood/">Open the Community Helpers flashcards <span aria-hidden="true">↗</span></a>${wsResource}</div></div><div class="fc-res-art"><img src="${base}cover.webp" width="1414" height="2000" alt="Cover of the Community Helpers & Our Neighborhood flashcards set: the original Canva collection cover." loading="lazy"></div></section>
 <p class="lesson-note"><strong>Age ranges are a guide, not a test.</strong> Follow your child’s curiosity across the helpers — every lesson stands on its own.</p>`;
}
