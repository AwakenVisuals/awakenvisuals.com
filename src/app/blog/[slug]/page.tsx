import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, fetchSubstackPosts } from "@/lib/substack";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found | Awaken Visuals" };
  return {
    title: `${post.title}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#FFFFFF]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#043565]">Post Not Found</h1>
          <p className="mt-4 text-lg text-[#000000]/60">
            The post you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link
            href="/blog"
            className="mt-8 inline-flex items-center gap-2 bg-[#043565] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#043565]/90"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to AV Club
          </Link>
        </div>
      </main>
    );
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-[#FFFFFF]">
      {/* Title Card Hero — inspired by parcfermeco.com */}
      <section className="relative bg-[#043565]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: Title Info */}
          <div className="flex flex-col justify-end px-8 py-20 md:px-16 lg:min-h-[70vh] lg:py-32">
            <div className="mt-auto">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F5A300]">
                AV Club
              </span>
              <h1 className="mt-6 text-3xl font-bold leading-tight tracking-wide text-white md:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              <div className="mt-6 flex items-center gap-3 text-sm text-white/50">
                <time>{formattedDate}</time>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span>{post.author}</span>
              </div>
            </div>
          </div>

          {/* Right: Cover Image */}
          {post.coverImage && (
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[70vh]">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </section>

      {/* Description Blurb */}
      {post.excerpt && (
        <section className="border-b border-[#D4E2ED] bg-[#FFFFFF] py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <p className="text-xl leading-relaxed text-[#000000]/70 md:text-2xl font-light">
              {post.excerpt}
            </p>
          </div>
        </section>
      )}

      {/* Article Body */}
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 md:py-20">
        {post.content ? (
          <div
            className="prose prose-lg max-w-none prose-headings:text-[#043565] prose-p:text-[#000000]/80 prose-a:text-[#F5A300] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#000000] prose-blockquote:border-[#F5A300] prose-blockquote:text-[#000000]/60 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <div>
            <p className="text-lg text-[#000000]/60">
              This post is available on Substack.
            </p>
            {post.link && post.link !== "#" && (
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-[#F5A300] hover:underline"
              >
                Read on Substack
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        )}

        {/* Back Link */}
        <div className="mt-16 border-t border-[#D4E2ED] pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#F5A300] transition-colors hover:text-[#F5A300]/80"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to AV Club
          </Link>
        </div>
      </div>
    </main>
  );
}
