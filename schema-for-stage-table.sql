-- Update schema for gynecologists_stage table
-- Run this in your Supabase SQL Editor

-- Step 1: Drop existing views that might reference the old table
DROP VIEW IF EXISTS gynecologists_premium;
DROP VIEW IF EXISTS gynecologists_accessible;
DROP VIEW IF EXISTS gynecologists_with_full_reviews;

-- Step 2: Create views for the new gynecologists_stage table
CREATE OR REPLACE VIEW gynecologists_premium AS
SELECT *
FROM gynecologists_stage
WHERE rating >= 4.0 
  AND total_ratings >= 5
  AND has_phone = 1
ORDER BY rating DESC, total_ratings DESC;

-- Create a view for accessible places
CREATE OR REPLACE VIEW gynecologists_accessible AS
SELECT *
FROM gynecologists_stage
WHERE accessibility_features_count > 0
ORDER BY accessibility_features_count DESC, rating DESC;

-- Create a view for doctors with full reviews
CREATE OR REPLACE VIEW gynecologists_with_full_reviews AS
SELECT *
FROM gynecologists_stage
WHERE (review_1_text IS NOT NULL AND review_1_text != '') 
   OR (review_2_text IS NOT NULL AND review_2_text != '') 
   OR (review_3_text IS NOT NULL AND review_3_text != '')
ORDER BY rating DESC, total_ratings DESC;

-- Step 3: Enable Row Level Security (RLS) for the new table
ALTER TABLE gynecologists_stage ENABLE ROW LEVEL SECURITY;

-- Step 4: Create policies for access control on the new table
-- Policy for public read access
CREATE POLICY "Public read access stage" ON gynecologists_stage
    FOR SELECT USING (true);

-- Policy for authenticated users to insert data
CREATE POLICY "Authenticated users can insert stage" ON gynecologists_stage
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policy for authenticated users to update data
CREATE POLICY "Authenticated users can update stage" ON gynecologists_stage
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Step 5: Create function to update data quality indicators for stage table
CREATE OR REPLACE FUNCTION update_data_quality_indicators_stage()
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

-- Step 6: Create trigger to automatically update quality indicators for stage table
DROP TRIGGER IF EXISTS trigger_update_data_quality_stage ON gynecologists_stage;
CREATE TRIGGER trigger_update_data_quality_stage
    BEFORE INSERT OR UPDATE ON gynecologists_stage
    FOR EACH ROW
    EXECUTE FUNCTION update_data_quality_indicators_stage();

-- Step 7: Update existing data quality indicators (if you have existing data)
UPDATE gynecologists_stage 
SET 
  has_phone = CASE WHEN phone IS NOT NULL AND phone != '' THEN 1 ELSE 0 END,
  has_website = CASE WHEN website IS NOT NULL AND website != '' AND website != 'N/A' THEN 1 ELSE 0 END,
  has_images = CASE WHEN image_urls IS NOT NULL AND array_length(image_urls, 1) > 0 THEN 1 ELSE 0 END,
  has_reviews = CASE WHEN total_ratings > 0 THEN 1 ELSE 0 END,
  has_accessibility_info = CASE WHEN accessibility_features_count > 0 THEN 1 ELSE 0 END,
  updated_at = NOW()
WHERE id IS NOT NULL; 