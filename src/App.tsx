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

function App() {
  const [locale, setLocale] = useState<Locale>(getLocaleFromPath);
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
    const onPopState = () => setLocale(getLocaleFromPath());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    document.documentElement.lang = localeToHtmlLang[locale];
    document.title = t.seoTitle;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", t.seoDescription);
    const canonical = document.querySelector('link[rel="canonical"]');
    canonical?.setAttribute("href", `https://lavalabs.co.kr${localePaths[locale]}`);
  }, [locale, t.seoDescription, t.seoTitle]);

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

      <footer className="site-footer">
        <div className="section-inner footer-layout">
          <div>
            <a className="brand-link" href="#top">
              <BrandMark />
              <span>Lava Labs</span>
            </a>
            <p>{t.footer}</p>
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
            <a href="/terms">Terms</a>
            <a href="/privacy">Privacy</a>
          </div>
          <small>(c) {currentYear} Lava Labs. All rights reserved.</small>
        </div>
      </footer>
      <Chatbot locale={locale} />
    </div>
  );
}

export default App;
