import { useMemo } from "react";
import { ArrowLeft, ArrowUpRight, ChevronRight, Download, Globe2, Mail, Package, Sparkles } from "lucide-react";
import { content, localeLabels, locales, Locale } from "./content";
import { getCompany } from "./company";
import { trackEvent } from "./analytics";

type LegalKind = "terms" | "privacy";
type LegalSection = { title: string; paragraphs: string[]; items?: string[] };

const localeFromPath = (): Locale => {
  const path = window.location.pathname.toLowerCase();
  if (path.startsWith("/en/")) return "en";
  if (path.startsWith("/jp/")) return "jp";
  return "ko";
};

const softMoonPaths: Record<Locale, string> = {
  ko: "/soft_moon/",
  en: "/en/soft_moon/",
  jp: "/jp/soft_moon/"
};

const legalPages: Record<LegalKind, { kicker: string; title: string; description: string; updated: string; sections: LegalSection[] }> = {
  terms: {
    kicker: "Terms",
    title: "서비스 이용약관",
    description: "Lava Labs 웹사이트, 프로젝트 문의와 제작 의뢰에 적용되는 기본 이용 조건입니다.",
    updated: "시행일: 2026년 6월 28일",
    sections: [
      { title: "1. 목적", paragraphs: ["본 약관은 Lava Labs가 운영하는 웹사이트와 프로젝트 상담·제작 서비스를 이용하는 과정에서 회사와 이용자 사이의 기본 권리와 의무를 정하는 것을 목적으로 합니다."] },
      { title: "2. 서비스 범위", paragraphs: ["Lava Labs는 다음 서비스를 제공할 수 있습니다."], items: ["브랜드 홈페이지, 랜딩페이지와 포트폴리오 제작", "사진·영상·SNS용 시각 콘텐츠 기획 및 제작", "브랜드 소개 문구와 콘텐츠 구조 설계", "다국어 페이지와 운영 구조 개선", "굿즈·패키징 및 양 당사자가 별도로 협의한 프로젝트"] },
      { title: "3. 문의와 계약", paragraphs: ["웹사이트 문의 제출만으로 계약이 성립하지 않습니다. 프로젝트 범위, 일정, 비용, 산출물, 수정 횟수와 결제 조건은 별도 견적서·계약서 또는 합의 문서로 확정합니다."] },
      { title: "4. 자료 제공과 권리", paragraphs: ["이용자는 제공하는 로고, 사진, 문구, 영상과 기타 자료를 사용할 권한이 있어야 합니다. 제3자의 저작권·초상권·상표권 또는 개인정보를 침해하는 자료를 제공해서는 안 됩니다."] },
      { title: "5. 수정과 추가 작업", paragraphs: ["수정 가능 범위와 횟수는 프로젝트별 합의에 따릅니다. 최초 합의 범위를 벗어나는 기능, 페이지, 촬영, 번역 또는 콘텐츠 추가는 별도 비용과 일정이 필요할 수 있습니다."] },
      { title: "6. 지식재산권", paragraphs: ["완성 결과물의 저작권과 사용 범위, 원본 파일 제공 여부는 개별 계약에 따릅니다. 별도 비공개 합의가 없는 경우 Lava Labs는 결과물 일부를 작업 사례와 포트폴리오로 소개할 수 있습니다."] },
      { title: "7. 외부 서비스", paragraphs: ["문의 폼, 메신저, SNS, 도메인, 호스팅 등 외부 서비스의 정책 변경이나 장애는 해당 서비스 운영 정책의 영향을 받을 수 있습니다."] },
      { title: "8. 책임 제한", paragraphs: ["천재지변, 통신 장애, 외부 플랫폼 정책 변경 또는 이용자가 제공한 자료의 권리 문제처럼 회사가 합리적으로 통제하기 어려운 사유로 발생한 손해에 대해서는 관련 법령이 허용하는 범위에서 책임이 제한될 수 있습니다."] },
      { title: "9. 약관 변경", paragraphs: ["서비스 운영 방식 또는 관련 법령이 변경되는 경우 본 약관을 개정할 수 있으며, 변경 내용은 이 페이지에 게시합니다."] },
      { title: "10. 문의", paragraphs: ["약관 관련 문의는 info@lavalabs.co.kr로 보내주세요."] }
    ]
  },
  privacy: {
    kicker: "Privacy",
    title: "개인정보처리방침",
    description: "프로젝트 문의와 상담을 위해 처리하는 개인정보 항목과 이용 목적을 안내합니다.",
    updated: "시행일: 2026년 6월 28일",
    sections: [
      { title: "1. 수집 항목", paragraphs: ["문의 폼을 통해 이름, 이메일, 브랜드·회사명, 문의 유형, 희망 일정, 예상 예산 범위, 참고 자료 링크, 문의 내용과 개인정보 이용 동의 여부를 수집할 수 있습니다. 상담 과정에서 이용자가 추가로 제공한 프로젝트 자료도 처리될 수 있습니다."] },
      { title: "2. 이용 목적", paragraphs: ["수집한 정보는 다음 목적으로만 사용합니다."], items: ["프로젝트 문의 확인과 답변", "제작 범위, 일정과 견적 상담", "계약 전후 커뮤니케이션과 산출물 전달", "반복·악성 문의 방지와 서비스 안정성 확인", "분쟁 예방과 상담 기록 확인"] },
      { title: "3. 보관 기간", paragraphs: ["단순 문의 기록은 처리 완료 후 최대 1년 동안 보관할 수 있으며, 계약과 거래가 이루어진 경우 관련 법령 또는 계약상 필요한 기간 동안 보관합니다. 보관 목적이 끝난 정보는 안전한 방법으로 삭제합니다."] },
      { title: "4. 외부 처리 서비스", paragraphs: ["문의 전송에는 Formspree 등 외부 폼 처리 서비스가 사용될 수 있습니다. 메일, 메신저, 호스팅과 기타 외부 서비스 이용 과정에는 각 서비스의 개인정보처리방침이 함께 적용될 수 있습니다."] },
      { title: "5. 제3자 제공", paragraphs: ["법령에 따른 요청 또는 이용자와 사전에 협의한 프로젝트 수행 목적을 제외하고 개인정보를 외부에 판매하거나 임의로 제공하지 않습니다."] },
      { title: "6. 이용자의 권리", paragraphs: ["이용자는 본인의 개인정보 열람, 정정, 삭제 또는 처리 정지를 요청할 수 있습니다. 요청은 info@lavalabs.co.kr로 접수할 수 있으며, 필요한 본인 확인 후 처리합니다."] },
      { title: "7. 안전성 확보", paragraphs: ["계정 접근 제한, 자료 보관 관리, 불필요한 정보 삭제 등 합리적인 보호 조치를 적용합니다. 문의 폼에는 자동화된 스팸 제출을 줄이기 위한 숨김 필드와 반복 제출 제한이 적용될 수 있습니다."] },
      { title: "8. 방침 변경", paragraphs: ["수집 항목, 외부 서비스 또는 운영 방식이 달라지는 경우 이 방침을 개정하고 시행일을 표시합니다."] },
      { title: "9. 담당 연락처", paragraphs: ["개인정보 관련 문의와 권리 요청: info@lavalabs.co.kr"] }
    ]
  }
};

