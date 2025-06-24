-- Minimal fix: Just handle the rating column and review columns
-- Drop views first
DROP VIEW IF EXISTS gynecologists_premium;
DROP VIEW IF EXISTS gynecologists_accessible;

-- Add review columns
ALTER TABLE gynecologists 
ADD COLUMN IF NOT EXISTS review_1_author TEXT,
ADD COLUMN IF NOT EXISTS review_1_rating INTEGER,
ADD COLUMN IF NOT EXISTS review_1_text TEXT,
ADD COLUMN IF NOT EXISTS review_1_time TEXT,
ADD COLUMN IF NOT EXISTS review_2_author TEXT,
ADD COLUMN IF NOT EXISTS review_2_rating INTEGER,
ADD COLUMN IF NOT EXISTS review_2_text TEXT,
ADD COLUMN IF NOT EXISTS review_2_time TEXT,
ADD COLUMN IF NOT EXISTS review_3_author TEXT,
ADD COLUMN IF NOT EXISTS review_3_rating INTEGER,
ADD COLUMN IF NOT EXISTS review_3_text TEXT,
ADD COLUMN IF NOT EXISTS review_3_time TEXT;

-- Keep rating as NUMERIC (which it already is) - no need to change
-- Just recreate the views
CREATE OR REPLACE VIEW gynecologists_premium AS
SELECT *
FROM gynecologists
WHERE rating >= 4.0 
  AND total_ratings >= 5
ORDER BY rating DESC, total_ratings DESC;

CREATE OR REPLACE VIEW gynecologists_accessible AS
SELECT *
FROM gynecologists
WHERE id IS NOT NULL  -- Simple condition since we don't have accessibility data yet
ORDER BY rating DESC; 