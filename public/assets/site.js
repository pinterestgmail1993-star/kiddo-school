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

  /* Toddler class games: find-it and match rounds with gentle, score-free feedback */
  const praise = ['You found it!', 'Great finding!', 'Nice exploring!'];
  document.querySelectorAll('[data-tc-round]').forEach((round, roundIndex) => {
    const feedback = round.querySelector('[data-tc-feedback]');
    if (!feedback) return;
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
        feedback.textContent = 'Let’s look together.';
      }
    });
  });
})();
