/* Kiddo School — Magic Shape Builder (Age 3): pick a design, then build it
   with CSS/SVG shapes. Tap-to-place for touch, mouse and keyboard (every
   piece and every spot is a real <button>): tap a shape in the tray, then
   tap its dashed spot on the board — a piece only fits a spot of the SAME
   shape, so every placement is genuine shape reasoning. Two misses make
   the board gently pulse a spot that fits (a hint, never a correction);
   filling every spot completes the build with a calm cheer. The shape
   names are also spoken with the device's screen voice when available;
   the words are always visible on the buttons. Progressive enhancement
   only — without JavaScript the boards render as honest shape pictures
   beside their reference. No scores, no timers, nothing stored. */
(() => {
  const game = document.querySelector('[data-mg-game="shape-builder"]');
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
    try {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.85;
      u.pitch = 1.15;
      window.speechSynthesis.speak(u);
    } catch (e) { /* written words carry it */ }
  }

  /* ---------- one build board ---------- */
  function wireBuild(section) {
    const board = $('[data-sb-board]', section);
    const tray = $('[data-sb-tray]', section);
    const status = $('[data-sb-status]', section);
    if (!board || !tray || !status) return;
    const build = section.getAttribute('data-sb-build');
    const slots = $$('[data-sb-slot]', board);
    const pieces = $$('[data-sb-piece]', tray);
    let picked = null, misses = 0;
    const TOTAL = slots.length;
    const resetStatus = () => { status.textContent = 'Tap a shape below, then tap its spot.'; };

    function hintMatch() {
      if (!picked) return;
      const want = picked.getAttribute('data-sb-piece');
      const open = slots.find(s => !s.classList.contains('is-filled') && s.getAttribute('data-sb-slot') === want);
      if (open) open.classList.add('is-hint');
    }
    function clearHints() { slots.forEach(s => s.classList.remove('is-hint')); }
    function place(slot) {
      const shape = slot.getAttribute('data-sb-slot');
      const shapeEl = slot.querySelector('.sb-shape');
      slot.classList.add('is-filled');
      if (shapeEl) shapeEl.style.fill = slot.getAttribute('data-sb-color') || '#f2c14e';
      if (picked) {
        picked.classList.add('is-used');
        picked.classList.remove('is-picked');
        picked.setAttribute('aria-pressed', 'false');
        picked = null;
      }
      clearHints();
      misses = 0;
      const left = slots.filter(s => !s.classList.contains('is-filled')).length;
      if (left === 0) {
        status.textContent = 'You built the ' + build + '! Look at it glow!';
        talk('You built the ' + build + '! Great building!');
        if (!reduce) {
          board.classList.remove('is-cheer');
          void board.offsetWidth;
          board.classList.add('is-cheer');
        }
        const next = section.querySelector('[data-mg-go="choose"]');
        if (next) { next.hidden = false; next.focus({ preventScroll: true }); }
      } else {
        status.textContent = 'A ' + shape + '! ' + left + (left === 1 ? ' shape' : ' shapes') + ' to go.';
        talk('A ' + shape + '!');
      }
    }
    pieces.forEach(piece => piece.addEventListener('click', () => {
      if (piece.classList.contains('is-used')) return;
      if (picked === piece) {
        piece.classList.remove('is-picked');
        piece.setAttribute('aria-pressed', 'false');
        picked = null;
        clearHints();
        resetStatus();
        return;
      }
      if (picked) { picked.classList.remove('is-picked'); picked.setAttribute('aria-pressed', 'false'); }
      picked = piece;
      piece.classList.add('is-picked');
      piece.setAttribute('aria-pressed', 'true');
      clearHints();
      const shape = piece.getAttribute('data-sb-piece');
      status.textContent = 'A ' + shape + '! Now tap its spot on the board.';
      talk('A ' + shape + '! Now find its spot.');
    }));
    slots.forEach(slot => slot.addEventListener('click', () => {
      if (slot.classList.contains('is-filled')) return;
      if (!picked) {
        status.textContent = 'First tap a shape in the tray below, then tap its spot.';
        return;
      }
      const want = picked.getAttribute('data-sb-piece');
      const spot = slot.getAttribute('data-sb-slot');
      if (want === spot) {
        place(slot);
      } else {
        misses += 1;
        status.textContent = 'That is a ' + spot + ' spot — a ' + want + ' will not fit. Look for the ' + want + ' place!';
        talk('A ' + want + ' will not fit there. Find the ' + want + ' spot!');
        clearHints();
        if (misses >= 2) hintMatch();
      }
    }));
    const reset = section.querySelector('[data-sb-reset]');
    if (reset) reset.addEventListener('click', () => {
      slots.forEach(s => { s.classList.remove('is-filled', 'is-hint'); const el = s.querySelector('.sb-shape'); if (el) el.style.fill = ''; });
      pieces.forEach(p => { p.classList.remove('is-used', 'is-picked'); p.setAttribute('aria-pressed', 'false'); });
      picked = null; misses = 0;
      const next = section.querySelector('[data-mg-go="choose"]');
      if (next) next.hidden = true;
      board.classList.remove('is-cheer');
      resetStatus();
    });
  }

  /* ---------- boot / replay ---------- */
  function wire() {
    screens = $$('[data-mg-screen]');
    wireGo();
    $$('[data-sb-build]').forEach(wireBuild);
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
