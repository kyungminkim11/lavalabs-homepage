import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Camera,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Download,
  Globe2,
  Handshake,
  Leaf,
  LucideIcon,
  Mail,
  MapPin,
  MapPinned,
  Menu,
  MonitorSmartphone,
  Package,
  PenLine,
  Phone,
  Send,
  Sparkles,
  Store,
  X
} from "lucide-react";
import { Chatbot } from "./Chatbot";
import { LavaScene3D } from "./LavaScene3D";
import { content, IconKey, localeLabels, localePaths, locales, Locale } from "./content";

const formEndpoint = "https://formspree.io/f/mpwdpqzk";

const iconMap: Record<IconKey, LucideIcon> = {
  camera: Camera,
  clipboard: ClipboardList,
  handshake: Handshake,
  leaf: Leaf,
  map: MapPinned,
  package: Package,
  pen: PenLine,
  screen: MonitorSmartphone,
  sparkles: Sparkles,
  store: Store
};

const getLocaleFromPath = (): Locale => {
  const path = window.location.pathname.toLowerCase();
  if (path.startsWith("/en")) return "en";
  if (path.startsWith("/jp")) return "jp";
  return "ko";
};

const localeToHtmlLang: Record<Locale, string> = {
  ko: "ko",
  en: "en",
  jp: "ja"
};

type FormStatus = "idle" | "sending" | "success" | "error";
type PageKind = "home" | "terms" | "privacy";

type LegalSection = {
  title: string;
  paragraphs: string[];
  items?: string[];
};

const getPageFromPath = (): PageKind => {
  const normalized = window.location.pathname.toLowerCase().replace(/\/+$/, "") || "/";
  if (normalized === "/terms") return "terms";
  if (normalized === "/privacy") return "privacy";
  return "home";
};

