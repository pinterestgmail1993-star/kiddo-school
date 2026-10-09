/* Animated doodle characters — runtime for the build-injected .doodle
   images. Progressive enhancement only:
   - without JavaScript every doodle is a small still picture (fine);
   - when a doodle scrolls into view it gains .doodle-live and its gentle
     CSS animation starts (none of them move before that);
   - the parent-controlled Calm Mode button (injected into the footer)
     pauses every animation on the page and remembers the choice in
     localStorage; prefers-reduced-motion always wins and no animation
     ever starts for those visitors.
   No network, no tracking, nothing stored except the calm-mode choice. */
(() => {
  if (typeof document.querySelectorAll !== 'function') return; // search test harness

  const calmKey = 'kiddo-calm-mode';
  let calm = false;
  try { calm = localStorage.getItem(calmKey) === 'on'; } catch (e) { calm = false; }
  if (calm) document.body.classList.add('calm-mode');

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const doodles = [...document.querySelectorAll('.doodle')];

  /* start animations only when visible, never in calm mode / reduced motion */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !document.body.classList.contains('calm-mode')) {
          entry.target.classList.add('doodle-live');
        }
      });
    }, { threshold: 0.4 });
    doodles.forEach(d => io.observe(d));
  }

  /* Calm Mode: a real toggle for grown-ups, in the footer */
  const host = document.querySelector('.wrap.footer-bottom');
  if (!host) return;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'doodle-calm';
  btn.setAttribute('aria-pressed', calm ? 'true' : 'false');
  btn.textContent = calm ? 'Calm mode: on' : 'Calm mode: off';
  btn.addEventListener('click', () => {
    calm = !calm;
    document.body.classList.toggle('calm-mode', calm);
    btn.setAttribute('aria-pressed', calm ? 'true' : 'false');
    btn.textContent = calm ? 'Calm mode: on' : 'Calm mode: off';
    try { localStorage.setItem(calmKey, calm ? 'on' : 'off'); } catch (e) { /* private mode: choice lives for this visit only */ }
    if (!calm && !reduceMotion) {
      /* turning calm off: start the dance for every doodle already on screen */
      doodles.forEach(d => {
        const r = d.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) d.classList.add('doodle-live');
      });
    }
  });
  host.appendChild(btn);
})();
