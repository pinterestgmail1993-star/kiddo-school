-- Kiddo School — community backend, migration 0001.
-- Run once against the PRODUCTION database (Cloudflare dashboard → Storage & Databases → D1 → kiddo-school-db → Console),
-- or with wrangler:  npx wrangler d1 execute kiddo-school-db --remote --file migrations/0001_community.sql
-- Every statement is idempotent (IF NOT EXISTS) and NOTHING existing is dropped or deleted.
-- Timestamps are UTC ISO-8601 strings written by the application.

CREATE TABLE IF NOT EXISTS principal_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL,
  parent_name TEXT,
  email TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_principal_status   ON principal_messages (status);
CREATE INDEX IF NOT EXISTS idx_principal_category ON principal_messages (category);
CREATE INDEX IF NOT EXISTS idx_principal_created  ON principal_messages (created_at);

CREATE TABLE IF NOT EXISTS sticky_notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  display_name TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL,
  approved_at TEXT,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_sticky_status   ON sticky_notes (status);
CREATE INDEX IF NOT EXISTS idx_sticky_created  ON sticky_notes (created_at);
CREATE INDEX IF NOT EXISTS idx_sticky_approved ON sticky_notes (approved_at);

CREATE TABLE IF NOT EXISTS art_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  display_name TEXT,
  title TEXT,
  image_key TEXT NOT NULL,
  image_type TEXT NOT NULL,
  image_size INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL,
  approved_at TEXT,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_art_status   ON art_submissions (status);
CREATE INDEX IF NOT EXISTS idx_art_created  ON art_submissions (created_at);
CREATE INDEX IF NOT EXISTS idx_art_approved ON art_submissions (approved_at);

CREATE TABLE IF NOT EXISTS page_reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_path TEXT NOT NULL,
  reaction TEXT NOT NULL,
  comment TEXT,
  display_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL,
  approved_at TEXT,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_reviews_path     ON page_reviews (page_path);
CREATE INDEX IF NOT EXISTS idx_reviews_status   ON page_reviews (status);
CREATE INDEX IF NOT EXISTS idx_reviews_created  ON page_reviews (created_at);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON page_reviews (approved_at);

CREATE TABLE IF NOT EXISTS page_comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_path TEXT NOT NULL,
  display_name TEXT,
  comment TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL,
  approved_at TEXT,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_comments_path     ON page_comments (page_path);
CREATE INDEX IF NOT EXISTS idx_comments_status   ON page_comments (status);
CREATE INDEX IF NOT EXISTS idx_comments_created  ON page_comments (created_at);
CREATE INDEX IF NOT EXISTS idx_comments_approved ON page_comments (approved_at);

-- Lightweight per-IP sliding-window rate limiting (basic spam protection;
-- no personal data beyond the ephemeral counter — rows are pruned on write).
CREATE TABLE IF NOT EXISTS rate_limits (
  route TEXT NOT NULL,
  ip TEXT NOT NULL,
  window_start TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (route, ip)
);
CREATE INDEX IF NOT EXISTS idx_ratelimit_window ON rate_limits (window_start);
