import { Check, Minus } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { TextReveal } from "@/lib/motion/text-reveal";

type CellValue = string | boolean;
type Row = { label: string; values: [CellValue, CellValue, CellValue, CellValue, CellValue] };

const ROWS: Row[] = [
  { label: "Price / month", values: ["$49", "$399", "$799", "$1,499", "Contact Us"] },
  {
    label: "AI call minutes",
    values: ["Up to 100", "Up to 1,200", "Up to 2,500", "Up to 5,000", "Scoped to you"],
  },
  {
    label: "Chatbot conversations",
    values: ["Up to 200", "Up to 3,000", "Up to 6,000", "Up to 12,000", "Scoped to you"],
  },
  {
    label: "Concurrent voice channels",
    values: ["1", "2", "4", "8", "Scoped to you"],
  },
  {
    label: "Appointment booking & calendar sync",
    values: [true, true, true, true, true],
  },
  { label: "Human handoff", values: [false, true, true, true, true] },
  { label: "Knowledge base setup", values: [true, true, true, true, true] },
  { label: "Automated follow-ups", values: [false, true, true, true, true] },
  { label: "Multilingual support", values: [false, true, true, true, true] },
  { label: "CRM & calendar integrations", values: [false, false, true, true, true] },
  { label: "Custom workflows & webhooks", values: [false, false, true, true, true] },
  { label: "Priority handoff routing", values: [false, false, true, true, true] },
  { label: "Custom tools & data sources", values: [false, false, false, true, true] },
  { label: "Dedicated account manager", values: [false, false, false, true, true] },
  { label: "White-glove onboarding", values: [false, false, false, true, true] },
  {
    label: "Bespoke build & scoped engagement",
    values: [false, false, false, false, true],
  },
];

const COLUMNS = ["Starter", "Growth", "Pro", "Advanced", "Custom"];

function Cell({ value }: { value: CellValue }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto h-4 w-4 text-accent" />
    ) : (
      <Minus className="mx-auto h-4 w-4 text-foreground-muted/40" />
    );
  }
  return <span className="text-sm text-foreground">{value}</span>;
}

export function PricingComparisonTable() {
  return (
    <section className="border-b border-border bg-surface">
      <Container className="py-20 sm:py-28">
        <TextReveal className="max-w-xl text-3xl font-medium tracking-tight sm:text-4xl">
          Compare plans
        </TextReveal>

        <Reveal delay={0.1} className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="py-4 pr-4 text-sm font-medium text-foreground-muted">Feature</th>
                {COLUMNS.map((col) => (
                  <th key={col} className="px-4 py-4 text-center text-sm font-medium text-foreground">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} className="border-b border-border">
                  <td className="py-4 pr-4 text-sm text-foreground-muted">{row.label}</td>
                  {row.values.map((value, i) => (
                    <td key={i} className="px-4 py-4 text-center">
                      <Cell value={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Container>
    </section>
  );
}
