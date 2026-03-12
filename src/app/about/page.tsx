"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Camera, Mountain, Globe, Award } from "lucide-react";

const stats = [
  { icon: Camera, label: "Projects", value: "200+" },
  { icon: Mountain, label: "Countries", value: "30+" },
  { icon: Globe, label: "Sports Covered", value: "15+" },
  { icon: Award, label: "Years Experience", value: "8+" },
];

const services = [
  {
    title: "Sport Photography",
    description:
      "From sideline action at professional matches to the raw emotion of grassroots competition, we capture the decisive moments that define sport.",
  },
  {
    title: "Travel Photography",
    description:
      "Landscapes, street scenes, culture, and wildlife — we tell the visual stories of the places we explore and the people we meet.",
  },
  {
    title: "Videography",
    description:
      "Cinematic video content for brands, events, and editorial use. From highlight reels to full documentaries.",
  },
  {
    title: "Content Creation",
    description:
      "End-to-end visual content for social media, websites, and marketing campaigns that connect with audiences.",
  },
];

export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const storyRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

  const servicesRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, margin: "-50px" });

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 -top-20">
          <div
            className="h-[130%] w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1920&q=80)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#043565]/70 via-[#043565]/50 to-[#043565]" />
        </motion.div>

        <div className="relative z-10 flex h-full items-end pb-16">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <h1 className="text-5xl font-bold tracking-[0.1em] text-white md:text-6xl lg:text-7xl">
                About
              </h1>
              <div className="mt-4 h-px w-20 bg-[#FFC95C]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section ref={storyRef} className="bg-[#043565] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className="relative aspect-[4/5] overflow-hidden rounded-lg"
            >
              <Image
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80"
                alt="Photographer in the field"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#043565]/30 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FFC95C]">
                Our Story
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-wider text-white md:text-4xl">
                The Story Behind the Lens
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-[#95B8D1]/80 normal-case">
                Awaken Visuals started with a simple belief: every moment has a story
                worth telling. What began as a passion for capturing the intensity of
                sport grew into a creative studio that spans both the athletic arena
                and the most stunning destinations on earth.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-[#95B8D1]/80 normal-case">
                We specialise in creating compelling visual content that captures raw
                emotion, natural beauty, and the fleeting moments that make life
                extraordinary. Whether pitchside at a major sporting event or deep in
                the wilderness, we bring the same dedication to every frame.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-[#95B8D1]/80 normal-case">
                Our work has taken us across 30+ countries and to some of the biggest
                sporting events in the world. Every project is an opportunity to push
                creative boundaries and deliver something truly special.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="bg-[#1F2F16] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="mx-auto h-8 w-8 text-[#FFC95C]" />
                <p className="mt-4 text-3xl font-bold tracking-wider text-white md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-[#95B8D1]/60">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section ref={servicesRef} className="bg-[#043565] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold tracking-[0.1em] text-[#FFC95C] md:text-5xl">
              What We Do
            </h2>
            <p className="mt-4 text-lg text-[#95B8D1] normal-case">
              Services tailored to tell your visual story
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className="rounded-lg border border-white/5 bg-white/[0.02] p-8 transition-colors hover:border-[#FFC95C]/20"
              >
                <h3 className="text-xl font-bold tracking-wider text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-[#95B8D1]/70 normal-case leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1F2F16] py-24">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-[0.1em] text-white md:text-4xl">
            {"Let's Work Together"}
          </h2>
          <p className="mt-4 text-lg text-[#95B8D1]/80 normal-case">
            Got a project in mind? We&apos;d love to hear from you.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-[#FFC95C] px-10 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#1F2F16] transition-all hover:bg-[#FFC95C]/90"
            >
              Get in Touch
            </Link>
            <Link
              href="/portfolio"
              className="rounded-full border-2 border-white/30 px-10 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-all hover:border-white"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
