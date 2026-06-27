import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const distDir = new URL("../dist/", import.meta.url);
const indexPath = new URL("index.html", distDir);
const html = await readFile(indexPath, "utf8");

const routes = ["en", "jp", "terms", "privacy"];

for (const route of routes) {
  const routeIndex = new URL(`${route}/index.html`, distDir);
  await mkdir(dirname(routeIndex.pathname), { recursive: true });
  await writeFile(routeIndex, html, "utf8");
}

await copyFile(indexPath, new URL("404.html", distDir));
await writeFile(new URL("CNAME", distDir), "lavalabs.co.kr\n", "utf8");

console.log("Prepared GitHub Pages routes:", routes.join(", "));
