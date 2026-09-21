import type { Resume } from "@/data/resume";
import EntryList from "@/components/section/entry-list";

export default function WorkSection({ work }: { work: Resume["work"] }) {
  return (
    <EntryList
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
