import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { ClientLogos } from "@/components/client-logos";
import { FeatureCards } from "@/components/feature-cards";
import { UseCasesSection } from "@/components/use-cases-section";
import { IndustriesSection } from "@/components/industries-section";
import { FaqSection } from "@/components/faq-section";
import { ImpactSection } from "@/components/impact-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <ClientLogos />
        <FeatureCards />
        <UseCasesSection />
        <ImpactSection />
        <IndustriesSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
