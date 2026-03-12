import type { MediaItem } from "@/types";

// Configure GOOGLE_DRIVE_SERVICE_ACCOUNT_KEY env var for production

const PLACEHOLDER_IMAGES: MediaItem[] = [
  {
    id: "ph-1",
    name: "Mountain Trail Running",
    url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&q=80",
    mimeType: "image/jpeg",
    width: 1200,
    height: 800,
    createdTime: "2024-01-15T10:00:00Z",
  },
  {
    id: "ph-2",
    name: "Surfing at Sunset",
    url: "https://images.unsplash.com/photo-1502680390548-bdbac40551ce?w=1200&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1502680390548-bdbac40551ce?w=400&q=80",
    mimeType: "image/jpeg",
    width: 1200,
    height: 800,
    createdTime: "2024-02-10T14:30:00Z",
  },
  {
    id: "ph-3",
    name: "Rock Climbing Adventure",
    url: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=1200&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=400&q=80",
    mimeType: "image/jpeg",
    width: 1200,
    height: 800,
    createdTime: "2024-03-05T09:15:00Z",
  },
  {
    id: "ph-4",
    name: "Tropical Beach",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
    mimeType: "image/jpeg",
    width: 1200,
    height: 800,
    createdTime: "2024-03-20T16:45:00Z",
  },
  {
    id: "ph-5",
    name: "Cycling Through Mountains",
    url: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1200&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=400&q=80",
    mimeType: "image/jpeg",
    width: 1200,
    height: 800,
    createdTime: "2024-04-08T11:00:00Z",
  },
  {
    id: "ph-6",
    name: "Kayaking in Fjords",
    url: "https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=1200&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=400&q=80",
    mimeType: "image/jpeg",
    width: 1200,
    height: 800,
    createdTime: "2024-04-22T08:30:00Z",
  },
  {
    id: "ph-7",
    name: "Desert Expedition",
    url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=80",
    mimeType: "image/jpeg",
    width: 1200,
    height: 800,
    createdTime: "2024-05-01T13:20:00Z",
  },
  {
    id: "ph-8",
    name: "Snowboarding Action",
    url: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=1200&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=400&q=80",
    mimeType: "image/jpeg",
    width: 1200,
    height: 800,
    createdTime: "2024-05-15T07:45:00Z",
  },
  {
    id: "ph-9",
    name: "Patagonia Landscape",
    url: "https://images.unsplash.com/photo-1531761535209-180857e963b9?w=1200&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1531761535209-180857e963b9?w=400&q=80",
    mimeType: "image/jpeg",
    width: 1200,
    height: 800,
    createdTime: "2024-06-02T15:10:00Z",
  },
  {
    id: "ph-10",
    name: "Basketball Game",
    url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80",
    mimeType: "image/jpeg",
    width: 1200,
    height: 800,
    createdTime: "2024-06-18T19:00:00Z",
  },
  {
    id: "ph-11",
    name: "Northern Lights",
    url: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=1200&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=400&q=80",
    mimeType: "image/jpeg",
    width: 1200,
    height: 800,
    createdTime: "2024-07-04T22:30:00Z",
  },
  {
    id: "ph-12",
    name: "Marathon Finish Line",
    url: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=1200&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=400&q=80",
    mimeType: "image/jpeg",
    width: 1200,
    height: 800,
    createdTime: "2024-07-20T06:00:00Z",
  },
];

function hasGoogleDriveCredentials(): boolean {
  return !!process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT_KEY;
}

export function getFileUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

export async function listFilesInFolder(folderId: string): Promise<MediaItem[]> {
  if (!hasGoogleDriveCredentials()) {
    // Return placeholder data when no credentials are configured
    console.log(`Google Drive credentials not configured. Returning placeholder data for folder: ${folderId}`);
    return PLACEHOLDER_IMAGES;
  }

  // TODO: Implement actual Google Drive API integration
  // Use GOOGLE_DRIVE_SERVICE_ACCOUNT_KEY to authenticate
  // List files in the specified folder using the Drive API v3
  // Map results to MediaItem[]

  try {
    // Placeholder for actual implementation
    console.log(`Fetching files from Google Drive folder: ${folderId}`);
    return PLACEHOLDER_IMAGES;
  } catch (error) {
    console.error("Error listing files from Google Drive:", error);
    return PLACEHOLDER_IMAGES;
  }
}
