// Cloudflare Access verification for /admin/* and /api/admin/*.
// FAIL-CLOSED: if CF_ACCESS_TEAM or CF_ACCESS_AUD is not configured, every
// admin request is denied — the admin area simply does not open until the
// user turns on Cloudflare Access in the Zero Trust dashboard and sets the
// two environment variables. There is no fallback password, token or bypass.
//
// How it works: Cloudflare Access injects a signed JWT (Cf-Access-Assertion)
// into every request that passed the Access login. We verify the RS256
// signature against the team's published JWKS, then check issuer, audience
// and expiry. Verification uses WebCrypto (available in Workers and Node 18+).

const JWKS_CACHE_TTL = 15 * 60 * 1000; // 15 minutes

function b64urlToBytes(str) {
  const pad = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4));
  const normalized = str.replace(/-/g, '+').replace(/_/g, '/') + pad;
  const binary = atob(normalized);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function decodeSegment(segment) {
  try {
    return JSON.parse(new TextDecoder().decode(b64urlToBytes(segment)));
  } catch {
    return null;
  }
}

async function fetchJwks(teamDomain, env) {
  // Test / local-dev override: CF_ACCESS_JWKS holds the exact JWKS JSON.
  // Changing Workers environment variables requires owner access to the
  // Cloudflare dashboard, so a visitor can never influence this; production
  // leaves it unset and always verifies against the live certificate endpoint.
  const override = env && typeof env.CF_ACCESS_JWKS === 'string' ? env.CF_ACCESS_JWKS.trim() : '';
  if (override.startsWith('{')) {
    try {
      const jwks = JSON.parse(override);
      if (jwks && Array.isArray(jwks.keys)) return jwks;
    } catch { /* fall through to the real endpoint */ }
  }
  const url = `https://${teamDomain}/cdn-cgi/access/certs`;
  const cacheKey = `cf-access-jwks:${teamDomain}`;
  const cached = globalThis.__kiddoJwksCache;
  if (cached && cached.key === cacheKey && Date.now() - cached.at < JWKS_CACHE_TTL) return cached.jwks;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('jwks fetch failed');
  const jwks = await res.json();
  globalThis.__kiddoJwksCache = { key: cacheKey, at: Date.now(), jwks };
  return jwks;
}

async function verifySignature(jwtParts, jwks) {
  const [headerB64, payloadB64, signatureB64] = jwtParts;
  const header = decodeSegment(headerB64);
  if (!header || header.alg !== 'RS256' || !header.kid) return false;
  const jwk = (jwks.keys || []).find(k => k.kid === header.kid && k.kty === 'RSA');
  if (!jwk) return false;
  const key = await crypto.subtle.importKey(
    'jwk',
    { kty: jwk.kty, n: jwk.n, e: jwk.e, alg: 'RS256', ext: true },
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify']
  );
  const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
  const signature = b64urlToBytes(signatureB64);
  return crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, signature, data);
}

// verifyAccessJwt(token, env, fetchJwksImpl?) — fetchJwksImpl is injectable
// for tests. Returns { ok:true, payload } or { ok:false, reason }.
export async function verifyAccessJwt(token, env, fetchJwksImpl) {
  if (!token || typeof token !== 'string') return { ok: false, reason: 'missing token' };
  const parts = token.split('.');
  if (parts.length !== 3) return { ok: false, reason: 'malformed token' };
  const payload = decodeSegment(parts[1]);
  if (!payload) return { ok: false, reason: 'malformed payload' };

  const teamDomain = env.CF_ACCESS_TEAM;
  const aud = env.CF_ACCESS_AUD;
  if (!teamDomain || !aud) return { ok: false, reason: 'access not configured' };

  const expectedIss = `https://${teamDomain}`;
  if (payload.iss !== expectedIss) return { ok: false, reason: 'bad issuer' };
  const auds = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  if (!auds.includes(aud)) return { ok: false, reason: 'bad audience' };
  const now = Math.floor(Date.now() / 1000);
  if (!payload.exp || payload.exp < now + 30) return { ok: false, reason: 'expired' };

  let jwks;
  try {
    jwks = await (fetchJwksImpl || fetchJwks)(teamDomain, env);
  } catch {
    return { ok: false, reason: 'jwks unavailable' };
  }
  const signatureOk = await verifySignature(parts, jwks);
  if (!signatureOk) return { ok: false, reason: 'bad signature' };
  return { ok: true, payload };
}

function accessConfigured(env) {
  return Boolean(env.CF_ACCESS_TEAM && env.CF_ACCESS_AUD);
}

// Guard used by every admin handler. Denies with 503 when Access has not been
// configured yet (so nobody can silently "discover" the admin), 401 when a
// token is present but fails verification.
export async function requireAdmin(request, env) {
  if (!accessConfigured(env)) {
    return json503('The admin room is locked — Cloudflare Access is not configured yet. See the deployment notes.');
  }
  const token = request.headers.get('Cf-Access-Jwt-Assertion') || '';
  const result = await verifyAccessJwt(token, env);
  if (!result.ok) return json401('Admin access denied.');
  return null; // authenticated
}

export function json503(error) {
  return new Response(JSON.stringify({ ok: false, error }), {
    status: 503,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' },
  });
}
export function json401(error) {
  return new Response(JSON.stringify({ ok: false, error }), {
    status: 401,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' },
  });
}
