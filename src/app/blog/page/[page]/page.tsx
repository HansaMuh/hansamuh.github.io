import BlogList from "@/components/blog-list";
import { getTotalPostPages } from "@/lib/posts";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  const totalPages = getTotalPostPages();
  const pages = Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
  // Static export rejects an empty param list, so emit a page that 404s instead.
  return pages.length > 0 ? pages : [{ page: "2" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Blog, page ${page}`,
    description: "Thoughts on software development, life, and more.",
  };
}

export default async function BlogPaginatedPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page: pageParam } = await params;
  const page = Number(pageParam);

  if (!Number.isInteger(page) || page < 2 || page > getTotalPostPages()) {
    notFound();
  }

  return <BlogList page={page} />;
}
