import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { alternateLinks, routeMeta, staticBody, structuredData } from "./page-data.mjs";
import { renderSoftmoonBody } from "./softmoon-page.mjs";

const origin = "https://lavalabs.co.kr";
const distDir = new URL("../dist/", import.meta.url);
const indexPath = new URL("index.html", distDir);
const baseHtml = await readFile(indexPath, "utf8");

const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const replace = (html, pattern, value) => pattern.test(html) ? html.replace(pattern, value) : html;

function routeStructuredData(meta) {
  if (meta.page !== "softmoon") return structuredData(meta);
  const canonical = `${origin}${meta.path}`;
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
        description: meta.description,
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
        name: meta.title,
        description: meta.description,
        inLanguage: meta.lang,
        about: { "@id": `${origin}/soft_moon/#brand` },
        isPartOf: { "@type": "WebSite", name: "Lava Labs", url: `${origin}/` },
        primaryImageOfPage: { "@type": "ImageObject", url: `${origin}/assets/images/softmoon-og.png`, width: 1200, height: 630 }
      }
    ]
  };
}

function applySoftmoonHead(html) {
  html = replace(html, /<meta\s+name="application-name"[^>]*\/>/i, `<meta name="application-name" content="SoftMoon" />`);
  html = replace(html, /<meta\s+name="theme-color"[^>]*\/>/i, `<meta name="theme-color" content="#13212c" />`);
  html = replace(html, /<meta\s+property="og:site_name"[^>]*\/>/i, `<meta property="og:site_name" content="SoftMoon by Lava Labs" />`);
  html = replace(html, /<link\s+rel="icon"[^>]*\/>/i, `<link rel="icon" type="image/png" href="/assets/images/softmoon-icon.png" />`);
  html = replace(html, /<link\s+rel="apple-touch-icon"[^>]*\/>/i, `<link rel="apple-touch-icon" href="/assets/images/softmoon-icon.png" />`);

  html = html.replace(/\s*<link\s+rel="stylesheet"\s+crossorigin[^>]*href="\/assets\/[^"]+\.css"[^>]*>/gi, "");
  if (!html.includes('href="/softmoon.css"')) {
    html = html.replace(
      `<link rel="stylesheet" href="/business-info.css" />`,
      `<link rel="stylesheet" href="/business-info.css" />\n    <link rel="stylesheet" href="/softmoon.css" />`
    );
  }
  return html;
}

