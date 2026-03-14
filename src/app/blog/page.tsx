import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLatestPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "AV Club",
  description:
    "Stories, behind-the-scenes and insights from Awaken Visuals — sport photography, travel adventures, and creative storytelling by Nick Emmerson.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getLatestPosts();
  const [featured, ...rest] = posts;
  const feedPosts = rest.slice(0, 4);
  const sidebarPosts = rest.slice(0, 6);

  return (
    <main className="min-h-screen bg-[#F5F3EE]">
      {/* ── Header ── */}
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

      {/* ── Featured Hero ── */}
      {featured && (
        <section className="bg-[#043565] pb-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid grid-cols-1 overflow-hidden lg:grid-cols-5">
                {/* Image — 3/5 width on desktop */}
                <div className="relative aspect-[16/10] lg:col-span-3 lg:aspect-auto lg:min-h-[460px]">
                  <Image
                    src={
                      featured.coverImage ||
                      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80"
                    }
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#032B50] via-transparent to-transparent lg:hidden" />
                </div>

                {/* Content — 2/5 width on desktop */}
                <div className="relative flex flex-col justify-center bg-[#032B50] p-8 lg:col-span-2 lg:p-12">
                  <div className="flex items-center gap-3">
                    <span className="inline-block h-px w-6 bg-[#F5A300]" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F5A300]">
                      Latest
                    </span>
                  </div>
                  <h2 className="mt-5 text-2xl font-bold leading-snug text-white transition-colors group-hover:text-[#F5A300] md:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 line-clamp-3 text-base leading-relaxed text-white/50">
                    {featured.excerpt}
                  </p>
                  <time className="mt-6 text-sm text-white/30">
                    {formatDate(featured.publishedAt)}
                  </time>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── Feed + Sidebar ── */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Left: Article feed (2/3) */}
            <div className="lg:col-span-2">
              <div className="space-y-0">
                {feedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group block border-b border-black/5 py-8 first:pt-0"
                  >
                    <article className="grid grid-cols-1 gap-6 sm:grid-cols-5">
                      {/* Thumbnail */}
                      <div className="relative aspect-[16/10] overflow-hidden sm:col-span-2">
                        <Image
                          src={
                            post.coverImage ||
                            "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80"
                          }
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, 280px"
                        />
                      </div>
                      {/* Text */}
                      <div className="flex flex-col justify-center sm:col-span-3">
                        <time className="text-xs font-medium uppercase tracking-[0.15em] text-[#F5A300]">
                          {formatDate(post.publishedAt)}
                        </time>
                        <h3 className="mt-2 text-xl font-bold leading-snug text-[#043565] transition-colors group-hover:text-[#F5A300]">
                          {post.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-black/50">
                          {post.excerpt}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Sidebar (1/3) */}
            <aside className="lg:border-l lg:border-black/5 lg:pl-10">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F5A300]">
                Latest
              </h3>
              <div className="mt-6 space-y-6">
                {sidebarPosts.map((post, i) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <div className="flex gap-4">
                      <span className="mt-0.5 text-2xl font-bold leading-none text-[#043565]/15">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold leading-snug text-[#043565] transition-colors group-hover:text-[#F5A300]">
                          {post.title}
                        </h4>
                        <time className="mt-1 block text-xs text-black/40">
                          {formatDate(post.publishedAt)}
                        </time>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
