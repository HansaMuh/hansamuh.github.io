import Markdown from "react-markdown";
import type { Resume } from "@/data/resume";
import { ICONS } from "@/data/icons";

// Five short "right now" cards. The detail lines carry markdown links, so they are
// rendered through react-markdown with the anchor styling this site uses elsewhere.
export default function StatusSection({ status }: { status: Resume["status"] }) {
  if (status.length === 0) return null;

  return (
    <div className="flex flex-col gap-y-4">
      <p className="flex items-center gap-2 text-sm font-medium text-foreground">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full rounded-full bg-highlight opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-flex size-2 rounded-full bg-highlight" />
        </span>
        My status? Right now, I’m currently:
      </p>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {status.map((item) => {
          const ItemIcon = ICONS[item.icon];
          return (
            <li
              key={item.label}
              className="flex h-full flex-col gap-2 rounded-xl border border-border bg-card p-4"
            >
              <span className="flex items-center gap-2">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-highlight/12 text-highlight">
                  <ItemIcon className="size-4" aria-hidden />
                </span>
                <span className="text-sm font-semibold text-card-foreground">{item.label}</span>
              </span>
              <div className="text-xs leading-relaxed text-muted-foreground [&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2">
                <Markdown
                  components={{
                    p: ({ children }) => <p>{children}</p>,
                    a: ({ href, children }) => (
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        {children}
                      </a>
                    ),
                  }}
                >
                  {item.detail}
                </Markdown>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
