import Link from "next/link";
import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";
import { Container } from "./container";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    title: "Company",
    links: [{ label: "Contact", href: "/contact" }],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Notice", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

const SOCIALS = [
  { label: "Facebook", href: "#", Icon: SiFacebook },
  { label: "Instagram", href: "#", Icon: SiInstagram },
];

export function Footer() {
  return (
    // The hairlines here are full-bleed: each rule sits on a full-width
    // wrapper, and only the content inside keeps the page's container width.
    <footer className="border-t-[0.5px] border-border">
      <Container className="grid grid-cols-2 gap-10 py-16 sm:grid-cols-5">
        <div className="col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-sm font-bold text-background">
              C
            </span>
            <span className="text-lg font-semibold tracking-tight">Codely</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-foreground-muted">
            Voice and chat agents that pick up, look things up, and get the job done for
            your customers.
          </p>
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
      </Container>

      <div className="grid grid-cols-2 border-y-[0.5px] border-border">
        {SOCIALS.map(({ label, href, Icon }, i) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className={`flex items-center justify-center py-6 text-foreground-muted transition-colors hover:text-foreground ${
              i > 0 ? "border-l-[0.5px] border-border" : ""
            }`}
          >
            <Icon size={18} aria-hidden="true" />
          </a>
        ))}
      </div>

      <Container className="flex flex-col items-start gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-xs text-foreground-muted">
          &copy; {new Date().getFullYear()} Codely. All rights reserved.
        </span>

        <a
          href="https://codixel.tech"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-foreground-muted"
        >
          Backed by <span className="font-semibold text-foreground">Codixel</span>
        </a>
      </Container>
    </footer>
  );
}
