"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Link from "next/link";

export function ContactCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#043565] py-28 md:py-36">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <h2 className="text-3xl font-light tracking-[0.1em] text-white md:text-4xl lg:text-5xl">
            Let&apos;s Create Something Together
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/50">
            Have an event, a story, or an idea you want brought to life? Let&apos;s make it happen.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-block border border-[#C8A84E] bg-[#C8A84E]/10 px-12 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#C8A84E]/20"
            >
              I want to create cool stuff together!
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
