import type { ReactNode } from "react";
import { Reveal } from "./reveal";
import { TextReveal } from "@/lib/motion/text-reveal";

/**
 * The one section heading block. Every section uses it, so headline and
 * subtitle always share the same container width and rhythm. A subtitle is
 * required: no section ships a bare headline.
 */
export function SectionHeading({
  title,
  subtitle,
  className = "",
}: {
  title: ReactNode;
  subtitle: ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-[32rem] ${className}`}>
      <TextReveal className="type-section font-medium [text-wrap:wrap]">{title}</TextReveal>
      <Reveal delay={0.1}>
        <p className="type-lead mt-5 text-foreground-muted">{subtitle}</p>
      </Reveal>
    </div>
  );
}
