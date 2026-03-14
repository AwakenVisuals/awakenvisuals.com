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
 * - width: image width in pixels (for aspect ratio calculation)
 * - height: image height in pixels (for aspect ratio calculation)
 *
 * Example:
 * { src: "/portfolio/travel/japan-temple.jpg", alt: "Temple in Kyoto", category: "travel", width: 3000, height: 4500 },
 * ============================================
 */
interface PortfolioImage {
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
}

const portfolioImages: PortfolioImage[] = [
  // Travel
  { src: "/gallery/hero-3.jpg", alt: "Travel photography", category: "travel", width: 4000, height: 6000 },
  { src: "/gallery/hero-7.jpg", alt: "Landscape photography", category: "travel", width: 3000, height: 2000 },
  { src: "/gallery/hero-9.jpg", alt: "Adventure destination", category: "travel", width: 4000, height: 6000 },
  // Edits
  { src: "/gallery/hero-4.jpg", alt: "Creative edit", category: "edits", width: 6000, height: 4000 },
  { src: "/gallery/hero-8.jpg", alt: "Photo edit", category: "edits", width: 3000, height: 4500 },
  { src: "/gallery/hero-10.jpg", alt: "Visual edit", category: "edits", width: 6000, height: 4000 },
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
            <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.06em] text-white">
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
          <div className="columns-2 gap-4 md:columns-3 xl:columns-4">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="mb-4 break-inside-avoid overflow-hidden group"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

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
