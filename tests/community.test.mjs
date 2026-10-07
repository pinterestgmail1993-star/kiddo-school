// Community backend tests: school-community page + nav wiring, the public
// API (validation, moderation states, XSS/SQLi/size safety), admin auth
// (fail-closed Cloudflare Access) and approve/reject flows.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {onRequest as publicApi} from '../functions/api/community/[[route]].js';
import {onRequest as adminApi} from '../functions/api/admin/[[route]].js';
import {requireAdmin,createSessionToken,verifySessionToken} from '../functions/lib/access.js';
import {hashPassword,verifyLoginPassword} from '../functions/lib/passwords.js';
import {cleanText,cleanEmail,escapeHtml} from '../functions/lib/security.js';
import {validateAndScrubImage,sniffImage} from '../functions/lib/images.js';

const site='https://kiddo-school.pages.dev';
const read=f=>readFileSync(f,'utf8');

/* ------------------------------------------------- Mock D1 (real behavior) */
function mockDb(){
 const tables={principal_messages:[],sticky_notes:[],art_submissions:[],page_reviews:[],page_comments:[],rate_limits:[]};
 let seq=1;
 function checkNoInjection(sql,params){
  for(const p of params||[]){
   // A bound value must never be part of the SQL *statement* itself. Word
   // boundaries keep identifier substrings from false-positiving (the bound
   // value 'approved' is fine even though the column approved_at exists) —
   // but any value actually interpolated into the statement still trips.
   if(typeof p==='string'&&p.length>3&&new RegExp('\\b'+p.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\b').test(sql)){
    throw new Error('value interpolated into SQL: '+p);
   }
  }
 }
 function rows(sql,params,table){
  if(/WHERE status = \?1 AND page_path = \?2|WHERE status = \?1 AND page_path=\?2/.test(sql)||sql.includes('page_path = ?2')){
   const wantPath=params[1];
   let out=table.filter(r=>r.status===params[0]&&r.page_path===wantPath);
   if(sql.includes('AND reaction IS NOT NULL'))out=out.filter(r=>r.reaction);
   if(sql.includes('comment IS NOT NULL'))out=out.filter(r=>r.comment!==null&&r.comment!==undefined);
   return out;
  }
  if(sql.includes('WHERE status = ?1')&&sql.includes('ORDER BY'))return table.filter(r=>r.status===params[0]);
  if(sql.includes('WHERE id = ?1 AND status = ?2'))return table.filter(r=>r.id===params[0]&&r.status===params[1]);
  if(sql.includes('WHERE id = ?1'))return table.filter(r=>r.id===params[0]);
  if(sql.includes('WHERE route = ?1 AND ip = ?2'))return table.filter(r=>r.route===params[0]&&r.ip===params[1]);
  return table;
 }
 return {
  _tables:tables,
  prepare(sql){
   const stmt={
    sql,
    _params:[],
    bind(...params){checkNoInjection(sql,params);stmt._params=params;return stmt;},
    async first(){
     const p=stmt._params;
     if(sql.trim()==='SELECT 1')return {1:1};
     if(sql.startsWith('SELECT COUNT(*)')){
      const table=tables[sql.match(/FROM (\w+)/)[1]];
      const where=sql.match(/status = '\w+'/)[0];
      return {n:table.filter(r=>r.status===where.match(/'(\w+)'/)[1]).length};
     }
     if(sql.includes('window_start')){
      const hits=rows(sql,p,tables.rate_limits);
      return hits[0]||null;
     }
     if(sql.includes('art_submissions')&&sql.includes('image_key')){
      return rows(sql,p,tables.art_submissions)[0]||null;
     }
     return null;
    },
    async all(){
     const table=tables[sql.match(/FROM (\w+)/)[1]];
     let out=rows(sql,stmt._params,table);
     if(/ORDER BY created_at DESC|ORDER BY approved_at DESC/.test(sql))out=[...out].sort((a,b)=>(b.created_at||'').localeCompare(a.created_at||''));
     const limit=stmt._params.find((v,i)=>/LIMIT \?\d+/.test(sql)&&i===stmt._params.length-1);
     if(typeof limit==='number')out=out.slice(0,limit);
     return {results:out};
    },
    async run(){
     const p=stmt._params;
     if(sql.startsWith('INSERT INTO rate_limits')){
      const existing=tables.rate_limits.find(r=>r.route===p[0]&&r.ip===p[1]);
      if(sql.includes('ON CONFLICT')&&existing){existing.window_start=p[2];existing.count=1;}
      else if(!existing)tables.rate_limits.push({route:p[0],ip:p[1],window_start:p[2],count:1});
      return {success:true,meta:{changes:1}};
     }
     if(sql.startsWith('DELETE FROM rate_limits')){
      const before=tables.rate_limits.length;
      tables.rate_limits=tables.rate_limits.filter(r=>r.window_start>=p[0]);
      return {success:true,meta:{changes:before-tables.rate_limits.length}};
     }
     if(sql.startsWith('UPDATE rate_limits')){
      const existing=tables.rate_limits.find(r=>r.route===p[0]&&r.ip===p[1]);
      if(existing)existing.count+=1;
      return {success:true,meta:{changes:existing?1:0}};
     }
     const table=sql.match(/INSERT INTO (\w+)/);
     if(table){
      const t=tables[table[1]];
      const colMatch=sql.match(/\(([^)]+)\) VALUES/)[1].split(',').map(s=>s.trim());
      const row={id:seq++};
      colMatch.forEach((col,i)=>{if(col!=='id')row[col]=p[i]!==undefined?p[i]:null;});
      t.push(row);
      return {success:true,meta:{changes:1}};
     }
     const upd=sql.match(/UPDATE (\w+) SET/);
     if(upd){
      const t=tables[upd[1]];
      // status is always the first bound param in our updates
      const newStatus=p[0];
      const id=p[p.length-1];
      const row=t.find(r=>r.id===id);
      if(!row)return {success:true,meta:{changes:0}};
      row.status=newStatus;
      row.updated_at=p[1];
      if(newStatus==='approved')row.approved_at=new Date().toISOString();
      return {success:true,meta:{changes:1}};
     }
     throw new Error('mock does not implement: '+sql.slice(0,60));
    }
   };
   return stmt;
  }
 };
}

