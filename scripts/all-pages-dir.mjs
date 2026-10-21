/* ---- /all-pages/ — the complete Kiddo.school directory ----
   Every indexable page in one organised, searchable place, built from the
   whole-school search registry (searchPages) so titles can never drift from
   the pages themselves. Section/group classification is exhaustive: an
   unclassified path throws, so structural changes fail the build loudly. */

const e=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');

/* Short, scannable label from a full page title: keep the part before the
   em-dash separator (the house title style), cap the length for the grid. */
const short=t=>{
  let s=String(t||'').split(' — ')[0].split(' – ')[0].split(' | ')[0].trim();
  if(s.length>64)s=s.slice(0,61).replace(/\s+\S*$/,'')+'…';
  return s;
};
const PRETTY_MINOR=new Set(['and','or','the','for','with','at','by','to','of','a','an','in','on','my']);
const prettify=slug=>slug.split('-').map((w,i)=>(i>0&&PRETTY_MINOR.has(w))?w:w.charAt(0).toUpperCase()+w.slice(1)).join(' ');
const num=n=>n.toLocaleString('en-US');

/* Hand labels for the few wayfinding pages where the real title is a mood,
   not a label. Everything else uses its own page title. */
const LABELS=new Map([
  ['/','School home'],
  ['/learning-path/','The Learning Path'],
  ['/my-classroom/','My Classroom'],
  ['/rooms/','School Rooms'],
  ['/search/','Search the whole school'],
  ['/subjects/','Explore by subject'],
  ['/ages/','Explore by age'],
  ['/activities/','All hands-on activities'],
  ['/extra-classes/','Extra Classes — the hall'],
  ['/nature-club/','Nature Club'],
  ['/flashcards/','All flashcard sets'],
  ['/worksheets/','All worksheets'],
  ['/coloring-pages/','All coloring pages'],
  ['/learning-library/','The Learning Library'],
  ['/art-wall/','Our Art Wall'],
]);

/* Group-name overrides for age-stage hubs whose own titles say "Baby classes"
   while the directory section is the room they live in (Newborn/Baby/Toddler). */
const GROUP_LABELS=new Map([
  ['/newborn/0-6-weeks/','Newborn · 0–6 weeks'],
  ['/newborn/6-12-weeks/','Newborn · 6–12 weeks'],
  ['/baby/3-4-months/','Baby · 3–4 months'],
  ['/baby/4-6-months/','Baby · 4–6 months'],
  ['/baby/6-9-months/','Baby · 6–9 months'],
  ['/baby/9-12-months/','Baby · 9–12 months'],
  ['/toddler/12-18-months/','Toddler · 12–18 months'],
  ['/toddler/18-24-months/','Toddler · 18–24 months'],
]);

/* Section definitions: id, title, blurb, dot colour (CSS var), and a matcher
   that turns a path into a group key inside this section (or null = not mine).
   First matching section wins, so order below matters. */
