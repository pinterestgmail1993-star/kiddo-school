/* Write & Color — a transparent drawing layer over the real worksheet image.
 *
 * The owner's spec, followed exactly:
 *  1. The original worksheet image is shown whole (contain, never cropped).
 *  2. A transparent canvas is laid directly over the image, matched 1:1.
 *  3. Children write, trace, circle, connect and color with a mouse, finger
 *     or stylus (Pointer Events cover all three; stylus pressure fattens the
 *     line a little, exactly like pressing harder with a pencil).
 *  4. Pencil, nine crayon colors, eraser, undo, clear and save are provided.
 *  5. Alignment: the canvas backing store is the artwork's own pixel size
 *     (data-wc-w × data-wc-h), and pointer coordinates are scaled by the
 *     on-screen box, so strokes land under the pen on every screen size,
 *     portrait or landscape, mobile or desktop.
 *  6. Save composes the worksheet image and the drawing into one PNG and
 *     downloads it. Nothing is uploaded anywhere — the file never leaves the
 *     child's device.
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

  function slugify(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'worksheet';
  }

  function build(mount) {
    var src = mount.getAttribute('data-wc-src');
    var name = mount.getAttribute('data-wc-name') || 'worksheet';
    var w = parseInt(mount.getAttribute('data-wc-w'), 10);
    var h = parseInt(mount.getAttribute('data-wc-h'), 10);
    if (!src || !w || !h) return;

    var img = mount.querySelector('img');
    if (!img) return;

    /* ---- stage: the image and, above it, the transparent canvas ---- */
    var stage = document.createElement('div');
    stage.className = 'wc-stage';
    img.parentNode.insertBefore(stage, img);
    stage.appendChild(img);
    img.className = 'wc-img';

    var canvas = document.createElement('canvas');
    canvas.className = 'wc-canvas';
    canvas.width = w;
    canvas.height = h;
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'Drawing layer over the ' + name + ' worksheet. Choose a color or the eraser below, then draw here.');
    stage.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    /* ---- state: vector strokes, so undo is cheap and exact ---- */
    var strokes = [];   /* each: {color, size, erase, pts:[[x,y,p],...]} */
    var history = [];   /* snapshots of the strokes array (references only) */
    var live = null;    /* stroke in progress */
    var color = PURPLE;
    var erasing = false;

    function snapshot() {
      history.push(strokes.slice());
      if (history.length > 60) history.shift();
    }

    function redraw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < strokes.length; i++) paintStroke(strokes[i]);
    }

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
      return erasing ? 22 * scale : 3.2 * scale;
    }

    function down(e) {
      if (e.button !== undefined && e.button !== 0 && e.pointerType === 'mouse') return;
      snapshot();
      live = { color: color, size: strokeSize(), erase: erasing, pts: [toCanvas(e)] };
      strokes.push(live);
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

    var pencilBtn = btn('Pencil', true, function () {
      erasing = false;
      pencilBtn.setAttribute('aria-pressed', 'true');
      eraserBtn.setAttribute('aria-pressed', 'false');
      swatches.forEach(function (s) { s.style.display = ''; });
    });
    var eraserBtn = btn('Eraser', false, function () {
      erasing = true;
      eraserBtn.setAttribute('aria-pressed', 'true');
      pencilBtn.setAttribute('aria-pressed', 'false');
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
        erasing = false;
        pencilBtn.setAttribute('aria-pressed', 'true');
        eraserBtn.setAttribute('aria-pressed', 'false');
        swatches.forEach(function (s) { s.setAttribute('aria-pressed', s === b ? 'true' : 'false'); });
      });
      bar.appendChild(b);
      return b;
    });

    var undoBtn = btn('Undo', false, function () {
      if (history.length) { strokes = history.pop(); redraw(); }
    });

    var clearBtn = btn('Clear', false, function () {
      if (!strokes.length) return;
      snapshot();
      strokes = [];
      redraw();
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

    function saveOverlayOnly() {
      canvas.toBlob(function (blob) {
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
    }

    bar.appendChild(saveBtn);
    bar.appendChild(status);

    stage.parentNode.insertBefore(bar, stage.nextSibling);

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