function ctx(url,{env,method='GET',body,headers={}}={}){
 const request=new Request('https://kiddo.school'+url,{method,body,headers});
 return {request,env,params:{route:url.replace(/^\/api\/(community|admin)\/?/,'').split('?')[0].split('/').filter(Boolean)}};
}

const POST_HEADERS={'Content-Type':'application/json','X-Kiddo-Community':'1','Origin':'https://kiddo-school.pages.dev','CF-Connecting-IP':'1.2.3.4'};

/* --------------------------------------------------- School Community page */
test('school community page: real title, H1, intro, three real destinations, honest empty state',()=>{
 const html=read('dist/school-community/index.html');
 assert.ok(html.includes('<title>Our School Community | Kiddo.school</title>'));
 assert.ok(html.includes('<h1>Our School Community</h1>'));
 assert.ok(html.includes('See what families are making, learning and sharing at Kiddo School.'));
 assert.ok(html.includes('href="/art-wall/"')&&html.includes('href="/sticky-note-wall/"')&&html.includes('#family-reviews'));
 assert.ok(html.includes('No family reviews yet.'),'truthful empty state until real reviews are approved');
 assert.ok(!html.includes('href="/admin"'),'no admin links on the public site');
 assert.doesNotMatch(html,/testimonial|fake quote/i);
 assert.match(html,/"@type":"BreadcrumbList"/);
 assert.match(read('dist/sitemap.xml'),/<loc>https:\/\/kiddo-school\.pages\.dev\/school-community\/<\/loc>/);
});

test('homepage gains one clean community section; primary nav stays six items; Parents dropdown and footer link School Community',()=>{
 const home=read('dist/index.html');
 assert.ok(home.includes('See what our little learners are making and what families are saying.'));
 assert.ok(home.includes('href="/school-community/"')&&home.includes('href="/art-wall/"')&&home.includes('href="/sticky-note-wall/"'));
 assert.ok(!home.includes('Admin'),'homepage never links the admin');
 for(const file of ['dist/index.html','dist/my-classroom/index.html']){
  const html=read(file);
  const nav=html.match(/<nav aria-label="Main navigation">[\s\S]*?<\/nav>/)[0];
  // Count only top-level anchors: the Parents dropdown is one nav ITEM (an
  // accessible button that reveals its menu); its links are secondary and are
  // asserted separately below.
  const topNav=nav.replace(/<div class="nav-parents"[\s\S]*?<\/div><\/div>/,'');
  const primary=(topNav.match(/<a\s/g)||[]).length;
  assert.ok(primary===6,'primary nav keeps 6 links (5 anchors + search): '+file);
  assert.ok(!topNav.includes('/school-community/'),'School Community stays out of the primary bar');
  assert.ok(nav.includes('School Community'),'Parents dropdown carries School Community');
  assert.ok(nav.includes('Principal’s Office'),'PO stays under Parents');
 }
 const footer=read('dist/my-classroom/index.html').match(/<footer>[\s\S]*?<\/footer>/)[0];
 assert.ok(footer.includes('href="/school-community/"'),'footer links School Community');
});

test('review mounts land on activity pages only — never on home, privacy, PO, bag, forms or hubs-of-hubs',()=>{
 const withMount=read('dist/toddler/2-years/garden-bugs-and-friends/index.html').includes('data-cm-root')
  &&read('dist/toddler/2-years/emotions-and-feelings/index.html').includes('data-cm-root')
  &&read('dist/toddler/2-years/circle-time/hello-school/index.html').includes('data-cm-root')
  &&read('dist/toddler/2-years/play-and-practice/index.html').includes('data-cm-root')
  &&read('dist/toddler/2-years/my-work/index.html').includes('data-cm-root')
  &&read('dist/toddler/2-years/lets-explore/index.html').includes('data-cm-root');
 assert.ok(withMount,'mounts on lessons, circle time, play, my work, explore');
 for(const f of ['dist/index.html','dist/privacy/index.html','dist/principals-office/index.html','dist/my-school-bag/index.html','dist/sticky-note-wall/index.html','dist/art-wall/index.html','dist/learning-path/index.html','dist/learning-library/index.html']){
  assert.ok(!read(f).includes('data-cm-root'),'no review mount on '+f);
 }
 assert.ok(read('dist/school-community/index.html').includes('src="/assets/community.js"'),'community page loads the community script');
});

