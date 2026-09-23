"use client";

import { LazyMotion, domAnimation } from "motion/react";
import type { ReactNode } from "react";

// Loads motion's animation features once for the whole page, so the menu dock (the only
// motion user left; the load-in fades are CSS) can use the lighter `m.*` elements.
// `strict` makes any stray `motion.*` element throw instead of pulling the full bundle back.
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
