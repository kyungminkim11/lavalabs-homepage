import {
  FormEvent,
  Suspense,
  lazy,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  ArrowUpRight,
  Camera,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Download,
  ExternalLink,
  Globe2,
  Handshake,
  Leaf,
  LucideIcon,
  Mail,
  MapPin,
  MapPinned,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  Package,
  PenLine,
  Phone,
  Send,
  Sparkles,
  Store,
  X
} from "lucide-react";
import { content, IconKey, localeLabels, localePaths, locales, Locale } from "./content";

const LazyLavaScene3D = lazy(() =>
  import("./LavaScene3D").then((module) => ({ default: module.LavaScene3D }))
);
const LazyChatbot = lazy(() =>
  import("./Chatbot").then((module) => ({ default: module.Chatbot }))
);

const formEndpoint = "https://formspree.io/f/mpwdpqzk";

type FormStatus = "idle" | "sending" | "success" | "error";
type ProjectType = "" | "web" | "photo" | "content" | "multilingual" | "goods" | "partnership";

type FormData = {
  name: string;
  email: string;
  company: string;
  projectType: ProjectType;
  timeline: string;
  budget: string;
  reference: string;
  message: string;
  consent: boolean;
};

const emptyForm: FormData = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  timeline: "",
  budget: "",
  reference: "",
  message: "",
  consent: false
};

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

