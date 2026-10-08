// Kiddo School admin API (Pages Function) — /api/admin/*.
// EVERY request must pass the admin session check (fail-closed: with
// ADMIN_USERNAME/ADMIN_PASSWORD_HASH unset, everything here answers 503 and
// nothing is readable; without a valid session cookie, 401). One admin
// system for all incoming community content: Principal's Office messages,
// sticky notes, artwork, page reviews and page comments.

import { requireAdmin } from '../../lib/access.js';
import { json, badRequest, methodGuard, serverError, originGuard } from '../../lib/security.js';

const TABLES = {
  principal: { table: 'principal_messages', statuses: ['new', 'read', 'resolved', 'archived'] },
  notes: { table: 'sticky_notes', statuses: ['pending', 'approved', 'rejected'] },
  art: { table: 'art_submissions', statuses: ['pending', 'approved', 'rejected'] },
  reviews: { table: 'page_reviews', statuses: ['pending', 'approved', 'rejected'] },
  comments: { table: 'page_comments', statuses: ['pending', 'approved', 'rejected'] },
};
const PRINCIPAL_ACTIONS = { read: 'read', resolve: 'resolved', archive: 'archived' };

function nowIso() { return new Date().toISOString(); }

export async function onRequest(context) {
  const { request, env, params } = context;
  const denied = await requireAdmin(request, env);
  if (denied) return denied;
  // State-changing requests additionally require the same-origin +
  // custom-header guard (admin.js sends the header on every call), so a
  // cross-site page cannot ride the admin session cookie.
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    const guard = originGuard(request);
    if (guard) return guard;
  }

  const url = new URL(request.url);
  const route = (params.route || []).join('/');
  const [resource, id, tail] = route.split('/');

  if (request.method === 'GET' && resource === 'counts') {
    try {
      const one = async (sql) => (await env.DB.prepare(sql).first()).n;
      const counts = {
        principalNew: await one('SELECT COUNT(*) AS n FROM principal_messages WHERE status = \'new\''),
        stickyPending: await one('SELECT COUNT(*) AS n FROM sticky_notes WHERE status = \'pending\''),
        artPending: await one('SELECT COUNT(*) AS n FROM art_submissions WHERE status = \'pending\''),
        reviewsPending: await one('SELECT COUNT(*) AS n FROM page_reviews WHERE status = \'pending\''),
        commentsPending: await one('SELECT COUNT(*) AS n FROM page_comments WHERE status = \'pending\''),
      };
      return json({ ok: true, counts });
    } catch {
      return serverError();
    }
  }

  const spec = TABLES[resource];
  if (!spec) return json({ ok: false, error: 'Not found.' }, { status: 404 });

  if (request.method === 'GET' && !id) {
    const status = url.searchParams.get('status') || (resource === 'principal' ? 'new' : 'pending');
    if (!spec.statuses.includes(status)) return badRequest('Unknown status filter.');
    const category = url.searchParams.get('category');
    try {
      let stmt;
      if (resource === 'principal') {
        // The email column is read ONLY here, inside the protected admin.
        const cols = 'id, category, parent_name, email, message, status, created_at';
        if (category && ['question', 'request', 'feedback', 'suggestion', 'complaint', 'technical_problem'].includes(category)) {
          stmt = env.DB.prepare(`SELECT ${cols} FROM principal_messages WHERE status = ?1 AND category = ?2 ORDER BY created_at DESC LIMIT 50`).bind(status, category);
        } else {
          stmt = env.DB.prepare(`SELECT ${cols} FROM principal_messages WHERE status = ?1 ORDER BY created_at DESC LIMIT 50`).bind(status);
        }
      } else {
        const cols = resource === 'art'
          ? 'id, display_name, title, image_key, image_type, image_size, status, created_at'
          : resource === 'notes'
            ? 'id, display_name, message, status, created_at'
            : 'id, page_path, reaction, rating, comment, display_name, status, created_at';
        stmt = env.DB.prepare(`SELECT ${cols} FROM ${spec.table} WHERE status = ?1 ORDER BY created_at DESC LIMIT 50`).bind(status);
      }
      const { results } = await stmt.all();
      return json({ ok: true, items: results });
    } catch {
      return serverError();
    }
  }

  if (request.method === 'GET' && resource === 'art' && id && tail === 'image') {
    const artId = Number(id);
    if (!Number.isInteger(artId) || artId <= 0) return badRequest('Unknown artwork.');
    try {
      const row = await env.DB.prepare('SELECT image_key, image_type FROM art_submissions WHERE id = ?1').bind(artId).first();
      if (!row || !env.ART_UPLOADS) return json({ ok: false, error: 'Not found.' }, { status: 404 });
      const object = await env.ART_UPLOADS.get(row.image_key);
      if (!object) return json({ ok: false, error: 'Not found.' }, { status: 404 });
      return new Response(object.body, {
        status: 200,
        headers: { 'Content-Type': row.image_type, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
      });
    } catch { return serverError(); }
  }

  if (request.method === 'POST' && id && !tail) {
    let action = null;
    try {
      const body = await request.json();
      action = body && typeof body.action === 'string' ? body.action : null;
    } catch { return badRequest('We could not read that request.'); }
    if (!action) return badRequest('Missing action.');
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) return badRequest('Unknown item.');

    let status = null;
    if (resource === 'principal') {
      status = PRINCIPAL_ACTIONS[action] || null;
    } else if (action === 'approve') {
      status = 'approved';
    } else if (action === 'reject') {
      status = 'rejected';
    }
    if (!status || !spec.statuses.includes(status)) return badRequest('Unknown action.');

    try {
      const isPrincipal = resource === 'principal';
      const approved = status === 'approved' ? nowIso() : null;
      const sql = isPrincipal
        ? `UPDATE principal_messages SET status = ?1, updated_at = ?2 WHERE id = ?3`
        : `UPDATE ${spec.table} SET status = ?1, approved_at = ${approved ? '?3' : 'approved_at'}, updated_at = ?2 WHERE id = ?4`;
      const result = isPrincipal
        ? await env.DB.prepare(sql).bind(status, nowIso(), numericId).run()
        : await env.DB.prepare(sql).bind(status, nowIso(), approved, numericId).run();
      if (!result.success || result.meta.changes === 0) return json({ ok: false, error: 'Not found.' }, { status: 404 });
      return json({ ok: true });
    } catch { return serverError(); }
  }

  return methodGuard(request, ['GET', 'POST']);
}
