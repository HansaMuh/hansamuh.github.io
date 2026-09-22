import { HyperText } from "@/components/magicui/hyper-text";

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz".split("");

// The emphasized word scrambles, then settles: it looks like the word being worked on.
// It inherits its colour: white over the hero banner, page foreground in the contact block.
// An invisible copy holds the final width so the line doesn't jitter while letters
// change, and screen readers get the plain word.
export function DisappearingWord({ startOnView = false }: { startOnView?: boolean }) {
  return (
    <em className="relative inline-block">
      <span className="sr-only">disappear</span>
      <span aria-hidden className="invisible">
        disappear
      </span>
      <HyperText
        as="span"
        aria-hidden
        uppercase={false}
        characterSet={LOWERCASE}
        duration={1200}
        delay={400}
        startOnView={startOnView}
        className="absolute inset-0 whitespace-nowrap"
      >
        disappear
      </HyperText>
    </em>
  );
}
