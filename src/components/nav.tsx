"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "./container";

const NAV_LINKS = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Reserves the fixed header's flow height so page content isn't
          covered by it. Kept separate from the header instead of using
          `position: sticky`, since sticky + backdrop-filter is a known
          source of compositing glitches on some mobile GPUs. */}
      <div aria-hidden="true" className="h-[88px]" />

      <header className="fixed inset-x-0 top-4 z-50">
        <Container>
          {/* `backdrop-filter` on an always-visible fixed element is also a
              known source of ghosting on mobile GPUs, independent of
              `position: sticky` — the blur can render against a stale
              snapshot while the browser's own toolbar is animating. Keep
              the pill fully opaque below `lg`, and only turn on the glass
              effect at desktop widths where this doesn't happen. */}
          <div className="relative flex items-center justify-between rounded-full border border-white/50 bg-white px-6 py-2.5 shadow-[0_8px_30px_rgba(26,26,26,0.08)] lg:bg-white/70 lg:backdrop-blur-xl lg:backdrop-saturate-150">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-foreground text-xs font-bold text-background">
                C
              </span>
              <span className="text-base font-semibold tracking-tight">Codely</span>
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative text-sm font-medium transition-colors hover:text-foreground ${
                      isActive ? "text-foreground" : "text-foreground-muted"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 group-hover:w-full ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:block">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-85"
              >
                Book a Demo
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {open && (
              <div className="absolute inset-x-0 top-full mt-2 rounded-3xl border border-white/50 bg-white px-4 py-4 shadow-[0_8px_30px_rgba(26,26,26,0.08)] md:hidden">
                <nav className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => {
                    const isActive =
                      pathname === link.href || pathname.startsWith(`${link.href}/`);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                        className={`rounded-md px-3 py-2.5 text-sm font-medium hover:bg-surface hover:text-foreground ${
                          isActive ? "text-foreground" : "text-foreground-muted"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="mt-2 rounded-full bg-foreground px-4 py-2.5 text-center text-sm font-medium text-background"
                  >
                    Book a Demo
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </Container>
      </header>
    </>
  );
}
