"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "motion/react";
import type { YouTubeVideo } from "@/lib/youtube";

const filters = [
  { id: "all", label: "All" },
  { id: "football", label: "Football" },
  { id: "formula-1", label: "Formula 1" },
  { id: "formula-e", label: "Formula E" },
  { id: "sportscars", label: "Sportscars" },
  { id: "gb3-gb4", label: "GB3 & GB4" },
  { id: "videos", label: "Videos" },
];

interface PortfolioImage {
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
}

const LOCAL_IMAGES: PortfolioImage[] = [
  { src: "/gallery/hero-1.jpg", alt: "Football action shot", category: "football", width: 6000, height: 4000 },
  { src: "/gallery/hero-5.jpg", alt: "Football match coverage", category: "football", width: 3000, height: 4500 },
  { src: "/gallery/hero-2.jpg", alt: "Formula 1 racing", category: "formula-1", width: 6000, height: 4000 },
  { src: "/gallery/hero-6.jpg", alt: "F1 paddock", category: "formula-1", width: 3000, height: 4500 },
  { src: "/gallery/hero-3.jpg", alt: "Formula E racing", category: "formula-e", width: 4000, height: 6000 },
  { src: "/gallery/hero-7.jpg", alt: "Formula E event", category: "formula-e", width: 3000, height: 2000 },
  { src: "/gallery/hero-4.jpg", alt: "Sportscar racing", category: "sportscars", width: 6000, height: 4000 },
  { src: "/gallery/hero-8.jpg", alt: "GT racing", category: "sportscars", width: 3000, height: 4500 },
  { src: "/gallery/hero-9.jpg", alt: "GB3 racing", category: "gb3-gb4", width: 4000, height: 6000 },
  { src: "/gallery/hero-10.jpg", alt: "GB4 racing", category: "gb3-gb4", width: 6000, height: 4000 },
];

// Unified gallery item — either a photo or video
interface GalleryItem {
  id: string;
  type: "photo" | "video";
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
  videoId?: string;
}

interface SportPortfolioProps {
  driveImages?: PortfolioImage[];
  videos?: YouTubeVideo[];
}

export function SportPortfolio({ driveImages = [], videos = [] }: SportPortfolioProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true });

  const portfolioImages = driveImages.length > 0 ? driveImages : LOCAL_IMAGES;

  // Convert photos and videos into unified gallery items
  const allItems: GalleryItem[] = [
    ...portfolioImages.map((img, i) => ({
      id: `photo-${i}`,
      type: "photo" as const,
      src: img.src,
      alt: img.alt,
      category: img.category,
      width: img.width,
      height: img.height,
    })),
    ...videos.map((video) => ({
      id: `video-${video.id}`,
      type: "video" as const,
      src: video.thumbnailUrl,
      alt: video.title,
      category: "videos",
      width: 1280,
      height: 720,
      videoId: video.id,
    })),
  ];

  const filteredItems =
    activeFilter === "all"
      ? allItems
      : allItems.filter((item) => item.category === activeFilter);

  const closeLightbox = useCallback(() => setActiveVideoId(null), []);

  // Only show Videos filter if there are videos
  const visibleFilters = videos.length > 0 ? filters : filters.filter((f) => f.id !== "videos");

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
            {visibleFilters.map((filter) => (
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

      {/* Gallery Grid — photos and videos mixed */}
      <section className="px-6 pb-32 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="columns-2 gap-4 md:columns-3 xl:columns-4">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="mb-4 break-inside-avoid overflow-hidden group relative"
                >
                  {item.type === "video" ? (
                    // Video thumbnail with play button overlay
                    <button
                      onClick={() => setActiveVideoId(item.videoId!)}
                      className="relative block w-full"
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-105"
                        unoptimized
                      />
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-300 group-hover:bg-black/40">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F5A300]/90 transition-transform duration-300 group-hover:scale-110">
                          <svg viewBox="0 0 24 24" fill="white" className="ml-1 h-6 w-6">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </button>
                  ) : (
                    // Photo — just sits there, no interaction
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-105"
                      unoptimized={item.src.startsWith("https://")}
                    />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredItems.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-white/40 text-lg">No items in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Video Lightbox */}
      <AnimatePresence>
        {activeVideoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 md:p-10"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 text-white/70 transition-colors hover:text-white"
              aria-label="Close video"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-8 w-8">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Video embed */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                title="Video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
