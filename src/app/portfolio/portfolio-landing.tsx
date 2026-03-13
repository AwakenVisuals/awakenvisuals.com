"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { CategoryCard } from "@/components/portfolio/category-card";

export function PortfolioLanding() {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true });

  return (
    <main className="min-h-screen bg-[#F7F5F0]">
      {/* Hero heading */}
      <section className="flex flex-col items-center justify-center px-6 pt-32 pb-16 md:pt-40 md:pb-20">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light uppercase tracking-[0.15em] text-[#1A1A1A]">
            Portfolio
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-base md:text-lg text-[#1A1A1A]/50 tracking-wide">
            Premium visual storytelling across sport and travel
          </p>
          <div className="mt-8 h-px w-16 mx-auto bg-[#C8A84E]" />
        </motion.div>
      </section>

      {/* Category cards */}
      <section className="px-6 pb-32 md:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-2">
          <CategoryCard
            title="Action"
            subtitle="Sport Photography"
            href="/portfolio/sport"
            image="https://images.unsplash.com/photo-1541252260730-0412e8e2108e?w=1200&q=80"
            alt="Sport photography - motorsport action"
          />
          <CategoryCard
            title="Adventure"
            subtitle="Travel Photography"
            href="/portfolio/travel"
            image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"
            alt="Travel photography - mountain landscape"
          />
        </div>
      </section>
    </main>
  );
}