test('community-api.js loads BEFORE every consumer script (defer execution order)',()=>{
 // rooms.js / principal-office.js / art-wall.js / community.js capture
 // window.KiddoCommunity when they run; as defer scripts they execute in
 // document order, so the shared helper must come first on every page that
 // uses it — otherwise forms would falsely report "JavaScript needed".
 const pages=['dist/sticky-note-wall/index.html','dist/principals-office/index.html','dist/art-wall/index.html','dist/school-community/index.html','dist/toddler/2-years/garden-bugs-and-friends/index.html'];
 for(const file of pages){
  const html=read(file);
  const apiPos=html.indexOf('/assets/community-api.js');
  assert.ok(apiPos>-1,'community-api.js present on '+file);
  for(const consumer of ['/assets/rooms.js','/assets/principal-office.js','/assets/art-wall.js','/assets/community.js']){
   const pos=html.indexOf(consumer);
   if(pos>-1)assert.ok(apiPos<pos,consumer+' must load after community-api.js on '+file);
  }
  assert.equal(html.split('/assets/community-api.js').length-1,1,'community-api.js injected exactly once on '+file);
 }
});

test('review UI payload carries the parent-confirmation flag the server requires',()=>{
 // The API rejects any review that has a comment but no confirm field
 // (defense in depth). The client-side handler checks the box before sending
 // — and must therefore SEND that state. A regression here made every
 // review with a comment answer 400 from the real UI while all API-level
 // tests (which pass confirm explicitly) stayed green.
 const src=read('public/assets/community.js');
 const payloadLine=src.split('\n').find(l=>l.includes("api.postJson('/api/community/review'"));
 const payloadSrc=src.split('\n').filter(l=>l.includes('var payload =')).join('\n');
 assert.ok(payloadSrc.includes('confirm:'), 'review payload must include the confirm flag');
 assert.ok(payloadSrc.includes("confirmBox && confirmBox.checked"), 'confirm flag must come from the actual checkbox state');
 assert.ok(payloadLine, 'review POST call present');
});

/* ------------------------------------------------ Public API: submissions */
test('routers live where real Pages routing expects them: /api/community/* → bare route names, /api/admin/* → resources',()=>{
 // Real Cloudflare Pages routing hands a router file params.route = the path
 // segments BELOW its own directory. The public router compares BARE names
 // ('config','notes','principal','sticky','review','comment','art'), so it
 // must sit at functions/api/community/[[route]].js for /api/community/config
 // to arrive as route=['config']. The admin router does the same for its
 // resources at functions/api/admin/[[route]].js. A previous regression
 // shipped the public router one level too shallow (functions/api/[[route]].js),
 // where /api/community/config arrives as route='community/config' and every
 // endpoint 404'd in production — the test mock stripped the 'community/'
 // prefix, masking it. This layout check exists so that cannot ship again.
 assert.ok(existsSync('functions/api/community/[[route]].js'),'public router must live at functions/api/community/[[route]].js');
 assert.ok(existsSync('functions/api/admin/[[route]].js'),'admin router must live at functions/api/admin/[[route]].js');
 assert.ok(!existsSync('functions/api/[[route]].js'),'a catch-all at functions/api/[[route]].js would receive /api/community/* as prefixed routes and 404 everything');
 // And the mock used by every API test below must mirror real routing:
 // strip exactly the /api/<area>/ prefix, keep the remaining segments.
 const url='/api/community/art/7/image';
 const segs=url.replace(/^\/api\/(community|admin)\/?/,'').split('?')[0].split('/').filter(Boolean);
 assert.deepEqual(segs,['art','7','image'],'mock ctx() route parsing must match real Pages segment semantics');
});

test('origin and CSRF guards reject cross-site or header-less POSTs',async()=>{
 const db=mockDb();
 const env={DB:db};
 const noHeader=await publicApi(ctx('/api/community/sticky',{env,method:'POST',body:'{}',headers:{'Content-Type':'application/json','Origin':'https://kiddo-school.pages.dev'}}));
 assert.equal(noHeader.status,403);
 const evilOrigin=await publicApi(ctx('/api/community/sticky',{env,method:'POST',body:'{}',headers:{'Content-Type':'application/json','X-Kiddo-Community':'1','Origin':'https://evil.example'}}));
 assert.equal(evilOrigin.status,403);
});

test('principal submission is stored privately with status new and honest success',async()=>{
 const db=mockDb();
 const res=await publicApi(ctx('/api/community/principal',{env:{DB:db},method:'POST',body:JSON.stringify({category:'complaint',message:'The print button hides on my phone.',parent_name:'Sam',email:'sam@example.com'}),headers:POST_HEADERS}));
 const data=await res.json();
 assert.equal(res.status,200);assert.ok(data.ok);
 assert.equal(data.message,'Thanks. Your message has been sent to the Principal’s Office.');
 const row=db._tables.principal_messages[0];
 assert.equal(row.status,'new');assert.equal(row.category,'complaint');assert.equal(row.email,'sam@example.com');
 assert.equal(db._tables.sticky_notes.length,0,'principal messages never touch public content');
});