const softMoonCopy = {
  ko: {
    eyebrow: "In-house Brand",
    title: "SoftMoon",
    statement: "우주와 자연의 분위기를 작은 물건과 디지털 경험으로 옮깁니다.",
    body: "SoftMoon은 Lava Labs가 직접 기획하고 발전시키는 자체 브랜드입니다. 엽서, 스티커, 키트, 패키징과 디지털 콘텐츠를 실험하며 작은 브랜드를 실제로 운영하는 과정을 축적합니다.",
    principles: ["작은 수량으로 시작하는 현실적인 제품 기획", "사진과 문구, 패키지를 하나의 분위기로 연결", "오프라인 물건과 디지털 콘텐츠를 함께 설계"],
    sectionTitle: "현재 연구하고 있는 것",
    items: [["Paper Goods", "엽서, 스티커와 인쇄물"], ["Small Kits", "기록과 체험을 위한 작은 키트"], ["Packaging", "브랜드 경험을 이어주는 포장 구조"], ["Digital Content", "제품과 함께 사용할 수 있는 디지털 콘텐츠"]],
    download: "브랜드 소개서 다운로드",
    contact: "협업 문의하기",
    back: "Lava Labs로 돌아가기"
  },
  en: {
    eyebrow: "In-house Brand",
    title: "SoftMoon",
    statement: "Translating the mood of space and nature into small objects and digital experiences.",
    body: "SoftMoon is an in-house brand planned and developed by Lava Labs. We explore postcards, stickers, small kits, packaging, and digital content while learning how a small brand operates in practice.",
    principles: ["Practical product planning that can begin with small quantities", "One visual direction across photography, copy, and packaging", "Physical goods designed together with digital content"],
    sectionTitle: "What we are exploring",
    items: [["Paper Goods", "Postcards, stickers, and printed pieces"], ["Small Kits", "Compact kits for recording and participation"], ["Packaging", "Packaging structures that extend the brand experience"], ["Digital Content", "Digital content designed to accompany physical products"]],
    download: "Download brand introduction",
    contact: "Discuss a collaboration",
    back: "Back to Lava Labs"
  },
  jp: {
    eyebrow: "In-house Brand",
    title: "SoftMoon",
    statement: "宇宙と自然の空気感を、小さなものとデジタル体験へ移します。",
    body: "SoftMoonはLava Labsが直接企画・運営する自社ブランドです。ポストカード、ステッカー、小さなキット、パッケージ、デジタルコンテンツを試作しながら、小さなブランドを実際に運営する経験を蓄積しています。",
    principles: ["少量から始められる現実的な商品企画", "写真・コピー・パッケージを一つの雰囲気に統一", "オフラインの商品とデジタルコンテンツを一緒に設計"],
    sectionTitle: "現在研究していること",
    items: [["Paper Goods", "ポストカード、ステッカー、印刷物"], ["Small Kits", "記録と体験のための小さなキット"], ["Packaging", "ブランド体験をつなぐパッケージ構造"], ["Digital Content", "商品と一緒に使えるデジタルコンテンツ"]],
    download: "ブランド紹介資料をダウンロード",
    contact: "コラボレーション相談",
    back: "Lava Labsへ戻る"
  }
} as const;

