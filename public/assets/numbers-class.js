/* Numbers class (Age 3): group chips for the Learn grid + the Number Order
   tap-in-order game. Progressive enhancement only — without JavaScript the
   chips stay hidden, all 10 cards show, and the number-order tiles simply
   line up in order as a counting line. With JavaScript the tiles are turned
   into real buttons, shuffled, and the child taps them back into order:
   correct taps lock in with a calm word; wrong taps get a gentle "let's find
   the right one" — no scores, no timers, nothing is stored, no network. */
(() => {
  if (typeof document.querySelectorAll !== 'function') return; // search test harness

  /* --- Learn-the-numbers group chips (All 10 / 1–5 / 6–10) --- */
  const bar = document.querySelector('[data-num-groups]');
  const grid = bar && document.querySelector('[data-lv-grid]');
  if (bar && grid) {
    bar.hidden = false;
    bar.setAttribute('data-ready', 'true');
    const cards = [...grid.querySelectorAll('.lv-card')];
    const chips = [...bar.querySelectorAll('[data-nm-group]')];
    if (cards.length && chips.length) {
      const showAll = () => cards.forEach(c => { c.hidden = false; });
      chips.forEach(chip => {
        chip.addEventListener('click', () => {
          const group = chip.getAttribute('data-nm-group');
          chips.forEach(c => {
            const on = c === chip;
            c.classList.toggle('is-on', on);
            c.setAttribute('aria-pressed', on ? 'true' : 'false');
          });
          if (group === 'all') { showAll(); return; }
          cards.forEach(c => { c.hidden = c.getAttribute('data-num-group') !== group; });
        });
      });
    }
  }

  /* --- Number Order boards --- */
  document.querySelectorAll('[data-ord-board]').forEach(board => {
    const pool = board.querySelector('[data-ord-pool]');
    const status = board.querySelector('[data-ord-status]');
    if (!pool || typeof pool.querySelectorAll !== 'function') return;
    const tiles = [...pool.querySelectorAll('.ord-tile')];
    if (!tiles.length) return;

    const expected = tiles.map(t => t.textContent.trim());
    // Turn the honest counting line into real, keyboard-reachable buttons.
    const buttons = tiles.map((t, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'ord-tile';
      b.textContent = t.textContent.trim();
      b.setAttribute('aria-label', 'Number tile ' + b.textContent);
      b.dataset.value = b.textContent;
      t.replaceWith(b);
      return b;
    });

    // A fixed shuffle that never leaves a tile in its sorted position when
    // there are at least two tiles — always a real game, never luck.
    const vals = buttons.map((b, i) => ({ v: b.dataset.value, i }));
    let shuffled = vals.slice();
    for (let tries = 0; tries < 20; tries++) {
      shuffled.sort(() => 0.5 - Math.random());
      if (vals.length < 2 || shuffled.some((x, idx) => x.i !== idx)) break;
    }
    shuffled.forEach(x => pool.appendChild(buttons[x.i]));

    let next = 0;
    const praise = ['Yes! That’s next.', 'Perfect order!', 'Right one!'];
    const say = (msg, ok) => {
      if (!status) return;
      status.hidden = false;
      status.textContent = msg;
      status.classList.toggle('is-good', !!ok);
    };
    say('Now shuffled! Tap 1 to begin, then 2, then 3…', false);

    pool.addEventListener('click', event => {
      const btn = event.target.closest('button.ord-tile');
      if (!btn || btn.disabled) return;
      const want = expected[next];
      if (btn.dataset.value === want) {
        btn.disabled = true;
        btn.classList.add('is-picked');
        // Move the found tile to the end so the line grows left to right.
        pool.appendChild(btn);
        next += 1;
        if (next >= expected.length) say('You lined them all up — beautiful counting!', true);
        else say((next === 1 ? 'One! Now tap ' : praise[next % praise.length] + ' Now tap ') + expected[next] + '.', true);
      } else {
        say('Let’s find ' + want + ' first — it can hide!', false);
      }
    });
  });
})();
