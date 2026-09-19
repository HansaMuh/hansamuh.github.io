import type { Resume } from "@/data/resume";
import TimelineAccordion from "@/components/section/timeline-accordion";

export default function CertificationsSection({
  certifications,
}: {
  certifications: Resume["certifications"];
}) {
  return (
    <TimelineAccordion
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
  );
}
