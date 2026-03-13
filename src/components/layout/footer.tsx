import Link from "next/link";
import { Instagram, Youtube, Mail } from "lucide-react";

const socialLinks = [
  { href: "https://instagram.com/awakenvisuals", icon: Instagram, label: "Instagram" },
  { href: "https://youtube.com/@awakenvisuals", icon: Youtube, label: "YouTube" },
  { href: "mailto:hello@awakenvisuals.com", icon: Mail, label: "Email" },
];

const footerLinks = [
  { href: "/portfolio/sport", label: "Sport" },
  { href: "/portfolio/travel", label: "Travel" },
  { href: "/blog", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-[#043565]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col items-center gap-10 md:flex-row md:justify-between md:items-start">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-lg font-semibold uppercase tracking-[0.25em] text-white">
                Awaken
              </span>
              <span className="text-lg font-light uppercase tracking-[0.25em] text-white">
                Visuals
              </span>
            </Link>
            <p className="mt-3 text-sm text-white/40 tracking-wide">
              Capturing moments that matter
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-8">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-[#C8A84E]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 transition-colors hover:text-[#C8A84E]"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-14 border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-white/30 tracking-wide">
            &copy; {new Date().getFullYear()} Awaken Visuals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
