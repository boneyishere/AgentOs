"use client";

import { useEffect } from "react";

/**
 * One delegated listener for the whole site: writes the pointer position
 * (relative to the element) as --mx/--my on whichever `.spotlight` element is
 * under the cursor, so any component opts in with a class — no per-card JS.
 * Fine pointers only. Mounted once in the root layout.
 */
export function SpotlightTracker() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    let target: HTMLElement | null = null;
    let x = 0;
    let y = 0;

    const move = (e: PointerEvent) => {
      const el = e.target instanceof Element ? e.target.closest<HTMLElement>(".spotlight") : null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      target = el;
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        target?.style.setProperty("--mx", `${x}px`);
        target?.style.setProperty("--my", `${y}px`);
      });
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
