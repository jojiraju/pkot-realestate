// ─── Shared motion helpers ──────────────────────────────────────────────────

import { useSyncExternalStore } from "react";

export const INTRO_EVENT = "pkot:intro-complete";

declare global {
  interface Window {
    __pkotIntroDone?: boolean;
  }
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Marks the preloader as finished and notifies listeners (hero, 3D scene). */
export function completeIntro() {
  if (typeof window === "undefined" || window.__pkotIntroDone) return;
  window.__pkotIntroDone = true;
  window.dispatchEvent(new Event(INTRO_EVENT));
}

/** Runs `cb` once the preloader has finished (immediately if it already has). */
export function onIntroComplete(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  if (window.__pkotIntroDone) {
    cb();
    return () => {};
  }
  window.addEventListener(INTRO_EVENT, cb, { once: true });
  return () => window.removeEventListener(INTRO_EVENT, cb);
}

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

/** Reactive prefers-reduced-motion (false during SSR). */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(REDUCED_QUERY);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false
  );
}
