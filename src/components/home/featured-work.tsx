"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const featuredItems = [
  {
    title: "Football",
    category: "Sport",
    href: "/portfolio/sport",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
  },
  {
    title: "Landscapes",
    category: "Travel",
    href: "/portfolio/travel",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    title: "Athletics",
    category: "Sport",
    href: "/portfolio/sport",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
  },
  {
    title: "Street",
    category: "Travel",
    href: "/portfolio/travel",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
  },
  {
    title: "Motorsport",
    category: "Sport",
    href: "/portfolio/sport",
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
  },
  {
    title: "Architecture",
    category: "Travel",
    href: "/portfolio/travel",
    image:
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce65f4?w=800&q=80",
  },
];

export function FeaturedWork() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-[#043565] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-[0.1em] text-[#FFC95C] md:text-5xl">
            Featured Work
          </h2>
          <p className="mt-4 text-lg text-[#95B8D1] normal-case">
            A selection of our latest photography and videography
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              <Link href={item.href} className="group relative block overflow-hidden rounded-lg aspect-[4/5]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#043565]/90 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFC95C]">
                    {item.category}
                  </span>
                  <h3 className="mt-1 text-xl font-bold tracking-wider text-white">
                    {item.title}
                  </h3>
                </div>
                <div className="absolute inset-0 border-2 border-transparent transition-colors group-hover:border-[#FFC95C]/30 rounded-lg" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 text-center"
        >
          <Link
            href="/portfolio"
            className="inline-block rounded-full border-2 border-[#FFC95C] px-10 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#FFC95C] transition-all hover:bg-[#FFC95C] hover:text-[#043565]"
          >
            View All Work
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
