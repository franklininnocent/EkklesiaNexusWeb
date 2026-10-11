/**
 * Locked marketing copy (V1). Hero, site config, footer, and OG generator must stay aligned.
 * CMS (V2) should enforce the same fields.
 */
export const marketingCopyContract = {
  slogan: "The Next Generation of Church Management System.",
  supportingLine: "One connected church. Complete 360° management.",
} as const;

export function marketingFooterStatement(): string {
  return `${marketingCopyContract.slogan} ${marketingCopyContract.supportingLine}`;
}
