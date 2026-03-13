"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Mail, MapPin, Instagram, Youtube } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@awakenvisuals.com",
    href: "mailto:hello@awakenvisuals.com",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@awakenvisuals",
    href: "https://instagram.com/awakenvisuals",
  },
  {
    icon: Youtube,
    label: "YouTube",
    value: "Awaken Visuals",
    href: "https://youtube.com/@awakenvisuals",
  },
  {
    icon: MapPin,
    label: "Based in",
    value: "United Kingdom",
    href: null,
  },
];

export default function ContactPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <main className="min-h-screen bg-[#F7F5F0]">
      {/* Header */}
      <section className="pb-8 pt-32 md:pt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <h1 className="text-5xl font-bold tracking-[0.06em] text-[#043565] md:text-6xl lg:text-7xl">
              Contact
            </h1>
            <p className="mt-4 max-w-lg text-lg text-[#1A1A1A]/60">
              Have a project in mind or want to collaborate? We&apos;d love to
              hear from you.
            </p>
            <div className="mt-6 h-px w-20 bg-[#C8A84E]" />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section ref={ref} className="pb-32 pt-12 md:pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <h2 className="text-2xl font-bold tracking-wider text-[#043565]">
                Get in Touch
              </h2>
              <p className="mt-4 leading-relaxed text-[#1A1A1A]/60">
                Whether you need coverage for a sporting event, travel content
                for your brand, or a creative visual project — reach out and
                let&apos;s start a conversation.
              </p>

              <div className="mt-10 space-y-8">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#043565]/5">
                      <item.icon className="h-5 w-5 text-[#043565]" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.15em] text-[#1A1A1A]/40">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="mt-1 text-lg font-medium text-[#1A1A1A] transition-colors hover:text-[#C8A84E]"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-lg font-medium text-[#1A1A1A]">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <form
                action="https://formspree.io/f/YOUR_FORM_ID"
                method="POST"
                className="space-y-6 rounded-xl border border-[#1A1A1A]/10 bg-white p-8"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm uppercase tracking-[0.15em] text-[#1A1A1A]/50"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="mt-2 w-full rounded-lg border border-[#1A1A1A]/10 bg-[#F7F5F0] px-4 py-3 text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:border-[#043565] focus:outline-none focus:ring-1 focus:ring-[#043565] transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm uppercase tracking-[0.15em] text-[#1A1A1A]/50"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-2 w-full rounded-lg border border-[#1A1A1A]/10 bg-[#F7F5F0] px-4 py-3 text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:border-[#043565] focus:outline-none focus:ring-1 focus:ring-[#043565] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm uppercase tracking-[0.15em] text-[#1A1A1A]/50"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="mt-2 w-full rounded-lg border border-[#1A1A1A]/10 bg-[#F7F5F0] px-4 py-3 text-[#1A1A1A] focus:border-[#043565] focus:outline-none focus:ring-1 focus:ring-[#043565] transition-colors"
                  >
                    <option value="sport">Sport Photography</option>
                    <option value="travel">Travel Photography</option>
                    <option value="video">Videography</option>
                    <option value="content">Content Creation</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm uppercase tracking-[0.15em] text-[#1A1A1A]/50"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="mt-2 w-full resize-none rounded-lg border border-[#1A1A1A]/10 bg-[#F7F5F0] px-4 py-3 text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:border-[#043565] focus:outline-none focus:ring-1 focus:ring-[#043565] transition-colors"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#043565] py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-all hover:bg-[#043565]/90"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
