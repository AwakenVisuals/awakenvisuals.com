"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowLeft } from "lucide-react";

const travelCategories = [
  {
    slug: "travel",
    title: "Travel",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    slug: "edits",
    title: "Edits",
    image:
      "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=800&q=80",
  },
];

function SubcategoryCard({
  slug,
  title,
  image,
  index,
}: {
  slug: string;
  title: string;
  image: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      <Link
        href={`/portfolio/travel/${slug}`}
        className="group relative block aspect-[3/4] overflow-hidden"
      >
        <Image
          src={image}
          alt={`${title} photography`}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-light uppercase tracking-[0.15em] text-white">
            {title}
          </h3>
          <span className="mt-2 inline-block text-[12px] uppercase tracking-[0.2em] text-[#C8A84E] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            View Gallery
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function TravelPortfolio() {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true });

  return (
    <main className="min-h-screen bg-[#F7F5F0]">
      {/* Header */}
      <section className="px-6 pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.15em] text-[#1A1A1A]/40 transition-colors hover:text-[#C8A84E] mb-10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
          <motion.div
            ref={headingRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light uppercase tracking-[0.15em] text-[#1A1A1A]">
              Travel
            </h1>
            <p className="mt-4 max-w-lg text-base text-[#1A1A1A]/50 tracking-wide">
              Discovering the world through light, colour, and composition
            </p>
            <div className="mt-8 h-px w-16 bg-[#C8A84E]" />
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 pb-32 md:px-10">
        <div className="mx-auto max-w-7xl grid gap-5 sm:grid-cols-2">
          {travelCategories.map((cat, index) => (
            <SubcategoryCard key={cat.slug} {...cat} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
