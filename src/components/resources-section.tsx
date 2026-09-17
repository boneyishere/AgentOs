import { BookOpen, Newspaper, Compass, ArrowRight } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";

const RESOURCES = [
  {
    title: "Documentation",
    description:
      "Guides for setting up agents, connecting knowledge bases, and configuring voice.",
    icon: BookOpen,
  },
  {
    title: "Use Cases",
    description:
      "How teams use AgentOS for support, sales, and appointment booking.",
    icon: Compass,
  },
  {
    title: "Blog",
    description:
      "Product updates and notes on building reliable AI agents.",
    icon: Newspaper,
  },
];

export function ResourcesSection() {
  return (
    <section id="resources" className="border-b border-border bg-surface">
      <Container className="py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">Resources</p>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-tight sm:text-4xl">
            Learn how to build with AgentOS
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {RESOURCES.map(({ title, description, icon: Icon }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <a
                href="#"
                className="group block rounded-2xl border border-border bg-background p-6 shadow-sm transition-colors hover:border-primary/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-heading)] text-lg font-medium">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-foreground-muted">
                  {description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
