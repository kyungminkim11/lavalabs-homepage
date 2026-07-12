import { mkdir, readFile } from "node:fs/promises";
import sharp from "sharp";

const distImages = new URL("../dist/assets/images/", import.meta.url);
const publicImages = new URL("../public/assets/images/", import.meta.url);

await mkdir(distImages, { recursive: true });

const symbolSvg = await readFile(new URL("softmoon-symbol.svg", publicImages));
const iconBuffer = await sharp(symbolSvg).resize(512, 512).png().toBuffer();
await sharp(iconBuffer).toFile(new URL("softmoon-icon.png", distImages));

const sampleUrl = new URL("lunar-sample-1.jpg", distImages);
const sample = await sharp(sampleUrl)
  .resize(470, 630, { fit: "cover", position: "centre" })
  .modulate({ saturation: 0.92, brightness: 0.94 })
  .toBuffer();

const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff7ed"/>
      <stop offset=".68" stop-color="#eee5d8"/>
      <stop offset="1" stop-color="#dcecee"/>
    </linearGradient>
    <radialGradient id="coral">
      <stop offset="0" stop-color="#d96f61" stop-opacity=".28"/>
      <stop offset="1" stop-color="#d96f61" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="85" cy="585" r="260" fill="url(#coral)"/>
  <circle cx="690" cy="40" r="290" fill="#2f8f98" opacity=".08"/>
  <path d="M730 0h470v630H730z" fill="#13212c" opacity=".08"/>
  <text x="76" y="226" fill="#13212c" font-family="Arial, sans-serif" font-size="84" font-weight="800" letter-spacing="-5">SoftMoon</text>
  <text x="80" y="284" fill="#2f8f98" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="4">PAPER · OBJECT · DIGITAL</text>
  <text x="80" y="366" fill="#203b49" font-family="Arial, sans-serif" font-size="36" font-weight="700">Small objects,</text>
  <text x="80" y="414" fill="#203b49" font-family="Arial, sans-serif" font-size="36" font-weight="700">long afterglow.</text>
  <text x="80" y="526" fill="#52616a" font-family="Arial, sans-serif" font-size="20" font-weight="600">An in-house brand by Lava Labs</text>
  <rect x="80" y="548" width="140" height="4" rx="2" fill="#d96f61"/>
</svg>`);

const iconSmall = await sharp(iconBuffer).resize(112, 112).toBuffer();

await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 4,
    background: "#fffdfa"
  }
})
  .composite([
    { input: overlay, left: 0, top: 0 },
    { input: sample, left: 730, top: 0 },
    { input: iconSmall, left: 78, top: 62 }
  ])
  .png({ compressionLevel: 9 })
  .toFile(new URL("softmoon-og.png", distImages));

console.log("Generated SoftMoon icon and social card.");
