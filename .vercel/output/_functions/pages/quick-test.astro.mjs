import { c as createComponent, r as renderHead, e as renderTemplate, f as renderComponent, F as Fragment } from '../chunks/astro/server_Dv5ekixa.mjs';
import 'kleur/colors';
import { d as dbHelpers } from '../chunks/supabase_COpQ5vJy.mjs';
/* empty css                                      */
export { renderers } from '../renderers.mjs';

const $$QuickTest = createComponent(async ($$result, $$props, $$slots) => {
  let results = {
    maharashtraDocs: 0,
    soporeDocs: 0,
    searchDocs: 0,
    error: null
  };
  try {
    const maharashtraDoctors = await dbHelpers.getGynecologistsByState("Maharashtra");
    results.maharashtraDocs = maharashtraDoctors.length;
    const soporeDoctors = await dbHelpers.getGynecologistsByCity("Sopore");
    results.soporeDocs = soporeDoctors.length;
    const searchDoctors = await dbHelpers.searchGynecologistsByName("Dr");
    results.searchDocs = searchDoctors.length;
  } catch (error) {
    results.error = error.message;
  }
  return renderTemplate`<html data-astro-cid-xl2dt42q> <head><title>Quick Filter Test</title>${renderHead()}</head> <body data-astro-cid-xl2dt42q> <h1 data-astro-cid-xl2dt42q>Quick Filter Function Test</h1> ${results.error ? renderTemplate`<div class="result error" data-astro-cid-xl2dt42q> <h3 data-astro-cid-xl2dt42q>❌ Error</h3> <p data-astro-cid-xl2dt42q>${results.error}</p> </div>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-xl2dt42q": true }, { "default": async ($$result2) => renderTemplate` <div class="result success" data-astro-cid-xl2dt42q> <h3 data-astro-cid-xl2dt42q>✅ Maharashtra State Filter</h3> <p data-astro-cid-xl2dt42q>Found: ${results.maharashtraDocs} doctors</p> </div> <div class="result success" data-astro-cid-xl2dt42q> <h3 data-astro-cid-xl2dt42q>✅ Sopore City Filter</h3> <p data-astro-cid-xl2dt42q>Found: ${results.soporeDocs} doctors</p> </div> <div class="result success" data-astro-cid-xl2dt42q> <h3 data-astro-cid-xl2dt42q>✅ Search for "Dr"</h3> <p data-astro-cid-xl2dt42q>Found: ${results.searchDocs} doctors</p> </div> ` })}`} <h3 data-astro-cid-xl2dt42q>Test URLs:</h3> <ul data-astro-cid-xl2dt42q> <li data-astro-cid-xl2dt42q><a href="/find-doctor?state=Maharashtra" data-astro-cid-xl2dt42q>Test Maharashtra on Find Doctor page</a></li> <li data-astro-cid-xl2dt42q><a href="/find-doctor?city=Sopore" data-astro-cid-xl2dt42q>Test Sopore on Find Doctor page</a></li> <li data-astro-cid-xl2dt42q><a href="/find-doctor?search=Dr" data-astro-cid-xl2dt42q>Test Search on Find Doctor page</a></li> </ul> </body></html>`;
}, "/Users/hirenthakkar/Desktop/gynecologist website/gynecologist-near-me/src/pages/quick-test.astro", void 0);

const $$file = "/Users/hirenthakkar/Desktop/gynecologist website/gynecologist-near-me/src/pages/quick-test.astro";
const $$url = "/quick-test";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$QuickTest,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
