-- Kiddo School — community backend, migration 0002: reactions + star ratings.
-- Splits the three feedback types apart so they can never be confused:
--   REACTIONS = one quick emoji tap, no text, counted live (page_reactions).
--   REVIEWS   = star rating + optional text, moderated (page_reviews, new rating column).
--   COMMENTS  = text discussion, moderated (page_comments — unchanged, from 0001).
-- Run ONCE against the PRODUCTION database (Cloudflare dashboard → Storage & Databases → D1 → kiddo-school-db → Console),
-- or with wrangler:  npx wrangler d1 execute kiddo-school-db --remote --file migrations/0002_reactions_reviews.sql
-- The CREATE statements are idempotent; the ALTER TABLE is not — run this file once.
-- Nothing existing is dropped, renamed or deleted.

-- REACTIONS: anonymous emoji taps. No text, no moderation queue — there is
-- nothing to read and nothing to publish. One row per tap; counts are real.
CREATE TABLE IF NOT EXISTS page_reactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_path TEXT NOT NULL,
  reaction TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_reactions_path    ON page_reactions (page_path);
CREATE INDEX IF NOT EXISTS idx_reactions_reaction ON page_reactions (reaction);
CREATE INDEX IF NOT EXISTS idx_reactions_created ON page_reactions (created_at);

-- REVIEWS: star ratings on flashcard pages. Additive, nullable column —
-- existing rows (emoji + optional comment from class pages) are untouched.
-- A star review is stored with reaction='star' and rating 1–5.
ALTER TABLE page_reviews ADD COLUMN rating INTEGER;
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON page_reviews (rating);
