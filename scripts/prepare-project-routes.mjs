import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const origin = "https://lavalabs.co.kr";
const dist = new URL("../dist/", import.meta.url);
const baseHtml = await readFile(new URL("index.html", dist), "utf8");

const routes = [
  { output: "projects/emoseed/index.html", path: "/projects/emoseed/", lang: "ko", locale: "ko_KR", title: "EmoSeed 모바일 인터랙티브 서비스 사례 | Lava Labs", description: "식물 성향 테스트, 운세, 이름과 궁합을 하나의 모바일 디지털 정원으로 기획하고 개발한 EmoSeed 제작 사례입니다." },
  { output: "en/projects/emoseed/index.html", path: "/en/projects/emoseed/", lang: "en", locale: "en_US", title: "EmoSeed Interactive Service Case Study | Lava Labs", description: "A case study of the mobile-first EmoSeed digital garden, including content planning, interaction design, privacy, and development." },
  { output: "jp/projects/emoseed/index.html", path: "/jp/projects/emoseed/", lang: "ja", locale: "ja_JP", title: "EmoSeed モバイルサービス制作事例 | Lava Labs", description: "植物性格テスト、占い、名前、相性を一つのデジタルガーデンとして企画・開発したEmoSeedの制作事例です。" }
];

const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

for (const route of routes) {
  const canonical = `${origin}${route.path}`;
  const image = `${origin}/assets/project-previews/emoseed.svg`;
  const alternates = [
    ["ko", "/projects/emoseed/"],
    ["en", "/en/projects/emoseed/"],
    ["ja", "/jp/projects/emoseed/"],
    ["x-default", "/projects/emoseed/"]
  ].map(([lang, path]) => `<link rel="alternate" hreflang="${lang}" href="${origin}${path}" />`).join("\n");
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "EmoSeed",
    url: "https://emoseed.lavalabs.co.kr/",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    creator: { "@type": "Organization", name: "Lava Labs", url: origin },
    description: route.description
  }).replaceAll("<", "\\u003c");

  let html = baseHtml;
  html = html.replace(/<html\s+lang="[^"]*">/i, `<html lang="${route.lang}">`);
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);
  html = html.replace(/<meta\s+name="description"[^>]*\/>/i, `<meta name="description" content="${escapeHtml(route.description)}" />`);
  html = html.replace(/<link\s+rel="canonical"[^>]*\/>/i, `<link rel="canonical" href="${canonical}" />\n${alternates}`);
  html = html.replace(/<meta\s+property="og:title"[^>]*\/>/i, `<meta property="og:title" content="${escapeHtml(route.title)}" />`);
  html = html.replace(/<meta\s+property="og:description"[^>]*\/>/i, `<meta property="og:description" content="${escapeHtml(route.description)}" />`);
  html = html.replace(/<meta\s+property="og:url"[^>]*\/>/i, `<meta property="og:url" content="${canonical}" />`);
  html = html.replace(/<meta\s+property="og:locale"[^>]*\/>/i, `<meta property="og:locale" content="${route.locale}" />`);
  html = html.replace(/<meta\s+property="og:image"[^>]*\/>/i, `<meta property="og:image" content="${image}" />`);
  html = html.replace(/<meta\s+name="twitter:title"[^>]*\/>/i, `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`);
  html = html.replace(/<meta\s+name="twitter:description"[^>]*\/>/i, `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`);
  html = html.replace(/<meta\s+name="twitter:image"[^>]*\/>/i, `<meta name="twitter:image" content="${image}" />`);
  html = html.replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i, `<script id="route-structured-data" type="application/ld+json">${schema}</script>`);

  const output = new URL(route.output, dist);
  await mkdir(dirname(output.pathname), { recursive: true });
  await writeFile(output, html, "utf8");
}

const sitemapPath = new URL("sitemap.xml", dist);
let sitemap = await readFile(sitemapPath, "utf8");
for (const route of routes) {
  const loc = `${origin}${route.path}`;
  if (!sitemap.includes(`<loc>${loc}</loc>`)) sitemap = sitemap.replace("</urlset>", `  <url><loc>${loc}</loc><lastmod>2026-06-28</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>\n</urlset>`);
}
await writeFile(sitemapPath, sitemap, "utf8");
console.log("Prepared EmoSeed case study routes.");
