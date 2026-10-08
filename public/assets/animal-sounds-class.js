/* Animals & Their Sounds (Age 3, Class 6): learn-grid group chips, real
   animal-sound playback and the match-animal-to-sound board. Progressive
   enhancement only — without JavaScript the chips stay hidden, all twelve
   cards show, and the board is an honest two-column chart (the noscript
   notes say exactly that). Sounds are short mono MP3 files served from this
   site; every button is a real control wired to a real recording. No scores,
   no timers, nothing stored, no network beyond the audio files. */
(() => {
  if (typeof document.querySelectorAll !== 'function') return; // search test harness

  /* --- Meet-the-animals group chips (All 12 / Farm friends / Wild ones) --- */
  const bar = document.querySelector('[data-an-groups]');
  const grid = bar && document.querySelector('[data-lv-grid]');
  if (bar && grid) {
    bar.hidden = false;
    bar.setAttribute('data-ready', 'true');
    const cards = [...grid.querySelectorAll('.lv-card')];
    const chips = [...bar.querySelectorAll('[data-an-group-filter]')];
    if (cards.length && chips.length) {
      const showAll = () => cards.forEach(c => { c.hidden = false; });
      chips.forEach(chip => {
        chip.addEventListener('click', () => {
          const group = chip.getAttribute('data-an-group-filter');
          chips.forEach(c => {
            const on = c === chip;
            c.classList.toggle('is-on', on);
            c.setAttribute('aria-pressed', on ? 'true' : 'false');
          });
          if (group === 'all') { showAll(); return; }
          cards.forEach(c => { c.hidden = c.getAttribute('data-an-group') !== group; });
        });
      });
    }
  }

  /* --- Sound playback: one shared Audio per animal, replay on every tap --- */
  const players = new Map();
  function play(animal) {
    const file = document.querySelector(`[data-an-sound="${animal}"]`);
    if (!file) return;
    const src = file.getAttribute('data-an-src');
    if (!src) return;
    let audio = players.get(animal);
    if (!audio) {
      audio = new Audio(src);
      audio.preload = 'auto';
      players.set(animal, audio);
    }
    try { audio.currentTime = 0; } catch (e) { /* starting fresh is fine */ }
    const p = audio.play();
    if (p && p.catch) p.catch(() => {});
  }
  document.querySelectorAll('[data-an-sound]').forEach(btn => {
    const animal = btn.getAttribute('data-an-sound');
    btn.addEventListener('click', () => {
      play(animal);
      btn.classList.remove('is-playing');
      void btn.offsetWidth;
      btn.classList.add('is-playing');
    });
  });

  /* --- Match the animal to its sound: tap left, then tap its sound right --- */
  const board = document.querySelector('[data-an-match-board]');
  if (!board) return;
  board.setAttribute('data-match-ready', 'true');
  const status = document.querySelector('[data-an-match-status]');
  const lefts = [...board.querySelectorAll('.an-match[data-match-side="left"]')];
  const rights = [...board.querySelectorAll('.an-match[data-match-side="right"]')];
  const say = msg => {
    if (!status) return;
    status.hidden = false;
    status.textContent = msg;
  };
  let picked = null;
  let matched = 0;
  const TOTAL = lefts.length;
  lefts.forEach(btn => btn.addEventListener('click', () => {
    if (btn.disabled) return;
    lefts.forEach(b => { b.classList.remove('is-picked'); b.setAttribute('aria-pressed', 'false'); });
    btn.classList.add('is-picked');
    btn.setAttribute('aria-pressed', 'true');
    picked = btn;
    say('Now tap the sound it makes!');
  }));
  rights.forEach(btn => btn.addEventListener('click', () => {
    if (btn.disabled) return;
    if (!picked) { say('First tap an animal on the left — then find its sound here.'); return; }
    if (btn.getAttribute('data-match-pair') === picked.getAttribute('data-match-pair')) {
      btn.classList.add('is-matched');
      picked.classList.add('is-matched');
      picked.classList.remove('is-picked');
      btn.disabled = true;
      picked.disabled = true;
      picked.setAttribute('aria-pressed', 'false');
      picked = null;
      matched += 1;
      if (matched === TOTAL) {
        say('All ' + TOTAL + ' animals found their sounds! Woof, moo, baa, quack, roar, ribbit — say them all together!');
      } else {
        say(matched + ' of ' + TOTAL + ' matched! Which animal is still waiting for its voice?');
      }
    } else {
      picked.classList.remove('is-picked');
      picked = null;
      say('Not those two — say the animal\u2019s name, then its sound, and look again.');
    }
  }));
})();
