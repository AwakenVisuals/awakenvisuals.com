import type { BlogPost } from "@/types";
import { fetchSubstackPosts } from "./substack";

/*
 * ============================================
 * PLACEHOLDER POSTS - EDIT HERE
 * ============================================
 * These posts show when Substack isn't connected.
 * Once you set NEXT_PUBLIC_SUBSTACK_FEED_URL in .env.local,
 * real Substack posts will replace these automatically.
 *
 * To edit: just change the title, excerpt, image URL, etc.
 * To add: copy an existing entry and paste below it.
 * To remove: delete the entire { ... } block including the comma.
 * ============================================
 */
export const PLACEHOLDER_POSTS: BlogPost[] = [
  {
    title: "Behind the Lens: Champions League Final",
    slug: "champions-league-final",
    excerpt:
      "An intimate look at capturing the biggest moments in European football from the sidelines.",
    content: "",
    coverImage:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80",
    publishedAt: "2026-03-01T10:00:00Z",
    author: "Awaken Visuals",
    link: "#",
  },
  {
    title: "Iceland: Fire and Ice",
    slug: "iceland-fire-and-ice",
    excerpt:
      "Exploring the dramatic landscapes of Iceland through photography, from glaciers to volcanic fields.",
    content: "",
    coverImage:
      "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&q=80",
    publishedAt: "2026-02-01T10:00:00Z",
    author: "Awaken Visuals",
    link: "#",
  },
  {
    title: "The Art of Motion: Capturing Speed",
    slug: "art-of-motion",
    excerpt:
      "Technical insights into photographing fast-moving subjects in motorsport and athletics.",
    content: "",
    coverImage:
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80",
    publishedAt: "2026-01-01T10:00:00Z",
    author: "Awaken Visuals",
    link: "#",
  },
];

/**
 * Fetches posts from Substack, falls back to placeholders.
 * Used by both the homepage preview and the AV Club page.
 */
export async function getLatestPosts(): Promise<BlogPost[]> {
  const posts = await fetchSubstackPosts();
  return posts.length > 0 ? posts : PLACEHOLDER_POSTS;
}
