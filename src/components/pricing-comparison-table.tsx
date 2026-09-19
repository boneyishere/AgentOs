import { Check, Minus } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { TextReveal } from "@/lib/motion/text-reveal";

type CellValue = string | boolean;

const ROWS: { label: string; values: [CellValue, CellValue, CellValue] }[] = [
  { label: "AI agents included", values: ["1", "3", "Unlimited"] },
  { label: "Voice minutes / month", values: ["500", "2,500", "Custom"] },
  { label: "Chat conversations", values: ["Unlimited", "Unlimited", "Unlimited"] },
  { label: "Knowledge bases", values: ["1", "Unlimited", "Unlimited"] },
  { label: "Conversation memory", values: [true, true, true] },
  { label: "CRM & calendar integrations", values: [false, true, true] },
  { label: "Custom API & webhooks", values: [false, true, true] },
  { label: "Conversation intelligence & analytics", values: [false, true, true] },
  { label: "Human handoff", values: [true, true, true] },
  { label: "SSO & advanced security", values: [false, false, true] },
  { label: "Dedicated success manager", values: [false, false, true] },
  { label: "Support", values: ["Email", "Priority", "Dedicated"] },
];

const COLUMNS = ["Starter", "Growth", "Enterprise"];

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
          <table className="w-full min-w-[640px] border-collapse text-left">
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
