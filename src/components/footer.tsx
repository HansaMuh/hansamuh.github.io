const linkClass =
  "font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border pt-6 text-center text-xs text-muted-foreground">
      <p>
        Built on the{" "}
        <a
          href="https://github.com/dillionverma/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          portfolio template
        </a>{" "}
        by Dillion Verma and the{" "}
        <a
          href="https://magicui.design"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Magic UI
        </a>{" "}
        team. Thank you for making this site possible.
      </p>
    </footer>
  );
}
