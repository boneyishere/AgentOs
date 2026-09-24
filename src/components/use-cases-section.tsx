"use client";

import { useEffect, useRef, useState } from "react";
import {
  CalendarCheck,
  LifeBuoy,
  Phone,
  RefreshCw,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { AgentRun, getRunSeconds, type RunBeat } from "@/lib/motion/agent-run";
import { TextReveal } from "@/lib/motion/text-reveal";

const USE_CASES: {
  label: string;
  description: string;
  icon: LucideIcon;
  script: RunBeat[];
}[] = [
  {
    label: "AI Receptionist",
    icon: Phone,
    description:
      "Handles incoming calls, understands requests, and routes them where they need to go.",
    script: [
      { kind: "customer", text: "Hi, is this the front desk?" },
      { kind: "understanding", tags: ["General inquiry", "Inbound call"], confidence: 0.97 },
      { kind: "agent", text: "Yes it is! How can I help you today?" },
      { kind: "customer", text: "I need to speak to someone in billing." },
      {
        kind: "action",
        label: "Routing the call",
        system: "Phone system",
        steps: ["Identify caller", "Find billing queue", "Warm transfer"],
      },
      { kind: "result", label: "Call transferred", detail: "Caller details logged" },
    ],
  },
  {
    label: "Sales & Lead Qualification",
    icon: TrendingUp,
    description:
      "Qualifies inbound leads with the right questions and scores them automatically.",
    script: [
      { kind: "customer", text: "I'm interested in your enterprise plan." },
      { kind: "understanding", tags: ["Sales intent", "Enterprise"], confidence: 0.94 },
      { kind: "agent", text: "Great — how many seats, and what's your timeline?" },
      { kind: "customer", text: "Around 50 seats, ideally live next quarter." },
      {
        kind: "action",
        label: "Scoring the lead",
        system: "CRM",
        steps: ["Budget · 50 seats", "Timeline · next quarter", "Push to HubSpot"],
      },
      { kind: "result", label: "Qualified lead", detail: "Score 92 · assigned to sales" },
    ],
  },
  {
    label: "Customer Support",
    icon: LifeBuoy,
    description: "Resolves common questions instantly using your knowledge base.",
    script: [
      { kind: "customer", text: "My order hasn't arrived yet." },
      { kind: "understanding", tags: ["Order status", "Shipping"], confidence: 0.96 },
      {
        kind: "action",
        label: "Looking up the order",
        system: "Knowledge base",
        steps: ["Find order #4821", "Check carrier status", "Estimate delivery"],
      },
      { kind: "agent", text: "Your order shipped yesterday — it's due tomorrow by 6 PM." },
      { kind: "result", label: "Issue resolved", detail: "No human needed · 38s" },
    ],
  },
  {
    label: "Appointment Booking",
    icon: CalendarCheck,
    description: "Checks availability and confirms bookings without back-and-forth.",
    script: [
      { kind: "customer", text: "Can I book a visit for Friday?" },
      { kind: "understanding", tags: ["Booking", "Friday"], confidence: 0.98 },
      {
        kind: "action",
        label: "Checking availability",
        system: "Calendar",
        steps: ["Friday · fully booked", "Next opening · Sat 11 AM"],
      },
      { kind: "agent", text: "Friday's full, but I have Saturday at 11 AM — does that work?" },
      { kind: "customer", text: "Saturday works great." },
      { kind: "result", label: "Appointment confirmed", detail: "Sat 11:00 · invite sent" },
    ],
  },
  {
    label: "Follow-ups",
    icon: RefreshCw,
    description: "Re-engages missed calls and stale leads automatically.",
    script: [
      { kind: "understanding", tags: ["Missed call", "Warm lead"], confidence: 0.91 },
      {
        kind: "action",
        label: "Sending a follow-up",
        system: "SMS",
        steps: ["Draft message", "Send to caller"],
      },
      { kind: "customer", text: "Thanks for reaching back out — yes, still interested." },
      { kind: "agent", text: "Great! Want me to schedule a quick call this week?" },
      { kind: "result", label: "Call scheduled", detail: "Thu 2 PM · added to calendar" },
    ],
  },
];

// The run's own length plus a hold so the outcome is readable before
// auto-advancing — shared by the advance timer and the progress bar so they
// can never drift apart.
const HOLD_MS = 2800;
function getCycleMs(script: RunBeat[]) {
  return getRunSeconds(script) * 1000 + HOLD_MS;
}

/** Thin, transform-only fill under the active desktop card, showing time
 *  left until auto-advance. Restarts naturally on remount (a fresh active
 *  index) — no imperative animation control needed. Reduced motion still
 *  gets a meaningful end state (full bar, not a missing one), it just skips
 *  the incremental fill per the site's `animation-duration` clamp. */
function AutoAdvanceProgress({ durationMs }: { durationMs: number }) {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent [animation:use-case-progress_linear_forwards]"
      style={{ animationDuration: `${durationMs}ms` }}
    />
  );
}

