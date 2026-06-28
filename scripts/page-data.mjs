const origin = "https://lavalabs.co.kr";

export const routeMeta = {
  home: { output: "index.html", path: "/", lang: "ko", locale: "ko_KR", title: "Lava Labs | 작은 브랜드의 홈페이지와 콘텐츠를 만드는 크리에이티브 스튜디오", description: "Lava Labs는 작은 브랜드와 크리에이터에게 필요한 반응형 홈페이지, 포트폴리오, 사진과 콘텐츠를 함께 설계하고 제작합니다.", group: "home" },
  en: { output: "en/index.html", path: "/en/", lang: "en", locale: "en_US", title: "Lava Labs | Websites and Content for Small Brands", description: "Lava Labs designs responsive websites, portfolios, photography, and content for small brands and independent creators.", group: "home" },
  jp: { output: "jp/index.html", path: "/jp/", lang: "ja", locale: "ja_JP", title: "Lava Labs | 小さなブランドのためのWebサイトとコンテンツ制作", description: "Lava Labsは、小さなブランドやクリエイター向けに、レスポンシブWebサイト、ポートフォリオ、写真、コンテンツを制作します。", group: "home" },
  terms: { output: "terms/index.html", path: "/terms/", lang: "ko", locale: "ko_KR", title: "서비스 이용약관 | Lava Labs", description: "Lava Labs 프로젝트 문의, 웹사이트 제작, 사진과 콘텐츠 제작 서비스 이용약관입니다.", page: "terms" },
  privacy: { output: "privacy/index.html", path: "/privacy/", lang: "ko", locale: "ko_KR", title: "개인정보처리방침 | Lava Labs", description: "Lava Labs 문의 및 프로젝트 상담 과정에서 처리하는 개인정보 항목과 이용 목적을 안내합니다.", page: "privacy" },
  softmoon: { output: "soft_moon/index.html", path: "/soft_moon/", lang: "ko", locale: "ko_KR", title: "SoftMoon | Lava Labs 자체 굿즈 브랜드", description: "SoftMoon은 우주와 자연에서 영감을 받은 엽서, 스티커, 키트와 디지털 콘텐츠를 연구하는 Lava Labs의 자체 브랜드입니다.", group: "softmoon", page: "softmoon", localeKey: "ko" },
  softmoonEn: { output: "en/soft_moon/index.html", path: "/en/soft_moon/", lang: "en", locale: "en_US", title: "SoftMoon | An In-house Goods Brand by Lava Labs", description: "SoftMoon is Lava Labs' in-house brand exploring postcards, stickers, kits, packaging, and digital content inspired by space and nature.", group: "softmoon", page: "softmoon", localeKey: "en" },
  softmoonJp: { output: "jp/soft_moon/index.html", path: "/jp/soft_moon/", lang: "ja", locale: "ja_JP", title: "SoftMoon | Lava Labsの自社グッズブランド", description: "SoftMoonは宇宙と自然をモチーフに、ポストカード、ステッカー、キット、パッケージ、デジタルコンテンツを研究するLava Labsの自社ブランドです。", group: "softmoon", page: "softmoon", localeKey: "jp" }
};

const alternateGroups = {
  home: [["ko", "/"], ["en", "/en/"], ["ja", "/jp/"], ["x-default", "/"]],
  softmoon: [["ko", "/soft_moon/"], ["en", "/en/soft_moon/"], ["ja", "/jp/soft_moon/"], ["x-default", "/soft_moon/"]]
};

export function alternateLinks(meta) {
  if (!meta.group) return "";
  return alternateGroups[meta.group].map(([lang, path]) => `    <link rel="alternate" hreflang="${lang}" href="${origin}${path}" />`).join("\n");
}

