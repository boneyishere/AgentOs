"use client";

import { useHoverTimeline } from "@/lib/motion/use-hover-timeline";

const BARS = [6, 14, 9, 20, 12, 22, 10, 16, 8, 14, 20, 11];

export function VoiceVisual() {
  const ref = useHoverTimeline<HTMLDivElement>((tl, el) => {
    const bars = el.querySelectorAll<HTMLElement>("[data-bar]");
    const line = el.querySelector<HTMLElement>("[data-line]");

    tl.to(bars, {
      scaleY: () => Math.random() * 0.6 + 0.6,
      duration: 0.35,
      stagger: 0.03,
      ease: "sine.inOut",
      repeat: 3,
      yoyo: true,
    });
    if (line) {
      tl.fromTo(line, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.3);
    }
  }, []);

  return (
    <div ref={ref} className="flex h-20 flex-col justify-between">
      <div className="flex h-10 items-end gap-1">
        {BARS.map((h, i) => (
          <span
            key={i}
            data-bar
            className="w-1 origin-bottom rounded-full bg-accent/60"
            style={{ height: `${h}px` }}
          />
        ))}
      </div>
      <p data-line className="text-xs text-foreground-muted opacity-0">
        &ldquo;...checking your account now.&rdquo;
      </p>
    </div>
  );
}
