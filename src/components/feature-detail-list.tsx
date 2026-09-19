import { BookOpen, Bot, History, MessageSquare, Phone, Wand2 } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { VoiceVisual } from "./feature-visuals/voice-visual";
import { ChatVisual } from "./feature-visuals/chat-visual";
import { KnowledgeVisual } from "./feature-visuals/knowledge-visual";
import { MemoryVisual } from "./feature-visuals/memory-visual";
import { ActionsVisual } from "./feature-visuals/actions-visual";
import { IntelligenceVisual } from "./feature-visuals/intelligence-visual";

const FEATURES = [
  {
    title: "AI Voice Agents",
    icon: Phone,
    description:
      "Real-time voice conversations that sound natural, not scripted — handling both inbound support calls and outbound outreach.",
    points: [
      "Natural, low-latency speech in real time",
      "Inbound and outbound calling",
      "Multilingual speech recognition and responses",
      "Live call transfer to a human when needed",
    ],
    Visual: VoiceVisual,
  },
  {
    title: "AI Chat Agents",
    icon: MessageSquare,
    description:
      "Conversational, context-aware chat that lives on your website or app and escalates gracefully when it should.",
    points: [
      "Embeds on your website or app",
      "Context-aware, multi-turn conversations",
      "Rich replies — links, quick actions, forms",
      "Seamless handoff to voice or a human agent",
    ],
    Visual: ChatVisual,
  },
  {
    title: "Knowledge & Context",
    icon: BookOpen,
    description:
      "Every answer is grounded in your actual business content, not a generic model response.",
    points: [
      "Import websites, PDFs, docs, and FAQs",
      "Automatic retrieval grounded in your content",
      "Knowledge stays current as source docs change",
    ],
    Visual: KnowledgeVisual,
  },
  {
    title: "Memory",
    icon: History,
    description:
      "Conversations don't reset — agents recall what a customer said last time, on any channel.",
    points: [
      "Remembers prior conversations and calls",
      "Customer context carries across channels",
      "Configurable retention per business",
    ],
    Visual: MemoryVisual,
  },
  {
    title: "Actions & Integrations",
    icon: Wand2,
    description:
      "Agents don't just talk — they check calendars, update records, and trigger the workflows your team already relies on.",
    points: [
      "Calendar booking and rescheduling",
      "CRM updates and lead creation",
      "Custom API and webhook actions",
      "Workflow triggers for your existing tools",
    ],
    Visual: ActionsVisual,
  },
  {
    title: "Conversation Intelligence",
    icon: Bot,
    description:
      "Every conversation becomes structured signal your team can act on, without reading a single transcript.",
    points: [
      "Transcripts and summaries for every conversation",
      "Automatic intent and sentiment tagging",
      "Lead scoring: qualified, potential, unqualified",
      "Exportable analytics and reporting",
    ],
    Visual: IntelligenceVisual,
  },
];

export function FeatureDetailList() {
  return (
    <section className="border-b border-border">
      <Container className="py-20 sm:py-28">
        {FEATURES.map(({ title, icon: Icon, description, points, Visual }, i) => (
          <Reveal key={title} delay={(i % 3) * 0.05}>
            <div className="border-t border-border py-14 first:border-t-0 first:pt-0">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-accent">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <h3 className="text-lg font-medium">{title}</h3>
              </div>
              <p className="mt-3 max-w-xl text-foreground-muted">{description}</p>

              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px] lg:items-center">
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

                <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
                  <Visual />
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