export function structuredData(meta) {
  const common = { "@context": "https://schema.org", url: `${origin}${meta.path}`, name: meta.title, description: meta.description, inLanguage: meta.lang };
  if (meta.page === "softmoon") return { ...common, "@type": "Brand", logo: `${origin}/assets/images/lava-logo-transparent.png`, parentOrganization: { "@type": "Organization", name: "Lava Labs", url: `${origin}/` } };
  if (meta.page === "terms" || meta.page === "privacy") return { ...common, "@type": "WebPage", isPartOf: { "@type": "WebSite", name: "Lava Labs", url: `${origin}/` } };
  return { "@context": "https://schema.org", "@graph": [
    { "@type": "Organization", "@id": `${origin}/#organization`, name: "Lava Labs", legalName: "라바랩스(LavaLabs)", url: `${origin}/`, logo: `${origin}/assets/images/lava-logo-transparent.png`, email: "info@lavalabs.co.kr", sameAs: ["https://www.instagram.com/lavalabs_official/", "https://pf.kakao.com/_xnSxefxj"] },
    { "@type": "WebSite", "@id": `${origin}/#website`, name: "Lava Labs", url: `${origin}/`, inLanguage: ["ko", "en", "ja"], publisher: { "@id": `${origin}/#organization` } },
    { ...common, "@type": "ProfessionalService", "@id": `${origin}/#service`, provider: { "@id": `${origin}/#organization` }, areaServed: ["KR", "JP"], serviceType: ["Website production", "Photography", "Content planning", "Multilingual website structure"] }
  ] };
}

const logo = `<picture class="brand-mark"><source srcset="/assets/images/lava-logo-transparent-160.webp" type="image/webp"><img src="/assets/images/lava-logo-transparent.png" alt="Lava Labs" width="40" height="40"></picture>`;
const brand = `<a class="brand-link" href="/">${logo}<span>Lava Labs</span></a>`;
const footer = `<footer class="site-footer"><div class="section-inner footer-layout"><div>${brand}<p>Lava Labs는 작은 브랜드의 홈페이지, 사진과 콘텐츠를 함께 만듭니다.</p></div><div class="footer-links"><a href="https://pf.kakao.com/_xnSxefxj" target="_blank" rel="noreferrer">KakaoTalk</a><a href="https://www.instagram.com/lavalabs_official/" target="_blank" rel="noreferrer">Instagram</a><a href="/terms/">Terms</a><a href="/privacy/">Privacy</a></div><small>(c) 2026 Lava Labs. All rights reserved.</small></div></footer>`;

const legalSections = {
  terms: [
    ["1. 목적", "본 약관은 Lava Labs가 운영하는 웹사이트와 프로젝트 상담·제작 서비스를 이용하는 과정에서 회사와 이용자 사이의 기본 권리와 의무를 정하는 것을 목적으로 합니다."],
    ["2. 서비스 범위", "브랜드 홈페이지·랜딩페이지·포트폴리오, 사진·영상 콘텐츠, 소개 문구와 콘텐츠 구조, 다국어 페이지, 굿즈·패키징 및 별도로 협의한 프로젝트를 제공할 수 있습니다."],
    ["3. 문의와 계약", "웹사이트 문의 제출만으로 계약이 성립하지 않습니다. 범위, 일정, 비용, 산출물, 수정 횟수와 결제 조건은 별도 견적서·계약서 또는 합의 문서로 확정합니다."],
    ["4. 자료와 권리", "이용자는 제공하는 로고, 사진, 문구, 영상과 기타 자료를 사용할 권한이 있어야 하며 제3자의 권리를 침해하는 자료를 제공해서는 안 됩니다."],
    ["5. 수정과 추가 작업", "수정 가능 범위와 횟수는 프로젝트별 합의에 따르며 최초 범위를 벗어나는 작업은 별도 비용과 일정이 필요할 수 있습니다."],
    ["6. 지식재산권", "완성 결과물의 저작권, 사용 범위와 원본 파일 제공 여부는 개별 계약에 따릅니다. 별도 비공개 합의가 없는 경우 일부 결과물을 작업 사례로 소개할 수 있습니다."],
    ["7. 외부 서비스", "문의 폼, 메신저, SNS, 도메인과 호스팅 등 외부 서비스의 정책 변경이나 장애는 해당 서비스의 영향을 받을 수 있습니다."],
    ["8. 약관 변경", "운영 방식 또는 관련 법령이 변경되는 경우 본 약관을 개정할 수 있으며 변경 내용은 이 페이지에 게시합니다."],
    ["9. 문의", "약관 관련 문의는 info@lavalabs.co.kr로 보내주세요."]
  ],
  privacy: [
    ["1. 수집 항목", "이름, 이메일, 브랜드·회사명, 문의 유형, 희망 일정, 예상 예산 범위, 참고 자료 링크, 문의 내용과 동의 여부를 수집할 수 있습니다."],
    ["2. 이용 목적", "프로젝트 문의 답변, 제작 범위·일정·견적 상담, 계약 전후 커뮤니케이션, 반복·악성 문의 방지와 상담 기록 확인을 위해 이용합니다."],
    ["3. 보관 기간", "단순 문의 기록은 처리 완료 후 최대 1년 동안 보관할 수 있으며 계약과 거래가 이루어진 경우 관련 법령 또는 계약상 필요한 기간 동안 보관합니다."],
    ["4. 외부 처리 서비스", "문의 전송에는 Formspree 등 외부 폼 처리 서비스가 사용될 수 있으며 각 서비스의 개인정보처리방침이 함께 적용될 수 있습니다."],
    ["5. 제3자 제공", "법령에 따른 요청 또는 사전에 협의한 프로젝트 수행 목적을 제외하고 개인정보를 외부에 판매하거나 임의로 제공하지 않습니다."],
    ["6. 이용자의 권리", "이용자는 개인정보 열람, 정정, 삭제 또는 처리 정지를 info@lavalabs.co.kr로 요청할 수 있습니다."],
    ["7. 안전성 확보", "계정 접근 제한, 자료 보관 관리, 불필요한 정보 삭제와 자동화된 스팸 제출 방지 등 합리적인 보호 조치를 적용합니다."],
    ["8. 방침 변경", "수집 항목, 외부 서비스 또는 운영 방식이 달라지는 경우 이 방침을 개정하고 시행일을 표시합니다."],
    ["9. 담당 연락처", "개인정보 관련 문의와 권리 요청: info@lavalabs.co.kr"]
  ]
};