function BrandMark() {
  return (
    <picture className="brand-mark">
      <source srcSet="/assets/images/lava-logo-transparent-160.webp" type="image/webp" />
      <img src="/assets/images/lava-logo-transparent.png" alt="Lava Labs" width="40" height="40" />
    </picture>
  );
}

function SimpleFooter({ locale }: { locale: Locale }) {
  const company = getCompany();
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className="site-footer">
      <div className="section-inner footer-layout">
        <div><a className="brand-link" href="/"><BrandMark /><span>Lava Labs</span></a><p>{content[locale].footer}</p></div>
        <div className="footer-links">
          <a href={company.kakao} target="_blank" rel="noreferrer" onClick={() => trackEvent("contact_kakao_click", { locale })}>KakaoTalk</a>
          <a href={company.instagram} target="_blank" rel="noreferrer" onClick={() => trackEvent("instagram_click", { locale })}>Instagram</a>
          <a href="/terms/">Terms</a><a href="/privacy/">Privacy</a>
        </div>
        <small>(c) {year} Lava Labs. All rights reserved.</small>
      </div>
    </footer>
  );
}

function LegalPage({ kind }: { kind: LegalKind }) {
  const page = legalPages[kind];
  return (
    <div className="app-shell legal-shell">
      <a className="skip-link" href="#main-content">본문으로 이동</a>
      <header className="site-header legal-header">
        <div className="nav-shell legal-nav"><a className="brand-link" href="/"><BrandMark /><span>Lava Labs</span></a><a className="button secondary legal-home-link" href="/"><ArrowLeft aria-hidden="true" />홈으로</a></div>
      </header>
      <main id="main-content" className="legal-page">
        <section className="section legal-hero"><div className="section-inner"><p className="eyebrow">{page.kicker}</p><h1>{page.title}</h1><p className="legal-lead">{page.description}</p><p className="legal-meta">{page.updated}</p></div></section>
        <section className="section legal-content-section"><div className="section-inner legal-card">{page.sections.map((section) => <article className="legal-section" key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}</article>)}</div></section>
      </main>
      <SimpleFooter locale="ko" />
    </div>
  );
}

