export const PREVIEW_COOKIE = "en_plan_preview";

export function previewCookieOptions(maxAgeSeconds: number, secure: boolean) {
  return {
    httpOnly: true,
    secure,
    sameSite: "lax" as const,
    path: "/preview",
    maxAge: Math.max(30, maxAgeSeconds),
  };
}
