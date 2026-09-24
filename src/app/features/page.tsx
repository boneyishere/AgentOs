import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { AgentCapabilitiesSection } from "@/components/agent-capabilities-section";
import { FeatureDetailList } from "@/components/feature-detail-list";
import { TechStackSection } from "@/components/tech-stack-section";
import { DeploymentSection } from "@/components/deployment-section";
import { ImpactSection } from "@/components/impact-section";
import { FaqSection } from "@/components/faq-section";
import { CtaSection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "Features",
  description:
    "How a Codely agent talks, looks things up, remembers customers, and gets work done across phone, web, and messaging.",
};

export default function FeaturesPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <PageHeader
          title="What your agent can do, and how it does it."
          description="The voice, the knowledge, the memory, and the hands. Every part of a Codely agent, explained without the jargon."
        />
        <AgentCapabilitiesSection />
        <FeatureDetailList />
        <TechStackSection />
        <DeploymentSection />
        <ImpactSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
