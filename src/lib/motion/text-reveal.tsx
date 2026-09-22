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

        // Each line mask inherits `line-height` from the heading and hard-
        // clips to it (`overflow: clip`), with no allowance for descenders.
        // Tailwind's default line-height for text-5xl/6xl is exactly 1 —
        // zero room below the baseline — so letters like g/y/p/q get their
        // tails cut off; smaller sizes still leave very little room. A
        // bottom padding buffer gives descenders space without touching the
        // heading's own line-height/spacing; the matching negative margin
        // cancels the padding's contribution to layout height so nothing
        // downstream shifts.
        split.masks.forEach((maskEl) => {
          const style = (maskEl as HTMLElement).style;
          style.paddingBottom = "0.2em";
          style.marginBottom = "-0.2em";
        });

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
