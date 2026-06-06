import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imageDir = path.resolve(__dirname, "../public/assets/images");

const jobs = [
  {
    input: "hero-illustration.png",
    output: "hero-illustration-1280.webp",
    width: 1280,
    format: "webp",
    quality: 84
  },
  {
    input: "lava-logo-transparent.png",
    output: "lava-logo-transparent-160.webp",
    width: 160,
    format: "webp",
    quality: 90
  },
  {
    input: "lava-logo-color.png",
    output: "lava-logo-color-640.webp",
    width: 640,
    format: "webp",
    quality: 88
  },
  {
    input: "lunar-sample-1.jpg",
    output: "lunar-sample-1-720.webp",
    width: 720,
    format: "webp",
    quality: 84
  },
  {
    input: "lunar-sample-2.jpg",
    output: "lunar-sample-2-720.webp",
    width: 720,
    format: "webp",
    quality: 84
  }
];

await Promise.all(
  jobs.map(async (job) => {
    const pipeline = sharp(path.join(imageDir, job.input)).resize({
      width: job.width,
      withoutEnlargement: true
    });

    if (job.format === "webp") {
      await pipeline.webp({ quality: job.quality }).toFile(path.join(imageDir, job.output));
    }
  })
);

await sharp(path.join(imageDir, "hero-illustration.png"))
  .resize({
    width: 1200,
    height: 630,
    fit: "cover",
    position: "center"
  })
  .jpeg({ quality: 88 })
  .toFile(path.join(imageDir, "og-image.jpg"));

console.log("Assets optimized.");
