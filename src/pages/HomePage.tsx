import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Camera, CheckCircle2, ChevronRight, Download, Mail, MapPin, MonitorSmartphone, PenLine, Phone, Send, Sparkles } from "lucide-react";
import { content, type Locale } from "../content";
import { projectData } from "../projectData";
import { homeCopy, type ProjectType } from "../homeCopy";
import { getCompany } from "../company";
import { trackEvent } from "../analytics";
import useConversionTracking from "../hooks/useConversionTracking";
import SiteHeader from "../components/SiteHeader";
import ProjectCard from "../components/ProjectCard";
import ContactForm from "../components/ContactForm";
import BrandMark from "../components/BrandMark";
import InteractiveHeroOrb from "../components/InteractiveHeroOrb";

const localeFromPath = (): Locale => location.pathname.startsWith("/en") ? "en" : location.pathname.startsWith("/jp") ? "jp" : "ko";

export default function HomePage() {
  const locale = localeFromPath();
  const text = content[locale];
  const projects = projectData[locale];
  const labels = homeCopy[locale];
  const company = getCompany();
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const [projectType, setProjectType] = useState<ProjectType>("");
  useConversionTracking(locale);

  useEffect(() => {
    document.title = projects.seoTitle;
    document.querySelector('meta[name="description"]')?.setAttribute("content", projects.seoDescription);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", projects.seoTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", projects.seoDescription);
  }, [projects.seoDescription, projects.seoTitle]);

  const services = [...text.services, projects.webToolService];
  const operating = projects.projects.filter((project) => project.group === "operating");
  const research = projects.projects.filter((project) => project.group === "research");
  const serviceTypes: ProjectType[] = ["web", "photo", "content", "multilingual", "tools"];
  const serviceIcons = [MonitorSmartphone, Camera, PenLine, Sparkles, MonitorSmartphone];

  const chooseService = (type: ProjectType, title: string) => {
    setProjectType(type);
    trackEvent("service_inquiry_click", { locale, service: title, projectType: type });
  };

  return (
    <div className="app-shell home-upgraded professional-home">
      <a className="skip-link" href="#main-content">{labels.skip}</a>
      <SiteHeader locale={locale} navItems={text.nav} navLabel={labels.nav} openLabel={labels.menu} closeLabel={labels.close} />

      <main id="main-content">
        <section className="hero" id="top">
          <InteractiveHeroOrb />
          <div className="section-inner hero-inner">
            <p className="eyebrow">{text.hero.eyebrow}</p>
            <h1>{text.hero.title}</h1>
            <p className="hero-statement">{text.hero.statement}</p>
            <p className="hero-copy">{text.hero.body}</p>
            <p className="hero-addon"><MonitorSmartphone aria-hidden="true" />{projects.heroAddon}</p>
            <div className="hero-actions">
              <a className="button primary" href="#contact" onClick={() => trackEvent("hero_cta_click", { locale, action: "contact" })}><Send aria-hidden="true" />{text.hero.primary}</a>
              <a className="button secondary" href="#projects" onClick={() => trackEvent("hero_cta_click", { locale, action: "projects" })}>{text.hero.secondary}<ChevronRight aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Lava Labs highlights">
          <div className="section-inner proof-grid">{text.hero.proof.map(([value, label]) => <div className="proof-item" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
        </section>

        <section className="section about-section" id="about">
          <div className="section-inner two-column">
            <div className="section-heading"><p className="eyebrow">{text.about.kicker}</p><h2>{text.about.title}</h2></div>
            <div className="body-copy"><p>{text.about.body}</p><ul className="check-list">{text.about.highlights.map((item) => <li key={item}><CheckCircle2 aria-hidden="true" /><span>{item}</span></li>)}</ul></div>
          </div>
        </section>

        <section className="section muted-section" id="services">
          <div className="section-inner">
            <div className="section-heading compact"><p className="eyebrow">{labels.services}</p><h2>{labels.serviceTitle}</h2><p>{labels.serviceIntro}</p></div>
            <div className="service-grid">
              {services.map((service, index) => {
                const Icon = serviceIcons[index];
                const type = serviceTypes[index];
                return (
                  <article className="service-card" key={service.title}>
                    <div className="service-icon"><Icon aria-hidden="true" /></div>
                    <h3>{service.title}</h3><p>{service.body}</p>
                    <div className="tag-row">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <a className="service-link" href="#contact" onClick={() => chooseService(type, service.title)}>{labels.inquiry}<ChevronRight aria-hidden="true" /></a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section portfolio-section projects-upgraded" id="projects">
          <div className="section-inner upgraded-project-inner">
            <div className="section-heading compact"><p className="eyebrow">{labels.work}</p><h2>{projects.title}</h2><p>{projects.intro}</p></div>
            <div className="project-group">
              <div className="project-group-heading"><h3>{projects.operatingTitle}</h3><p>{projects.operatingIntro}</p></div>
              <div className="case-grid operating-projects">{operating.map((project, index) => <ProjectCard key={project.title} project={project} locale={locale} priority={index === 0} />)}</div>
            </div>
            <div className="project-group">
              <div className="project-group-heading"><h3>{projects.researchTitle}</h3><p>{projects.researchIntro}</p></div>
              <div className="case-grid research-projects">{research.map((project) => <ProjectCard key={project.title} project={project} locale={locale} />)}</div>
            </div>
            <p className="site-build-note"><CheckCircle2 aria-hidden="true" />{projects.siteNote}</p>
          </div>
        </section>

        <section className="section split-band">
          <div className="section-inner split-layout">
            <div><div className="section-heading"><p className="eyebrow">Reliable Delivery</p><h2>{labels.trust}</h2></div><ul className="project-list">{labels.trustItems.map((item) => <li key={item}><CheckCircle2 aria-hidden="true" /><span>{item}</span></li>)}</ul></div>
            <div className="process-panel"><p className="eyebrow">Process</p><h2>{text.processTitle}</h2><ol className="process-list">{text.process.map(([title, body]) => <li key={title}><strong>{title}</strong><span>{body}</span></li>)}</ol></div>
          </div>
        </section>

        <section className="section softmoon-section" id="softmoon">
          <div className="section-inner softmoon-layout">
            <div className="softmoon-copy"><p className="eyebrow">{text.softMoon.kicker}</p><h2>{text.softMoon.title}</h2><p>{text.softMoon.body}</p><div className="button-row"><a className="button primary" href={locale === "ko" ? "/soft_moon/" : `/${locale}/soft_moon/`}>{text.softMoon.view}<ArrowUpRight aria-hidden="true" /></a><a className="button ghost" href="/assets/files/softmoon-intro.pdf" download><Download aria-hidden="true" />{text.softMoon.download}</a></div></div>
            <div className="softmoon-gallery"><img src="/assets/images/lunar-sample-1-720.webp" alt="SoftMoon paper goods" loading="lazy" width="720" height="900" /><img src="/assets/images/lunar-sample-2-720.webp" alt="SoftMoon product sample" loading="lazy" width="720" height="900" /></div>
          </div>
        </section>

        <section className="section faq-section">
          <div className="section-inner faq-layout"><div className="section-heading"><p className="eyebrow">Before We Start</p><h2>{labels.faq}</h2></div><div className="faq-list">{labels.faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronRight aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="section-inner contact-layout">
            <div className="contact-copy"><p className="eyebrow">{text.contact.kicker}</p><h2>{text.contact.title}</h2><p>{text.contact.body}</p><div className="contact-methods"><a href={`tel:${text.contact.tel.replace(/-/g, "")}`}><Phone aria-hidden="true" />{text.contact.tel}</a><a href={`mailto:${company.email}`}><Mail aria-hidden="true" />{company.email}</a><span><MapPin aria-hidden="true" />{company.address[locale] || text.contact.address}</span></div></div>
            <ContactForm locale={locale} initialProjectType={projectType} onProjectTypeChange={setProjectType} />
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="section-inner footer-layout"><div><BrandMark /><p>{text.footer}</p></div><div className="footer-links"><a href={company.kakao} target="_blank" rel="noreferrer">KakaoTalk</a><a href={company.instagram} target="_blank" rel="noreferrer">Instagram</a><a href="/terms/">Terms</a><a href="/privacy/">Privacy</a></div><small>(c) {currentYear} Lava Labs. All rights reserved.</small></div></footer>
      <a className="mobile-contact-bar" href="#contact" onClick={() => trackEvent("mobile_contact_click", { locale })}><Send aria-hidden="true" />{labels.mobile}</a>
    </div>
  );
}
