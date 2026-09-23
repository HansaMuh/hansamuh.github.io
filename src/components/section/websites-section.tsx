"use client";

import type { Resume } from "@/data/resume";
import { ICONS } from "@/data/icons";
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function WebsitesSection({ social }: { social: Resume["contact"]["social"] }) {
  const websites = Object.values(social).filter((item) => item.websites);

  return (
    <ul className="flex flex-wrap justify-center gap-4">
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
                  className="flex size-13 items-center justify-center rounded-xl transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  <SocialIcon className="size-8" aria-hidden />
                </a>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                sideOffset={8}
                className="rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)]"
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
