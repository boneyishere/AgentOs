"use client";

import Link from "next/link";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { TextReveal } from "@/lib/motion/text-reveal";
import { useScrollTimeline } from "@/lib/motion/scroll-timeline";
import { gsap } from "@/lib/motion/gsap-setup";

function CornerBracket({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={`absolute h-7 w-7 ${className}`} aria-hidden="true">
      <path
        data-bracket
        d="M1,27 L1,1 L27,1"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CtaSection() {
  const frameRef = useScrollTimeline<HTMLDivElement>(
    { start: "top 75%", once: true },
    (tl, el, reducedMotion) => {
      const brackets = el.querySelectorAll<SVGPathElement>("[data-bracket]");

      if (reducedMotion) {
        gsap.set(brackets, { drawSVG: "100%" });
        return;
      }

      tl.fromTo(
        brackets,
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 0.8, stagger: 0.12, ease: "power2.out" }
      );
    },
    []
  );

  return (
    <section id="cta" className="border-b border-border">
      <Container className="py-24 text-center sm:py-32">
        <div
          ref={frameRef}
          className="relative mx-auto max-w-2xl px-8 py-10 sm:px-14 sm:py-14"
        >
          <CornerBracket className="left-0 top-0" />
          <CornerBracket className="right-0 top-0 -scale-x-100" />
          <CornerBracket className="bottom-0 left-0 -scale-y-100" />
          <CornerBracket className="bottom-0 right-0 -scale-100" />

          <TextReveal className="mx-auto text-4xl font-medium tracking-tight sm:text-5xl">
            Put an AI agent to work.
          </TextReveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-md text-lg text-foreground-muted">
              Tell us what your business handles today. We&apos;ll show you where
              Codely can help.
            </p>
            <Link
              href="/contact"
              className="mt-9 inline-flex items-center rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              Book a Demo
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
