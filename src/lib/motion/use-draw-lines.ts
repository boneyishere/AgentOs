"use client";

import { useScrollTimeline } from "./scroll-timeline";

/**
 * Draws a set of SVG paths in sync with scroll position via DrawSVGPlugin
 * (registered in gsap-setup). Used for the Technology diagram's connector
 * lines — pace matches how fast the visitor scrolls, rather than a fixed
 * duration, so the line-draw reads as data moving through the system.
 */
export function useDrawLines<T extends HTMLElement = HTMLDivElement>(
  getPaths: (el: T) => SVGPathElement[],
  config: { start?: string; end?: string; scrub?: boolean | number } = {},
  deps: unknown[] = []
) {
  return useScrollTimeline<T>(
    {
      start: config.start ?? "top 65%",
      end: config.end ?? "bottom 35%",
      scrub: config.scrub ?? 1,
    },
    (tl, el) => {
      const paths = getPaths(el);
      if (!paths.length) return;
      tl.fromTo(
        paths,
        { drawSVG: "0%" },
        { drawSVG: "100%", stagger: 0.15, ease: "none" },
        0
      );
    },
    deps
  );
}
