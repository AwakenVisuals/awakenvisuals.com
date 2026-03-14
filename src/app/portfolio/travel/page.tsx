import type { Metadata } from "next";
import { TravelPortfolio } from "./travel-portfolio";

export const metadata: Metadata = {
  title: "Travel Photography | Awaken Visuals",
  description:
    "Adventure and travel photography by Nick Emmerson — stunning landscapes, creative edits, and visual storytelling from around the world.",
};

export default function TravelPage() {
  return <TravelPortfolio />;
}
