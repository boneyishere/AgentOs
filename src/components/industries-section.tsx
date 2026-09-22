"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap-setup";
import { useGsapContext } from "@/lib/motion/use-gsap-context";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";

type Industry = {
  slug: string;
  eyebrow: string;
  headline: string;
  description: string;
  capabilities: [string, string, string, string];
  image: string;
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
    image: "/images/industries/healthcare-v2.jpg",
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
    image: "/images/industries/isp-v2.jpg",
  },
  {
    slug: "home-services",
    eyebrow: "Home Services",
    headline: "Turn incoming calls into booked jobs.",
    description:
      "Codely can understand what customers need, collect job details, answer questions, and schedule appointments.",
    capabilities: ["Answer calls", "Understand the job", "Collect details", "Book appointments"],
    image: "/images/industries/home-services-v2.jpg",
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
    image: "/images/industries/education-v2.jpg",
  },
  {
    slug: "automotive",
    eyebrow: "Automotive",
    headline: "Keep customers moving from enquiry to appointment.",
    description:
      "Codely can handle vehicle enquiries, service requests, appointment scheduling, and customer follow-ups.",
    capabilities: ["Vehicle enquiries", "Service requests", "Appointment booking", "Follow-ups"],
    image: "/images/industries/automotive-v2.jpg",
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
    image: "/images/industries/law-firms-v2.jpg",
  },
  {
    slug: "real-estate",
    eyebrow: "Real Estate",
    headline: "Turn every property enquiry into a real conversation.",
    description:
      "Codely can answer property enquiries, qualify buyers and sellers, answer common questions, schedule viewings, and follow up with leads.",
    capabilities: ["Answer enquiries", "Qualify leads", "Schedule viewings", "Follow up"],
    image: "/images/industries/real-estate-v2.jpg",
  },
  {
    slug: "restaurants",
    eyebrow: "Restaurants",
    headline: "Keep every guest conversation moving.",
    description:
      "Codely can handle reservations, menu questions, booking requests, customer enquiries, and everyday guest conversations without tying up your staff.",
    capabilities: ["Reservations", "Guest questions", "Booking requests", "Customer support"],
    image: "/images/industries/restaurants-v2.jpg",
  },
  {
    slug: "hospitality",
    eyebrow: "Hospitality",
    headline: "Make every guest conversation effortless.",
    description:
      "Codely can handle reservations, guest questions, booking requests, and everyday customer conversations around the clock.",
    capabilities: ["Reservations", "Guest questions", "Booking requests", "Customer support"],
    image: "/images/industries/hospitality-v2.jpg",
  },
];

const TOTAL = INDUSTRIES.length;
const VH_PER_CHAPTER = 0.9;

function IndustryVisual({
  item,
  active,
  direction = 1,
  animated = false,
}: {
  item: Industry;
  active: boolean;
  /** Scroll direction driving the reveal: 1 = forward (wipe up), -1 = backward (wipe down). */
  direction?: 1 | -1;
  /** Only the pinned desktop story drives a GSAP reveal; the static mobile list stays plain. */
  animated?: boolean;
}) {
  const maskRef = useRef<HTMLDivElement | null>(null);
  const scaleRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!animated) return;
    const mask = maskRef.current;
    const scale = scaleRef.current;
    if (!mask || !scale) return;

    if (reducedMotion) {
      gsap.set(mask, { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(scale, { scale: 1 });
      return;
    }

    if (!active) return;

    const from = direction === 1 ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)";

    gsap.killTweensOf([mask, scale]);
    gsap
      .timeline()
      .fromTo(
        mask,
        { clipPath: from },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.75, ease: "power2.out" },
        0
      )
      .fromTo(scale, { scale: 1.1 }, { scale: 1, duration: 0.85, ease: "power2.out" }, 0);
  }, [active, direction, animated, reducedMotion]);

  return (
    <div className="absolute inset-0" style={{ zIndex: active ? 2 : 1 }}>
      <div ref={maskRef} className="absolute inset-0 overflow-hidden">
        <div ref={scaleRef} className="absolute inset-0">
          <Image
            src={item.image}
            alt={item.eyebrow}
            fill
            sizes="(min-width: 1024px) 700px, 100vw"
            priority={item.slug === "healthcare"}
            className="object-cover"
          />
        </div>
      </div>
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

function IndustryCta() {
  return (
    <Link
      href="/contact"
      className="group mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
    >
      Book a Demo
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

function IndustryChip({ eyebrow }: { eyebrow: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border-strong bg-surface px-4 py-1.5 text-base font-medium tracking-tight text-foreground">
      {eyebrow}
    </span>
  );
}

/** Desktop-only, motion-safe: the pinned scroll-driven story. */
function IndustriesStory() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const prevIndexRef = useRef(0);
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
          if (next === prevIndexRef.current) return;
          setDirection(next > prevIndexRef.current ? 1 : -1);
          prevIndexRef.current = next;
          setIndex(next);
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
    gsap.killTweensOf(el.children);
    gsap.fromTo(
      el.children,
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.05 }
    );
  }, [index, reducedMotion]);

  const active = INDUSTRIES[index];

  return (
    <Container
      ref={pinRef}
      className="relative hidden h-screen items-center motion-safe:lg:flex"
    >
      <div className="grid w-full grid-cols-[45fr_55fr] items-center gap-16">
        <div ref={textRef} className="max-w-md">
          <IndustryChip eyebrow={active.eyebrow} />
          <h3 className="mt-4 text-3xl font-medium leading-snug tracking-tight">
            {active.headline}
          </h3>
          <p className="mt-4 text-sm text-foreground-muted">{active.description}</p>
          <IndustryCapabilities item={active} />
          <IndustryCta />
        </div>

        <div className="relative h-[64vh] max-h-[600px] overflow-hidden rounded-2xl">
          {INDUSTRIES.map((item, i) => (
            <IndustryVisual
              key={item.slug}
              item={item}
              active={i === index}
              direction={direction}
              animated
            />
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
          <div className="mt-6">
            <IndustryChip eyebrow={item.eyebrow} />
          </div>
          <h3 className="mt-3 text-2xl font-medium leading-snug tracking-tight">
            {item.headline}
          </h3>
          <p className="mt-3 max-w-lg text-sm text-foreground-muted">{item.description}</p>
          <IndustryCapabilities item={item} />
          <IndustryCta />
        </Reveal>
      ))}
    </Container>
  );
}

export function IndustriesSection() {
  return (
    <section className="border-b border-border pt-20 sm:pt-28">
      {/* Exactly one of these two is visible at a time, purely via the
          complementary `motion-safe:lg:` CSS variants below — no viewport
          or prefers-reduced-motion branching in JS needed at this level. */}
      <IndustriesStory />
      <IndustriesList />
    </section>
  );
}
