import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";

const TIERS = [
  {
    name: "Starter",
    price: "$199",
    period: "/mo",
    description: "For small teams launching their first AI agent.",
    features: ["1 AI agent", "Chat + voice (500 minutes/mo)", "1 knowledge base", "Email support"],
    cta: "Book a Demo",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$599",
    period: "/mo",
    description: "For growing teams running agents across channels.",
    features: [
      "3 AI agents",
      "Chat + voice (2,500 minutes/mo)",
      "Unlimited knowledge bases",
      "CRM & calendar integrations",
      "Priority support",
    ],
    cta: "Book a Demo",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For companies with complex, high-volume needs.",
    features: [
      "Unlimited agents",
      "Custom voice volume",
      "Dedicated infrastructure",
      "SSO & advanced security",
      "Dedicated success manager",
    ],
    cta: "Talk to Sales",
    highlighted: false,
  },
];

export function PricingTiers() {
  return (
    <section className="border-b border-border">
      <Container className="py-20 sm:py-28">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08} className="h-full">
              <div
                className={`flex h-full flex-col rounded-2xl border p-8 ${
                  tier.highlighted ? "border-foreground" : "border-border"
                }`}
              >
                {tier.highlighted && (
                  <span className="mb-4 w-fit rounded-full bg-foreground px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-background">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-medium">{tier.name}</h3>
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
      </Container>
    </section>
  );
}
