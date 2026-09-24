"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import {
  BuildingIcon,
  GlobeIcon,
  MessageIcon,
  PhoneIcon,
  StackIcon,
  type AgentIcon,
} from "./icons/agent-icons";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type ChannelId = "phone" | "website" | "messaging";
type SystemId = "internal" | "systems";

const CHANNELS: {
  id: ChannelId;
  title: string;
  icon: AgentIcon;
  hue: string;
  summary: string;
}[] = [
  {
    id: "phone",
    title: "Phone",
    icon: PhoneIcon,
    hue: "var(--accent)",
    summary: "Answers and makes calls for reception, sales, support, bookings, and follow-ups.",
  },
  {
    id: "website",
    title: "Website",
    icon: GlobeIcon,
    hue: "var(--iris)",
    summary: "Lives on your site to answer questions, qualify leads, and recommend the right service.",
  },
  {
    id: "messaging",
    title: "Messaging",
    icon: MessageIcon,
    hue: "var(--teal)",
    summary: "Meets customers in the apps they already use for enquiries, updates, and support.",
  },
];

const SYSTEMS: {
  id: SystemId;
  title: string;
  icon: AgentIcon;
  summary: string;
  items: string[];
}[] = [
  {
    id: "internal",
    title: "Internal operations",
    icon: BuildingIcon,
    summary: "Supports your team, not just your customers.",
    items: ["Information retrieval", "Internal requests", "Workflow triggers", "Notifications"],
  },
  {
    id: "systems",
    title: "Business systems",
    icon: StackIcon,
    summary: "Works inside the tools you already run on.",
    items: ["CRM", "Calendar", "Booking systems", "Helpdesk", "Custom APIs"],
  },
];

const SCENARIOS: {
  from: ChannelId;
  via: string;
  said: string;
  to: SystemId;
  item: string;
  did: string;
}[] = [
  {
    from: "phone",
    via: "Phone call",
    said: "Can I move my appointment to Friday at 3?",
    to: "systems",
    item: "Calendar",
    did: "Rescheduled in your calendar",
  },
  {
    from: "website",
    via: "Website chat",
    said: "We're a team of 40. What would the Growth plan cost us?",
    to: "systems",
    item: "CRM",
    did: "Qualified lead added to your CRM",
  },
  {
    from: "messaging",
    via: "WhatsApp message",
    said: "My parcel says delivered, but it isn't here.",
    to: "internal",
    item: "Notifications",
    did: "Support team notified with the order details",
  },
  {
    from: "phone",
    via: "Phone call",
    said: "I'd like to cancel my membership.",
    to: "internal",
    item: "Workflow triggers",
    did: "Retention workflow started",
  },
  {
    from: "messaging",
    via: "Instagram DM",
    said: "Any tables for four tonight?",
    to: "systems",
    item: "Booking systems",
    did: "Table for four booked at 7:30 PM",
  },
  {
    from: "website",
    via: "Website chat",
    said: "How do I reset the password on my account?",
    to: "systems",
    item: "Helpdesk",
    did: "Answered from your help center",
  },
];

const CYCLE_MS = 3600;
const hueOf = (id: ChannelId) => CHANNELS.find((c) => c.id === id)!.hue;

type Wire = { key: string; d: string };

/** Horizontal S-curve between two anchor points. */
function curve(x1: number, y1: number, x2: number, y2: number) {
  const dx = Math.max(40, (x2 - x1) * 0.55);
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
}

function ChannelCard({
  channel,
  active,
  onEnter,
  onLeave,
  cardRef,
}: {
  channel: (typeof CHANNELS)[number];
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
  cardRef?: (el: HTMLDivElement | null) => void;
}) {
  const Icon = channel.icon;
  return (
    <div
      ref={cardRef}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      data-icon-active={active}
      className={`spotlight group rounded-2xl border bg-background p-5 transition-[border-color,box-shadow] duration-500 ${
        active ? "shadow-soft" : "border-border"
      }`}
      style={
        {
          "--hue": channel.hue,
          borderColor: active ? `color-mix(in srgb, ${channel.hue} 45%, transparent)` : undefined,
        } as React.CSSProperties
      }
    >
      <div className="flex items-center gap-3">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-500"
          style={{
            color: active ? channel.hue : "var(--foreground-muted)",
            backgroundColor: active ? `color-mix(in srgb, ${channel.hue} 10%, white)` : "var(--surface)",
          }}
        >
          <Icon />
        </span>
        <h3 className="text-base font-medium">{channel.title}</h3>
      </div>
      <p className="mt-3 text-sm text-foreground-muted">{channel.summary}</p>
    </div>
  );
}

