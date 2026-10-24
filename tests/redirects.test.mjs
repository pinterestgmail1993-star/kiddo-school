// Host-consolidation redirects in the Pages middleware: www.kiddo.school and the old
// kiddo-school.pages.dev host must 301 to https://kiddo.school (GET/HEAD only) so Google
// indexes exactly one host per page — the fix for the GSC 'Alternate page with proper
// canonical tag' report (141 www URLs). Bare domain and preview deploys pass through.
import test from 'node:test';
import assert from 'node:assert/strict';
import { onRequest } from '../functions/_middleware.js';

function ctx(url, method = 'GET') {
  return {
    request: new Request(url, { method }),
    next: () => Promise.resolve(new Response('static-asset')),
  };
}

test('www.kiddo.school 301s to kiddo.school preserving path and query', async () => {
  const res = await onRequest(ctx('https://www.kiddo.school/flashcards/doctor-visit/?x=1'));
  assert.equal(res.status, 301);
  assert.equal(res.headers.get('location'), 'https://kiddo.school/flashcards/doctor-visit/?x=1');
});

test('www root 301s to the bare root', async () => {
  const res = await onRequest(ctx('https://www.kiddo.school/'));
  assert.equal(res.status, 301);
  assert.equal(res.headers.get('location'), 'https://kiddo.school/');
});

test('old pages.dev host still 301s to the bare domain', async () => {
  const res = await onRequest(ctx('https://kiddo-school.pages.dev/rooms/'));
  assert.equal(res.status, 301);
  assert.equal(res.headers.get('location'), 'https://kiddo.school/rooms/');
});

test('www POST passes through so API/admin calls never break', async () => {
  const res = await onRequest(ctx('https://www.kiddo.school/api/community', 'POST'));
  assert.equal(res.status, 200);
  assert.equal(await res.text(), 'static-asset');
});

test('bare domain and preview deployments pass through untouched', async () => {
  const bare = await onRequest(ctx('https://kiddo.school/about/'));
  assert.equal(await bare.text(), 'static-asset');
  const preview = await onRequest(ctx('https://abc123.kiddo-school.pages.dev/about/'));
  assert.equal(await preview.text(), 'static-asset');
});
