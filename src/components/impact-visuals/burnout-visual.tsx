"use client";

import { usePlayTimeline } from "@/lib/motion/use-play-timeline";

const TEAM = [
  { initials: "EL", name: "Elena", from: 0.22, to: 0.86 },
  { initials: "MO", name: "Marcus", from: 0.3, to: 0.9 },
  { initials: "AK", name: "Aiko", from: 0.18, to: 0.8 },
  { initials: "DS", name: "Dev", from: 0.26, to: 0.94 },
];

/** The team's energy refills as repetitive tickets drop off their plate. */
export function BurnoutVisual() {
  const ref = usePlayTimeline<HTMLDivElement>((tl, el, reduced) => {
    const bars = [...el.querySelectorAll<HTMLElement>("[data-bar]")];
    const count = el.querySelector<HTMLElement>("[data-count]");
    const state = { v: 128 };
    if (count) count.textContent = reduced ? "12" : "128";
    bars.forEach((bar, i) => {
      const m = TEAM[i];
      tl.fromTo(
        bar,
        { scaleX: m.from, backgroundColor: "var(--rose)" },
        { scaleX: m.to, backgroundColor: "var(--accent)", duration: 1.1, ease: "power3.inOut" },
        0.25 + i * 0.12
      );
    });
    tl.fromTo(
      state,
      { v: 128 },
      {
        v: 12,
        duration: 1.4,
        ease: "power3.inOut",
        onUpdate: () => {
          if (count) count.textContent = String(Math.round(state.v));
        },
      },
      0.25
    );
  });

  return (
    <div ref={ref} className="w-full max-w-[400px]">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-foreground-muted">Repetitive tickets on the team</p>
          <p data-count className="mt-1 text-3xl font-medium tracking-tight sm:text-4xl tabular-nums text-foreground">
            12
          </p>
        </div>
        <span className="text-[11px] text-foreground-muted">per week</span>
      </div>

      <ul className="mt-5 space-y-3 rounded-xl border border-border bg-background px-4 py-4">
        {TEAM.map((m) => (
          <li key={m.name} className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-[10px] font-medium text-foreground-muted">
              {m.initials}
            </span>
            <span className="w-14 shrink-0 text-[12px] text-foreground">{m.name}</span>
            <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/[0.07]">
              <span
                data-bar
                className="absolute inset-0 origin-left rounded-full bg-accent"
                style={{ transform: `scaleX(${m.to})` }}
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