export function UseCasesSection() {
  const [active, setActive] = useState(0);
  // The first run (and the auto-advance clock) waits until the section is
  // actually on screen, so visitors never land mid-way through a script.
  const [started, setStarted] = useState(false);
  const current = USE_CASES[active];
  const sectionRef = useRef<HTMLElement | null>(null);
  const pillRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const pillScrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Keep the active pill scrolled into view on mobile, whether it became
  // active from a tap or from auto-advance cycling past what's visible.
  // Scoped to the pill strip's own horizontal scroll position (not
  // `scrollIntoView`, which also scrolls the *page* back to this section on
  // every auto-advance tick if the user has since scrolled elsewhere).
  useEffect(() => {
    const scroller = pillScrollerRef.current;
    const pill = pillRefs.current[active];
    if (!scroller || !pill) return;
    const target = pill.offsetLeft - scroller.clientWidth / 2 + pill.clientWidth / 2;
    scroller.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => {
      setActive((a) => (a + 1) % USE_CASES.length);
    }, getCycleMs(USE_CASES[active].script));
    return () => clearTimeout(timer);
  }, [active, started]);

  return (
    <section ref={sectionRef} id="use-cases" className="section-light border-b border-border">
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

        <div
          ref={pillScrollerRef}
          className="-mx-6 mt-10 flex snap-x gap-2 overflow-x-auto px-6 pb-2 lg:hidden"
        >
          {USE_CASES.map((useCase, i) => (
            <button
              key={useCase.label}
              ref={(node) => {
                pillRefs.current[i] = node;
              }}
              type="button"
              onClick={() => setActive(i)}
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

        <div className="mt-6 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-[minmax(0,440px)_1fr] lg:items-center lg:gap-16">
          <ul className="hidden flex-col gap-3 lg:flex">
            {USE_CASES.map(({ label, description, icon: Icon }, i) => (
              <li key={label}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`relative flex w-full flex-col gap-1.5 overflow-hidden rounded-2xl px-5 py-4 text-left transition-all duration-200 ${
                    i === active
                      ? "-translate-y-0.5 bg-background shadow-[0_8px_30px_rgba(26,26,26,0.08)]"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                        i === active ? "scale-110 text-accent" : "scale-100 text-foreground-muted"
                      }`}
                    />
                    <span
                      className={`text-base font-medium ${
                        i === active ? "text-foreground" : "text-foreground-muted"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  <p className="pl-7 text-sm text-foreground-muted">{description}</p>
                  {i === active && started && (
                    <AutoAdvanceProgress durationMs={getCycleMs(USE_CASES[i].script)} />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <AgentRun run={current} play={started} className="w-full lg:max-w-[680px] lg:justify-self-end" />
        </div>
      </Container>
    </section>
  );
}
