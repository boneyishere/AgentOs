"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap-setup";
import { useReducedMotion } from "./use-reduced-motion";

let lenis: Lenis | null = null;

/**
 * Site-wide inertial scroll. Driven from GSAP's ticker (prioritised, so it
 * runs before ScrollTrigger and the particle stage read positions) and
 * disabled entirely under reduced motion.
 */
export function SmoothScroll() {
  const reducedMotion = useReducedMotion();
  const pathname = usePathname();
  const firstRoute = useRef(true);

  useEffect(() => {
    if (reducedMotion) return;
    const instance = new Lenis({ autoRaf: false, anchors: true, lerp: 0.11 });
    lenis = instance;
    instance.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf, false, true);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      instance.destroy();
      lenis = null;
    };
  }, [reducedMotion]);

  // Next resets scroll natively on navigation; keep Lenis's target in sync so
  // it doesn't ease back toward the previous page's position.
  useEffect(() => {
    if (firstRoute.current) {
      firstRoute.current = false;
      return;
    }
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
