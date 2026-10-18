#!/usr/bin/env tsx
/**
 * Weekly SEO health check — local invariants (default) or opt-in production fetches.
 */
import {
  GSC_VERIFICATION_URL,
  MONITORING_BASE_URL,
  MONITORING_LEAK_URLS,
  MONITORING_MAX_RETRIES,
  MONITORING_PRIMARY_PATHS,
  MONITORING_REQUEST_TIMEOUT_MS,
  MONITORING_RETRY_DELAY_MS,
  urlForPath,
} from "../src/lib/seo-monitoring/config";
import {
  aggregateExitCode,
  isMarketingLeakBody,
  parseRobotsSitemapUrl,
  sniffHtmlSeo,
  validateSitemapXml,
  type CheckResult,
} from "../src/lib/seo-monitoring/checks";
import { formatWeeklyMarkdownReport } from "../src/lib/seo-monitoring/weekly-report";

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchText(url: string): Promise<{ status: number; body: string; finalUrl: string }> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= MONITORING_MAX_RETRIES; attempt++) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), MONITORING_REQUEST_TIMEOUT_MS);
      const res = await fetch(url, {
        redirect: "follow",
        signal: controller.signal,
        headers: { "User-Agent": "EkklesiaNexus-SEO-Weekly-Monitor/1.0" },
      });
      clearTimeout(timer);
      const body = await res.text();
      return { status: res.status, body, finalUrl: res.url };
    } catch (err) {
      lastError = err;
      if (attempt < MONITORING_MAX_RETRIES) await sleep(MONITORING_RETRY_DELAY_MS);
    }
  }
  throw lastError;
}

async function runLocalChecks(): Promise<CheckResult[]> {
  process.env.NEXT_PUBLIC_SITE_URL = MONITORING_BASE_URL;
  const results: CheckResult[] = [];

  const { SUPPORTED_LOCALES } = await import("../src/lib/i18n/locale");
  const localesOk =
    SUPPORTED_LOCALES.length === 2 &&
    SUPPORTED_LOCALES[0] === "en-US" &&
    SUPPORTED_LOCALES[1] === "pt-BR";
  results.push({
    id: "locales",
    name: "SUPPORTED_LOCALES",
    severity: "critical",
    passed: localesOk,
    detail: localesOk ? "en-US, pt-BR" : JSON.stringify(SUPPORTED_LOCALES),
  });

  const { getMarketingContent } = await import("../src/lib/marketing/get-content");
  const { indexableLocalizedSitemapEntries } = await import("../src/lib/marketing/localized-metadata");
  const locs = indexableLocalizedSitemapEntries(getMarketingContent()).map((e) => e.url);
  const sitemapSynthetic = `<?xml version="1.0"?><urlset>${locs.map((u) => `<url><loc>${u}</loc></url>`).join("")}</urlset>`;
  results.push(...validateSitemapXml(sitemapSynthetic));

  const fs = await import("node:fs");
  const path = await import("node:path");
  const gscPath = path.join(process.cwd(), "public/google161c1efd34d8a358.html");
  const gscExists = fs.existsSync(gscPath);
  results.push({
    id: "gsc-file-repo",
    name: "GSC verification file in repo",
    severity: "critical",
    passed: gscExists,
    detail: gscExists ? "public/google161c1efd34d8a358.html present" : "missing from public/",
  });

  return results;
}

async function runProductionChecks(): Promise<CheckResult[]> {
  const results: CheckResult[] = [];

  for (const p of MONITORING_PRIMARY_PATHS) {
    const url = urlForPath(p);
    try {
      const { status, body, finalUrl } = await fetchText(url);
      const ok = status >= 200 && status < 400;
      results.push({
        id: `http-${p}`,
        name: `HTTP ${p}`,
        severity: "critical",
        passed: ok,
        detail: `status=${status} final=${finalUrl}`,
      });
      if (ok) results.push(...sniffHtmlSeo(body.slice(0, 120_000), url));
    } catch (e) {
      results.push({
        id: `http-${p}`,
        name: `HTTP ${p}`,
        severity: "critical",
        passed: false,
        detail: String(e),
      });
    }
  }

  try {
    const robots = await fetchText(`${MONITORING_BASE_URL}/robots.txt`);
    results.push({
      id: "robots-txt",
      name: "robots.txt",
      severity: "critical",
      passed: robots.status === 200,
      detail: `status=${robots.status}`,
    });
    const sitemapFromRobots = parseRobotsSitemapUrl(robots.body);
    const sitemapUrl = sitemapFromRobots ?? `${MONITORING_BASE_URL}/sitemap.xml`;
    const sitemap = await fetchText(sitemapUrl);
    results.push({
      id: "sitemap-http",
      name: "Sitemap HTTP",
      severity: "critical",
      passed: sitemap.status === 200,
      detail: `url=${sitemapUrl} status=${sitemap.status}`,
    });
    if (sitemap.status === 200) {
      results.push(...validateSitemapXml(sitemap.body));
    }
  } catch (e) {
    results.push({
      id: "robots-sitemap",
      name: "robots/sitemap fetch",
      severity: "critical",
      passed: false,
      detail: String(e),
    });
  }

  try {
    const gsc = await fetchText(GSC_VERIFICATION_URL);
    const bodyOk = gsc.body.includes("google-site-verification:");
    results.push({
      id: "gsc-file-live",
      name: "GSC verification file (production)",
      severity: "critical",
      passed: gsc.status === 200 && bodyOk,
      detail: `status=${gsc.status}${gsc.status !== 200 ? " — deploy public/google161c1efd34d8a358.html" : ""}`,
    });
  } catch (e) {
    results.push({
      id: "gsc-file-live",
      name: "GSC verification file (production)",
      severity: "critical",
      passed: false,
      detail: String(e),
    });
  }

  for (const leakUrl of MONITORING_LEAK_URLS) {
    try {
      const leak = await fetchText(leakUrl);
      const leaked = leak.status === 200 && isMarketingLeakBody(leak.body.slice(0, 4000));
      results.push({
        id: `leak-${leakUrl}`,
        name: `Host isolation ${leakUrl}`,
        severity: "warning",
        passed: !leaked,
        detail: leaked ? "marketing HTML on non-canonical host" : `status=${leak.status} OK`,
      });
    } catch (e) {
      results.push({
        id: `leak-${leakUrl}`,
        name: `Host isolation ${leakUrl}`,
        severity: "info",
        passed: true,
        detail: `unreachable or blocked: ${String(e)}`,
      });
    }
  }

  return results;
}

async function main(): Promise<void> {
  const production = process.argv.includes("--production");

  const results: CheckResult[] = [];
  if (!production) {
    results.push(...(await runLocalChecks()));
  } else {
    results.push(...(await runLocalChecks()));
    results.push(...(await runProductionChecks()));
  }

  const gscManual = production
    ? "UNAVAILABLE — MANUAL REVIEW REQUIRED: Log in to Search Console and record sitemap status, indexing errors, and 7-day performance vs prior week."
    : "Skipped in local-only mode. Run with `--production` for live checks; GSC always requires manual operator access.";

  const report = formatWeeklyMarkdownReport({
    generatedAtUtc: new Date().toISOString(),
    mode: production ? "local+production" : "local",
    windowLabel: "Last 7 days (GSC manual) / snapshot (automated)",
    results,
    gscManual,
  });

  console.log(report);
  process.exit(aggregateExitCode(results));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
