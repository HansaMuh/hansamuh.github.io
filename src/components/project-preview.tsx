"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { isVideo } from "@/lib/media";
import { cn } from "@/lib/utils";

// The same shape as a main menu button: a 44px circle on the card surface.
const PANEL_BUTTON =
  "flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

// The card's frame is the trigger; this walks that project's preview list. Radix gives
// the focus trap, Esc and the scroll lock, so only the paging is ours.
export function ProjectPreview({
  title,
  previews,
  children,
}: {
  title: string;
  previews: readonly string[];
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const current = previews[index];
  const hasPrevious = index > 0;
  const hasNext = index < previews.length - 1;

  // Same rule as the hero banner: a visitor who asked for reduced motion gets a still
  // first frame, and the controls let them start it themselves.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.loop = false;
      video.pause();
    } else {
      video.loop = true;
      void video.play().catch(() => {});
    }
  }, [current]);

  // Window-level, because focus can land on <body>: clicking an arrow that then disables
  // itself blurs it, and a keydown on body never bubbles down into the dialog.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      // Let a focused video keep its own seek keys.
      if (event.target instanceof HTMLMediaElement) return;
      if (event.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
      if (event.key === "ArrowRight") setIndex((i) => Math.min(previews.length - 1, i + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, previews.length]);

  if (previews.length === 0) return <>{children}</>;

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        // Reset here rather than in an effect, which the lint rules reject.
        if (next) setIndex(0);
      }}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`Open ${title} preview`}
          className="block w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        >
          {children}
        </button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="max-w-[min(64rem,95vw)] gap-4 p-4 sm:p-5"
      >
        {/* Title and controls sit outside the media, which gets the whole content box. */}
        <div className="flex items-center justify-between gap-3">
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          <DialogClose className={PANEL_BUTTON} aria-label="Close preview">
            <XIcon className="size-5" aria-hidden />
          </DialogClose>
        </div>
        <div className="flex w-full items-center justify-center overflow-hidden rounded-lg">
          {isVideo(current) ? (
            <video
              ref={videoRef}
              key={current}
              src={current}
              controls
              playsInline
              muted
              className="max-h-[65vh] w-full"
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={current}
              src={current}
              alt={`${title} preview ${index + 1} of ${previews.length}`}
              className="max-h-[65vh] w-full object-contain"
            />
          )}
        </div>
        <div className="flex items-center justify-center gap-3">
          <PageButton
            direction="previous"
            disabled={!hasPrevious}
            onClick={() => setIndex(index - 1)}
          />
          <PageButton
            direction="next"
            disabled={!hasNext}
            onClick={() => setIndex(index + 1)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PageButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "previous" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "previous" ? ChevronLeftIcon : ChevronRightIcon;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`${direction === "previous" ? "Previous" : "Next"} preview`}
      className={cn(
        PANEL_BUTTON,
        "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-card"
      )}
    >
      <Icon className="size-5" aria-hidden />
    </button>
  );
}