const upgradeCopy = {
  ko: {
    serviceCta: "이 서비스로 문의",
    workKicker: "Selected Work",
    workTitle: "실제로 운영 중인 작업",
    workIntro: "자체 브랜드와 운영 프로젝트를 통해 기획부터 제작, 배포와 개선까지 직접 검증합니다.",
    live: "운영 중",
    inHouse: "자체 프로젝트",
    visit: "사이트 방문",
    currentSite: "현재 사이트",
    caseStudies: [
      {
        title: "365 Daily Snap",
        type: "인물 스냅 포트폴리오",
        body: "촬영 분위기, 포트폴리오, 촬영 가이드와 문의 흐름을 한곳에 정리한 다국어 반응형 사이트입니다.",
        tags: ["기획", "문구", "반응형 웹", "KR·EN·JP"],
        href: "https://snap.lavalabs.co.kr/",
        status: "운영 중"
      },
      {
        title: "SoftMoon",
        type: "자체 굿즈 브랜드 연구",
        body: "우주와 자연을 모티프로 엽서, 스티커, 키트와 디지털 콘텐츠를 기획하며 브랜드 운영 과정을 축적합니다.",
        tags: ["브랜드 기획", "굿즈", "패키징", "콘텐츠"],
        href: "/soft_moon/",
        status: "자체 프로젝트"
      },
      {
        title: "Lava Labs",
        type: "스튜디오 홈페이지",
        body: "서비스 소개, 작업 사례, 다국어 페이지, 상담 도우미와 프로젝트 문의를 하나의 흐름으로 설계했습니다.",
        tags: ["웹 디자인", "개발", "SEO", "운영 개선"],
        href: "#top",
        status: "현재 사이트"
      }
    ],
    trustTitle: "작게 시작해도 운영 가능한 형태로",
    trustItems: [
      "PC와 모바일 실제 화면 검수",
      "도메인 연결과 배포 구조 정리",
      "한국어 기준 영어·일본어 확장 대응",
      "오픈 이후 직접 수정할 수 있는 운영 방식 안내"
    ],
    faqKicker: "Before We Start",
    faqTitle: "자주 묻는 내용",
    faqs: [
      ["가격은 어떻게 정해지나요?", "페이지 수, 필요한 기능, 준비된 자료, 촬영과 문구 작업 여부를 확인한 뒤 범위를 나누어 안내합니다. 문의 단계에서는 부담 없이 필요한 결과물과 예산 범위를 적어주세요."],
      ["자료가 완전히 준비되지 않아도 되나요?", "괜찮습니다. 현재 가지고 있는 로고, 사진, 메모, 참고 사이트부터 확인하고 부족한 내용을 함께 정리합니다."],
      ["홈페이지 공개 후 직접 수정할 수 있나요?", "프로젝트 성격에 따라 관리 방식이 달라집니다. 자주 바뀌는 내용과 고정 영역을 먼저 나누고, 가능한 범위에서 직접 관리하기 쉬운 구조를 제안합니다."],
      ["사진 촬영과 홈페이지를 함께 진행할 수 있나요?", "가능합니다. 홈페이지에 필요한 이미지의 비율과 용도를 먼저 정한 뒤 촬영하면 서로 다른 결과물이 아니라 하나의 브랜드 화면으로 연결하기 쉽습니다."]
    ],
    form: {
      company: "브랜드·회사명 (선택)",
      projectType: "문의 유형",
      projectPlaceholder: "선택해주세요",
      timeline: "희망 완료일 또는 일정 (선택)",
      timelinePlaceholder: "예: 8월 중 공개 희망",
      budget: "예상 예산 범위 (선택)",
      budgetPlaceholder: "정해지지 않았다면 미정으로 적어주세요",
      reference: "참고 사이트·자료 링크 (선택)",
      referencePlaceholder: "웹사이트, 인스타그램, 구글 드라이브 등",
      options: {
        web: "홈페이지·포트폴리오",
        photo: "사진·시각 콘텐츠",
        content: "브랜드 문구·콘텐츠 구성",
        multilingual: "다국어·운영 구조",
        goods: "SoftMoon·굿즈·패키징",
        partnership: "협업·파트너십"
      }
    },
    mobileCta: "프로젝트 문의",
    chat: "상담 도우미"
  },
  en: {
    serviceCta: "Ask about this service",
    workKicker: "Selected Work",
    workTitle: "Projects in active operation",
    workIntro: "We test planning, production, deployment, and improvement through our own brands and operating projects.",
    live: "Live",
    inHouse: "In-house",
    visit: "Visit site",
    currentSite: "Current site",
    caseStudies: [
      {
        title: "365 Daily Snap",
        type: "Portrait photography portfolio",
        body: "A multilingual responsive site connecting visual mood, portfolio, shoot guidance, and inquiry flow.",
        tags: ["Planning", "Copy", "Responsive web", "KR·EN·JP"],
        href: "https://snap.lavalabs.co.kr/",
        status: "Live"
      },
      {
        title: "SoftMoon",
        type: "In-house goods brand lab",
        body: "An in-house project exploring postcards, stickers, kits, packaging, and digital content inspired by space and nature.",
        tags: ["Brand planning", "Goods", "Packaging", "Content"],
        href: "/soft_moon/",
        status: "In-house"
      },
      {
        title: "Lava Labs",
        type: "Creative studio website",
        body: "A unified flow for services, selected work, multilingual pages, guided consultation, and project inquiries.",
        tags: ["Web design", "Development", "SEO", "Operations"],
        href: "#top",
        status: "Current site"
      }
    ],
    trustTitle: "Start small, but launch something operational",
    trustItems: [
      "Real-device checks on desktop and mobile",
      "Domain connection and deployment setup",
      "English and Japanese expansion from Korean content",
      "Guidance for maintaining key content after launch"
    ],
    faqKicker: "Before We Start",
    faqTitle: "Frequently asked questions",
    faqs: [
      ["How is pricing decided?", "We review page count, required functions, available assets, photography, and copy needs before defining the scope. Share your desired result and any budget range you have."],
      ["Can we start before all materials are ready?", "Yes. We can begin with your current logo, photos, notes, and reference sites, then organize what is missing."],
      ["Can I update the site after launch?", "The management method depends on the project. We separate frequently changing content from fixed areas and suggest a practical structure for ongoing updates."],
      ["Can photography and website production be combined?", "Yes. Defining image ratios and use cases before the shoot helps the photography and website feel like one coherent brand experience."]
    ],
    form: {
      company: "Brand or company (optional)",
      projectType: "Inquiry type",
      projectPlaceholder: "Select a project type",
      timeline: "Preferred date or timeline (optional)",
      timelinePlaceholder: "e.g. Launch during August",
      budget: "Estimated budget range (optional)",
      budgetPlaceholder: "Enter undecided if not set yet",
      reference: "Reference or material link (optional)",
      referencePlaceholder: "Website, Instagram, Google Drive, etc.",
      options: {
        web: "Website or portfolio",
        photo: "Photography and visual content",
        content: "Brand copy and content structure",
        multilingual: "Multilingual and operations",
        goods: "SoftMoon, goods, or packaging",
        partnership: "Collaboration or partnership"
      }
    },
    mobileCta: "Project inquiry",
    chat: "Inquiry guide"
  },
  jp: {
    serviceCta: "このサービスを相談",
    workKicker: "Selected Work",
    workTitle: "実際に運営しているプロジェクト",
    workIntro: "自社ブランドと運営プロジェクトを通して、企画・制作・公開・改善まで直接検証しています。",
    live: "運営中",
    inHouse: "自社プロジェクト",
    visit: "サイトを見る",
    currentSite: "現在のサイト",
    caseStudies: [
      {
        title: "365 Daily Snap",
        type: "人物スナップ・ポートフォリオ",
        body: "撮影の雰囲気、ポートフォリオ、撮影ガイド、お問い合わせ導線をまとめた多言語レスポンシブサイトです。",
        tags: ["企画", "コピー", "レスポンシブ", "KR·EN·JP"],
        href: "https://snap.lavalabs.co.kr/",
        status: "運営中"
      },
      {
        title: "SoftMoon",
        type: "自社グッズブランド研究",
        body: "宇宙と自然をモチーフに、ポストカード、ステッカー、キット、パッケージ、デジタルコンテンツを企画しています。",
        tags: ["ブランド企画", "グッズ", "パッケージ", "コンテンツ"],
        href: "/soft_moon/",
        status: "自社プロジェクト"
      },
      {
        title: "Lava Labs",
        type: "スタジオ公式サイト",
        body: "サービス、制作事例、多言語ページ、相談ガイド、お問い合わせを一つの流れとして設計しました。",
        tags: ["Webデザイン", "開発", "SEO", "運営改善"],
        href: "#top",
        status: "現在のサイト"
      }
    ],
    trustTitle: "小さく始めても、実際に運営できる形へ",
    trustItems: [
      "PC・スマートフォン実機での確認",
      "ドメイン接続と公開構成の整理",
      "韓国語を基準に英語・日本語へ拡張",
      "公開後に更新しやすい運営方法の案内"
    ],
    faqKicker: "Before We Start",
    faqTitle: "よくあるご質問",
    faqs: [
      ["料金はどのように決まりますか？", "ページ数、必要な機能、準備済みの素材、撮影やコピー制作の有無を確認し、制作範囲を分けてご案内します。"],
      ["素材がすべて揃っていなくても始められますか？", "はい。現在お持ちのロゴ、写真、メモ、参考サイトから確認し、不足している内容を一緒に整理します。"],
      ["公開後に自分で更新できますか？", "プロジェクトに応じて管理方法をご提案します。更新頻度の高い内容と固定部分を分け、運用しやすい構成を検討します。"],
      ["写真撮影とサイト制作を一緒に依頼できますか？", "可能です。必要な画像比率や用途を先に決めて撮影することで、写真とWebを一つのブランド体験としてつなげられます。"]
    ],
    form: {
      company: "ブランド・会社名（任意）",
      projectType: "お問い合わせ種別",
      projectPlaceholder: "選択してください",
      timeline: "希望日程・公開日（任意）",
      timelinePlaceholder: "例：8月中に公開希望",
      budget: "想定予算（任意）",
      budgetPlaceholder: "未定の場合は未定と入力してください",
      reference: "参考サイト・資料リンク（任意）",
      referencePlaceholder: "Webサイト、Instagram、Google Driveなど",
      options: {
        web: "Webサイト・ポートフォリオ",
        photo: "写真・ビジュアルコンテンツ",
        content: "ブランドコピー・構成",
        multilingual: "多言語・運営構成",
        goods: "SoftMoon・グッズ・パッケージ",
        partnership: "協業・パートナーシップ"
      }
    },
    mobileCta: "プロジェクト相談",
    chat: "相談ガイド"
  }
} as const;

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

