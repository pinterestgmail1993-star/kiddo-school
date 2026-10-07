// Kiddo School public community API (Pages Function).
// Routes (all under /api/community/*):
//   GET  config                  → public runtime config (Turnstile site key only)
//   POST principal               → Principal's Office message  → status 'new'
//   POST sticky                  → Sticky Note Wall submission → status 'pending'
//   POST review                  → page review (4 reactions)   → status 'pending'
//   POST comment                 → page comment                → status 'pending'
//   POST art                     → artwork upload (multipart)  → status 'pending' (private R2)
//   GET  notes                   → APPROVED sticky notes only
//   GET  reviews?page_path=…     → APPROVED reviews (optionally for one page)
//   GET  comments?page_path=…    → APPROVED comments for one page
//   GET  art                     → APPROVED artwork list
//   GET  art/:id/image           → image bytes for APPROVED artwork only
//
// Security: server-side validation of everything, D1 prepared statements
// only, same-origin + custom-header CSRF guard on POSTs, per-IP rate limits,
// strict size limits, magic-byte image validation with EXIF/XMP stripping,
// honest errors (no fake success, no stack traces, no SQL leakage). Pending
// and rejected content is never exposed by any endpoint here.

import {
  json, badRequest, tooLarge, unsupported, unavailable, serverError, methodGuard, originGuard,
  readJson, cleanText, cleanEmail, honeypot, rateLimit, turnstileGuard, LIMITS,
} from '../lib/security.js';
import { validateAndScrubImage } from '../lib/images.js';

const PATH_RE = /^\/[a-z0-9-]+(\/[a-z0-9-]+)*\/$/;
const REACTIONS = ['love', 'like', 'okay', 'not_for_us'];
const PRINCIPAL_CATEGORIES = ['question', 'request', 'feedback', 'suggestion', 'complaint', 'technical_problem'];

function nowIso() { return new Date().toISOString(); }

function pagePathOk(value) {
  return typeof value === 'string' && value.length <= 200 && PATH_RE.test(value);
}

async function dbReady(env) {
  if (!env.DB) return false;
  try {
    await env.DB.prepare('SELECT 1').first();
    return true;
  } catch {
    return false;
  }
}

// The honest failure used whenever D1 is not reachable (e.g. migration not
// yet run). Nothing is faked: the caller sees an error and keeps their draft.
const notReady = () => unavailable('The school office isn’t connected to its records room yet, so this can’t be received right now. Please try again soon.');

// A failure because the tables do not exist yet (migration not applied) is
// the same honest "not connected" situation — 503, never a fake success and
// never a raw 500 for something the operator fixes by running the migration.
const dbError = (e) => /no such table/i.test(String(e && e.message)) ? notReady() : serverError();

