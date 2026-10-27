/* Manners extra class (/manners/): per-card printing on the single class
   page. The owner's rule (2026-10-27) is one page — no per-card URLs — so
   "Print" isolates the chosen card in the print snapshot instead: body gets
   .mn-printing, the card gets .mn-print-card, and the @media print block in
   style.css hides everything else (visibility trick, so ancestors cooperate).
   Download needs no JS: the button is a plain <a download> to the full-size
   R2 image, matching every card page on the site. */
(function () {
  document.addEventListener('click', function (ev) {
    var btn = ev.target.closest('[data-mn-print]');
    if (!btn) return;
    var card = btn.closest('.mn-card');
    if (!card) return;
    document.body.classList.add('mn-printing');
    card.classList.add('mn-print-card');
    var done = function () {
      document.body.classList.remove('mn-printing');
      card.classList.remove('mn-print-card');
      window.removeEventListener('afterprint', done);
    };
    window.addEventListener('afterprint', done);
    /* Backup cleanup for browsers that never fire afterprint; runs after the
       dialog closes (timers stall while the print dialog is modal). */
    setTimeout(done, 2000);
    window.print();
  });
})();
