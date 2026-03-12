"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Dynamically import 3D gallery to avoid SSR issues with Three.js
const InfiniteGallery = dynamic(
  () =>
    import("@/components/ui/3d-gallery-photography").then(
      (mod) => mod.InfiniteGallery ?? mod.default
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[500px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#FFC95C] border-t-transparent" />
      </div>
    ),
  }
);

const galleryImages = [
  "https://images.unsplash.com/photo-1461896836934-bd45ba24e72c?w=800&q=80",
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
  "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
  "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
  "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&q=80",
  "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80",
  "https://images.unsplash.com/photo-1511739001486-6bfe10ce65f4?w=800&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
];

export function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative bg-[#1F2F16] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-[0.1em] text-[#FFC95C] md:text-5xl">
            Explore
          </h2>
          <p className="mt-4 text-lg text-[#95B8D1] normal-case">
            Immerse yourself in our visual world
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
        className="h-[500px] md:h-[600px] lg:h-[700px] w-full"
      >
        <InfiniteGallery images={galleryImages} speed={1} visibleCount={8} className="h-full w-full" />
      </motion.div>
    </section>
  );
}
