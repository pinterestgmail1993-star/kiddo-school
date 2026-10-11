// Kiddo School — the shared image-activity builder for the Learning Path
// adventures (Classes 25–31).
//
// The owner's spec, followed exactly:
//  · LEFT: the original Canva illustration, whole (never cropped or
//    stretched), with the proven transparent Write & Color drawing layer
//    laid directly over it — the canvas backing store is the artwork's own
//    pixel size (data-wc-w × data-wc-h) and pointer coordinates are scaled
//    by the on-screen box, so strokes land under the pen at every screen
//    size, portrait or landscape.
//  · RIGHT: plain TEXT instructions (what to do, one gentle hint) and the
//    drawing tools. No sound, no coded scenes, no scoring, no fake games.
//  · Completion: a child's work counts only when it is really saved
//    (the write-color engine's 'kiddo-wc-save' event). Opening never does.
//
// The drawing layer itself lives in /assets/write-color.js, already loaded
// on every page; it renders pencil, nine crayons, eraser, undo, redo, clear
// and "Save my work" into the #ia-tools rail and the canvas over the image.
// This module only renders the markup it mounts on.
import {esc} from './adventure-kit.mjs';

export function imageActivitySection(a){
 return `<section class="wrap lesson-section" id="play" aria-label="Draw on ${esc(a.title)}">
  <span class="eyebrow">PLAY · ${esc(a.skill).toUpperCase()}</span>
  <h2>${esc(a.title)}</h2>
  <p class="lesson-copy">${esc(a.say)}</p>
  <div class="fc2-dual ia-dual">
   <div class="fc2-main">
    <section class="wc-section" aria-label="The adventure picture — draw right on it">
     <div class="wc-mount" data-ia-activity data-ia-band="${esc(a.band)}" data-ia-slug="${esc(a.slug)}" data-wc data-wc-src="${esc(a.imgUrl)}" data-wc-name="${esc(a.title)} adventure sheet" data-wc-w="${a.w}" data-wc-h="${a.h}" data-wc-toolbar="#ia-tools">
      <figure class="fc2-hero ws-hero-art ia-sheet" style="--iar:${(a.w/a.h).toFixed(4)}"><img src="${esc(a.imgUrl)}" width="${a.w}" height="${a.h}" alt="${esc(a.alt)}" fetchpriority="high" crossorigin="anonymous"></figure>
     </div>
     <noscript><p class="sa-noscript">Drawing on the picture needs JavaScript. Everything else on this page works without it — and the <a href="${esc(a.wsPath)}">matching worksheet</a> brings this adventure to paper.</p></noscript>
    </section>
   </div>
   <aside class="fc2-rail" aria-label="Instructions, drawing tools and saved progress">
    <section class="fc2-block fc2-first-block"><span class="eyebrow">HOW TO DO IT</span><h2>Read, then draw.</h2><p class="lesson-copy ia-instruction">${esc(a.say)}</p>${a.hint?`<p class="fc-hint">${esc(a.hint)}</p>`:''}</section>
    <section class="fc2-block" id="ia-tools" aria-label="Drawing tools"><span class="eyebrow">YOUR PENCIL CASE</span><h2>Pick your tools.</h2><p class="fc-hint">Pencil, nine crayons, an eraser, undo, redo and clear appear right here and work straight on the picture. Save keeps your finished work as a picture.</p></section>
    <section class="fc2-block"><span class="eyebrow">MY PROGRESS</span><h2>Save it to keep it.</h2><p class="ls-progress-line" data-ia-progress aria-live="polite">This adventure is cleared for you the moment you save your finished picture. Nothing counts until then — opening the page is just opening the door.</p><p class="ls-progress-done" data-ia-done hidden><strong>Cleared!</strong> ${esc(a.doneTitle?a.doneTitle+' ':'')}Your saved work is in your downloads, and the ribbon is on in the library.</p></section>
    <section class="fc2-block"><span class="eyebrow">PREFER PAPER?</span><h2>Print the twin.</h2><p class="fc-hint">The same picture lives in the worksheet library with its own print buttons: <a href="${esc(a.wsPath)}">${esc(a.wsPath)}</a>. Crayons beat styluses sometimes.</p></section>
   </aside>
  </div>
 </section>`;
}
