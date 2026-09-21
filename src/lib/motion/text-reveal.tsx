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

      const split = new SplitText(el, { type: "lines", mask: "lines" });
      gsap.fromTo(
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

      return () => split.revert();
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
