import { Hero } from "@/components/home/hero";
import { BlogPreview } from "@/components/home/blog-preview";
import { ContactCTA } from "@/components/home/contact-cta";

export default function Home() {
  return (
    <main>
      <Hero />
      <BlogPreview />
      <ContactCTA />
    </main>
  );
}
