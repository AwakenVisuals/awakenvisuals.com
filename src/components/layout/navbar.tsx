"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Instagram } from "lucide-react";

const navLinks = [
  { href: "/portfolio/sport", label: "Action" },
  { href: "/portfolio/travel", label: "Adventure" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://instagram.com/awakenvisuals", icon: Instagram, label: "Instagram" },
  {
    href: "https://tiktok.com/@awakenvisuals",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.06a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.49z" />
      </svg>
    ),
    label: "TikTok",
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span
              className={`text-xl font-semibold uppercase tracking-[0.25em] transition-colors duration-300 ${
                isScrolled ? "text-[#043565]" : "text-white"
              }`}
            >
              Awaken
            </span>
            <span
              className={`text-xl font-light uppercase tracking-[0.25em] transition-colors duration-300 ${
                isScrolled ? "text-[#043565]" : "text-white"
              }`}
            >
              Visuals
            </span>
          </Link>

          {/* Desktop Nav + Social */}
          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-medium uppercase tracking-[0.15em] transition-colors hover:text-[#C8A84E] ${
                  isScrolled ? "text-[#1A1A1A]" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Social Icons — far right */}
            <div className="ml-2 flex items-center gap-4 border-l border-current/10 pl-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors hover:text-[#C8A84E] ${
                    isScrolled ? "text-[#1A1A1A]/60" : "text-white/60"
                  }`}
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className={`md:hidden transition-colors duration-300 ${
              isScrolled ? "text-[#1A1A1A]" : "text-white"
            }`}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="fixed inset-0 z-[100] flex flex-col bg-white"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setIsMobileOpen(false)}
              >
                <span className="text-xl font-semibold uppercase tracking-[0.25em] text-[#043565]">
                  Awaken
                </span>
                <span className="text-xl font-light uppercase tracking-[0.25em] text-[#043565]">
                  Visuals
                </span>
              </Link>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="text-[#1A1A1A]"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-1 flex-col items-center justify-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="text-center"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="text-3xl font-light uppercase tracking-[0.2em] text-[#1A1A1A] transition-colors hover:text-[#C8A84E]"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Social Icons — bottom */}
            <div className="flex items-center justify-center gap-6 pb-12">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1A1A1A]/50 transition-colors hover:text-[#C8A84E]"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
