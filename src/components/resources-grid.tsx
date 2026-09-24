"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { ResourceCover } from "./resource-cover";
import { RESOURCES } from "@/content/resources";

const FILTERS = ["All", "Article", "Case Study"] as const;

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ResourcesGrid() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const items =
    filter === "All" ? RESOURCES : RESOURCES.filter((r) => r.category === filter);

  return (
    <section className="border-b border-border">
      <Container className="py-20 sm:py-28">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                filter === f
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-foreground-muted hover:border-border-strong"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.slug} delay={(i % 3) * 0.06}>
              <Link
                href={`/resources/${item.slug}`}
                className="spotlight group flex h-full flex-col overflow-hidden rounded-2xl border border-border transition-colors hover:border-border-strong"
              >
                <ResourceCover
                  color={item.image.color}
                  icon={item.image.icon}
                  className="aspect-[16/10] w-full transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs text-foreground-muted">{item.category}</span>
                  <h3 className="mt-4 text-lg font-medium tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-foreground-muted">
                    {item.excerpt}
                  </p>
                  <div className="mt-6 flex items-center justify-between text-xs text-foreground-muted">
                    <time dateTime={item.date}>{formatDate(item.date)}</time>
                    <span className="inline-flex items-center gap-1 font-medium text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                      Read
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
