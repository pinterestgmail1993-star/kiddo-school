/* Kiddo School — Story & Logic Adventures engine (Classes 29 & 30).
   One engine drives every game: the server renders each step (prompt,
   picture cards sprite-cropped from the real adventure artwork), and this
   script wires the play:
     ask    — tap the picture that answers the spoken question
     order  — tap the pictures in story/route order (numbered badges)
     match  — tap one card from each side that belong together
   plus the Squirrel's Acorn Maze: a real pointer-traced maze with walls
   (finger, stylus or mouse; the line stops at walls and can be redrawn).
   Speech: window.speechSynthesis for prompts and praise (a "Listen again"
   button repeats the current prompt), a remembered mute switch, and respect
   for the Learning Your Way quiet preference. Progress saves per selected
   child in the site's existing localStorage store — the same one Classes
   25–28 use. Opening a page never counts; only real completion saves. */
(() => {
  const board = document.querySelector('[data-st-board]');
  const maze = document.querySelector('[data-st-maze]');
  if (!board && !maze) return;
  if (typeof document.querySelectorAll !== 'function') return;
  const band = board ? board.dataset.stBand : 'logic';
  const slug = board ? board.dataset.stGame : (maze ? (maze.closest('[data-st-board]') || {}).dataset : '').slug || document.body.dataset.stGame || 'maze';
  const cfg = board ? JSON.parse(board.dataset.stConfig || '{}') : { speak: [] };

  const store = {
    get(k, fb) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? fb : v; } catch (e) { return fb; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } }
  };

  /* ---------- audio ---------- */
  let muted = store.get('kiddo-st-mute', false);
  const muteBtn = board ? board.querySelector('[data-st-mute]') : null;
  const syncMute = () => { if (muteBtn) { muteBtn.textContent = muted ? 'Sound: off' : 'Sound: on'; muteBtn.setAttribute('aria-pressed', String(muted)); } };
  syncMute();
  if (muteBtn) muteBtn.addEventListener('click', () => { muted = !muted; store.set('kiddo-st-mute', muted); syncMute(); });

  function voice(text) {
    if (muted || document.body.classList.contains('lwy-quiet')) return;
    try {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.82; u.pitch = 1.12;
      window.speechSynthesis.speak(u);
    } catch (e) { /* written words carry it */ }
  }
  const replayBtn = board ? board.querySelector('[data-st-replay]') : null;
  if (replayBtn) replayBtn.addEventListener('click', () => voice(speakNow));

  /* ---------- progress + completion ---------- */
  const progressEl = board ? board.querySelector('[data-st-progress]') : null;
  const hintEl = board ? board.querySelector('[data-st-hint]') : null;
  const restartBtn = board ? board.querySelector('[data-st-restart]') : null;
  const steps = board ? Array.from(board.querySelectorAll('[data-st-step]')) : [];
  let step = 0, speakNow = cfg.speak && cfg.speak[0] || '';
  const note = t => { if (progressEl) progressEl.textContent = t; };
  const hint = t => { if (hintEl) hintEl.textContent = t; };

  function saveOpen() {
    const all = store.get('kiddo-adventures', {});
    const child = store.get('kiddo-active', null) || 'guest';
    const me = all[child] = all[child] || {};
    const b = me[band] = me[band] || { opened: {}, completed: {} };
    b.opened[slug] = Date.now();
    store.set('kiddo-adventures', all);
  }
  function saveComplete() {
    const all = store.get('kiddo-adventures', {});
    const child = store.get('kiddo-active', null) || 'guest';
    const me = all[child] = all[child] || {};
    const b = me[band] = me[band] || { opened: {}, completed: {} };
    b.completed[slug] = Date.now();
    b.opened[slug] = b.opened[slug] || Date.now();
    store.set('kiddo-adventures', all);
    document.dispatchEvent(new CustomEvent('kiddo-adventure-done', { detail: { band, slug } }));
  }
  function celebrate() {
    const el = board.querySelector('[data-sa-cheer]');
    if (el) { el.hidden = false; el.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
    saveComplete();
    if (restartBtn) restartBtn.hidden = false;
  }
  function showStep(i) {
    step = i;
    steps.forEach((s, j) => { s.hidden = j !== i; });
    note('Step ' + (i + 1) + ' of ' + steps.length);
    speakNow = (cfg.speak && cfg.speak[i]) || '';
    hint('');
    const st = steps[i];
    if (st && st.dataset.stType === 'order') expected = 0;
    voice(speakNow);
  }

  /* ---------- card interactions ---------- */
  const PRAISE = ['Lovely!', 'That\u2019s it!', 'Wonderful!', 'Great thinking!', 'You found it!'];
  const praise = () => PRAISE[Math.floor(Math.random() * PRAISE.length)];
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  let expected = 0; // order-type progress within the current step

  function wireStep(st) {
    const type = st.dataset.stType;
    const cards = Array.from(st.querySelectorAll('[data-st-card]'));
    // server pre-marks shuffled steps: the engine shuffles DOM order once
    if (!st.dataset.wired) {
      st.dataset.wired = '1';
      if (st.dataset.stShuffle === '1') shuffle(cards).forEach(c => st.querySelector('.st-tray').appendChild(c));
    }
    if (type === 'match') {
      let picked = null;
      cards.forEach(c => c.addEventListener('click', () => {
        if (c.classList.contains('st-locked')) return;
        const group = c.dataset.stGroup;
        if (!picked) {
          picked = c; c.classList.add('st-picked');
          hint('Now tap its partner' + (group === 'a' ? ' on the right.' : ' on the left.'));
          voice(c.dataset.stSay || c.dataset.stCard);
          return;
        }
        if (picked === c) { picked.classList.remove('st-picked'); picked = null; return; }
        if (picked.dataset.stGroup === group) {
          picked.classList.remove('st-picked'); picked = c; c.classList.add('st-picked');
          hint('Now tap its partner on the other side.');
          return;
        }
        if (picked.dataset.stPair === c.dataset.stPair) {
          picked.classList.remove('st-picked');
          picked.classList.add('st-locked'); c.classList.add('st-locked');
          const say = c.dataset.stSay || picked.dataset.stSay;
          voice(say || praise()); note(praise() + ' Pair joined!');
          picked = null;
          if (st.querySelectorAll('.st-locked').length === cards.length) {
            setTimeout(() => { if (step < steps.length - 1) showStep(step + 1); else celebrate(); }, 650);
          }
        } else {
          picked.classList.add('st-miss'); c.classList.add('st-miss');
          setTimeout(() => { picked && picked.classList.remove('st-miss'); c.classList.remove('st-miss'); }, 700);
          hint('Those two don\u2019t belong together \u2014 look again.');
          picked = null;
        }
      }));
      return;
    }
    if (type === 'find') {
      // spot-the-difference: tap each difference on Picture 2; rings count up
      const found = new Set();
      const hots = Array.from(st.querySelectorAll('.st-hot'));
      const countEl = st.querySelector('[data-st-findcount]');
      const total = hots.length;
      const sync = () => { if (countEl) countEl.textContent = found.size + ' of ' + total + ' found'; };
      hots.forEach(h => h.addEventListener('click', () => {
        if (h.classList.contains('st-found')) return;
        h.classList.add('st-found');
        found.add(h);
        voice(h.dataset.stSay || praise());
        sync();
        if (found.size === total) setTimeout(() => { if (step < steps.length - 1) showStep(step + 1); else celebrate(); }, 850);
      }));
      const sceneImg = st.querySelector('.st-scene-img');
      if (sceneImg) sceneImg.addEventListener('click', e => {
        if (e.target.closest('.st-hot')) return;
        hint('Look closely \u2014 tap what is different in Picture 2!');
      });
      return;
    }
    cards.forEach(c => c.addEventListener('click', () => {
      if (c.classList.contains('st-locked')) return;
      const say = c.dataset.stSay;
      if (type === 'order') {
        if (c.dataset.stBad) {
          c.classList.add('st-miss');
          setTimeout(() => c.classList.remove('st-miss'), 700);
          voice(say || 'Not on this path!');
          hint('Not that one \u2014 follow the key!');
          return;
        }
        const seq = Number(c.dataset.stSeq);
        if (seq === expected) {
          expected++;
          c.classList.add('st-locked');
          const badge = c.querySelector('.st-badge');
          if (badge) { badge.hidden = false; badge.textContent = String(expected); }
          voice(say || praise());
          note(praise() + ' ' + expected + ' of ' + cards.filter(x => x.dataset.stSeq !== undefined && !x.dataset.stBad).length);
          const total = cards.filter(x => x.dataset.stSeq !== undefined && !x.dataset.stBad).length;
          if (expected === total) setTimeout(() => { if (step < steps.length - 1) showStep(step + 1); else celebrate(); }, 700);
        } else {
          c.classList.add('st-miss');
          setTimeout(() => c.classList.remove('st-miss'), 700);
          voice(say || 'Look at the story again!');
          hint(seq < expected ? 'You already found that one\u2019s place \u2014 what comes next?' : 'Not yet \u2014 what happened next?');
        }
        return;
      }
      // ask
      if (c.dataset.stOk === '1') {
        c.classList.add('st-locked');
        voice(say || praise());
        setTimeout(() => { if (step < steps.length - 1) showStep(step + 1); else celebrate(); }, 750);
      } else {
        c.classList.add('st-miss');
        setTimeout(() => c.classList.remove('st-miss'), 700);
        voice(say || 'Look again!');
        hint('Try again \u2014 look closely.');
      }
    }));
  }

  if (board && steps.length) {
    saveOpen();
    steps.forEach(wireStep);
    showStep(0);
    if (restartBtn) restartBtn.addEventListener('click', () => {
      board.querySelectorAll('.st-locked,.st-picked,.st-miss').forEach(el => el.classList.remove('st-locked', 'st-picked', 'st-miss'));
      board.querySelectorAll('.st-badge').forEach(b => { b.hidden = true; b.textContent = ''; });
      showStep(0);
    });
  }

  /* ---------- the acorn maze (Class 30 · 04) ---------- */
  if (maze) {
    const boardEl = maze.closest('[data-st-board]') || maze.parentElement;
    const mSlug = (boardEl && boardEl.dataset.stGame) || 'squirrels-acorn-maze';
    const mBand = (boardEl && boardEl.dataset.stBand) || 'logic';
    const cell = Number(maze.dataset.mazeCell), cols = Number(maze.dataset.mazeCols), rows = Number(maze.dataset.mazeRows);
    const start = maze.dataset.mazeStart.split(',').map(Number);
    const goal = maze.dataset.mazeGoal.split(',').map(Number);
    const trail = maze.querySelector('.lz-trail');
    const marker = maze.querySelector('.lz-marker');
    const wallW = 9 / 2 + 1; // half wall width + slop
    // build wall list in SVG coords from the server-rendered path
    const walls = [];
    maze.querySelectorAll('path')[0].getAttribute('d').split('M').slice(1).forEach(seg => {
      const pts = seg.trim().replace(/L/, ' ').split(/\s+|,/).filter(Boolean).map(Number);
      walls.push([pts[0], pts[1], pts[2], pts[3]]);
    });
    const crosses = (x1, y1, x2, y2) => {
      for (const w of walls) {
        if (segCross(x1, y1, x2, y2, w[0], w[1], w[2], w[3], wallW)) return true;
      }
      return x1 < wallW || y1 < wallW || x2 < wallW || y2 < wallW ||
        x1 > cols * cell - wallW || y1 > rows * cell - wallW || x2 > cols * cell - wallW || y2 > rows * cell - wallW;
    };
    function segCross(ax, ay, bx, by, cx, cy, dx, dy, pad) {
      // distance from segment AB to segment CD < pad => blocked (walls are axis-aligned; simplify to endpoints + midpoint sampling)
      const steps = 6;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps, px = ax + (bx - ax) * t, py = ay + (by - ay) * t;
        if (distToSeg(px, py, cx, cy, dx, dy) < pad) return true;
      }
      return false;
    }
    function distToSeg(px, py, x1, y1, x2, y2) {
      const dx = x2 - x1, dy = y2 - y1, L2 = dx * dx + dy * dy;
      let t = L2 ? ((px - x1) * dx + (py - y1) * dy) / L2 : 0;
      t = Math.max(0, Math.min(1, t));
      const qx = x1 + dx * t, qy = y1 + dy * t;
      return Math.hypot(px - qx, py - qy);
    }
    const mNote = boardEl ? boardEl.querySelector('[data-st-progress]') : null;
    const mHint = boardEl ? boardEl.querySelector('[data-st-hint]') : null;
    const mRestart = boardEl ? boardEl.querySelector('[data-st-restart]') : null;
    if (mNote) mNote.textContent = 'Draw from the squirrel to the golden acorn.';
    const setMarker = (x, y) => { marker.setAttribute('transform', 'translate(' + x + ',' + y + ')'); };
    let drawing = false, pts = [], saved = null, done = false;
    const pt = svg => { const r = svg.getBoundingClientRect(); const sx = r.width / (cols * cell + 40), sy = r.height / (rows * cell + 40); return e => { const t = svg.createSVGPoint(); t.x = e.clientX; t.y = e.clientY; const p = t.matrixTransform(svg.getScreenCTM().inverse()); return p; }; };
    const localPt = svg => e => { const t = svg.createSVGPoint(); t.x = e.clientX; t.y = e.clientY; return t.matrixTransform(svg.getScreenCTM().inverse()); };
    const openSave = () => {
      const all = store.get('kiddo-adventures', {});
      const child = store.get('kiddo-active', null) || 'guest';
      const me = all[child] = all[child] || {};
      const b = me[mBand] = me[mBand] || { opened: {}, completed: {} };
      b.opened[mSlug] = Date.now();
      store.set('kiddo-adventures', all);
    };
    openSave();
    const redraw = () => { trail.setAttribute('d', pts.length ? 'M' + pts.map(p => p.x.toFixed(1) + ',' + p.y.toFixed(1)).join(' L') : ''); };
    const reset = () => { pts = []; redraw(); done = false; const s = { x: start[0] * cell + cell / 2, y: start[1] * cell + cell / 2 }; setMarker(s.x, s.y); if (mHint) mHint.textContent = ''; };
    const goalXY = { x: goal[0] * cell + cell / 2, y: goal[1] * cell + cell / 2 };
    const finish = () => {
      done = true;
      if (mHint) mHint.textContent = '';
      if (mNote) mNote.textContent = 'You reached the golden acorn!';
      const cheer = boardEl.querySelector('[data-sa-cheer]');
      if (cheer) { cheer.hidden = false; cheer.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
      const all = store.get('kiddo-adventures', {});
      const child = store.get('kiddo-active', null) || 'guest';
      const me = all[child] = all[child] || {};
      const b = me[mBand] = me[mBand] || { opened: {}, completed: {} };
      b.completed[mSlug] = Date.now();
      store.set('kiddo-adventures', all);
      document.dispatchEvent(new CustomEvent('kiddo-adventure-done', { detail: { band: mBand, slug: mSlug } }));
      if (mRestart) mRestart.hidden = false;
    };
    reset();
    maze.addEventListener('pointerdown', e => {
      if (done) return;
      drawing = true; pts = [];
      maze.setPointerCapture && maze.setPointerCapture(e.pointerId);
      const p = localPt(maze)(e);
      pts.push({ x: start[0] * cell + cell / 2, y: start[1] * cell + cell / 2 });
      if (!crosses(pts[0].x, pts[0].y, p.x, p.y)) pts.push({ x: p.x, y: p.y });
      redraw(); e.preventDefault();
    });
    maze.addEventListener('pointermove', e => {
      if (!drawing || done) return;
      const p = localPt(maze)(e);
      const last = pts[pts.length - 1];
      if (crosses(last.x, last.y, p.x, p.y)) {
        // stop at the wall: keep the line, lift the pen
        drawing = false;
        if (mHint) mHint.textContent = 'Oops \u2014 that\u2019s a wall! Start again from the squirrel.';
        return;
      }
      pts.push({ x: p.x, y: p.y }); redraw();
      setMarker(p.x, p.y);
      if (Math.hypot(p.x - goalXY.x, p.y - goalXY.y) < cell * 0.55) { drawing = false; finish(); }
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => maze.addEventListener(ev, () => { drawing = false; }));
    maze.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
    if (mRestart) mRestart.addEventListener('click', () => {
      const cheer = boardEl.querySelector('[data-sa-cheer]');
      if (cheer) cheer.hidden = true;
      if (mRestart) mRestart.hidden = true;
      reset();
    });
  }
})();
