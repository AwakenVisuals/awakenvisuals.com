"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  backgroundImage?: string;
  overlay?: boolean;
}

export function ParallaxSection({
  children,
  className = "",
  speed = 0.3,
  backgroundImage,
  overlay = true,
}: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 200]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {backgroundImage && (
        <>
          <motion.div
            style={{ y }}
            className="absolute inset-0 -top-20 -bottom-20 bg-cover bg-center"
          >
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
          </motion.div>
          {overlay && (
            <div className="absolute inset-0 bg-[oklch(0.15_0.05_250/0.7)]" />
          )}
        </>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
