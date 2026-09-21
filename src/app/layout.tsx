import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { PageParticles } from "@/components/page-particles";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { DayNight } from "@/components/day-night";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
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
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
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
          "min-h-screen bg-background font-sans antialiased relative",
          geist.variable,
          geistMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <DayNight />
          <TooltipProvider delayDuration={0}>
            <PageParticles />
            <ScrollProgress className="h-0.5 bg-none bg-foreground" />
            <Navbar navbar={DATA.navbar} />
            <div className="relative z-10 max-w-3xl mx-auto pt-28 sm:pt-32 px-6">
              {children}
              <Footer />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
