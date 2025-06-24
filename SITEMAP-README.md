# Sitemap Implementation

## Overview
This website generates a comprehensive XML sitemap that includes all static and dynamic pages for optimal SEO performance.

## Sitemap Structure

### 1. Static Pages (6 pages)
- **Homepage** (`/`) - Priority: 1.0, Daily updates
- **About** (`/about`) - Priority: 0.8, Monthly updates  
- **Contact** (`/contact`) - Priority: 0.7, Monthly updates
- **Find Doctor** (`/find-doctor`) - Priority: 0.9, Weekly updates
- **Privacy Policy** (`/privacy`) - Priority: 0.3, Yearly updates
- **Terms of Service** (`/terms`) - Priority: 0.3, Yearly updates

### 2. State Pages (31 pages)
- All Indian states and union territories
- Format: `/{state-slug}` (e.g., `/gujarat`, `/maharashtra`)
- Priority: 0.8, Weekly updates

### 3. City Pages (Dynamic)
- All cities where gynecologists are available
- Format: `/city/{city-slug}` (e.g., `/city/ahmedabad`, `/city/mumbai`)
- Priority: 0.7, Weekly updates
- **Fallback**: If database is unavailable, includes 50+ major cities from all states

### 4. Doctor Pages (Dynamic)
- Individual doctor profile pages
- Format: `/city/{city-slug}/{doctor-slug}` (e.g., `/city/ahmedabad/dr-priya-sharma`)
- Priority: 0.6, Monthly updates
- **Limit**: Top 500 doctors (by rating) for performance

## Technical Implementation

### Database Integration
- Fetches real-time data from Supabase database
- Includes proper error handling and fallback mechanisms
- Uses optimized queries with limits to prevent timeouts

### Fallback System
If database connection fails, the sitemap automatically falls back to:
- Static pages only
- All 31 state pages
- 50+ hardcoded major cities from each state

### Performance Optimizations
- **Caching**: 1-hour cache for successful responses, 5-minute cache for errors
- **Limits**: Maximum 500 doctors to prevent memory issues
- **Error Handling**: Graceful degradation with fallback data

### SEO Features
- **Proper XML Structure**: Valid XML sitemap format
- **Priority Levels**: Different priorities for different page types
- **Change Frequency**: Appropriate update frequencies for each page type
- **Last Modified**: Dynamic last modified dates

## Robots.txt Configuration

The `robots.txt` file is configured to:
- Allow all major search engines (Google, Bing, Yahoo, DuckDuckGo, Baidu)
- Explicitly allow important directories (`/city/`, `/doctor/`)
- Block potential admin/test directories
- Reference the sitemap location
- Set appropriate crawl delay (1 second)
- Include host directive for canonicalization

## Access URLs

- **Sitemap**: `https://gynecologistnearme.in/sitemap.xml`
- **Robots.txt**: `https://gynecologistnearme.in/robots.txt`

## Expected Sitemap Size

With full database connectivity:
- **Current Production**: ~7,800+ pages (comprehensive coverage)
- **Breakdown**:
  - Static pages: 6 (homepage, about, contact, find-doctor, privacy, terms)
  - State pages: 31 (all Indian states and union territories)
  - City pages: 100+ (all cities with gynecologists)
  - Doctor profile pages: 7,700+ (individual doctor profiles)
- **Fallback**: ~87 pages minimum (6 static + 31 states + 50 fallback cities + 10 sample doctors)

## Monitoring

The sitemap generation includes console logging for monitoring:
- Success: Logs number of cities and doctors included
- Errors: Logs database connection issues and falls back gracefully
- Performance: Tracks generation time and data retrieval

## Future Enhancements

1. **Sitemap Index**: For larger datasets, split into multiple sitemaps
2. **Image Sitemaps**: Include doctor images and clinic photos
3. **News Sitemaps**: For blog posts or health articles
4. **Video Sitemaps**: For educational videos or doctor introductions
5. **Automated Submission**: Auto-submit to search engines on updates 