function SoftMoonPage() {
  const locale = localeFromPath();
  const t = softMoonCopy[locale];
  return (
    <div className="app-shell softmoon-page-shell">
      <a className="skip-link" href="#main-content">{locale === "ko" ? "본문으로 이동" : locale === "jp" ? "本文へ移動" : "Skip to content"}</a>
      <header className="site-header">
        <div className="nav-shell softmoon-nav">
          <a className="brand-link" href={locale === "ko" ? "/" : `/${locale}/`}><BrandMark /><span>Lava Labs</span></a>
          <div className="language-switcher" aria-label="Language"><Globe2 aria-hidden="true" />{locales.map((item) => <a key={item} href={softMoonPaths[item]} aria-current={locale === item ? "page" : undefined}>{localeLabels[item]}</a>)}</div>
        </div>
      </header>
      <main id="main-content">
        <section className="section softmoon-page-hero">
          <div className="section-inner softmoon-page-hero-grid">
            <div><p className="eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p className="softmoon-page-statement">{t.statement}</p><p className="softmoon-page-body">{t.body}</p><ul className="check-list">{t.principles.map((item) => <li key={item}><Sparkles aria-hidden="true" /><span>{item}</span></li>)}</ul><div className="button-row"><a className="button primary" href="/assets/files/softmoon-intro.pdf" download onClick={() => trackEvent("softmoon_pdf_download", { locale })}><Download aria-hidden="true" />{t.download}</a><a className="button secondary" href={`${locale === "ko" ? "/" : `/${locale}/`}#contact`} onClick={() => trackEvent("softmoon_contact_click", { locale })}>{t.contact}<ArrowUpRight aria-hidden="true" /></a></div></div>
            <div className="softmoon-page-gallery"><picture><source srcSet="/assets/images/lunar-sample-1-720.webp" type="image/webp" /><img src="/assets/images/lunar-sample-1.jpg" alt="SoftMoon paper goods" width="720" height="900" /></picture><picture><source srcSet="/assets/images/lunar-sample-2-720.webp" type="image/webp" /><img src="/assets/images/lunar-sample-2.jpg" alt="SoftMoon product sample" width="720" height="900" /></picture></div>
          </div>
        </section>
        <section className="section softmoon-research-section"><div className="section-inner"><div className="section-heading compact"><p className="eyebrow">Research Areas</p><h2>{t.sectionTitle}</h2></div><div className="softmoon-research-grid">{t.items.map(([title, body]) => <article key={title}><Package aria-hidden="true" /><h3>{title}</h3><p>{body}</p></article>)}</div><a className="softmoon-back-link" href={locale === "ko" ? "/" : `/${locale}/`}><ArrowLeft aria-hidden="true" />{t.back}</a></div></section>
      </main>
      <SimpleFooter locale={locale} />
    </div>
  );
}

export default function App() {
  const path = window.location.pathname.toLowerCase();
  if (path.includes("soft_moon")) return <SoftMoonPage />;
  return <LegalPage kind={path.includes("privacy") ? "privacy" : "terms"} />;
}
