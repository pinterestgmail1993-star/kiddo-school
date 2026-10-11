/* Alphabet & Letter Sounds (Preschool 1, Class 15) — per-child progress for
 * the 26 letter activity pages. Modeled on matching-sorting.js: same
 * localStorage store, own band, same honest rules.
 *
 * Progress contract: key 'kiddo-adventures', one object per selected child
 * ('guest' when none), band 'alphabet-letters', with opened/completed maps.
 * Opening a letter page records `opened` — and NOTHING else. A letter
 * becomes `completed` only when the child's own drawing is really saved
 * (the write-color engine announces a save with the 'kiddo-wc-save' event).
 * The "Cleared!" ribbon stays hidden until then.
 *
 * The child's actual STROKES are saved and restored by write-color.js via
 * the opt-in data-wc-restore attribute — this file only handles progress.
 */
(function () {
  'use strict';

  var BAND = 'alphabet-letters';

  function storeGet(k, fb) {
    try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? fb : v; } catch (e) { return fb; }
  }
  function storeSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } }
  function childId() { return storeGet('kiddo-active', null) || 'guest'; }

  function band() {
    var all = storeGet('kiddo-adventures', {});
    var me = all[childId()] = all[childId()] || {};
    return me[BAND] = me[BAND] || { opened: {}, completed: {} };
  }
  function saveBand(b) {
    var all = storeGet('kiddo-adventures', {});
    all[childId()] = all[childId()] || {};
    all[childId()][BAND] = b;
    storeSet('kiddo-adventures', all);
  }

  /* ---------- the letter page: open = opened, save = completed ---------- */
  var activity = document.querySelector('[data-al-activity]');
  if (activity) {
    var slug = activity.getAttribute('data-al-activity');
    var b = band();
    if (!b.opened[slug]) { b.opened[slug] = Date.now(); saveBand(b); }
    if (b.completed[slug]) revealDone();

    document.addEventListener('kiddo-wc-save', function (e) {
      if (!e || !e.detail || e.detail.name.indexOf('alphabet activity') === -1) return; /* only this page's card */
      var bb = band();
      bb.opened[slug] = bb.opened[slug] || Date.now();
      var first = !bb.completed[slug];
      bb.completed[slug] = Date.now();
      saveBand(bb);
      if (first) revealDone();
    });
  }

  function revealDone() {
    var line = document.querySelector('[data-al-progress]');
    var done = document.querySelector('.fc2-rail [data-al-done]');
    if (done) done.hidden = false;
    if (line) line.hidden = true;
  }
})();
