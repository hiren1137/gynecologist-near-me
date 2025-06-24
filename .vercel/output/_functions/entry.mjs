import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_DxpKncs-.mjs';
import { manifest } from './manifest_ClGz760r.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/city/_city_/_doctor_.astro.mjs');
const _page4 = () => import('./pages/city/_city_.astro.mjs');
const _page5 = () => import('./pages/contact.astro.mjs');
const _page6 = () => import('./pages/find-doctor.astro.mjs');
const _page7 = () => import('./pages/privacy.astro.mjs');
const _page8 = () => import('./pages/quick-test.astro.mjs');
const _page9 = () => import('./pages/sitemap.xml.astro.mjs');
const _page10 = () => import('./pages/terms.astro.mjs');
const _page11 = () => import('./pages/test-data.astro.mjs');
const _page12 = () => import('./pages/_state_.astro.mjs');
const _page13 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/city/[city]/[doctor].astro", _page3],
    ["src/pages/city/[city].astro", _page4],
    ["src/pages/contact.astro", _page5],
    ["src/pages/find-doctor.astro", _page6],
    ["src/pages/privacy.astro", _page7],
    ["src/pages/quick-test.astro", _page8],
    ["src/pages/sitemap.xml.js", _page9],
    ["src/pages/terms.astro", _page10],
    ["src/pages/test-data.astro", _page11],
    ["src/pages/[state].astro", _page12],
    ["src/pages/index.astro", _page13]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "65bec5f1-4846-4fc1-9d12-5cca38136370",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
