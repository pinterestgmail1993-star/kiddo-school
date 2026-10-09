/* Kiddo School — Magic Opposites Adventure (Age 3): screen flow plus the
   four transformation stations. Ball: grows/shrinks. Pencil: long/short.
   Glass: fills/empties (the outline is part of the image and always stays
   visible; the water sits behind it). Door: swings open/closed around its
   hinge, revealing a warm room. The tree, soup and challenge rounds are
   static tap choices that run on the shared find-it engine in site.js —
   they work even without this script. Every change speaks its word and
   shows it written. Progressive enhancement only: without JavaScript every
   station renders as its resting state with the word pair written out.
   No scores, no timers, nothing stored. Animations respect body.calm-mode
   and prefers-reduced-motion via the shared CSS gates in style.css. */
(() => {
  const game = document.querySelector('[data-mg-game="opposites-adventure"]');
  if (!game) return;
  const $ = (sel, el) => (el || game).querySelector(sel);
  const $$ = (sel, el) => [...(el || game).querySelectorAll(sel)];
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const originalHTML = game.innerHTML;
  const live = $('[data-mg-live]');

  /* ---------- shared screen engine ---------- */
  let screens = [];
  function show(id, scroll) {
    screens.forEach(s => { s.hidden = s.getAttribute('data-mg-screen') !== id; });
    const target = screens.find(s => s.getAttribute('data-mg-screen') === id);
    if (target && scroll !== false) target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }
  function wireGo() {
    $$('[data-mg-go]').forEach(btn => btn.addEventListener('click', () => show(btn.getAttribute('data-mg-go'))));
  }
  function talk(text) {
    if (live) live.textContent = text;
    if (document.body.classList.contains('lwy-quiet')) return; // Learning Your Way: prefer quiet
    try {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.85; u.pitch = 1.15;
      window.speechSynthesis.speak(u);
    } catch (e) { /* written words carry it */ }
  }

  /* ---------- transformation stations ---------- */
  const STATES = {
    ball:   { big:   'A BIG ball!',        small: 'A small ball.',        mid: 'A ball, waiting to grow.' },
    pencil: { long:  'A LONG pencil!',     short: 'A short pencil.',      mid: 'A pencil, ready to stretch.' },
    glass:  { full:  'The glass is FULL!', empty: 'The glass is empty!',  mid: 'An empty glass, ready to fill.' },
    door:   { open:  'The door is OPEN!',  closed:'The door is closed!',  mid: 'A closed door. Knock knock!' }
  };
  function wireStation(section) {
    const kind = section.getAttribute('data-oa-toggle');
    const scene = section.querySelector('.oa-scene');
    const word = section.querySelector('[data-oa-word]');
    if (!scene || !word) return;
    const lines = STATES[kind];
    const say = (state) => {
      word.textContent = lines[state];
      talk(lines[state]);
      if (!reduce) {
        scene.classList.remove('is-changing');
        void scene.offsetWidth;
        scene.classList.add('is-changing');
        setTimeout(() => scene.classList.remove('is-changing'), 500);
      }
    };
    $$('[data-oa-set]', section).forEach(btn => btn.addEventListener('click', () => {
      const state = btn.getAttribute('data-oa-set');
      ['is-big','is-small','is-long','is-short','is-full','is-empty','is-open','is-closed','is-mid'].forEach(c => scene.classList.remove(c));
      scene.classList.add('is-' + state);
      say(state);
    }));
  }

  /* ---------- boot / replay ---------- */
  function wire() {
    screens = $$('[data-mg-screen]');
    wireGo();
    $$('[data-oa-toggle]').forEach(wireStation);
  }
  wire();
  show('welcome', false);
  game.addEventListener('click', e => {
    if (e.target.closest('[data-mg-replay]')) {
      game.innerHTML = originalHTML;
      wire();
      show('welcome', false);
      if (live) live.textContent = '';
    }
  });
})();
