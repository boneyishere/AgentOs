"use client";

import type { DependencyList } from "react";
import { gsap, ScrollTrigger } from "./gsap-setup";
import { useGsapContext } from "./use-gsap-context";

type ScrollTimelineConfig = {
  start?: string;
  end?: string;
  scrub?: boolean | number;
  once?: boolean;
  pin?: boolean;
};

/**
 * A staged/scrubbed GSAP timeline driven by ScrollTrigger, scoped to the
 * returned ref. Reduced motion collapses scrub/pin to a single instant
 * "once" playthrough so content still appears, just without the scroll-tied
 * choreography.
 */
export function useScrollTimeline<T extends HTMLElement = HTMLDivElement>(
  config: ScrollTimelineConfig,
  build: (tl: gsap.core.Timeline, el: T, reducedMotion: boolean) => void,
  deps: DependencyList = []
) {
  return useGsapContext<T>((_ctx, el, reducedMotion) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: config.start ?? "top 80%",
        end: config.end,
        scrub: reducedMotion ? false : config.scrub,
        once: reducedMotion ? true : config.once,
        pin: reducedMotion ? false : config.pin,
      } satisfies ScrollTrigger.Vars,
    });

    build(tl, el, reducedMotion);
  }, deps);
}
