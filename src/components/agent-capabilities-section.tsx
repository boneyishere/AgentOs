import { CalendarClock, Check, LifeBuoy, MessagesSquare, Repeat2, Target, Workflow } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";

const CAPABILITIES = [
  {
    title: "Talk to customers",
    icon: MessagesSquare,
    description: "Have natural conversations through voice and chat.",
    points: [
      "Answer questions",
      "Handle incoming calls",
      "Make outbound calls",
      "Understand customer intent",
      "Ask follow-up questions",
      "Handle interruptions and natural conversation",
    ],
  },
  {
    title: "Qualify and convert",
    icon: Target,
    description: "Turn conversations into opportunities.",
    points: [
      "Qualify leads",
      "Collect customer information",
      "Understand requirements",
      "Recommend relevant services",
      "Follow up with prospects",
      "Move qualified leads forward",
    ],
  },
  {
    title: "Schedule and manage",
    icon: CalendarClock,
    description: "Let the agent handle time-sensitive tasks.",
    points: [
      "Book appointments",
      "Reschedule appointments",
      "Cancel appointments",
      "Check availability",
      "Send confirmations",
      "Manage booking requests",
    ],
  },
  {
    title: "Support customers",
    icon: LifeBuoy,
    description: "Handle routine customer needs without making them wait.",
    points: [
      "Answer FAQs",
      "Handle common requests",
      "Troubleshoot basic issues",
      "Provide service information",
      "Check customer context",
      "Escalate when necessary",
    ],
  },
  {
    title: "Take action",
    icon: Workflow,
    description: "The agent should not stop at conversation.",
    points: [
      "Create leads",
      "Update records",
      "Trigger workflows",
      "Send information",
      "Call external services",
      "Update connected systems",
      "Notify your team",
    ],
  },
  {
    title: "Follow up",
    icon: Repeat2,
    description: "Keep conversations moving after the first interaction.",
    points: [
      "Follow up with leads",
      "Re-engage customers",
      "Send reminders",
      "Continue previous conversations",
      "Identify opportunities that need attention",
    ],
  },
];

export function AgentCapabilitiesSection() {
  return (
    <section className="border-b border-border">
      <Container className="py-20 sm:py-28">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map(({ title, icon: Icon, description, points }, i) => (
            <Reveal
              key={title}
              delay={(i % 3) * 0.06}
              className="h-full rounded-2xl border border-border p-6 transition-colors hover:border-border-strong sm:p-7"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-accent">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <h3 className="mt-4 text-base font-medium">{title}</h3>
              <p className="mt-2 text-sm text-foreground-muted">{description}</p>

              <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className="text-foreground-muted">{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
