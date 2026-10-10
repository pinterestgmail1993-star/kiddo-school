/* Kiddo School — Colors & Creativity engine (Class 26).
   Real painting tools over server-rendered SVG scenes:
   - fill:      pick a color (or pattern), tap a region — outlines stay
   - mix:       two primary jars → the true mixed color (3 real recipes)
   - sequence:  build the rainbow in machine-requested order
   - sort:      warm crystals to the fire cave, cool to the ice cave
   - decorate:  place, move, recolor and remove stickers (sundae/aquarium)
   - canvas:    free brush + splatter + eraser on a real canvas
   Undo + redo everywhere, clear, Save to My Classroom (the existing
   selected-child profile in localStorage — no second account system),
   Download as PNG. Completion of the artwork (or finishing the recipe
   chart / rainbow / sorting) is what marks the adventure done — opening
   the page never does. Without JavaScript the scenes, palettes and
   written instructions still show; drawing simply waits for JS. */
(() => {
  const root = document.querySelector('[data-cc-board]');
  const lib = document.querySelector('[data-cc-lib]');
  if (!root && !lib) return;
  if (typeof document.querySelectorAll !== 'function') return;

  /* ---------- shared kit ---------- */
  const store = {
    get(k, fb) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? fb : v; } catch (e) { return fb; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* full/private */ } }
  };
  const childKey = () => store.get('kiddo-active', null) || 'guest';
  function saveProgress(slug) {
    const all = store.get('kiddo-adventures', {}) || {};
    const k = childKey();
    all[k] = all[k] || {};
    all[k].colors = all[k].colors || {};
    all[k].colors[slug] = Date.now();
    store.set('kiddo-adventures', all);
    try { window.dispatchEvent(new CustomEvent('kiddo-adventure-done', { detail: { section: 'colors', slug } })); } catch (e) { /* ok */ }
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

  /* ---------- library page ribbons ---------- */
  if (lib) {
    const all = store.get('kiddo-adventures', {}) || {};
    const done = (all[childKey()] && all[childKey()].colors) || {};
    lib.querySelectorAll('[data-cc-libcard]').forEach(card => {
      if (done[card.getAttribute('data-cc-libcard')]) {
        const badge = card.querySelector('[data-cc-done]');
        if (badge) badge.hidden = false;
        card.classList.add('is-done');
      }
    });
    return;
  }

  /* ---------- one game ---------- */
  const slug = root.getAttribute('data-cc-game');
  const $ = s => root.querySelector(s);
  const $$ = s => [...root.querySelectorAll(s)];
  const noteEl = $('[data-cc-note]');
  const cheerEl = $('[data-cc-cheer]');
  const again = $('[data-cc-again]');
  const isBig = root.getAttribute('data-cc-big') === 'true';
  let finished = false;
  function status(text, speak) {
    if (noteEl) noteEl.textContent = text;
    if (speak !== false) talk(text);
  }
  function finish() {
    if (finished) return;
    finished = true;
    if (cheerEl) {
      cheerEl.hidden = false;
      if (!reduce) cheerEl.classList.add('is-on');
    }
    status('You did it! Wonderful!');
    saveProgress(slug);
    if (again) again.focus();
  }
  if (again) {
    again.hidden = false;
    again.addEventListener('click', () => window.location.reload());
  }

  /* ---------- saved creations ---------- */
  const CREATIONS = 'kiddo-creations';
  const MAX_CREATIONS = 9;
  const creations = () => { const v = store.get(CREATIONS, []); return Array.isArray(v) ? v : []; };
  function saveCreation(record) {
    const list = creations().filter(c => !(c.child === record.child && c.slug === record.slug && c.id === record.id));
    const mine = list.filter(c => c.child === record.child && c.slug === record.slug);
    if (mine.length >= 3) {
      const oldest = mine.sort((a, b) => a.ts - b.ts)[0];
      const without = list.filter(c => c.id !== oldest.id);
      without.unshift(record);
      try { store.set(CREATIONS, without); } catch (e) { return false; }
      return true;
    }
    list.unshift(record);
    const trimmed = list.slice(0, MAX_CREATIONS);
    try { store.set(CREATIONS, trimmed); } catch (e) {
      // quota: drop this child's oldest and retry once
      const retry = list.filter(c => c.child !== record.child).concat(list.filter(c => c.child === record.child).slice(0, -1)).concat([record]);
      try { store.set(CREATIONS, retry.slice(0, MAX_CREATIONS)); return true; } catch (err) { return false; }
    }
    return true;
  }
  function renderGallery() {
    const gal = $('[data-cc-gallery]');
    const row = $('[data-cc-gallery-row]');
    if (!gal || !row) return;
    const mine = creations().filter(c => c.slug === slug && c.child === childKey());
    if (!mine.length) { gal.hidden = true; return; }
    gal.hidden = false;
    row.innerHTML = '';
    mine.forEach(rec => {
      const card = document.createElement('div');
      card.className = 'cc-gal-card';
      const img = document.createElement('img');
      img.src = rec.thumb; img.alt = 'Your saved ' + rec.title + ' artwork';
      const actions = document.createElement('div');
      actions.className = 'cc-gal-actions';
      if (rec.state) {
        const open = document.createElement('button');
        open.type = 'button'; open.className = 'button button-ghost'; open.textContent = 'Continue';
        open.addEventListener('click', () => {
          store.set('kiddo-creations-open', rec.id);
          window.location.reload();
        });
        actions.appendChild(open);
      }
      const del = document.createElement('button');
      del.type = 'button'; del.className = 'button button-ghost'; del.textContent = 'Delete';
      del.setAttribute('aria-label', 'Delete this saved artwork');
      del.addEventListener('click', () => {
        store.set(CREATIONS, creations().filter(c => c.id !== rec.id));
        renderGallery();
      });
      actions.appendChild(del);
      card.appendChild(img); card.appendChild(actions);
      row.appendChild(card);
    });
  }

  /* ---------- SVG → PNG (download + thumbnails) ---------- */
  const scene = $('[data-cc-scene]');
  function svgToBlobPNG(svgEl, width) {
    const clone = svgEl.cloneNode(true);
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('width', width || 900);
    clone.setAttribute('height', Math.round((width || 900) * 560 / 900));
    const str = new XMLSerializer().serializeToString(clone);
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width || 900;
        canvas.height = Math.round((width || 900) * 560 / 900);
        const c = canvas.getContext('2d');
        c.fillStyle = '#ffffff';
        c.fillRect(0, 0, canvas.width, canvas.height);
        c.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(b => b ? resolve(b) : reject(new Error('blob')), 'image/png');
      };
      img.onerror = () => reject(new Error('render'));
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(str);
    });
  }
  function download(blob, name) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }
  function wireSave(getState, baseName) {
    const save = $('[data-cc-save]');
    const dl = $('[data-cc-download]');
    if (dl) dl.addEventListener('click', async () => {
      try {
        const blob = await exportBlob(1200);
        download(blob, baseName + '.png');
        status('Saved! Your artwork is in your files — ' + baseName + '.png');
      } catch (e) { status('Saving did not work this time. Try again!'); }
    });
    if (save) save.addEventListener('click', async () => {
      try {
        const blob = await exportBlob(480);
        const thumb = await blobToDataURL(blob);
        const rec = {
          id: 'w' + Date.now().toString(36), child: childKey(), slug,
          title: document.querySelector('h1') ? document.querySelector('h1').textContent : baseName,
          ts: Date.now(), thumb, state: getState ? getState() : null
        };
        const ok = saveCreation(rec);
        status(ok ? 'Saved to My Classroom! Find it at your desk.' : 'The gallery is full on this device — try Download instead.');
        if (ok) renderGallery();
      } catch (e) { status('Saving did not work this time. Try again!'); }
    });
  }
  async function exportBlob(width) {
    if (root.querySelector('[data-cc-canvas]')) {
      const cv = root.querySelector('[data-cc-canvas]');
      return await new Promise((resolve, reject) => cv.toBlob(b => b ? resolve(b) : reject(new Error('blob')), 'image/png'));
    }
    if (!scene) throw new Error('no scene');
    return await svgToBlobPNG(scene, width);
  }
  const blobToDataURL = blob => new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result); r.onerror = rej;
    r.readAsDataURL(blob);
  });

  /* ---------- state capture / restore ---------- */
  function regionState() {
    const out = {};
    $$('[data-cc-fill]').forEach(r => { out[r.getAttribute('data-cc-fill')] = r.getAttribute('fill'); });
    return out;
  }
  function decoState() {
    return $$('[data-cc-placed]').map(g => ({
      kind: g.getAttribute('data-cc-kind'),
      color: g.getAttribute('data-cc-color'),
      x: +(g.getAttribute('transform').match(/translate\(([-\d.]+)/) || [0, 0])[1],
      y: +(g.getAttribute('transform').match(/ ([-\d.]+)\)/) || [0, 0])[1]
    }));
  }
  function restore() {
    const want = store.get('kiddo-creations-open', null);
    if (!want) return false;
    const rec = creations().find(c => c.id === want && c.slug === slug);
    try { localStorage.removeItem('kiddo-creations-open'); } catch (e) { /* ok */ }
    if (!rec || !rec.state) return false;
    const st = rec.state;
    if (st.t === 'fill') {
      Object.entries(st.f || {}).forEach(([id, fill]) => {
        const r = root.querySelector(`[data-cc-fill="${id}"]`);
        if (r && fill) r.setAttribute('fill', fill);
      });
    } else if (st.t === 'deco') {
      (st.items || []).forEach(it => placeItem(it.kind, it.color, it.x, it.y, false));
    } else if (st.t === 'canvas' && st.png) {
      const cv = $('[data-cc-canvas]');
      if (cv) {
        const img = new Image();
        img.onload = () => cv.getContext('2d').drawImage(img, 0, 0);
        img.src = st.png;
      }
    }
    status('Welcome back! Your saved artwork is on the board.');
    return true;
  }

  /* ---------- tool state ---------- */
  let tool = { color: '#e04b3f', name: 'red', isPattern: false, eraser: false, mode: 'brush', size: 2 };
  $$('[data-cc-color]').forEach(btn => {
    btn.addEventListener('click', () => {
      tool.color = btn.getAttribute('data-cc-color');
      tool.name = btn.getAttribute('data-cc-color-name') || 'color';
      tool.isPattern = tool.color.indexOf('url(') === 0;
      tool.eraser = false;
      $$('[data-cc-color]').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
      $$('[data-cc-eraser]').forEach(b => b.setAttribute('aria-pressed', 'false'));
      status('Painting with ' + tool.name + '. Tap the picture!');
    });
  });
  const firstColor = $('[data-cc-color]');
  if (firstColor) { firstColor.setAttribute('aria-pressed', 'true'); }

  /* ---------- fill engine ---------- */
  function fillEngine() {
    const undoStack = [], redoStack = [];
    const batch = [];
    function apply(op, dir) {
      const r = root.querySelector(`[data-cc-fill="${op.id}"]`);
      if (!r) return;
      r.setAttribute('fill', dir === 'redo' ? op.to : op.from);
    }
    function pushBatch(ops) {
      undoStack.push(ops);
      if (undoStack.length > 60) undoStack.shift();
      redoStack.length = 0;
    }
    $$('[data-cc-fill]').forEach(region => {
      region.addEventListener('click', evt => {
        if (decoSelected) { placeAtEvent(evt); return; }
        const id = region.getAttribute('data-cc-fill');
        const from = region.getAttribute('fill');
        const to = tool.eraser ? '#ffffff' : tool.color;
        if (from === to) return;
        const ops = [{ id, from, to }];
        region.setAttribute('fill', to);
        const mirror = region.getAttribute('data-cc-mirror');
        if (mirror && $('[data-cc-mirror-toggle]') && $('[data-cc-mirror-toggle]').getAttribute('aria-pressed') === 'true') {
          const m = root.querySelector(`[data-cc-fill="${mirror}"]`);
          if (m && m.getAttribute('fill') !== to) { ops.push({ id: mirror, from: m.getAttribute('fill'), to }); m.setAttribute('fill', to); }
        }
        pushBatch(ops);
        status('Painted ' + region.getAttribute('data-cc-name') + ' ' + tool.name + '!');
        checkComplete();
      });
      region.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); region.click(); } });
    });
    function checkComplete() {
      const all = $$('[data-cc-fill]');
      const painted = all.filter(r => (r.getAttribute('fill') || '#ffffff') !== '#ffffff').length;
      if (painted >= all.length) finish();
    }
    const mt = $('[data-cc-mirror-toggle]');
    if (mt) mt.addEventListener('click', () => {
      const on = mt.getAttribute('aria-pressed') === 'true';
      mt.setAttribute('aria-pressed', String(!on));
      mt.textContent = 'Magic Mirror: ' + (!on ? 'ON' : 'OFF');
    });
    const gt = $('[data-cc-glow-toggle]');
    if (gt) gt.addEventListener('click', () => {
      const on = gt.getAttribute('aria-pressed') === 'true';
      gt.setAttribute('aria-pressed', String(!on));
      gt.textContent = gt.getAttribute('data-glow-label') + ': ' + (!on ? 'ON' : 'OFF');
      root.classList.toggle('is-night', !on);
    });
    const undoBtn = $('[data-cc-undo]');
    const redoBtn = $('[data-cc-redo]');
    if (undoBtn) undoBtn.addEventListener('click', () => {
      const ops = undoStack.pop();
      if (!ops) { status('Nothing to undo.'); return; }
      [...ops].reverse().forEach(op => apply(op, 'undo'));
      redoStack.push(ops);
      status('Undid one step.');
    });
    if (redoBtn) redoBtn.addEventListener('click', () => {
      const ops = redoStack.pop();
      if (!ops) { status('Nothing to redo yet.'); return; }
      ops.forEach(op => apply(op, 'redo'));
      undoStack.push(ops);
      status('Redid one step.');
    });
    const clearBtn = $('[data-cc-clear]');
    if (clearBtn) clearBtn.addEventListener('click', () => {
      const ops = [];
      $$('[data-cc-fill]').forEach(r => {
        const from = r.getAttribute('fill');
        if (from !== '#ffffff') { ops.push({ id: r.getAttribute('data-cc-fill'), from, to: '#ffffff' }); r.setAttribute('fill', '#ffffff'); }
      });
      if (ops.length) pushBatch(ops);
      $$('[data-cc-placed]').forEach(g => g.remove());
      status('All clean — ready to paint again!');
    });
    const undoBtnD = $('[data-cc-undo]');
    const redoBtnD = $('[data-cc-redo]');
    if (undoBtnD) undoBtnD.addEventListener('click', () => { if (undoStackDeco.length) { decoUndo(); } });
    if (redoBtnD) redoBtnD.addEventListener('click', () => { if (redoStackDeco.length) { decoRedo(); } });
    /* decorations share the fill board (birthday cake) */
    if ($('[data-cc-tray]')) wireDecoTray();
    wireSave(() => ({ t: 'fill', f: regionState(), items: decoState() }), 'my-' + slug + '-art');
    if (!restore()) status('Pick a color, then tap the picture.');
  }

  /* ---------- decorate (standalone or shared with fill) ---------- */
  let decoSelected = null;   // tray selection
  let placedSelected = null; // placed sticker selection
  function itemSVGFor(kind, color) {
    // mirrors src/color-creativity.mjs decorItemSVG
    switch (kind) {
      case 'scoop': return `<path d="M-44,10 C-44,-34 44,-34 44,10 C44,26 -44,26 -44,10 Z" fill="${color}" stroke="#3a3350" stroke-width="5"/><circle cx="-16" cy="-8" r="4" fill="#fff" opacity="0.5"/><circle cx="14" cy="-14" r="4" fill="#fff" opacity="0.5"/>`;
      case 'cherry': return `<circle r="14" fill="${color}" stroke="#3a3350" stroke-width="4"/><path d="M0,-13 q4,-16 14,-20" stroke="#4a9e4f" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      case 'wafer': return `<rect x="-12" y="-26" width="24" height="52" rx="6" fill="${color}" stroke="#3a3350" stroke-width="4"/><path d="M-8,-16 h16 M-8,0 h16 M-8,16 h16" stroke="#d9b078" stroke-width="3"/>`;
      case 'fish': return `<path d="M-30,0 C-14,-22 22,-22 34,0 C22,22 -14,22 -30,0 Z" fill="${color}" stroke="#3a3350" stroke-width="4"/><path d="M-30,0 L-48,-16 L-44,0 L-48,16 Z" fill="${color}" stroke="#3a3350" stroke-width="4"/><circle cx="18" cy="-4" r="4" fill="#3a3350"/>`;
      case 'plant': return `<path d="M0,26 C-4,-6 -18,-16 -12,-38 M0,26 C6,-10 16,-18 14,-40 M0,26 C-2,-2 -2,-14 0,-24" stroke="${color}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
      case 'castle': return `<rect x="-30" y="-24" width="60" height="50" fill="${color}" stroke="#3a3350" stroke-width="4"/><rect x="-38" y="-40" width="18" height="66" fill="${color}" stroke="#3a3350" stroke-width="4"/><rect x="20" y="-40" width="18" height="66" fill="${color}" stroke="#3a3350" stroke-width="4"/><path d="M-38,-40 L-29,-54 L-20,-40 M20,-40 L29,-54 L38,-40" fill="${color}" stroke="#3a3350" stroke-width="4"/><rect x="-7" y="-8" width="14" height="34" fill="#8a5a34"/>`;
      case 'coral': return `<path d="M0,26 C-2,-2 -14,-10 -10,-30 M0,26 C2,-8 12,-16 10,-34 M0,26 C0,-4 0,-16 0,-22" stroke="${color}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
      case 'rock': return `<ellipse rx="24" ry="16" fill="${color}" stroke="#3a3350" stroke-width="4"/>`;
      case 'star': return `<path d="M0,-26 L8,-8 L27,-6 L12,7 L17,26 L0,15 L-17,26 L-12,7 L-27,-6 L-8,-8 Z" fill="${color}" stroke="#3a3350" stroke-width="4" stroke-linejoin="round"/>`;
      case 'heart': return `<path d="M0,22 C-20,8 -26,-4 -20,-14 C-15,-22 -5,-21 0,-13 C5,-21 15,-22 20,-14 C26,-4 20,8 0,22 Z" fill="${color}" stroke="#3a3350" stroke-width="4"/>`;
      case 'strawberry': return `<path d="M0,24 C-16,12 -20,-4 -14,-14 C-8,-22 8,-22 14,-14 C20,-4 16,12 0,24 Z" fill="${color}" stroke="#3a3350" stroke-width="4"/><path d="M-10,-16 q10,8 20,0" stroke="#4a9e4f" stroke-width="5" fill="none"/><circle cx="-6" cy="0" r="1.8" fill="#ffe1b0"/><circle cx="6" cy="6" r="1.8" fill="#ffe1b0"/>`;
    }
    return `<circle r="16" fill="${color}"/>`;
  }
  function placeItem(kind, color, x, y, record = true) {
    const stage = $('[data-cc-stage]');
    if (!stage) return null;
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('data-cc-placed', '');
    g.setAttribute('data-cc-kind', kind);
    g.setAttribute('data-cc-color', color);
    g.setAttribute('transform', `translate(${x} ${y})`);
    g.setAttribute('role', 'button');
    g.setAttribute('tabindex', '0');
    g.setAttribute('aria-label', 'A placed ' + kind);
    g.classList.add('cc-placed', 'is-new');
    g.innerHTML = itemSVGFor(kind, color);
    stage.appendChild(g);
    if (!reduce) setTimeout(() => g.classList.remove('is-new'), 450);
    wirePlaced(g);
    if (record) {
      undoStackDeco.push({ t: 'add', el: g });
      if (undoStackDeco.length > 60) undoStackDeco.shift();
      redoStackDeco.length = 0;
      checkDecoDone();
    }
    return g;
  }
  function checkDecoDone() {
    const n = $$('[data-cc-placed]').length;
    if (n >= 5) finish(); // a real decorated scene: five placements is a creation
  }
  function wirePlaced(g) {
    const tap = e => {
      e.stopPropagation && e.stopPropagation();
      selectPlaced(g);
    };
    g.addEventListener('click', tap);
    g.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); tap(ev); } });
  }
  function selectPlaced(g) {
    if (placedSelected) placedSelected.classList.remove('is-selected');
    placedSelected = (placedSelected === g) ? null : g;
    if (placedSelected) {
      placedSelected.classList.add('is-selected');
      status('Picked up! Tap a new spot to move it, or press Remove.');
      const rm = $('[data-cc-deco-remove]');
      if (rm) rm.disabled = false;
    } else {
      const rm = $('[data-cc-deco-remove]');
      if (rm) rm.disabled = true;
    }
  }
  function boardCoords(evt) {
    if (!scene) return null;
    const pt = new DOMPoint(evt.clientX, evt.clientY);
    const m = scene.getScreenCTM();
    if (!m) return null;
    const p = pt.matrixTransform(m.inverse());
    return { x: Math.round(p.x), y: Math.round(p.y) };
  }
  const undoStackDeco = [], redoStackDeco = [];
  function placeAtEvent(regionOrEvt, evt2) {
    const evt = evt2 || regionOrEvt;
    const p = boardCoords(evt);
    if (!p || !decoSelected) return;
    if (slug === 'rainbow-fish-aquarium' && (p.x < 150 || p.x > 750 || p.y < 90 || p.y > 450)) {
      status('Tap inside the tank water!'); return;
    }
    if (placedSelected) { // move
      placedSelected.setAttribute('transform', `translate(${p.x} ${p.y})`);
      placedSelected.classList.remove('is-selected');
      placedSelected = null;
      const rm = $('[data-cc-deco-remove]');
      if (rm) rm.disabled = true;
      status('Moved!');
      return;
    }
    placeItem(decoSelected.kind, decoSelected.color, p.x, p.y);
    status('Placed! Tap it if you want to move it.');
  }
  function wireDecoTray() {
    $$('[data-cc-tray] [data-cc-item]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = +btn.getAttribute('data-item-idx');
        const items = JSON.parse(root.getAttribute('data-cc-items') || '[]');
        const it = items[idx] || { kind: btn.getAttribute('data-cc-item'), color: btn.getAttribute('data-item-color') };
        decoSelected = { kind: it.kind, color: it.color };
        placedSelected = null;
        $$('[data-cc-tray] [data-cc-item]').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
        const rm = $('[data-cc-deco-remove]');
        if (rm) rm.disabled = true;
        status('Now tap the picture to place it.');
      });
    });
    const rm = $('[data-cc-deco-remove]');
    if (rm) rm.addEventListener('click', () => {
      if (!placedSelected) return;
      undoStackDeco.push({ t: 'del', el: placedSelected });
      placedSelected.remove();
      placedSelected = null;
      rm.disabled = true;
      status('Removed!');
    });
  }

  function decorateEngine() {
    wireDecoTray();
    wireDecoUndo();
    if (scene) {
      scene.addEventListener('click', evt => {
        if (!decoSelected) { status('Pick a fish or a plant from the tray first.'); return; }
        placeAtEvent(evt);
      });
    }
    const undoBtn = $('[data-cc-undo]');
    const redoBtn = $('[data-cc-redo]');
    const clearBtn = $('[data-cc-clear]');
    if (undoBtn) undoBtn.addEventListener('click', decoUndo);
    if (redoBtn) redoBtn.addEventListener('click', decoRedo);
    if (clearBtn) clearBtn.addEventListener('click', () => {
      $$('[data-cc-placed]').forEach(g => g.remove());
      undoStackDeco.length = 0; redoStackDeco.length = 0;
      status('All clean — build a new design!');
    });
    wireSave(() => ({ t: 'deco', items: decoState() }), 'my-' + slug + '-design');
    if (!restore()) status('Tap a sticker, then tap the picture to place it.');
  }
  function wireDecoUndo() { /* stacks shared via closures above */ }
  function decoUndo() {
    const op = undoStackDeco.pop();
    if (!op) { status('Nothing to undo.'); return; }
    if (op.t === 'add') { op.el.remove(); redoStackDeco.push(op); }
    else { $('[data-cc-stage]').appendChild(op.el); redoStackDeco.push(op); }
    status('Undid one step.');
  }
  function decoRedo() {
    const op = redoStackDeco.pop();
    if (!op) { status('Nothing to redo yet.'); return; }
    if (op.t === 'add') { $('[data-cc-stage]').appendChild(op.el); undoStackDeco.push(op); }
    else { op.el.remove(); undoStackDeco.push(op); }
    status('Redid one step.');
  }

  /* ---------- mix engine ---------- */
  function mixEngine() {
    const chosen = [];
    const askEl = $('[data-cc-mix-ask]');
    const chosenEl = $('[data-cc-mix-chosen]');
    const goBtn = $('[data-cc-mix-go]');
    const resultEl = $('[data-cc-mix-result]');
    const combos = JSON.parse(root.getAttribute('data-cc-combos') || '[]');
    const found = new Set();
    $$('[data-cc-jar]').forEach(jar => {
      jar.addEventListener('click', () => {
        const key = jar.getAttribute('data-cc-jar');
        const name = jar.getAttribute('data-jar-name');
        const i = chosen.indexOf(key);
        if (i >= 0) { chosen.splice(i, 1); jar.classList.remove('is-chosen'); }
        else {
          if (chosen.length >= 2) { const old = chosen.shift(); const oldJar = $(`[data-cc-jar="${old}"]`); if (oldJar) oldJar.classList.remove('is-chosen'); }
          chosen.push(key); jar.classList.add('is-chosen');
        }
        const names = chosen.map(k => $(`[data-cc-jar="${k}"]`).getAttribute('data-jar-name'));
        chosenEl.textContent = chosen.length ? 'Chosen: ' + names.join(' + ') : 'Chosen: nothing yet';
        goBtn.disabled = chosen.length !== 2;
        status(chosen.length === 2 ? 'Two jars ready — press Mix!' : 'Choose ' + (2 - chosen.length) + ' more jar' + (2 - chosen.length === 1 ? '' : 's') + '.');
      });
      jar.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); jar.click(); } });
    });
    if (goBtn) goBtn.addEventListener('click', () => {
      const combo = combos.find(c => (c.a === chosen[0] && c.b === chosen[1]) || (c.a === chosen[1] && c.b === chosen[0]));
      const bowl = $('[data-cc-mixbowl]');
      const drop = $('[data-cc-drop]');
      const both = chosen.map(k => $(`[data-cc-jar="${k}"]`)).filter(Boolean);
      both.forEach(j => j.classList.add('is-pouring'));
      setTimeout(() => both.forEach(j => j.classList.remove('is-pouring')), reduce ? 10 : 900);
      if (!combo) {
        // same color twice: honest real-world mixing
        const same = chosen[0] === chosen[1];
        if (same && bowl) bowl.querySelector('path').setAttribute('fill', comboColorOf(chosen[0]));
        status(same ? 'Red and red make… more red! Try two different jars.' : 'Those two are already mixed — try a new pair!');
        return;
      }
      const key = combo.a + '-' + combo.b;
      if (drop && !reduce) {
        drop.removeAttribute('hidden');
        drop.querySelector('circle').setAttribute('fill', combo.result);
        drop.style.transition = 'transform 0.8s ease';
        drop.style.transform = 'translateY(240px)';
        setTimeout(() => { drop.setAttribute('hidden', ''); drop.style.transform = 'none'; }, reduce ? 10 : 900);
      }
      if (bowl) bowl.querySelectorAll('path').forEach(p => p.setAttribute('fill', combo.result));
      resultEl.textContent = combo.line;
      resultEl.classList.add('is-on');
      if (!found.has(key)) {
        found.add(key);
        const card = $(`[data-cc-recipe="${key}"]`);
        if (card) {
          card.classList.add('is-found');
          const dot = card.querySelector('[data-cc-result]');
          if (dot) { dot.style.setProperty('--pc', combo.result); dot.classList.add('is-on'); }
        }
      }
      status(combo.line);
      talk(combo.line);
      if (found.size >= combos.length) setTimeout(finish, reduce ? 50 : 1200);
    });
    function comboColorOf(k) { return { red: '#e04b3f', yellow: '#f5c531', blue: '#5aa7d6' }[k] || '#b8c9d8'; }
  }

  /* ---------- sequence (rainbow) engine ---------- */
  function sequenceEngine() {
    const order = JSON.parse(root.getAttribute('data-cc-order') || '[]');
    const arcs = $$('[data-cc-fill]');
    const askEl = $('[data-cc-seq-ask]');
    const undoStack = [];
    let step = 0;
    function want() { return order[step]; }
    function sayWant() {
      if (askEl && want()) askEl.innerHTML = `The machine wants <strong>${want()[1]}</strong> — tap the ${['biggest', 'next', 'next', 'next', 'next', 'last'][step] || 'next'} arc!`;
      else if (askEl) askEl.textContent = 'The rainbow is complete!';
    }
    sayWant();
    arcs.forEach((arc, i) => {
      arc.addEventListener('click', () => {
        if ((arc.getAttribute('fill') || 'none') !== 'none' && arc.getAttribute('stroke') !== '#ffffff') {
          if (arc.getAttribute('data-cc-done') === 'true') { status('That arc is done — find the one still white!'); return; }
        }
        if (!tool.eraser && tool.name === want()[1]) {
          undoStack.push({ el: arc, prev: arc.getAttribute('stroke') });
          arc.setAttribute('stroke', tool.color);
          arc.setAttribute('data-cc-done', 'true');
          arc.classList.add('is-done');
          step++;
          status('Right color, right arc! The machine hums happily.');
          if (step >= order.length) {
            const sun = $('[data-cc-sun]');
            if (sun) sun.removeAttribute('hidden');
            finish();
          } else sayWant();
        } else {
          arc.classList.add('is-wiggle');
          setTimeout(() => arc.classList.remove('is-wiggle'), 700);
          status(`The machine wants ${want() ? want()[1] : 'nothing'} — pick that color first!`);
        }
      });
    });
    const undoBtn = $('[data-cc-undo]');
    if (undoBtn) undoBtn.addEventListener('click', () => {
      const op = undoStack.pop();
      if (!op) { status('Nothing to undo.'); return; }
      op.el.setAttribute('stroke', op.prev);
      op.el.removeAttribute('data-cc-done');
      op.el.classList.remove('is-done');
      step = Math.max(0, step - 1);
      sayWant();
      status('Undid one arc.');
    });
    const clearBtn = $('[data-cc-clear]');
    if (clearBtn) clearBtn.addEventListener('click', () => {
      while (undoStack.length) {
        const op = undoStack.pop();
        op.el.setAttribute('stroke', op.prev);
        op.el.removeAttribute('data-cc-done');
        op.el.classList.remove('is-done');
      }
      step = 0; sayWant(); status('Start over — the machine wants red!');
    });
  }

  /* ---------- sort (crystals) engine ---------- */
  function sortEngine() {
    let selected = null;
    const warmCount = $$('[data-cc-item="warm"]').length;
    let warmIn = 0, coolIn = 0;
    const total = warmCount + $$('[data-cc-item="cool"]').length;
    $$('[data-cc-tray] [data-cc-item]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('is-used')) return;
        if (selected === btn) { btn.classList.remove('is-selected'); selected = null; return; }
        $$('[data-cc-tray] [data-cc-item]').forEach(b => b.classList.remove('is-selected'));
        selected = btn;
        btn.classList.add('is-selected');
        status('Crystal picked. Which cave does it live in?');
      });
    });
    $$('[data-cc-bin]').forEach(bin => {
      const tap = () => {
        if (!selected) { status('Pick a crystal first.'); return; }
        const key = selected.getAttribute('data-cc-item');
        const warm = key === 'warm';
        if ((warm && bin.getAttribute('data-cc-bin') === 'warm') || (!warm && bin.getAttribute('data-cc-bin') === 'cool')) {
          const fill = warm ? $('[data-cc-warmfill]') : $('[data-cc-coolfill]');
          if (fill) {
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            const off = (warm ? warmIn : coolIn) * 36 - 54;
            g.setAttribute('transform', `translate(${off} ${(Math.random() * 20 - 10).toFixed(0)}) scale(0.7)`);
            g.innerHTML = `<path d="M-24,-40 L-24,30 L0,52 L24,30 L24,-40 L12,-56 L-12,-56 Z" fill="${selected.getAttribute('style').match(/--pc:([^;]+)/)[1]}" stroke="#3a3350" stroke-width="4" stroke-linejoin="round"/>`;
            fill.appendChild(g);
          }
          if (warm) warmIn++; else coolIn++;
          selected.classList.add('is-used');
          selected.classList.remove('is-selected');
          selected = null;
          status(warm ? 'Warm colors — like fire and sunshine! Right cave!' : 'Cool colors — like water and ice! Right cave!');
          if (warmIn + coolIn >= total) { root.classList.add('is-glow'); finish(); }
        } else {
          bin.classList.add('is-wiggle');
          setTimeout(() => bin.classList.remove('is-wiggle'), 700);
          status(warm ? 'Red is a warm color — try the fire cave!' : 'That is a cool color — try the ice cave!');
        }
      };
      bin.addEventListener('click', tap);
      bin.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tap(); } });
    });
  }

  /* ---------- canvas engine ---------- */
  function canvasEngine() {
    const cv = $('[data-cc-canvas]');
    if (!cv) return;
    const c = cv.getContext('2d');
    c.fillStyle = '#ffffff';
    c.fillRect(0, 0, cv.width, cv.height);
    const undoStack = [], redoStack = [];
    let drawing = false, pid = null, last = null, mid = null;
    const pushUndo = () => { undoStack.push(cv.toDataURL('image/png')); if (undoStack.length > 30) undoStack.shift(); redoStack.length = 0; };
    const applyImage = data => {
      const img = new Image();
      img.onload = () => { c.fillStyle = '#ffffff'; c.fillRect(0, 0, cv.width, cv.height); c.drawImage(img, 0, 0); };
      img.src = data;
    };
    const posOf = e => {
      const r = cv.getBoundingClientRect();
      return { x: (e.clientX - r.left) * (cv.width / r.width), y: (e.clientY - r.top) * (cv.height / r.height) };
    };
    const lineWidth = () => ({ 1: 7, 2: 16, 3: 34 }[tool.size] || 16) * (tool.eraser ? 2.2 : 1);
    cv.addEventListener('pointerdown', e => {
      if (pid !== null) return;
      pid = e.pointerId; drawing = true;
      pushUndo();
      const p = posOf(e); last = p; mid = p;
      c.lineCap = 'round'; c.lineJoin = 'round';
      if (tool.mode === 'splatter' && !tool.eraser) { splat(p); drawing = false; pid = null; return; }
      c.strokeStyle = tool.eraser ? '#ffffff' : tool.color;
      c.fillStyle = c.strokeStyle;
      c.lineWidth = lineWidth();
      c.beginPath(); c.arc(p.x, p.y, Math.max(c.lineWidth, 2) / 2, 0, Math.PI * 2); c.fill();
      try { cv.setPointerCapture(pid); } catch (err) { /* ok */ }
      e.preventDefault();
    });
    cv.addEventListener('pointermove', e => {
      if (!drawing || e.pointerId !== pid) return;
      const pts = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
      c.strokeStyle = tool.eraser ? '#ffffff' : tool.color;
      c.lineWidth = lineWidth();
      (pts.length ? pts : [e]).forEach(ev => {
        const p = posOf(ev);
        const m = { x: (last.x + p.x) / 2, y: (last.y + p.y) / 2 };
        c.beginPath(); c.moveTo(mid.x, mid.y); c.quadraticCurveTo(last.x, last.y, m.x, m.y); c.stroke();
        last = p; mid = m;
      });
      e.preventDefault();
    });
    const stop = e => {
      if (!drawing || (e.pointerId !== undefined && e.pointerId !== pid)) return;
      drawing = false; pid = null;
      checkCanvasProgress();
    };
    cv.addEventListener('pointerup', stop);
    cv.addEventListener('pointercancel', stop);
    cv.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
    function splat(p) {
      c.fillStyle = tool.color;
      const n = 8 + Math.floor(Math.random() * 8);
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const d = Math.random() * 60;
        c.beginPath();
        c.arc(p.x + Math.cos(a) * d, p.y + Math.sin(a) * d, 2 + Math.random() * 12, 0, Math.PI * 2);
        c.fill();
      }
      pushUndo();
      checkCanvasProgress();
    }
    function strokes() { return undoStack.length; }
    function checkCanvasProgress() { if (strokes() >= 12) finish(); }
    $$('[data-cc-mode]').forEach(btn => btn.addEventListener('click', () => {
      tool.mode = btn.getAttribute('data-cc-mode');
      tool.eraser = false;
      $$('[data-cc-mode]').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
      $$('[data-cc-eraser]').forEach(b => b.setAttribute('aria-pressed', 'false'));
      status(tool.mode === 'splatter' ? 'Splatter brush ready — tap anywhere!' : 'Brush ready — draw!');
    }));
    const er = $('[data-cc-eraser]');
    if (er) er.addEventListener('click', () => {
      tool.eraser = !tool.eraser;
      er.setAttribute('aria-pressed', String(tool.eraser));
      status(tool.eraser ? 'Eraser on — rub away!' : 'Back to painting.');
    });
    $$('[data-cc-size]').forEach(btn => btn.addEventListener('click', () => {
      tool.size = +btn.getAttribute('data-cc-size');
      $$('[data-cc-size]').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
      status('Brush size changed.');
    }));
    const undoBtn = $('[data-cc-undo]');
    if (undoBtn) undoBtn.addEventListener('click', () => {
      if (!undoStack.length) { status('Nothing to undo.'); return; }
      redoStack.push(cv.toDataURL('image/png'));
      applyImage(undoStack.pop());
      status('Undid one step.');
    });
    const redoBtn = $('[data-cc-redo]');
    if (redoBtn) redoBtn.addEventListener('click', () => {
      if (!redoStack.length) { status('Nothing to redo yet.'); return; }
      undoStack.push(cv.toDataURL('image/png'));
      applyImage(redoStack.pop());
      status('Redid one step.');
    });
    const clearBtn = $('[data-cc-clear]');
    if (clearBtn) clearBtn.addEventListener('click', () => {
      pushUndo();
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, cv.width, cv.height);
      status('Canvas cleared — white and ready!');
    });
    wireSave(() => ({ t: 'canvas', png: cv.toDataURL('image/webp', 0.7) || cv.toDataURL('image/png') }), 'my-' + slug + '-painting');
    if (!restore()) status('Choose a color and draw — or try the splatter brush!');
  }

  /* ---------- boot ---------- */
  root.setAttribute('data-cc-ready', 'true');
  try {
    if (root.classList.contains('cc-engine-fill')) fillEngine();
    else if (root.classList.contains('cc-engine-decorate')) decorateEngine();
    else if (root.classList.contains('cc-engine-mix')) mixEngine();
    else if (root.classList.contains('cc-engine-sequence')) sequenceEngine();
    else if (root.classList.contains('cc-engine-sort')) sortEngine();
    else if (root.classList.contains('cc-engine-canvas')) canvasEngine();
  } catch (e) { /* board stays visible */ }
})();
