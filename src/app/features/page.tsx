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
    "Everything your AI agent needs to do real work — from natural conversations to business actions, across voice, web, and messaging.",
};

export default function FeaturesPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <PageHeader
          title="Everything your AI agent needs to do real work."
          description="From natural conversations to business actions, Codely gives AI agents the capabilities, tools, and context they need to work across your business."
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
