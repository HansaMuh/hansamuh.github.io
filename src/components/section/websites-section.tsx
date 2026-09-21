"use client";

import type { Resume } from "@/data/resume";
import { ICONS } from "@/data/icons";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function WebsitesSection({ social }: { social: Resume["contact"]["social"] }) {
  const websites = Object.values(social).filter((item) => item.websites);

  return (
    <ul className="flex flex-wrap gap-1">
      {websites.map((item) => {
        const isExternal = item.url.startsWith("http");
        const SocialIcon = ICONS[item.icon];
        return (
          <li key={item.url}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={item.url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  aria-label={item.name}
                  className="group relative flex size-11 items-center justify-center overflow-hidden rounded-xl text-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <SocialIcon className="size-5" aria-hidden />
                  {/* The shiny-text sweep, re-aimed at the glyph: a band of light crosses
                      the icon and blends away against the page behind it. */}
                  <span
                    aria-hidden
                    style={{ ["--shiny-width" as string]: "28px" }}
                    className="animate-shiny-text pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-white/95 to-transparent bg-size-[var(--shiny-width)_100%] bg-no-repeat bg-position-[0_0] mix-blend-screen motion-reduce:hidden dark:via-black/85 dark:mix-blend-multiply"
                  />
                </a>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                sideOffset={8}
                className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)]"
              >
                <p>{item.name}</p>
                <TooltipArrow className="fill-primary" />
              </TooltipContent>
            </Tooltip>
          </li>
        );
      })}
    </ul>
  );
}
