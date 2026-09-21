import Link from "next/link";
import { ShineBorder } from "@/components/magicui/shine-border";
import { DisappearingWord } from "@/components/disappearing-word";
import { DATA } from "@/data/resume";

export default function ContactSection() {
  return (
    <div className="relative overflow-hidden rounded-xl border bg-background p-10">
      {/* One accent-coloured outline, the only moving edge left on the page. */}
      <ShineBorder borderWidth={1.5} duration={10} shineColor="var(--highlight)" />
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
    </div>
  );
}
