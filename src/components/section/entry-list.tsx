import type { ReactNode } from "react";
import Markdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { EntryLogo } from "@/components/section/entry-logo";

export interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  dates: string;
  logoUrl: string;
  description: string;
  link?: { href: string; label: string; icon?: ReactNode };
}

// Shared by Work Experience and Certifications. Everything is visible from the start:
// nothing here is worth a click to reveal. A server component: the markdown renders at
// build time, and only the logo (EntryLogo) runs in the browser.
export default function EntryList({ items }: { items: TimelineItem[] }) {
  return (
    <ul className="grid w-full gap-6">
      {items.map((item) => (
        <li key={item.id} className="grid gap-2">
          <div className="flex w-full items-center justify-between gap-x-3 text-left">
            <div className="flex min-w-0 flex-1 items-center gap-x-3">
              <EntryLogo src={item.logoUrl} alt={item.subtitle} />
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <div className="leading-none font-semibold">{item.title}</div>
                <div className="font-sans text-sm text-muted-foreground">{item.subtitle}</div>
              </div>
            </div>
            <span className="flex-none text-right text-xs text-muted-foreground tabular-nums">
              {item.dates}
            </span>
          </div>
          <div className="ml-13 flex flex-col items-start gap-3">
            {/* Markdown so an entry can carry a bulleted list; a plain sentence still
                renders as a single paragraph. */}
            <div className="text-sm text-muted-foreground [&_p+ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
              <Markdown>{item.description}</Markdown>
            </div>
            {item.link && (
              <a
                href={item.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-6 items-center rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <Badge
                  className="flex items-center gap-1.5 bg-foreground text-xs text-background hover:bg-foreground/90"
                  variant="default"
                >
                  {item.link.icon}
                  {item.link.label}
                </Badge>
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
