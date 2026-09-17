import {
  CalendarClock,
  Headset,
  PhoneForwarded,
  TrendingUp,
} from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";

const SOLUTIONS = [
  {
    title: "Customer Support",
    description:
      "Resolve common questions instantly across chat and voice, and escalate complex issues to a human when needed.",
    icon: Headset,
  },
  {
    title: "Sales & Lead Qualification",
    description:
      "Detect purchase intent, qualify leads by budget and urgency, and hand off warm conversations to your sales team.",
    icon: TrendingUp,
  },
  {
    title: "Appointment Booking",
    description:
      "Let customers schedule, reschedule, or cancel appointments by chat or phone — no back-and-forth required.",
    icon: CalendarClock,
  },
  {
    title: "Call Automation",
    description:
      "Answer inbound calls, handle FAQs and follow-ups, and route calls that need a specialist.",
    icon: PhoneForwarded,
  },
];

export function SolutionsSection() {
  return (
    <section id="solutions" className="border-b border-border bg-surface">
      <Container className="py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">Solutions</p>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-tight sm:text-4xl">
            Built for how your team actually works
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {SOLUTIONS.map(({ title, description, icon: Icon }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-heading)] text-lg font-medium">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-foreground-muted">
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
