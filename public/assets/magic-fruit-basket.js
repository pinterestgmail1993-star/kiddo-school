/* Kiddo School — Magic Fruit Basket (Age 3): screen flow, spoken fruit
   names (the device's own screen voice via speechSynthesis — with visible
   text alternatives on every card) and the Fill-the-Basket physics, with
   BOTH tap-to-place and drag support. Progressive enhancement only:
   without JavaScript every screen is visible and the page reads as a
   scroll-through activity. No scores, no timers, nothing stored, no
   network beyond the game's own images. Animations respect body.calm-mode
   and prefers-reduced-motion via the shared CSS gates in style.css. */
(() => {
  const game = document.querySelector('[data-mg-game="fruit-basket"]');
  if (!game) return;
  const $ = (sel, el) => (el || game).querySelector(sel);
  const $$ = (sel, el) => [...(el || game).querySelectorAll(sel)];
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const originalHTML = game.innerHTML; // Play Again restores this
  const live = $('[data-mg-live]');

  /* ---------- shared screen engine ---------- */
  let screens = [], pos = 0;
  const ORDER = ['welcome', 'meet', 'fill', 'find', 'count', 'offscreen', 'complete'];
  function show(id, scroll) {
    screens.forEach(s => { s.hidden = s.getAttribute('data-mg-screen') !== id; });
    const target = screens.find(s => s.getAttribute('data-mg-screen') === id);
    if (target && scroll !== false) target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }
  function wireGo() {
    $$('[data-mg-go]').forEach(btn => btn.addEventListener('click', () => {
      show(btn.getAttribute('data-mg-go'));
    }));
  }

  /* ---------- friendly screen voice (with text always visible) ---------- */
  function talk(text) {
    if (live) live.textContent = text;
    try {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.85;
      u.pitch = 1.15;
      window.speechSynthesis.speak(u);
    } catch (e) { /* the written words carry the lesson */ }
  }

  /* ---------- Meet the Fruits: tap to hear the name ---------- */
  function wireMeet() {
    $$('[data-mg-say]').forEach(btn => btn.addEventListener('click', () => {
      const slug = btn.getAttribute('data-mg-say');
      const word = slug.charAt(0).toUpperCase() + slug.slice(1) + '!';
      btn.classList.remove('is-playing');
      void btn.offsetWidth;
      btn.classList.add('is-playing');
      talk(word + ' ' + (btn.getAttribute('aria-label') || ''));
      setTimeout(() => btn.classList.remove('is-playing'), 700);
    }));
  }

  /* ---------- Fill the Basket: tap-to-place AND drag ---------- */
  function wireBasket() {
    const basket = $('[data-mg-basket]');
    const landedBox = $('[data-mg-landed]');
    const counter = $('[data-mg-basket-count]');
    const nextBtn = game.querySelector('[data-mg-screen="fill"] [data-mg-go]');
    if (!basket || !landedBox || !counter) return;
    const fruits = $$('[data-mg-drop]');
    let picked = null, dragged = false, landed = 0;
    const TOTAL = fruits.length;
    const setCount = () => {
      counter.textContent = landed === 0 ? 'The basket is empty.'
        : landed + (landed === 1 ? ' fruit is' : ' fruits are') + ' in the basket!';
    };
    setCount();
    function land(fruit) {
      const slug = fruit.getAttribute('data-mg-drop');
      fruit.classList.add('is-in');
      fruit.classList.remove('is-picked');
      fruit.setAttribute('aria-pressed', 'false');
      const pile = document.createElement('img');
      pile.src = fruit.querySelector('img').currentSrc || fruit.querySelector('img').src;
      pile.alt = '';
      pile.style.setProperty('--tilt', (Math.floor(Math.random() * 24) - 12) + 'deg');
      landedBox.appendChild(pile);
      if (!reduce) {
        landedBox.classList.remove('mg-pop');
        void landedBox.offsetWidth;
        landedBox.classList.add('mg-pop');
        basket.classList.remove('mg-basket-glow');
        void basket.offsetWidth;
        basket.classList.add('mg-basket-glow');
      }
      landed += 1;
      setCount();
      talk('The ' + slug + ' is in the basket! ' + landed + (landed === 1 ? ' fruit' : ' fruits') + ' in!');
      if (landed === TOTAL) {
        counter.textContent = 'The basket is full — magic! ' + TOTAL + ' fruits in all!';
        if (nextBtn) {
          nextBtn.hidden = false;
          nextBtn.focus({ preventScroll: true });
        }
      }
    }
    fruits.forEach(fruit => {
      /* tap: pick a fruit, then tap the basket */
      fruit.addEventListener('click', () => {
        if (fruit.classList.contains('is-in')) return;
        if (dragged) { dragged = false; return; }
        if (picked === fruit) {
          fruit.classList.remove('is-picked');
          fruit.setAttribute('aria-pressed', 'false');
          picked = null;
          return;
        }
        if (picked) { picked.classList.remove('is-picked'); picked.setAttribute('aria-pressed', 'false'); }
        picked = fruit;
        fruit.classList.add('is-picked');
        fruit.setAttribute('aria-pressed', 'true');
        const word = fruit.getAttribute('data-mg-drop');
        talk(word.charAt(0).toUpperCase() + word.slice(1) + '! Now tap the basket.');
      });
      /* drag: pull the fruit onto the basket */
      let dragging = false, start = null, moved = false;
      fruit.addEventListener('pointerdown', e => {
        if (fruit.classList.contains('is-in')) return;
        dragging = true; moved = false;
        start = { x: e.clientX, y: e.clientY };
        try { fruit.setPointerCapture(e.pointerId); } catch (err) { /* virtual pointers */ }
      });
      fruit.addEventListener('pointermove', e => {
        if (!dragging) return;
        const dx = e.clientX - start.x, dy = e.clientY - start.y;
        if (!moved && Math.hypot(dx, dy) > 8) { moved = true; fruit.classList.add('is-drag'); }
        if (moved) {
          fruit.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(1.06)';
          const rect = basket.getBoundingClientRect();
          const over = e.clientX > rect.left && e.clientX < rect.right && e.clientY > rect.top && e.clientY < rect.bottom;
          basket.classList.toggle('is-target', over);
        }
      });
      const up = e => {
        if (!dragging) return;
        dragging = false;
        fruit.classList.remove('is-drag');
        fruit.style.transform = '';
        basket.classList.remove('is-target');
        if (moved) {
          dragged = true;
          const rect = basket.getBoundingClientRect();
          const over = e.clientX > rect.left && e.clientX < rect.right && e.clientY > rect.top && e.clientY < rect.bottom;
          if (over) land(fruit);
          setTimeout(() => { dragged = false; }, 60);
        }
      };
      fruit.addEventListener('pointerup', up);
      fruit.addEventListener('pointercancel', up);
    });
    basket.addEventListener('click', () => {
      if (picked && !picked.classList.contains('is-in')) {
        const fruit = picked;
        picked = null;
        land(fruit);
      }
    });
  }

  /* ---------- boot / replay ---------- */
  function wire() {
    screens = $$('[data-mg-screen]');
    wireGo();
    wireMeet();
    wireBasket();
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
