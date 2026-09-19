"use client";

import { useLayoutEffect, useRef, type DependencyList } from "react";
import { gsap } from "./gsap-setup";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * Scopes a GSAP context to a ref'd element and reverts it on unmount/dep change.
 * `effect` receives whether the visitor prefers reduced motion so callers can
 * skip tweens and jump straight to the end state instead of re-checking
 * `matchMedia` themselves.
 */
export function useGsapContext<T extends HTMLElement = HTMLDivElement>(
  effect: (ctx: gsap.Context, el: T, reducedMotion: boolean) => void | (() => void),
  deps: DependencyList = []
) {
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cleanup: void | (() => void);
    const ctx = gsap.context((self) => {
      cleanup = effect(self, el, reducedMotion);
    }, el);

    return () => {
      cleanup?.();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, ...deps]);

  return ref;
}
