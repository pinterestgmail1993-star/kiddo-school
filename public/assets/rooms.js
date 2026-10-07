/* Kiddo School — classroom life runners: Our Classroom (seven tiny practice
   activities), Let's Explore (eight real-world missions) and the Sticky Note
   Wall form. Without JavaScript everything still reads on the page; with
   JavaScript one activity or mission shows at a time. No scores anywhere. */
(() => {
  const $ = (sel, el) => (el || document).querySelector(sel);
  const $$ = (sel, el) => [...(el || document).querySelectorAll(sel)];
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const COLOR_HEX = { red: '#c9452c', blue: '#33628c', yellow: '#dda233', green: '#4a7c3f' };
  const SHAPE_D = {
    circle: 'M70 26a44 44 0 1 1 0 88 44 44 0 1 1 0-88',
    square: 'M30 30h80v80H30z',
    triangle: 'M70 24 116 112H24z'
  };
  let draggedFlag = false; // a pointer drag just ended; swallow the click it produces

  /* Shared tap-or-drag placement (tidy-up, helping): drag onto the zone, or
     tap the toy then tap the zone. Both always work. */
  function tapOrDrag(item, zone, onPlace) {
    let picked = false;
    item.addEventListener('click', () => {
      if (item.hasAttribute('data-oc-placed')) return;
      if (draggedFlag) { draggedFlag = false; return; }
      picked = !picked;
      item.classList.toggle('is-picked', picked);
    });
    let dragging = false, start = null, moved = false;
    item.addEventListener('pointerdown', e => {
      if (item.hasAttribute('data-oc-placed')) return;
      dragging = true; moved = false;
      start = { x: e.clientX, y: e.clientY };
      try { item.setPointerCapture(e.pointerId); } catch (err) { /* virtual pointers */ }
    });
    item.addEventListener('pointermove', e => {
      if (!dragging) return;
      const dx = e.clientX - start.x, dy = e.clientY - start.y;
      if (!moved && Math.hypot(dx, dy) > 8) { moved = true; item.classList.add('is-drag'); }
      if (moved) {
        item.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
        const el = document.elementFromPoint(e.clientX, e.clientY);
        zone.classList.toggle('is-target', !!el && (el === zone || zone.contains(el)));
      }
    });
    const up = e => {
      if (!dragging) return;
      dragging = false;
      item.classList.remove('is-drag');
      item.style.transform = '';
      if (moved) {
        draggedFlag = true;
        const el = document.elementFromPoint(e.clientX, e.clientY);
        const over = !!el && (el === zone || zone.contains(el));
        zone.classList.remove('is-target');
        if (over) { picked = false; onPlace(item); }
        setTimeout(() => { draggedFlag = false; }, 60);
      }
    };
    item.addEventListener('pointerup', up);
    item.addEventListener('pointercancel', up);
    /* tap the toy, then tap the zone */
    zone.addEventListener('click', () => {
      if (picked && !item.hasAttribute('data-oc-placed')) {
        picked = false;
        item.classList.remove('is-picked');
        onPlace(item);
      }
    });
  }

  /* ------------------------------------------------------ OUR CLASSROOM */
  const grid = $('[data-oc-grid]');
  if (grid) {
    const live = $('[data-oc-live]');
    const acts = $$('[data-oc-act]');
    const allDone = $('[data-oc-alldone]');
    const doneSet = new Set();
    const say = m => { live.textContent = m; };
    acts.forEach(a => { a.hidden = true; });
    $$('[data-oc-tryanother]').forEach(b => { b.hidden = false; });

    function openAct(id) {
      acts.forEach(a => { a.hidden = a.getAttribute('data-oc-act') !== id; });
      grid.hidden = true;
      allDone.hidden = true;
      const act = acts.find(a => a.getAttribute('data-oc-act') === id);
      act.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      const h = act.querySelector('h2');
      h.setAttribute('tabindex', '-1');
      h.focus({ preventScroll: true });
    }
    function finish(act, word) {
      const panel = $('[data-oc-complete]', act);
      panel.hidden = false;
      $('.mw-cheer', panel).textContent = word || 'Nice practice!';
      doneSet.add(act.getAttribute('data-oc-act'));
      if (doneSet.size === acts.length && allDone) allDone.hidden = false;
    }
    function backToGrid() {
      acts.forEach(a => { a.hidden = true; });
      grid.hidden = false;
      allDone.hidden = doneSet.size !== acts.length;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    }
    $$('[data-oc-open]', grid).forEach(btn => btn.addEventListener('click', () => openAct(btn.getAttribute('data-oc-open'))));
    $$('[data-oc-complete]').forEach(panel => {
      panel.querySelector('[data-oc-tryanother]').addEventListener('click', backToGrid);
    });

    /* 1 · We Listen — one direction at a time, then "Nice listening!" */
    const listen = acts.find(a => a.getAttribute('data-oc-act') === 'listen');
    if (listen) {
      const steps = $$('[data-oc-step]', listen);
      let cur = 0;
      steps.forEach((s, i) => {
        s.hidden = i !== 0;
        const did = $('[data-oc-did]', s);
        did.hidden = false;
        did.addEventListener('click', () => {
          if (cur < steps.length - 1) {
            cur++;
            steps.forEach((x, j) => { x.hidden = j !== cur; });
            const big = $('.ct-big', steps[cur]);
            big.setAttribute('tabindex', '-1');
            big.focus({ preventScroll: true });
          } else {
            say('Nice listening!');
            finish(listen, 'Nice listening!');
          }
        });
      });
    }
    /* 2 · We Are Kind — both answers are answered kindly, never shamed */
    const kind = acts.find(a => a.getAttribute('data-oc-act') === 'kind');
    if (kind) {
      const steps = $$('[data-oc-kindstep]', kind);
      let cur = 0;
      steps.forEach((s, i) => {
        s.hidden = i !== 0;
        const out = $('[data-oc-kindsay]', s);
        const next = $('[data-oc-kindnext]', s);
        next.hidden = true;
        [['[data-oc-kindgood]', true], ['[data-oc-kindother]', false]].forEach(([sel]) => {
          const btn = $(sel, s);
          btn.hidden = false;
          btn.addEventListener('click', () => {
            out.textContent = btn.getAttribute('data-say') || 'We can help.';
            next.hidden = false;
          });
        });
        next.addEventListener('click', () => {
          if (cur < steps.length - 1) {
            cur++;
            steps.forEach((x, j) => { x.hidden = j !== cur; });
          } else {
            finish(kind);
          }
        });
      });
    }
    /* 3 · We Take Turns — my turn, your turn, four taps in all */
    const turns = acts.find(a => a.getAttribute('data-oc-act') === 'turns');
    if (turns) {
      const ball = $('[data-oc-ball]', turns);
      const out = $('[data-oc-turnsay]', turns);
      const words = ['Your turn!', 'Grown-up’s turn!'];
      let taps = 0;
      ball.addEventListener('click', () => {
        taps++;
        if (!reduce) {
          ball.classList.remove('is-bump');
          void ball.offsetWidth; // restart the bump
          ball.classList.add('is-bump');
        }
        if (taps >= 4) {
          out.textContent = 'We took turns!';
          finish(turns, 'We took turns!');
        } else {
          out.textContent = words[taps % 2];
        }
      });
    }
    /* 4 · Gentle Hands — any gentle pat is a good pat */
    const gentle = acts.find(a => a.getAttribute('data-oc-act') === 'gentle');
    if (gentle) {
      const teddy = $('[data-oc-teddy]', gentle);
      const out = $('[data-oc-gentlesay]', gentle);
      let soothed = false;
      teddy.addEventListener('click', () => {
        teddy.classList.add('is-soothed');
        out.textContent = 'Soft and gentle.';
        if (!soothed) { soothed = true; finish(gentle, 'Soft and gentle.'); }
      });
    }
    /* 5 + 6 · Tidy Up & We Help — same tap-or-drag placement */
    [['tidy', 'data-oc-tidysay', 'All tidy!'], ['help', 'data-oc-helpsay', 'Thanks for helping!']].forEach(([id, saySel, word]) => {
      const act = acts.find(a => a.getAttribute('data-oc-act') === id);
      if (!act) return;
      const out = $('[' + saySel + ']', act);
      const zone = $('[data-oc-zone]', act);
      const toys = $$('[data-oc-toy]', act);
      let placed = 0;
      const place = item => {
        item.setAttribute('data-oc-placed', '');
        item.hidden = true;
        item.classList.remove('is-picked');
        placed++;
        out.textContent = placed < toys.length ? 'In it goes!' : word;
        if (placed === toys.length) finish(act, word);
      };
      toys.forEach(toy => tapOrDrag(toy, zone, place));
    });
    /* 7 · We Try Together — clap, wave, clap */
    const together = acts.find(a => a.getAttribute('data-oc-act') === 'together');
    if (together) {
      const pat = $('[data-oc-pattern]', together);
      const patSay = $('[data-oc-patternsay]', together);
      const again = $('[data-oc-againpat]', together);
      const patterns = [['👏', '👋', '👏'], ['👋', '👏', '👏']];
      const words = ['Clap, wave, clap!', 'Wave, clap, clap!'];
      let idx = 0;
      const seen = new Set([0]);
      const paint = () => {
        pat.textContent = patterns[idx].join(' ');
        patSay.textContent = words[idx];
        seen.add(idx);
        if (seen.size >= patterns.length) finish(together, 'We tried together!');
      };
      again.hidden = false;
      again.addEventListener('click', () => { idx = (idx + 1) % patterns.length; paint(); });
      paint();
    }
  }

  /* ------------------------------------------------------- LET'S EXPLORE */
  const leGrid = $('[data-le-grid]');
  if (leGrid) {
    const poolsEl = $('[data-le-pools]');
    let POOL = { colors: ['red', 'blue', 'yellow', 'green'], shapes: ['circle', 'square', 'triangle'], moves: [], outside: [] };
    if (poolsEl) { try { POOL = JSON.parse(poolsEl.textContent); } catch (err) { /* defaults hold */ } }
    const views = $$('[data-le-view]');
    views.forEach(bindView);
    function open(id) {
      views.forEach(v => { v.hidden = v.getAttribute('data-le-view') !== id; });
      leGrid.hidden = true;
      const view = views.find(v => v.getAttribute('data-le-view') === id);
      view.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      const h = view.querySelector('h2');
      h.setAttribute('tabindex', '-1');
      h.focus({ preventScroll: true });
    }
    function toGrid(view) {
      $('[data-le-complete]', view).hidden = true;
      views.forEach(v => { v.hidden = true; });
      leGrid.hidden = false;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    }
    $$('[data-le-open]', leGrid).forEach(a => a.addEventListener('click', e => {
      e.preventDefault();
      open(a.getAttribute('data-le-open'));
    }));
    function bindView(view) {
      const id = view.getAttribute('data-le-view');
      const go = $('[data-le-go]', view);
      const listen = $('[data-le-listen]', view);
      const startBtn = go || listen;
      const away = $('[data-le-away]', view);
      const back = $('[data-le-back]', view);
      const complete = $('[data-le-complete]', view);
      const didBtn = $('[data-le-did]', view);
      const anotherBtn = $('[data-le-another]', view);
      const anotherMission = $('[data-le-anothermission]', view);
      const backGrid = $('[data-le-backgrid]', view);
      let pi = 0;
      [startBtn, didBtn, anotherBtn, anotherMission, backGrid].forEach(b => { if (b) b.hidden = false; });
      anotherMission.addEventListener('click', () => toGrid(view));
      backGrid.addEventListener('click', () => toGrid(view));
      const reset = () => {
        away.hidden = true;
        back.hidden = true;
        complete.hidden = true;
        startBtn.hidden = false;
        startBtn.focus({ preventScroll: true });
      };
      startBtn.addEventListener('click', () => {
        startBtn.hidden = true;
        away.hidden = false;
        away.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' });
      });
      if (anotherBtn) {
        anotherBtn.addEventListener('click', () => {
          pi = (pi + 1) % POOL[id === 'color' ? 'colors' : id === 'shape' ? 'shapes' : id === 'move' ? 'moves' : 'outside'].length;
          if (id === 'color') {
            $('[data-le-color]', view).textContent = POOL.colors[pi];
            const swatch = $('[data-le-swatch]', view);
            if (swatch) swatch.setAttribute('fill', COLOR_HEX[POOL.colors[pi]] || '#c9452c');
          } else if (id === 'shape') {
            $('[data-le-shape-word]', view).textContent = POOL.shapes[pi];
            const path = $('[data-le-shape]', view);
            if (path) path.setAttribute('d', SHAPE_D[POOL.shapes[pi]] || path.getAttribute('d'));
          } else if (id === 'move') {
            $('[data-le-move]', view).textContent = POOL.moves[pi];
          } else {
            $('[data-le-outside]', view).textContent = POOL.outside[pi];
          }
          reset();
        });
      }
      const sizeBtn = $('[data-le-sizefound]', view);
      if (id === 'size' && sizeBtn) {
        let smallYet = false;
        sizeBtn.addEventListener('click', () => {
          if (!smallYet) {
            smallYet = true;
            $('[data-le-size-step]', view).textContent = 'Now find something small.';
            sizeBtn.textContent = 'We Found Them!';
            away.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' });
          } else {
            away.hidden = true;
            back.hidden = false;
          }
        });
      } else {
        const foundBtn = $('[data-le-found]', view);
        if (foundBtn) foundBtn.addEventListener('click', () => {
          away.hidden = true;
          back.hidden = false;
        });
      }
      if (didBtn) didBtn.addEventListener('click', () => {
        away.hidden = true;
        back.hidden = true;
        complete.hidden = false;
        complete.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' });
      });
    }
  }

  /* ----------------------------------------------------- STICKY NOTE WALL */
  const form = $('[data-wall-form]');
  if (form) {
    const nojs = $('[data-wall-nojs]');
    if (nojs) nojs.hidden = true;
    const msg = $('#wall-message', form);
    const count = $('[data-wall-count]', form);
    const LIMIT = 120;
    const update = () => { count.textContent = (LIMIT - msg.value.length) + ' characters left'; };
    msg.addEventListener('input', update);
    update();
    const live = $('[data-wall-live]', form);
    const send = $('[data-wall-send]', form);
    const confirmBox = form.querySelector('input[name="confirm"]');
    send.addEventListener('click', () => {
      const text = msg.value.trim();
      if (!text) { live.textContent = 'Write a little note first.'; msg.focus(); return; }
      if (!confirmBox.checked) { live.textContent = 'Please tick the parent box first.'; confirmBox.focus(); return; }
      /* Honest state: no review inbox is connected yet, so nothing is sent
         and nothing is published. The note stays in this form. */
      live.textContent = 'Thanks! Your note is ready — but the wall can’t receive notes yet, so nothing was sent.';
    });
  }
})();
