/* Life Skills & Good Habits (Class 32) — per-child progress + worksheet buttons.
 *
 * Progress contract (the school's existing localStorage store, same as the
 * adventure libraries): key 'kiddo-adventures', one object per selected
 * child ('guest' when none), band 'life-skills', with opened/completed
 * maps. Opening an activity page records `opened` — and NOTHING else.
 * An activity becomes `completed` only when the child's own marked-up
 * sheet is really saved (the write-color engine announces a save with the
 * 'kiddo-wc-save' event). The "Cleared!" ribbons stay hidden until then.
 *
 * Worksheet pages get a cross-origin download button (fetch → blob → save,
 * the bucket's CORS already allows it) and a print button that prints just
 * the sheet.
 */
(function () {
  'use strict';

  var BAND = 'life-skills';

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
  var activity = document.querySelector('[data-ls-activity]');
  if (activity) {
    var slug = activity.getAttribute('data-ls-activity');
    var b = band();
    if (!b.opened[slug]) { b.opened[slug] = Date.now(); saveBand(b); }
    if (b.completed[slug]) revealDone(slug);

    document.addEventListener('kiddo-wc-save', function (e) {
      if (!e || !e.detail || e.detail.name.indexOf('life skills') === -1) return; /* only this page's sheet */
      var bb = band();
      bb.opened[slug] = bb.opened[slug] || Date.now();
      var first = !bb.completed[slug];
      bb.completed[slug] = Date.now();
      saveBand(bb);
      if (first) revealDone(slug);
    });

    function revealDone(s) {
      var line = document.querySelector('[data-ls-progress]');
      var done = document.querySelector('[data-ls-done]');
      if (done) done.hidden = false;
      if (line) line.hidden = true;
      var cardDone = document.querySelector('[data-ls-card="' + s + '"] [data-ls-done]');
      if (cardDone) cardDone.hidden = false;
    }
  }

  /* ---------- class page + any shelf: completion ribbons ---------- */
  var cards = document.querySelectorAll('[data-ls-card]');
  for (var i = 0; i < cards.length; i++) {
    var s = cards[i].getAttribute('data-ls-card');
    var bb = band();
    if (bb.completed[s]) {
      var badge = cards[i].querySelector('[data-ls-done]');
      if (badge) badge.hidden = false;
    }
  }

  /* ---------- worksheet pages: download + print ---------- */
  var dl = document.querySelector('[data-ls-download]');
  if (dl) dl.addEventListener('click', function () {
    var url = dl.getAttribute('data-ls-download');
    var name = dl.getAttribute('data-ls-filename') || 'life-skills-worksheet.webp';
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

  var printBtn = document.querySelector('[data-ls-print]');
  if (printBtn) printBtn.addEventListener('click', function () { window.print(); });
})();
