// Family feedback: the four-reaction review box, the page's approved
// comments, and the Family Reviews section on /school-community/.
// Progressive enhancement: every [hidden] control is revealed by this file;
// without JavaScript the page simply offers the no-JS note instead.
// Approved content is rendered with textContent only — submitted HTML is
// never parsed or injected.
(function () {
  'use strict';
  var api = window.KiddoCommunity;
  if (!api) return;

  var REACTIONS = { love: 'Loved it', like: 'Liked it', okay: 'It was okay', not_for_us: 'Not for us' };

  // ---- 1. The review box on class/activity pages --------------------------
  var root = document.querySelector('[data-cm-root]');
  if (root) {
    var path = root.getAttribute('data-page-path') || (window.location.pathname || '');
    var reactionsBox = root.querySelector('[data-cm-reactions]');
    var form = root.querySelector('[data-cm-form]');
    var chosen = root.querySelector('[data-cm-chosen]');
    var commentField = root.querySelector('[data-cm-comment]');
    var nameField = root.querySelector('[data-cm-name]');
    var confirmBox = root.querySelector('[data-cm-confirm]');
    var status = root.querySelector('[data-cm-status]');
    var send = root.querySelector('[data-cm-send]');
    var turnstileGetter = null;
    var reaction = null;
    var sent = false;

    if (reactionsBox && form) {
      reactionsBox.hidden = false;
      Array.prototype.forEach.call(reactionsBox.querySelectorAll('[data-cm-reaction]'), function (btn) {
        btn.addEventListener('click', function () {
          reaction = btn.getAttribute('data-cm-reaction');
          Array.prototype.forEach.call(reactionsBox.querySelectorAll('[data-cm-reaction]'), function (other) {
            var selected = other === btn;
            other.setAttribute('aria-pressed', String(selected));
          });
          chosen.textContent = 'You picked: ' + (REACTIONS[reaction] || reaction) + '.';
          form.hidden = false;
        });
      });

      api.ensureTurnstile(form).then(function (getter) { turnstileGetter = getter; });

      form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (sent) return;
        if (!reaction) {
          status.textContent = 'Please pick one of the four reactions first.';
          reactionsBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        }
        var comment = commentField && commentField.value.trim();
        if (comment && confirmBox && !confirmBox.checked) {
          status.textContent = 'Please tick the box so your comment can be reviewed for the community.';
          confirmBox.focus();
          return;
        }
        var payload = { page_path: path, reaction: reaction, comment: comment || '', display_name: nameField ? nameField.value.trim() : '', confirm: !!(confirmBox && confirmBox.checked), turnstileToken: turnstileGetter ? turnstileGetter() : null };
        send.disabled = true;
        status.textContent = 'Sending…';
        api.postJson('/api/community/review', payload).then(function (res) {
          if (res.ok && res.data && res.data.ok) {
            sent = true;
            form.hidden = true;
            reactionsBox.hidden = true;
            chosen.textContent = '';
            status.textContent = 'Thanks for sharing your feedback!';
          } else {
            send.disabled = false;
            status.textContent = api.errorText(res, 'We couldn\u2019t send that. Please try again.');
          }
        }).catch(function () {
          send.disabled = false;
          status.textContent = 'We couldn\u2019t send that. Please try again.';
        });
      });
    }

    // ---- 2. Approved comments for this page ------------------------------
    var commentsSection = root.querySelector('[data-cm-comments]');
    var commentsList = root.querySelector('[data-cm-list]');
    if (commentsSection && commentsList) {
      fetch('/api/community/comments?page_path=' + encodeURIComponent(path)).then(function (r) { return r.json(); }).then(function (data) {
        if (!data || !data.ok || !data.comments || !data.comments.length) return; // stays hidden when empty
        commentsList.textContent = '';
        data.comments.forEach(function (item) {
          var li = document.createElement('li');
          li.className = 'cm-comment';
          var who = document.createElement('p');
          who.className = 'cm-who';
          who.textContent = (item.display_name ? item.display_name : 'A grown-up at Kiddo School');
          var text = document.createElement('p');
          text.className = 'cm-text';
          text.textContent = item.comment;
          li.appendChild(who);
          li.appendChild(text);
          commentsList.appendChild(li);
        });
        commentsSection.hidden = false;
      }).catch(function () {});
    }
  }

  // ---- 3. Family Reviews on /school-community/ ----------------------------
  var familyRoot = document.querySelector('[data-cm-family]');
  if (familyRoot) {
    var empty = familyRoot.querySelector('[data-cm-family-empty]');
    var list = familyRoot.querySelector('[data-cm-family-list]');
    fetch('/api/community/reviews?limit=12').then(function (r) { return r.json(); }).then(function (data) {
      if (!data || !data.ok) return;
      var reviews = (data.reviews || []).filter(function (r) { return r.comment; });
      if (!reviews.length || !list) return; // truthful "No family reviews yet." stays
      list.textContent = '';
      reviews.forEach(function (item) {
        var li = document.createElement('li');
        li.className = 'cm-comment';
        var who = document.createElement('p');
        who.className = 'cm-who';
        who.textContent = (item.display_name ? item.display_name : 'A grown-up at Kiddo School') + ' \u00B7 ' + (item.page_path || '');
        var text = document.createElement('p');
        text.className = 'cm-text';
        text.textContent = item.comment;
        li.appendChild(who);
        li.appendChild(text);
        list.appendChild(li);
      });
      list.hidden = false;
      if (empty) empty.hidden = true;
    }).catch(function () {});
  }
})();
