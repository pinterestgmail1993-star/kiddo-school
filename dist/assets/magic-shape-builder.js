/* Kiddo School — Magic Shape Builder v2 (Age 3): pick a design, build it
   piece by piece. The board shows ONE empty spot at a time — big, drawn in
   the piece's color, labeled with its shape word — so the picture emerges
   piece by piece beside the real reference. Tap-to-place for touch, mouse
   and keyboard (every piece and the current spot are real buttons), plus
   pointer-drag onto the board. A piece only fits a spot with the SAME shape
   AND color; a wrong tap gets a gentle sentence and, after two tries, a
   quiet hint that points at the piece which fits. Finishing a build marks
   it done (localStorage, this device only) and unlocks the next design.
   No scores, no timers. Progressive enhancement only: without JavaScript
   every board renders as its finished shape picture beside the reference.
   Animations respect body.calm-mode and prefers-reduced-motion via the
   shared CSS gates in style.css. */
(() => {
  const game = document.querySelector('[data-mg-game="shape-builder"]');
  if (!game) return;
  const $ = (sel, el) => (el || game).querySelector(sel);
  const $$ = (sel, el) => [...(el || game).querySelectorAll(sel)];
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const originalHTML = game.innerHTML;
  const live = $('[data-mg-live]');
  const KEY = 'kiddo-shape-builds';

  /* ---------- tiny storage (which designs were built, nothing else) ---------- */
  function built() {
    try { const v = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(v) ? v.filter(x => typeof x === 'string') : []; }
    catch (e) { return []; }
  }
  function markBuilt(slug) {
    const list = built();
    if (!list.includes(slug)) { list.push(slug); try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) { /* private mode */ } }
  }

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
    if (document.body.classList.contains('lwy-quiet')) return; // Learning Your Way: prefer quiet
    try {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.85; u.pitch = 1.15;
      window.speechSynthesis.speak(u);
    } catch (e) { /* written words carry it */ }
  }

  /* ---------- choose screen: unlock progression ---------- */
  function paintChoose() {
    const done = built();
    let allDone = true;
    $$('[data-sb-design]').forEach(tile => {
      const slug = tile.getAttribute('data-sb-design');
      const requires = tile.getAttribute('data-sb-requires');
      const isDone = done.includes(slug);
      const locked = requires && !done.includes(requires);
      tile.classList.toggle('is-built', isDone);
      tile.classList.toggle('is-locked', !!locked);
      tile.disabled = !!locked;
      let sub = tile.querySelector('.sb-tile-sub');
      const base = sub.getAttribute('data-base') || sub.textContent;
      sub.setAttribute('data-base', base);
      if (locked) sub.textContent = 'Unlocks after the ' + tile.getAttribute('data-sb-requires-name').toLowerCase() + ' — build it first!';
      else if (isDone) sub.textContent = base + ' · built — build it again!';
      else sub.textContent = base;
      if (!isDone) allDone = false;
    });
    const note = $('[data-sb-choose-note]');
    if (note && allDone && done.length) note.textContent = 'You built every picture in the set! Any of them will happily be built again.';
  }

  /* ---------- one build board ---------- */
  function wireBuild(section) {
    const board = $('[data-sb-board]', section);
    const tray = $('[data-sb-tray]', section);
    const status = $('[data-sb-status]', section);
    const progress = $('[data-sb-progress]', section);
    if (!board || !tray || !status) return;
    const build = section.getAttribute('data-sb-build');
    const boxes = $$('[data-sb-slot]', board);      // placement order == DOM order
    const pieces = $$('[data-sb-piece]', tray);
    let idx = 0, misses = 0, picked = null;
    const TOTAL = boxes.length;

    const current = () => boxes[idx] || null;
    function paint() {
      boxes.forEach((b, i) => {
        b.classList.toggle('is-done', i < idx);
        b.classList.toggle('is-current', i === idx);
        b.setAttribute('aria-hidden', i === idx ? 'false' : 'true');
        b.setAttribute('tabindex', i === idx ? '0' : '-1');
        b.setAttribute('aria-label', 'Spot ' + (i + 1) + ' of ' + TOTAL + ': the ' + b.getAttribute('data-sb-color-name') + ' ' + b.getAttribute('data-sb-slot') + (i === idx ? ' — tap here to place your piece' : ''));
      });
      if (progress) progress.textContent = idx === TOTAL ? 'All ' + TOTAL + ' shapes placed!' : idx + ' of ' + TOTAL + ' shapes placed';
      pieces.forEach(p => {
        const used = !!p.getAttribute('data-sb-used');
        p.classList.toggle('is-used', used);
        p.disabled = !!used;
        p.setAttribute('aria-pressed', picked === p ? 'true' : 'false');
      });
    }
    function setStatus(t) { status.textContent = t; }
    function resetStatus() { setStatus('Tap a colorful piece below, then tap its spot on the board.'); }
    function clearPulse() { pieces.forEach(p => p.classList.remove('is-hint')); }

    function place() {
      const box = current(); if (!box || !picked) return;
      idx += 1;
      picked.setAttribute('data-sb-used', '1');
      picked = null; misses = 0; clearPulse();
      const name = box.getAttribute('data-sb-slot');
      paint();
      if (idx === TOTAL) {
        setStatus('You built the ' + build + '! Look at it shine!');
        talk('You built the ' + build + '! Great building!');
        markBuilt(build);
        if (!reduce) { board.classList.remove('is-cheer'); void board.offsetWidth; board.classList.add('is-cheer'); }
        const next = section.querySelector('[data-mg-go="choose"]');
        if (next) { next.hidden = false; next.focus({ preventScroll: true }); }
        paintChoose();
      } else {
        setStatus('A ' + name + ' placed! ' + (TOTAL - idx) + (TOTAL - idx === 1 ? ' shape' : ' shapes') + ' to go.');
        talk('A ' + name + '!');
      }
    }
    function tryPlace(piece) {
      const box = current(); if (!box || !piece) return;
      const wantShape = box.getAttribute('data-sb-slot');
      const wantColor = box.getAttribute('data-sb-color-name');
      const gotShape = piece.getAttribute('data-sb-piece');
      const gotColor = piece.getAttribute('data-sb-piece-color-name');
      const wantHex = box.getAttribute('data-sb-color');
      const gotHex = piece.getAttribute('data-sb-piece-color');
      if (gotShape === wantShape && gotHex === wantHex) { place(); return; }
      misses += 1; clearPulse();
      if (gotShape !== wantShape) {
        setStatus('A ' + gotShape + ' does not fit here — this spot wants a ' + wantShape + '. Look for the ' + wantColor + ' ' + wantShape + '!');
        talk('This spot wants a ' + wantShape + '. Find the ' + wantColor + ' ' + wantShape + '!');
      } else {
        setStatus('Almost — this spot wants the ' + wantColor + ' one. Can you find the ' + wantColor + ' ' + wantShape + '?');
        talk('Find the ' + wantColor + ' ' + wantShape + '!');
      }
      if (misses >= 2) {
        const fit = pieces.find(p => !p.disabled && p.getAttribute('data-sb-piece') === wantShape && p.getAttribute('data-sb-piece-color') === box.getAttribute('data-sb-color'));
        if (fit) fit.classList.add('is-hint');
      }
    }

    pieces.forEach(piece => {
      /* tap-to-place */
      piece.addEventListener('click', () => {
        if (piece.disabled) return;
        clearPulse();
        if (picked === piece) { picked = null; paint(); resetStatus(); return; }
        picked = piece; paint();
        const label = piece.querySelector('span').textContent.toLowerCase();
        setStatus('A ' + label + '! Now tap its spot on the board — or drag it there.');
        talk('A ' + label + '! Now find its spot.');
      });
      /* drag onto the board */
      let dragging = false, moved = false, start = null;
      piece.addEventListener('pointerdown', e => {
        if (piece.disabled) return;
        dragging = true; moved = false; start = { x: e.clientX, y: e.clientY };
        try { piece.setPointerCapture(e.pointerId); } catch (err) { /* virtual pointers */ }
      });
      piece.addEventListener('pointermove', e => {
        if (!dragging) return;
        const dx = e.clientX - start.x, dy = e.clientY - start.y;
        if (!moved && Math.hypot(dx, dy) > 8) { moved = true; piece.classList.add('is-drag'); }
        if (moved) {
          piece.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(1.08)';
          board.classList.toggle('is-target', true);
        }
      });
      const up = e => {
        if (!dragging) return;
        dragging = false;
        piece.classList.remove('is-drag');
        piece.style.transform = '';
        board.classList.remove('is-target');
        if (moved) {
          const rect = board.getBoundingClientRect();
          const over = e.clientX > rect.left && e.clientX < rect.right && e.clientY > rect.top && e.clientY < rect.bottom;
          if (over) {
            picked = piece;
            tryPlace(piece);
            setTimeout(() => { picked = null; }, 40);
          }
          moved = false;
        }
      };
      piece.addEventListener('pointerup', up);
      piece.addEventListener('pointercancel', up);
    });

    /* tapping the current spot places the picked piece */
    boxes.forEach(box => {
      box.setAttribute('role', 'button');
      box.addEventListener('click', () => {
        if (box !== current()) return;
        if (!picked) { setStatus('First tap a colorful piece below, then tap its spot here.'); return; }
        tryPlace(picked);
      });
    });

    const reset = section.querySelector('[data-sb-reset]');
    if (reset) reset.addEventListener('click', () => {
      idx = 0; misses = 0; picked = null; clearPulse();
      pieces.forEach(p => p.removeAttribute('data-sb-used'));
      board.classList.remove('is-cheer');
      paint(); resetStatus();
    });

    paint(); resetStatus();
  }

  /* ---------- boot / replay ---------- */
  function wire() {
    screens = $$('[data-mg-screen]');
    wireGo();
    paintChoose();
    $$('[data-sb-build]').forEach(wireBuild);
  }
  game.classList.add('sb-live'); // switches boards from finished picture to game mode
  wire();
  show('welcome', false);
  game.addEventListener('click', e => {
    if (e.target.closest('[data-mg-replay]')) {
      game.innerHTML = originalHTML;
      game.classList.add('sb-live');
      wire();
      show('welcome', false);
      if (live) live.textContent = '';
    }
  });
})();
