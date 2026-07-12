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
  ["/projects/emoseed/", "EmoSeed", "https://lavalabs.co.kr/projects/emoseed/"],
  ["/en/projects/emoseed/", "EmoSeed", "https://lavalabs.co.kr/en/projects/emoseed/"],
  ["/jp/projects/emoseed/", "EmoSeed", "https://lavalabs.co.kr/jp/projects/emoseed/"],
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

async function assertMobileReadability(page, label) {
  const styles = await page.evaluate(() => {
    const style = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const computed = getComputedStyle(element);
      return {
        color: computed.color,
        backgroundColor: computed.backgroundColor,
        fontSize: Number.parseFloat(computed.fontSize)
      };
    };
    return {
      heroTitle: style(".hero h1"),
      heroCopy: style(".hero-copy"),
      serviceCard: style(".service-card"),
      projectCard: style(".project-card-v2"),
      projectDescription: style(".project-card-description"),
      splitCopy: style(".split-band .process-list span"),
      contactMethod: style(".contact-methods a"),
      businessValue: style(".business-disclosure dd")
    };
  });

  assert(styles.heroTitle?.color === "rgb(255, 255, 255)", `${label} hero title is not high contrast`);
  assert(styles.heroCopy?.fontSize >= 14, `${label} hero copy is too small`);
  assert(styles.serviceCard?.backgroundColor === "rgb(255, 255, 255)", `${label} service card background is not solid`);
  assert(styles.projectCard?.backgroundColor === "rgb(255, 255, 255)", `${label} project card background is not solid`);
  assert((styles.projectDescription?.fontSize ?? 0) >= 14, `${label} project copy is too small`);
  assert(styles.splitCopy?.color !== "rgba(0, 0, 0, 0)", `${label} dark section copy is invisible`);
  assert(styles.contactMethod?.backgroundColor === "rgb(255, 255, 255)", `${label} contact method background is not readable`);
  assert(styles.businessValue?.color === "rgb(255, 255, 255)", `${label} business information is low contrast`);
}

try {
  const notFound = await readFile(new URL("../dist/404.html", import.meta.url), "utf8");
  assert(notFound.includes('content="noindex, follow"'), "Generated 404 page must be noindex");
  for (const file of ["space.svg", "snap.svg", "follow.svg", "emoseed.svg", "heart.svg"]) {
    const preview = await readFile(new URL(`../dist/assets/project-previews/${file}`, import.meta.url), "utf8");
    assert(preview.includes("<svg"), `${file} project preview is missing`);
  }

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
      assert(await page.locator(".interactive-hero-orb").count() === 1, `${path} has no interactive hero orb`);
      await page.locator(".hero").dispatchEvent("pointerdown", { clientX: 180, clientY: 260, pointerType: "touch", isPrimary: true });
      assert(await page.locator(".interactive-hero-orb.is-reacting").count() === 1, `${path} hero orb does not react to touch`);
      assert(await page.locator(".project-space").count() === 1, `${path} has no LavaLabs Space card`);
      assert(await page.locator(".project-follow").count() === 1, `${path} has no Follow Checker card`);
      assert(await page.locator(".project-emoseed").count() === 1, `${path} has no EmoSeed card`);
      assert(await page.locator(".project-heart").count() === 1, `${path} has no Shape of Heart card`);
      assert(await page.locator(".project-card-v2").count() >= 6, `${path} has incomplete redesigned project cards`);
      assert(await page.locator(".project-preview-link").count() >= 6, `${path} has incomplete clickable project previews`);
      assert(await page.locator(".project-preview-frame img").count() >= 6, `${path} has incomplete project preview images`);
      assert(await page.locator(".case-preview-label").count() === 0, `${path} still duplicates project titles over preview images`);
      assert((await page.locator("body").innerText()).includes("Static preview") === false, `${path} still displays the old static preview label`);
      assert(await page.locator("iframe[src]").count() === 0, `${path} still loads a live project iframe`);
      const firstProjectAction = await page.locator(".project-card-actions a").first().boundingBox();
      assert((firstProjectAction?.height ?? 0) >= 44, `${path} project action is too small for touch`);
      const fixedCta = await page.locator(".mobile-contact-bar").boundingBox();
      assert((fixedCta?.height ?? 0) >= 52, `${path} mobile contact CTA is too small`);
      const firstField = await page.locator(".contact-form input").first().boundingBox();
      assert((firstField?.height ?? 0) >= 48, `${path} form field is too small for touch`);
      await assertMobileReadability(page, path);
    }
    if (path.includes("/projects/follow-checker/")) {
      assert(await page.locator(".follow-case-boundaries").count() === 1, `${path} has no service boundary section`);
      assert(await page.locator(".follow-case-grid-cards article").count() === 3, `${path} has incomplete process steps`);
    }
    if (path.includes("/projects/emoseed/")) {
      assert(await page.locator(".emoseed-case-features article").count() === 4, `${path} has incomplete EmoSeed feature cards`);
      assert(await page.locator(".emoseed-decision-list li").count() === 5, `${path} has incomplete mobile UX decisions`);
    }
    await page.close();
  }
  await context.close();

  const compact = await browser.newContext({ viewport: { width: 320, height: 700 }, isMobile: true, hasTouch: true });
  const home = await compact.newPage();
  await home.goto(base, { waitUntil: "domcontentloaded" });
  const toggle = home.locator(".nav-toggle");
  await toggle.waitFor();
  assert((await toggle.getAttribute("aria-expanded")) === "false", "Mobile navigation must start collapsed");
  await assertNoOverflow(home, "320px homepage");
  await toggle.click();
  assert((await toggle.getAttribute("aria-expanded")) === "true", "Mobile navigation aria-expanded did not update");
  assert(await home.locator('.site-header[data-open="true"]').count() === 1, "Mobile navigation did not open");
  assert(await home.locator(".primary-nav a").first().isVisible(), "Mobile navigation links are hidden");
  const menuLink = await home.locator(".primary-nav a").first().boundingBox();
  assert((menuLink?.height ?? 0) >= 48, "Mobile navigation target is too small");
  await home.keyboard.press("Escape");
  assert((await toggle.getAttribute("aria-expanded")) === "false", "Escape did not close mobile navigation");
  await assertNoOverflow(home, "320px closed navigation");
  await compact.close();

  console.log(`Validated ${routes.length} public routes, interactive hero orb, six project cards, mobile contrast, and compact navigation.`);
} finally {
  await browser?.close();
  server.kill();
}
