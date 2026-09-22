import { Boxes, Building2, Globe, MessageCircle, Phone } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { TextReveal } from "@/lib/motion/text-reveal";

const CHANNELS = [
  {
    title: "Phone",
    icon: Phone,
    description: "Your AI can answer and make calls.",
    items: ["Reception", "Sales calls", "Support", "Appointment booking", "Follow-ups"],
    span: "lg:col-span-2",
  },
  {
    title: "Website",
    icon: Globe,
    description: "Put an AI agent directly on your website.",
    items: [
      "Customer questions",
      "Lead qualification",
      "Product/service enquiries",
      "Recommendations",
      "Support",
    ],
    span: "lg:col-span-2",
  },
  {
    title: "Messaging",
    icon: MessageCircle,
    description: "Meet customers in the channels they already use.",
    items: ["Enquiries", "Support", "Follow-ups", "Notifications", "Customer communication"],
    span: "lg:col-span-2",
  },
  {
    title: "Internal Operations",
    icon: Building2,
    description: "Agents don't only need to talk to customers — they can support internal teams with:",
    items: [
      "Information retrieval",
      "Internal requests",
      "Workflow triggers",
      "Notifications",
      "Administrative tasks",
    ],
    span: "lg:col-span-3",
  },
  {
    title: "Business Systems",
    icon: Boxes,
    description: "Connect the agent to the systems your business already uses.",
    items: ["CRM", "Calendar", "Booking systems", "Helpdesk", "Database", "Custom software", "APIs"],
    span: "lg:col-span-3",
  },
];

export function DeploymentSection() {
  return (
    <section className="border-b border-border">
      <Container className="py-20 sm:py-28">
        <div className="max-w-xl">
          <TextReveal className="text-3xl font-medium tracking-tight sm:text-4xl">
            Everywhere your agent can work.
          </TextReveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-lg text-foreground-muted">
              Not tied to a single channel — your AI agent shows up on the phone, your
              website, messaging apps, and the systems your team already runs on.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-6">
          {CHANNELS.map(({ title, icon: Icon, description, items, span }, i) => (
            <Reveal
              key={title}
              delay={(i % 3) * 0.06}
              className={`bg-background p-6 sm:p-7 ${span}`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-accent">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <h3 className="mt-4 text-base font-medium">{title}</h3>
              <p className="mt-2 text-sm text-foreground-muted">{description}</p>

              <ul className="mt-5 space-y-2 border-t border-border pt-5">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground-muted">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {item}
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
