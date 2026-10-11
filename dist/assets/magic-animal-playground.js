/* Kiddo School — Magic Animal Playground (Age 3): screen flow, real animal
   sound playback, the listening game, and gentle movement animations.
   ALL SIX animals play the site's real recordings from
   /assets/sounds/animals/ (duck and frog recordings: Wikimedia Commons,
   CC BY-SA 4.0 — credited on the page and in sounds/animals/CREDITS.md).
   The sound word is also written under every animal as the visible text
   alternative. Progressive enhancement only — without JavaScript every
   screen is visible and the noscript note invites grown-ups to be the
   duck. No scores, no timers, nothing stored. Animations respect
   body.calm-mode and prefers-reduced-motion through the shared CSS gates
   in style.css. */
(() => {
  const game = document.querySelector('[data-mg-game="animal-playground"]');
  if (!game) return;
  const $ = (sel, el) => (el || game).querySelector(sel);
  const $$ = (sel, el) => [...(el || game).querySelectorAll(sel)];
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const originalHTML = game.innerHTML;
  const live = $('[data-mg-live]');

  const WORD = { dog: 'Woof, woof!', cat: 'Meow!', cow: 'Moo!', duck: 'Quack, quack!', sheep: 'Baa!', frog: 'Ribbit, ribbit!' };
  const RECORDED = ['dog', 'cat', 'cow', 'duck', 'sheep', 'frog'];
  const MOVE_LINE = {
    dog: 'The dog trots around the playground! Can you trot too?',
    cat: 'The cat stretches long and slow! Can you stretch like a cat?',
    cow: 'The cow sways side to side! Sway along with her.',
    duck: 'The duck waddles left and right! Waddle like a duck!',
    sheep: 'The sheep bounces on the grass! Boing, boing — bounce too!',
    frog: 'The frog hops high in the air! Can you hop like a frog?'
  };
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

  /* ---------- shared screen engine ---------- */
  let screens = [];
  function show(id, scroll) {
    screens.forEach(s => { s.hidden = s.getAttribute('data-mg-screen') !== id; });
    const target = screens.find(s => s.getAttribute('data-mg-screen') === id);
    if (target && scroll !== false) target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }
  function wireGo() {
    $$('[data-mg-go]').forEach(btn => btn.addEventListener('click', () => show(btn.getAttribute('data-mg-go'))));
  }
  function talk(text) {
    if (live) live.textContent = text;
    if (document.body.classList.contains('lwy-quiet')) return; // Learning Your Way: prefer quiet
    try {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.85;
      u.pitch = 1.15;
      window.speechSynthesis.speak(u);
    } catch (e) { /* written words carry it */ }
  }

  /* ---------- audio: real recordings + honest screen voice ---------- */
  const players = new Map();
  function playRecording(slug) {
    let audio = players.get(slug);
    if (!audio) {
      audio = new Audio('/assets/sounds/animals/' + slug + '.mp3');
      audio.preload = 'auto';
      players.set(slug, audio);
    }
    try { audio.currentTime = 0; } catch (e) { /* starting fresh is fine */ }
    const p = audio.play();
    if (p && p.catch) p.catch(() => { /* playback needs a gesture — the tap IS one */ });
  }
  function makeSound(slug) {
    if (RECORDED.includes(slug)) playRecording(slug);
    else talk(WORD[slug] + ' ' + WORD[slug]);
  }

  /* ---------- Meet the Animals: sound + gentle move ---------- */
  function wireMeet() {
    $$('[data-mg-sound]').forEach(btn => btn.addEventListener('click', () => {
      const slug = btn.getAttribute('data-mg-sound');
      makeSound(slug);
      if (!reduce) {
        btn.classList.remove('is-moving');
        void btn.offsetWidth;
        btn.classList.add('is-moving');
        setTimeout(() => btn.classList.remove('is-moving'), 1200);
      }
    }));
  }

  /* ---------- Who Made That Sound? — listening rounds ---------- */
  function wireListen() {
    $$('[data-mg-listen]').forEach(round => {
      const playBtn = round.querySelector('[data-mg-play]');
      const feedback = round.querySelector('[data-mg-feedback]');
      const target = round.getAttribute('data-mg-listen');
      if (playBtn) playBtn.addEventListener('click', () => {
        makeSound(target);
        playBtn.classList.remove('is-playing');
        void playBtn.offsetWidth;
        playBtn.classList.add('is-playing');
        setTimeout(() => playBtn.classList.remove('is-playing'), 900);
      });
      round.querySelectorAll('.mg-listen-choice').forEach(btn => {
        btn.addEventListener('click', () => {
          if (round.classList.contains('is-done')) return;
          if (btn.hasAttribute('data-mg-correct')) {
            round.classList.add('is-done');
            btn.classList.add('is-picked');
            feedback.hidden = false;
            feedback.textContent = 'Yes! The ' + cap(target) + ' says ' + WORD[target];
            talk('Yes! The ' + target + ' says ' + WORD[target]);
          } else {
            round.classList.remove('is-look');
            void round.offsetWidth;
            round.classList.add('is-look');
            feedback.hidden = false;
            feedback.textContent = 'Have another listen — tap Play the sound again, then choose.';
          }
        });
      });
    });
  }

  /* ---------- Animal Movement ---------- */
  function wireMove() {
    $$('[data-mg-move]').forEach(btn => btn.addEventListener('click', () => {
      const slug = btn.getAttribute('data-mg-move');
      if (!reduce) {
        btn.classList.remove('is-moving');
        void btn.offsetWidth;
        btn.classList.add('is-moving');
        setTimeout(() => btn.classList.remove('is-moving'), 1200);
      }
      talk(MOVE_LINE[slug]);
    }));
  }

  /* ---------- boot / replay ---------- */
  function wire() {
    screens = $$('[data-mg-screen]');
    wireGo();
    wireMeet();
    wireListen();
    wireMove();
  }
  wire();
  show('welcome', false);
  game.addEventListener('click', e => {
    if (e.target.closest('[data-mg-replay]')) {
      game.innerHTML = originalHTML;
      wire();
      show('welcome', false);
      if (live) live.textContent = '';
    }
  });
})();
