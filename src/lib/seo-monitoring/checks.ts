import {
  EXPECTED_SITEMAP_LOC_COUNT,
  MONITORING_APEX_HOST,
  MONITORING_BASE_URL,
  isAllowedMonitoringUrl,
} from "./config";

export type CheckSeverity = "critical" | "warning" | "info";

export type CheckResult = {
  id: string;
  name: string;
  severity: CheckSeverity;
  passed: boolean;
  detail: string;
};

export function parseRobotsSitemapUrl(robotsText: string): string | null {
  const lines = robotsText.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!/^sitemap:/i.test(trimmed)) continue;
    const url = trimmed.replace(/^sitemap:\s*/i, "").trim();
    if (url) return url;
  }
  return null;
}

export function extractLocsFromSitemapXml(xml: string): string[] {
  const locs: string[] = [];
  const re = /<loc>([^<]+)<\/loc>/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(xml)) !== null) {
    locs.push(match[1].trim());
  }
  return locs;
}

export function validateSitemapXml(xml: string, expectedLocCount = EXPECTED_SITEMAP_LOC_COUNT): CheckResult[] {
  const results: CheckResult[] = [];
  if (!xml.includes("<urlset") && !xml.includes(":urlset")) {
    results.push({
      id: "sitemap-xml",
      name: "Sitemap XML structure",
      severity: "critical",
      passed: false,
      detail: "Response does not look like a sitemap urlset",
    });
    return results;
  }

  const locs = extractLocsFromSitemapXml(xml);
  const countOk = locs.length === expectedLocCount;
  results.push({
    id: "sitemap-loc-count",
    name: "Sitemap loc count",
    severity: "critical",
    passed: countOk,
    detail: countOk
      ? `loc_count=${locs.length}`
      : `expected ${expectedLocCount}, got ${locs.length}`,
  });

  const bad = locs.filter(
    (u) =>
      !u.startsWith(`${MONITORING_BASE_URL}/`) &&
      u !== `${MONITORING_BASE_URL}/` &&
      !u.startsWith(`${MONITORING_BASE_URL}`),
  );
  const hostBad = locs.filter((u) => {
    try {
      return new URL(u).hostname !== MONITORING_APEX_HOST;
    } catch {
      return true;
    }
  });
  const forbidden = locs.filter((u) => /\/es\b|localhost|127\.0\.0\.1|matchpoint|\/api\/|\/preview\//i.test(u));

  const allHostOk = hostBad.length === 0 && bad.length === 0 && forbidden.length === 0;
  results.push({
    id: "sitemap-loc-hosts",
    name: "Sitemap URL host policy",
    severity: "critical",
    passed: allHostOk,
    detail: allHostOk
      ? "All loc URLs use apex HTTPS"
      : `invalid: ${[...hostBad, ...forbidden].slice(0, 3).join(", ")}`,
  });

  return results;
}

export function sniffHtmlSeo(html: string, url: string): CheckResult[] {
  const results: CheckResult[] = [];
  const canonMatch = html.match(/rel="canonical"\s+href="([^"]+)"/i) ?? html.match(/href="([^"]+)"\s+rel="canonical"/i);
  const canon = canonMatch?.[1] ?? "";
  const robotsMatch = html.match(/name="robots"\s+content="([^"]+)"/i);
  const robots = robotsMatch?.[1] ?? "";
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch?.[1]?.trim() ?? "";

  if (canon && !isAllowedMonitoringUrl(canon) && !canon.startsWith(MONITORING_BASE_URL)) {
    results.push({
      id: `canonical-${url}`,
      name: `Canonical host (${url})`,
      severity: "warning",
      passed: false,
      detail: `canonical=${canon}`,
    });
  } else if (canon) {
    results.push({
      id: `canonical-${url}`,
      name: `Canonical present (${url})`,
      severity: "info",
      passed: true,
      detail: canon,
    });
  }

  if (/noindex/i.test(robots)) {
    const isHome = url === `${MONITORING_BASE_URL}/` || url.endsWith("/pt-br");
    if (isHome) {
      results.push({
        id: `robots-${url}`,
        name: `Indexability (${url})`,
        severity: "critical",
        passed: false,
        detail: `robots=${robots}`,
      });
    }
  }

  if (title) {
    results.push({
      id: `title-${url}`,
      name: `Document title (${url})`,
      severity: "info",
      passed: true,
      detail: title.slice(0, 120),
    });
  }

  return results;
}

export function isMarketingLeakBody(htmlSnippet: string): boolean {
  return htmlSnippet.includes("EkklesiaNexus");
}

export function aggregateExitCode(results: CheckResult[]): number {
  if (results.some((r) => !r.passed && r.severity === "critical")) return 1;
  if (results.some((r) => !r.passed && r.severity === "warning")) return 2;
  return 0;
}
