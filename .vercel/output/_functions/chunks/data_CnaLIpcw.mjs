import { d as dbHelpers } from './supabase_COpQ5vJy.mjs';

function createSlug(text) {
  return text.toLowerCase().replace(/dr\.?\s*/gi, "dr-").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").trim();
}
function transformSupabaseDoctor(supabaseData) {
  const doctorName = supabaseData.name?.replace(/ - .*$/, "") || "Unknown Doctor";
  const citySlug = createSlug(supabaseData.city || "");
  const stateSlug = createSlug(supabaseData.state || "");
  return {
    id: supabaseData.id,
    name: doctorName,
    slug: createSlug(doctorName),
    qualification: extractQualification(supabaseData.name || ""),
    specialization: extractSpecialization(supabaseData.name || ""),
    experience: generateExperience(),
    rating: parseFloat(supabaseData.rating) || 0,
    totalReviews: parseInt(supabaseData.total_ratings) || 0,
    hospital: extractHospitalName(supabaseData.address || ""),
    address: supabaseData.address || "",
    city: supabaseData.city || "",
    citySlug,
    state: supabaseData.state || "",
    stateSlug,
    phone: supabaseData.phone || "",
    website: supabaseData.website === "N/A" ? "" : supabaseData.website || "",
    images: parseImageUrls(supabaseData.image_urls),
    openingHours: parseOpeningHours(supabaseData.opening_hours || ""),
    about: generateAbout(doctorName, supabaseData.address || ""),
    latitude: parseFloat(supabaseData.latitude) || 0,
    longitude: parseFloat(supabaseData.longitude) || 0,
    placeId: supabaseData.place_id || "",
    locationUrl: supabaseData.location_url || "",
    reviewsData: parseReviews(supabaseData)
  };
}
function extractQualification(name) {
  if (name.toLowerCase().includes("fertility") || name.toLowerCase().includes("infertility")) {
    return "MBBS, MD (Gynecology), Fertility Specialist";
  }
  if (name.toLowerCase().includes("laparoscopic") || name.toLowerCase().includes("robotic")) {
    return "MBBS, MD (Gynecology), Laparoscopic Surgery Specialist";
  }
  if (name.toLowerCase().includes("oncology")) {
    return "MBBS, MD (Gynecology), Gynecological Oncology";
  }
  return "MBBS, MD (Obstetrics & Gynecology)";
}
function extractSpecialization(name) {
  const specializations = ["Gynecology", "Obstetrics"];
  if (name.toLowerCase().includes("fertility") || name.toLowerCase().includes("infertility")) {
    specializations.push("Fertility Treatment");
  }
  if (name.toLowerCase().includes("laparoscopic")) {
    specializations.push("Laparoscopic Surgery");
  }
  if (name.toLowerCase().includes("pregnancy")) {
    specializations.push("High-Risk Pregnancy");
  }
  if (name.toLowerCase().includes("pcod") || name.toLowerCase().includes("pcos")) {
    specializations.push("PCOS/PCOD Treatment");
  }
  if (name.toLowerCase().includes("painless delivery")) {
    specializations.push("Painless Delivery");
  }
  return specializations;
}
function generateExperience() {
  const years = Math.floor(Math.random() * 15) + 5;
  return `${years} years`;
}
function extractHospitalName(address) {
  const parts = address.split(",");
  return parts[0]?.trim() || "Private Clinic";
}
function parseImageUrls(imageUrls) {
  if (Array.isArray(imageUrls)) {
    return imageUrls;
  }
  if (typeof imageUrls === "string" && imageUrls) {
    return imageUrls.split(" | ").filter((url) => url.trim());
  }
  return [];
}
function parseOpeningHours(hoursString) {
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const hours = {};
  if (!hoursString || hoursString === "N/A") {
    days.forEach((day) => hours[day] = "9:00 AM - 6:00 PM");
    return hours;
  }
  if (hoursString.includes("Open 24 hours")) {
    days.forEach((day) => hours[day] = "Open 24 hours");
    return hours;
  }
  const dayPattern = /(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday): ([^;]+)/g;
  let match;
  while ((match = dayPattern.exec(hoursString)) !== null) {
    const day = match[1].toLowerCase();
    const time = match[2].trim();
    hours[day] = time;
  }
  days.forEach((day) => {
    if (!hours[day]) {
      hours[day] = "9:00 AM - 6:00 PM";
    }
  });
  return hours;
}
function parseReviews(supabaseData) {
  if (!supabaseData) return [];
  try {
    const reviews = [];
    for (let i = 1; i <= 3; i++) {
      const author = supabaseData[`review_${i}_author`];
      const rating = supabaseData[`review_${i}_rating`];
      const text = supabaseData[`review_${i}_text`];
      const time = supabaseData[`review_${i}_time`];
      if (text && text.trim() !== "") {
        reviews.push({
          author: author || "Verified Patient",
          rating: Math.round(parseFloat(rating)) || 5,
          text: text.trim(),
          time: time || "Recent",
          profilePhoto: ""
        });
      }
    }
    if (reviews.length > 0) {
      return reviews;
    }
    const reviewsData = supabaseData.top_reviews || supabaseData.reviews_summary || "";
    if (Array.isArray(reviewsData)) {
      return reviewsData.map((review) => ({
        author: review.author || "Verified Patient",
        rating: review.rating || 5,
        text: review.text || review.review || review.content || review.full_text || "",
        time: review.time || review.relative_time_description || "Recent",
        profilePhoto: review.profile_photo || ""
      })).filter((r) => r.text && r.text.trim() !== "").slice(0, 5);
    }
    if (typeof reviewsData === "string") {
      if (reviewsData.startsWith("[")) {
        const parsed = JSON.parse(reviewsData);
        if (Array.isArray(parsed)) {
          return parsed.map((review) => ({
            author: review.author || "Verified Patient",
            rating: review.rating || 5,
            text: review.text || review.review || review.content || review.full_text || "",
            time: review.time || review.relative_time_description || "Recent",
            profilePhoto: review.profile_photo || ""
          })).filter((r) => r.text && r.text.trim() !== "").slice(0, 5);
        }
      }
      const reviewParts = reviewsData.split(" | ");
      const fallbackReviews = [];
      reviewParts.forEach((reviewText) => {
        const match = reviewText.match(/Review \d+: (.+?) \((\d+)\/5\) - (.+)/);
        if (match) {
          fallbackReviews.push({
            author: match[1],
            rating: parseInt(match[2]),
            text: match[3],
            time: "Recently",
            profilePhoto: ""
          });
        }
      });
      return fallbackReviews.slice(0, 5);
    }
    return [];
  } catch (error) {
    console.log("Error parsing reviews:", error);
    return [];
  }
}
function generateAbout(name, address) {
  return `${name} is a highly qualified gynecologist providing comprehensive women's healthcare services. Located at ${address}, they offer expert care in obstetrics, gynecology, and women's health with a focus on patient comfort and advanced medical care.`;
}
async function getAllStates() {
  try {
    const statesData = await dbHelpers.getStates();
    return statesData.map((state) => ({
      name: state.name,
      slug: createSlug(state.name),
      cities: state.cities.map((city) => ({
        name: city,
        slug: createSlug(city),
        state: state.name,
        stateSlug: createSlug(state.name)
      }))
    }));
  } catch (error) {
    console.error("Error fetching states:", error);
    return [];
  }
}
async function getStateBySlug(stateSlug) {
  const states = await getAllStates();
  return states.find((state) => state.slug === stateSlug);
}
async function getCitiesByState(stateSlug) {
  const state = await getStateBySlug(stateSlug);
  return state?.cities || [];
}
async function getCityBySlug(stateSlug, citySlug) {
  const cities = await getCitiesByState(stateSlug);
  return cities.find((city) => city.slug === citySlug);
}
async function getAllStateCityCombinations() {
  const states = await getAllStates();
  const combinations = [];
  states.forEach((state) => {
    state.cities.forEach((city) => {
      combinations.push({
        state: state.slug,
        city: city.slug
      });
    });
  });
  return combinations;
}
async function getDoctorsForCity(stateSlug, citySlug) {
  try {
    const state = await getStateBySlug(stateSlug);
    const city = await getCityBySlug(stateSlug, citySlug);
    if (!state || !city) {
      return [];
    }
    const supabaseDoctors = await dbHelpers.getGynecologistsByCity(city.name);
    return supabaseDoctors.map(transformSupabaseDoctor);
  } catch (error) {
    console.error("Error fetching doctors for city:", error);
    return [];
  }
}
async function getDoctorBySlug(stateSlug, citySlug, doctorSlug) {
  try {
    const doctors = await getDoctorsForCity(stateSlug, citySlug);
    return doctors.find((doctor) => doctor.slug === doctorSlug);
  } catch (error) {
    console.error("Error fetching doctor by slug:", error);
    return void 0;
  }
}

export { getAllStateCityCombinations as a, getDoctorsForCity as b, getDoctorBySlug as g };
