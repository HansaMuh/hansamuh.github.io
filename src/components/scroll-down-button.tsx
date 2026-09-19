"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Anything closer to the top than this is treated as "already reached",
// which covers the fixed menu and the sections' scroll margin.
const REACHED_OFFSET = 136;

function getSections() {
  return Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));
}

function getNextSection() {
  return getSections().find(
    (section) => section.getBoundingClientRect().top > REACHED_OFFSET
  );
}

function isAtPageEnd() {
  return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
}

export function ScrollDownButton() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const update = () => setHidden(!getNextSection() || isAtPageEnd());
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to next section"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
      onClick={() => getNextSection()?.scrollIntoView()}
      className={cn(
        "fixed bottom-6 left-1/2 z-30 flex size-11 -translate-x-1/2 items-center justify-center rounded-full border bg-card/90 text-muted-foreground shadow-[0_0_10px_3px] shadow-primary/5 backdrop-blur transition-[opacity,color] duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        hidden && "pointer-events-none opacity-0"
      )}
    >
      <ChevronDown className="size-5 motion-safe:animate-bounce" />
    </button>
  );
}
