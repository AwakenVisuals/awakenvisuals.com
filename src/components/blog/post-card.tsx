"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { BlogPost } from "@/types";

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="overflow-hidden rounded-xl border border-white/5 bg-[#043565]/30 transition-colors duration-300 hover:border-[#FFC95C]/40">
          {/* Cover Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={
                post.coverImage ||
                "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80"
              }
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-5 md:p-6">
            <time className="text-xs font-medium uppercase tracking-wider text-[#95B8D1]">
              {formattedDate}
            </time>

            <h3 className="mt-2 text-lg font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-[#FFC95C] md:text-xl">
              {post.title}
            </h3>

            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/60">
              {post.excerpt}
            </p>

            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#FFC95C]">
              Read More
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
        </div>
      </Link>
    </motion.article>
  );
}
