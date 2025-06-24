import { dbHelpers } from './supabase.js';

// Types
export interface State {
  name: string;
  slug: string;
  cities: City[];
}

export interface City {
  name: string;
  slug: string;
  state: string;
  stateSlug: string;
}

export interface Doctor {
  id: string;
  name: string;
  slug: string;
  qualification: string;
  specialization: string[];
  experience: string;
  rating: number;
  totalReviews: number;
  hospital: string;
  address: string;
  city: string;
  citySlug: string;
  state: string;
  stateSlug: string;
  phone: string;
  website: string;
  images: string[];
  openingHours: Record<string, string>;
  about: string;
  latitude: number;
  longitude: number;
  placeId: string;
  locationUrl: string;
  reviewsData: Review[];
}

export interface Review {
  author: string;
  rating: number;
  text: string;
  time: string;
  profilePhoto: string;
}

export interface StateData {
  state: {
    name: string;
    slug: string;
  };
  cities: Array<{
    name: string;
    slug: string;
    doctors: Doctor[];
  }>;
}

// Utility function to create URL-friendly slugs
export function createSlug(text: string): string {
  if (!text || text.trim() === '') {
    return 'doctor'; // Fallback for empty text
  }
  
  const slug = text
    .toLowerCase()
    .replace(/dr\.?\s*/gi, 'dr-') // Handle "Dr." prefix
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
    .trim();
  
  // If still empty after processing, return fallback
  return slug || 'doctor';
}

// Transform Supabase data to Doctor interface
function transformSupabaseDoctor(supabaseData: any): Doctor {
  const doctorName = supabaseData.name?.replace(/ - .*$/, '') || 'Unknown Doctor';
  const citySlug = createSlug(supabaseData.city || '');
  const stateSlug = createSlug(supabaseData.state || '');
  
  return {
    id: supabaseData.id,
    name: doctorName,
    slug: createSlug(doctorName),
    qualification: extractQualification(supabaseData.name || ''),
    specialization: extractSpecialization(supabaseData.name || ''),
    experience: generateExperience(),
    rating: parseFloat(supabaseData.rating) || 0,
    totalReviews: parseInt(supabaseData.total_ratings) || 0,
    hospital: extractHospitalName(supabaseData.address || ''),
    address: supabaseData.address || '',
    city: supabaseData.city || '',
    citySlug: citySlug,
    state: supabaseData.state || '',
    stateSlug: stateSlug,
    phone: supabaseData.phone || '',
    website: supabaseData.website === 'N/A' ? '' : (supabaseData.website || ''),
    images: parseImageUrls(supabaseData.image_urls),
    openingHours: parseOpeningHours(supabaseData.opening_hours || ''),
    about: generateAbout(doctorName, supabaseData.address || ''),
    latitude: parseFloat(supabaseData.latitude) || 0,
    longitude: parseFloat(supabaseData.longitude) || 0,
    placeId: supabaseData.place_id || '',
    locationUrl: supabaseData.location_url || '',
    reviewsData: parseReviews(supabaseData)
  };
}

function extractQualification(name: string): string {
  if (name.toLowerCase().includes('fertility') || name.toLowerCase().includes('infertility')) {
    return 'MBBS, MD (Gynecology), Fertility Specialist';
  }
  if (name.toLowerCase().includes('laparoscopic') || name.toLowerCase().includes('robotic')) {
    return 'MBBS, MD (Gynecology), Laparoscopic Surgery Specialist';
  }
  if (name.toLowerCase().includes('oncology')) {
    return 'MBBS, MD (Gynecology), Gynecological Oncology';
  }
  return 'MBBS, MD (Obstetrics & Gynecology)';
}

function extractSpecialization(name: string): string[] {
  const specializations = ['Gynecology', 'Obstetrics'];
  
  if (name.toLowerCase().includes('fertility') || name.toLowerCase().includes('infertility')) {
    specializations.push('Fertility Treatment');
  }
  if (name.toLowerCase().includes('laparoscopic')) {
    specializations.push('Laparoscopic Surgery');
  }
  if (name.toLowerCase().includes('pregnancy')) {
    specializations.push('High-Risk Pregnancy');
  }
  if (name.toLowerCase().includes('pcod') || name.toLowerCase().includes('pcos')) {
    specializations.push('PCOS/PCOD Treatment');
  }
  if (name.toLowerCase().includes('painless delivery')) {
    specializations.push('Painless Delivery');
  }
  
  return specializations;
}

function generateExperience(): string {
  const years = Math.floor(Math.random() * 15) + 5; // 5-20 years
  return `${years} years`;
}

function extractHospitalName(address: string): string {
  const parts = address.split(',');
  return parts[0]?.trim() || 'Private Clinic';
}

