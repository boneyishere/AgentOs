"use client";

import { useHoverTimeline } from "@/lib/motion/use-hover-timeline";

export function MemoryVisual() {
  const ref = useHoverTimeline<HTMLDivElement>((tl, el) => {
    const fragments = el.querySelectorAll<HTMLElement>("[data-fragment]");
    tl.to(fragments, { x: 0, autoAlpha: 1, duration: 0.4, stagger: 0.15, ease: "power2.out" });
  }, []);

  return (
    <div ref={ref} className="flex h-20 flex-col justify-center gap-1.5">
      <p className="text-[10px] uppercase tracking-[0.14em] text-foreground-muted">
        Past call · Tuesday
      </p>
      <span
        data-fragment
        className="w-fit -translate-x-3 rounded border border-dashed border-border px-2 py-1 text-[11px] text-foreground-muted opacity-0"
      >
        Prefers morning appointments
      </span>
      <span
        data-fragment
        className="w-fit -translate-x-3 rounded border border-border bg-surface px-2 py-1 text-[11px] text-foreground opacity-0"
      >
        Applied to today&apos;s booking
      </span>
    </div>
  );
}
