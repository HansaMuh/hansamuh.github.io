import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";
import { ICONS } from "@/data/icons";
import SectionHeader from "@/components/section/section-header";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsSection() {
    return (
        <div className="flex min-h-0 flex-col gap-y-8">
            <SectionHeader title="My Projects" subtitle="Behold, my grand designs! Latest ones, at least!" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-[800px] mx-auto auto-rows-fr">
                {DATA.projects.map((project, id) => (
                    <BlurFade
                        key={project.title}
                        delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                        className="h-full"
                    >
                        <ProjectCard
                            href={project.href}
                            key={project.title}
                            title={project.title}
                            description={project.description}
                            dates={project.dates}
                            tags={project.technologies.map((tech) => {
                                const TechIcon = ICONS[tech.icon];
                                return { name: tech.name, icon: <TechIcon className="size-7" /> };
                            })}
                            image={project.image}
                            video={project.video}
                            previewUrl={(project.links.find((link) => link.type === "Website")?.href ?? project.href)
                                .replace(/^https?:\/\//, "")
                                .replace(/\/$/, "")}
                            links={project.links.map((link) => {
                                const LinkIcon = ICONS[link.icon];
                                return { ...link, icon: <LinkIcon className="size-3" /> };
                            })}
                        />
                    </BlurFade>
                ))}
            </div>
        </div>
    );
}

