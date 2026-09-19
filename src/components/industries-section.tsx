"use client";

import Image from "next/image";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { TextReveal } from "@/lib/motion/text-reveal";
import { gsap } from "@/lib/motion/gsap-setup";
import { useGsapContext } from "@/lib/motion/use-gsap-context";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";

const INDUSTRIES = [
  {
    slug: "real-estate",
    name: "Real Estate",
    description:
      "Qualify leads, schedule showings, and follow up on listings automatically.",
    image: "/images/industries/real-estate.jpg",
  },
  {
    slug: "healthcare",
    name: "Healthcare & Clinics",
    description: "Book appointments, answer patient questions, and reduce no-shows.",
    image: "/images/industries/healthcare.jpg",
  },
  {
    slug: "home-services",
    name: "Home Services",
    description: "Capture every service call and schedule jobs without missing a lead.",
    image: "/images/industries/home-services.jpg",
  },
  {
    slug: "law-firms",
    name: "Law Firms",
    description: "Screen intake calls, answer FAQs, and route cases to the right attorney.",
    image: "/images/industries/law-firms.jpg",
  },
  {
    slug: "automotive",
    name: "Automotive & Dealerships",
    description: "Handle service bookings, inventory questions, and test-drive requests.",
    image: "/images/industries/automotive.jpg",
  },
  {
    slug: "hospitality",
    name: "Hospitality & Hotels",
    description:
      "Manage reservations, guest requests, and check-in questions around the clock.",
    image: "/images/industries/hospitality.jpg",
  },
  {
    slug: "restaurants",
    name: "Restaurants & Food Services",
    description: "Take reservations, answer menu questions, and handle order calls.",
    image: "/images/industries/restaurants.jpg",
  },
  {
    slug: "education",
    name: "Education & Training",
    description:
      "Answer enrollment questions and schedule consultations for prospective students.",
    image: "/images/industries/education.jpg",
  },
];

function IndustryCard({ item }: { item: (typeof INDUSTRIES)[number] }) {
  return (
    <div className="w-[260px] shrink-0 sm:w-[300px]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-raised">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(min-width: 640px) 300px, 260px"
          className="object-cover"
        />
      </div>
      <h3 className="mt-4 text-base font-medium">{item.name}</h3>
      <p className="mt-1.5 text-sm text-foreground-muted">{item.description}</p>
    </div>
  );
}

export function IndustriesSection() {
  const reducedMotion = useReducedMotion();
  const items = reducedMotion ? INDUSTRIES : [...INDUSTRIES, ...INDUSTRIES];

  const trackRef = useGsapContext<HTMLDivElement>((_ctx, el, reduced) => {
    if (reduced) return;

    const halfWidth = el.scrollWidth / 2;
    const tween = gsap.to(el, {
      x: -halfWidth,
      duration: halfWidth / 45,
      ease: "none",
      repeat: -1,
    });

    const pause = () => tween.pause();
    const resume = () => tween.play();
    const wrapper = el.parentElement;
    wrapper?.addEventListener("pointerenter", pause);
    wrapper?.addEventListener("pointerleave", resume);

    return () => {
      wrapper?.removeEventListener("pointerenter", pause);
      wrapper?.removeEventListener("pointerleave", resume);
    };
  }, []);

  return (
    <section className="border-b border-border bg-surface">
      <Container className="py-20 sm:py-28">
        <div className="max-w-xl">
          <TextReveal className="text-3xl font-medium tracking-tight sm:text-4xl">
            Built for how your industry runs
          </TextReveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-lg text-foreground-muted">
              Codely adapts to the way your business actually takes calls and
              messages — across every industry that depends on fast, reliable
              conversations.
            </p>
          </Reveal>
        </div>

        <Reveal
          delay={0.15}
          className={`mt-14 ${reducedMotion ? "overflow-x-auto" : "overflow-hidden"}`}
        >
          <div
            ref={trackRef}
            className={`flex gap-6 ${reducedMotion ? "w-full" : "w-fit"}`}
          >
            {items.map((item, i) => (
              <IndustryCard key={`${item.slug}-${i}`} item={item} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
