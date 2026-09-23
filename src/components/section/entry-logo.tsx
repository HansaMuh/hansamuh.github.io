/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";

// The only interactive part of an entry: it swaps to a blank disc if the logo fails to
// load. Kept in its own client component so the list around it can render on the server.
export function EntryLogo({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="size-8 flex-none rounded-full border bg-muted p-1 shadow ring-2 ring-border md:size-10 dark:border-white/35 dark:ring-white/35" />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="size-8 flex-none overflow-hidden rounded-full border bg-white object-contain p-1 shadow ring-2 ring-border md:size-10 dark:border-white/35 dark:ring-white/35"
      onError={() => setImageError(true)}
    />
  );
}
