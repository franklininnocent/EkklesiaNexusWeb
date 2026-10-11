const SEO_PROHIBITED_PATTERNS: RegExp[] = [
  /\battendance\b/i,
  /\btestimonial\b/i,
  /\b5 stars?\b/i,
  /\breview\b/i,
  /\bAggregateRating\b/i,
  /\blocalhost\b/i,
  /\b127\.0\.0\.1\b/i,
  /\bAI-powered\b/i,
  /\bmobile app\b/i,
  /\bvolunteer management\b/i,
];

export function scanProhibitedSeoText(text: string, label = "SEO text"): string[] {
  const errors: string[] = [];
  for (const pattern of SEO_PROHIBITED_PATTERNS) {
    if (pattern.test(text)) {
      errors.push(`Prohibited pattern ${pattern} in ${label}`);
    }
  }
  return errors;
}
