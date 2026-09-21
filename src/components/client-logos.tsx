import { Container } from "./container";
import { Reveal } from "./reveal";

// Illustrative placeholder clients — no real customer data exists yet.
const LOGOS = [
  "Northwind Retail",
  "Harbor & Vale",
  "Attic Studio",
  "Ferrow Logistics",
  "Bellcastle Clinics",
  "Loomis & Rye",
];

export function ClientLogos() {
  return (
    <section className="border-b border-border">
      <Container className="py-14 sm:py-16">
        <Reveal className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <p className="text-xs uppercase tracking-[0.16em] text-foreground-muted">
            Trusted by teams building better customer experiences
          </p>

          <ul className="flex flex-wrap items-center gap-x-10 gap-y-4">
            {LOGOS.map((name) => (
              <li
                key={name}
                className="text-base font-semibold tracking-tight text-foreground/40 grayscale transition-opacity hover:text-foreground hover:opacity-100"
              >
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
