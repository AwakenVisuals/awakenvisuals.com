import type { Metadata } from "next";
import { SportPortfolio } from "./sport-portfolio";

export const metadata: Metadata = {
  title: "Sport Photography | Awaken Visuals",
  description:
    "Sport photography portfolio featuring football, rugby, athletics, motorsport, boxing, and swimming.",
};

export default function SportPage() {
  return <SportPortfolio />;
}
