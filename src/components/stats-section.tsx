import { Container } from "./container";
import { Reveal } from "./reveal";
import { TextReveal } from "@/lib/motion/text-reveal";
import { CountUp } from "@/lib/motion/count-up";

type StatColor = "indigo" | "violet" | "pink" | "mint";

const STAT_COLORS: Record<StatColor, string> = {
  indigo: "var(--stat-indigo-soft)",
  violet: "var(--stat-violet-soft)",
  pink: "var(--stat-pink-soft)",
  mint: "var(--stat-mint-soft)",
};

// Each card's spotlight / indicator hue.
const STAT_HUE: Record<StatColor, string> = {
  indigo: "var(--accent)",
  violet: "var(--iris)",
  pink: "var(--rose)",
  mint: "var(--teal)",
};

const STATS: {
  value: string;
  label: string;
  color: StatColor;
}[] = [
  {
    value: "80%",
    label: "Target automation rate",
    color: "indigo",
  },
  {
    value: "3x",
    label: "Faster resolution speed",
    color: "violet",
  },
  {
    value: "−60%",
    label: "Potential cost reduction",
    color: "pink",
  },
  {
    value: "+18 pts",
    label: "CSAT improvement",
    color: "mint",
  },
];

function GradientLayer({ color }: { color: StatColor }) {
  const soft = STAT_COLORS[color];

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 animate-[stat-gradient-sweep_11s_ease-in-out_infinite]"
      style={{
        backgroundImage: `linear-gradient(120deg, ${soft}, transparent 55%)`,
        backgroundSize: "200% 200%",
      }}
    />
  );
}

export function StatsSection() {
  return (
    <section
      className="section-light border-b border-border"
      style={{ "--light": "var(--iris)" } as React.CSSProperties}
    >
      <Container className="relative py-20 sm:py-28">
        <TextReveal className="max-w-lg text-3xl font-medium tracking-tight sm:text-4xl">
          What businesses see after going live.
        </TextReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="h-full">
              <div
                className="spotlight h-full overflow-hidden rounded-2xl border border-border bg-background p-6"
                style={{ "--hue": STAT_HUE[stat.color] } as React.CSSProperties}
              >
                <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-70">
                  <GradientLayer color={stat.color} />
                </div>
                <div className="relative">
                  <p className="text-5xl font-medium tracking-tight">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="mt-8 inline-flex items-center gap-2 text-sm text-foreground-muted">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: STAT_HUE[stat.color] }} />
                    {stat.label}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
