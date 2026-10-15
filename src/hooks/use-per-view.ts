"use client";

import { useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("resize", onStoreChange);
  return () => window.removeEventListener("resize", onStoreChange);
}

/**
 * Viewport-derived carousel page size. Server and first paint use `serverSnapshot`
 * (mobile-first) so hydration stays stable; the client then reads `window.innerWidth`.
 */
export function usePerView(resolve: (width: number) => number, serverSnapshot = 1): number {
  return useSyncExternalStore(
    subscribe,
    () => resolve(window.innerWidth),
    () => serverSnapshot,
  );
}
