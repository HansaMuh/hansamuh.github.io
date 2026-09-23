"use client";

import { BANNER_POSTER as POSTER } from "@/lib/banner";
import { useEffect, useRef } from "react";

// The backdrop for the first screen: a looping clip with a scrim over it, a soft blur
// along its top and bottom edges, and a wave cutting it off from the rest of the page.
// It is absolutely positioned inside #hero, so its height follows the hero exactly and
// it never needs 100vw, which would count the scrollbar and push the page sideways.
const SRC = "/videos/Fall26_Chillhop.com_banner-web.mp4";
// POSTER is the clip's first frame, so the handover to the moving video does not jump.
const WIDE = "(min-width: 640px)";

export function HeroBanner() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Playback is driven here rather than by the autoplay attribute. Reduced motion holds
  // the still poster. Wide screens start straight away, as the <source> below already
  // matched. Phones show the poster for the first screen and attach the 1.1 MB loop only
  // once the page has loaded and gone idle, and never under data saver.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia(WIDE).matches;
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData ===
      true;
    let released = wide;

    const apply = () => {
      if (reduced.matches) {
        video.loop = false;
        video.pause();
        return;
      }
      if (!released) return;
      if (!video.currentSrc) video.src = SRC;
      video.loop = true;
      void video.play().catch(() => {});
    };
    apply();
    reduced.addEventListener("change", apply);

    let idle = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const release = () => {
      released = true;
      apply();
    };
    const onLoad = () => {
      // Safari has no requestIdleCallback, whatever the DOM types claim.
      if (typeof window.requestIdleCallback === "function") {
        idle = window.requestIdleCallback(release, { timeout: 2000 });
      } else {
        timer = setTimeout(release, 1000);
      }
    };
    if (!wide && !saveData) {
      if (document.readyState === "complete") onLoad();
      else window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      reduced.removeEventListener("change", apply);
      window.removeEventListener("load", onLoad);
      if (idle) window.cancelIdleCallback(idle);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    // data-hero-banner: hidden while <html> has `banner-wait` (see src/lib/banner.ts), then
    // the still and its scrim fade in together instead of the scrim showing first as grey.
    <div
      aria-hidden
      data-hero-banner
      className="absolute inset-0 overflow-hidden transition-opacity duration-400 ease-out motion-reduce:transition-none"
    >
      <video
        ref={videoRef}
        className="size-full object-cover"
        poster={POSTER}
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
      >
        {/* Wide screens get the clip straight from the HTML, as before. Phones match no
            source, so they load nothing until the effect attaches the clip. */}
        <source src={SRC} type="video/mp4" media={WIDE} />
      </video>
      {/* Two layers instead of one flat scrim. The base is what the open edges of the
          clip get, so more of the artwork shows; the ellipse adds depth behind the text
          column, where white type has to stay above 4.5:1 on every frame of the loop.
          The band is horizontal because the text is a centred column: the free space is
          at the left and right, not above and below. Phones get a flat second layer
          instead, since there the text spans the full width. */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-black/40 sm:bg-transparent sm:bg-[linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.38)_18%,rgba(0,0,0,0.38)_82%,transparent_100%)]" />
      <div className="absolute inset-x-0 top-0 h-28 [mask-image:linear-gradient(to_bottom,black,transparent)] backdrop-blur-[3px]" />
      <div className="absolute inset-x-0 bottom-0 h-28 [mask-image:linear-gradient(to_top,black,transparent)] backdrop-blur-[3px]" />
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
