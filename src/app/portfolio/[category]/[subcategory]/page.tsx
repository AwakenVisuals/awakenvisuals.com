import type { Metadata } from "next";
import { SubcategoryGallery } from "./subcategory-gallery";

const subcategoryData: Record<
  string,
  Record<string, { title: string; description: string }>
> = {
  sport: {
    football: {
      title: "Football",
      description: "The beautiful game captured in stunning detail",
    },
    "formula-e": {
      title: "Formula E",
      description: "Electric racing at the cutting edge of motorsport",
    },
    "formula-1": {
      title: "Formula 1",
      description: "The pinnacle of speed, precision, and engineering",
    },
    wec: {
      title: "WEC",
      description: "Endurance racing across the world's greatest circuits",
    },
    sportscars: {
      title: "Sportscars",
      description: "Performance machines in their element",
    },
    "single-seaters": {
      title: "Single Seaters",
      description: "Open-wheel racing from grassroots to grand prix",
    },
  },
  travel: {
    travel: {
      title: "Travel",
      description: "Global destinations through a cinematic lens",
    },
    edits: {
      title: "Edits",
      description: "Creative post-production and visual storytelling",
    },
  },
};

// Varied unsplash images used as gallery placeholders
const galleryImages = [
  "photo-1506905925346-21bda4d32df4",
  "photo-1480714378408-67cf0d13bc1b",
  "photo-1511739001486-6bfe10ce65f4",
  "photo-1474511320723-9a56873571b7",
  "photo-1533669955142-6a73332af4db",
  "photo-1506744038136-46273834b3fb",
  "photo-1574629810360-7efbbe195018",
  "photo-1552674605-db6ffd4facb5",
  "photo-1568605117036-5fe5e7bab0b7",
  "photo-1541252260730-0412e8e2108e",
  "photo-1544636331-e26879cd4d9b",
  "photo-1504817343863-5092a923803e",
];

type Props = {
  params: Promise<{ category: string; subcategory: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, subcategory } = await params;
  const data = subcategoryData[category]?.[subcategory];
  const title = data?.title ?? subcategory;

  return {
    title: `${title} Photography | Awaken Visuals`,
    description:
      data?.description ??
      `Browse our ${title} photography collection.`,
  };
}

export default async function SubcategoryPage({ params }: Props) {
  const { category, subcategory } = await params;
  const data = subcategoryData[category]?.[subcategory];
  const title = data?.title ?? subcategory.charAt(0).toUpperCase() + subcategory.slice(1);
  const description = data?.description ?? "";

  const images = galleryImages.map((id, i) => ({
    id: `${subcategory}-${i}`,
    src: `https://images.unsplash.com/${id}?w=800&q=80`,
    alt: `${title} photo ${i + 1}`,
    title: `${title} ${i + 1}`,
  }));

  return (
    <SubcategoryGallery
      title={title}
      description={description}
      category={category}
      images={images}
    />
  );
}
