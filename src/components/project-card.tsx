"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Markdown from "react-markdown";
import { ProjectPreview } from "@/components/project-preview";
import { isVideo } from "@/lib/media";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly { name: string; icon: React.ReactNode }[];
  link?: string;
  /** Card frame artwork. Falls back to the first preview when absent. */
  thumbnail?: string;
  /** Ordered list the preview panel walks. */
  previews?: readonly string[];
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  thumbnail,
  previews = [],
  links,
  className,
}: Props) {
  const frame = thumbnail || previews[0];
  const frameIsVideo = !!frame && isVideo(frame);

  return (
    <div
      className={cn(
        "relative flex flex-col h-full rounded-xl border border-border bg-card text-card-foreground overflow-hidden",
        "transition-[transform,box-shadow] duration-200 hover:z-10 hover:scale-[1.03] hover:shadow-lg hover:ring-2 hover:ring-muted",
        "motion-reduce:transition-none motion-reduce:hover:scale-100",
        className
      )}
    >
      <div className="relative shrink-0">
        {/* The artwork runs edge to edge: no device mock. The whole frame is the preview
            trigger, a real button and reachable by keyboard. */}
        <ProjectPreview title={title} previews={previews}>
          <div className="aspect-video w-full overflow-hidden bg-muted">
            {frame ? (
              frameIsVideo ? (
                <video
                  src={frame}
                  className="size-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={frame} alt="" className="size-full object-cover" />
              )
            ) : null}
          </div>
        </ProjectPreview>
        {links && links.length > 0 && (
          <div className="absolute bottom-3 right-3 flex flex-wrap gap-2">
            {links.map((link, idx) => (
              <Link
                href={link.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Badge
                  className="flex items-center gap-1.5 text-xs bg-foreground text-background hover:bg-foreground/90"
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
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex flex-col gap-1">
          {/* No corner arrow here: the Website / Source badges already lead out. */}
          <h3 className="font-semibold">{title}</h3>
          <time className="text-xs text-muted-foreground">{dates}</time>
        </div>
        <div className="text-sm flex-1 prose prose-sm max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
          <Markdown>{description}</Markdown>
        </div>
        {/* Logos only; the name lives in the tooltip and the accessible label. */}
        {tags && tags.length > 0 && (
          <ul className="flex flex-wrap items-center gap-2.5 mt-auto">
            {tags.map((tag) => (
              <li key={tag.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      tabIndex={0}
                      aria-label={tag.name}
                      className="flex size-9 items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {tag.icon}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    sideOffset={6}
                    className="rounded-lg bg-primary text-primary-foreground px-3 py-1.5 text-xs"
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
