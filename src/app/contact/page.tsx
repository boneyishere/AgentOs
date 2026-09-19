import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { ContactFormSection } from "@/components/contact-form-section";

export const metadata: Metadata = {
  title: "Contact Sales",
  description:
    "Tell us what your business handles today, and we'll show you where a Codely AI agent can help.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <PageHeader
          title="Let's talk about your business."
          description="Tell us what you're trying to solve — we'll show you how Codely can help, and set up a personalized walkthrough."
        />
        <ContactFormSection />
      </main>
      <Footer />
    </>
  );
}
