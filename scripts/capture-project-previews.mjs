import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const outputDir = new URL("../dist/assets/project-previews/", import.meta.url);
await mkdir(outputDir, { recursive: true });

const projects = [
  { name: "snap", url: "https://snap.lavalabs.co.kr/ko" },
  { name: "follow", url: "https://unfollow.lavalabs.co.kr/" },
  { name: "emoseed", url: "https://emoseed.lavalabs.co.kr/" }
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
  reducedMotion: "reduce"
});

for (const project of projects) {
  const page = await context.newPage();
  try {
    await page.goto(project.url, { waitUntil: "networkidle", timeout: 60_000 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1_200);
    const screenshot = await page.screenshot({ type: "png", fullPage: false });
    const encoded = screenshot.toString("base64");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800"><image width="1280" height="800" preserveAspectRatio="xMidYMid slice" href="data:image/png;base64,${encoded}"/></svg>`;
    await writeFile(new URL(`${project.name}.svg`, outputDir), svg, "utf8");
    console.log(`Captured ${project.name}: ${page.url()}`);
  } catch (error) {
    console.warn(`Keeping fallback preview for ${project.name}:`, error instanceof Error ? error.message : error);
  } finally {
    await page.close();
  }
}

await context.close();
await browser.close();
