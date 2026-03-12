import { Hero } from "@/components/home/hero";
import { GallerySection } from "@/components/home/gallery-section";
import { FeaturedWork } from "@/components/home/featured-work";
import { AboutTeaser } from "@/components/home/about-teaser";
import { BlogPreview } from "@/components/home/blog-preview";
import { ContactCTA } from "@/components/home/contact-cta";

export default function Home() {
  return (
    <main>
      <Hero />
      <GallerySection />
      <FeaturedWork />
      <AboutTeaser />
      <BlogPreview />
      <ContactCTA />
    </main>
  );
}
