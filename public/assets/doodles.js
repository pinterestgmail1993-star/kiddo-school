/* Animated doodle characters — runtime for the build-injected .doodle
   images. Progressive enhancement only:
   - without JavaScript every doodle is a small still picture (fine);
   - when a doodle scrolls into view it gains .doodle-live and its gentle
     CSS animation starts (none of them move before that);
   - prefers-reduced-motion always wins: no animation ever starts for
     those visitors.
   No network, no tracking, nothing stored. */
(() => {
  if (typeof document.querySelectorAll !== 'function') return; // search test harness

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const doodles = [...document.querySelectorAll('.doodle')];

  /* start animations only when visible, never for reduced-motion visitors */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('doodle-live');
        }
      });
    }, { threshold: 0.4 });
    doodles.forEach(d => io.observe(d));
  }
})();
