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
    rugby: {
      title: "Rugby",
      description: "Raw power and determination on the pitch",
    },
    athletics: {
      title: "Athletics",
      description: "Human performance at its absolute peak",
    },
    motorsport: {
      title: "Motorsport",
      description: "Speed, precision, and engineering excellence",
    },
    boxing: {
      title: "Boxing",
      description: "Courage and skill inside the ring",
    },
    swimming: {
      title: "Swimming",
      description: "Grace and power through water",
    },
  },
  travel: {
    landscapes: {
      title: "Landscapes",
      description: "Natural wonders from across the globe",
    },
    street: {
      title: "Street",
      description: "Life unfolding in the world's great cities",
    },
    architecture: {
      title: "Architecture",
      description: "Structures that define our built environment",
    },
    wildlife: {
      title: "Wildlife",
      description: "The animal kingdom in its natural habitat",
    },
    culture: {
      title: "Culture",
      description: "Traditions and stories from every corner",
    },
    aerial: {
      title: "Aerial",
      description: "The world from a breathtaking perspective",
    },
  },
};

// 12 varied unsplash images used as gallery placeholders
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
  "photo-1549719386-74dfcbf7dbed",
  "photo-1530549387789-4c1017266635",
  "photo-1544919982-01711c0eca7e",
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
