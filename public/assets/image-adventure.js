/* Image Adventure progress — the Learning Path's image-based activities
 * (Classes 25–31) + library ribbons.
 *
 * Contract, exactly as the rest of the school keeps it:
 *  · Progress lives in localStorage 'kiddo-adventures', one record per
 *    selected child ('kiddo-active', or 'guest'). Opening an activity page
 *    records `opened` — and NOTHING else.
 *  · An activity becomes `completed` only when the child's own marked-up
 *    picture is really saved: the write-color engine announces that with
 *    the 'kiddo-wc-save' event. No timers, no grading, no fake games.
 *  · Band shapes are the school's existing ones, so nothing already earned
 *    is lost:
 *      writing, phonics, reading, logic, science → {opened:{},completed:{}}
 *      shapes, colors                            → flat {slug: timestamp}
 *  · Library pages get their "Cleared!" ribbons from the same store.
 *  · Completion announces 'kiddo-adventure-done' (bubbling, so both the
 *    document and My Classroom's window listener hear it).
 */
(function () {
  'use strict';

  function storeGet(k, fb) {
    try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? fb : v; } catch (e) { return fb; }
  }
  function storeSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } }
  function childId() { return storeGet('kiddo-active', null) || 'guest'; }

  var FLAT = { shapes: true, colors: true };

  function readBand(band) {
    var all = storeGet('kiddo-adventures', {});
    var me = all[childId()] || {};
    return me[band] || (FLAT[band] ? {} : { opened: {}, completed: {} });
  }
  function writeBand(band, b) {
    var all = storeGet('kiddo-adventures', {});
    all[childId()] = all[childId()] || {};
    all[childId()][band] = b;
    storeSet('kiddo-adventures', all);
  }
  function markOpened(band, slug) {
    /* shapes/colors keep their old flat-map semantics: completions only,
       so merely opening the page can never light a "Cleared!" ribbon */
    if (FLAT[band]) return;
    var b = readBand(band);
    if (!b.opened[slug]) { b.opened[slug] = Date.now(); writeBand(band, b); }
  }
  function markCompleted(band, slug) {
    var first;
    var b = readBand(band);
    if (FLAT[band]) { first = !b[slug]; b[slug] = Date.now(); }
    else { first = !b.completed[slug]; b.completed[slug] = Date.now(); b.opened[slug] = b.opened[slug] || Date.now(); }
    writeBand(band, b);
    if (first) {
      /* bubbles: document listeners and window listeners both hear it */
      try { document.dispatchEvent(new CustomEvent('kiddo-adventure-done', { bubbles: true, detail: { section: band, band: band, slug: slug } })); } catch (e) { /* old browsers still keep progress */ }
    }
    return first;
  }
  function isCompleted(band, slug) {
    var b = readBand(band);
    return FLAT[band] ? !!b[slug] : !!b.completed[slug];
  }

  /* ---------- the activity page ---------- */
  var mount = document.querySelector('[data-ia-activity]');
  if (mount) {
    var band = mount.getAttribute('data-ia-band');
    var slug = mount.getAttribute('data-ia-slug');
    markOpened(band, slug);
    if (isCompleted(band, slug)) revealDone();

    document.addEventListener('kiddo-wc-save', function () {
      /* this page has exactly one sheet; the event only fires after a real
         save from the write-color engine on this page */
      var first = markCompleted(band, slug);
      if (first) revealDone();
    });

    function revealDone() {
      var done = document.querySelector('[data-ia-done]');
      var line = document.querySelector('[data-ia-progress]');
      if (done) done.hidden = false;
      if (line) line.hidden = true;
    }
  }

  /* ---------- library pages: "Cleared!" ribbons ---------- */
  /* selectors per library: section hook, card hook, badge hook */
  var LIBS = [
    ['data-wa-lib', 'data-wa-libcard', 'data-wa-done', 'writing'],
    ['data-sa-lib', 'data-sa-libcard', 'data-sa-done', 'shapes'],
    ['data-cc-lib', 'data-cc-libcard', 'data-cc-done', 'colors'],
    ['data-ph-lib', 'data-ph-libcard', 'data-sa-done', 'phonics']
  ];
  for (var i = 0; i < LIBS.length; i++) {
    ribbons(LIBS[i][0], LIBS[i][1], LIBS[i][2], LIBS[i][3]);
  }
  /* reading / logic / science share the st-* hooks; the section carries
     data-st-band="reading|logic|science" naming its own band */
  var stLibs = document.querySelectorAll('[data-st-lib]');
  for (var j = 0; j < stLibs.length; j++) {
    var sec = stLibs[j];
    ribbons(null, 'data-st-libcard', 'data-sa-done', sec.getAttribute('data-st-band') || 'reading', sec);
  }

  function ribbons(sectionSel, cardSel, badgeSel, band, root) {
    var scope = root || (sectionSel ? document.querySelector(sectionSel) : null) || document;
    var cards = scope.querySelectorAll('[' + cardSel + ']');
    for (var i = 0; i < cards.length; i++) {
      var s = cards[i].getAttribute(cardSel);
      if (s && isCompleted(band, s)) {
        var badge = cards[i].querySelector('[' + badgeSel + ']');
        if (badge) badge.hidden = false;
        cards[i].classList.add('is-done');
      }
    }
  }
})();
