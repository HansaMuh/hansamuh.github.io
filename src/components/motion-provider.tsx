"use client";

import { LazyMotion, domAnimation } from "motion/react";
import type { ReactNode } from "react";

// Loads motion's animation features once for the whole page, so the Magic UI components
// can use the lighter `m.*` elements. The features load immediately rather than lazily:
// the load-in fades start invisible, and deferring the code would delay the content.
// `strict` makes any stray `motion.*` element throw instead of pulling the full bundle back.
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
