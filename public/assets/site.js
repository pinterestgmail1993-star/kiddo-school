(() => {
  const catalogue = document.querySelector('[data-catalogue]');
  if (!catalogue) return;
  const form = catalogue.querySelector('form');
  const query = form.elements.q;
  const subject = form.elements.subject;
  const age = form.elements.age;
  const cards = [...catalogue.querySelectorAll('.activity-card')];
  const params = new URLSearchParams(location.search);
  query.value = params.get('q') || '';
  for (const [control, key] of [[subject, 'subject'], [age, 'age']]) {
    const value = params.get(key) || '';
    if ([...control.options].some(option => option.value === value)) control.value = value;
  }
  function filter(updateUrl = true) {
    const words = query.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    let count = 0;
    cards.forEach(card => {
      const match = words.every(word => card.dataset.search.includes(word)) &&
        (!subject.value || card.dataset.subject === subject.value) &&
        (!age.value || card.dataset.ages.split(' ').includes(age.value));
      card.hidden = !match;
      if (match) count++;
    });
    document.querySelector('#result-count').textContent = `${count} ${count === 1 ? 'activity' : 'activities'} to explore`;
    document.querySelector('#no-results').hidden = count !== 0;
    if (updateUrl) {
      const state = new URLSearchParams();
      if (query.value.trim()) state.set('q', query.value.trim());
      if (subject.value) state.set('subject', subject.value);
      if (age.value) state.set('age', age.value);
      const suffix = state.toString();
      history.replaceState(null, '', location.pathname + (suffix ? '?' + suffix : '') + location.hash);
    }
  }
  form.addEventListener('input', () => filter());
  form.addEventListener('change', () => filter());
  form.addEventListener('submit', event => { event.preventDefault(); filter(); });
  form.addEventListener('reset', () => {
    // Reset must clear URL-initialized values as well as user-entered values.
    query.value = ''; subject.value = ''; age.value = '';
    requestAnimationFrame(() => filter());
  });
  catalogue.querySelector('[data-clear]').addEventListener('click', () => { form.reset(); query.focus(); });
  filter(false);
})();

/* Kiddo School class viewer: one-card-at-a-time. Supports any number of
   viewers per page (baby lessons have one; toddler classes have two). */
