"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "motion/react";

/*
 * ============================================
 * PORTFOLIO FILTERS - EDIT HERE TO ADD/REMOVE
 * ============================================
 * To add a new filter (e.g., "Norway"):
 * 1. Add a new entry: { id: "norway", label: "Norway" }
 * 2. Add images to the portfolioImages array below with category: "norway"
 * 3. Add your images to the /public/portfolio/travel/ folder
 * ============================================
 */
const filters = [
  { id: "all", label: "All" },
  { id: "travel", label: "Travel" },
  { id: "edits", label: "Edits" },
];

/*
 * ============================================
 * PORTFOLIO IMAGES - EDIT HERE TO ADD/REMOVE
 * ============================================
 * Each image needs:
 * - src: path to your image (put in /public/portfolio/travel/)
 * - alt: description of the image
 * - category: must match a filter id above
 * - aspect: "landscape" or "portrait" (affects grid layout)
 *
 * Example:
 * { src: "/portfolio/travel/japan-temple.jpg", alt: "Temple in Kyoto", category: "travel", aspect: "portrait" },
 * ============================================
 */
interface PortfolioImage {
  src: string;
  alt: string;
  category: string;
  aspect: "landscape" | "portrait";
}

const portfolioImages: PortfolioImage[] = [
  // Travel
  { src: "/gallery/hero-3.jpg", alt: "Travel photography", category: "travel", aspect: "landscape" },
  { src: "/gallery/hero-7.jpg", alt: "Landscape photography", category: "travel", aspect: "portrait" },
  { src: "/gallery/hero-9.jpg", alt: "Adventure destination", category: "travel", aspect: "landscape" },
  // Edits
  { src: "/gallery/hero-4.jpg", alt: "Creative edit", category: "edits", aspect: "landscape" },
  { src: "/gallery/hero-8.jpg", alt: "Photo edit", category: "edits", aspect: "portrait" },
  { src: "/gallery/hero-10.jpg", alt: "Visual edit", category: "edits", aspect: "landscape" },
];

export function TravelPortfolio() {
  const [activeFilter, setActiveFilter] = useState("all");
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true });

  const filteredImages = activeFilter === "all"
    ? portfolioImages
    : portfolioImages.filter(img => img.category === activeFilter);

  return (
    <main className="min-h-screen bg-[#043565]">
      {/* Header */}
      <section className="px-6 pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="mx-auto max-w-7xl text-center">
          <motion.div
            ref={headingRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F5A300]">
              Portfolio
            </span>
            <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-[0.06em] text-white">
              Adventure
            </h1>
            <p className="mt-4 text-base tracking-wide text-white/50">
              Travel Photography and Edits by Nick Emmerson
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2.5 text-xs font-medium uppercase tracking-[0.15em] border transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "border-[#F5A300] text-[#F5A300] bg-[#F5A300]/10"
                    : "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 pb-32 md:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div layout className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="mb-4 break-inside-avoid"
                >
                  <div className={`group relative overflow-hidden ${
                    image.aspect === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"
                  }`}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredImages.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-white/40 text-lg">No images in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
