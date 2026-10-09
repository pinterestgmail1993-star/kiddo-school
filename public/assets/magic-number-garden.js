/* Kiddo School — Magic Number Garden (Age 3): screen flow plus the four
   playable counting activities. Count rounds: tapping an item marks it with
   the running number, speaks it, and finishes with "You counted N!". Plant
   rounds: each press plants one flower in the next empty spot until the
   asked number is reached. Find rounds run on the shared find-it engine
   (site.js). Water rounds: each press blooms one flower, counted aloud.
   All numbers are spoken with the device's screen voice AND displayed as
   digits — the text alternative is always visible. Progressive enhancement
   only: without JavaScript every round renders as a count-together chart.
   No scores, no timers, nothing stored. Animations respect body.calm-mode
   and prefers-reduced-motion via the shared CSS gates in style.css. */
(() => {
  const game = document.querySelector('[data-mg-game="number-garden"]');
  if (!game) return;
  const $ = (sel, el) => (el || game).querySelector(sel);
  const $$ = (sel, el) => [...(el || game).querySelectorAll(sel)];
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const originalHTML = game.innerHTML;
  const live = $('[data-mg-live]');
  const NUMWORD = {1:'one',2:'two',3:'three',4:'four',5:'five',6:'six',7:'seven',8:'eight',9:'nine',10:'ten'};

  /* ---------- shared screen engine ---------- */
  let screens = [];
  const ORDER = ['welcome','count','plant','find','water','offscreen','complete'];
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
    } catch (e) { /* the written numbers carry it */ }
  }

  /* ---------- Count the Garden: tap each item, number shows ---------- */
  function wireCount() {
    $$('[data-ng-count]').forEach(round => {
      const n = +round.getAttribute('data-ng-count');
      const msg = round.querySelector('[data-ng-countmsg]');
      const items = $$('[data-ng-tap]', round);
      let done = 0;
      items.forEach(btn => btn.addEventListener('click', () => {
        if (btn.classList.contains('is-counted')) return;
        done += 1;
        btn.classList.add('is-counted');
        btn.querySelector('.ng-badge').textContent = done;
        if (!reduce) { void btn.offsetWidth; btn.classList.add('is-pop'); }
        const word = NUMWORD[done] || done;
        if (msg) msg.textContent = done === n ? 'You counted all ' + n + '! ' + n + ' — ' + word + '!' : done + '… ' + word;
        talk(done === n ? 'You counted ' + word + ' ' + (NUMWORD[n] || n) + ' things! Great counting!' : word);
      }));
    });
  }

  /* ---------- Plant Flowers: one press = one flower ---------- */
  function wirePlant() {
    $$('[data-ng-plant]').forEach(round => {
      const n = +round.getAttribute('data-ng-plant');
      const msg = round.querySelector('[data-ng-plantmsg]');
      const btn = round.querySelector('[data-ng-plantbtn]');
      const plantedBox = round.querySelector('[data-ng-planted]');
      const spotsEls = $$('[data-ng-spot]', round);
      if (!btn || !plantedBox) return;
      let planted = 0;
      btn.addEventListener('click', () => {
        if (planted >= n) return;
        const spot = spotsEls[planted];
        const flower = document.createElement('img');
        flower.src = game.dataset.flowerSrc;
        flower.alt = '';
        flower.className = 'ng-bloom';
        flower.setAttribute('aria-hidden', 'true');
        flower.style.left = spot.style.left;
        flower.style.top = spot.style.top;
        plantedBox.appendChild(flower);
        spot.classList.add('is-used');
        planted += 1;
        const word = NUMWORD[planted] || planted;
        if (msg) msg.textContent = planted === n ? 'You planted ' + n + ' flowers — the garden is happy!' : planted + ' of ' + n + ' planted — ' + word;
        talk(planted === n ? 'You planted ' + (NUMWORD[n] || n) + ' flowers! Beautiful!' : word + ' flower' + (planted === 1 ? '' : 's'));
        if (planted === n) { btn.disabled = true; btn.classList.add('is-done'); }
      });
    });
  }

  /* ---------- Water the Garden: one press = one bloom ---------- */
  function wireWater() {
    $$('[data-ng-water]').forEach(round => {
      const n = +round.getAttribute('data-ng-water');
      const msg = round.querySelector('[data-ng-watermsg]');
      const btn = round.querySelector('[data-ng-waterbtn]');
      const bloomBox = round.querySelector('[data-ng-wbloom]');
      const spotsEls = $$('[data-ng-wspot]', round);
      if (!btn || !bloomBox) return;
      let watered = 0;
      btn.addEventListener('click', () => {
        if (watered >= n) return;
        const spot = spotsEls[watered];
        const flower = document.createElement('img');
        flower.src = game.dataset.flowerSrc;
        flower.alt = '';
        flower.className = 'ng-bloom';
        flower.setAttribute('aria-hidden', 'true');
        flower.style.left = spot.style.left;
        flower.style.top = spot.style.top;
        bloomBox.appendChild(flower);
        spot.classList.add('is-used');
        watered += 1;
        if (!reduce) {
          btn.classList.remove('is-pouring'); void btn.offsetWidth; btn.classList.add('is-pouring');
          setTimeout(() => btn.classList.remove('is-pouring'), 700);
        }
        const word = NUMWORD[watered] || watered;
        if (msg) msg.textContent = watered === n ? 'You watered ' + n + ' flowers — they bloomed for you!' : watered + ' of ' + n + ' watered — ' + word;
        talk(watered === n ? 'You watered ' + (NUMWORD[n] || n) + ' flowers! They all bloomed!' : word);
        if (watered === n) { btn.disabled = true; btn.classList.add('is-done'); }
      });
    });
  }

  /* ---------- boot / replay ---------- */
  function wire() {
    screens = $$('[data-mg-screen]');
    wireGo();
    wireCount();
    wirePlant();
    wireWater();
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
