import { Metadata } from "next";
import { fetchSubstackPosts } from "@/lib/substack";
import Image from "next/image";
import Link from "next/link";
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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage() {
  let posts = await fetchSubstackPosts();
  if (posts.length === 0) {
    posts = PLACEHOLDER_POSTS;
  }

  const [featuredPost, ...remainingPosts] = posts;

  return (
    <main className="min-h-screen bg-[#F5F3EE]">
      {/* Dark header for navbar contrast */}
      <div className="bg-[#043565] pt-28 pb-6 md:pt-36 md:pb-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F5A300]">
            Stories &amp; behind the scenes
          </span>
          <h1 className="mt-2 text-4xl font-bold tracking-wide text-white md:text-5xl">
            AV Club
          </h1>
        </div>
      </div>

      {/* Featured Post — full-width hero card */}
      {featuredPost && (
        <section className="bg-[#043565]">
          <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <div className="grid grid-cols-1 overflow-hidden bg-[#032B50] lg:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px]">
                  <Image
                    src={featuredPost.coverImage || "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Content */}
                <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#F5A300]">
                    Latest
                  </span>
                  <h2 className="mt-4 text-2xl font-bold leading-snug text-white transition-colors group-hover:text-[#F5A300] md:text-3xl lg:text-4xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-white/50 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <time className="text-sm text-white/40">{formatDate(featuredPost.publishedAt)}</time>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#F5A300] transition-colors group-hover:text-[#F5A300]/80">
                    Read article
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Remaining Posts Grid */}
      {remainingPosts.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {remainingPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <article className="overflow-hidden border border-black/5 bg-[#FAFAF7] transition-all duration-300 hover:border-[#F5A300]/30 hover:shadow-lg">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.coverImage || "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <time className="text-xs font-medium uppercase tracking-[0.15em] text-[#F5A300]">
                        {formatDate(post.publishedAt)}
                      </time>
                      <h3 className="mt-3 text-lg font-semibold leading-snug text-[#043565] transition-colors group-hover:text-[#F5A300]">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-black/50 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#043565]">
                        Read more
                        <svg
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
