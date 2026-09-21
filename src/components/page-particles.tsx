"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Particles } from "@/components/magicui/particles";

const BLUE = "#0078ff";
const YELLOW = "#f1e302";

// Two layers because Particles draws one color. Day leads with blue, night with
// yellow; the keyed wrapper fades the new field in when the phase turns over.
// The white page washes dots out, so day runs a brighter opacity band than night.
export function PageParticles() {
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
  const [front, back] = night ? [YELLOW, BLUE] : [BLUE, YELLOW];
  const [minAlpha, maxAlpha] = night ? [0.15, 0.7] : [0.3, 0.95];

  return (
    <div
      key={night ? "night" : "day"}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 animate-in fade-in duration-700"
    >
      <Particles
        className="absolute inset-0"
        quantity={140}
        size={1}
        staticity={30}
        ease={50}
        vx={0.12}
        vy={-0.08}
        linkDistance={110}
        twinkle
        minAlpha={minAlpha}
        maxAlpha={maxAlpha}
        color={front}
      />
      <Particles
        className="absolute inset-0"
        quantity={60}
        size={1}
        staticity={30}
        ease={50}
        vx={-0.1}
        vy={-0.12}
        linkDistance={90}
        twinkle
        minAlpha={minAlpha}
        maxAlpha={maxAlpha}
        color={back}
      />
    </div>
  );
}
