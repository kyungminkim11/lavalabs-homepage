import { readFile, writeFile } from "node:fs/promises";
import { renderSoftmoonBody } from "./softmoon-page-professional.mjs";

const origin = "https://lavalabs.co.kr";
const distDir = new URL("../dist/", import.meta.url);

const routes = [
  {
    output: "soft_moon/index.html",
    path: "/soft_moon/",
    locale: "ko",
    lang: "ko",
    title: "SoftMoon | 브랜드 오브젝트·패키지·디지털 경험 설계",
    description: "SoftMoon은 인쇄물, 소형 오브제, 패키징과 QR·모바일 웹을 하나의 브랜드 경험으로 설계하고 검증하는 Lava Labs의 자체 브랜드입니다.",
    imageAlt: "SoftMoon 브랜드 오브젝트, 패키지와 디지털 경험 개발 컬렉션"
  },
  {
    output: "en/soft_moon/index.html",
    path: "/en/soft_moon/",
    locale: "en",
    lang: "en",
    title: "SoftMoon | Brand Objects, Packaging and Digital Experiences",
    description: "SoftMoon is an in-house Lava Labs brand designing and validating print, small objects, packaging, QR and mobile web as one connected brand experience.",
    imageAlt: "SoftMoon development collection for brand objects, packaging and digital experiences"
  },
  {
    output: "jp/soft_moon/index.html",
    path: "/jp/soft_moon/",
    locale: "jp",
    lang: "ja",
    title: "SoftMoon | ブランドオブジェ・パッケージ・デジタル体験設計",
    description: "SoftMoonは、印刷物、小さなオブジェ、パッケージ、QR・モバイルWebを一つのブランド体験として設計・検証するLava Labsの自社ブランドです。",
    imageAlt: "SoftMoonのブランドオブジェ、パッケージ、デジタル体験の開発コレクション"
  }
];

const escapeHtml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll('"', "&quot;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

const replace = (html, pattern, value) => pattern.test(html) ? html.replace(pattern, value) : html;

function structuredData(route) {
  const canonical = `${origin}${route.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Brand",
        "@id": `${origin}/soft_moon/#brand`,
        name: "SoftMoon",
        alternateName: "Soft Moon",
        url: canonical,
        logo: `${origin}/assets/images/softmoon-icon.png`,
        image: `${origin}/assets/images/softmoon-og.png`,
        description: route.description,
        slogan: "Small objects, long afterglow.",
        parentOrganization: {
          "@type": "Organization",
          "@id": `${origin}/#organization`,
          name: "Lava Labs",
          url: `${origin}/`,
          email: "info@lavalabs.co.kr"
        }
      },
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: route.title,
        description: route.description,
        inLanguage: route.lang,
        about: { "@id": `${origin}/soft_moon/#brand` },
        isPartOf: { "@type": "WebSite", name: "Lava Labs", url: `${origin}/` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${origin}/assets/images/softmoon-og.png`,
          width: 1200,
          height: 630
        }
      },
      {
        "@type": "CreativeWork",
        "@id": `${canonical}#development-collection`,
        name: route.locale === "ko" ? "SoftMoon 개발 컬렉션" : route.locale === "jp" ? "SoftMoon 開発コレクション" : "SoftMoon Development Collection",
        creator: { "@id": `${origin}/soft_moon/#brand` },
        about: ["Paper goods", "Small objects", "Packaging", "QR", "Mobile web"],
        inLanguage: route.lang
      }
    ]
  };
}

for (const route of routes) {
  const file = new URL(route.output, distDir);
  let html = await readFile(file, "utf8");
  const body = renderSoftmoonBody(route.locale);
  html = html.replace(/<div id="root">[\s\S]*<\/div>\s*<noscript>/, `<div id="root">${body}</div>\n    <noscript>`);

  if (!html.includes('href="/softmoon-professional.css"')) {
    html = html.replace(
      '<link rel="stylesheet" href="/softmoon.css" />',
      '<link rel="stylesheet" href="/softmoon.css" />\n    <link rel="stylesheet" href="/softmoon-professional.css" />'
    );
  }

  if (!html.includes('href="/softmoon-hero-layout-v2.css"')) {
    html = html.replace(
      '<link rel="stylesheet" href="/softmoon-professional.css" />',
      '<link rel="stylesheet" href="/softmoon-professional.css" />\n    <link rel="stylesheet" href="/softmoon-hero-layout-v2.css" />'
    );
  }

  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  html = replace(html, /<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  html = replace(html, /<meta\s+name="description"[^>]*\/>/i, `<meta name="description" content="${description}" />`);
  html = replace(html, /<meta\s+property="og:title"[^>]*\/>/i, `<meta property="og:title" content="${title}" />`);
  html = replace(html, /<meta\s+property="og:description"[^>]*\/>/i, `<meta property="og:description" content="${description}" />`);
  html = replace(html, /<meta\s+property="og:image:alt"[^>]*\/>/i, `<meta property="og:image:alt" content="${escapeHtml(route.imageAlt)}" />`);
  html = replace(html, /<meta\s+name="twitter:title"[^>]*\/>/i, `<meta name="twitter:title" content="${title}" />`);
  html = replace(html, /<meta\s+name="twitter:description"[^>]*\/>/i, `<meta name="twitter:description" content="${description}" />`);
  html = replace(html, /<meta\s+name="twitter:image:alt"[^>]*\/>/i, `<meta name="twitter:image:alt" content="${escapeHtml(route.imageAlt)}" />`);

  const jsonLd = JSON.stringify(structuredData(route)).replaceAll("<", "\\u003c");
  html = replace(html, /<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i, `<script id="route-structured-data" type="application/ld+json">${jsonLd}</script>`);

  await writeFile(file, html, "utf8");
}

console.log("Applied professional SoftMoon positioning, copy, sections, metadata, and overlap-safe hero layout.");
