import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

// Local change: a CSS animation (`.blur-fade` in globals.css) instead of motion. The
// motion version could only start once JavaScript had hydrated, so on a throttled phone
// the hero text sat invisible for ~3.7s and became the late LCP element. This starts at
// first paint, needs no client code, and stays visible without JavaScript. The timing,
// offset, blur and easing match the original (motion's easeOut is CSS `ease-out`). The
// scroll-triggered `inView` mode and custom `variant` were dropped: nothing used them,
// and the first cannot be done without JavaScript.
interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
  blur?: string;
}
const BlurFade = ({
  children,
  className,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  blur = "6px",
}: BlurFadeProps) => {
  return (
    <div
      className={cn("blur-fade", className)}
      style={
        {
          "--blur-fade-duration": `${duration}s`,
          "--blur-fade-delay": `${0.04 + delay}s`,
          "--blur-fade-y": `${-yOffset}px`,
          "--blur-fade-blur": blur,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
};

export default BlurFade;
