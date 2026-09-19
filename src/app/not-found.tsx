import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <section className="border-b border-border">
          <Container className="py-32 text-center sm:py-40">
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-foreground-muted">
              404
            </p>
            <h1 className="mx-auto mt-6 max-w-xl text-4xl font-medium tracking-tight sm:text-5xl">
              This page doesn&apos;t exist.
            </h1>
            <p className="mx-auto mt-5 max-w-md text-lg text-foreground-muted">
              The page you&apos;re looking for may have moved or never existed.
            </p>
            <Link
              href="/"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              Back to home
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
