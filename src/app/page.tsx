import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import { ICONS } from "@/data/icons";
import Markdown from "react-markdown";
import CertificationsSection from "@/components/section/certifications-section";
import ContactSection from "@/components/section/contact-section";
import ProjectsSection from "@/components/section/projects-section";
import WebsitesSection from "@/components/section/websites-section";
import WorkSection from "@/components/section/work-section";
import { DisappearingWord } from "@/components/disappearing-word";
import { Marquee } from "@/components/magicui/marquee";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section id="hero">
        <div className="mx-auto w-full space-y-4">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-3 flex flex-col order-2 md:order-1">
              <BlurFade delay={BLUR_FADE_DELAY} yOffset={8}>
                <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl">
                  I make tedious work
                  <br />
                  quietly <DisappearingWord />.
                </h1>
              </BlurFade>
              <BlurFadeText
                className="text-muted-foreground max-w-[600px] md:text-lg lg:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <Avatar className="size-40 border rounded-full shadow-lg ring-4 ring-muted">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <WebsitesSection />
          </BlurFade>
        </div>
      </section>
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">About Me</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>
                {DATA.summary}
              </Markdown>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection work={DATA.work} />
          </BlurFade>
        </div>
      </section>
      <section id="tech-stack">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Tech Stack</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            {/* The marquee repeats every chip, so it's hidden from screen readers; this list isn't. */}
            <ul className="sr-only">
              {DATA.skills.map((skill) => (
                <li key={skill.name}>{skill.name}</li>
              ))}
            </ul>
            <div
              aria-hidden
              className="flex flex-col gap-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
            >
              {[
                DATA.skills.slice(0, Math.ceil(DATA.skills.length / 2)),
                DATA.skills.slice(Math.ceil(DATA.skills.length / 2)),
              ].map((row, rowIndex) => (
                <Marquee key={rowIndex} pauseOnHover reverse={rowIndex === 1} className="[--duration:35s] [--gap:0.5rem] p-1">
                  {row.map((skill) => {
                    const SkillIcon = ICONS[skill.icon];
                    return (
                      <div
                        key={skill.name}
                        className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-4 flex items-center gap-2"
                      >
                        <SkillIcon className="size-4 shrink-0" />
                        <span className="text-foreground text-sm font-medium whitespace-nowrap">{skill.name}</span>
                      </div>
                    );
                  })}
                </Marquee>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection />
        </BlurFade>
      </section>
      <section id="certifications">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <CertificationsSection certifications={DATA.certifications} />
        </BlurFade>
      </section>
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
