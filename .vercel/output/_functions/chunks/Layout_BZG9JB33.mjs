import { c as createComponent, a as createAstro, b as addAttribute, r as renderHead, d as renderSlot, e as renderTemplate } from './astro/server_Dv5ekixa.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                           */

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "Find the best gynecologists near you in India. Expert women's healthcare specialists with verified credentials and patient reviews.", keywords = "gynecologist, women's health, obstetrics, gynecology, pregnancy, India", canonical } = Astro2.props;
  const canonicalUrl = canonical || `https://www.gynecologistnearme.in${Astro2.url.pathname}`;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="keywords"${addAttribute(keywords, "content")}><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title><!-- Canonical URL --><link rel="canonical"${addAttribute(canonicalUrl, "href")}><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(Astro2.url, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image" content="/og-image.jpg"><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(Astro2.url, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image" content="/og-image.jpg"><!-- Preconnect to Google Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-gray-50 text-gray-900" data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/hirenthakkar/Desktop/gynecologist website/gynecologist-near-me/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
