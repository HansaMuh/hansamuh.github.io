// Chrome's native smooth scroll crosses a long page in ~0.4s, which reads as a jump.
// This eases over a length that grows with the distance, so the movement is visible.

const MIN_DURATION = 450;
const MAX_DURATION = 1000;

let cancelActive: (() => void) | null = null;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function smoothScrollTo(targetY: number) {
  cancelActive?.();

  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  const endY = Math.max(0, Math.min(targetY, maxY));
  const startY = window.scrollY;
  const distance = endY - startY;

  if (distance === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: endY, behavior: "instant" });
    return;
  }

  const duration = Math.min(MAX_DURATION, MIN_DURATION + Math.abs(distance) * 0.25);
  const startTime = performance.now();
  let frame = 0;

  // Any input from the visitor takes over from the animation.
  const stop = () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchstart", stop);
    window.removeEventListener("keydown", stop);
    cancelActive = null;
  };
  window.addEventListener("wheel", stop, { passive: true });
  window.addEventListener("touchstart", stop, { passive: true });
  window.addEventListener("keydown", stop);
  cancelActive = stop;

  const step = (now: number) => {
    const progress = Math.min(1, (now - startTime) / duration);
    window.scrollTo({ top: startY + distance * easeInOutCubic(progress), behavior: "instant" });
    if (progress < 1) frame = requestAnimationFrame(step);
    else stop();
  };
  frame = requestAnimationFrame(step);
}

export function scrollToSection(section: HTMLElement) {
  const margin = parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
  smoothScrollTo(section.getBoundingClientRect().top + window.scrollY - margin);
}
