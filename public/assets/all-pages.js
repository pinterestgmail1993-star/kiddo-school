/* /all-pages/ live filter — vanilla JS, no dependencies.
   Filters link rows by text; hides groups/sections with no matches and
   auto-opens collapsible groups while searching. */
(()=>{
 const q=document.getElementById('ap-q');
 if(!q)return;
 const count=document.getElementById('ap-count');
 const total=count?+count.dataset.total:0;
 const items=[...document.querySelectorAll('.ap-links li')];
 const groups=[...document.querySelectorAll('.ap-group')];
 const secs=[...document.querySelectorAll('.ap-sec')];
 const norm=s=>s.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'');
 const plural=(n,w,p)=>num(n)+' '+(n===1?w:(p||w+'s'));
 const num=n=>n.toLocaleString('en-US');
 q.addEventListener('input',()=>{
  const v=norm(q.value.trim());
  let hits=0;
  for(const li of items){const show=!v||norm(li.textContent).includes(v);li.hidden=!show;if(show)hits++;}
  for(const g of groups){
   const any=[...g.querySelectorAll('li')].some(li=>!li.hidden);
   g.hidden=!any;
   if(v&&any)g.open=true;
   if(!v)g.open=g.dataset.open==='1';
  }
  for(const s of secs)s.hidden=![...s.querySelectorAll('.ap-group')].some(g=>!g.hidden);
  if(count)count.textContent=v?plural(hits,'match','matches'):plural(total,'page');
 });
})();
