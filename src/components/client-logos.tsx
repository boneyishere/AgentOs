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

function LogoRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-x-14 pr-14">
      {LOGOS.map((name) => (
        <li
          key={name}
          className="whitespace-nowrap text-lg font-semibold tracking-tight text-foreground/35 transition-colors duration-300 hover:text-foreground"
        >
          {name}
        </li>
      ))}
    </ul>
  );
}

export function ClientLogos() {
  return (
    <section className="border-b border-border">
      <Container className="py-14 sm:py-16">
        <Reveal className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-14">
          <p className="shrink-0 text-sm text-foreground-muted lg:max-w-[14rem]">
            Trusted by teams building better customer experiences
          </p>

          <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="flex w-max animate-[marquee_38s_linear_infinite] group-hover:[animation-play-state:paused]">
              <LogoRow />
              <LogoRow hidden />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
