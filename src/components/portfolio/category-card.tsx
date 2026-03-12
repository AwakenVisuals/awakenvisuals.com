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
      <Link href={href} className="group relative block aspect-[16/9] overflow-hidden rounded-lg">
        <div className="absolute inset-0 z-10 border-2 border-transparent transition-colors duration-500 group-hover:border-[#FFC95C] rounded-lg" />
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 z-[5] bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 z-[5] bg-[#043565]/20 transition-colors duration-500 group-hover:bg-[#043565]/10" />
        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-8 lg:p-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {title}
          </h2>
          <p className="mt-2 text-lg md:text-xl text-[#FFC95C] font-medium">
            {subtitle}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
