"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Wifi } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { TextReveal } from "@/lib/motion/text-reveal";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap-setup";
import { useGsapContext } from "@/lib/motion/use-gsap-context";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";

type Industry = {
  slug: string;
  eyebrow: string;
  headline: string;
  description: string;
  capabilities: [string, string, string, string];
  cta: string;
  /** null until real photography is supplied — renders an abstract placeholder instead. */
  image: string | null;
};

const INDUSTRIES: Industry[] = [
  {
    slug: "healthcare",
    eyebrow: "Healthcare",
    headline: "Give every patient a faster first response.",
    description:
      "Codely can handle appointment requests, common questions, information collection, and routine conversations while keeping your team in control.",
    capabilities: [
      "Appointment requests",
      "Patient questions",
      "Information collection",
      "Call routing",
    ],
    cta: "Explore Healthcare AI",
    image: "/images/industries/healthcare.jpg",
  },
  {
    slug: "isp",
    eyebrow: "ISP Providers",
    headline: "Keep customers connected without keeping your team on the phone.",
    description:
      "Codely can handle customer questions, service enquiries, troubleshooting conversations, plan information, and support requests around the clock.",
    capabilities: [
      "Customer support",
      "Service enquiries",
      "Troubleshooting",
      "Plan information",
    ],
    cta: "Explore ISP AI",
    image: null,
  },
  {
    slug: "home-services",
    eyebrow: "Home Services",
    headline: "Turn incoming calls into booked jobs.",
    description:
      "Codely can understand what customers need, collect job details, answer questions, and schedule appointments.",
    capabilities: ["Answer calls", "Understand the job", "Collect details", "Book appointments"],
    cta: "Explore Home Services AI",
    image: "/images/industries/home-services.jpg",
  },
  {
    slug: "education",
    eyebrow: "Education",
    headline: "Make every student enquiry easier to handle.",
    description:
      "Codely can answer questions, handle admissions enquiries, collect information, schedule calls, and guide students through common requests.",
    capabilities: [
      "Student enquiries",
      "Admissions questions",
      "Information collection",
      "Appointment booking",
    ],
    cta: "Explore Education AI",
    image: "/images/industries/education.jpg",
  },
  {
    slug: "automotive",
    eyebrow: "Automotive",
    headline: "Keep customers moving from enquiry to appointment.",
    description:
      "Codely can handle vehicle enquiries, service requests, appointment scheduling, and customer follow-ups.",
    capabilities: ["Vehicle enquiries", "Service requests", "Appointment booking", "Follow-ups"],
    cta: "Explore Automotive AI",
    image: "/images/industries/automotive.jpg",
  },
  {
    slug: "law-firms",
    eyebrow: "Law Firms",
    headline: "Handle the first conversation before it reaches your team.",
    description:
      "Codely can collect initial information, answer common questions, understand the purpose of an enquiry, and schedule consultations.",
    capabilities: [
      "Initial enquiries",
      "Information collection",
      "Qualification",
      "Consultation booking",
    ],
    cta: "Explore Legal AI",
    image: "/images/industries/law-firms.jpg",
  },
  {
    slug: "real-estate",
    eyebrow: "Real Estate",
    headline: "Turn every property enquiry into a real conversation.",
    description:
      "Codely can answer property enquiries, qualify buyers and sellers, answer common questions, schedule viewings, and follow up with leads.",
    capabilities: ["Answer enquiries", "Qualify leads", "Schedule viewings", "Follow up"],
    cta: "Explore Real Estate AI",
    image: "/images/industries/real-estate.jpg",
  },
  {
    slug: "restaurants",
    eyebrow: "Restaurants",
    headline: "Keep every guest conversation moving.",
    description:
      "Codely can handle reservations, menu questions, booking requests, customer enquiries, and everyday guest conversations without tying up your staff.",
    capabilities: ["Reservations", "Guest questions", "Booking requests", "Customer support"],
    cta: "Explore Restaurant AI",
    image: "/images/industries/restaurants.jpg",
  },
  {
    slug: "hospitality",
    eyebrow: "Hospitality",
    headline: "Make every guest conversation effortless.",
    description:
      "Codely can handle reservations, guest questions, booking requests, and everyday customer conversations around the clock.",
    capabilities: ["Reservations", "Guest questions", "Booking requests", "Customer support"],
    cta: "Explore Hospitality AI",
    image: "/images/industries/hospitality.jpg",
  },
];

const TOTAL = INDUSTRIES.length;
const VH_PER_CHAPTER = 0.9;

