"use client";

import { useCallback, useRef } from "react";
import { gsap } from "./gsap-setup";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * Keystroke pulse for a field's voice bars (`[data-bar]` inside the ref'd
 * element): every call kicks the bars up and lets them decay, so the field
 * looks like the agent is listening as you type. No-op under reduced motion.
 */
export function useTypingPulse<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();
  const pulse = useCallback(() => {
    const el = ref.current;
    if (!el || reduced) return;
    gsap.fromTo(
      el.querySelectorAll("[data-bar]"),
      { scaleY: () => gsap.utils.random(0.45, 1) },
      {
        scaleY: 0.22,
        duration: 0.55,
        ease: "power3.out",
        stagger: { each: 0.035, from: "random" },
        overwrite: true,
      }
    );
  }, [reduced]);
  return [ref, pulse] as const;
}

/** A short horizontal shake for validation errors. No-op under reduced motion. */
export function useShake<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();
  const shake = useCallback(() => {
    const el = ref.current;
    if (!el || reduced) return;
    gsap.fromTo(el, { x: -7 }, { x: 0, duration: 0.6, ease: "elastic.out(1, 0.3)", overwrite: true });
  }, [reduced]);
  return [ref, shake] as const;
}
