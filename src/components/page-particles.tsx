"use client";

import { useEffect, useState } from "react";
import { Particles } from "@/components/magicui/particles";

// Two layers because Particles draws one color: the site blue and the yellow accent.
// Each layer links its own nearby dots (and the cursor) into a moving constellation.
export function PageParticles() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Particles
        className="absolute inset-0"
        quantity={140}
        size={1.1}
        staticity={30}
        ease={50}
        vx={0.12}
        vy={-0.08}
        linkDistance={110}
        twinkle
        color="#0078ff"
      />
      <Particles
        className="absolute inset-0"
        quantity={60}
        size={1.4}
        staticity={30}
        ease={50}
        vx={-0.1}
        vy={-0.12}
        linkDistance={90}
        twinkle
        color="#f1e302"
      />
    </div>
  );
}
