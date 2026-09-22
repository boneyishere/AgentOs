"use client";

import { useRef } from "react";
import {
  Clock,
  HeartHandshake,
  ClipboardList,
  PhoneMissed,
  ShieldCheck,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { TextReveal } from "@/lib/motion/text-reveal";
import { gsap } from "@/lib/motion/gsap-setup";
import { useGsapContext } from "@/lib/motion/use-gsap-context";

const IMPACTS = [
  {
    icon: PhoneMissed,
    title: "Never miss an opportunity",
    description: "Respond to customers even when your team is busy or unavailable.",
  },
  {
    icon: Zap,
    title: "Respond instantly",
    description: "Give customers answers without making them wait for someone to become available.",
  },
  {
    icon: HeartHandshake,
    title: "Free your team",
    description: "Take repetitive conversations and administrative work off your team's plate.",
  },
  {
    icon: TrendingUp,
    title: "Keep leads moving",
    description: "Qualify, follow up, schedule, and re-engage prospects automatically.",
  },
  {
    icon: Clock,
    title: "Serve customers around the clock",
    description: "Give customers access to your business beyond normal working hours.",
  },
  {
    icon: ShieldCheck,
    title: "Make every interaction consistent",
    description: "Ensure customers receive the right information according to your business rules.",
  },
  {
    icon: Users,
    title: "Scale conversations",
    description: "Handle more customer conversations without requiring the same increase in manual effort.",
  },
  {
    icon: ClipboardList,
    title: "Give your team better context",
    description: "Turn conversations into useful information your team can act on.",
  },
];

function ImpactHeading() {
  return (
    <div className="max-w-xl">
      <TextReveal className="text-3xl font-medium tracking-tight text-ink-foreground sm:text-4xl">
        The practical impact of putting an AI agent to work.
      </TextReveal>
      <Reveal delay={0.1}>
        <p className="mt-4 max-w-lg text-ink-foreground-muted">
          The outcomes businesses actually feel once an agent is handling real conversations.
        </p>
      </Reveal>
    </div>
  );
}

function ImpactCard({
  item,
  className = "",
}: {
  item: (typeof IMPACTS)[number];
  className?: string;
}) {
  const Icon = item.icon;
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-2xl border border-ink-border-strong bg-white/[0.06] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_8px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-7 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"
      />
      <span className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-ink-border bg-white/10 text-ink-foreground backdrop-blur-sm">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <p className="relative mt-5 text-lg font-medium leading-snug text-ink-foreground">
        {item.title}
      </p>
      <div className="relative mt-4 flex-1 border-t border-ink-border pt-4">
        <p className="text-sm text-ink-foreground-muted">{item.description}</p>
      </div>
    </div>
  );
}

/** Max width of the fade/blur transition at each edge of the card viewport —
 *  wide enough (roughly half a card) to read as a genuine soft transition
 *  rather than an abrupt cut, once that edge actually has content sliding
 *  past it. */
const EDGE_MASK_PX = 160;

/**
 * Builds the two edge masks for a given left/right zone width (0–EDGE_MASK_PX
 * each). `black` = fully opaque, `transparent` = fully hidden, with an
 * intermediate 35%/65% stop midway through each zone so the ramp curves in
 * rather than fading linearly. Passing `0` for a side collapses its fade
 * entirely (the "transparent" and "black" stops land on the same point),
 * so that edge renders fully sharp with no transition at all.
 */
function buildEdgeMasks(leftPx: number, rightPx: number) {
  const fade = `linear-gradient(to right, transparent 0, rgba(0,0,0,0.35) ${leftPx * 0.5}px, black ${leftPx}px, black calc(100% - ${rightPx}px), rgba(0,0,0,0.35) calc(100% - ${rightPx * 0.5}px), transparent 100%)`;
  const blur = `linear-gradient(to right, black 0, rgba(0,0,0,0.65) ${leftPx * 0.5}px, transparent ${leftPx}px, transparent calc(100% - ${rightPx}px), rgba(0,0,0,0.65) calc(100% - ${rightPx * 0.5}px), black 100%)`;
  return { fade, blur };
}

