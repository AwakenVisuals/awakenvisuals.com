"use client";

import Image from "next/image";
import { useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          onNext();
          break;
        case "ArrowLeft":
          onPrev();
          break;
      }
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const current = images[currentIndex];
  if (!current) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />

        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 z-50 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          aria-label="Close lightbox"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Counter */}
        <div className="absolute top-4 left-4 z-50 text-sm font-medium text-white/70">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Previous button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 z-50 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:left-6"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative z-40 h-[80vh] w-[90vw] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Next button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 z-50 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:right-6"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
