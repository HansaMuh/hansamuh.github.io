import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import { ICONS } from "@/data/icons";
import Markdown from "react-markdown";
import CertificationsSection from "@/components/section/certifications-section";
import SectionHeader from "@/components/section/section-header";
import ContactSection from "@/components/section/contact-section";
import ProjectsSection from "@/components/section/projects-section";
import StatusSection from "@/components/section/status-section";
import WebsitesSection from "@/components/section/websites-section";
import WorkSection from "@/components/section/work-section";
import { Marquee } from "@/components/magicui/marquee";
import { HeroBanner } from "@/components/hero-banner";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-28 relative">
      <section
        id="hero"
        className="relative min-h-dvh text-white"
      >
        <HeroBanner />
        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col px-6 pt-32 pb-40 sm:pt-40 sm:pb-48">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-3 flex flex-col order-2 md:order-1">
              <BlurFade delay={BLUR_FADE_DELAY} yOffset={8}>
                <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl">
                  Sup! The name&rsquo;s Raihan.
                </h1>
              </BlurFade>
              <BlurFadeText
                className="max-w-[600px] whitespace-pre-line md:text-lg lg:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <Avatar className="size-40 border border-white/20 rounded-full shadow-lg ring-4 ring-white/25">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
          <BlurFade delay={BLUR_FADE_DELAY * 2} className="mt-10">
            <WebsitesSection social={DATA.contact.social} />
          </BlurFade>
          <div id="status" className="mt-16">
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <StatusSection status={DATA.status} />
            </BlurFade>
          </div>
        </div>
      </section>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-28 px-6">
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-8">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <SectionHeader title="About Me" subtitle="Well, there&rsquo;s so much about me, but I am..." />
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
        <div className="flex min-h-0 flex-col gap-y-8">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <SectionHeader title="Work Experience" subtitle="I&rsquo;m unemployed! Wait, that sounds like a self-burn. Anyway..." />
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection work={DATA.work} />
          </BlurFade>
        </div>
      </section>
      <section id="tech-stack">
        <div className="flex min-h-0 flex-col gap-y-8">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <SectionHeader title="Tech Stack" subtitle="Cool stuff for my cool works. In fact, .NET is my playground!" />
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
      </div>
    </main>
  );
}
