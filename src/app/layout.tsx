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
    default: "Awaken Visuals | Sport & Travel Photography",
    template: "%s | Awaken Visuals",
  },
  description:
    "Sport and travel photography and videography — capturing the raw energy of athletic competition and the breathtaking beauty of destinations around the world.",
  metadataBase: new URL("https://awakenvisuals.com"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Awaken Visuals",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
