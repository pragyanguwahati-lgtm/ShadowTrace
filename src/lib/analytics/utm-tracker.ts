/**
 * ShadowTrace UTM & Campaign Analytics Tracker
 * Captures, sanitizes, and persists UTM acquisition telemetry.
 */

export interface UtmParameters {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  referrer?: string;
  capturedAt?: number;
}

const UTM_STORAGE_KEY = "shadowtrace_utm_telemetry";

export function captureUtmFromUrl(): UtmParameters | null {
  if (typeof window === "undefined") return null;

  try {
    const url = new URL(window.location.href);
    const source = url.searchParams.get("utm_source") || url.searchParams.get("ref");
    const medium = url.searchParams.get("utm_medium");
    const campaign = url.searchParams.get("utm_campaign");
    const term = url.searchParams.get("utm_term");
    const content = url.searchParams.get("utm_content");

    if (source || medium || campaign) {
      const data: UtmParameters = {
        source: source ? source.substring(0, 50) : undefined,
        medium: medium ? medium.substring(0, 50) : undefined,
        campaign: campaign ? campaign.substring(0, 50) : undefined,
        term: term ? term.substring(0, 50) : undefined,
        content: content ? content.substring(0, 50) : undefined,
        referrer: typeof document !== "undefined" && document.referrer ? document.referrer.substring(0, 100) : undefined,
        capturedAt: Date.now()
      };
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(data));
      return data;
    }
  } catch (err) {
    console.warn("Failed to capture UTM telemetry:", err);
  }

  return getStoredUtm();
}

export function getStoredUtm(): UtmParameters | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}
