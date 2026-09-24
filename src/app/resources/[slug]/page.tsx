import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { ResourceCover } from "@/components/resource-cover";
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

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  const related = RESOURCES.filter((r) => r.slug !== resource.slug).slice(0, 3);

  return (
    <>
      <Nav />
      <main className="flex-1">
        <section className="border-b border-border">
          <Container className="py-16 sm:py-20">
            <div className="mx-auto max-w-2xl">
              <Link
                href="/resources"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Resources
              </Link>

              <TextReveal
                as="h1"
                playOn="mount"
                className="mt-6 text-4xl font-medium tracking-tight sm:text-5xl"
              >
                {resource.title}
              </TextReveal>

              <Reveal delay={0.08} className="mt-3 text-lg text-foreground-muted">
                {resource.excerpt}
              </Reveal>

              <Reveal delay={0.12} className="mt-6 flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                  C
                </span>
                <span className="text-sm font-medium text-foreground">Codely Team</span>
                <span aria-hidden="true" className="h-3.5 w-px bg-border" />
                <time dateTime={resource.date} className="text-sm text-foreground-muted">
                  {formatDate(resource.date)}
                </time>
              </Reveal>

              <Reveal delay={0.16}>
                <ResourceCover
                  color={resource.image.color}
                  icon={resource.image.icon}
                  className="mt-10 aspect-[16/9] w-full rounded-2xl"
                />
              </Reveal>

              {resource.category === "Case Study" ? (
                <Reveal delay={0.2} className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Problem</p>
                    <p className="mt-2 text-sm text-foreground-muted">
                      {resource.problem}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">What Codely did</p>
                    <p className="mt-2 text-sm text-foreground-muted">
                      {resource.implementation}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Outcome</p>
                    <p className="mt-2 text-sm text-foreground">{resource.outcome}</p>
                  </div>
                </Reveal>
              ) : (
                <Reveal delay={0.2} className="mt-10 space-y-5">
                  {resource.body.map((paragraph, i) => (
                    <p key={i} className="text-base leading-relaxed text-foreground-muted">
                      {paragraph}
                    </p>
                  ))}
                </Reveal>
              )}
            </div>
          </Container>
        </section>

        <section className="border-b border-border">
          <Container className="py-20 sm:py-28">
            <TextReveal className="text-2xl font-medium tracking-tight sm:text-3xl">
              More from Resources
            </TextReveal>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, i) => (
                <Reveal key={item.slug} delay={i * 0.06}>
                  <Link
                    href={`/resources/${item.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border transition-colors hover:border-border-strong"
                  >
                    <ResourceCover
                      color={item.image.color}
                      icon={item.image.icon}
                      className="aspect-[16/10] w-full transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <div className="flex flex-1 flex-col p-6">
                      <span className="text-xs text-foreground-muted">{item.category}</span>
                      <h3 className="mt-4 text-lg font-medium tracking-tight">
                        {item.title}
                      </h3>
                      <div className="mt-6 flex items-center justify-between text-xs text-foreground-muted">
                        <time dateTime={item.date}>{formatDate(item.date)}</time>
                        <span className="inline-flex items-center gap-1 font-medium text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                          Read
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
