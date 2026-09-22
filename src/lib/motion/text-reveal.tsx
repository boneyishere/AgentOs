"use client";

import type { ReactNode } from "react";
import { gsap, SplitText } from "./gsap-setup";
import { useGsapContext } from "./use-gsap-context";

/**
 * Masked line-by-line reveal for headlines, built on SplitText. `playOn`
 * controls whether it fires immediately on mount (above-the-fold text, e.g.
 * the Hero) or once when scrolled into view (every other section headline).
 */
export function TextReveal({
  as = "h2",
  children,
  className = "",
  playOn = "scroll",
  delay = 0,
}: {
  as?: "h1" | "h2";
  children: ReactNode;
  className?: string;
  playOn?: "mount" | "scroll";
  delay?: number;
}) {
  const ref = useGsapContext<HTMLHeadingElement>(
    (_ctx, el, reducedMotion) => {
      if (reducedMotion) return;

      let split: SplitText | undefined;
      let tween: gsap.core.Tween | undefined;
      let cancelled = false;

      // SplitText measures line boxes from the currently rendered font. If it
      // runs before the real webfont has swapped in, those masks get sized
      // against fallback-font metrics — once the real font paints moments
      // later, its glyphs can run wider than the mask, clipping the tail end
      // of a line. Waiting for `fonts.ready` guarantees accurate metrics.
      // (Already-loaded fonts still resolve here, just on the next tick.)
      document.fonts.ready.then(() => {
        if (cancelled) return;

        split = new SplitText(el, { type: "lines", mask: "lines" });
        tween = gsap.fromTo(
          split.lines,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            delay,
            scrollTrigger:
              playOn === "scroll" ? { trigger: el, start: "top 85%", once: true } : undefined,
          }
        );
      });

      return () => {
        cancelled = true;
        tween?.scrollTrigger?.kill();
        tween?.kill();
        split?.revert();
      };
    },
    [playOn, delay]
  );

  const Tag = as;
  return (
    <Tag ref={ref} className={`font-heading ${className}`}>
      {children}
    </Tag>
  );
}