function parseImageUrls(imageUrls: string | string[]): string[] {
  if (Array.isArray(imageUrls)) {
    return imageUrls;
  }
  if (typeof imageUrls === 'string' && imageUrls) {
    return imageUrls.split(' | ').filter(url => url.trim());
  }
  return [];
}

function parseOpeningHours(hoursString: string): Record<string, string> {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const hours: Record<string, string> = {};
  
  if (!hoursString || hoursString === 'N/A') {
    days.forEach(day => hours[day] = '9:00 AM - 6:00 PM');
    return hours;
  }
  
  if (hoursString.includes('Open 24 hours')) {
    days.forEach(day => hours[day] = 'Open 24 hours');
    return hours;
  }
  
  // Parse the hours string
  const dayPattern = /(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday): ([^;]+)/g;
  let match;
  
  while ((match = dayPattern.exec(hoursString)) !== null) {
    const day = match[1].toLowerCase();
    const time = match[2].trim();
    hours[day] = time;
  }
  
  // Fill missing days with default hours
  days.forEach(day => {
    if (!hours[day]) {
      hours[day] = '9:00 AM - 6:00 PM';
    }
  });
  
  return hours;
}

function parseReviews(supabaseData: any): Review[] {
  if (!supabaseData) return [];
  
  try {
    const reviews: Review[] = [];
    
    // Parse individual review columns (review_1_*, review_2_*, review_3_*)
    for (let i = 1; i <= 3; i++) {
      const author = supabaseData[`review_${i}_author`];
      const rating = supabaseData[`review_${i}_rating`];
      const text = supabaseData[`review_${i}_text`];
      const time = supabaseData[`review_${i}_time`];
  
      if (text && text.trim() !== '') {
        reviews.push({
          author: author || 'Verified Patient',
          rating: Math.round(parseFloat(rating)) || 5,
          text: text.trim(),
          time: time || 'Recent',
          profilePhoto: ''
        });
      }
    }
    
    // If we have individual reviews, return them
    if (reviews.length > 0) {
      return reviews;
    }
    
    // Fallback to old format for backward compatibility
    const reviewsData = supabaseData.top_reviews || supabaseData.reviews_summary || '';
    
    // Handle array of review objects from top_reviews field
    if (Array.isArray(reviewsData)) {
      return reviewsData.map(review => ({
        author: review.author || 'Verified Patient',
        rating: review.rating || 5,
        text: review.text || review.review || review.content || review.full_text || '',
        time: review.time || review.relative_time_description || 'Recent',
        profilePhoto: review.profile_photo || ''
      })).filter(r => r.text && r.text.trim() !== '').slice(0, 5);
    }
    
    // Handle string format (JSON array or other formats)
    if (typeof reviewsData === 'string') {
      if (reviewsData.startsWith('[')) {
        const parsed = JSON.parse(reviewsData);
        if (Array.isArray(parsed)) {
          return parsed.map(review => ({
            author: review.author || 'Verified Patient',
            rating: review.rating || 5,
            text: review.text || review.review || review.content || review.full_text || '',
            time: review.time || review.relative_time_description || 'Recent',
            profilePhoto: review.profile_photo || ''
          })).filter(r => r.text && r.text.trim() !== '').slice(0, 5);
        }
      }
      
      // Try old format as fallback
      const reviewParts = reviewsData.split(' | ');
      const fallbackReviews: Review[] = [];
      
      reviewParts.forEach(reviewText => {
        const match = reviewText.match(/Review \d+: (.+?) \((\d+)\/5\) - (.+)/);
        if (match) {
          fallbackReviews.push({
            author: match[1],
            rating: parseInt(match[2]),
            text: match[3],
            time: 'Recently',
            profilePhoto: ''
          });
        }
      });
      
      return fallbackReviews.slice(0, 5);
    }
    
    return [];
  } catch (error) {
    console.log('Error parsing reviews:', error);
    return [];
  }
}

function generateAbout(name: string, address: string): string {
  return `${name} is a highly qualified gynecologist providing comprehensive women's healthcare services. Located at ${address}, they offer expert care in obstetrics, gynecology, and women's health with a focus on patient comfort and advanced medical care.`;
}

// Get all states from Supabase
export async function getAllStates(): Promise<State[]> {
  try {
    const statesData = await dbHelpers.getStates();
    return statesData.map(state => ({
      name: state.name,
      slug: createSlug(state.name),
      cities: state.cities.map(city => ({
        name: city,
        slug: createSlug(city),
        state: state.name,
        stateSlug: createSlug(state.name)
      }))
    }));
  } catch (error) {
    console.error('Error fetching states:', error);
    return [];
  }
}

