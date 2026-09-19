"use client";

import type { DependencyList } from "react";
import { gsap, ScrollTrigger } from "./gsap-setup";
import { useGsapContext } from "./use-gsap-context";

/**
 * A paused GSAP timeline driven by hover/focus, for feature-card motion
 * graphics and the use-case selector. Falls back to playing once on
 * scroll-into-view for touch/no-hover devices. Reduced motion still allows
 * the state change (it conveys information), just without the tween.
 */
export function useHoverTimeline<T extends HTMLElement = HTMLDivElement>(
  build: (tl: gsap.core.Timeline, el: T) => void,
  deps: DependencyList = []
) {
  return useGsapContext<T>((_ctx, el, reducedMotion) => {
    const tl = gsap.timeline({ paused: true });
    build(tl, el);

    const play = () => (reducedMotion ? tl.progress(1) : tl.play());
    const reverse = () => (reducedMotion ? tl.progress(0) : tl.reverse());

    el.addEventListener("pointerenter", play);
    el.addEventListener("pointerleave", reverse);
    el.addEventListener("focusin", play);
    el.addEventListener("focusout", reverse);

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 75%",
      once: true,
      onEnter: play,
    });

    return () => {
      el.removeEventListener("pointerenter", play);
      el.removeEventListener("pointerleave", reverse);
      el.removeEventListener("focusin", play);
      el.removeEventListener("focusout", reverse);
      trigger.kill();
    };
  }, deps);
}