function SystemCard({
  system,
  activeItem,
  hue,
  cardRef,
}: {
  system: (typeof SYSTEMS)[number];
  activeItem: string | null;
  hue: string;
  cardRef?: (el: HTMLDivElement | null) => void;
}) {
  const Icon = system.icon;
  const lit = activeItem !== null;
  return (
    <div
      ref={cardRef}
      data-icon-active={lit}
      className={`rounded-2xl border bg-background p-5 transition-[border-color,box-shadow] duration-500 ${
        lit ? "shadow-soft" : "border-border"
      }`}
      style={{ borderColor: lit ? `color-mix(in srgb, ${hue} 45%, transparent)` : undefined }}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-foreground-muted">
          <Icon />
        </span>
        <h3 className="text-base font-medium">{system.title}</h3>
      </div>
      <p className="mt-3 text-sm text-foreground-muted">{system.summary}</p>
      <ul className="mt-4 space-y-1.5">
        {system.items.map((item) => {
          const on = item === activeItem;
          return (
            <li
              key={item}
              className={`flex items-center gap-2.5 text-sm transition-colors duration-500 ${
                on ? "text-foreground" : "text-foreground-muted"
              }`}
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full transition-[background-color,transform] duration-500"
                style={{
                  backgroundColor: on ? hue : "var(--border-strong)",
                  transform: on ? "scale(1.4)" : "scale(1)",
                }}
              />
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** The agent core plus a readout of the scenario it's currently handling. */
function AgentCore({
  scenario,
  coreRef,
}: {
  scenario: (typeof SCENARIOS)[number];
  coreRef?: React.Ref<HTMLDivElement>;
}) {
  const hue = hueOf(scenario.from);
  const key = `${scenario.from}-${scenario.item}`;
  return (
    <div className="flex flex-col items-center">
      <div ref={coreRef} className="relative flex h-28 w-28 items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-border bg-background" />
        <span className="absolute inset-3 rounded-full border border-border" />
        <span
          key={key}
          aria-hidden="true"
          className="absolute inset-0 animate-[core-pulse_1.4s_ease-out] rounded-full border-2"
          style={{ borderColor: hue }}
        />
        <span
          className="absolute inset-3 rounded-full transition-colors duration-700"
          style={{ backgroundColor: `color-mix(in srgb, ${hue} 8%, transparent)` }}
        />
        <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-foreground text-lg font-bold text-background">
          C
        </span>
      </div>
      <p className="mt-3 text-sm font-medium">Codely agent</p>

      <div className="mt-6 w-full max-w-[320px] rounded-2xl border border-border bg-background p-4 shadow-soft">
        <div key={key} className="animate-[rise-in_0.5s_ease-out]">
          <p className="text-xs text-foreground-muted">{scenario.via}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground">&ldquo;{scenario.said}&rdquo;</p>
          <div className="mt-3 flex items-start gap-2 border-t border-border pt-3">
            <span
              className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: hue }}
            >
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
            <p className="text-sm text-foreground">{scenario.did}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * "One agent, every channel": a live switchboard. Customer channels on the
 * left route through the agent core to your team and systems on the right.
 * It cycles through real scenarios once in view — the active channel lights
 * in its hue, its wire becomes a flowing signal with a travelling dot, the
 * core pulses, and the exact system it touched highlights. Hovering a channel
 * routes one of its scenarios immediately and pauses the cycle. Wires are
 * measured from the live layout, so they only render on lg+.
 */
export function DeploymentSection() {
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [wires, setWires] = useState<Wire[]>([]);
  const [box, setBox] = useState({ w: 0, h: 0 });

  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const coreRef = useRef<HTMLDivElement | null>(null);
  const channelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const systemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scenario = SCENARIOS[active];
  const hue = hueOf(scenario.from);

  const measure = useCallback(() => {
    const stage = stageRef.current;
    const core = coreRef.current;
    if (!stage || !core || window.innerWidth < 1024) {
      setWires([]);
      return;
    }
    const s = stage.getBoundingClientRect();
    const c = core.getBoundingClientRect();
    const cy = c.top + c.height / 2 - s.top;
    const next: Wire[] = [];
    for (const ch of CHANNELS) {
      const el = channelRefs.current[ch.id];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      next.push({ key: ch.id, d: curve(r.right - s.left, r.top + r.height / 2 - s.top, c.left - s.left + 4, cy) });
    }
    for (const sys of SYSTEMS) {
      const el = systemRefs.current[sys.id];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      next.push({ key: sys.id, d: curve(c.right - s.left - 4, cy, r.left - s.left, r.top + r.height / 2 - s.top) });
    }
    setBox({ w: s.width, h: s.height });
    setWires(next);
  }, []);

  useLayoutEffect(() => {
    measure();
    const stage = stageRef.current;
    if (!stage) return;
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started || paused) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % SCENARIOS.length), CYCLE_MS);
    return () => clearTimeout(t);
  }, [active, started, paused]);

  const focusChannel = (id: ChannelId) => {
    setPaused(true);
    if (SCENARIOS[active].from !== id) setActive(SCENARIOS.findIndex((s) => s.from === id));
  };

  const inWire = wires.find((w) => w.key === scenario.from);
  const outWire = wires.find((w) => w.key === scenario.to);

  return (
    <section ref={sectionRef} className="border-b border-border">
      <Container className="py-20 sm:py-28">
        <SectionHeading
          title="Everywhere your agent can work."
          subtitle="One agent answers the phone, your website, and your messaging apps, then gets the work done inside the systems your team already runs on."
        />

        <Reveal delay={0.15}>
          <div
            ref={stageRef}
            className="relative mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.95fr)_minmax(0,1fr)] lg:items-center lg:gap-20"
          >
            {/* Wires (lg+ only; measured from the live layout). */}
            {wires.length > 0 && (
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 hidden lg:block"
                width={box.w}
                height={box.h}
                viewBox={`0 0 ${box.w} ${box.h}`}
                fill="none"
              >
                {wires.map((w) => (
                  <path
                    key={w.key}
                    d={w.d}
                    pathLength={1}
                    stroke="var(--border-strong)"
                    strokeWidth={1}
                    strokeDasharray="1"
                    strokeDashoffset={started ? 0 : 1}
                    style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.65, 0, 0.35, 1)" }}
                  />
                ))}
                {started &&
                  [inWire, outWire].map(
                    (w) =>
                      w && (
                        <path
                          key={`${w.key}-${active}`}
                          d={w.d}
                          pathLength={1}
                          stroke={hue}
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeDasharray="0.012 0.02"
                          className="animate-[wire-flow_1.6s_linear_infinite]"
                        />
                      )
                  )}
              </svg>
            )}
            {started &&
              [inWire, outWire].map(
                (w, i) =>
                  w && (
                    <span
                      key={`dot-${w.key}-${active}`}
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 top-0 hidden h-2 w-2 rounded-full lg:block"
                      style={{
                        offsetPath: `path("${w.d}")`,
                        offsetRotate: "0deg",
                        offsetAnchor: "50% 50%",
                        backgroundColor: hue,
                        boxShadow: `0 0 0 3px color-mix(in srgb, ${hue} 18%, transparent)`,
                        animation: `wire-travel 1.6s ${i * 0.8}s cubic-bezier(0.45, 0, 0.55, 1) infinite both`,
                      }}
                    />
                  )
              )}

            <div className="relative flex flex-col gap-4">
              {CHANNELS.map((ch) => (
                <ChannelCard
                  key={ch.id}
                  channel={ch}
                  active={started && scenario.from === ch.id}
                  onEnter={() => focusChannel(ch.id)}
                  onLeave={() => setPaused(false)}
                  cardRef={(el) => {
                    channelRefs.current[ch.id] = el;
                  }}
                />
              ))}
            </div>

            <div className="relative flex items-center justify-center">
              <ArrowRight
                aria-hidden="true"
                className="absolute -top-7 h-4 w-4 rotate-90 text-border-strong lg:hidden"
              />
              <AgentCore scenario={scenario} coreRef={coreRef} />
            </div>

            <div className="relative flex flex-col gap-4">
              {SYSTEMS.map((sys) => (
                <SystemCard
                  key={sys.id}
                  system={sys}
                  hue={hue}
                  activeItem={started && scenario.to === sys.id ? scenario.item : null}
                  cardRef={(el) => {
                    systemRefs.current[sys.id] = el;
                  }}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
