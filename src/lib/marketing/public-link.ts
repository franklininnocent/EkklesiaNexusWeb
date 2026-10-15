import type { NavItem } from "@/types/marketing";

export function isPublicAnchorHref(href: string): boolean {
  return href.startsWith("#");
}

export function isPublicRouteHref(href: string): boolean {
  return href === "/" || href === "/privacy" || href === "/terms";
}

export function resolveNavHref(href: string): string {
  return href.trim();
}

export function primaryNavItems(items: NavItem[]): NavItem[] {
  return items.filter((item) => item.label.trim() && item.href.trim());
}
