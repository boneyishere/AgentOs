"use client";

import { AlertTriangle, CalendarCheck, Check } from "lucide-react";
import { usePlayTimeline } from "@/lib/motion/use-play-timeline";

const HOURS = ["9:00", "10:00", "11:00", "12:00"];
const ROW = 46;

/** Two bookings collide at 10:00; one slides to 11:30 and both sync cleanly. */
export function SchedulingVisual() {
  const ref = usePlayTimeline<HTMLDivElement>((tl, el) => {
    const moving = el.querySelector("[data-moving]");
    const warn = el.querySelector("[data-warn]");
    const synced = el.querySelector("[data-synced]");
    const checks = el.querySelectorAll("[data-check]");

    tl.fromTo(moving, { x: 26, y: 10 }, { x: 26, y: 10, duration: 0.01 }, 0);
    tl.fromTo(warn, { autoAlpha: 1, scale: 1 }, { x: -3, duration: 0.07, repeat: 5, yoyo: true, ease: "sine.inOut" }, 0.3);
    tl.to(moving, { x: 0, y: ROW * 1.5, duration: 0.75, ease: "power3.inOut" }, 0.85);
    tl.to(warn, { autoAlpha: 0, scale: 0.8, duration: 0.2 }, 0.95);
    tl.fromTo(synced, { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, 1.5);
    tl.fromTo(checks, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.3, stagger: 0.12, ease: "back.out(2.6)" }, 1.55);
  });

  return (
    <div ref={ref} className="w-full max-w-[400px]">
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <div>
          <p className="text-xs text-foreground-muted">Thursday</p>
          <p className="mt-1 text-3xl font-medium tracking-tight sm:text-4xl text-foreground">0 conflicts</p>
        </div>
        <span className="grid">
          <span
            data-warn
            className="invisible inline-flex items-center gap-1 justify-self-end rounded-full border border-rose/30 bg-rose/[0.06] px-2 py-0.5 text-[11px] text-rose [grid-area:1/1]"
          >
            <AlertTriangle className="h-3 w-3" />
            Double-booked
          </span>
          <span
            data-synced
            className="inline-flex items-center gap-1 justify-self-end rounded-full border border-iris/30 bg-iris/[0.08] px-2 py-0.5 text-[11px] text-foreground [grid-area:1/1]"
          >
            <CalendarCheck className="h-3 w-3 text-iris" />
            Synced to calendar
          </span>
        </span>
      </div>

      <div className="relative mt-5 rounded-xl border border-border bg-background px-3.5 py-2">
        {HOURS.map((h) => (
          <div key={h} className="flex items-start gap-3 border-b border-dashed border-border last:border-b-0" style={{ height: ROW }}>
            <span className="w-10 pt-1.5 text-[10px] tabular-nums text-foreground-muted">{h}</span>
          </div>
        ))}

        <div className="absolute left-[4.1rem] right-3.5" style={{ top: 8 + ROW }}>
          <Booking name="Priya S. · Consultation" />
        </div>
        <div data-moving className="absolute left-[4.1rem] right-3.5" style={{ top: 8 + ROW, transform: `translateY(${ROW * 1.5}px)` }}>
          <Booking name="Tom H. · Follow-up" />
        </div>
      </div>
    </div>
  );
}

function Booking({ name }: { name: string }) {
  return (
    <div className="flex h-[38px] items-center justify-between rounded-lg border border-iris/25 bg-[color-mix(in_srgb,var(--iris)_7%,white)] px-3 text-[12px] text-foreground shadow-soft">
      <span className="truncate">{name}</span>
      <span data-check className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-iris">
        <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
      </span>
    </div>
  );
}
