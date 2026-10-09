/* Kiddo School — Today's Class recommendation, child profiles and REAL
   progress. Everything lives in this browser's localStorage: no account,
   no upload, nothing personal required (a first name is optional and never
   leaves the device; guests are simply an age band).

   What it does:
   1. Any [data-tc-today] link (homepage hero, section CTA, nav "Today's
      Class") becomes the smart entry: with a profile it goes straight to
      the recommended class; for guests it opens an age picker, then shows
      that age's classes with the recommendation marked — parents can pick
      any class.
   2. On a class page it records the visit (kiddo-progress.last) and adds a
      calm "Mark this class complete" bar inside #class-complete; marking
      complete stores it and offers the real next class.
   3. On /my-classroom/ it fills [data-tc-desk] with the child's current
      class, the next step and the actual completed count — never fake
      numbers — plus child switching and guest mode.
   Recommendation = the first unfinished class in the child's age band,
   continuing from the last class visited. Without JavaScript every page
   still works: links fall back to the Learning Path / class order. */
(() => {
  if (typeof document === 'undefined' || typeof document.addEventListener !== 'function' || !window.localStorage) return;
  const C = Array.isArray(window.KIDDO_CURRICULUM) ? window.KIDDO_CURRICULUM : [];
  if (!C.length) return;
  const BANDS = [['newborn','Newborn'],['baby','Baby'],['12-18','12–18 Months'],['18-24','18–24 Months'],['age2','Age 2'],['age3','Age 3']];
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));

  /* ---------- storage ---------- */
  const store = {
    get(k, fb) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? fb : v; } catch (e) { return fb; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage full/private: session-only */ } }
  };
  const children = () => { const v = store.get('kiddo-children', []); return Array.isArray(v) ? v : []; };
  const activeId = () => store.get('kiddo-active', null);
  function profile() {
    const id = activeId();
    const list = children();
    if (id && list.length) { const c = list.find(x => x.id === id); if (c) return c; }
    return list[0] || null;
  }
  function saveChild(child) {
    const list = children();
    const i = list.findIndex(x => x.id === child.id);
    if (i >= 0) list[i] = child; else list.push(child);
    store.set('kiddo-children', list);
    store.set('kiddo-active', child.id);
    renderAll();
  }
  function setActive(id) { store.set('kiddo-active', id); renderAll(); }
  const progress = () => { const v = store.get('kiddo-progress', null); return (v && typeof v === 'object' && v.completed) ? v : { completed: {}, last: null, updated: 0 }; };
  function saveProgress(p) { p.updated = Date.now(); store.set('kiddo-progress', p); }

  /* ---------- recommendation ---------- */
  const byPath = path => C.find(c => c.path === path) || null;
  function recommend() {
    const p = profile();
    return recommendFor(p && p.band);
  }
  function recommendFor(band) {
    if (!band) return null;
    const pool0 = C.filter(c => c.band === band);
    const pool = pool0.length ? pool0 : C;
    const prog = progress();
    if (prog.last) {
      const i = pool.findIndex(c => c.path === prog.last);
      if (i >= 0) {
        const nxt = pool.slice(i).find(c => !prog.completed[c.path]);
        if (nxt) return nxt;
      }
    }
    return pool.find(c => !prog.completed[c.path]) || pool[0];
  }
  const completedCount = band => {
    const prog = progress();
    return C.filter(c => (!band || c.band === band) && prog.completed[c.path]).length;
  };

  /* ---------- record a visit on class pages ---------- */
  const here = byPath(location.pathname);
  if (here) {
    const prog = progress();
    if (prog.last !== here.path) { prog.last = here.path; saveProgress(prog); }
  }

  /* ---------- the class picker panel ---------- */
  function pickerHTML(state) {
    const band = state.band;
    const classes = C.filter(c => c.band === band);
    const rec = recommendFor(band);
    const prog = progress();
    return `
     <p class="tc-day-lead">How old is your little one? We will open the right class — and you can always pick a different one.</p>
     <div class="tc-day-ages" role="group" aria-label="Choose an age">
      ${BANDS.map(([v, label]) => `<button type="button" class="tc-day-age${v === band ? ' is-on' : ''}" data-tc-band="${v}" aria-pressed="${v === band}">${label}</button>`).join('')}
     </div>
     ${band ? `<div class="tc-day-classes" role="group" aria-label="Classes for this age">
      ${classes.map(c => `<a class="tc-day-class${rec && c.n === rec.n ? ' is-rec' : ''}" href="${c.path}" data-tc-pick="${c.path}">
        <span class="tc-day-classnum">Class ${c.n}</span>
        <span class="tc-day-classname">${esc(c.title)}${rec && c.n === rec.n ? ' <em>recommended</em>' : ''}${prog.completed[c.path] ? ' <span class="tc-day-done">✓ done</span>' : ''}</span>
      </a>`).join('')}
     </div>` : ''}`;
  }
  function openPicker(anchor) {
    let panel = document.getElementById('tc-day-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'tc-day-panel';
      panel.className = 'tc-day-panel';
      panel.setAttribute('role', 'group');
      panel.setAttribute('aria-label', "Choose today's class");
      (anchor.closest('section') || anchor.parentElement).insertAdjacentElement('afterend', panel);
    }
    const state = { band: (profile() && profile().band) || null };
    panel.innerHTML = pickerHTML(state);
    panel.hidden = false;
    panel.addEventListener('click', e => {
      const age = e.target.closest('[data-tc-band]');
      if (age) {
        state.band = age.getAttribute('data-tc-band');
        panel.innerHTML = pickerHTML(state);
        return;
      }
      const pick = e.target.closest('[data-tc-pick]');
      if (pick) {
        const cls = byPath(pick.getAttribute('data-tc-pick'));
        if (cls) {
          const p = profile() || { id: 'c' + Date.now().toString(36), name: '', band: cls.band };
          p.band = cls.band;
          saveChild(p); // also marks it active; navigation continues below
        }
        panel.hidden = true; // let the link navigate normally
      }
    });
    const first = panel.querySelector('.tc-day-age');
    if (first) first.focus();
  }

  /* ---------- smart Today's Class links ---------- */
  document.querySelectorAll('[data-tc-today]').forEach(link => {
    link.addEventListener('click', e => {
      const rec = recommend();
      if (rec) {
        if (rec.path === location.pathname) { e.preventDefault(); return; }
        return; // follow the href, swapped below
      }
      e.preventDefault();
      openPicker(link);
    });
  });
  function swapTodayLinks() {
    const rec = recommend();
    if (!rec) return;
    const p = profile();
    const who = p && p.name ? p.name : (BANDS.find(b => b[0] === (p && p.band)) || ['', 'Age'])[1];
    document.querySelectorAll('[data-tc-today]').forEach(link => {
      link.setAttribute('href', rec.path);
      const scope = link.closest('section') || link.parentElement;
      const hint = scope && scope.querySelector('[data-tc-hint]');
      if (hint) hint.textContent = 'Recommended for ' + who + ': Class ' + rec.n + ' — ' + rec.title + '.';
    });
  }

  /* ---------- completion bar on class pages ---------- */
  function completionBar() {
    if (!here) return;
    let done = document.querySelector('#class-complete');
    if (!done) {
      // baby/toddler card classes have no complete section: the bar lands at
      // the end of the main content instead — same promise, same honesty
      const main = document.getElementById('main');
      if (!main || main.querySelector('[data-tc-complete]')) return;
      done = main;
    }
    if (done.querySelector('[data-tc-complete]')) return;
    const prog = progress();
    const isDone = !!prog.completed[here.path];
    const next = C.find(c => c.n === here.n + 1);
    const bar = document.createElement('div');
    bar.className = 'tc-day-complete' + (isDone ? ' is-done' : '');
    bar.setAttribute('data-tc-complete', '');
    bar.innerHTML = isDone
      ? `<p><strong>Saved on this device:</strong> Class ${here.n} is complete.${completedCount() ? ' ' + completedCount() + ' class' + (completedCount() === 1 ? '' : 'es') + ' finished in all.' : ''}</p>
         ${next ? `<a class="button" href="${next.path}">Next class: ${esc(next.title)} <span aria-hidden="true">→</span></a>` : `<a class="button" href="/learning-path/">Back to the Learning Path <span aria-hidden="true">↗</span></a>`}`
      : `<p>Finished together? Mark it so the school remembers where you are — on this device only.</p>
         <div class="hero-actions"><button type="button" class="button" data-tc-mark>Mark Class ${here.n} complete <span aria-hidden="true">✓</span></button></div>`;
    if (!isDone) {
      bar.querySelector('[data-tc-mark]').addEventListener('click', () => {
        const p = progress();
        p.completed[here.path] = true;
        saveProgress(p);
        bar.remove();          // replace the bar with its done state
        completionBar();
        renderAll();
      });
    }
    done.appendChild(bar);
  }

  /* ---------- My Classroom desk ---------- */
  function renderDesk() {
    const desk = document.querySelector('[data-tc-desk]');
    if (!desk) return;
    const p = profile();
    const prog = progress();
    if (!p || !p.band) {
      desk.innerHTML = `
       <h3>Your child's desk</h3>
       <p class="tc-desk-line">The school doesn't know who's sitting here yet — that's fine, guests are welcome.</p>
       <div class="hero-actions">
        <button type="button" class="button" data-tc-desk-start>Choose an age &amp; start <span aria-hidden="true">↗</span></button>
       </div>
       <p class="fc-hint">Progress is kept in this browser only — no account, no sign-up. Add a name if you like, or stay a guest.</p>`;
      desk.querySelector('[data-tc-desk-start]').addEventListener('click', () => openPicker(desk));
      return;
    }
    const rec = recommend();
    const band = p.band;
    const bandLabel = (BANDS.find(b => b[0] === band) || ['', band])[1];
    const last = prog.last ? byPath(prog.last) : null;
    const list = children();
    const done = completedCount();
    desk.innerHTML = `
     <h3>Your child's desk</h3>
     ${list.length > 1 ? `<div class="tc-desk-kids">
       <label class="tc-desk-label" for="tc-kid-select">Who is learning?</label>
       <select id="tc-kid-select" data-tc-kid-select>
        ${list.map(c => `<option value="${esc(c.id)}"${c.id === (activeId() || (list[0] && list[0].id)) ? ' selected' : ''}>${esc(c.name || 'Guest')} · ${(BANDS.find(b => b[0] === c.band) || ['', c.band])[1]}</option>`).join('')}
       </select>
      </div>` : ''}
      <button type="button" class="text-link" data-tc-desk-add>Add another child</button>
     <p class="tc-desk-line">Age: <strong>${bandLabel}</strong>${p.name ? ' · Name: <strong>' + esc(p.name) + '</strong>' : ' · <span class="fc-hint">guest mode</span>'}</p>
     ${rec ? `<div class="tc-desk-next">
       <p class="tc-desk-big">Up next for ${p.name ? esc(p.name) : 'your little one'}:</p>
       <p class="tc-desk-class"><strong>Class ${rec.n}:</strong> ${esc(rec.title)}</p>
       <div class="hero-actions">
        <a class="button" href="${rec.path}">${prog.last === rec.path ? 'Continue this class' : 'Start this class'} <span aria-hidden="true">↗</span></a>
        <button type="button" class="button button-ghost" data-tc-desk-change>Choose a different class</button>
       </div>
       ${last && last.n !== rec.n ? `<p class="fc-hint">Last opened here: Class ${last.n} — ${esc(last.title)}.</p>` : ''}
      </div>` : ''}
     <p class="tc-desk-progress">${done === 0 ? 'No classes marked complete yet — the first one is one playful session away.' : `<strong>${done}</strong> class${done === 1 ? '' : 'es'} marked complete on this device.`}</p>
     <p class="fc-hint">Everything here lives only in this browser. No account, no sign-up, nothing uploaded.</p>`;
    const sel = desk.querySelector('[data-tc-kid-select]');
    if (sel) sel.addEventListener('change', () => setActive(sel.value));
    const add = desk.querySelector('[data-tc-desk-add]');
    if (add) add.addEventListener('click', () => {
      const name = (window.prompt ? window.prompt('First name (or leave empty for guest mode):', '') : '') || '';
      saveChild({ id: 'c' + Date.now().toString(36), name: name.slice(0, 30), band: p.band });
    });
    const change = desk.querySelector('[data-tc-desk-change]');
    if (change) change.addEventListener('click', () => openPicker(desk));
  }

  function renderAll() {
    swapTodayLinks();
    renderDesk();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => { renderAll(); completionBar(); });
  else { renderAll(); completionBar(); }
})();
