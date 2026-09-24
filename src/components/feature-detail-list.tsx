import type { ComponentType } from "react";
import { Bot, BookOpen, History, Mic, SlidersHorizontal, Sparkles, Wand2 } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { TextReveal } from "@/lib/motion/text-reveal";
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
    icon: Mic,
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
    icon: Sparkles,
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
    icon: BookOpen,
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
    icon: History,
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
    icon: Wand2,
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
    icon: SlidersHorizontal,
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
    icon: Bot,
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
        <div className="max-w-xl">
          <TextReveal className="text-3xl font-medium tracking-tight sm:text-4xl">
            The technology behind every conversation.
          </TextReveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-lg text-foreground-muted">
              How Codely makes all of that possible.
            </p>
          </Reveal>
        </div>

        <div className="mt-4">
          {FEATURES.map(({ title, icon: Icon, description, points, Visual }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.05}>
              <div className="border-t border-border py-14 first:border-t-0">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-accent">
                    <Icon className="h-4.5 w-4.5" />
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
