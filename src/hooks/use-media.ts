import { useState, useEffect } from "react";
import type { MediaItem } from "@/types";

interface UseMediaReturn {
  media: MediaItem[];
  loading: boolean;
  error: string | null;
}

export function useMedia(folderId?: string): UseMediaReturn {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchMedia() {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (folderId) {
          params.set("folder", folderId);
        }

        const url = `/api/media${params.toString() ? `?${params.toString()}` : ""}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch media: ${response.status}`);
        }

        const data = await response.json();

        if (!cancelled) {
          setMedia(data.items || []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "An error occurred");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchMedia();

    return () => {
      cancelled = true;
    };
  }, [folderId]);

  return { media, loading, error };
}