function IndustryVisual({ item, active }: { item: Industry; active: boolean }) {
  return (
    <div
      className={`absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-out ${
        active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
      }`}
    >
      {item.image ? (
        <Image
          src={item.image}
          alt={item.eyebrow}
          fill
          sizes="(min-width: 1024px) 700px, 100vw"
          priority={item.slug === "healthcare"}
          className="object-cover"
        />
      ) : (
        <div className="relative flex h-full w-full items-center justify-center bg-surface">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 30%, var(--accent-soft), transparent 60%)",
            }}
          />
          <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-foreground text-background">
            <Wifi className="h-8 w-8" />
          </span>
        </div>
      )}
    </div>
  );
}

function IndustryCapabilities({ item }: { item: Industry }) {
  return (
    <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
      {item.capabilities.map((capability) => (
        <li key={capability} className="flex items-start gap-2 text-sm">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <span className="text-foreground-muted">{capability}</span>
        </li>
      ))}
    </ul>
  );
}

function IndustryCta({ item }: { item: Industry }) {
  return (
    <Link
      href="/contact"
      className="group mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
    >
      {item.cta}
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

/** Desktop-only, motion-safe: the pinned scroll-driven story. */
function IndustriesStory() {
  const [index, setIndex] = useState(0);
  const textRef = useRef<HTMLDivElement | null>(null);

  const pinRef = useGsapContext<HTMLDivElement>((_ctx, el, reducedMotion) => {
    if (reducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${window.innerHeight * VH_PER_CHAPTER * TOTAL}`,
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        onUpdate: (self) => {
          const next = Math.min(TOTAL - 1, Math.floor(self.progress * TOTAL));
          setIndex((prev) => (prev === next ? prev : next));
        },
      });

      return () => trigger.kill();
    });

    return () => mm.revert();
  }, []);

  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = textRef.current;
    if (!el || reducedMotion) return;
    gsap.fromTo(el, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" });
  }, [index, reducedMotion]);

  const active = INDUSTRIES[index];

  return (
    <Container
      ref={pinRef}
      className="relative hidden h-screen items-center motion-safe:lg:flex"
    >
      <div className="grid w-full grid-cols-[45fr_55fr] items-center gap-16">
        <div ref={textRef} className="max-w-md">
          <p className="text-xs uppercase tracking-[0.16em] text-foreground-muted">
            {active.eyebrow}
          </p>
          <h3 className="mt-4 text-3xl font-medium leading-snug tracking-tight">
            {active.headline}
          </h3>
          <p className="mt-4 text-sm text-foreground-muted">{active.description}</p>
          <IndustryCapabilities item={active} />
          <IndustryCta item={active} />
        </div>

        <div className="relative h-[64vh] max-h-[600px] overflow-hidden rounded-2xl">
          {INDUSTRIES.map((item, i) => (
            <IndustryVisual key={item.slug} item={item} active={i === index} />
          ))}
        </div>
      </div>
    </Container>
  );
}

/** Mobile / reduced-motion fallback: a plain stacked list, no scroll-jacking. */
function IndustriesList() {
  return (
    <Container className="block space-y-14 pb-20 motion-safe:lg:hidden sm:pb-28">
      {INDUSTRIES.map((item, i) => (
        <Reveal key={item.slug} delay={(i % 3) * 0.06} className="border-t border-border pt-10">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <IndustryVisual item={item} active />
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.16em] text-foreground-muted">
            {item.eyebrow}
          </p>
          <h3 className="mt-3 text-2xl font-medium leading-snug tracking-tight">
            {item.headline}
          </h3>
          <p className="mt-3 max-w-lg text-sm text-foreground-muted">{item.description}</p>
          <IndustryCapabilities item={item} />
          <IndustryCta item={item} />
        </Reveal>
      ))}
    </Container>
  );
}

export function IndustriesSection() {
  return (
    <section className="border-b border-border">
      <Container className="pb-14 pt-20 sm:pb-16 sm:pt-28">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.16em] text-foreground-muted">Industries</p>
          <TextReveal className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
            Built around your business.
          </TextReveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-lg text-foreground-muted">
              Every business has different customers, conversations, and workflows.
              Codely adapts to the way your business works and gives your AI the
              context and capabilities to handle real work.
            </p>
          </Reveal>
        </div>
      </Container>

      {/* Exactly one of these two is visible at a time, purely via the
          complementary `motion-safe:lg:` CSS variants below — no viewport
          or prefers-reduced-motion branching in JS needed at this level. */}
      <IndustriesStory />
      <IndustriesList />
    </section>
  );
}
