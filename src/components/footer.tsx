import Link from "next/link";
import { Container } from "./container";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Resources",
    links: [{ label: "Resources", href: "/resources" }],
  },
  {
    title: "Company",
    links: [{ label: "Contact", href: "/contact" }],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 border-b border-border pb-12 sm:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-sm font-bold text-background">
                C
              </span>
              <span className="text-lg font-semibold tracking-tight">Codely</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-foreground-muted">
              AI agents for the conversations that move your business forward —
              voice-first, chat-supported.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex w-fit items-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              Book a Demo
            </Link>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-medium text-foreground">{column.title}</p>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <span className="font-[family-name:var(--font-mono)] text-xs text-foreground-muted">
            &copy; {new Date().getFullYear()} Codely
          </span>
          <div className="flex gap-6 font-[family-name:var(--font-mono)] text-xs text-foreground-muted">
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
