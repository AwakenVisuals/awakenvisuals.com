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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-[#043565] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-[0.1em] text-[#FFC95C] md:text-5xl">
            Journal
          </h2>
          <p className="mt-4 text-lg text-[#95B8D1] normal-case">
            Stories from the field and behind the scenes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {placeholderPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-lg bg-[#043565] border border-white/5 transition-colors hover:border-[#FFC95C]/20"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#FFC95C]">
                    {post.date}
                  </span>
                  <h3 className="mt-2 text-lg font-bold tracking-wider text-white group-hover:text-[#FFC95C] transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#95B8D1]/70 normal-case">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Link
            href="/blog"
            className="inline-block rounded-full border-2 border-[#FFC95C] px-10 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#FFC95C] transition-all hover:bg-[#FFC95C] hover:text-[#043565]"
          >
            Read All Posts
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
