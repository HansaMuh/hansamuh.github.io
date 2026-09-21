import type { Resume } from "@/data/resume";
import EntryList from "@/components/section/entry-list";
import SectionHeader from "@/components/section/section-header";
import { ICONS } from "@/data/icons";

export default function CertificationsSection({
  certifications,
}: {
  certifications: Resume["certifications"];
}) {
  return (
    <div className="flex min-h-0 flex-col gap-y-8">
      <SectionHeader title="Certifications" subtitle="Checked by someone else." />
      <EntryList
        items={certifications.map((item) => ({
          id: item.name,
          title: item.name,
          subtitle: item.issuer,
          dates: item.date,
          logoUrl: item.logoUrl,
          description: item.description,
          link: item.href
            ? {
                href: item.href,
                label: "View certificate",
                icon: <ICONS.globe className="size-3" />,
              }
            : undefined,
        }))}
      />
    </div>
  );
}
