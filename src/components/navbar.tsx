"use client";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { WibClock } from "@/components/wib-clock";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Resume } from "@/data/resume";
import { ICONS } from "@/data/icons";

type NavItem = Resume["navbar"]["top"][number];

function NavLink({ item }: { item: NavItem }) {
  const ItemIcon = ICONS[item.icon];
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={item.href}
          aria-label={item.label}
          className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <DockIcon className="rounded-full cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted border border-border transition-colors">
            <ItemIcon className="size-full" />
          </DockIcon>
        </a>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        sideOffset={8}
        className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)]"
      >
        <p>{item.label}</p>
        <TooltipArrow className="fill-primary" />
      </TooltipContent>
    </Tooltip>
  );
}

function DockSeparator() {
  return (
    <Separator orientation="vertical" className="h-2/3 my-auto w-px shrink-0 bg-border" />
  );
}

export default function Navbar({ navbar }: { navbar: Resume["navbar"] }) {
  return (
    <nav
      aria-label="Main menu"
      className="pointer-events-none fixed inset-x-0 top-4 z-30 flex justify-center px-4"
    >
      {/* Below sm the full menu is wider than the screen, so the pill scrolls sideways. */}
      <Dock
        baseSize={44}
        magnification={60}
        className="pointer-events-auto relative h-15 p-2 w-max max-w-full items-start flex gap-2 border bg-card/90 backdrop-blur-3xl shadow-[0_0_10px_3px] shadow-primary/5 max-sm:overflow-x-auto max-sm:justify-start max-sm:[scrollbar-width:none]"
      >
        {navbar.top.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
        <DockSeparator />
        {navbar.sections.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
        <DockSeparator />
        <WibClock />
      </Dock>
    </nav>
  );
}
