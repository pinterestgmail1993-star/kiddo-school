/* Kiddo School — Writing Adventures engine (Class 27).
   A real on-screen tracing engine over server-rendered 1600×900 SVG boards.

   - Pointer Events only: finger, Apple Pencil / stylus, mouse, trackpad.
   - Strokes are SVG paths in the board's own coordinate system, read
     through getScreenCTM().inverse() per event — so drawing stays glued to
     the guides at any size, zoom, or device rotation.
   - Quadratic-midpoint smoothing; coalesced events for fast pens.
   - touch-action: none on the board prevents page scrolling mid-stroke.
   - Trace engine: generous coverage check (default 72% of guide samples
     within tolerance) — never pixel-perfect; completed guides turn the
     child's own pencil color.
   - Maze engine: one continuous route, start zone → end zone, and any
     crossing of a blue wall gently clears the attempt (no penalties).
   - Dots engine: connect numbered dots in order; the line flies itself.
   - Undo / Redo, tap-to-remove Eraser, Clear & retry, five pencil colors,
     two sizes, a Bigger board toggle.
   - Worksheets: "Download worksheet" renders a printable A-landscape sheet
     (title, instruction, the original artwork, a practice strip) to PNG;
     if the R2 image cannot be drawn (offline/CORS) a vector-only sheet is
     produced instead. "Download my drawing" exports the full board
     including the child's strokes.
   - Progress per selected child in the site's existing localStorage
     profile (kiddo-adventures.writing.opened / .completed) — the same
     store Classes 25 and 26 use; opening a page never marks completion.
   Without JavaScript every board shows its scene, guides, start dots and
   finish arrows, ready for paper practice. */
