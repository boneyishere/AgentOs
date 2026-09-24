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
    hue: "var(--accent)",
    span: "sm:col-span-2 lg:col-span-4",
  },
  {
    title: "AI Chat Agents",
    description:
      "Resolve questions on your website or app with context-aware conversations that know when to escalate.",
    Visual: ChatVisual,
    hue: "var(--rose)",
    span: "lg:col-span-2",
  },
  {
    title: "Knowledge & Context",
    description:
      "Connect docs, FAQs, and business data so every answer is grounded in how your business actually works.",
    Visual: KnowledgeVisual,
    hue: "var(--amber)",
    span: "lg:col-span-2",
  },
  {
    title: "Memory",
    description:
      "Agents recall prior conversations and calls, so customers never repeat themselves.",
    Visual: MemoryVisual,
    hue: "var(--iris)",
    span: "lg:col-span-2",
  },
  {
    title: "Actions & Integrations",
    description:
      "Agents don't just respond — they check calendars, update CRMs, and trigger workflows.",
    Visual: ActionsVisual,
    hue: "var(--teal)",
    span: "sm:col-span-2 lg:col-span-2",
  },
  {
    title: "Conversation Intelligence",
    description:
      "Every call and chat becomes structured signal: intent, sentiment, and lead quality, automatically.",
    Visual: IntelligenceVisual,
    hue: "var(--iris)",
    span: "sm:col-span-2 lg:col-span-6",
    wide: true,
  },
];

export function FeatureCards() {
  return (
    <section id="features" className="section-light border-b border-border bg-background">
      <Container className="relative py-20 sm:py-28">
        <div className="max-w-xl">
          <TextReveal className="text-3xl font-medium tracking-tight sm:text-4xl">
            Not just AI that talks. AI that works.
          </TextReveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-lg text-foreground-muted">
              Codely gives your AI the ability to understand your business,
              remember your customers, communicate naturally, and take
              action, turning conversations into real work.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-6">
          {FEATURES.map(({ title, description, Visual, span, wide, hue }, i) => (
            <div key={title} className={`bg-background ${span}`}>
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <article
                  data-particle-hover
                  className={`spotlight h-full p-6 sm:p-7 ${
                    wide ? "lg:grid lg:grid-cols-[1fr_2fr] lg:items-center lg:gap-14" : "flex flex-col"
                  }`}
                  style={{ "--hue": hue } as React.CSSProperties}
                >
                  {wide && (
                    <div className="hidden lg:order-1 lg:block">
                      <h3 className="text-lg font-medium">{title}</h3>
                      <p className="mt-2 max-w-xs text-sm text-foreground-muted">{description}</p>
                    </div>
                  )}

                  <div className={wide ? "lg:order-2" : ""}>
                    <Visual />
                  </div>

                  <div className={wide ? "mt-6 lg:hidden" : "mt-auto pt-6"}>
                    <h3 className="text-base font-medium">{title}</h3>
                    <p className="mt-2 max-w-md text-sm text-foreground-muted">{description}</p>
                  </div>
                </article>
              </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
