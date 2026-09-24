import { Container } from "./container";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { CountUp } from "@/lib/motion/count-up";

const STATS: { value: string; label: string; hue: string }[] = [
  { value: "80%", label: "of calls handled end to end", hue: "var(--accent)" },
  { value: "3x", label: "faster first response", hue: "var(--iris)" },
  { value: "−60%", label: "cost per conversation", hue: "var(--rose)" },
  { value: "+18 pts", label: "in customer satisfaction", hue: "var(--teal)" },
];

export function StatsSection() {
  return (
    <section
      className="section-light border-b border-border"
      style={{ "--light": "var(--iris)" } as React.CSSProperties}
    >
      <Container className="relative py-20 sm:py-28">
        <SectionHeading
          title="What changes in the first month."
          subtitle="Typical results once the agent is handling real calls and chats. Your numbers depend on your volume and use case."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="h-full">
              <div
                className="spotlight h-full overflow-hidden rounded-2xl border border-border bg-background p-6"
                style={{ "--hue": stat.hue } as React.CSSProperties}
              >
                <p className="text-[2.5rem] font-medium tracking-tight">
                  <CountUp value={stat.value} />
                </p>
                <p className="mt-8 inline-flex items-center gap-2 text-sm text-foreground-muted">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: stat.hue }} />
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
