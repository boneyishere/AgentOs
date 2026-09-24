"use client";

import type { ReactNode } from "react";
import { gsap } from "./gsap-setup";
import { useGsapContext } from "./use-gsap-context";

/** Pulls its child toward the cursor while hovered, then springs back. */
export function Magnetic({
  children,
  strength = 0.12,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useGsapContext<HTMLSpanElement>(
    (_ctx, el, reducedMotion) => {
      if (reducedMotion) return;
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
      let rect = el.getBoundingClientRect();

      const enter = () => {
        const x = Number(gsap.getProperty(el, "x")) || 0;
        const y = Number(gsap.getProperty(el, "y")) || 0;
        const r = el.getBoundingClientRect();
        rect = new DOMRect(r.left - x, r.top - y, r.width, r.height);
      };
      const move = (e: PointerEvent) => {
        xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
        yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointerenter", enter);
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    [strength]
  );

  return (
    <span ref={ref} className={`inline-flex ${className}`}>
      {children}
    </span>
  );
}
