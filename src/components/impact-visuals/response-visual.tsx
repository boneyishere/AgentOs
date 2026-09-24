"use client";

import { AudioLines } from "lucide-react";
import { usePlayTimeline } from "@/lib/motion/use-play-timeline";

const QUEUE = ["JL", "AM", "RK", "SO", "BT", "NW"];

function mmss(s: number) {
  const t = Math.max(0, Math.round(s));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
}

/** A waiting queue drains straight into the agent while the wait clock collapses. */
export function ResponseVisual() {
  const ref = usePlayTimeline<HTMLDivElement>((tl, el, reduced) => {
    const agent = el.querySelector<HTMLElement>("[data-agent]");
    // Only the avatars actually laid out at this breakpoint (small screens show four).
    const people = [...el.querySelectorAll<HTMLElement>("[data-person]")].filter((p) => p.offsetParent);
    const clock = el.querySelector<HTMLElement>("[data-clock]");
    const left = el.querySelector<HTMLElement>("[data-left]");
    if (!agent) return;
    const target = agent.getBoundingClientRect();
    const state = { v: 252 };
    const queue = { n: people.length };
    if (clock) clock.textContent = mmss(reduced ? 1 : 252);
    if (left) left.textContent = reduced ? "0" : String(people.length);
    tl.fromTo(
      queue,
      { n: people.length },
      {
        n: 0,
        duration: people.length * 0.28,
        ease: `steps(${people.length})`,
        onUpdate: () => {
          if (left) left.textContent = String(Math.round(queue.n));
        },
      },
      0.7
    );

    tl.fromTo(
      state,
      { v: 252 },
      {
        v: 1,
        duration: 0.4 + people.length * 0.28,
        ease: "power3.inOut",
        onUpdate: () => {
          if (clock) clock.textContent = mmss(state.v);
        },
      },
      0.2
    );
    [...people].reverse().forEach((p, i) => {
      const r = p.getBoundingClientRect();
      const dx = target.left + target.width / 2 - (r.left + r.width / 2);
      const at = 0.25 + i * 0.28;
      tl.fromTo(p, { x: 0, scale: 1, autoAlpha: 1 }, { x: dx, scale: 0.3, autoAlpha: 0, duration: 0.45, ease: "power2.in" }, at);
      tl.fromTo(agent, { scale: 1 }, { scale: 1.14, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out" }, at + 0.4);
    });
  });

  return (
    <div ref={ref} className="w-full max-w-[400px]">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-foreground-muted">Average wait</p>
          <p data-clock className="mt-1 text-4xl font-medium tracking-tight tabular-nums text-foreground">
            0:01
          </p>
        </div>
        <span className="text-[11px] text-foreground-muted">
          In queue <span data-left className="tabular-nums text-foreground">0</span>
        </span>
      </div>

      <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-6">
        <div className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2">
          {QUEUE.map((initials, i) => (
            <span
              key={initials}
              data-person
              className={`invisible h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-[10px] font-medium text-foreground-muted sm:h-9 sm:w-9 sm:text-[11px] ${
                i >= 4 ? "hidden sm:flex" : "flex"
              }`}
            >
              {initials}
            </span>
          ))}
        </div>
        <span className="h-px w-6 shrink-0 bg-[linear-gradient(90deg,var(--border),var(--rose))]" />
        <span
          data-agent
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-rose/35 bg-[color-mix(in_srgb,var(--rose)_10%,white)] text-rose"
        >
          <AudioLines className="h-4.5 w-4.5" />
        </span>
      </div>
      <p className="mt-3 text-[11px] text-foreground-muted">Every caller picked up instantly, no hold music.</p>
    </div>
  );
}
