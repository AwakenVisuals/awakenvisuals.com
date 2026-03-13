"use client";

import { useRef, useState, FormEvent } from "react";
import { motion, useInView } from "motion/react";
import { Mail, MessageCircle, Phone, Instagram } from "lucide-react";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.8a4.84 4.84 0 01-1-.11z" />
  </svg>
);

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "Nick@awakenvisuals.com",
    href: "mailto:Nick@awakenvisuals.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+44 7734 803759",
    href: "https://wa.me/447734803759",
  },
  {
    icon: Phone,
    label: "iMessage",
    value: "+44 7734 803759",
    href: "sms:+447734803759",
  },
];

const socialLinks = [
  {
    icon: Instagram,
    label: "Instagram",
    value: "@awakenvisuals",
    href: "https://instagram.com/awakenvisuals",
  },
  {
    icon: TikTokIcon,
    label: "TikTok",
    value: "@awakenvisuals",
    href: "https://tiktok.com/@awakenvisuals",
  },
];

export default function ContactPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
      }
    } catch {
      // silently fail
    } finally {
      setSubmitting(false);
    }
  }

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
              Please feel free to reach out if you&apos;d like to discuss an
              upcoming project, want to know more about Awaken Visuals or just
              say hi. It&apos;s always great to get to know more people in our
              community.
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

              <div className="mt-10 space-y-8">
                {contactMethods.map((item, index) => (
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
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="mt-1 text-lg font-medium text-[#1A1A1A] transition-colors hover:text-[#C8A84E]"
                      >
                        {item.value}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-12">
                <h3 className="text-sm uppercase tracking-[0.15em] text-[#1A1A1A]/40">
                  Follow Along
                </h3>
                <div className="mt-4 flex gap-4">
                  {socialLinks.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-2 rounded-lg bg-[#043565]/5 px-4 py-3 text-[#043565] transition-colors hover:bg-[#043565]/10 hover:text-[#C8A84E]"
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{item.value}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            >
              {submitted ? (
                <div className="flex items-center justify-center rounded-xl border border-[#1A1A1A]/10 bg-white p-8">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#043565]/5">
                      <Mail className="h-7 w-7 text-[#043565]" />
                    </div>
                    <p className="text-xl font-bold text-[#043565]">
                      Thanks for reaching out!
                    </p>
                    <p className="mt-2 text-[#1A1A1A]/60">
                      I&apos;ll be in touch asap! Nick
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  action="https://formspree.io/f/YOUR_FORM_ID"
                  method="POST"
                  onSubmit={handleSubmit}
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
                    disabled={submitting}
                    className="w-full rounded-full bg-[#043565] py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-all hover:bg-[#043565]/90 disabled:opacity-50"
                  >
                    {submitting ? "Sending..." : "Send"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
