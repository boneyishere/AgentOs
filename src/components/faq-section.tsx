"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { TextReveal } from "@/lib/motion/text-reveal";

const FAQS = [
  {
    q: "Will the AI sound like a real person?",
    a: "Codely's AI is designed for natural conversations. It can understand what customers are saying, respond in context, ask follow up questions, and keep the conversation moving naturally.",
  },
  {
    q: "Can it actually understand my business?",
    a: "Yes. We give your AI the information and context it needs to understand your business, including your services, products, policies, processes, and frequently asked questions.",
  },
  {
    q: "Can it take action, or does it just answer questions?",
    a: "It can do more than answer. Depending on what your business needs, it can qualify leads, book appointments, collect information, update systems, trigger actions, and hand conversations to your team.",
  },
  {
    q: "What happens when the AI doesn't know the answer?",
    a: "Your AI can be configured around your business rules and escalation process. When something needs human attention, it can hand the conversation to the right person instead of guessing.",
  },
  {
    q: "Can it work with the tools we already use?",
    a: "Codely can connect with the systems and tools your business relies on, so your AI can work as part of your existing workflow rather than sitting separately from it.",
  },
  {
    q: "Can you build something specifically for my business?",
    a: "Yes. Every business has different workflows, customers, and requirements. We can design and configure the AI around the work you actually need it to handle.",
  },
  {
    q: "How long does it take to get started?",
    a: "It depends on the complexity of the workflow, the systems involved, and what you want the AI to handle. We'll map out the requirements with you before getting started.",
  },
  {
    q: "Do I need to know anything about AI?",
    a: "No. You tell us what you want your AI to handle. We take care of the technology, setup, and integration.",
  },
  {
    q: "Does it work across voice and chat?",
    a: "Yes. The same AI agent can handle both voice calls and chat conversations, using a consistent understanding of your business across every channel.",
  },
  {
    q: "What does it cost to get started?",
    a: "Pricing depends on the channels, volume, and integrations your business needs. We'll put together a plan once we understand what you want the AI to handle.",
  },
];

function FaqItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof FAQS)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
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
          <p className="pb-5 pr-4 text-sm text-foreground-muted">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const half = Math.ceil(FAQS.length / 2);
  const columns = [FAQS.slice(0, half), FAQS.slice(half)];

  return (
    <section className="border-b border-border">
      <Container className="py-20 sm:py-28">
        <TextReveal className="text-3xl font-medium tracking-tight sm:text-4xl">
          Frequently asked questions
        </TextReveal>

        <div className="mt-10 grid grid-cols-1 border-t border-border sm:grid-cols-2 sm:divide-x sm:divide-border">
          {columns.map((column, colIndex) => (
            <div
              key={colIndex}
              className={`divide-y divide-border ${
                colIndex === 0
                  ? "sm:pr-10"
                  : "border-t border-border sm:border-t-0 sm:pl-10"
              }`}
            >
              {column.map((item, itemIndex) => {
                const i = colIndex * half + itemIndex;
                return (
                  <FaqItem
                    key={item.q}
                    item={item}
                    isOpen={open === i}
                    onToggle={() => setOpen(open === i ? null : i)}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-col items-start justify-between gap-5 rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:p-7">
            <div>
              <p className="text-lg font-medium tracking-tight">
                Still have questions?
              </p>
              <p className="mt-1.5 max-w-sm text-sm text-foreground-muted">
                Can&apos;t find the answer you&apos;re looking for? Our team is
                happy to walk through your specific use case.
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-border-strong"
            >
              Contact us
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
