import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { PageGrid } from "@/components/page-grid";
import { MotionProvider } from "@/components/motion-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { BANNER_WAIT_SCRIPT } from "@/lib/banner";

// The portfolio frame: menu, flickering grid and footer. The home page and the 404 page
// wrap themselves in it; standalone pages such as /cv/ do not.
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Holds the hero on the plain page colour until the banner still is ready. It runs
          here, ahead of the hero in the body, rather than in <head>, so pages without a
          hero do not fetch the poster. An inline script blocks parsing, so the class is
          still in place before the hero is painted. */}
      <script dangerouslySetInnerHTML={{ __html: BANNER_WAIT_SCRIPT }} />
      <MotionProvider>
        <TooltipProvider delayDuration={0}>
          <PageGrid />
          <Navbar navbar={DATA.navbar} />
          <div className="relative z-10">
            {children}
            <div className="mx-auto max-w-3xl px-6">
              <Footer />
            </div>
          </div>
        </TooltipProvider>
      </MotionProvider>
    </>
  );
}
