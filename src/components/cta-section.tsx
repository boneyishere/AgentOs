import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DiamondPattern } from "./diamond-pattern";
import { Container } from "./container";
import { Reveal } from "./reveal";

export function CtaSection() {
  return (
    <section id="pricing" className="border-b border-border">
      <Container className="py-20 sm:py-24">
        <Reveal className="relative overflow-hidden rounded-2xl bg-primary px-6 py-16 text-center sm:px-12">
          <DiamondPattern className="absolute inset-0" />
          <div className="relative">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-medium tracking-tight text-primary-foreground sm:text-4xl">
              Simple pricing that scales with you
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/85">
              Start free, then add agents, channels, and seats as you grow.
              Talk to us for team and enterprise plans.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="#get-started"
                className="inline-flex items-center gap-2 rounded-lg bg-background px-5 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
              >
                Build an AI Agent
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#demo"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-white/10"
              >
                Talk to sales
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
