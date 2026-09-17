import Link from "next/link";
import { ArrowRight, Bot, Phone } from "lucide-react";
import { DiamondPattern } from "./diamond-pattern";
import { Container } from "./container";
import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section className="border-b border-border">
      <Container className="grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-8 lg:py-28">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            An AI agent platform for support, sales &amp; communication
          </div>

          <h1 className="mt-6 font-[family-name:var(--font-heading)] text-4xl font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
            One AI brain.
            <br />
            <span className="text-primary">Every conversation.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg text-foreground-muted">
            Build AI chat and voice agents that answer questions, qualify
            leads, and resolve issues end to end — powered by your knowledge,
            your models, and one shared memory across every channel.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#get-started"
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Build an AI Agent
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#demo"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium transition-colors hover:bg-surface"
            >
              Get a demo
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-foreground-muted">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-primary" />
              Chat agents
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              Voice agents
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-primary sm:aspect-[5/4] lg:aspect-[4/5]">
            <DiamondPattern className="absolute inset-0" />

            <div className="absolute inset-x-4 top-6 rounded-xl border border-white/10 bg-white/95 p-4 shadow-xl backdrop-blur sm:inset-x-8 sm:p-5">
              <div className="flex items-center gap-2 border-b border-border pb-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background">
                  <Bot className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    AgentOS &mdash; Support
                  </p>
                  <p className="text-xs text-foreground-muted">
                    Online &middot; replies instantly
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-surface px-3 py-2 text-sm text-foreground">
                  Can I move my appointment to Thursday?
                </div>
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-foreground px-3 py-2 text-sm text-background">
                  Sure — I found your booking for Tuesday at 2 PM. I moved it
                  to Thursday at 2 PM and sent a confirmation.
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-foreground-muted">
                <span className="rounded-full bg-surface px-2 py-1 font-medium text-foreground">
                  Qualified
                </span>
                <span>Classified as Appointment Booking</span>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
