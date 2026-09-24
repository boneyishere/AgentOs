"use client";

import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { gsap } from "@/lib/motion/gsap-setup";
import { useGsapContext } from "@/lib/motion/use-gsap-context";

const BARS = [0.5, 0.85, 0.65, 0.8];

const TONES = {
  dark: { pill: "bg-foreground text-background", disc: "bg-background", bar: "bg-foreground" },
  light: { pill: "bg-white text-foreground", disc: "bg-foreground", bar: "bg-white" },
  outline: {
    pill: "border border-border bg-background text-foreground transition-colors hover:border-border-strong",
    disc: "bg-foreground",
    bar: "bg-background",
  },
} as const;

const SIZES = {
  md: { pill: "h-[50px] px-7 text-base", disc: 26, left: 10, shift: 16 },
  sm: { pill: "h-10 px-5 text-sm", disc: 22, left: 8, shift: 13 },
} as const;

/**
 * The site's primary CTA. At rest it's a plain pill with just its label.
 * On hover or focus an agent avatar (a disc of voice bars) spins and pops in
 * at the left edge with a ring flare, its bars start talking, and the label
 * glides right to make room. The pill never changes width, so nothing
 * around it shifts. Reduced motion: static label, no avatar animation.
 */
export function AgentButton({
  href,
  type,
  onClick,
  children = "Get your agent",
  tone = "dark",
  size = "md",
  className = "",
}: {
  href?: string;
  type?: "submit" | "button";
  onClick?: MouseEventHandler<HTMLElement>;
  children?: ReactNode;
  tone?: keyof typeof TONES;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const t = TONES[tone];
  const s = SIZES[size];

  const ref = useGsapContext<HTMLElement>(
    (_ctx, el, reducedMotion) => {
      const avatar = el.querySelector("[data-avatar]");
      const label = el.querySelector("[data-label]");
      const ring = el.querySelector("[data-ring]");
      const bars = el.querySelectorAll<HTMLElement>("[data-bar]");
      gsap.set(avatar, { scale: 0, rotate: -140, autoAlpha: 0 });
      if (reducedMotion) return;

      const tl = gsap
        .timeline({ paused: true })
        .to(label, { x: s.shift, duration: 0.45, ease: "power3.out" }, 0)
        .to(avatar, { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.55, ease: "back.out(2.4)" }, 0.04)
        .fromTo(
          ring,
          { scale: 0.6, autoAlpha: 0.9 },
          { scale: 1.9, autoAlpha: 0, duration: 0.7, ease: "power2.out", immediateRender: false },
          0.12
        );

      let voice: gsap.core.Tween | null = null;
      const enter = () => {
        tl.timeScale(1).play();
        voice?.kill();
        voice = gsap.to(bars, {
          scaleY: () => gsap.utils.random(0.3, 1),
          duration: 0.18,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
          stagger: { each: 0.05, from: "center" },
          delay: 0.2,
        });
      };
      const leave = () => {
        tl.timeScale(1.6).reverse();
        voice?.kill();
        voice = null;
        gsap.to(bars, { scaleY: 0.5, duration: 0.2 });
      };
      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointerleave", leave);
      el.addEventListener("focus", enter);
      el.addEventListener("blur", leave);
      return () => {
        voice?.kill();
        el.removeEventListener("pointerenter", enter);
        el.removeEventListener("pointerleave", leave);
        el.removeEventListener("focus", enter);
        el.removeEventListener("blur", leave);
      };
    },
    [s.shift]
  );

  const classes = `relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-medium ${t.pill} ${s.pill} ${className}`;

  const inner = (
    <>
      <span
        aria-hidden="true"
        className="absolute top-1/2 -translate-y-1/2"
        style={{ left: s.left, width: s.disc, height: s.disc }}
      >
        <span data-ring className="absolute inset-0 rounded-full border-2 border-accent opacity-0" />
        <span
          data-avatar
          className={`absolute inset-0 flex items-center justify-center gap-[2.5px] rounded-full opacity-0 ${t.disc}`}
        >
          {BARS.map((h, i) => (
            <span
              key={i}
              data-bar
              className={`w-[2.5px] rounded-full ${t.bar}`}
              style={{ height: s.disc * 0.5, transform: `scaleY(${h})` }}
            />
          ))}
        </span>
      </span>
      <span data-label className="relative">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <Link ref={ref as React.Ref<HTMLAnchorElement>} href={href} onClick={onClick} className={classes}>
        {inner}
      </Link>
    );
  }
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} type={type ?? "button"} onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}
