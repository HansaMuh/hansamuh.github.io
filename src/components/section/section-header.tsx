// One header shape for every section: an accent pill between two rules that fade out
// toward the page edges, with a smaller bold line under it.
export default function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="flex w-full items-center">
        <div className="h-px flex-1 bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
        <div className="z-10 rounded-full bg-highlight px-5 py-1">
          <h2 className="text-xl font-bold text-highlight-foreground">{title}</h2>
        </div>
        <div className="h-px flex-1 bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
      </div>
      {subtitle && <p className="text-sm font-semibold">{subtitle}</p>}
    </div>
  );
}
