"use client";

import { Calendar, CheckCircle2, Database } from "lucide-react";
import { useHoverTimeline } from "@/lib/motion/use-hover-timeline";

export function ActionsVisual() {
  const ref = useHoverTimeline<HTMLDivElement>((tl, el) => {
    const icons = el.querySelectorAll<HTMLElement>("[data-icon]");
    const check = el.querySelector<HTMLElement>("[data-check]");

    tl.fromTo(
      icons,
      { autoAlpha: 0.35, scale: 0.9 },
      { autoAlpha: 1, scale: 1, duration: 0.3, stagger: 0.15 }
    );
    if (check) {
      tl.fromTo(
        check,
        { autoAlpha: 0, scale: 0.6 },
        { autoAlpha: 1, scale: 1, duration: 0.3, ease: "back.out(2)" },
        "-=0.1"
      );
    }
  }, []);

  return (
    <div ref={ref} className="flex h-20 items-center justify-between">
      <div
        data-icon
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-[10px] text-background opacity-35"
      >
        AI
      </div>
      <div className="mx-1 h-px flex-1 border-t border-dashed border-border" />
      <div
        data-icon
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground-muted opacity-35"
      >
        <Calendar className="h-4 w-4" />
      </div>
      <div className="mx-1 h-px flex-1 border-t border-dashed border-border" />
      <div
        data-icon
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground-muted opacity-35"
      >
        <Database className="h-4 w-4" />
      </div>
      <div className="mx-1 h-px flex-1 border-t border-dashed border-border" />
      <div data-check className="opacity-0">
        <CheckCircle2 className="h-5 w-5 text-accent" />
      </div>
    </div>
  );
}
