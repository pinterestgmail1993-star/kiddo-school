// Flashcards community: REACTIONS, REVIEWS and COMMENTS — three separate
// things with three separate storages.
//   Reactions: one tap, no text, counted live (page_reactions).
//   Reviews:   star rating + optional text, moderated (page_reviews.rating).
//   Comments:  text only, moderated (page_comments).
// Progressive enhancement: every [hidden] block is revealed here; without JS
// the page still shows the honest no-JS notes. Approved content is rendered
// with textContent only — submitted HTML is never parsed or injected.
(function () {
  'use strict';
  var api = window.KiddoCommunity;
  if (!api) return;
  var root = document.querySelector('[data-fc-root]');
  if (!root) return;
  var path = root.getAttribute('data-page-path') || (window.location.pathname || '');

  // ---- 1. REACTIONS — one tap, no writing ---------------------------------
  var box = root.querySelector('[data-fc-reactions]');
  var reactedNote = root.querySelector('[data-fc-reacted]');
  var storeKey = 'kiddo-fc-reaction:' + path;
  function renderCounts(counts) {
    Array.prototype.forEach.call(root.querySelectorAll('[data-fc-count]'), function (el) {
      var v = el.getAttribute('data-fc-count');
      var n = counts && counts[v] || 0;
      if (n > 0) { el.textContent = n; el.hidden = false; } else { el.hidden = true; }
    });
  }
  function markPressed(value) {
    Array.prototype.forEach.call(root.querySelectorAll('[data-fc-reaction]'), function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-fc-reaction') === value));
    });
  }
  if (box) {
    box.hidden = false;
    fetch('/api/community/reactions?page_path=' + encodeURIComponent(path)).then(function (r) { return r.json(); }).then(function (d) {
      if (d && d.ok) renderCounts(d.counts);
    }).catch(function () {});
    var saved = null;
    try { saved = window.localStorage.getItem(storeKey); } catch (e) {}
    if (saved) { markPressed(saved); if (reactedNote) { reactedNote.textContent = 'You reacted to this page already — thank you!'; reactedNote.hidden = false; } }
    Array.prototype.forEach.call(box.querySelectorAll('[data-fc-reaction]'), function (btn) {
      btn.addEventListener('click', function () {
        var value = btn.getAttribute('data-fc-reaction');
        var already = false;
        try { already = !!window.localStorage.getItem(storeKey); } catch (e) {}
        if (already) {
          markPressed(value);
          if (reactedNote) { reactedNote.textContent = 'You reacted to this page already — thank you!'; reactedNote.hidden = false; }
          return;
        }
        api.postJson('/api/community/reaction', { page_path: path, reaction: value }).then(function (res) {
          if (res.ok && res.data && res.data.ok) {
            try { window.localStorage.setItem(storeKey, value); } catch (e) {}
            markPressed(value);
            if (res.data.counts) renderCounts(res.data.counts);
            if (reactedNote) { reactedNote.textContent = 'Counted — thanks! Reactions are anonymous and quick.'; reactedNote.hidden = false; }
          } else if (reactedNote) {
            reactedNote.textContent = api.errorText(res, 'That did not go through. Please try again in a moment.');
            reactedNote.hidden = false;
          }
        }).catch(function () {
          if (reactedNote) { reactedNote.textContent = 'That did not go through. Please try again in a moment.'; reactedNote.hidden = false; }
        });
      });
    });
  }

  // ---- 2. PARENT REVIEWS — star rating + optional text, moderated ----------
  var reviewForm = root.querySelector('[data-fc-review-form]');
  var reviewStatus = root.querySelector('[data-fc-review-status]');
  var reviewSend = root.querySelector('[data-fc-review-send]');
  var reviewList = root.querySelector('[data-fc-reviews]');
  var reviewListBox = root.querySelector('[data-fc-reviews-box]');
  var reviewEmpty = root.querySelector('[data-fc-reviews-empty]');
  var reviewTurnstile = null;
  var stars = root.querySelectorAll('[data-fc-star]');
  function chosenRating() {
    for (var i = 0; i < stars.length; i++) { if (stars[i].checked) return Number(stars[i].value); }
    return null;
  }
  function renderReview(item) {
    var li = document.createElement('li');
    li.className = 'cm-comment';
    var starsLine = document.createElement('p');
    starsLine.className = 'fc2-review-stars';
    var n = Math.max(1, Math.min(5, Number(item.rating) || 0));
    var shown = '';
    for (var i = 1; i <= 5; i++) shown += (i <= n ? '★' : '☆');
    starsLine.textContent = shown;
    starsLine.setAttribute('aria-label', n + ' out of 5 stars');
    var who = document.createElement('p');
    who.className = 'cm-who';
    who.textContent = (item.display_name ? item.display_name : 'A grown-up at Kiddo School');
    li.appendChild(starsLine);
    if (item.comment) {
      var text = document.createElement('p');
      text.className = 'cm-text';
      text.textContent = item.comment;
      li.appendChild(text);
    }
    li.appendChild(who);
    return li;
  }
  if (reviewList) {
    fetch('/api/community/reviews?page_path=' + encodeURIComponent(path)).then(function (r) { return r.json(); }).then(function (d) {
      if (!d || !d.ok) return;
      var rows = (d.reviews || []).filter(function (r) { return Number(r.rating) > 0 || r.comment; });
      if (!rows.length) return; // the honest "No parent reviews yet." stays visible
      reviewList.textContent = '';
      rows.forEach(function (item) { reviewList.appendChild(renderReview(item)); });
      reviewListBox.hidden = false;
      if (reviewEmpty) reviewEmpty.hidden = true;
    }).catch(function () {});
  }
  if (reviewForm) {
    reviewForm.hidden = false;
    api.ensureTurnstile(reviewForm).then(function (getter) { reviewTurnstile = getter; });
    reviewForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var rating = chosenRating();
      if (!rating) { reviewStatus.textContent = 'Please pick a star rating first.'; return; }
      var comment = root.querySelector('[data-fc-review-comment]');
      var name = root.querySelector('[data-fc-review-name]');
      var confirm = root.querySelector('[data-fc-review-confirm]');
      var text = comment && comment.value.trim();
      if (text && confirm && !confirm.checked) {
        reviewStatus.textContent = 'Please tick the box so your review can be read for the community.';
        confirm.focus();
        return;
      }
      reviewSend.disabled = true;
      reviewStatus.textContent = 'Sending…';
      api.postJson('/api/community/review', {
        page_path: path, reaction: 'star', rating: rating, comment: text || '',
        display_name: name ? name.value.trim() : '',
        confirm: !!(confirm && confirm.checked && text),
        turnstileToken: reviewTurnstile ? reviewTurnstile() : null
      }).then(function (res) {
        if (res.ok && res.data && res.data.ok) {
          reviewForm.hidden = true;
          reviewStatus.textContent = 'Thank you! Your review will appear after the school office reads it.';
        } else {
          reviewSend.disabled = false;
          reviewStatus.textContent = api.errorText(res, 'We couldn\u2019t send that. Please try again.');
        }
      }).catch(function () {
        reviewSend.disabled = false;
        reviewStatus.textContent = 'We couldn\u2019t send that. Please try again.';
      });
    });
  }

  // ---- 3. PARENT COMMENTS — text only, moderated ---------------------------
  var commentForm = root.querySelector('[data-fc-comment-form]');
  var commentStatus = root.querySelector('[data-fc-comment-status]');
  var commentSend = root.querySelector('[data-fc-comment-send]');
  var commentList = root.querySelector('[data-fc-comments]');
  var commentListBox = root.querySelector('[data-fc-comments-box]');
  var commentEmpty = root.querySelector('[data-fc-comments-empty]');
  var commentTurnstile = null;
  if (commentList) {
    fetch('/api/community/comments?page_path=' + encodeURIComponent(path)).then(function (r) { return r.json(); }).then(function (d) {
      if (!d || !d.ok || !d.comments || !d.comments.length) return; // honest empty state stays
      commentList.textContent = '';
      d.comments.forEach(function (item) {
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
        commentList.appendChild(li);
      });
      commentListBox.hidden = false;
      if (commentEmpty) commentEmpty.hidden = true;
    }).catch(function () {});
  }
  if (commentForm) {
    commentForm.hidden = false;
    api.ensureTurnstile(commentForm).then(function (getter) { commentTurnstile = getter; });
    commentForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var textEl = root.querySelector('[data-fc-comment-text]');
      var name = root.querySelector('[data-fc-comment-name]');
      var confirm = root.querySelector('[data-fc-comment-confirm]');
      var text = textEl && textEl.value.trim();
      if (!text) { commentStatus.textContent = 'Please write a short comment first.'; return; }
      if (confirm && !confirm.checked) {
        commentStatus.textContent = 'Please tick the box so your comment can be read for the community.';
        confirm.focus();
        return;
      }
      commentSend.disabled = true;
      commentStatus.textContent = 'Sending…';
      api.postJson('/api/community/comment', {
        page_path: path, comment: text, display_name: name ? name.value.trim() : '',
        confirm: !!(confirm && confirm.checked),
        turnstileToken: commentTurnstile ? commentTurnstile() : null
      }).then(function (res) {
        if (res.ok && res.data && res.data.ok) {
          commentForm.hidden = true;
          commentStatus.textContent = 'Thank you! Your comment will appear after the school office reads it.';
        } else {
          commentSend.disabled = false;
          commentStatus.textContent = api.errorText(res, 'We couldn\u2019t send that. Please try again.');
        }
      }).catch(function () {
        commentSend.disabled = false;
        commentStatus.textContent = 'We couldn\u2019t send that. Please try again.';
      });
    });
  }
  // ---- 4. SHARE — copy this page's address (the network share buttons are
  // plain links; this only powers the "Copy link" button) --------------------
  var copyBtn = root.querySelector('[data-fc-copy]');
  if (copyBtn) {
    var copyLabel = copyBtn.textContent;
    var resetTimer = null;
    function flashCopied() {
      copyBtn.textContent = 'Link copied \u2713';
      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(function () { copyBtn.textContent = copyLabel; }, 2200);
    }
    function legacyCopy(text) {
      var input = document.createElement('textarea');
      input.value = text;
      input.setAttribute('readonly', '');
      input.style.position = 'fixed';
      input.style.left = '-9999px';
      document.body.appendChild(input);
      input.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(input);
      copyBtn.textContent = ok ? 'Link copied \u2713' : 'Copy failed \u2014 long-press the address bar';
      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(function () { copyBtn.textContent = copyLabel; }, 2600);
    }
    copyBtn.addEventListener('click', function () {
      var href = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(href).then(flashCopied, function () { legacyCopy(href); });
      } else {
        legacyCopy(href);
      }
    });
  }
})();
