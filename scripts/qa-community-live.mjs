// Live production verification of the Kiddo School community backend.
// Run: node /home/z/my-project/scripts/qa-community-live.mjs
// Creates exactly 5 clearly-marked QA rows (1 per queue) + proves pending
// content stays private. All rows are labeled "QA Deploy Check" so the
// operator can delete them later from the admin queues or via SQL.

const BASE = 'https://kiddo-school.pages.dev';
const ORIGIN = 'https://kiddo-school.pages.dev';
const PAGE = '/toddler/2-years/shape-collage/';
const QA = 'QA Deploy Check';

let pass = 0, fail = 0;
function check(name, cond, detail = '') {
  if (cond) { pass++; console.log(`  PASS  ${name}${detail ? '  — ' + detail : ''}`); }
  else { fail++; console.log(`✗ FAIL  ${name}${detail ? '  — ' + detail : ''}`); }
}

function post(path, body, headers = {}) {
  return fetch(BASE + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': ORIGIN,
      'X-Kiddo-Community': '1',
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

// 1x1 valid PNG (magic bytes \x89PNG, valid IHDR + IDAT + IEND)
const TINY_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64'
);

console.log('=== 1. GET endpoints (post-migration) ===');
{
  const cfg = await (await fetch(BASE + '/api/community/config')).json();
  check('GET config → ok, no Turnstile', cfg.ok === true && cfg.turnstileSiteKey === null);

  for (const [name, url] of [
    ['notes', '/api/community/notes'],
    ['reviews (all)', '/api/community/reviews'],
    ['art (all)', '/api/community/art'],
    ['reviews (one page)', `/api/community/reviews?page_path=${encodeURIComponent(PAGE)}`],
    ['comments (one page)', `/api/community/comments?page_path=${encodeURIComponent(PAGE)}`],
  ]) {
    const r = await fetch(BASE + url);
    const b = await r.json();
    check(`GET ${name} → 200 ok`, r.status === 200 && b.ok === true && Array.isArray(Object.values(b)[1]), `status ${r.status}`);
  }
}

console.log('=== 2. CSRF / origin guards (no writes) ===');
{
  const noHeader = await fetch(BASE + '/api/community/sticky', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'Origin': ORIGIN },
    body: JSON.stringify({ message: 'x', confirm: true }),
  });
  check('POST without X-Kiddo-Community → 403', noHeader.status === 403, `status ${noHeader.status}`);

  const badOrigin = await fetch(BASE + '/api/community/sticky', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Origin': 'https://evil.example', 'X-Kiddo-Community': '1' },
    body: JSON.stringify({ message: 'x', confirm: true }),
  });
  check('POST with cross-site Origin → 403', badOrigin.status === 403, `status ${badOrigin.status}`);

  // A non-browser client that sends the custom header but NO Origin is
  // allowed through the CSRF guard by design (CSRF is a browser threat and
  // this API holds no ambient credentials). To verify the guard passed
  // WITHOUT writing anything, send a body that then fails validation → 400.
  const noOrigin = await fetch(BASE + '/api/community/sticky', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Kiddo-Community': '1' },
    body: JSON.stringify({ message: 'x' }), // no confirm → validation must reject
  });
  check('POST no Origin + valid header → guard passes, validation 400 (no write)', noOrigin.status === 400, `status ${noOrigin.status}`);
}

console.log('=== 3. Validation errors (no writes) ===');
{
  const long = await post('/api/community/sticky', { message: 'y'.repeat(121), confirm: true });
  check('sticky 121 chars → 413 tooLarge', long.status === 413, `status ${long.status}`);

  const noConfirm = await post('/api/community/sticky', { message: 'hello', confirm: false });
  check('sticky without confirm → 400', noConfirm.status === 400, `status ${noConfirm.status}`);

  const badReaction = await post('/api/community/review', { page_path: PAGE, reaction: 'meh', confirm: true });
  check('review reaction "meh" → 400', badReaction.status === 400, `status ${badReaction.status}`);

  const badPath = await post('/api/community/comment', { page_path: '/no/such/page', comment: 'hi', confirm: true });
  check('comment bad page_path → 400', badPath.status === 400, `status ${badPath.status}`);

  const longComment = await post('/api/community/comment', { page_path: PAGE, comment: 'z'.repeat(301), confirm: true });
  check('comment 301 chars → 413 tooLarge', longComment.status === 413, `status ${longComment.status}`);

  const badCat = await post('/api/community/principal', { category: 'other', message: 'hi' });
  check('principal invalid category → 400', badCat.status === 400, `status ${badCat.status}`);

  const emptyPrincipal = await post('/api/community/principal', { category: 'question', message: '   ' });
  check('principal empty message → 400', emptyPrincipal.status === 400, `status ${emptyPrincipal.status}`);

  // art: text file disguised as an image must be rejected by magic-byte sniffing
  const fakeForm = new FormData();
  fakeForm.append('image', new Blob([new TextEncoder().encode('this is definitely not an image, just long enough to sniff')], { type: 'image/png' }), 'fake.png');
  fakeForm.append('confirm', 'true');
  const fakeArt = await fetch(BASE + '/api/community/art', {
    method: 'POST', headers: { 'Origin': ORIGIN, 'X-Kiddo-Community': '1' }, body: fakeForm,
  });
  check('art text-disguised-as-image → 400/415', [400, 415].includes(fakeArt.status), `status ${fakeArt.status}`);

  const noConfirmArt = new FormData();
  noConfirmArt.append('image', new Blob([TINY_PNG], { type: 'image/png' }), 'tiny.png');
  const artNoConfirm = await fetch(BASE + '/api/community/art', {
    method: 'POST', headers: { 'Origin': ORIGIN, 'X-Kiddo-Community': '1' }, body: noConfirmArt,
  });
  check('art without confirm → 400', artNoConfirm.status === 400, `status ${artNoConfirm.status}`);
}