(() => {
  const root = document.querySelector('[data-wa-board]');
  const lib = document.querySelector('[data-wa-lib]');
  if (!root && !lib) return;
  if (typeof document.querySelectorAll !== 'function') return;

  /* ---------- shared kit ---------- */
  const store = {
    get(k, fb) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? fb : v; } catch (e) { return fb; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* full/private */ } }
  };
  const childKey = () => store.get('kiddo-active', null) || 'guest';
  const allProg = () => { const v = store.get('kiddo-adventures', null); return (v && typeof v === 'object') ? v : {}; };
  function markProg(kind, slug) {
    const all = allProg();
    const k = childKey();
    all[k] = all[k] || {};
    all[k].writing = all[k].writing || {};
    all[k].writing[kind] = all[k].writing[kind] || {};
    all[k].writing[kind][slug] = Date.now();
    store.set('kiddo-adventures', all);
    if (kind === 'completed') {
      try { window.dispatchEvent(new CustomEvent('kiddo-adventure-done', { detail: { section: 'writing', slug } })); } catch (e) { /* ok */ }
    }
  }

  /* ---------- library page ribbons ---------- */
  if (lib) {
    const done = (allProg()[childKey()] && allProg()[childKey()].writing && allProg()[childKey()].writing.completed) || {};
    lib.querySelectorAll('[data-wa-libcard]').forEach(card => {
      if (done[card.getAttribute('data-wa-libcard')]) {
        const badge = card.querySelector('[data-wa-done]');
        if (badge) badge.hidden = false;
        card.classList.add('is-done');
      }
    });
    return;
  }

  /* ---------- game board ---------- */
  const slug = root.getAttribute('data-wa-game');
  const engine = root.getAttribute('data-wa-engine');
  const tol = +root.getAttribute('data-wa-tol') || 50;
  const $ = s => root.querySelector(s);
  const $$ = s => [...root.querySelectorAll(s)];
  const svg = $('[data-wa-svg]');
  const ink = $('[data-wa-ink]');
  const statusEl = $('[data-sa-status]');
  const noteEl = $('[data-wa-note]');
  const cheerEl = $('[data-wa-cheer]');
  const againBtn = $('[data-wa-again]');
  const progressNote = $('[data-wa-progress]');
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  markProg('opened', slug);
  if (againBtn) {
    againBtn.hidden = false;
    againBtn.addEventListener('click', () => window.location.reload());
  }
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
  const status = (text, speak) => {
    if (statusEl) statusEl.textContent = text;
    if (speak !== false) talk(text);
  };
  function note(text) { if (noteEl) noteEl.textContent = text; }
  function progress(n, total, noun) {
    if (progressNote) progressNote.textContent = total ? `${n} of ${total} ${noun || 'lines'} done.` : '';
  }
  let finished = false;
  function cheer() {
    if (finished) return;
    finished = true;
    markProg('completed', slug);
    if (cheerEl) {
      cheerEl.hidden = false;
      if (!reduce) cheerEl.classList.add('is-on');
      cheerEl.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' });
    }
    status('You did it! Wonderful!');
    if (againBtn) againBtn.focus();
  }

  /* ---------- pencil state ---------- */
  const pencil = { color: '#3a3350', width: 10, eraser: false };
  $$('[data-wa-color]').forEach(btn => btn.addEventListener('click', () => {
    pencil.color = btn.getAttribute('data-wa-color');
    pencil.eraser = false;
    $$('[data-wa-color]').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    const er = $('[data-wa-eraser]');
    if (er) er.setAttribute('aria-pressed', 'false');
    root.classList.remove('is-erasing');
    status('Pencil ready!');
  }));
  $$('[data-wa-size]').forEach(btn => btn.addEventListener('click', () => {
    pencil.width = +btn.getAttribute('data-wa-size');
    $$('[data-wa-size]').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
  }));
  const eraserBtn = $('[data-wa-eraser]');
  if (eraserBtn) eraserBtn.addEventListener('click', () => {
    pencil.eraser = !pencil.eraser;
    eraserBtn.setAttribute('aria-pressed', String(pencil.eraser));
    root.classList.toggle('is-erasing', pencil.eraser);
    status(pencil.eraser ? 'Eraser on — tap a line to rub it out.' : 'Pencil ready!');
  });
  const bigBtn = $('[data-wa-big]');
  if (bigBtn) bigBtn.addEventListener('click', () => {
    const on = root.classList.toggle('is-big');
    bigBtn.setAttribute('aria-pressed', String(on));
    bigBtn.textContent = on ? 'Smaller board' : 'Bigger board';
  });

  /* ---------- ink strokes + undo/redo ---------- */
  const undoStack = [], redoStack = [];
  function addInk(d, animate) {
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', d);
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke', pencil.color);
    p.setAttribute('stroke-width', String(pencil.width));
    p.setAttribute('stroke-linecap', 'round');
    p.setAttribute('stroke-linejoin', 'round');
    p.setAttribute('data-wa-stroke', '');
    if (animate && !reduce) {
      const len = p.getTotalLength ? safeLen(p) : 0;
      if (len) {
        p.style.strokeDasharray = String(len);
        p.style.strokeDashoffset = String(len);
        p.style.transition = 'stroke-dashoffset 0.4s ease';
        requestAnimationFrame(() => { p.style.strokeDashoffset = '0'; });
        setTimeout(() => { p.style.strokeDasharray = ''; p.style.strokeDashoffset = ''; p.style.transition = ''; }, 600);
      }
    }
    ink.appendChild(p);
    return p;
  }
  function safeLen(p) { try { return p.getTotalLength(); } catch (e) { return 0; } }
  function removeInk(p) { if (p && p.parentNode) p.parentNode.removeChild(p); }
  function wireUndoRedo() {
    const u = $('[data-wa-undo]'), r = $('[data-wa-redo]');
    if (u) u.addEventListener('click', () => {
      const last = undoStack.pop();
      if (!last) { note('Nothing to undo.'); return; }
      removeInk(last.el);
      redoStack.push(last);
      note('Undid one line.');
    });
    if (r) r.addEventListener('click', () => {
      const next = redoStack.pop();
      if (!next) { note('Nothing to redo yet.'); return; }
      ink.appendChild(next.el);
      undoStack.push(next);
      note('Redid one line.');
    });
  }
  const clearBtn = $('[data-wa-clear]');
  if (clearBtn) clearBtn.addEventListener('click', () => {
    undoStack.length = 0; redoStack.length = 0;
    [...ink.children].forEach(removeInk);
    $$('[data-wa-guide]').forEach(g => {
      g.classList.remove('is-done');
      g.setAttribute('stroke', '#9aa5b1');
      g.setAttribute('stroke-dasharray', '16 14');
      g.removeAttribute('data-wa-done');
    });
    $$('[data-wa-start]').forEach(s => s.classList.remove('is-done'));
    guideDone.fill(false);
    guideCount = 0;
    progress(0, guideTotal);
    if (engine === 'dots') { dotNext = 0; dotsConnected = 0; $$('[data-wa-dot]').forEach(d => d.classList.remove('is-used')); }
    finished = false;
    if (cheerEl) cheerEl.hidden = true;
    note('Clean board — ready to trace again!');
    status('Let’s try again!');
  });

  /* ---------- geometry helpers ---------- */
  function toSVGPoint(evt) {
    const m = svg.getScreenCTM();
    if (!m) return null;
    const pt = new DOMPoint(evt.clientX, evt.clientY);
    const p = pt.matrixTransform(m.inverse());
    return { x: p.x, y: p.y };
  }
  function distToSegment(p, a, b) {
    const dx = b.x - a.x, dy = b.y - a.y;
    const l2 = dx * dx + dy * dy;
    if (!l2) return Math.hypot(p.x - a.x, p.y - a.y);
    let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
  }
  function guideSamples(pathEl, n) {
    const len = safeLen(pathEl);
    const pts = [];
    if (!len) return pts;
    for (let i = 0; i <= n; i++) {
      const p = pathEl.getPointAtLength(len * i / n);
      pts.push({ x: p.x, y: p.y });
    }
    return pts;
  }
  function strokeCovers(pts, samples, tolUnits) {
    if (!pts.length || !samples.length) return 0;
    let hit = 0;
    samples.forEach(sp => {
      let best = Infinity;
      for (let i = 1; i < pts.length; i++) {
        const d = distToSegment(sp, pts[i - 1], pts[i]);
        if (d < best) best = d;
        if (best <= tolUnits) break;
      }
      if (best <= tolUnits) hit++;
    });
    return hit / samples.length;
  }

  /* ---------- drawing layer ---------- */
  let pid = null, drawing = false, pts = [], dstr = '', moved = 0, startT = 0;
  function strokeColorForDraw() { return pencil.eraser ? 'rgba(0,0,0,0)' : pencil.color; }
  svg.addEventListener('pointerdown', evt => {
    if (pid !== null) return;
    pid = evt.pointerId;
    const p = toSVGPoint(evt);
    if (!p) { pid = null; return; }
    if (engine === 'dots') { pid = null; return; } // dots are tap-driven
    moved = 0; startT = Date.now();
    if (pencil.eraser) {
      // tap a stroke to remove it
      const target = evt.target.closest && evt.target.closest('[data-wa-stroke]');
      if (target) {
        undoStack.push({ el: target });
        removeInk(target);
        redoStack.length = 0;
        note('Rubbed out!');
      }
      pid = null;
      return;
    }
    drawing = true;
    pts = [p];
    dstr = `M${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    try { svg.setPointerCapture(pid); } catch (e) { /* drawing continues */ }
    evt.preventDefault();
  });
  svg.addEventListener('pointermove', evt => {
    if (!drawing || evt.pointerId !== pid) return;
    const evts = evt.getCoalescedEvents ? evt.getCoalescedEvents() : [evt];
    (evts.length ? evts : [evt]).forEach(ev => {
      const p = toSVGPoint(ev);
      if (!p) return;
      const last = pts[pts.length - 1];
      const dx = p.x - last.x, dy = p.y - last.y;
      if (dx * dx + dy * dy < 9) return;
      moved += Math.hypot(dx, dy);
      const mid = { x: (last.x + p.x) / 2, y: (last.y + p.y) / 2 };
      dstr += ` Q${last.x.toFixed(1)},${last.y.toFixed(1)} ${mid.x.toFixed(1)},${mid.y.toFixed(1)}`;
      pts.push(p);
    });
    evt.preventDefault();
  });
  function endStroke(evt) {
    if (!drawing || (evt && evt.pointerId !== undefined && evt.pointerId !== pid)) return;
    drawing = false; pid = null;
    if (pts.length < 2 || moved < 12) { pts = []; dstr = ''; return; } // ignore accidental taps
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', dstr);
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke', pencil.color);
    p.setAttribute('stroke-width', String(pencil.width));
    p.setAttribute('stroke-linecap', 'round');
    p.setAttribute('stroke-linejoin', 'round');
    p.setAttribute('data-wa-stroke', '');
    const record = { el: p, pts: pts.slice(), d: dstr };
    ink.appendChild(p);
    undoStack.push(record);
    redoStack.length = 0;
    if (undoStack.length > 80) undoStack.shift();
    evaluate(record);
    pts = []; dstr = '';
  }
  svg.addEventListener('pointerup', endStroke);
  svg.addEventListener('pointercancel', endStroke);
  svg.addEventListener('touchstart', e => { if (drawing) e.preventDefault(); }, { passive: false });

  /* ---------- trace engine ---------- */
  const guides = $$('[data-wa-guide]');
  const guideTotal = guides.length;
  let guideCount = 0;
  const guideDone = guides.map(() => false);
  progress(0, guideTotal);
  function evaluate(record) {
    if (engine === 'maze') { evaluateMaze(record); return; }
    if (engine === 'trace') evaluateTrace(record);
  }
  function evaluateTrace(record) {
    let newlyDone = 0;
    guides.forEach((g, i) => {
      if (guideDone[i]) return;
      const samples = guideSamples(g, 44);
      const cov = strokeCovers(record.pts, samples, tol + pencil.width * 0.5);
      if (cov >= 0.72) {
        guideDone[i] = true;
        g.classList.add('is-done');
        g.setAttribute('stroke', record.el.getAttribute('stroke'));
        g.removeAttribute('stroke-dasharray');
        g.setAttribute('data-wa-done', 'true');
        const start = $(`[data-wa-start="${i}"]`);
        if (start) start.classList.add('is-done');
        newlyDone++;
      }
    });
    if (newlyDone) {
      guideCount = guideDone.filter(Boolean).length;
      progress(guideCount, guideTotal);
      status(guideCount >= guideTotal ? 'Every line traced — magnificent!' : 'Great tracing! Keep going!');
      if (guideCount >= guideTotal) cheer();
    } else {
      status('Almost! Follow the dashed line from the green dot to the orange arrow.');
    }
  }

  /* ---------- maze engine ---------- */
  const wallEls = $$('[data-wa-wall]');
  const walls = wallEls.map(w => ({
    a: { x: +w.getAttribute('x1'), y: +w.getAttribute('y1') },
    b: { x: +w.getAttribute('x2'), y: +w.getAttribute('y2') }
  }));
  const ENTER = { x: 250, y: 450 }, EXIT = { x: 1350, y: 450 };
  function evaluateMaze(record) {
    const pts = record.pts;
    const first = pts[0], last = pts[pts.length - 1];
    // sample along every stroke segment (a fast mouse drag can vault a wall
    // between two pointer events — vertices alone would miss the crossing)
    const hitWall = walls.some(w => {
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i];
        const steps = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / 14));
        for (let k = 0; k <= steps; k++) {
          const p = { x: a.x + (b.x - a.x) * k / steps, y: a.y + (b.y - a.y) * k / steps };
          if (distToSegment(p, w.a, w.b) < 36) return true;
        }
      }
      return false;
    });
    if (hitWall) {
      removeInk(record.el);
      undoStack.pop();
      root.classList.add('is-oops');
      setTimeout(() => root.classList.remove('is-oops'), 500);
      status('Oops — that is a wall! Walls are friendly if you go around. Let’s try that line again.');
      return;
    }
    const near = (p, q, r) => Math.hypot(p.x - q.x, p.y - q.y) < r;
    if (near(last, EXIT, 140) && near(first, ENTER, 200)) {
      root.classList.add('is-solved');
      status('Through the maze — you found the bone!');
      cheer();
    } else if (near(first, ENTER, 200)) {
      status('Good start! Keep one steady line going all the way to the bone.');
    } else {
      status('Start at the puppy’s gate — the green dot on the left.');
    }
  }

  /* ---------- dots engine ---------- */
  let dotNext = 0, dotsConnected = 0;
  const dotData = JSON.parse(root.getAttribute('data-wa-dots-data') || '[]');
  const dotTotal = dotData.length;
  progress(0, dotTotal, 'dots');
  $$('[data-wa-dot]').forEach(dotEl => {
    const tap = () => {
      const i = +dotEl.getAttribute('data-wa-dot');
      if (i < dotNext) { status('That dot is already connected!'); return; }
      if (i !== dotNext) {
        dotEl.classList.add('is-wiggle');
        setTimeout(() => dotEl.classList.remove('is-wiggle'), 700);
        status(`We need dot ${dotNext + 1} next. Which one is it?`);
        return;
      }
      dotEl.classList.add('is-used');
      if (i > 0) {
        const prev = dotData[i - 1], cur = dotData[i];
        const line = `M${prev.x},${prev.y} L${cur.x},${cur.y}`;
        addInk(line, true);
      }
      dotNext++; dotsConnected++;
      progress(dotsConnected, dotTotal, 'dots');
      status(dotsConnected >= dotTotal ? 'Dot to dot complete!' : `Dot ${i + 1} connected! Next: dot ${dotNext + 1}.`);
      if (dotsConnected >= dotTotal) cheer();
    };
    dotEl.addEventListener('click', tap);
    dotEl.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tap(); } });
  });

  /* ---------- worksheets + my drawing ---------- */
  const titleText = (document.querySelector('h1') || { textContent: slug }).textContent;
  const instruction = (statusEl && $('[data-sa-status]') && $('[data-sa-status]').textContent) || '';
  function wrapText(c, text, x, y, maxW, lh) {
    const words = String(text).split(' ');
    let line = '', yy = y;
    words.forEach(w => {
      const test = line ? line + ' ' + w : w;
      if (c.measureText(test).width > maxW && line) { c.fillText(line, x, yy); line = w; yy += lh; }
      else line = test;
    });
    if (line) c.fillText(line, x, yy);
    return yy;
  }
  async function renderWorksheet(withArt) {
    const W = 1750, H = 1350;
    const canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    const c = canvas.getContext('2d');
    c.fillStyle = '#ffffff';
    c.fillRect(0, 0, W, H);
    c.fillStyle = '#3a3350';
    c.font = '700 64px Georgia, serif';
    c.fillText(titleText, 70, 110);
    c.font = '34px Georgia, serif';
    c.fillStyle = '#6b6480';
    wrapText(c, 'kiddo-school.pages.dev · Early Writing & Pencil Control · Class 27', 70, 160, W - 140, 42);
    c.fillStyle = '#3a3350';
    c.font = '40px Georgia, serif';
    const afterInstr = wrapText(c, $('[data-sa-status]') ? $('[data-sa-status]').textContent : '', 70, 230, W - 140, 52);
    let drew = false;
    if (withArt) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      const url = root.getAttribute('data-wa-art') || '';
      const loaded = await new Promise(res => {
        if (!url) return res(false);
        img.onload = () => res(true);
        img.onerror = () => res(false);
        img.src = url;
        setTimeout(() => res(false), 6000);
      });
      if (loaded) {
        const aw = 1500, ah = aw * (img.naturalHeight / img.naturalWidth);
        c.drawImage(img, (W - aw) / 2, afterInstr + 30, aw, ah);
        c.strokeStyle = '#d9d2e8';
        c.lineWidth = 3;
        c.strokeRect((W - aw) / 2, afterInstr + 30, aw, ah);
        drew = true;
      }
    }
    if (!drew) {
      // vector fallback: big dashed guides to trace with a pencil
      const boxY = afterInstr + 30;
      c.strokeStyle = '#cfc8dd';
      c.lineWidth = 3;
      c.strokeRect(70, boxY, W - 140, 760);
      c.fillStyle = '#9aa5b1';
      c.font = '32px Georgia, serif';
      c.fillText('Trace the dashed lines with your pencil:', 100, boxY + 60);
      const guides = $$('[data-wa-guide]');
      const gx = 100, gy = boxY + 90, gw = (W - 200 - 40) / Math.max(1, Math.min(3, guides.length));
      const perRow = Math.min(3, guides.length || 1);
      guides.forEach((g, i) => {
        const p = new Path2D(g.getAttribute('d'));
        const bb = pathBBox(g);
        const scale = Math.min((gw - 30) / Math.max(bb.w, 10), 560 / Math.max(bb.h, 10), 1.2);
        c.save();
        c.translate(gx + (i % perRow) * gw + 15, gy + Math.floor(i / perRow) * 300);
        c.scale(scale, scale);
        c.translate(-bb.x, -bb.y);
        c.strokeStyle = '#b9c2cb';
        c.lineWidth = 8 / scale;
        c.setLineDash([18, 14]);
        c.stroke(p);
        c.setLineDash([]);
        c.restore();
      });
    }
    // practice strip
    c.strokeStyle = '#d9d2e8';
    c.lineWidth = 3;
    c.strokeRect(70, H - 180, W - 140, 120);
    c.fillStyle = '#9aa5b1';
    c.font = '30px Georgia, serif';
    c.fillText('My best work:', 90, H - 130);
    return canvas;
  }
  function pathBBox(pathEl) {
    const pts = guideSamples(pathEl, 60);
    const xs = pts.map(p => p.x), ys = pts.map(p => p.y);
    const x = Math.min(...xs), y = Math.min(...ys);
    return { x, y, w: Math.max(...xs) - x || 100, h: Math.max(...ys) - y || 100 };
  }
  function download(canvas, name) {
    canvas.toBlob(b => {
      if (!b) { note('Saving did not work this time. Try again!'); return; }
      const a = document.createElement('a');
      a.href = URL.createObjectURL(b);
      a.download = name;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      note('Saved! Check your files for ' + name + '.');
    }, 'image/png');
  }
  const wsBtn = $('[data-wa-worksheet]');
  if (wsBtn) wsBtn.addEventListener('click', async () => {
    note('Making your worksheet…');
    const canvas = await renderWorksheet(true);
    download(canvas, slug + '-worksheet.png');
  });
  const myBtn = $('[data-wa-mydrawing]');
  if (myBtn) myBtn.addEventListener('click', () => {
    try {
      const clone = svg.cloneNode(true);
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      clone.setAttribute('width', '1600');
      clone.setAttribute('height', '900');
      const str = new XMLSerializer().serializeToString(clone);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1600; canvas.height = 900;
        const c = canvas.getContext('2d');
        c.fillStyle = '#ffffff';
        c.fillRect(0, 0, 1600, 900);
        c.drawImage(img, 0, 0, 1600, 900);
        download(canvas, 'my-' + slug + '-drawing.png');
      };
      img.onerror = () => note('Saving did not work this time. Try again!');
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(str);
    } catch (e) { note('Saving did not work this time. Try again!'); }
  });

  /* ---------- boot ---------- */
  root.setAttribute('data-wa-ready', 'true');
  wireUndoRedo();
  if (engine === 'dots') status('Tap dot 1 to begin!');
  else if (engine === 'maze') status('Start at the puppy’s gate — the green dot on the left.');
  else status('Start at the green dot and follow the dashed line!');
})();
