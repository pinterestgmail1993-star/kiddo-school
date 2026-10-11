/* Kiddo School — My Work: real drawing + tracing + the School Bag.
   Pointer events for finger/touch/mouse/trackpad, high-DPI aware, smooth
   strokes, drawing preserved across resizes (strokes are stored normalized).
   Creations are saved to IndexedDB on this device only (window.KiddoBag). */
(() => {
  const $ = (sel, el) => (el || document).querySelector(sel);
  const $$ = (sel, el) => [...(el || document).querySelectorAll(sel)];
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const Bag = window.KiddoBag; // storage engine lives in kiddo-bag.js
  const LIMIT = (Bag && Bag.limit) || 20;

  /* ------------------------------------------------------ canvas painter */
  // One self-contained drawing surface: buffered at devicePixelRatio, strokes
  // stored in normalized coordinates so the picture survives resize.
  function makePainter(canvas, opts) {
    opts = opts || {};
    const ctx = canvas.getContext('2d');
    const strokes = [];
    let w = 0, h = 0, active = null;
    let color = opts.color || '#343b30';
    let size = opts.size || 14;
    let tool = opts.tool || 'draw';
    let onChange = null;
    function sizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return false;
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return true;
    }
    function paintStroke(s) {
      const pts = s.pts;
      if (!pts.length) return;
      ctx.lineJoin = 'round'; ctx.lineCap = 'round';
      ctx.globalCompositeOperation = s.tool === 'eraser' ? 'destination-out' : 'source-over';
      ctx.strokeStyle = s.color; ctx.fillStyle = s.color;
      ctx.lineWidth = s.size;
      if (pts.length === 1) { // a single dot
        ctx.beginPath();
        ctx.arc(pts[0][0] * w, pts[0][1] * h, s.size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
        return;
      }
      ctx.beginPath();
      ctx.moveTo(pts[0][0] * w, pts[0][1] * h);
      for (let i = 1; i < pts.length - 1; i++) { // smooth: curve through midpoints
        ctx.quadraticCurveTo(pts[i][0] * w, pts[i][1] * h, (pts[i][0] + pts[i + 1][0]) / 2 * w, (pts[i][1] + pts[i + 1][1]) / 2 * h);
      }
      const last = pts[pts.length - 1];
      ctx.lineTo(last[0] * w, last[1] * h);
      ctx.stroke();
      ctx.globalCompositeOperation = 'source-over';
    }
    function repaint() {
      ctx.clearRect(0, 0, w, h);
      strokes.forEach(paintStroke);
    }
    function pushPoint(e) {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width, y = (e.clientY - rect.top) / rect.height;
      const pts = active.pts, n = pts.length;
      if (n && Math.hypot((x - pts[n - 1][0]) * rect.width, (y - pts[n - 1][1]) * rect.height) < 1.2) return;
      pts.push([x, y]);
      paintStroke(active);
    }
    const api = {
      canvas,
      resize() { if (sizeCanvas()) repaint(); },
      attach() {
        canvas.style.touchAction = 'none';
        canvas.addEventListener('pointerdown', e => {
          if (e.button !== undefined && e.button !== 0) return;
          e.preventDefault();
          try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* some browsers refuse virtual pointers */ }
          active = { color: color, size: tool === 'eraser' ? 34 : size, tool: tool, pts: [] };
          pushPoint(e);
        });
        canvas.addEventListener('pointermove', e => { if (active) pushPoint(e); });
        const end = () => {
          if (!active) return;
          if (active.pts.length) strokes.push(active);
          active = null;
          if (onChange) onChange();
        };
        canvas.addEventListener('pointerup', end);
        canvas.addEventListener('pointercancel', end);
      },
      get strokes() { return strokes; },
      get color() { return color; }, set color(c) { color = c; },
      get size() { return size; }, set size(s) { size = s; },
      get tool() { return tool; }, set tool(t) { tool = t; },
      set onChange(fn) { onChange = fn; },
      undo() { strokes.pop(); repaint(); if (onChange) onChange(); },
      clear() { strokes.length = 0; repaint(); if (onChange) onChange(); }
    };
    return api;
  }

  /* Draw & Scribble */
  const drawRoot = $('[data-mw-draw]');
  if (drawRoot) {
    const nojs = $('[data-mw-nojs]', drawRoot); if (nojs) nojs.remove();
    const canvas = $('[data-mw-canvas]', drawRoot);
    const painter = makePainter(canvas, { color: '#343b30', size: 14, tool: 'draw' });
    painter.attach();
    const frame = $('.mw-canvas-frame', drawRoot);
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(() => painter.resize()).observe(frame);
    painter.resize();

    // Prompts arrive as JSON data in the page.
    const promptData = $('[data-mw-prompts]', drawRoot);
    let prompts = [];
    if (promptData) { try { prompts = JSON.parse(promptData.textContent); } catch (err) { prompts = []; } }
    const promptEl = $('[data-mw-prompt]', drawRoot);
    const ideaBtn = $('[data-mw-idea]', drawRoot);
    let idea = 0;
    if (prompts.length && promptEl) {
      ideaBtn.addEventListener('click', () => { idea = (idea + 1) % prompts.length; promptEl.textContent = prompts[idea]; });
    } else if (ideaBtn) { ideaBtn.hidden = true; }

    const colorBtns = $$('[data-mw-color]', drawRoot);
    const eraserBtn = $('[data-mw-eraser]', drawRoot);
    const doneBtn = $('[data-mw-done]', drawRoot);
    function pick(btn) {
      colorBtns.forEach(b => { b.classList.toggle('is-on', b === btn); b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      eraserBtn.classList.toggle('is-on', btn === eraserBtn);
      eraserBtn.setAttribute('aria-pressed', btn === eraserBtn ? 'true' : 'false');
      if (btn === eraserBtn) { painter.tool = 'eraser'; painter.size = 34; }
      else { painter.tool = 'draw'; painter.color = btn.getAttribute('data-mw-color'); painter.size = 14; }
    }
    colorBtns.forEach(b => b.addEventListener('click', () => pick(b)));
    eraserBtn.addEventListener('click', () => pick(eraserBtn));
    $('[data-mw-undo]', drawRoot).addEventListener('click', () => painter.undo());
    $('[data-mw-clear]', drawRoot).addEventListener('click', () => painter.clear());

    const donePanel = $('[data-mw-donepanel]', drawRoot);
    const saveBtn = $('[data-mw-save]', drawRoot);
    const live = $('[data-mw-live]', drawRoot);
    painter.onChange = () => { doneBtn.hidden = painter.strokes.length === 0; };
    doneBtn.addEventListener('click', () => {
      donePanel.hidden = false;
      saveBtn.hidden = painter.strokes.length === 0;
      saveBtn.disabled = false;
      doneBtn.hidden = true;
      donePanel.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' });
    });
    function resetForDrawing() {
      painter.clear();
      donePanel.hidden = true;
      $('[data-mw-aftermath]', drawRoot).hidden = true;
      live.textContent = '';
      doneBtn.hidden = painter.strokes.length === 0;
    }
    $('[data-mw-again]', drawRoot).addEventListener('click', resetForDrawing);
    $('[data-mw-keep]', drawRoot).addEventListener('click', () => {
      resetForDrawing();
      canvas.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' });
    });

    function makePreview(scale) {
      const src = canvas.getBoundingClientRect();
      const pw = 480, ph = Math.max(120, Math.round(pw * (src.height / Math.max(src.width, 1))));
      const off = document.createElement('canvas');
      off.width = pw; off.height = ph;
      const c = off.getContext('2d');
      c.fillStyle = '#fffdf5'; c.fillRect(0, 0, pw, ph);
      c.lineJoin = 'round'; c.lineCap = 'round';
      painter.strokes.forEach(s => {
        if (!s.pts.length) return;
        c.globalCompositeOperation = s.tool === 'eraser' ? 'destination-out' : 'source-over';
        c.strokeStyle = s.color; c.fillStyle = s.color;
        c.lineWidth = Math.max(3, s.size * scale);
        if (s.pts.length === 1) { c.beginPath(); c.arc(s.pts[0][0] * pw, s.pts[0][1] * ph, c.lineWidth / 2, 0, Math.PI * 2); c.fill(); return; }
        c.beginPath(); c.moveTo(s.pts[0][0] * pw, s.pts[0][1] * ph);
        for (let i = 1; i < s.pts.length - 1; i++) c.quadraticCurveTo(s.pts[i][0] * pw, s.pts[i][1] * ph, (s.pts[i][0] + s.pts[i + 1][0]) / 2 * pw, (s.pts[i][1] + s.pts[i + 1][1]) / 2 * ph);
        c.lineTo(s.pts[s.pts.length - 1][0] * pw, s.pts[s.pts.length - 1][1] * ph);
        c.stroke();
      });
      return off.toDataURL('image/png');
    }
    saveBtn.addEventListener('click', () => {
      saveBtn.disabled = true;
      const strokes = painter.strokes.map(s => ({ color: s.color, size: s.size, tool: s.tool, pts: s.pts.map(p => [+p[0].toFixed(4), +p[1].toFixed(4)]) }));
      if (!strokes.length) { live.textContent = 'Draw something first, then save it here.'; saveBtn.disabled = false; return; }
      const rect = canvas.getBoundingClientRect();
      const preview = makePreview(480 / Math.max(rect.width, 1));
      const rec = {
        id: (crypto.randomUUID ? crypto.randomUUID() : 'd' + Date.now() + '-' + Math.random().toString(16).slice(2)),
        type: 'drawing', createdAt: Date.now(), strokes: strokes, preview: preview
      };
      if (!Bag || !Bag.available) { live.textContent = 'We couldn’t save this one.'; saveBtn.disabled = false; return; }
      Bag.list().then(items => {
        if (items.length >= LIMIT) {
          live.textContent = 'Your School Bag is full. Remove an old picture to save another.';
          return null;
        }
        return Bag.save(rec);
      }).then(saved => {
        if (!saved) { saveBtn.disabled = false; return; }
        live.textContent = 'Saved to your School Bag!';
        const note = $('[data-mw-devicenote]', drawRoot); if (note) note.hidden = false;
        saveBtn.hidden = true;
        const aftermath = $('[data-mw-aftermath]', drawRoot);
        aftermath.hidden = false;
        $('[data-mw-keep]', aftermath).hidden = false;
        $('[data-mw-openbag]', aftermath).hidden = false;
      }).catch(() => {
        live.textContent = 'We couldn’t save this one.';
        saveBtn.disabled = false;
      });
    });
    // reveal controls now that the runner is live
    $$('[data-mw-color],[data-mw-eraser],[data-mw-undo],[data-mw-clear],[data-mw-done],[data-mw-idea],[data-mw-again]', drawRoot).forEach(b => { b.hidden = false; });
    if (prompts.length && promptEl) promptEl.textContent = prompts[0];
  }

  /* Trace & Follow */
  const traceRoot = $('[data-mw-trace]');
  if (traceRoot) {
    const nojs = $('[data-mw-nojs]', traceRoot); if (nojs) nojs.remove();
    const steps = $$('[data-trace-step]', traceRoot);
    const count = $('[data-trace-count]', traceRoot);
    const complete = $('[data-trace-complete]', traceRoot);
    const live = $('[data-mw-live]', traceRoot);
    const painters = new Map();
    let cur = 0;
    function show(i) {
      cur = i;
      steps.forEach((s, j) => { s.hidden = j !== i; });
      count.hidden = false;
      count.textContent = 'Path ' + (i + 1) + ' of ' + steps.length;
      const step = steps[i];
      const canvas = $('[data-trace-canvas]', step);
      let p = painters.get(step);
      if (!p) {
        p = makePainter(canvas, { color: '#33628c', size: 16, tool: 'draw' });
        p.attach();
        painters.set(step, p);
      }
      p.resize();
      const doneB = $('[data-trace-done]', step), nextB = $('[data-trace-next]', step);
      doneB.hidden = false; nextB.hidden = false;
      nextB.disabled = true;
      live.textContent = '';
    }
    steps.forEach((step, idx) => {
      $('[data-trace-done]', step).addEventListener('click', () => {
        live.textContent = 'Nice tracing!';
        const nextB = $('[data-trace-next]', step);
        nextB.disabled = false;
        nextB.focus({ preventScroll: true });
      });
      $('[data-trace-next]', step).addEventListener('click', () => {
        if (idx < steps.length - 1) show(idx + 1);
        else {
          steps.forEach(s => { s.hidden = true; });
          count.hidden = true;
          complete.hidden = false;
        }
      });
    });
    show(0);
  }
})();
