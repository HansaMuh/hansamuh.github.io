import Link from "next/link";
import { MagicCard } from "@/components/magicui/magic-card";
import { DisappearingWord } from "@/components/disappearing-word";
import { DATA } from "@/data/resume";

export default function ContactSection() {
  return (
    <div className="relative">
      <div className="absolute -top-4 left-1/2 z-20 -translate-x-1/2 rounded-xl bg-highlight px-4 py-1">
        <span className="text-highlight-foreground text-sm font-medium">Contact Me</span>
      </div>
      <MagicCard
        mode="orb"
      glowFrom="#0078ff"
      glowTo="#f1e302"
      glowOpacity={0.3}
      glowBlur={50}
      glowSize={340}
      className="border rounded-xl p-10 relative bg-background"
    >
      <div className="relative flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Got something tedious?
          <br />
          Let’s make it <DisappearingWord startOnView />.
        </h2>
        <p className="mx-auto max-w-lg text-muted-foreground text-balance">
          I’m open to software engineering roles and collaborations. Email is
          the quickest way to reach me:{" "}
          <Link
            href={`mailto:${DATA.contact.email}`}
            className="font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            {DATA.contact.email}
          </Link>
        </p>
      </div>
      </MagicCard>
    </div>
  );
}
