import type { Metadata } from "next";
import { TravelPortfolio } from "./travel-portfolio";

export const metadata: Metadata = {
  title: "Travel Photography | Awaken Visuals",
  description:
    "Travel photography portfolio featuring landscapes, street, architecture, wildlife, culture, and aerial photography.",
};

export default function TravelPage() {
  return <TravelPortfolio />;
}
