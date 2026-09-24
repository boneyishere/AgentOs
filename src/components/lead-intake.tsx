"use client";

import { useState, type ReactNode } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { AgentButton } from "./agent-button";
import { SignalField } from "./signal-field";
import {
  CalendarIcon,
  LifebuoyIcon,
  LoopIcon,
  PhoneIcon,
  SparkleIcon,
  TargetIcon,
  type AgentIcon,
} from "./icons/agent-icons";
import { gsap } from "@/lib/motion/gsap-setup";
import { useGsapContext } from "@/lib/motion/use-gsap-context";
import { useShake } from "@/lib/motion/use-field-motion";

type Lead = {
  business: string;
  industry: string;
  size: string;
  jobs: string[];
  channels: string[];
  volume: string;
  tools: string[];
  notes: string;
  name: string;
  email: string;
  phone: string;
  timeline: string;
};

const EMPTY: Lead = {
  business: "",
  industry: "",
  size: "",
  jobs: [],
  channels: [],
  volume: "",
  tools: [],
  notes: "",
  name: "",
  email: "",
  phone: "",
  timeline: "",
};

const INDUSTRIES = [
  "Healthcare",
  "Home services",
  "Real estate",
  "Restaurants & hospitality",
  "Retail & e-commerce",
  "Professional services",
  "Education",
  "Something else",
];
const SIZES = ["Just me", "2 to 10", "11 to 50", "51 to 200", "200+"];
const JOBS: { label: string; detail: string; icon: AgentIcon }[] = [
  { label: "Answer calls", detail: "Pick up every call, day or night", icon: PhoneIcon },
  { label: "Qualify leads", detail: "Ask the right questions, score them", icon: TargetIcon },
  { label: "Book appointments", detail: "Check availability and confirm", icon: CalendarIcon },
  { label: "Customer support", detail: "Answer from your knowledge base", icon: LifebuoyIcon },
  { label: "Follow-ups", detail: "Re-engage missed calls and leads", icon: LoopIcon },
  { label: "Something else", detail: "Describe it on the next step", icon: SparkleIcon },
];
const JOB_VERBS: Record<string, string> = {
  "Answer calls": "pick up every call",
  "Qualify leads": "qualify your leads",
  "Book appointments": "book appointments",
  "Customer support": "answer support questions",
  "Follow-ups": "follow up on missed calls",
};
const CHANNELS = ["Phone", "Website chat", "Messaging apps"];
const CHANNEL_PLACES: Record<string, string> = {
  Phone: "the phone",
  "Website chat": "your website",
  "Messaging apps": "your messaging apps",
};
const VOLUMES = ["Under 100", "100 to 500", "500 to 2,000", "2,000+"];
const TOOLS = [
  "Google Calendar",
  "Outlook",
  "HubSpot",
  "Salesforce",
  "Zendesk",
  "Shopify",
  "Custom software",
  "None yet",
];
const TIMELINES = ["As soon as possible", "This month", "Next quarter", "Just exploring"];

