import type { NavItem } from "@/types/marketing";

export function isPublicAnchorHref(href: string): boolean {
  return href.startsWith("#");
}

const PUBLIC_ROUTES = new Set([
  "/",
  "/privacy",
  "/terms",
  "/features",
  "/about",
  "/contact",
  "/solutions/catholic-parishes",
]);

export function isPublicRouteHref(href: string): boolean {
  if (PUBLIC_ROUTES.has(href)) {
    return true;
  }
  return href.startsWith("/features/") && !href.includes("..");
}

export function resolveNavHref(href: string): string {
  return href.trim();
}

export function primaryNavItems(items: NavItem[]): NavItem[] {
  return items.filter((item) => item.label.trim() && item.href.trim());
}
