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

// Home lights while the whole hero block (intro, website buttons, status) fits on
// screen. Otherwise one item lights at a time: the topmost section fully visible between the
// menu and the bottom of the screen. Sections taller than that space (My Projects on
// most screens) count while they fill it, from the moment their top reaches the spot
// a menu click scrolls them to. After a menu click the clicked section wins while it
// is on screen, until the visitor scrolls on their own (wheel, touch or keys).
function useActiveSection(hrefs: string[]) {
  const [active, setActive] = useState<string | null>(null);
  // The menu goes see-through while it physically overlaps the banner behind the hero.
  const [onBanner, setOnBanner] = useState(true);

  useEffect(() => {
    let frame = 0;
    let clicked: string | null = null;

    const update = () => {
      frame = 0;
      const menu = document.querySelector('nav[aria-label="Main menu"] > div');
      const top = menu ? menu.getBoundingClientRect().bottom : 0;
      const bottom = window.innerHeight;

      const heroBox = document.querySelector<HTMLElement>("#hero")?.getBoundingClientRect();
      setOnBanner(heroBox ? heroBox.bottom > top : false);

      if (clicked) {
        const box = document.querySelector(clicked)?.getBoundingClientRect();
        if (box && box.top < bottom && box.bottom > top) return setActive(clicked);
      }

      // Home: the hero fits on screen, or (on phones, where it never fits) it fills it.
      const hero = document.querySelector<HTMLElement>("#hero");
      if (hero) {
        const box = hero.getBoundingClientRect();
        const fits = box.top >= top - 1 && box.bottom <= bottom + 1;
        // On phones the hero is taller than the screen, so it counts while its start
        // is still above the fold and it covers everything below.
        const fills = box.top > 0 && box.bottom >= bottom;
        if (fits || fills) return setActive("#top");
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

  return { active, onBanner };
}

function NavLink({
  item,
  active = false,
  onBanner = false,
}: {
  item: NavItem;
  active?: boolean;
  onBanner?: boolean;
}) {
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
                : onBanner
                  ? "bg-transparent text-white border-white/40 hover:bg-white/15"
                  : "bg-card text-foreground hover:bg-muted border-border"
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

function DockSeparator({ className, onBanner }: { className?: string; onBanner?: boolean }) {
  return (
    <Separator
      orientation="vertical"
      className={cn(
        "h-2/3 my-auto w-px shrink-0",
        onBanner ? "bg-white/40" : "bg-border",
        className
      )}
    />
  );
}

export default function Navbar({ navbar }: { navbar: Resume["navbar"] }) {
  const [sectionHrefs] = useState(() => navbar.sections.map((item) => item.href));
  const { active, onBanner } = useActiveSection(sectionHrefs);

  return (
    <nav
      aria-label="Main menu"
      className="pointer-events-none fixed inset-x-0 top-8 z-30 flex justify-center px-4"
    >
      {/* Below sm the full menu is wider than the screen, so the pill scrolls sideways. */}
      <Dock
        baseSize={44}
        magnification={60}
        className={cn(
          "pointer-events-auto relative h-15 p-2 w-max max-w-full items-start flex gap-2 transition-colors max-sm:overflow-x-auto max-sm:justify-start max-sm:[scrollbar-width:none]",
          onBanner
            ? "border-white/25 bg-black/30 backdrop-blur-md"
            : "border bg-card/90 backdrop-blur-3xl shadow-[0_0_10px_3px] shadow-primary/5"
        )}
      >
        {navbar.top.map((item) => (
          <NavLink key={item.href} item={item} active={item.href === active} onBanner={onBanner} />
        ))}
        <DockSeparator onBanner={onBanner} />
        {navbar.sections.map((item) => (
          <NavLink key={item.href} item={item} active={item.href === active} onBanner={onBanner} />
        ))}
        {/* The clock is desktop-only, so its divider goes with it. */}
        <DockSeparator className="hidden sm:block" onBanner={onBanner} />
        <WibClock className={onBanner ? "text-white" : undefined} />
      </Dock>
    </nav>
  );
}