const legalPages: Record<Exclude<PageKind, "home">, {
  kicker: string;
  title: string;
  description: string;
  updated: string;
  seoTitle: string;
  seoDescription: string;
  sections: LegalSection[];
}> = {
  terms: {
    kicker: "Terms",
    title: "서비스 이용약관",
    description:
      "Lava Labs 웹사이트 및 프로젝트 문의, 제작 의뢰, 콘텐츠·웹·굿즈 관련 서비스 이용에 관한 기본 조건을 정리한 문서입니다.",
    updated: "시행일: 2026년 6월 14일",
    seoTitle: "Terms | Lava Labs",
    seoDescription: "Lava Labs 서비스 이용약관입니다. 프로젝트 문의, 제작 의뢰, 콘텐츠 및 웹 제작 이용 조건을 안내합니다.",
    sections: [
      {
        title: "1. 목적",
        paragraphs: [
          "본 약관은 Lava Labs가 운영하는 웹사이트와 문의·상담·제작 서비스를 이용하는 과정에서 회사와 이용자 사이의 권리, 의무 및 책임사항을 정하는 것을 목적으로 합니다."
        ]
      },
      {
        title: "2. 서비스 범위",
        paragraphs: ["Lava Labs는 다음과 같은 서비스를 제공할 수 있습니다."],
        items: [
          "브랜드 랜딩페이지, 포트폴리오, 마이크로 사이트 제작",
          "사진·영상·SNS 콘텐츠 기획 및 제작",
          "브랜드 소개서, 문구, 콘텐츠 구조 설계",
          "굿즈, 패키징, 체험 프로그램 기획",
          "기타 양 당사자가 협의한 프로젝트 업무"
        ]
      },
      {
        title: "3. 문의 및 계약",
        paragraphs: [
          "웹사이트 문의는 정식 계약이 아니며, 프로젝트 범위·일정·견적·산출물은 별도 상담 및 합의에 따라 확정됩니다. 필요 시 견적서, 작업 범위서, 계약서 또는 별도 합의 문서가 우선 적용될 수 있습니다."
        ]
      },
      {
        title: "4. 이용자의 의무",
        paragraphs: ["이용자는 문의 및 프로젝트 진행 과정에서 정확한 정보를 제공해야 하며, 다음 행위를 해서는 안 됩니다."],
        items: [
          "타인의 권리, 개인정보, 저작권을 침해하는 자료 제공",
          "허위 정보 또는 부정확한 연락처 제공",
          "서비스 운영을 방해하거나 악성 코드를 포함한 자료 전송",
          "불법적이거나 사회질서에 반하는 목적의 제작 의뢰"
        ]
      },
      {
        title: "5. 지식재산권",
        paragraphs: [
          "프로젝트 결과물의 저작권, 사용 범위, 원본 파일 제공 여부, 2차 사용 범위는 개별 계약 또는 합의 내용에 따릅니다. 별도 합의가 없는 경우 Lava Labs는 포트폴리오, 작업 사례, 홍보 목적으로 일부 결과물을 사용할 수 있습니다. 공개를 원하지 않는 경우 사전에 알려주세요."
        ]
      },
      {
        title: "6. 수정 및 유지보수",
        paragraphs: [
          "결과물 수정 횟수, 수정 가능 범위, 유지보수 기간은 프로젝트별로 다를 수 있습니다. 최초 합의 범위를 초과하는 추가 작업은 별도 비용과 일정 협의가 필요할 수 있습니다."
        ]
      },
      {
        title: "7. 외부 서비스",
        paragraphs: [
          "웹사이트에는 Formspree, Instagram, KakaoTalk 등 외부 서비스로 연결되는 기능이 포함될 수 있습니다. 외부 서비스의 장애, 정책 변경, 계정 제한 등으로 발생하는 문제는 해당 서비스의 정책에 따릅니다."
        ]
      },
      {
        title: "8. 책임의 제한",
        paragraphs: [
          "Lava Labs는 이용자가 제공한 자료의 정확성, 권리 관계, 사용 허가 여부를 사전에 모두 검증하지 않습니다. 제공 자료로 인해 발생하는 분쟁은 자료 제공자에게 책임이 있을 수 있습니다. 다만 회사의 고의 또는 중대한 과실이 있는 경우에는 관련 기준에 따라 책임을 부담합니다."
        ]
      },
      {
        title: "9. 약관 변경",
        paragraphs: ["본 약관은 서비스 운영 방식이나 법령, 정책 변경에 따라 개정될 수 있습니다. 변경 사항은 본 페이지를 통해 공지합니다."]
      },
      {
        title: "10. 문의",
        paragraphs: ["약관 관련 문의는 info@lavalabs.co.kr 로 보내주세요."]
      }
    ]
  },
  privacy: {
    kicker: "Privacy",
    title: "개인정보처리방침",
    description:
      "Lava Labs는 프로젝트 문의와 상담 응대를 위해 필요한 최소한의 개인정보를 처리합니다. 본 방침은 수집 항목, 이용 목적, 보관 기간 및 이용자의 권리를 안내합니다.",
    updated: "시행일: 2026년 6월 14일",
    seoTitle: "Privacy | Lava Labs",
    seoDescription: "Lava Labs 개인정보처리방침입니다. 문의 응대와 프로젝트 상담 과정에서 처리하는 개인정보 항목과 이용 목적을 안내합니다.",
    sections: [
      {
        title: "1. 개인정보 수집 항목",
        paragraphs: [
          "Lava Labs는 문의 폼 또는 이메일 상담 과정에서 이름, 이메일, 문의 내용, 회사명, 프로젝트 관련 자료 등 상담에 필요한 정보를 수집할 수 있습니다. 웹사이트 안정성 확인을 위해 기기 정보, 브라우저 정보, 접속 로그 등 자동 생성 정보가 처리될 수 있습니다."
        ]
      },
      {
        title: "2. 개인정보 이용 목적",
        paragraphs: ["수집한 개인정보는 다음 목적을 위해 사용합니다."],
        items: [
          "프로젝트 문의 확인 및 답변",
          "견적, 일정, 제작 범위 상담",
          "계약 전후 커뮤니케이션 및 산출물 전달",
          "서비스 품질 개선 및 오류 대응",
          "분쟁 예방 및 기록 보관"
        ]
      },
      {
        title: "3. 보관 및 파기",
        paragraphs: [
          "개인정보는 수집 목적 달성 후 지체 없이 파기하는 것을 원칙으로 합니다. 다만 상담 이력 확인, 분쟁 대응, 계약 관련 기록 보관이 필요한 경우에는 필요한 기간 동안 보관할 수 있습니다."
        ],
        items: ["단순 문의 기록: 문의 처리 완료 후 최대 1년", "계약 및 거래 관련 기록: 관계 법령 또는 계약상 필요한 기간", "삭제 요청이 있는 경우: 보관 의무가 없는 정보는 확인 후 삭제"]
      },
      {
        title: "4. 제3자 제공",
        paragraphs: [
          "Lava Labs는 이용자의 개인정보를 사전 동의 없이 외부에 판매하거나 제공하지 않습니다. 다만 법령에 따른 요청이 있거나, 프로젝트 수행을 위해 필요한 범위에서 이용자와 협의한 파트너에게 자료가 전달될 수 있습니다."
        ]
      },
      {
        title: "5. 외부 서비스 이용",
        paragraphs: [
          "웹사이트 문의 폼, SNS 링크, 메신저 링크 등 일부 기능은 외부 서비스를 통해 작동할 수 있습니다. 외부 서비스 이용 과정에서 처리되는 정보는 해당 서비스의 개인정보처리방침과 정책이 함께 적용될 수 있습니다."
        ]
      },
      {
        title: "6. 이용자의 권리",
        paragraphs: ["이용자는 본인의 개인정보에 대해 열람, 정정, 삭제, 처리 정지를 요청할 수 있습니다."],
        items: ["요청 방법: info@lavalabs.co.kr 로 이메일 문의", "확인 절차: 본인 확인 및 처리 가능 여부 검토", "처리 결과: 합리적인 기간 내 답변"]
      },
      {
        title: "7. 안전성 확보 조치",
        paragraphs: [
          "Lava Labs는 개인정보가 분실, 도난, 유출, 변조 또는 훼손되지 않도록 필요한 범위에서 접근 제한, 계정 관리, 자료 보관 관리 등 보호 조치를 수행합니다."
        ]
      },
      {
        title: "8. 개인정보 보호 담당 연락처",
        paragraphs: ["개인정보 관련 문의, 삭제 요청, 정정 요청은 info@lavalabs.co.kr 로 보내주세요."]
      },
      {
        title: "9. 방침 변경",
        paragraphs: ["본 개인정보처리방침은 서비스 운영 방식, 수집 항목, 관련 정책 변경에 따라 개정될 수 있습니다. 변경 사항은 본 페이지를 통해 안내합니다."]
      }
    ]
  }
};

