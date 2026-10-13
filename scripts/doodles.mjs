// Animated doodle characters — build-time injection. The 1080×1080 R2 PNGs
// (≈1 MB each) are downscaled at build to 192×192 WebP in /assets/ (they render
// at max 96px, so 192px covers 2× screens) — same artwork, ~1% of the bytes,
// same-origin and immutable-cached.
// Each doodle is a small in-flow image (never absolutely positioned, so it
// can never cover text, buttons or activities), aria-hidden, lazy-loaded.
// CSS animations in style.css run only when doodles.js adds .doodle-live on
// scroll into view; body.calm-mode (parent-controlled, localStorage) and
// prefers-reduced-motion both stop all movement.
import {lessons} from '../src/lessons.mjs';
import {alphabetLesson} from '../src/flashcards/data-alphabet.mjs';
import {numbersLesson} from '../src/flashcards/data-numbers.mjs';
import {shapesLesson} from '../src/flashcards/data-shapes.mjs';
import {colorsLesson} from '../src/flashcards/data-colors.mjs';
import {oppositesLesson} from '../src/flashcards/data-opposites.mjs';
import {animalsLesson} from '../src/flashcards/data-animals.mjs';
import {bodyPartsLesson} from '../src/flashcards/data-body-parts.mjs';
import {fruitsLesson} from '../src/flashcards/data-fruits-vegetables.mjs';
import {helloSchool} from '../src/circle-time.mjs';
const doodle=(file,kind)=>`<img class="doodle doodle-${kind}" src="/assets/doodle-${kind}-192.webp" width="192" height="192" alt="" aria-hidden="true" loading="lazy" data-doodle="${kind}">`;
const DOODLES={
 pencil:doodle('doodle-pencil-192.webp','pencil'),
 star:doodle('doodle-star-192.webp','star'),
 book:doodle('doodle-book-192.webp','book'),
 butterfly:doodle('doodle-butterfly-192.webp','butterfly'),
 rainbow:doodle('doodle-rainbow-192.webp','rainbow'),
 moon:doodle('doodle-moon-192.webp','moon')
};
const pencilSet=new Set([
 ...lessons.map(L=>L.path),
 alphabetLesson.path,numbersLesson.path,shapesLesson.path,colorsLesson.path,
 oppositesLesson.path,animalsLesson.path,bodyPartsLesson.path,fruitsLesson.path,
 helloSchool.path
]);
/* Page decorations injected after the breadcrumbs (a small greeting at the
   very start of the page, in normal flow) or inside a named section:
   - Happy Pencil waves at the start of every class page
   - Smiling Star bounces in the Class Complete section of every class page
   - Friendly Book wiggles in the Learning Library
   - Playful Butterfly flutters in the Nature Club pages
   - Little Rainbow floats on the school homepage's final CTA
   - Sleepy Moon sways in the baby learning area                       */
export function applyDoodles(path,html){
 if(pencilSet.has(path)){
  html=html.replace(/(<\/nav>)/,(m)=>m+DOODLES.pencil);
  html=html.replace('CLASS COMPLETE</span>',`CLASS COMPLETE</span>${DOODLES.star}`);
  html=html.replace('<div class="ct-complete"><p class="ct-stamp">Circle Time Complete</p>',`<div class="ct-complete"><p class="ct-stamp">Circle Time Complete</p>${DOODLES.star}`);
 }
 if(path==='/learning-library/')html=html.replace(/(<\/nav>)/,(m)=>m+DOODLES.book);
 if(path==='/nature/'||path.startsWith('/nature/'))html=html.replace(/(<\/nav>)/,(m)=>m+DOODLES.butterfly);
 if(path==='/baby/'||path==='/newborn/'||path.startsWith('/baby/')||path.startsWith('/newborn/'))html=html.replace(/(<\/nav>)/,(m)=>m+DOODLES.moon);
 if(path==='/')html=html.replace('START WHERE YOU ARE</span>',`START WHERE YOU ARE</span>${DOODLES.rainbow}`);
 return html;
}
