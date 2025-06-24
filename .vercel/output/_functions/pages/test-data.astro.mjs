import { c as createComponent, f as renderComponent, e as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_Dv5ekixa.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BZG9JB33.mjs';
import { d as dbHelpers } from '../chunks/supabase_COpQ5vJy.mjs';
export { renderers } from '../renderers.mjs';

const $$TestData = createComponent(async ($$result, $$props, $$slots) => {
  let testResults = {
    connectionTest: false,
    statesCount: 0,
    citiesCount: 0,
    doctorsCount: 0,
    sampleCities: [],
    sampleStates: [],
    mumbaiTest: 0,
    maharashtraTest: 0
  };
  try {
    console.log("\u{1F50C} Testing database connection...");
    const states = await dbHelpers.getStates();
    testResults.statesCount = states.length;
    testResults.sampleStates = states.slice(0, 5).map((s) => s.name);
    const cities = await dbHelpers.getTopCities();
    testResults.citiesCount = cities.length;
    testResults.sampleCities = cities.slice(0, 10);
    const allDoctors = await dbHelpers.searchGynecologists({});
    testResults.doctorsCount = allDoctors.length;
    const mumbaiDoctors = await dbHelpers.getGynecologistsByCity("Mumbai");
    testResults.mumbaiTest = mumbaiDoctors.length;
    const maharashtraDoctors = await dbHelpers.getGynecologistsByState("Maharashtra");
    testResults.maharashtraTest = maharashtraDoctors.length;
    if (allDoctors.length > 0) {
      const sampleDoctor = allDoctors[0];
      testResults.sampleDoctor = {
        name: sampleDoctor.name,
        city: sampleDoctor.city,
        state: sampleDoctor.state,
        rating: sampleDoctor.rating
      };
      const uniqueCities = [...new Set(allDoctors.slice(0, 100).map((d) => d.city))].filter(Boolean);
      const uniqueStates = [...new Set(allDoctors.slice(0, 100).map((d) => d.state))].filter(Boolean);
      testResults.actualCities = uniqueCities.slice(0, 20);
      testResults.actualStates = uniqueStates.slice(0, 15);
    }
    testResults.connectionTest = true;
    console.log("\u2705 Test Results:", testResults);
  } catch (error) {
    console.error("\u274C Database test failed:", error);
    testResults.error = error.message;
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Database Test Results" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-4xl mx-auto p-8"> <h1 class="text-3xl font-bold mb-6">Database Test Results</h1> <div class="space-y-6"> <!-- Connection Test --> <div class="bg-white p-6 rounded-lg shadow"> <h2 class="text-xl font-semibold mb-4">Connection Test</h2> <div${addAttribute(`p-4 rounded ${testResults.connectionTest ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`, "class")}> ${testResults.connectionTest ? "\u2705 Connected" : "\u274C Failed"} ${testResults.error && renderTemplate`<div class="mt-2">Error: ${testResults.error}</div>`} </div> </div> <!-- Basic Stats --> <div class="bg-white p-6 rounded-lg shadow"> <h2 class="text-xl font-semibold mb-4">Basic Stats</h2> <div class="grid grid-cols-2 md:grid-cols-4 gap-4"> <div class="text-center"> <div class="text-2xl font-bold text-blue-600">${testResults.statesCount}</div> <div class="text-sm text-gray-600">States</div> </div> <div class="text-center"> <div class="text-2xl font-bold text-green-600">${testResults.citiesCount}</div> <div class="text-sm text-gray-600">Top Cities</div> </div> <div class="text-center"> <div class="text-2xl font-bold text-purple-600">${testResults.doctorsCount}</div> <div class="text-sm text-gray-600">Total Doctors</div> </div> </div> </div> <!-- Filter Tests --> <div class="bg-white p-6 rounded-lg shadow"> <h2 class="text-xl font-semibold mb-4">Filter Tests</h2> <div class="grid grid-cols-2 gap-4"> <div class="p-4 bg-gray-50 rounded"> <div class="font-medium">Mumbai Filter</div> <div class="text-2xl font-bold text-blue-600">${testResults.mumbaiTest} doctors</div> </div> <div class="p-4 bg-gray-50 rounded"> <div class="font-medium">Maharashtra Filter</div> <div class="text-2xl font-bold text-green-600">${testResults.maharashtraTest} doctors</div> </div> </div> </div> <!-- Sample Data --> ${testResults.sampleDoctor && renderTemplate`<div class="bg-white p-6 rounded-lg shadow"> <h2 class="text-xl font-semibold mb-4">Sample Doctor</h2> <div class="bg-gray-50 p-4 rounded"> <div><strong>Name:</strong> ${testResults.sampleDoctor.name}</div> <div><strong>City:</strong> ${testResults.sampleDoctor.city}</div> <div><strong>State:</strong> ${testResults.sampleDoctor.state}</div> <div><strong>Rating:</strong> ${testResults.sampleDoctor.rating}</div> </div> </div>`} <!-- Actual Cities in Database --> ${testResults.actualCities && renderTemplate`<div class="bg-white p-6 rounded-lg shadow"> <h2 class="text-xl font-semibold mb-4">Actual Cities in Database (First 20)</h2> <div class="grid grid-cols-3 md:grid-cols-5 gap-2 text-sm"> ${testResults.actualCities.map((city) => renderTemplate`<div class="bg-blue-50 p-2 rounded text-center">${city}</div>`)} </div> </div>`} <!-- Actual States in Database --> ${testResults.actualStates && renderTemplate`<div class="bg-white p-6 rounded-lg shadow"> <h2 class="text-xl font-semibold mb-4">Actual States in Database (First 15)</h2> <div class="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm"> ${testResults.actualStates.map((state) => renderTemplate`<div class="bg-green-50 p-2 rounded text-center">${state}</div>`)} </div> </div>`} <!-- Sample Cities from Config --> <div class="bg-white p-6 rounded-lg shadow"> <h2 class="text-xl font-semibold mb-4">Sample Cities from Config</h2> <div class="grid grid-cols-3 md:grid-cols-5 gap-2 text-sm"> ${testResults.sampleCities.map((city) => renderTemplate`<div class="bg-gray-50 p-2 rounded text-center">${city}</div>`)} </div> </div> <!-- Test URLs --> <div class="bg-white p-6 rounded-lg shadow"> <h2 class="text-xl font-semibold mb-4">Test Filter URLs</h2> <div class="space-y-2"> <a href="/find-doctor?city=Mumbai" class="block bg-blue-50 p-3 rounded hover:bg-blue-100">
Test Mumbai Filter: /find-doctor?city=Mumbai
</a> <a href="/find-doctor?state=Maharashtra" class="block bg-green-50 p-3 rounded hover:bg-green-100">
Test Maharashtra Filter: /find-doctor?state=Maharashtra
</a> <a href="/find-doctor?search=Dr" class="block bg-purple-50 p-3 rounded hover:bg-purple-100">
Test Search Filter: /find-doctor?search=Dr
</a> </div> </div> </div> </div> ` })}`;
}, "/Users/hirenthakkar/Desktop/gynecologist website/gynecologist-near-me/src/pages/test-data.astro", void 0);

const $$file = "/Users/hirenthakkar/Desktop/gynecologist website/gynecologist-near-me/src/pages/test-data.astro";
const $$url = "/test-data";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$TestData,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
