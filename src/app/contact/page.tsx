import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { LeadIntake } from "@/components/lead-intake";

export const metadata: Metadata = {
  title: "Get your agent",
  description:
    "Answer a few quick questions about your business and we'll build a first version of your Codely agent within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <PageHeader
          title="Tell us about your business. We'll build your agent."
          description="A few quick questions. Within one business day you'll hear a first version of your agent, built on your answers, handling your kind of call."
        />
        <LeadIntake />
      </main>
      <Footer />
    </>
  );
}
