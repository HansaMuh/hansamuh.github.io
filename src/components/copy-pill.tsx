"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

type Result = "idle" | "copied" | "selected";

// One pill holding the handle and the copy icon: the whole thing is the button, and it
// copies rather than navigates. Where the browser refuses clipboard access it selects
// the handle instead, so there is always a way to get the text out.
export function CopyPill({ label, url }: { label: string; url: string }) {
  const labelRef = useRef<HTMLSpanElement>(null);
  const [result, setResult] = useState<Result>("idle");

  useEffect(() => {
    if (result === "idle") return;
    const id = setTimeout(() => setResult("idle"), 2500);
    return () => clearTimeout(id);
  }, [result]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setResult("copied");
    } catch {
      const node = labelRef.current;
      if (node) {
        const range = document.createRange();
        range.selectNodeContents(node);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      setResult("selected");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label}`}
        className="flex w-full items-center justify-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <span ref={labelRef}>
          {label}
        </span>
        {result === "copied" ? (
          <CheckIcon className="size-3.5 shrink-0" aria-hidden />
        ) : (
          <CopyIcon className="size-3.5 shrink-0" aria-hidden />
        )}
      </button>
      <span aria-live="polite" className="sr-only">
        {result === "copied" ? "Link copied" : ""}
        {result === "selected"
          ? "Link selected, press Control or Command and C to copy"
          : ""}
      </span>
    </>
  );
}
