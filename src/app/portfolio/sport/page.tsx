import type { Metadata } from "next";
import { SportPortfolio } from "./sport-portfolio";
import { getPortfolioImages, type DriveCategory } from "@/lib/google-drive";
import { getPlaylistVideos } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Sport Photography | Awaken Visuals",
  description:
    "Action sports photography by Nick Emmerson — Football, Formula 1, Formula E, Sportscars, and GB3 & GB4 motorsport coverage.",
};

const SPORT_CATEGORIES: DriveCategory[] = [
  "football",
  "formula-1",
  "formula-e",
  "sportscars",
  "gb3-gb4",
];

export default async function SportPage() {
  const [driveImages, videos] = await Promise.all([
    getPortfolioImages(SPORT_CATEGORIES),
    getPlaylistVideos("sport"),
  ]);

  return <SportPortfolio driveImages={driveImages} videos={videos} />;
}
