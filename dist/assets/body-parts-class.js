/* Body Parts & My Five Senses (Age 3, Class 7): learn-grid group chips for
   the two viewers and the match-the-sense board. Progressive enhancement
   only — without JavaScript the chips stay hidden, all cards show, and the
   board is an honest two-column chart (the noscript note says exactly
   that). With JavaScript the chips filter their grid, and the board becomes
   a real tap-tap matching game: tap a body part, then tap its sense — pairs
   lock in with calm feedback. No scores, no timers, nothing stored, no
   network; the status line counts pairs found, it never grades anyone. */
(() => {
  if (typeof document.querySelectorAll !== 'function') return; // search test harness

  /* --- Group chips for each Learn grid (body parts / senses) --- */
  document.querySelectorAll('[data-bp-groups]').forEach(bar => {
    bar.hidden = false;
    bar.setAttribute('data-ready', 'true');
    const section = bar.closest('section') || document;
    const grid = section.querySelector('[data-lv-grid]');
    if (!grid) return;
    const cards = [...grid.querySelectorAll('.lv-card')];
    const chips = [...bar.querySelectorAll('[data-bp-group-filter]')];
    if (!cards.length || !chips.length) return;
    const showAll = () => cards.forEach(c => { c.hidden = false; });
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const group = chip.getAttribute('data-bp-group-filter');
        chips.forEach(c => {
          const on = c === chip;
          c.classList.toggle('is-on', on);
          c.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        if (group === 'all') { showAll(); return; }
        cards.forEach(c => { c.hidden = c.getAttribute('data-bp-group') !== group; });
      });
    });
  });

  /* --- Match the sense: tap left, then tap the sense it does --- */
  const board = document.querySelector('[data-bp-match-board]');
  if (!board) return;
  board.setAttribute('data-match-ready', 'true');
  const status = document.querySelector('[data-bp-match-status]');
  const lefts = [...board.querySelectorAll('.bp-match[data-match-side="left"]')];
  const rights = [...board.querySelectorAll('.bp-match[data-match-side="right"]')];
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
    say('Now tap the sense it does on the right!');
  }));
  rights.forEach(btn => btn.addEventListener('click', () => {
    if (btn.disabled) return;
    if (!picked) { say('First tap a body part on the left — then find its sense here.'); return; }
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
        say('All ' + TOTAL + ' senses matched! Eyes see, ears hear, the nose smells, the tongue tastes and the skin touches — say them all together!');
      } else {
        say(matched + ' of ' + TOTAL + ' pairs matched! Which senses are still hiding?');
      }
    } else {
      picked.classList.remove('is-picked');
      picked = null;
      say('Not those two — say the body part out loud, then look again. What does it do?');
    }
  }));
})();
