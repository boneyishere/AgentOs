import type { ReactNode, SVGProps } from "react";

/**
 * Codely's hand-drawn icon set (24px grid, 1.5 stroke). Every icon redraws its
 * strokes (`ip-draw`) and plays its own signature move when an ancestor
 * `.group` is hovered/focused or carries `data-icon-active="true"`. The
 * choreography lives in globals.css (`.agent-icon` rules); parts only carry
 * class names. Motion is CSS-only and one-shot, so reduced motion simply lands
 * on the resting frame.
 */
export type AgentIcon = (props: { className?: string }) => ReactNode;

function Frame({ className = "", children, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`agent-icon h-[18px] w-[18px] ${className}`}
      {...rest}
    >
      {children}
    </svg>
  );
}

const draw = { pathLength: 1, className: "ip ip-draw" };

export const PhoneIcon: AgentIcon = ({ className }) => (
  <Frame className={className}>
    <g className="ip ip-ring">
      <path
        {...draw}
        d="M5.5 4h2.8l1.4 3.7-1.9 1.2a10.5 10.5 0 0 0 7.3 7.3l1.2-1.9 3.7 1.4v2.8a2 2 0 0 1-2 2A15.5 15.5 0 0 1 3.5 6a2 2 0 0 1 2-2z"
      />
    </g>
    <path className="ip ip-signal" d="M15 3.8a5.5 5.5 0 0 1 5.2 5.2" />
    <path className="ip ip-signal ip-delay" d="M15 7.2a2.2 2.2 0 0 1 1.8 1.8" />
  </Frame>
);

export const ChartIcon: AgentIcon = ({ className }) => (
  <Frame className={className}>
    <path d="M4 20h16" />
    <path {...draw} d="M5 16.5l4-4.5 3.5 3 6-6.5" />
    <path className="ip ip-rise" d="M14.5 8.5H19V13" />
  </Frame>
);

export const LifebuoyIcon: AgentIcon = ({ className }) => (
  <Frame className={className}>
    <g className="ip ip-quarter">
      <circle {...draw} cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M6 6l3.5 3.5M14.5 14.5L18 18M18 6l-3.5 3.5M9.5 14.5L6 18" />
    </g>
  </Frame>
);

export const CalendarIcon: AgentIcon = ({ className }) => (
  <Frame className={className}>
    <rect x="4" y="5.5" width="16" height="14.5" rx="2.5" />
    <path className="ip ip-bob" d="M8.5 3.5v4" />
    <path className="ip ip-bob ip-delay" d="M15.5 3.5v4" />
    <path d="M4 10h16" />
    <path {...draw} d="M9.5 15l1.9 1.9 3.6-3.6" />
  </Frame>
);

export const LoopIcon: AgentIcon = ({ className }) => (
  <Frame className={className}>
    <g className="ip ip-half">
      <path {...draw} d="M4.5 11a7.5 7.5 0 0 1 13-4.3L19.5 9" />
      <path d="M19.5 4.5V9H15" />
      <path {...draw} d="M19.5 13a7.5 7.5 0 0 1-13 4.3L4.5 15" />
      <path d="M4.5 19.5V15H9" />
    </g>
  </Frame>
);

export const GlobeIcon: AgentIcon = ({ className }) => (
  <Frame className={className}>
    <circle {...draw} cx="12" cy="12" r="8.5" />
    <path className="ip ip-turn" d="M12 3.5c2.6 2.3 3.8 5.1 3.8 8.5s-1.2 6.2-3.8 8.5c-2.6-2.3-3.8-5.1-3.8-8.5s1.2-6.2 3.8-8.5z" />
    <path d="M4 9.5h16M4 14.5h16" />
  </Frame>
);

export const MessageIcon: AgentIcon = ({ className }) => (
  <Frame className={className}>
    <path {...draw} d="M6 4.5h12a2.5 2.5 0 0 1 2.5 2.5v7.5a2.5 2.5 0 0 1-2.5 2.5h-6.5l-4.5 3.5V17H6a2.5 2.5 0 0 1-2.5-2.5V7A2.5 2.5 0 0 1 6 4.5z" />
    <circle className="ip ip-bob" cx="8.5" cy="10.75" r="0.9" fill="currentColor" stroke="none" />
    <circle className="ip ip-bob ip-delay" cx="12" cy="10.75" r="0.9" fill="currentColor" stroke="none" />
    <circle className="ip ip-bob ip-delay-2" cx="15.5" cy="10.75" r="0.9" fill="currentColor" stroke="none" />
  </Frame>
);

export const BuildingIcon: AgentIcon = ({ className }) => (
  <Frame className={className}>
    <path {...draw} d="M5.5 20.5V5a1.5 1.5 0 0 1 1.5-1.5h10A1.5 1.5 0 0 1 18.5 5v15.5" />
    <path d="M3.5 20.5h17M10.5 20.5v-3h3v3" />
    <path className="ip ip-glow" d="M9 7.5h.01M12 7.5h.01M15 7.5h.01" strokeWidth={2.2} />
    <path className="ip ip-glow ip-delay" d="M9 11h.01M12 11h.01M15 11h.01" strokeWidth={2.2} />
    <path className="ip ip-glow ip-delay-2" d="M9 14.5h.01M15 14.5h.01" strokeWidth={2.2} />
  </Frame>
);

