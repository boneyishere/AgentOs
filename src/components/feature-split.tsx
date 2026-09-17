import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "./container";
import { Reveal } from "./reveal";

export function FeatureSplit({
  id,
  eyebrow,
  title,
  description,
  features,
  visual,
  reverse = false,
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  features: string[];
  visual: ReactNode;
  reverse?: boolean;
}) {
  return (
    <section id={id} className="border-b border-border">
      <Container className="grid grid-cols-1 items-center gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16">
        <Reveal className={reverse ? "lg:order-2" : ""}>
          <p className="text-sm font-semibold text-primary">{eyebrow}</p>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-foreground-muted">{description}</p>

          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15} className={reverse ? "lg:order-1" : ""}>
          {visual}
        </Reveal>
      </Container>
    </section>
  );
}
