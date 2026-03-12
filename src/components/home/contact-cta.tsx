"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import Link from "next/link";

export function ContactCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={ref} className="relative overflow-hidden py-32 md:py-40">
      {/* Parallax Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 -top-20 -bottom-20"
      >
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=80)",
          }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-[#1F2F16]/85" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <h2 className="text-4xl font-bold tracking-[0.1em] text-white md:text-5xl lg:text-6xl">
            {"Let's Create"}
            <span className="block text-[#FFC95C]">Something Epic</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#95B8D1]/80 normal-case">
            Whether you need coverage for a sporting event, travel content, or a
            creative project — we&apos;d love to hear from you.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-[#FFC95C] px-10 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#1F2F16] transition-all hover:bg-[#FFC95C]/90 hover:shadow-lg hover:shadow-[#FFC95C]/20"
            >
              Get in Touch
            </Link>
            <Link
              href="/portfolio"
              className="rounded-full border-2 border-white/30 px-10 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-all hover:border-white hover:bg-white/5"
            >
              View Portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
