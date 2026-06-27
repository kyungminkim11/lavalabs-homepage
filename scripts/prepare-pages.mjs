import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { alternateLinks, routeMeta, staticBody, structuredData } from "./page-data.mjs";

const origin = "https://lavalabs.co.kr";
const distDir = new URL("../dist/", import.meta.url);
const indexPath = new URL("index.html", distDir);
const baseHtml = await readFile(indexPath, "utf8");

const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const replace = (html, pattern, value) => pattern.test(html) ? html.replace(pattern, value) : html;

function renderRoute(meta) {
  let html = baseHtml;
  const canonical = `${origin}${meta.path}`;
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);

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
  html = replace(html, /<meta\s+name="twitter:title"[^>]*\/>/i, `<meta name="twitter:title" content="${title}" />`);
  html = replace(html, /<meta\s+name="twitter:description"[^>]*\/>/i, `<meta name="twitter:description" content="${description}" />`);

  const jsonLd = JSON.stringify(structuredData(meta)).replaceAll("<", "\\u003c");
  html = replace(html, /<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i, `<script id="route-structured-data" type="application/ld+json">${jsonLd}</script>`);

  const body = staticBody(meta);
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

const notFound = renderRoute({ ...routeMeta.home, title: "Page not found | Lava Labs", description: "The requested page could not be found." })
  .replace(/<meta\s+name="robots"[^>]*\/>/i, `<meta name="robots" content="noindex, follow" />`);
await writeFile(new URL("404.html", distDir), notFound, "utf8");
await writeFile(new URL("CNAME", distDir), "lavalabs.co.kr\n", "utf8");
await writeFile(new URL("deploy-version.json", distDir), JSON.stringify({ sha: process.env.GITHUB_SHA ?? "local", builtAt: new Date().toISOString() }, null, 2), "utf8");

console.log("Prepared routes:", Object.values(routeMeta).map((meta) => meta.path).join(", "));
