-- Gynecologist Database Schema
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS gynecologists (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    state TEXT NOT NULL,
    city TEXT NOT NULL,
    address TEXT,
    phone TEXT,
    rating NUMERIC(3,2),
    total_ratings INTEGER DEFAULT 0,
    website TEXT,
    place_id TEXT UNIQUE,
    latitude NUMERIC(10,8),
    longitude NUMERIC(11,8),
    opening_hours TEXT,
    types TEXT,
    price_level TEXT,
    search_keyword TEXT,
    scraped_at TIMESTAMP,
    location_url TEXT,
    image_urls TEXT[], -- Array of image URLs
    top_reviews TEXT[], -- Array of review texts
    image_count INTEGER DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    enhancement_status TEXT,
    enhanced_at TIMESTAMP,
    
    -- Additional fields for better functionality
    qualification TEXT,
    experience TEXT,
    specialization TEXT[],
    hospital TEXT,
    consultation_fee TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_gynecologists_state ON gynecologists(state);
CREATE INDEX IF NOT EXISTS idx_gynecologists_city ON gynecologists(city);
CREATE INDEX IF NOT EXISTS idx_gynecologists_rating ON gynecologists(rating DESC);
CREATE INDEX IF NOT EXISTS idx_gynecologists_place_id ON gynecologists(place_id);

-- Enable Row Level Security (RLS)
ALTER TABLE gynecologists ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read the data
CREATE POLICY "Anyone can view gynecologists" ON gynecologists
    FOR SELECT USING (true);

-- Create a policy that allows authenticated users to insert data
CREATE POLICY "Authenticated users can insert gynecologists" ON gynecologists
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create a policy that allows authenticated users to update data
CREATE POLICY "Authenticated users can update gynecologists" ON gynecologists
    FOR UPDATE USING (auth.role() = 'authenticated'); 