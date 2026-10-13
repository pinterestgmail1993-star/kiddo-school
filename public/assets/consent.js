/* Kiddo.school cookie notice.
   - Essential storage only unless the visitor opts in to optional (advertising) cookies.
   - Choice is kept in this browser's localStorage under KEY.
   - Other scripts must check window.kiddoConsent.allowsAds() (or listen for the
     'kiddo:consent' event) BEFORE loading any advertising code. */
(function () {
  'use strict';
  var KEY = 'kiddo-consent-v1';
  var banner = null;
  var opener = null;

  function read() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY));
      if (v && typeof v.ads === 'boolean') return v;
    } catch (e) { /* storage blocked or corrupt: treat as undecided */ }
    return null;
  }

  function write(ads) {
    var v = { ads: ads, ts: Date.now() };
    try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* ignore */ }
    try { document.dispatchEvent(new CustomEvent('kiddo:consent', { detail: v })); } catch (e) { /* ignore */ }
    return v;
  }

  window.kiddoConsent = {
    decided: function () { return read() !== null; },
    allowsAds: function () { var v = read(); return !!(v && v.ads); }
  };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  function close() {
    if (banner && banner.parentNode) banner.parentNode.removeChild(banner);
    banner = null;
    if (opener && document.contains(opener)) opener.focus();
    opener = null;
  }

  function choose(ads) {
    write(ads);
    close();
  }

  function open(fromButton) {
    if (banner) return;
    opener = fromButton || null;
    var current = read();

    banner = el('div', 'consent-banner');
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookie notice');
    banner.id = 'consent-banner';

    var title = el('h2', 'consent-title', 'Cookies on Kiddo.school');
    var text = el('p', 'consent-text',
      'We use essential browser storage to remember your child\u2019s progress on this device. ' +
      'Optional cookies, such as those used for advertising, stay off unless you say yes. ' +
      'You can change your mind any time from \u201CCookie settings\u201D in the footer. ');
    var more = el('a', 'consent-more', 'Read our privacy page');
    more.href = '/privacy/';
    text.appendChild(more);
    text.appendChild(document.createTextNode('.'));

    var row = el('div', 'consent-actions');
    var essential = el('button', 'consent-btn consent-btn-quiet', 'Essential only');
    essential.type = 'button';
    essential.addEventListener('click', function () { choose(false); });
    var all = el('button', 'consent-btn', 'Accept optional cookies');
    all.type = 'button';
    all.addEventListener('click', function () { choose(true); });
    row.appendChild(essential);
    row.appendChild(all);

    banner.appendChild(title);
    banner.appendChild(text);
    banner.appendChild(row);
    document.body.appendChild(banner);

    // Only move focus when the visitor asked to reopen it; never steal focus on first load.
    if (fromButton) (current && current.ads ? all : essential).focus();

    banner.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && read()) close();
    });
  }

  function init() {
    document.addEventListener('click', function (ev) {
      var t = ev.target && ev.target.closest ? ev.target.closest('[data-consent-open]') : null;
      if (t) { ev.preventDefault(); open(t); }
    });
    if (!read()) open(null);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
