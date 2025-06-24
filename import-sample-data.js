import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
import dotenv from 'dotenv'
dotenv.config()

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function importGujaratData() {
  try {
    console.log('📖 Reading Gujarat data...')
    
    // Read the Gujarat JSON data
    const gujaratDataPath = path.join(__dirname, 'src', 'data', 'states', 'gujarat.json')
    const gujaratData = JSON.parse(fs.readFileSync(gujaratDataPath, 'utf8'))
    
    console.log(`📊 Found ${gujaratData.length} gynecologists in Gujarat`)
    
    // Transform the data to match our database schema
    const transformedData = gujaratData.map((doctor, index) => ({
      name: doctor.name,
      state: doctor.state,
      city: doctor.city,
      address: doctor.address,
      phone: doctor.phone,
      rating: doctor.rating ? parseFloat(doctor.rating) : null,
      total_ratings: doctor.total_ratings || 0,
      website: doctor.website !== 'N/A' ? doctor.website : null,
      place_id: doctor.place_id,
      latitude: doctor.latitude ? parseFloat(doctor.latitude) : null,
      longitude: doctor.longitude ? parseFloat(doctor.longitude) : null,
      opening_hours: doctor.opening_hours !== 'N/A' ? doctor.opening_hours : null,
      types: doctor.types,
      price_level: doctor.price_level !== 'N/A' ? doctor.price_level : null,
      search_keyword: doctor.search_keyword,
      scraped_at: doctor.scraped_at,
      location_url: doctor.location_url,
      image_urls: doctor.image_urls || [],
      top_reviews: doctor.top_reviews || [],
      image_count: doctor.image_count || 0,
      review_count: doctor.review_count || 0,
      enhancement_status: doctor.enhancement_status,
      enhanced_at: doctor.enhanced_at
    }))
    
    console.log('💾 Inserting data into Supabase...')
    
    // Insert data in batches of 100
    const batchSize = 100
    let insertedCount = 0
    
    for (let i = 0; i < transformedData.length; i += batchSize) {
      const batch = transformedData.slice(i, i + batchSize)
      
      const { data, error } = await supabase
        .from('gynecologists')
        .insert(batch)
      
      if (error) {
        console.error(`❌ Error inserting batch ${Math.floor(i/batchSize) + 1}:`, error)
        continue
      }
      
      insertedCount += batch.length
      console.log(`✅ Inserted batch ${Math.floor(i/batchSize) + 1}: ${insertedCount}/${transformedData.length} records`)
    }
    
    console.log(`🎉 Successfully imported ${insertedCount} gynecologists from Gujarat!`)
    
  } catch (error) {
    console.error('💥 Import failed:', error.message)
  }
}

async function testConnection() {
  console.log('🔍 Testing Supabase connection...')
  
  try {
    const { data, error } = await supabase
      .from('gynecologists')
      .select('count', { count: 'exact', head: true })
    
    if (error) {
      console.error('❌ Connection test failed:', error)
      return false
    }
    
    console.log('✅ Connection successful!')
    return true
  } catch (error) {
    console.error('💥 Connection test failed:', error.message)
    return false
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting data import process...')
  
  // Test connection first
  const connectionOk = await testConnection()
  if (!connectionOk) {
    console.log('💡 Please check your .env file and make sure your Supabase credentials are correct.')
    return
  }
  
  // Import data
  await importGujaratData()
  
  console.log('✨ Import process completed!')
}

// Run if this file is executed directly
if (process.argv[1] === __filename) {
  main()
} 