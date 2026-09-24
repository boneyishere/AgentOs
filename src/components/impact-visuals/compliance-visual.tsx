"use client";

import { Check, ShieldCheck } from "lucide-react";
import { usePlayTimeline } from "@/lib/motion/use-play-timeline";

const RULES = ["Verified identity", "Followed script", "Escalation rule", "Logged to CRM"];
const CONVERSATIONS = ["Call 1042", "Chat 2211", "Call 1043"];

/** Every conversation × every rule ticks green in one wave — same rules, every time. */
export function ComplianceVisual() {
  const ref = usePlayTimeline<HTMLDivElement>((tl, el, reduced) => {
    const cells = [...el.querySelectorAll<HTMLElement>("[data-cell]")];
    const fill = el.querySelector("[data-fill]");
    const pct = el.querySelector<HTMLElement>("[data-pct]");
    const state = { v: 0 };
    if (pct) pct.textContent = reduced ? "100%" : "0%";
    cells.forEach((cell) => {
      const at = 0.2 + (Number(cell.dataset.r) + Number(cell.dataset.c)) * 0.13;
      tl.fromTo(cell.querySelector("[data-tick]"), { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "back.out(2.6)" }, at);
      tl.fromTo(cell.querySelector("[data-ring]"), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.15 }, at);
    });
    const total = 0.2 + (RULES.length + CONVERSATIONS.length - 2) * 0.13 + 0.3;
    tl.fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: total, ease: "power1.inOut" }, 0.2);
    tl.fromTo(
      state,
      { v: 0 },
      {
        v: 100,
        duration: total,
        ease: "power1.inOut",
        onUpdate: () => {
          if (pct) pct.textContent = `${Math.round(state.v)}%`;
        },
      },
      0.2
    );
  });

  return (
    <div ref={ref} className="w-full max-w-[400px]">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-foreground-muted">Policy adherence</p>
          <p data-pct className="mt-1 text-4xl font-medium tracking-tight tabular-nums text-foreground">
            100%
          </p>
        </div>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-teal/30 bg-teal/[0.08]">
          <ShieldCheck className="h-4 w-4 text-teal" />
        </span>
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-foreground/[0.07]">
        <div data-fill className="h-full origin-left rounded-full bg-teal" />
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-border bg-background">
        <div className="grid grid-cols-[1fr_repeat(3,64px)] border-b border-border px-3.5 py-2 text-[11px] text-foreground-muted">
          <span>Rule</span>
          {CONVERSATIONS.map((c) => (
            <span key={c} className="text-center">
              #{c.split(" ")[1]}
            </span>
          ))}
        </div>
        {RULES.map((rule, r) => (
          <div key={rule} className="grid grid-cols-[1fr_repeat(3,64px)] items-center border-b border-border px-3.5 py-2 text-[12px] last:border-b-0">
            <span className="text-foreground">{rule}</span>
            {CONVERSATIONS.map((c, ci) => (
              <span key={c} data-cell data-r={r} data-c={ci} className="grid place-items-center">
                <span data-ring className="invisible h-3.5 w-3.5 rounded-full border border-foreground/20 [grid-area:1/1]" />
                <span data-tick className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-teal [grid-area:1/1]">
                  <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
