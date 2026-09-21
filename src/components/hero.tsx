"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "./container";
import { TextReveal } from "@/lib/motion/text-reveal";
import Ferrofluid from "./Ferrofluid";

export function Hero() {
  return (
    <section className="border-b border-border">
      <Container className="py-20 sm:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-10">
          <div>
            <TextReveal
              as="h1"
              playOn="mount"
              delay={0.1}
              className="max-w-xl text-5xl font-medium leading-[1.12] tracking-tight text-balance sm:text-6xl lg:text-[4.25rem]"
            >
              Meet the <span className="text-accent">AI</span> that works for you.
            </TextReveal>

            <p className="mt-7 max-w-md text-lg leading-8 text-foreground-muted">
              Codely gives businesses AI agents that can talk, understand,
              remember, and act across real customer conversations.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
              >
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/features"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
              >
                Explore Features
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          <div className="relative mx-auto flex h-[550px] w-full max-w-[600px] items-center justify-center overflow-hidden rounded-2xl bg-ink">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <Ferrofluid
                colors={["#2c3899", "#4959ee", "#aab4fb"]}
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
              className="relative h-[60%] w-auto object-contain"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
