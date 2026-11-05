import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

import { PdfViewer } from "@/components/pdf-viewer";
import { DATA } from "@/data/resume";
import { CV_DOWNLOAD_NAME, CV_PDF } from "@/lib/cv";
import { cn } from "@/lib/utils";

const TITLE = "Curriculum Vitae";
const DESCRIPTION = `The Curriculum Vitae of ${DATA.name}. Read it here, or print or download the PDF.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/cv/" },
  // Replaces the root openGraph block as a whole, so the card image is repeated here.
  openGraph: {
    title: `${TITLE} | ${DATA.name}`,
    description: DESCRIPTION,
    url: "/cv/",
    siteName: DATA.name,
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: DATA.name }],
  },
  twitter: {
    title: `${TITLE} | ${DATA.name}`,
    description: DESCRIPTION,
    card: "summary_large_image",
    images: ["/opengraph-image.png"],
  },
};

// 44px tall: a comfortable tap on a phone, and the bar stays slim on a desktop.
const barButton =
  "inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background";

// A standalone page for sharing: one slim bar, and the browser's PDF viewer fills the rest.
export default function CvPage() {
  return (
    <div className="flex h-dvh flex-col">
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-border px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold tracking-tighter sm:text-xl">
            {DATA.name}
          </h1>
          <p className="text-sm">{TITLE}</p>
        </div>
        <div className="flex gap-2 max-sm:w-full">
          <Link
            href="/"
            className={cn(
              barButton,
              "border border-border bg-background hover:bg-card max-sm:flex-1",
            )}
          >
            <ArrowLeft aria-hidden className="size-4" />
            Portfolio
          </Link>
          {/* The one accent on the page: saving a copy is what most visitors came for. */}
          <a
            href={CV_PDF}
            download={CV_DOWNLOAD_NAME}
            className={cn(
              barButton,
              "bg-highlight text-highlight-foreground hover:opacity-90 max-sm:flex-1",
            )}
          >
            <Download aria-hidden className="size-4" />
            Download
          </a>
        </div>
      </header>
      <main className="min-h-0 flex-1">
        <PdfViewer title={`${TITLE} of ${DATA.name}`} className="h-full" />
      </main>
    </div>
  );
}
