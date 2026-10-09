/* Kiddo School — Look & Draw — Magic Shapes (Age 3): a free drawing
   activity on HTML Canvas + Pointer Events. Reference picture beside a big
   blank WHITE canvas (beside on desktop, above on mobile via CSS); six big
   color buttons, three brush sizes, Eraser (draws white), Undo (snapshot
   stack per picture), Clear, and Save Drawing which downloads ONLY the
   child's own canvas — never the reference image. Drawings persist per
   picture while the page is open (switching pictures saves/restores
   automatically). "Show me how" reads simple steps with the device's
   screen voice and shows them as visible text — never overlays. Strokes
   are smoothed with quadratic midpoints and aligned to the pointer via
   per-event getBoundingClientRect scaling. No grading, no scores, no
   timers, nothing uploaded, nothing stored. Progressive enhancement only:
   without JavaScript the references and written steps still show. */
(() => {
  const game = document.querySelector('[data-mg-game="look-draw"]');
  if (!game) return;
  const $ = (sel, el) => (el || game).querySelector(sel);
  const $$ = (sel, el) => [...(el || game).querySelectorAll(sel)];
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const originalHTML = game.innerHTML;
  const live = $('[data-mg-live]');

  /* ---------- shared screen engine ---------- */
  let screens = [];
  const DRAW_ORDER = ['house', 'tree', 'rocket', 'robot', 'butterfly'];
  function show(id, scroll) {
    // leaving a draw screen: snapshot THAT screen's canvas into the store
    if (current && screens.length) {
      const leaving = screens.find(s => s.getAttribute('data-mg-screen') === 'draw-' + current);
      const cv = leaving && $('canvas[data-ld-canvas]', leaving);
      if (cv) store[current] = cv.toDataURL('image/png');
    }
    screens.forEach(s => { s.hidden = s.getAttribute('data-mg-screen') !== id; });
    const target = screens.find(s => s.getAttribute('data-mg-screen') === id);
    if (target) {
      if (id.indexOf('draw-') === 0) {
        current = id.slice(5);
        const tcv = $('canvas[data-ld-canvas]', target);
        if (tcv) restore(tcv, current);
      } else {
        current = null;
      }
      if (scroll !== false) target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }
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
    } catch (e) { /* the written steps carry it */ }
  }

  /* ---------- drawing store (per picture, this page-open only) ---------- */
  const store = {};           // slug -> dataURL
  const undoStacks = {};      // slug -> [dataURL]
  let current = null;
  const tool = { color: '#e04b3f', colorName: 'red', size: 2, eraser: false };

  function slugOf(cv) {
    const box = cv.closest('[data-ld-draw]');
    return box ? box.getAttribute('data-ld-draw') : null;
  }
  function restore(cv, slug) {
    const c = cv.getContext('2d');
    c.fillStyle = '#ffffff';
    c.fillRect(0, 0, cv.width, cv.height);
    const d = store[slug];
    if (d) {
      const img = new Image();
      img.onload = () => { c.drawImage(img, 0, 0, cv.width, cv.height); };
      img.src = d;
    }
  }
  function pushUndo(cv) {
    const slug = slugOf(cv); if (!slug) return;
    const st = undoStacks[slug] || (undoStacks[slug] = []);
    st.push(cv.toDataURL('image/png'));
    if (st.length > 30) st.shift();
  }
  function applyImage(cv, data) {
    const c = cv.getContext('2d');
    c.fillStyle = '#ffffff';
    c.fillRect(0, 0, cv.width, cv.height);
    if (!data) return;
    const img = new Image();
    img.onload = () => { c.drawImage(img, 0, 0, cv.width, cv.height); };
    img.src = data;
  }

  /* ---------- the drawing engine ---------- */
  function lineWidth() {
    const base = { 1: 7, 2: 16, 3: 34 }[tool.size] || 16;
    return tool.eraser ? base * 2.2 : base;
  }
  function setLine(c) {
    c.strokeStyle = tool.eraser ? '#ffffff' : tool.color;
    c.fillStyle = c.strokeStyle;
    c.lineWidth = lineWidth();
    c.lineCap = 'round';
    c.lineJoin = 'round';
  }
  function posOf(cv, e) {
    const r = cv.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) * (cv.width / r.width),
      y: (e.clientY - r.top) * (cv.height / r.height)
    };
  }
  function wireCanvas(cv) {
    const c = cv.getContext('2d');
    let drawing = false;
    let pid = null;
    let last = null;      // last raw point
    let mid = null;       // last midpoint (quadratic smoothing)
    const wrap = cv.closest('.ld-canvas-wrap');

    cv.addEventListener('pointerdown', e => {
      if (pid !== null) return;                 // one pointer at a time
      pid = e.pointerId;
      drawing = true;
      pushUndo(cv);
      last = posOf(cv, e);
      mid = last;
      setLine(c);
      c.beginPath();
      c.arc(last.x, last.y, Math.max(c.lineWidth, 2) / 2, 0, Math.PI * 2);
      c.fill();
      if (wrap) wrap.classList.add('is-drawing');
      try { cv.setPointerCapture(pid); } catch (err) { /* drawing continues */ }
      e.preventDefault();
    });
    cv.addEventListener('pointermove', e => {
      if (!drawing || e.pointerId !== pid) return;
      const pts = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
      setLine(c);
      (pts.length ? pts : [e]).forEach(ev => {
        const p = posOf(cv, ev);
        const m = { x: (last.x + p.x) / 2, y: (last.y + p.y) / 2 };
        c.beginPath();
        c.moveTo(mid.x, mid.y);
        c.quadraticCurveTo(last.x, last.y, m.x, m.y);
        c.stroke();
        last = p; mid = m;
      });
      e.preventDefault();
    });
    const stop = e => {
      if (!drawing || (e.pointerId !== undefined && e.pointerId !== pid)) return;
      drawing = false; pid = null;
      if (wrap) wrap.classList.remove('is-drawing');
      if (e.pointerId !== undefined && cv.hasPointerCapture && cv.hasPointerCapture(e.pointerId)) {
        try { cv.releasePointerCapture(e.pointerId); } catch (err) { /* released */ }
      }
    };
    cv.addEventListener('pointerup', stop);
    cv.addEventListener('pointercancel', stop);
    cv.addEventListener('pointerleave', stop);
    // stop the page itself from scrolling while a stroke starts on the canvas
    cv.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
  }

  /* ---------- tools (state is global, every toolbar stays in sync) ---------- */
  function refreshTools() {
    $$('[data-ld-color]').forEach(b => b.setAttribute('aria-pressed', String(!tool.eraser && tool.color === b.getAttribute('data-ld-color'))));
    $$('[data-ld-size]').forEach(b => b.setAttribute('aria-pressed', String(!tool.eraser && +b.getAttribute('data-ld-size') === tool.size)));
    $$('[data-ld-eraser]').forEach(b => b.setAttribute('aria-pressed', String(tool.eraser)));
  }
  function wireTools() {
    $$('[data-ld-color]').forEach(b => b.addEventListener('click', () => {
      tool.color = b.getAttribute('data-ld-color');
      tool.colorName = b.getAttribute('data-ld-color-name');
      tool.eraser = false;
      refreshTools();
      status('Drawing with the ' + tool.colorName + ' crayon.');
      talk('The ' + tool.colorName + ' crayon.');
    }));
    $$('[data-ld-size]').forEach(b => b.addEventListener('click', () => {
      tool.size = +b.getAttribute('data-ld-size');
      tool.eraser = false;
      refreshTools();
      status('Brush: ' + ['', 'thin', 'medium', 'thick'][tool.size] + '.');
    }));
    $$('[data-ld-eraser]').forEach(b => b.addEventListener('click', () => {
      tool.eraser = !tool.eraser;
      refreshTools();
      status(tool.eraser ? 'Eraser on — rub away!' : 'Back to drawing.');
      talk(tool.eraser ? 'Eraser on.' : 'Back to drawing.');
    }));
    $$('[data-ld-undo]').forEach(b => b.addEventListener('click', () => {
      const cv = $('canvas[data-ld-canvas]', b.closest('[data-ld-draw]'));
      if (!cv) return;
      const st = undoStacks[slugOf(cv)];
      if (!st || !st.length) { status('Nothing to undo.'); return; }
      applyImage(cv, st.pop());
      status('Undid one step.');
    }));
    $$('[data-ld-clear]').forEach(b => b.addEventListener('click', () => {
      const cv = $('canvas[data-ld-canvas]', b.closest('[data-ld-draw]'));
      if (!cv) return;
      pushUndo(cv);
      const c = cv.getContext('2d');
      c.fillStyle = '#ffffff';
      c.fillRect(0, 0, cv.width, cv.height);
      status('Canvas cleared — white and ready.');
      talk('All clean. Ready to draw again!');
    }));
    $$('[data-ld-save]').forEach(b => b.addEventListener('click', () => {
      const cv = $('canvas[data-ld-canvas]', b.closest('[data-ld-draw]'));
      if (!cv) return;
      cv.toBlob(blob => {
        if (!blob) { status('Saving did not work this time.'); return; }
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'my-' + slugOf(cv) + '-drawing.png';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 4000);
        status('Saved! Your drawing is in your files — ' + a.download + '.');
        talk('Saved! Your drawing is yours forever.');
      }, 'image/png');
    }));
    // "Show me how": visible steps, spoken once — never an overlay
    $$('[data-ld-how]').forEach(b => b.addEventListener('click', () => {
      const steps = $('[data-ld-steps]', b.closest('.ld-ref'));
      const open = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', String(!open));
      if (steps) steps.hidden = open;
      if (!open) {
        const text = $$('li', steps).map(li => li.textContent).join(' ');
        talk(text);
      }
    }));
    refreshTools();
  }
  function status(text) {
    const scr = screens.find(s => !s.hidden && s.getAttribute('data-mg-screen').indexOf('draw-') === 0);
    const el = scr && $('[data-ld-status]', scr);
    if (el) el.textContent = text;
    if (live && !el) live.textContent = text;
  }

  /* ---------- boot / replay ---------- */
  function wire() {
    screens = $$('[data-mg-screen]');
    wireGo();
    wireTools();
    $$('canvas[data-ld-canvas]').forEach(wireCanvas);
    // steps are visible without JS (honest scroll-through); with JS they
    // start tucked away behind the Show-me-how toggle
    $$('[data-ld-steps]').forEach(ol => { ol.hidden = true; });
    $$('[data-ld-how]').forEach(b => { b.hidden = false; });
  }
  wire();
  show('welcome', false);
  game.addEventListener('click', e => {
    if (e.target.closest('[data-mg-replay]')) {
      Object.keys(store).forEach(k => delete store[k]);
      Object.keys(undoStacks).forEach(k => delete undoStacks[k]);
      current = null;
      game.innerHTML = originalHTML;
      wire();
      show('welcome', false);
      if (live) live.textContent = '';
    }
  });
})();
