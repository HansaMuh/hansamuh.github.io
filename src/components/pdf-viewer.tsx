"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Download, ExternalLink } from "lucide-react";

import { CV_DOWNLOAD_NAME, CV_PDF } from "@/lib/cv";
import { cn } from "@/lib/utils";

// Nothing to subscribe to: whether the browser has a PDF viewer does not change.
const subscribe = () => () => {};
// Older browsers leave pdfViewerEnabled undefined; most of them still show PDFs inline.
const hasInlineViewer = () => navigator.pdfViewerEnabled !== false;
// The static HTML cannot know, so it renders the loading state until hydration.
const unknownOnServer = () => null;

const actionClass =
  "inline-flex h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background";

// The browser's own viewer does the work: zoom, print, search, and the links inside the PDF.
// Android Chrome has no viewer that fits in a frame, so it gets buttons that hand the file
// over instead. The choice is made after mount, so Android never mounts the frame at all.
export function PdfViewer({ title, className }: { title: string; className?: string }) {
  const inline = useSyncExternalStore(subscribe, hasInlineViewer, unknownOnServer);

  if (inline === null) {
    return (
      <div className={cn("grid place-items-center bg-muted", className)}>
        <p role="status" className="text-sm">
          Loading the CV…
        </p>
      </div>
    );
  }

  if (inline) return <InlineFrame title={title} className={className} />;

  return (
    <div className={cn("grid place-items-center bg-muted px-6", className)}>
      <div className="flex max-w-sm flex-col items-center gap-5 text-center">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold tracking-tight">
            This browser can&rsquo;t show the CV on the page.
          </h2>
          <p className="text-sm">Open it in your PDF viewer, or save a copy.</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={CV_PDF}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(actionClass, "bg-highlight text-highlight-foreground hover:opacity-90")}
          >
            <ExternalLink aria-hidden className="size-4" />
            Open PDF
          </a>
          <a
            href={CV_PDF}
            download={CV_DOWNLOAD_NAME}
            className={cn(actionClass, "border border-border bg-background hover:bg-card")}
          >
            <Download aria-hidden className="size-4" />
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}

// Chrome's viewer takes focus into its own process: the frame never matches :focus, so a
// CSS ring cannot show that keyboard focus has moved into the CV. The page only sees that
// it lost focus to the frame, so the ring is drawn from that. Keyboard only: a click into
// the PDF does not need it. Two bands, so one of them stands out against the viewer's dark
// toolbar and against the white page alike.
function InlineFrame({ title, className }: { title: string; className?: string }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [keyboardFocus, setKeyboardFocus] = useState(false);

  useEffect(() => {
    let viaKeyboard = false;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Tab") viaKeyboard = true;
    };
    const onPointer = () => {
      viaKeyboard = false;
    };
    const onBlur = () =>
      requestAnimationFrame(() =>
        setKeyboardFocus(viaKeyboard && document.activeElement === frame.current),
      );
    const onFocus = () => setKeyboardFocus(false);

    window.addEventListener("keydown", onKey, true);
    window.addEventListener("pointerdown", onPointer, true);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      window.removeEventListener("pointerdown", onPointer, true);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  return (
    <div className={cn("relative", className)}>
      {/* navpanes=0 hides the thumbnail sidebar, which only repeats a one-page CV. */}
      <iframe
        ref={frame}
        src={`${CV_PDF}#view=FitH&navpanes=0`}
        title={title}
        className="block size-full border-0 bg-muted"
      />
      {keyboardFocus && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_2px_var(--foreground),inset_0_0_0_4px_var(--background)]"
        />
      )}
    </div>
  );
}
