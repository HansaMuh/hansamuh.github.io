import Markdown from "react-markdown";
import type { Resume } from "@/data/resume";

// Short lines side by side, each on a single line from sm up: the items size to their
// own text and flex wrapping centres each row. Phones keep the full width and wrap.
export default function StatusSection({ status }: { status: Resume["status"] }) {
  if (status.length === 0) return null;

  return (
    <div className="flex flex-col gap-y-8">
      <h2 className="text-center text-base font-semibold md:text-lg lg:text-xl">Currently...</h2>
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3">
        {status.map((item) => (
          <li
            key={item.label}
            className="flex basis-full items-center justify-center gap-2.5 text-center sm:basis-auto sm:whitespace-nowrap"
          >
            {/* Hollow and white: the ring only ever sits on the dark banner. */}
            <span aria-hidden className="relative flex size-3 shrink-0">
              <span className="absolute inline-flex size-full animate-ping rounded-full border-2 border-white opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex size-3 rounded-full border-2 border-white" />
            </span>
            <div className="text-sm leading-relaxed [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2">
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
        ))}
      </ul>
    </div>
  );
}
