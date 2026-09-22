import type { ComponentType } from "react";
import {
  AwardIcon,
  BriefcaseBusinessIcon,
  FolderGit2Icon,
  HouseIcon,
  LayersIcon,
  UserRoundIcon,
} from "lucide-react";
import { Icons } from "@/components/icons";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Javascript } from "@/components/ui/svgs/javascript";
import { MysqlIconLight } from "@/components/ui/svgs/mysqlIconLight";
import { SqlServer } from "@/components/ui/svgs/sqlServer";
import { Java } from "@/components/ui/svgs/java";
import { Csharp } from "@/components/ui/svgs/csharp";
import { Dotnet } from "@/components/ui/svgs/dotnet";
import { Git } from "@/components/ui/svgs/git";
import { GithubActions } from "@/components/ui/svgs/githubActions";
import { Azure } from "@/components/ui/svgs/azure";
import { Playwright } from "@/components/ui/svgs/playwright";
import { Flash } from "@/components/ui/svgs/flash";
import { GithubMark } from "@/components/ui/svgs/githubMark";
import { Figma } from "@/components/ui/svgs/figma";
import { Instagram } from "@/components/ui/svgs/instagram";
import { Xaml } from "@/components/ui/svgs/xaml";
import { Threads } from "@/components/ui/svgs/threads";

// Keys are the values allowed in the "icon" fields of resume.json.
export const ICONS = {
  // Menu
  home: HouseIcon,
  user: UserRoundIcon,
  briefcase: BriefcaseBusinessIcon,
  layers: LayersIcon,
  folder: FolderGit2Icon,
  award: AwardIcon,
  // Websites and links (monochrome, follow the text color)
  globe: Icons.globe,
  email: Icons.email,
  github: Icons.github,
  linkedin: Icons.linkedin,
  instagram: Instagram,
  threads: Threads,
  githubmark: GithubMark,
  // Technologies
  react: ReactLight,
  typescript: Typescript,
  javascript: Javascript,
  mysql: MysqlIconLight,
  sqlserver: SqlServer,
  java: Java,
  csharp: Csharp,
  dotnet: Dotnet,
  xaml: Xaml,
  git: Git,
  githubactions: GithubActions,
  azure: Azure,
  playwright: Playwright,
  flash: Flash,
  figma: Figma,
} satisfies Record<string, ComponentType<{ className?: string }>>;

export type IconName = keyof typeof ICONS;

export const ICON_NAMES = Object.keys(ICONS) as [IconName, ...IconName[]];
