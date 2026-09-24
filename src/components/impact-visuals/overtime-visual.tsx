"use client";

import { usePlayTimeline } from "@/lib/motion/use-play-timeline";

// Base shift hours and overtime hours per day (px heights at 8px per hour).
const WEEK = [
  { day: "M", base: 8, over: 3 },
  { day: "T", base: 8, over: 4 },
  { day: "W", base: 8, over: 2.5 },
  { day: "T", base: 8, over: 5 },
  { day: "F", base: 8, over: 4.5 },
  { day: "S", base: 5, over: 2.5 },
  { day: "S", base: 3, over: 1.5 },
];
const PX = 13;

/** A week of shifts whose amber overtime segments drain away. */
export function OvertimeVisual() {
  const ref = usePlayTimeline<HTMLDivElement>((tl, el, reduced) => {
    const over = [...el.querySelectorAll<HTMLElement>("[data-over]")];
    const count = el.querySelector<HTMLElement>("[data-count]");
    const state = { v: 23 };
    if (count) count.textContent = reduced ? "2h" : "23h";
    tl.fromTo(
      over,
      { scaleY: 1 },
      { scaleY: 0.08, duration: 0.7, stagger: 0.12, ease: "power3.inOut" },
      0.2
    );
    tl.fromTo(
      state,
      { v: 23 },
      {
        v: 2,
        duration: 0.7 + over.length * 0.12,
        ease: "power2.inOut",
        onUpdate: () => {
          if (count) count.textContent = `${Math.round(state.v)}h`;
        },
      },
      0.2
    );
  });

  return (
    <div ref={ref} className="w-full max-w-[400px]">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-foreground-muted">Overtime this week</p>
          <p data-count className="mt-1 text-4xl font-medium tracking-tight tabular-nums text-foreground">
            2h
          </p>
        </div>
        <span className="inline-flex items-center gap-3 text-[11px] text-foreground-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-foreground/15" />
            Shift
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-amber" />
            Overtime
          </span>
        </span>
      </div>
      <div className="mt-6 flex h-[190px] items-end justify-between gap-2.5 rounded-xl border border-border bg-background px-4 pb-3 pt-4">
        {WEEK.map((d, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full max-w-[26px] flex-col justify-end">
              <span
                data-over
                className="block origin-bottom rounded-t-md bg-amber"
                style={{ height: `${d.over * PX}px`, transform: "scaleY(0.08)" }}
              />
              <span className="block rounded-b-md bg-foreground/15" style={{ height: `${d.base * PX * 0.9}px` }} />
            </div>
            <span className="text-[10px] text-foreground-muted">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