function renderRoute(meta) {
  let html = baseHtml;
  const canonical = `${origin}${meta.path}`;
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const socialImage = meta.page === "softmoon" ? `${origin}/assets/images/softmoon-og.png` : `${origin}/assets/images/og-image.jpg`;
  const socialImageAlt = meta.page === "softmoon" ? "SoftMoon paper, object and digital brand preview" : "Lava Labs creative studio";

  html = replace(html, /<html\s+lang="[^"]*">/i, `<html lang="${meta.lang}">`);
  html = replace(html, /<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  html = replace(html, /<meta\s+name="description"[\s\S]*?\/>/i, `<meta name="description" content="${description}" />`);
  html = replace(html, /<link\s+rel="canonical"[^>]*\/>/i, `<link rel="canonical" href="${canonical}" />`);
  html = html.replace(/\s*<link\s+rel="alternate"[^>]*\/>/gi, "");

  const alternates = alternateLinks(meta);
  if (alternates) html = html.replace(`<link rel="canonical" href="${canonical}" />`, `<link rel="canonical" href="${canonical}" />\n${alternates}`);

  html = replace(html, /<meta\s+property="og:title"[^>]*\/>/i, `<meta property="og:title" content="${title}" />`);
  html = replace(html, /<meta\s+property="og:description"[^>]*\/>/i, `<meta property="og:description" content="${description}" />`);
  html = replace(html, /<meta\s+property="og:url"[^>]*\/>/i, `<meta property="og:url" content="${canonical}" />`);
  html = replace(html, /<meta\s+property="og:locale"[^>]*\/>/i, `<meta property="og:locale" content="${meta.locale}" />`);
  html = replace(html, /<meta\s+property="og:image"[^>]*\/>/i, `<meta property="og:image" content="${socialImage}" />`);
  html = replace(html, /<meta\s+property="og:image:alt"[^>]*\/>/i, `<meta property="og:image:alt" content="${socialImageAlt}" />`);
  html = replace(html, /<meta\s+name="twitter:title"[^>]*\/>/i, `<meta name="twitter:title" content="${title}" />`);
  html = replace(html, /<meta\s+name="twitter:description"[^>]*\/>/i, `<meta name="twitter:description" content="${description}" />`);
  html = replace(html, /<meta\s+name="twitter:image"[^>]*\/>/i, `<meta name="twitter:image" content="${socialImage}" />`);
  html = replace(html, /<meta\s+name="twitter:image:alt"[^>]*\/>/i, `<meta name="twitter:image:alt" content="${socialImageAlt}" />`);

  const jsonLd = JSON.stringify(routeStructuredData(meta)).replaceAll("<", "\\u003c");
  html = replace(html, /<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i, `<script id="route-structured-data" type="application/ld+json">${jsonLd}</script>`);

  if (meta.page === "softmoon") html = applySoftmoonHead(html);

  const body = meta.page === "softmoon" ? renderSoftmoonBody(meta.localeKey) : staticBody(meta);
  if (body) {
    html = replace(html, /<div\s+id="root"><\/div>/i, `<div id="root">${body}</div>`);
    html = html.replace(/\s*<script\s+type="module"[^>]*src="[^"]+"[^>]*><\/script>/gi, "");
  }
  return html;
}

for (const meta of Object.values(routeMeta)) {
  const output = new URL(meta.output, distDir);
  await mkdir(dirname(output.pathname), { recursive: true });
  await writeFile(output, renderRoute(meta), "utf8");
}

const projectRoutes = [
  { output: "projects/follow-checker/index.html", path: "/projects/follow-checker/", lang: "ko", locale: "ko_KR", title: "맞팔체커 서비스 소개 | Lava Labs", description: "Lava Labs가 개발 중인 맞팔체커 웹 도구의 작동 방식과 데이터 처리 원칙을 소개합니다." },
  { output: "en/projects/follow-checker/index.html", path: "/en/projects/follow-checker/", lang: "en", locale: "en_US", title: "Follow Checker Case Study | Lava Labs", description: "A case study of the Follow Checker web tool developed by Lava Labs." },
  { output: "jp/projects/follow-checker/index.html", path: "/jp/projects/follow-checker/", lang: "ja", locale: "ja_JP", title: "フォローチェッカー紹介 | Lava Labs", description: "Lava Labsが開発するフォローチェッカーWebツールの紹介ページです。" }
];

for (const meta of projectRoutes) {
  let html = baseHtml;
  const canonical = `${origin}${meta.path}`;
  html = replace(html, /<html\s+lang="[^"]*">/i, `<html lang="${meta.lang}">`);
  html = replace(html, /<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);
  html = replace(html, /<meta\s+name="description"[\s\S]*?\/>/i, `<meta name="description" content="${escapeHtml(meta.description)}" />`);
  html = replace(html, /<link\s+rel="canonical"[^>]*\/>/i, `<link rel="canonical" href="${canonical}" />`);
  const output = new URL(meta.output, distDir);
  await mkdir(dirname(output.pathname), { recursive: true });
  await writeFile(output, html, "utf8");
}

const sitemapPath = new URL("sitemap.xml", distDir);
let sitemap = await readFile(sitemapPath, "utf8");
const projectUrls = projectRoutes.map((meta) => `  <url><loc>${origin}${meta.path}</loc><lastmod>2026-06-28</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`).join("\n");
if (!sitemap.includes("/projects/follow-checker/")) sitemap = sitemap.replace("</urlset>", `${projectUrls}\n</urlset>`);
await writeFile(sitemapPath, sitemap, "utf8");

const notFound = renderRoute({ ...routeMeta.home, title: "Page not found | Lava Labs", description: "The requested page could not be found." })
  .replace(/<meta\s+name="robots"[^>]*\/>/i, `<meta name="robots" content="noindex, follow" />`);
await writeFile(new URL("404.html", distDir), notFound, "utf8");
await writeFile(new URL("CNAME", distDir), "lavalabs.co.kr\n", "utf8");
await writeFile(new URL("deploy-version.json", distDir), JSON.stringify({ sha: process.env.GITHUB_SHA ?? "local", builtAt: new Date().toISOString() }, null, 2), "utf8");

console.log("Prepared routes:", Object.values(routeMeta).map((meta) => meta.path).concat(projectRoutes.map((meta) => meta.path)).join(", "));
