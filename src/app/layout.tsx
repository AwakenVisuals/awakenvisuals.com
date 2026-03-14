import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Awaken Visuals | Sport & Travel Photography by Nick Emmerson",
    template: "%s | Awaken Visuals",
  },
  description: "Award-winning sport and travel photography and videography by Nick Emmerson. Capturing the raw energy of Formula 1, football, and motorsport alongside breathtaking travel destinations worldwide. 150M+ views across platforms.",
  metadataBase: new URL("https://awakenvisuals.com"),
  keywords: ["sport photography", "travel photography", "Nick Emmerson", "Formula 1 photography", "football photography", "motorsport photography", "travel videography", "Awaken Visuals", "sports videography", "adventure photography"],
  authors: [{ name: "Nick Emmerson", url: "https://awakenvisuals.com" }],
  creator: "Nick Emmerson",
  publisher: "Awaken Visuals",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Awaken Visuals",
    title: "Awaken Visuals | Sport & Travel Photography by Nick Emmerson",
    description: "Capturing the raw energy of sport and the beauty of travel. 150M+ views across platforms.",
    url: "https://awakenvisuals.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Awaken Visuals | Sport & Travel Photography",
    description: "Capturing the raw energy of sport and the beauty of travel. 150M+ views across platforms.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://awakenvisuals.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Awaken Visuals",
              description: "Sport and travel photography and videography by Nick Emmerson",
              url: "https://awakenvisuals.com",
              founder: {
                "@type": "Person",
                name: "Nick Emmerson",
              },
              sameAs: [
                "https://instagram.com/awakenvisuals",
                "https://tiktok.com/@awakenvisuals",
                "https://youtube.com/@awakenvisuals",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                email: "nick@awakenvisuals.com",
                contactType: "customer service",
              },
            }),
          }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
