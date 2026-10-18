/** Public SEO monitoring configuration — allowlisted hosts and paths only. */

export const MONITORING_APEX_HOST = "ekklesianexus.com";
export const MONITORING_BASE_URL = `https://${MONITORING_APEX_HOST}`;

export const MONITORING_PRIMARY_PATHS = [
  "/",
  "/pt-br",
  "/features",
  "/solutions/catholic-parishes",
  "/contact",
] as const;

/** Historical duplicate-host risks — read-only leak checks. */
export const MONITORING_LEAK_URLS = [
  "http://dwm.matchpointgps.in/",
  "http://139.59.18.151/",
] as const;

export const GSC_VERIFICATION_PATH = "/google161c1efd34d8a358.html";
export const GSC_VERIFICATION_URL = `${MONITORING_BASE_URL}${GSC_VERIFICATION_PATH}`;

export const MONITORING_REQUEST_TIMEOUT_MS = 20_000;
export const MONITORING_MAX_RETRIES = 2;
export const MONITORING_RETRY_DELAY_MS = 750;

export const EXPECTED_SITEMAP_LOC_COUNT = 13;

export function isAllowedMonitoringUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return false;
    if (parsed.hostname !== MONITORING_APEX_HOST) return false;
    return true;
  } catch {
    return false;
  }
}

export function urlForPath(path: string): string {
  if (path === "/") return `${MONITORING_BASE_URL}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${MONITORING_BASE_URL}${normalized}`;
}
