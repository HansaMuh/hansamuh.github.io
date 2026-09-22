import { z } from "zod";
import { ICON_NAMES } from "@/data/icons";
import resume from "@/data/resume.json";

const icon = z.enum(ICON_NAMES);
const technology = z.object({ name: z.string(), icon });
// Menu links point at section ids on the home page, e.g. "#about".
const navItem = z.object({ href: z.string().startsWith("#"), icon, label: z.string() });

const resumeSchema = z.object({
  name: z.string(),
  initials: z.string(),
  url: z.url(),
  location: z.string(),
  description: z.string(),
  summary: z.string(),
  avatarUrl: z.string(),
  status: z.array(
    z.object({ label: z.string(), detail: z.string() }),
  ).default([]),
  skills: z.array(technology),
  navbar: z.object({ top: z.array(navItem), sections: z.array(navItem) }),
  contact: z.object({
    email: z.string(),
    // Shown as a QR plus a copyable link in the contact section.
    share: z.object({ label: z.string(), url: z.string(), qr: z.string() }),
    social: z.record(
      z.string(),
      z.object({
        name: z.string(),
        url: z.string(),
        icon,
        websites: z.boolean(),
      }),
    ),
  }),
  work: z.array(
    z.object({
      company: z.string(),
      title: z.string(),
      logoUrl: z.string(),
      start: z.string(),
      end: z.string().optional(),
      description: z.string(),
    }),
  ),
  projects: z.array(
    z.object({
      title: z.string(),
      dates: z.string(),
      description: z.string(),
      technologies: z.array(technology),
      links: z.array(z.object({ type: z.string(), href: z.string(), icon })),
      /** Shown in the card frame. Falls back to previews[0] when absent: it exists so the
       *  card can load a lighter copy than the panel. */
      thumbnail: z.string().optional(),
      /** Ordered list the preview panel walks. Images and videos, told apart by extension. */
      previews: z.array(z.string()).default([]),
    }),
  ),
  certifications: z.array(
    z.object({
      name: z.string(),
      issuer: z.string(),
      href: z.string(),
      logoUrl: z.string(),
      date: z.string(),
      description: z.string(),
    }),
  ).default([]),
});

export type Resume = z.infer<typeof resumeSchema>;

// Parsed at import time so a typo in resume.json fails the build instead of the page.
export const DATA: Resume = resumeSchema.parse(resume);

// The description carries a line break for the hero. Metadata and the OG tags want one
// line, so they read this instead of the raw field.
export const META_DESCRIPTION = DATA.description.replace(/\s+/g, " ").trim();
