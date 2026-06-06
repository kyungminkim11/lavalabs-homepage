import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Camera, CheckCircle2, ChevronRight, ClipboardList, Download, Globe2, Handshake, Leaf, Mail, MapPin, MapPinned, Menu, MonitorSmartphone, Package, PenLine, Phone, Send, Sparkles, Store, X } from "lucide-react";
import { Chatbot } from "./Chatbot";
import { LavaScene3D } from "./LavaScene3D";
import { content, localeLabels, localePaths, locales } from "./content";
const formEndpoint = "https://formspree.io/f/mpwdpqzk";
const iconMap = {
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
const getLocaleFromPath = () => {
    const path = window.location.pathname.toLowerCase();
    if (path.startsWith("/en"))
        return "en";
    if (path.startsWith("/jp"))
        return "jp";
    return "ko";
};
const localeToHtmlLang = {
    ko: "ko",
    en: "en",
    jp: "ja"
};
function Icon({ name }) {
    const Component = iconMap[name];
    return _jsx(Component, { "aria-hidden": "true" });
}
function BrandMark() {
    return (_jsxs("picture", { className: "brand-mark", children: [_jsx("source", { srcSet: "/assets/images/lava-logo-transparent-160.webp", type: "image/webp" }), _jsx("img", { src: "/assets/images/lava-logo-transparent.png", alt: "Lava Labs", width: "40", height: "40" })] }));
}
function App() {
    const [locale, setLocale] = useState(getLocaleFromPath);
    const [menuOpen, setMenuOpen] = useState(false);
    const [formStatus, setFormStatus] = useState("idle");
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
        const handler = (event) => {
            const detail = event.detail;
            if (!detail?.message)
                return;
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
    const changeLocale = (nextLocale) => {
        setLocale(nextLocale);
        setMenuOpen(false);
        window.history.pushState({}, "", localePaths[nextLocale]);
    };
    const handleSubmit = async (event) => {
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
        }
        catch {
            setFormStatus("error");
        }
    };
    return (_jsxs("div", { className: "app-shell", children: [_jsx("a", { className: "skip-link", href: "#main-content", children: "Skip to content" }), _jsx("header", { className: "site-header", "data-open": menuOpen, children: _jsxs("div", { className: "nav-shell", "aria-label": "Main navigation", children: [_jsxs("a", { className: "brand-link", href: "#top", onClick: () => setMenuOpen(false), children: [_jsx(BrandMark, {}), _jsx("span", { children: "Lava Labs" })] }), _jsx("button", { className: "icon-button nav-toggle", type: "button", "aria-label": menuOpen ? "Close menu" : "Open menu", "aria-expanded": menuOpen, "aria-controls": "site-navigation", onClick: () => setMenuOpen((open) => !open), children: menuOpen ? _jsx(X, { "aria-hidden": "true" }) : _jsx(Menu, { "aria-hidden": "true" }) }), _jsx("nav", { id: "site-navigation", className: "primary-nav", children: t.nav.map(([href, label]) => (_jsx("a", { href: href, onClick: () => setMenuOpen(false), children: label }, href))) }), _jsxs("div", { className: "language-switcher", "aria-label": "Language", children: [_jsx(Globe2, { "aria-hidden": "true" }), locales.map((item) => (_jsx("button", { type: "button", "aria-pressed": locale === item, onClick: () => changeLocale(item), children: localeLabels[item] }, item)))] })] }) }), _jsxs("main", { id: "main-content", children: [_jsxs("section", { className: "hero", id: "top", children: [_jsx(LavaScene3D, {}), _jsxs("div", { className: "section-inner hero-inner", children: [_jsx("p", { className: "eyebrow", children: t.hero.eyebrow }), _jsx("h1", { children: t.hero.title }), _jsx("p", { className: "hero-statement", children: t.hero.statement }), _jsx("p", { className: "hero-copy", children: t.hero.body }), _jsxs("div", { className: "hero-actions", children: [_jsxs("a", { className: "button primary", href: "#contact", children: [_jsx(Send, { "aria-hidden": "true" }), t.hero.primary] }), _jsxs("a", { className: "button secondary", href: "#services", children: [t.hero.secondary, _jsx(ChevronRight, { "aria-hidden": "true" })] })] })] })] }), _jsx("section", { className: "proof-strip", "aria-label": "Lava Labs highlights", children: _jsx("div", { className: "section-inner proof-grid", children: t.hero.proof.map(([value, label]) => (_jsxs("div", { className: "proof-item", children: [_jsx("strong", { children: value }), _jsx("span", { children: label })] }, label))) }) }), _jsx("section", { className: "section about-section", id: "about", children: _jsxs("div", { className: "section-inner two-column", children: [_jsxs("div", { className: "section-heading", children: [_jsx("p", { className: "eyebrow", children: t.about.kicker }), _jsx("h2", { children: t.about.title })] }), _jsxs("div", { className: "body-copy", children: [_jsx("p", { children: t.about.body }), _jsx("ul", { className: "check-list", children: t.about.highlights.map((item) => (_jsxs("li", { children: [_jsx(CheckCircle2, { "aria-hidden": "true" }), _jsx("span", { children: item })] }, item))) })] })] }) }), _jsx("section", { className: "section muted-section", id: "services", children: _jsxs("div", { className: "section-inner", children: [_jsxs("div", { className: "section-heading compact", children: [_jsx("p", { className: "eyebrow", children: "Services" }), _jsx("h2", { children: t.servicesTitle }), _jsx("p", { children: t.servicesIntro })] }), _jsx("div", { className: "service-grid", children: t.services.map((service) => (_jsxs("article", { className: "service-card", children: [_jsx("div", { className: "service-icon", children: _jsx(Icon, { name: service.icon }) }), _jsx("h3", { children: service.title }), _jsx("p", { children: service.body }), _jsx("div", { className: "tag-row", children: service.tags.map((tag) => (_jsx("span", { children: tag }, tag))) })] }, service.title))) })] }) }), _jsx("section", { className: "section split-band", id: "projects", children: _jsxs("div", { className: "section-inner split-layout", children: [_jsxs("div", { children: [_jsxs("div", { className: "section-heading", children: [_jsx("p", { className: "eyebrow", children: "Pipeline" }), _jsx("h2", { children: t.projectsTitle })] }), _jsx("ul", { className: "project-list", children: t.projects.map((project) => (_jsxs("li", { children: [_jsx(ClipboardList, { "aria-hidden": "true" }), _jsx("span", { children: project })] }, project))) })] }), _jsxs("div", { className: "process-panel", children: [_jsx("p", { className: "eyebrow", children: "Process" }), _jsx("h2", { children: t.processTitle }), _jsx("ol", { className: "process-list", children: t.process.map(([title, body]) => (_jsxs("li", { children: [_jsx("strong", { children: title }), _jsx("span", { children: body })] }, title))) })] })] }) }), _jsx("section", { className: "section expertise-section", children: _jsxs("div", { className: "section-inner", children: [_jsxs("div", { className: "section-heading compact", children: [_jsx("p", { className: "eyebrow", children: "Coverage" }), _jsx("h2", { children: t.expertiseTitle })] }), _jsx("div", { className: "expertise-grid", children: t.expertise.map(([icon, label]) => (_jsxs("div", { className: "expertise-item", children: [_jsx(Icon, { name: icon }), _jsx("span", { children: label })] }, label))) })] }) }), _jsx("section", { className: "section softmoon-section", id: "softmoon", children: _jsxs("div", { className: "section-inner softmoon-layout", children: [_jsxs("div", { className: "softmoon-copy", children: [_jsx("p", { className: "eyebrow", children: t.softMoon.kicker }), _jsx("h2", { children: t.softMoon.title }), _jsx("p", { children: t.softMoon.body }), _jsxs("div", { className: "button-row", children: [_jsxs("a", { className: "button primary", href: "/soft_moon/", children: [t.softMoon.view, _jsx(ArrowUpRight, { "aria-hidden": "true" })] }), _jsxs("a", { className: "button ghost", href: "/assets/files/softmoon-intro.pdf", download: true, children: [_jsx(Download, { "aria-hidden": "true" }), t.softMoon.download] })] })] }), _jsxs("div", { className: "softmoon-gallery", "aria-label": "SoftMoon product samples", children: [_jsxs("picture", { children: [_jsx("source", { srcSet: "/assets/images/lunar-sample-1-720.webp", type: "image/webp" }), _jsx("img", { src: "/assets/images/lunar-sample-1.jpg", alt: "SoftMoon sample 1", loading: "lazy" })] }), _jsxs("picture", { children: [_jsx("source", { srcSet: "/assets/images/lunar-sample-2-720.webp", type: "image/webp" }), _jsx("img", { src: "/assets/images/lunar-sample-2.jpg", alt: "SoftMoon sample 2", loading: "lazy" })] })] })] }) }), _jsx("section", { className: "section audience-section", children: _jsxs("div", { className: "section-inner two-column", children: [_jsxs("div", { className: "section-heading", children: [_jsx("p", { className: "eyebrow", children: "Partners" }), _jsx("h2", { children: t.audienceTitle })] }), _jsx("ul", { className: "audience-list", children: t.audience.map((item) => (_jsxs("li", { children: [_jsx(Handshake, { "aria-hidden": "true" }), _jsx("span", { children: item })] }, item))) })] }) }), _jsx("section", { className: "section contact-section", id: "contact", children: _jsxs("div", { className: "section-inner contact-layout", children: [_jsxs("div", { className: "contact-copy", children: [_jsx("p", { className: "eyebrow", children: t.contact.kicker }), _jsx("h2", { children: t.contact.title }), _jsx("p", { children: t.contact.body }), _jsxs("div", { className: "contact-methods", children: [_jsxs("a", { href: `tel:${t.contact.tel.replace(/-/g, "")}`, children: [_jsx(Phone, { "aria-hidden": "true" }), t.contact.tel] }), _jsxs("a", { href: `mailto:${t.contact.emailText}`, children: [_jsx(Mail, { "aria-hidden": "true" }), t.contact.emailText] }), _jsxs("span", { children: [_jsx(MapPin, { "aria-hidden": "true" }), t.contact.address] })] })] }), _jsxs("form", { className: "contact-form", onSubmit: handleSubmit, children: [_jsxs("label", { children: [_jsx("span", { children: t.contact.name }), _jsx("input", { name: "name", type: "text", autoComplete: "name", value: formData.name, onChange: (event) => setFormData((data) => ({ ...data, name: event.target.value })), required: true })] }), _jsxs("label", { children: [_jsx("span", { children: t.contact.email }), _jsx("input", { name: "email", type: "email", autoComplete: "email", value: formData.email, onChange: (event) => setFormData((data) => ({ ...data, email: event.target.value })), required: true })] }), _jsxs("label", { children: [_jsx("span", { children: t.contact.message }), _jsx("textarea", { name: "message", rows: 6, value: formData.message, onChange: (event) => setFormData((data) => ({ ...data, message: event.target.value })), required: true })] }), _jsxs("label", { className: "consent-row", children: [_jsx("input", { name: "consent", type: "checkbox", checked: formData.consent, onChange: (event) => setFormData((data) => ({ ...data, consent: event.target.checked })), required: true }), _jsx("span", { children: t.contact.consent })] }), _jsxs("button", { className: "button primary submit-button", type: "submit", disabled: formStatus === "sending", children: [_jsx(Send, { "aria-hidden": "true" }), formStatus === "sending" ? t.contact.sending : t.contact.submit] }), formStatus !== "idle" && (_jsxs("p", { className: `form-status ${formStatus}`, role: "status", children: [formStatus === "success" && t.contact.success, formStatus === "error" && t.contact.error, formStatus === "sending" && t.contact.sending] }))] })] }) })] }), _jsx("footer", { className: "site-footer", children: _jsxs("div", { className: "section-inner footer-layout", children: [_jsxs("div", { children: [_jsxs("a", { className: "brand-link", href: "#top", children: [_jsx(BrandMark, {}), _jsx("span", { children: "Lava Labs" })] }), _jsx("p", { children: t.footer })] }), _jsxs("div", { className: "footer-links", children: [_jsx("a", { href: "https://pf.kakao.com/_xnSxefxj", target: "_blank", rel: "noreferrer", children: "KakaoTalk" }), _jsx("a", { href: "https://www.instagram.com/lavalabs_official/profilecard/?igsh=NDZmenlxd21wbG41", target: "_blank", rel: "noreferrer", children: "Instagram" }), _jsx("a", { href: "/terms", children: "Terms" }), _jsx("a", { href: "/privacy", children: "Privacy" })] }), _jsxs("small", { children: ["(c) ", currentYear, " Lava Labs. All rights reserved."] })] }) }), _jsx(Chatbot, { locale: locale })] }));
}
export default App;
