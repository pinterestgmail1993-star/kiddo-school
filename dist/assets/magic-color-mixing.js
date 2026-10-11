/* Kiddo School — Magic Color Mixing (Age 3): pick two paint splashes, mix
   them in the pot, reveal the result with a friendly explanation. Pure
   CSS/SVG — no image assets. Progressive enhancement only: without
   JavaScript the recipes chart above the pot carries the whole lesson.
   No scores, no timers, nothing stored, no network. The color names are
   also spoken with the device's screen voice (speechSynthesis) when it is
   available; the written words are always visible either way. */
(() => {
  const game = document.querySelector('[data-mg-game="color-mixing"]');
  if (!game) return;
  const $ = (sel, el) => (el || game).querySelector(sel);
  const $$ = (sel, el) => [...(el || game).querySelectorAll(sel)];
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const originalHTML = game.innerHTML;
  const live = $('[data-mg-live]');

  const WORD = { red: 'Red', yellow: 'Yellow', blue: 'Blue' };
  const RECIPES = {
    'red|yellow': { result: 'orange', hex: '#f07f28', say: 'Red and yellow make ORANGE — like the fruit with the very same name!' },
    'blue|yellow': { result: 'green', hex: '#4d9e3f', say: 'Blue and yellow make GREEN — the color of leaves and grass!' },
    'red|blue': { result: 'purple', hex: '#8f4fc0', say: 'Red and blue make PURPLE — like a bunch of grapes!' }
  };
  const key = (a, b) => [a, b].sort().join('|');

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
    try {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.85;
      u.pitch = 1.15;
      window.speechSynthesis.speak(u);
    } catch (e) { /* written words carry it */ }
  }

  /* ---------- the mixing pot ---------- */
  let picked = [];
  function refresh() {
    $$('[data-mg-color]').forEach(btn => {
      const on = picked.includes(btn.getAttribute('data-mg-color'));
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    const mixBtn = $('[data-mg-mix]');
    if (mixBtn) mixBtn.disabled = picked.length !== 2;
  }
  function wireLab() {
    const pot = $('[data-mg-pot]');
    const blob = $('[data-mg-result]');
    const nameEl = $('[data-mg-result-name]');
    const sayEl = $('[data-mg-result-say]');
    if (!pot || !blob || !nameEl) return;
    $$('[data-mg-color]').forEach(btn => btn.addEventListener('click', () => {
      const c = btn.getAttribute('data-mg-color');
      if (picked.includes(c)) {
        picked = picked.filter(x => x !== c);
        sayEl.textContent = 'Pick two splashes to begin.';
        refresh();
        return;
      }
      if (picked.length === 2) picked.shift();
      picked.push(c);
      talk(WORD[c] + '!');
      if (picked.length === 1) {
        nameEl.textContent = WORD[c] + ' is in the pot…';
        sayEl.textContent = 'Now pick a second color.';
      } else {
        nameEl.textContent = WORD[picked[0]] + ' and ' + WORD[picked[1]] + ' are in the pot!';
        sayEl.textContent = 'Press Mix It! and watch.';
      }
      refresh();
    }));
    const mixBtn = $('[data-mg-mix]');
    mixBtn.addEventListener('click', () => {
      if (picked.length !== 2) return;
      const recipe = RECIPES[key(picked[0], picked[1])];
      pot.classList.add('mg-mixing');
      blob.classList.add('is-waiting');
      nameEl.textContent = 'Mixing' + (reduce ? '…' : '') + '';
      sayEl.textContent = 'Round and round it goes…';
      mixBtn.disabled = true;
      const reveal = () => {
        pot.classList.remove('mg-mixing');
        blob.setAttribute('fill', recipe.hex);
        blob.classList.remove('is-waiting');
        nameEl.textContent = recipe.result.charAt(0).toUpperCase() + recipe.result.slice(1) + '!';
        sayEl.textContent = recipe.say;
        talk(WORD[picked[0]] + ' and ' + WORD[picked[1]] + ' make ' + recipe.result + '! ' + recipe.say);
        mixBtn.disabled = false;
        mixBtn.focus({ preventScroll: true });
      };
      if (reduce) reveal();
      else setTimeout(reveal, 1300);
    });
    const again = $('[data-mg-again]');
    again.addEventListener('click', () => {
      picked = [];
      blob.classList.add('is-waiting');
      blob.setAttribute('fill', 'rgba(52,59,48,.25)');
      nameEl.textContent = 'The pot is waiting…';
      sayEl.textContent = 'Pick two splashes to begin.';
      if (live) live.textContent = '';
      refresh();
    });
    refresh();
  }

  /* ---------- boot / replay ---------- */
  function wire() {
    screens = $$('[data-mg-screen]');
    wireGo();
    wireLab();
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
