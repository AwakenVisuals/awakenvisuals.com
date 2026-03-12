"use client";

import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { CategoryCard } from "@/components/portfolio/category-card";

export function PortfolioLanding() {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true });

  return (
    <main className="min-h-screen bg-[#043565]">
      {/* Hero heading */}
      <section className="flex flex-col items-center justify-center px-6 pt-32 pb-16 md:pt-40 md:pb-20">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
            Portfolio
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-lg md:text-xl text-[#95B8D1]">
            Premium visual storytelling across sport and travel
          </p>
          <div className="mt-6 h-px w-24 mx-auto bg-[#FFC95C]" />
        </motion.div>
      </section>

      {/* Category cards */}
      <section className="px-6 pb-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl grid gap-8 md:grid-cols-2">
          <CategoryCard
            title="Sport"
            subtitle="Athletic moments captured in their purest form"
            href="/portfolio/sport"
            image="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80"
            alt="Sport photography - football action"
          />
          <CategoryCard
            title="Travel"
            subtitle="Global destinations through a cinematic lens"
            href="/portfolio/travel"
            image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"
            alt="Travel photography - mountain landscape"
          />
        </div>
      </section>

      {/* Explore CTA */}
      <section className="px-6 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-[#95B8D1] text-lg mb-6">
            Select a category to explore the full collection
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link
              href="/portfolio/sport"
              className="inline-flex items-center gap-2 rounded-full bg-[#FFC95C] px-8 py-3 text-sm font-semibold uppercase tracking-widest text-[#043565] transition-all hover:bg-[#FFC95C]/90 hover:shadow-lg hover:shadow-[#FFC95C]/20"
            >
              Explore Sport
            </Link>
            <Link
              href="/portfolio/travel"
              className="inline-flex items-center gap-2 rounded-full border border-[#FFC95C] px-8 py-3 text-sm font-semibold uppercase tracking-widest text-[#FFC95C] transition-all hover:bg-[#FFC95C]/10"
            >
              Explore Travel
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
