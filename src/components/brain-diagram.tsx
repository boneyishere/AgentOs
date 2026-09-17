import { BookOpen, Brain, MessageSquare, Phone, Settings2, Wrench } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";

const INPUTS = [
  { label: "Knowledge", icon: BookOpen },
  { label: "AI Models", icon: Brain },
  { label: "Instructions", icon: Settings2 },
  { label: "Memory", icon: MessageSquare },
  { label: "Tools", icon: Wrench },
];

export function BrainDiagram() {
  return (
    <section id="platform" className="border-b border-border bg-surface">
      <Container className="py-20 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-medium tracking-tight sm:text-4xl">
            One AI brain.{" "}
            <span className="text-primary">Multiple channels.</span>
          </h2>
          <p className="mt-4 text-lg text-foreground-muted">
            Every AgentOS agent draws from the same knowledge, models,
            instructions, memory, and tools — then speaks it through chat or
            voice.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-16 flex flex-col items-center">
          <div className="grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-5">
            {INPUTS.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background px-3 py-5 text-center shadow-sm"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-primary">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span className="text-sm font-medium text-foreground">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="my-3 h-8 w-px bg-border" aria-hidden="true" />

          <div className="rounded-xl border border-primary/20 bg-primary px-8 py-4 text-center shadow-md">
            <span className="font-[family-name:var(--font-heading)] text-base font-medium text-primary-foreground">
              AI Agent
            </span>
          </div>

          <div className="my-3 h-8 w-px bg-border" aria-hidden="true" />

          <div className="flex gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-4 shadow-sm">
              <MessageSquare className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Chat</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-4 shadow-sm">
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Voice</span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