test('sticky submission lands pending; GET notes returns approved only',async()=>{
 const db=mockDb();
 const env={DB:db};
 const res=await publicApi(ctx('/api/community/sticky',{env,method:'POST',body:JSON.stringify({display_name:'Ash',message:'We loved the bug class!',confirm:true}),headers:POST_HEADERS}));
 assert.equal(res.status,200);
 assert.equal(db._tables.sticky_notes[0].status,'pending','stored pending, never auto-published');
 // pending is NOT public
 let notes=await publicApi(ctx('/api/community/notes',{env}));
 let data=await notes.json();
 assert.equal(data.notes.length,0,'pending notes are not public');
 // after admin approval it IS public
 const auth=await adminAuth();
 db._tables.sticky_notes[0].id=1;
 const approved=await adminApi(ctx('/api/admin/notes/1',{env:auth.env(db),method:'POST',body:JSON.stringify({action:'approve'}),headers:auth.headers()}));
 assert.equal(approved.status,200);
 notes=await publicApi(ctx('/api/community/notes',{env}));
 data=await notes.json();
 assert.equal(data.notes.length,1);assert.equal(data.notes[0].message,'We loved the bug class!');
 // rejected notes are never public
 const res2=await publicApi(ctx('/api/community/sticky',{env:{DB:db},method:'POST',body:JSON.stringify({message:'Buy followers at spam.example',confirm:true}),headers:POST_HEADERS}));
 assert.equal(res2.status,200);
 db._tables.sticky_notes[1].id=2;
 await adminApi(ctx('/api/admin/notes/2',{env:auth.env(db),method:'POST',body:JSON.stringify({action:'reject'}),headers:auth.headers()}));
 data=await (await publicApi(ctx('/api/community/notes',{env:{DB:db}}))).json();
 assert.equal(data.notes.length,1,'rejected note stays private');
});

test('review: pending moderation, correct page_path, approved public, rejected not public',async()=>{
 const db=mockDb();
 const env={DB:db};
 const res=await publicApi(ctx('/api/community/review',{env,method:'POST',body:JSON.stringify({page_path:'/toddler/2-years/garden-bugs-and-friends/',reaction:'love',comment:'The snail was a hit.',display_name:'Kim',confirm:true}),headers:POST_HEADERS}));
 assert.equal(res.status,200);
 const stored=db._tables.page_reviews[0];
 assert.equal(stored.status,'pending');
 assert.equal(stored.page_path,'/toddler/2-years/garden-bugs-and-friends/','page_path matches the canonical mount');
 assert.equal(stored.reaction,'love');
 const auth=await adminAuth();
 // page-scoped GET: nothing until approved
 let data=await (await publicApi(ctx('/api/community/reviews?page_path=/toddler/2-years/garden-bugs-and-friends/',{env}))).json();
 assert.equal(data.reviews.length,0);
 stored.id=1;
 await adminApi(ctx('/api/admin/reviews/1',{env:auth.env(db),method:'POST',body:JSON.stringify({action:'approve'}),headers:auth.headers()}));
 data=await (await publicApi(ctx('/api/community/reviews?page_path=/toddler/2-years/garden-bugs-and-friends/',{env:{DB:db}}))).json();
 assert.equal(data.reviews.length,1);assert.equal(data.reviews[0].reaction,'love');
 // rejected review on another page stays hidden
 await publicApi(ctx('/api/community/review',{env:{DB:db},method:'POST',body:JSON.stringify({page_path:'/toddler/2-years/colors-and-shapes/',reaction:'okay',comment:'Not for us.',confirm:true}),headers:POST_HEADERS}));
 db._tables.page_reviews[1].id=2;
 await adminApi(ctx('/api/admin/reviews/2',{env:auth.env(db),method:'POST',body:JSON.stringify({action:'reject'}),headers:auth.headers()}));
 data=await (await publicApi(ctx('/api/community/reviews?page_path=/toddler/2-years/colors-and-shapes/',{env:{DB:db}}))).json();
 assert.equal(data.reviews.length,0,'rejected reviews are never public');
});

test('comment: 300-char cap, confirmation required, approval needed before display',async()=>{
 const db=mockDb();
 const env={DB:db};
 const long='x'.repeat(301);
 const tooBig=await publicApi(ctx('/api/community/comment',{env,method:'POST',body:JSON.stringify({page_path:'/toddler/2-years/my-work/',comment:long,confirm:true}),headers:POST_HEADERS}));
 assert.equal(tooBig.status,413,'oversized input rejected');
 const noConfirm=await publicApi(ctx('/api/community/comment',{env,method:'POST',body:JSON.stringify({page_path:'/toddler/2-years/my-work/',comment:'Nice!'}),headers:POST_HEADERS}));
 assert.equal(noConfirm.status,400,'confirmation required');
 const ok=await publicApi(ctx('/api/community/comment',{env,method:'POST',body:JSON.stringify({page_path:'/toddler/2-years/my-work/',comment:'Nice!',display_name:'P.',confirm:true}),headers:POST_HEADERS}));
 assert.equal(ok.status,200);
 assert.equal(db._tables.page_comments[0].status,'pending');
 const auth=await adminAuth();
 db._tables.page_comments[0].id=1;
 await adminApi(ctx('/api/admin/comments/1',{env:auth.env(db),method:'POST',body:JSON.stringify({action:'approve'}),headers:auth.headers()}));
 const data=await (await publicApi(ctx('/api/community/comments?page_path=/toddler/2-years/my-work/',{env:{DB:db}}))).json();
 assert.equal(data.comments.length,1);assert.equal(data.comments[0].display_name,'P.');
});

