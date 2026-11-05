import { DayNight } from "@/components/day-night";
import { ThemeProvider } from "@/components/theme-provider";
import { DATA, META_DESCRIPTION } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: "Portfolio | hansamuh",
    template: `%s | ${DATA.name}`,
  },
  description: META_DESCRIPTION,
  openGraph: {
    title: `${DATA.name}`,
    description: META_DESCRIPTION,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: DATA.name }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
    images: ["/opengraph-image.png"],
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Paints the right phase before first paint, so night never flashes white. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=new URLSearchParams(location.search).get("phase");var night;if(p==="night"||p==="dark"){night=true}else if(p==="day"||p==="light"){night=false}else{var h=Number(new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Jakarta",hour:"2-digit",hour12:false}).format(new Date()));night=h<6||h>=18}document.documentElement.classList.toggle("dark",night);document.documentElement.style.colorScheme=night?"dark":"light";localStorage.setItem("theme",night?"dark":"light");}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={cn(
          "relative min-h-screen bg-background font-sans antialiased",
          geist.variable,
          geistMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <DayNight />
          {/* The portfolio frame (menu, grid, footer) lives in SiteChrome, so pages
              like /cv/ can stand on their own. */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
