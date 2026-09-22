const VIDEO_EXTENSIONS = [".mp4", ".webm", ".ogv", ".mov"];

/** Whether a preview path should render as a video rather than an image. */
export function isVideo(src: string): boolean {
  const path = src.split("?")[0].toLowerCase();
  return VIDEO_EXTENSIONS.some((ext) => path.endsWith(ext));
}
