import { createClient } from '@supabase/supabase-js';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const getEnvVar = (key, fallback) => {
  if (typeof import.meta !== "undefined" && Object.assign(__vite_import_meta_env__, { SUPABASE_URL: "https://cajddzsauxliholgbsfi.supabase.co", SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhamRkenNhdXhsaWhvbGdic2ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NzU3MjQsImV4cCI6MjA2NTU1MTcyNH0.Synv7-xMkCFONnVlsXTg9sj8uPwOpn0yPPdl3ODhE24", SUPABASE_SERVICE_ROLE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhamRkenNhdXhsaWhvbGdic2ZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTk3NTcyNCwiZXhwIjoyMDY1NTUxNzI0fQ.CX356h49qzx7MHY8koZFzix8Z5zfLqpCgr6VZHhhJKQ", _: process.env._ })) {
    return Object.assign(__vite_import_meta_env__, { SUPABASE_URL: "https://cajddzsauxliholgbsfi.supabase.co", SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhamRkenNhdXhsaWhvbGdic2ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NzU3MjQsImV4cCI6MjA2NTU1MTcyNH0.Synv7-xMkCFONnVlsXTg9sj8uPwOpn0yPPdl3ODhE24", SUPABASE_SERVICE_ROLE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhamRkenNhdXhsaWhvbGdic2ZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTk3NTcyNCwiZXhwIjoyMDY1NTUxNzI0fQ.CX356h49qzx7MHY8koZFzix8Z5zfLqpCgr6VZHhhJKQ", _: process.env._ })[key] || fallback;
  }
  return process.env[key] || fallback;
};
const supabaseUrl = getEnvVar("SUPABASE_URL", "https://cajddzsauxliholgbsfi.supabase.co");
const supabaseAnonKey = getEnvVar("SUPABASE_ANON_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhamRkenNhdXhsaWhvbGdic2ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NzU3MjQsImV4cCI6MjA2NTU1MTcyNH0.Synv7-xMkCFONnVlsXTg9sj8uPwOpn0yPPdl3ODhE24");
const supabaseServiceKey = getEnvVar("SUPABASE_SERVICE_ROLE_KEY", "sbp_933f5607a695f85b2ace589c46459019715af7ac");
createClient(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
const dataClient = supabaseAdmin;
const cache = {
  states: null,
  topCities: null,
  lastFetch: null,
  // Cache for 30 minutes to improve performance
  CACHE_DURATION: 30 * 60 * 1e3
};
const isCacheValid = () => {
  return cache.lastFetch && Date.now() - cache.lastFetch < cache.CACHE_DURATION;
};
const dbHelpers = {
  // Get all unique states from gynecologists data
  async getStates() {
    try {
      if (isCacheValid() && cache.states) {
        console.log("📋 Using cached states data");
        return cache.states;
      }
      console.log("🔄 Fetching fresh states data...");
      let allStates = [];
      let from = 0;
      const limit = 1e3;
      const maxPages = 8;
      for (let page = 0; page < maxPages; page++) {
        console.log(`Fetching states page ${page + 1}/${maxPages}...`);
        const { data, error } = await dataClient.from("gynecologists_stage").select("state").not("state", "is", null).order("state").range(from, from + limit - 1);
        if (error) {
          console.error(`Error on page ${page + 1}:`, error);
          from += limit;
          continue;
        }
        if (!data || data.length === 0) break;
        allStates.push(...data);
        from += limit;
        if (page < maxPages - 1) {
          await new Promise((resolve) => setTimeout(resolve, 1e3));
        }
        if (data.length < limit) break;
      }
      const uniqueStates = [...new Set(allStates.map((item) => item.state))].filter(Boolean);
      const statesWithCities = await Promise.all(
        uniqueStates.map(async (stateName) => {
          let allCities = [];
          let from2 = 0;
          const limit2 = 1e3;
          while (true) {
            const { data: cityData } = await dataClient.from("gynecologists_stage").select("city").eq("state", stateName).not("city", "is", null).range(from2, from2 + limit2 - 1);
            if (!cityData || cityData.length === 0) break;
            allCities.push(...cityData);
            from2 += limit2;
            if (cityData.length < limit2) break;
          }
          const cities = [...new Set(allCities.map((item) => item.city))].filter(Boolean).sort();
          return {
            name: stateName,
            code: stateName.substring(0, 2).toUpperCase(),
            cities
          };
        })
      );
      cache.states = statesWithCities;
      cache.lastFetch = Date.now();
      console.log(`✅ Cached ${statesWithCities.length} states data`);
      return statesWithCities;
    } catch (error) {
      console.error("Error fetching states:", error);
      return [];
    }
  },
  // Get gynecologists by state (with pagination for all 8 pages)
  async getGynecologistsByState(stateName) {
    try {
      let allDoctors = [];
      let from = 0;
      const limit = 1e3;
      const maxPages = 8;
      for (let page = 0; page < maxPages; page++) {
        const { data, error } = await dataClient.from("gynecologists_stage").select("*").eq("state", stateName).order("rating", { ascending: false }).order("total_ratings", { ascending: false }).range(from, from + limit - 1);
        if (error) {
          console.error(`Error on state doctors page ${page + 1}:`, error);
          from += limit;
          continue;
        }
        if (!data || data.length === 0) break;
        allDoctors.push(...data);
        from += limit;
        if (page < maxPages - 1) {
          await new Promise((resolve) => setTimeout(resolve, 800));
        }
        if (data.length < limit) break;
      }
      return allDoctors;
    } catch (error) {
      console.error("Error fetching gynecologists by state:", error);
      return [];
    }
  },
  // Get gynecologists by city (with pagination for all 8 pages)
  async getGynecologistsByCity(cityName) {
    try {
      let allDoctors = [];
      let from = 0;
      const limit = 1e3;
      const maxPages = 8;
      for (let page = 0; page < maxPages; page++) {
        const { data, error } = await dataClient.from("gynecologists_stage").select("*").eq("city", cityName).order("rating", { ascending: false }).order("total_ratings", { ascending: false }).range(from, from + limit - 1);
        if (error) {
          console.error(`Error on city doctors page ${page + 1}:`, error);
          from += limit;
          continue;
        }
        if (!data || data.length === 0) break;
        allDoctors.push(...data);
        from += limit;
        if (page < maxPages - 1) {
          await new Promise((resolve) => setTimeout(resolve, 800));
        }
        if (data.length < limit) break;
      }
      return allDoctors;
    } catch (error) {
      console.error("Error fetching gynecologists by city:", error);
      return [];
    }
  },
  // Get single gynecologist by ID
  async getGynecologistById(id) {
    try {
      const { data, error } = await dataClient.from("gynecologists_stage").select("*").eq("id", id).single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching gynecologist by ID:", error);
      return null;
    }
  },
  // Get single gynecologist by place_id (for URL compatibility)
  async getGynecologistByPlaceId(placeId) {
    try {
      const { data, error } = await dataClient.from("gynecologists_stage").select("*").eq("place_id", placeId).single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching gynecologist by place_id:", error);
      return null;
    }
  },
  // Get gynecologist by ID (string format like 'Andhra_Pradesh_1')
  async getGynecologistByStringId(id) {
    try {
      const { data, error } = await dataClient.from("gynecologists_stage").select("*").eq("id", id).single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching gynecologist by string ID:", error);
      return null;
    }
  },
  // Search gynecologists with filters
  async searchGynecologists(filters = {}) {
    try {
      let query = dataClient.from("gynecologists_stage").select("*");
      if (filters.city) {
        query = query.eq("city", filters.city);
      }
      if (filters.state) {
        query = query.eq("state", filters.state);
      }
      if (filters.name) {
        query = query.ilike("name", `%${filters.name}%`);
      }
      if (filters.minRating) {
        query = query.gte("rating", filters.minRating);
      }
      if (filters.hasPhone) {
        query = query.not("phone", "is", null);
      }
      if (filters.hasWebsite) {
        query = query.not("website", "is", null);
      }
      query = query.order("rating", { ascending: false }).order("total_ratings", { ascending: false });
      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error searching gynecologists:", error);
      return [];
    }
  },
  // Search gynecologists by name (for search functionality)
  async searchGynecologistsByName(searchQuery) {
    try {
      const { data, error } = await dataClient.from("gynecologists_stage").select("*").ilike("name", `%${searchQuery}%`).order("rating", { ascending: false }).order("total_ratings", { ascending: false }).limit(50);
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error searching gynecologists by name:", error);
      return [];
    }
  },
  // Get all doctor names for auto-suggest
  async getAllDoctorNames() {
    try {
      const { data, error } = await dataClient.from("gynecologists_stage").select("name").not("name", "is", null).order("name", { ascending: true }).limit(1e3);
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching all doctor names:", error);
      return [];
    }
  },
  // Get all cities for sitemap generation
  async getAllCities() {
    try {
      const { data, error } = await dataClient.from("gynecologists_stage").select("city").not("city", "is", null).order("city", { ascending: true });
      if (error) throw error;
      const uniqueCities = [...new Set(data.map((item) => item.city))];
      return uniqueCities.map((city) => ({
        name: city,
        slug: city.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").trim()
      }));
    } catch (error) {
      console.error("Error fetching all cities:", error);
      return [];
    }
  },
  // Get doctors with limit for sitemap generation
  async getDoctorsWithLimit(limit = 1e3) {
    try {
      const { data, error } = await dataClient.from("gynecologists_stage").select("id, name, city, state").not("name", "is", null).not("city", "is", null).order("rating", { ascending: false }).limit(limit);
      if (error) throw error;
      return data.map((doctor) => ({
        ...doctor,
        slug: doctor.name.replace(/dr\.?\s*/gi, "dr-").toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").trim(),
        city_slug: doctor.city.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").trim()
      }));
    } catch (error) {
      console.error("Error fetching doctors with limit:", error);
      return [];
    }
  },
  // Get all doctors for comprehensive sitemap generation
  async getAllDoctorsForSitemap() {
    try {
      console.log("🔄 Fetching all doctors for sitemap...");
      let allDoctors = [];
      let from = 0;
      const limit = 1e3;
      const maxPages = 10;
      for (let page = 0; page < maxPages; page++) {
        const { data, error } = await dataClient.from("gynecologists_stage").select("id, name, city, state, rating").not("name", "is", null).not("city", "is", null).order("rating", { ascending: false }).order("name", { ascending: true }).range(from, from + limit - 1);
        if (error) {
          console.error(`Error fetching doctors page ${page + 1}:`, error);
          break;
        }
        if (!data || data.length === 0) break;
        const doctorsWithSlugs = data.map((doctor) => ({
          ...doctor,
          slug: doctor.name.replace(/dr\.?\s*/gi, "dr-").toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").trim(),
          city_slug: doctor.city.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").trim()
        }));
        allDoctors.push(...doctorsWithSlugs);
        from += limit;
        if (page < maxPages - 1 && data.length === limit) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
        if (data.length < limit) break;
      }
      console.log(`✅ Fetched ${allDoctors.length} doctors for sitemap`);
      return allDoctors;
    } catch (error) {
      console.error("Error fetching all doctors for sitemap:", error);
      return [];
    }
  },
  // Get top cities - one famous city from each of the 31 states of India
  async getTopCities() {
    try {
      if (isCacheValid() && cache.topCities) {
        console.log("📋 Using cached top cities data");
        return cache.topCities;
      }
      console.log("🔄 Fetching fresh top cities...");
      const topCities = [
        "Hyderabad",
        // Andhra Pradesh/Telangana
        "Itanagar",
        // Arunachal Pradesh  
        "Guwahati",
        // Assam
        "Patna",
        // Bihar
        "Raipur",
        // Chhattisgarh
        "New Delhi",
        // Delhi
        "Panaji",
        // Goa
        "Ahmedabad",
        // Gujarat
        "Gurgaon",
        // Haryana
        "Shimla",
        // Himachal Pradesh
        "Srinagar",
        // Jammu and Kashmir
        "Ranchi",
        // Jharkhand
        "Bangalore",
        // Karnataka
        "Kochi",
        // Kerala
        "Bhopal",
        // Madhya Pradesh
        "Mumbai",
        // Maharashtra
        "Imphal",
        // Manipur
        "Shillong",
        // Meghalaya
        "Aizawl",
        // Mizoram
        "Kohima",
        // Nagaland
        "Bhubaneswar",
        // Odisha
        "Ludhiana",
        // Punjab
        "Jaipur",
        // Rajasthan
        "Gangtok",
        // Sikkim
        "Chennai",
        // Tamil Nadu
        "Agartala",
        // Tripura
        "Lucknow",
        // Uttar Pradesh
        "Dehradun",
        // Uttarakhand
        "Kolkata",
        // West Bengal
        "Chandigarh",
        // Chandigarh
        "Puducherry"
        // Puducherry
      ];
      cache.topCities = topCities;
      if (!cache.lastFetch) cache.lastFetch = Date.now();
      console.log(`✅ Cached ${topCities.length} top cities`);
      return topCities;
    } catch (error) {
      console.error("Error fetching top cities:", error);
      return ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Pune", "Jaipur"];
    }
  },
  // Get statistics for homepage
  async getStats() {
    try {
      const { count, error } = await dataClient.from("gynecologists_stage").select("*", { count: "exact", head: true });
      if (error) throw error;
      const { data: stateData } = await dataClient.from("gynecologists_stage").select("state");
      const { data: cityData } = await dataClient.from("gynecologists_stage").select("city");
      const { data: ratingData } = await dataClient.from("gynecologists_stage").select("rating").not("rating", "is", null);
      const uniqueStates = new Set(stateData?.map((item) => item.state).filter(Boolean));
      const uniqueCities = new Set(cityData?.map((item) => item.city).filter(Boolean));
      let averageRating = 4.8;
      if (ratingData && ratingData.length > 0) {
        const validRatings = ratingData.map((item) => parseFloat(item.rating)).filter((rating) => !isNaN(rating) && rating > 0);
        if (validRatings.length > 0) {
          const sum = validRatings.reduce((acc, rating) => acc + rating, 0);
          averageRating = (sum / validRatings.length).toFixed(1);
        }
      }
      return {
        totalDoctors: count || 0,
        totalStates: uniqueStates.size,
        totalCities: uniqueCities.size,
        averageRating: parseFloat(averageRating)
      };
    } catch (error) {
      console.error("Error fetching stats:", error);
      return {
        totalDoctors: 0,
        totalStates: 0,
        totalCities: 0,
        averageRating: 4.8
      };
    }
  }
};

export { dbHelpers as d };