(() => {
  if (typeof document.querySelectorAll !== 'function') return; // minimal DOM mock (search test harness)
  document.querySelectorAll('[data-lesson-viewer]').forEach(frame => {
  const grid = frame.parentElement && frame.parentElement.querySelector ? frame.parentElement.querySelector('[data-lv-grid]') : null;
  if (!grid || typeof frame.querySelector !== 'function') return;
  const stage = frame.querySelector('[data-lv-stage]');
  const count = frame.querySelector('[data-lv-count]');
  const prev = frame.querySelector('[data-lv-prev]');
  const next = frame.querySelector('[data-lv-next]');
  const full = frame.querySelector('[data-lv-full]');
  const finish = frame.querySelector('[data-lv-finish]');
  const done = frame.querySelector('[data-lv-done]');
  const caption = frame.querySelector('[data-lv-caption]');
  const slides = [...grid.querySelectorAll('img')];
  const total = slides.length;
  if (!stage || !count || !prev || !next || !total) return;
  let index = 0;
  let live = false;
  function preload(offset) {
    const source = slides[index + offset];
    if (!source) return;
    const image = new Image();
    image.src = source.currentSrc || source.src;
  }
  function render() {
    const image = slides[index].cloneNode(true);
    image.loading = 'eager';
    const figure = document.createElement('figure');
    figure.className = 'lv-figure';
    figure.appendChild(image);
    stage.replaceChildren(figure);
    count.textContent = 'Card ' + (index + 1) + ' of ' + total;
    if (caption) {
      const say = slides[index].getAttribute('data-lv-say') || '';
      const find = slides[index].getAttribute('data-lv-find') || '';
      caption.textContent = [say, find].filter(Boolean).join(' ');
      caption.hidden = !caption.textContent;
    }
    prev.disabled = index === 0;
    next.disabled = index === total - 1;
    preload(1);
    preload(-1);
  }
  function start() {
    if (live) return;
    live = true;
    frame.classList.add('is-live');
    if (done) done.hidden = true;
    render();
  }
  function stop() {
    live = false;
    frame.classList.remove('is-live');
    frame.classList.remove('is-fs');
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {});
  }
  function go(delta) {
    const target = index + delta;
    if (target < 0 || target >= total) return;
    index = target;
    render();
  }
  function toggleFullscreen() {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
      frame.classList.remove('is-fs');
    } else if (frame.requestFullscreen) {
      frame.requestFullscreen().catch(() => frame.classList.add('is-fs'));
    } else {
      frame.classList.add('is-fs');
    }
  }
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) frame.classList.remove('is-fs');
  });
  document.querySelectorAll('[data-lv-start]').forEach(trigger => {
    if (trigger.closest('[data-lesson-viewer]') !== frame) return;
    trigger.addEventListener('click', () => {
      start();
      if (trigger.tagName === 'BUTTON') frame.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  if (full) full.addEventListener('click', toggleFullscreen);
  if (finish) finish.addEventListener('click', () => {
    stop();
    if (done) done.hidden = false;
    const howTo = document.querySelector('#how-to');
    if (howTo) howTo.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  let touchX = null;
  stage.addEventListener('touchstart', event => { touchX = event.changedTouches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', event => {
    if (touchX === null) return;
    const delta = event.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
  }, { passive: true });
  document.addEventListener('keydown', event => {
    if (!live) return;
    if (event.key === 'ArrowRight') go(1);
    if (event.key === 'ArrowLeft') go(-1);
  });
  frame.__lvStart = start;
  });
  /* Hero "Start" anchors live outside the viewer frame: route them to the
     page's first viewer (identical behavior on the single-viewer lessons). */
  document.querySelectorAll('[data-lv-start]').forEach(trigger => {
    if (trigger.closest('[data-lesson-viewer]')) return; // handled inside its frame
    const frame = document.querySelector('[data-lesson-viewer]');
    if (!frame || typeof frame.__lvStart !== 'function') return;
    trigger.addEventListener('click', () => frame.__lvStart());
  });

  /* Toddler class games: find-it and match rounds with gentle, score-free feedback.
     A game section may carry data-tc-correct / data-tc-incorrect (a single string,
     or strings separated by |) to use its own words — the defaults below keep the
     original lesson wording for every existing page. */
  const defaultPraise = ['You found it!', 'Great finding!', 'Nice exploring!'];
  const defaultLook = 'Let’s look together.';
  document.querySelectorAll('[data-tc-round]').forEach((round, roundIndex) => {
    const feedback = round.querySelector('[data-tc-feedback]');
    if (!feedback) return;
    const game = round.closest('[data-tc-correct], [data-tc-incorrect]');
    const customPraise = game ? (game.getAttribute('data-tc-correct') || '').split('|').filter(Boolean) : [];
    const customLook = game ? game.getAttribute('data-tc-incorrect') : '';
    const praise = customPraise.length ? customPraise : defaultPraise;
    round.addEventListener('click', event => {
      const choice = event.target.closest('.tc-choice');
      if (!choice || round.classList.contains('is-done')) return;
      if (choice.hasAttribute('data-tc-correct')) {
        round.classList.add('is-done');
        choice.classList.add('is-picked');
        feedback.hidden = false;
        feedback.textContent = praise[roundIndex % praise.length];
      } else {
        round.classList.remove('is-look');
        void round.offsetWidth; // restart the gentle look-again cue
        round.classList.add('is-look');
        feedback.hidden = false;
        feedback.textContent = customLook || defaultLook;
      }
    });
  });

  /* Printable pack: "Print Activity Pack" opens the print view in a new tab;
     on the print view itself the button opens the browser print dialog, and
     ?print=1 triggers it once the pages have loaded. No PDF is involved. */
  document.querySelectorAll('[data-tc-print-open]').forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.getAttribute('data-tc-print-open');
      if (url) window.open(url, '_blank', 'noopener');
    });
  });
  const printButton = document.querySelector('[data-tc-print-view]');
  if (printButton) printButton.addEventListener('click', () => window.print());
  if (document.body && document.body.classList.contains('print-view') && new URLSearchParams(location.search).has('print')) {
    const pages = [...document.querySelectorAll('.tc-print-pages img')];
    const openDialog = () => { try { window.print(); } catch (e) { /* dialog unavailable */ } };
    if (pages.length && pages.every(image => image.complete && image.naturalWidth > 0)) setTimeout(openDialog, 400);
    else window.addEventListener('load', () => setTimeout(openDialog, 800));
  }
})();

