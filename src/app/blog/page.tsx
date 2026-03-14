import { Metadata } from "next";
import { fetchSubstackPosts } from "@/lib/substack";
import { BlogGrid } from "./blog-grid";
import type { BlogPost } from "@/types";

export const metadata: Metadata = {
  title: "AV Club",
  description: "Stories, behind-the-scenes and insights from Awaken Visuals — sport photography, travel adventures, and creative storytelling by Nick Emmerson.",
};

const PLACEHOLDER_POSTS: BlogPost[] = [
  {
    title: "Behind the Lens: Champions League Final",
    slug: "champions-league-final",
    excerpt: "An intimate look at capturing the biggest moments in European football from the sidelines.",
    content: "",
    coverImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&q=80",
    publishedAt: "2026-03-01T10:00:00Z",
    author: "Awaken Visuals",
    link: "#",
  },
  {
    title: "Iceland: Fire and Ice",
    slug: "iceland-fire-and-ice",
    excerpt: "Exploring the dramatic landscapes of Iceland through photography, from glaciers to volcanic fields.",
    content: "",
    coverImage: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=600&q=80",
    publishedAt: "2026-02-01T10:00:00Z",
    author: "Awaken Visuals",
    link: "#",
  },
  {
    title: "The Art of Motion: Capturing Speed",
    slug: "art-of-motion",
    excerpt: "Technical insights into photographing fast-moving subjects in motorsport and athletics.",
    content: "",
    coverImage: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&q=80",
    publishedAt: "2026-01-01T10:00:00Z",
    author: "Awaken Visuals",
    link: "#",
  },
];

export default async function BlogPage() {
  let posts = await fetchSubstackPosts();
  if (posts.length === 0) {
    posts = PLACEHOLDER_POSTS;
  }

  return (
    <main className="min-h-screen bg-[#F5F3EE]">
      {/* Hero Header */}
      <section className="bg-[#043565] pb-16 pt-32 md:pt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F5A300]">
            Stories &amp; Behind the Scenes
          </span>
          <h1 className="mt-4 text-5xl font-bold tracking-[0.06em] text-white md:text-6xl lg:text-7xl">
            AV Club
          </h1>
          <div className="mx-auto mt-6 h-px w-20 bg-[#F5A300]" />
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BlogGrid posts={posts} />
        </div>
      </section>
    </main>
  );
}
