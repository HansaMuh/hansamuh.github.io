"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

// The site follows Jakarta, the same clock as the menu: day from 06:00, night from 18:00.
const DAY_STARTS = 6;
const NIGHT_STARTS = 18;
const FADE_MS = 800;

const hourFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Jakarta",
  hour: "2-digit",
  hour12: false,
});

export function jakartaPhase(now = new Date()): "light" | "dark" {
  const hour = Number(hourFormatter.format(now));
  return hour >= DAY_STARTS && hour < NIGHT_STARTS ? "light" : "dark";
}

// ?phase=day / ?phase=night pins one phase, for screenshots and for sharing a look.
// The same parsing lives in the pre-paint script in layout.tsx.
function phaseOverride(): "light" | "dark" | null {
  const value = new URLSearchParams(window.location.search).get("phase");
  if (value === "day" || value === "light") return "light";
  if (value === "night" || value === "dark") return "dark";
  return null;
}

export function DayNight() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const pinned = phaseOverride();
    if (pinned) {
      if (pinned !== theme) setTheme(pinned);
      return;
    }

    let timeout: ReturnType<typeof setTimeout> | null = null;

    const apply = (first: boolean) => {
      const phase = jakartaPhase();
      if (phase === theme) return;
      // Cross-fade the page, but only when the phase turns over while someone is reading.
      if (!first && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        document.documentElement.classList.add("theme-switching");
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(
          () => document.documentElement.classList.remove("theme-switching"),
          FADE_MS,
        );
      }
      setTheme(phase);
    };

    apply(true);
    const id = setInterval(() => apply(false), 60_000);
    return () => {
      clearInterval(id);
      if (timeout) clearTimeout(timeout);
      document.documentElement.classList.remove("theme-switching");
    };
  }, [theme, setTheme]);

  return null;
}
