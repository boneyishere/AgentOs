"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "./container";
import {
  ConversationVisual,
  type ConversationBeat,
} from "@/lib/motion/conversation-visual";
import { TextReveal } from "@/lib/motion/text-reveal";

const HERO_SCRIPT: ConversationBeat[] = [
  {
    kind: "customer",
    text: "Hi, I need to move my appointment to this week if possible.",
  },
  { kind: "understanding", label: "Reschedule request" },
  { kind: "action", label: "Checking availability…" },
  {
    kind: "agent",
    text: "I have Thursday at 2 PM open — want me to book that?",
  },
  { kind: "result", label: "Appointment booked" },
];

export function Hero() {
  return (
    <section className="border-b border-border">
      <Container className="grid grid-cols-1 gap-14 py-20 sm:py-28 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-16">
        <div>
          <TextReveal
            as="h1"
            playOn="mount"
            delay={0.1}
            className="max-w-xl text-5xl font-medium leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-[4.25rem]"
          >
            Conversations your <span className="text-accent">business</span> can
            act on.
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

        <ConversationVisual variant="full" script={HERO_SCRIPT} />
      </Container>
    </section>
  );
}
