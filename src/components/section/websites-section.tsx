import { DATA } from "@/data/resume";
import { ICONS } from "@/data/icons";

export default function WebsitesSection() {
  const websites = Object.values(DATA.contact.social).filter((social) => social.websites);

  return (
    <ul className="flex flex-wrap gap-2">
      {websites.map((social) => {
        const isExternal = social.url.startsWith("http");
        const SocialIcon = ICONS[social.icon];
        return (
          <li key={social.url}>
            <a
              href={social.url}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="flex h-11 items-center gap-2 rounded-xl border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <SocialIcon className="size-4" aria-hidden />
              {social.name}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
