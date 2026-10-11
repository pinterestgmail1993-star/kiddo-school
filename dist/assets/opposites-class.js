/* Opposites class (Age 3, Class 5): Learn-grid group chips and the
   match-the-opposites board. Progressive enhancement only — without
   JavaScript the chips stay hidden, all twelve cards show, and the match
   board is an honest two-column chart (the noscript note says exactly
   that). With JavaScript the chips filter the grid, and the board becomes
   a real tap-tap matching game: tap a card, then tap its opposite — pairs
   lock in with calm feedback. No scores, no timers, nothing stored, no
   network; the status line counts pairs found, it never grades anyone. */
(() => {
  if (typeof document.querySelectorAll !== 'function') return; // search test harness

  /* --- Learn-the-pairs group chips (All 12 / Measuring words / Everyday) --- */
  const bar = document.querySelector('[data-op-groups]');
  const grid = bar && document.querySelector('[data-lv-grid]');
  if (bar && grid) {
    bar.hidden = false;
    bar.setAttribute('data-ready', 'true');
    const cards = [...grid.querySelectorAll('.lv-card')];
    const chips = [...bar.querySelectorAll('[data-op-group]')];
    if (cards.length && chips.length) {
      const showAll = () => cards.forEach(c => { c.hidden = false; });
      chips.forEach(chip => {
        chip.addEventListener('click', () => {
          const group = chip.getAttribute('data-op-group');
          chips.forEach(c => {
            const on = c === chip;
            c.classList.toggle('is-on', on);
            c.setAttribute('aria-pressed', on ? 'true' : 'false');
          });
          if (group === 'all') { showAll(); return; }
          cards.forEach(c => { c.hidden = c.getAttribute('data-op-group') !== group; });
        });
      });
    }
  }

  /* --- Match the opposite pairs: tap left, then tap its opposite right --- */
  const board = document.querySelector('[data-match-board]');
  if (!board) return;
  board.setAttribute('data-match-ready', 'true');
  const status = document.querySelector('[data-match-status]');
  const lefts = [...board.querySelectorAll('.op-card[data-match-side="left"]')];
  const rights = [...board.querySelectorAll('.op-card[data-match-side="right"]')];
  const say = msg => {
    if (!status) return;
    status.hidden = false;
    status.textContent = msg;
  };
  let picked = null;
  let matched = 0;
  const TOTAL = lefts.length;
  lefts.forEach(btn => btn.addEventListener('click', () => {
    if (btn.disabled) return;
    lefts.forEach(b => { b.classList.remove('is-picked'); b.setAttribute('aria-pressed', 'false'); });
    btn.classList.add('is-picked');
    btn.setAttribute('aria-pressed', 'true');
    picked = btn;
    say('Now tap its opposite on the right!');
  }));
  rights.forEach(btn => btn.addEventListener('click', () => {
    if (btn.disabled) return;
    if (!picked) { say('First tap a card on the left — then find its opposite here.'); return; }
    if (btn.getAttribute('data-match-pair') === picked.getAttribute('data-match-pair')) {
      btn.classList.add('is-matched');
      picked.classList.add('is-matched');
      picked.classList.remove('is-picked');
      btn.disabled = true;
      picked.disabled = true;
      picked.setAttribute('aria-pressed', 'false');
      picked = null;
      matched += 1;
      if (matched === TOTAL) {
        say('All ' + TOTAL + ' opposite pairs matched! Big and small, tall and short, long and short, full and empty, hot and cold, open and closed — say them all together!');
      } else {
        say(matched + ' of ' + TOTAL + ' pairs matched! Which opposites are still hiding?');
      }
    } else {
      picked.classList.remove('is-picked');
      picked = null;
      say('Not those two — say the word on your card, then look again. What is its true opposite?');
    }
  }));
})();
