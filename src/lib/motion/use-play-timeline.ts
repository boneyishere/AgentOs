"use client";

import type { DependencyList } from "react";
import { gsap, ScrollTrigger } from "./gsap-setup";
import { useGsapContext } from "./use-gsap-context";

/**
 * A small story timeline for an in-card visual: built paused (its `fromTo`s
 * set the "before" state), played once on scroll-in, and replayed from the
 * start whenever the pointer enters the nearest `[data-replay]` host (if it
 * isn't already mid-play). Reduced motion jumps straight to the "after" state.
 */
export function usePlayTimeline<T extends HTMLElement = HTMLDivElement>(
  build: (tl: gsap.core.Timeline, el: T, reducedMotion: boolean) => void,
  deps: DependencyList = []
) {
  return useGsapContext<T>((_ctx, el, reducedMotion) => {
    const tl = gsap.timeline({ paused: true });
    build(tl, el, reducedMotion);

    if (reducedMotion) {
      tl.progress(1);
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 70%",
      once: true,
      onEnter: () => tl.play(0),
    });
    const host = el.closest<HTMLElement>("[data-replay]") ?? el;
    const replay = () => {
      if (!tl.isActive()) tl.play(0);
    };
    host.addEventListener("pointerenter", replay);

    return () => {
      trigger.kill();
      host.removeEventListener("pointerenter", replay);
    };
  }, deps);
}
