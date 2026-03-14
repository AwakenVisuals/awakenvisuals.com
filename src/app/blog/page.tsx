import { Metadata } from "next";
import { fetchSubstackPosts } from "@/lib/substack";
import { BlogGrid } from "./blog-grid";
import type { BlogPost } from "@/types";
import Image from "next/image";

export const metadata: Metadata = {
  title: "AV Club",
  description: "Stories, behind-the-scenes and insights from Awaken Visuals — sport photography, travel adventures, and creative storytelling by Nick Emmerson.",
};

const PLACEHOLDER_POSTS: BlogPost[] = [
  {
    title: "Chasing Light in Patagonia",
    slug: "chasing-light-in-patagonia",
    excerpt: "A two-week journey through the rugged landscapes of Torres del Paine, capturing the raw beauty of Patagonia at golden hour.",
    content: "",
    coverImage: "https://images.unsplash.com/photo-1531761535209-180857e963b9?w=800&q=80",
    publishedAt: "2024-12-15T10:00:00Z",
    author: "Awaken Visuals",
    link: "#",
  },
  {
    title: "Behind the Lens: Capturing Peak Performance",
    slug: "behind-the-lens-capturing-peak-performance",
    excerpt: "What it takes to freeze the perfect moment in high-speed sport photography — from gear choices to anticipating the action.",
    content: "",
    coverImage: "https://images.unsplash.com/photo-1461896836934-bd45ba8fcb86?w=800&q=80",
    publishedAt: "2024-11-28T10:00:00Z",
    author: "Awaken Visuals",
    link: "#",
  },
  {
    title: "The Art of Travel Storytelling",
    slug: "the-art-of-travel-storytelling",
    excerpt: "How to go beyond snapshots and create a visual narrative that transports viewers to the places you explore.",
    content: "",
    coverImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
    publishedAt: "2024-11-10T10:00:00Z",
    author: "Awaken Visuals",
    link: "#",
  },
  {
    title: "Surf Photography: Riding the Wave",
    slug: "surf-photography-riding-the-wave",
    excerpt: "Lessons learned from shooting in the water — getting up close with surfers and the ocean to tell their stories.",
    content: "",
    coverImage: "https://images.unsplash.com/photo-1502680390548-bdbac40551ce?w=800&q=80",
    publishedAt: "2024-10-22T10:00:00Z",
    author: "Awaken Visuals",
    link: "#",
  },
  {
    title: "Night Photography in the Arctic",
    slug: "night-photography-in-the-arctic",
    excerpt: "Braving sub-zero temperatures to photograph the Northern Lights and the haunting beauty of the Arctic wilderness.",
    content: "",
    coverImage: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800&q=80",
    publishedAt: "2024-10-05T10:00:00Z",
    author: "Awaken Visuals",
    link: "#",
  },
  {
    title: "Marathon Moments: The Story Behind the Shot",
    slug: "marathon-moments-the-story-behind-the-shot",
    excerpt: "Every finish line tells a story. How I approach photographing endurance events to capture raw human emotion.",
    content: "",
    coverImage: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=800&q=80",
    publishedAt: "2024-09-18T10:00:00Z",
    author: "Awaken Visuals",
    link: "#",
  },
];

export default async function BlogPage() {
  let posts = await fetchSubstackPosts();
  if (posts.length === 0) {
    posts = PLACEHOLDER_POSTS;
  }

  const heroPost = posts[0];

  return (
    <main className="min-h-screen bg-[#FFFFFF]">
      {/* Hero Banner */}
      {heroPost?.coverImage && (
        <section className="relative h-[50vh] min-h-[400px] w-full md:h-[60vh]">
          <Image
            src={heroPost.coverImage}
            alt="AV Club"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F5A300]">
              Stories & Behind the Scenes
            </span>
            <h1 className="mt-4 text-5xl font-bold uppercase tracking-[0.06em] text-white md:text-6xl lg:text-7xl">
              AV Club
            </h1>
          </div>
        </section>
      )}

      {/* If no hero image */}
      {!heroPost?.coverImage && (
        <section className="pb-8 pt-32 md:pt-40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F5A300]">
              Stories & Behind the Scenes
            </span>
            <h1 className="mt-4 text-5xl font-bold tracking-[0.06em] text-[#043565] md:text-6xl lg:text-7xl">
              AV Club
            </h1>
            <div className="mx-auto mt-6 h-px w-20 bg-[#F5A300]" />
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BlogGrid posts={posts} />
        </div>
      </section>
    </main>
  );
}
