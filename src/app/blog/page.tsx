import BlogList from "@/components/blog-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software development, life, and more.",
  openGraph: {
    title: "Blog",
    description: "Thoughts on software development, life, and more.",
    images: [{ url: "/blog/opengraph-image.png", width: 1200, height: 630, alt: "Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description: "Thoughts on software development, life, and more.",
    images: ["/blog/opengraph-image.png"],
  },
};

export default function BlogPage() {
  return <BlogList page={1} />;
}
