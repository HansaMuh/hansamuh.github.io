import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

// Local change: a CSS animation (`.blur-fade` in globals.css) instead of motion, for the
// same reason as blur-fade.tsx: it starts at first paint rather than after hydration.
// The custom `variant` prop was dropped; nothing used it.
interface BlurFadeTextProps {
  text: string;
  className?: string;
  duration?: number;
  characterDelay?: number;
  delay?: number;
  yOffset?: number;
  animateByCharacter?: boolean;
}

const fadeStyle = (duration: number, delay: number, yOffset: number) =>
  ({
    "--blur-fade-duration": `${duration}s`,
    "--blur-fade-delay": `${delay}s`,
    "--blur-fade-y": `${-yOffset}px`,
    "--blur-fade-blur": "8px",
  }) as CSSProperties;

const BlurFadeText = ({
  text,
  className,
  duration = 0.4,
  characterDelay = 0.03,
  delay = 0,
  yOffset = 8,
  animateByCharacter = false,
}: BlurFadeTextProps) => {
  if (animateByCharacter) {
    return (
      <div className="flex">
        {Array.from(text).map((char, i) => (
          <span
            key={i}
            className={cn("blur-fade inline-block", className)}
            style={{
              ...fadeStyle(duration, delay + i * characterDelay, yOffset),
              width: char.trim() === "" ? "0.2em" : "auto",
            }}
          >
            {char}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="flex">
      <span
        className={cn("blur-fade inline-block", className)}
        style={fadeStyle(duration, delay, yOffset)}
      >
        {text}
      </span>
    </div>
  );
};

export default BlurFadeText;
