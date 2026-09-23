"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ProjectPreview } from "@/components/project-preview";
import { isVideo } from "@/lib/media";

interface Props {
  title: string;
  /** Rendered on the server by the section, so no markdown parser ships here. */
  description: React.ReactNode;
  dates: string;
  tags: readonly { name: string; icon: React.ReactNode }[];
  /** Card frame artwork. Falls back to the first preview when absent. */
  thumbnail?: string;
  /** Ordered list the preview panel walks. */
  previews?: readonly string[];
  /** Still shown in the frame before a video thumbnail starts playing. */
  poster?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  description,
  dates,
  tags,
  thumbnail,
  previews = [],
  poster,
  links,
  className,
}: Props) {
  const frame = thumbnail || previews[0];
  const frameIsVideo = !!frame && isVideo(frame);

  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground",
        "transition-[transform,box-shadow] duration-200 hover:z-10 hover:scale-[1.03] hover:shadow-lg hover:ring-2 hover:ring-muted",
        "motion-reduce:transition-none motion-reduce:hover:scale-100",
        className,
      )}
    >
      <div className="relative shrink-0">
        {/* The artwork runs edge to edge: no device mock. The whole frame is the preview
            trigger, a real button and reachable by keyboard. */}
        <ProjectPreview title={title} previews={previews}>
          <div className="aspect-video w-full overflow-hidden bg-muted">
            {frame ? (
              frameIsVideo ? (
                <CardVideo src={frame} poster={poster} />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={frame}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover"
                />
              )
            ) : null}
          </div>
        </ProjectPreview>
        {links && links.length > 0 && (
          <div className="absolute right-3 bottom-3 flex flex-wrap gap-2">
            {links.map((link, idx) => (
              <Link
                href={link.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex min-h-6 items-center"
              >
                <Badge
                  className="flex items-center gap-1.5 bg-foreground text-xs text-background hover:bg-foreground/90"
                  variant="default"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-col gap-1">
          {/* No corner arrow here: the Website / Source badges already lead out. */}
          <h3 className="font-semibold">{title}</h3>
          <time className="text-xs text-muted-foreground">{dates}</time>
        </div>
        <div className="prose prose-sm max-w-full flex-1 font-sans text-sm leading-relaxed text-pretty text-muted-foreground dark:prose-invert">
          {description}
        </div>
        {/* Logos only; the name lives in the tooltip and the accessible label. */}
        {tags && tags.length > 0 && (
          <ul className="mt-auto flex flex-wrap items-center gap-2.5">
            {tags.map((tag) => (
              <li key={tag.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      role="img"
                      tabIndex={0}
                      aria-label={tag.name}
                      className="flex size-9 items-center justify-center rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      {tag.icon}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    sideOffset={6}
                    className="rounded-lg bg-primary px-3 py-1.5 text-xs text-primary-foreground"
                  >
                    <p>{tag.name}</p>
                    <TooltipArrow className="fill-primary" />
                  </TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// Plays only while it is on screen: it used to autoplay from the first paint, fetching
// its clip before anyone scrolled that far. Reduced motion keeps the poster still.
function CardVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      className="size-full object-cover"
      loop
      muted
      playsInline
      preload="none"
    />
  );
}
