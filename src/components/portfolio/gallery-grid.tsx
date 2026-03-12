"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
  onItemClick?: (index: number) => void;
}

function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: GalleryItem;
  index: number;
  onClick?: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

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
      className="mb-4 break-inside-avoid cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-lg bg-[#1F2F16]/30">
        <div className="relative aspect-[4/5]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-sm uppercase tracking-widest text-[#FFC95C]">
            {item.category}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-white">
            {item.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

export function GalleryGrid({ items, onItemClick }: GalleryGridProps) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {items.map((item, index) => (
        <GalleryCard
          key={item.id}
          item={item}
          index={index}
          onClick={() => onItemClick?.(index)}
        />
      ))}
    </div>
  );
}
