// Kiddo School Admin client logic. Public file, zero secrets: every admin
// capability exists only behind the server-side session check on
// /api/admin/* — this script can only render what the APIs return.
(function () {
  'use strict';
  var queueEl = document.getElementById('queue');
  if (!queueEl) return;

  var REACTION_LABELS = {
    star: { emoji: '\u2B50', label: 'Star rating' },
    love: { emoji: '\uD83D\uDE0D', label: 'Loved it' },
    like: { emoji: '\uD83D\uDE0A', label: 'Liked it' },
    okay: { emoji: '\uD83D\uDE10', label: 'It was okay' },
    not_for_us: { emoji: '\uD83D\uDE15', label: 'Not for us' }
  };
  var CATEGORIES = { question: 'Question', request: 'Request', feedback: 'Feedback', suggestion: 'Suggestion', complaint: 'Complaint', technical_problem: 'Technical Problem' };
  var QUEUES = {
    principal: { title: 'Principal\u2019s Office', statuses: [['new', 'New'], ['read', 'Read'], ['resolved', 'Resolved'], ['archived', 'Archived']], hasCategory: true },
    notes: { title: 'Sticky Notes', statuses: [['pending', 'Pending'], ['approved', 'Approved'], ['rejected', 'Rejected']] },
    art: { title: 'Art Wall', statuses: [['pending', 'Pending'], ['approved', 'Approved'], ['rejected', 'Rejected']] },
    reviews: { title: 'Reviews', statuses: [['pending', 'Pending'], ['approved', 'Approved'], ['rejected', 'Rejected']] },
    comments: { title: 'Comments', statuses: [['pending', 'Pending'], ['approved', 'Approved'], ['rejected', 'Rejected']] }
  };
  var current = 'principal';
  var currentStatus = 'new';
  var currentCategory = '';
  var state = {};

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }
  function meta(obj, fields) {
    return fields.filter(function (f) { return f.value; }).map(function (f) { return f.label + ': ' + f.value; }).join(' \u00B7 ');
  }
  function fmtDate(iso) {
    if (!iso) return '';
    try { return new Date(iso).toLocaleString(); } catch (e) { return iso; }
  }
  function badge(status) {
    var b = el('span', 'badge ' + status, status);
    return b;
  }

  function api(path, options) {
    options = options || {};
    options.headers = Object.assign({ 'X-Kiddo-Community': '1' }, options.headers || {});
    if (options.body && typeof options.body !== 'string') { options.body = JSON.stringify(options.body); options.headers['Content-Type'] = 'application/json'; }
    return fetch('/api/admin/' + path, options).then(function (res) {
      return res.json().then(function (data) { return { status: res.status, data: data }; });
    });
  }

  function loadCounts() {
    api('counts').then(function (r) {
      if (!r.data.ok) return;
      document.getElementById('c-principal').textContent = r.data.counts.principalNew;
      document.getElementById('c-notes').textContent = r.data.counts.stickyPending;
      document.getElementById('c-art').textContent = r.data.counts.artPending;
      document.getElementById('c-reviews').textContent = r.data.counts.reviewsPending;
      document.getElementById('c-comments').textContent = r.data.counts.commentsPending;
    }).catch(function () {});
  }

  function act(resource, id, action) {
    api(resource + '/' + id, { method: 'POST', body: { action: action } }).then(function (r) {
      if (r.data.ok) { renderQueue(); loadCounts(); }
    }).catch(function () {});
  }

  function itemPrincipal(it) {
    var box = el('div', 'item');
    box.appendChild(badge(it.status));
    box.appendChild(el('p', null, CATEGORIES[it.category] || it.category));
    box.appendChild(el('p', 'msg', it.message));
    box.appendChild(el('p', 'meta', meta(0, [
      { label: 'From', value: it.parent_name || 'Not given' },
      { label: 'Email', value: it.email || 'Not given' },
      { label: 'Received', value: fmtDate(it.created_at) }
    ])));
    var actions = el('div', 'actions');
    if (it.status === 'new') { var b1 = el('button', null, 'Mark Read'); b1.addEventListener('click', function () { act('principal', it.id, 'read'); }); actions.appendChild(b1); }
    if (it.status !== 'resolved') { var b2 = el('button', 'approve', 'Resolve'); b2.addEventListener('click', function () { act('principal', it.id, 'resolve'); }); actions.appendChild(b2); }
    if (it.status !== 'archived') { var b3 = el('button', 'reject', 'Archive'); b3.addEventListener('click', function () { act('principal', it.id, 'archive'); }); actions.appendChild(b3); }
    box.appendChild(actions);
    return box;
  }

  function itemNote(it) {
    var box = el('div', 'item');
    box.appendChild(badge(it.status));
    box.appendChild(el('p', 'msg', '\u201C' + it.message + '\u201D'));
    box.appendChild(el('p', 'meta', meta(0, [
      { label: 'From', value: it.display_name || 'Not given' },
      { label: 'Sent', value: fmtDate(it.created_at) }
    ])));
    box.appendChild(actionRow('notes', it.id, it.status));
    return box;
  }

  function artImageCell(it, large) {
    var img = document.createElement('img');
    img.className = 'artimg';
    img.alt = large ? 'Submitted artwork preview' : 'Artwork preview';
    img.src = '/api/admin/art/' + it.id + '/image';
    return img;
  }

  function itemArt(it) {
    var box = el('div', 'item');
    box.appendChild(badge(it.status));
    box.appendChild(artImageCell(it, true));
    box.appendChild(el('p', 'meta', meta(0, [
      { label: 'Title', value: it.title || 'Not given' },
      { label: 'From', value: it.display_name || 'Not given' },
      { label: 'Sent', value: fmtDate(it.created_at) },
      { label: 'File', value: (it.image_type || '').replace('image/', '') + ', ' + Math.round((it.image_size || 0) / 1024) + ' kB' }
    ])));
    box.appendChild(actionRow('art', it.id, it.status));
    return box;
  }

  function itemReview(it) {
    var box = el('div', 'item');
    box.appendChild(badge(it.status));
    var r = REACTION_LABELS[it.reaction] || { emoji: '', label: it.reaction };
    if (it.reaction === 'star' && it.rating) {
      var n = Math.max(1, Math.min(5, Number(it.rating)));
      var shown = '';
      for (var si = 1; si <= 5; si++) shown += (si <= n ? '\u2605' : '\u2606');
      box.appendChild(el('p', null, shown + ' (' + n + '/5)'));
    } else {
      box.appendChild(el('p', null, r.emoji + ' ' + r.label));
    }
    if (it.comment) box.appendChild(el('p', 'msg', '\u201C' + it.comment + '\u201D'));
    box.appendChild(el('p', 'meta', meta(0, [
      { label: 'Page', value: it.page_path },
      { label: 'From', value: it.display_name || 'Not given' },
      { label: 'Sent', value: fmtDate(it.created_at) }
    ])));
    box.appendChild(actionRow('reviews', it.id, it.status));
    return box;
  }

  function itemComment(it) {
    var box = el('div', 'item');
    box.appendChild(badge(it.status));
    box.appendChild(el('p', 'msg', '\u201C' + it.comment + '\u201D'));
    box.appendChild(el('p', 'meta', meta(0, [
      { label: 'Page', value: it.page_path },
      { label: 'From', value: it.display_name || 'Not given' },
      { label: 'Sent', value: fmtDate(it.created_at) }
    ])));
    box.appendChild(actionRow('comments', it.id, it.status));
    return box;
  }

  function actionRow(resource, id, status) {
    var actions = el('div', 'actions');
    if (status === 'pending') {
      var a = el('button', 'approve', 'Approve');
      a.addEventListener('click', function () { act(resource, id, 'approve'); });
      var r = el('button', 'reject', 'Reject');
      r.addEventListener('click', function () { act(resource, id, 'reject'); });
      actions.appendChild(a); actions.appendChild(r);
    } else if (status === 'approved') {
      var rj = el('button', 'reject', 'Reject (removes from public)');
      rj.addEventListener('click', function () { act(resource, id, 'reject'); });
      actions.appendChild(rj);
    } else {
      var ap = el('button', 'approve', 'Approve (makes it public)');
      ap.addEventListener('click', function () { act(resource, id, 'approve'); });
      actions.appendChild(ap);
    }
    return actions;
  }

  var RENDERERS = { principal: itemPrincipal, notes: itemNote, art: itemArt, reviews: itemReview, comments: itemComment };

  function renderQueue() {
    var spec = QUEUES[current];
    queueEl.textContent = '';
    var h = el('h2', null, spec.title + ' queue');
    queueEl.appendChild(h);
    var filters = el('div', 'filters');
    filters.setAttribute('role', 'group');
    filters.setAttribute('aria-label', 'Filter by status');
    spec.statuses.forEach(function (pair) {
      var b = el('button', null, pair[1]);
      b.setAttribute('aria-pressed', String(pair[0] === currentStatus));
      b.addEventListener('click', function () { currentStatus = pair[0]; renderQueue(); });
      filters.appendChild(b);
    });
    if (spec.hasCategory) {
      var select = document.createElement('select');
      select.setAttribute('aria-label', 'Filter by category');
      var all = document.createElement('option'); all.value = ''; all.textContent = 'All categories'; select.appendChild(all);
      Object.keys(CATEGORIES).forEach(function (key) {
        var o = document.createElement('option'); o.value = key; o.textContent = CATEGORIES[key];
        if (key === currentCategory) o.selected = true;
        select.appendChild(o);
      });
      select.addEventListener('change', function () { currentCategory = select.value; renderQueue(); });
      filters.appendChild(select);
    }
    queueEl.appendChild(filters);
    var list = el('div');
    list.setAttribute('aria-busy', 'true');
    queueEl.appendChild(list);

    var query = '?status=' + encodeURIComponent(currentStatus) + (currentCategory ? '&category=' + encodeURIComponent(currentCategory) : '');
    api(current + query).then(function (r) {
      list.setAttribute('aria-busy', 'false');
      if (r.status === 401) { location.assign('/admin/'); return; } // session ended
      if (!r.data.ok) { list.appendChild(el('p', 'empty', r.data.error || 'Could not load this queue.')); return; }
      var items = r.data.items || [];
      if (!items.length) { list.appendChild(el('p', 'empty', 'Nothing here right now.')); return; }
      items.forEach(function (it) { list.appendChild(RENDERERS[current](it)); });
    }).catch(function () {
      list.setAttribute('aria-busy', 'false');
      list.appendChild(el('p', 'empty', 'Could not load this queue.'));
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-goto]'), function (card) {
    card.addEventListener('click', function () {
      current = card.getAttribute('data-goto');
      currentStatus = current === 'principal' ? 'new' : 'pending';
      currentCategory = '';
      renderQueue();
      queueEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Log out: same-origin POST, the server clears the HttpOnly session cookie
  // and the browser lands back on the login page.
  var logoutBtn = document.getElementById('logout');
  if (logoutBtn) {
    logoutBtn.hidden = false;
    logoutBtn.addEventListener('click', function () {
      logoutBtn.disabled = true;
      fetch('/admin/logout', {
        method: 'POST',
        headers: { 'Origin': location.origin },
        credentials: 'same-origin'
      }).then(function () { location.assign('/admin/'); }).catch(function () {
        logoutBtn.disabled = false;
      });
    });
  }

  function showLockedNote(message) {
    var note = document.getElementById('db-note');
    if (!note) return;
    note.hidden = false;
    note.textContent = message;
  }

  api('counts').then(function (r) {
    if (r.status === 503) showLockedNote(r.data.error || 'The admin room is locked.');
    if (r.status === 401) { location.assign('/admin/'); return; }
    loadCounts();
  });
  renderQueue();
})();
