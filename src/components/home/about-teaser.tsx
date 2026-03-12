"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export function AboutTeaser() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-[#1F2F16] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative aspect-[3/4] overflow-hidden rounded-lg"
          >
            <Image
              src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80"
              alt="Photographer at work"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F2F16]/40 to-transparent" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FFC95C]">
              About
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-wider text-white md:text-4xl lg:text-5xl">
              The Story Behind the Lens
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#95B8D1]/80 normal-case">
              Awaken Visuals is a creative studio specialising in sport and
              travel photography and videography. We capture the raw energy of
              athletic competition and the breathtaking beauty of destinations
              around the world.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[#95B8D1]/80 normal-case">
              Every frame tells a story. Every moment is an opportunity to create
              something extraordinary.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-block rounded-full border-2 border-[#FFC95C] px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#FFC95C] transition-all hover:bg-[#FFC95C] hover:text-[#1F2F16]"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
