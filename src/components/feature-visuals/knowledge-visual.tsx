"use client";

import { useHoverTimeline } from "@/lib/motion/use-hover-timeline";

const SOURCES = ["Docs", "FAQs", "Policies"];

export function KnowledgeVisual() {
  const ref = useHoverTimeline<HTMLDivElement>((tl, el) => {
    const docs = el.querySelectorAll<HTMLElement>("[data-doc]");
    const node = el.querySelector<HTMLElement>("[data-node]");

    tl.to(docs, { x: 0, autoAlpha: 1, duration: 0.4, stagger: 0.08, ease: "power2.out" });
    if (node) {
      tl.to(node, { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1 }, "-=0.1");
    }
  }, []);

  return (
    <div ref={ref} className="flex h-20 items-center justify-between gap-2">
      <div className="flex flex-col gap-1.5">
        {SOURCES.map((label) => (
          <span
            key={label}
            data-doc
            className="w-fit -translate-x-2 rounded border border-border bg-surface px-2 py-1 text-[10px] font-medium text-foreground-muted opacity-0"
          >
            {label}
          </span>
        ))}
      </div>
      <div className="h-px flex-1 border-t border-dashed border-border" />
      <div
        data-node
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground font-[family-name:var(--font-mono)] text-[10px] text-background"
      >
        AI
      </div>
    </div>
  );
}
