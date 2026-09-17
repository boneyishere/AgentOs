import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { BrainDiagram } from "@/components/brain-diagram";
import { FeatureSplit } from "@/components/feature-split";
import { ChatWidgetMockup } from "@/components/mockups/chat-widget";
import { VoiceCallMockup } from "@/components/mockups/voice-call";
import { KnowledgeSection } from "@/components/knowledge-section";
import { IntelligenceSection } from "@/components/intelligence-section";
import { SolutionsSection } from "@/components/solutions-section";
import { CapabilitiesGrid } from "@/components/capabilities-grid";
import { ResourcesSection } from "@/components/resources-section";
import { CtaSection } from "@/components/cta-section";

const CHAT_FEATURES = [
  "Answer customer questions",
  "Understand intent",
  "Use business knowledge",
  "Maintain conversation context",
  "Collect customer information",
  "Qualify leads",
];

const VOICE_FEATURES = [
  "Answer incoming calls",
  "Real-time speech conversations",
  "Answer FAQs",
  "Schedule appointments",
  "Configurable voice, tone & speed",
  "Handle customer follow-ups",
];

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <BrainDiagram />

        <FeatureSplit
          id="chat-agents"
          eyebrow="AI Chat Agents"
          title="Conversations that resolve, not just reply"
          description="Deploy an AI chat agent on your website or web app that understands intent, pulls from your knowledge base, and escalates when it should."
          features={CHAT_FEATURES}
          visual={<ChatWidgetMockup />}
        />

        <FeatureSplit
          id="voice-agents"
          eyebrow="AI Voice Agents"
          title="Real conversations, over the phone"
          description="Real-time AI voice agents handle inbound and outbound calls — answering FAQs, qualifying leads, and booking appointments in natural speech."
          features={VOICE_FEATURES}
          visual={<VoiceCallMockup />}
          reverse
        />

        <KnowledgeSection />
        <IntelligenceSection />
        <SolutionsSection />
        <CapabilitiesGrid />
        <ResourcesSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
