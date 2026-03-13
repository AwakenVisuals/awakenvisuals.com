"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import React from "react";

const InfiniteGallery = dynamic(
  () =>
    import("@/components/ui/3d-gallery-photography").then(
      (mod) => mod.InfiniteGallery
    ),
  { ssr: false, loading: () => null }
);

const galleryImages = [
  "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=800&q=80",
  "https://images.unsplash.com/photo-1504194104404-433180773017?w=800&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
  "https://images.unsplash.com/photo-1532549239564-a4860d583850?w=800&q=80",
  "https://images.unsplash.com/photo-1472457897821-70d58223824e?w=800&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
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
    <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-[#1A1A1A]">
      {/* 3D Gallery Background */}
      <div className="absolute inset-0">
        <GalleryErrorBoundary>
          <InfiniteGallery
            images={galleryImages}
            speed={0.6}
            visibleCount={8}
            className="h-full w-full"
          />
        </GalleryErrorBoundary>
        {/* Overlay for text readability */}
        <div className="pointer-events-none absolute inset-0 bg-[#1A1A1A]/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <h1 className="text-5xl font-light tracking-[0.2em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Awaken Visuals
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="mt-5 text-sm font-light uppercase tracking-[0.35em] text-white/70 sm:text-base"
        >
          Sport &amp; Travel Photography
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.25, 0.4, 0.25, 1] }}
          className="mt-12 flex gap-6"
        >
          <Link
            href="/portfolio/sport"
            className="border border-white/30 px-10 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-[#C8A84E] hover:text-[#C8A84E]"
          >
            Action
          </Link>
          <Link
            href="/portfolio/travel"
            className="border border-white/30 px-10 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-[#C8A84E] hover:text-[#C8A84E]"
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
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <ChevronDown className="h-4 w-4 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
