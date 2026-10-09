/* Fruits & Vegetables (Age 3, Class 8): learn-grid group chips and the
   match-the-twins board. Progressive enhancement only — without JavaScript
   the chips stay hidden, all sixteen cards show, and the board is an honest
   two-column chart (the noscript note says exactly that). With JavaScript
   the chips filter the grid, and the board becomes a real tap-tap matching
   game: tap a food, then find its twin — pairs lock in with calm feedback.
   No scores, no timers, nothing stored, no network; the status line counts
   pairs found, it never grades anyone. */
(() => {
  if (typeof document.querySelectorAll !== 'function') return; // search test harness

  /* --- Meet-the-foods group chips (All 16 / Fruits / Vegetables) --- */
  const bar = document.querySelector('[data-fv-groups]');
  const grid = bar && document.querySelector('[data-lv-grid]');
  if (bar && grid) {
    bar.hidden = false;
    bar.setAttribute('data-ready', 'true');
    const cards = [...grid.querySelectorAll('.lv-card')];
    const chips = [...bar.querySelectorAll('[data-fv-group-filter]')];
    if (cards.length && chips.length) {
      const showAll = () => cards.forEach(c => { c.hidden = false; });
      chips.forEach(chip => {
        chip.addEventListener('click', () => {
          const group = chip.getAttribute('data-fv-group-filter');
          chips.forEach(c => {
            const on = c === chip;
            c.classList.toggle('is-on', on);
            c.setAttribute('aria-pressed', on ? 'true' : 'false');
          });
          if (group === 'all') { showAll(); return; }
          cards.forEach(c => { c.hidden = c.getAttribute('data-fv-group') !== group; });
        });
      });
    }
  }

  /* --- Match & Remember: tap left, then tap its identical twin --- */
  const board = document.querySelector('[data-fv-match-board]');
  if (!board) return;
  board.setAttribute('data-match-ready', 'true');
  const status = document.querySelector('[data-fv-match-status]');
  const lefts = [...board.querySelectorAll('.fv-match[data-match-side="left"]')];
  const rights = [...board.querySelectorAll('.fv-match[data-match-side="right"]')];
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
    say('Now find its twin on the right!');
  }));
  rights.forEach(btn => btn.addEventListener('click', () => {
    if (btn.disabled) return;
    if (!picked) { say('First tap a food on the left — then find its twin here.'); return; }
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
        say('All ' + TOTAL + ' pairs matched! Name all six foods together — and name a fruit or a vegetable from your own kitchen too!');
      } else {
        say(matched + ' of ' + TOTAL + ' pairs matched! Which twins are still hiding?');
      }
    } else {
      picked.classList.remove('is-picked');
      picked = null;
      say('Not those two — say the food out loud, then look again for its twin.');
    }
  }));
})();