test('every submission validates page_path — junk paths are rejected',async()=>{
 const db=mockDb();
 for(const bad of ['javascript:alert(1)','http://evil.example/','/UPPER/','/no-trailing-slash']){
  const res=await publicApi(ctx('/api/community/comment',{env:{DB:db},method:'POST',body:JSON.stringify({page_path:bad,comment:'hi',confirm:true}),headers:POST_HEADERS}));
  assert.equal(res.status,400,bad);
 }
 assert.equal(db._tables.page_comments.length,0);
});

test('oversized and malformed bodies are rejected with clear status codes',async()=>{
 const db=mockDb();
 const huge=await publicApi(ctx('/api/community/principal',{env:{DB:db},method:'POST',body:JSON.stringify({category:'question',message:'x'.repeat(4001)}),headers:POST_HEADERS}));
 assert.equal(huge.status,413);
 const badJson=await publicApi(ctx('/api/community/sticky',{env:{DB:db},method:'POST',body:'not-json{',headers:POST_HEADERS}));
 assert.equal(badJson.status,400);
 const badReaction=await publicApi(ctx('/api/community/review',{env:{DB:db},method:'POST',body:JSON.stringify({page_path:'/toddler/2-years/my-work/',reaction:'amazing'}),headers:POST_HEADERS}));
 assert.equal(badReaction.status,400,'only the four exact reactions are allowed');
 const badCategory=await publicApi(ctx('/api/community/principal',{env:{DB:db},method:'POST',body:JSON.stringify({category:'shout',message:'hi'}),headers:POST_HEADERS}));
 assert.equal(badCategory.status,400);
});

test('XSS safety: control characters stripped, HTML escaped server-side, rendering is text-only',()=>{
 // Stored values keep plain text; rendering escapes or uses textContent
 assert.equal(escapeHtml('<script>alert(1)</script>'),'&lt;script&gt;alert(1)&lt;/script&gt;');
 assert.equal(escapeHtml('"><img src=x>'),'&quot;&gt;&lt;img src=x&gt;');
 const cleaned=cleanText('  hi \u0007 there \u001b[31m red  ',80);
 assert.equal(cleaned,'hi there [31m red');
 const c=cleanText('a\nb',50,{multiline:true});
 assert.ok(!c.includes('\r'));
 // community.js renders with textContent only — never innerHTML with user data
 const js=read('dist/assets/community.js');
 assert.ok(!js.includes('innerHTML'),'comments and reviews use textContent');
 assert.match(js,/textContent/);
 const adminJs=read('dist/assets/admin.js');
 assert.ok(!adminJs.includes('innerHTML'),'admin renders with createElement/textContent');
});

test('SQL injection safety: hostile payloads stay bound parameters and nothing breaks',async()=>{
 const db=mockDb();
 const evil="'); DROP TABLE page_reviews;--";
 const res=await publicApi(ctx('/api/community/review',{env:{DB:db},method:'POST',body:JSON.stringify({page_path:'/toddler/2-years/my-work/',reaction:'like',comment:evil,confirm:true}),headers:POST_HEADERS}));
 assert.equal(res.status,200);
 assert.equal(db._tables.page_reviews[0].comment,evil);
 assert.equal(db._tables.page_reviews.length,1,'statement count unchanged — nothing was executed');
 // the mock throws if any value is interpolated into SQL text, so reaching here proves binding
 const stored=await publicApi(ctx('/api/community/review',{env:{DB:db},method:'POST',body:JSON.stringify({page_path:"/x/';--",reaction:'like'}),headers:POST_HEADERS}));
 assert.equal(stored.status,400,'hostile page_path rejected');
});

/* ------------------------------------------------------------ Admin auth */
test('admin is fail-closed: without admin secrets every admin route answers 503',async()=>{
 const db=mockDb();
 const env={DB:db}; // no ADMIN_USERNAME / ADMIN_PASSWORD_HASH
 const counts=await adminApi(ctx('/api/admin/counts',{env}));
 assert.equal(counts.status,503);
 const adminPage=await import('../functions/admin/[[route]].js');
 const res=await adminPage.onRequest({request:new Request('https://kiddo.school/admin/'),env,params:{route:[]}});
 assert.equal(res.status,503);
 const html=await res.text();
 assert.match(html,/locked/i);
 assert.ok(!html.includes('name="password"'),'no working login form until configured');
 const list=await adminApi(ctx('/api/admin/notes',{env}));
 assert.equal(list.status,503);
});

