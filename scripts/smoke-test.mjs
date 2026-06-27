import { spawn } from "node:child_process";
import process from "node:process";
import { chromium } from "playwright";

const baseURL = "http://127.0.0.1:4173";
const expected = [
  ["/", "Lava Labs", "https://lavalabs.co.kr/"],
  ["/en/", "Lava Labs", "https://lavalabs.co.kr/en/"],
  ["/jp/", "Lava Labs", "https://lavalabs.co.kr/jp/"],
  ["/terms/", "서비스 이용약관", "https://lavalabs.co.kr/terms/"],
  ["/privacy/", "개인정보처리방침", "https://lavalabs.co.kr/privacy/"],
  ["/soft_moon/", "SoftMoon", "https://lavalabs.co.kr/soft_moon/"],
  ["/en/soft_moon/", "SoftMoon", "https://lavalabs.co.kr/en/soft_moon/"],
  ["/jp/soft_moon/", "SoftMoon", "https://lavalabs.co.kr/jp/soft_moon/"]
];

const server = spawn("npm", ["run", "preview", "--", "--host", "127.0.0.1", "--port", "4173"], {
  shell: process.platform === "win32",
  stdio: ["ignore", "pipe", "pipe"]
});

let serverOutput = "";
server.stdout.on("data", (chunk) => { serverOutput += chunk; });
server.stderr.on("data", (chunk) => { serverOutput += chunk; });

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(baseURL);
      if (response.ok) return;
    } catch {
      // Preview server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Preview server did not start.\n${serverOutput}`);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

let browser;
try {
  await waitForServer();
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await context.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.origin !== baseURL && url.hostname !== "127.0.0.1") return route.abort();
    return route.continue();
  });

  for (const [path, heading, canonical] of expected) {
    const page = await context.newPage();
    const failedLocalRequests = [];
    page.on("response", (response) => {
      const url = new URL(response.url());
      if (url.origin === baseURL && response.status() >= 400) failedLocalRequests.push(`${response.status()} ${url.pathname}`);
    });

    const response = await page.goto(`${baseURL}${path}`, { waitUntil: "domcontentloaded" });
    assert(response?.ok(), `${path} returned ${response?.status()}`);
    await page.waitForSelector("h1");
    assert((await page.locator("h1").first().innerText()).includes(heading), `${path} has an unexpected h1`);
    assert((await page.locator('link[rel="canonical"]').getAttribute("href")) === canonical, `${path} has an incorrect canonical URL`);
    assert((await page.title()).trim().length > 12, `${path} has a weak title`);
    assert((await page.locator('meta[name="description"]').getAttribute("content") ?? "").length > 50, `${path} has a weak description`);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    assert(overflow <= 2, `${path} has horizontal overflow of ${overflow}px`);
    assert(failedLocalRequests.length === 0, `${path} has failed local requests: ${failedLocalRequests.join(", ")}`);

    if (["/", "/en/", "/jp/"].includes(path)) {
      assert(await page.locator('select[name="projectType"]').count() === 1, `${path} is missing the inquiry type field`);
      assert(await page.locator('select[name="timeline"]').count() === 1, `${path} is missing the timeline field`);
      assert(await page.locator('select[name="budget"]').count() === 1, `${path} is missing the budget field`);
      assert(await page.locator('input[name="website"]').count() === 1, `${path} is missing the spam trap`);
      assert(await page.locator('.language-switcher a[hreflang], .language-switcher a').count() >= 3, `${path} is missing language links`);
    }

    await page.close();
  }

  const notFound = await context.newPage();
  await notFound.goto(`${baseURL}/does-not-exist`, { waitUntil: "domcontentloaded" });
  assert((await notFound.locator('meta[name="robots"]').getAttribute("content") ?? "").includes("noindex"), "404 page must be noindex");
  await notFound.close();

  console.log(`Smoke tests passed for ${expected.length} routes.`);
} finally {
  await browser?.close();
  server.kill("SIGTERM");
}
