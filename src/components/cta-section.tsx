"use client";

import { Container } from "./container";
import { Reveal } from "./reveal";
import { TextReveal } from "@/lib/motion/text-reveal";
import Orb from "./Orb";
import { Magnetic } from "@/lib/motion/magnetic";
import { AgentButton } from "./agent-button";

export function CtaSection() {
  return (
    <section id="cta" className="border-b border-border">
      <Container className="py-20 sm:py-28">
        <div className="relative isolate flex h-[min(620px,calc(100vh-10rem))] min-h-[440px] items-center justify-center overflow-hidden rounded-2xl bg-ink shadow-soft">
          <div className="absolute inset-0 -z-10 opacity-55 sm:opacity-100" aria-hidden="true">
            <Orb hoverIntensity={0.5} rotateOnHover={true} hue={0} forceHoverState={false} />
          </div>
          <div className="pointer-events-none relative mx-auto max-w-2xl px-6 text-center sm:px-8">
            <TextReveal className="type-section mx-auto font-medium text-white">
              Your agent could be answering by Friday.
            </TextReveal>
            <Reveal delay={0.1}>
              <p className="type-lead mx-auto mt-5 max-w-md text-white/70">
                Tell us what your phones and inbox look like today. We&apos;ll show you what
                the agent would take on first.
              </p>
              <Magnetic className="pointer-events-auto mt-9">
                <AgentButton href="/contact" tone="light" />
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
