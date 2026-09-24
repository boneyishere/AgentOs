import type { ReactNode } from "react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { TextReveal } from "@/lib/motion/text-reveal";

export function PageHeader({
  title,
  description,
}: {
  title: ReactNode;
  description?: string;
}) {
  return (
    <section className="section-light border-b border-border">
      <Container className="relative py-16 sm:py-20">
        <TextReveal
          as="h1"
          playOn="mount"
          className="max-w-2xl text-4xl font-medium tracking-tight sm:text-5xl"
        >
          {title}
        </TextReveal>
        {description && (
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-lg text-lg text-foreground-muted">{description}</p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
