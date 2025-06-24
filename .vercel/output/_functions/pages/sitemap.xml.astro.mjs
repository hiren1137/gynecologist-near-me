import { i as indianStates } from '../chunks/states_lLa6Cggs.mjs';
import { d as dbHelpers } from '../chunks/supabase_COpQ5vJy.mjs';
export { renderers } from '../renderers.mjs';

async function GET() {
  const baseUrl = 'https://gynecologistnearme.in';
  
  try {
    // Static pages with priorities
    const staticPages = [
      { url: '', priority: '1.0', changefreq: 'daily' },
      { url: '/about', priority: '0.8', changefreq: 'monthly' },
      { url: '/contact', priority: '0.7', changefreq: 'monthly' },
      { url: '/find-doctor', priority: '0.9', changefreq: 'weekly' },
      { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
      { url: '/terms', priority: '0.3', changefreq: 'yearly' }
    ];
    
    // State pages
    const statePages = indianStates.map(state => ({
      url: `/${state.slug}`,
      priority: '0.8',
      changefreq: 'weekly'
    }));
    
    // Get all cities from database (with fallback)
    let cityPages = [];
    let doctorPages = [];
    
    try {
      const citiesData = await dbHelpers.getAllCities();
      cityPages = citiesData.map(city => ({
        url: `/city/${city.slug}`,
        priority: '0.7',
        changefreq: 'weekly'
      }));
      
      // Get all doctors from database with comprehensive coverage
      console.log('🔄 Fetching doctors for sitemap...');
      const doctorsData = await dbHelpers.getAllDoctorsForSitemap();
      
      // Create doctor pages with proper URL structure matching /city/[city]/[doctor]
      const doctorPagesMap = new Map();
      doctorsData.forEach(doctor => {
        if (doctor.city_slug && doctor.slug) {
          const url = `/city/${doctor.city_slug}/${doctor.slug}`;
          // Use Map to automatically deduplicate
          doctorPagesMap.set(url, {
            url: url,
            priority: '0.6',
            changefreq: 'monthly'
          });
        }
      });
      
      doctorPages = Array.from(doctorPagesMap.values());
      
      // Fallback: If no doctors found, create sample doctor pages for major cities
      if (doctorPages.length === 0) {
        console.warn('No doctors found, creating fallback doctor pages');
        const sampleDoctors = [
          { city: 'ahmedabad', doctor: 'dr-priya-sharma' },
          { city: 'mumbai', doctor: 'dr-anjali-mehta' },
          { city: 'bangalore', doctor: 'dr-kavitha-reddy' },
          { city: 'delhi', doctor: 'dr-neha-gupta' },
          { city: 'pune', doctor: 'dr-sunita-patil' },
          { city: 'hyderabad', doctor: 'dr-lakshmi-rao' },
          { city: 'chennai', doctor: 'dr-meera-krishnan' },
          { city: 'kolkata', doctor: 'dr-rita-das' },
          { city: 'jaipur', doctor: 'dr-pooja-agarwal' },
          { city: 'lucknow', doctor: 'dr-rekha-sharma' }
        ];
        
        doctorPages = sampleDoctors.map(item => ({
          url: `/city/${item.city}/${item.doctor}`,
          priority: '0.6',
          changefreq: 'monthly'
        }));
      }
      
      console.log(`Sitemap generated: ${cityPages.length} cities, ${doctorPages.length} doctors`);
    } catch (dbError) {
      console.warn('Database connection failed for sitemap, using fallback cities:', dbError.message);
      
      // Fallback: Use hardcoded major cities from each state
      const fallbackCities = [
        'ahmedabad', 'surat', 'vadodara', 'rajkot', // Gujarat
        'mumbai', 'pune', 'nagpur', 'nashik', 'aurangabad', // Maharashtra
        'bangalore', 'mysore', 'hubli', 'mangalore', // Karnataka
        'hyderabad', 'warangal', 'nizamabad', // Telangana
        'chennai', 'coimbatore', 'madurai', 'salem', // Tamil Nadu
        'kolkata', 'howrah', 'durgapur', 'siliguri', // West Bengal
        'delhi', 'gurgaon', 'noida', 'faridabad', // Delhi/NCR
        'jaipur', 'jodhpur', 'udaipur', 'kota', // Rajasthan
        'lucknow', 'kanpur', 'agra', 'varanasi', // Uttar Pradesh
        'patna', 'gaya', 'muzaffarpur', // Bihar
        'bhopal', 'indore', 'gwalior', 'jabalpur', // Madhya Pradesh
        'thiruvananthapuram', 'kochi', 'kozhikode', 'thrissur', // Kerala
        'bhubaneswar', 'cuttack', 'rourkela', // Odisha
        'guwahati', 'silchar', 'dibrugarh', // Assam
        'chandigarh', 'ludhiana', 'amritsar', 'jalandhar', // Punjab
        'shimla', 'dharamshala', 'solan', // Himachal Pradesh
        'dehradun', 'haridwar', 'roorkee', // Uttarakhand
        'ranchi', 'jamshedpur', 'dhanbad', // Jharkhand
        'raipur', 'bhilai', 'korba', // Chhattisgarh
        'panaji', 'vasco-da-gama', 'margao', // Goa
        'imphal', 'thoubal', // Manipur
        'shillong', 'tura', // Meghalaya
        'aizawl', 'lunglei', // Mizoram
        'kohima', 'dimapur', // Nagaland
        'gangtok', 'namchi', // Sikkim
        'agartala', 'dharmanagar', // Tripura
        'itanagar', 'naharlagun', // Arunachal Pradesh
        'srinagar', 'jammu', 'sopore' // Jammu & Kashmir
      ];
      
      cityPages = fallbackCities.map(city => ({
        url: `/city/${city}`,
        priority: '0.7',
        changefreq: 'weekly'
      }));
    }
    
    // Combine all pages
    const allPages = [...staticPages, ...statePages, ...cityPages, ...doctorPages];
    
    // Generate XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      },
    });
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Fallback sitemap with static and state pages only
    const fallbackPages = [
      { url: '', priority: '1.0', changefreq: 'daily' },
      { url: '/about', priority: '0.8', changefreq: 'monthly' },
      { url: '/contact', priority: '0.7', changefreq: 'monthly' },
      { url: '/find-doctor', priority: '0.9', changefreq: 'weekly' },
      { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
      { url: '/terms', priority: '0.3', changefreq: 'yearly' },
      ...indianStates.map(state => ({
        url: `/${state.slug}`,
        priority: '0.8',
        changefreq: 'weekly'
      }))
    ];
    
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${fallbackPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new Response(fallbackSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes on error
      },
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
