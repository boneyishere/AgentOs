"use client";

import { useEffect, useRef, useState } from "react";
import { AudioLines, Check, Mic, Sparkles, Zap, type LucideIcon } from "lucide-react";
import { gsap, SplitText } from "./gsap-setup";
import { useGsapContext } from "./use-gsap-context";
import { useReducedMotion } from "./use-reduced-motion";

export type RunBeat =
  | { kind: "customer"; text: string }
  | { kind: "agent"; text: string }
  | { kind: "understanding"; tags: string[]; confidence: number }
  | { kind: "action"; label: string; system: string; steps: string[] }
  | { kind: "result"; label: string; detail: string };

export type AgentRunData = { label: string; script: RunBeat[] };

const INTRO = 0.5;
// Resting elevation of the white stage; the result glow tweens from it.
// Mirrors --elevation; spelled out because the result glow tweens from it.
const FRAME_SHADOW = "0 1px 2px rgba(26, 26, 26, 0.04), 0 6px 18px -10px rgba(26, 26, 26, 0.1)";
const SPARK_HUES = ["--accent", "--iris", "--rose", "--amber", "--teal"];
const WAVE_BARS = [5, 9, 6, 12, 8, 14, 7, 11, 5, 9, 13, 6, 10, 7];

/** How long each beat's choreography occupies on the run timeline (seconds). */
function beatSeconds(beat: RunBeat) {
  switch (beat.kind) {
    case "customer":
      return 1 + beat.text.split(/\s+/).length * 0.06;
    case "understanding":
      return 1.9;
    case "action":
      return 0.9 + beat.steps.length * 0.6;
    case "agent":
      return 1.2 + beat.text.length * 0.02;
    case "result":
      return 1.3;
  }
}

/** Total run length — callers use it to time auto-advance and progress UI. */
export function getRunSeconds(script: RunBeat[]) {
  return script.reduce((sum, beat) => sum + beatSeconds(beat), INTRO);
}

// Each beat kind owns one muted signal hue.
const NODE: Record<RunBeat["kind"], { icon: LucideIcon; eyebrow: string; hue: string }> = {
  customer: { icon: Mic, eyebrow: "Customer", hue: "--iris" },
  understanding: { icon: Sparkles, eyebrow: "Understanding", hue: "--rose" },
  action: { icon: Zap, eyebrow: "Action", hue: "--amber" },
  agent: { icon: AudioLines, eyebrow: "AI Agent", hue: "--accent" },
  result: { icon: Check, eyebrow: "Result", hue: "--teal" },
};

function tokenRgb(token: string) {
  const hex = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  const n = /^#[0-9a-f]{6}$/i.test(hex) ? parseInt(hex.slice(1), 16) : 0x2f69f1;
  return {
    hex: `#${n.toString(16).padStart(6, "0")}`,
    rgb: `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`,
  };
}

