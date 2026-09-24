"use client";

import { Check, PhoneIncoming, PhoneMissed } from "lucide-react";
import { usePlayTimeline } from "@/lib/motion/use-play-timeline";

const CALLS = [
  { time: "07:52", who: "+1 (415) 555-0132" },
  { time: "09:47", who: "Maya Rodriguez" },
  { time: "12:15", who: "+1 (628) 555-0199" },
  { time: "18:40", who: "Dan Kowalski" },
  { time: "21:06", who: "+1 (510) 555-0187" },
];

/** A call log whose "Missed" statuses flip, one by one, to "Answered by AI". */
export function MissedCallsVisual() {
  const ref = usePlayTimeline<HTMLDivElement>((tl, el, reduced) => {
    const rows = [...el.querySelectorAll<HTMLElement>("[data-row]")];
    const count = el.querySelector<HTMLElement>("[data-count]");
    const state = { v: 14 };
    if (count) count.textContent = reduced ? "0" : "14";
    tl.fromTo(
      state,
      { v: 14 },
      {
        v: 0,
        duration: 0.3 + rows.length * 0.38,
        ease: "power1.inOut",
        onUpdate: () => {
          if (count) count.textContent = String(Math.round(state.v));
        },
      },
      0.2
    );
    rows.forEach((row, i) => {
      const at = 0.25 + i * 0.38;
      tl.fromTo(
        row.querySelector("[data-miss]"),
        { rotateX: 0, autoAlpha: 1 },
        { rotateX: 90, autoAlpha: 0, duration: 0.18, ease: "power2.in" },
        at
      );
      tl.fromTo(
        row.querySelector("[data-ok]"),
        { rotateX: -90, autoAlpha: 0 },
        { rotateX: 0, autoAlpha: 1, duration: 0.3, ease: "back.out(2.2)" },
        at + 0.18
      );
      tl.fromTo(
        row.querySelector("[data-icon]"),
        { color: "var(--rose)" },
        { color: "var(--teal)", duration: 0.25 },
        at + 0.18
      );
    });
  });

  return (
    <div ref={ref} className="w-full max-w-[400px]">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-foreground-muted">Missed today</p>
          <p className="mt-1 text-4xl font-medium tracking-tight tabular-nums text-foreground">
            <span data-count>0</span>
          </p>
        </div>
        <span className="text-[11px] text-foreground-muted">was 14 before Codely</span>
      </div>
      <ul className="mt-5 divide-y divide-border overflow-hidden rounded-xl border border-border bg-background">
        {CALLS.map((call) => (
          <li key={call.time} data-row className="flex items-center gap-3 px-3.5 py-2.5 text-[13px]">
            <span data-icon className="text-teal">
              <PhoneIncoming className="h-3.5 w-3.5" />
            </span>
            <span className="w-11 shrink-0 tabular-nums text-foreground-muted">{call.time}</span>
            <span className="min-w-0 flex-1 truncate text-foreground">{call.who}</span>
            <span className="grid [perspective:400px]">
              <span
                data-miss
                className="invisible inline-flex items-center gap-1 justify-self-end rounded-full border border-rose/30 bg-rose/[0.06] px-2 py-0.5 text-[11px] text-rose [grid-area:1/1]"
              >
                <PhoneMissed className="h-3 w-3" />
                Missed
              </span>
              <span
                data-ok
                className="inline-flex items-center gap-1 justify-self-end rounded-full border border-teal/30 bg-teal/[0.08] px-2 py-0.5 text-[11px] text-foreground [grid-area:1/1]"
              >
                <Check className="h-3 w-3 text-teal" strokeWidth={2.5} />
                Answered by AI
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
