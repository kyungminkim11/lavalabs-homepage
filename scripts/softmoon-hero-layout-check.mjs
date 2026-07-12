import { spawn } from "node:child_process";
import { chromium } from "playwright";

const base = "http://127.0.0.1:4174";
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const server = spawn("npm", ["run", "preview", "--", "--host", "127.0.0.1", "--port", "4174"], { stdio: "ignore" });
let browser;

const intersects = (a, b) => {
  if (!a || !b) return false;
  return !(a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y);
};

try {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      if ((await fetch(base)).ok) break;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  browser = await chromium.launch({ headless: true });

  for (const viewport of [
    { width: 1728, height: 900, label: "desktop" },
    { width: 1024, height: 900, label: "tablet" },
    { width: 390, height: 844, label: "mobile" }
  ]) {
    const context = await browser.newContext({ viewport, isMobile: viewport.width < 600, hasTouch: viewport.width < 600 });
    const page = await context.newPage();
    const response = await page.goto(`${base}/soft_moon/`, { waitUntil: "domcontentloaded" });
    assert(response?.ok(), `${viewport.label}: SoftMoon page did not load`);
    await page.waitForSelector(".softmoon-phase-card-pro");

    const card = await page.locator(".softmoon-phase-card-pro").boundingBox();
    const gallery = await page.locator(".softmoon-gallery").boundingBox();
    const captions = await page.locator(".softmoon-gallery figcaption").evaluateAll((nodes) => nodes.map((node) => {
      const rect = node.getBoundingClientRect();
      return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
    }));
    const computed = await page.locator(".softmoon-phase-card-pro").evaluate((node) => ({
      position: getComputedStyle(node).position,
      width: node.getBoundingClientRect().width
    }));
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);

    assert(computed.position !== "absolute" && computed.position !== "fixed", `${viewport.label}: phase panel is still floating over media`);
    assert(card && gallery && card.y >= gallery.y + gallery.height - 1, `${viewport.label}: phase panel is not placed below the gallery`);
    assert(captions.every((caption) => !intersects(card, caption)), `${viewport.label}: phase panel overlaps an image caption`);
    assert((card?.width ?? 0) <= viewport.width, `${viewport.label}: phase panel exceeds viewport width`);
    assert(overflow <= 2, `${viewport.label}: horizontal overflow is ${overflow}px`);

    await page.close();
    await context.close();
  }

  console.log("Validated overlap-safe SoftMoon hero layout on desktop, tablet, and mobile viewports.");
} finally {
  await browser?.close();
  server.kill();
}
