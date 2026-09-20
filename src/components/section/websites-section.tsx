import { DATA } from "@/data/resume";
import { ICONS } from "@/data/icons";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

export default function WebsitesSection() {
  const websites = Object.values(DATA.contact.social).filter((social) => social.websites);

  return (
    <ul className="flex flex-wrap gap-2">
      {websites.map((social) => {
        const isExternal = social.url.startsWith("http");
        const SocialIcon = ICONS[social.icon];
        return (
          <li key={social.url}>
            <ShimmerButton
              href={social.url}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              borderRadius="0.75rem"
              shimmerDuration="2.5s"
              className="h-11 gap-2 px-4 py-0 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <SocialIcon className="size-4" aria-hidden />
              {social.name}
            </ShimmerButton>
          </li>
        );
      })}
    </ul>
  );
}
