"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "../use-reduced-motion";
import { getParticleStage } from "./particle-stage";
import type { ParticleMode } from "./scenes";

/**
 * A slot the shared particle stage renders a scene into. Hover and cursor
 * input come from the nearest `[data-particle-hover]` ancestor (usually the
 * whole card), falling back to the slot itself. Children render above the
 * particles as DOM labels.
 */
export function ParticleView({
  mode,
  className = "",
  children,
}: {
  mode: ParticleMode;
  className?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const hoverEl = el.closest<HTMLElement>("[data-particle-hover]") ?? el;
    const stage = getParticleStage();
    const view = stage.add({ el, hoverEl, mode, reducedMotion });
    return () => stage.remove(view);
  }, [mode, reducedMotion]);

  return (
    <div ref={ref} aria-hidden="true" className={`relative ${className}`}>
      {children}
    </div>
  );
}

export type { ParticleMode };
