/**
 * YouTube Playlist Integration
 * ============================
 * Fetches videos from UNLISTED YouTube playlists for the portfolio.
 *
 * SETUP:
 * 1. Upload videos to YouTube as UNLISTED
 * 2. Create UNLISTED playlists (e.g. "AV — Sport", "AV — Travel")
 * 3. Add your portfolio videos to the relevant playlist
 * 4. Set YOUTUBE_SPORT_PLAYLIST_ID and YOUTUBE_TRAVEL_PLAYLIST_ID in .env.local
 *
 * To add/remove/reorder videos: just manage the playlists on YouTube.
 */

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
}

const API_KEY = process.env.GOOGLE_API_KEY;

// Per-page playlist IDs
export const PLAYLIST_IDS = {
  sport: process.env.YOUTUBE_SPORT_PLAYLIST_ID || "",
  travel: process.env.YOUTUBE_TRAVEL_PLAYLIST_ID || "",
} as const;

export type PlaylistKey = keyof typeof PLAYLIST_IDS;

// Cache per playlist
const videoCache = new Map<string, { data: YouTubeVideo[]; timestamp: number }>();
const CACHE_TTL = 10 * 60 * 1000;

/**
 * Fetch all videos from a YouTube playlist.
 * Pass "sport" or "travel" to get videos for that page.
 * Returns empty array if not configured.
 */
export async function getPlaylistVideos(playlistKey?: PlaylistKey): Promise<YouTubeVideo[]> {
  const playlistId = playlistKey ? PLAYLIST_IDS[playlistKey] : "";

  if (!API_KEY || !playlistId || playlistId === "YOUR_PLAYLIST_ID") {
    return [];
  }

  // Check cache
  const cached = videoCache.get(playlistId);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${API_KEY}`;

    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      console.error(`YouTube API error: ${res.status}`);
      return [];
    }

    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      return [];
    }

    const videos: YouTubeVideo[] = data.items.map(
      (item: {
        snippet: {
          resourceId: { videoId: string };
          title: string;
          description: string;
          thumbnails: { high?: { url: string }; medium?: { url: string }; default?: { url: string } };
          publishedAt: string;
        };
      }) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnailUrl:
          item.snippet.thumbnails.high?.url ||
          item.snippet.thumbnails.medium?.url ||
          item.snippet.thumbnails.default?.url ||
          "",
        publishedAt: item.snippet.publishedAt,
      })
    );

    videoCache.set(playlistId, { data: videos, timestamp: Date.now() });

    return videos;
  } catch (error) {
    console.error("Failed to fetch YouTube playlist:", error);
    return [];
  }
}

/**
 * Get the embed URL for a YouTube video.
 */
export function getEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
}
