/* Colors class (Age 3, Class 4): Learn-grid group chips, the paint mixer
   and the rainbow check-off. Progressive enhancement only — without
   JavaScript the chips stay hidden, all 24 cards show, the mixer shows the
   three paint recipes as a plain chart with results visible, and the
   rainbow strip is an ordered legend. With JavaScript the mixer hides each
   result behind a "Mix them!" button (a real <button>, keyboard reachable),
   and the rainbow stripes become tappable check-offs. Calm feedback, no
   scores, no timers, nothing stored, no network. */
(() => {
  if (typeof document.querySelectorAll !== 'function') return; // search test harness

  /* --- Learn-the-colors group chips (All 24 / Splashes / Pictures / Rainbow) --- */
  const bar = document.querySelector('[data-cl-groups]');
  const grid = bar && document.querySelector('[data-lv-grid]');
  if (bar && grid) {
    bar.hidden = false;
    bar.setAttribute('data-ready', 'true');
    const cards = [...grid.querySelectorAll('.lv-card')];
    const chips = [...bar.querySelectorAll('[data-cl-group]')];
    if (cards.length && chips.length) {
      const showAll = () => cards.forEach(c => { c.hidden = false; });
      chips.forEach(chip => {
        chip.addEventListener('click', () => {
          const group = chip.getAttribute('data-cl-group');
          chips.forEach(c => {
            const on = c === chip;
            c.classList.toggle('is-on', on);
            c.setAttribute('aria-pressed', on ? 'true' : 'false');
          });
          if (group === 'all') { showAll(); return; }
          cards.forEach(c => { c.hidden = c.getAttribute('data-cl-group') !== group; });
        });
      });
    }
  }

  /* --- The paint mixer: hide results, then reveal them on tap --- */
  const board = document.querySelector('[data-mix-board]');
  if (board) {
    board.setAttribute('data-mix-ready', 'true');
    board.querySelectorAll('[data-mix]').forEach(station => {
      const result = station.querySelector('[data-mix-result]');
      const word = station.querySelector('[data-mix-word]');
      const feedback = station.querySelector('[data-mix-feedback]');
      const btn = station.querySelector('[data-mix-mix]');
      if (!result || !btn) return;
      // Park the answer until the child mixes it. Re-mixing is allowed —
      // repetition is the point — and each pass re-hides, then reveals.
      const make = station.getAttribute('data-mix-makes') || '';
      const park = () => {
        result.classList.add('is-unknown');
        result.classList.remove('is-mixed');
        if (word) word.textContent = '?';
        if (feedback) feedback.hidden = true;
      };
      park();
      btn.addEventListener('click', () => {
        park();
        requestAnimationFrame(() => {
          result.classList.remove('is-unknown');
          result.classList.add('is-mixed');
          if (word) word.textContent = make;
          if (feedback) feedback.hidden = false;
          btn.textContent = 'Mix it again ↺';
          btn.setAttribute('aria-label', 'Mixed. Tap to mix this recipe again.');
        });
      });
    });
  }

  /* --- Rainbow check-off: stripes become real, keyboard-reachable buttons --- */
  const rbBoard = document.querySelector('[data-rainbow-board]');
  if (rbBoard) {
    rbBoard.setAttribute('data-rb-ready', 'true');
    const status = rbBoard.querySelector('[data-rb-status]');
    const found = new Set();
    const ORDER = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
    rbBoard.querySelectorAll('.rb-chip[data-rb-color]').forEach(chip => {
      const color = chip.getAttribute('data-rb-color');
      const b = document.createElement('button');
      b.type = 'button';
      b.className = chip.className;
      b.setAttribute('data-rb-color', color);
      b.setAttribute('aria-label', 'Rainbow color ' + color + '. Tap when you find it.');
      b.innerHTML = chip.innerHTML;
      chip.replaceWith(b);
      b.addEventListener('click', () => {
        const on = b.classList.toggle('is-found');
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        if (on) found.add(color); else found.delete(color);
        if (status) {
          status.hidden = false;
          if (found.size === ORDER.length) {
            status.textContent = 'You found every color in the rainbow! Red, orange, yellow, green, blue, purple — all six!';
          } else if (found.size > 0) {
            const next = ORDER.find(c => !found.has(c));
            status.textContent = found.size + ' of 6 rainbow colors found!' + (next ? ' Can you find ' + next + '? Say it out loud first!' : '');
          } else {
            status.hidden = true;
          }
        }
      });
    });
  }
})();
