import { useEffect, useId, useRef, useState } from "react";
import { Globe2, Menu, X } from "lucide-react";
import type { Locale } from "../content";
import { localeLabels, localePaths, locales } from "../content";
import BrandMark from "./BrandMark";

export default function SiteHeader({
  locale,
  navItems,
  navLabel,
  openLabel,
  closeLabel
}: {
  locale: Locale;
  navItems: readonly (readonly [string, string])[];
  navLabel: string;
  openLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        requestAnimationFrame(() => toggleRef.current?.focus());
      }
    };
    const onResize = () => {
      if (window.innerWidth > 860) setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header" data-open={open}>
      <div className="nav-shell" aria-label={navLabel}>
        <BrandMark href="#top" />
        <button
          ref={toggleRef}
          className="icon-button nav-toggle"
          type="button"
          aria-label={open ? closeLabel : openLabel}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <div className="mobile-nav-panel" id={menuId}>
          <nav className="primary-nav" aria-label={navLabel}>
            {navItems.map(([href, label], index) => (
              <a
                key={href}
                ref={index === 0 ? firstLinkRef : undefined}
                href={href}
                onClick={closeMenu}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="language-switcher" aria-label="Language">
            <Globe2 aria-hidden="true" />
            {locales.map((item) => (
              <a key={item} href={localePaths[item]} aria-current={locale === item ? "page" : undefined}>
                {localeLabels[item]}
              </a>
            ))}
          </div>
        </div>
      </div>
      {open && <button className="nav-backdrop" type="button" aria-label={closeLabel} onClick={closeMenu} />}
    </header>
  );
}
