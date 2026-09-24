"use client";

import { gsap } from "@/lib/motion/gsap-setup";
import { useGsapContext } from "@/lib/motion/use-gsap-context";

export function Reveal({
  children,
  className = "",
  y = 20,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
}) {
  const ref = useGsapContext<HTMLDivElement>(
    (_ctx, el, reducedMotion) => {
      if (reducedMotion) {
        gsap.set(el, { autoAlpha: 1, y: 0 });
        return;
      }

      // Phones: no blur (costly to paint on many elements) and no sibling
      // delays (in a single column they just make stacked cards arrive late).
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: desktop ? y : Math.min(y, 14), filter: desktop ? "blur(8px)" : "none" },
        {
          autoAlpha: 1,
          y: 0,
          filter: desktop ? "blur(0px)" : "none",
          duration: desktop ? 0.9 : 0.6,
          delay: desktop ? delay : 0,
          ease: "power3.out",
          clearProps: "filter",
          scrollTrigger: { trigger: el, start: desktop ? "top 85%" : "top 92%", once: true },
        }
      );
    },
    [y, delay]
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
