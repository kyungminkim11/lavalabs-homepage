import { renderSoftmoonBody as renderBaseSoftmoonBody } from "./softmoon-page.mjs";
import { data as koData, replacements as koReplacements } from "./softmoon-professional-ko.mjs";
import { data as enData, replacements as enReplacements } from "./softmoon-professional-en.mjs";
import { data as jpData, replacements as jpReplacements } from "./softmoon-professional-jp.mjs";

const localeData = {
  ko: { data: koData, replacements: koReplacements },
  en: { data: enData, replacements: enReplacements },
  jp: { data: jpData, replacements: jpReplacements }
};

const archiveCopy = {
  ko: {
    aria: "SoftMoon Connected Archive 모바일 인터페이스 콘셉트",
    eyebrow: "PHYSICAL × DIGITAL",
    summary: "오브젝트에 연결된 기록과 콘텐츠를 한 화면에서 이어서 확인합니다.",
    state: "오브젝트 연결됨",
    action: "기록 보기"
  },
  en: {
    aria: "SoftMoon Connected Archive mobile interface concept",
    eyebrow: "PHYSICAL × DIGITAL",
    summary: "Continue the records and content connected to a physical object in one place.",
    state: "Object linked",
    action: "View record"
  },
  jp: {
    aria: "SoftMoon Connected Archiveモバイルインターフェースコンセプト",
    eyebrow: "PHYSICAL × DIGITAL",
    summary: "オブジェクトにつながる記録とコンテンツを一つの画面で確認できます。",
    state: "オブジェクト連携済み",
    action: "記録を見る"
  }
};

function capabilitySection(locale) {
  const t = localeData[locale].data;
  return `<section class="softmoon-section softmoon-capability-section" id="capabilities">
    <div class="softmoon-container">
      <div class="softmoon-section-heading">
        <div><p class="softmoon-eyebrow">${t.capability.label}</p><h2>${t.capability.title}</h2></div>
        <p>${t.capability.lead}</p>
      </div>
      <div class="softmoon-capability-grid">
        ${t.capability.items.map(([number, title, body, meta]) => `<article><span>${number}</span><h3>${title}</h3><p>${body}</p><small>${meta}</small></article>`).join("")}
      </div>
    </div>
  </section>`;
}

function standardsSection(locale) {
  const t = localeData[locale].data.standards;
  return `<section class="softmoon-standards-section" aria-labelledby="softmoon-standards-title">
    <div class="softmoon-container softmoon-standards-layout">
      <div><p class="softmoon-eyebrow">${t.label}</p><h2 id="softmoon-standards-title">${t.title}</h2></div>
      <div class="softmoon-standards-grid">
        ${t.items.map(([number, title, body]) => `<article><span>${number}</span><div><h3>${title}</h3><p>${body}</p></div></article>`).join("")}
      </div>
    </div>
  </section>`;
}

