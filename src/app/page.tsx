import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
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
    <main className="relative flex min-h-dvh flex-col gap-28">
      <section id="hero" className="relative min-h-[calc(100dvh+7rem)] text-white">
        <HeroBanner />
        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col px-6 pt-32 pb-40 sm:pt-40 sm:pb-48">
          <div className="flex flex-col justify-between gap-2 gap-y-6 md:flex-row">
            <div className="order-2 flex flex-col gap-3 md:order-1">
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
              {/* A plain <img>, not Radix's Avatar: that one only inserts the photo after
                  JavaScript has loaded it, so the browser could not start the request
                  until hydration, 2.2s late on a phone. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={DATA.avatarUrl}
                alt={DATA.name}
                width={160}
                height={160}
                fetchPriority="high"
                className="size-40 shrink-0 rounded-full border border-white/20 object-cover shadow-lg ring-4 ring-white/25"
              />
            </BlurFade>
          </div>
          <BlurFade delay={BLUR_FADE_DELAY * 2} className="mt-10">
            <WebsitesSection social={DATA.contact.social} />
          </BlurFade>
          <div id="status" className="mt-24">
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
              <SectionHeader
                title="About Me"
                subtitle="Well, there&rsquo;s so much about me, but I am..."
              />
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <div className="prose prose-sm max-w-full font-sans text-sm leading-relaxed text-pretty text-muted-foreground dark:prose-invert">
                <Markdown>{DATA.summary}</Markdown>
              </div>
            </BlurFade>
          </div>
        </section>
        <section id="work">
          <div className="flex min-h-0 flex-col gap-y-8">
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <SectionHeader
                title="Work Experience"
                subtitle="I&rsquo;m unemployed! Wait, that sounds like a self-burn. Anyway..."
              />
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 6}>
              <WorkSection work={DATA.work} />
            </BlurFade>
          </div>
        </section>
        <section id="tech-stack">
          <div className="flex min-h-0 flex-col gap-y-8">
            <BlurFade delay={BLUR_FADE_DELAY * 9}>
              <SectionHeader
                title="Tech Stack"
                subtitle="Cool stuff for my cool works. In fact, .NET is my playground!"
              />
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
                  <Marquee
                    key={rowIndex}
                    pauseOnHover
                    reverse={rowIndex === 1}
                    className="p-1 [--duration:35s] [--gap:0.5rem]"
                  >
                    {row.map((skill) => {
                      const SkillIcon = ICONS[skill.icon];
                      return (
                        <div
                          key={skill.name}
                          className="flex h-8 w-fit items-center gap-2 rounded-xl border border-border bg-background px-4 ring-2 ring-border/20"
                        >
                          <SkillIcon className="size-4 shrink-0" />
                          <span className="text-sm font-medium whitespace-nowrap text-foreground">
                            {skill.name}
                          </span>
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
