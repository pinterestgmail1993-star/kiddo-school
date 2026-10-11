/* Kiddo School — Play & Practice: Match It, Sort It and What's Different?
   Rounds are server-rendered; this runner picks a short session (five rounds
   where ten exist), wires gentle feedback, and gives Sort It both drag and
   tap-to-place. No scores, no timers, no wrong-answer locks. */
(() => {
  const $ = (sel, el) => (el || document).querySelector(sel);
  const $$ = (sel, el) => [...(el || document).querySelectorAll(sel)];
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const game = $('[data-pp-game]');
  if (!game) return;
  const mode = game.getAttribute('data-pp-game');
  const originalHTML = game.innerHTML; // Play Again restores this
  const live = $('[data-pp-live]', game);
  const countEl = $('[data-pp-count]', game);
  const complete = $('[data-pp-complete]', game);
  let rounds = [], nextBtn = null, order = [], pos = 0, sortCount = 0, picked = null, dragged = false;

  const shuffle = arr => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const say = msg => { live.textContent = msg; };
  const session = () => { order = shuffle([...rounds.keys()]).slice(0, Math.min(5, rounds.length)); };

  function showRound(i) {
    rounds.forEach((r, j) => { r.hidden = j !== order[i]; });
    pos = i;
    countEl.hidden = false;
    countEl.textContent = 'Round ' + (i + 1) + ' of ' + order.length;
    nextBtn.hidden = true;
    const round = rounds[order[i]];
    if (mode === 'sort') {
      sortCount = 0;
      picked = null;
      showSortItem(round);
    } else {
      $$('[data-pp-choice]', round).forEach(b => { b.disabled = false; b.classList.remove('is-found'); });
    }
  }
  function showSortItem(round) {
    const items = $$('[data-pp-item]', round);
    items.forEach((it, i) => { it.hidden = it.hasAttribute('data-pp-placed') || i !== sortCount; });
  }
  function advance() {
    if (pos < order.length - 1) {
      showRound(pos + 1);
      rounds[order[pos]].scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' });
    } else {
      rounds.forEach(r => { r.hidden = true; });
      countEl.hidden = true;
      nextBtn.hidden = true;
      complete.hidden = false;
      complete.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' });
    }
  }
  function zoneUnder(e, zones) {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    return el ? zones.find(z => z === el || z.contains(el)) : null;
  }
  function placeItem(round, item, zone) {
    const zoneSide = zone.classList.contains('pp-zone-a') ? 'a' : 'b';
    const zoneLabel = (zone.getAttribute('data-pp-zone') || '').toLowerCase();
    const name = item.getAttribute('data-pp-item');
    if (item.getAttribute('data-pp-group') === zoneSide) {
      item.setAttribute('data-pp-placed', '');
      item.hidden = true;
      item.classList.remove('is-picked');
      sortCount++;
      say('Yes! ' + name + ' goes with the ' + zoneLabel + '.');
      if ($$('[data-pp-item]', round).every(it => it.hasAttribute('data-pp-placed'))) {
        nextBtn.hidden = false;
        nextBtn.focus({ preventScroll: true });
      } else {
        showSortItem(round);
      }
    } else {
      say('Try the other group.');
      zone.classList.add('is-nudge');
      setTimeout(() => zone.classList.remove('is-nudge'), 600);
    }
  }
  function wireChoices() {
    const correctWord = mode === 'match' ? 'You found it!' : 'You found the different one!';
    const mark = mode === 'match' ? 'data-pp-correct' : 'data-pp-different';
    rounds.forEach(round => {
      $$('[data-pp-choice]', round).forEach(btn => {
        btn.addEventListener('click', () => {
          if (btn.disabled) return;
          if (btn.hasAttribute(mark)) {
            btn.classList.add('is-found');
            $$('[data-pp-choice]', round).forEach(b => { b.disabled = true; });
            say(correctWord);
            nextBtn.hidden = false;
            nextBtn.focus({ preventScroll: true });
          } else {
            say('Look again.');
          }
        });
      });
    });
  }
  function wireSort() {
    rounds.forEach(round => {
      const zones = $$('[data-pp-zone]', round);
      $$('[data-pp-item]', round).forEach(item => {
        /* tap: select, then tap the group */
        item.addEventListener('click', () => {
          if (item.hasAttribute('data-pp-placed')) return;
          if (dragged) { dragged = false; return; }
          if (picked === item) { item.classList.remove('is-picked'); picked = null; return; }
          if (picked) picked.classList.remove('is-picked');
          picked = item;
          item.classList.add('is-picked');
          say(item.getAttribute('data-pp-item') + '. Now tap its group.');
        });
        /* drag: move the picture onto a group */
        let dragging = false, start = null, moved = false;
        item.addEventListener('pointerdown', e => {
          if (item.hasAttribute('data-pp-placed')) return;
          dragging = true; moved = false;
          start = { x: e.clientX, y: e.clientY };
          try { item.setPointerCapture(e.pointerId); } catch (err) { /* virtual pointers */ }
        });
        item.addEventListener('pointermove', e => {
          if (!dragging) return;
          const dx = e.clientX - start.x, dy = e.clientY - start.y;
          if (!moved && Math.hypot(dx, dy) > 8) { moved = true; item.classList.add('is-drag'); }
          if (moved) {
            item.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
            const over = zoneUnder(e, zones);
            zones.forEach(z => z.classList.toggle('is-target', z === over));
          }
        });
        const up = e => {
          if (!dragging) return;
          dragging = false;
          item.classList.remove('is-drag');
          item.style.transform = '';
          if (moved) {
            dragged = true;
            const over = zoneUnder(e, zones);
            zones.forEach(z => z.classList.remove('is-target'));
            if (over) placeItem(round, item, over);
            setTimeout(() => { dragged = false; }, 60);
          }
        };
        item.addEventListener('pointerup', up);
        item.addEventListener('pointercancel', up);
      });
      zones.forEach(zone => {
        zone.addEventListener('click', () => {
          if (picked && !picked.hasAttribute('data-pp-placed')) {
            const item = picked;
            picked = null;
            placeItem(round, item, zone);
          }
        });
      });
    });
  }
  function start() {
    session();
    complete.hidden = true;
    showRound(0);
  }
  function wire() {
    rounds = $$('[data-round]', game);
    nextBtn = $('[data-pp-next]', game);
    live.textContent = '';
    nextBtn.addEventListener('click', advance);
    $('[data-pp-replay]', game).addEventListener('click', () => {
      game.innerHTML = originalHTML;
      wire();
      start();
    });
    if (mode === 'sort') wireSort(); else wireChoices();
  }
  wire();
  start();
})();
