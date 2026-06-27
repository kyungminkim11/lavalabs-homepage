import { readFile, writeFile } from "node:fs/promises";

const dist = new URL("../dist/", import.meta.url);
const pages = [
  {
    file: "index.html",
    title: "Lava Labs | 작은 브랜드의 홈페이지·콘텐츠·웹 도구 제작",
    description: "Lava Labs는 작은 브랜드와 크리에이터를 위한 반응형 홈페이지, 포트폴리오, 사진, 콘텐츠와 가벼운 웹 도구를 직접 기획하고 제작합니다."
  },
  {
    file: "en/index.html",
    title: "Lava Labs | Websites, Content, and Lightweight Web Tools",
    description: "Lava Labs plans and builds responsive websites, portfolios, photography, content, and lightweight web tools for small brands and independent creators."
  },
  {
    file: "jp/index.html",
    title: "Lava Labs | 小さなブランドのWeb・コンテンツ・Webツール制作",
    description: "Lava Labsは、小さなブランドやクリエイター向けにWebサイト、写真、コンテンツ、軽量なWebツールを企画・制作します。"
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
