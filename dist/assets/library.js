// Kiddo School Library — category and age filters that work together.
// Without JavaScript the chips are plain anchors that jump to the matching
// shelf; with JavaScript they filter the shelf in place, combine with each
// other, and reveal a friendly empty state when a filter leaves a shelf
// with nothing on it. No scores, no tracking, nothing stored.
(function () {
  'use strict';
  var root = document.querySelector('[data-library]');
  if (!root) return;
  var sections = [].slice.call(root.querySelectorAll('[data-lib-section]'));
  var catChips = [].slice.call(root.querySelectorAll('[data-cat]'));
  var ageChips = [].slice.call(root.querySelectorAll('[data-age-chip]'));
  if (!sections.length) return;
  var activeCat = null, activeAge = null;

  function smooth() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  }
  function apply() {
    sections.forEach(function (sec) {
      var show = !activeCat || activeCat === sec.getAttribute('data-cat');
      sec.hidden = !show;
      if (!show) return;
      var cards = [].slice.call(sec.querySelectorAll('[data-lib-card]'));
      var visible = 0;
      cards.forEach(function (card) {
        var ok = !activeAge || card.getAttribute('data-age') === activeAge;
        card.hidden = !ok;
        if (ok) visible++;
      });
      var empty = sec.querySelector('[data-lib-empty]');
      if (empty) empty.hidden = !(cards.length && !visible);
    });
    catChips.forEach(function (chip) {
      var on = activeCat === chip.getAttribute('data-cat');
      chip.classList.toggle('is-on', on);
      if (on) chip.setAttribute('aria-pressed', 'true'); else chip.removeAttribute('aria-pressed');
    });
    ageChips.forEach(function (chip) {
      var on = activeAge === chip.getAttribute('data-age-chip');
      chip.classList.toggle('is-on', on);
      if (on) chip.setAttribute('aria-pressed', 'true'); else chip.removeAttribute('aria-pressed');
    });
  }
  catChips.forEach(function (chip) {
    chip.addEventListener('click', function (e) {
      e.preventDefault();
      var id = chip.getAttribute('data-cat');
      activeCat = activeCat === id ? null : id;
      apply();
      if (activeCat) {
        var target = root.querySelector('[data-lib-section]:not([hidden])');
        if (target) target.scrollIntoView({ behavior: smooth(), block: 'start' });
      }
    });
  });
  ageChips.forEach(function (chip) {
    chip.addEventListener('click', function (e) {
      e.preventDefault();
      var id = chip.getAttribute('data-age-chip');
      activeAge = activeAge === id ? null : id;
      apply();
    });
  });
})();
