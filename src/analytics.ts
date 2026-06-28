declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (command: "event", event: string, properties?: Record<string, string | number | boolean>) => void;
  }
}

export type AnalyticsProperties = Record<string, string | number | boolean | undefined>;

export function trackEvent(event: string, properties: AnalyticsProperties = {}) {
  const props = Object.fromEntries(
    Object.entries(properties).filter((entry): entry is [string, string | number | boolean] => entry[1] !== undefined)
  );

  window.plausible?.(event, { props });
  window.gtag?.("event", event, props);
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...props });

  try {
    const key = "lavalabs:conversion-events";
    const current = JSON.parse(sessionStorage.getItem(key) ?? "[]") as Array<Record<string, unknown>>;
    current.push({ event, properties: props, at: new Date().toISOString() });
    sessionStorage.setItem(key, JSON.stringify(current.slice(-40)));
  } catch {
    // Analytics must never interrupt the website experience.
  }

  window.dispatchEvent(new CustomEvent("lavalabs:analytics", { detail: { event, properties: props } }));
}
