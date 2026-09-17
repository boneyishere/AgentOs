import { BarChart3, MessagesSquare, Smile, Target } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";

const STATS = [
  { label: "Conversations", value: "2,481", icon: MessagesSquare },
  { label: "Leads generated", value: "312", icon: Target },
  { label: "Avg. call duration", value: "3m 40s", icon: BarChart3 },
];

const FEATURES = [
  "Automatic conversation & call classification",
  "Sentiment analysis across chat and voice",
  "Lead scoring: qualified, potential, unqualified",
  "Insights on FAQs, complaints, and feature requests",
];

export function IntelligenceSection() {
  return (
    <section id="intelligence" className="border-b border-border">
      <Container className="grid grid-cols-1 items-center gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-sm font-semibold text-primary">
              Intelligence &amp; Analytics
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-tight sm:text-4xl">
              Every conversation, understood
            </h2>
            <p className="mt-4 text-lg text-foreground-muted">
              AgentOS classifies conversations, scores leads, and surfaces
              sentiment automatically — so your team knows what customers
              need without reading every transcript.
            </p>

            <ul className="mt-8 space-y-3">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15} className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
            <div className="rounded-xl border border-border bg-background p-5 shadow-lg">
              <p className="text-sm font-medium text-foreground-muted">
                Analytics overview
              </p>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {STATS.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="rounded-lg bg-surface p-3"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    <p className="mt-2 font-[family-name:var(--font-heading)] text-lg font-medium">
                      {value}
                    </p>
                    <p className="text-xs text-foreground-muted">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between text-xs text-foreground-muted">
                  <span className="flex items-center gap-1.5 font-medium text-foreground">
                    <Smile className="h-3.5 w-3.5 text-primary" />
                    Sentiment
                  </span>
                  <span>Last 30 days</span>
                </div>
                <div className="mt-2 flex h-2.5 overflow-hidden rounded-full bg-surface">
                  <span className="h-full bg-primary" style={{ width: "64%" }} />
                  <span className="h-full bg-foreground/30" style={{ width: "24%" }} />
                  <span className="h-full bg-foreground/70" style={{ width: "12%" }} />
                </div>
                <div className="mt-2 flex gap-4 text-xs text-foreground-muted">
                  <span>Positive 64%</span>
                  <span>Neutral 24%</span>
                  <span>Negative 12%</span>
                </div>
              </div>
            </div>
        </Reveal>
      </Container>
    </section>
  );
}
