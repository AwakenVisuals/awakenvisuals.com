"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowLeft } from "lucide-react";

const travelCategories = [
  {
    slug: "landscapes",
    title: "Landscapes",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    slug: "street",
    title: "Street",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
  },
  {
    slug: "architecture",
    title: "Architecture",
    image:
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce65f4?w=800&q=80",
  },
  {
    slug: "wildlife",
    title: "Wildlife",
    image:
      "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=800&q=80",
  },
  {
    slug: "culture",
    title: "Culture",
    image:
      "https://images.unsplash.com/photo-1533669955142-6a73332af4db?w=800&q=80",
  },
  {
    slug: "aerial",
    title: "Aerial",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
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

export function TravelPortfolio() {
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
              Travel
            </h1>
            <p className="mt-4 max-w-lg text-lg text-[#95B8D1]">
              Discovering the world through light, colour, and composition
            </p>
            <div className="mt-6 h-px w-24 bg-[#FFC95C]" />
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {travelCategories.map((cat, index) => (
            <SubcategoryCard key={cat.slug} {...cat} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
