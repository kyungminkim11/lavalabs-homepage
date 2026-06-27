import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { chromium } from "playwright";

const base = "http://127.0.0.1:4173";
const routes = [
  ["/", "Lava Labs", "https://lavalabs.co.kr/"],
  ["/en/", "Lava Labs", "https://lavalabs.co.kr/en/"],
  ["/jp/", "Lava Labs", "https://lavalabs.co.kr/jp/"],
  ["/projects/follow-checker/", "맞팔체커", "https://lavalabs.co.kr/projects/follow-checker/"],
  ["/en/projects/follow-checker/", "Follow Checker", "https://lavalabs.co.kr/en/projects/follow-checker/"],
  ["/jp/projects/follow-checker/", "フォローチェッカー", "https://lavalabs.co.kr/jp/projects/follow-checker/"],
  ["/terms/", "서비스 이용약관", "https://lavalabs.co.kr/terms/"],
  ["/privacy/", "개인정보처리방침", "https://lavalabs.co.kr/privacy/"],
  ["/soft_moon/", "SoftMoon", "https://lavalabs.co.kr/soft_moon/"],
  ["/en/soft_moon/", "SoftMoon", "https://lavalabs.co.kr/en/soft_moon/"],
  ["/jp/soft_moon/", "SoftMoon", "https://lavalabs.co.kr/jp/soft_moon/"]
];

const assert = (condition, message) => { if (!condition) throw new Error(message); };
const server = spawn("npm", ["run", "preview", "--", "--host", "127.0.0.1", "--port", "4173"], { stdio: "ignore" });
let browser;

try {
  const notFound = await readFile(new URL("../dist/404.html", import.meta.url), "utf8");
  assert(notFound.includes('content="noindex, follow"'), "Generated 404 page must be noindex");
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try { if ((await fetch(base)).ok) break; } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  for (const [path, heading, canonical] of routes) {
    const page = await context.newPage();
    const response = await page.goto(`${base}${path}`, { waitUntil: "domcontentloaded" });
    assert(response?.ok(), `${path} did not load`);
    await page.waitForSelector("h1");
    assert((await page.locator("h1").first().innerText()).includes(heading), `${path} has the wrong heading`);
    assert((await page.locator('link[rel="canonical"]').getAttribute("href")) === canonical, `${path} has the wrong canonical URL`);
    assert((await page.locator('meta[name="description"]').getAttribute("content") ?? "").length > 30, `${path} has a weak description`);
    assert(await page.locator('script[type="application/ld+json"]').count() > 0, `${path} has no structured data`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    assert(overflow <= 2, `${path} overflows horizontally`);
    if (["/", "/en/", "/jp/"].includes(path)) {
      assert(await page.locator('select[name="projectType"]').count() === 1, `${path} has no project selector`);
      assert(await page.locator('input[name="website"]').count() === 1, `${path} has no spam trap`);
      assert(await page.locator(".project-follow").count() === 1, `${path} has no Follow Checker card`);
      assert(await page.locator("iframe[src]").count() === 0, `${path} still loads a live project iframe`);
    }
    if (path.includes("/projects/follow-checker/")) {
      assert(await page.locator(".follow-case-boundaries").count() === 1, `${path} has no service boundary section`);
      assert(await page.locator(".follow-case-grid-cards article").count() === 3, `${path} has incomplete process steps`);
    }
    await page.close();
  }
  console.log(`Validated ${routes.length} public routes.`);
} finally {
  await browser?.close();
  server.kill();
}