function Icon({ name }: { name: IconKey }) {
  const Component = iconMap[name];
  return <Component aria-hidden="true" />;
}

function BrandMark() {
  return (
    <picture className="brand-mark">
      <source srcSet="/assets/images/lava-logo-transparent-160.webp" type="image/webp" />
      <img src="/assets/images/lava-logo-transparent.png" alt="Lava Labs" width="40" height="40" />
    </picture>
  );
}

function Footer({ currentYear, footer }: { currentYear: number; footer: string }) {
  return (
    <footer className="site-footer">
      <div className="section-inner footer-layout">
        <div>
          <a className="brand-link" href="/">
            <BrandMark />
            <span>Lava Labs</span>
          </a>
          <p>{footer}</p>
        </div>
        <div className="footer-links">
          <a href="https://pf.kakao.com/_xnSxefxj" target="_blank" rel="noreferrer">
            KakaoTalk
          </a>
          <a
            href="https://www.instagram.com/lavalabs_official/profilecard/?igsh=NDZmenlxd21wbG41"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a href="/terms/">Terms</a>
          <a href="/privacy/">Privacy</a>
        </div>
        <small>(c) {currentYear} Lava Labs. All rights reserved.</small>
      </div>
    </footer>
  );
}

function LegalPage({ page, currentYear, footer }: { page: Exclude<PageKind, "home">; currentYear: number; footer: string }) {
  const legal = legalPages[page];

  return (
    <div className="app-shell legal-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header legal-header">
        <div className="nav-shell legal-nav" aria-label="Legal navigation">
          <a className="brand-link" href="/">
            <BrandMark />
            <span>Lava Labs</span>
          </a>
          <a className="button secondary legal-home-link" href="/">
            홈으로
            <ChevronRight aria-hidden="true" />
          </a>
        </div>
      </header>

      <main id="main-content" className="legal-page">
        <section className="section legal-hero">
          <div className="section-inner">
            <p className="eyebrow">{legal.kicker}</p>
            <h1>{legal.title}</h1>
            <p className="legal-lead">{legal.description}</p>
            <p className="legal-meta">{legal.updated}</p>
          </div>
        </section>

        <section className="section legal-content-section">
          <div className="section-inner legal-card">
            {legal.sections.map((section) => (
              <article className="legal-section" key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.items && (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer currentYear={currentYear} footer={footer} />
    </div>
  );
}

function App() {
  const [locale, setLocale] = useState<Locale>(getLocaleFromPath);
  const [page, setPage] = useState<PageKind>(getPageFromPath);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    consent: false
  });

  const t = content[locale];
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const syncFromPath = () => {
      setLocale(getLocaleFromPath());
      setPage(getPageFromPath());
    };
    window.addEventListener("popstate", syncFromPath);
    return () => window.removeEventListener("popstate", syncFromPath);
  }, []);

  useEffect(() => {
    document.documentElement.lang = page === "home" ? localeToHtmlLang[locale] : "ko";

    if (page !== "home") {
      const legal = legalPages[page];
      document.title = legal.seoTitle;
      const description = document.querySelector('meta[name="description"]');
      description?.setAttribute("content", legal.seoDescription);
      const canonical = document.querySelector('link[rel="canonical"]');
      canonical?.setAttribute("href", `https://lavalabs.co.kr/${page}/`);
      return;
    }

    document.title = t.seoTitle;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", t.seoDescription);
    const canonical = document.querySelector('link[rel="canonical"]');
    canonical?.setAttribute("href", `https://lavalabs.co.kr${localePaths[locale]}`);
  }, [locale, page, t.seoDescription, t.seoTitle]);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ message?: string }>).detail;
      if (!detail?.message) return;

      setFormData((data) => ({
        ...data,
        message: detail.message ?? data.message
      }));
      setFormStatus("idle");
      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    window.addEventListener("lavalabs:prefill-contact", handler);
    return () => window.removeEventListener("lavalabs:prefill-contact", handler);
  }, []);

  const changeLocale = (nextLocale: Locale) => {
    setLocale(nextLocale);
    setPage("home");
    setMenuOpen(false);
    window.history.pushState({}, "", localePaths[nextLocale]);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("sending");

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          source: "lavalabs.co.kr redesign"
        })
      });

      if (!response.ok) {
        throw new Error("Contact form failed");
      }

      setFormStatus("success");
      setFormData({ name: "", email: "", message: "", consent: false });
    } catch {
      setFormStatus("error");
    }
  };

  if (page === "terms" || page === "privacy") {
    return <LegalPage page={page} currentYear={currentYear} footer={t.footer} />;
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header" data-open={menuOpen}>
        <div className="nav-shell" aria-label="Main navigation">
          <a className="brand-link" href="#top" onClick={() => setMenuOpen(false)}>
            <BrandMark />
            <span>Lava Labs</span>
          </a>

          <button
            className="icon-button nav-toggle"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>

          <nav id="site-navigation" className="primary-nav">
            {t.nav.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </nav>

          <div className="language-switcher" aria-label="Language">
            <Globe2 aria-hidden="true" />
            {locales.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={locale === item}
                onClick={() => changeLocale(item)}
              >
                {localeLabels[item]}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <LavaScene3D />
          <div className="section-inner hero-inner">
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1>{t.hero.title}</h1>
            <p className="hero-statement">{t.hero.statement}</p>
            <p className="hero-copy">{t.hero.body}</p>
            <div className="hero-actions">
              <a className="button primary" href="#contact">
                <Send aria-hidden="true" />
                {t.hero.primary}
              </a>
              <a className="button secondary" href="#services">
                {t.hero.secondary}
                <ChevronRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Lava Labs highlights">
          <div className="section-inner proof-grid">
            {t.hero.proof.map(([value, label]) => (
              <div className="proof-item" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="section-inner two-column">
            <div className="section-heading">
              <p className="eyebrow">{t.about.kicker}</p>
              <h2>{t.about.title}</h2>
            </div>
            <div className="body-copy">
              <p>{t.about.body}</p>
              <ul className="check-list">
                {t.about.highlights.map((item) => (
                  <li key={item}>
                    <CheckCircle2 aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section muted-section" id="services">
          <div className="section-inner">
            <div className="section-heading compact">
              <p className="eyebrow">Services</p>
              <h2>{t.servicesTitle}</h2>
              <p>{t.servicesIntro}</p>
            </div>

            <div className="service-grid">
              {t.services.map((service) => (
                <article className="service-card" key={service.title}>
                  <div className="service-icon">
                    <Icon name={service.icon} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                  <div className="tag-row">
                    {service.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section split-band" id="projects">
          <div className="section-inner split-layout">
            <div>
              <div className="section-heading">
                <p className="eyebrow">Pipeline</p>
                <h2>{t.projectsTitle}</h2>
              </div>
              <ul className="project-list">
                {t.projects.map((project) => (
                  <li key={project}>
                    <ClipboardList aria-hidden="true" />
                    <span>{project}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="process-panel">
              <p className="eyebrow">Process</p>
              <h2>{t.processTitle}</h2>
              <ol className="process-list">
                {t.process.map(([title, body]) => (
                  <li key={title}>
                    <strong>{title}</strong>
                    <span>{body}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="section expertise-section">
          <div className="section-inner">
            <div className="section-heading compact">
              <p className="eyebrow">Coverage</p>
              <h2>{t.expertiseTitle}</h2>
            </div>
            <div className="expertise-grid">
              {t.expertise.map(([icon, label]) => (
                <div className="expertise-item" key={label}>
                  <Icon name={icon} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section softmoon-section" id="softmoon">
          <div className="section-inner softmoon-layout">
            <div className="softmoon-copy">
              <p className="eyebrow">{t.softMoon.kicker}</p>
              <h2>{t.softMoon.title}</h2>
              <p>{t.softMoon.body}</p>
              <div className="button-row">
                <a className="button primary" href="/soft_moon/">
                  {t.softMoon.view}
                  <ArrowUpRight aria-hidden="true" />
                </a>
                <a className="button ghost" href="/assets/files/softmoon-intro.pdf" download>
                  <Download aria-hidden="true" />
                  {t.softMoon.download}
                </a>
              </div>
            </div>

            <div className="softmoon-gallery" aria-label="SoftMoon product samples">
              <picture>
                <source srcSet="/assets/images/lunar-sample-1-720.webp" type="image/webp" />
                <img src="/assets/images/lunar-sample-1.jpg" alt="SoftMoon sample 1" loading="lazy" />
              </picture>
              <picture>
                <source srcSet="/assets/images/lunar-sample-2-720.webp" type="image/webp" />
                <img src="/assets/images/lunar-sample-2.jpg" alt="SoftMoon sample 2" loading="lazy" />
              </picture>
            </div>
          </div>
        </section>

        <section className="section audience-section">
          <div className="section-inner two-column">
            <div className="section-heading">
              <p className="eyebrow">Partners</p>
              <h2>{t.audienceTitle}</h2>
            </div>
            <ul className="audience-list">
              {t.audience.map((item) => (
                <li key={item}>
                  <Handshake aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="section-inner contact-layout">
            <div className="contact-copy">
              <p className="eyebrow">{t.contact.kicker}</p>
              <h2>{t.contact.title}</h2>
              <p>{t.contact.body}</p>

              <div className="contact-methods">
                <a href={`tel:${t.contact.tel.replace(/-/g, "")}`}>
                  <Phone aria-hidden="true" />
                  {t.contact.tel}
                </a>
                <a href={`mailto:${t.contact.emailText}`}>
                  <Mail aria-hidden="true" />
                  {t.contact.emailText}
                </a>
                <span>
                  <MapPin aria-hidden="true" />
                  {t.contact.address}
                </span>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                <span>{t.contact.name}</span>
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(event) => setFormData((data) => ({ ...data, name: event.target.value }))}
                  required
                />
              </label>
              <label>
                <span>{t.contact.email}</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(event) => setFormData((data) => ({ ...data, email: event.target.value }))}
                  required
                />
              </label>
              <label>
                <span>{t.contact.message}</span>
                <textarea
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={(event) => setFormData((data) => ({ ...data, message: event.target.value }))}
                  required
                />
              </label>
              <label className="consent-row">
                <input
                  name="consent"
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(event) => setFormData((data) => ({ ...data, consent: event.target.checked }))}
                  required
                />
                <span>{t.contact.consent}</span>
              </label>
              <button className="button primary submit-button" type="submit" disabled={formStatus === "sending"}>
                <Send aria-hidden="true" />
                {formStatus === "sending" ? t.contact.sending : t.contact.submit}
              </button>
              {formStatus !== "idle" && (
                <p className={`form-status ${formStatus}`} role="status">
                  {formStatus === "success" && t.contact.success}
                  {formStatus === "error" && t.contact.error}
                  {formStatus === "sending" && t.contact.sending}
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <Footer currentYear={currentYear} footer={t.footer} />
      <Chatbot locale={locale} />
    </div>
  );
}

export default App;
