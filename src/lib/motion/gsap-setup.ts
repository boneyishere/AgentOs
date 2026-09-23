import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);
  // Mobile browsers change viewport height when their address bar shows/hides
  // during scroll. ScrollTrigger treats that as a resize and auto-refreshes,
  // which recalculates every trigger's position mid-scroll and can snap the
  // page back to an earlier section. This is GSAP's documented fix.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin };
