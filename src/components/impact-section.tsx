"use client";

import {
  CalendarCheck,
  Clock,
  HeartHandshake,
  PhoneMissed,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { TextReveal } from "@/lib/motion/text-reveal";
import { gsap } from "@/lib/motion/gsap-setup";
import { useGsapContext } from "@/lib/motion/use-gsap-context";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";

const IMPACTS = [
  {
    icon: PhoneMissed,
    headline: "Fewer missed calls, fewer lost customers",
    estimate: "Est. 20–30% fewer missed inbound calls",
    description:
      "After-hours and peak-time calls get answered instead of going to voicemail.",
  },
  {
    icon: Clock,
    headline: "Lower overtime and staffing costs",
    estimate: "Est. $20K–$60K/year in avoided overtime",
    description:
      "Agents absorb call volume spikes without extra shifts or seasonal hires.",
  },
  {
    icon: CalendarCheck,
    headline: "Fewer scheduling errors and double-bookings",
    estimate: null,
    description:
      "Appointments sync directly to your calendar, removing manual entry mistakes.",
  },
  {
    icon: ShieldCheck,
    headline: "Reduced compliance and quality risk",
    estimate: null,
    description:
      "Every conversation follows the same instructions and escalation rules — no inconsistent answers.",
  },
  {
    icon: Zap,
    headline: "Faster response, lower churn risk",
    estimate: "Est. 15–25% faster average response time",
    description: "Customers get answered immediately instead of waiting in a queue.",
  },
  {
    icon: HeartHandshake,
    headline: "Less burnout on your front-line team",
    estimate: null,
    description:
      "Repetitive, high-volume questions get handled automatically, freeing staff for complex cases.",
  },
];

function ImpactCard({ item }: { item: (typeof IMPACTS)[number] }) {
  const Icon = item.icon;
  return (
    <div className="flex w-[300px] shrink-0 flex-col rounded-2xl border border-ink-border bg-white/5 p-6 sm:w-[340px]">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-accent">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <p className="mt-5 text-xl font-medium leading-snug text-accent">
        {item.headline}
      </p>
      <div className="mt-6 flex-1 border-t border-ink-border pt-5">
        <p className="text-sm text-ink-foreground-muted">{item.description}</p>
      </div>
      {item.estimate && (
        <p className="mt-6 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-ink-foreground-muted">
          {item.estimate}
        </p>
      )}
    </div>
  );
}

export function ImpactSection() {
  const reducedMotion = useReducedMotion();
  const items = reducedMotion ? IMPACTS : [...IMPACTS, ...IMPACTS];

  const trackRef = useGsapContext<HTMLDivElement>((_ctx, el, reduced) => {
    if (reduced) return;

    const halfWidth = el.scrollWidth / 2;
    const tween = gsap.to(el, {
      x: -halfWidth,
      duration: halfWidth / 45,
      ease: "none",
      repeat: -1,
    });

    const pause = () => tween.pause();
    const resume = () => tween.play();
    const wrapper = el.parentElement;
    wrapper?.addEventListener("pointerenter", pause);
    wrapper?.addEventListener("pointerleave", resume);

    return () => {
      wrapper?.removeEventListener("pointerenter", pause);
      wrapper?.removeEventListener("pointerleave", resume);
    };
  }, []);

  return (
    <section className="border-b border-border bg-ink text-ink-foreground">
      <Container className="py-20 sm:py-28">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <TextReveal className="max-w-lg text-3xl font-medium tracking-tight sm:text-4xl">
            Reduce cost. Remove risk.
          </TextReveal>
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-ink-foreground-muted">
            Estimated impact
          </span>
        </div>
        <Reveal delay={0.05}>
          <p className="mt-4 max-w-lg text-ink-foreground-muted">
            Every unanswered call, scheduling mistake, and inconsistent answer is a
            cost or a risk. Here&apos;s where an AI agent typically takes that off
            the table.
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className={`mt-12 ${reducedMotion ? "overflow-x-auto" : "overflow-hidden"}`}
        >
          <div
            ref={trackRef}
            className={`flex gap-6 ${reducedMotion ? "w-full" : "w-fit"}`}
          >
            {items.map((item, i) => (
              <ImpactCard key={`${item.headline}-${i}`} item={item} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
