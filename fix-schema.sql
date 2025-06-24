-- Step 1: Drop existing views that depend on the rating column
DROP VIEW IF EXISTS gynecologists_premium;
DROP VIEW IF EXISTS gynecologists_accessible;

-- Step 2: Add the new review columns if they don't exist
ALTER TABLE gynecologists 
ADD COLUMN IF NOT EXISTS review_1_author TEXT,
ADD COLUMN IF NOT EXISTS review_1_rating DECIMAL(2,1),
ADD COLUMN IF NOT EXISTS review_1_text TEXT,
ADD COLUMN IF NOT EXISTS review_1_time TEXT,
ADD COLUMN IF NOT EXISTS review_2_author TEXT,
ADD COLUMN IF NOT EXISTS review_2_rating DECIMAL(2,1),
ADD COLUMN IF NOT EXISTS review_2_text TEXT,
ADD COLUMN IF NOT EXISTS review_2_time TEXT,
ADD COLUMN IF NOT EXISTS review_3_author TEXT,
ADD COLUMN IF NOT EXISTS review_3_rating DECIMAL(2,1),
ADD COLUMN IF NOT EXISTS review_3_text TEXT,
ADD COLUMN IF NOT EXISTS review_3_time TEXT;

-- Step 3: Update existing rating column to accept decimals
ALTER TABLE gynecologists 
ALTER COLUMN rating TYPE DECIMAL(3,2);

-- Step 4: Add other useful columns from your new schema
ALTER TABLE gynecologists 
ADD COLUMN IF NOT EXISTS reviews_summary TEXT,
ADD COLUMN IF NOT EXISTS google_maps_directions TEXT,
ADD COLUMN IF NOT EXISTS google_maps_coords_directions TEXT,
ADD COLUMN IF NOT EXISTS apple_maps_directions TEXT,
ADD COLUMN IF NOT EXISTS wheelchair_accessible_entrance BOOLEAN,
ADD COLUMN IF NOT EXISTS wheelchair_accessible_parking BOOLEAN,
ADD COLUMN IF NOT EXISTS wheelchair_accessible_restroom BOOLEAN,
ADD COLUMN IF NOT EXISTS wheelchair_accessible_seating BOOLEAN,
ADD COLUMN IF NOT EXISTS accessibility_features_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS accessibility_status TEXT,
ADD COLUMN IF NOT EXISTS enhancement_status TEXT,
ADD COLUMN IF NOT EXISTS enhanced_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS accessibility_enhanced_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS has_phone INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS has_website INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS has_images INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS has_reviews INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS has_accessibility_info INTEGER DEFAULT 0;

-- Step 5: Recreate the views with the updated column types
CREATE OR REPLACE VIEW gynecologists_premium AS
SELECT *
FROM gynecologists
WHERE rating >= 4.0 
  AND total_ratings >= 5
  AND has_phone = 1
ORDER BY rating DESC, total_ratings DESC;

-- Create a view for accessible places
CREATE OR REPLACE VIEW gynecologists_accessible AS
SELECT *
FROM gynecologists
WHERE accessibility_features_count > 0
ORDER BY accessibility_features_count DESC, rating DESC;

-- Step 6: Update any existing data quality indicators
UPDATE gynecologists 
SET 
  has_phone = CASE WHEN phone IS NOT NULL AND phone != '' THEN 1 ELSE 0 END,
  has_website = CASE WHEN website IS NOT NULL AND website != '' AND website != 'N/A' THEN 1 ELSE 0 END,
  has_images = CASE WHEN image_urls IS NOT NULL AND array_length(image_urls, 1) > 0 THEN 1 ELSE 0 END,
  has_reviews = CASE WHEN total_ratings > 0 THEN 1 ELSE 0 END
WHERE has_phone = 0 OR has_website = 0 OR has_images = 0 OR has_reviews = 0; 