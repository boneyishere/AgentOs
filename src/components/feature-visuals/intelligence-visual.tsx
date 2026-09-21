"use client";

import { useHoverTimeline } from "@/lib/motion/use-hover-timeline";

const TAGS = ["Intent: Sales", "Sentiment: Positive", "Lead: Qualified"];

export function IntelligenceVisual() {
  const ref = useHoverTimeline<HTMLDivElement>((tl, el) => {
    const transcript = el.querySelector<HTMLElement>("[data-transcript]");
    const tags = el.querySelectorAll<HTMLElement>("[data-tag]");

    if (transcript) {
      tl.to(transcript, { autoAlpha: 0.4, duration: 0.3 });
    }
    tl.fromTo(
      tags,
      { autoAlpha: 0, y: 6 },
      { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.1 },
      "-=0.15"
    );
  }, []);

  return (
    <div ref={ref} className="flex h-20 flex-col justify-between">
      <p data-transcript className="text-xs text-foreground-muted">
        &ldquo;...yes I&apos;d like to speak to sales about pricing.&rdquo;
      </p>
      <div className="flex flex-wrap gap-1.5">
        {TAGS.map((tag) => (
          <span
            key={tag}
            data-tag
            className="rounded-full border border-border px-2 py-0.5 text-[10px] text-foreground-muted opacity-0"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
