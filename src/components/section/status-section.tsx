import Markdown from "react-markdown";
import type { Resume } from "@/data/resume";
import SectionHeader from "@/components/section/section-header";

// Short lines side by side, three to a row at most. The basis caps the row; flex
// wrapping centres whatever is left over on the last one.
export default function StatusSection({ status }: { status: Resume["status"] }) {
  if (status.length === 0) return null;

  return (
    <div className="flex flex-col gap-y-6">
      <SectionHeader title="Status" subtitle="Placeholder subtitle." />
      <ul className="flex flex-wrap justify-center gap-x-8 gap-y-5">
        {status.map((item) => (
          <li
            key={item.label}
            className="flex basis-full items-center justify-center gap-2.5 text-center sm:basis-[calc(50%-2rem)] md:basis-[calc(33.333%-2rem)]"
          >
            <span aria-hidden className="relative flex size-2.5 shrink-0">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-highlight opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex size-2.5 rounded-full bg-highlight" />
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
