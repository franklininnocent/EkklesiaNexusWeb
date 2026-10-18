import type { CheckResult } from "./checks";

export function formatWeeklyMarkdownReport(options: {
  generatedAtUtc: string;
  mode: "local" | "production" | "local+production";
  windowLabel: string;
  results: CheckResult[];
  gscManual: string;
}): string {
  const lines: string[] = [
    `# Weekly SEO health check — ${options.generatedAtUtc}`,
    "",
    `**Mode:** ${options.mode}`,
    `**Reporting window:** ${options.windowLabel}`,
    "",
    "## Automated checks",
    "",
    "| ID | Check | Severity | Status | Detail |",
    "|----|-------|----------|--------|--------|",
  ];

  for (const r of options.results) {
    lines.push(
      `| ${r.id} | ${r.name} | ${r.severity} | ${r.passed ? "PASS" : "FAIL"} | ${r.detail.replace(/\|/g, "\\|")} |`,
    );
  }

  lines.push(
    "",
    "## Search Console (manual)",
    "",
    options.gscManual,
    "",
    "## Next review",
    "",
    "- Record new issues in `docs/seo/SEO_ISSUE_REGISTER.md`.",
    "- Paste GSC observations into `docs/seo/templates/WEEKLY_SEO_HEALTH_CHECK.md`.",
    "",
  );

  return lines.join("\n");
}
