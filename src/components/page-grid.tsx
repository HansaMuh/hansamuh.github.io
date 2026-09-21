"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

const BLUE = "#0070f0";
const YELLOW = "#f1e302";

// A band of flickering squares at the foot of the page, behind the contact block and
// the footer. It follows the accent, so the hue turns over with the phase; the canvas
// resolves the colour itself, which a CSS variable would not survive, hence the literals.
// Absolute rather than fixed: it belongs to the end of the page, not to the screen.
export function PageGrid() {
  const { resolvedTheme } = useTheme();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  if (!enabled) return null;

  const night = resolvedTheme === "dark";

  return (
    <div
      key={night ? "night" : "day"}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-56 animate-in fade-in duration-700 [mask-image:linear-gradient(to_top,black_10%,transparent)]"
    >
      <FlickeringGrid
        squareSize={4}
        gridGap={6}
        flickerChance={0.25}
        maxOpacity={night ? 0.18 : 0.3}
        color={night ? YELLOW : BLUE}
      />
    </div>
  );
}