/**
 * Desktop-only, motion-safe: the section pins in place while vertical scroll
 * drives the card track horizontally, card 1 through card 8. Once the last
 * card is fully in view the pin releases and scroll continues normally; the
 * same tween reverses cleanly on scroll-up since it's scrubbed directly off
 * scroll position rather than played on a click/slide trigger. Pinned to a
 * full `h-screen` box (like IndustriesSection) so there's no dead space
 * below the content for the scroll duration it's held in place.
 *
 * The edge fade/blur is a pure CSS mask on the viewport layer itself, not a
 * filter applied to individual cards: a `mask-image` on the overflow stage
 * fades opacity to nothing only within a strip at each edge, and a
 * `backdrop-blur` overlay sharing that same mask adds the blur. A card
 * fully inside the viewport sits entirely in the mask's opaque middle and
 * stays 100% sharp; only the sliver of a card actually crossing the
 * boundary fades/blurs — the card DOM/filter is never touched.
 *
 * Each edge's mask width is itself scroll-driven: it's 0 (no transition at
 * all) whenever that edge has nothing left to reveal — the very first card
 * at rest, and the very last card once fully scrolled into view — and
 * grows to the full `EDGE_MASK_PX` as soon as there's actually content
 * sliding past that boundary. That's what keeps the true first/last card
 * genuinely sharp instead of a static mask blurring whatever happens to
 * sit in that pixel zone regardless of scroll position.
 */
function ImpactScrollTrack() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const blurOverlayRef = useRef<HTMLDivElement | null>(null);

  const pinRef = useGsapContext<HTMLDivElement>((_ctx, el, reducedMotion) => {
    if (reducedMotion) return;

    const stage = stageRef.current;
    const track = trackRef.current;
    const blurOverlay = blurOverlayRef.current;
    if (!stage || !track || !blurOverlay) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const getDistance = () => Math.max(0, track.scrollWidth - stage.clientWidth);

      const updateMasks = () => {
        const distance = getDistance();
        const scrolled = distance > 0 ? gsap.utils.clamp(0, distance, -(gsap.getProperty(track, "x") as number)) : 0;
        const leftPx = Math.min(EDGE_MASK_PX, scrolled);
        const rightPx = Math.min(EDGE_MASK_PX, distance - scrolled);
        const { fade, blur } = buildEdgeMasks(leftPx, rightPx);
        stage.style.maskImage = fade;
        stage.style.webkitMaskImage = fade;
        blurOverlay.style.maskImage = blur;
        blurOverlay.style.webkitMaskImage = blur;
      };

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        // Fires every frame the scrub tween is actually interpolating `x`
        // (including its ease-driven catch-up after scrolling stops) — the
        // scrollTrigger's own onUpdate only fires on raw scroll events, so
        // it can read a stale `x` while the scrub is still easing in.
        onUpdate: updateMasks,
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: updateMasks,
        },
      });

      updateMasks();

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <Container ref={pinRef} className="flex h-screen flex-col justify-center">
      <ImpactHeading />

      {/* Constrained to this Container's own width — cards scroll only
          within this "card viewport", not across the full browser width. */}
      <div className="relative mt-14">
        <div ref={stageRef} className="overflow-hidden">
          <div ref={trackRef} className="flex w-fit gap-6">
            {IMPACTS.map((item) => (
              <ImpactCard key={item.title} item={item} className="w-[270px] shrink-0 sm:w-[300px]" />
            ))}
          </div>
        </div>

        {/* Blur layer masked to the inverse of the fade above, so it's
            invisible over the sharp center and only shows right where
            cards are already fading out — the card DOM/filter is never
            touched. */}
        <div
          ref={blurOverlayRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 backdrop-blur-lg"
        />
      </div>
    </Container>
  );
}

/** Mobile / reduced-motion fallback: a plain grid, no scroll-jacking. */
function ImpactGrid() {
  return (
    <Container className="py-20 sm:py-28">
      <ImpactHeading />
      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {IMPACTS.map((item) => (
          <ImpactCard key={item.title} item={item} className="h-full" />
        ))}
      </div>
    </Container>
  );
}

export function FeaturesImpactSection() {
  return (
    <section className="border-b border-border bg-ink text-ink-foreground">
      {/* Exactly one of these two is visible at a time, purely via the
          complementary `motion-safe:lg:` CSS variants below — mirrors the
          pinned scroll-story pattern used by IndustriesSection. */}
      <div className="hidden motion-safe:lg:block">
        <ImpactScrollTrack />
      </div>
      <div className="block motion-safe:lg:hidden">
        <ImpactGrid />
      </div>
    </section>
  );
}
