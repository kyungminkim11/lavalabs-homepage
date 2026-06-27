declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export type AnalyticsProperties = Record<string, string | number | boolean | undefined>;

export function trackEvent(event: string, properties: AnalyticsProperties = {}) {
  const props = Object.fromEntries(
    Object.entries(properties).filter((entry): entry is [string, string | number | boolean] => entry[1] !== undefined)
  );

  window.plausible?.(event, { props });
  window.dataLayer?.push({ event, ...props });
  window.dispatchEvent(new CustomEvent("lavalabs:analytics", { detail: { event, properties: props } }));
}
