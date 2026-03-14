"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Eye, Play, TrendingUp, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "His creative ability to capture the mood of the moment and convert this into a social media context is spot on. We always got great results...",
    name: "Paul Fullick",
    role: "Driver",
    image: "/about/paul-fullick.jpg", // Replace with actual photo in /public/about/
  },
  {
    quote:
      "He's always professional, friendly and highly approachable with new ideas and top quality content...",
    name: "Andy Tucker",
    role: "Driver",
    image: "/about/andy-tucker.jpg", // Replace with actual photo in /public/about/
  },
];

export default function AboutPage() {
  const storyRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });

  const testimonialsRef = useRef(null);
  const testimonialsInView = useInView(testimonialsRef, {
    once: true,
    margin: "-50px",
  });

  return (
    <main className="min-h-screen bg-[#FFFFFF]">
      {/* Hero */}
      <section className="pb-8 pt-32 md:pt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <h1 className="text-5xl font-bold tracking-[0.06em] text-[#043565] md:text-6xl lg:text-7xl">
              {"Hey! I'm Nick"}
            </h1>
            <p className="mt-4 max-w-lg text-lg text-[#000000]/60">
              The creative behind Awaken Visuals.
            </p>
            <div className="mt-6 h-px w-20 bg-[#F5A300]" />
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section ref={storyRef} className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className="relative aspect-[4/5] overflow-hidden rounded-lg"
            >
              {/* Replace /about/nick.jpg with your own photo in /public/about/ */}
              <Image
                src="/about/nick.jpg"
                alt="Nick Emmerson — Awaken Visuals"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F5A300]">
                About Me
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-wider text-[#043565] md:text-4xl">
                Creative Professional &amp; Brand Partner
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-[#000000]/70">
                {
                  "I've had the privilege of collaborating with major brands including Formula 1 and Unilad, and those experiences shaped how I approach every project today."
                }
              </p>
              <p className="mt-4 text-lg leading-relaxed text-[#000000]/70">
                I established Awaken Visuals as an independent creative business
                so I could partner with brands I genuinely support. My mission is
                simple: produce high-quality, visually compelling content that
                also achieves measurable business objectives.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-[#000000]/70">
                Working with me means access to a distinctive creative
                perspective combined with a real commitment to producing the
                optimal content for your brand storytelling and audience
                engagement.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-[#043565] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Play className="mx-auto h-8 w-8 text-[#F5A300]" />
              <p className="mt-4 text-3xl font-bold tracking-wider text-white md:text-4xl">
                150M+
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/60">
                Views Across Platforms
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <TrendingUp className="mx-auto h-8 w-8 text-[#F5A300]" />
              <p className="mt-4 text-3xl font-bold tracking-wider text-white md:text-4xl">
                4
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/60">
                Major Platforms
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <Eye className="mx-auto h-8 w-8 text-[#F5A300]" />
              <p className="mt-4 text-3xl font-bold tracking-wider text-white md:text-4xl">
                Instagram, TikTok, Facebook &amp; YouTube
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/60">
                Reach
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F5A300]">
              Kind Words
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-[0.06em] text-[#043565] md:text-4xl">
              What People Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 40 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className="border border-[#D4E2ED] bg-[#FFFFFF] p-8"
              >
                <Quote className="h-8 w-8 text-[#F5A300]/40" />
                <p className="mt-4 text-lg leading-relaxed text-[#000000]/70 italic">
                  {`"${testimonial.quote}"`}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-[#D4E2ED]">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <p className="font-semibold tracking-wider text-[#043565]">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-[#000000]/50">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#043565] py-24">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-[0.06em] text-white md:text-4xl">
            Beyond the Finish Line and Off the Beaten Path. Above All, Human.
          </h2>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="bg-[#F5A300] px-10 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#043565] transition-all hover:bg-[#F5A300]/90"
            >
              Get in Touch
            </Link>
            <Link
              href="/portfolio/sport"
              className="border-2 border-white/20 px-10 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-all hover:border-white"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
