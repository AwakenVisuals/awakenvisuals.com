"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Lightbox } from "@/components/portfolio/lightbox";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
}

interface SubcategoryGalleryProps {
  title: string;
  description: string;
  category: string;
  images: GalleryImage[];
}

export function SubcategoryGallery({
  title,
  description,
  category,
  images,
}: SubcategoryGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true });

  const lightboxImages = images.map((img) => ({
    src: img.src.replace("w=800", "w=1600"),
    alt: img.alt,
  }));

  return (
    <main className="min-h-screen bg-[#F5F3EE]">
      {/* Header */}
      <section className="px-6 pt-28 pb-8 md:pt-36 md:pb-12">
        <div className="mx-auto max-w-7xl">
          <Link
            href={`/portfolio/${category}`}
            className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.15em] text-[#000000]/40 transition-colors hover:text-[#F5A300] mb-10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {category.charAt(0).toUpperCase() + category.slice(1)}
          </Link>
          <motion.div
            ref={headingRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <h1 className="text-5xl font-light uppercase tracking-[0.15em] text-[#000000] md:text-6xl lg:text-7xl">
              {title}
            </h1>
            {description && (
              <p className="mt-4 max-w-lg text-base text-[#000000]/50 tracking-wide normal-case">
                {description}
              </p>
            )}
            <div className="mt-8 h-px w-16 bg-[#F5A300]" />
          </motion.div>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="px-6 pb-32 md:px-10">
        <div className="mx-auto max-w-7xl columns-1 gap-4 sm:columns-2 lg:columns-3">
          {images.map((image, index) => (
            <GalleryItem
              key={image.id}
              image={image}
              index={index}
              onClick={() => setLightboxIndex(index)}
            />
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() =>
            setLightboxIndex((prev) =>
              prev !== null ? (prev + 1) % images.length : 0
            )
          }
          onPrev={() =>
            setLightboxIndex((prev) =>
              prev !== null ? (prev - 1 + images.length) % images.length : 0
            )
          }
        />
      )}
    </main>
  );
}

function GalleryItem({
  image,
  index,
  onClick,
}: {
  image: GalleryImage;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  // Vary aspect ratios for masonry effect
  const aspects = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[1/1]", "aspect-[3/4]", "aspect-[5/4]", "aspect-[4/5]"];
  const aspect = aspects[index % aspects.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: (index % 3) * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="mb-4 break-inside-avoid"
    >
      <button
        onClick={onClick}
        className={`group relative block w-full overflow-hidden ${aspect}`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </button>
    </motion.div>
  );
}
