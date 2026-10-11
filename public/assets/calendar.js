// School Calendar enhancement: fills in the visitor's LOCAL dates and makes
// the week navigation work. Everything runs on the visitor's clock in their
// own timezone (local Date parts only — no UTC date-string parsing), so the
// calendar reads correctly wherever the family is. No storage, no network:
// the viewed week lives in memory and resets to the current week on reload.
// Without this script the page still shows the whole week with real links —
// it simply shows no dates.
(function(){
'use strict';
var root=document.querySelector('[data-sc-weeknav]');
if(!root||!document.querySelector('[data-sc-day]'))return;
var rows=[].slice.call(document.querySelectorAll('[data-sc-day]'));
var dates=[].slice.call(document.querySelectorAll('[data-sc-date]'));
var todayDate=document.querySelector('[data-sc-today-date]');
var todayPlan=document.querySelector('[data-sc-today-plan]');
var todayTheme=document.querySelector('[data-sc-today-theme]');
var todayLink=document.querySelector('[data-sc-today-link]');
var live=document.querySelector('[data-sc-live]');
var nearbyWrap=document.querySelector('[data-sc-nearby]');
var label=root.querySelector('[data-sc-weeklabel]');
var offset=0;
function startOfDay(d){return new Date(d.getFullYear(),d.getMonth(),d.getDate());}
function addDays(d,n){return new Date(d.getFullYear(),d.getMonth(),d.getDate()+n);}
function mondayOf(d){return addDays(startOfDay(d),-((d.getDay()+6)%7));}
var longDay=new Intl.DateTimeFormat('en-GB',{weekday:'long',day:'numeric',month:'long'});
var shortDay=new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short'});
var monthYear=new Intl.DateTimeFormat('en-GB',{month:'long',year:'numeric'});
function weekRange(monday){
 var sunday=addDays(monday,6);
 var sameMonth=monday.getMonth()===sunday.getMonth()&&monday.getFullYear()===sunday.getFullYear();
 if(sameMonth){
  var m=new Intl.DateTimeFormat('en-GB',{month:'long',year:'numeric'}).format(sunday);
  return new Intl.DateTimeFormat('en-GB',{day:'numeric'}).format(monday)+'\u2013'+new Intl.DateTimeFormat('en-GB',{day:'numeric'}).format(sunday)+' '+m;
 }
 return monthYear.format(monday)+' \u2013 '+monthYear.format(sunday);
}
function planForRow(row){
 var link=row.querySelector('.text-link');
 var theme=row.querySelector('.sc-theme');
 if(!link||!theme)return null;
 return {theme:theme.textContent.replace(/\s+/g,' ').trim(),
  label:link.firstChild?link.firstChild.textContent.replace(/\s+/g,' ').trim():link.textContent.trim(),
  href:link.getAttribute('href')};
}
function show(el){el.hidden=false;}
function render(){
 var now=new Date();
 var today=startOfDay(now);
 var viewMonday=addDays(mondayOf(today),offset*7);
 var current=(offset===0);
 var todayGetDay=today.getDay(); // Sunday = 0 … Saturday = 6 (matches data-sc-day)
 // Day grid dates + today highlight (highlight only on the real current week)
 rows.forEach(function(row){
  var i=+row.getAttribute('data-sc-day'); // 0=Sunday … 6=Saturday (matches getDay)
  var dateCell=row.querySelector('[data-sc-date]');
  var idx=(i+6)%7; // position in the Monday-first week
  if(dateCell){dateCell.textContent=shortDay.format(addDays(viewMonday,idx));show(dateCell);}
  row.classList.toggle('is-today',current&&i===todayGetDay);
 });
 // Week navigation label
 label.textContent=current?'This week':weekRange(viewMonday);
 // Today card: full local date
 if(todayDate){todayDate.textContent=longDay.format(today);show(todayDate);}
 // Yesterday / Today / Tomorrow chips
 if(nearbyWrap){
  [['yesterday',-1],['today',0],['tomorrow',1]].forEach(function(pair){
   var el=nearbyWrap.querySelector('[data-sc-near="'+pair[0]+'"]');
   if(el){el.textContent=shortDay.format(addDays(today,pair[1]));}
  });
  show(nearbyWrap);
 }
 // Today's plan mirrors the real row for today's weekday
 if(todayPlan&&todayTheme&&todayLink&&current){
  var todayRow=null;
  rows.forEach(function(row){if(+row.getAttribute('data-sc-day')===todayGetDay)todayRow=row;});
  var plan=planForRow(todayRow);
  if(plan){
   todayTheme.textContent=plan.theme;
   todayLink.setAttribute('href',plan.href);
   todayLink.textContent=plan.label;
   show(todayPlan);
   if(live)live.textContent='It is '+longDay.format(today)+'. Today\u2019s plan: '+plan.theme+' \u2014 '+plan.label+'.';
  }
 }else if(live){
  live.textContent='';
 }
}
root.querySelector('[data-sc-prev]').addEventListener('click',function(){offset-=1;render();});
root.querySelector('[data-sc-next]').addEventListener('click',function(){offset+=1;render();});
show(root);
render();
})();
