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
    "Codely pricing, from a solo business trying its first AI agent to custom, high-volume deployments. Pay for minutes and conversations, nothing hidden.",
};

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <PageHeader
          title="Pay for the calls it takes, not the seats it fills."
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
