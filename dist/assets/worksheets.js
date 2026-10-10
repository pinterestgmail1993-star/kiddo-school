/* Kiddo School — worksheets.js: the tiny enhancement layer on worksheet pages.
   The Print button prints ONLY the worksheet sheet (the .ws-print-root block)
   by adding a printing flag the print stylesheet acts on; without JavaScript
   the Download PDF button does everything on its own. */
(() => {
  const btn = document.querySelector('[data-ws-print]');
  const root = document.querySelector('.ws-print-root');
  if (btn && root) {
    btn.addEventListener('click', () => {
      document.body.classList.add('ws-printing');
      const done = () => { document.body.classList.remove('ws-printing'); window.removeEventListener('afterprint', done); };
      window.addEventListener('afterprint', done);
      window.print();
      // Safari safety net if afterprint never fires
      setTimeout(done, 2000);
    });
  }
})();