test('admin login: session tokens are signed, expiring and tamper-proof',async()=>{
 const hash=await hashPassword('correct horse battery staple 42',10_000);
 const env={ADMIN_USERNAME:'office@kiddo.test',ADMIN_PASSWORD_HASH:hash};
 // wrong password / wrong username rejected — and both take the same work
 const t0=Date.now();
 assert.equal(await verifyLoginPassword(hash,'office@kiddo.test','office@kiddo.test','wrong password input'),false,'wrong password rejected');
 assert.equal(await verifyLoginPassword(hash,'nobody@kiddo.test','office@kiddo.test','correct horse battery staple 42'),false,'wrong username rejected');
 assert.ok(Date.now()-t0>0,'PBKDF2 ran regardless of which half failed');
 assert.equal(await verifyLoginPassword(hash,'OFFICE@kiddo.test','office@kiddo.test','correct horse battery staple 42'),true,'username case-insensitive, correct password accepted');
 // session lifecycle
 const {token,maxAge}=await createSessionToken(env);
 assert.ok(maxAge>0,'session has a TTL');
 assert.equal((await verifySessionToken(env,token)).ok,true,'valid token verifies');
 const tampered=token.slice(0,-3)+(token.slice(-3)==='aaa'?'bbb':'aaa');
 assert.equal((await verifySessionToken(env,tampered)).ok,false,'tampered signature rejected');
 assert.equal((await verifySessionToken(env,token.replace(/v1\.(\d+)/,(m,e)=>'v1.'+(Number(e)-100000)))).ok,false,'expired token rejected');
 assert.equal((await verifySessionToken(env,token.replace('v1.','v2.'))).ok,false,'wrong version rejected');
 const other={ADMIN_USERNAME:'office@kiddo.test',ADMIN_PASSWORD_HASH:await hashPassword('a different passphrase entirely',10_000)};
 assert.equal((await verifySessionToken(other,token)).ok,false,'token signed under another secret is rejected');
 // requireAdmin on the API without a cookie
 const denied=await requireAdmin(new Request('https://kiddo.school/api/admin/counts',{headers:{'Cookie':'other=1'}}),env);
 assert.equal(denied.status,401,'no session cookie → 401');
 const ok=await requireAdmin(new Request('https://kiddo.school/api/admin/counts',{headers:{'Cookie':'kiddo_admin_session='+token}}),env);
 assert.equal(ok,null,'valid session cookie authenticates');
});

test('login flow through /admin/: CSRF, cookie flags, generic errors, logout',async()=>{
 const db=mockDb();
 const hash=await hashPassword('correct horse battery staple 42',10_000);
 const env={DB:db,ADMIN_USERNAME:'office@kiddo.test',ADMIN_PASSWORD_HASH:hash};
 const shell=await import('../functions/admin/[[route]].js');
 // 1. GET /admin/ → login page with a CSRF cookie
 const get=await shell.onRequest({request:new Request('https://kiddo.school/admin/'),env,params:{route:[]}});
 assert.equal(get.status,200);
 const html=await get.text();
 const csrf=html.match(/name="csrf" value="([^"]+)"/)?.[1];
 assert.ok(csrf,'login form carries a CSRF token');
 const setCookie=get.headers.get('Set-Cookie')||'';
 assert.ok(setCookie.includes('kiddo_admin_csrf='+csrf),'CSRF cookie matches the hidden field');
 assert.ok(/HttpOnly/.test(setCookie)&&/Secure/.test(setCookie)&&/SameSite=Strict/.test(setCookie),'CSRF cookie is HttpOnly, Secure, SameSite=Strict');
 const post=(body,headers={})=>shell.onRequest({request:new Request('https://kiddo.school/admin/',{method:'POST',body,headers:{'Content-Type':'application/x-www-form-urlencoded','Origin':'https://kiddo-school.pages.dev','CF-Connecting-IP':'8.8.4.4',...headers}}),env,params:{route:[]}});
 // 2. missing CSRF → 403
 const noCsrf=await post('username=office%40kiddo.test&password=correct%20horse%20battery%20staple%2042');
 assert.equal(noCsrf.status,403,'login without the CSRF pair is rejected');
 // 3. wrong password → 401, generic message, no credential echo
 const wrong=await post(`csrf=${encodeURIComponent(csrf)}&username=office%40kiddo.test&password=wrong-password-here`,{'Cookie':'kiddo_admin_csrf='+csrf});
 assert.equal(wrong.status,401);
 const wrongHtml=await wrong.text();
 assert.match(wrongHtml,/Wrong email or password\./);
 assert.ok(!wrongHtml.includes('correct horse'),'the stored password never appears in any response');
 assert.ok(!JSON.stringify(env).includes('correct horse'),'the plaintext password never enters the environment');
 // 4. correct login → 303 with the session cookie (HttpOnly, Secure, SameSite=Strict)
 const good=await post(`csrf=${encodeURIComponent(csrf)}&username=office%40kiddo.test&password=correct%20horse%20battery%20staple%2042`,{'Cookie':'kiddo_admin_csrf='+csrf});
 assert.equal(good.status,303,'successful login redirects to the dashboard');
 const sessionCookie=(good.headers.getSetCookie? good.headers.getSetCookie():[good.headers.get('Set-Cookie')]).find(c=>c.startsWith('kiddo_admin_session='));
 assert.ok(sessionCookie,'session cookie is set');
 assert.ok(/HttpOnly/.test(sessionCookie)&&/Secure/.test(sessionCookie)&&/SameSite=Strict/.test(sessionCookie),'session cookie is HttpOnly, Secure, SameSite=Strict');
 assert.ok(/Max-Age=\d+/.test(sessionCookie),'session cookie expires');
 const token=sessionCookie.split('=')[1].split(';')[0];
 // 5. the session opens the dashboard, not the login page
 const dash=await shell.onRequest({request:new Request('https://kiddo.school/admin/',{headers:{'Cookie':'kiddo_admin_session='+token}}),env,params:{route:[]}});
 assert.equal(dash.status,200);
 const dashHtml=await dash.text();
 assert.ok(dashHtml.includes('data-goto="principal"'),'dashboard renders the queue cards');
 assert.ok(!dashHtml.includes('name="password"'),'dashboard has no login form');
 // 6. logout clears the cookie
 const out=await shell.onRequest({request:new Request('https://kiddo.school/admin/logout',{method:'POST',headers:{'Cookie':'kiddo_admin_session='+token,'Origin':'https://kiddo-school.pages.dev'}}),env,params:{route:['logout']}});
 assert.equal(out.status,303);
 const cleared=(out.headers.getSetCookie? out.headers.getSetCookie():[out.headers.get('Set-Cookie')]).find(c=>c.startsWith('kiddo_admin_session='));
 assert.ok(/Max-Age=0/.test(cleared),'logout expires the session cookie');
 const after=await shell.onRequest({request:new Request('https://kiddo.school/admin/'),env,params:{route:[]}});
 assert.equal(after.status,200,'after logout a cookieless /admin/ shows the login page again');
 assert.ok(!(await after.text()).includes('data-goto'),'no dashboard content without the cookie');
 // NOTE: sessions are stateless (no D1 session table — the schema is fixed),
 // so logout clears the cookie client-side and the 12-hour expiry bounds any
 // copied token. That is the documented contract, not an omission.
 // 7. login rate limiting: 5 bad attempts then 429 (fresh IP per attempt beyond the first)
 let last;
 for(let i=0;i<6;i++){
  last=await post(`csrf=${encodeURIComponent(csrf)}&username=office%40kiddo.test&password=wrong-${i}`,{'Cookie':'kiddo_admin_csrf='+csrf,'CF-Connecting-IP':'7.7.7.7'});
 }
 assert.equal(last.status,429,'6th attempt inside the window is rate limited');
 const limitedHtml=await last.text();
 assert.match(limitedHtml,/Too many attempts/);
 assert.ok(!limitedHtml.includes('Wrong email'),'rate-limit page does not leak attempt results');
});

