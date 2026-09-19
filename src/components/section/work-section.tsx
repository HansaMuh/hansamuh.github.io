import type { Resume } from "@/data/resume";
import TimelineAccordion from "@/components/section/timeline-accordion";

export default function WorkSection({ work }: { work: Resume["work"] }) {
  return (
    <TimelineAccordion
      items={work.map((item) => ({
        id: item.company,
        title: item.company,
        subtitle: item.title,
        dates: `${item.start} - ${item.end ?? "Present"}`,
        logoUrl: item.logoUrl,
        description: item.description,
      }))}
    />
  );
}
