// Shared client helper for every community form (Principal's Office, Sticky
// Note Wall, Art Wall, page reviews). Loaded as /assets/community-api.js.
// Exposes window.KiddoCommunity with:
//   getApiConfig()        → { turnstileSiteKey } from the server (runtime truth)
//   ensureTurnstile(box)  → renders the human check when the server has one; resolves to a token getter
//   postJson(url, data)   → POST with the required same-origin header, parsed JSON response
//   postForm(url, form)   → multipart POST, parsed JSON response
//   errorText(res)        → honest, human error message from the server payload
(function () {
  'use strict';
  var configPromise = null;
  var turnstileState = null; // { siteKey, widgetId, box }

  function getApiConfig() {
    if (!configPromise) {
      configPromise = fetch('/api/community/config').then(function (r) { return r.json(); }).catch(function () { return { ok: false, turnstileSiteKey: null }; });
    }
    return configPromise;
  }

  function loadTurnstileScript() {
    return new Promise(function (resolve, reject) {
      if (window.turnstile) { resolve(); return; }
      var s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      s.async = true;
      s.onload = function () { resolve(); };
      s.onerror = function () { reject(new Error('turnstile failed')); };
      document.head.appendChild(s);
    });
  }

  // Renders the widget inside `box` when the server enables Turnstile.
  // Returns a function that returns the current token (or null).
  function ensureTurnstile(box) {
    if (!box) return function () { return null; };
    return getApiConfig().then(function (config) {
      if (!config || !config.turnstileSiteKey) return function () { return null; };
      if (turnstileState && turnstileState.box === box) {
        return function () { try { return window.turnstile.getResponse(turnstileState.widgetId) || null; } catch (e) { return null; } };
      }
      return loadTurnstileScript().then(function () {
        var holder = document.createElement('div');
        box.appendChild(holder);
        var widgetId = null;
        try {
          widgetId = window.turnstile.render(holder, { sitekey: config.turnstileSiteKey, theme: 'light' });
        } catch (e) { widgetId = null; }
        turnstileState = { siteKey: config.turnstileSiteKey, widgetId: widgetId, box: box };
        return function () {
          if (widgetId === null) return null;
          try { return window.turnstile.getResponse(widgetId) || null; } catch (e) { return null; }
        };
      }).catch(function () { return function () { return null; }; });
    });
  }

  function postJson(url, data) {
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Kiddo-Community': '1' },
      body: JSON.stringify(data)
    }).then(function (res) {
      return res.json().then(function (body) { return { status: res.status, ok: res.ok, data: body }; }).catch(function () { return { status: res.status, ok: false, data: {} }; });
    });
  }

  function postForm(url, formData) {
    return fetch(url, {
      method: 'POST',
      headers: { 'X-Kiddo-Community': '1' },
      body: formData
    }).then(function (res) {
      return res.json().then(function (body) { return { status: res.status, ok: res.ok, data: body }; }).catch(function () { return { status: res.status, ok: false, data: {} }; });
    });
  }

  function errorText(res, fallback) {
    return (res && res.data && res.data.error) ? res.data.error : (fallback || 'We couldn\u2019t send that. Please try again.');
  }

  window.KiddoCommunity = { getApiConfig: getApiConfig, ensureTurnstile: ensureTurnstile, postJson: postJson, postForm: postForm, errorText: errorText };
})();
