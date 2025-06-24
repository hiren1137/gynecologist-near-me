-- COMPLETE FINAL SCHEMA FOR GYNECOLOGISTS TABLE
-- This is the definitive schema with all columns and proper data types
-- Run this in your Supabase SQL Editor

-- Step 1: Drop existing views and table (if you want to start fresh)
-- UNCOMMENT THESE LINES ONLY IF YOU WANT TO START COMPLETELY FRESH
-- DROP VIEW IF EXISTS gynecologists_premium;
-- DROP VIEW IF EXISTS gynecologists_accessible;
-- DROP TABLE IF EXISTS gynecologists;

-- Step 2: Create the complete gynecologists table
CREATE TABLE IF NOT EXISTS gynecologists (
    -- Primary identifiers
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    state TEXT NOT NULL,
    city TEXT NOT NULL,
    
    -- Contact information
    address TEXT,
    phone TEXT,
    website TEXT,
    
    -- Location data
    place_id TEXT UNIQUE,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    location_url TEXT,
    
    -- Ratings and Reviews Summary
    rating DECIMAL(3, 2),
    total_ratings INTEGER DEFAULT 0,
    reviews_summary TEXT,
    review_count INTEGER DEFAULT 0,
    
    -- Individual Reviews (Full Text) - NEW COLUMNS FOR FULL REVIEWS
    review_1_author TEXT,
    review_1_rating INTEGER,
    review_1_text TEXT,
    review_1_time TEXT,
    review_2_author TEXT,
    review_2_rating INTEGER,
    review_2_text TEXT,
    review_2_time TEXT,
    review_3_author TEXT,
    review_3_rating INTEGER,
    review_3_text TEXT,
    review_3_time TEXT,
    
    -- Business Details
    opening_hours TEXT,
    types TEXT,
    price_level TEXT,
    search_keyword TEXT DEFAULT 'gynecologist',
    
    -- Images
    image_urls TEXT[], -- Array for multiple images
    image_count INTEGER DEFAULT 0,
    
    -- Directions and Maps
    google_maps_directions TEXT,
    google_maps_coords_directions TEXT,
    apple_maps_directions TEXT,
    
    -- Accessibility Features
    wheelchair_accessible_entrance BOOLEAN,
    wheelchair_accessible_parking BOOLEAN,
    wheelchair_accessible_restroom BOOLEAN,
    wheelchair_accessible_seating BOOLEAN,
    accessibility_features_count INTEGER DEFAULT 0,
    accessibility_status TEXT,
    
    -- Enhancement Status
    enhancement_status TEXT,
    enhanced_at TIMESTAMP,
    accessibility_enhanced_at TIMESTAMP,
    scraped_at TIMESTAMP,
    
    -- Data Quality Indicators
    has_phone INTEGER DEFAULT 0,
    has_website INTEGER DEFAULT 0,
    has_images INTEGER DEFAULT 0,
    has_reviews INTEGER DEFAULT 0,
    has_accessibility_info INTEGER DEFAULT 0,
    
    -- Legacy fields (for backward compatibility)
    top_reviews TEXT[], -- Array of review texts (old format)
    qualification TEXT,
    experience TEXT,
    specialization TEXT[],
    hospital TEXT,
    consultation_fee TEXT,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Step 3: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_gynecologists_state ON gynecologists(state);
CREATE INDEX IF NOT EXISTS idx_gynecologists_city ON gynecologists(state, city);
CREATE INDEX IF NOT EXISTS idx_gynecologists_rating ON gynecologists(rating DESC);
CREATE INDEX IF NOT EXISTS idx_gynecologists_location ON gynecologists(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_gynecologists_place_id ON gynecologists(place_id);
CREATE INDEX IF NOT EXISTS idx_gynecologists_accessibility ON gynecologists(accessibility_features_count);
CREATE INDEX IF NOT EXISTS idx_gynecologists_quality ON gynecologists(has_phone, has_website, has_reviews);

-- Step 4: Create views for high-quality records
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

-- Create a view for doctors with full reviews
CREATE OR REPLACE VIEW gynecologists_with_full_reviews AS
SELECT *
FROM gynecologists
WHERE (review_1_text IS NOT NULL AND review_1_text != '') 
   OR (review_2_text IS NOT NULL AND review_2_text != '') 
   OR (review_3_text IS NOT NULL AND review_3_text != '')
ORDER BY rating DESC, total_ratings DESC;

-- Step 5: Enable Row Level Security (RLS)
ALTER TABLE gynecologists ENABLE ROW LEVEL SECURITY;

-- Step 6: Create policies for access control
-- Policy for public read access
CREATE POLICY "Public read access" ON gynecologists
    FOR SELECT USING (true);

-- Policy for authenticated users to insert data
CREATE POLICY "Authenticated users can insert gynecologists" ON gynecologists
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policy for authenticated users to update data
CREATE POLICY "Authenticated users can update gynecologists" ON gynecologists
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Step 7: Create function to update data quality indicators
CREATE OR REPLACE FUNCTION update_data_quality_indicators()
RETURNS TRIGGER AS $$
BEGIN
    NEW.has_phone = CASE WHEN NEW.phone IS NOT NULL AND NEW.phone != '' THEN 1 ELSE 0 END;
    NEW.has_website = CASE WHEN NEW.website IS NOT NULL AND NEW.website != '' AND NEW.website != 'N/A' THEN 1 ELSE 0 END;
    NEW.has_images = CASE WHEN NEW.image_urls IS NOT NULL AND array_length(NEW.image_urls, 1) > 0 THEN 1 ELSE 0 END;
    NEW.has_reviews = CASE WHEN NEW.total_ratings > 0 THEN 1 ELSE 0 END;
    NEW.has_accessibility_info = CASE WHEN NEW.accessibility_features_count > 0 THEN 1 ELSE 0 END;
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 8: Create trigger to automatically update quality indicators
CREATE TRIGGER trigger_update_data_quality
    BEFORE INSERT OR UPDATE ON gynecologists
    FOR EACH ROW
    EXECUTE FUNCTION update_data_quality_indicators();

-- Step 9: Sample data insertion (OPTIONAL - for testing)
-- UNCOMMENT THE LINES BELOW IF YOU WANT TO INSERT SAMPLE DATA FOR TESTING

/*
INSERT INTO gynecologists (
    id, name, state, city, address, phone, website, place_id,
    latitude, longitude, rating, total_ratings,
    review_1_author, review_1_rating, review_1_text, review_1_time,
    review_2_author, review_2_rating, review_2_text, review_2_time,
    review_3_author, review_3_rating, review_3_text, review_3_time,
    opening_hours, types, location_url, image_urls
) VALUES (
    'dr-sample-ahmedabad',
    'Dr. Sample Gynecologist',
    'Gujarat',
    'Ahmedabad',
    'Sample Women''s Hospital, Satellite, Ahmedabad, Gujarat',
    '+91-9876543210',
    'https://example.com',
    'ChIJsample123',
    23.0225,
    72.5714,
    4.5,
    25,
    'Priya Sharma',
    5,
    'Excellent doctor with great care and attention. Very professional and explains everything clearly. The clinic is clean and well-maintained. Highly recommend for all gynecological needs. She took time to understand my concerns and provided comprehensive treatment.',
    '2 weeks ago',
    'Anjali Patel',
    4,
    'Good experience overall. Dr. Sample is knowledgeable and patient. The staff is friendly and helpful. Wait time was reasonable and the consultation was thorough. She answered all my questions and made me feel comfortable throughout the visit.',
    '1 month ago',
    'Ritu Mehta',
    5,
    'Outstanding care during my pregnancy. Dr. Sample guided me through every step and made me feel comfortable. The delivery was smooth and I felt completely safe under her care. She is truly dedicated to her patients and provides excellent prenatal and postnatal care.',
    '3 months ago',
    'Monday: 9:00 AM - 6:00 PM; Tuesday: 9:00 AM - 6:00 PM; Wednesday: 9:00 AM - 6:00 PM; Thursday: 9:00 AM - 6:00 PM; Friday: 9:00 AM - 6:00 PM; Saturday: 9:00 AM - 2:00 PM; Sunday: Closed',
    'doctor,health,gynecologist,women_health',
    'https://maps.google.com/?cid=123456789',
    ARRAY['https://example.com/image1.jpg', 'https://example.com/image2.jpg']
);
*/

-- Step 10: Update existing data quality indicators (if you have existing data)
-- UNCOMMENT THIS IF YOU HAVE EXISTING DATA THAT NEEDS QUALITY INDICATORS UPDATED
/*
UPDATE gynecologists 
SET 
  has_phone = CASE WHEN phone IS NOT NULL AND phone != '' THEN 1 ELSE 0 END,
  has_website = CASE WHEN website IS NOT NULL AND website != '' AND website != 'N/A' THEN 1 ELSE 0 END,
  has_images = CASE WHEN image_urls IS NOT NULL AND array_length(image_urls, 1) > 0 THEN 1 ELSE 0 END,
  has_reviews = CASE WHEN total_ratings > 0 THEN 1 ELSE 0 END,
  has_accessibility_info = CASE WHEN accessibility_features_count > 0 THEN 1 ELSE 0 END,
  updated_at = NOW()
WHERE id IS NOT NULL;
*/ 