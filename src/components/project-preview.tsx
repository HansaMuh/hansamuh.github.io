"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { isVideo } from "@/lib/media";
import { cn } from "@/lib/utils";

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
          className="block w-full cursor-zoom-in bg-muted px-4 pt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        >
          {children}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[min(64rem,95vw)] gap-3 p-4 sm:p-5">
        <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
        {/* The arrows flank the media on a wide screen. On a phone they would eat most of
            the width, so the media takes its own line and they sit underneath. */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <PageButton
            direction="previous"
            disabled={!hasPrevious}
            onClick={() => setIndex(index - 1)}
            className="order-2 sm:order-1"
          />
          <div className="order-1 flex w-full min-w-0 items-center justify-center sm:order-2 sm:w-auto sm:flex-1">
            {isVideo(current) ? (
              <video
                ref={videoRef}
                key={current}
                src={current}
                controls
                playsInline
                muted
                className="max-h-[70vh] w-full rounded-lg"
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={current}
                src={current}
                alt={`${title} preview ${index + 1} of ${previews.length}`}
                className="max-h-[70vh] w-full rounded-lg object-contain"
              />
            )}
          </div>
          <PageButton
            direction="next"
            disabled={!hasNext}
            onClick={() => setIndex(index + 1)}
            className="order-3"
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
  className,
}: {
  direction: "previous" | "next";
  disabled: boolean;
  onClick: () => void;
  className?: string;
}) {
  const Icon = direction === "previous" ? ChevronLeftIcon : ChevronRightIcon;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`${direction === "previous" ? "Previous" : "Next"} preview`}
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    >
      <Icon className="size-5" aria-hidden />
    </button>
  );
}
