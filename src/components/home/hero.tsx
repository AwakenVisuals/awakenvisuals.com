"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 -top-20"
      >
        <div
          className="h-[120%] w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1461896836934-bd45ba24e72c?w=1920&q=80)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#043565]/80 via-[#043565]/60 to-[#1F2F16]" />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <h1 className="text-5xl font-bold tracking-[0.15em] text-white sm:text-7xl md:text-8xl lg:text-9xl">
            <span className="block text-[#FFC95C]">Awaken</span>
            <span className="block">Visuals</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="mt-6 text-lg font-light tracking-[0.3em] text-[#95B8D1] sm:text-xl md:text-2xl normal-case"
        >
          Sport &amp; Travel Photography
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-10 flex justify-center gap-4"
        >
          <a
            href="/portfolio/sport"
            className="rounded-full border-2 border-[#FFC95C] px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#FFC95C] transition-all hover:bg-[#FFC95C] hover:text-[#043565]"
          >
            Sport
          </a>
          <a
            href="/portfolio/travel"
            className="rounded-full bg-[#FFC95C] px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#043565] transition-all hover:bg-[#FFC95C]/90"
          >
            Travel
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-light uppercase tracking-[0.3em] text-white/50 normal-case">
            Scroll
          </span>
          <ChevronDown className="h-4 w-4 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
