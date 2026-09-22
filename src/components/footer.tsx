const linkClass =
  "font-medium text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-border py-3 text-center text-xs">
      <p>
        Major credits to{" "}
        <a
          href="https://github.com/dillionverma/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Dillion Verma
        </a>
        , the{" "}
        <a
          href="https://magicui.design"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Magic UI
        </a>{" "}
        team, and{" "}
        <a
          href="https://chillhop.com"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Chillhop Music
        </a>{" "}
        for making this portfolio possible.
      </p>
    </footer>
  );
}
