"use client";

import { gsap } from "./gsap-setup";
import { useGsapContext } from "./use-gsap-context";

/**
 * Counts the numeric part of `value` up from zero on scroll-in, keeping any
 * prefix/suffix ("−", "%", "x", " pts"). Server HTML and reduced motion show
 * the final value.
 */
export function CountUp({
  value,
  className = "",
  style,
}: {
  value: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const prefix = match?.[1] ?? "";
  const num = match?.[2] ?? value;
  const suffix = match?.[3] ?? "";
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;

  const ref = useGsapContext<HTMLSpanElement>(
    (_ctx, el, reducedMotion) => {
      const out = el.querySelector<HTMLElement>("[data-num]");
      if (!out || reducedMotion || !match) return;

      const state = { v: 0 };
      out.textContent = (0).toFixed(decimals);
      gsap.to(state, {
        v: Number(num),
        duration: 1.8,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => {
          out.textContent = state.v.toFixed(decimals);
        },
      });
      return () => {
        out.textContent = num;
      };
    },
    [value]
  );

  return (
    <span ref={ref} className={`tabular-nums ${className}`} style={style}>
      {prefix}
      <span data-num>{num}</span>
      {suffix}
    </span>
  );
}
