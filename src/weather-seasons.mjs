// Kiddo School — Class 34 · Weather, Seasons & What We Wear: the Learning Path
// class page. A compact classroom HUB (owner law): intro, how-the-class-works,
// a compact nav to the 29 individual /learn/ teaching lessons, and ONE small
// supporting-resource section linking the flashcard collection. NO flashcard
// gallery, NO full teaching guides on this page, NO canvas — and NO worksheets
// section: genuine Class 34 worksheet artwork has not been supplied yet, so
// nothing is invented (the same conditional pattern Class 33 used before its
// real worksheets arrived).
import {lesson as wsLesson} from './flashcards/data-weather-seasons.mjs';
import {lpContent as wsLp} from './flashcards/lp-weather-seasons.mjs';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export const WS34_CLASS_PATH='/preschool/4-years/weather-seasons-and-what-we-wear/';
export const WS34_READY=29;
export const WS34_TOTAL=29;

export function weatherSeasonsClassBody(){
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const base=wsLesson.r2Base;
 const cards=wsLesson.cards.map(c=>({...c,slug:c.file.replace(/\.webp$/,''),img:base+c.file}));
 // Owner doctrine: the class listing shows every flashcard as a PICTURE —
 // each picture opens its own /learn/ page. No per-image description here;
 // the words live on the individual lesson pages.
 const learnRows=cards.map((c)=>{
  const l=wsLp[c.slug];
  return `<a class="lp-tile" href="${WS34_CLASS_PATH}learn/${c.slug}/"><img src="${c.img}" width="${c.w}" height="${c.h}" alt="${esc(c.alt)}" loading="lazy"><strong>${esc(l.title)}</strong></a>`;
 }).join('');
 return `<section class="wrap lesson-section"><div class="page-heading"><span class="eyebrow">CLASS 34 · AGES 4–5 · 29 WEATHER LESSONS</span><h1>Weather, Seasons &amp; What We Wear.</h1></div></section>
 <section class="wrap lesson-section"><span class="eyebrow">HOW THIS CLASS WORKS</span><h2>Read the sky, then dress for it.</h2><p class="lesson-copy">Every topic in this class has its own step-by-step lesson: look at the picture together, learn what the weather or the garment really is, say the parent script, ask the questions, play the practice game and finish with a small understanding check. The order is gentle: the sun and clouds first, then the weather words, then the day-kinds — sunny, rainy, stormy, snowy, foggy — then the temperatures, the four seasons, and finally the clothes that match every kind of sky.</p><p class="lesson-copy">The best part of this class is that the weather marks your homework. After the sunny-day lesson, a sunny day arrives for free practice; after the raincoat lesson, so does the rain. One topic a day is plenty — the whole class is a month of five-minute sessions, wherever your child’s curiosity points.</p></section>
 <section class="wrap lesson-section"><span class="eyebrow">WEATHER SAFETY, AGE-HONEST</span><h2>Small people, real weather.</h2><p class="lesson-copy">Weather safety is built into the lessons where it belongs: never staring at the sun, hats and water in the heat, staying inside for storms, penguin steps on ice, bright colours in fog, scarf ends tucked in for climbing. Every rule is phrased for four-year-old bodies and honest about feelings — no scare tactics, no fake promises, just routines that hold.</p></section>
 <section class="wrap fc-section" id="learn"><span class="eyebrow">LEARN WITH FLASHCARDS</span><h2>${esc('Learn the weather, the seasons and what we wear.')}</h2><p class="fc-hint">Twenty-nine topics, one picture each. Tap any picture and it opens its own lesson page — the original artwork with a drawing canvas on the left, and what the weather or the garment is, taught step by step, on the right.</p><div class="lp-tiles">${learnRows}</div></section>
 <section class="wrap fc-section fc-res"><div class="fc-res-copy"><span class="eyebrow">SUPPORTING RESOURCE</span><h2>Explore the flashcards.</h2><p class="fc-hint">Every lesson has a matching flashcard: the original artwork as a printable card with the words to say together, a try-at-home idea and a download button. The cards live in their own library — this class page keeps teaching.</p><div class="fc2-actions"><a class="button" href="/flashcards/weather-seasons-and-what-we-wear/">Open the Weather, Seasons &amp; What We Wear flashcards <span aria-hidden="true">↗</span></a></div></div><div class="fc-res-art"><img src="${base}cover.webp" width="1414" height="2000" alt="Cover of the Weather, Seasons & What We Wear flashcards set: the original Canva collection cover." loading="lazy"></div></section>
 <p class="lesson-note"><strong>Worksheets are on the way, not yet here.</strong> This class ships lessons and flashcards only — no worksheet pages will be invented until the genuine artwork arrives. <strong>Age ranges are a guide, not a test.</strong> Follow your child’s curiosity across the sky — every lesson stands on its own.</p>`;
}
