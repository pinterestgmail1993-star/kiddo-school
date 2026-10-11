/* Coloring Pages — "Shape Coloring Fun" (Toddler 3, Class 9) — per-child
 * progress + printable-page buttons. Modeled on the Life Skills script:
 * same localStorage store, own band, same honest rules.
 *
 * Progress contract: key 'kiddo-adventures', one object per selected child
 * ('guest' when none), band 'coloring', with opened/completed maps. Opening
 * an activity page records `opened` — and NOTHING else. A coloring page
 * becomes `completed` only when the child's own colored picture is really
 * saved (the write-color engine announces a save with the 'kiddo-wc-save'
 * event). The "Cleared!" ribbons stay hidden until then.
 *
 * The child's actual STROKES are saved and restored by write-color.js via
 * the opt-in data-wc-restore attribute — this file only handles progress,
 * ribbons and the printable pages' download/print buttons.
 */
(function () {
  'use strict';

  var BAND = 'coloring';

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

  /* ---------- the activity page: open = opened, save = completed ---------- */
  var activity = document.querySelector('[data-coloring-activity]');
  if (activity) {
    var slug = activity.getAttribute('data-coloring-activity');
    var b = band();
    if (!b.opened[slug]) { b.opened[slug] = Date.now(); saveBand(b); }
    if (b.completed[slug]) revealDone(slug);

    document.addEventListener('kiddo-wc-save', function (e) {
      if (!e || !e.detail || e.detail.name.indexOf('coloring') === -1) return; /* only this page's picture */
      var bb = band();
      bb.opened[slug] = bb.opened[slug] || Date.now();
      var first = !bb.completed[slug];
      bb.completed[slug] = Date.now();
      saveBand(bb);
      if (first) revealDone(slug);
    });

    function revealDone(s) {
      var line = document.querySelector('[data-cp-progress]');
      var done = document.querySelector('.fc2-rail [data-cp-done]');
      if (done) done.hidden = false;
      if (line) line.hidden = true;
      var cardDone = document.querySelector('[data-coloring-card="' + s + '"] [data-cp-done]');
      if (cardDone) cardDone.hidden = false;
    }
  }

  /* ---------- class page + any shelf: completion ribbons ---------- */
  var cards = document.querySelectorAll('[data-coloring-card]');
  for (var i = 0; i < cards.length; i++) {
    var s = cards[i].getAttribute('data-coloring-card');
    var bb = band();
    if (bb.completed[s]) {
      var badge = cards[i].querySelector('[data-cp-done]');
      if (badge) badge.hidden = false;
    }
  }

  /* ---------- printable pages: download + print ---------- */
  var dl = document.querySelector('[data-cp-download]');
  if (dl) dl.addEventListener('click', function () {
    var url = dl.getAttribute('data-cp-download');
    var name = dl.getAttribute('data-cp-filename') || 'coloring-page.webp';
    fetch(url).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.blob(); })
      .then(function (blob) {
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
        var note = dl.parentNode.parentNode.querySelector('.fc-hint');
        if (note) note.textContent = 'Saved as ' + name + ' — look in your downloads.';
      })
      .catch(function () { /* CORS or offline: fall back to a plain tab open */
        window.open(url, '_blank', 'noopener');
      });
  });

  var printBtn = document.querySelector('[data-cp-print]');
  if (printBtn) printBtn.addEventListener('click', function () { window.print(); });
})();
