/* Kiddo School Circle Time runner: one moment at a time.
   Progressive enhancement — without JavaScript the whole session reads as a
   script on the page (controls stay hidden); with JavaScript only the current
   moment is visible and the controls carry the class forward. */
(() => {
  if (typeof document.querySelector !== 'function') return; // minimal DOM mock guard
  const root = document.querySelector('[data-ct]');
  if (!root || typeof root.querySelectorAll !== 'function') return;
  const steps = [...root.querySelectorAll('[data-ct-step]')];
  const dots = root.querySelector('[data-ct-dots]');
  const dotEls = dots ? [...dots.querySelectorAll('[data-ct-dot]')] : [];
  const live = root.querySelector('[data-ct-live]');
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;

  /* State kept per step so going back returns you to the moment you left.
     cursors: sub-index for prompt sequences (copy/listen/faces/story). */
  const cursors = new Map(steps.map(step => [step, 0]));
  const rugState = new Map(); // rug step: 'ask' | 'found'

  const seqOf = step => [...step.querySelectorAll('[data-ct-prompt]')];
  const storyBits = step => ({
    seq: step.querySelector('[data-ct-story]'),
    count: step.querySelector('[data-ct-count]'),
    back: step.querySelector('[data-ct-back]')
  });

  /* Reveal every control now that the runner is live. */
  root.querySelectorAll('[data-ct-next],[data-ct-advance],[data-ct-replay],[data-ct-found],[data-ct-skip],[data-ct-back]').forEach(btn => { btn.hidden = false; });
  if (dots) dots.hidden = false;

  function renderStep(step) {
    const prompts = seqOf(step);
    const cursor = Math.min(cursors.get(step) || 0, Math.max(prompts.length - 1, 0));
    cursors.set(step, cursor);
    prompts.forEach((panel, i) => { panel.hidden = i !== cursor; });
    const story = storyBits(step);
    if (story.seq && story.count) {
      story.count.textContent = 'Part ' + (cursor + 1) + ' of ' + prompts.length;
      if (story.back) story.back.disabled = cursor === 0;
    }
    const ask = step.querySelector('[data-ct-rugask]');
    const back = step.querySelector('[data-ct-rugback]');
    if (ask && back) {
      const found = rugState.get(step) === 'found';
      ask.hidden = found;
      back.hidden = !found;
    }
  }

  function replayRhythm(step) {
    const rhythm = step.querySelector('[data-ct-rhythm]');
    if (!rhythm || reduce) return; // the cue stays readable without motion
    rhythm.classList.remove('is-playing');
    void rhythm.offsetWidth; // restart the beat
    rhythm.classList.add('is-playing');
  }

  function announce() {
    if (!live) return;
    const step = steps[current];
    live.textContent = 'Step ' + (current + 1) + ' of ' + steps.length + ': ' +
      (step.getAttribute('data-ct-label') || '').replace('&amp;', '&');
  }

  function paintDots() {
    dotEls.forEach((dot, i) => dot.classList.toggle('is-on', i === current));
  }

  function goTo(index) {
    if (index < 0 || index >= steps.length) return;
    current = index;
    steps.forEach((step, i) => {
      step.hidden = i !== current;
      if (i === current) renderStep(step);
    });
    paintDots();
    announce();
    const step = steps[current];
    if (!reduce && step.querySelector('[data-ct-rhythm]')) replayRhythm(step);
    root.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    step.focus({ preventScroll: true });
  }

  /* Step-level buttons. */
  root.querySelectorAll('[data-ct-next]').forEach(btn => {
    btn.addEventListener('click', () => goTo(current + 1));
  });

  /* Prompt sequences: Done! walks the prompts, then the next moment. */
  root.querySelectorAll('[data-ct-advance]').forEach(btn => {
    const step = btn.closest('[data-ct-step]');
    if (!step) return;
    btn.addEventListener('click', () => {
      const prompts = seqOf(step);
      const cursor = cursors.get(step) || 0;
      if (cursor < prompts.length - 1) {
        cursors.set(step, cursor + 1);
        renderStep(step);
        const panel = prompts[cursor + 1];
        const big = panel.querySelector('.ct-big');
        if (big) big.setAttribute('tabindex', '-1');
        if (big) big.focus({ preventScroll: true });
      } else {
        goTo(current + 1);
      }
    });
  });

  /* Story: Previous stays inside the story. */
  root.querySelectorAll('[data-ct-back]').forEach(btn => {
    const step = btn.closest('[data-ct-step]');
    if (!step) return;
    btn.addEventListener('click', () => {
      const cursor = cursors.get(step) || 0;
      if (cursor > 0) { cursors.set(step, cursor - 1); renderStep(step); }
    });
  });

  /* Hello Rhythm: Again replays the visual cue. */
  root.querySelectorAll('[data-ct-replay]').forEach(btn => {
    const step = btn.closest('[data-ct-step]');
    if (!step) return;
    btn.addEventListener('click', () => replayRhythm(step));
  });

  /* Off the Rug: I Found One! returns them to the screen; Skip moves on. */
  root.querySelectorAll('[data-ct-found]').forEach(btn => {
    const step = btn.closest('[data-ct-step]');
    if (!step) return;
    btn.addEventListener('click', () => {
      rugState.set(step, 'found');
      renderStep(step);
      const back = step.querySelector('[data-ct-rugback]');
      if (back) back.focus({ preventScroll: true });
    });
  });
  root.querySelectorAll('[data-ct-skip]').forEach(btn => {
    btn.addEventListener('click', () => goTo(current + 1));
  });

  /* Start on the first moment. */
  steps.forEach((step, i) => { step.hidden = i !== 0; });
  renderStep(steps[0]);
  announce();
})();
