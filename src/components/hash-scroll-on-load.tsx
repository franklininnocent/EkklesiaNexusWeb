"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToHashFromLocation } from "@/lib/section-navigation";

/** Scroll to `#section` after load or client navigation (App Router hash workaround). */
export function HashScrollOnLoad() {
  const pathname = usePathname();

  useEffect(() => {
    scrollToHashFromLocation();
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => scrollToHashFromLocation();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
