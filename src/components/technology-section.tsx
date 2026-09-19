"use client";

import {
  BookOpen,
  Bot,
  Brain,
  MessageSquare,
  Phone,
  Settings2,
  Wrench,
  Zap,
} from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { useScrollTimeline } from "@/lib/motion/scroll-timeline";
import { gsap } from "@/lib/motion/gsap-setup";
import { useGsapContext } from "@/lib/motion/use-gsap-context";
import { TextReveal } from "@/lib/motion/text-reveal";

const INPUTS = [
  {
    label: "Knowledge",
    caption: "Docs, FAQs, and business data, retrieved in real time",
    icon: BookOpen,
  },
  {
    label: "Instructions",
    caption: "Rules, tone, and escalation logic you define",
    icon: Settings2,
  },
  {
    label: "Memory",
    caption: "Context carried across every interaction",
    icon: MessageSquare,
  },
  {
    label: "Models",
    caption: "Best-fit reasoning model per conversation",
    icon: Brain,
  },
  {
    label: "Tools",
    caption: "Calendars, CRMs, and APIs the agent can call",
    icon: Wrench,
  },
];

const GRID_COLUMNS =
  "minmax(220px,1.3fr) minmax(70px,0.55fr) minmax(160px,1fr) minmax(70px,0.55fr) minmax(180px,1.05fr) minmax(70px,0.55fr) minmax(220px,1.3fr)";

// Endpoint (100,130) is the vertical center of the 0-260 viewBox, matching
// where the AI Agent node sits (self-centered within the same grid row).
const mergePath = (y: number) => `M0,${y} C 55,${y} 45,130 100,130`;

function SignalDot({ className = "" }: { className?: string }) {
  return (
    <span className={`relative flex h-2 w-2 ${className}`} aria-hidden="true">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
    </span>
  );
}

