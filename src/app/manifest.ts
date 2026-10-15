import type { MetadataRoute } from "next";
import { officialBrand } from "@/config/brand";
import { siteContent } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: officialBrand.productName,
    short_name: officialBrand.productName,
    description: siteContent.seoDescription,
    start_url: "/",
    scope: "/",
    display: "browser",
    lang: "en",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/favicon/circular-badge-blue-gold.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
