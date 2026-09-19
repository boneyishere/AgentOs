import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { FeatureDetailList } from "@/components/feature-detail-list";
import { TechStackSection } from "@/components/tech-stack-section";
import { FaqSection } from "@/components/faq-section";
import { CtaSection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "Features",
  description:
    "A detailed look at Codely's AI voice and chat agents — knowledge, memory, actions, conversation intelligence, the technology behind them, and answers to common questions.",
};

export default function FeaturesPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <PageHeader
          title="Everything Codely agents can do."
          description="Voice and chat agents built on real knowledge, memory, and the ability to take action — not just answer questions."
        />
        <FeatureDetailList />
        <TechStackSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
