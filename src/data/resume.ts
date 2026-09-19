import { z } from "zod";
import { ICON_NAMES } from "@/data/icons";
import resume from "@/data/resume.json";

const icon = z.enum(ICON_NAMES);

const resumeSchema = z.object({
  name: z.string(),
  nickname: z.string(),
  initials: z.string(),
  url: z.url(),
  location: z.string(),
  locationLink: z.string(),
  description: z.string(),
  summary: z.string(),
  avatarUrl: z.string(),
  skills: z.array(z.object({ name: z.string(), icon: icon.optional() })),
  navbar: z.array(z.object({ href: z.string(), icon, label: z.string() })),
  contact: z.object({
    email: z.string(),
    tel: z.string(),
    social: z.record(
      z.string(),
      z.object({
        name: z.string(),
        url: z.string(),
        icon,
        navbar: z.boolean(),
      }),
    ),
  }),
  work: z.array(
    z.object({
      company: z.string(),
      href: z.string(),
      badges: z.array(z.string()),
      location: z.string(),
      title: z.string(),
      logoUrl: z.string(),
      start: z.string(),
      end: z.string().optional(),
      description: z.string(),
    }),
  ),
  education: z.array(
    z.object({
      school: z.string(),
      href: z.string(),
      degree: z.string(),
      logoUrl: z.string(),
      start: z.string(),
      end: z.string(),
    }),
  ).default([]),
  projects: z.array(
    z.object({
      title: z.string(),
      href: z.string(),
      dates: z.string(),
      active: z.boolean(),
      description: z.string(),
      technologies: z.array(z.string()),
      links: z.array(z.object({ type: z.string(), href: z.string(), icon })),
      image: z.string(),
      video: z.string(),
    }),
  ),
  hackathons: z.array(
    z.object({
      title: z.string(),
      dates: z.string(),
      location: z.string(),
      description: z.string(),
      image: z.string(),
      mlh: z.string().optional(),
      win: z.string().optional(),
      icon: z.string().optional(),
      links: z.array(z.object({ title: z.string(), href: z.string(), icon })),
    }),
  ).default([]),
});

export type Resume = z.infer<typeof resumeSchema>;

// Parsed at import time so a typo in resume.json fails the build instead of the page.
export const DATA: Resume = resumeSchema.parse(resume);
