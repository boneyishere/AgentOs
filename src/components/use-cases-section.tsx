"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import {
  ConversationVisual,
  type ConversationBeat,
} from "@/lib/motion/conversation-visual";
import { TextReveal } from "@/lib/motion/text-reveal";

const USE_CASES: { label: string; description: string; script: ConversationBeat[] }[] = [
  {
    label: "AI Receptionist",
    description:
      "Handles incoming calls, understands requests, and routes them where they need to go.",
    script: [
      { kind: "customer", text: "Hi, is this the front desk?" },
      { kind: "understanding", label: "Incoming call, general inquiry" },
      { kind: "agent", text: "Yes it is! How can I help you today?" },
      { kind: "customer", text: "I need to speak to someone in billing." },
      { kind: "action", label: "Routing to billing department" },
      { kind: "result", label: "Call transferred, customer info logged" },
    ],
  },
  {
    label: "Sales & Lead Qualification",
    description:
      "Qualifies inbound leads with the right questions and scores them automatically.",
    script: [
      { kind: "customer", text: "I'm interested in your enterprise plan." },
      { kind: "understanding", label: "Qualification questions" },
      {
        kind: "agent",
        text: "Great — how many seats are you looking at, and what's your timeline?",
      },
      { kind: "customer", text: "Around 50 seats, ideally live next quarter." },
      { kind: "action", label: "Scoring lead: budget, timeline, authority" },
      { kind: "result", label: "Qualified lead pushed to CRM" },
    ],
  },
  {
    label: "Customer Support",
    description: "Resolves common questions instantly using your knowledge base.",
    script: [
      { kind: "customer", text: "My order hasn't arrived yet." },
      { kind: "understanding", label: "Order status request" },
      { kind: "action", label: "Looking up order in knowledge base" },
      {
        kind: "agent",
        text: "Your order shipped yesterday — it's due tomorrow by 6 PM.",
      },
      { kind: "customer", text: "Perfect, thank you." },
      { kind: "result", label: "Issue resolved" },
    ],
  },
  {
    label: "Appointment Booking",
    description: "Checks availability and confirms bookings without back-and-forth.",
    script: [
      { kind: "customer", text: "Can I book a visit for Friday?" },
      { kind: "understanding", label: "Booking request" },
      { kind: "action", label: "Checking availability" },
      {
        kind: "agent",
        text: "Friday's full, but I have Saturday at 11 AM — does that work?",
      },
      { kind: "customer", text: "Saturday works great." },
      { kind: "result", label: "Appointment confirmed" },
    ],
  },
  {
    label: "Follow-ups",
    description: "Re-engages missed calls and stale leads automatically.",
    script: [
      { kind: "understanding", label: "Missed call detected" },
      { kind: "action", label: "Sending automated follow-up" },
      {
        kind: "customer",
        text: "Thanks for reaching back out — yes, still interested.",
      },
      { kind: "agent", text: "Great! Want me to schedule a quick call this week?" },
      { kind: "customer", text: "Sure, Thursday afternoon works." },
      { kind: "result", label: "Conversation re-engaged, call scheduled" },
    ],
  },
];

export function UseCasesSection() {
  const [active, setActive] = useState(0);
  // Only the very first card's reveal should wait on scroll position; every
  // later switch (click or auto-advance) happens while the user is already
  // looking at this section, so it should play immediately — otherwise a
  // switch while the card sits just outside the "top 78%" trigger zone
  // (common on mobile's stacked layout) leaves the new content stuck
  // invisible. See ConversationVisual's `scrollGated` prop.
  const [hasSwitched, setHasSwitched] = useState(false);
  const current = USE_CASES[active];
  const pillRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const goTo = (i: number) => {
    setHasSwitched(true);
    setActive(i);
  };

  // Keep the active pill scrolled into view on mobile, whether it became
  // active from a tap or from auto-advance cycling past what's visible.
  useEffect(() => {
    pillRefs.current[active]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [active]);

  // Auto-advance once the current script has fully played out, timed to
  // roughly match ConversationVisual's internal reveal pace (see
  // conversation-visual.tsx: beats start at 0.2s, stagger 0.45s, 0.5s each),
  // plus a pause so the outcome is readable before moving on.
  useEffect(() => {
    const beatCount = USE_CASES[active].script.length;
    const revealMs = 200 + Math.max(beatCount - 1, 0) * 450 + 500;
    const timer = setTimeout(() => {
      goTo((active + 1) % USE_CASES.length);
    }, revealMs + 2600);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <section id="use-cases" className="border-b border-border">
      <Container className="py-20 sm:py-28">
        <div className="max-w-xl">
          <TextReveal className="text-3xl font-medium tracking-tight sm:text-4xl">
            Give your AI a job. Let it get to work.
          </TextReveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-lg text-foreground-muted">
              From answering the phone to following up with leads, Codely can
              take on the conversations and tasks your team handles every
              day.
            </p>
          </Reveal>
        </div>

        <div className="-mx-6 mt-10 flex snap-x gap-2 overflow-x-auto px-6 pb-2 lg:hidden">
          {USE_CASES.map((useCase, i) => (
            <button
              key={useCase.label}
              ref={(node) => {
                pillRefs.current[i] = node;
              }}
              type="button"
              onClick={() => goTo(i)}
              className={`shrink-0 snap-start rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                i === active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-foreground-muted"
              }`}
            >
              {useCase.label}
            </button>
          ))}
        </div>

        <p className="mt-4 text-sm text-foreground-muted lg:hidden">{current.description}</p>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-[minmax(0,440px)_1fr] lg:gap-8">
          <ul className="hidden lg:block">
            {USE_CASES.map((useCase, i) => (
              <li key={useCase.label}>
                <button
                  type="button"
                  onMouseEnter={() => goTo(i)}
                  onClick={() => goTo(i)}
                  className={`flex w-full flex-col gap-1.5 border-l-2 px-4 py-4 text-left transition-colors ${
                    i === active
                      ? "border-accent"
                      : "border-transparent hover:border-border"
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-xs text-foreground-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-base font-medium ${
                        i === active ? "text-foreground" : "text-foreground-muted"
                      }`}
                    >
                      {useCase.label}
                    </span>
                  </div>
                  <p className="pl-8 text-sm text-foreground-muted">
                    {useCase.description}
                  </p>
                </button>
              </li>
            ))}
          </ul>

          <ConversationVisual
            key={active}
            variant="compact"
            script={current.script}
            label={current.label.toUpperCase()}
            scrollGated={!hasSwitched}
            className="min-h-[360px] w-full sm:min-h-[420px] lg:ml-[175px] lg:max-w-[calc(100%-285px)]"
          />
        </div>
      </Container>
    </section>
  );
}
