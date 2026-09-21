import Markdown from "react-markdown";
import type { Resume } from "@/data/resume";
import { ICONS } from "@/data/icons";

// Five short "right now" lines as accent pills: icon left, detail right. The detail
// carries markdown links, so it renders through react-markdown.
export default function StatusSection({ status }: { status: Resume["status"] }) {
  if (status.length === 0) return null;

  return (
    <div className="flex flex-col gap-y-4">
      <h2 className="flex items-center gap-2 text-xl font-bold">
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex size-full rounded-full bg-highlight opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-flex size-2.5 rounded-full bg-highlight" />
        </span>
        My status? Right now, I’m currently:
      </h2>
      {/* Three across on wide screens; the short last row centres itself. */}
      <ul className="flex flex-wrap justify-center gap-2">
        {status.map((item) => {
          const ItemIcon = ICONS[item.icon];
          return (
            <li
              key={item.label}
              className="flex w-full items-start gap-2 rounded-lg bg-highlight px-3 py-2 text-highlight-foreground sm:basis-[calc(50%-0.25rem)] lg:basis-[calc(33.333%-0.5rem)]"
            >
              <ItemIcon className="mt-0.5 size-4 shrink-0" aria-label={item.label} />
              <div className="text-xs leading-relaxed [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2">
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
