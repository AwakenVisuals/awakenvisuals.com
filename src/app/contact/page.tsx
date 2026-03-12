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
    <main className="min-h-screen bg-gradient-to-b from-[#043565] to-[#1F2F16]">
      {/* Header */}
      <section className="pb-8 pt-32 md:pt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <h1 className="text-5xl font-bold tracking-[0.1em] text-white md:text-6xl lg:text-7xl">
              Contact
            </h1>
            <p className="mt-4 max-w-lg text-lg text-[#95B8D1] normal-case">
              Have a project in mind or want to collaborate? We&apos;d love to
              hear from you.
            </p>
            <div className="mt-6 h-px w-20 bg-[#FFC95C]" />
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
              <h2 className="text-2xl font-bold tracking-wider text-[#FFC95C]">
                Get in Touch
              </h2>
              <p className="mt-4 text-[#95B8D1]/80 normal-case leading-relaxed">
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
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FFC95C]/10">
                      <item.icon className="h-5 w-5 text-[#FFC95C]" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.15em] text-[#95B8D1]/50">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="mt-1 text-lg font-medium text-white transition-colors hover:text-[#FFC95C] normal-case"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-lg font-medium text-white normal-case">
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
                className="space-y-6 rounded-xl border border-white/5 bg-white/[0.02] p-8"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm uppercase tracking-[0.15em] text-[#95B8D1]/70"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-[#FFC95C] focus:outline-none focus:ring-1 focus:ring-[#FFC95C] transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm uppercase tracking-[0.15em] text-[#95B8D1]/70"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-[#FFC95C] focus:outline-none focus:ring-1 focus:ring-[#FFC95C] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm uppercase tracking-[0.15em] text-[#95B8D1]/70"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-[#FFC95C] focus:outline-none focus:ring-1 focus:ring-[#FFC95C] transition-colors"
                  >
                    <option value="sport" className="bg-[#043565]">Sport Photography</option>
                    <option value="travel" className="bg-[#043565]">Travel Photography</option>
                    <option value="video" className="bg-[#043565]">Videography</option>
                    <option value="content" className="bg-[#043565]">Content Creation</option>
                    <option value="collaboration" className="bg-[#043565]">Collaboration</option>
                    <option value="other" className="bg-[#043565]">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm uppercase tracking-[0.15em] text-[#95B8D1]/70"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-[#FFC95C] focus:outline-none focus:ring-1 focus:ring-[#FFC95C] transition-colors"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#FFC95C] py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#043565] transition-all hover:bg-[#FFC95C]/90 hover:shadow-lg hover:shadow-[#FFC95C]/20"
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
