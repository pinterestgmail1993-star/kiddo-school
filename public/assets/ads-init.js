/* Runs BEFORE the Google AdSense tag on every page (plain, non-deferred script).
   Asks Google for non-personalised ads unless the visitor accepted optional
   cookies in the cookie notice (same localStorage key as consent.js). */
(function () {
  'use strict';
  var personalised = false;
  try {
    var v = JSON.parse(localStorage.getItem('kiddo-consent-v1'));
    personalised = !!(v && v.ads === true);
  } catch (e) { /* storage blocked: stay non-personalised */ }
  window.adsbygoogle = window.adsbygoogle || [];
  window.adsbygoogle.requestNonPersonalizedAds = personalised ? 0 : 1;
})();