/* Shared session-protected admin for the moderation-flow tests. The real
   production code paths run: hashPassword() builds the ADMIN_PASSWORD_HASH
   value, createSessionToken() signs a cookie token, and the request carries
   it as a Cookie header exactly as the browser would — plus the same-origin
   + custom-header CSRF values the admin API requires on state changes. */
let adminAuthPromise=null;
function adminAuth(){
 adminAuthPromise??=(async()=>{
  const hash=await hashPassword('correct horse battery staple 42',10_000);
  const base={ADMIN_USERNAME:'office@kiddo.test',ADMIN_PASSWORD_HASH:hash};
  const token=(await createSessionToken(base)).token;
  return {
   env:(db,extra={})=>({DB:db,...base,...extra}),
   headers:()=>({'Cookie':'kiddo_admin_session='+token,'X-Kiddo-Community':'1','Origin':'https://kiddo-school.pages.dev'}),
  };
 })();
 return adminAuthPromise;
}

test('admin queues serve real D1 counts and the email column is admin-only',async()=>{
 const db=mockDb();
 const env={DB:db,ADMIN_USERNAME:'office@kiddo.test',ADMIN_PASSWORD_HASH:'pbkdf2-sha256$10000$c2FsdA$kQ'};
 db._tables.principal_messages.push({id:1,category:'question',parent_name:'A',email:'a@x.com',message:'hi',status:'new',created_at:'2026-01-01',updated_at:'2026-01-01'});
 db._tables.sticky_notes.push({id:2,display_name:'B',message:'note',status:'pending',created_at:'2026-01-02',updated_at:'2026-01-02'});
 // fail-closed still blocks unauthenticated reads of that data
 const blocked=await adminApi(ctx('/api/admin/counts',{env}));
 assert.equal(blocked.status,401);
 // The public API never exposes principal messages at all
 for(const route of ['/api/community/notes','/api/community/reviews','/api/community/comments','/api/community/art']){
  const res=await publicApi(ctx(route,{env:{DB:db}}));
  const body=await res.json();
  const str=JSON.stringify(body);
  assert.ok(!str.includes('a@x.com'),'no principal data in '+route);
 }
 // Admin list SQL selects email ONLY from the protected admin module source
 const src=read('functions/api/admin/[[route]].js');
 assert.ok(src.includes('parent_name, email, message'),'admin reads email');
 const pub=read('functions/api/community/[[route]].js');
 assert.ok(!pub.includes('SELECT id, category, parent_name, email'),'public API never reads email');
});

