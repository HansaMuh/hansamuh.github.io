"use client";

import { useEffect, useState } from "react";
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
import { scrollToSection, smoothScrollTo } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

type NavItem = Resume["navbar"]["top"][number];

// Tells the active-section tracker which section a menu click asked for.
const NAV_TARGET_EVENT = "nav:target";

// "#top" has no element behind it: it means the very top of the page.
function handleNavClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
  const target = href === "#top" ? null : document.querySelector<HTMLElement>(href);
  if (href !== "#top" && !target) return;
  event.preventDefault();
  window.dispatchEvent(new CustomEvent(NAV_TARGET_EVENT, { detail: href }));
  if (target) scrollToSection(target);
  else smoothScrollTo(0);
  history.pushState(null, "", href === "#top" ? window.location.pathname : href);
}

// One item lights at a time: the topmost section that is fully visible between the
// menu and the bottom of the screen. Sections taller than that space (My Projects on
// most screens) count while they fill it, from the moment their top reaches the spot
// a menu click scrolls them to. After a menu click the clicked section wins while it
// is on screen, until the visitor scrolls on their own (wheel, touch or keys).
function useActiveSection(hrefs: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    let clicked: string | null = null;

    const update = () => {
      frame = 0;
      const menu = document.querySelector('nav[aria-label="Main menu"] > div');
      const top = menu ? menu.getBoundingClientRect().bottom : 0;
      const bottom = window.innerHeight;

      if (clicked) {
        const box = document.querySelector(clicked)?.getBoundingClientRect();
        if (box && box.top < bottom && box.bottom > top) return setActive(clicked);
      }

      const topmost = hrefs.find((href) => {
        const section = document.querySelector<HTMLElement>(href);
        if (!section) return false;
        const box = section.getBoundingClientRect();
        const landing = Math.max(top, parseFloat(getComputedStyle(section).scrollMarginTop) || 0);
        const fits = box.top >= top - 1 && box.bottom <= bottom + 1;
        const fills = box.top <= landing + 1 && box.bottom >= bottom;
        return fits || fills;
      });
      setActive(topmost ?? null);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onTarget = (event: Event) => {
      const href = (event as CustomEvent<string>).detail;
      clicked = hrefs.includes(href) ? href : null;
      schedule();
    };
    const release = () => {
      clicked = null;
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener(NAV_TARGET_EVENT, onTarget);
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchstart", release, { passive: true });
    window.addEventListener("keydown", release);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener(NAV_TARGET_EVENT, onTarget);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchstart", release);
      window.removeEventListener("keydown", release);
    };
  }, [hrefs]);

  return active;
}

function NavLink({ item, active = false }: { item: NavItem; active?: boolean }) {
  const ItemIcon = ICONS[item.icon];
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={item.href}
          onClick={(event) => handleNavClick(event, item.href)}
          aria-label={item.label}
          aria-current={active ? "location" : undefined}
          className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <DockIcon
            className={cn(
              "rounded-full cursor-pointer size-full p-0 border transition-colors",
              active
                ? "bg-highlight text-highlight-foreground border-highlight"
                : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted border-border"
            )}
          >
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

function DockSeparator({ className }: { className?: string }) {
  return (
    <Separator
      orientation="vertical"
      className={cn("h-2/3 my-auto w-px shrink-0 bg-border", className)}
    />
  );
}

export default function Navbar({ navbar }: { navbar: Resume["navbar"] }) {
  const [sectionHrefs] = useState(() => navbar.sections.map((item) => item.href));
  const active = useActiveSection(sectionHrefs);

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
          <NavLink key={item.href} item={item} active={item.href === active} />
        ))}
        {/* The clock is desktop-only, so its divider goes with it. */}
        <DockSeparator className="hidden sm:block" />
        <WibClock />
      </Dock>
    </nav>
  );
}
