import {
  Blocks,
  Brain,
  Globe2,
  History,
  UserCheck,
  Wand2,
} from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";

const CAPABILITIES = [
  {
    title: "Bring your own model",
    description:
      "Power agents with OpenAI GPT, Google Gemini, Anthropic Claude, or open-source models.",
    icon: Brain,
  },
  {
    title: "Custom instructions",
    description:
      "Set system prompts, business rules, tone, conversation goals, and escalation rules per agent.",
    icon: Wand2,
  },
  {
    title: "Conversation memory",
    description:
      "Agents remember prior conversations and calls, so context carries across every interaction.",
    icon: History,
  },
  {
    title: "Multilingual by default",
    description:
      "Multilingual chat, speech recognition, responses, and text-to-speech out of the box.",
    icon: Globe2,
  },
  {
    title: "Human handoff",
    description:
      "Escalate complex or sensitive conversations to a human agent without losing context.",
    icon: UserCheck,
  },
  {
    title: "Deploy anywhere",
    description:
      "Website chat widget, web voice integration, and third-party integrations.",
    icon: Blocks,
  },
];

export function CapabilitiesGrid() {
  return (
    <section className="border-b border-border">
      <Container className="py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-medium tracking-tight sm:text-4xl">
            Everything an agent needs
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map(({ title, description, icon: Icon }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.08}>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-heading)] text-base font-medium">
                {title}
              </h3>
              <p className="mt-2 text-sm text-foreground-muted">
                {description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
