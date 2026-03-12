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
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-[#1F2F16] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col items-center gap-10 md:flex-row md:justify-between md:items-start">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-block">
              <span className="text-lg font-bold uppercase tracking-[0.2em] text-[#FFC95C]">
                Awaken
              </span>
              <span className="text-lg font-bold uppercase tracking-[0.2em] text-white">
                {" "}Visuals
              </span>
            </Link>
            <p className="mt-2 text-sm text-[#95B8D1]/60">
              Capturing moments that matter
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-wider text-white/60 transition-colors hover:text-[#FFC95C]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition-colors hover:text-[#FFC95C]"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white/5 pt-8 text-center">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Awaken Visuals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
