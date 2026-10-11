/* Write & Color — a transparent drawing layer over the real worksheet image.
 *
 * The owner's spec, followed exactly:
 *  1. The original worksheet image is shown whole (contain, never cropped).
 *  2. A transparent canvas is laid directly over the image, matched 1:1.
 *  3. Children write, trace, circle, connect and color with a mouse, finger
 *     or stylus (Pointer Events cover all three; stylus pressure fattens the
 *     line a little, exactly like pressing harder with a pencil).
 *  4. Pencil, pen, FILL (tap a region and it floods with the chosen color,
 *     stopping at the picture's own bold outlines), nine crayon colors,
 *     three line sizes, eraser, undo, redo, clear and save are provided.
 *  5. Alignment: the canvas backing store is the artwork's own pixel size
 *     (data-wc-w × data-wc-h), and pointer coordinates are scaled by the
 *     on-screen box, so strokes land under the pen on every screen size,
 *     portrait or landscape, mobile or desktop.
 *  6. Save composes the worksheet image and the drawing into one PNG and
 *     downloads it. Nothing is uploaded anywhere — the file never leaves the
 *     child's device.
 *
 * How the two layers work: the FILL layer sits directly on the picture (a
 * flood that stops at the sheet's outlines, so crayon stays inside the
 * lines), and the PENCIL/PEN/ERASER strokes live on a transparent layer
 * above it. Fills are stored as tiny ops and replayed against the sheet,
 * so undo, redo, clear and the per-child restore all stay exact.
 *
 * The engine mounts on every [data-wc] element. Without JavaScript the
 * worksheet image still shows (the markup inside the mount is the image
 * itself), and the download/print buttons on the page keep working.
 */
