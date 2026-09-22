/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { CopyPill } from "@/components/copy-pill";
import { DATA } from "@/data/resume";

const linkClass =
  "font-medium underline underline-offset-4 hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm";

export default function ContactSection() {
  const { share, email } = DATA.contact;

  return (
    <div className="flex flex-col items-center gap-12 sm:flex-row sm:items-center sm:gap-16">
      {/* Point a phone at the code, or take the handle. The column is a fixed width so
          the code and the pill under it line up exactly. */}
      <div className="flex w-28 max-w-full shrink-0 flex-col gap-3">
        <div className="aspect-square w-full rounded-lg border border-border p-2">
          <img
            src={share.qr}
            alt={`QR code for ${share.label}`}
            className="size-full rounded-[4px]"
          />
        </div>
        <CopyPill label={share.label} url={share.url} />
      </div>
      <div className="flex flex-col gap-3">
        {/* Sized like a section header: 20px title, 14px body. No pill, and the copy
            stays upright and left aligned, because it is prose and not a caption. */}
        <h2 className="text-xl font-bold">Get in touch!</h2>
        <p className="text-pretty text-sm">
          I may be introverted, but I&rsquo;m always happy to have conversations
          with people in the industry! Contact me on {" "}
          <Link
            href={share.url}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Threads
          </Link>{" "}
          for opportunities. Who knows what kind of future awaits for us? Or...
        </p>
        <p className="text-pretty text-sm">
          Reach me on email if you prefer being professional. I&rsquo;d still
          appreciate it. It&rsquo;s that simple, of course:{" "}
          <Link
            href={`mailto:${email}`}
            className={linkClass}
          >
            {email}
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
