"use client";

import { Badge } from "@/components/ui/badge";
import { Safari } from "@/components/magicui/safari";
import { cn } from "@/lib/utils";
import { MagicCard } from "@/components/magicui/magic-card";
import Link from "next/link";
import Markdown from "react-markdown";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly { name: string; icon: React.ReactNode }[];
  link?: string;
  image?: string;
  video?: string;
  /** Address shown in the Safari frame's URL bar. */
  previewUrl?: string;
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
  image,
  video,
  previewUrl,
  links,
  className,
}: Props) {
  return (
    <MagicCard
      mode="orb"
      glowFrom="#0078ff"
      glowTo="#f1e302"
      glowOpacity={0.3}
      glowBlur={50}
      glowSize={300}
      className={cn(
        "flex flex-col h-full rounded-xl border border-border bg-card text-card-foreground overflow-hidden",
        className
      )}
    >
      <div className="relative shrink-0">
        <Link
          href={href || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-muted px-4 pt-4"
          // Same destination as the title's arrow link, so keep it out of the tab order.
          tabIndex={-1}
          aria-hidden
        >
          {/* A browser frame around the preview; the screen stays empty until a screenshot is added. */}
          <Safari url={previewUrl} imageSrc={image || undefined} videoSrc={video || undefined} className="drop-shadow-sm" />
        </Link>
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
        <div className="text-xs flex-1 prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
          <Markdown>{description}</Markdown>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {tags.map((tag) => (
              <Badge
                key={tag.name}
                className="text-[11px] font-medium border border-border h-6 w-fit px-2 gap-1.5"
                variant="outline"
              >
                {tag.icon}
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </MagicCard>
  );
}
