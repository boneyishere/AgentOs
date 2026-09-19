"use client";

import { useState, type FormEvent } from "react";
import { Container } from "./container";
import { Reveal } from "./reveal";

const STEPS = [
  "We review what you share about your business",
  "A specialist reaches out within one business day",
  "We set up a personalized walkthrough of Codely",
];

export function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="border-b border-border">
      <Container className="grid grid-cols-1 gap-16 py-20 sm:py-28 lg:grid-cols-[1fr_0.8fr]">
        <Reveal>
          {submitted ? (
            <div className="rounded-2xl border border-border bg-surface p-8">
              <p className="text-lg font-medium">Thanks — we&apos;ll be in touch.</p>
              <p className="mt-2 text-sm text-foreground-muted">
                A specialist will reach out within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Work email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="text-sm font-medium text-foreground">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
                />
              </div>

              <div>
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  What are you hoping to solve?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
              >
                Send message
              </button>
            </form>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-foreground-muted">
            What happens next
          </p>
          <ol className="mt-5 space-y-5">
            {STEPS.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="font-[family-name:var(--font-mono)] text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-foreground-muted">{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-10 border-t border-border pt-6">
            <p className="text-sm text-foreground-muted">Prefer email?</p>
            <a
              href="mailto:hello@codely.ai"
              className="mt-1 inline-block text-sm font-medium text-foreground hover:text-accent"
            >
              hello@codely.ai
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
