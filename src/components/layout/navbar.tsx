"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  {
    href: "/portfolio",
    label: "Portfolio",
    children: [
      { href: "/portfolio/sport", label: "Sport" },
      { href: "/portfolio/travel", label: "Travel" },
    ],
  },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled
            ? "bg-[#043565]/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="text-xl font-bold uppercase tracking-[0.2em] text-[#FFC95C]">
              Awaken
            </span>
            <span className="text-xl font-bold uppercase tracking-[0.2em] text-white">
              Visuals
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setPortfolioOpen(true)}
                  onMouseLeave={() => setPortfolioOpen(false)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-sm font-medium uppercase tracking-wider text-white/80 transition-colors hover:text-[#FFC95C]"
                  >
                    {link.label}
                    <ChevronDown className="h-3 w-3" />
                  </Link>
                  <AnimatePresence>
                    {portfolioOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full mt-2 min-w-[160px] rounded-lg bg-[#043565]/95 p-2 backdrop-blur-md shadow-xl"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-md px-4 py-2 text-sm font-medium uppercase tracking-wider text-white/80 transition-colors hover:bg-white/5 hover:text-[#FFC95C] border-l-2 border-transparent hover:border-[#FFC95C]"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium uppercase tracking-wider text-white/80 transition-colors hover:text-[#FFC95C]"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className="text-white md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="fixed inset-0 z-[100] bg-[#043565] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <Link href="/" className="flex items-center gap-1" onClick={() => setIsMobileOpen(false)}>
                <span className="text-xl font-bold uppercase tracking-[0.2em] text-[#FFC95C]">
                  Awaken
                </span>
                <span className="text-xl font-bold uppercase tracking-[0.2em] text-white">
                  Visuals
                </span>
              </Link>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="text-white"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-8">
              {navLinks.map((link) => (
                <div key={link.href} className="text-center">
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="text-3xl font-bold uppercase tracking-[0.2em] text-white transition-colors hover:text-[#FFC95C]"
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="mt-3 flex flex-col gap-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsMobileOpen(false)}
                          className="text-lg uppercase tracking-wider text-[#95B8D1] transition-colors hover:text-[#FFC95C]"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
