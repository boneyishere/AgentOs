import { Container } from "./container";
import { Reveal } from "./reveal";
import { TextReveal } from "@/lib/motion/text-reveal";
import { VoiceVisual } from "./feature-visuals/voice-visual";
import { ChatVisual } from "./feature-visuals/chat-visual";
import { KnowledgeVisual } from "./feature-visuals/knowledge-visual";
import { MemoryVisual } from "./feature-visuals/memory-visual";
import { ActionsVisual } from "./feature-visuals/actions-visual";
import { IntelligenceVisual } from "./feature-visuals/intelligence-visual";

const FEATURES = [
  {
    title: "AI Voice Agents",
    description:
      "Answer and make calls in natural speech — real-time conversations that sound human, not scripted.",
    Visual: VoiceVisual,
    span: "lg:col-span-4",
  },
  {
    title: "AI Chat Agents",
    description:
      "Resolve questions on your website or app with context-aware conversations that know when to escalate.",
    Visual: ChatVisual,
    span: "lg:col-span-2",
  },
  {
    title: "Knowledge & Context",
    description:
      "Connect docs, FAQs, and business data so every answer is grounded in how your business actually works.",
    Visual: KnowledgeVisual,
    span: "lg:col-span-2",
  },
  {
    title: "Memory",
    description:
      "Agents recall prior conversations and calls, so customers never repeat themselves.",
    Visual: MemoryVisual,
    span: "lg:col-span-2",
  },
  {
    title: "Actions & Integrations",
    description:
      "Agents don't just respond — they check calendars, update CRMs, and trigger workflows.",
    Visual: ActionsVisual,
    span: "lg:col-span-2",
  },
  {
    title: "Conversation Intelligence",
    description:
      "Every call and chat becomes structured signal: intent, sentiment, and lead quality, automatically.",
    Visual: IntelligenceVisual,
    span: "lg:col-span-6",
  },
];

export function FeatureCards() {
  return (
    <section id="features" className="border-b border-border bg-surface">
      <Container className="py-20 sm:py-28">
        <div className="max-w-xl">
          <TextReveal className="text-3xl font-medium tracking-tight sm:text-4xl">
            Everything an agent needs to have a real conversation
          </TextReveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-6">
          {FEATURES.map(({ title, description, Visual, span }, i) => (
            <Reveal
              key={title}
              delay={(i % 3) * 0.06}
              className={`bg-background p-6 sm:p-7 ${span}`}
            >
              <h3 className="text-base font-medium">{title}</h3>
              <p className="mt-2 text-sm text-foreground-muted">{description}</p>
              <div className="mt-6 border-t border-border pt-5">
                <Visual />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
