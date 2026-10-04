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
