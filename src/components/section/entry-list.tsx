/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { CornerArrow } from "@/components/corner-arrow";

export interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  dates: string;
  logoUrl: string;
  description: string;
  link?: { href: string; label: string };
}

function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="size-8 md:size-10 p-1.5 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="size-8 md:size-10 p-1.5 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain bg-white flex-none"
      onError={() => setImageError(true)}
    />
  );
}

// Shared by Work Experience and Certifications. Everything is visible from the start:
// nothing here is worth a click to reveal.
export default function EntryList({ items }: { items: TimelineItem[] }) {
  return (
    <ul className="w-full grid gap-6">
      {items.map((item) => (
        <li key={item.id} className="grid gap-2">
          <div className="flex items-center gap-x-3 justify-between w-full text-left">
            <div className="flex items-center gap-x-3 flex-1 min-w-0">
              <LogoImage src={item.logoUrl} alt={item.subtitle} />
              <div className="flex-1 min-w-0 gap-0.5 flex flex-col">
                <div className="font-semibold leading-none">{item.title}</div>
                <div className="font-sans text-sm text-muted-foreground">{item.subtitle}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-none">
              <span className="text-xs tabular-nums text-muted-foreground text-right">
                {item.dates}
              </span>
              {item.link && <CornerArrow href={item.link.href} label={item.link.label} />}
            </div>
          </div>
          <p className="ml-13 text-xs sm:text-sm text-muted-foreground">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}