export function TechnologySection() {
  const diagramRef = useScrollTimeline<HTMLDivElement>(
    { start: "top 70%", end: "+=650", scrub: 1 },
    (tl, el, reducedMotion) => {
      const connectors = el.querySelectorAll<SVGPathElement>("[data-connector]");
      const nodes = el.querySelectorAll<HTMLElement>("[data-node]");

      if (reducedMotion) {
        gsap.set(connectors, { drawSVG: "100%" });
        gsap.set(nodes, { borderColor: "var(--accent)" });
        return;
      }

      connectors.forEach((path, i) => {
        tl.fromTo(
          path,
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 1, ease: "none" },
          i * 1.2
        );
      });

      nodes.forEach((node, i) => {
        tl.fromTo(
          node,
          { borderColor: "var(--ink-border)" },
          { borderColor: "var(--accent)", duration: 0.4, ease: "power1.out" },
          i * 1.2 + 0.9
        );
      });
    },
    []
  );

  const glowRef = useGsapContext<HTMLDivElement>((_ctx, el, reducedMotion) => {
    if (reducedMotion) return;

    const a = el.querySelector<HTMLElement>('[data-glow="a"]');
    const b = el.querySelector<HTMLElement>('[data-glow="b"]');
    const c = el.querySelector<HTMLElement>('[data-glow="c"]');

    if (a) {
      gsap.to(a, {
        x: 60,
        y: 40,
        scale: 1.2,
        borderRadius: "42% 58% 63% 37% / 45% 41% 59% 55%",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
    if (b) {
      gsap.to(b, {
        x: -45,
        y: -30,
        scale: 1.15,
        borderRadius: "63% 37% 41% 59% / 55% 62% 38% 45%",
        duration: 13,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
    if (c) {
      gsap.to(c, {
        x: 30,
        y: -45,
        scale: 1.25,
        borderRadius: "38% 62% 55% 45% / 62% 44% 56% 38%",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  return (
    <section
      id="technology"
      className="relative overflow-hidden border-b border-border bg-ink text-ink-foreground"
    >
      {/* Ambient atmosphere: faint blueprint grid + slow accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 90%)",
        }}
      />
      <div ref={glowRef} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          data-glow="a"
          className="absolute -right-32 top-1/4 h-[440px] w-[440px] bg-accent/[0.14] blur-3xl"
          style={{ borderRadius: "50%" }}
        />
        <div
          data-glow="b"
          className="absolute -left-24 bottom-0 h-[380px] w-[380px] bg-accent/[0.09] blur-3xl"
          style={{ borderRadius: "50%" }}
        />
        <div
          data-glow="c"
          className="absolute left-1/3 top-0 h-[320px] w-[320px] bg-accent/[0.08] blur-3xl"
          style={{ borderRadius: "50%" }}
        />
      </div>

      <Container className="relative py-20 sm:py-28">
        <div className="max-w-xl">
          <TextReveal className="text-3xl font-medium tracking-tight sm:text-4xl">
            Real infrastructure underneath every conversation
          </TextReveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-lg text-ink-foreground-muted">
              Knowledge, instructions, memory, models, and tools feed a single
              agent — which speaks through voice or chat, and produces a
              business outcome.
            </p>
          </Reveal>
        </div>

        {/* Desktop: scroll-scrubbed flow diagram */}
        <div
          ref={diagramRef}
          className="mt-16 hidden lg:grid"
          style={{ gridTemplateColumns: GRID_COLUMNS }}
        >
          <div className="flex flex-col gap-3">
            {INPUTS.map(({ label, caption, icon: Icon }) => (
              <div
                key={label}
                className="flex items-start gap-2.5 rounded-lg border border-ink-border bg-white/[0.02] px-3 py-2.5"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/5 text-accent">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="mt-0.5 text-[11px] text-ink-foreground-muted">
                    {caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <svg viewBox="0 0 100 260" preserveAspectRatio="none" className="h-full w-full">
            {INPUTS.map((_, i) => (
              <path
                key={i}
                data-connector
                d={mergePath(20 + i * 55)}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.5"
              />
            ))}
          </svg>

          <div
            data-node
            className="relative flex h-28 w-full flex-col items-center justify-center gap-2 self-center rounded-xl border border-white/15 bg-white/10 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_24px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md"
          >
            <SignalDot className="absolute -right-1 -top-1" />
            <Bot className="h-4 w-4 text-accent" />
            <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em]">
              AI Agent
            </span>
          </div>

          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-10 w-full self-center">
            <path data-connector d="M0,20 L100,20" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
          </svg>

          <div
            data-node
            className="relative flex h-28 w-full flex-col items-center justify-center gap-2 self-center rounded-xl border border-white/15 bg-white/10 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_24px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md"
          >
            <SignalDot className="absolute -right-1 -top-1" />
            <Phone className="h-4 w-4 text-accent" />
            <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em]">
              Voice / Chat
            </span>
          </div>

          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-10 w-full self-center">
            <path data-connector d="M0,20 L100,20" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
          </svg>

          <div
            data-node
            className="flex h-28 w-full flex-col items-center justify-center gap-2 self-center rounded-xl border border-accent/40 bg-accent/15 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_24px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md"
          >
            <Zap className="h-4 w-4 text-accent" />
            <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em]">
              Business Action
            </span>
          </div>
        </div>

        {/* Mobile: simple stacked list, no scrubbed SVG */}
        <ol className="relative mt-14 space-y-6 border-l border-ink-border pl-6 lg:hidden">
          {[
            ...INPUTS.map((i) => ({ label: i.label, icon: i.icon })),
            { label: "AI Agent", icon: Bot },
            { label: "Voice / Chat", icon: Phone },
            { label: "Business Action", icon: Zap },
          ].map(({ label, icon: Icon }, i) => (
            <Reveal key={label} delay={i * 0.04} y={12}>
              <li className="relative">
                <span className="absolute -left-[29px] top-1 h-2 w-2 rounded-full bg-accent" />
                <div className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 text-accent" />
                  <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-ink-foreground-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium">{label}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