// Get state by slug
export async function getStateBySlug(stateSlug: string): Promise<State | undefined> {
  const states = await getAllStates();
  return states.find(state => state.slug === stateSlug);
}

// Get cities by state
export async function getCitiesByState(stateSlug: string): Promise<City[]> {
  const state = await getStateBySlug(stateSlug);
  return state?.cities || [];
}

// Get city by slug
export async function getCityBySlug(stateSlug: string, citySlug: string): Promise<City | undefined> {
  const cities = await getCitiesByState(stateSlug);
  return cities.find(city => city.slug === citySlug);
}

// Get all state slugs
export async function getAllStateSlugs(): Promise<string[]> {
  const states = await getAllStates();
  return states.map(state => state.slug);
}

// Get all city slugs for a state
export async function getAllCitySlugs(stateSlug: string): Promise<string[]> {
  const cities = await getCitiesByState(stateSlug);
  return cities.map(city => city.slug);
}

// Get all state-city combinations
export async function getAllStateCityCombinations(): Promise<Array<{state: string, city: string}>> {
  const states = await getAllStates();
  const combinations: Array<{state: string, city: string}> = [];
  
  states.forEach(state => {
    state.cities.forEach(city => {
      combinations.push({
        state: state.slug,
        city: city.slug
      });
    });
  });
  
  return combinations;
}

// Get doctors for a city
export async function getDoctorsForCity(stateSlug: string, citySlug: string): Promise<Doctor[]> {
  try {
    const state = await getStateBySlug(stateSlug);
    const city = await getCityBySlug(stateSlug, citySlug);
    
    if (!state || !city) {
      return [];
    }
    
    const supabaseDoctors = await dbHelpers.getGynecologistsByCity(city.name);
    return supabaseDoctors.map(transformSupabaseDoctor);
  } catch (error) {
    console.error('Error fetching doctors for city:', error);
    return [];
  }
}

// Get doctor by slug
export async function getDoctorBySlug(stateSlug: string, citySlug: string, doctorSlug: string): Promise<Doctor | undefined> {
  try {
    const doctors = await getDoctorsForCity(stateSlug, citySlug);
    return doctors.find(doctor => doctor.slug === doctorSlug);
  } catch (error) {
    console.error('Error fetching doctor by slug:', error);
    return undefined;
  }
}

// Get all doctor slugs for a city
export async function getAllDoctorSlugs(stateSlug: string, citySlug: string): Promise<string[]> {
  const doctors = await getDoctorsForCity(stateSlug, citySlug);
  return doctors.map(doctor => doctor.slug);
}

// Get all state-city-doctor combinations
export async function getAllStateCityDoctorCombinations(): Promise<Array<{state: string, city: string, doctor: string}>> {
  const combinations: Array<{state: string, city: string, doctor: string}> = [];
  const stateCityCombos = await getAllStateCityCombinations();
  
  console.log(`📊 Processing ${stateCityCombos.length} cities for doctor pages...`);
  
  // Process all cities, but in batches to avoid timeouts
  const batchSize = 10;
  for (let i = 0; i < stateCityCombos.length; i += batchSize) {
    const batch = stateCityCombos.slice(i, i + batchSize);
    console.log(`🔄 Processing cities batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(stateCityCombos.length/batchSize)} (${batch.length} cities)`);
    
    const batchPromises = batch.map(async (combo) => {
      try {
        const doctors = await getDoctorsForCity(combo.state, combo.city);
        const validDoctors = doctors.filter(doctor => doctor.slug && doctor.slug.trim() !== '');
        
        if (validDoctors.length > 0) {
          console.log(`✅ Found ${validDoctors.length} doctors in ${combo.city}`);
        }
        
        return validDoctors.map(doctor => ({
          state: combo.state,
          city: combo.city,
          doctor: doctor.slug
        }));
      } catch (error) {
        console.error(`❌ Error fetching doctors for ${combo.state}/${combo.city}:`, error);
        return [];
      }
    });
    
    const batchResults = await Promise.all(batchPromises);
    batchResults.forEach(result => combinations.push(...result));
    
    // Small delay to prevent overwhelming the database
    if (i + batchSize < stateCityCombos.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  console.log(`🎉 Generated ${combinations.length} doctor profile pages`);
  return combinations;
}

// Search doctors across all locations
export async function searchDoctors(query: string, filters?: {
  city?: string;
  state?: string;
  minRating?: number;
}): Promise<Doctor[]> {
  try {
    const searchFilters = {
      name: query,
      ...filters
    };
    
    const supabaseDoctors = await dbHelpers.searchGynecologists(searchFilters);
    return supabaseDoctors.map(transformSupabaseDoctor);
  } catch (error) {
    console.error('Error searching doctors:', error);
    return [];
  }
} 