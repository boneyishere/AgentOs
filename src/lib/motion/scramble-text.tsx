"use client";

import { gsap } from "./gsap-setup";
import { useGsapContext } from "./use-gsap-context";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";

/**
 * A word that decodes out of scrambled glyphs once (after `delay`), and
 * re-decodes whenever it's hovered. Deliberately used once on the site: the
 * hero's accent word. Reduced motion shows the plain text.
 */
export function ScrambleText({
  text,
  delay = 0.9,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const ref = useGsapContext<HTMLSpanElement>(
    (_ctx, el, reducedMotion) => {
      if (reducedMotion) return;
      const decode = (wait = 0) =>
        gsap.to(el, {
          duration: 1.1,
          delay: wait,
          ease: "none",
          scrambleText: { text, chars: GLYPHS, speed: 0.7, revealDelay: 0.35 },
        });
      decode(delay);
      const replay = () => {
        if (!gsap.isTweening(el)) decode();
      };
      el.addEventListener("pointerenter", replay);
      return () => el.removeEventListener("pointerenter", replay);
    },
    [text, delay]
  );

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {text}
    </span>
  );
}
