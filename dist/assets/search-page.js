// Kiddo School whole-school search (/search/ only). The activity cupboard
// below the search field is filtered by site.js as before; this script adds
// results from every corner of the school — books, classes, Circle Time,
// drawing lessons, flashcards, the garden and the pages parents need — using
// the small static index generated at build time (dist/assets/
// search-index.json). Everything runs in the browser: nothing is submitted
// anywhere and nothing is remembered after the page closes. Results are
// links, escaped, with a friendly kind label so a parent can see what a
// result is before tapping.
(() => {
  'use strict';
  const catalogue = document.querySelector('[data-catalogue]');
  if (!catalogue) return;
  const form = catalogue.querySelector('form');
  const query = form && form.elements.q;
  const wrap = document.querySelector('[data-site-search]');
  const list = wrap && wrap.querySelector('[data-sr-list]');
  const count = wrap && wrap.querySelector('[data-sr-count]');
  if (!form || !query || !wrap || !list || !count) return;
  let index = null;

  fetch('/assets/search-index.json')
    .then(r => (r.ok ? r.json() : null))
    .then(data => { index = Array.isArray(data) ? data : null; run(); })
    .catch(() => { index = null; });

  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function run() {
    const words = query.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length || !index) {
      wrap.hidden = true;
      list.innerHTML = '';
      count.textContent = '';
      return;
    }
    const q = query.value.trim();
    const hits = index.filter(p => {
      const hay = (p.t + ' ' + p.d + ' ' + p.u + ' ' + p.k).toLocaleLowerCase();
      return words.every(w => hay.includes(w));
    }).slice(0, 40);
    count.textContent = hits.length
      ? hits.length + (hits.length === 1 ? ' place' : ' places') + ' across the school'
      : 'Nothing else in the school matches \u201C' + q + '\u201D';
    list.innerHTML = hits.map(p =>
      '<li><a href="' + esc(p.u) + '">' +
      '<span class="sr-kind">' + esc(p.k) + '</span>' +
      '<span class="sr-title">' + esc(p.t) + '</span>' +
      '<span class="sr-desc">' + esc(p.d) + '</span>' +
      '</a></li>'
    ).join('');
    wrap.hidden = false;
  }

  form.addEventListener('input', run);
  form.addEventListener('change', run);
  form.addEventListener('submit', event => { event.preventDefault(); run(); });
})();
