import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Small accent-filled link, the same gesture the project cards used to carry.
export function CornerArrow({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full bg-highlight text-highlight-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    >
      <ArrowUpRight className="size-4" aria-hidden />
    </a>
  );
}
