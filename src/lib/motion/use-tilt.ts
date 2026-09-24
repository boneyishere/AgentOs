"use client";

import { gsap } from "./gsap-setup";
import { useGsapContext } from "./use-gsap-context";

/**
 * Tilts `[data-tilt]` children in 3D toward the cursor while the ref'd
 * element is hovered. Each child's `data-tilt` value scales its depth.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>(maxDeg = 8) {
  return useGsapContext<T>(
    (_ctx, el, reducedMotion) => {
      if (reducedMotion) return;
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

      const layers = [...el.querySelectorAll<HTMLElement>("[data-tilt]")].map((layer) => {
        gsap.set(layer, { transformPerspective: 900 });
        const to = (prop: string) => gsap.quickTo(layer, prop, { duration: 0.9, ease: "power3.out" });
        return {
          depth: Number(layer.dataset.tilt) || 1,
          rx: to("rotationX"),
          ry: to("rotationY"),
          x: to("x"),
          y: to("y"),
        };
      });

      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        for (const l of layers) {
          l.ry(nx * maxDeg * l.depth);
          l.rx(-ny * maxDeg * l.depth);
          l.x(nx * 18 * l.depth);
          l.y(ny * 18 * l.depth);
        }
      };
      const leave = () => {
        for (const l of layers) {
          l.rx(0);
          l.ry(0);
          l.x(0);
          l.y(0);
        }
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    [maxDeg]
  );
}
