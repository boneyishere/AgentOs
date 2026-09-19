"use client";

import { useHoverTimeline } from "@/lib/motion/use-hover-timeline";

export function ChatVisual() {
  const ref = useHoverTimeline<HTMLDivElement>((tl, el) => {
    const bubbles = el.querySelectorAll<HTMLElement>("[data-bubble]");
    tl.fromTo(
      bubbles,
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.2, ease: "power2.out" }
    );
  }, []);

  return (
    <div ref={ref} className="flex h-20 flex-col justify-end gap-2">
      <div
        data-bubble
        className="max-w-[80%] rounded-lg bg-surface px-3 py-1.5 text-xs text-foreground opacity-0"
      >
        Do you offer team plans?
      </div>
      <div
        data-bubble
        className="ml-auto max-w-[85%] rounded-lg bg-foreground px-3 py-1.5 text-xs text-background opacity-0"
      >
        Yes — from 5 seats, with shared knowledge.
      </div>
    </div>
  );
}
