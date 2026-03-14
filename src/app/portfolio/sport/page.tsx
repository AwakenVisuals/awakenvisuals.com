import type { Metadata } from "next";
import { SportPortfolio } from "./sport-portfolio";

export const metadata: Metadata = {
  title: "Sport Photography | Awaken Visuals",
  description:
    "Action sports photography by Nick Emmerson — Football, Formula 1, Formula E, Sportscars, and GB3 & GB4 motorsport coverage.",
};

export default function SportPage() {
  return <SportPortfolio />;
}