console.log('=== 4. Happy-path submissions (5 marked QA rows land pending/new) ===');
{
  const p = await post('/api/community/principal', {
    category: 'question',
    parent_name: QA,
    message: `Deployment verification message from the deploy checklist — safe to delete. (${new Date().toISOString()})`,
  });
  const pb = await p.json().catch(() => ({}));
  check('POST principal → 200 success copy', p.status === 200 && pb.ok === true && /sent to the Principal/.test(pb.message || ''), `status ${p.status} "${pb.message || ''}"`);

  const s = await post('/api/community/sticky', {
    display_name: QA,
    message: `Deploy verification note — safe to delete. (${new Date().toISOString()})`,
    confirm: true,
  });
  const sb = await s.json().catch(() => ({}));
  check('POST sticky → 200 pending copy', s.status === 200 && sb.ok === true && /after the school office/.test(sb.message || ''), `status ${s.status} "${sb.message || ''}"`);

  const r = await post('/api/community/review', {
    page_path: PAGE, reaction: 'like', display_name: QA,
    comment: `Deploy verification review — safe to delete. (${new Date().toISOString()})`,
    confirm: true,
  });
  const rb = await r.json().catch(() => ({}));
  check('POST review → 200 "Thanks for sharing your feedback!"', r.status === 200 && rb.ok === true && rb.message === 'Thanks for sharing your feedback!', `status ${r.status}`);

  const c = await post('/api/community/comment', {
    page_path: PAGE, display_name: QA,
    comment: `Deploy verification comment — safe to delete. (${new Date().toISOString()})`,
    confirm: true,
  });
  const cb = await c.json().catch(() => ({}));
  check('POST comment → 200 pending copy', c.status === 200 && cb.ok === true, `status ${c.status} "${cb.message || ''}"`);

  const form = new FormData();
  form.append('image', new Blob([TINY_PNG], { type: 'image/png' }), 'qa-deploy-check.png');
  form.append('display_name', QA);
  form.append('title', 'QA Deploy Check');
  form.append('confirm', 'true');
  const a = await fetch(BASE + '/api/community/art', {
    method: 'POST', headers: { 'Origin': ORIGIN, 'X-Kiddo-Community': '1' }, body: form,
  });
  const ab = await a.json().catch(() => ({}));
  check('POST art (real PNG) → 200 pending copy', a.status === 200 && ab.ok === true, `status ${a.status} "${ab.message || JSON.stringify(ab).slice(0, 120)}"`);
}

console.log('=== 5. Pending privacy: nothing submitted is publicly visible ===');
{
  const notes = await (await fetch(BASE + '/api/community/notes')).json();
  check('GET notes → still empty (sticky pending)', notes.ok && notes.notes.length === 0, `count ${notes.notes?.length}`);

  const rev = await (await fetch(BASE + '/api/community/reviews')).json();
  check('GET reviews → still empty (review pending)', rev.ok && rev.reviews.length === 0, `count ${rev.reviews?.length}`);

  const com = await (await fetch(BASE + `/api/community/comments?page_path=${encodeURIComponent(PAGE)}`)).json();
  check('GET comments → still empty (comment pending)', com.ok && com.comments.length === 0, `count ${com.comments?.length}`);

  const art = await (await fetch(BASE + '/api/community/art')).json();
  check('GET art → still empty (art pending)', art.ok && art.art.length === 0, `count ${art.art?.length}`);

  // The QA art row is the first art row ever inserted → id 1. Its image must 404.
  const img1 = await fetch(BASE + '/api/community/art/1/image');
  check('GET art/1/image → 404 (pending art bytes never served)', img1.status === 404, `status ${img1.status}`);
  const img999 = await fetch(BASE + '/api/community/art/999/image');
  check('GET art/999/image → 404 (unknown id)', img999.status === 404, `status ${img999.status}`);
}

console.log('=== 6. Admin stays fail-closed (no Access configured) ===');
{
  const shell = await fetch(BASE + '/admin/');
  check('/admin/ → 503', shell.status === 503, `status ${shell.status}`);
  const api = await fetch(BASE + '/api/admin/counts');
  const ab = await api.json().catch(() => ({}));
  check('/api/admin/counts → 503 locked', api.status === 503 && /locked/.test(ab.error || ''), `status ${api.status}`);
  const queue = await fetch(BASE + '/api/admin/notes?status=pending');
  check('/api/admin/notes → 503 (not 404/500)', queue.status === 503, `status ${queue.status}`);
}

console.log(`\n=== RESULT: ${pass} passed, ${fail} failed ===`);
process.exit(fail ? 1 : 0);
