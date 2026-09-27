/**
 * Drives a requestAnimationFrame render loop only while `el` is on screen.
 * Frames are timestamped by rAF, so a shader that animates from `t` resumes
 * exactly where the clock is: nothing visible changes, it just stops burning
 * GPU while scrolled away (and rAF already pauses in hidden tabs).
 */
export function renderWhenVisible(el: Element, frame: (t: number) => void) {
  let raf = 0;
  const loop = (t: number) => {
    raf = requestAnimationFrame(loop);
    frame(t);
  };
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !raf) raf = requestAnimationFrame(loop);
      else if (!entry.isIntersecting && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    },
    { rootMargin: "120px 0px" }
  );
  io.observe(el);
  return () => {
    io.disconnect();
    cancelAnimationFrame(raf);
  };
}

/** Backing-store ratio for full-bleed shaders: 2x on desktop, 1.5x on touch. */
export function shaderDpr() {
  const cap = window.matchMedia("(pointer: coarse)").matches ? 1.5 : 2;
  return Math.min(window.devicePixelRatio || 1, cap);
}
