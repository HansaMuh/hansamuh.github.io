import Link from "next/link";
import { BorderBeam } from "@/components/magicui/border-beam";
import { DisappearingWord } from "@/components/disappearing-word";
import { DATA } from "@/data/resume";

export default function ContactSection() {
  return (
    <div className="border rounded-xl p-10 relative bg-background">
      <div className="absolute -top-4 bg-highlight z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
        <span className="text-highlight-foreground text-sm font-medium">Contact Me</span>
      </div>
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
      {/* The one moving edge on the page marks the place to act. */}
      <BorderBeam size={120} duration={8} colorFrom="#0a0a0a" colorTo="#0078ff" />
    </div>
  );
}
