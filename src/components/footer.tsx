import Link from "next/link";
import { Container } from "./container";

const COLUMNS = [
  {
    title: "Platform",
    links: ["AI Chat Agents", "AI Voice Agents", "Knowledge Base / RAG", "AI Models"],
  },
  {
    title: "Solutions",
    links: [
      "Customer Support",
      "Sales & Lead Qualification",
      "Appointment Booking",
      "Call Automation",
    ],
  },
  {
    title: "Resources",
    links: ["Documentation", "Use Cases", "Blog"],
  },
  {
    title: "Company",
    links: ["About", "Contact"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          <div className="col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 font-[family-name:var(--font-heading)] text-lg font-semibold tracking-tight"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-sm font-bold text-background">
                A
              </span>
              AgentOS
            </Link>
            <p className="mt-3 max-w-xs text-sm text-foreground-muted">
              One AI brain. Multiple channels. Chat and voice agents for
              support, sales, and communication.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-foreground-muted">
            &copy; {new Date().getFullYear()} AgentOS. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-foreground-muted">
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
