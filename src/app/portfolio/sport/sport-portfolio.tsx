"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "motion/react";

/*
 * ============================================
 * PORTFOLIO FILTERS - EDIT HERE TO ADD/REMOVE
 * ============================================
 * To add a new filter (e.g., "Rugby"):
 * 1. Add a new entry: { id: "rugby", label: "Rugby" }
 * 2. Add images to the portfolioImages array below with category: "rugby"
 * 3. Add your images to the /public/portfolio/sport/ folder
 * ============================================
 */
const filters = [
  { id: "all", label: "All" },
  { id: "football", label: "Football" },
  { id: "formula-1", label: "Formula 1" },
  { id: "formula-e", label: "Formula E" },
  { id: "sportscars", label: "Sportscars" },
  { id: "gb3-gb4", label: "GB3 & GB4" },
];

/*
 * ============================================
 * PORTFOLIO IMAGES - EDIT HERE TO ADD/REMOVE
 * ============================================
 * Each image needs:
 * - src: path to your image (put in /public/portfolio/sport/)
 * - alt: description of the image
 * - category: must match a filter id above
 * - width: image width in pixels (for aspect ratio calculation)
 * - height: image height in pixels (for aspect ratio calculation)
 *
 * Example to add a new image:
 * { src: "/portfolio/sport/my-new-photo.jpg", alt: "Description", category: "football", width: 6000, height: 4000 },
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
  // Football
  { src: "/gallery/hero-1.jpg", alt: "Football action shot", category: "football", width: 6000, height: 4000 },
  { src: "/gallery/hero-5.jpg", alt: "Football match coverage", category: "football", width: 3000, height: 4500 },
  // Formula 1
  { src: "/gallery/hero-2.jpg", alt: "Formula 1 racing", category: "formula-1", width: 6000, height: 4000 },
  { src: "/gallery/hero-6.jpg", alt: "F1 paddock", category: "formula-1", width: 3000, height: 4500 },
  // Formula E
  { src: "/gallery/hero-3.jpg", alt: "Formula E racing", category: "formula-e", width: 4000, height: 6000 },
  { src: "/gallery/hero-7.jpg", alt: "Formula E event", category: "formula-e", width: 3000, height: 2000 },
  // Sportscars
  { src: "/gallery/hero-4.jpg", alt: "Sportscar racing", category: "sportscars", width: 6000, height: 4000 },
  { src: "/gallery/hero-8.jpg", alt: "GT racing", category: "sportscars", width: 3000, height: 4500 },
  // GB3 & GB4
  { src: "/gallery/hero-9.jpg", alt: "GB3 racing", category: "gb3-gb4", width: 4000, height: 6000 },
  { src: "/gallery/hero-10.jpg", alt: "GB4 racing", category: "gb3-gb4", width: 6000, height: 4000 },
];

export function SportPortfolio() {
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
              Action
            </h1>
            <p className="mt-4 text-base tracking-wide text-white/50">
              Sports Photography by Nick Emmerson
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
