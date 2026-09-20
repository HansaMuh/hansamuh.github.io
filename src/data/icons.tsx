import type { ComponentType } from "react";
import {
  AwardIcon,
  BriefcaseBusinessIcon,
  FolderGit2Icon,
  HouseIcon,
  LayersIcon,
  LinkIcon,
  MailIcon,
  UserRoundIcon,
} from "lucide-react";
import { Icons } from "@/components/icons";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Javascript } from "@/components/ui/svgs/javascript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { MysqlIconLight } from "@/components/ui/svgs/mysqlIconLight";
import { SqlServer } from "@/components/ui/svgs/sqlServer";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Java } from "@/components/ui/svgs/java";
import { Csharp } from "@/components/ui/svgs/csharp";
import { Dotnet } from "@/components/ui/svgs/dotnet";
import { Windows } from "@/components/ui/svgs/windows";
import { Git } from "@/components/ui/svgs/git";
import { GithubActions } from "@/components/ui/svgs/githubActions";
import { Azure } from "@/components/ui/svgs/azure";
import { Playwright } from "@/components/ui/svgs/playwright";
import { Flash } from "@/components/ui/svgs/flash";
import { GithubLight } from "@/components/ui/svgs/githubLight";
import { Linkedin } from "@/components/ui/svgs/linkedin";
import { Protonmail } from "@/components/ui/svgs/protonmail";
import { Figma } from "@/components/ui/svgs/figma";
import { Instagram } from "@/components/ui/svgs/instagram";

// Keys are the values allowed in the "icon" fields of resume.json.
export const ICONS = {
  // Menu
  home: HouseIcon,
  link: LinkIcon,
  user: UserRoundIcon,
  briefcase: BriefcaseBusinessIcon,
  layers: LayersIcon,
  folder: FolderGit2Icon,
  award: AwardIcon,
  mail: MailIcon,
  // Websites and links (monochrome, follow the text color)
  globe: Icons.globe,
  email: Icons.email,
  github: Icons.github,
  linkedin: Icons.linkedin,
  instagram: Instagram,
  x: Icons.x,
  youtube: Icons.youtube,
  // Brand-colored marks
  githubbrand: GithubLight,
  linkedinbrand: Linkedin,
  protonmail: Protonmail,
  // Technologies
  react: ReactLight,
  nextjs: NextjsIconDark,
  typescript: Typescript,
  javascript: Javascript,
  nodejs: Nodejs,
  python: Python,
  golang: Golang,
  postgresql: Postgresql,
  mysql: MysqlIconLight,
  sqlserver: SqlServer,
  docker: Docker,
  kubernetes: Kubernetes,
  java: Java,
  csharp: Csharp,
  dotnet: Dotnet,
  windows: Windows,
  git: Git,
  githubactions: GithubActions,
  azure: Azure,
  playwright: Playwright,
  flash: Flash,
  figma: Figma,
} satisfies Record<string, ComponentType<{ className?: string }>>;

export type IconName = keyof typeof ICONS;

export const ICON_NAMES = Object.keys(ICONS) as [IconName, ...IconName[]];
