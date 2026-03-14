"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

const InfiniteGallery = dynamic(
  () =>
    import("@/components/ui/3d-gallery-photography").then(
      (mod) => mod.InfiniteGallery
    ),
  { ssr: false, loading: () => null }
);

const galleryImages = [
  "/gallery/hero-1.jpg",
  "/gallery/hero-2.jpg",
  "/gallery/hero-3.jpg",
  "/gallery/hero-4.jpg",
  "/gallery/hero-5.jpg",
  "/gallery/hero-6.jpg",
  "/gallery/hero-7.jpg",
  "/gallery/hero-8.jpg",
  "/gallery/hero-9.jpg",
  "/gallery/hero-10.jpg",
  "/gallery/hero-11.jpg",
  "/gallery/hero-12.jpg",
  "/gallery/hero-13.jpg",
  "/gallery/hero-14.jpg",
];

class GalleryErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export function Hero() {
  return (
    <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-[#043565]">
      {/* 3D Gallery Background */}
      <div className="absolute inset-0">
        <GalleryErrorBoundary>
          <InfiniteGallery
            images={galleryImages}
            speed={0.6}
            visibleCount={23}
            className="h-full w-full"
          />
        </GalleryErrorBoundary>
        {/* Overlay for text readability */}
        <div className="pointer-events-none absolute inset-0 bg-[#043565]/50" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <h1 className="text-xl font-light italic leading-tight tracking-wide text-[#F5A300] sm:text-2xl md:text-3xl lg:text-4xl">
            Bringing a human touch
            <br />
            to your stories
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.25, 0.4, 0.25, 1] }}
          className="mt-12 flex gap-6"
        >
          <Link
            href="/portfolio/sport"
            className="border border-[#F5A300]/40 bg-[#F5A300]/10 px-10 py-3 text-xs font-medium uppercase tracking-[0.2em] text-[#F5A300] transition-all duration-300 hover:bg-[#F5A300]/20 hover:border-[#F5A300]"
          >
            Action
          </Link>
          <Link
            href="/portfolio/travel"
            className="border border-[#F5A300]/40 bg-[#F5A300]/10 px-10 py-3 text-xs font-medium uppercase tracking-[0.2em] text-[#F5A300] transition-all duration-300 hover:bg-[#F5A300]/20 hover:border-[#F5A300]"
          >
            Adventure
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[11px] font-light uppercase tracking-[0.3em] text-white/40">
          Scroll
        </span>
        <motion.div
          animate={{ height: ["0%", "100%", "0%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px bg-[#F5A300]"
          style={{ height: 40 }}
        />
      </motion.div>
    </section>
  );
}
