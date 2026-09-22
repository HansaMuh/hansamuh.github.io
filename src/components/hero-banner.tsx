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
      {/* Two layers instead of one flat scrim. The base is what the open edges of the
          clip get, so more of the artwork shows; the ellipse adds depth behind the text
          column, where white type has to stay above 4.5:1 on every frame of the loop.
          The band is horizontal because the text is a centred column: the free space is
          at the left and right, not above and below. Phones get a flat second layer
          instead, since there the text spans the full width. */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-black/40 sm:bg-transparent sm:bg-[linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.38)_18%,rgba(0,0,0,0.38)_82%,transparent_100%)]" />
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
