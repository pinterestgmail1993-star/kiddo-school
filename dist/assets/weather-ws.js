/* Weather, Seasons & What We Wear (Class 34) — per-child progress +
 * worksheet buttons. Mirrors community-ws.js exactly, with its own progress
 * band so classes never mix: key 'kiddo-adventures', band
 * 'weather-worksheets', one slot per selected child. Opening an activity
 * page records `opened` — and NOTHING else. An activity becomes `completed`
 * only when the child's own marked-up sheet is really saved (the write-color
 * engine announces a save with the 'kiddo-wc-save' event). The "Cleared!"
 * ribbons stay hidden until then. Printable pages get the cross-origin
 * download button and the print button.
 */
(function () {
  'use strict';

  var BAND = 'weather-worksheets';

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
  var activity = document.querySelector('[data-wxws-activity]');
  if (activity) {
    var slug = activity.getAttribute('data-wxws-activity');
    var b = band();
    if (!b.opened[slug]) { b.opened[slug] = Date.now(); saveBand(b); }
    if (b.completed[slug]) revealDone(slug);

    document.addEventListener('kiddo-wc-save', function (e) {
      if (!e || !e.detail || e.detail.name.indexOf('weather seasons worksheet') === -1) return; /* only this page's sheet */
      var bb = band();
      bb.opened[slug] = bb.opened[slug] || Date.now();
      var first = !bb.completed[slug];
      bb.completed[slug] = Date.now();
      saveBand(bb);
      if (first) revealDone(slug);
    });

    function revealDone(s) {
      var line = document.querySelector('[data-wxws-progress]');
      var done = document.querySelector('[data-wxws-progress-block] [data-wxws-done]');
      if (done) done.hidden = false;
      if (line) line.hidden = true;
      var cardDone = document.querySelector('[data-wxws-card="' + s + '"] [data-wxws-done]');
      if (cardDone) cardDone.hidden = false;
    }
  }

  /* ---------- class page + any shelf: completion ribbons ---------- */
  var cards = document.querySelectorAll('[data-wxws-card]');
  for (var i = 0; i < cards.length; i++) {
    var s = cards[i].getAttribute('data-wxws-card');
    var bb = band();
    if (bb.completed[s]) {
      var badge = cards[i].querySelector('[data-wxws-done]');
      if (badge) badge.hidden = false;
    }
  }

  /* ---------- printable pages: download + print ---------- */
  var dl = document.querySelector('[data-wxws-download]');
  if (dl) dl.addEventListener('click', function () {
    var url = dl.getAttribute('data-wxws-download');
    var name = dl.getAttribute('data-wxws-filename') || 'weather-seasons-worksheet.webp';
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

  var printBtn = document.querySelector('[data-wxws-print]');
  if (printBtn) printBtn.addEventListener('click', function () { window.print(); });
})();
