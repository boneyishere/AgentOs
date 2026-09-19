"use client";

import type { ComponentType } from "react";
import {
  SiAnthropic,
  SiAnthropicHex,
  SiGooglecalendar,
  SiGooglecalendarHex,
  SiGooglegemini,
  SiGooglegeminiHex,
  SiHubspot,
  SiHubspotHex,
  SiZapier,
  SiZapierHex,
} from "@icons-pack/react-simple-icons";
import { Boxes, Cloud, Hash, LucideIcon, Sparkles, Webhook } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { TextReveal } from "@/lib/motion/text-reveal";
import { gsap } from "@/lib/motion/gsap-setup";
import { useGsapContext } from "@/lib/motion/use-gsap-context";

type BrandLogo = {
  kind: "brand";
  Logo: ComponentType<{ size?: number; color?: string }>;
  color: string;
  name: string;
};
type FallbackLogo = { kind: "fallback"; Icon: LucideIcon; color: string; name: string };
type Logo = BrandLogo | FallbackLogo;

const LANGUAGE_MODELS: Logo[] = [
  { kind: "fallback", Icon: Sparkles, color: "#10A37F", name: "OpenAI GPT" },
  { kind: "brand", Logo: SiAnthropic, color: SiAnthropicHex, name: "Anthropic Claude" },
  { kind: "brand", Logo: SiGooglegemini, color: SiGooglegeminiHex, name: "Google Gemini" },
  { kind: "fallback", Icon: Boxes, color: "#6B7280", name: "Open-source models" },
];

const INTEGRATIONS: Logo[] = [
  { kind: "brand", Logo: SiGooglecalendar, color: SiGooglecalendarHex, name: "Google Calendar" },
  { kind: "fallback", Icon: Sparkles, color: "#0072C6", name: "Outlook" },
  { kind: "brand", Logo: SiHubspot, color: SiHubspotHex, name: "HubSpot" },
  { kind: "fallback", Icon: Cloud, color: "#00A1E0", name: "Salesforce" },
  { kind: "fallback", Icon: Hash, color: "#4A154B", name: "Slack" },
  { kind: "brand", Logo: SiZapier, color: SiZapierHex, name: "Zapier" },
  { kind: "fallback", Icon: Webhook, color: "#6B7280", name: "Custom API & webhooks" },
];

const VOICE = [
  "Real-time speech-to-text",
  "Natural text-to-speech",
  "Multilingual voices",
  "Inbound & outbound telephony",
];

const INFRASTRUCTURE = [
  "Real-time, low-latency pipeline",
  "Encrypted in transit and at rest",
  "Role-based access control",
  "Usage analytics & logging",
];

function LogoChip({ item }: { item: Logo }) {
  return (
    <div
      data-chip
      className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3.5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-border-strong hover:shadow-md"
    >
      {item.kind === "brand" ? (
        <item.Logo size={22} color={item.color} />
      ) : (
        <item.Icon className="h-[22px] w-[22px]" style={{ color: item.color }} />
      )}
      <span className="text-sm font-medium text-foreground">{item.name}</span>
    </div>
  );
}

function LogoBentoCard({
  label,
  headline,
  subtext,
  items,
  className = "",
}: {
  label: string;
  headline: string;
  subtext: string;
  items: Logo[];
  className?: string;
}) {
  const gridRef = useGsapContext<HTMLDivElement>((_ctx, el, reducedMotion) => {
    const chips = el.querySelectorAll<HTMLElement>("[data-chip]");

    if (reducedMotion) {
      gsap.set(chips, { autoAlpha: 1, scale: 1 });
      return;
    }

    gsap.fromTo(
      chips,
      { autoAlpha: 0, scale: 0.85, y: 10 },
      {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      }
    );
  }, []);

  return (
    <div
      className={`rounded-3xl border border-border bg-background p-8 sm:p-10 ${className}`}
    >
      <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-foreground-muted">
        {label}
      </p>
      <h3 className="mt-3 text-xl font-medium tracking-tight">{headline}</h3>
      <p className="mt-2 max-w-md text-sm text-foreground-muted">{subtext}</p>
      <div ref={gridRef} className="mt-6 flex flex-wrap gap-3">
        {items.map((item) => (
          <LogoChip key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}

function TextBentoCard({
  label,
  headline,
  subtext,
  items,
  delay = 0,
  className = "",
}: {
  label: string;
  headline: string;
  subtext: string;
  items: string[];
  delay?: number;
  className?: string;
}) {
  return (
    <Reveal
      delay={delay}
      className={`rounded-3xl border border-border bg-background p-8 sm:p-10 ${className}`}
    >
      <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-foreground-muted">
        {label}
      </p>
      <h3 className="mt-3 text-xl font-medium tracking-tight">{headline}</h3>
      <p className="mt-2 text-sm text-foreground-muted">{subtext}</p>
      <div className="mt-6 flex flex-wrap gap-2.5">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-medium text-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </Reveal>
  );
}

export function TechStackSection() {
  return (
    <section className="border-b border-border bg-surface">
      <Container className="py-20 sm:py-28">
        <div className="max-w-xl">
          <TextReveal className="text-3xl font-medium tracking-tight sm:text-4xl">
            Built on infrastructure you can trust
          </TextReveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-foreground-muted">
              Real providers and real integrations — not a black box.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <LogoBentoCard
            label="Language models"
            headline="Bring the model that fits"
            subtext="Power every agent with the best available reasoning model, or let Codely choose automatically per conversation."
            items={LANGUAGE_MODELS}
            className="lg:col-span-2"
          />
          <TextBentoCard
            label="Voice"
            headline="Natural speech, built in"
            subtext="Real-time speech recognition and natural-sounding responses in the languages your customers speak."
            items={VOICE}
            delay={0.05}
          />
          <LogoBentoCard
            label="Integrations"
            headline="Connects to what you already use"
            subtext="No new systems to learn — agents plug straight into your calendar, CRM, and existing tools."
            items={INTEGRATIONS}
            className="lg:col-span-2"
          />
          <TextBentoCard
            label="Infrastructure"
            headline="Secure by default"
            subtext="Built on a real-time, encrypted pipeline with access control and usage visibility from day one."
            items={INFRASTRUCTURE}
            delay={0.1}
          />
        </div>
      </Container>
    </section>
  );
}
