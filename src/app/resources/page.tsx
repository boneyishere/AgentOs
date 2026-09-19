import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { ResourcesGrid } from "@/components/resources-grid";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Articles on designing AI voice and chat agents, and real examples of how businesses put Codely to work.",
};

export default function ResourcesPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <PageHeader
          title="Resources for building better agents."
          description="Articles on designing AI agents, and examples of how businesses put Codely to work."
        />
        <ResourcesGrid />
      </main>
      <Footer />
    </>
  );
}
