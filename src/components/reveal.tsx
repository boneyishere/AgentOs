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
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          delay,
          ease: "power2.out",
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
