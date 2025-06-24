-- Sample insert statements for testing
-- Run this in Supabase SQL Editor to test the new schema

INSERT INTO gynecologists (
    id, name, state, city, address, phone, website, place_id,
    latitude, longitude, rating, total_ratings,
    review_1_author, review_1_rating, review_1_text, review_1_time,
    review_2_author, review_2_rating, review_2_text, review_2_time,
    review_3_author, review_3_rating, review_3_text, review_3_time,
    opening_hours, types, location_url, image_urls
) VALUES (
    'test-dr-sample-ahmedabad',
    'Dr. Sample Doctor',
    'Gujarat',
    'Ahmedabad',
    'Sample Hospital, Ahmedabad',
    '+91-9876543210',
    'https://example.com',
    'ChIJsample123',
    23.0225,
    72.5714,
    4.5,
    25,
    'Priya Sharma',
    5,
    'Excellent doctor with great care and attention. Very professional and explains everything clearly. The clinic is clean and well-maintained. Highly recommend for all gynecological needs.',
    '2 weeks ago',
    'Anjali Patel',
    4,
    'Good experience overall. Dr. Sample is knowledgeable and patient. The staff is friendly and helpful. Wait time was reasonable and the consultation was thorough.',
    '1 month ago',
    'Ritu Mehta',
    5,
    'Outstanding care during my pregnancy. Dr. Sample guided me through every step and made me feel comfortable. The delivery was smooth and I felt completely safe under her care.',
    '3 months ago',
    'Monday: 9:00 AM - 6:00 PM; Tuesday: 9:00 AM - 6:00 PM; Wednesday: 9:00 AM - 6:00 PM; Thursday: 9:00 AM - 6:00 PM; Friday: 9:00 AM - 6:00 PM; Saturday: 9:00 AM - 2:00 PM; Sunday: Closed',
    'doctor,health,gynecologist',
    'https://maps.google.com/?cid=123456789',
    'https://example.com/image1.jpg'
);

-- Add another sample record
INSERT INTO gynecologists (
    id, name, state, city, address, phone, website, place_id,
    latitude, longitude, rating, total_ratings,
    review_1_author, review_1_rating, review_1_text, review_1_time,
    review_2_author, review_2_rating, review_2_text, review_2_time,
    opening_hours, types, location_url
) VALUES (
    'test-dr-example-mumbai',
    'Dr. Example Gynecologist',
    'Maharashtra',
    'Mumbai',
    'Example Clinic, Bandra, Mumbai',
    '+91-9876543211',
    'https://example2.com',
    'ChIJexample456',
    19.0760,
    72.8777,
    4.2,
    18,
    'Sneha Desai',
    4,
    'Very caring and professional doctor. She takes time to listen to all concerns and provides detailed explanations. The clinic has modern facilities and the staff is courteous.',
    '1 week ago',
    'Kavya Singh',
    5,
    'Exceptional care and expertise. Dr. Example helped me with a complex condition and I am very grateful for her dedication. The treatment was effective and I felt supported throughout.',
    '2 weeks ago',
    'Monday: 10:00 AM - 7:00 PM; Tuesday: 10:00 AM - 7:00 PM; Wednesday: 10:00 AM - 7:00 PM; Thursday: 10:00 AM - 7:00 PM; Friday: 10:00 AM - 7:00 PM; Saturday: 10:00 AM - 4:00 PM; Sunday: Closed',
    'doctor,health,gynecologist,women_health',
    'https://maps.google.com/?cid=987654321'
); 