// Kiddo School — the hub filter engine for /flashcards/ and /worksheets/.
// The owner's four axes (age, level, subject, skill) as chip rows over each
// wall: tapping a chip filters the wall in place; chips from different rows
// team up (AND across rows); tapping a chip again lets it go. The count and
// the Clear button keep the bar honest, and a friendly empty state appears
// when a mix matches nothing.
//
// Without JavaScript nothing is lost: every chip is a real anchor to its
// shelf (flashcards) or category page (worksheets), so the bar still
// navigates. No scores, no tracking, nothing stored.
(function () {
  'use strict';
  var root = document.querySelector('[data-hub-filters]');
  if (!root) return;
  // Chips live inside the bar; cards and shelves live on the page around it.
  var chips = [].slice.call(root.querySelectorAll('a[data-filter]'));
  var cards = [].slice.call(document.querySelectorAll('[data-filters]'));
  var sections = [].slice.call(document.querySelectorAll('[data-hub-section]'));
  var count = document.querySelector('[data-filter-count]');
  var clearBtn = root.querySelector('[data-filter-clear]');
  var empty = document.querySelector('[data-filters-empty]');
  var unit = root.getAttribute('data-unit') || 'items';
  var total = cards.length;
  if (!chips.length || !cards.length) return;
  var active = {}; // group → token or falsy

  function smooth() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  }

  function apply() {
    var groups = Object.keys(active).filter(function (g) { return active[g]; });
    var visible = 0;
    cards.forEach(function (card) {
      var toks = (card.getAttribute('data-filters') || '').split(/\s+/);
      var ok = true;
      for (var i = 0; i < groups.length; i++) {
        if (toks.indexOf(active[groups[i]]) < 0) { ok = false; break; }
      }
      card.hidden = !ok;
      if (ok) visible++;
    });
    // A shelf with no matching sets folds away entirely.
    sections.forEach(function (sec) {
      var inner = [].slice.call(sec.querySelectorAll('[data-filters]'));
      sec.hidden = !inner.some(function (c) { return !c.hidden; });
    });
    if (count) {
      count.textContent = visible === total
        ? 'Showing all ' + total + ' ' + unit
        : 'Showing ' + visible + ' of ' + total + ' ' + unit;
    }
    if (empty) empty.hidden = visible !== 0;
    if (clearBtn) clearBtn.hidden = !groups.length;
    chips.forEach(function (chip) {
      var on = active[chip.getAttribute('data-group')] === chip.getAttribute('data-filter');
      chip.classList.toggle('is-on', on);
      if (on) chip.setAttribute('aria-pressed', 'true'); else chip.removeAttribute('aria-pressed');
    });
    // When a chip turns ON, bring the first matching shelf into view so the
    // result is on screen, not above it. Clearing never yanks the page.
    if (groups.length) {
      var first = null;
      for (var i = 0; i < sections.length && !first; i++) {
        if (!sections[i].hidden) first = sections[i];
      }
      if (!first && visible) first = cards.find(function (c) { return !c.hidden; }) || null;
      if (first && first.scrollIntoView) first.scrollIntoView({ behavior: smooth(), block: 'start' });
    }
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function (e) {
      e.preventDefault();
      var g = chip.getAttribute('data-group');
      var tok = chip.getAttribute('data-filter');
      active[g] = active[g] === tok ? null : tok;
      apply();
    });
  });
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      active = {};
      apply();
    });
  }
})();