/* Main navigation: Parents dropdown. Works with mouse, touch and keyboard.
   Escape closes and returns focus to the button; clicking outside or moving
   focus out closes it too. Progressive enhancement: without JS the menu links
   are hidden, and the same destinations remain reachable in the footer. */
(() => {
  if (typeof document.querySelector !== 'function' || typeof document.addEventListener !== 'function') return;
  const navParents = document.querySelector('.nav-parents');
  if (!navParents) return;
  const button = navParents.querySelector('.nav-parents-btn');
  const menu = navParents.querySelector('.nav-parents-menu');
  if (!button || !menu) return;
  const isOpen = () => button.getAttribute('aria-expanded') === 'true';
  function setOpen(open) {
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
    navParents.setAttribute('data-open', open ? 'true' : 'false');
    menu.hidden = !open;
  }
  button.addEventListener('click', () => setOpen(!isOpen()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && isOpen()) { setOpen(false); button.focus(); }
  });
  document.addEventListener('click', event => {
    if (isOpen() && !navParents.contains(event.target)) setOpen(false);
  });
  navParents.addEventListener('focusout', event => {
    if (isOpen() && event.relatedTarget && !navParents.contains(event.relatedTarget)) setOpen(false);
  });
  menu.addEventListener('click', event => {
    if (event.target && event.target.closest && event.target.closest('a')) setOpen(false);
  });
})();

/* Float-to-top (owner 2026-10-31: "i need float to top") — a floating
   back-to-top pill on every page; appears after 500px, scrolls home on
   tap (smooth unless prefers-reduced-motion), never printed. */
(() => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  const btn = document.querySelector('[data-to-top]');
  if (!btn) return;
  btn.hidden = false;
  const toggle = () => btn.classList.toggle('is-visible', window.scrollY > 500);
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
  btn.addEventListener('click', () => {
    const calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: calm ? 'auto' : 'smooth' });
  });
})();

/* Umami events (owner 2026-11-01: "fire the events of download and print to
   umami · check what events are firing"). The tracker already ships on every
   page — until now it saw page views only, so the site's two busiest buttons
   were invisible to the dashboard. Two events now ride the same tracker, with
   no new scripts and no identifiers, matching the house privacy line:
   - print: fires whenever any print flow opens the dialog. Every script
     funnels through window.print (manners cards, coloring sheets, worksheet
     generators, the Circle Time print view…), so ONE wrapper covers them all
     and nothing double-counts — even where a button has its own listener.
   - download: fires when a card or sheet's <a download> link is tapped,
     capture phase so the event leaves before the navigation starts; the
     file's SEO name rides as the event's data, so the dashboard shows WHICH
     cards parents actually take, not just that they tapped something.
   Everything is guarded + try/caught: analytics can never break the page,
   the static-runtime lock holds (this file still makes no network calls and
   touches no storage — the umami script itself does the sending), and the
   Node mock harness exits early exactly like the float-to-top module above. */
(() => {
  if (typeof window === 'undefined' || typeof document === 'undefined' ||
      typeof document.addEventListener !== 'function') return;
  const send = (name, data) => {
    try {
      if (window.umami && typeof window.umami.track === 'function') {
        window.umami.track(name, data);
      }
    } catch (e) { /* stats must never break the page */ }
  };
  /* One wrapper on the one function every print flow calls. */
  if (typeof window.print === 'function' && !window.print.__kiddoTracked) {
    const realPrint = window.print.bind(window);
    const tracked = function kiddoTrackedPrint() {
      send('print');
      realPrint();
    };
    tracked.__kiddoTracked = true;
    window.print = tracked;
  }
  /* Downloads: capture-phase delegation on every <a download> link — the
     plain card links AND the synthesized ones (coloring sheets, worksheet
     packs, life-skills, the magic games all fetch a blob and a.click() an
     anchor whose download attribute carries the real file name). */
  document.addEventListener('click', (ev) => {
    const target = ev && ev.target;
    const link = target && typeof target.closest === 'function'
      ? target.closest('a[download]') : null;
    if (!link || typeof link.getAttribute !== 'function') return;
    const href = link.getAttribute('href') || '';
    if (!href) return;
    const attr = (link.getAttribute('download') || '').trim();
    const file = attr || href.split('/').pop().split('?')[0];
    send('download', { file: file || 'unknown' });
  }, true);
})();