export const StackIcon: AgentIcon = ({ className }) => (
  <Frame className={className}>
    <path className="ip ip-lift" d="M12 3.5l8 4-8 4-8-4 8-4z" />
    <path className="ip ip-lift-sm" d="M4 12l8 4 8-4" />
    <path {...draw} d="M4 16.5l8 4 8-4" />
  </Frame>
);

export const TargetIcon: AgentIcon = ({ className }) => (
  <Frame className={className}>
    <circle {...draw} cx="11" cy="13" r="7.5" />
    <circle cx="11" cy="13" r="4" />
    <circle className="ip ip-pulse" cx="11" cy="13" r="1" fill="currentColor" stroke="none" />
    <g className="ip ip-arrow">
      <path d="M11 13l8.5-8.5" />
      <path d="M16.5 3.5h3.5V7" />
    </g>
  </Frame>
);

export const WorkflowIcon: AgentIcon = ({ className }) => (
  <Frame className={className}>
    <rect x="3.5" y="3.5" width="6" height="6" rx="1.5" />
    <rect x="14.5" y="14.5" width="6" height="6" rx="1.5" />
    <circle className="ip ip-pulse" cx="17.5" cy="6.5" r="2.5" />
    <path {...draw} d="M9.5 6.5h5.5" />
    <path {...draw} d="M17.5 9v5.5" />
    <path {...draw} d="M6.5 9.5v5a3 3 0 0 0 3 3h5" />
  </Frame>
);

export const MicIcon: AgentIcon = ({ className }) => (
  <Frame className={className}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path {...draw} d="M5.5 11a6.5 6.5 0 0 0 13 0" />
    <path d="M12 17.5v3.5" />
    <path className="ip ip-signal" d="M2.5 9.5v3" />
    <path className="ip ip-signal ip-delay" d="M21.5 9.5v3" />
  </Frame>
);

export const SparkleIcon: AgentIcon = ({ className }) => (
  <Frame className={className}>
    <path
      className="ip ip-twirl"
      d="M11 4c.6 4.1 2.8 6.3 6.9 6.9-4.1.6-6.3 2.8-6.9 6.9-.6-4.1-2.8-6.3-6.9-6.9C8.2 10.3 10.4 8.1 11 4z"
    />
    <path className="ip ip-twinkle" d="M18.5 3v3M17 4.5h3" />
    <path className="ip ip-twinkle ip-delay" d="M18.5 17.5v2M17.5 18.5h2" />
  </Frame>
);

export const BookIcon: AgentIcon = ({ className }) => (
  <Frame className={className}>
    <path d="M12 6.5C10 5 7 4.5 3.5 5v13.5c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5z" />
    <path d="M12 6.5V20" />
    <path {...draw} d="M6 9h3M6 12h3M15 9h3M15 12h3" />
  </Frame>
);

export const HistoryIcon: AgentIcon = ({ className }) => (
  <Frame className={className}>
    <path {...draw} d="M3.5 12a8.5 8.5 0 1 0 2.5-6L3.5 8.5" />
    <path d="M3.5 4v4.5H8" />
    <path className="ip-rewind" d="M12 7.5V12l3 2" />
  </Frame>
);

export const WandIcon: AgentIcon = ({ className }) => (
  <Frame className={className}>
    <path {...draw} d="M4 20L14.5 9.5" />
    <path d="M14.5 9.5l2-2 1 1-2 2" />
    <path className="ip ip-twinkle" d="M19 2.5v3M17.5 4h3" />
    <path className="ip ip-twinkle ip-delay" d="M20 10v2M19 11h2" />
    <path className="ip ip-twinkle ip-delay-2" d="M11 3v2M10 4h2" />
  </Frame>
);

export const SlidersIcon: AgentIcon = ({ className }) => (
  <Frame className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
    <circle className="ip ip-slide" cx="9" cy="7" r="2" fill="var(--background)" />
    <circle className="ip ip-slide-back" cx="15" cy="12" r="2" fill="var(--background)" />
    <circle className="ip ip-slide ip-delay" cx="8" cy="17" r="2" fill="var(--background)" />
  </Frame>
);

export const BotIcon: AgentIcon = ({ className }) => (
  <Frame className={className}>
    <rect {...draw} x="4.5" y="7.5" width="15" height="11.5" rx="3" />
    <path d="M12 4.5v3" />
    <circle className="ip ip-pulse" cx="12" cy="3.5" r="1" fill="currentColor" stroke="none" />
    <circle className="ip ip-blink" cx="9.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
    <circle className="ip ip-blink" cx="14.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
    <path d="M10 15.75h4" />
  </Frame>
);
