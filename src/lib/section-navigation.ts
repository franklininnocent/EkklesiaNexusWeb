export const SECTION_IDS = [
  "home",
  "features",
  "solutions",
  "pricing",
  "demo",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export function sectionIdFromHref(href: string): string {
  const hash = href.includes("#") ? href.slice(href.indexOf("#") + 1) : "";
  return hash;
}

export function scrollToSection(id: string): boolean {
  if (!id || typeof document === "undefined") return false;
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

function isHomeHashHref(href: string): boolean {
  const path = href.split("#")[0];
  return path === "" || path === "/" || path === "/pt-br";
}

function isCurrentHomePath(pathname: string): boolean {
  return pathname === "/" || pathname === "/pt-br";
}

/** Same-page hash links: scroll reliably (Next.js Link does not always scroll to #). */
export function handleAnchorNav(
  event: { preventDefault: () => void },
  href: string,
  onAfter?: () => void,
): void {
  const id = sectionIdFromHref(href);
  if (!id || !isHomeHashHref(href)) return;
  if (typeof window === "undefined" || !isCurrentHomePath(window.location.pathname)) return;

  event.preventDefault();
  scrollToSection(id);
  const nextUrl = `${window.location.pathname}${window.location.search}#${id}`;
  window.history.pushState(null, "", nextUrl);
  onAfter?.();
}

export function scrollToHashFromLocation(): void {
  if (typeof window === "undefined") return;
  const id = window.location.hash.replace(/^#/, "");
  if (!id) return;
  requestAnimationFrame(() => {
    scrollToSection(id);
  });
}
