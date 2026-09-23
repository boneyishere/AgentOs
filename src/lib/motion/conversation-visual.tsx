"use client";

import { useRef } from "react";
import { gsap } from "./gsap-setup";
import { useGsapContext } from "./use-gsap-context";

export type ConversationBeat =
  | { kind: "customer"; text: string }
  | { kind: "agent"; text: string }
  | { kind: "understanding"; label: string }
  | { kind: "action"; label: string }
  | { kind: "result"; label: string };

const WAVEFORM_BARS = [4, 9, 5, 12, 7, 14, 6, 10, 4, 8];

// Mirrors the --accent token; kept as an explicit rgb triplet because the
// success-pulse box-shadow needs to animate its own alpha channel.
const ACCENT_RGB = "73, 89, 238";

/**
 * The site's recurring visual motif: a minimal transcript of a real-time
 * voice conversation moving from speech to understanding to action to
 * outcome. Reused as-is (not rebuilt per section) in the Hero, echoed in
 * Technology, and driven by different `script`s in the Use Cases selector.
 * The full (Hero) variant gets extra chrome — a slow accent glow, a
 * progress rail, and a success pulse on the outcome beat — the compact
 * echoes stay quiet so they don't compete with their surrounding section.
 */
export function ConversationVisual({
  script,
  variant = "full",
  label = "CALL IN PROGRESS",
  className = "",
  scrollGated = true,
}: {
  script: ConversationBeat[];
  variant?: "full" | "compact";
  label?: string;
  className?: string;
  /**
   * Compact variant only: gate the reveal on scrolling the element into
   * view. Pass `false` for an instance swapped in later by user interaction
   * (e.g. a selector click) rather than a fresh page scroll — re-gating on
   * scroll position for those can leave the new content stuck invisible if
   * the element isn't currently within the trigger zone (mobile's stacked
   * layout in particular often puts it lower on the page than the trigger
   * threshold, so a swap while the user is mid-read never reveals).
   */
  scrollGated?: boolean;
}) {
  const beatRefs = useRef<Array<HTMLDivElement | null>>([]);
  const waveRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const isFull = variant === "full";

  const ref = useGsapContext<HTMLDivElement>(
    (_ctx, el, reducedMotion) => {
      const beats = beatRefs.current.filter((node): node is HTMLDivElement => Boolean(node));
      const beatsDuration = 0.2 + Math.max(beats.length - 1, 0) * 0.45 + 0.5;

      if (reducedMotion) {
        gsap.set(beats, { autoAlpha: 1, y: 0 });
        if (railRef.current) gsap.set(railRef.current, { scaleY: 1 });
        return;
      }

      const tl = gsap.timeline({
        delay: isFull ? 0.4 : 0,
        scrollTrigger:
          isFull || !scrollGated ? undefined : { trigger: el, start: "top 78%", once: true },
      });

      if (waveRef.current) {
        tl.to(
          waveRef.current.children,
          {
            scaleY: () => gsap.utils.random(0.35, 1),
            repeat: -1,
            yoyo: true,
            duration: 0.5,
            stagger: { each: 0.08, repeat: -1, yoyo: true },
            ease: "sine.inOut",
          },
          0
        );
      }

      if (railRef.current) {
        tl.fromTo(
          railRef.current,
          { scaleY: 0 },
          { scaleY: 1, duration: beatsDuration - 0.2, ease: "none" },
          0.2
        );
      }

      tl.fromTo(
        beats,
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.45, ease: "power2.out" },
        0.2
      );

      if (isFull) {
        // Quiet "conversation resolved" pulse once the outcome beat lands.
        tl.fromTo(
          el,
          { boxShadow: `0 0 0 0 rgba(${ACCENT_RGB}, 0)` },
          {
            boxShadow: `0 0 0 3px rgba(${ACCENT_RGB}, 0.25)`,
            duration: 0.4,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
          }
        );

        const glowA = el.querySelector<HTMLElement>('[data-glow="a"]');
        const glowB = el.querySelector<HTMLElement>('[data-glow="b"]');
        if (glowA) {
          gsap.to(glowA, {
            x: 24,
            y: 16,
            scale: 1.15,
            duration: 7,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
        if (glowB) {
          gsap.to(glowB, {
            x: -20,
            y: -14,
            scale: 1.1,
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      }
    },
    [script, variant, scrollGated]
  );

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl border ${
        isFull
          ? "border-ink-border bg-ink p-6 text-ink-foreground sm:p-8"
          : "border-white/15 bg-accent p-5 text-accent-foreground"
      } ${className}`}
    >
      {isFull && (
        <>
          <div
            data-glow="a"
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 -top-20 h-64 w-64 rounded-full bg-accent/25 blur-3xl"
          />
          <div
            data-glow="b"
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
          />
        </>
      )}

      <div className="relative">
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] ${
              isFull ? "text-ink-foreground-muted" : "text-accent-foreground/70"
            }`}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${isFull ? "bg-accent" : "bg-accent-foreground"}`}
              />
              <span
                className={`relative inline-flex h-1.5 w-1.5 rounded-full ${isFull ? "bg-accent" : "bg-accent-foreground"}`}
              />
            </span>
            {label}
          </span>

          <div ref={waveRef} className="flex h-4 items-end gap-0.5" aria-hidden="true">
            {WAVEFORM_BARS.map((h, i) => (
              <span
                key={i}
                className={`w-0.5 origin-bottom rounded-full ${isFull ? "bg-accent/70" : "bg-accent-foreground/60"}`}
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
        </div>

        <div className={`mt-6 space-y-4 ${isFull ? "relative pl-4" : ""}`}>
          {isFull && (
            <div
              ref={railRef}
              aria-hidden="true"
              className="absolute left-0 top-1 w-px origin-top bg-accent/40"
              style={{ height: "calc(100% - 0.5rem)" }}
            />
          )}

          {script.map((beat, i) => (
            <div
              key={i}
              ref={(node) => {
                beatRefs.current[i] = node;
              }}
            >
              {beat.kind === "customer" || beat.kind === "agent" ? (
                <div>
                  <p
                    className={`text-[10px] uppercase tracking-[0.14em] ${
                      isFull ? "text-ink-foreground-muted" : "text-accent-foreground/70"
                    }`}
                  >
                    {beat.kind === "customer" ? "Customer" : "AI Agent"}
                  </p>
                  <p className={`mt-1 text-sm leading-relaxed ${isFull ? "text-ink-foreground" : "text-accent-foreground"}`}>
                    &ldquo;{beat.text}&rdquo;
                  </p>
                </div>
              ) : (
                <div
                  className="flex items-baseline gap-2.5 border-t pt-3.5"
                  style={{ borderColor: isFull ? "var(--ink-border)" : "rgba(255, 255, 255, 0.18)" }}
                >
                  <span
                    className={`shrink-0 text-[10px] font-medium uppercase tracking-[0.14em] ${isFull ? "text-accent" : "text-accent-foreground"}`}
                  >
                    {beat.kind}
                  </span>
                  <span className={`text-xs ${isFull ? "text-ink-foreground-muted" : "text-accent-foreground/70"}`}>
                    {beat.label}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
