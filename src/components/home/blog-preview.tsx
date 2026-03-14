"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const placeholderPosts = [
  {
    title: "Behind the Lens: Champions League Final",
    excerpt:
      "An intimate look at capturing the biggest moments in European football from the sidelines.",
    image:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&q=80",
    date: "March 2026",
    slug: "champions-league-final",
  },
  {
    title: "Iceland: Fire and Ice",
    excerpt:
      "Exploring the dramatic landscapes of Iceland through photography, from glaciers to volcanic fields.",
    image:
      "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=600&q=80",
    date: "February 2026",
    slug: "iceland-fire-and-ice",
  },
  {
    title: "The Art of Motion: Capturing Speed",
    excerpt:
      "Technical insights into photographing fast-moving subjects in motorsport and athletics.",
    image:
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&q=80",
    date: "January 2026",
    slug: "art-of-motion",
  },
];

export function BlogPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#F0EDE6] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="mb-16"
        >
          <h2 className="text-3xl font-light tracking-[0.1em] text-[#000000] md:text-4xl">
            AV Club
          </h2>
          <div className="mt-4 h-px w-12 bg-[#F5A300]" />
        </motion.div>

        {/* Post Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {placeholderPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block bg-[#F5F3EE]"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#000000]/40">
                    {post.date}
                  </span>
                  <h3 className="mt-3 text-base font-medium leading-snug tracking-wide text-[#000000] transition-colors duration-300 group-hover:text-[#F5A300]">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#000000]/50">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Link
            href="/blog"
            className="inline-block border-b border-[#000000]/20 pb-1 text-xs font-medium uppercase tracking-[0.2em] text-[#000000] transition-colors duration-300 hover:border-[#F5A300] hover:text-[#F5A300]"
          >
            View All Posts
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
