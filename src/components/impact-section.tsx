"use client";

import type { ComponentType } from "react";
import { Container } from "./container";
import { SectionHeading } from "./section-heading";
import { gsap } from "@/lib/motion/gsap-setup";
import { useGsapContext } from "@/lib/motion/use-gsap-context";
import { MissedCallsVisual } from "./impact-visuals/missed-calls-visual";
import { OvertimeVisual } from "./impact-visuals/overtime-visual";
import { SchedulingVisual } from "./impact-visuals/scheduling-visual";
import { ComplianceVisual } from "./impact-visuals/compliance-visual";
import { ResponseVisual } from "./impact-visuals/response-visual";
import { BurnoutVisual } from "./impact-visuals/burnout-visual";

const IMPACTS: {
  headline: string;
  description: string;
  hue: string;
  Visual: ComponentType;
}[] = [
  {
    headline: "Fewer missed calls, fewer lost customers",
    description: "After-hours and peak-time calls get answered instead of going to voicemail.",
    hue: "var(--accent)",
    Visual: MissedCallsVisual,
  },
  {
    headline: "Lower overtime and staffing costs",
    description: "Agents absorb call volume spikes without extra shifts or seasonal hires.",
    hue: "var(--amber)",
    Visual: OvertimeVisual,
  },
  {
    headline: "Fewer scheduling errors and double-bookings",
    description: "Appointments sync directly to your calendar, removing manual entry mistakes.",
    hue: "var(--iris)",
    Visual: SchedulingVisual,
  },
  {
    headline: "Reduced compliance and quality risk",
    description:
      "Every conversation follows the same instructions and escalation rules, so answers stay consistent.",
    hue: "var(--teal)",
    Visual: ComplianceVisual,
  },
  {
    headline: "Faster response, lower churn risk",
    description: "Customers get answered immediately instead of waiting in a queue.",
    hue: "var(--rose)",
    Visual: ResponseVisual,
  },
  {
    headline: "Less burnout on your front-line team",
    description:
      "Repetitive, high-volume questions get handled automatically, freeing staff for complex cases.",
    hue: "var(--accent)",
    Visual: BurnoutVisual,
  },
];

// Sticky offsets: clear the floating nav, then let each earlier card's top edge peek out.
const NAV_CLEARANCE = 104;
const PEEK = 16;

function ImpactCard({ item }: { item: (typeof IMPACTS)[number] }) {
  const { Visual } = item;
  return (
    <article
      data-deck-card
      data-replay
      className="spotlight relative origin-top overflow-hidden rounded-2xl border border-border bg-background shadow-soft lg:grid lg:h-[min(500px,calc(100vh-13rem))] lg:grid-cols-[1fr_1.1fr]"
      style={{ "--hue": item.hue } as React.CSSProperties}
    >
      <div className="flex flex-col gap-4 p-6 sm:p-9 lg:justify-between lg:gap-10 lg:p-11">
        <h3 className="max-w-md text-[1.5rem] font-medium leading-[1.18] tracking-tight text-balance text-foreground sm:text-[1.625rem] xl:text-[1.75rem]">
          {item.headline}
        </h3>
        <p className="max-w-sm text-[15px] text-foreground-muted sm:text-base">{item.description}</p>
      </div>

      <div className="m-3 mt-2 flex items-center justify-center rounded-xl border border-border bg-surface p-4 sm:mt-0 sm:p-8 lg:mt-3">
        <Visual />
      </div>

      {/* Dims as later cards stack over this one. */}
      <div
        data-dim
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[rgba(26,26,26,0.05)] opacity-0"
      />
    </article>
  );
}

/**
 * A sticky stacking deck (desktop): each card slides up and sticks over the
 * last, a few px lower, so earlier cards' top edges peek out. While the rest
 * of the deck deals in, earlier cards scale back and dim — scrubbed straight
 * off scroll, so it reverses cleanly. Below lg, and under reduced motion's
 * scrub-free branch, it's a plain stack (sticky is layout, not motion, but tall
 * mobile cards would hide their own bottoms if they stuck).
 */
export function ImpactSection() {
  const deckRef = useGsapContext<HTMLDivElement>((_ctx, el, reducedMotion) => {
    if (reducedMotion) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const cards = [...el.querySelectorAll<HTMLElement>("[data-deck-card]")];
      const last = cards[cards.length - 1]?.parentElement;
      if (!last) return;
      cards.slice(0, -1).forEach((card, i) => {
        const scrollTrigger = {
          trigger: card.parentElement,
          start: `top ${NAV_CLEARANCE + i * PEEK}px`,
          endTrigger: last,
          end: `top ${NAV_CLEARANCE + (cards.length - 1) * PEEK}px`,
          scrub: true,
        };
        gsap.to(card, { scale: 1 - (cards.length - 1 - i) * 0.03, ease: "none", scrollTrigger });
        gsap.to(card.querySelector("[data-dim]"), { opacity: 1, ease: "none", scrollTrigger: { ...scrollTrigger } });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      className="section-light border-b border-border bg-surface"
      style={{ "--light": "var(--iris)" } as React.CSSProperties}
    >
      <Container className="relative py-20 sm:py-28">
        <SectionHeading
          title="Your team gets its day back."
          subtitle="The agent absorbs the repetitive calls and admin, so your people spend their time on the customers who need a human."
        />

        <div ref={deckRef} className="mt-14 lg:mt-16">
          {IMPACTS.map((item, i) => (
            <div
              key={item.headline}
              className="mb-6 lg:sticky lg:mb-[12vh] lg:last:mb-0"
              style={{ top: NAV_CLEARANCE + i * PEEK }}
            >
              <ImpactCard item={item} />
            </div>
          ))}
          {/* Holds the finished stack on screen briefly before the section scrolls away. */}
          <div aria-hidden="true" className="hidden h-[14vh] lg:block" />
        </div>
      </Container>
    </section>
  );
}