function clock(seconds: number) {
  const s = Math.floor(seconds);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

const q = <T extends Element = HTMLElement>(root: Element, sel: string) => root.querySelector<T>(sel);
const qa = <T extends Element = HTMLElement>(root: Element, sel: string) => [...root.querySelectorAll<T>(sel)];

/**
 * A live agent run: a transcript that assembles beat by beat along an
 * igniting spine, each beat with its own choreography (word-by-word speech,
 * intent scan + confidence, step-by-step system actions, a streamed agent
 * reply, a success burst). Swapping `run` blurs the old run out first.
 * `play` gates the first run until the host is ready (e.g. in view).
 */
export function AgentRun({
  run,
  play,
  className = "",
}: {
  run: AgentRunData;
  play: boolean;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const [shown, setShown] = useState(run);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const playRef = useRef(play);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Exit the current run before swapping in the next one.
  useEffect(() => {
    if (run === shown) return;
    const content = contentRef.current;
    if (reducedMotion || !content) {
      setShown(run);
      return;
    }
    tlRef.current?.pause();
    const tween = gsap.to(content, {
      autoAlpha: 0,
      y: -18,
      filter: "blur(8px)",
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => setShown(run),
    });
    return () => {
      tween.kill();
    };
  }, [run, shown, reducedMotion]);

  useEffect(() => {
    playRef.current = play;
    if (play) tlRef.current?.play();
  }, [play]);

  const ref = useGsapContext<HTMLDivElement>(
    (_ctx, frame, reduced) => {
      const viewport = q(frame, "[data-viewport]");
      const inner = q(frame, "[data-inner]");
      const rail = q(frame, "[data-rail]");
      const glow = q(frame, "[data-glow]");
      const wave = q(frame, "[data-wave]");
      const clockEl = q(frame, "[data-clock]");
      const pulse = q(frame, "[data-pulse]");
      const content = contentRef.current;
      if (!viewport || !inner || !rail || !glow || !wave || !clockEl || !content) return;

      const { rgb } = tokenRgb("--teal");
      const beats = qa(inner, "[data-beat]");
      const streams = qa(inner, "[data-stream]");
      const restoreStreams = streams.map((el) => {
        const full = el.dataset.text ?? "";
        el.style.minHeight = `${el.offsetHeight}px`;
        return () => {
          el.textContent = full;
          el.style.minHeight = "";
        };
      });

      // Geometry, measured once with every beat laid out at full size.
      const railTop = rail.offsetTop;
      const railH = rail.offsetHeight || 1;
      const vpH = viewport.clientHeight;
      const layout = beats.map((beat) => {
        const node = q(beat, "[data-node]")!;
        const nodeY = beat.offsetTop + node.offsetTop + node.offsetHeight / 2;
        const bottom = beat.offsetTop + beat.offsetHeight;
        const cam = -Math.max(0, bottom - vpH + 36);
        return {
          nodeY,
          rail: Math.min(1, Math.max(0, (nodeY - railTop) / railH)),
          cam,
          // Glow is positioned in frame space; centre its 224px disc on the node.
          glow: viewport.offsetTop + nodeY + cam - 112,
        };
      });

      const bars = wave.children;
      gsap.set(wave, { scaleY: 0.22 });
      gsap.set(glow, { y: (layout[0]?.glow ?? 0) });
      const barLoop = reduced
        ? null
        : gsap.to(bars, {
            scaleY: () => gsap.utils.random(0.3, 1),
            duration: 0.32,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: { each: 0.05, repeat: -1, yoyo: true },
          });

      const tl = gsap.timeline({ paused: true });
      tlRef.current = tl;
      const total = getRunSeconds(shown.script);

      tl.fromTo(
        content,
        { autoAlpha: 0, y: 18, filter: "blur(8px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power3.out" },
        0
      );
      const clockState = { v: 0 };
      tl.to(
        clockState,
        {
          v: total * 2.4,
          duration: total,
          ease: "none",
          onUpdate: () => {
            clockEl.textContent = clock(clockState.v);
          },
        },
        0
      );

      const speak = (from: number, to: number) => {
        tl.to(wave, { scaleY: 1, duration: 0.3, ease: "power2.out" }, from);
        tl.to(wave, { scaleY: 0.22, duration: 0.4, ease: "power2.inOut" }, to);
      };

      let s = INTRO;
      shown.script.forEach((beat, i) => {
        const el = beats[i];
        const geo = layout[i];
        const node = q(el, "[data-node]")!;
        const c = s + 0.45;

        tl.set(el, { autoAlpha: 1 }, s);
        tl.to(inner, { y: geo.cam, duration: 0.8, ease: "power3.inOut" }, s);
        tl.to(rail, { scaleY: geo.rail, duration: 0.5, ease: "power2.inOut" }, s);
        const hue = tokenRgb(NODE[beat.kind].hue);
        tl.to(
          glow,
          { y: geo.glow, backgroundColor: `rgba(${hue.rgb}, 0.1)`, duration: 0.9, ease: "power3.inOut" },
          s
        );
        // A signal pulse rides the rail head down from the previous node.
        if (i > 0 && pulse) {
          tl.fromTo(
            pulse,
            {
              y: layout[i - 1].nodeY,
              autoAlpha: 1,
              backgroundColor: hue.hex,
              boxShadow: `0 0 0 3px rgba(${hue.rgb}, 0.12), 0 0 8px rgba(${hue.rgb}, 0.45)`,
            },
            { y: geo.nodeY, duration: 0.5, ease: "power2.inOut" },
            s
          );
          tl.to(pulse, { autoAlpha: 0, scale: 2.2, duration: 0.3, ease: "power2.out" }, s + 0.5);
          tl.set(pulse, { scale: 1 }, s + 0.8);
        }
        tl.fromTo(node, { scale: 0.3, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.55, ease: "back.out(2.2)" }, s + 0.1);
        tl.to(q(node, "[data-node-on]"), { opacity: 1, duration: 0.3 }, s + 0.35);
        tl.to(node, { color: beat.kind === "result" ? "#ffffff" : hue.hex, duration: 0.3 }, s + 0.35);
        tl.fromTo(
          q(node, "[data-burst]"),
          { scale: 1, opacity: 0.8 },
          { scale: 2.8, opacity: 0, duration: 0.9, ease: "power2.out" },
          s + 0.35
        );
        tl.fromTo(q(el, "[data-eyebrow]"), { autoAlpha: 0, x: -8 }, { autoAlpha: 1, x: 0, duration: 0.4, ease: "power3.out" }, s + 0.3);

        if (beat.kind === "customer") {
          const split = SplitText.create(q(el, "[data-words]")!, { type: "words" });
          tl.fromTo(
            split.words,
            { autoAlpha: 0, y: 8, filter: "blur(6px)" },
            { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.45, stagger: 0.06, ease: "power3.out" },
            c
          );
          speak(c, c + split.words.length * 0.06 + 0.3);
        }

        if (beat.kind === "understanding") {
          const pct = q(el, "[data-pct]")!;
          const pctState = { v: 0 };
          tl.fromTo(q(el, "[data-track]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, c);
          tl.fromTo(
            q(el, "[data-scan]"),
            { xPercent: -100, opacity: 1 },
            { xPercent: 420, duration: 0.75, ease: "power2.inOut" },
            c
          );
          tl.set(q(el, "[data-scan]"), { opacity: 0 }, c + 0.75);
          tl.fromTo(
            qa(el, "[data-tag]"),
            { autoAlpha: 0, scale: 0.85, y: 6 },
            { autoAlpha: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.12, ease: "back.out(1.8)" },
            c + 0.45
          );
          tl.fromTo(q(el, "[data-fill]"), { scaleX: 0 }, { scaleX: beat.confidence, duration: 0.8, ease: "power3.out" }, c + 0.6);
          tl.fromTo(pct, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, c + 0.6);
          tl.to(
            pctState,
            {
              v: beat.confidence * 100,
              duration: 0.8,
              ease: "power3.out",
              onUpdate: () => {
                pct.textContent = `${Math.round(pctState.v)}%`;
              },
            },
            c + 0.6
          );
        }

        if (beat.kind === "action") {
          const steps = qa(el, "[data-step]");
          const bar = q(el, "[data-progress]");
          tl.fromTo(q(el, "[data-card]"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out" }, c);
          steps.forEach((step, j) => {
            const sj = c + 0.3 + j * 0.6;
            tl.fromTo(step, { autoAlpha: 0, x: -6 }, { autoAlpha: 1, x: 0, duration: 0.3, ease: "power2.out" }, sj);
            tl.fromTo(q(step, "[data-step-text]"), { opacity: 0.5 }, { opacity: 1, duration: 0.25 }, sj + 0.45);
            tl.to(q(step, "[data-spinner]"), { autoAlpha: 0, scale: 0.4, duration: 0.15 }, sj + 0.42);
            tl.fromTo(q(step, "[data-check]"), { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(2.6)" }, sj + 0.45);
            if (bar) tl.to(bar, { scaleX: (j + 1) / steps.length, duration: 0.35, ease: "power2.out" }, sj + 0.45);
          });
          // A sheen sweeps the card once every step has checked off.
          const sheen = q(el, "[data-sheen]");
          const done = c + 0.3 + steps.length * 0.6;
          tl.fromTo(sheen, { xPercent: -100, opacity: 1 }, { xPercent: 420, duration: 0.8, ease: "power2.inOut" }, done);
          tl.set(sheen, { opacity: 0 }, done + 0.8);
        }

        if (beat.kind === "agent") {
          const text = q(el, "[data-stream]")!;
          const full = text.dataset.text ?? "";
          const caret = q(el, "[data-caret]");
          const typed = { n: 0 };
          const start = c + 0.6;
          const dur = full.length * 0.02;
          text.textContent = "";
          tl.fromTo(
            q(el, "[data-bubble]"),
            { autoAlpha: 0, y: 10, scale: 0.97, transformOrigin: "0% 0%" },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" },
            c
          );
          tl.set(q(el, "[data-dots]"), { display: "none" }, start);
          tl.set(caret, { autoAlpha: 1 }, start);
          tl.to(
            typed,
            {
              n: full.length,
              duration: dur,
              ease: "none",
              onUpdate: () => {
                text.textContent = full.slice(0, Math.round(typed.n));
              },
            },
            start
          );
          tl.to(caret, { autoAlpha: 0, duration: 0.2 }, start + dur + 0.25);
          speak(start, start + dur);
        }

        if (beat.kind === "result") {
          tl.fromTo(q(el, "[data-badge]"), { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.55, ease: "back.out(2.2)" }, c);
          tl.fromTo(
            q(node, "[data-burst-2]"),
            { scale: 1, opacity: 0.7 },
            { scale: 4, opacity: 0, duration: 1.1, ease: "power2.out" },
            c + 0.1
          );
          tl.fromTo(q(el, "[data-detail]"), { autoAlpha: 0, x: -6 }, { autoAlpha: 1, x: 0, duration: 0.4 }, c + 0.25);
          // Sparks radiate from the result node in every signal hue.
          const sparks = qa(node, "[data-spark]");
          tl.fromTo(
            sparks,
            { x: 0, y: 0, scale: 1, autoAlpha: 1 },
            {
              x: (k) => Math.cos((k / sparks.length) * Math.PI * 2) * gsap.utils.random(20, 34),
              y: (k) => Math.sin((k / sparks.length) * Math.PI * 2) * gsap.utils.random(20, 34),
              scale: 0.2,
              autoAlpha: 0,
              duration: 0.9,
              ease: "power3.out",
            },
            c + 0.05
          );
          tl.fromTo(
            frame,
            { boxShadow: `${FRAME_SHADOW}, 0 0 0 0px rgba(${rgb}, 0)` },
            {
              boxShadow: `0 1px 2px rgba(${rgb}, 0.06), 0 8px 22px -12px rgba(${rgb}, 0.22), 0 0 0 1px rgba(${rgb}, 0.32)`,
              duration: 0.6,
              ease: "power2.out",
            },
            c
          );
        }

        s += beatSeconds(beat);
      });

      if (reduced) {
        // End state, whole transcript visible — no camera, no clock ticking.
        tl.progress(1).pause();
        gsap.set(inner, { y: 0 });
        gsap.set(viewport, { height: "auto" });
      } else if (playRef.current) {
        tl.play();
      }

      return () => {
        barLoop?.kill();
        tlRef.current = null;
        restoreStreams.forEach((restore) => restore());
      };
    },
    [shown]
  );

  return (
    <div
      ref={ref}
      className={`relative isolate overflow-hidden rounded-2xl border border-border bg-background text-foreground ${className}`}
      style={{ boxShadow: FRAME_SHADOW }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(rgba(26,26,26,0.07)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_30%_45%,black_15%,transparent_72%)]"
      />
      <div
        data-glow
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 -z-10 h-56 w-56 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="flex items-center justify-between border-b border-border bg-background px-5 py-4 sm:px-6">
        <span className="text-sm font-medium text-foreground">{shown.label}</span>
        <div className="flex items-center gap-3">
          <span data-clock className="text-[11px] tabular-nums text-foreground-muted">
            00:00
          </span>
          <div data-wave aria-hidden="true" className="flex h-4 items-center gap-[3px]">
            {WAVE_BARS.map((h, i) => (
              <span key={i} className="w-0.5 rounded-full bg-accent" style={{ height: `${h}px` }} />
            ))}
          </div>
        </div>
      </div>

      <div
        data-viewport
        className="relative h-[420px] overflow-hidden px-5 [mask-image:linear-gradient(to_bottom,transparent,black_28px,black_calc(100%-24px),transparent)] sm:h-[460px] sm:px-6"
      >
        <div ref={contentRef}>
          <div data-inner className="relative pb-10 pt-7">
            <div aria-hidden="true" className="absolute bottom-10 left-[13.5px] top-7 w-px bg-border" />
            <div
              data-rail
              aria-hidden="true"
              className="absolute bottom-10 left-[13.5px] top-7 w-px origin-top scale-y-0 bg-foreground/25"
            />
            <span
              data-pulse
              aria-hidden="true"
              className="absolute left-[14px] top-0 z-20 -ml-[4px] -mt-[4px] h-2 w-2 rounded-full opacity-0"
            />
            <ol className="space-y-6">
              {shown.script.map((beat, i) => (
                <Beat key={`${shown.label}-${i}`} beat={beat} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="text-xs text-foreground-muted">{children}</span>;
}

function Beat({ beat }: { beat: RunBeat }) {
  const { icon: Icon, eyebrow, hue } = NODE[beat.kind];
  const isResult = beat.kind === "result";

  return (
    <li
      data-beat
      className="invisible relative grid grid-cols-[28px_1fr] gap-4"
      style={{ "--beat": `var(${hue})` } as React.CSSProperties}
    >
      <span
        data-node
        className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background text-foreground-muted"
      >
        <span
          data-node-on
          className={`absolute inset-0 rounded-full border opacity-0 ${
            isResult
              ? "border-[var(--beat)] bg-[var(--beat)]"
              : "border-[color-mix(in_srgb,var(--beat)_45%,transparent)] bg-[color-mix(in_srgb,var(--beat)_10%,white)]"
          }`}
        />
        <span data-burst className="absolute inset-0 rounded-full border border-[var(--beat)] opacity-0" />
        {isResult && (
          <>
            <span data-burst-2 className="absolute inset-0 rounded-full border border-[var(--beat)] opacity-0" />
            {Array.from({ length: 10 }, (_, k) => (
              <span
                key={k}
                data-spark
                className="absolute left-1/2 top-1/2 -ml-[2px] -mt-[2px] h-1 w-1 rounded-full opacity-0"
                style={{ backgroundColor: `var(${SPARK_HUES[k % SPARK_HUES.length]})` }}
              />
            ))}
          </>
        )}
        <Icon className="relative h-3.5 w-3.5" />
      </span>

      <div className="min-w-0 pt-1">
        {beat.kind === "customer" && (
          <>
            <p data-eyebrow>
              <Eyebrow>{eyebrow}</Eyebrow>
            </p>
            <p data-words className="mt-1.5 text-[15px] leading-relaxed text-foreground">
              &ldquo;{beat.text}&rdquo;
            </p>
          </>
        )}

        {beat.kind === "understanding" && (
          <>
            <div data-eyebrow className="flex max-w-[260px] items-center justify-between">
              <Eyebrow>{eyebrow}</Eyebrow>
              <span data-pct className="text-[11px] font-medium tabular-nums text-foreground">
                {Math.round(beat.confidence * 100)}%
              </span>
            </div>
            <div data-track className="relative mt-2.5 h-1 max-w-[260px] overflow-hidden rounded-full bg-foreground/[0.07]">
              <span data-fill className="absolute inset-0 origin-left rounded-full bg-rose" style={{ transform: `scaleX(${beat.confidence})` }} />
              <span data-scan className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white to-transparent opacity-0" />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {beat.tags.map((tag, i) => (
                <span
                  key={tag}
                  data-tag
                  className={`rounded-full border px-2.5 py-1 text-[11px] ${
                    i === 0
                      ? "border-rose/35 bg-rose/[0.07] text-foreground"
                      : "border-border bg-surface text-foreground-muted"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}

        {beat.kind === "action" && (
          <>
            <p data-eyebrow>
              <Eyebrow>
                {beat.system}
              </Eyebrow>
            </p>
            <div data-card className="relative mt-2.5 overflow-hidden rounded-xl border border-border bg-surface p-3.5">
              <p className="text-sm font-medium text-foreground">{beat.label}</p>
              <ul className="mt-3 space-y-2">
                {beat.steps.map((step) => (
                  <li key={step} data-step className="flex items-center gap-2.5 text-[13px]">
                    <span className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                      <span data-spinner className="absolute inset-0 animate-spin rounded-full border border-foreground/15 border-t-amber" />
                      <span data-check className="absolute inset-0 flex items-center justify-center rounded-full bg-amber">
                        <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                      </span>
                    </span>
                    <span data-step-text className="text-foreground">{step}</span>
                  </li>
                ))}
              </ul>
              <span data-progress className="absolute inset-x-0 bottom-0 h-px origin-left bg-amber" />
              <span
                data-sheen
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--amber)_16%,transparent)] to-transparent opacity-0"
              />
            </div>
          </>
        )}

        {beat.kind === "agent" && (
          <>
            <p data-eyebrow>
              <Eyebrow>{eyebrow}</Eyebrow>
            </p>
            <div
              data-bubble
              className="mt-2 max-w-[440px] rounded-2xl rounded-tl-md border border-accent/20 bg-accent-soft px-4 py-3 text-[15px] leading-relaxed text-foreground"
            >
              <span data-dots aria-hidden="true" className="inline-flex items-center gap-1 py-1.5">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent/50"
                    style={{ animationDelay: `${d * 0.12}s` }}
                  />
                ))}
              </span>
              <span className="sr-only">{beat.text}</span>
              <span aria-hidden="true">
                <span data-stream data-text={beat.text}>
                  {beat.text}
                </span>
                <span data-caret className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[3px] animate-pulse bg-accent opacity-0" />
              </span>
            </div>
          </>
        )}

        {isResult && (
          <>
            <p data-eyebrow>
              <Eyebrow>{eyebrow}</Eyebrow>
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span
                data-badge
                className="inline-flex items-center gap-1.5 rounded-full bg-teal px-3 py-1.5 text-xs font-medium text-white"
              >
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                {beat.label}
              </span>
              <span data-detail className="text-xs text-foreground-muted">
                {beat.detail}
              </span>
            </div>
          </>
        )}
      </div>
    </li>
  );
}
