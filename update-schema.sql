-- Run this SQL in your Supabase SQL Editor to allow decimal ratings

-- First, add the new review columns if they don't exist
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

-- Update existing rating column to accept decimals
ALTER TABLE gynecologists 
ALTER COLUMN rating TYPE DECIMAL(3,2);

-- If you have any existing integer rating columns, update them too
-- (Uncomment these if you have them)
-- ALTER TABLE gynecologists 
-- ALTER COLUMN review_1_rating TYPE DECIMAL(2,1),
-- ALTER COLUMN review_2_rating TYPE DECIMAL(2,1),
-- ALTER COLUMN review_3_rating TYPE DECIMAL(2,1);

-- Add other useful columns from your new schema
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