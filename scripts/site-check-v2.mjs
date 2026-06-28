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

async function assertNoOverflow(page, label) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  assert(overflow <= 2, `${label} overflows horizontally by ${overflow}px`);
}

try {
  const notFound = await readFile(new URL("../dist/404.html", import.meta.url), "utf8");
  assert(notFound.includes('content="noindex, follow"'), "Generated 404 page must be noindex");
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try { if ((await fetch(base)).ok) break; } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  for (const [path, heading, canonical] of routes) {
    const page = await context.newPage();
    const response = await page.goto(`${base}${path}`, { waitUntil: "domcontentloaded" });
    assert(response?.ok(), `${path} did not load`);
    await page.waitForSelector("h1");
    assert((await page.locator("h1").first().innerText()).includes(heading), `${path} has the wrong heading`);
    assert((await page.locator('link[rel="canonical"]').getAttribute("href")) === canonical, `${path} has the wrong canonical URL`);
    assert((await page.locator('meta[name="description"]').getAttribute("content") ?? "").length > 30, `${path} has a weak description`);
    assert(await page.locator('script[type="application/ld+json"]').count() > 0, `${path} has no structured data`);
    await assertNoOverflow(page, path);

    if (["/", "/en/", "/jp/"].includes(path)) {
      assert(await page.locator('select[name="projectType"]').count() === 1, `${path} has no project selector`);
      assert(await page.locator('input[name="website"]').count() === 1, `${path} has no spam trap`);
      assert(await page.locator(".project-follow").count() === 1, `${path} has no Follow Checker card`);
      assert(await page.locator(".project-emoseed").count() === 1, `${path} has no EmoSeed card`);
      assert(await page.locator("iframe[src]").count() === 0, `${path} still loads a live project iframe`);
      const fixedCta = await page.locator(".mobile-contact-bar").boundingBox();
      assert((fixedCta?.height ?? 0) >= 52, `${path} mobile contact CTA is too small`);
      const firstField = await page.locator(".contact-form input").first().boundingBox();
      assert((firstField?.height ?? 0) >= 48, `${path} form field is too small for touch`);
    }
    if (path.includes("/projects/follow-checker/")) {
      assert(await page.locator(".follow-case-boundaries").count() === 1, `${path} has no service boundary section`);
      assert(await page.locator(".follow-case-grid-cards article").count() === 3, `${path} has incomplete process steps`);
    }
    await page.close();
  }
  await context.close();

  const compact = await browser.newContext({ viewport: { width: 320, height: 700 }, isMobile: true, hasTouch: true });
  const home = await compact.newPage();
  await home.goto(base, { waitUntil: "domcontentloaded" });
  await home.waitForSelector(".nav-toggle");
  await assertNoOverflow(home, "320px homepage");
  await home.locator(".nav-toggle").click();
  assert(await home.locator('.site-header[data-open="true"]').count() === 1, "Mobile navigation did not open");
  assert(await home.locator(".primary-nav a").first().isVisible(), "Mobile navigation links are hidden");
  const menuLink = await home.locator(".primary-nav a").first().boundingBox();
  assert((menuLink?.height ?? 0) >= 48, "Mobile navigation target is too small");
  await assertNoOverflow(home, "320px open navigation");
  await compact.close();

  console.log(`Validated ${routes.length} public routes and compact mobile navigation.`);
} finally {
  await browser?.close();
  server.kill();
}
