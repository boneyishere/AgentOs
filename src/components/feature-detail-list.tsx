import type { ComponentType } from "react";
import {
  BookIcon,
  BotIcon,
  HistoryIcon,
  MicIcon,
  SlidersIcon,
  SparkleIcon,
  WandIcon,
} from "./icons/agent-icons";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { VoiceVisual } from "./feature-visuals/voice-visual";
import { KnowledgeVisual } from "./feature-visuals/knowledge-visual";
import { MemoryVisual } from "./feature-visuals/memory-visual";
import { ActionsVisual } from "./feature-visuals/actions-visual";
import { IntelligenceVisual } from "./feature-visuals/intelligence-visual";

const FEATURES: {
  title: string;
  icon: ComponentType<{ className?: string }>;
  description: string;
  points: string[];
  Visual?: ComponentType;
}[] = [
  {
    title: "Voice AI",
    icon: MicIcon,
    description: "Natural, real-time voice conversations.",
    points: [
      "Speech-to-text",
      "Text-to-speech",
      "Real-time conversation",
      "Natural interruption handling",
      "Voice selection",
      "Phone connectivity",
      "Inbound and outbound calling",
    ],
    Visual: VoiceVisual,
  },
  {
    title: "AI Models",
    icon: SparkleIcon,
    description: "Use the intelligence appropriate for the job.",
    points: [
      "Multiple AI model support",
      "Model selection",
      "Model-specific configuration",
      "Context-aware responses",
      "Custom system instructions",
    ],
  },
  {
    title: "Knowledge Base",
    icon: BookIcon,
    description: "Give the agent access to the information it needs.",
    points: [
      "Business knowledge",
      "Website content",
      "Documents",
      "FAQs",
      "Policies",
      "Custom information",
      "Retrieval-based responses",
    ],
    Visual: KnowledgeVisual,
  },
  {
    title: "Memory & Context",
    icon: HistoryIcon,
    description: "Keep relevant information across conversations.",
    points: [
      "Conversation history",
      "Customer context",
      "Persistent information",
      "Previous interactions",
      "Context-aware responses",
    ],
    Visual: MemoryVisual,
  },
  {
    title: "Tools & Actions",
    icon: WandIcon,
    description: "Connect the agent to real business operations.",
    points: [
      "APIs",
      "External services",
      "Booking systems",
      "CRM",
      "Databases",
      "Custom tools",
      "Webhooks",
      "Automated workflows",
    ],
    Visual: ActionsVisual,
  },
  {
    title: "Agent Configuration",
    icon: SlidersIcon,
    description: "Control how the agent behaves.",
    points: [
      "Custom instructions",
      "Business rules",
      "Personality",
      "Tone of voice",
      "Guardrails",
      "Escalation rules",
      "Response behavior",
    ],
  },
  {
    title: "Conversation Intelligence",
    icon: BotIcon,
    description: "Understand what happens across conversations.",
    points: [
      "Transcripts",
      "Summaries",
      "Intent",
      "Lead information",
      "Conversation outcomes",
      "Customer questions",
      "Performance insights",
    ],
    Visual: IntelligenceVisual,
  },
];

export function FeatureDetailList() {
  return (
    <section className="border-b border-border">
      <Container className="py-20 sm:py-28">
        <SectionHeading
          title="A closer look at each capability."
          subtitle="What each part does, and what you can shape to fit your business."
        />

        <div className="mt-4">
          {FEATURES.map(({ title, icon: Icon, description, points, Visual }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.05}>
              <div className="group border-t border-border py-14 first:border-t-0">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-accent">
                    <Icon />
                  </span>
                  <h3 className="text-lg font-medium">{title}</h3>
                </div>
                <p className="mt-3 max-w-xl text-foreground-muted">{description}</p>

                <div
                  className={`mt-8 grid grid-cols-1 gap-8 ${
                    Visual ? "lg:grid-cols-[1fr_440px] lg:items-center" : ""
                  }`}
                >
                  <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                    {points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm text-foreground-muted"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  {Visual && (
                    <div data-particle-hover className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
                      <Visual />
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
