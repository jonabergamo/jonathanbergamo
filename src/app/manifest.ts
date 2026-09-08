import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jonathan Bergamo",
    short_name: "Jonathan",
    description: "Full-stack software engineer. Portfolio.",
    start_url: "/",
    display: "standalone",
    background_color: "#f1f4f7",
    theme_color: "#1b2430",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
