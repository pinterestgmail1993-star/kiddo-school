/* Kiddo School — Shape Adventures engine (Class 25).
   Plays eighteen server-rendered SVG boards:
   - slotmatch: tap (or drag) a piece, tap its matching outline slot
   - pattern:   read the row aloud, tap what comes next
   - sort:      tap an item, tap the right jar/basket (multi-round)
   - builder:   toggle shape parts onto the monster
   - symmetry:  mirror the left feather spots onto the right
   - find:      hunt objects of the round's shape in the room
   Gentle hints only — no scores, no timers, nothing stored remotely.
   Completion is saved per selected child (kiddo-adventures in localStorage)
   and never marks a curriculum class complete. Without JavaScript every
   board still shows its scene, its pieces and its written hints. */
(() => {
  const root = document.querySelector('[data-sa-board]');
  const lib = document.querySelector('[data-sa-lib]');
  if (!root && !lib) return;
  if (typeof document.querySelectorAll !== 'function') return; // search harness

  /* ---------- tiny shared kit ---------- */
  const store = {
    get(k, fb) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? fb : v; } catch (e) { return fb; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } }
  };
  const childKey = () => store.get('kiddo-active', null) || 'guest';
  const prog = () => { const v = store.get('kiddo-adventures', null); return (v && typeof v === 'object') ? v : {}; };
  function saveProgress(section, slug) {
    const all = prog();
    const k = childKey();
    all[k] = all[k] || {};
    all[k][section] = all[k][section] || {};
    all[k][section][slug] = Date.now();
    store.set('kiddo-adventures', all);
    try { window.dispatchEvent(new CustomEvent('kiddo-adventure-done', { detail: { section, slug } })); } catch (e) { /* old browsers */ }
  }
  function doneSet(section) {
    const all = prog();
    const k = childKey();
    return (all[k] && all[k][section]) || {};
  }
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const talk = text => {
    if (document.body.classList.contains('lwy-quiet')) return;
    try {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.85; u.pitch = 1.15;
      window.speechSynthesis.speak(u);
    } catch (e) { /* written text carries it */ }
  };

  /* ---------- library page: completion ribbons ---------- */
  if (lib) {
    const done = doneSet('shapes');
    lib.querySelectorAll('[data-sa-libcard]').forEach(card => {
      const slug = card.getAttribute('data-sa-libcard');
      if (done[slug]) {
        const badge = card.querySelector('[data-sa-done]');
        if (badge) badge.hidden = false;
        card.classList.add('is-done');
      }
    });
    return;
  }

  /* ---------- game boards ---------- */
  const engine = root.getAttribute('data-sa-engine');
  const slug = root.getAttribute('data-sa-game');
  const $ = s => root.querySelector(s);
  const $$ = s => [...root.querySelectorAll(s)];
  const statusEl = $('[data-sa-status]');
  const again = $('[data-sa-again]');
  const cheerEl = $('[data-sa-cheer]');
  const progressNote = $('[data-sa-progress]');
  if (again) {
    again.hidden = false;
    again.addEventListener('click', () => { window.location.reload(); });
  }

  const state = { total: 0, done: 0 };
  function noteStatus(text, speak) {
    if (statusEl) statusEl.textContent = text;
    if (speak !== false) talk(text);
  }
  function tick(done) {
    state.done = done;
    if (progressNote) progressNote.textContent = done >= state.total ? '' : `${done} of ${state.total} done.`;
  }
  function cheer() {
    if (cheerEl) {
      cheerEl.hidden = false;
      if (!reduce) cheerEl.classList.add('is-on');
      cheerEl.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' });
    }
    noteStatus('You did it! Wonderful!');
    saveProgress('shapes', slug);
    if (again) again.focus();
  }

  /* shape snippets — mirrors src/adventure-kit.mjs shapeSVG */
  const OUT = 'stroke="#3a3350" stroke-width="5" stroke-linejoin="round"';
  function shapeSVG(shape, color) {
    const f = `fill="${color}" ${OUT}`;
    switch (shape) {
      case 'circle': return `<circle r="46" ${f}/>`;
      case 'square': return `<rect x="-42" y="-42" width="84" height="84" rx="12" ${f}/>`;
      case 'triangle': return `<path d="M0,-50 L52,42 L-52,42 Z" ${f}/>`;
      case 'rectangle': return `<rect x="-58" y="-40" width="116" height="80" rx="12" ${f}/>`;
      case 'oval': return `<ellipse rx="54" ry="38" ${f}/>`;
      case 'diamond': return `<path d="M0,-52 L46,0 L0,52 L-46,0 Z" ${f}/>`;
      case 'star': return `<path d="M0,-52 L14,-16 L52,-14 L23,10 L33,47 L0,26 L-33,47 L-23,10 L-52,-14 L-14,-16 Z" ${f}/>`;
      case 'heart': return `<path d="M0,44 C-40,16 -52,-8 -40,-28 C-30,-44 -8,-42 0,-26 C8,-42 30,-44 40,-28 C52,-8 40,16 0,44 Z" ${f}/>`;
      case 'hexagon': return `<path d="M44,-26 L44,26 L0,52 L-44,26 L-44,-26 L0,-52 Z" ${f}/>`;
      case 'arch': return `<path d="M-42,44 L-42,-6 C-42,-42 42,-42 42,-6 L42,44 Z" ${f}/>`;
      case 'moon': return `<path d="M8,-48 A50,50 0 1 0 8,48 A38,38 0 1 1 8,-48 Z" ${f}/>`;
    }
    return `<circle r="46" ${f}/>`;
  }

  /* ---------- drag helper: tap or drag pieces to targets ---------- */
  function wireDrag(pieceEl, onDrop) {
    let dragging = false, ghost = null, sx = 0, sy = 0, pid = null;
    const start = e => {
      if (pid !== null) return;
      pid = e.pointerId; sx = e.clientX; sy = e.clientY;
      dragging = false;
      try { pieceEl.setPointerCapture(pid); } catch (err) { /* taps still work */ }
    };
    const move = e => {
      if (e.pointerId !== pid) return;
      if (!dragging && Math.hypot(e.clientX - sx, e.clientY - sy) > 10) {
        dragging = true;
        ghost = pieceEl.cloneNode(true);
        ghost.className = 'sa-piece sa-ghost';
        ghost.style.width = pieceEl.getBoundingClientRect().width + 'px';
        document.body.appendChild(ghost);
        pieceEl.classList.add('is-lifted');
      }
      if (dragging && ghost) {
        ghost.style.left = e.clientX + 'px';
        ghost.style.top = e.clientY + 'px';
        e.preventDefault();
      }
    };
    const end = e => {
      if (e.pointerId !== pid) return;
      pid = null;
      if (dragging && ghost) {
        ghost.remove(); ghost = null;
        pieceEl.classList.remove('is-lifted');
        const el = document.elementFromPoint(e.clientX, e.clientY);
        const target = el && el.closest ? el.closest('[data-sa-slot],[data-sa-bin]') : null;
        if (target) onDrop(target, pieceEl);
      }
      dragging = false;
    };
    pieceEl.addEventListener('pointerdown', start);
    pieceEl.addEventListener('pointermove', move);
    pieceEl.addEventListener('pointerup', end);
    pieceEl.addEventListener('pointercancel', end);
  }

  function wiggle(el) {
    if (!el || reduce) return;
    el.classList.remove('is-wiggle');
    void el.offsetWidth; // restart the animation
    el.classList.add('is-wiggle');
    setTimeout(() => el.classList.remove('is-wiggle'), 700);
  }

  /* ---------- slotmatch ---------- */
  function slotmatch() {
    const slots = $$('[data-sa-slot]');
    let selected = null;
    state.total = slots.length;
    function fill(slot, piece) {
      const color = piece.getAttribute('data-piece-color') || '#e04b3f';
      const hole = slot.querySelector('.sa-slot-hole');
      if (hole) hole.innerHTML = shapeSVG(slot.getAttribute('data-sa-slot'), color);
      slot.classList.add('is-filled');
      slot.setAttribute('aria-label', (slot.getAttribute('aria-label') || '').replace('Empty ', '') + ' — filled');
      piece.classList.add('is-used');
      piece.setAttribute('aria-disabled', 'true');
      state.done++;
      tick(state.done);
      noteStatus('Well done — that shape flew right in!');
      if (state.done >= state.total) {
        root.classList.add('is-complete');
        if (slug === 'build-a-shape-spaceship') root.classList.add('is-launch');
        cheer();
      }
    }
    function slotTap(slot) {
      if (slot.classList.contains('is-filled')) { noteStatus('That spot is full — find another hole.'); return; }
      if (!selected) { noteStatus('Pick a piece from the tray first.'); return; }
      if (selected.getAttribute('data-sa-piece') === slot.getAttribute('data-sa-slot')) fill(slot, selected);
      else {
        wiggle(slot);
        noteStatus(`That is the ${slot.getAttribute('data-sa-slot')} hole. Your hand holds the ${selected.getAttribute('data-sa-piece')}. Look again!`);
      }
    }
    slots.forEach(slot => {
      slot.addEventListener('click', () => slotTap(slot));
      slot.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); slotTap(slot); } });
    });
    $$('.sa-piece').forEach(piece => {
      piece.addEventListener('click', () => {
        if (piece.classList.contains('is-used')) { noteStatus('That piece found its home already.'); return; }
        if (selected === piece) {
          piece.classList.remove('is-selected'); piece.setAttribute('aria-pressed', 'false'); selected = null;
          noteStatus('Piece back in the tray.');
          return;
        }
        $$('.sa-piece.is-selected').forEach(p => { p.classList.remove('is-selected'); p.setAttribute('aria-pressed', 'false'); });
        selected = piece;
        piece.classList.add('is-selected'); piece.setAttribute('aria-pressed', 'true');
        noteStatus(`The ${piece.getAttribute('data-sa-piece')} in your hand. Now find its hole!`);
      });
      wireDrag(piece, target => { if (target.hasAttribute('data-sa-slot')) slotTap(target); });
    });
  }

  /* ---------- pattern ---------- */
  function pattern() {
    const rounds = $$('[data-sa-round]');
    let current = 0;
    state.total = rounds.length;
    rounds.forEach((r, i) => { r.hidden = i !== 0; });
    function show(i) {
      rounds.forEach((r, j) => { r.hidden = j !== i; });
      const ask = rounds[i].querySelector('.sa-ask');
      if (ask) noteStatus(ask.textContent, false);
    }
    rounds.forEach(round => {
      const gap = round.querySelector('[data-sa-gap]');
      round.querySelectorAll('[data-sa-choice]').forEach(choice => {
        choice.addEventListener('click', () => {
          if (choice.hasAttribute('data-sa-answer')) {
            const clone = choice.querySelector('svg');
            if (gap && clone) { gap.innerHTML = clone.innerHTML; gap.classList.add('is-filled'); }
            round.classList.add('is-done');
            round.querySelectorAll('[data-sa-choice]').forEach(c => { c.disabled = true; });
            state.done++;
            tick(state.done);
            if (state.done >= state.total) cheer();
            else { current++; noteStatus('The pattern goes on! On to the next one.'); show(current); }
          } else {
            wiggle(choice);
            const ask = round.querySelector('.sa-ask');
            noteStatus('Let’s say the pattern together, then try again. ' + (ask ? ask.textContent : ''));
          }
        });
      });
    });
    const ask1 = rounds[0] && rounds[0].querySelector('.sa-ask');
    if (ask1) noteStatus(ask1.textContent, false);
  }

  /* ---------- sort ---------- */
  function sortGame() {
    const itemRounds = $$('[data-sa-itemround]');
    const binRounds = $$('[data-sa-sortround]');
    const note = $('[data-sa-roundnote]');
    const multi = itemRounds.length > 1;
    let round = 0;
    let placed = 0;
    let selected = null;
    state.total = itemRounds.reduce((n, t) => n + t.querySelectorAll('[data-sa-item]').length, 0);
    function showRound(i) {
      itemRounds.forEach((t, j) => { t.hidden = j !== i; });
      binRounds.forEach((t, j) => { t.hidden = j !== i; });
      const says = root.getAttribute('data-sa-roundsays');
      if (note && says) {
        const list = JSON.parse(says || '[]');
        if (list[i]) note.textContent = list[i];
      }
    }
    if (multi) showRound(0);
    function binTap(bin) {
      if (!selected) { noteStatus('Pick something from the table first.'); return; }
      if (selected.getAttribute('data-sa-item') === bin.getAttribute('data-sa-bin')) {
        const fill = bin.querySelector('[data-sa-binfill]');
        if (fill) {
          const svg = selected.querySelector('svg');
          const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          g.setAttribute('transform', `translate(${(Math.random() * 50 - 25).toFixed(0)} ${(28 + Math.random() * 26).toFixed(0)}) scale(0.45)`);
          if (svg) g.innerHTML = svg.innerHTML;
          fill.appendChild(g);
        }
        selected.classList.add('is-used');
        selected.setAttribute('aria-disabled', 'true');
        selected.classList.remove('is-selected');
        selected = null;
        placed++; tick(placed);
        noteStatus('In the ' + (bin.getAttribute('aria-label') || 'basket') + ' it goes!');
        const active = itemRounds[round];
        const remaining = active ? [...active.querySelectorAll('[data-sa-item]')].filter(x => !x.classList.contains('is-used')).length : 0;
        if (remaining === 0) {
          if (multi && round < itemRounds.length - 1) { round++; showRound(round); noteStatus('Lovely sorting — on to the next table!'); }
          else cheer();
        }
      } else {
        wiggle(bin);
        noteStatus(`Peek at your ${selected.getAttribute('data-item-label') || 'item'} — does it match the ${bin.getAttribute('aria-label')}? Look again!`);
      }
    }
    binRounds.forEach(group => {
      group.querySelectorAll('[data-sa-bin]').forEach(bin => {
        bin.addEventListener('click', () => binTap(bin));
        bin.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); binTap(bin); } });
      });
    });
    itemRounds.forEach(tab => {
      tab.querySelectorAll('[data-sa-item]').forEach(item => {
        item.addEventListener('click', () => {
          if (item.classList.contains('is-used')) return;
          if (selected === item) { item.classList.remove('is-selected'); selected = null; return; }
          $$('.sa-piece.is-selected').forEach(p => p.classList.remove('is-selected'));
          selected = item;
          item.classList.add('is-selected');
          noteStatus(`The ${item.getAttribute('data-item-label')} in your hand. Where does it go?`);
        });
        wireDrag(item, target => { if (target.hasAttribute('data-sa-bin')) binTap(target); });
      });
    });
  }

  /* ---------- builder ---------- */
  function builder() {
    const layers = {};
    $$('[data-sa-layer]').forEach(l => { layers[l.getAttribute('data-sa-layer')] = l; });
    const counts = {};
    const finish = $('[data-sa-finish]');
    state.total = 1;
    $$('[data-sa-part]').forEach(btn => {
      const key = btn.getAttribute('data-sa-part');
      const max = +btn.getAttribute('data-sa-max') || 1;
      counts[key] = 0;
      btn.addEventListener('click', () => {
        counts[key] = counts[key] + 1 > max ? 0 : counts[key] + 1;
        btn.setAttribute('aria-pressed', String(counts[key] > 0));
        const countEl = btn.querySelector('[data-sa-count]');
        if (countEl) countEl.textContent = `${counts[key]}/${max}`;
        const layer = layers[key];
        if (layer) layer.querySelectorAll('[data-sa-lcount]').forEach(g => {
          // SVG elements have no `hidden` property — use the attribute
          if (+g.getAttribute('data-sa-lcount') === counts[key]) g.removeAttribute('hidden');
          else g.setAttribute('hidden', '');
        });
        noteStatus(counts[key] ? 'Ooh, handsome! Keep going!' : 'Part off. The monster waits for more!');
      });
    });
    if (finish) finish.addEventListener('click', () => {
      const total = Object.values(counts).reduce((a, b) => a + b, 0);
      if (!total) { noteStatus('Add at least one part — tap a part button first!'); return; }
      cheer();
    });
  }

  /* ---------- symmetry ---------- */
  function symmetry() {
    const spots = $$('[data-sa-spot]');
    let selectedSpot = null;
    state.total = spots.length;
    spots.forEach(spot => {
      const tap = () => {
        if (spot.classList.contains('is-filled')) return;
        if (selectedSpot) selectedSpot.classList.remove('is-selected');
        selectedSpot = spot;
        spot.classList.add('is-selected');
        noteStatus('Spot picked. Now choose the color that matches its twin on the left.');
      };
      spot.addEventListener('click', tap);
      spot.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tap(); } });
    });
    $$('[data-sa-color]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!selectedSpot) { noteStatus('Tap an empty spot on the tail first.'); return; }
        const want = selectedSpot.getAttribute('data-spot-color');
        const got = btn.getAttribute('data-sa-color');
        if (got === want) {
          const circle = selectedSpot.querySelector('circle');
          if (circle) { circle.setAttribute('fill', want); circle.removeAttribute('stroke-dasharray'); }
          selectedSpot.classList.add('is-filled');
          selectedSpot.classList.remove('is-selected');
          selectedSpot = null;
          state.done++; tick(state.done);
          noteStatus('A perfect match!');
          if (state.done >= state.total) { root.classList.add('is-open'); cheer(); }
        } else {
          wiggle(selectedSpot);
          noteStatus('Peek at the matching spot on the left — the twin has the same color. Try again!');
        }
      });
    });
  }

  /* ---------- find ---------- */
  function find() {
    const rounds = $$('[data-sa-fround]');
    const objects = $$('[data-sa-find]');
    let round = 0, found = 0, solvedBefore = 0;
    const counts = rounds.map(r => +r.getAttribute('data-sa-fcount') || 0);
    state.total = counts.reduce((a, b) => a + b, 0);
    function note() {
      const r = rounds[round];
      if (!r) return;
      const ask = r.querySelector('.sa-ask');
      const p = r.querySelector('[data-sa-fprogress]');
      if (p) p.textContent = `Found ${found} of ${counts[round]}`;
      noteStatus((ask ? ask.textContent : '') + ` (${found} of ${counts[round]})`, false);
    }
    note();
    objects.forEach(obj => {
      const tap = () => {
        const r = rounds[round];
        if (!r) return;
        if (obj.classList.contains('is-found')) { noteStatus('You found that one already!'); return; }
        if (obj.getAttribute('data-sa-find') === r.getAttribute('data-sa-fshape')) {
          obj.classList.add('is-found');
          obj.setAttribute('aria-label', (obj.getAttribute('aria-label') || '') + ' — found!');
          found++;
          tick(solvedBefore + found);
          note();
          if (found >= counts[round]) {
            solvedBefore += counts[round];
            if (round < rounds.length - 1) { r.hidden = true; round++; found = 0; rounds[round].hidden = false; noteStatus('A clue! On to the next mystery.'); note(); }
            else cheer();
          }
        } else {
          wiggle(obj);
          noteStatus('A clue — but not the shape we need. Keep looking, detective!');
        }
      };
      obj.addEventListener('click', tap);
      obj.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tap(); } });
    });
  }

  try {
    if (engine === 'slotmatch') slotmatch();
    else if (engine === 'pattern') pattern();
    else if (engine === 'sort') sortGame();
    else if (engine === 'builder') builder();
    else if (engine === 'symmetry') symmetry();
    else if (engine === 'find') find();
  } catch (e) { /* the board stays visible; nothing else breaks */ }
})();
