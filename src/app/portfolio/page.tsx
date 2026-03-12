import type { Metadata } from "next";
import { PortfolioLanding } from "./portfolio-landing";

export const metadata: Metadata = {
  title: "Portfolio | Awaken Visuals",
  description:
    "Explore our sport and travel photography portfolio. Premium visual storytelling across athletic events and global destinations.",
};

export default function PortfolioPage() {
  return <PortfolioLanding />;
}
