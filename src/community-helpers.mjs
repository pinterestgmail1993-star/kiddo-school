// Kiddo School — Class 33 · Community Helpers & Our Neighborhood: the Learning
// Path class page. A compact classroom HUB (owner law): intro, how-the-class-
// works, a compact nav to the 29 individual /learn/ teaching lessons, and ONE
// small supporting-resource section linking the flashcard collection. NO
// flashcard gallery, NO full teaching guides on this page, NO canvas, and the
// worksheets section renders only when genuine worksheet artwork is supplied
// (wsContents !== null — until then it is simply absent).
import {lesson as chLesson,meta as chMeta} from './flashcards/data-community-helpers.mjs';
import {lpContent as chLp} from './flashcards/lp-community-helpers.mjs';

export const CH_CLASS_PATH='/preschool/4-years/community-helpers-and-our-neighborhood/';
export const CH_READY=29;
export const CH_TOTAL=29;

// Set to a non-empty array of worksheet bodies when genuine Canva worksheet
// artwork arrives — Section 3 and the worksheets resource link appear then.
export const chWsContents=null;

export function communityHelpersClassBody(){
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const base=chLesson.r2Base;
 const cards=chLesson.cards.map(c=>({...c,slug:c.file.replace(/\.webp$/,''),img:base+c.file}));
 const learnRows=cards.map((c,i)=>{
  const l=chLp[c.slug];
  return `<a class="fc2-relcard fcl-nav" href="${CH_CLASS_PATH}learn/${c.slug}/"><strong>${String(i+1).padStart(2,'0')} · ${esc(l.title)}</strong><span>${esc(l.one)}</span><span class="fc-open">Start the lesson <span aria-hidden="true">↗</span></span></a>`;
 }).join('');
 const wsSection=chWsContents?`<section class="wrap fc-section" id="worksheets"><span class="eyebrow">WORKSHEETS</span><h2>Let’s solve the Community Helpers worksheets.</h2><p class="fc-hint">Genuine printable worksheets with drawing-canvas activities on their own pages.</p>${chWsContents}</section>`:'';
 const wsResource=chWsContents?`<a class="button" href="/worksheets/community-helpers-and-our-neighborhood/">Community Helpers worksheets <span aria-hidden="true">↗</span></a>`:'';
 return `<section class="wrap lesson-section"><div class="page-heading"><span class="eyebrow">CLASS 33 · AGES 4–5 · 29 HELPER LESSONS</span><h1>Community Helpers &amp; Our Neighborhood.</h1></div></section>
 <section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>Meet the people who keep our neighborhood running.</h2><p class="lesson-copy">Every helper in this class has its own step-by-step lesson: look at the picture together, learn what the job really is, say the parent script, ask the questions, play the practice game and finish with a small understanding check. One helper a day is plenty — the whole class is a month of five-minute sessions, in whatever order your child’s curiosity points.</p><p class="lesson-copy">Start with the helpers your child already meets — doctor, bus driver, teacher — then follow the given order for the full journey: health helpers, safety helpers, learning helpers, food and growing helpers, and the people who build and fix everything else.</p></section>
 <section class="wrap fc-section" id="learn"><span class="eyebrow">LEARNING PATH LESSONS</span><h2>${esc('Learn about our community helpers.')}</h2><p class="fc-hint">Twenty-nine individual flashcard teaching lessons — each opens on its own page with the original artwork and the full step-by-step guidance.</p><div class="fc2-relrow">${learnRows}</div></section>
 ${wsSection}
 <section class="wrap fc-section fc-res"><div class="fc-res-copy"><span class="eyebrow">SUPPORTING RESOURCE</span><h2>Explore the flashcards.</h2><p class="fc-hint">Every lesson has a matching flashcard: the original artwork as a printable card with the words to say together, a try-at-home idea and a download button. The cards live in their own library — this class page keeps teaching.</p><div class="fc2-actions"><a class="button" href="/flashcards/community-helpers-and-our-neighborhood/">Open the Community Helpers flashcards <span aria-hidden="true">↗</span></a>${wsResource}</div></div><div class="fc-res-art"><img src="${base}cover.webp" width="1414" height="2000" alt="Cover of the Community Helpers & Our Neighborhood flashcards set: the original Canva collection cover." loading="lazy"></div></section>
 <p class="lesson-note"><strong>Age ranges are a guide, not a test.</strong> Follow your child’s curiosity across the helpers — every lesson stands on its own.</p>`;
}
