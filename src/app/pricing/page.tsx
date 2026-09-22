import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { PricingTiers } from "@/components/pricing-tiers";
import { PricingComparisonTable } from "@/components/pricing-comparison-table";
import { CtaSection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for Codely's AI voice and chat agent platform — from a solo business testing its first AI agent to custom, high-volume deployments.",
};

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <PageHeader
          title="Simple pricing that scales with you."
          description="Start with call minutes and chat conversations, then add voice channels and integrations as your business grows."
        />
        <PricingTiers />
        <PricingComparisonTable />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
