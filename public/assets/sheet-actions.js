/* Print / Download / Share buttons under a picture sheet (First Glance).
   The image never opens in a new tab: print uses a hidden frame, download
   saves the file, share uses the phone/desktop share sheet or copies a link. */
(function () {
  'use strict';
  function say(box, msg) {
    var n = box.querySelector('[data-sheet-msg]');
    if (!n) return;
    n.textContent = msg;
    clearTimeout(n._t);
    n._t = setTimeout(function () { n.textContent = ''; }, 3500);
  }
  function printSheet(url, title) {
    var f = document.createElement('iframe');
    f.setAttribute('aria-hidden', 'true');
    f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0';
    f.srcdoc = '<!doctype html><html><head><title>' + title.replace(/[<&]/g, '') + '</title><style>@page{margin:10mm}html,body{margin:0}img{display:block;max-width:100%;max-height:277mm;margin:0 auto}</style></head><body><img src="' + url + '"></body></html>';
    f.onload = function () {
      var img = f.contentDocument.querySelector('img');
      var go = function () {
        try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) {}
        setTimeout(function () { f.remove(); }, 60000);
      };
      if (img.complete) go(); else { img.onload = go; img.onerror = function () { f.remove(); }; }
    };
    document.body.appendChild(f);
  }
  function fetchBlob(url) {
    return fetch(url).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.blob(); });
  }
  function download(box, url, name) {
    fetchBlob(url).then(function (blob) {
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = name;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
      say(box, 'Saved — look in your downloads.');
    }).catch(function () {
      var a = document.createElement('a');
      a.href = url; a.download = name;
      document.body.appendChild(a); a.click(); a.remove();
    });
  }
  function copy(box, link) {
    var done = function () { say(box, 'Link copied.'); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(link).then(done, function () { say(box, link); });
    } else { say(box, link); }
  }
  function share(box, url, name, title, link) {
    var data = { title: title + ' — Kiddo.school', text: title + ' picture sheet from Kiddo.school', url: link };
    if (!navigator.share) return copy(box, link);
    fetchBlob(url).then(function (blob) {
      var file = new File([blob], name, { type: blob.type || 'image/webp' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) return navigator.share({ files: [file], title: data.title, text: data.text });
      return navigator.share(data);
    }).catch(function (e) {
      if (e && e.name === 'AbortError') return;
      navigator.share(data).catch(function (e2) { if (!e2 || e2.name !== 'AbortError') copy(box, link); });
    });
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('[data-sheet-act]');
    if (!b) return;
    var box = b.closest('[data-sheet-url]');
    if (!box) return;
    var url = box.getAttribute('data-sheet-url');
    var name = box.getAttribute('data-sheet-file');
    var title = box.getAttribute('data-sheet-title');
    var link = location.origin + location.pathname + '#' + box.getAttribute('data-sheet-id');
    var act = b.getAttribute('data-sheet-act');
    if (act === 'print') printSheet(url, title);
    else if (act === 'download') download(box, url, name);
    else if (act === 'share') share(box, url, name, title, link);
  });
})();
