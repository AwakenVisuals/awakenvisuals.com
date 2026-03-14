"use client";

import { useRef, useState, FormEvent } from "react";
import { motion, useInView } from "motion/react";
import { Mail, MessageCircle, Instagram, Youtube, BookOpen } from "lucide-react";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.8a4.84 4.84 0 01-1-.11z" />
  </svg>
);

const contactButtons = [
  {
    icon: Mail,
    label: "Email Me",
    href: "mailto:nick@awakenvisuals.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp Me",
    href: "https://wa.me/447734803759",
  },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram", value: "@awakenvisuals", href: "https://instagram.com/awakenvisuals" },
  { icon: TikTokIcon, label: "TikTok", value: "@awakenvisuals", href: "https://tiktok.com/@awakenvisuals" },
  { icon: Youtube, label: "YouTube", value: "@awakenvisuals", href: "https://youtube.com/@awakenvisuals" },
  { icon: BookOpen, label: "Substack", value: "AV Club", href: "https://awakenvisuals.substack.com" },
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

    // Set the email subject dynamically
    const subject = data.get("subject") as string;
    data.set("_subject", `AwakenVisuals.com — ${subject || "New Enquiry"}`);

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
    <main className="min-h-screen bg-[#FFFFFF]">
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
            <p className="mt-4 max-w-lg text-lg text-[#000000]/60">
              Have a story to tell, a project to bring to life, or just want to say hey?
              I&apos;d love to hear from you. Let&apos;s chat about what we can create together.
            </p>
            <div className="mt-6 h-px w-20 bg-[#F5A300]" />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section ref={ref} className="pb-32 pt-12 md:pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Left: Contact Buttons + Social */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <h2 className="text-2xl font-bold tracking-wider text-[#043565]">
                Get in Touch
              </h2>

              {/* Contact Buttons */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                {contactButtons.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="inline-flex items-center justify-center gap-3 border-2 border-[#043565] bg-[#043565] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-all hover:bg-[#043565]/90"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </motion.a>
                ))}
              </div>

              {/* Follow Along */}
              <div className="mt-14">
                <h3 className="text-sm uppercase tracking-[0.15em] text-[#000000]/40">
                  Follow Along
                </h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {socialLinks.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-2 border border-[#D4E2ED] px-4 py-3 text-[#043565] transition-colors hover:border-[#F5A300] hover:text-[#F5A300]"
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{item.value}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            >
              {submitted ? (
                <div className="flex items-center justify-center border border-[#D4E2ED] bg-[#FFFFFF] p-8">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-[#043565]/5">
                      <Mail className="h-7 w-7 text-[#043565]" />
                    </div>
                    <p className="text-xl font-bold text-[#043565]">
                      Thanks for reaching out!
                    </p>
                    <p className="mt-2 text-[#000000]/60">
                      I&apos;ll be in touch asap! Nick
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  action="https://formspree.io/f/YOUR_FORM_ID"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-6 border border-[#D4E2ED] bg-[#FFFFFF] p-8"
                >
                  <input type="hidden" name="_replyto" />
                  <input type="hidden" name="_subject" />

                  <div>
                    <label htmlFor="name" className="block text-sm uppercase tracking-[0.15em] text-[#000000]/50">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="mt-2 w-full border border-[#D4E2ED] bg-[#FFFFFF] px-4 py-3 text-[#000000] placeholder:text-[#000000]/30 focus:border-[#043565] focus:outline-none focus:ring-1 focus:ring-[#043565] transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm uppercase tracking-[0.15em] text-[#000000]/50">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="mt-2 w-full border border-[#D4E2ED] bg-[#FFFFFF] px-4 py-3 text-[#000000] placeholder:text-[#000000]/30 focus:border-[#043565] focus:outline-none focus:ring-1 focus:ring-[#043565] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm uppercase tracking-[0.15em] text-[#000000]/50">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="mt-2 w-full border border-[#D4E2ED] bg-[#FFFFFF] px-4 py-3 text-[#000000] placeholder:text-[#000000]/30 focus:border-[#043565] focus:outline-none focus:ring-1 focus:ring-[#043565] transition-colors"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm uppercase tracking-[0.15em] text-[#000000]/50">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="mt-2 w-full resize-none border border-[#D4E2ED] bg-[#FFFFFF] px-4 py-3 text-[#000000] placeholder:text-[#000000]/30 focus:border-[#043565] focus:outline-none focus:ring-1 focus:ring-[#043565] transition-colors"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#043565] py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-all hover:bg-[#043565]/90 disabled:opacity-50"
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
