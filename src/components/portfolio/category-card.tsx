"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface CategoryCardProps {
  title: string;
  subtitle: string;
  href: string;
  image: string;
  alt: string;
}

export function CategoryCard({
  title,
  subtitle,
  href,
  image,
  alt,
}: CategoryCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <Link
        href={href}
        className="group relative block aspect-[3/4] md:aspect-[4/5] overflow-hidden"
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 md:pb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-[0.2em] text-white">
            {title}
          </h2>
          <p className="mt-3 text-sm tracking-[0.15em] uppercase text-white/70">
            {subtitle}
          </p>
          <span className="mt-6 inline-block text-[13px] uppercase tracking-[0.2em] text-[#F5A300] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            View Collection
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