function legalBody(kind) {
  const privacy = kind === "privacy";
  const title = privacy ? "개인정보처리방침" : "서비스 이용약관";
  const lead = privacy ? "프로젝트 문의와 상담을 위해 처리하는 개인정보 항목과 이용 목적을 안내합니다." : "Lava Labs 웹사이트, 프로젝트 문의와 제작 의뢰에 적용되는 기본 이용 조건입니다.";
  const sections = legalSections[kind].map(([heading, body]) => `<article class="legal-section"><h2>${heading}</h2><p>${body}</p></article>`).join("");
  return `<div class="app-shell legal-shell"><a class="skip-link" href="#main-content">본문으로 이동</a><header class="site-header legal-header"><div class="nav-shell legal-nav">${brand}<a class="button secondary legal-home-link" href="/">홈으로</a></div></header><main id="main-content" class="legal-page"><section class="section legal-hero"><div class="section-inner"><p class="eyebrow">${privacy ? "Privacy" : "Terms"}</p><h1>${title}</h1><p class="legal-lead">${lead}</p><p class="legal-meta">시행일: 2026년 6월 28일</p></div></section><section class="section legal-content-section"><div class="section-inner legal-card">${sections}</div></section></main>${footer}</div>`;
}

const softmoonText = {
  ko: {
    home: "/",
    skip: "본문으로 이동",
    eyebrow: "자체 브랜드",
    statement: "우주와 자연의 분위기를 작은 물건과 디지털 경험으로 옮깁니다.",
    body: "SoftMoon은 Lava Labs가 직접 기획하고 발전시키는 자체 브랜드입니다. 엽서, 스티커, 키트, 패키징과 디지털 콘텐츠를 실험하며 작은 브랜드를 실제로 운영하는 과정을 축적합니다.",
    intro: "브랜드 소개서",
    researchLabel: "연구 분야",
    research: "현재 연구하고 있는 것",
    contact: "협업 문의하기",
    back: "Lava Labs로 돌아가기",
    cards: [
      ["페이퍼 굿즈", "엽서, 스티커와 다양한 인쇄물"],
      ["소형 키트", "기록과 참여를 위한 간결한 키트"],
      ["패키징", "브랜드 경험을 제품 밖까지 이어주는 패키징"],
      ["디지털 콘텐츠", "실물 제품과 함께 설계하는 디지털 콘텐츠"]
    ]
  },
  en: {
    home: "/en/",
    skip: "Skip to content",
    eyebrow: "In-house Brand",
    statement: "Translating the mood of space and nature into small objects and digital experiences.",
    body: "SoftMoon is an in-house brand planned and developed by Lava Labs. We explore postcards, stickers, small kits, packaging, and digital content while learning how a small brand operates in practice.",
    intro: "Brand Introduction",
    researchLabel: "Research Areas",
    research: "What we are exploring",
    contact: "Discuss a collaboration",
    back: "Back to Lava Labs",
    cards: [
      ["Paper Goods", "Postcards, stickers and printed pieces"],
      ["Small Kits", "Compact kits for recording and participation"],
      ["Packaging", "Packaging that extends the brand experience"],
      ["Digital Content", "Digital content designed with physical products"]
    ]
  },
  jp: {
    home: "/jp/",
    skip: "本文へ移動",
    eyebrow: "自社ブランド",
    statement: "宇宙と自然の空気感を、小さなものとデジタル体験へ移します。",
    body: "SoftMoonはLava Labsが直接企画・運営する自社ブランドです。ポストカード、ステッカー、小さなキット、パッケージ、デジタルコンテンツを試作しています。",
    intro: "ブランド紹介資料",
    researchLabel: "研究領域",
    research: "現在研究していること",
    contact: "コラボレーション相談",
    back: "Lava Labsへ戻る",
    cards: [
      ["ペーパーグッズ", "ポストカード、ステッカー、印刷物"],
      ["スモールキット", "記録と参加のためのコンパクトなキット"],
      ["パッケージ", "ブランド体験を広げるパッケージ"],
      ["デジタルコンテンツ", "実物の商品と連動して設計するデジタルコンテンツ"]
    ]
  }
};

