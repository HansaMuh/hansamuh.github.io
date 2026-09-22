"use client";

import { useEffect, useRef } from "react";

// The backdrop for the first screen: a looping clip with a scrim over it, a soft blur
// along its top and bottom edges, and a wave cutting it off from the rest of the page.
// It is absolutely positioned inside #hero, so its height follows the hero exactly and
// it never needs 100vw, which would count the scrollbar and push the page sideways.
export function HeroBanner() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Playback is driven here rather than by the autoplay attribute: a visitor who asked
  // for reduced motion gets the first frame held still instead of a 17s loop.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      const video = videoRef.current;
      if (!video) return;
      video.muted = true;
      if (query.matches) {
        video.loop = false;
        video.pause();
      } else {
        video.loop = true;
        void video.play().catch(() => {});
      }
    };
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        className="size-full object-cover"
        src="/videos/Fall26_Chillhop.com_banner-web.mp4"
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
      />
      {/* The clip runs from deep blue to neon. Measured against the brightest frames,
          50% left the small text at 4.0:1 on the neon hotspots; 60% clears AA on every
          pixel sampled across the loop. */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-x-0 top-0 h-28 backdrop-blur-[3px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-28 backdrop-blur-[3px] [mask-image:linear-gradient(to_top,black,transparent)]" />
      <svg
        className="absolute inset-x-0 bottom-0 h-12 w-full sm:h-20"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        role="presentation"
      >
        <path
          fill="var(--background)"
          d="M0,52 C160,104 320,8 480,36 C640,64 800,108 960,82 C1120,56 1280,12 1440,44 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  );
}
