import { allPosts } from "content-collections";

export const POSTS_PAGE_SIZE = 5;

export type Post = (typeof allPosts)[number];

export function getPostSlug(post: Post) {
  return post._meta.path.replace(/\.mdx$/, "");
}

export function getSortedPosts() {
  return [...allPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getTotalPostPages() {
  return Math.max(1, Math.ceil(allPosts.length / POSTS_PAGE_SIZE));
}

// Page 1 lives at /blog; later pages are pre-rendered at /blog/page/N.
export function getBlogPageHref(page: number) {
  return page <= 1 ? "/blog" : `/blog/page/${page}`;
}
