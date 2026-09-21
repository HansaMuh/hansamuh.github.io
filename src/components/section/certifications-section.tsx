import type { Resume } from "@/data/resume";
import EntryList from "@/components/section/entry-list";

export default function CertificationsSection({
  certifications,
}: {
  certifications: Resume["certifications"];
}) {
  return (
    <div className="flex min-h-0 flex-col gap-y-8">
      <div className="flex flex-col gap-y-4 items-center justify-center">
        <div className="flex items-center w-full">
          <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
          <div className="bg-highlight z-10 rounded-xl px-4 py-1">
            <span className="text-highlight-foreground text-sm font-medium">Certifications</span>
          </div>
          <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
        </div>
        <div className="flex flex-col gap-y-3 items-center justify-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Checked by someone else.
          </h2>
          <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
            Test scores and certificates, with the originals a click away.
          </p>
        </div>
      </div>
      <EntryList
        items={certifications.map((item) => ({
          id: item.name,
          title: item.name,
          subtitle: item.issuer,
          dates: item.date,
          logoUrl: item.logoUrl,
          description: item.description,
          link: item.href
            ? { href: item.href, label: "View certificate" }
            : undefined,
        }))}
      />
    </div>
  );
}