function ChatbotGate({ locale, label }: { locale: Locale; label: string }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    const timer = window.setTimeout(() => {
      document.querySelector<HTMLButtonElement>(".chatbot-launcher")?.click();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [loaded]);

  if (loaded) {
    return (
      <Suspense fallback={null}>
        <LazyChatbot locale={locale} />
      </Suspense>
    );
  }

  return (
    <div className="chatbot chatbot-gate">
      <button className="chatbot-launcher" type="button" onClick={() => setLoaded(true)}>
        <MessageCircle aria-hidden="true" />
        <span>{label}</span>
      </button>
    </div>
  );
}

export default function HomeApp() {
  const [locale, setLocale] = useState<Locale>(getLocaleFromPath);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [show3D, setShow3D] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  const t = content[locale];
  const u = upgradeCopy[locale];
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const syncFromPath = () => setLocale(getLocaleFromPath());
    window.addEventListener("popstate", syncFromPath);
    return () => window.removeEventListener("popstate", syncFromPath);
  }, []);

  useEffect(() => {
    document.documentElement.lang = localeToHtmlLang[locale];
    document.title = t.seoTitle;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.seoDescription);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", `https://lavalabs.co.kr${localePaths[locale]}`);
  }, [locale, t.seoDescription, t.seoTitle]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 761px) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!desktop || reducedMotion) return;
    const timer = window.setTimeout(() => setShow3D(true), 650);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const contact = document.querySelector("#contact");
    if (!contact) return;
    const observer = new IntersectionObserver(([entry]) => setContactVisible(entry.isIntersecting), { threshold: 0.08 });
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ message?: string }>).detail;
      if (!detail?.message) return;
      setFormData((data) => ({ ...data, message: detail.message ?? data.message }));
      setFormStatus("idle");
      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener("lavalabs:prefill-contact", handler);
    return () => window.removeEventListener("lavalabs:prefill-contact", handler);
  }, []);

  const changeLocale = (nextLocale: Locale) => {
    setLocale(nextLocale);
    setMenuOpen(false);
    window.history.pushState({}, "", localePaths[nextLocale]);
  };

  const chooseService = (projectType: ProjectType) => {
    setFormData((data) => ({ ...data, projectType }));
    setFormStatus("idle");
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("sending");

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          projectType: formData.projectType ? u.form.options[formData.projectType] : "",
          timeline: formData.timeline,
          budget: formData.budget,
          reference: formData.reference,
          message: formData.message,
          locale,
          source: "lavalabs.co.kr enhanced inquiry"
        })
      });

      if (!response.ok) throw new Error("Contact form failed");
      setFormStatus("success");
      setFormData(emptyForm);
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="app-shell home-upgraded">
      <a className="skip-link" href="#main-content">Skip to content</a>

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
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </nav>
          <div className="language-switcher" aria-label="Language">
            <Globe2 aria-hidden="true" />
            {locales.map((item) => (
              <button key={item} type="button" aria-pressed={locale === item} onClick={() => changeLocale(item)}>
                {localeLabels[item]}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          {show3D && (
            <Suspense fallback={null}>
              <LazyLavaScene3D />
            </Suspense>
          )}
          <div className="section-inner hero-inner">
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1>{t.hero.title}</h1>
            <p className="hero-statement">{t.hero.statement}</p>
            <p className="hero-copy">{t.hero.body}</p>
            <div className="hero-actions">
              <a className="button primary" href="#contact"><Send aria-hidden="true" />{t.hero.primary}</a>
              <a className="button secondary" href="#projects">{t.hero.secondary}<ChevronRight aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Lava Labs highlights">
          <div className="section-inner proof-grid">
            {t.hero.proof.map(([value, label]) => (
              <div className="proof-item" key={label}><strong>{value}</strong><span>{label}</span></div>
            ))}
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="section-inner two-column">
            <div className="section-heading"><p className="eyebrow">{t.about.kicker}</p><h2>{t.about.title}</h2></div>
            <div className="body-copy">
              <p>{t.about.body}</p>
              <ul className="check-list">
                {t.about.highlights.map((item) => <li key={item}><CheckCircle2 aria-hidden="true" /><span>{item}</span></li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="section muted-section" id="services">
          <div className="section-inner">
            <div className="section-heading compact"><p className="eyebrow">Services</p><h2>{t.servicesTitle}</h2><p>{t.servicesIntro}</p></div>
            <div className="service-grid">
              {t.services.map((service, index) => {
                const typeMap: ProjectType[] = ["web", "photo", "content", "multilingual"];
                return (
                  <article className="service-card" key={service.title}>
                    <div className="service-icon"><Icon name={service.icon} /></div>
                    <h3>{service.title}</h3>
                    <p>{service.body}</p>
                    <div className="tag-row">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <button className="service-link" type="button" onClick={() => chooseService(typeMap[index] ?? "")}>{u.serviceCta}<ChevronRight aria-hidden="true" /></button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section portfolio-section" id="projects">
          <div className="section-inner">
            <div className="section-heading compact"><p className="eyebrow">{u.workKicker}</p><h2>{u.workTitle}</h2><p>{u.workIntro}</p></div>
            <div className="case-grid">
              {u.caseStudies.map((project, index) => (
                <article className={`case-card case-card-${index + 1}`} key={project.title}>
                  <div className="case-preview" aria-hidden="true">
                    <div className="case-browser"><span /><span /><span /></div>
                    <strong>{project.title}</strong>
                    <small>{project.type}</small>
                  </div>
                  <div className="case-content">
                    <span className="case-status">{project.status}</span>
                    <h3>{project.title}</h3>
                    <p className="case-type">{project.type}</p>
                    <p>{project.body}</p>
                    <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <a href={project.href} target={project.href.startsWith("http") ? "_blank" : undefined} rel={project.href.startsWith("http") ? "noreferrer" : undefined}>
                      {u.visit}<ExternalLink aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section split-band">
          <div className="section-inner split-layout">
            <div>
              <div className="section-heading"><p className="eyebrow">Reliable Delivery</p><h2>{u.trustTitle}</h2></div>
              <ul className="project-list">
                {u.trustItems.map((item) => <li key={item}><CheckCircle2 aria-hidden="true" /><span>{item}</span></li>)}
              </ul>
            </div>
            <div className="process-panel">
              <p className="eyebrow">Process</p><h2>{t.processTitle}</h2>
              <ol className="process-list">{t.process.map(([title, body]) => <li key={title}><strong>{title}</strong><span>{body}</span></li>)}</ol>
            </div>
          </div>
        </section>

        <section className="section expertise-section">
          <div className="section-inner">
            <div className="section-heading compact"><p className="eyebrow">Coverage</p><h2>{t.expertiseTitle}</h2></div>
            <div className="expertise-grid">{t.expertise.map(([icon, label]) => <div className="expertise-item" key={label}><Icon name={icon} /><span>{label}</span></div>)}</div>
          </div>
        </section>

        <section className="section softmoon-section" id="softmoon">
          <div className="section-inner softmoon-layout">
            <div className="softmoon-copy">
              <p className="eyebrow">{t.softMoon.kicker}</p><h2>{t.softMoon.title}</h2><p>{t.softMoon.body}</p>
              <div className="button-row">
                <a className="button primary" href="/soft_moon/">{t.softMoon.view}<ArrowUpRight aria-hidden="true" /></a>
                <a className="button ghost" href="/assets/files/softmoon-intro.pdf" download><Download aria-hidden="true" />{t.softMoon.download}</a>
              </div>
            </div>
            <div className="softmoon-gallery" aria-label="SoftMoon product samples">
              <picture><source srcSet="/assets/images/lunar-sample-1-720.webp" type="image/webp" /><img src="/assets/images/lunar-sample-1.jpg" alt="SoftMoon sample 1" loading="lazy" width="720" height="900" /></picture>
              <picture><source srcSet="/assets/images/lunar-sample-2-720.webp" type="image/webp" /><img src="/assets/images/lunar-sample-2.jpg" alt="SoftMoon sample 2" loading="lazy" width="720" height="900" /></picture>
            </div>
          </div>
        </section>

        <section className="section faq-section">
          <div className="section-inner faq-layout">
            <div className="section-heading"><p className="eyebrow">{u.faqKicker}</p><h2>{u.faqTitle}</h2></div>
            <div className="faq-list">{u.faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronRight aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="section-inner contact-layout">
            <div className="contact-copy">
              <p className="eyebrow">{t.contact.kicker}</p><h2>{t.contact.title}</h2><p>{t.contact.body}</p>
              <div className="contact-methods">
                <a href={`tel:${t.contact.tel.replace(/-/g, "")}`}><Phone aria-hidden="true" />{t.contact.tel}</a>
                <a href={`mailto:${t.contact.emailText}`}><Mail aria-hidden="true" />{t.contact.emailText}</a>
                <span><MapPin aria-hidden="true" />경기도 고양시 일산서구 일현로 47, 2층 204호 1308호실</span>
              </div>
            </div>
            <form className="contact-form enhanced-contact-form" onSubmit={handleSubmit}>
              <div className="form-pair">
                <label><span>{t.contact.name}</span><input name="name" type="text" autoComplete="name" value={formData.name} onChange={(event) => setFormData((data) => ({ ...data, name: event.target.value }))} required /></label>
                <label><span>{t.contact.email}</span><input name="email" type="email" autoComplete="email" value={formData.email} onChange={(event) => setFormData((data) => ({ ...data, email: event.target.value }))} required /></label>
              </div>
              <div className="form-pair">
                <label><span>{u.form.company}</span><input name="company" type="text" autoComplete="organization" value={formData.company} onChange={(event) => setFormData((data) => ({ ...data, company: event.target.value }))} /></label>
                <label><span>{u.form.projectType}</span><select name="projectType" value={formData.projectType} onChange={(event) => setFormData((data) => ({ ...data, projectType: event.target.value as ProjectType }))} required><option value="">{u.form.projectPlaceholder}</option>{Object.entries(u.form.options).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
              </div>
              <div className="form-pair">
                <label><span>{u.form.timeline}</span><input name="timeline" type="text" placeholder={u.form.timelinePlaceholder} value={formData.timeline} onChange={(event) => setFormData((data) => ({ ...data, timeline: event.target.value }))} /></label>
                <label><span>{u.form.budget}</span><input name="budget" type="text" placeholder={u.form.budgetPlaceholder} value={formData.budget} onChange={(event) => setFormData((data) => ({ ...data, budget: event.target.value }))} /></label>
              </div>
              <label><span>{u.form.reference}</span><input name="reference" type="url" inputMode="url" placeholder={u.form.referencePlaceholder} value={formData.reference} onChange={(event) => setFormData((data) => ({ ...data, reference: event.target.value }))} /></label>
              <label><span>{t.contact.message}</span><textarea name="message" rows={7} value={formData.message} onChange={(event) => setFormData((data) => ({ ...data, message: event.target.value }))} required /></label>
              <label className="consent-row"><input name="consent" type="checkbox" checked={formData.consent} onChange={(event) => setFormData((data) => ({ ...data, consent: event.target.checked }))} required /><span>{t.contact.consent} <a href="/privacy/">Privacy</a></span></label>
              <button className="button primary submit-button" type="submit" disabled={formStatus === "sending"}><Send aria-hidden="true" />{formStatus === "sending" ? t.contact.sending : t.contact.submit}</button>
              {formStatus !== "idle" && <p className={`form-status ${formStatus}`} role="status">{formStatus === "success" && t.contact.success}{formStatus === "error" && t.contact.error}{formStatus === "sending" && t.contact.sending}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-inner footer-layout">
          <div><a className="brand-link" href="/"><BrandMark /><span>Lava Labs</span></a><p>{t.footer}</p></div>
          <div className="footer-links">
            <a href="https://pf.kakao.com/_xnSxefxj" target="_blank" rel="noreferrer">KakaoTalk</a>
            <a href="https://www.instagram.com/lavalabs_official/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="/terms/">Terms</a><a href="/privacy/">Privacy</a>
          </div>
          <small>(c) {currentYear} Lava Labs. All rights reserved.</small>
        </div>
      </footer>

      {!contactVisible && <a className="mobile-contact-bar" href="#contact"><Send aria-hidden="true" />{u.mobileCta}</a>}
      <ChatbotGate locale={locale} label={u.chat} />
    </div>
  );
}
