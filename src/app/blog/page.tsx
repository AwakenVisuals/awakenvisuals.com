import { Metadata } from "next";
import { fetchSubstackPosts } from "@/lib/substack";
import { SectionHeading } from "@/components/shared/section-heading";
import { BlogGrid } from "./blog-grid";
import type { BlogPost } from "@/types";

export const metadata: Metadata = {
  title: "Journal | Awaken Visuals",
  description:
    "Stories, insights, and behind-the-scenes from sport and travel photography adventures around the world.",
};

const PLACEHOLDER_POSTS: BlogPost[] = [
  {
    title: "Chasing Light in Patagonia",
    slug: "chasing-light-in-patagonia",
    excerpt:
      "A two-week journey through the rugged landscapes of Torres del Paine, capturing the raw beauty of Patagonia at golden hour.",
    content: "",
    coverImage: "https://images.unsplash.com/photo-1531761535209-180857e963b9?w=800&q=80",
    publishedAt: "2024-12-15T10:00:00Z",
    author: "Awaken Visuals",
    link: "#",
  },
  {
    title: "Behind the Lens: Capturing Peak Performance",
    slug: "behind-the-lens-capturing-peak-performance",
    excerpt:
      "What it takes to freeze the perfect moment in high-speed sport photography — from gear choices to anticipating the action.",
    content: "",
    coverImage: "https://images.unsplash.com/photo-1461896836934-bd45ba8fcb86?w=800&q=80",
    publishedAt: "2024-11-28T10:00:00Z",
    author: "Awaken Visuals",
    link: "#",
  },
  {
    title: "The Art of Travel Storytelling",
    slug: "the-art-of-travel-storytelling",
    excerpt:
      "How to go beyond snapshots and create a visual narrative that transports viewers to the places you explore.",
    content: "",
    coverImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
    publishedAt: "2024-11-10T10:00:00Z",
    author: "Awaken Visuals",
    link: "#",
  },
  {
    title: "Surf Photography: Riding the Wave",
    slug: "surf-photography-riding-the-wave",
    excerpt:
      "Lessons learned from shooting in the water — getting up close with surfers and the ocean to tell their stories.",
    content: "",
    coverImage: "https://images.unsplash.com/photo-1502680390548-bdbac40551ce?w=800&q=80",
    publishedAt: "2024-10-22T10:00:00Z",
    author: "Awaken Visuals",
    link: "#",
  },
  {
    title: "Night Photography in the Arctic",
    slug: "night-photography-in-the-arctic",
    excerpt:
      "Braving sub-zero temperatures to photograph the Northern Lights and the haunting beauty of the Arctic wilderness.",
    content: "",
    coverImage: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800&q=80",
    publishedAt: "2024-10-05T10:00:00Z",
    author: "Awaken Visuals",
    link: "#",
  },
  {
    title: "Marathon Moments: The Story Behind the Shot",
    slug: "marathon-moments-the-story-behind-the-shot",
    excerpt:
      "Every finish line tells a story. How I approach photographing endurance events to capture raw human emotion.",
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

  return (
    <main className="min-h-screen bg-[#043565]">
      {/* Header */}
      <section className="pb-8 pt-32 md:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Journal"
            subtitle="Stories, insights, and behind-the-scenes from our adventures"
            gold
          />
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BlogGrid posts={posts} />
        </div>
      </section>
    </main>
  );
}