/* --------------------------------------------------------- Art pipeline */
test('art submission: invalid files rejected, valid files scrubbed and stored pending, only approved served',async()=>{
 const db=mockDb();
 const objects=new Map();
 const env={DB:db,ART_UPLOADS:{put:async(k,v)=>objects.set(k,v),get:async k=>objects.get(k)}};
 // 1. a text file disguised as an image is rejected
 const form1=new FormData();
 form1.append('image',new File([new TextEncoder().encode('hello world, definitely not an image')],'art.webp',{type:'image/webp'}));
 form1.append('confirm','true');
 const bad=await publicApi(ctx('/api/community/art',{env,method:'POST',body:form1,headers:{'X-Kiddo-Community':'1','Origin':'https://kiddo-school.pages.dev','CF-Connecting-IP':'9.9.9.9'}}));
 assert.equal(bad.status,415,'magic-byte sniffing rejects non-images');
 // 2. a real WebP with an EXIF chunk gets its metadata stripped and lands pending
 const base=read('dist/assets/favicon.svg')?'':'';
 const webp=makeWebpWithExif();
 const form2=new FormData();
 form2.append('image',new File([webp],'drawing.webp',{type:'image/webp'}));
 form2.append('display_name','Row');
 form2.append('title','My dino');
 form2.append('confirm','true');
 const good=await publicApi(ctx('/api/community/art',{env,method:'POST',body:form2,headers:{'X-Kiddo-Community':'1','Origin':'https://kiddo-school.pages.dev','CF-Connecting-IP':'9.9.9.9'}}));
 assert.equal(good.status,200,await good.text());
 const row=db._tables.art_submissions[0];
 assert.equal(row.status,'pending');
 assert.ok(row.image_key.startsWith('pending/'),'stored in the private pending area');
 const stored=[...objects.keys()][0];
 assert.ok(stored.startsWith('pending/'));
 assert.ok(!sniffImage(objects.get(stored)).includes('exif'));
 const storedStr=Array.from(objects.get(stored)).map(c=>String.fromCharCode(c)).join('');
 assert.ok(!storedStr.includes('EXIF'),'EXIF chunk was stripped server-side');
 // 3. pending art is NOT publicly served
 const pending=await publicApi(ctx('/api/community/art/1/image',{env}));
 assert.equal(pending.status,404,'pending artwork is never public');
 // 4. after approval the public endpoint serves it; after reject it disappears
 row.id=1;
 const auth=await adminAuth();
 await adminApi(ctx('/api/admin/art/1',{env:auth.env(db,{ART_UPLOADS:env.ART_UPLOADS}),method:'POST',body:JSON.stringify({action:'approve'}),headers:auth.headers()}));
 const pub=await publicApi(ctx('/api/community/art/1/image',{env}));
 assert.equal(pub.status,200);
 assert.equal(pub.headers.get('Content-Type'),'image/webp');
 await adminApi(ctx('/api/admin/art/1',{env:auth.env(db,{ART_UPLOADS:env.ART_UPLOADS}),method:'POST',body:JSON.stringify({action:'reject'}),headers:auth.headers()}));
 const pub2=await publicApi(ctx('/api/community/art/1/image',{env}));
 assert.equal(pub2.status,404,'rejected artwork disappears from the public wall');
});
function makeWebpWithExif(){
 // RIFF/WEBP with VP8L payload (4x4) + an EXIF chunk to strip
 const enc=new TextEncoder();
 const vp8lData=new Uint8Array([0x2f,0x03,0xC0,0x00,0x00]); // signature + 4x4 dims bits
 const exifData=enc.encode('Exif\0\0MM\x00*\x00\x00\x00\x08\x00GPSDATA');
 const buf=[];
 const push=s=>buf.push(...enc.encode(s));
 const pushBytes=a=>buf.push(...a);
 const totalSize=4+8+vp8lData.length+(vp8lData.length%2)+8+exifData.length+(exifData.length%2);
 push('RIFF');pushBytes(u32(totalSize));push('WEBP');
 push('VP8L');pushBytes(u32(vp8lData.length));pushBytes(vp8lData);if(vp8lData.length%2)buf.push(0);
 push('EXIF');pushBytes(u32(exifData.length));pushBytes(exifData);if(exifData.length%2)buf.push(0);
 return new Uint8Array(buf);
}
const u32=n=>[n&255,(n>>8)&255,(n>>16)&255,(n>>24)&255];

test('not-ready backend answers honestly: no fake success before the migration runs',async()=>{
 const env={DB:{prepare(){throw new Error('no such table');}}};
 const res=await publicApi(ctx('/api/community/sticky',{env,method:'POST',body:JSON.stringify({message:'x',confirm:true}),headers:POST_HEADERS}));
 assert.equal(res.status,503);
 const body=await res.json();
 assert.equal(body.ok,false);
 assert.match(body.error,/isn’t connected|records room/);
 const db2={prepare(){return {bind(){return this;},first:async()=>null,all:async()=>({results:[]}),run:async()=>{throw new Error('no such table');}};}};
 const res2=await publicApi(ctx('/api/community/sticky',{env:{DB:db2},method:'POST',body:JSON.stringify({message:'x',confirm:true}),headers:POST_HEADERS}));
 assert.equal(res2.status,503,'insert failure is an honest 503, never fake success');
});
