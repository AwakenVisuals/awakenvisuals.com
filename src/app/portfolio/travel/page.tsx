import type { Metadata } from "next";
import { TravelPortfolio } from "./travel-portfolio";
import { getPortfolioImages, type DriveCategory } from "@/lib/google-drive";
import { getPlaylistVideos } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Travel Photography | Awaken Visuals",
  description:
    "Adventure and travel photography by Nick Emmerson — stunning landscapes, creative edits, and visual storytelling from around the world.",
};

const TRAVEL_CATEGORIES: DriveCategory[] = ["travel", "edits"];

export default async function TravelPage() {
  const [driveImages, videos] = await Promise.all([
    getPortfolioImages(TRAVEL_CATEGORIES),
    getPlaylistVideos("travel"),
  ]);

  return <TravelPortfolio driveImages={driveImages} videos={videos} />;
}
