"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "./container";
import { TextReveal } from "@/lib/motion/text-reveal";

const FAQS = [
  {
    q: "Which AI models does Codely support?",
    a: "Codely works with OpenAI GPT, Anthropic Claude, Google Gemini, and select open-source models — you can choose the best fit per agent, or let Codely pick automatically.",
  },
  {
    q: "Can I bring my own model or API key?",
    a: "Yes. Enterprise plans support bringing your own model provider and API keys for full control over cost and data handling.",
  },
  {
    q: "Does Codely work in multiple languages?",
    a: "Speech recognition, responses, and text-to-speech are multilingual out of the box, so the same agent can handle conversations in different languages.",
  },
  {
    q: "How does memory work across conversations?",
    a: "Agents recall prior conversations and calls tied to a customer, so context carries across channels instead of starting over every time.",
  },
  {
    q: "Can the agent hand off to a human?",
    a: "Yes — agents can escalate live calls or chats to a human teammate at any point, without losing the conversation's context.",
  },
  {
    q: "What integrations are available?",
    a: "Calendars, CRMs, Slack, Zapier, and custom API or webhook actions are supported, so agents can take real actions in the tools you already use.",
  },
  {
    q: "Is my data secure?",
    a: "Data is encrypted in transit and at rest, with role-based access control. Enterprise plans add SSO and dedicated infrastructure.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-b border-border">
      <Container className="py-20 sm:py-28">
        <TextReveal className="text-3xl font-medium tracking-tight sm:text-4xl">
          Frequently asked questions
        </TextReveal>

        <div className="mt-10 divide-y divide-border border-t border-border">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-medium">{item.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-foreground-muted transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0">
                    <p className="max-w-2xl pb-5 pr-10 text-sm text-foreground-muted">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