function softmoonBody(locale) {
  const t = softmoonText[locale];
  const langs = `<div class="language-switcher" aria-label="Language"><a href="/soft_moon/"${locale === "ko" ? " aria-current=\"page\"" : ""}>한국어</a><a href="/en/soft_moon/"${locale === "en" ? " aria-current=\"page\"" : ""}>English</a><a href="/jp/soft_moon/"${locale === "jp" ? " aria-current=\"page\"" : ""}>日本語</a></div>`;
  const cards = t.cards.map(([title, body]) => `<article><h3>${title}</h3><p>${body}</p></article>`).join("");
  return `<div class="app-shell softmoon-page-shell"><a class="skip-link" href="#main-content">${t.skip}</a><header class="site-header"><div class="nav-shell softmoon-nav"><a class="brand-link" href="${t.home}">${logo}<span>Lava Labs</span></a>${langs}</div></header><main id="main-content"><section class="section softmoon-page-hero"><div class="section-inner softmoon-page-hero-grid"><div><p class="eyebrow">${t.eyebrow}</p><h1>SoftMoon</h1><p class="softmoon-page-statement">${t.statement}</p><p class="softmoon-page-body">${t.body}</p><div class="button-row"><a class="button primary" href="/assets/files/softmoon-intro.pdf" download>${t.intro}</a><a class="button secondary" href="${t.home}#contact">${t.contact}</a></div></div><div class="softmoon-page-gallery"><picture><source srcset="/assets/images/lunar-sample-1-720.webp" type="image/webp"><img src="/assets/images/lunar-sample-1.jpg" alt="SoftMoon paper goods" width="720" height="900"></picture><picture><source srcset="/assets/images/lunar-sample-2-720.webp" type="image/webp"><img src="/assets/images/lunar-sample-2.jpg" alt="SoftMoon product sample" width="720" height="900"></picture></div></div></section><section class="section softmoon-research-section"><div class="section-inner"><div class="section-heading compact"><p class="eyebrow">${t.researchLabel}</p><h2>${t.research}</h2></div><div class="softmoon-research-grid">${cards}</div><a class="softmoon-back-link" href="${t.home}">${t.back}</a></div></section></main>${footer}</div>`;
}

export function staticBody(meta) {
  if (meta.page === "terms" || meta.page === "privacy") return legalBody(meta.page);
  if (meta.page === "softmoon") return softmoonBody(meta.localeKey);
  return null;
}