const SECTIONS=[
 {id:'start',title:'Start here',dot:'var(--yellow)',
  blurb:'The front doors of the school — the guided path, the classroom and ways to browse.',
  match:p=>p==='/'||p==='/learning-path/'||p==='/my-classroom/'||p==='/rooms/'||p==='/search/'?{key:'doors',name:'The way in'}
   :p==='/subjects/'||p.startsWith('/subjects/')||p==='/ages/'||p.startsWith('/ages/')||p==='/activities/'||p.startsWith('/activities/')?{key:'browse',name:'Browse by age & subject'}:null},
 {id:'newborn',title:'The Newborn room',dot:'var(--kiddo-lavender)',
  blurb:'Gentle high-contrast cards and first-theatre classes for the earliest weeks.',
  match:p=>p==='/newborn/'?{key:'hub',name:'Newborn (all)'}
   :p.startsWith('/newborn/')?{key:p.split('/')[2],name:null,hub:'/newborn/'+p.split('/')[2]+'/'}:null},
 {id:'baby',title:'The Baby room',dot:'var(--kiddo-peach)',
  blurb:'First words, first games and first stories, month by month.',
  match:p=>p==='/baby/'?{key:'hub',name:'Baby (all)'}
   :p.startsWith('/baby/')?{key:p.split('/')[2],name:null,hub:'/baby/'+p.split('/')[2]+'/'}:null},
 {id:'toddler',title:'The Toddler room · Ages 1–2',dot:'var(--rose)',
  blurb:'Playful classes for one- and two-year-olds: first words, matching, sorting, sounds, feelings and the school garden.',
  match:p=>{
   if(p==='/toddler/')return{key:'hub',name:'Toddler (all)'};
   if(p.startsWith('/toddler/')){
    const seg=p.split('/').filter(Boolean);
    if(seg.length<3)return{key:'st-'+seg[1],name:null,hub:'/toddler/'+seg[1]+'/'};
    return{key:seg[1]+'-'+seg[2],name:null,hub:'/toddler/'+seg[1]+'/'+seg[2]+'/'};
   }
   return null;
  }},
 {id:'preschool',title:'The Preschool · Ages 3–4',dot:'var(--sage)',
  blurb:'The big school: alphabet, phonics, numbers, science and life skills across Age 3 and Age 4.',
  match:p=>{
   if(p==='/preschool/')return{key:'hub',name:'Preschool (all)'};
   const seg=p.split('/').filter(Boolean);
   if(seg[0]!=='preschool')return null;
   if(seg[1]==='3-years'||seg[1]==='4-years'){
    const age=seg[1]==='3-years'?'Age 3':'Age 4';
    if(['magic-animal-playground','magic-color-mixing','magic-shape-builder'].includes(seg[2]))return{key:seg[1]+'-magic',name:age+' · Magic games'};
    return{key:seg[1]+'-'+seg[2],name:age+' · ',hub:'/preschool/'+seg[1]+'/'+seg[2]+'/'};
   }
   return{key:'sk-'+seg[1],name:'Skills · ',hub:'/preschool/'+seg[1]+'/'};
  }},
 {id:'extra',title:'Extra classes & clubs',dot:'var(--kiddo-cream-yellow)',
  blurb:'One-off adventures and clubs beyond the main path — animals, community, games, music, cooking and play.',
  match:p=>{
   if(p==='/extra-classes/')return{key:'hub',name:'Extra Classes (all)'};
   if(p.startsWith('/extra-classes/'))return{key:'ec-'+p.split('/')[2],name:null,hub:'/extra-classes/'+p.split('/')[2]+'/'};
   if(p==='/nature-club/')return{key:'nc-hub',name:'Nature Club (all)'};
   if(p.startsWith('/nature-club/'))return{key:'nc-'+p.split('/')[2],name:null,hub:'/nature-club/'+p.split('/')[2]+'/'};
   const room=p.split('/')[1];
   if(['/music-room/','/kitchen/','/playground/','/toddler-room/','/who-works-at-my-school/'].includes('/'+room+'/'))
    return{key:'rm-'+room,name:null,hub:'/'+room+'/'};
   return null;
  }},
 {id:'flashcards',title:'The Flashcards library',dot:'var(--kiddo-peach)',
  blurb:'Every printable flashcard set — open a set to see each card page.',
  match:p=>p==='/flashcards/'?{key:'hub',name:'All flashcard sets'}
   :p.startsWith('/flashcards/')?{key:'fc-'+p.split('/')[2],name:null,hub:'/flashcards/'+p.split('/')[2]+'/'}:null},
 {id:'worksheets',title:'The Worksheet library',dot:'var(--sage)',
  blurb:'Print-and-go worksheets in twelve categories, from phonics to weather.',
  match:p=>p==='/worksheets/'?{key:'hub',name:'All worksheets'}
   :p.startsWith('/worksheets/')?{key:'ws-'+p.split('/')[2],name:null,hub:'/worksheets/'+p.split('/')[2]+'/'}:null},
 {id:'coloring',title:'Coloring pages',dot:'var(--yellow)',
  blurb:'Big, friendly shapes to print and colour.',
  match:p=>p==='/coloring-pages/'?{key:'hub',name:'All coloring pages'}
   :p.startsWith('/coloring-pages/')?{key:'cp-'+p.split('/')[2],name:null,hub:'/coloring-pages/'+p.split('/')[2]+'/'}:null},
 {id:'subjects',title:'Subjects & activities',dot:'var(--rose)',
  blurb:'Hands-on projects by subject, drawing lessons and the worksheet generators.',
  match:p=>{
   const m=p.match(/^\/(art|nature|science|maths|literacy|engineering)\//);
   if(m)return{key:'sub-'+m[1],name:null,hub:'/'+m[1]+'/'};
   if(p.startsWith('/how-to-draw-'))return{key:'draw',name:'Drawing lessons'};
   if(p.startsWith('/worksheet-generator'))return{key:'wsgen',name:'Worksheet generator'};
   return null;
  }},
 {id:'library',title:'The Library & books',dot:'var(--kiddo-lavender)',
  blurb:'Picture books to read together and the whole learning library.',
  match:p=>p.startsWith('/library/')||p==='/learning-library/'?{key:'books',name:'Picture books'}:null},
 {id:'parents',title:'For parents',dot:'var(--kiddo-cream-yellow)',
  blurb:'Guides, the school community and the small print — everything grown-ups need.',
  match:p=>['/grown-ups/','/about/','/school-community/','/principals-office/','/sticky-note-wall/','/school-calendar/','/art-wall/','/contact/','/privacy/','/disclaimer/','/terms/'].includes(p)?{key:'parents',name:'Grown-ups’ pages'}:null},
];

export function allPagesSection(searchPages){
 const byPath=new Map(searchPages.map(p=>[p.u,p]));
 const nameFor=(g,slugFallback)=>{
  if(GROUP_LABELS.has(g.hub))return GROUP_LABELS.get(g.hub);
  if(g.name&&!g.hub)return g.name;
  const hit=g.hub&&byPath.get(g.hub);
  const base=hit?short(hit.t):prettify(slugFallback||'');
  return g.name&&g.name.endsWith(' · ')?g.name+base:(g.name||base);
 };
 /* classify every page */
 const secs=new Map(SECTIONS.map(s=>[s.id,{...s,groups:new Map()}]));
 const leftovers=[];
 for(const p of searchPages){
  let placed=false;
  for(const s of SECTIONS){
   const g=s.match(p.u);
   if(g){
    const key=g.key;
    if(!secs.get(s.id).groups.has(key))secs.get(s.id).groups.set(key,{name:nameFor(g,key.replace(/^[a-z]{2,3}-/,'')),paths:[]});
    secs.get(s.id).groups.get(key).paths.push(p);
    placed=true;break;
   }
  }
  if(!placed)leftovers.push(p.u);
 }
 if(leftovers.length)throw new Error('all-pages: unclassified paths ('+leftovers.length+'): '+leftovers.slice(0,20).join(' '));

 /* the /search/ page is noindex so it is not in the registry — add it by hand */
 const doors=secs.get('start').groups.get('doors');
 if(!doors.paths.some(x=>x.u==='/search/'))doors.paths.push({u:'/search/',t:'Search the whole school'});

 let grand=0;
 const chips=[],bodies=[];
 for(const s of secs.values()){
  const count=[...s.groups.values()].reduce((n,g)=>n+g.paths.length,0);
  if(!count)continue;
  grand+=count;
  chips.push(`<a href="#ap-${s.id}">${e(s.title)}<b>${num(count)}</b></a>`);
  const groups=[...s.groups.values()].map(g=>{
   g.paths.sort((a,b)=>a.u.localeCompare(b.u));
   const open=g.paths.length<=10;
   const lis=g.paths.map(p=>`<li><a href="${e(p.u)}" title="${e(p.t)}">${e(LABELS.get(p.u)||short(p.t))}</a></li>`).join('');
   return `<details class="ap-group"${open?' open':''} data-open="${open?1:0}"><summary><span class="ap-gname">${e(g.name)}</span><span class="ap-gcount">${num(g.paths.length)}</span></summary><ul class="ap-links">${lis}</ul></details>`;
  }).join('');
  bodies.push(`<section class="ap-sec wrap" id="ap-${s.id}" aria-labelledby="ap-${s.id}-h"><header class="ap-sec-head"><span class="ap-dot" style="background:${s.dot}"></span><div><h2 id="ap-${s.id}-h">${e(s.title)}</h2><p>${e(s.blurb)}</p></div><span class="ap-badge">${num(count)}</span></header><div class="ap-groups">${groups}</div></section>`);
 }
 const total=grand; /* listed links: the whole registry + /search/ — the directory itself is the place */
 return `<section class="ap-hero wrap"><span class="eyebrow">THE COMPLETE DIRECTORY</span><h1>Every page in one place<span class="title-dot">.</span></h1><p class="ap-sub">All ${num(total)} pages of Kiddo.school — every class, flashcard, worksheet, activity and parents’ guide — organised below. Tap a section, open a class or set, or search to jump straight to a page.</p><div class="ap-search"><label for="ap-q">Search all pages</label><input id="ap-q" type="search" placeholder="Search pages — try “animals”, “writing”, “shapes”…" autocomplete="off"><span class="ap-count" id="ap-count" data-total="${total}">${num(total)} pages</span></div><nav class="ap-chips" aria-label="Directory sections">${chips.join('')}</nav></section>${bodies.join('')}`;
}
