/* Alphabet class (Age 3): group chips for the Learn the Letters grid.
   Progressive enhancement only — without JavaScript the chips stay hidden
   and all 26 cards simply show. With JavaScript, tapping a chip (A–F,
   G–L, M–R, S–X, Y–Z) filters the grid below the card viewer; "All 26"
   brings the whole alphabet back. No scores, no memory, no network. */
(() => {
  if (typeof document.querySelectorAll !== 'function') return; // search test harness
  const bar = document.querySelector('[data-alphabet-groups]');
  const grid = bar && document.querySelector('[data-lv-grid]');
  if (!bar || !grid) return;
  bar.hidden = false;
  bar.setAttribute('data-ready', 'true');
  const cards = [...grid.querySelectorAll('.lv-card')];
  const chips = [...bar.querySelectorAll('[data-al-group]')];
  if (!cards.length || !chips.length) return;
  const showAll = () => cards.forEach(c => { c.hidden = false; });
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const group = chip.getAttribute('data-al-group');
      chips.forEach(c => {
        const on = c === chip;
        c.classList.toggle('is-on', on);
        c.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      if (group === 'all') { showAll(); return; }
      cards.forEach(c => { c.hidden = c.getAttribute('data-letter-group') !== group; });
    });
  });
})();
