/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";

// The only interactive part of an entry: it swaps to a blank disc if the logo fails to
// load. Kept in its own client component so the list around it can render on the server.
export function EntryLogo({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="size-8 md:size-10 p-1 border dark:border-white/35 rounded-full shadow ring-2 ring-border dark:ring-white/35 bg-muted flex-none" />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="size-8 md:size-10 p-1 border dark:border-white/35 rounded-full shadow ring-2 ring-border dark:ring-white/35 overflow-hidden object-contain bg-white flex-none"
      onError={() => setImageError(true)}
    />
  );
}
