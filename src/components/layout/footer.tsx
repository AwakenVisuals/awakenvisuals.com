import Link from "next/link";
import { Instagram, MessageCircle, Youtube, BookOpen } from "lucide-react";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.21 8.21 0 0 0 4.76 1.52V6.77a4.83 4.83 0 0 1-1-.08z" />
    </svg>
  );
}

const socialLinks = [
  { href: "https://instagram.com/awakenvisuals", icon: Instagram, label: "Instagram" },
  { href: "https://tiktok.com/@awakenvisuals", icon: TikTokIcon, label: "TikTok" },
  { href: "https://youtube.com/@awakenvisuals", icon: Youtube, label: "YouTube" },
  { href: "https://wa.me/447734803759", icon: MessageCircle, label: "WhatsApp" },
  { href: "https://awakenvisuals.substack.com", icon: BookOpen, label: "Substack" },
];

const footerLinks = [
  { href: "/portfolio/sport", label: "Action" },
  { href: "/portfolio/travel", label: "Adventure" },
  { href: "/blog", label: "AV Club" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-[#043565]">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
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
                className="text-[13px] uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-[#F5A300]"
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
                className="text-white/50 transition-colors hover:text-[#F5A300]"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/30 tracking-wide">
            &copy; {new Date().getFullYear()} Awaken Visuals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