(function () {
  'use strict';

  var PURPLE = '#57306D';
  var CRAYONS = [
    ['Purple', '#57306D'], ['Red', '#d9402c'], ['Orange', '#ef8b2c'],
    ['Yellow', '#f2c230'], ['Green', '#3f9c4f'], ['Blue', '#2f6fde'],
    ['Pink', '#ee7aa8'], ['Brown', '#8b5a2b'], ['Black', '#2b2b2b']
  ];
  /* line sizes: a multiplier on each tool's own base width */
  var SIZES = [[1, 'Thin'], [1.9, 'Medium'], [3.2, 'Thick']];
  var BASE = { pencil: 3.2, pen: 6.5, erase: 22 };

  function slugify(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'worksheet';
  }
  function hexRgb(hex) {
    var n = parseInt(hex.slice(1), 16);
    return [n >> 16 & 255, n >> 8 & 255, n & 255];
  }

  function build(mount) {
    var src = mount.getAttribute('data-wc-src');
    var name = mount.getAttribute('data-wc-name') || 'worksheet';
    var w = parseInt(mount.getAttribute('data-wc-w'), 10);
    var h = parseInt(mount.getAttribute('data-wc-h'), 10);
    if (!src || !w || !h) return;

    var img = mount.querySelector('img');
    if (!img) return;

    /* ---- optional per-child save & restore (opt-in via data-wc-restore).
       Coloring activity pages set it; every other mount on the school is
       untouched. Strokes and fills live in localStorage under
       'kiddo-wc-art', one slot per selected child, so each child gets
       their own picture back. ---- */
    var restoreKey = mount.getAttribute('data-wc-restore') || null;
    function loadRestored() {
      if (!restoreKey) return null;
      try {
        var all = JSON.parse(localStorage.getItem('kiddo-wc-art')) || {};
        var me = all[childKey()] || {};
        var saved = me[restoreKey];
        if (Array.isArray(saved) && saved.length) {
          /* only ops that look like ops — never trust the store blindly */
          return saved.filter(function (s) {
            if (!s) return false;
            if (s.t === 'fill') return typeof s.x === 'number' && typeof s.y === 'number' && typeof s.c === 'string';
            return Array.isArray(s.pts) && s.pts.length;
          }).slice(-600);
        }
      } catch (e) { /* private mode or corrupt store: start clean */ }
      return null;
    }
    function childKey() {
      try { return JSON.parse(localStorage.getItem('kiddo-active')) || 'guest'; } catch (e) { return 'guest'; }
    }
    var persistTimer = null;
    function persist() {
      if (!restoreKey) return;
      clearTimeout(persistTimer);
      persistTimer = setTimeout(function () {
        try {
          var all = JSON.parse(localStorage.getItem('kiddo-wc-art')) || {};
          var me = all[childKey()] = all[childKey()] || {};
          if (ops.length) me[restoreKey] = ops.slice(-600);
          else delete me[restoreKey];
          localStorage.setItem('kiddo-wc-art', JSON.stringify(all));
        } catch (e) { /* quota or private mode: drawing still works, just not restored */ }
      }, 400);
    }

    /* ---- stage: the image, the fill layer, then the stroke canvas ---- */
    var stage = document.createElement('div');
    stage.className = 'wc-stage';
    img.parentNode.insertBefore(stage, img);
    stage.appendChild(img);
    img.className = 'wc-img';

    var fillCanvas = document.createElement('canvas');
    fillCanvas.className = 'wc-fill';
    fillCanvas.width = w;
    fillCanvas.height = h;
    fillCanvas.setAttribute('aria-hidden', 'true');
    stage.appendChild(fillCanvas);
    var fctx = fillCanvas.getContext('2d');

    var canvas = document.createElement('canvas');
    canvas.className = 'wc-canvas';
    canvas.width = w;
    canvas.height = h;
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'Drawing layer over the ' + name + ' worksheet. Choose a tool and a color below — pencil, pen, fill or eraser — then draw here.');
    stage.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    /* ---- state: vector ops, so undo is cheap and exact ----
       a stroke: {color, size, erase, pts:[[x,y,p],...]}
       a fill:   {t:'fill', x, y, c}                             */
    var ops = [];
    var restored = loadRestored();
    if (restored) ops = restored;   /* the child's picture comes back */
    var history = [];   /* snapshots of the ops array (references only) */
    var live = null;    /* stroke in progress */
    var color = PURPLE;
    var tool = 'pencil';   /* pencil | pen | fill | erase */
    var sizeMult = SIZES[1][0];   /* Medium by default */

    function snapshot() {
      history.push(ops.slice());
      if (history.length > 60) history.shift();
      future.length = 0;
      if (typeof redoBtn !== 'undefined' && redoBtn) redoBtn.disabled = true;
    }

    /* fast path: strokes only — fills never change while drawing */
    function redraw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < ops.length; i++) if (!ops[i].t) paintStroke(ops[i]);
    }
    /* full rebuild: replays fills (against the sheet) and strokes in order */
    function rebuildAll() {
      fctx.clearRect(0, 0, w, h);
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < ops.length; i++) {
        if (ops[i].t === 'fill') execFill(ops[i].x, ops[i].y, ops[i].c);
        else paintStroke(ops[i]);
      }
    }
    redraw();   /* also paints a restored picture before the first stroke */
    if (img.complete && img.naturalWidth) rebuildAll();   /* restored fills */
    img.addEventListener('load', rebuildAll);   /* fills replay once art is in */

    function paintStroke(s) {
      var pts = s.pts;
      if (!pts.length) return;
      ctx.globalCompositeOperation = s.erase ? 'destination-out' : 'source-over';
      ctx.strokeStyle = s.color;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      if (pts.length === 1) {
        /* a dot: a round cap needs a tiny move */
        ctx.beginPath();
        ctx.lineWidth = s.size * (pts[0][2] || 1);
        ctx.arc(pts[0][0], pts[0][1], (s.size * (pts[0][2] || 1)) / 2, 0, Math.PI * 2);
        ctx.fillStyle = s.erase ? 'rgba(0,0,0,1)' : s.color;
        ctx.fill();
        return;
      }
      ctx.lineWidth = s.size;
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      /* quadratic smoothing: control point = previous point, end = midpoint */
      for (var i = 1; i < pts.length - 1; i++) {
        var mx = (pts[i][0] + pts[i + 1][0]) / 2;
        var my = (pts[i][1] + pts[i + 1][1]) / 2;
        ctx.quadraticCurveTo(pts[i][0], pts[i][1], mx, my);
      }
      var last = pts[pts.length - 1];
      ctx.lineTo(last[0], last[1]);
      ctx.stroke();
    }

    /* ---- FILL: flood the sheet's own regions, stopping at its outlines.
       The boundary source is the sheet + current fills + strokes, so a
       hand-drawn line becomes a wall too, exactly like coloring on paper. */
    function execFill(x, y, col) {
      if (!img.complete || !img.naturalWidth) return false;
      var comp = document.createElement('canvas');
      comp.width = w; comp.height = h;
      var cctx = comp.getContext('2d');
      try {
        cctx.drawImage(img, 0, 0, w, h);
        cctx.drawImage(fillCanvas, 0, 0);
        cctx.drawImage(canvas, 0, 0);
        var data = cctx.getImageData(0, 0, w, h).data;
      } catch (err) {
        status.textContent = 'Fill could not read the picture in this browser — pencil, pen and eraser still work.';
        return false;
      }
      var px = Math.max(0, Math.min(w - 1, Math.round(x)));
      var py = Math.max(0, Math.min(h - 1, Math.round(y)));
      var start = (py * w + px) * 4;
      var sr = data[start], sg = data[start + 1], sb = data[start + 2];
      var rgb = hexRgb(col);
      var fr = rgb[0], fg = rgb[1], fb = rgb[2];
      var dr0 = sr - fr, dg0 = sg - fg, db0 = sb - fb;
      if (dr0 * dr0 + dg0 * dg0 + db0 * db0 < 64) return false;   /* already this color */
      var TOL = 1600;   /* squared channel distance: jumps anti-aliased edges, keeps outlines */
      var seen = new Uint8Array(w * h);
      var mask = new Uint8Array(w * h);
      var stack = [py * w + px];
      while (stack.length) {
        var idx = stack.pop();
        if (seen[idx]) continue;
        seen[idx] = 1;
        var i4 = idx * 4;
        var dr = data[i4] - sr, dg = data[i4 + 1] - sg, db = data[i4 + 2] - sb;
        if (dr * dr + dg * dg + db * db > TOL) continue;
        mask[idx] = 1;
        var ix = idx % w;
        if (ix > 0) stack.push(idx - 1);
        if (ix < w - 1) stack.push(idx + 1);
        if (idx >= w) stack.push(idx - w);
        if (idx < w * (h - 1)) stack.push(idx + w);
      }
      /* paint the masked region onto the fill layer (below the strokes) */
      var patch = document.createElement('canvas');
      patch.width = w; patch.height = h;
      var pctx = patch.getContext('2d');
      var pimg = pctx.createImageData(w, h);
      var p32 = new Uint32Array(pimg.data.buffer);
      var le = new Uint8Array(new Uint32Array([1]).buffer)[0] === 1;
      var pixel = le ? (255 << 24 | fb << 16 | fg << 8 | fr) : (fr << 24 | fg << 16 | fb << 8 | 255);
      for (var i = 0; i < mask.length; i++) if (mask[i]) p32[i] = pixel;
      pctx.putImageData(pimg, 0, 0);
      fctx.drawImage(patch, 0, 0);
      return true;
    }

    /* ---- pointer → canvas coordinates (the alignment contract) ---- */
    function toCanvas(e) {
      var r = canvas.getBoundingClientRect();
      return [
        (e.clientX - r.left) * (canvas.width / r.width),
        (e.clientY - r.top) * (canvas.height / r.height),
        e.pressure && e.pressure > 0 && e.pointerType !== 'mouse' ? 1 + e.pressure : 1
      ];
    }

    function strokeSize() {
      /* the pen should FEEL the same thickness on screen at every zoom:
         scale the screen pixel width up to the canvas resolution */
      var r = canvas.getBoundingClientRect();
      var scale = r.width > 0 ? canvas.width / r.width : 1;
      return BASE[tool === 'erase' ? 'erase' : tool] * sizeMult * scale;
    }

    function down(e) {
      if (e.button !== undefined && e.button !== 0 && e.pointerType === 'mouse') return;
      var pt = toCanvas(e);
      if (tool === 'fill') {
        if (execFill(pt[0], pt[1], color)) {
          snapshot();
          ops.push({ t: 'fill', x: pt[0], y: pt[1], c: color });
          persist();
        }
        e.preventDefault();
        return;
      }
      snapshot();
      live = { color: color, size: strokeSize(), erase: tool === 'erase', pts: [pt] };
      ops.push(live);
      paintStroke(live);
      e.preventDefault();
      try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* older browsers */ }
    }

    function move(e) {
      if (!live) return;
      live.pts.push(toCanvas(e));
      redraw();
      e.preventDefault();
    }

    function up(e) {
      if (!live) return;
      live = null;
      redraw();
      persist();
      if (e) e.preventDefault();
    }

    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    canvas.addEventListener('pointerleave', up);
    /* stop the page scrolling out from under a drawing finger */
    canvas.addEventListener('touchstart', function (e) { e.preventDefault(); }, { passive: false });

    /* ---- tools ---- */
    var bar = document.createElement('div');
    bar.className = 'wc-toolbar';
    bar.setAttribute('role', 'toolbar');
    bar.setAttribute('aria-label', 'Drawing tools for the ' + name + ' worksheet');

    function btn(label, pressed, onClick, cls) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = cls || 'wc-btn';
      b.textContent = label;
      b.setAttribute('aria-pressed', pressed ? 'true' : 'false');
      b.addEventListener('click', onClick);
      bar.appendChild(b);
      return b;
    }

    var toolBtns = {};
    function setTool(t) {
      tool = t;
      for (var k in toolBtns) toolBtns[k].setAttribute('aria-pressed', k === t ? 'true' : 'false');
    }
    toolBtns.pencil = btn('Pencil', true, function () { setTool('pencil'); });
    toolBtns.pen = btn('Pen', false, function () { setTool('pen'); });
    toolBtns.fill = btn('Fill', false, function () { setTool('fill'); });
    toolBtns.erase = btn('Eraser', false, function () { setTool('erase'); });

    /* line size: three dots, from a fine pencil line to a fat marker */
    var sizeBtns = [];
    SIZES.forEach(function (s) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'wc-btn wc-size';
      b.setAttribute('aria-label', s[1] + ' line size');
      b.setAttribute('aria-pressed', s[0] === sizeMult ? 'true' : 'false');
      var dot = document.createElement('span');
      dot.className = 'wc-dot';
      dot.setAttribute('data-size', s[0]);
      b.appendChild(dot);
      b.addEventListener('click', function () {
        sizeMult = s[0];
        sizeBtns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      });
      bar.appendChild(b);
      sizeBtns.push(b);
    });

    var swatches = CRAYONS.map(function (c) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'wc-swatch';
      b.style.background = c[1];
      b.setAttribute('aria-label', c[0] + ' crayon');
      b.setAttribute('aria-pressed', c[1] === color ? 'true' : 'false');
      b.title = c[0];
      b.addEventListener('click', function () {
        color = c[1];
        if (tool === 'erase') setTool('pencil');   /* a color pick leaves the eraser */
        swatches.forEach(function (s) { s.setAttribute('aria-pressed', s === b ? 'true' : 'false'); });
      });
      bar.appendChild(b);
      return b;
    });

    var undoBtn = btn('Undo', false, function () {
      if (history.length) { future.push(ops.slice()); redoBtn.disabled = false; ops = history.pop(); rebuildAll(); persist(); }
    });

    var future = [];   /* undone ops, for redo */
    var redoBtn = btn('Redo', false, function () {
      if (future.length) { ops = future.pop(); rebuildAll(); redoBtn.disabled = future.length === 0; persist(); }
    });
    redoBtn.disabled = true;

    var clearBtn = btn('Clear', false, function () {
      if (!ops.length) return;
      snapshot();
      ops = [];
      rebuildAll();
      persist();
    });

    var status = document.createElement('p');
    status.className = 'wc-note';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');

    var saveBtn = btn('Save my work', false, function () {
      if (!img.complete || !img.naturalWidth) { saveOverlayOnly(); return; }
      var out = document.createElement('canvas');
      out.width = w;
      out.height = h;
      var octx = out.getContext('2d');
      try {
        octx.drawImage(img, 0, 0, w, h);
        octx.drawImage(fillCanvas, 0, 0);
        octx.drawImage(canvas, 0, 0);
        out.toBlob(function (blob) {
          if (blob) downloadBlob(blob, 'kiddo-' + slugify(name) + '.png');
          else saveOverlayOnly();
        }, 'image/png');
      } catch (err) {
        /* the sheet could not be re-drawn (CORS) — save the drawing alone,
           and say so honestly instead of pretending */
        saveOverlayOnly();
      }
    }, 'wc-btn wc-save');

    /* the page can listen for real saved work: activity pages mark an
       activity complete only when this fires — never on page open */
    function announceSave(filename) {
      try { document.dispatchEvent(new CustomEvent('kiddo-wc-save', { detail: { name: name, file: filename } })); } catch (e) { /* old browsers still save */ }
    }

    function saveOverlayOnly() {
      var flat = document.createElement('canvas');
      flat.width = w; flat.height = h;
      var fl = flat.getContext('2d');
      fl.drawImage(fillCanvas, 0, 0);
      fl.drawImage(canvas, 0, 0);
      flat.toBlob(function (blob) {
        if (blob) {
          downloadBlob(blob, 'kiddo-' + slugify(name) + '-drawing.png');
          status.textContent = 'Saved the drawing on its own — the sheet picture could not be combined in this browser.';
        }
      }, 'image/png');
    }

    function downloadBlob(blob, filename) {
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
      status.textContent = 'Saved as ' + filename + ' — look in your downloads.';
      announceSave(filename);
    }

    bar.appendChild(saveBtn);
    bar.appendChild(status);

    /* the toolbar can live in a right-hand rail: the page points at it with
       data-wc-toolbar on a container; otherwise it sits under the sheet */
    var target = mount.getAttribute('data-wc-toolbar');
    var host = target ? document.querySelector(target) : null;
    if (host) host.appendChild(bar);
    else stage.parentNode.insertBefore(bar, stage.nextSibling);

    /* A CORS rejection can fire before this deferred script even runs, so
       handle an already-errored image here, not just in the listener. */
    function imgFailed() {
      if (img.getAttribute('crossorigin')) {
        img.removeAttribute('crossorigin');
        img.src = src;
        return;
      }
      bar.setAttribute('hidden', '');
      stage.setAttribute('hidden', '');
    }
    img.addEventListener('error', imgFailed);
    if (img.complete && img.naturalWidth === 0) imgFailed();
  }

  function init() {
    var mounts = document.querySelectorAll('[data-wc]');
    for (var i = 0; i < mounts.length; i++) {
      try { build(mounts[i]); } catch (e) { /* one broken mount must not stop the page */ }
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