function phaseCard(locale) {
  const t = localeData[locale].data.phase;
  return `<aside class="softmoon-phase-card softmoon-phase-card-pro" data-softmoon-phase-panel style="position:static;inset:auto;right:auto;bottom:auto;width:100%;max-width:none;margin:24px 0 0;transform:none;">
    <p>${t.label}</p>
    <dl>${t.rows.map(([term, value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`).join("")}</dl>
    <span>${t.note}</span>
  </aside>`;
}

function digitalArchiveVisual(locale) {
  const t = archiveCopy[locale] ?? archiveCopy.ko;
  return `<div class="softmoon-digital-visual" role="img" aria-label="${t.aria}">
    <div class="softmoon-archive-preview">
      <div class="softmoon-archive-header">
        <span class="softmoon-archive-wordmark">SoftMoon</span>
        <span class="softmoon-archive-index">ARCHIVE 03</span>
      </div>
      <div class="softmoon-archive-art" aria-hidden="true">
        <span class="softmoon-archive-moon"></span>
        <span class="softmoon-archive-orbit"></span>
        <span class="softmoon-archive-marker"></span>
      </div>
      <div class="softmoon-archive-copy">
        <span>${t.eyebrow}</span>
        <strong>Connected Archive</strong>
        <p>${t.summary}</p>
      </div>
      <div class="softmoon-archive-footer">
        <span class="softmoon-archive-state"><i aria-hidden="true"></i>${t.state}</span>
        <span class="softmoon-archive-action">${t.action}<b aria-hidden="true">→</b></span>
      </div>
    </div>
  </div>`;
}

function collaborationScope(locale) {
  const t = localeData[locale].data;
  return `<div class="softmoon-collaboration-scope-wrap">
    <p class="softmoon-scope-label">Project Scope</p>
    <ul class="softmoon-collaboration-scope">${t.collaborationScope.map((item) => `<li>${item}</li>`).join("")}</ul>
    <p class="softmoon-collaboration-fit">${t.collaborationFit}</p>
  </div>`;
}

function applyProfessionalCopy(html, locale) {
  const t = localeData[locale].data;
  for (const [from, to] of localeData[locale].replacements) html = html.replaceAll(from, to);

  const navAnchor = locale === "ko"
    ? '<a href="#preview" data-section-link="preview">개발 컬렉션 보기</a>'
    : locale === "en"
      ? '<a href="#preview" data-section-link="preview">Preview</a>'
      : '<a href="#preview" data-section-link="preview">プレビュー</a>';
  const newPreviewLabel = locale === "ko" ? "컬렉션" : locale === "en" ? "Collection" : "コレクション";
  const capabilityAnchor = `<a href="#capabilities" data-section-link="capabilities">${t.navCapability}</a><a href="#preview" data-section-link="preview">${newPreviewLabel}</a>`;
  html = html.replaceAll(navAnchor, capabilityAnchor);

  html = html.replace(/<aside class="softmoon-phase-card">[\s\S]*?<\/aside>/, phaseCard(locale));
  html = html.replace(
    /<div class="softmoon-digital-visual" aria-label="[^"]+">\s*<div class="softmoon-phone">[\s\S]*?<div class="softmoon-qr" aria-hidden="true"><\/div>\s*<\/div>\s*<\/div>/,
    digitalArchiveVisual(locale)
  );
  html = html.replace('<section class="softmoon-section softmoon-preview-section" id="preview">', `${capabilitySection(locale)}<section class="softmoon-section softmoon-preview-section" id="preview">`);
  html = html.replace('<section class="softmoon-section softmoon-roadmap-section" id="roadmap">', `${standardsSection(locale)}<section class="softmoon-section softmoon-roadmap-section" id="roadmap">`);

  t.previewCards.forEach(([oldTitle, newTitle, newDescription]) => {
    html = html.replace(`<h3>${oldTitle}</h3>`, `<h3>${newTitle}</h3>`);
    const pattern = new RegExp(`<h3>${newTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</h3>\\s*<p>[^<]+</p>`);
    html = html.replace(pattern, `<h3>${newTitle}</h3><p>${newDescription}</p>`);
  });

  t.principles.forEach(([oldTitle, newTitle, body]) => {
    html = html.replace(`<h3>${oldTitle}</h3>`, `<h3>${newTitle}</h3>`);
    const heading = `<h3>${newTitle}</h3>`;
    const index = html.indexOf(heading);
    if (index >= 0) {
      const paragraphStart = html.indexOf("<p>", index + heading.length);
      const paragraphEnd = html.indexOf("</p>", paragraphStart);
      if (paragraphStart >= 0 && paragraphEnd >= 0) html = `${html.slice(0, paragraphStart + 3)}${body}${html.slice(paragraphEnd)}`;
    }
  });

  t.areaNames.forEach((name, index) => {
    const legacy = locale === "ko"
      ? ["페이퍼 굿즈", "소형 키트", "패키징", "디지털 콘텐츠"][index]
      : locale === "en"
        ? ["Paper Goods", "Small Kits", "Packaging", "Digital Content"][index]
        : ["ペーパーグッズ", "スモールキット", "パッケージ", "デジタルコンテンツ"][index];
    html = html.replace(`<h3>${legacy}</h3>`, `<h3>${name}</h3>`);
  });

  t.process.forEach(([legacy, title, body]) => {
    html = html.replace(`<h3>${legacy}</h3>`, `<h3>${title}</h3>`);
    const heading = `<h3>${title}</h3>`;
    const index = html.indexOf(heading);
    if (index >= 0) {
      const paragraphStart = html.indexOf("<p>", index + heading.length);
      const paragraphEnd = html.indexOf("</p>", paragraphStart);
      if (paragraphStart >= 0 && paragraphEnd >= 0) html = `${html.slice(0, paragraphStart + 3)}${body}${html.slice(paragraphEnd)}`;
    }
  });

  t.roadmapTitles.forEach((title, index) => {
    const legacy = locale === "ko"
      ? ["브랜드 시스템 정리", "페이퍼 굿즈 시제품", "소규모 사용 테스트", "첫 번째 소규모 릴리스"][index]
      : locale === "en"
        ? ["Brand system", "Paper prototypes", "Small-scale use test", "First small release"][index]
        : ["ブランドシステム", "ペーパー試作品", "小規模使用テスト", "最初の小規模リリース"][index];
    html = html.replace(`<h3>${legacy}</h3>`, `<h3>${title}</h3>`);
  });

  const collabBody = `<p>${t.collaborationBody}</p>`;
  html = html.replace(collabBody, `${collabBody}${collaborationScope(locale)}`);
  return html;
}

export function renderSoftmoonBody(locale) {
  const resolvedLocale = localeData[locale] ? locale : "ko";
  return applyProfessionalCopy(renderBaseSoftmoonBody(resolvedLocale), resolvedLocale);
}
