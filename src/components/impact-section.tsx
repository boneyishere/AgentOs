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
    description:
      "After-hours and peak-time calls get answered instead of going to voicemail.",
  },
  {
    icon: Clock,
    headline: "Lower overtime and staffing costs",
    description:
      "Agents absorb call volume spikes without extra shifts or seasonal hires.",
  },
  {
    icon: CalendarCheck,
    headline: "Fewer scheduling errors and double-bookings",
    description:
      "Appointments sync directly to your calendar, removing manual entry mistakes.",
  },
  {
    icon: ShieldCheck,
    headline: "Reduced compliance and quality risk",
    description:
      "Every conversation follows the same instructions and escalation rules — no inconsistent answers.",
  },
  {
    icon: Zap,
    headline: "Faster response, lower churn risk",
    description: "Customers get answered immediately instead of waiting in a queue.",
  },
  {
    icon: HeartHandshake,
    headline: "Less burnout on your front-line team",
    description:
      "Repetitive, high-volume questions get handled automatically, freeing staff for complex cases.",
  },
];

function ImpactCard({ item }: { item: (typeof IMPACTS)[number] }) {
  const Icon = item.icon;
  return (
    <div className="relative flex w-[300px] shrink-0 flex-col overflow-hidden rounded-2xl border border-ink-border-strong bg-white/[0.06] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_8px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:w-[340px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"
      />
      <span className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-ink-border bg-white/10 text-ink-foreground backdrop-blur-sm">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <p className="relative mt-5 text-xl font-medium leading-snug text-ink-foreground">
        {item.headline}
      </p>
      <div className="relative mt-6 flex-1 border-t border-ink-border pt-5">
        <p className="text-sm text-ink-foreground-muted">{item.description}</p>
      </div>
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
        <TextReveal className="max-w-lg text-3xl font-medium tracking-tight sm:text-4xl">
          Take the busywork off your team&apos;s plate.
        </TextReveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-lg text-ink-foreground-muted">
            Let AI handle the conversations that consume your team&apos;s time,
            while your people focus on the customers and work that need them
            most.
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
