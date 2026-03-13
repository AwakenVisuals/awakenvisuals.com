import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, fetchSubstackPosts } from "@/lib/substack";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found | Awaken Visuals" };
  }

  return {
    title: `${post.title} | Awaken Visuals`,
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
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#F7F5F0]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#043565]">Post Not Found</h1>
          <p className="mt-4 text-lg text-[#1A1A1A]/60">
            The post you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link
            href="/blog"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#043565] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#043565]/90"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Journal
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
    <main className="min-h-screen bg-[#F7F5F0]">
      {/* Hero Image */}
      {post.coverImage && (
        <div className="relative h-[50vh] min-h-[400px] w-full md:h-[60vh]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F7F5F0] via-[#F7F5F0]/30 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className={post.coverImage ? "-mt-32 relative z-10" : "pt-32 md:pt-40"}>
          <PostContent
            title={post.title}
            date={formattedDate}
            author={post.author}
            content={post.content}
            link={post.link}
          />
        </div>
      </div>
    </main>
  );
}

function PostContent({
  title,
  date,
  author,
  content,
  link,
}: {
  title: string;
  date: string;
  author: string;
  content: string;
  link: string;
}) {
  return (
    <article>
      {/* Meta */}
      <div className="mb-6 flex items-center gap-3 text-sm text-[#1A1A1A]/50">
        <time>{date}</time>
        <span className="h-1 w-1 rounded-full bg-[#1A1A1A]/30" />
        <span>{author}</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold leading-tight text-[#043565] md:text-4xl lg:text-5xl">
        {title}
      </h1>

      {/* Article Body */}
      {content ? (
        <div
          className="prose prose-lg mt-10 max-w-none prose-headings:text-[#043565] prose-p:text-[#1A1A1A]/80 prose-a:text-[#C8A84E] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#1A1A1A] prose-blockquote:border-[#C8A84E] prose-blockquote:text-[#1A1A1A]/60 prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <div className="mt-10">
          <p className="text-lg text-[#1A1A1A]/60">
            This post is available on Substack.
          </p>
          {link && link !== "#" && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-[#C8A84E] hover:underline"
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
      <div className="mt-16 border-t border-[#1A1A1A]/10 pt-8 pb-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#C8A84E] transition-colors hover:text-[#C8A84E]/80"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Journal
        </Link>
      </div>
    </article>
  );
}
