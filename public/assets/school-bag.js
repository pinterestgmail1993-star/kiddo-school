/* Kiddo School — My School Bag: shows creations saved on this device by
   Draw & Scribble (via window.KiddoBag, IndexedDB). Delete always asks first. */
(() => {
  const $ = (sel, el) => (el || document).querySelector(sel);
  const $$ = (sel, el) => [...(el || document).querySelectorAll(sel)];
  const root = $('[data-bag-gallery]');
  const Bag = window.KiddoBag;
  if (!root || !Bag) return;
  const empty = $('[data-bag-empty]', root);
  const tpl = document.querySelector('[data-bag-itemtpl]');
  const openView = $('[data-bag-openview]');
  const bigImg = $('[data-bag-big]', openView);
  const live = $('[data-bag-live]');
  let items = [];

  const dateLabel = ts => {
    const d = new Date(ts);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  const say = msg => { if (live) live.textContent = msg; };

  function wire(figure, item) {
    const del = $('[data-bag-delete]', figure);
    const confirmBox = $('.bag-confirm', figure);
    del.addEventListener('click', () => { confirmBox.hidden = false; $('[data-bag-keep]', figure).focus({ preventScroll: true }); });
    $('[data-bag-keep]', figure).addEventListener('click', () => { confirmBox.hidden = true; del.focus({ preventScroll: true }); });
    $('[data-bag-remove]', figure).addEventListener('click', () => {
      Bag.remove(item.id).then(() => {
        figure.remove();
        items = items.filter(x => x.id !== item.id);
        say('Drawing removed.');
        if (!items.length && empty) empty.hidden = false;
      }).catch(() => say('We couldn’t remove that one. Try again.'));
    });
    $('[data-bag-open]', figure).addEventListener('click', () => {
      bigImg.src = item.preview;
      bigImg.alt = 'Drawing saved ' + dateLabel(item.createdAt);
      openView.hidden = false;
      openView.scrollIntoView({ behavior: 'auto', block: 'nearest' });
      $('[data-bag-close]', openView).focus({ preventScroll: true });
    });
  }
  $('[data-bag-close]', openView).addEventListener('click', () => { openView.hidden = true; });

  function render() {
    items.forEach(item => {
      const node = tpl.content.cloneNode(true);
      const figure = node.querySelector('.bag-item');
      const img = $('[data-bag-img]', figure);
      img.src = item.preview;
      img.alt = 'Drawing saved ' + dateLabel(item.createdAt);
      $('[data-bag-date]', figure).textContent = dateLabel(item.createdAt);
      root.appendChild(figure);
      wire(figure, item);
    });
    if (items.length) { if (empty) empty.hidden = true; }
  }
  if (!Bag.available) {
    if (empty) {
      $('.bag-empty-title', empty).textContent = 'This browser won’t save right now.';
      empty.hidden = false;
    }
    return;
  }
  Bag.list().then(list => { items = list; render(); })
    .catch(() => { if (empty) $('.bag-empty-title', empty).textContent = 'This browser won’t save right now.'; });
})();
