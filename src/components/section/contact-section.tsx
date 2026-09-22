/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { CopyPill } from "@/components/copy-pill";
import { DisappearingWord } from "@/components/disappearing-word";
import { DATA } from "@/data/resume";

export default function ContactSection() {
  const { share, email } = DATA.contact;

  return (
    <div className="flex flex-col items-center gap-12 sm:flex-row sm:items-center sm:gap-16">
      {/* Point a phone at the code, or take the handle. The column is a fixed width so
          the code and the pill under it line up exactly. */}
      <div className="flex w-28 max-w-full shrink-0 flex-col gap-3">
        <img
          src={share.qr}
          alt={`QR code for ${share.label}`}
          className="aspect-square w-full rounded-lg border border-border p-2"
        />
        <CopyPill label={share.label} url={share.url} />
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
          Say hi, and make something <DisappearingWord startOnView />.
        </h2>
        <p className="text-pretty">
          Scan the code for a chat, or bring me work: a tedious process, a
          back-office tool nobody enjoys, a thesis that needs a second pair of
          eyes. Questions about AdventureQuest scripting are welcome too. Email
          reaches me fastest at{" "}
          <Link
            href={`mailto:${email}`}
            className="font-medium underline underline-offset-4 hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            {email}
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
