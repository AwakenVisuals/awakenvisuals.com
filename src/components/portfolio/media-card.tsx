"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface MediaCardProps {
  image: string;
  title: string;
  index?: number;
  onClick?: () => void;
}

export function MediaCard({ image, title, index = 0, onClick }: MediaCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: (index % 4) * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[#043565]/20">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="text-sm uppercase tracking-[0.2em] text-[#FFC95C] font-medium">
            View
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <h3 className="text-base font-semibold text-white">{title}</h3>
        </div>
      </div>
    </motion.div>
  );
}
