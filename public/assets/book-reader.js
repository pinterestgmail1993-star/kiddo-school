// Kiddo School Book Reader — one reusable component for every Kiddo School
// digital book. It reads a small JSON spec from [data-book-data] and builds:
//   wide screens  → a physical open book: closed cover, then two-page
//                   spreads with a gentle 3D page turn (real DOM state,
//                   never a prerecorded animation)
//   phones        → one landscape page at a time, swipe or buttons
// Controls: Previous, Next, page indicator, Restart Book, Back to Library,
// and an optional grown-up reading-prompt toggle. Keyboard: ←/→ arrows.
// No scores, timers, autoplay, ads or storage — reading is at your pace.
// Motion honors prefers-reduced-motion (instant page change instead of the
// 3D turn), and only the next/previous pages are ever preloaded.
(function () {
  'use strict';
  var root = document.querySelector('[data-book-reader]');
  if (!root) return;
  var dataEl = root.querySelector('[data-book-data]');
  if (!dataEl) return;
  var book;
  try { book = JSON.parse(dataEl.textContent); } catch (e) { return; }
  if (!book || !book.pages || !book.pages.length) return;

  var P = book.pages.length;               // story pages (Bunny: 8)
  var END = P + 1;                         // sentinel: completion face
  var INSIDE = -1;                         // sentinel: inside cover face
  var mqSpread = window.matchMedia('(min-width: 860px) and (min-height: 520px)');
  var mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var FLIP_MS = 850, SLIDE_MS = 240;
  var mode, state, animating, promptsOn, seen, els, flipTimer;

  // ---------- spread model: spread k shows faces [left,right] ----------
  // 1: [inside cover | page 1] · 2: [2 | 3] · … · last: [page P | end]
  var SPREADS = (function () {
    var list = [], k = 1, K = Math.ceil((P + 1) / 2) + (P % 2);
    for (; k <= K; k++) {
      var left = k === 1 ? INSIDE : (2 * k - 2 <= P ? 2 * k - 2 : END);
      var right = 2 * k - 1 <= P ? 2 * k - 1 : END;
      list.push([left, right]);
    }
    return list;
  })();

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // ---------- faces ----------
  function faceFor(n) {
    if (n === INSIDE) {
      return '<div class="bk-page bk-inside"><div class="bk-stamp"><span class="bk-stamp-name" aria-hidden="true">KIDDO SCHOOL</span>' +
        '<p aria-hidden="true">' + esc(book.title) + ' belongs to our little readers.</p></div>' +
        '<p class="bk-taphint" aria-hidden="true">Tap the right page to turn it.</p></div>';
    }
    if (n === END) {
      return '<div class="bk-page bk-end"><p class="bk-end-title">' + esc(book.completionTitle) + '</p>' +
        '<p class="bk-end-sub">' + esc(book.completionSub) + '</p>' +
        '<div class="bk-end-actions"><button type="button" class="button" data-bk-again>Read Again</button>' +
        '<a class="button button-ghost" href="' + esc(book.backHref) + '">' + esc(book.backLabel) + '</a></div></div>';
    }
    if (n === 0) { // closed cover
      return '<div class="bk-page bk-cover"><img src="' + esc(book.cover.src) + '" width="' + book.cover.w + '" height="' + book.cover.h + '" alt="' + esc(book.cover.alt) + '"></div>';
    }
    var p = book.pages[n - 1];
    return '<div class="bk-page">' +
      '<img src="' + esc(p.src) + '" width="' + p.w + '" height="' + p.h + '" alt="' + esc(p.alt) + '">' +
      (p.prompt && promptsOn ? '<p class="bk-prompt">' + esc(p.prompt) + '</p>' : '') +
      '<p class="bk-pagetext">' + esc(p.text) + '</p>' +
      '<span class="bk-folio" aria-hidden="true">' + n + '</span></div>';
  }

  // ---------- build the stage ----------
  function build() {
    mode = mqSpread.matches ? 'spread' : 'single';
    root.querySelector('[data-bk-stage]') && root.querySelector('[data-bk-stage]').remove();
    root.querySelector('[data-bk-bar]') && root.querySelector('[data-bk-bar]').remove();
    var stage = document.createElement('div');
    stage.className = 'bk-stage' + (mode === 'spread' ? ' bk-stage--spread' : ' bk-stage--single');
    stage.setAttribute('data-bk-stage', '');
    stage.setAttribute('role', 'group');
    stage.setAttribute('aria-label', book.title + ' — book reader');
    if (mode === 'spread') {
      stage.innerHTML =
        '<div class="bk-book" data-bk-book>' +
        ' <div class="bk-slot bk-slot--left" data-bk-left></div>' +
        ' <div class="bk-slot bk-slot--right" data-bk-right></div>' +
        ' <div class="bk-leaf" data-bk-leaf aria-hidden="true" hidden><div class="bk-leafface bk-leafface--front"></div><div class="bk-leafface bk-leafface--back"></div></div>' +
        '</div>' +
        '<button type="button" class="bk-hit bk-hit--prev" data-bk-prev aria-label="Previous page"></button>' +
        '<button type="button" class="bk-hit bk-hit--next" data-bk-next aria-label="Next page"></button>';
    } else {
      stage.innerHTML =
        '<div class="bk-single" data-bk-single></div>' +
        '<button type="button" class="bk-hit bk-hit--prev" data-bk-prev aria-label="Previous page"></button>' +
        '<button type="button" class="bk-hit bk-hit--next" data-bk-next aria-label="Next page"></button>';
    }
    var bar = document.createElement('div');
    bar.className = 'bk-bar';
    bar.setAttribute('data-bk-bar', '');
    bar.innerHTML =
      '<div class="bk-bar-main">' +
      ' <button type="button" class="button button-ghost" data-bk-prev2>Previous</button>' +
      ' <span class="bk-indicator" data-bk-indicator role="status" aria-live="polite">Cover</span>' +
      ' <button type="button" class="button" data-bk-next2>Next</button>' +
      '</div>' +
      '<div class="bk-bar-extra">' +
      ' <button type="button" class="button button-ghost bk-small" data-bk-restart>Restart Book</button>' +
      ' <button type="button" class="button button-ghost bk-small" data-bk-prompts aria-pressed="' + (promptsOn ? 'true' : 'false') + '">Reading prompts: ' + (promptsOn ? 'on' : 'off') + '</button>' +
      ' <a class="button button-ghost bk-small" href="' + esc(book.backHref) + '">' + esc(book.backLabel) + '</a>' +
      '</div>';
    var staticBox = root.querySelector('[data-bk-static]');
    if (staticBox) staticBox.remove();
    root.appendChild(stage);
    root.appendChild(bar);

    els = {
      stage: stage,
      book: stage.querySelector('[data-bk-book]'),
      left: stage.querySelector('[data-bk-left]'),
      right: stage.querySelector('[data-bk-right]'),
      single: stage.querySelector('[data-bk-single]'),
      leaf: stage.querySelector('[data-bk-leaf]'),
      leafFront: stage.querySelector('.bk-leafface--front'),
      leafBack: stage.querySelector('.bk-leafface--back'),
      indicator: bar.querySelector('[data-bk-indicator]'),
      prevs: [stage.querySelector('[data-bk-prev]'), bar.querySelector('[data-bk-prev2]')],
      nexts: [stage.querySelector('[data-bk-next]'), bar.querySelector('[data-bk-next2]')],
      restart: bar.querySelector('[data-bk-restart]'),
      prompts: bar.querySelector('[data-bk-prompts]'),
      again: null
    };
    bindEvents();
    render(state, { instant: true });
  }

  // ---------- rendering ----------
  function maxState() { return mode === 'spread' ? SPREADS.length : P + 1; }
  // Conceptual faces for every state, including the closed cover (state 0).
  function facesOf(s) { return s === 0 ? [INSIDE, 0] : SPREADS[s - 1]; }
  function leftFaceHTML(s) {
    if (s === 0) return '<div class="bk-desk" aria-hidden="true"><span class="bk-desk-hint">Tap the cover to open the book</span></div>';
    return faceFor(facesOf(s)[0]);
  }
  function rightFaceHTML(s) { return faceFor(facesOf(s)[1]); }

  function indicatorText(s) {
    if (s === 0) return 'Cover';
    if (mode === 'single') return s === P + 1 ? 'The end' : 'Page ' + s + ' of ' + P;
    var faces = SPREADS[s - 1];
    if (faces[0] === END || faces[1] === END) return 'Page ' + P + ' of ' + P + ' — the end';
    return 'Page ' + faces[1] + ' of ' + P;
  }

  function render(s, opts) {
    opts = opts || {};
    els.book && els.book.classList.toggle('bk-book--closed', mode === 'spread' && s === 0);
    if (mode === 'spread') {
      els.left.innerHTML = leftFaceHTML(s);
      els.right.innerHTML = rightFaceHTML(s);
    } else {
      els.single.innerHTML = faceFor(s === 0 ? 0 : (s === P + 1 ? END : s));
      var card = els.single.firstElementChild;
      if (card && !opts.instant && !mqReduce.matches) {
        card.classList.add(opts.dir > 0 ? 'bk-enter-next' : 'bk-enter-prev');
      }
    }
    els.indicator.textContent = indicatorText(s);
    // prev disabled only on the closed cover; next disabled once the end face is shown
    var endShown = mode === 'single' ? s === P + 1 : (s > 0 && SPREADS[s - 1].indexOf(END) !== -1);
    var prevOff = s === 0;
    var nextOff = endShown || (mode === 'spread' && s === SPREADS.length && SPREADS[s - 1].indexOf(END) !== -1);
    els.prevs.concat(els.nexts).forEach(function (b) { if (b) b.disabled = false; });
    els.prevs.forEach(function (b) { if (b) b.disabled = prevOff; });
    els.nexts.forEach(function (b) { if (b) b.disabled = nextOff; });
    preloadAround(s);
  }

  // ---------- turning pages ----------
  function go(dir) {
    if (animating) return;
    var target = state + dir;
    if (target < 0 || target > maxState()) return;
    if (dir > 0 && els.nexts[0] && els.nexts[0].disabled) return;
    if (dir < 0 && els.prevs[0] && els.prevs[0].disabled) return;
    if (mqReduce.matches) { state = target; render(state, { instant: true, dir: dir }); return; }
    if (mode === 'spread') flipTo(target, dir); else slideTo(target, dir);
  }

  function leafTurn(from, to, dir) {
    // One leaf carries the turn: front = right face of the older spread,
    // back = left face of the newer spread. Under-layers are swapped first,
    // hidden beneath the leaf, so both sides look continuous.
    var oldFaces = facesOf(from);
    var newFaces = facesOf(to);
    var frontFace, backFace;
    if (dir > 0) {
      frontFace = oldFaces[1];
      backFace = newFaces[0];
      els.right.innerHTML = rightFaceHTML(to); // waits under the leaf
    } else {
      frontFace = newFaces[1];
      backFace = oldFaces[0];
      els.left.innerHTML = leftFaceHTML(to); // waits under the leaf
    }
    els.leafFront.innerHTML = faceFor(frontFace);
    els.leafBack.innerHTML = faceFor(backFace);
    animating = true;
    els.leaf.hidden = false;
    if (dir > 0) {
      els.leaf.style.transition = 'none';
      els.leaf.style.transform = 'rotateY(0deg)';
      void els.leaf.offsetWidth; // flush so the start position is committed
      els.leaf.style.transition = '';
      els.leaf.style.transform = 'rotateY(-180deg)';
    } else {
      els.leaf.style.transition = 'none';
      els.leaf.style.transform = 'rotateY(-180deg)';
      void els.leaf.offsetWidth;
      els.leaf.style.transition = '';
      els.leaf.style.transform = 'rotateY(0deg)';
    }
    flipTimer = window.setTimeout(function () { finishTurn(to, dir); }, FLIP_MS + 60);
  }

  function finishTurn(to, dir) {
    if (mode !== 'spread') return;
    els.left.innerHTML = leftFaceHTML(to);
    els.right.innerHTML = rightFaceHTML(to);
    els.leaf.hidden = true;
    els.leafFront.innerHTML = '';
    els.leafBack.innerHTML = '';
    animating = false;
    state = to;
    render(state, { instant: true, dir: dir });
  }

  function flipTo(target, dir) { leafTurn(state, target, dir); }

  function slideTo(target, dir) {
    state = target;
    render(state, { dir: dir });
  }

  // ---------- performance: preload only neighbouring pages ----------
  function preload(url) {
    if (!url || seen[url]) return;
    seen[url] = true;
    var img = new Image();
    img.src = url;
  }
  function preloadAround(s) {
    var list = [];
    if (mode === 'spread') {
      if (SPREADS[s]) list.push(SPREADS[s][0], SPREADS[s][1]);
      if (SPREADS[s - 2]) list.push(SPREADS[s - 2][0], SPREADS[s - 2][1]);
    } else {
      if (s + 1 <= P + 1) list.push(s + 1);
      if (s - 1 >= 0) list.push(s - 1);
    }
    list.forEach(function (n) {
      if (n === 0) preload(book.cover.src);
      else if (n >= 1 && n <= P) preload(book.pages[n - 1].src);
    });
  }

  // ---------- events ----------
  function bindEvents() {
    [els.prevs[0], els.prevs[1]].forEach(function (b) { if (b) b.addEventListener('click', function () { go(-1); }); });
    [els.nexts[0], els.nexts[1]].forEach(function (b) { if (b) b.addEventListener('click', function () { go(1); }); });
    els.restart.addEventListener('click', function () {
      if (flipTimer) window.clearTimeout(flipTimer);
      animating = false;
      if (mode === 'spread') { els.leaf.hidden = true; }
      state = 0;
      render(0, { instant: true });
    });
    els.prompts.addEventListener('click', function () {
      promptsOn = !promptsOn;
      els.prompts.setAttribute('aria-pressed', String(promptsOn));
      els.prompts.textContent = 'Reading prompts: ' + (promptsOn ? 'on' : 'off');
      render(state, { instant: true });
    });
    els.stage.addEventListener('click', function (e) {
      var again = e.target.closest && e.target.closest('[data-bk-again]');
      if (again) {
        if (flipTimer) window.clearTimeout(flipTimer);
        animating = false;
        state = 0;
        render(0, { instant: true });
      }
    });
    // swipe (phones): touch only — mouse users have buttons and hit zones
    var sx = 0, sy = 0, tracking = false;
    els.stage.addEventListener('touchstart', function (e) {
      if (!e.touches.length) return;
      tracking = true; sx = e.touches[0].clientX; sy = e.touches[0].clientY;
    }, { passive: true });
    els.stage.addEventListener('touchend', function (e) {
      if (!tracking) return;
      tracking = false;
      if (!e.changedTouches.length) return;
      var dx = e.changedTouches[0].clientX - sx;
      var dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.4) go(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  document.addEventListener('keydown', function (e) {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    var t = e.target;
    if (t && t.matches && t.matches('input, textarea, select, [contenteditable="true"]')) return;
    if (e.key === 'ArrowRight') { go(1); }
    else if (e.key === 'ArrowLeft') { go(-1); }
  });

  if (mqSpread.addEventListener) {
    mqSpread.addEventListener('change', function () {
      if (mode === (mqSpread.matches ? 'spread' : 'single')) return;
      var mapped = state;
      if (mqSpread.matches) { // single → spread
        mapped = state === P + 1 ? SPREADS.length : Math.max(1, Math.ceil((Math.min(state, P) + 1) / 2));
        if (state === 0) mapped = 0;
      } else {               // spread → single
        mapped = state === 0 ? 0 : Math.min(P + 1, SPREADS[state - 1][1] === END ? P + 1 : SPREADS[state - 1][1]);
      }
      if (flipTimer) window.clearTimeout(flipTimer);
      animating = false;
      state = Math.max(0, Math.min(mapped, maxState()));
      build();
    });
  }

  // ---------- boot ----------
  promptsOn = true;
  seen = {};
  state = 0;
  animating = false;
  var staticImg = root.querySelector('[data-bk-static] img');
  if (staticImg) seen[staticImg.getAttribute('src')] = true; // cover already in HTML
  build();
  // reopen gracefully if the browser restores a mid-book scroll position? No —
  // a book starts at the cover. Reading always starts at the beginning.
})();
