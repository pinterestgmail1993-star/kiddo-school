/* Kiddo School — My Classroom: saved creations gallery + adventure progress.
   Reads the SAME localStorage stores the adventures write:
   - kiddo-creations  → artwork saved from the Colors & Creativity studio
   - kiddo-adventures → {childKey:{shapes:{slug:ts},colors:{…},writing:{opened:{},completed:{}}}}
   Honors the selected child (kiddo-active) and refreshes when the child
   changes or when an adventure fires kiddo-adventure-done. Everything stays
   on this device; nothing is uploaded. Without JavaScript the panels show
   their written explanation instead. */
(() => {
  const creationsPanel = document.querySelector('[data-my-creations]');
  const progressPanel = document.querySelector('[data-adventure-progress]');
  if (!creationsPanel && !progressPanel) return;
  if (typeof document.querySelectorAll !== 'function') return;

  const store = {
    get(k, fb) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? fb : v; } catch (e) { return fb; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* full/private */ } }
  };
  const childKey = () => store.get('kiddo-active', null) || 'guest';
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));

  /* ---------- gallery ---------- */
  function renderCreations() {
    if (!creationsPanel) return;
    const grid = creationsPanel.querySelector('[data-gal-grid]');
    const empty = creationsPanel.querySelector('[data-gal-empty]');
    if (!grid) return;
    const list = (store.get('kiddo-creations', []) || []).filter(c => c.child === childKey());
    grid.innerHTML = '';
    if (empty) empty.hidden = list.length > 0;
    list.slice(0, 9).forEach(rec => {
      const card = document.createElement('div');
      card.className = 'gal-card';
      const img = document.createElement('img');
      img.src = rec.thumb;
      img.alt = 'Saved artwork: ' + rec.title;
      img.loading = 'lazy';
      const actions = document.createElement('div');
      actions.className = 'gal-actions';
      const open = document.createElement('a');
      open.className = 'button button-ghost';
      open.href = '/preschool/colors/adventures/' + rec.slug + '/';
      open.textContent = 'Open';
      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'button button-ghost';
      del.textContent = 'Delete';
      del.setAttribute('aria-label', 'Delete saved artwork: ' + rec.title);
      del.addEventListener('click', () => {
        store.set('kiddo-creations', (store.get('kiddo-creations', []) || []).filter(c => c.id !== rec.id));
        renderCreations();
      });
      actions.appendChild(open); actions.appendChild(del);
      card.appendChild(img); card.appendChild(actions);
      grid.appendChild(card);
    });
  }

  /* ---------- adventure progress ---------- */
  const LIBS = {
    shapes: { name: 'Shape Adventures', href: '/preschool/shapes/adventures/', total: 18 },
    colors: { name: 'Colors & Creativity', href: '/preschool/colors/adventures/', total: 18 },
    writing: { name: 'Writing Adventures', href: '/preschool/writing/adventures/', total: 30 },
    phonics: { name: 'Phonics Adventures', href: '/preschool/phonics/adventures/', total: 24 },
    reading: { name: 'Storytime Adventures', href: '/preschool/reading/adventures/', total: 27 },
    logic: { name: 'Logic Adventures', href: '/preschool/logic/adventures/', total: 27 }
  };
  function renderProgress() {
    if (!progressPanel) return;
    const rows = progressPanel.querySelector('[data-ap-rows]');
    if (!rows) return;
    const all = store.get('kiddo-adventures', {}) || {};
    const mine = all[childKey()] || {};
    const who = (store.get('kiddo-children', []) || []).find(c => c.id === childKey());
    const name = who && who.name ? who.name : 'Your little one';
    const parts = [];
    Object.entries(LIBS).forEach(([key, meta]) => {
      const section = mine[key] || {};
      const doneCount = section.completed ? Object.keys(section.completed).length : Object.keys(section).length;
      const pct = Math.round(doneCount / meta.total * 100);
      parts.push(`<div class="ap-row">
        <div class="ap-row-head"><a href="${meta.href}"><strong>${meta.name}</strong></a>
        <span class="ap-count">${doneCount} of ${meta.total} cleared</span></div>
        <div class="ap-bar" role="progressbar" aria-valuemin="0" aria-valuemax="${meta.total}" aria-valuenow="${doneCount}" aria-label="${meta.name}: ${doneCount} of ${meta.total} cleared"><span style="width:${pct}%"></span></div>
      </div>`);
    });
    const writing = mine.writing || {};
    const opened = Object.keys(writing.opened || {}).length;
    const recent = [];
    ['shapes', 'colors'].forEach(k => {
      Object.entries(mine[k] || {}).forEach(([slug, ts]) => recent.push({ slug, ts, lib: k }));
    });
    Object.entries(writing.completed || {}).forEach(([slug, ts]) => recent.push({ slug, ts, lib: 'writing' }));
    Object.entries((mine.phonics && mine.phonics.completed) || {}).forEach(([slug, ts]) => recent.push({ slug, ts, lib: 'phonics' }));
    Object.entries((mine.reading && mine.reading.completed) || {}).forEach(([slug, ts]) => recent.push({ slug, ts, lib: 'reading' }));
    Object.entries((mine.logic && mine.logic.completed) || {}).forEach(([slug, ts]) => recent.push({ slug, ts, lib: 'logic' }));
    recent.sort((a, b) => b.ts - a.ts);
    const recentHTML = recent.length
      ? `<p class="ap-recent"><strong>Latest cleared:</strong> ${recent.slice(0, 4).map(r => {
          const href = LIBS[r.lib].href + r.slug + '/';
          const when = new Date(r.ts);
          const day = isNaN(when) ? '' : ` <small>(${when.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })})</small>`;
          return `<a href="${href}">${esc(r.slug.replace(/-/g, ' '))}</a>${day}`;
        }).join(' · ')}</p>`
      : '';
    rows.innerHTML = `
      <p class="ap-who">${esc(name)}${who && who.band === 'age4' ? '' : ' <span class="fc-hint">(guest progress — pick a child at the desk above to keep separate records)</span>'}</p>
      ${parts.join('')}
      ${writing.completed ? `<p class="ap-line">Writing: <strong>${Object.keys(writing.completed).length}</strong> of 30 adventures cleared${opened ? ` · ${opened} opened so far` : ''}.</p>` : ''}
      ${recentHTML}`;
  }

  function renderAll() { renderCreations(); renderProgress(); }
  renderAll();
  try {
    window.addEventListener('kiddo-adventure-done', renderAll);
    window.addEventListener('storage', e => { if (e.key === 'kiddo-active' || e.key === 'kiddo-creations' || e.key === 'kiddo-adventures') renderAll(); });
  } catch (e) { /* older browsers */ }
})();
