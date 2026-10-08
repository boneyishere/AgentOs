import { Check } from "lucide-react";
import { Container } from "./container";
import { AgentButton } from "./agent-button";
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
    cta: "Get your agent",
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
    cta: "Get your agent",
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
    cta: "Get your agent",
    highlighted: false,
  },
  {
    name: "Advanced",
    price: "$1,499",
    period: "/mo",
    description: "For established businesses running Bonie as their primary front line.",
    features: [
      "Up to 5,000 AI call minutes",
      "Up to 12,000 chatbot conversations",
      "8 concurrent voice channels",
      "Custom tools & data source connections",
      "Dedicated account manager",
      "White-glove onboarding",
    ],
    cta: "Get your agent",
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
    cta: "Talk to our team",
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
                className={`spotlight flex h-full flex-col rounded-2xl border p-8 ${
                  tier.highlighted ? "border-transparent" : "border-border"
                }`}
              >
                {tier.highlighted && (
                  <>
                    <span aria-hidden="true" className="tier-glow-haze">
                      <span className="tier-glow" />
                    </span>
                    <span aria-hidden="true" className="tier-glow" />
                  </>
                )}
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-medium">{tier.name}</h3>
                  {tier.highlighted && (
                    <span className="flex shrink-0 items-center gap-2 text-xs font-medium text-foreground">
                      <span aria-hidden="true" className="flex h-3.5 items-center gap-[2px]">
                        {[0.9, 1.15, 0.8, 1.05].map((s, j) => (
                          <span
                            key={j}
                            className="tier-voice-bar h-full w-[2px] rounded-full bg-accent"
                            style={{ animationDuration: `${s}s` }}
                          />
                        ))}
                      </span>
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

                <AgentButton
                  href="/contact"
                  tone={tier.highlighted ? "dark" : "outline"}
                  className="mt-8 w-full"
                >
                  {tier.cta}
                </AgentButton>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
