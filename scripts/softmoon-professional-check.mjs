import { readFile } from "node:fs/promises";

const routes = [
  ["soft_moon/index.html", "브랜드 오브젝트·패키지·디지털 경험 설계", "감각을 소비하는 물건이 아니라"],
  ["en/soft_moon/index.html", "Brand Objects, Packaging and Digital Experiences", "We design experiences that continue"],
  ["jp/soft_moon/index.html", "ブランドオブジェ・パッケージ・デジタル体験設計", "一度消費されるものではなく"]
];

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

for (const [output, titleText, heroText] of routes) {
  const html = await readFile(new URL(`../dist/${output}`, import.meta.url), "utf8");
  assert(html.includes(titleText), `${output}: professional title is missing`);
  assert(html.includes(heroText), `${output}: professional hero statement is missing`);
  assert(html.includes('href="/softmoon-professional.css"'), `${output}: professional stylesheet is missing`);
  assert(html.includes('id="capabilities"'), `${output}: experience architecture section is missing`);
  assert(html.includes("softmoon-capability-grid"), `${output}: capability grid is missing`);
  assert(html.includes("softmoon-standards-section"), `${output}: development standards are missing`);
  assert(html.includes("softmoon-phase-card-pro"), `${output}: professional status panel is missing`);
  assert(html.includes("softmoon-collaboration-scope"), `${output}: collaboration scope is missing`);
  assert((html.match(/class="softmoon-capability-grid"/g) ?? []).length === 1, `${output}: capability section is duplicated`);
  assert((html.match(/<form[^>]+data-softmoon-form/g) ?? []).length === 2, `${output}: existing forms were not preserved`);
  assert(!html.includes("광고 폭탄"), `${output}: informal launch copy remains`);
}

const css = await readFile(new URL("../dist/softmoon-professional.css", import.meta.url), "utf8");
assert(css.includes(".softmoon-capability-section"), "professional capability styles are missing");
assert(css.includes(".softmoon-standards-section"), "professional standards styles are missing");
assert(css.includes("@media (max-width: 640px)"), "professional mobile styles are missing");
assert(css.length > 6000, "professional stylesheet appears incomplete");

console.log("Validated professional SoftMoon positioning, multilingual copy, sections, forms, metadata, and responsive stylesheet.");
