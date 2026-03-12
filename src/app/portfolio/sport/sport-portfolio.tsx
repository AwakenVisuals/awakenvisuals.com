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
    slug: "rugby",
    title: "Rugby",
    image:
      "https://images.unsplash.com/photo-1544919982-01711c0eca7e?w=800&q=80",
  },
  {
    slug: "athletics",
    title: "Athletics",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
  },
  {
    slug: "motorsport",
    title: "Motorsport",
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
  },
  {
    slug: "boxing",
    title: "Boxing",
    image:
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&q=80",
  },
  {
    slug: "swimming",
    title: "Swimming",
    image:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80",
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
        className="group relative block aspect-[4/5] overflow-hidden rounded-lg"
      >
        <Image
          src={image}
          alt={`${title} photography`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 border-2 border-transparent transition-colors duration-500 group-hover:border-[#FFC95C] rounded-lg" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          <span className="mt-2 inline-block text-sm uppercase tracking-[0.2em] text-[#FFC95C] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            Explore
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
    <main className="min-h-screen bg-gradient-to-b from-[#043565] to-[#1F2F16]">
      {/* Header */}
      <section className="px-6 pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-[#95B8D1] transition-colors hover:text-[#FFC95C] mb-8"
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
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
              Sport
            </h1>
            <p className="mt-4 max-w-lg text-lg text-[#95B8D1]">
              Capturing the intensity, emotion, and beauty of athletic
              competition
            </p>
            <div className="mt-6 h-px w-24 bg-[#FFC95C]" />
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sportCategories.map((cat, index) => (
            <SubcategoryCard key={cat.slug} {...cat} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
