"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Jakarta",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export function WibClock({ className }: { className?: string }) {
  // Starts empty so the static HTML never bakes in the build time.
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={cn(
        "hidden sm:flex h-11 shrink-0 items-center gap-1 px-2 text-sm font-medium tabular-nums text-foreground",
        className
      )}
      aria-label={time ? `Jakarta time ${time} WIB` : "Jakarta time"}
      role="timer"
    >
      <time>{time ?? "--:--:--"}</time>
      <span className="text-xs opacity-70">WIB</span>
    </div>
  );
}
