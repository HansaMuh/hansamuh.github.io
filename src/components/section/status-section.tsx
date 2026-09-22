import Markdown from "react-markdown";
import type { Resume } from "@/data/resume";
import SectionHeader from "@/components/section/section-header";

// Short lines side by side, three to a row at most. The basis caps the row; flex
// wrapping centres whatever is left over on the last one.
export default function StatusSection({ status }: { status: Resume["status"] }) {
  if (status.length === 0) return null;

  return (
    <div className="flex flex-col gap-y-6">
      <SectionHeader title="Status" subtitle="Placeholder subtitle." titleHidden />
      <ul className="flex flex-wrap justify-center gap-x-5 gap-y-3">
        {status.map((item) => (
          <li
            key={item.label}
            className="flex basis-full items-center justify-center gap-2.5 text-center sm:basis-[calc(50%-1.25rem)] md:basis-[calc(33.333%-1.25rem)]"
          >
            {/* Hollow: the banner shows through the middle of the ring. */}
            <span aria-hidden className="relative flex size-3 shrink-0">
              <span className="absolute inline-flex size-full animate-ping rounded-full border-2 border-highlight opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex size-3 rounded-full border-2 border-highlight" />
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
