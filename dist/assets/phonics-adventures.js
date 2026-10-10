/* Kiddo School — Phonics Adventures engine (Class 28).
   One engine, eight interaction types, driven by the server-rendered boards:
     listen     — play a recorded sound, tap every picture that starts with it
     letter     — play the word, tap the letter that answers the question
     sort       — tap a card, then tap its chest/shelf/house
     match      — tap two cards that rhyme or share a first sound
     blend      — tap letter tiles into sound boxes, then hear the word
     counters   — tap one circle per sound/syllable, then check
     oddone     — tap the picture with the different beginning sound
     position   — FIRST or LAST: where does the sound live?
     swap       — tap the letter that swaps into the new word
     path       — tap every target-sound picture along the path
   Audio: real recordings at /assets/sounds/phonics/*.mp3 with a screen-voice
   fallback (pure sounds stretched: "sss", "mmm"), a mute switch, and respect
   for the Learning Your Way quiet preference. Progress saves per selected
   child in the site's existing localStorage store — the same one Classes
   25–27 use. Nothing here ever marks a curriculum class complete. */
(() => {
  const board = document.querySelector('[data-ph-board]');
  if (!board || typeof document.querySelectorAll !== 'function') return;
  const slug = board.dataset.phGame;
  const engine = board.dataset.phEngine;

  const store = {
    get(k, fb) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? fb : v; } catch (e) { return fb; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } }
  };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  /* ---------- audio ---------- */
  let muted = store.get('kiddo-ph-mute', false);
  const muteBtn = board.querySelector('[data-ph-mute]');
  const syncMute = () => { if (muteBtn) { muteBtn.textContent = muted ? 'Sound: off' : 'Sound: on'; muteBtn.setAttribute('aria-pressed', String(muted)); } };
  syncMute();
  if (muteBtn) muteBtn.addEventListener('click', () => { muted = !muted; store.set('kiddo-ph-mute', muted); syncMute(); });

  const PURE = { s: 'sss', m: 'mmm', t: 't… t… t', n: 'nnn', b: 'b… b… b', f: 'fff', p: 'p… p… p', c: 'k… k… k' };
  const cache = new Map();
  function say(name) {
    if (muted || document.body.classList.contains('lwy-quiet')) return;
    const pure = PURE[name] || null;
    let a = cache.get(name);
    if (!a) {
      a = new Audio('/assets/sounds/phonics/' + encodeURIComponent(name) + '.mp3');
      a.preload = 'auto';
      cache.set(name, a);
    }
    a.currentTime = 0;
    const p = a.play();
    if (p && p.catch) p.catch(() => voice(pure || name));
    // verify the file really exists; if not, use the screen voice
    fetch(a.src, { method: 'HEAD' }).then(r => { if (!r.ok) { a.pause(); voice(pure || name); } }).catch(() => {});
  }
  function voice(text) {
    if (muted || document.body.classList.contains('lwy-quiet')) return;
    try {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.8; u.pitch = 1.1;
      window.speechSynthesis.speak(u);
    } catch (e) { /* written words carry it */ }
  }

  /* ---------- progress + celebrate ---------- */
  const progressEl = board.querySelector('[data-ph-progress]');
  const replayBtn = board.querySelector('[data-ph-replay]');
  const rounds = board.querySelectorAll('[data-ph-round]');
  let round = 0;
  const note = t => { if (progressEl) progressEl.textContent = t; };
  function showRound(i) {
    rounds.forEach((r, j) => { r.hidden = j !== i; });
    note('Round ' + (i + 1) + ' of ' + rounds.length);
  }
  function saveProgress() {
    const all = store.get('kiddo-adventures', {});
    const child = store.get('kiddo-active', null) || 'guest';
    const me = all[child] = all[child] || {};
    const ph = me.phonics = me.phonics || { opened: {}, completed: {} };
    ph.opened[slug] = Date.now();
    store.set('kiddo-adventures', all);
  }
  function saveComplete() {
    const all = store.get('kiddo-adventures', {});
    const child = store.get('kiddo-active', null) || 'guest';
    const me = all[child] = all[child] || {};
    const ph = me.phonics = me.phonics || { opened: {}, completed: {} };
    ph.completed[slug] = Date.now();
    ph.opened[slug] = ph.opened[slug] || Date.now();
    store.set('kiddo-adventures', all);
    document.dispatchEvent(new CustomEvent('kiddo-adventure-done', { detail: { band: 'phonics', slug } }));
  }
  function celebrate() {
    const el = board.querySelector('[data-sa-cheer]');
    if (el) { el.hidden = false; el.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
    saveComplete();
  }
  saveProgress();
  showRound(0);

  const cheer = el => {
    note(['Lovely!', 'That\u2019s it!', 'Great listening!', 'Wonderful!'][Math.floor(Math.random() * 4)] || 'Lovely!');
    if (el && el.classList) el.classList.add('ph-won');
  };
  const miss = el => {
    note('Let\u2019s listen together \u2014 try again.');
    if (el && el.classList) { el.classList.add('ph-miss'); setTimeout(() => el.classList.remove('ph-miss'), 700); }
  };
  const advance = () => {
    if (round < rounds.length - 1) { round++; showRound(round); }
    else { note('All rounds done!'); celebrate(); }
  };

  /* ---------- engine wiring ---------- */
  const roundDone = new Set();
  const svg = board.querySelector('svg');

  if (engine === 'listen' || engine === 'oddone') {
    rounds.forEach((r, ri) => {
      const playBtn = r.querySelector('[data-ph-round-play]');
      if (playBtn) playBtn.addEventListener('click', () => say(playBtn.dataset.phRoundPlay));
      const picks = r.querySelectorAll('[data-ph-pick]');
      const okCount = r.querySelectorAll('[data-ph-ok]').length;
      let found = 0;
      picks.forEach(p => p.addEventListener('click', () => {
        if (roundDone.has(ri)) return;
        if (p.hasAttribute('data-ph-ok')) {
          found++; cheer(p); p.classList.add('ph-found');
          if (found >= okCount) { roundDone.add(ri); setTimeout(advance, 450); }
        } else miss(p);
      }));
    });
  }

  if (engine === 'letter') {
    rounds.forEach((r, ri) => {
      const w = r.dataset.phWord || r.getAttribute('data-ph-word');
      const play = r.querySelector('[data-ph-playword]');
      if (play) play.addEventListener('click', () => say(w || play.dataset.phPlayword));
      r.querySelectorAll('[data-ph-pick]').forEach(p => p.addEventListener('click', () => {
        if (roundDone.has(ri)) return;
        if (p.hasAttribute('data-ph-ok')) { roundDone.add(ri); cheer(p); setTimeout(advance, 450); }
        else miss(p);
      }));
    });
  }

  if (engine === 'sort') {
    let held = null;
    board.querySelectorAll('.ph-item').forEach(it => it.addEventListener('click', () => {
      board.querySelectorAll('.ph-item').forEach(x => x.classList.remove('ph-held'));
      held = it; it.classList.add('ph-held');
      if (it.dataset.phWord) say(it.dataset.phWord);
      note('Now tap the box it belongs in.');
    }));
    board.querySelectorAll('.ph-bin').forEach(bin => bin.addEventListener('click', () => {
      if (!held) { note('First tap a card, then its box.'); return; }
      if (held.dataset.phBin === bin.dataset.phBin) {
        held.classList.add('ph-gone'); held.classList.remove('ph-held');
        held.style.pointerEvents = 'none';
        cheer(bin);
        const left = board.querySelectorAll('.ph-item:not(.ph-gone)').length;
        if (!left) celebrate();
        else note(left + ' card' + (left > 1 ? 's' : '') + ' to go.');
      } else miss(bin);
      held = null;
    }));
  }

  if (engine === 'match') {
    let first = null;
    board.querySelectorAll('.ph-item').forEach(it => it.addEventListener('click', () => {
      if (it.classList.contains('ph-gone')) return;
      if (it.classList.contains('ph-held')) return;
      if (!first) {
        first = it; it.classList.add('ph-held');
        if (it.dataset.phWord) say(it.dataset.phWord);
        note('Now tap its partner.');
      } else if (first === it) {
        first.classList.remove('ph-held'); first = null; note('Pick a different partner.');
      } else {
        if (first.dataset.phMatch === it.dataset.phMatch) {
          first.classList.add('ph-gone'); it.classList.add('ph-gone');
          first.classList.remove('ph-held');
          cheer(it);
          const left = board.querySelectorAll('.ph-item:not(.ph-gone)').length;
          if (!left) celebrate(); else note(left + ' cards to go.');
        } else { miss(it); note('Listen again — do they end the same?'); }
        first.classList.remove('ph-held'); first = null;
      }
    }));
  }

  if (engine === 'blend') {
    rounds.forEach((r, ri) => {
      const slots = Array.from(r.querySelectorAll('[data-ph-slot]')).map(el => ({ el, filled: false }));
      const word = (r.dataset.phBlendword || r.getAttribute('data-ph-blendword') || '');
      const seq = r.dataset.phSeq ? r.dataset.phSeq.split(' ').filter(Boolean) : [];
      let idx = 0;
      r.querySelectorAll('[data-ph-tile]').forEach(t => t.addEventListener('click', () => {
        if (r.dataset.phDone) return;
        const need = seq[idx];
        if (t.dataset.phTile === need) {
          const slot = slots[idx];
          if (slot) {
            slot.filled = true;
            const letter = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            letter.setAttribute('x', slot.el.getAttribute('x') === null ? 0 : parseFloat(slot.el.getAttribute('x')) + 43);
            letter.setAttribute('y', parseFloat(slot.el.getAttribute('y')) + 62);
            letter.setAttribute('text-anchor', 'middle');
            letter.setAttribute('font-size', '46');
            letter.setAttribute('font-weight', 'bold');
            letter.setAttribute('fill', '#8f4fc0');
            letter.setAttribute('font-family', 'Arial,Helvetica,sans-serif');
            letter.textContent = need;
            slot.el.parentNode.appendChild(letter);
          }
          say(need);
          idx++;
          if (idx >= seq.length) {
            r.dataset.phDone = '1';
            setTimeout(() => { say(word); note('Say it with me: ' + word + '!'); }, 500);
            setTimeout(() => { advance(); }, 2200);
          } else note('Next sound\u2026');
        } else miss(t);
      }));
    });
  }

  if (engine === 'counters') {
    rounds.forEach((r, ri) => {
      const word = r.dataset.phWord || r.getAttribute('data-ph-word');
      const play = r.querySelector('[data-ph-playword]');
      if (play) play.addEventListener('click', () => say(word || play.dataset.phPlayword));
      let tapped = 0;
      r.querySelectorAll('.ph-counter').forEach(c => c.addEventListener('click', () => {
        const dot = c.querySelector('.ph-dot');
        if (dot) {
          const on = dot.getAttribute('opacity') !== '0' && dot.getAttribute('opacity') !== null;
          if (on) { dot.setAttribute('opacity', '0'); tapped = Math.max(0, tapped - 1); }
          else { dot.setAttribute('opacity', '1'); tapped++; }
        }
      }));
      const check = r.querySelector('.ph-check');
      if (check) check.addEventListener('click', () => {
        const need = parseInt(check.dataset.phNeed, 10);
        if (tapped === need) { roundDone.add(ri); cheer(check); setTimeout(advance, 500); }
        else { miss(check); note('Listen once more and count the sounds on your fingers.'); }
      });
    });
  }

  if (engine === 'position') {
    rounds.forEach((r, ri) => {
      const word = r.dataset.phWord || r.getAttribute('data-ph-word');
      const play = r.querySelector('[data-ph-playword]');
      if (play) play.addEventListener('click', () => say(word || play.dataset.phPlayword));
      r.querySelectorAll('[data-ph-pick]').forEach(p => p.addEventListener('click', () => {
        if (roundDone.has(ri)) return;
        if (p.hasAttribute('data-ph-ok')) { roundDone.add(ri); cheer(p); setTimeout(advance, 450); }
        else miss(p);
      }));
    });
  }

  if (engine === 'swap') {
    rounds.forEach((r, ri) => {
      r.querySelectorAll('[data-ph-tile]').forEach(t => t.addEventListener('click', () => {
        if (roundDone.has(ri)) return;
        if (t.dataset.phOk === 'true') { roundDone.add(ri); cheer(t); say(r.dataset.phNewword || ''); setTimeout(advance, 700); }
        else miss(t);
      }));
    });
  }

  if (engine === 'path') {
    let found = 0;
    const total = board.querySelectorAll('[data-ph-ok]').length;
    board.querySelectorAll('.ph-card').forEach(p => p.addEventListener('click', () => {
      if (p.classList.contains('ph-gone')) return;
      if (p.hasAttribute('data-ph-ok')) {
        p.classList.add('ph-gone'); found++; cheer(p);
        if (found >= total) celebrate();
        else note((total - found) + ' s-pictures left on the path.');
      } else { miss(p); note('Does hat start with sss? Listen again\u2026'); }
    }));
  }

  /* ---------- replay ---------- */
  if (replayBtn) {
    replayBtn.hidden = false;
    replayBtn.addEventListener('click', () => {
      roundDone.clear();
      board.querySelectorAll('.ph-gone,.ph-found,.ph-won').forEach(el => el.classList.remove('ph-gone', 'ph-found', 'ph-won'));
      board.querySelectorAll('.ph-item').forEach(el => { el.style.pointerEvents = ''; });
      round = 0; showRound(0);
    });
  }
})();
