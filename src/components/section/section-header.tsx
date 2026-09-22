// One header shape for every section: an accent pill between two rules that fade out
// toward the page edges, with a smaller bold line under it.
export default function SectionHeader({
  title,
  subtitle,
  titleHidden = false,
}: {
  title: string;
  subtitle?: string;
  /** Keeps the heading in the outline for screen readers but shows only the subtitle. */
  titleHidden?: boolean;
}) {
  if (titleHidden) {
    return (
      <div className="text-center">
        <h2 className="sr-only">{title}</h2>
        {subtitle && <p className="text-sm font-semibold italic">{subtitle}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="flex w-full items-center">
        <div className="h-px flex-1 bg-linear-to-r from-transparent from-5% via-foreground/30 via-95% to-transparent" />
        <div className="z-10 rounded-full bg-highlight px-5 py-1">
          <h2 className="text-xl font-bold text-highlight-foreground">{title}</h2>
        </div>
        <div className="h-px flex-1 bg-linear-to-l from-transparent from-5% via-foreground/30 via-95% to-transparent" />
      </div>
      {subtitle && <p className="text-sm font-semibold italic">{subtitle}</p>}
    </div>
  );
}
