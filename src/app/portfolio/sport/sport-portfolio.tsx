"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowLeft } from "lucide-react";

const sportCategories = [
  {
    slug: "football",
    title: "Football",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
  },
  {
    slug: "formula-e",
    title: "Formula E",
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
  },
  {
    slug: "formula-1",
    title: "Formula 1",
    image:
      "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?w=800&q=80",
  },
  {
    slug: "wec",
    title: "WEC",
    image:
      "https://images.unsplash.com/photo-1504817343863-5092a923803e?w=800&q=80",
  },
  {
    slug: "sportscars",
    title: "Sportscars",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
  },
  {
    slug: "single-seaters",
    title: "Single Seaters",
    image:
      "https://images.unsplash.com/photo-1552849397-7e24eaf0b48a?w=800&q=80",
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
        href={`/portfolio/sport/${slug}`}
        className="group relative block aspect-[4/5] overflow-hidden"
      >
        <Image
          src={image}
          alt={`${title} photography`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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

export function SportPortfolio() {
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
              Sport
            </h1>
            <p className="mt-4 max-w-lg text-base text-[#1A1A1A]/50 tracking-wide">
              Capturing the intensity, emotion, and beauty of athletic
              competition
            </p>
            <div className="mt-8 h-px w-16 bg-[#C8A84E]" />
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 pb-32 md:px-10">
        <div className="mx-auto max-w-7xl grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sportCategories.map((cat, index) => (
            <SubcategoryCard key={cat.slug} {...cat} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
