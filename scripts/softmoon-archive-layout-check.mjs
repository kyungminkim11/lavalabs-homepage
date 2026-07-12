import { spawn } from "node:child_process";
import { chromium } from "playwright";

const base = "http://127.0.0.1:4175";
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const server = spawn("npm", ["run", "preview", "--", "--host", "127.0.0.1", "--port", "4175"], { stdio: "ignore" });
let browser;

try {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      if ((await fetch(base)).ok) break;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  browser = await chromium.launch({ headless: true });

  for (const viewport of [
    { width: 1440, height: 1000, label: "desktop" },
    { width: 768, height: 1024, label: "tablet" },
    { width: 390, height: 844, label: "mobile" }
  ]) {
    const context = await browser.newContext({ viewport, isMobile: viewport.width < 600, hasTouch: viewport.width < 600 });
    const page = await context.newPage();
    const response = await page.goto(`${base}/soft_moon/`, { waitUntil: "domcontentloaded" });
    assert(response?.ok(), `${viewport.label}: SoftMoon page did not load`);
    await page.waitForSelector(".softmoon-archive-preview");

    const result = await page.locator(".softmoon-archive-preview").evaluate((preview) => {
      const footer = preview.querySelector(".softmoon-archive-footer");
      const paragraph = preview.querySelector(".softmoon-archive-copy p");
      const title = preview.querySelector(".softmoon-archive-copy strong");
      const previewRect = preview.getBoundingClientRect();
      const rect = (node) => node?.getBoundingClientRect();
      const footerRect = rect(footer);
      const paragraphRect = rect(paragraph);
      const titleRect = rect(title);
      return {
        clientHeight: preview.clientHeight,
        scrollHeight: preview.scrollHeight,
        footerVisible: Boolean(footerRect && footerRect.bottom <= previewRect.bottom + 1 && footerRect.top >= previewRect.top - 1),
        paragraphVisible: Boolean(paragraphRect && paragraphRect.bottom <= previewRect.bottom + 1),
        titleVisible: Boolean(titleRect && titleRect.bottom <= previewRect.bottom + 1),
        footerDisplay: footer ? getComputedStyle(footer).display : "none"
      };
    });

    assert(result.scrollHeight <= result.clientHeight + 1, `${viewport.label}: archive preview content overflows by ${result.scrollHeight - result.clientHeight}px`);
    assert(result.titleVisible, `${viewport.label}: archive title is clipped`);
    assert(result.paragraphVisible, `${viewport.label}: archive description is clipped`);
    assert(result.footerVisible && result.footerDisplay !== "none", `${viewport.label}: archive footer is clipped or hidden`);

    await page.close();
    await context.close();
  }

  console.log("Validated unclipped Connected Archive preview on desktop, tablet, and mobile viewports.");
} finally {
  await browser?.close();
  server.kill();
}
