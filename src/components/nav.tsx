"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "./container";
import { gsap } from "@/lib/motion/gsap-setup";
import { useGsapContext } from "@/lib/motion/use-gsap-context";

const NAV_LINKS = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const headerRef = useGsapContext<HTMLElement>((_ctx, el, reducedMotion) => {
    let scrolled = false;

    const applyState = (isScrolled: boolean, animate: boolean) => {
      const vars = {
        height: isScrolled ? 60 : 76,
        // Fully opaque — no backdrop-filter. `position: sticky` combined
        // with `backdrop-filter` is a known source of compositing glitches
        // on some mobile browsers/GPUs, where the blur ends up applied to a
        // stale snapshot of already-scrolled-past content instead of
        // updating live, showing old text "frozen" behind the bar. A solid
        // background sidesteps that class of bug entirely.
        backgroundColor: isScrolled ? "var(--background)" : "rgba(255,255,255,0)",
        borderBottomColor: isScrolled ? "var(--border)" : "rgba(0,0,0,0)",
      };
      if (animate && !reducedMotion) {
        gsap.to(el, { ...vars, duration: 0.3, ease: "power2.out" });
      } else {
        gsap.set(el, vars);
      }
    };

    const onScroll = () => {
      const next = window.scrollY > 24;
      if (next !== scrolled) {
        scrolled = next;
        applyState(next, true);
      }
    };

    applyState(false, false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 flex items-center border-b border-transparent"
    >
      <Container className="flex w-full items-center justify-between">
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
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {open && (
        <div className="absolute inset-x-0 top-full border-t border-border bg-background px-4 py-4 md:hidden">
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
    </header>
  );
}
