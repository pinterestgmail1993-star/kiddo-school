// Kiddo School How-to-Draw viewer — one reusable step player for every
// drawing tutorial (Activities → Drawing). The page ships all six steps in
// the HTML; without JavaScript they read as a simple stacked lesson. With
// JavaScript this script turns the same markup into a one-step-at-a-time
// viewer: Previous / Next, a "Step N of 6" counter with dot progress, a
// restart after the final step, ←/→ arrow keys while the lesson is on
// screen, and preloading of the neighboring picture so the next step is
// ready before it is shown. No scores, timers, ads, storage or fetches,
// and no animations — steps change instantly (prefers-reduced-motion is
// respected by never animating in the first place).
(function () {
  'use strict';
  var root = document.querySelector('[data-drawing-tutorial]');
  if (!root) return;
  var steps = [].slice.call(root.querySelectorAll('[data-dt-step]'));
  if (!steps.length) return;
  var N = steps.length;
  var count = root.querySelector('[data-dt-count]');
  var dotsWrap = root.querySelector('[data-dt-dots]');
  var dots = [].slice.call(root.querySelectorAll('[data-dt-dot]'));
  var prevBtn = root.querySelector('[data-dt-prev]');
  var nextBtn = root.querySelector('[data-dt-next]');
  var donePanel = root.querySelector('[data-dt-complete]');
  var restartBtn = root.querySelector('[data-dt-restart]');
  var i = 0;

  function preload(n) {
    var img = steps[n] && steps[n].querySelector('img');
    if (img && !img.complete && img.src) {
      var p = new Image();
      p.src = img.src;
    }
  }

  function apply() {
    steps.forEach(function (s, k) {
      if (k === i) s.classList.add('is-current');
      else s.classList.remove('is-current');
    });
    if (count) count.textContent = 'Step ' + (i + 1) + ' of ' + N;
    dots.forEach(function (d, k) {
      if (k === i) d.classList.add('is-on');
      else d.classList.remove('is-on');
    });
    if (prevBtn) prevBtn.hidden = i === 0;
    if (nextBtn) nextBtn.hidden = i === N - 1;
    if (donePanel) donePanel.hidden = i !== N - 1;
    preload(i + 1);
    preload(i - 1);
  }

  function go(n, adjustScroll) {
    i = Math.max(0, Math.min(N - 1, n));
    apply();
    if (adjustScroll) {
      var stage = steps[i].querySelector('.dt-stage');
      if (stage) {
        var top = stage.getBoundingClientRect().top;
        if (top < 0 || top > window.innerHeight - 120) {
          stage.scrollIntoView({ block: 'start', behavior: 'auto' });
        }
      }
    }
  }

  // One-step-at-a-time mode: CSS keys off .dt-js so the stacked, JS-free
  // reading of the same markup stays available when scripts are off.
  root.classList.add('dt-js');
  if (count) count.hidden = false;
  if (dotsWrap) dotsWrap.hidden = false;
  if (prevBtn) prevBtn.hidden = true;
  if (nextBtn) nextBtn.hidden = N > 1;
  apply();

  if (prevBtn) prevBtn.addEventListener('click', function () { go(i - 1, true); });
  if (nextBtn) nextBtn.addEventListener('click', function () { go(i + 1, true); });
  if (restartBtn) restartBtn.addEventListener('click', function () { go(0, true); });

  // Arrow keys work while the lesson is on screen; they never hijack the
  // page when the viewer is scrolled away or a form field has focus.
  document.addEventListener('keydown', function (e) {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    var t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT')) return;
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    var r = root.getBoundingClientRect();
    if (r.bottom < 80 || r.top > window.innerHeight - 80) return;
    if (e.key === 'ArrowRight') go(i + 1, true); else go(i - 1, true);
  });
})();
