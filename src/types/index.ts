export interface MediaItem {
  id: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  mimeType: string;
  width?: number;
  height?: number;
  createdTime?: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  publishedAt: string;
  author: string;
  link: string;
}

export interface PortfolioCategory {
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  subcategories: PortfolioSubcategory[];
}

export interface PortfolioSubcategory {
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  driveFolder?: string;
}

export type Category = "sport" | "travel";
