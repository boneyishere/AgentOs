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
    "Simple, transparent pricing for Codely's AI voice and chat agent platform — from a single agent to enterprise-scale deployments.",
};

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <PageHeader
          title="Simple pricing that scales with you."
          description="Start with one agent, then add channels, minutes, and seats as your business grows."
        />
        <PricingTiers />
        <PricingComparisonTable />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
