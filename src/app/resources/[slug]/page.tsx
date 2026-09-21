import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { TextReveal } from "@/lib/motion/text-reveal";
import { CtaSection } from "@/components/cta-section";
import { RESOURCES, getResourceBySlug } from "@/content/resources";

export function generateStaticParams() {
  return RESOURCES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return {};
  return {
    title: resource.title,
    description: resource.excerpt,
  };
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  const formattedDate = new Date(resource.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <Nav />
      <main className="flex-1">
        <section className="border-b border-border">
          <Container className="py-16 sm:py-20">
            <Link
              href="/resources"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Resources
            </Link>

            <div className="mt-8 flex items-center gap-3">
              <span className="w-fit rounded-full bg-surface px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-foreground-muted">
                {resource.category}
              </span>
              <time dateTime={resource.date} className="text-xs text-foreground-muted">
                {formattedDate}
              </time>
            </div>

            <TextReveal
              as="h1"
              playOn="mount"
              className="mt-4 max-w-2xl text-4xl font-medium tracking-tight sm:text-5xl"
            >
              {resource.title}
            </TextReveal>

            {resource.category === "Case Study" ? (
              <Reveal
                delay={0.1}
                className="mt-10 grid grid-cols-1 gap-8 border-t border-border pt-10 sm:grid-cols-3"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-foreground-muted">
                    Problem
                  </p>
                  <p className="mt-2 text-sm text-foreground-muted">
                    {resource.problem}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-foreground-muted">
                    Codely
                  </p>
                  <p className="mt-2 text-sm text-foreground-muted">
                    {resource.implementation}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-accent">
                    Outcome
                  </p>
                  <p className="mt-2 text-sm text-foreground">{resource.outcome}</p>
                </div>
              </Reveal>
            ) : (
              <Reveal delay={0.1} className="mt-10 max-w-2xl space-y-5 border-t border-border pt-10">
                {resource.body.map((paragraph, i) => (
                  <p key={i} className="text-base leading-relaxed text-foreground-muted">
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            )}
          </Container>
        </section>
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
