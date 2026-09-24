"use client";

import Link from "next/link";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { TextReveal } from "@/lib/motion/text-reveal";
import Orb from "./Orb";

export function CtaSection() {
  return (
    <section id="cta" className="relative overflow-hidden border-b border-border bg-ink">
      <div className="absolute inset-0" aria-hidden="true">
        <Orb hoverIntensity={0.5} rotateOnHover={true} hue={0} forceHoverState={false} />
      </div>
      <Container className="pointer-events-none relative py-24 text-center sm:py-32">
        <div className="relative mx-auto max-w-2xl px-8 py-10 sm:px-14 sm:py-14">
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
              className="pointer-events-auto mt-9 inline-flex h-[50px] items-center rounded-full bg-white px-6 text-base font-medium text-foreground transition-opacity hover:opacity-85"
            >
              Book a Demo
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
