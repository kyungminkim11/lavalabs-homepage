import { readFile, writeFile } from "node:fs/promises";

const dist = new URL("../dist/", import.meta.url);
const pages = [
  {
    file: "index.html",
    title: "Lava Labs | 브랜드 웹·360° 공간 경험·디지털 서비스 제작",
    description: "Lava Labs는 브랜드 홈페이지, 포트폴리오, 사진과 콘텐츠, 360° 가상투어와 실용적인 웹 서비스를 기획하고 제작하는 디지털 경험 스튜디오입니다."
  },
  {
    file: "en/index.html",
    title: "Lava Labs | Brand Websites, 360° Experiences, and Digital Services",
    description: "Lava Labs is a digital experience studio creating brand websites, portfolios, photography, content, 360° virtual tours, and practical web services."
  },
  {
    file: "jp/index.html",
    title: "Lava Labs | ブランドWeb・360°空間体験・デジタルサービス制作",
    description: "Lava Labsは、ブランドサイト、ポートフォリオ、写真、コンテンツ、360°バーチャルツアー、実用的なWebサービスを制作するデジタル体験スタジオです。"
  }
];

for (const page of pages) {
  const path = new URL(page.file, dist);
  let html = await readFile(path, "utf8");
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${page.title}</title>`);
  html = html.replace(/<meta\s+name="description"[^>]*>/i, `<meta name="description" content="${page.description}" />`);
  html = html.replace(/<meta\s+property="og:title"[^>]*>/i, `<meta property="og:title" content="${page.title}" />`);
  html = html.replace(/<meta\s+property="og:description"[^>]*>/i, `<meta property="og:description" content="${page.description}" />`);
  html = html.replace(/<meta\s+name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${page.title}" />`);
  html = html.replace(/<meta\s+name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${page.description}" />`);
  await writeFile(path, html, "utf8");
}

console.log("Refreshed homepage metadata for Korean, English, and Japanese routes.");
