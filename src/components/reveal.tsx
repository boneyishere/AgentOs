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

      gsap.fromTo(
        el,
        { autoAlpha: 0, y, filter: "blur(8px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          delay,
          ease: "power3.out",
          clearProps: "filter",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
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
