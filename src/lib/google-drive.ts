/**
 * Google Drive Integration
 * ========================
 * Fetches portfolio images from shared Google Drive folders.
 *
 * SETUP:
 * 1. Create folders in Google Drive for each category
 * 2. Share each folder as "Anyone with the link can view"
 * 3. Add the folder IDs to .env.local
 * 4. Name files with a number prefix to control order: 01-silverstone.jpg, 02-monza.jpg
 *
 * Images are served via Google's CDN with automatic resizing — no optimization needed.
 */

export interface DriveImage {
  id: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  width: number;
  height: number;
}

const API_KEY = process.env.GOOGLE_API_KEY;

// Cache to avoid hitting API limits (refreshes every build or every 10 min in dev)
const cache = new Map<string, { data: DriveImage[]; timestamp: number }>();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

/**
 * Fetch all images from a Google Drive folder.
 * Files are sorted by name, so use number prefixes (01-, 02-) to control order.
 */
export async function getImagesFromFolder(folderId: string): Promise<DriveImage[]> {
  if (!API_KEY || !folderId || folderId === "YOUR_FOLDER_ID") {
    return [];
  }

  // Check cache
  const cached = cache.get(folderId);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    const query = encodeURIComponent(`'${folderId}' in parents and mimeType contains 'image/' and trashed = false`);
    const fields = encodeURIComponent("files(id,name,mimeType,imageMediaMetadata)");
    const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=${fields}&orderBy=name&pageSize=100&key=${API_KEY}`;

    const res = await fetch(url, { next: { revalidate: 3600 } }); // revalidate every hour

    if (!res.ok) {
      console.error(`Google Drive API error for folder ${folderId}: ${res.status}`);
      return [];
    }

    const data = await res.json();

    if (!data.files || data.files.length === 0) {
      return [];
    }

    const images: DriveImage[] = data.files.map((file: {
      id: string;
      name: string;
      imageMediaMetadata?: { width?: number; height?: number };
    }) => ({
      id: file.id,
      name: file.name,
      // Google's CDN with dynamic resizing — w1920 for full size, w600 for thumbnails
      url: `https://lh3.googleusercontent.com/d/${file.id}=w1920`,
      thumbnailUrl: `https://lh3.googleusercontent.com/d/${file.id}=w600`,
      width: file.imageMediaMetadata?.width || 1920,
      height: file.imageMediaMetadata?.height || 1280,
    }));

    // Cache the result
    cache.set(folderId, { data: images, timestamp: Date.now() });

    return images;
  } catch (error) {
    console.error(`Failed to fetch from Google Drive folder ${folderId}:`, error);
    return [];
  }
}

/**
 * Folder ID mapping for portfolio categories.
 * These are read from environment variables set in .env.local
 */
export const DRIVE_FOLDERS = {
  // Sport / Action
  football: process.env.GOOGLE_DRIVE_SPORT_FOOTBALL || "",
  "formula-1": process.env.GOOGLE_DRIVE_SPORT_F1 || "",
  "formula-e": process.env.GOOGLE_DRIVE_SPORT_FE || "",
  sportscars: process.env.GOOGLE_DRIVE_SPORT_SPORTSCARS || "",
  "gb3-gb4": process.env.GOOGLE_DRIVE_SPORT_GB3GB4 || "",
  // Travel / Adventure
  travel: process.env.GOOGLE_DRIVE_TRAVEL_TRAVEL || "",
  edits: process.env.GOOGLE_DRIVE_TRAVEL_EDITS || "",
} as const;

export type DriveCategory = keyof typeof DRIVE_FOLDERS;

/**
 * Fetch images for multiple categories and return them with category tags.
 */
export async function getPortfolioImages(
  categories: DriveCategory[]
): Promise<{ src: string; alt: string; category: string; width: number; height: number }[]> {
  const results = await Promise.all(
    categories.map(async (cat) => {
      const folderId = DRIVE_FOLDERS[cat];
      const images = await getImagesFromFolder(folderId);
      return images.map((img) => ({
        src: img.url,
        alt: img.name.replace(/^\d+-/, "").replace(/[-_]/g, " ").replace(/\.\w+$/, ""),
        category: cat,
        width: img.width,
        height: img.height,
      }));
    })
  );

  return results.flat();
}