export async function onRequest(context) {
  const { request, env, params } = context;
  const url = new URL(request.url);
  const route = (params.route || []).join('/');

  if (request.method === 'GET') {
    if (route === 'config') {
      return json({ ok: true, turnstileSiteKey: env.TURNSTILE_SITE_KEY || null });
    }
    if (route === 'notes') {
      if (!await dbReady(env)) return notReady();
      try {
        const { results } = await env.DB.prepare(
          'SELECT id, display_name, message, approved_at FROM sticky_notes WHERE status = ?1 ORDER BY approved_at DESC LIMIT 60'
        ).bind('approved').all();
        return json({ ok: true, notes: results });
      } catch (e) { return dbError(e); }
    }
    if (route === 'reviews') {
      if (!await dbReady(env)) return notReady();
      const pagePath = url.searchParams.get('page_path');
      if (pagePath !== null && !pagePathOk(pagePath)) return badRequest('Unknown page.');
      const limit = Math.min(Number(url.searchParams.get('limit')) || 12, 24);
      try {
        const stmt = pagePath
          ? env.DB.prepare('SELECT id, page_path, reaction, comment, display_name, approved_at FROM page_reviews WHERE status = ?1 AND page_path = ?2 ORDER BY approved_at DESC LIMIT ?3').bind('approved', pagePath, limit)
          : env.DB.prepare('SELECT id, page_path, reaction, comment, display_name, approved_at FROM page_reviews WHERE status = ?1 AND comment IS NOT NULL ORDER BY approved_at DESC LIMIT ?2').bind('approved', limit);
        const { results } = await stmt.all();
        return json({ ok: true, reviews: results });
      } catch (e) { return dbError(e); }
    }
    if (route === 'comments') {
      if (!await dbReady(env)) return notReady();
      const pagePath = url.searchParams.get('page_path');
      if (!pagePathOk(pagePath)) return badRequest('Unknown page.');
      try {
        const { results } = await env.DB.prepare(
          'SELECT id, display_name, comment, approved_at FROM page_comments WHERE status = ?1 AND page_path = ?2 ORDER BY approved_at DESC LIMIT 20'
        ).bind('approved', pagePath).all();
        return json({ ok: true, comments: results });
      } catch (e) { return dbError(e); }
    }
    if (route === 'art') {
      if (!await dbReady(env)) return notReady();
      try {
        const { results } = await env.DB.prepare(
          'SELECT id, title, display_name, approved_at FROM art_submissions WHERE status = ?1 ORDER BY approved_at DESC LIMIT 60'
        ).bind('approved').all();
        return json({ ok: true, art: results });
      } catch (e) { return dbError(e); }
    }
    if (route.startsWith('art/') && route.endsWith('/image')) {
      const id = Number(route.slice(4, -6));
      if (!Number.isInteger(id) || id <= 0) return badRequest('Unknown artwork.');
      if (!await dbReady(env)) return notReady();
      try {
        const row = await env.DB.prepare('SELECT image_key, image_type FROM art_submissions WHERE id = ?1 AND status = ?2').bind(id, 'approved').first();
        // Pending and rejected artwork is NEVER served here — only approved rows exist.
        if (!row || !env.ART_UPLOADS) return json({ ok: false, error: 'Artwork not found.' }, { status: 404 });
        const object = await env.ART_UPLOADS.get(row.image_key);
        if (!object) return json({ ok: false, error: 'Artwork not found.' }, { status: 404 });
        return new Response(object.body, {
          status: 200,
          headers: {
            'Content-Type': row.image_type,
            'Cache-Control': 'public, max-age=300',
            'X-Content-Type-Options': 'nosniff',
          },
        });
      } catch (e) { return dbError(e); }
    }
    return json({ ok: false, error: 'Not found.' }, { status: 404 });
  }

  if (request.method === 'POST') {
    const guard = originGuard(request);
    if (guard) return guard;

    if (route === 'principal') {
      if (!await dbReady(env)) return notReady();
      const limited = await rateLimit(env, request, 'principal', 3); if (!limited.ok) return limited.response;
      const read = await readJson(request); if (read.error) return read.error;
      const data = read.data;
      if (honeypot(data)) return json({ ok: true }); // silently swallow bots
      const ts = await turnstileGuard(env, data.turnstileToken); if (ts) return ts;
      const category = typeof data.category === 'string' ? data.category.trim().toLowerCase() : '';
      if (!PRINCIPAL_CATEGORIES.includes(category)) return badRequest('Please pick what kind of note this is.', { category: 'Pick one of the options.' });
      const message = cleanText(data.message, 4000, { multiline: true });
      if (message === null) return badRequest('Please write your message.', { message: 'Your message can’t be empty.' });
      if (message === undefined) return tooLarge('Messages are limited to 4,000 characters.');
      const parentName = data.parent_name === undefined || data.parent_name === null || data.parent_name === '' ? null : cleanText(data.parent_name, 80);
      if (parentName === undefined) return tooLarge('Names are limited to 80 characters.');
      const email = data.email === undefined || data.email === null || data.email === '' ? null : cleanEmail(data.email);
      if (email === undefined) return badRequest('That email address doesn’t look right.', { email: 'Check the email address, or leave it empty.' });
      try {
        const ts2 = nowIso();
        await env.DB.prepare(
          'INSERT INTO principal_messages (category, parent_name, email, message, status, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?6)'
        ).bind(category, parentName, email, message, 'new', ts2).run();
        return json({ ok: true, message: 'Thanks. Your message has been sent to the Principal’s Office.' });
      } catch (e) { return dbError(e); }
    }

    if (route === 'sticky') {
      if (!await dbReady(env)) return notReady();
      const limited = await rateLimit(env, request, 'sticky', 3); if (!limited.ok) return limited.response;
      const read = await readJson(request); if (read.error) return read.error;
      const data = read.data;
      if (honeypot(data)) return json({ ok: true });
      const ts = await turnstileGuard(env, data.turnstileToken); if (ts) return ts;
      const message = cleanText(data.message, 120);
      if (message === null) return badRequest('Please write a little note first.', { message: 'Your note can’t be empty.' });
      if (message === undefined) return tooLarge('Notes are limited to 120 characters.');
      if (data.confirm !== true && data.confirm !== 'on' && data.confirm !== 'yes') return badRequest('Please tick the parent confirmation box.');
      const displayName = data.display_name === undefined || data.display_name === null || data.display_name === '' ? null : cleanText(data.display_name, 24);
      if (displayName === undefined) return tooLarge('Names are limited to 24 characters.');
      try {
        const ts2 = nowIso();
        await env.DB.prepare(
          'INSERT INTO sticky_notes (display_name, message, status, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, ?4)'
        ).bind(displayName, message, 'pending', ts2).run();
        return json({ ok: true, message: 'Thanks! Your note will go up after the school office reads it.' });
      } catch (e) { return dbError(e); }
    }

    if (route === 'review') {
      if (!await dbReady(env)) return notReady();
      const limited = await rateLimit(env, request, 'review', 8); if (!limited.ok) return limited.response;
      const read = await readJson(request); if (read.error) return read.error;
      const data = read.data;
      if (honeypot(data)) return json({ ok: true });
      const ts = await turnstileGuard(env, data.turnstileToken); if (ts) return ts;
      if (!pagePathOk(data.page_path)) return badRequest('Unknown page.');
      if (!REACTIONS.includes(data.reaction)) return badRequest('Please pick one of the four reactions.');
      let comment = null;
      if (data.comment !== undefined && data.comment !== null && data.comment !== '') {
        comment = cleanText(data.comment, 300, { multiline: true });
        if (comment === null) return badRequest('Your comment ended up empty.', { comment: 'Write a sentence or clear the box.' });
        if (comment === undefined) return tooLarge('Comments are limited to 300 characters.');
        if (data.confirm !== true && data.confirm !== 'on' && data.confirm !== 'yes') return badRequest('Please tick the box so your comment can be reviewed for the community.');
      }
      const displayName = data.display_name === undefined || data.display_name === null || data.display_name === '' ? null : cleanText(data.display_name, 40);
      if (displayName === undefined) return tooLarge('Names are limited to 40 characters.');
      try {
        const ts2 = nowIso();
        await env.DB.prepare(
          'INSERT INTO page_reviews (page_path, reaction, comment, display_name, status, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?6)'
        ).bind(data.page_path, data.reaction, comment, displayName, 'pending', ts2).run();
        return json({ ok: true, message: 'Thanks for sharing your feedback!' });
      } catch (e) { return dbError(e); }
    }

    if (route === 'comment') {
      if (!await dbReady(env)) return notReady();
      const limited = await rateLimit(env, request, 'comment', 5); if (!limited.ok) return limited.response;
      const read = await readJson(request); if (read.error) return read.error;
      const data = read.data;
      if (honeypot(data)) return json({ ok: true });
      const ts = await turnstileGuard(env, data.turnstileToken); if (ts) return ts;
      if (!pagePathOk(data.page_path)) return badRequest('Unknown page.');
      const comment = cleanText(data.comment, 300, { multiline: true });
      if (comment === null) return badRequest('Please write a short comment first.', { comment: 'Your comment can’t be empty.' });
      if (comment === undefined) return tooLarge('Comments are limited to 300 characters.');
      if (data.confirm !== true && data.confirm !== 'on' && data.confirm !== 'yes') return badRequest('Please tick the box so your comment can be reviewed for the community.');
      const displayName = data.display_name === undefined || data.display_name === null || data.display_name === '' ? null : cleanText(data.display_name, 40);
      if (displayName === undefined) return tooLarge('Names are limited to 40 characters.');
      try {
        const ts2 = nowIso();
        await env.DB.prepare(
          'INSERT INTO page_comments (page_path, display_name, comment, status, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, ?5, ?5)'
        ).bind(data.page_path, displayName, comment, 'pending', ts2).run();
        return json({ ok: true, message: 'Thanks! Your comment will appear after the school office reads it.' });
      } catch (e) { return dbError(e); }
    }

    if (route === 'art') {
      if (!await dbReady(env)) return notReady();
      const limited = await rateLimit(env, request, 'art', 3); if (!limited.ok) return limited.response;
      if (!env.ART_UPLOADS) return unavailable('The artwork room isn’t set up on the server yet, so uploads can’t be received right now.');
      let form;
      try {
        form = await request.formData();
      } catch { return badRequest('We could not read that upload.'); }
      const textEntries = Object.fromEntries([...form.entries()].filter(([, v]) => typeof v === 'string'));
      if (honeypot(textEntries)) return json({ ok: true });
      const ts = await turnstileGuard(env, form.get('turnstileToken')); if (ts) return ts;
      const file = form.get('image');
      if (!file || typeof file === 'string') return badRequest('Please choose a picture of the artwork.', { image: 'A picture is required.' });
      if (file.size > LIMITS.MAX_UPLOAD_BYTES) return tooLarge('Pictures are limited to 8 MB.');
      if (form.get('confirm') !== 'true' && form.get('confirm') !== 'on' && form.get('confirm') !== 'yes') return badRequest('Please tick the parent confirmation box.');
      const displayName = form.get('display_name') ? cleanText(String(form.get('display_name')), 24) : null;
      if (displayName === undefined) return tooLarge('Names are limited to 24 characters.');
      const title = form.get('title') ? cleanText(String(form.get('title')), 60) : null;
      if (title === undefined) return tooLarge('Titles are limited to 60 characters.');
      const bytes = new Uint8Array(await file.arrayBuffer());
      const check = validateAndScrubImage(bytes, { maxBytes: LIMITS.MAX_UPLOAD_BYTES });
      if (!check.ok) {
        if (check.reason === 'too large') return tooLarge('Pictures are limited to 8 MB.');
        if (check.reason === 'unsupported type') return unsupported('Please upload a JPEG, PNG or WebP picture.');
        if (check.reason === 'dimensions too large') return badRequest('That picture is too big — please keep it under 4096 × 4096 pixels.');
        return badRequest('That file doesn’t look like a picture we can display. Please try a JPEG, PNG or WebP.');
      }
      try {
        const ts2 = nowIso();
        const ext = check.type === 'image/jpeg' ? 'jpg' : check.type === 'image/png' ? 'png' : 'webp';
        // Pending artwork lives in the PRIVATE submissions bucket only — it is
        // never written to, or served from, the public starter-art area.
        const key = `pending/${ts2.replace(/[:.]/g, '-')}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
        await env.ART_UPLOADS.put(key, check.bytes, { httpMetadata: { contentType: check.type } });
        await env.DB.prepare(
          'INSERT INTO art_submissions (display_name, title, image_key, image_type, image_size, status, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?7)'
        ).bind(displayName, title, key, check.type, check.bytes.length, 'pending', ts2).run();
        return json({ ok: true, message: 'Thanks! The artwork will go up after the school office reviews it.' });
      } catch (e) { return dbError(e); }
    }

    return json({ ok: false, error: 'Not found.' }, { status: 404 });
  }

  return methodGuard(request, ['GET', 'POST']);
}