const STEPS = ["Your business", "The work", "Your tools", "Where to reach you"] as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function toggle(list: string[], item: string) {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

function Pill({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm transition-[border-color,background-color,color] duration-300 ${
        selected
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background text-foreground-muted hover:border-border-strong hover:text-foreground"
      }`}
    >
      <span
        aria-hidden="true"
        className={`grid overflow-hidden transition-[width,opacity] duration-300 ${selected ? "w-3.5 opacity-100" : "w-0 opacity-0"}`}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
      </span>
      {label}
    </button>
  );
}

function JobTile({
  job,
  selected,
  onClick,
}: {
  job: (typeof JOBS)[number];
  selected: boolean;
  onClick: () => void;
}) {
  const Icon = job.icon;
  return (
    <button
      type="button"
      aria-pressed={selected}
      data-icon-active={selected}
      onClick={onClick}
      className={`group relative flex items-start gap-3 rounded-xl border p-4 text-left transition-[border-color,background-color,box-shadow] duration-300 ${
        selected
          ? "border-[color-mix(in_srgb,var(--accent)_45%,transparent)] bg-[color-mix(in_srgb,var(--accent)_5%,white)] shadow-soft"
          : "border-border bg-background hover:border-border-strong"
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
          selected ? "bg-background text-accent" : "bg-surface text-foreground-muted"
        }`}
      >
        <Icon />
      </span>
      <span className="min-w-0 pt-0.5">
        <span className="block text-sm font-medium text-foreground">{job.label}</span>
        <span className="mt-0.5 block text-xs text-foreground-muted">{job.detail}</span>
      </span>
      <span
        aria-hidden="true"
        className={`absolute right-3 top-3 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-white transition-[opacity,transform] duration-300 ${
          selected ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        <Check className="h-2.5 w-2.5" strokeWidth={3} />
      </span>
    </button>
  );
}

function Question({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="text-base font-medium text-foreground">{title}</legend>
      {hint && <p className="mt-1 text-sm text-foreground-muted">{hint}</p>}
      <div className="mt-4">{children}</div>
    </fieldset>
  );
}

/** A disc of breathing voice bars: the agent's face in the preview card. */
function AgentAvatar({ ready }: { ready: boolean }) {
  const ref = useGsapContext<HTMLSpanElement>(
    (_ctx, el, reducedMotion) => {
      const bars = el.querySelectorAll("[data-bar]");
      if (reducedMotion) return;
      gsap.to(bars, {
        scaleY: () => gsap.utils.random(0.3, ready ? 1 : 0.65),
        duration: ready ? 0.22 : 0.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
        stagger: { each: 0.12, from: "center" },
      });
    },
    [ready]
  );
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center gap-[3px] rounded-full bg-foreground"
    >
      {[0.5, 0.9, 0.7, 0.85].map((h, i) => (
        <span key={i} data-bar className="w-[3px] rounded-full bg-background" style={{ height: 16, transform: `scaleY(${h})` }} />
      ))}
    </span>
  );
}

/**
 * The agent the visitor is briefing, written as the agent introducing itself.
 * Each answer adds a line; nothing is shown until there's something true to say.
 */
function AgentPreview({ lead, done }: { lead: Lead; done: boolean }) {
  const name = lead.business.trim();
  const join = (items: string[]) =>
    items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;

  const lines: string[] = [];
  if (lead.industry && lead.industry !== "Something else") lines.push(`I know how ${lead.industry.toLowerCase()} works.`);
  if (lead.size) lines.push(lead.size === "Just me" ? "I'll cover for you when you're busy." : `I'll back up your team of ${lead.size} people.`);
  const verbs = lead.jobs.map((j) => JOB_VERBS[j]).filter(Boolean);
  if (lead.jobs.length) lines.push(verbs.length ? `I'll ${join(verbs)}.` : "I'll take on the work you describe.");
  if (lead.channels.length) lines.push(`Customers will reach me on ${join(lead.channels.map((c) => CHANNEL_PLACES[c]))}.`);
  if (lead.volume) lines.push(`I'm ready for ${lead.volume.toLowerCase()} conversations a week.`);
  const tools = lead.tools.filter((t) => t !== "None yet");
  if (tools.length) lines.push(`I'll work inside ${join(tools)}.`);
  if (lead.timeline && lead.timeline !== "Just exploring") lines.push(`Target start: ${lead.timeline.toLowerCase()}.`);

  const ready = done || lines.length >= 5;

  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-soft">
      <div className="flex items-center gap-3">
        <AgentAvatar ready={ready} />
        <div className="min-w-0">
          <p key={name} className="animate-[rise-in_0.45s_ease-out] truncate text-base font-medium text-foreground">
            {name ? `${name}'s agent` : "Your agent"}
          </p>
          <p className="text-xs text-foreground-muted">
            {done ? "On our build list" : ready ? "Enough to start building" : "Listening"}
          </p>
        </div>
      </div>

      <div className="mt-5 border-t border-border pt-5">
        {lines.length === 0 ? (
          <p className="text-sm leading-relaxed text-foreground-muted">
            Answer on the left and I&apos;ll introduce myself here, one line at a time.
          </p>
        ) : (
          <ul className="space-y-2.5">
            {lines.map((line) => (
              <li key={line} className="animate-[rise-in_0.45s_ease-out] text-[15px] leading-relaxed text-foreground">
                {line}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function NextSteps() {
  return (
    <div className="mt-8 space-y-4 text-sm leading-relaxed">
      <p className="font-medium text-foreground">What you get</p>
      <p className="text-foreground-muted">
        <span className="text-foreground">A working first version</span> of your agent within one
        business day, trained on what you tell us here.
      </p>
      <p className="text-foreground-muted">
        <span className="text-foreground">A call where you hear it</span> handle your own kind of
        customer, and tell us what to change.
      </p>
      <p className="text-foreground-muted">
        <span className="text-foreground">No commitment</span> until it sounds right to you.
      </p>
      <p className="border-t border-border pt-4 text-foreground-muted">
        Rather talk to a person first?{" "}
        <a href="mailto:hello@codely.ai" className="font-medium text-foreground hover:text-accent">
          hello@codely.ai
        </a>
      </p>
    </div>
  );
}

function Success({ name }: { name: string }) {
  const first = name.trim().split(" ")[0];
  return (
    <div className="flex flex-col items-start py-6">
      <svg viewBox="0 0 56 56" className="h-14 w-14 text-teal" fill="none" aria-hidden="true">
        <circle
          cx="28"
          cy="28"
          r="26"
          stroke="currentColor"
          strokeWidth="2"
          pathLength={1}
          strokeDasharray="1"
          className="animate-[ip-draw_0.8s_cubic-bezier(0.65,0,0.35,1)_both]"
        />
        <path
          d="M18 28.5l7 7 13-14"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="1"
          className="animate-[ip-draw_0.5s_cubic-bezier(0.65,0,0.35,1)_0.55s_both]"
        />
      </svg>
      <h2 className="type-section mt-6 max-w-[28rem] font-medium">
        Your agent is on the way{first ? `, ${first}` : ""}.
      </h2>
      <p className="type-lead mt-4 max-w-[30rem] text-foreground-muted">
        We&apos;re reading your answers now. Within one business day you&apos;ll get a first version
        of your agent and a time to hear it take a call.
      </p>
      <AgentButton href="/features" tone="outline" className="mt-8">
        See what it can do meanwhile
      </AgentButton>
    </div>
  );
}

/**
 * "Brief your agent": the lead intake. Four short steps (business, jobs,
 * tools, contact), mostly one-tap choices, beside a live preview of the
 * agent being briefed. Steps slide in blur-to-sharp; missing answers shake.
 * Submission is client-side only (no backend yet).
 */
export function LeadIntake() {
  const [lead, setLead] = useState<Lead>(EMPTY);
  const [step, setStep] = useState(0);
  const [tried, setTried] = useState(false);
  const [done, setDone] = useState(false);
  const [cardRef, shake] = useShake<HTMLDivElement>();

  const set = <K extends keyof Lead>(key: K, value: Lead[K]) => setLead((l) => ({ ...l, [key]: value }));

  const errors: Record<string, string> = {};
  if (step === 0) {
    if (!lead.business.trim()) errors.business = "What's the business called?";
    if (!lead.industry) errors.industry = "Pick the closest match.";
  }
  if (step === 1 && lead.jobs.length === 0) errors.jobs = "Choose at least one job for your agent.";
  if (step === 3) {
    if (!lead.name.trim()) errors.name = "So we know who to ask for.";
    if (!EMAIL.test(lead.email)) errors.email = "We need a working email to send your agent.";
  }
  const show = (key: string) => (tried ? errors[key] : undefined);

  const next = () => {
    if (Object.keys(errors).length) {
      setTried(true);
      shake();
      return;
    }
    setTried(false);
    if (step < STEPS.length - 1) setStep(step + 1);
    else setDone(true);
  };

  const stepRef = useGsapContext<HTMLDivElement>(
    (_ctx, el, reducedMotion) => {
      // Bring the card back into view if the new step starts above the fold.
      const card = cardRef.current;
      if (card && card.getBoundingClientRect().top < 80) {
        window.scrollTo({ top: card.getBoundingClientRect().top + window.scrollY - 110, behavior: "smooth" });
      }
      if (reducedMotion) return;
      gsap.fromTo(
        el.children,
        { autoAlpha: 0, y: 14, filter: "blur(6px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.55, stagger: 0.07, ease: "power3.out", clearProps: "filter" }
      );
    },
    [step, done]
  );

  return (
    <section className="border-b border-border">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
        <Reveal>
          <div ref={cardRef} className="rounded-2xl border border-border bg-background p-6 shadow-soft sm:p-9">
            {!done && (
              <div className="mb-9">
                <div className="flex gap-1.5" aria-hidden="true">
                  {STEPS.map((s, i) => (
                    <span key={s} className="h-1 flex-1 overflow-hidden rounded-full bg-foreground/[0.07]">
                      <span
                        className="block h-full origin-left rounded-full bg-foreground transition-transform duration-500 ease-out"
                        style={{ transform: `scaleX(${i <= step ? 1 : 0})` }}
                      />
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-foreground-muted">
                  <span>
                    <span className="text-foreground">{STEPS[step]}</span>
                  </span>
                  <span className="tabular-nums">{step + 1} of {STEPS.length}</span>
                </div>
              </div>
            )}

            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                next();
              }}
            >
              <div ref={stepRef} className="space-y-9">
                {done && <Success name={lead.name} />}

                {!done && step === 0 && (
                  <>
                    <SignalField
                      id="business"
                      label="Business name"
                      value={lead.business}
                      onChange={(v) => set("business", v)}
                      valid={Boolean(lead.business.trim())}
                      error={show("business")}
                      autoComplete="organization"
                    />
                    <Question title="What do you do?">
                      <div className="flex flex-wrap gap-2">
                        {INDUSTRIES.map((x) => (
                          <Pill key={x} label={x} selected={lead.industry === x} onClick={() => set("industry", x)} />
                        ))}
                      </div>
                      {show("industry") && <p className="mt-3 text-xs text-rose">{show("industry")}</p>}
                    </Question>
                    <Question title="How many people talk to customers today?">
                      <div className="flex flex-wrap gap-2">
                        {SIZES.map((x) => (
                          <Pill key={x} label={x} selected={lead.size === x} onClick={() => set("size", x)} />
                        ))}
                      </div>
                    </Question>
                  </>
                )}

                {!done && step === 1 && (
                  <>
                    <Question title="What would you hand over first?" hint="Pick everything that eats into your team's day.">
                      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {JOBS.map((j) => (
                          <JobTile
                            key={j.label}
                            job={j}
                            selected={lead.jobs.includes(j.label)}
                            onClick={() => set("jobs", toggle(lead.jobs, j.label))}
                          />
                        ))}
                      </div>
                      {show("jobs") && <p className="mt-3 text-xs text-rose">{show("jobs")}</p>}
                    </Question>
                    <Question title="Where do customers reach you?">
                      <div className="flex flex-wrap gap-2">
                        {CHANNELS.map((x) => (
                          <Pill
                            key={x}
                            label={x}
                            selected={lead.channels.includes(x)}
                            onClick={() => set("channels", toggle(lead.channels, x))}
                          />
                        ))}
                      </div>
                    </Question>
                    <Question title="How many calls and chats in a busy week?">
                      <div className="flex flex-wrap gap-2">
                        {VOLUMES.map((x) => (
                          <Pill key={x} label={x} selected={lead.volume === x} onClick={() => set("volume", x)} />
                        ))}
                      </div>
                    </Question>
                  </>
                )}

                {!done && step === 2 && (
                  <>
                    <Question title="Where should it get the work done?" hint="It books, logs, and updates right inside these.">
                      <div className="flex flex-wrap gap-2">
                        {TOOLS.map((x) => (
                          <Pill
                            key={x}
                            label={x}
                            selected={lead.tools.includes(x)}
                            onClick={() => set("tools", toggle(lead.tools, x))}
                          />
                        ))}
                      </div>
                    </Question>
                    <SignalField
                      id="notes"
                      label="What does a typical call sound like?"
                      value={lead.notes}
                      onChange={(v) => set("notes", v)}
                      multiline
                      optional
                      valid={lead.notes.trim().length > 20}
                    />
                  </>
                )}

                {!done && step === 3 && (
                  <>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <SignalField
                        id="name"
                        label="Your name"
                        value={lead.name}
                        onChange={(v) => set("name", v)}
                        valid={Boolean(lead.name.trim())}
                        error={show("name")}
                        autoComplete="name"
                      />
                      <SignalField
                        id="email"
                        label="Work email"
                        type="email"
                        inputMode="email"
                        value={lead.email}
                        onChange={(v) => set("email", v)}
                        valid={EMAIL.test(lead.email)}
                        error={show("email")}
                        autoComplete="email"
                      />
                    </div>
                    <SignalField
                      id="phone"
                      label="Phone, for a faster callback"
                      type="tel"
                      inputMode="tel"
                      value={lead.phone}
                      onChange={(v) => set("phone", v)}
                      optional
                      valid={lead.phone.replace(/\D/g, "").length >= 7}
                      autoComplete="tel"
                    />
                    <Question title="When should it start answering?">
                      <div className="flex flex-wrap gap-2">
                        {TIMELINES.map((x) => (
                          <Pill key={x} label={x} selected={lead.timeline === x} onClick={() => set("timeline", x)} />
                        ))}
                      </div>
                    </Question>
                  </>
                )}
              </div>

              {!done && (
                <div className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-6">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => {
                        setTried(false);
                        setStep(step - 1);
                      }}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Back
                    </button>
                  ) : (
                    <span className="text-xs text-foreground-muted">Takes about two minutes. We reply within one business day.</span>
                  )}
                  <AgentButton type="submit">
                    {step === STEPS.length - 1 ? "Build my agent" : "Next"}
                  </AgentButton>
                </div>
              )}
            </form>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="lg:sticky lg:top-28">
            <AgentPreview lead={lead} done={done} />
            <NextSteps />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
