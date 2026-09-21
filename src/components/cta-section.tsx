"use client";

import Link from "next/link";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { TextReveal } from "@/lib/motion/text-reveal";
import { useScrollTimeline } from "@/lib/motion/scroll-timeline";
import { gsap } from "@/lib/motion/gsap-setup";
import GhostFibers from "./GhostFibers";

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
    <section id="cta" className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <GhostFibers
          lineColor="#140E35"
          glowColor="#3437A0"
          speed={0.2}
          scale={2}
          rotation={0}
          rotationSpeed={0.25}
          layers={4}
          waveAmplitude={0.015}
          waveFrequency={3}
          waveSpeed={0.15}
          layerSpeed={0.08}
          twist={0.1}
          twistFrequency={5}
          twistSpeed={1.2}
          lineFrequency={5}
          lineSpacing={2}
          lineSharpness={16}
          glowFalloff={10}
          glowIntensity={1.6}
          brightness={2}
          blueBoost={1.25}
          vignette={0.8}
          grain={0.05}
          dpr={1}
        />
      </div>
      <Container className="relative py-24 text-center sm:py-32">
        <div
          ref={frameRef}
          className="relative mx-auto max-w-2xl px-8 py-10 sm:px-14 sm:py-14"
        >
          <CornerBracket className="left-0 top-0" />
          <CornerBracket className="right-0 top-0 -scale-x-100" />
          <CornerBracket className="bottom-0 left-0 -scale-y-100" />
          <CornerBracket className="bottom-0 right-0 -scale-100" />

          <TextReveal className="mx-auto text-4xl font-medium tracking-tight text-white sm:text-5xl">
            Put an AI agent to work.
          </TextReveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-md text-lg text-white/70">
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
