/* Runs BEFORE the Google AdSense tag on every page (plain, non-deferred script).
   Kiddo.school is made for families with young children, so ads are ALWAYS
   non-personalised, whatever the visitor chose in the cookie notice. */
(function () {
  'use strict';
  window.adsbygoogle = window.adsbygoogle || [];
  window.adsbygoogle.requestNonPersonalizedAds = 1;
})();
