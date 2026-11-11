/* Picture links never open the image on its own: a download link saves the
   file in place, and nothing sends a visitor to a bare image address. */
(function(){
  if(typeof document==='undefined'||typeof document.addEventListener!=='function')return;
  document.addEventListener('click',function(ev){
    var a=ev.target.closest&&ev.target.closest('a[href]');
    if(!a)return;
    var href=a.getAttribute('href')||'';
    if(!/\.(?:webp|jpe?g|png)(?:\?|$)/i.test(href))return;
    ev.preventDefault();
    if(!a.hasAttribute('download'))return;
    var name=a.getAttribute('download')||href.split('/').pop();
    fetch(href).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.blob();}).then(function(b){
      var l=document.createElement('a');l.href=URL.createObjectURL(b);l.download=name;
      document.body.appendChild(l);l.click();l.remove();
      setTimeout(function(){URL.revokeObjectURL(l.href);},4000);
    }).catch(function(){
      var l=document.createElement('a');l.href=href;l.download=name;document.body.appendChild(l);l.click();l.remove();
    });
  },true);
})();
