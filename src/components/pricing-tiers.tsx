import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";

const TIERS = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    description: "For a solo business testing AI-answered calls and chat for the first time.",
    features: [
      "Up to 100 AI call minutes",
      "Up to 200 chatbot conversations",
      "1 concurrent voice channel",
      "Appointment booking & calendar sync",
      "Business knowledge base setup",
    ],
    cta: "Book a Demo",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$399",
    period: "/mo",
    description: "For growing businesses handling steady call and message volume.",
    features: [
      "Up to 1,200 AI call minutes",
      "Up to 3,000 chatbot conversations",
      "2 concurrent voice channels",
      "Human handoff when needed",
      "Automated follow-ups",
      "Multilingual support",
    ],
    cta: "Book a Demo",
    highlighted: true,
  },
  {
    name: "Pro",
    price: "$799",
    period: "/mo",
    description: "For multi-location or higher-volume businesses that need integrations.",
    features: [
      "Up to 2,500 AI call minutes",
      "Up to 6,000 chatbot conversations",
      "4 concurrent voice channels",
      "CRM & calendar integrations",
      "Custom workflows & webhooks",
      "Priority human handoff routing",
    ],
    cta: "Book a Demo",
    highlighted: false,
  },
  {
    name: "Advanced",
    price: "$1,499",
    period: "/mo",
    description: "For established businesses running Codely as their primary front line.",
    features: [
      "Up to 5,000 AI call minutes",
      "Up to 12,000 chatbot conversations",
      "8 concurrent voice channels",
      "Custom tools & data source connections",
      "Dedicated account manager",
      "White-glove onboarding",
    ],
    cta: "Book a Demo",
    highlighted: false,
  },
  {
    name: "Custom",
    price: "Contact Us",
    period: "",
    description: "For call volume, integrations, or workflow needs outside the standard tiers.",
    features: [
      "No fixed minutes, conversation, or channel caps",
      "Dedicated solutions call to map your requirements",
      "Custom integrations with your phone system, CRM, or tools",
      "Negotiated pricing based on scope",
      "Direct, ongoing point of contact",
    ],
    cta: "Contact Us",
    highlighted: false,
  },
];

export function PricingTiers() {
  return (
    <section className="border-b border-border">
      <Container className="py-20 sm:py-28">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={(i % 3) * 0.08} className="h-full">
              <div
                className={`flex h-full flex-col rounded-2xl border p-8 ${
                  tier.highlighted ? "border-foreground" : "border-border"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-medium">{tier.name}</h3>
                  {tier.highlighted && (
                    <span className="w-fit shrink-0 rounded-full bg-accent px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-accent-foreground">
                      Most popular
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-foreground-muted">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-medium tracking-tight">{tier.price}</span>
                  {tier.period && (
                    <span className="text-sm text-foreground-muted">{tier.period}</span>
                  )}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-foreground-muted">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-opacity hover:opacity-85 ${
                    tier.highlighted
                      ? "bg-foreground text-background"
                      : "border border-border text-foreground"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-sm text-foreground-muted">
            All plans: no setup fee, cancel anytime, dedicated onboarding call included. Minutes
            and conversations beyond a plan&apos;s included volume are billed at a flat overage rate.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
