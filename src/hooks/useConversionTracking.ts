import { useEffect } from "react";
import type { Locale } from "../content";
import { trackEvent } from "../analytics";

export default function useConversionTracking(locale: Locale) {
  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact || !("IntersectionObserver" in window)) return;

    let tracked = false;
    const observer = new IntersectionObserver((entries) => {
      if (!tracked && entries.some((entry) => entry.isIntersecting)) {
        tracked = true;
        trackEvent("contact_section_view", { locale });
        observer.disconnect();
      }
    }, { threshold: 0.35 });

    observer.observe(contact);
    return () => observer.disconnect();
  }, [locale]);
}
