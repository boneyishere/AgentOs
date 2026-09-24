"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "./container";
import { TextReveal } from "@/lib/motion/text-reveal";
import { useScrollTimeline } from "@/lib/motion/scroll-timeline";
import { useTilt } from "@/lib/motion/use-tilt";
import { Magnetic } from "@/lib/motion/magnetic";
import Ferrofluid from "./Ferrofluid";
import { AgentButton } from "./agent-button";
import { ScrambleText } from "@/lib/motion/scramble-text";

export function Hero() {
  const sectionRef = useScrollTimeline<HTMLElement>(
    { start: "top top", end: "bottom top", scrub: 0.6 },
    (tl, el, reducedMotion) => {
      // Desktop only: on phones the copy and visual stack, so parallaxing the
      // visual away while it's the thing being looked at just fights the reader.
      if (reducedMotion || !window.matchMedia("(min-width: 1024px)").matches) return;
      tl.to(el.querySelector("[data-hero-copy]"), { yPercent: -22, autoAlpha: 0.15, ease: "none" }, 0);
      tl.to(el.querySelector("[data-hero-visual]"), { y: 90, scale: 0.92, ease: "none" }, 0);
    }
  );
  const visualRef = useTilt<HTMLDivElement>(7);

  return (
    <section ref={sectionRef} className="section-light overflow-hidden border-b border-border">
      <Container className="relative py-20 sm:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-10">
          <div data-hero-copy>
            <TextReveal
              as="h1"
              playOn="mount"
              delay={0.1}
              className="max-w-xl text-5xl font-medium leading-[1.12] tracking-[-0.5px] text-balance sm:text-6xl lg:text-[4.25rem] lg:tracking-[-2px]"
            >
              The <ScrambleText text="AI" className="text-accent" /> front desk that never clocks out.
            </TextReveal>

            <p className="mt-7 max-w-md text-lg leading-8 text-foreground-muted">
              Codely answers your calls and chats, remembers every customer, and books,
              updates, and follows up inside the tools you already use.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Magnetic>
                <AgentButton href="/contact" />
              </Magnetic>
              <Link
                href="/features"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
              >
                See how it works
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          <div
            ref={visualRef}
            data-hero-visual
            className="relative ml-auto flex h-[380px] w-full max-w-[600px] items-center justify-center overflow-hidden rounded-2xl bg-ink sm:h-[480px] lg:h-[550px]"
          >
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <Ferrofluid
                colors={["#2F69F1", "#7470E8", "#2F69F1"]}
                speed={0.4}
                scale={1.4}
                turbulence={0.9}
                fluidity={0.15}
                rimWidth={0.22}
                sharpness={2.5}
                shimmer={1.2}
                glow={2}
                flowDirection="down"
                opacity={1}
                mouseInteraction={true}
                mouseStrength={0.6}
                mouseRadius={0.3}
              />
            </div>
            <Image
              src="/images/robot-agent.png"
              alt="Codely AI agent"
              width={722}
              height={827}
              priority
              data-tilt="1"
              className="relative h-[60%] w-auto object-contain"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
