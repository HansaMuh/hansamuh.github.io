import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const PUBLIC_DIR = join(process.cwd(), "public");

const MIME_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

export async function getOgFontData() {
  try {
    const [cabinetGrotesk, clashDisplay] = await Promise.all([
      readFile(join(PUBLIC_DIR, "fonts/CabinetGrotesk-Medium.ttf")),
      readFile(join(PUBLIC_DIR, "fonts/ClashDisplay-Semibold.ttf")),
    ]);
    return { cabinetGrotesk, clashDisplay };
  } catch (error) {
    console.error("Failed to load fonts:", error);
    return null;
  }
}

// OG images are rendered at build time, when the site's own URL is not live yet,
// so local avatars are inlined as data URIs instead of fetched over the network.
export async function getOgAvatarSrc(avatarUrl: string | undefined) {
  if (!avatarUrl) return undefined;
  if (/^https?:\/\//.test(avatarUrl)) return avatarUrl;

  const mimeType = MIME_TYPES[extname(avatarUrl).toLowerCase()];
  if (!mimeType) return undefined;

  try {
    const file = await readFile(join(PUBLIC_DIR, avatarUrl));
    return `data:${mimeType};base64,${file.toString("base64")}`;
  } catch (error) {
    console.error("Failed to load avatar:", error);
    return undefined;
  }
}
